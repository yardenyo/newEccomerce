class HttpException extends Error {
    public status: number;
    public message: string;
    public errors?: string[];
    public success: boolean;

    constructor(status: number, message: string, errors?: string[]) {
        super(message);
        this.status = status;
        this.success = false;
        this.message = message;
        this.errors = errors;
    }
}

export default HttpException;
