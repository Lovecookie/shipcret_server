import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FGetUser } from 'src/common/decorators/jwt-token-verify-user.decorator';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { FRequestRegistFriendDto } from './dto/request-regist-friend.dto';
import { FriendsService } from './friends.service';

@Controller('friends')
@UseInterceptors(TransformInterceptor)
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @ApiOperation({ summary: 'regist friend' })
    @ApiResponse({
        status: 200,
        description: 'success'
    })
    @Post('registFriend')
    async registFriend(
        @FGetUser() getUser,
        @Body() requestDto: FRequestRegistFriendDto
    ) {
        return await this.friendsService.registFriend(getUser, requestDto);
    }
}
