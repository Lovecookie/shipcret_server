import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
    FVerifyRefreshUser,
    FVerifyUser
} from 'src/common/decorators/jwt-token-verify-user.decorator';
import { AuthService } from './auth.service';
import { FRefreshUserDto } from './dto/refresh-token.dto';
import { FSignInUserDto } from './dto/signIn-user.dto';
import { FSignUpUserDto } from './dto/signUp-user.dto';
import { FVerifyUserDto } from './dto/verify-user.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JwtRefreshGuard } from './jwt/jwt-refresh.guard';
import { FJwtToken } from './jwt/jwt-tokens';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() signUpUserDto: FSignUpUserDto): Promise<FJwtToken> {
        return await this.authService.signUp(signUpUserDto);
    }

    @Post('signin')
    async signIn(@Body() signInUserDto: FSignInUserDto): Promise<FJwtToken> {
        return await this.authService.signIn(signInUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@FVerifyUser() verifyUser: FVerifyUserDto): Promise<void> {
        return await this.authService.logout(verifyUser);
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh-token')
    async refreshToken(
        @FVerifyRefreshUser() refreshUser: FRefreshUserDto
    ): Promise<FJwtToken> {
        return await this.authService.refreshTokens(
            refreshUser.useruuid,
            refreshUser.refreshToken
        );
    }
}
