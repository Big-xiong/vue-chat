import { request } from "../request";
export default {
  pay: (data) => request.post("/api/auth/pays", data)
};
