import { Repository } from 'typeorm';
import { FFriendEntity } from '../entitys/friend.entity';

export interface FFriendRepository extends Repository<FFriendEntity> {
    this: Repository<FFriendEntity>;

    findFriendsByUseruuid(useruuid: string): Promise<FFriendEntity[]>;
    deleteFriendBy(useruuid: string, frienduuid: string): Promise<void>;
}

export const _customFriendRepository: Pick<FFriendRepository, any> = {
    findFriendsByUseruuid: async function (
        useruuid: string
    ): Promise<FFriendEntity[]> {
        return this.createQueryBuilder()
            .where('useruuid = :useruuid', { useruuid })
            .select()
            .getMany();
    },
    deleteFriendBy: async function (
        useruuid: string,
        frienduuid: string
    ): Promise<void> {
        await this.createQueryBuilder()
            .delete()
            .where('useruuid = :useruuid', { useruuid })
            .andWhere('frienduuid = :frienduuid', { frienduuid })
            .execute();
    }
};
