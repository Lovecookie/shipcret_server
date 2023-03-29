import { forwardRef, Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { FeedsModule } from '../feeds/feeds.module';
import { customFriendProvider } from 'src/database/providers/friend.provider';
import { customUserProvider } from 'src/database/providers/user.provider';

@Module({
    imports: [DatabaseModule, UsersModule, forwardRef(() => FeedsModule)],
    providers: [...customFriendProvider, ...customUserProvider, FriendsService],
    controllers: [FriendsController],
    exports: [FriendsService]
})
export class FriendsModule {}
