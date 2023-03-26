import { PickType } from '@nestjs/swagger';
import { FUserDto } from '../../contents/users/dto/user.dto';

export class FSignInUserDto extends PickType(FUserDto, [
    'email',
    'password'
] as const) {}
