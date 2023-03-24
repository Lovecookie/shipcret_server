import { Repository } from 'typeorm';
import { FUserStateEntity } from '../entitys/user-state.entity';

export interface FUserStateRepository extends Repository<FUserStateEntity> {
    this: Repository<FUserStateEntity>;

    findOneByUseruuid(useruuid: string): Promise<FUserStateEntity>;
}

export const _customUserStateRepository: Pick<FUserStateRepository, any> = {
    findOneByUseruuid: async function (useruuid: string) {
        return this.createQueryBuilder()
            .where('useruuid = :useruuid', { useruuid })
            .select()
            .execute();
    }
};
