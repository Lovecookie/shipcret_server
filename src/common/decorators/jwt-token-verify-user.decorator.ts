import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FRefreshUserDto } from 'src/auth/dto/refresh-token.dto';
import { FVerifyUserDto } from 'src/auth/dto/verify-user.dto';

/**
 * @see https://docs.nestjs.com/custom-decorators
 * @description JWT 토큰 검증 데코레이터
 */

export const FVerifyUser = createParamDecorator<FVerifyUserDto>(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (request.user) {
            return FVerifyUserDto.fromUser(request.user);
        } else {
            return null;
        }
    }
);

export const FVerifyRefreshUser = createParamDecorator<FRefreshUserDto>(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (request.user) {
            return FRefreshUserDto.fromUser(request.user);
        } else {
            return null;
        }
    }
);
