import { SetMetadata } from '@nestjs/common';
import { FCommonConstants } from 'src/common/common.constants';

export const SkipAuthJwt = () => SetMetadata(FCommonConstants.IS_PUBLIC, true);
