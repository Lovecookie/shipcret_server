import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { customFeedProvider } from 'src/database/providers/feed.provider';
import { UsersModule } from 'src/users/users.module';
import { FeedsController } from './feeds.controller';
import { FeedService } from './feeds.service';

@Module({
    imports: [DatabaseModule, UsersModule],
    controllers: [FeedsController],
    providers: [...customFeedProvider, FeedService],
    exports: [FeedService]
})
export class FeedsModule {}
