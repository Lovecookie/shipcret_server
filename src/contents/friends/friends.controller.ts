import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { FRequestRegistFriendDto } from './dto/request.regist.friend';
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
    async registFriend(@Body() requestDto: FRequestRegistFriendDto) {
        return await this.friendsService.registFriend(requestDto);
    }
}
