import userModel from '@/resources/user/user.model';
import roleModel from '@/resources/role/role.model';
import User from '@/resources/user/user.interface';

class AuthService {
    private user = userModel;
    private role = roleModel;

    public async signup(
        firstName: string,
        lastName: string,
        email: string,
        mobile: string,
        password: string,
        role: string,
    ): Promise<User> {
        try {
            //check if all fields are provided
            if (!firstName || !lastName || !email || !mobile || !password)
                throw new Error();

            //check if email exists
            const emailExists = await this.user.findOne({ email });
            if (emailExists) throw new Error();

            //check if mobile exists
            const mobileExists = await this.user.findOne({ mobile });
            if (mobileExists) throw new Error();

            //check if role exists
            const roleExists = await this.role.findOne({ name: role });
            if (!roleExists) throw new Error();

            //create user
            const user = await this.user.create({
                firstName,
                lastName,
                email,
                mobile,
                password,
                role: roleExists._id,
            });

            return user;
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    public async signin(email: string, password: string): Promise<User> {
        try {
            //check if all fields are provided
            if (!email || !password) throw new Error();

            //check if email exists
            const user = await this.user.findOne({ email });
            if (!user) throw new Error();

            //check if password is correct
            const isValidPassword = await user.isValidPassword(password);
            if (!isValidPassword) throw new Error();

            return user;
        } catch (error) {
            throw new Error('Error signing in');
        }
    }

    public async updateRefreshToken(userId: string, refreshToken: string) {
        try {
            await this.user.updateOne(
                { _id: userId },
                { refreshToken: refreshToken },
            );
        } catch (error) {
            throw new Error('Error updating refresh token');
        }
    }

    public async refreshToken(refreshToken: string): Promise<User> {
        try {
            const user = await this.user.findOne({ refreshToken });
            if (!user) throw new Error();

            return user;
        } catch (error) {
            throw new Error('Error refreshing token');
        }
    }

    public async signout(refreshToken: string): Promise<void> {
        try {
            await this.user.updateOne({ refreshToken }, { refreshToken: null });
        } catch (error) {
            throw new Error('Error signing out');
        }
    }
}

export default AuthService;
