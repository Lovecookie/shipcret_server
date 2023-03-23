import { IsNotEmpty } from 'class-validator';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { FCommonEntity } from './common.entity';

@Entity({
    database: FDatabaseConstants.accountdb(),
    name: FDatabaseConstants.FRIENDS_TABLE,
    engine: 'InnoDB',
    orderBy: {
        useruuid: 'ASC'
    }
})
export class FFriendsEntity extends FCommonEntity {
    @PrimaryColumn({ type: 'bigint', nullable: false })
    @IsNotEmpty()
    useruuid: string;

    @PrimaryColumn({ type: 'bigint', nullable: false })
    @Index('frienduuid-non-idx')
    @IsNotEmpty()
    frienduuid: string;
}
