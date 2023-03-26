import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { DatabaseModule } from 'src/database/database.module';
import { customFeedProvider } from 'src/database/providers/feed.provider';
import { UsersModule } from '../users/users.module';
import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';

@Module({
    imports: [DatabaseModule, UsersModule],
    controllers: [FeedsController],
    providers: [...customFeedProvider, FeedsService],
    exports: [FeedsService]
})
export class FeedsModule {}
