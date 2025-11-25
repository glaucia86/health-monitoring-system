import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuditService } from '../common/services/audit.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private auditService;
    constructor(prisma: PrismaService, jwtService: JwtService, auditService: AuditService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
        };
        token: string;
    }>;
    validateUser(userId: string): Promise<{
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        id: string;
    } | null>;
    private generateToken;
}
