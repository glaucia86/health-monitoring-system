"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIntakeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_intake_dto_1 = require("./create-intake.dto");
class UpdateIntakeDto extends (0, mapped_types_1.PartialType)(create_intake_dto_1.CreateIntakeDto) {
}
exports.UpdateIntakeDto = UpdateIntakeDto;
//# sourceMappingURL=update-intake.dto.js.map