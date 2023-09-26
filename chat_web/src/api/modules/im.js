import { request } from "../request";
export default {
    userInit: () => request.post("/userInit"),
    getSellerInfo: () => request.post("/index/user/index"),
    customerInto: (data) => request.post("/customerIn", data),
    getCustomerServiceList: (data) => request.post("/index/api/getFreeKeFu", data),
};
