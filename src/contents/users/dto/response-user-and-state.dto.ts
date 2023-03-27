import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { FUserStateEntity } from 'src/database/entitys/user-state.entity';
import { FUserEntity } from 'src/database/entitys/users.entity';
import { FUserStateDto } from './user-state.dto';
import { FUserDto } from './user.dto';

export class FResponseUserAndStateDto extends IntersectionType(
    PickType(FUserDto, ['useruuid', 'name'] as const),
    PickType(FUserStateDto, [
        'state',
        'lastActivateTime',
        'myFriendCount',
        'myBestFriendCount'
    ] as const)
) {
    static fromUser(
        userEntity: FUserEntity,
        userStateEntity: FUserStateEntity
    ): FResponseUserAndStateDto {
        const userDto = new FResponseUserAndStateDto();
        userDto.useruuid = userEntity.useruuid;
        userDto.name = userEntity.name;
        userDto.state = userStateEntity.state;
        userDto.lastActivateTime = userStateEntity.lastActivateTime;
        userDto.myFriendCount = userStateEntity.myFriendCount;
        userDto.myBestFriendCount = userStateEntity.myBestFriendCount;

        return userDto;
    }
}
