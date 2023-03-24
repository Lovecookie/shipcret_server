import { DataSource } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { FUserStateEntity } from '../entitys/user-state.entity';
import { _customUserStateRepository } from '../repositorys/user-state.repository';

export const customUserStateProvider = [
    {
        provide: FDatabaseConstants.USER_STATE_REPOSITORY,
        inject: [FDatabaseConstants.DATA_SOURCE],
        useFactory: (dataSource: DataSource) =>
            dataSource
                .getRepository(FUserStateEntity)
                .extend(_customUserStateRepository)
    }
];
