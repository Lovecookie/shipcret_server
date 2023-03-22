import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { FDatabaseConstants } from 'src/database/database.constants';
import { FUserRepository } from 'src/database/repositorys/user.repository';
import { FLoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FAccessTokenDto } from './dto/access.token.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(FDatabaseConstants.USER_REPOSITORY)
        private readonly usersRepository: FUserRepository,
        private jwtService: JwtService
    ) {}

    async jwtSign(requestDto: FLoginRequestDto): Promise<FAccessTokenDto> {
        const userEntity = await this.usersRepository.findOneByEmail(
            requestDto.email
        );
        if (!userEntity) {
            throw new UnauthorizedException(
                'Please check your email and password.'
            );
        }

        const isValidated = await bcrypt.compare(
            requestDto.password,
            userEntity.password
        );
        if (!isValidated) {
            throw new UnauthorizedException(
                'Please check your email and password.'
            );
        }

        const payload = { email: userEntity.email, sub: userEntity.useruuid };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
