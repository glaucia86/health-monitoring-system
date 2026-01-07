import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Pacientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @Post()
  @Roles(Role.CARETAKER)
  @ApiOperation({ summary: 'Criar um novo paciente vinculado ao cuidador' })
  create(@Body() createPatientDto: CreatePatientDto, @Request() req: any) {
    return this.patientsService.create({
      ...createPatientDto,
      userId: req.user.userId,
    });
  }

  @Get()
  @Roles(Role.CARETAKER)
  @ApiOperation({ summary: 'Listar todos os pacientes do cuidador' })
  findAll(@Request() req: any) {
    return this.patientsService.findAll(req.user.userId);
  }

  @Get(':id')
  @Roles(Role.CARETAKER)
  @ApiOperation({ summary: 'Obter detalhes de um paciente' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.patientsService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @Roles(Role.CARETAKER)
  @ApiOperation({ summary: 'Atualizar dados de um paciente' })
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @Request() req: any,
  ) {
    return this.patientsService.update(id, req.user.userId, updatePatientDto);
  }

  @Delete(':id')
  @Roles(Role.CARETAKER)
  @ApiOperation({ summary: 'Remover um paciente' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.patientsService.remove(id, req.user.userId);
  }
}
