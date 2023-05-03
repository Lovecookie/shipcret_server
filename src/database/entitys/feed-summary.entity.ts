import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { FCommonEntity } from './common.entity';

export class FFeedSummaryEntity {
    // @PrimaryGeneratedColumn({ type: 'bigint', comment: 'Feed UUID' })
    @IsNotEmpty()
    feeduuid: string;

    // @Column({ type: 'text', comment: 'Feed content url', nullable: false })
    @IsNotEmpty()
    contentUrl: string;

    // @Column({ type: 'bigint', comment: 'User UUID', nullable: false })
    @IsNotEmpty()
    useruuid: string;
}
