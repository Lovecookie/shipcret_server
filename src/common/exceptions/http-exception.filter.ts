import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        const status = exception.getStatus();
        const error = exception.getResponse() as
            | string
            | { error: string; statusCode: number; message: string | string[] };

        if (typeof error === 'string') {
            response.status(status).json({
                statusCode: status,
                success: false,
                timestamp: new Date().toISOString(),
                path: request.url,
                error,
            });
        } else {
            response.status(status).json({
                statusCode: status,
                success: false,
                timestamp: new Date().toISOString(),
                ...error,
            });
        }
    }
}
