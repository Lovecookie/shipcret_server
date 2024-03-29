import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';
import { FCommonEntity } from './common.entity';

export enum EUserRole {
    ADMIN = 'ADMIN',
    NORMAL = 'NORMAL'
}

@Entity({
    database: FDatabaseConstants.accountdb(),
    name: FDatabaseConstants.USERS_TABLE,
    engine: 'InnoDB',
    orderBy: {
        useruuid: 'ASC'
    }
})
export class FUserEntity extends FCommonEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', comment: 'User UUID' })
    @IsNotEmpty()
    useruuid: string;

    @Column({ type: 'varchar', length: 30, nullable: false })
    @IsNotEmpty()
    name: string;

    @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({ type: 'varchar', length: 128, nullable: false })
    @Exclude()
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    @IsNotEmpty()
    refreshToken: string;

    @Column({ type: 'varchar', length: 10, nullable: false })
    @Exclude()
    @IsNotEmpty()
    role: string;
}
