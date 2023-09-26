import { apiRoot } from './request'
import im from './modules/im'
import pay from './modules/pay'
import basic from './modules/basic'
export const host = apiRoot
export default {
  ...im,
  ...pay,
  ...basic
}