import {
    Body,
    Controller,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {
    FGetRefreshUser,
    FGetUser
} from 'src/common/decorators/jwt-token-verify-user.decorator';
import { AuthService } from './auth.service';
import { FGetJwtRefreshUserDto } from './dto/get-jwt-refresh-user.dto';
import { FSignInUserDto } from './dto/signIn-user.dto';
import { FSignUpUserDto } from './dto/signUp-user.dto';
import { FGetJwtUserDto } from './dto/get-jwt-user.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JwtRefreshGuard } from './jwt/jwt-refresh.guard';
import { FJwtToken } from './jwt/jwt-tokens';
import { TransformSuccessInterceptor } from 'src/common/interceptors/transform-success.interceptor';
import { FSignUserInfoDto } from './dto/sign-user-info.dto';

@UseInterceptors(TransformSuccessInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(
        @Body() signUpUserDto: FSignUpUserDto
    ): Promise<FSignUserInfoDto> {
        return await this.authService.signUp(signUpUserDto);
    }

    @Post('signin')
    async signIn(
        @Body() signInUserDto: FSignInUserDto
    ): Promise<FSignUserInfoDto> {
        return await this.authService.signIn(signInUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@FGetUser() verifyUser: FGetJwtUserDto): Promise<void> {
        return await this.authService.logout(verifyUser);
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh-token')
    async refreshToken(
        @FGetRefreshUser() refreshUser: FGetJwtRefreshUserDto
    ): Promise<FJwtToken> {
        return await this.authService.refreshAccessToken(
            refreshUser.useruuid,
            refreshUser.refreshToken
        );
    }
}
