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
exports.IntakesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let IntakesService = class IntakesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createIntakeDto) {
        return this.prisma.medicationIntake.create({
            data: {
                scheduleId: createIntakeDto.scheduleId,
                takenAt: new Date(createIntakeDto.takenAt),
                status: createIntakeDto.status,
                notes: createIntakeDto.notes,
            },
        });
    }
    findAll() {
        return this.prisma.medicationIntake.findMany();
    }
    findOne(id) {
        return this.prisma.medicationIntake.findUnique({ where: { id } });
    }
    update(id, updateIntakeDto) {
        return this.prisma.medicationIntake.update({
            where: { id },
            data: {
                ...updateIntakeDto,
                takenAt: updateIntakeDto.takenAt ? new Date(updateIntakeDto.takenAt) : undefined,
            },
        });
    }
    remove(id) {
        return this.prisma.medicationIntake.delete({ where: { id } });
    }
};
exports.IntakesService = IntakesService;
exports.IntakesService = IntakesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IntakesService);
//# sourceMappingURL=intakes.service.js.map