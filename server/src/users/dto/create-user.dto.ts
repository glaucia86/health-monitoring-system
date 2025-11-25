import { Role } from '@prisma/client';

export class CreateUserDto {
  email: string;
  password?: string; // Optional for now, will be hashed
  name?: string;
  role?: Role;
}
