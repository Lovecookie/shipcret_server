import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FGetJwtRefreshUserDto } from 'src/auth/dto/get-jwt-refresh-user.dto';
import { FGetJwtUserDto } from 'src/auth/dto/get-jwt-user.dto';

/**
 * @see https://docs.nestjs.com/custom-decorators
 * @description JWT 토큰 검증 데코레이터
 */

export const FGetUser = createParamDecorator<FGetJwtUserDto>(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (request.user) {
            return FGetJwtUserDto.fromUser(request.user);
        } else {
            return null;
        }
    }
);

export const FGetRefreshUser = createParamDecorator<FGetJwtRefreshUserDto>(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (request.user) {
            return FGetJwtRefreshUserDto.fromRefreshPayload(request.user);
        } else {
            return null;
        }
    }
);
