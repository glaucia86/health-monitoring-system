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
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExamsService = class ExamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createExamDto) {
        return this.prisma.exam.create({
            data: {
                title: createExamDto.title,
                date: new Date(createExamDto.date),
                type: createExamDto.type,
                resultSummary: createExamDto.resultSummary,
                fileUrl: createExamDto.fileUrl,
                patientId: createExamDto.patientId,
            },
        });
    }
    findAll() {
        return this.prisma.exam.findMany();
    }
    findOne(id) {
        return this.prisma.exam.findUnique({ where: { id } });
    }
    update(id, updateExamDto) {
        return this.prisma.exam.update({
            where: { id },
            data: {
                ...updateExamDto,
                date: updateExamDto.date ? new Date(updateExamDto.date) : undefined,
            },
        });
    }
    remove(id) {
        return this.prisma.exam.delete({ where: { id } });
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamsService);
//# sourceMappingURL=exams.service.js.map