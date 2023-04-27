import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { DatabaseModule } from 'src/database/database.module';
import { customUserStateProvider } from 'src/database/providers/user-state.provider.';
import { customUserProvider } from 'src/database/providers/user.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { customUserProfileProvider } from 'src/database/providers/user-profile.provider';

@Module({
    imports: [DatabaseModule, forwardRef(() => AuthModule)],
    providers: [
        ...customUserProvider,
        ...customUserStateProvider,
        ...customUserProfileProvider,
        UsersService
    ],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}
