import Brand from '@/resources/brand/brand.interface';
import BrandModel from '@/resources/brand/brand.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';

class BrandService {
    private brand = BrandModel;

    public async createBrand(brandData: Brand): Promise<Brand> {
        try {
            const createdBrand = this.brand.create(brandData);
            return createdBrand;
        } catch (error) {
            throw new Error('Error creating brand');
        }
    }

    public async getAllBrands(body: PostBody): Promise<Brand[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const brands = await this.brand
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return brands;
        } catch (error) {
            throw new Error('Error retrieving brands');
        }
    }

    public async getBrandById(id: string): Promise<Brand> {
        try {
            const brand = await this.brand.findById(id);
            if (!brand) throw new Error();

            return brand;
        } catch (error) {
            throw new Error('Error retrieving brand');
        }
    }

    public async updateBrand(id: string, brandData: Brand): Promise<Brand> {
        try {
            const brand = await this.brand.findByIdAndUpdate(id, brandData, {
                new: true,
            });
            if (!brand) throw new Error();

            return brand;
        } catch (error) {
            throw new Error('Error updating brand');
        }
    }

    public async deleteBrand(id: string): Promise<Brand> {
        try {
            const brand = await this.brand.findByIdAndDelete(id);
            if (!brand) throw new Error();

            return brand;
        } catch (error) {
            throw new Error('Error deleting brand');
        }
    }

    public async deleteAllBrands(): Promise<void> {
        try {
            await this.brand.deleteMany({});
        } catch (error) {
            throw new Error('Error deleting brands');
        }
    }
}

export default BrandService;
