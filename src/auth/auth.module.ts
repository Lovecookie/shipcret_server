import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { customUserProvider } from 'src/database/providers/user.provider';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

/**
 * @see https://velog.io/@daep93/Nestjs-secretOrPrivateKey-must-have-a-value
 */
@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1d' }
            })
        }),
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        DatabaseModule,
        forwardRef(() => UsersModule)
    ],
    providers: [...customUserProvider, AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
