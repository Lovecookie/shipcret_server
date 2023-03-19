import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserRole } from '../../database/entitys/users.entity';

export class UserStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [UserRole.ADMIN, UserRole.NORMAL];

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}
