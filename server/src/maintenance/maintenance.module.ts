import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { AvatarCleanupCronService } from './avatar-cleanup-cron.service';

@Module({
  imports: [CommonModule],
  providers: [AvatarCleanupCronService],
})
export class MaintenanceModule {}
