import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { UsersService as UsersService } from './users.service';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FResponseUserDto } from './dto/response-user.dto';
import { AuthService as AuthService } from 'src/auth/auth.service';
import { FLoginRequestDto } from 'src/auth/dto/login-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FGetJwtUser } from 'src/common/decorators/jwt-token-verify-user.decorator';
import { FAccessTokenDto } from 'src/auth/dto/access-token.dto';
import { IsPublicAuth } from 'src/auth/jwt/jwt.public';
import { FResponseUserAndStateDto } from './dto/response-user-and-state.dto';
import { FRequestFindUserDto } from './dto/request-find-user.dto';
import { request } from 'http';

@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @IsPublicAuth()
    @Get('get-user-info')
    async getUserInfo(
        @Body() requestDto: FRequestFindUserDto
    ): Promise<FResponseUserAndStateDto> {
        const [user, userState] = await this.usersService.getUserAndState(
            requestDto.useruuid
        );
        return FResponseUserAndStateDto.fromUser(user, userState);
    }
}
