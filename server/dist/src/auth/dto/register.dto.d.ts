import { Role } from '@prisma/client';
export declare class RegisterDto {
    email: string;
    password: string;
    name?: string;
    role?: Role;
}
