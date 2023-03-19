import { PickType } from '@nestjs/swagger';
import { FUserDto } from 'src/users/dto/user.dto';

export class FLoginRequestDto extends PickType(FUserDto, [
    'email',
    'password',
] as const) {}
