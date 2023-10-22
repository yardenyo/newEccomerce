import Setting from '@/resources/setting/setting.interface';
import SettingModel from '@/resources/setting/setting.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';

class SettingService {
    private setting = SettingModel;

    public async getAllSettings(body: PostBody): Promise<Setting[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const settings = await this.setting
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return settings;
        } catch (error) {
            throw new Error('Error retrieving user settings');
        }
    }

    public async getSetting(userId: string): Promise<Setting> {
        try {
            const user = await this.setting.findOne({ userId });
            if (!user) throw new Error();

            return user;
        } catch (error) {
            throw new Error('Error retrieving user setting');
        }
    }

    public async updateSetting(
        userId: string,
        body: PostBody,
    ): Promise<Setting> {
        try {
            const user = await this.setting.findOneAndUpdate(
                { userId },
                { ...body },
                { new: true },
            );
            if (!user) throw new Error();

            return user;
        } catch (error) {
            throw new Error('Error updating user setting');
        }
    }
}

export default SettingService;
