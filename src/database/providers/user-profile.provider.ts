import { DataSource } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { _customUserProfileRepository } from '../repositorys/user-profile.repository';
import { FUserProfileEntity } from '../entitys/user-profile.entity';

export const customUserProfileProvider = [
    {
        provide: FDatabaseConstants.USER_PROFILE_REPOSITORY,
        inject: [FDatabaseConstants.DATA_SOURCE],
        useFactory: (dataSource: DataSource) =>
            dataSource
                .getRepository(FUserProfileEntity)
                .extend(_customUserProfileRepository)
    }
];
