"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let LoggingInterceptor = class LoggingInterceptor {
    logger = new common_1.Logger('HTTP');
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body } = request;
        const userAgent = request.get('user-agent') || '';
        const userId = request.user?.userId || 'anonymous';
        const now = Date.now();
        this.logger.log({
            message: 'Incoming Request',
            method,
            url,
            userId,
            userAgent,
            body: this.sanitizeBody(body),
        });
        return next.handle().pipe((0, operators_1.tap)({
            next: (data) => {
                const response = context.switchToHttp().getResponse();
                const { statusCode } = response;
                const responseTime = Date.now() - now;
                this.logger.log({
                    message: 'Request Completed',
                    method,
                    url,
                    userId,
                    statusCode,
                    responseTime: `${responseTime}ms`,
                });
            },
            error: (error) => {
                const response = context.switchToHttp().getResponse();
                const { statusCode } = response;
                const responseTime = Date.now() - now;
                this.logger.error({
                    message: 'Request Failed',
                    method,
                    url,
                    userId,
                    statusCode,
                    responseTime: `${responseTime}ms`,
                    error: error.message,
                });
            },
        }));
    }
    sanitizeBody(body) {
        if (!body)
            return body;
        const sanitized = { ...body };
        const sensitiveFields = ['password', 'token', 'secret', 'authorization'];
        sensitiveFields.forEach((field) => {
            if (sanitized[field]) {
                sanitized[field] = '***REDACTED***';
            }
        });
        return sanitized;
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map