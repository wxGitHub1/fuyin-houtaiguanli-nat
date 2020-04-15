import ajax from '../utils/ajax';
/**
 * 
 * 用户登录 / 登出
 * @param {*} params {count: 账号, password: 密码}
 * 
 * @returns {*} { status: 0 | -1, message: 注册状态消息， data: {} }
 */
// 上线接口
const envUrl = 'http://192.168.3.220:83/api/Login/UserLogin';
// 调试接口
// const envUrl = 'http://192.168.3.220:83/api/Login/UserLogin';

export const login = async params => ajax.post(envUrl, params);

export const loginOut = async () => ajax.post('/user/logout');