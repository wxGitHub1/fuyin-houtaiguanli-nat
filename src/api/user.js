import ajax from '../utils/ajax';
import pathUrl from './pathUrl';
let envUrl = pathUrl.pathUrl_net
/**
 * 
 * 用户登录 / 登出
 * @param {*} params {count: 账号, password: 密码}
 * 
 * @returns {*} { status: 0 | -1, message: 注册状态消息， data: {} }
 */


export const login = async params => ajax.post(envUrl + '/api/Login/UserLogin', params);

export const loginOut = async () => ajax.post('/user/logout');