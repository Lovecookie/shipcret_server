import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FSignUpUserDto } from './dto/signUp.user.dto';
import { UsersService as UsersService } from './users.service';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FResponseUserDto } from './dto/response.user.dto';
import { AuthService as AuthService } from 'src/auth/auth.service';
import { FLoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { FUserDecorator } from 'src/common/decorators/user.decorator';

@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: [FResponseUserDto],
    })
    @Post('signup')
    async signUp(
        @Body() signUpUserDto: FSignUpUserDto,
    ): Promise<FResponseUserDto> {
        return await this.usersService.create(signUpUserDto);
    }

    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseUserDto,
    })
    @Post('signin')
    async signIn(@Body() requestDto: FLoginRequestDto): Promise<any> {
        return await this.authService.jwtSign(requestDto);
    }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseUserDto,
    })
    @UseGuards(JwtAuthGuard)
    @Get()
    async findOne(@FUserDecorator() user): Promise<FResponseUserDto> {
        return FResponseUserDto.fromUser(user);
    }
}
