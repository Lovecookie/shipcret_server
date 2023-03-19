import { Module } from '@nestjs/common';
import { accountdbProviders } from './database.provider';

@Module({
    providers: [...accountdbProviders],
    exports: [...accountdbProviders],
})
export class DatabaseModule {}
