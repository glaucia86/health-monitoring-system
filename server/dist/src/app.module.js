"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const patients_module_1 = require("./patients/patients.module");
const medications_module_1 = require("./medications/medications.module");
const exams_module_1 = require("./exams/exams.module");
const appointments_module_1 = require("./appointments/appointments.module");
const documents_module_1 = require("./documents/documents.module");
const schedules_module_1 = require("./schedules/schedules.module");
const intakes_module_1 = require("./intakes/intakes.module");
const auth_module_1 = require("./auth/auth.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const notifications_module_1 = require("./notifications/notifications.module");
const chat_module_1 = require("./chat/chat.module");
const common_module_1 = require("./common/common.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            patients_module_1.PatientsModule,
            medications_module_1.MedicationsModule,
            exams_module_1.ExamsModule,
            appointments_module_1.AppointmentsModule,
            documents_module_1.DocumentsModule,
            schedules_module_1.SchedulesModule,
            intakes_module_1.IntakesModule,
            auth_module_1.AuthModule,
            dashboard_module_1.DashboardModule,
            notifications_module_1.NotificationsModule,
            chat_module_1.ChatModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map