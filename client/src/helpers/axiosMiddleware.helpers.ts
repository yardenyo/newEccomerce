/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  responseFulfilled(response: any): any {
    return response;
  },
  responseRejected(error: any): any {
    return error;
  },
  requestFulfilled(request: any): any {
    request.headers["X-Requested-With"] = "XMLHttpRequest";
    return request;
  },
  requestRejected(error: any): any {
    return error;
  },
};
