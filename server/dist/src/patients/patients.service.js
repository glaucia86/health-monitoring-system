"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PatientsService = class PatientsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createPatientDto) {
        return this.prisma.patient.create({
            data: {
                name: createPatientDto.name,
                birthDate: new Date(createPatientDto.birthDate),
                diagnosis: createPatientDto.diagnosis,
                userId: createPatientDto.userId,
            },
        });
    }
    findAll() {
        return this.prisma.patient.findMany();
    }
    findOne(id) {
        return this.prisma.patient.findUnique({
            where: { id },
            include: { medications: true, exams: true, appointments: true },
        });
    }
    update(id, updatePatientDto) {
        return this.prisma.patient.update({
            where: { id },
            data: {
                ...updatePatientDto,
                birthDate: updatePatientDto.birthDate ? new Date(updatePatientDto.birthDate) : undefined,
            },
        });
    }
    remove(id) {
        return this.prisma.patient.delete({
            where: { id },
        });
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map