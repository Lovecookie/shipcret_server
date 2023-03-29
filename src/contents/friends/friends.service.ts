import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { FGetJwtUserDto } from 'src/auth/dto/get-jwt-user.dto';
import { FDatabaseConstants } from 'src/database/database.constants';
import { FFriendEntity } from 'src/database/entitys/friend.entity';
import { FUserEntity } from 'src/database/entitys/users.entity';
import { FFriendRepository } from 'src/database/repositorys/friend.repository';
import { FUserRepository } from 'src/database/repositorys/user.repository';
import { FeedsService } from '../feeds/feeds.service';
import { UsersService } from '../users/users.service';
import { FRequestRegistFriendDto } from './dto/request-regist-friend.dto';

@Injectable()
export class FriendsService {
    constructor(
        @Inject(FDatabaseConstants.FRIEND_REPOSITORY)
        private readonly friendRepository: FFriendRepository,
        @Inject(FDatabaseConstants.USER_REPOSITORY)
        private readonly userRepository: FUserRepository,
        private readonly usersService: UsersService
    ) {}

    async getFriends(getUser: FGetJwtUserDto): Promise<FUserEntity[]> {
        const foundEntitys = await this.friendRepository.findBy({
            useruuid: getUser.useruuid
        });

        if (foundEntitys.length === 0) {
            return [];
        }

        const userEntitys = await this.userRepository.findByUuids(
            foundEntitys.map((friendEntity) => {
                return friendEntity.frienduuid;
            })
        );

        return userEntitys;
    }

    async getFriendUuids(useruuid: string): Promise<string[]> {
        const foundEntitys = await this.friendRepository.findBy({
            useruuid
        });

        const friendUuids = foundEntitys.map((friendEntity) => {
            return friendEntity.frienduuid;
        });

        return friendUuids;
    }

    async registFriend(
        getUser: FGetJwtUserDto,
        requestDto: FRequestRegistFriendDto
    ) {
        const foundUser = await this.usersService.findByUuid(
            requestDto.frienduuid
        );
        if (!foundUser) {
            throw new UnauthorizedException('User not found!');
        }

        const friendEntity = new FFriendEntity();
        friendEntity.frienduuid = requestDto.frienduuid;
        friendEntity.useruuid = getUser.useruuid;

        await this.friendRepository.save(friendEntity);

        return foundUser;
    }
}
