import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { UsersService as UsersService } from './users.service';
import { TransformSuccessInterceptor } from 'src/common/interceptors/transform-success.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FGetUser } from 'src/common/decorators/jwt-token-verify-user.decorator';
import { FAccessTokenDto } from 'src/auth/dto/access-token.dto';
import { IsPublicAuth } from 'src/auth/jwt/jwt.public';
import { FResponseUserAndStateDto } from './dto/response-user-and-state.dto';
import { FRequestFindUserDto } from './dto/request-find-user.dto';
import { request } from 'http';
import { FResponseUserProfileDto } from './dto/response-user-profile.dto';

@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformSuccessInterceptor)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @IsPublicAuth()
    @Get('find-user')
    async findUser(
        @Body() requestDto: FRequestFindUserDto
    ): Promise<FResponseUserAndStateDto> {
        const [user, userState] = await this.usersService.getUserAndState(
            requestDto.useruuid
        );
        return FResponseUserAndStateDto.fromUser(user, userState);
    }

    @Get('my-info')
    async myInfo(@FGetUser() getUser): Promise<FResponseUserAndStateDto> {
        const [user, userState] = await this.usersService.getUserAndState(
            getUser.useruuid
        );

        return FResponseUserAndStateDto.fromUser(user, userState);
    }

    @Get('my-profile')
    async myProfile(@FGetUser() getUser): Promise<FResponseUserProfileDto> {
        return await this.usersService.getUserProfile(getUser.useruuid);
    }
}
