import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [FriendsService],
    controllers: [FriendsController],
    exports: [FriendsService]
})
export class FriendsModule {}
