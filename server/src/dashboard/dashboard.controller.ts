import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Obter resumo do dashboard do paciente' })
  @ApiResponse({ status: 200, description: 'Dados do dashboard' })
  async getOverview(@Request() req: any) {
    const patientId = req.user.patientId;
    if (!patientId) {
      throw new Error('User is not associated with a patient');
    }
    return this.dashboardService.getPatientOverview(patientId);
  }

  @Get('exams/trends')
  @ApiOperation({ summary: 'Obter tendências de exames' })
  @ApiQuery({ name: 'type', required: false, description: 'Tipo de exame' })
  @ApiResponse({ status: 200, description: 'Tendências de exames' })
  async getExamTrends(
    @Request() req: any,
    @Query('type') examType?: string,
  ) {
    const patientId = req.user.patientId;
    if (!patientId) {
      throw new Error('User is not associated with a patient');
    }
    return this.dashboardService.getExamTrends(patientId, examType);
  }

  @Get('medications/adherence')
  @ApiOperation({ summary: 'Obter aderência de medicamentos' })
  @ApiQuery({ name: 'days', required: false, description: 'Número de dias (padrão: 30)' })
  @ApiResponse({ status: 200, description: 'Dados de aderência' })
  async getMedicationAdherence(
    @Request() req: any,
    @Query('days') days?: string,
  ) {
    const patientId = req.user.patientId;
    if (!patientId) {
      throw new Error('User is not associated with a patient');
    }
    const daysNum = days ? parseInt(days, 10) : 30;
    return this.dashboardService.getMedicationAdherence(patientId, daysNum);
  }
}
