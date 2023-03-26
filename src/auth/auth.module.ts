import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/contents/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { customUserProvider } from 'src/database/providers/user.provider';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './jwt/jwt-auth.strategy';
import { AuthController } from './auth.controller';
import { JwtRefreshStrategy } from './jwt/jwt-refresh.strategy';

/**
 * @see https://velog.io/@daep93/Nestjs-secretOrPrivateKey-must-have-a-value
 */
@Module({
    imports: [
        JwtModule.register({}),
        // PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        DatabaseModule,
        forwardRef(() => UsersModule)
    ],
    controllers: [AuthController],
    providers: [
        ...customUserProvider,
        AuthService,
        JwtAuthStrategy,
        JwtRefreshStrategy
    ],
    exports: [AuthService]
})
export class AuthModule {}
