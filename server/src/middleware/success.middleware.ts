class SuccessResponse {
    public status: number;
    public success: boolean;
    public message?: string;
    public data?: any;

    constructor(message: string, data?: any) {
        this.status = 200;
        this.success = true;
        this.message = message || 'Success';

        if (data) {
            this.data = data;
        }
    }
}

export default SuccessResponse;
