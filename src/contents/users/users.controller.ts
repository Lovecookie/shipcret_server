import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FSignUpUserDto } from './dto/signUp-user.dto';
import { UsersService as UsersService } from './users.service';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FResponseUserDto } from './dto/response-user.dto';
import { AuthService as AuthService } from 'src/auth/auth.service';
import { FLoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { ToResponseUserDto } from 'src/common/decorators/user.decorator';
import { FAccessTokenDto } from 'src/auth/dto/access.token.dto';

@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseUserDto
    })
    @Post('signup')
    async signUp(
        @Body() signUpUserDto: FSignUpUserDto
    ): Promise<FResponseUserDto> {
        return await this.usersService.create(signUpUserDto);
    }

    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: FAccessTokenDto
    })
    @Post('signin')
    async signIn(
        @Body() requestDto: FLoginRequestDto
    ): Promise<FAccessTokenDto> {
        return await this.authService.jwtSign(requestDto);
    }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseUserDto
    })
    @UseGuards(JwtAuthGuard)
    @Get()
    async GetUser(
        @ToResponseUserDto() responseUserDto
    ): Promise<FResponseUserDto> {
        return responseUserDto;
    }
}
