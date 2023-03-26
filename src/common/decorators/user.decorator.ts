import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FVerifyUserDto } from 'src/auth/dto/verify-user.dto';

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
