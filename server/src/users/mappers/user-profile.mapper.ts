import { User } from '@prisma/client';
import { UserProfileResponseDto, maskCpf } from '../dto/user-profile-response.dto';

/**
 * Mapper class responsible for transforming User entities to DTOs
 * Follows Single Responsibility Principle - only handles data transformation
 */
export class UserProfileMapper {
  /**
   * Maps a Prisma User entity to UserProfileResponseDto
   * Applies business rules like CPF masking and date formatting
   */
  static toProfileResponse(user: User): UserProfileResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name ?? undefined,
      role: user.role,
      cpf: maskCpf(user.cpf) ?? undefined,
      birthDate: user.birthDate?.toISOString() ?? undefined,
      phone: user.phone ?? undefined,
      address: user.address ?? undefined,
      emergencyContact: user.emergencyContact ?? undefined,
      emergencyPhone: user.emergencyPhone ?? undefined,
      avatarUrl: user.avatarUrl ?? undefined,
      createdAt: user.createdAt.toISOString(),
    };
  }

  /**
   * Maps a partial User entity to UserProfileResponseDto
   * Useful when working with Prisma select queries
   */
  static toProfileResponseFromPartial(
    user: Partial<User> & Pick<User, 'id' | 'email' | 'role' | 'createdAt'>,
  ): UserProfileResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name ?? undefined,
      role: user.role,
      cpf: maskCpf(user.cpf ?? null) ?? undefined,
      birthDate: user.birthDate?.toISOString() ?? undefined,
      phone: user.phone ?? undefined,
      address: user.address ?? undefined,
      emergencyContact: user.emergencyContact ?? undefined,
      emergencyPhone: user.emergencyPhone ?? undefined,
      avatarUrl: user.avatarUrl ?? undefined,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
