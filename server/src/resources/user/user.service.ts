import userModel from '@/resources/user/user.model';
import User from '@/resources/user/user.interface';

class UserService {
    private user = userModel;

    public async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.user.find();
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

    public async updateUserById(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        mobile: string,
    ): Promise<User> {
        try {
            //check if email exists
            if (email) {
                const emailExists = await this.user.findOne({ email });
                if (emailExists) throw new Error();
            }

            //check if mobile exists
            if (mobile) {
                const mobileExists = await this.user.findOne({ mobile });
                if (mobileExists) throw new Error();
            }

            //update user
            const user = await this.user.findByIdAndUpdate(
                id,
                {
                    ...(firstName && { firstName }),
                    ...(lastName && { lastName }),
                    ...(email && { email }),
                    ...(mobile && { mobile }),
                },
                { new: true },
            );
            if (!user) throw new Error();
            return user;
        } catch (error) {
            throw new Error('Error updating user');
        }
    }

    public async deleteUserById(id: string): Promise<User> {
        try {
            const user = await this.user.findByIdAndDelete(id);
            if (!user) throw new Error();
            return user;
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }

    public async deleteAllUsers(): Promise<void> {
        try {
            await this.user.deleteMany();
        } catch (error) {
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
            const user = await this.user.findByIdAndUpdate(
                id,
                { role },
                { new: true },
            );
            if (!user) throw new Error();
            return user;
        } catch (error) {
            throw new Error('Error updating user role');
        }
    }
}

export default UserService;
