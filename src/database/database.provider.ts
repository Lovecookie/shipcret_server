import { ConfigService } from '@nestjs/config';
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
        useFactory: async (configServuce: ConfigService) => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: configServuce.get('MYSQL_HOST'),
                port: configServuce.get('MYSQL_PORT'),
                username: configServuce.get('MYSQL_USER'),
                password: configServuce.get('MYSQL_PASSWORD'),
                database: configServuce.get('ACCOUNT_DB'),
                entities: [FUserEntity],
                synchronize: !(configServuce.get('SERVER_MODE') == 'dev'),
                logging:
                    configServuce.get('SERVER_MODE') == 'dev' ? false : 'all',
            });

            return dataSource.initialize();
        },
        inject: [ConfigService],
    },
];
