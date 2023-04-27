import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { FCommonEntity } from './common.entity';

@Entity({
    database: FDatabaseConstants.accountdb(),
    name: FDatabaseConstants.USER_PROFILE_TABLE,
    engine: 'InnoDB',
    orderBy: {
        useruuid: 'ASC'
    }
})
export class FUserProfileEntity extends FCommonEntity {
    @PrimaryColumn({ type: 'bigint', nullable: false })
    @IsNotEmpty()
    useruuid: string;

    @Column({ type: 'bigint', nullable: false, default: 0 })
    @IsNotEmpty()
    followerCount: string;

    @Column({ type: 'bigint', nullable: false, default: 0 })
    @IsNotEmpty()
    feedCount: string;

    @Column({ type: 'bigint', nullable: false, default: 0 })
    @IsNotEmpty()
    secretCount: string;

    @Column({ type: 'bigint', nullable: false, default: 0 })
    @IsNotEmpty()
    showingSecretCount: string;
}
