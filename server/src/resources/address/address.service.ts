import Address from '@/resources/address/address.interface';
import AddressModel from '@/resources/address/address.model';
import roleModel from '@/resources/role/role.model';
import userModel from '@/resources/user/user.model';
import User from '@/resources/user/user.interface';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import Roles from '@/utils/enums/roles.enums';

class AddressService {
    private address = AddressModel;

    public async createAddress(
        addressData: Address,
        userId: string,
    ): Promise<Address> {
        try {
            const existingUser = await userModel.findById(userId);

            if (!existingUser) {
                throw new Error('User not found');
            }

            if (existingUser.address) {
                await this.address.findByIdAndDelete(existingUser.address);
            }

            const address = await this.address.create({
                ...addressData,
                user: userId,
            });

            existingUser.address = address._id;
            await existingUser.save();

            return address;
        } catch (error) {
            throw new Error('Error creating address');
        }
    }

    public async getAllAddresses(body: PostBody): Promise<Address[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const addresses = await this.address
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return addresses;
        } catch (error) {
            throw new Error('Error retrieving addresses');
        }
    }

    public async getAddressById(id: string): Promise<Address> {
        try {
            const address = await this.address.findById(id);
            if (!address) throw new Error();

            return address;
        } catch (error) {
            throw new Error('Error retrieving address');
        }
    }

    public async updateAddress(
        id: string,
        addressData: Address,
        user: User,
    ): Promise<Address> {
        try {
            const address = await this.address.findById(id);
            if (!address) throw new Error();

            const userRole = await roleModel.findById(user.role);
            if (!userRole) throw new Error();

            if (
                userRole.name !== Roles.ADMIN &&
                user._id.toString() !== address.user.toString()
            )
                throw new Error();

            await this.address.findByIdAndUpdate(id, addressData, {
                new: true,
            });

            return address;
        } catch (error) {
            throw new Error('Error updating address');
        }
    }

    public async deleteAddress(id: string, user: User): Promise<Address> {
        try {
            const address = await this.address.findById(id);
            if (!address) throw new Error();

            const userRole = await roleModel.findById(user.role);
            if (!userRole) throw new Error();

            if (
                userRole.name !== Roles.ADMIN &&
                user._id.toString() !== address.user.toString()
            )
                throw new Error();

            const userToUpdate = await userModel.findById(address.user);
            if (userToUpdate) {
                userToUpdate.address = userToUpdate.address.filter(
                    (addrId) => addrId.toString() !== id,
                );
                await userToUpdate.save();
            }

            await this.address.findByIdAndDelete(id);

            return address;
        } catch (error) {
            throw new Error('Error deleting address');
        }
    }

    public async deleteAllAddresses(): Promise<void> {
        try {
            const addresses = await this.address.find();

            for (const address of addresses) {
                const userToUpdate = await userModel.findById(address.user);
                if (userToUpdate) {
                    userToUpdate.address = userToUpdate.address.filter(
                        (addrId) =>
                            addrId.toString() !== address._id.toString(),
                    );
                    await userToUpdate.save();
                }
            }

            await this.address.deleteMany({});
        } catch (error) {
            throw new Error('Error deleting addresses');
        }
    }
}

export default AddressService;
