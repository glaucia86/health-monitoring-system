"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExamDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_exam_dto_1 = require("./create-exam.dto");
class UpdateExamDto extends (0, mapped_types_1.PartialType)(create_exam_dto_1.CreateExamDto) {
}
exports.UpdateExamDto = UpdateExamDto;
//# sourceMappingURL=update-exam.dto.js.map