import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FDatabaseConstants } from '../database.constants';

@Entity({
    database: FDatabaseConstants.accountdb(),
    name: FDatabaseConstants.USERS,
    engine: 'InnoDB',
    orderBy: {
        useruuid: 'ASC',
    },
})
export class FUserEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @IsNotEmpty()
    useruuid: string;

    @Column({ length: 30 })
    @IsNotEmpty()
    name: string;

    @Column({ length: 30, unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({ length: 128 })
    @Exclude()
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @Column({ length: 20 })
    @Exclude()
    @IsNotEmpty()
    role: string;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    NORMAL = 'NORMAL',
}
