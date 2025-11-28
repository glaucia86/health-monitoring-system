import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AvatarCleanupService } from '../common/services/avatar-cleanup.service';

@Injectable()
export class AvatarCleanupCronService {
  private readonly logger = new Logger(AvatarCleanupCronService.name);

  constructor(
    private readonly avatarCleanupService: AvatarCleanupService,
  ) {}

  // For now, run once a day at 03:00 AM. Adjust as needed.
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleCron(): Promise<void> {
    this.logger.log('Starting scheduled avatar cleanup job...');
    await this.avatarCleanupService.removeOrphanedAvatars();
    this.logger.log('Scheduled avatar cleanup job finished.');
  }
}
