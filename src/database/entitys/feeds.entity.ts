import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { FCommonEntity } from './common.entity';

@Entity({
    database: FDatabaseConstants.accountdb(),
    name: FDatabaseConstants.FEEDS_TABLE,
    engine: 'InnoDB',
    orderBy: {
        feeduuid: 'DESC'
    }
})
export class FFeedEntity extends FCommonEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', comment: 'Feed UUID' })
    @IsNotEmpty()
    feeduuid: string;

    @Column({
        type: 'varchar',
        length: 120,
        comment: 'Feed Title',
        nullable: false
    })
    @IsNotEmpty()
    title: string;

    @Column({ type: 'text', comment: 'Feed Content', nullable: false })
    @IsNotEmpty()
    content: string;

    @Column({ type: 'text', comment: 'Feed content url', nullable: false })
    @IsNotEmpty()
    contentUrl: string;

    @Column({ type: 'int', comment: 'Feed View Count', default: 0 })
    @IsNotEmpty()
    viewCount: number;

    @Column({ type: 'int', comment: 'Feed Like Count', default: 0 })
    @IsNotEmpty()
    likeCount: number;

    @Column({ type: 'bigint', comment: 'User UUID', nullable: false })
    @IsNotEmpty()
    useruuid: string;
}
