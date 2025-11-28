import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UserProfileMapper } from './mappers/user-profile.mapper';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../common/services/audit.service';
import { FileService } from '../common/services/file.service';
import * as path from 'path';

@Injectable()
export class UsersService {
  private readonly AVATAR_UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'avatars');
  private readonly MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly fileService: FileService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password || 'default_password', // TODO: Hash password
        name: createUserDto.name,
        role: createUserDto.role,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async activate(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isActive: true,
        deletedAt: null,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
  }

  /**
   * T013: Delete authenticated user account
   * - Removes avatar file if exists
   * - Deletes user record (cascades to related data)
   * - Logs the event
   */
  async removeSelf(userId: string): Promise<void> {
    // Check if user has any associated patients
    const hasPatients = await this.prisma.patient.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (hasPatients) {
      throw new BadRequestException(
        'Não é possível excluir a conta enquanto houver pacientes associados. Remova ou transfira os pacientes para outro profissional antes de excluir sua conta.',
      );
    }

    // Get current avatar URL
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { avatarUrl: true },
    });

    // Remove avatar file if exists
    if (user?.avatarUrl) {
      const filePath = this.fileService.resolveFilePath(user.avatarUrl);
      if (filePath) {
        this.fileService.removeFile({ filePath, suppressErrors: true });
      }
    }

    // Soft delete user from DB
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });

    // Audit log
    this.auditService.logUserDeletion(userId);
  }

  /**
   * T009: Find user with full profile data, masking CPF
   */
  async findOneWithProfile(userId: string): Promise<UserProfileResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        cpf: true,
        birthDate: true,
        phone: true,
        address: true,
        emergencyContact: true,
        emergencyPhone: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    if (!user) {
      return null;
    }

    return UserProfileMapper.toProfileResponseFromPartial(user);
  }

  /**
   * T010: Update user profile with audit logging
   */
  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserProfileResponseDto> {
    // Get current user data BEFORE updating for audit log comparison
    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        phone: true,
        address: true,
        emergencyContact: true,
        emergencyPhone: true,
      },
    });

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: dto.name,
        phone: dto.phone,
        address: dto.address,
        emergencyContact: dto.emergencyContact,
        emergencyPhone: dto.emergencyPhone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        cpf: true,
        birthDate: true,
        phone: true,
        address: true,
        emergencyContact: true,
        emergencyPhone: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    // Audit log with old values
    this.auditService.logProfileUpdate(userId, dto, currentUser || undefined);

    return UserProfileMapper.toProfileResponseFromPartial(updatedUser);
  }

  /**
   * T011: Upload avatar to /uploads/avatars/{userId}.{ext}
   */
  async uploadAvatar(userId: string, file: Express.Multer.File): Promise<UserProfileResponseDto> {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const filename = `${userId}${ext}`;

    // Get current avatar URL (exact path stored in DB)
    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { avatarUrl: true },
    });

    // Upload new avatar file first – throws on I/O failure
    const relativePath = this.fileService.uploadFile({
      destinationDir: this.AVATAR_UPLOAD_DIR,
      filename,
      buffer: file.buffer,
    });

    const avatarUrl = `/${relativePath.replace(/\\/g, '/')}`;

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { avatarUrl },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          cpf: true,
          birthDate: true,
          phone: true,
          address: true,
          emergencyContact: true,
          emergencyPhone: true,
          avatarUrl: true,
          createdAt: true,
        },
      });

      // Remove old avatar file after successful DB update
      if (currentUser?.avatarUrl) {
        const oldFilePath = this.fileService.resolveFilePath(currentUser.avatarUrl);
        if (oldFilePath) {
          this.fileService.removeFile({ filePath: oldFilePath, suppressErrors: true });
        }
      }

      // Audit log
      this.auditService.logAvatarUpdate(userId, 'upload', filename);

      return UserProfileMapper.toProfileResponseFromPartial(updatedUser);
    } catch (error) {
      // DB update failed – best-effort cleanup of newly uploaded file
      const newFilePath = this.fileService.resolveFilePath(avatarUrl);
      if (newFilePath) {
        this.fileService.removeFile({ filePath: newFilePath, suppressErrors: true });
      }
      throw error;
    }
  }

  /**
   * T012: Remove avatar file and set avatarUrl to null
   */
  async removeAvatar(userId: string): Promise<UserProfileResponseDto> {
    // Get current avatar URL
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { avatarUrl: true },
    });

    if (user?.avatarUrl) {
      // Remove file from filesystem
      const filePath = path.join(process.cwd(), user.avatarUrl);
      this.fileService.removeFile({ filePath, suppressErrors: true });
    }

    // Update user to remove avatar URL
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: null },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        cpf: true,
        birthDate: true,
        phone: true,
        address: true,
        emergencyContact: true,
        emergencyPhone: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    // Audit log
    this.auditService.logAvatarUpdate(userId, 'remove');

    return UserProfileMapper.toProfileResponseFromPartial(updatedUser);
  }

  /**
   * Get profile change history for the authenticated user
   */
  async getProfileHistory(userId: string) {
    const history = await this.prisma.profileAuditLog.findMany({
      where: { userId },
      orderBy: { changedAt: 'desc' },
      take: 100, // Limit to last 100 changes
    });

    return history.map(log => ({
      id: log.id,
      action: log.action,
      fieldName: log.fieldName,
      oldValue: log.oldValue,
      newValue: log.newValue,
      changedAt: log.changedAt.toISOString(),
      ipAddress: log.ipAddress,
    }));
  }
}
