/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/2
 * Time 13:56
 */
import { get, post } from '../utils/request'

export async function checkIsLogined(data) {
  return get('/xhr/loginState', data)
}



 