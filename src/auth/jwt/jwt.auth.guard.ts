import {
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FCommonConstants } from 'src/common/common.constants';

//* JWT 인증을 위한 Guard
//* guard -> strategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            FCommonConstants.IS_PUBLIC,
            [context.getHandler(), context.getClass()]
        );
        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }

    handleRequest(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
        status?: any
    ) {
        if (err || !user) {
            throw new UnauthorizedException('jwt is invalid!');
        }
        return user;
    }
}
