import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.model';

class UserMapper {
    static fromDto(dto: UserDto): User {
        return {
            id: dto.id,
            code: dto.code,
            firstName: dto.first_name,
            lastName: dto.last_name,
            username: dto.username,
            email: dto.email,
            lastLogin: dto.last_login_at ? new Date(dto.last_login_at) : null,
        };
    }

    static toDto(user: User): UserDto {
        return {
            id: user.id,
            code: user.code,
            first_name: user.firstName,
            last_name: user.lastName,
            username: user.username,
            email: user.email,
            last_login_at: user.lastLogin?.toISOString() || null
        };
    }
}

export { UserMapper }