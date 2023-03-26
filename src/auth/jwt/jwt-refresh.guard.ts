import { AuthGuard } from '@nestjs/passport';
import { FCommonConstants } from 'src/common/common.constants';

export class JwtRefreshGuard extends AuthGuard(
    FCommonConstants.JWT_TOKEN_REFRESH
) {}
