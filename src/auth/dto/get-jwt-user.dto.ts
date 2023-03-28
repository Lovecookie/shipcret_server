import { PickType } from '@nestjs/swagger';
import { FUserDto } from 'src/contents/users/dto/user.dto';
import { FUserEntity } from 'src/database/entitys/users.entity';

export class FGetJwtUserDto extends PickType(FUserDto, [
    'useruuid',
    'name'
] as const) {
    static fromUser(userEntity: FUserEntity): FGetJwtUserDto {
        const verifyUser = new FGetJwtUserDto();
        verifyUser.useruuid = userEntity.useruuid;
        verifyUser.name = userEntity.name;
        return verifyUser;
    }
}
