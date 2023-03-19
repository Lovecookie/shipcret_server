import { FCommonConstants } from 'src/common/common.constants';
import { DataSource } from 'typeorm';
import { FDatabaseConstants } from './database.constants';
import { FUserEntity } from './entitys/users.entity';

/**
 * @description This is the provider for the account database.
 */
export const accountdbProviders = [
    {
        provide: FDatabaseConstants.DATA_SOURCE,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: parseInt(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.ACCOUNT_DB,
                entities: [FUserEntity],
                synchronize: !FCommonConstants.isProduction(),
                logging: FCommonConstants.isProduction() ? false : 'all',
            });

            return dataSource.initialize();
        },
    },
];
