import { Repository } from 'typeorm';
import { FUserEntity } from '../entitys/users.entity';

/**
 * Creating and Using Custom Repositories in NestJS with TypeORM 0.3
 * @see https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
 */

export interface FUserRepository extends Repository<FUserEntity> {
    this: Repository<FUserEntity>;

    findOneById(useruuid: string): Promise<FUserEntity>;
    findOneByEmail(email: string): Promise<FUserEntity>;
    findDeleted(useruuid: string): Promise<void>;
}

export const _customUserRepository: Pick<FUserRepository, any> = {
    findOneById: async function (useruuid: string): Promise<FUserEntity> {
        return await this.createQueryBuilder()
            .where('useruuid = :useruuid', { useruuid })
            .select()
            .getOne();
    },
    findOneByEmail: async function (email: string): Promise<FUserEntity> {
        return await this.createQueryBuilder()
            .where('email = :email', { email })
            .select()
            .getOne();
    },
    findDeleted: async function (useruuid: string): Promise<void> {
        return await this.createQueryBuilder()
            .where('useruuid = :useruuid', { useruuid })
            .delete()
            .execute();
    }
};
