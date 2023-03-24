import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FResponseUserDto } from 'src/contents/users/dto/response-user.dto';

export const ToResponseUserDto = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (request.user) {
            return FResponseUserDto.fromUser(request.user);
        } else {
            return null;
        }
    }
);
