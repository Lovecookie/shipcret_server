import { PickType } from '@nestjs/swagger';
import { FUserDto } from './user.dto';

export class FSignInUserDto extends PickType(FUserDto, [
    'email',
    'password',
] as const) {}
