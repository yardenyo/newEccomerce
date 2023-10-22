import roleModel from '@/resources/role/role.model';
import User from '@/resources/user/user.interface';
import userModel from '@/resources/user/user.model';
import redisClient from '@/utils/config/redisConfig';
import sendEmail from '@/utils/helpers/sendEmail';
import { generateToken } from '@/utils/jwtToken';
import { generateRefreshToken } from '@/utils/refreshToken';
import crypto from 'crypto';

class AuthService {
    private user = userModel;
    private role = roleModel;
    private redis = redisClient;

    public async signup(body: User, role: string): Promise<User> {
        try {
            const { firstName, lastName, email, mobile, password } = body;
            const emailExists = await this.user.findOne({ email });
            if (emailExists) throw new Error();

            const mobileExists = await this.user.findOne({ mobile });
            if (mobileExists) throw new Error();

            const roleExists = await this.role.findOne({ name: role });
            if (!roleExists) throw new Error();

            const user = await this.user.create({
                ...body,
                role: roleExists._id,
            });

            return user;
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    public async signin(
        email: string,
        password: string,
    ): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        try {
            const user = await this.user.findOne({ email });
            if (!user) throw new Error();

            const isValidPassword = await user.isValidPassword(password);
            if (!isValidPassword) throw new Error();

            const accessToken = generateToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            await this.redis.set(
                user._id.toString(),
                JSON.stringify({ token: refreshToken }),
            );

            await this.redis.expire(user._id.toString(), 60 * 60 * 24 * 30);

            return { accessToken, refreshToken };
        } catch (error) {
            throw new Error('Error signing in');
        }
    }

    public async refreshToken(id: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        try {
            if (!id) throw new Error();
            const accessToken = generateToken(id);
            const refreshToken = generateRefreshToken(id);

            await this.redis.set(
                id.toString(),
                JSON.stringify({ token: refreshToken }),
            );

            await this.redis.expire(id.toString(), 60 * 60 * 24 * 30);

            return { accessToken, refreshToken };
        } catch (error) {
            throw new Error('Error refreshing token');
        }
    }

    public async signout(id: string): Promise<void> {
        try {
            if (!id) throw new Error();
            await this.redis.del(id.toString());
        } catch (error) {
            throw new Error('Error signing out');
        }
    }

    public async forgotPassword(email: string): Promise<void> {
        try {
            if (!email) throw new Error();
            const user = await this.user.findOne({ email });
            if (!user) throw new Error();

            const token = await user.createPasswordResetToken();
            await user.save();

            const resetURL = `${process.env.CLIENT_URL}/auth/reset-password/${token}`;
            const message = `Hi, Please click on the link below to reset your password:
            <br />
            </br />
            <a href="${resetURL}">Click here to reset your password</a>
            <br />
            </br />
            <strong>NOTE: </strong> The above link expires in 10 minutes. If you did not request a password reset, please ignore this email.
            `;

            const data = {
                to: user.email,
                subject: 'Password Reset',
                text: `Hey ${user.firstName} !`,
                html: message,
            };

            await sendEmail(data);
        } catch (error) {
            throw new Error('Error sending password reset email');
        }
    }

    public async resetPassword(
        token: string,
        password: string,
        confirmPassword: string,
    ): Promise<void> {
        try {
            if (!token) throw new Error();

            if (password !== confirmPassword) throw new Error();

            const hashedToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');

            const user = await this.user.findOne({
                resetPasswordToken: hashedToken,
                resetPasswordExpires: { $gt: Date.now() },
            });

            if (!user) throw new Error();

            user.password = password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            await user.save();
        } catch (error) {
            throw new Error('Error resetting password');
        }
    }
}

export default AuthService;
