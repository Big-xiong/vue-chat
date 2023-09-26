import { request } from "../request";
export default {
    login: (data) => request.post("/index/seller/login", data),
    serviceLogin: (data) => request.post("/index/service/login", data),
    doLogin: (data) => request.post("/api/auth/doLogin", data),
    verify: (data) => request.post("/index/seller/verify", data),
    logout: (data) => request.post("/index/seller/logout", data),
    repwd: (data) => request.post("/index/seller/repwd", data),
    sendEmailCode: (data) => request.post("/index/seller/email", data),
    register: (data) => request.post("/index/seller/register", data),
    vcode: (data) => request.post("/index/user/verify", data),
    getGoogle: (data) => request.post("/api/auth/getgoole", data),
    checkGoogle: (data) => request.post("/api/auth/checkgoole", data),
};
