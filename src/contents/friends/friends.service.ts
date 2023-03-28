import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { FGetJwtUserDto } from 'src/auth/dto/get-jwt-user.dto';
import { FDatabaseConstants } from 'src/database/database.constants';
import { FFriendEntity } from 'src/database/entitys/friend.entity';
import { FFriendRepository } from 'src/database/repositorys/friend.repository';
import { FeedsService } from '../feeds/feeds.service';
import { UsersService } from '../users/users.service';
import { FRequestRegistFriendDto } from './dto/request-regist-friend.dto';

@Injectable()
export class FriendsService {
    constructor(
        @Inject(FDatabaseConstants.FRIEND_REPOSITORY)
        private readonly friendRepository: FFriendRepository,
        private readonly usersService: UsersService
    ) {}

    async getFriends(useruuid: string): Promise<FFriendEntity[]> {
        const foundEntitys = await this.friendRepository.findBy({
            useruuid
        });

        return foundEntitys;
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
