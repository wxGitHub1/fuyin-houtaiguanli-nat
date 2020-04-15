//userlogin.js   用户登陆
import { login, loginOut } from '../../api/user';
import session from '../../utils/session';


const state = {
    isLogin: false,
    user_count: null,
    username : null,
    token: "",
    userlimit: null,
    menu:[],
    site:[]
}

const getters = {
    currentUser(state) { 
        state.currentUser;
    },

    isLogin(state) { 
        state.isLogin;
    }
}

const mutations = {
    //从session读取数据
    GET_INFO(state, info) {
        state.count = session.getUser();
    },
    //清除状态
    CLEAN_INFO(state) {
        state.count = {};
        state.user_count = null;
    },

    //
    USER_LOGIN(state, response) {
        state.user_count = response;
    },

    //更改用户状态
    USER_STATUS(state, user) { 
        if (user) {
            state.user_count = user.user_count;
            state.menu = user.roles;
            state.site = user.siteModels;
            state.isLogin = true;
            state.username = user.userName;
            state.userlimit = [
                user.add,
                user.delete,
                user.update,
                user.select,
            ]
        } else if (user === null) { 
            //登出的时候，清空sessionstorge的东西
            session.setUser(null);
            session.setValidate("");
            state.user_count = null;
            state.isLogin = false;
            state.token = "";
            state.menu = [];
            state.site = [];
        }
    },

    //保存用户状态
    SAVE_STATUS(state, user) { 
        if (user) { 
            state.username = user.name;
            state.userlimit = user.limit;
            state.menu = user.roles;
            state.site = user.siteModels;
        }
    },

    //设置token
    USER_TOKEN(state, tokens) { 
        if (tokens) { 
            state.token = tokens;
        }
    },
}

const actions = {
    //登陆
    async userLogin({ commit }, loginInfo) {
        let self = this;
        return new Promise((resolve, reject) => { 
            login(loginInfo).then(res => {
                console.log(res);        
                resolve(res);
                if (!res.data.Error) {
                    session.setUser(res.data.ResponseModel.userId);
                    session.setItem('username', res.data.ResponseModel.userName);
                    session.setItem('menu', res.data.ResponseModel.roles);
                    session.setItem('site', res.data.ResponseModel.siteModels);
                    session.setItem('userlimit', [res.data.ResponseModel.add, res.data.ResponseModel.delete, res.data.ResponseModel.update, res.data.ResponseModel.select]);
                    commit('USER_STATUS', res.data.ResponseModel);
                    commit('USER_TOKEN', res.data.ResponseModel.password);

                }
            }).catch((err => {
                reject(err);
            }))
        })
    },

    async userLogOut({ commit }){  
        try {
            session.clear();
            console.log(1);
            commit('CLEAN_INFO');
            // await loginOut;
        } catch (e) { 
            console.log(e);
        }
    },
    //保存用户状态
    saveStatus({ commit }, userInfo) { 
        commit('SAVE_STATUS', userInfo);
    },

    getInfo({ commit }) { 
        commit('GET_INFO');
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions,
}