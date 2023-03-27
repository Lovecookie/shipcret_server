import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FCommonConstants } from 'src/common/common.constants';

export class JwtRefreshGuard extends AuthGuard(
    FCommonConstants.JWT_TOKEN_REFRESH
) {
    handleRequest(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
        status?: any
    ) {
        if (err || !user) {
            throw new UnauthorizedException(
                `jwt refresh token is invalid! ${err}`
            );
        }
        return user;
    }
}
