import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { FCommonEntity } from './common.entity';

@Entity({
    database: FDatabaseConstants.accountdb(),
    name: FDatabaseConstants.USER_STATE_TABLE,
    engine: 'InnoDB',
    orderBy: {
        useruuid: 'ASC'
    }
})
export class FUserStateEntity extends FCommonEntity {
    @PrimaryColumn({ type: 'bigint', nullable: false })
    @IsNotEmpty()
    useruuid: string;

    @Column({ type: 'tinyint', nullable: false, default: 0 })
    @IsNotEmpty()
    state: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    lastActivateTime: Date;

    @Column({ type: 'int', nullable: false, default: 0 })
    @IsNotEmpty()
    myFriendCount: number;

    @Column({ type: 'int', nullable: false, default: 0 })
    @IsNotEmpty()
    myBestFriendCount: number;
}
