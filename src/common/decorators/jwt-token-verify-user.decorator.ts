import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FJwtRefreshUserDto } from 'src/auth/dto/refresh-token.dto';
import { FJwtUser } from 'src/auth/dto/jwt-user.dto';

/**
 * @see https://docs.nestjs.com/custom-decorators
 * @description JWT 토큰 검증 데코레이터
 */

export const FGetJwtUser = createParamDecorator<FJwtUser>(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (request.user) {
            return FJwtUser.fromUser(request.user);
        } else {
            return null;
        }
    }
);

export const FGetJwtRefreshUser = createParamDecorator<FJwtRefreshUserDto>(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (request.user) {
            return FJwtRefreshUserDto.fromRefreshPayload(request.user);
        } else {
            return null;
        }
    }
);
