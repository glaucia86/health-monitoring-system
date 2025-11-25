"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_patient_dto_1 = require("./create-patient.dto");
class UpdatePatientDto extends (0, mapped_types_1.PartialType)(create_patient_dto_1.CreatePatientDto) {
}
exports.UpdatePatientDto = UpdatePatientDto;
//# sourceMappingURL=update-patient.dto.js.map