import Coupon from '@/resources/coupon/coupon.interface';
import CouponModel from '@/resources/coupon/coupon.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import slugify from 'slugify';

class CouponService {
    private coupon = CouponModel;

    public async createCoupon(
        discount: number,
        expireAfterDays: number,
    ): Promise<Coupon> {
        try {
            const createdCoupon = this.coupon.create({
                discount,
                expireAfterDays,
            });
            if (!createdCoupon) throw new Error();

            return createdCoupon;
        } catch (error) {
            throw new Error('Error creating coupon');
        }
    }

    public async getAllCoupons(body: PostBody): Promise<Coupon[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const coupons = await this.coupon
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return coupons;
        } catch (error) {
            throw new Error('Error retrieving coupons');
        }
    }

    public async getCouponById(id: string): Promise<Coupon> {
        try {
            const coupon = await this.coupon.findById(id);
            if (!coupon) throw new Error();

            return coupon;
        } catch (error) {
            throw new Error('Error retrieving coupon');
        }
    }

    public async updateCoupon(id: string, couponData: Coupon): Promise<Coupon> {
        try {
            const coupon = await this.coupon.findByIdAndUpdate(id, couponData, {
                new: true,
            });
            if (!coupon) throw new Error();

            return coupon;
        } catch (error) {
            throw new Error('Error updating coupon');
        }
    }

    public async deleteCoupon(id: string): Promise<Coupon> {
        try {
            const coupon = await this.coupon.findByIdAndDelete(id);
            if (!coupon) throw new Error();

            return coupon;
        } catch (error) {
            throw new Error('Error deleting coupon');
        }
    }

    public async deleteAllCoupons(): Promise<void> {
        try {
            await this.coupon.deleteMany({});
        } catch (error) {
            throw new Error('Error deleting coupons');
        }
    }
}

export default CouponService;
