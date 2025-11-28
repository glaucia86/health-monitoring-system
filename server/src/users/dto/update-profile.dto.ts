import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateProfileDto {
  @ApiPropertyOptional({ description: 'Nome do usuário', minLength: 2 })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
  @Transform(({ value }) => value === '' ? undefined : value)
  name?: string;

  @ApiPropertyOptional({ description: 'Telefone', minLength: 10 })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Telefone deve ter pelo menos 10 dígitos' })
  @Transform(({ value }) => value === '' ? undefined : value)
  phone?: string;

  @ApiPropertyOptional({ description: 'Endereço completo', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Endereço não pode ter mais de 500 caracteres' })
  @Transform(({ value }) => value === '' ? undefined : value)
  address?: string;

  @ApiPropertyOptional({ description: 'Nome do contato de emergência' })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Nome do contato não pode ter mais de 100 caracteres' })
  @Transform(({ value }) => value === '' ? undefined : value)
  emergencyContact?: string;

  @ApiPropertyOptional({ description: 'Telefone de emergência', minLength: 10 })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Telefone de emergência deve ter pelo menos 10 dígitos' })
  @Transform(({ value }) => value === '' ? undefined : value)
  emergencyPhone?: string;
}
