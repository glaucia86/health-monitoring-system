"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_appointment_dto_1 = require("./create-appointment.dto");
class UpdateAppointmentDto extends (0, mapped_types_1.PartialType)(create_appointment_dto_1.CreateAppointmentDto) {
}
exports.UpdateAppointmentDto = UpdateAppointmentDto;
//# sourceMappingURL=update-appointment.dto.js.map