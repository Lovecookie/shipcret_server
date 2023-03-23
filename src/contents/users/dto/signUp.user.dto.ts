import { PickType } from '@nestjs/swagger/dist';
import { FUserDto } from './user.dto';

export class FSignUpUserDto extends PickType(FUserDto, [
    'name',
    'email',
    'password',
] as const) {}
