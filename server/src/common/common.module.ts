import { Module, Global } from '@nestjs/common';
import { AuditService } from './services/audit.service';
import { FileService } from './services/file.service';
import { AvatarCleanupService } from './services/avatar-cleanup.service';
import { LockService } from './services/lock.service';

@Global()
@Module({
  providers: [AuditService, FileService, AvatarCleanupService, LockService],
  exports: [AuditService, FileService, AvatarCleanupService, LockService],
})
export class CommonModule {}
