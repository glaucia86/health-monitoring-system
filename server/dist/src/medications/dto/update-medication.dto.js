"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMedicationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_medication_dto_1 = require("./create-medication.dto");
class UpdateMedicationDto extends (0, mapped_types_1.PartialType)(create_medication_dto_1.CreateMedicationDto) {
}
exports.UpdateMedicationDto = UpdateMedicationDto;
//# sourceMappingURL=update-medication.dto.js.map