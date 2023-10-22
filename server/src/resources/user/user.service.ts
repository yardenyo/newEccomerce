import roleModel from '@/resources/role/role.model';
import User from '@/resources/user/user.interface';
import userModel from '@/resources/user/user.model';
import Roles from '@/utils/enums/roles.enums';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import PostBody from '@/utils/interfaces/postbody.interface';

class UserService {
    private user = userModel;

    public async getAllUsers(body: PostBody): Promise<User[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const users = await this.user
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return users;
        } catch (error) {
            throw new Error('Error getting users');
        }
    }

    public async getUserById(id: string): Promise<User> {
        try {
            const user = await this.user.findById(id);
            if (!user) throw new Error();
            return user;
        } catch (error) {
            throw new Error('Error getting user');
        }
    }

    public async updateUserById(id: string, body: User): Promise<User> {
        try {
            const { firstName, lastName, email, mobile } = body;
            if (email) {
                const emailExists = await this.user.findOne({ email });
                if (emailExists) throw new Error();
            }

            if (mobile) {
                const mobileExists = await this.user.findOne({ mobile });
                if (mobileExists) throw new Error();
            }

            const user = await this.user.findByIdAndUpdate(id, body, {
                new: true,
            });
            if (!user) throw new Error();
            return user;
        } catch (error) {
            throw new Error('Error updating user');
        }
    }

    public async deleteUserById(id: string): Promise<User> {
        try {
            const user = await this.user.findById(id);
            if (!user) throw new Error();

            const userRole = await roleModel.findOne({ name: Roles.USER });
            if (!userRole) throw new Error();

            if (user.role.toString() !== userRole._id.toString())
                throw new Error();

            await this.user.findByIdAndDelete(id);

            return user;
        } catch (error) {
            throw new Error(`Error deleting user`);
        }
    }

    public async deleteAllUsers(): Promise<void> {
        try {
            const userRole = await roleModel.findOne({ name: Roles.USER });
            if (!userRole) throw new Error();

            await this.user.deleteMany({ role: userRole._id });
        } catch (error: any) {
            throw new Error('Error deleting users');
        }
    }

    public async blockUserById(id: string): Promise<User> {
        try {
            const user = await this.user.findByIdAndUpdate(
                id,
                { isBlocked: true },
                { new: true },
            );
            if (!user) throw new Error();
            return user;
        } catch (error) {
            throw new Error('Error blocking user');
        }
    }

    public async unblockUserById(id: string): Promise<User> {
        try {
            const user = await this.user.findByIdAndUpdate(
                id,
                { isBlocked: false },
                { new: true },
            );
            if (!user) throw new Error();
            return user;
        } catch (error) {
            throw new Error('Error unblocking user');
        }
    }

    public async updateRole(id: string, role: string): Promise<User> {
        try {
            const roleExists = await roleModel.findOne({ name: role });
            if (!roleExists) throw new Error();

            const user = await this.user.findByIdAndUpdate(
                id,
                { role: roleExists._id },
                { new: true },
            );
            if (!user) throw new Error();
            return user;
        } catch (error) {
            throw new Error('Error updating role');
        }
    }
}

export default UserService;
