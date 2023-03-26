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
import { FVerifyUser } from 'src/common/decorators/jwt-token-verify-user.decorator';
import { FAccessTokenDto } from 'src/auth/dto/access-token.dto';
import { IsPublicAuth } from 'src/auth/jwt/jwt.public';

@UseInterceptors(TransformInterceptor)
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Get('get-user-info')
    async getUserInfo(): Promise<string> {
        return 'getUserInfo';
    }

    // @ApiOperation({ summary: 'Create user' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'success',
    //     type: FResponseUserDto
    // })
    // @Post('signup')
    // async signUp(
    //     @Body() signUpUserDto: FSignUpUserDto
    // ): Promise<FResponseUserDto> {
    //     return await this.usersService.create(signUpUserDto);
    // }

    // @ApiOperation({ summary: 'Sign in' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'success',
    //     type: FAccessTokenDto
    // })
    // @Post('signin')
    // async signIn(
    //     @Body() requestDto: FLoginRequestDto
    // ): Promise<FAccessTokenDto> {
    //     return await this.authService.signIn(requestDto);
    // }

    // @ApiOperation({ summary: 'Get user by id' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'success'
    // })
    // @Get()
    // async GetUser(@FVerifyUser() user) {
    //     console.log(user);
    //     return user;
    // }
}
