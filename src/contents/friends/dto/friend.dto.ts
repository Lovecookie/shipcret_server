import { PickType } from '@nestjs/swagger';
import { FUserDto } from 'src/contents/users/dto/user.dto';
import { FFriendEntity } from 'src/database/entitys/friend.entity';

export class FFriendDto extends PickType(FUserDto, [
    'useruuid',
    'name'
] as const) {
    static fromUser(friendEntity: FFriendEntity) {
        return new FFriendDto({
            useruuid: friendEntity.useruuid
        });
    }
}
