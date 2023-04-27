import { Repository } from 'typeorm';
import { FUserProfileEntity } from '../entitys/user-profile.entity';

export interface FUserProfileRepository extends Repository<FUserProfileEntity> {
    this: Repository<FUserProfileEntity>;

    findOneByUuid(useruuid: string): Promise<FUserProfileEntity>;
}

export const _customUserProfileRepository: Pick<FUserProfileRepository, any> = {
    findOneByUuid: async function (
        useruuid: string
    ): Promise<FUserProfileEntity> {
        return this.createQueryBuilder()
            .where('useruuid = :useruuid', { useruuid })
            .select()
            .execute();
    }
};
