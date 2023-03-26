import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { FDatabaseConstants } from 'src/database/database.constants';
import { FUserRepository } from 'src/database/repositorys/user.repository';
import { FLoginRequestDto } from './dto/login-request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FAccessTokenDto } from './dto/access-token.dto';
import { FJwtToken } from './jwt/jwt-tokens';
import { FJwtPayload } from './jwt/jwt.payload';
import { FCommonConstants } from 'src/common/common.constants';
import { FVerifyUserDto } from './dto/verify-user.dto';
import { FSignUpUserDto } from './dto/signUp-user.dto';
import { FSignInUserDto } from './dto/signIn-user.dto';
import { EUserRole, FUserEntity } from 'src/database/entitys/users.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject(FDatabaseConstants.USER_REPOSITORY)
        private readonly usersRepository: FUserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(signUpUserDto: FSignUpUserDto): Promise<FJwtToken> {
        const foundUserEntity = await this.usersRepository.findOneByEmail(
            signUpUserDto.email
        );

        if (foundUserEntity) {
            throw new UnauthorizedException('email already exists');
        }

        const hashedPassword = await bcrypt.hash(signUpUserDto.password, 10);

        const userEntity = await this.usersRepository.save({
            ...signUpUserDto,
            password: hashedPassword,
            role: EUserRole.NORMAL
        });

        const tokens = await this.createToken(
            userEntity.useruuid,
            userEntity.email
        );

        console.log(`=========> ${tokens}`);

        await this.updateRefreshToken(userEntity.useruuid, tokens.refreshToken);

        return tokens;
    }

    async signIn(signInDto: FSignInUserDto): Promise<FJwtToken> {
        const foundUserEntity = await this.usersRepository.findOneByEmail(
            signInDto.email
        );

        if (!foundUserEntity) {
            throw new UnauthorizedException(
                'Please check your email and password.'
            );
        }

        const isValidated = await bcrypt.compare(
            signInDto.password,
            foundUserEntity.password
        );
        if (!isValidated) {
            throw new UnauthorizedException(
                'Please check your email and password.'
            );
        }

        const tokens = await this.createToken(
            foundUserEntity.useruuid,
            foundUserEntity.email
        );
        await this.updateRefreshToken(
            foundUserEntity.useruuid,
            tokens.refreshToken
        );

        return tokens;
    }

    async logout(verifyUser: FVerifyUserDto): Promise<void> {
        await this.updateRefreshTokenNull(verifyUser.useruuid);
    }

    async refreshTokens(
        useruuid: string,
        refreshToken: string
    ): Promise<FJwtToken> {
        const user = await this.usersRepository.findOneBy({ useruuid });
        if (!user || !user.refreshToken) {
            throw new UnauthorizedException('access denied');
        }

        const tokenMatches = await bcrypt.compare(
            refreshToken,
            user.refreshToken
        );
        if (!tokenMatches) {
            throw new UnauthorizedException('access denied');
        }

        const tokens = await this.createToken(user.useruuid, user.email);
        await this.updateRefreshToken(user.useruuid, tokens.refreshToken);

        return tokens;
    }

    async updateRefreshToken(useruuid: string, token: string): Promise<void> {
        const hashedRefreshToken = await bcrypt.hash(token, 10);

        await this.usersRepository
            .createQueryBuilder()
            .where('useruuid = :useruuid', { useruuid })
            .update()
            .set({ refreshToken: hashedRefreshToken })
            .execute();
    }

    async updateRefreshTokenNull(useruuid: string): Promise<void> {
        await this.usersRepository
            .createQueryBuilder()
            .where('useruuid = :useruuid', { useruuid })
            .update()
            .set({ refreshToken: null })
            .execute();
    }

    async refreshAccessToken(
        useruuid: string,
        email: string,
        refreshToken: string
    ): Promise<FJwtToken> {
        const payload: FJwtPayload = {
            iss: email,
            sub: useruuid
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME
        });

        return {
            accessToken,
            refreshToken
        };
    }

    async createToken(useruuid: string, email: string): Promise<FJwtToken> {
        const payload: FJwtPayload = {
            iss: email,
            sub: useruuid
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME
            })
        ]);

        return {
            accessToken,
            refreshToken
        };
    }
}
