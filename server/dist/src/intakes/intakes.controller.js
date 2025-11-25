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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntakesController = void 0;
const common_1 = require("@nestjs/common");
const intakes_service_1 = require("./intakes.service");
const create_intake_dto_1 = require("./dto/create-intake.dto");
const update_intake_dto_1 = require("./dto/update-intake.dto");
let IntakesController = class IntakesController {
    intakesService;
    constructor(intakesService) {
        this.intakesService = intakesService;
    }
    create(createIntakeDto) {
        return this.intakesService.create(createIntakeDto);
    }
    findAll() {
        return this.intakesService.findAll();
    }
    findOne(id) {
        return this.intakesService.findOne(id);
    }
    update(id, updateIntakeDto) {
        return this.intakesService.update(id, updateIntakeDto);
    }
    remove(id) {
        return this.intakesService.remove(id);
    }
};
exports.IntakesController = IntakesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_intake_dto_1.CreateIntakeDto]),
    __metadata("design:returntype", void 0)
], IntakesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IntakesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IntakesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_intake_dto_1.UpdateIntakeDto]),
    __metadata("design:returntype", void 0)
], IntakesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IntakesController.prototype, "remove", null);
exports.IntakesController = IntakesController = __decorate([
    (0, common_1.Controller)('intakes'),
    __metadata("design:paramtypes", [intakes_service_1.IntakesService])
], IntakesController);
//# sourceMappingURL=intakes.controller.js.map