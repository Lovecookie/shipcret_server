import { DataSource } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { FUserEntity } from '../entitys/users.entity';
import { _customUserRepository } from '../repositorys/user.repository';

/**
 * @description This is the provider for the user repository.
 * @returns The user repository.
 * @see https://docs.nestjs.com/fundamentals/custom-providers
 */

export const customUserProvider = [
    {
        provide: FDatabaseConstants.USER_REPOSITORY,
        inject: [FDatabaseConstants.DATA_SOURCE],
        /**
         * @see https://orkhan.gitbook.io/typeorm/docs/custom-repository
         */
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(FUserEntity).extend(_customUserRepository)
    }
];
