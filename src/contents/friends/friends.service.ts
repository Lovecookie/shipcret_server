import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
        private readonly usersService: UsersService,
        private readonly feedService: FeedsService
    ) {}

    async registFriend(useruuid: string, requestDto: FRequestRegistFriendDto) {
        const foundUser = await this.usersService.findOneByUuid(
            requestDto.frienduuid
        );
        if (!foundUser) {
            throw new UnauthorizedException('User not found!');
        }

        const friendEntity = new FFriendEntity();
        friendEntity.frienduuid = requestDto.frienduuid;
        friendEntity.useruuid = useruuid;

        await this.friendRepository.save(friendEntity);

        return foundUser;
    }
}
