import { PickType } from '@nestjs/swagger/dist';
import { FUserDto } from 'src/contents/users/dto/user.dto';

export class FSignUpUserDto extends PickType(FUserDto, [
    'name',
    'email',
    'password'
] as const) {}
