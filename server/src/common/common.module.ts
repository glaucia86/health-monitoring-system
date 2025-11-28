import { Module, Global } from '@nestjs/common';
import { AuditService } from './services/audit.service';
import { FileService } from './services/file.service';

@Global()
@Module({
  providers: [AuditService, FileService],
  exports: [AuditService, FileService],
})
export class CommonModule {}
