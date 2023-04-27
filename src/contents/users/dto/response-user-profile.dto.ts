import { IntersectionType, PickType } from '@nestjs/swagger';
import { FUserDto } from './user.dto';
import { FUserStateDto } from './user-state.dto';
import { FUserProfileDto } from './user-profile.dto';
import { FUserEntity } from 'src/database/entitys/users.entity';
import { FUserStateEntity } from 'src/database/entitys/user-state.entity';
import { FUserProfileEntity } from 'src/database/entitys/user-profile.entity';

export class FResponseUserProfileDto extends IntersectionType(
    PickType(FUserDto, ['useruuid', 'name'] as const),
    PickType(FUserStateDto, ['state'] as const),
    PickType(FUserProfileDto, [
        'followerCount',
        'feedCount',
        'secretCount',
        'showingSecretCount'
    ] as const)
) {
    static fromUserInfo(
        userEntity: FUserEntity,
        userStateEntity: FUserStateEntity,
        userProfileEntity: FUserProfileEntity
    ): FResponseUserProfileDto {
        return {
            ...userEntity,
            ...userStateEntity,
            ...userProfileEntity
        };
    }
}
