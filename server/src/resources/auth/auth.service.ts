import userModel from '@/resources/user/user.model';
import User from '@/resources/user/user.interface';

class AuthService {
    private user = userModel;

    public async signup(
        firstName: string,
        lastName: string,
        email: string,
        mobile: string,
        password: string,
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

            //create user
            const user = await this.user.create({
                firstName,
                lastName,
                email,
                mobile,
                password,
            });
            return user;
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    // public async login(email: string, password: string): Promise<User> {
    //     try {
    //         const user = await this.user.findOne({ email });
    //         if (!user) throw new Error('User not found');
    //         const isMatch = await user.comparePassword(password);
    //         if (!isMatch) throw new Error('Incorrect password');
    //         return user;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }
}

export default AuthService;
