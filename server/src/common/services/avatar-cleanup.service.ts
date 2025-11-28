import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FileService } from './file.service';
import * as path from 'path';

@Injectable()
export class AvatarCleanupService {
  private readonly logger = new Logger(AvatarCleanupService.name);
  private readonly AVATAR_UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'avatars');

  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  /**
   * Removes avatar files from the filesystem that are not referenced
   * by any user.avatarUrl in the database.
   *
   * Intended to be triggered manually (e.g. CLI/script) or via cron.
   */
  async removeOrphanedAvatars(): Promise<void> {
    // Collect all avatar URLs currently in use
    const usersWithAvatar = await this.prisma.user.findMany({
      where: { avatarUrl: { not: null } },
      select: { avatarUrl: true },
    });

    const referencedPaths = new Set(
      usersWithAvatar
        .map(u => u.avatarUrl)
        .filter((url): url is string => !!url)
        .map(url => this.fileService.resolveFilePath(url))
        .filter((p): p is string => !!p),
    );

    // List all files currently present in the avatars directory
    const allAvatarFiles = this.fileService.listAbsoluteFilePaths(this.AVATAR_UPLOAD_DIR);

    let removedCount = 0;

    for (const filePath of allAvatarFiles) {
      if (!referencedPaths.has(filePath)) {
        this.fileService.removeFile({ filePath, suppressErrors: true });
        removedCount += 1;
      }
    }

    this.logger.log(
      `Avatar cleanup completed. Total files: ${allAvatarFiles.length}, ` +
      `referenced: ${referencedPaths.size}, removed orphans: ${removedCount}`,
    );
  }
}
