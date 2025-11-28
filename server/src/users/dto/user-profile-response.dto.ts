import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

/**
 * Masks a CPF to hide most digits for privacy
 * @param cpf - The full CPF string (11 digits or formatted)
 * @returns Masked CPF in format ***.***.***-XX
 */
export function maskCpf(cpf: string | null | undefined): string | null {
  if (!cpf) return null;
  
  // Remove any formatting, keep only digits
  const digits = cpf.replace(/\D/g, '');
  
  if (digits.length !== 11) return null;
  
  // Return masked format: ***.***.***-XX
  return `***.***.***-${digits.slice(-2)}`;
}

export class UserProfileResponseDto {
  @ApiProperty({ description: 'ID do usuário' })
  id: string;

  @ApiProperty({ description: 'Email (readonly)' })
  email: string;

  @ApiPropertyOptional({ description: 'Nome' })
  name?: string;

  @ApiProperty({ description: 'Papel do usuário', enum: Role })
  role: Role;

  @ApiPropertyOptional({ description: 'CPF mascarado (readonly)' })
  cpf?: string; // Masked: ***.***.***-XX

  @ApiPropertyOptional({ description: 'Data de nascimento (readonly)' })
  birthDate?: string; // ISO date

  @ApiPropertyOptional({ description: 'Telefone' })
  phone?: string;

  @ApiPropertyOptional({ description: 'Endereço' })
  address?: string;

  @ApiPropertyOptional({ description: 'Contato de emergência' })
  emergencyContact?: string;

  @ApiPropertyOptional({ description: 'Telefone de emergência' })
  emergencyPhone?: string;

  @ApiPropertyOptional({ description: 'URL do avatar' })
  avatarUrl?: string;

  @ApiProperty({ description: 'Data de criação da conta' })
  createdAt: string; // ISO date
}
