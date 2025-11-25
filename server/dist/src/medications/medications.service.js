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
exports.MedicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MedicationsService = class MedicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createMedicationDto) {
        return this.prisma.medication.create({
            data: {
                name: createMedicationDto.name,
                dosage: createMedicationDto.dosage,
                frequency: createMedicationDto.frequency,
                startDate: new Date(createMedicationDto.startDate),
                endDate: createMedicationDto.endDate ? new Date(createMedicationDto.endDate) : null,
                notes: createMedicationDto.notes,
                patientId: createMedicationDto.patientId,
            },
        });
    }
    findAll() {
        return this.prisma.medication.findMany();
    }
    findOne(id) {
        return this.prisma.medication.findUnique({
            where: { id },
        });
    }
    update(id, updateMedicationDto) {
        return this.prisma.medication.update({
            where: { id },
            data: {
                ...updateMedicationDto,
                startDate: updateMedicationDto.startDate ? new Date(updateMedicationDto.startDate) : undefined,
                endDate: updateMedicationDto.endDate ? new Date(updateMedicationDto.endDate) : undefined,
            },
        });
    }
    remove(id) {
        return this.prisma.medication.delete({
            where: { id },
        });
    }
};
exports.MedicationsService = MedicationsService;
exports.MedicationsService = MedicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicationsService);
//# sourceMappingURL=medications.service.js.map