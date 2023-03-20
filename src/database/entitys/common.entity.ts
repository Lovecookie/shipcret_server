import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class FCommonEntity {
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
