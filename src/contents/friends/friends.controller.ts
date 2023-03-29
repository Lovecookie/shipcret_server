import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FGetUser } from 'src/common/decorators/jwt-token-verify-user.decorator';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { FResponseUserAndStateDto } from '../users/dto/response-user-and-state.dto';
import { FResponseUserDto } from '../users/dto/response-user.dto';
import { FFriendDto } from './dto/friend.dto';
import { FRequestRegistFriendDto } from './dto/request-regist-friend.dto';
import { FriendsService } from './friends.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @ApiResponse({
        status: 200,
        description: 'success',
        type: FRequestRegistFriendDto
    })
    @Post('registFriend')
    async registFriend(
        @FGetUser() getUser,
        @Body() requestDto: FRequestRegistFriendDto
    ) {
        return await this.friendsService.registFriend(getUser, requestDto);
    }

    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseUserDto
    })
    @Get('my-friends')
    async getMyFriends(@FGetUser() getUser) {
        const userEntitys = await this.friendsService.getFriends(getUser);
        if (userEntitys.length > 0) {
            return userEntitys.map((userEntity) =>
                FResponseUserDto.fromUser(userEntity)
            );
        }

        return [];
    }
}
