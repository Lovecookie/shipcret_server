import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { customUserProvider } from 'src/database/providers/user.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [DatabaseModule, forwardRef(() => AuthModule)],
    providers: [...customUserProvider, UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}
