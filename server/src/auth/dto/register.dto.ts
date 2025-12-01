import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum, IsDateString, MinLength, IsIn } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha123', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ enum: Role, default: Role.VIEWER })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({ example: '000.000.000-00' })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: 'Rua Exemplo, 123, São Paulo - SP' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'Maria Silva' })
  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @ApiPropertyOptional({ example: '(11) 88888-8888' })
  @IsString()
  @IsOptional()
  emergencyPhone?: string;

  /**
   * Access type chosen during registration flow.
   * Used for UX personalization and analytics/telemetry.
   * Does NOT affect user role or permissions.
   */
  @ApiPropertyOptional({
    enum: ['caregiver', 'patient'],
    example: 'caregiver',
    description: 'Access type for telemetry (does not affect role)',
  })
  @IsOptional()
  @IsIn(['caregiver', 'patient'])
  accessType?: 'caregiver' | 'patient';
}
