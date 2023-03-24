import { DataSource } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { FFriendEntity } from '../entitys/friend.entity';
import { _customFriendRepository } from '../repositorys/friend.repository';

export const customFriendProvider = [
    {
        provide: FDatabaseConstants.FRIEND_REPOSITORY,
        inject: [FDatabaseConstants.DATA_SOURCE],
        useFactory: (dataSource: DataSource) =>
            dataSource
                .getRepository(FFriendEntity)
                .extend(_customFriendRepository)
    }
];
