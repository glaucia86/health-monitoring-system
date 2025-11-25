import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('test/:patientId')
  @Roles('ADMIN', 'DOCTOR')
  async sendTestReminder(@Param('patientId') patientId: string) {
    return this.notificationsService.sendTestReminder(patientId);
  }
}
