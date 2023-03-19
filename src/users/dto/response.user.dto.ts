import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { FUserEntity } from 'src/database/entitys/users.entity';
import { FUserDto } from './user.dto';

export class FResponseUserDto extends PickType(FUserDto, [
    'useruuid',
    'name',
    'email',
] as const) {
    static fromUser(userEntity: FUserEntity): FResponseUserDto {
        const user = new FResponseUserDto();
        user.useruuid = userEntity.useruuid;
        user.name = userEntity.name;
        user.email = userEntity.email;
        return user;
    }
}
