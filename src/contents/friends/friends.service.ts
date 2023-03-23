import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { FRequestRegistFriendDto } from './dto/request.regist.friend';

@Injectable()
export class FriendsService {
    constructor(private readonly usersService: UsersService) {}

    async registFriend(requestDto: FRequestRegistFriendDto) {
        const foundUser = await this.usersService.findOneByUuid(
            requestDto.frienduuid
        );
        if (!foundUser) {
            throw new UnauthorizedException('User not found!');
        }

        return foundUser;
    }
}
