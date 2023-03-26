import { SetMetadata } from '@nestjs/common';
import { FCommonConstants } from 'src/common/common.constants';

export const IsPublicAuth = () => SetMetadata(FCommonConstants.IS_PUBLIC, true);
