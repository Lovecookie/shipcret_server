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
import { FRequestDeleteFriendDto } from './dto/request-delete-friend.dto';
import { FRequestRegistFriendDto } from './dto/request-regist-friend.dto';
import { FriendsService } from './friends.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @ApiResponse({
        status: 200,
        description: 'success'
    })
    @Post('regist-friend')
    async registFriend(
        @FGetUser() getUser,
        @Body() requestDto: FRequestRegistFriendDto
    ): Promise<FResponseUserDto> {
        const foundEntity = await this.friendsService.registFriend(
            getUser,
            requestDto
        );

        return FResponseUserDto.fromUser(foundEntity);
    }

    @Post('delete-friend')
    async deleteFriend(
        @FGetUser() getUser,
        @Body() requestDto: FRequestDeleteFriendDto
    ): Promise<boolean> {
        await this.friendsService.deleteFriend(getUser, requestDto);

        return true;
    }

    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseUserDto
    })
    @Get('my-friends')
    async getMyFriends(@FGetUser() getUser): Promise<FResponseUserDto[]> {
        const userEntitys = await this.friendsService.getFriends(getUser);
        if (userEntitys.length > 0) {
            return userEntitys.map((userEntity) =>
                FResponseUserDto.fromUser(userEntity)
            );
        }

        return [];
    }
}
