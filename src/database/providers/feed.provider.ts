import { DataSource } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { FFeedEntity } from '../entitys/feeds.entity';
import { _customFeedRepository } from '../repositorys/feed.repository';

export const customFeedProvider = [
    {
        provide: FDatabaseConstants.FEED_REPOSITORY,
        inject: [FDatabaseConstants.DATA_SOURCE],
        useFactory: (database: DataSource) =>
            database.getRepository(FFeedEntity).extend(_customFeedRepository)
    }
];
