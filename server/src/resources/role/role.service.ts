import Role from '@/resources/role/role.interface';
import roleModel from '@/resources/role/role.model';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import PostBody from '@/utils/interfaces/postbody.interface';

class RoleService {
    private role = roleModel;

    public async getAllRoles(body: PostBody): Promise<Role[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const roles = await this.role
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);
            return roles;
        } catch (error) {
            throw new Error('Error getting roles');
        }
    }

    public async getRoleById(id: string): Promise<Role> {
        try {
            const role = await this.role.findById(id);
            if (!role) throw new Error();
            return role;
        } catch (error) {
            throw new Error('Error getting role');
        }
    }

    public async createRole(name: string): Promise<Role> {
        try {
            const newRole = await this.role.create({ name });
            return newRole;
        } catch (error) {
            throw new Error('Error creating role');
        }
    }

    public async deleteRoleById(id: string): Promise<void> {
        try {
            await this.role.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting role');
        }
    }

    public async deleteAllRoles(): Promise<void> {
        try {
            await this.role.deleteMany();
        } catch (error) {
            throw new Error('Error deleting roles');
        }
    }

    public async updateRole(id: string, role: string): Promise<Role> {
        try {
            const newRole = await this.role.findByIdAndUpdate(
                id,
                { role },
                { new: true },
            );
            if (!newRole) throw new Error();
            return newRole;
        } catch (error) {
            throw new Error('Error updating role');
        }
    }
}

export default RoleService;
