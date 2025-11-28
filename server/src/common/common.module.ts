import { Module, Global } from '@nestjs/common';
import { AuditService } from './services/audit.service';
import { FileService } from './services/file.service';
import { AvatarCleanupService } from './services/avatar-cleanup.service';

@Global()
@Module({
  providers: [AuditService, FileService, AvatarCleanupService],
  exports: [AuditService, FileService, AvatarCleanupService],
})
export class CommonModule {}
