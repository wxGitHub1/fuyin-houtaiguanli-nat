<template>
  <div class="container">
    <el-row :span="24">
      <el-col class="login_box" :span="6" :offset="9">
        <el-row :span="24">
          <el-col class="top_sign" :span="12" :offset="6">
            <img src="../../static/image/login/img_title.png" alt />
          </el-col>
        </el-row>
        <el-row :span="24" style="margin-top: 31px">
          <el-col class="input" :span="20" :offset="2">
            <i>
              <img src="../../static/image/login/icon_zhangh.png" alt />
            </i>
            <input type="text" placeholder="请输入账号" v-model="userCount" />
          </el-col>
        </el-row>
        <el-row :span="24" style="margin-top: 15px;">
          <el-col class="input" :span="20" :offset="2">
            <i>
              <img src="../../static/image/login/icon_mm.png" alt />
            </i>
            <input type="password" placeholder="请输入密码" v-model="userPassword"/>
            <!-- <i><img src="../../static/image/login/icon_yc1.png" alt=""></i> -->
          </el-col>
        </el-row>
        <el-row :span="24" style="margin-top: 31px;">
          <el-col :span="20" :offset="2" class="login_btn">
            <div class="user_login" @click="userLogin()">登陆</div>
          </el-col>
        </el-row>
        <div class="version">
          当前版本：1.0.0
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $axios from "axios";
import session from "../utils/session";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      userCount: null,
      userPassword: null
    };
  },
  created() {
    this.isLogin;
    this.listenKey();
  },
  computed: {
    //通过session获取vuex islogin属性
    isLogin() {
      if (session.getUser() && session.getValidate()) {
        this.$store.commit("USER_STATUS", sessionStorage.getItem("user"));
        // console.log(this.$store.state);
        if (this.$store.state) {
          this.$router.push("/outwork");
        }
      } else {
        this.$store.commit("USER_STATUS", null);
      }
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    //监听按键
    listenKey() {
      document.onkeydown = e => {
        let key = window.event.keyCode;
        if (key === 13) {
          this.userLogin();
        }
      };
    },
    // doLogin() {
    //   $axios.post('http://192.168.3.107:9081/api/SignInApi/GetSignInInfo',{
    //     SignInName: "13652148563",
    //     PassWord: "123456"
    //   }).then(response => {
    //     console.log(response.data);
    //   }).catch(error => {
    //     console.log(error);
    //   })
    // },

    //登陆
    async userLogin() {
      //如果不填写账号和密码
      const userInfo = {
        loginName: this.userCount,
        password: this.userPassword
      };
      if (!(!!userInfo.loginName && !!userInfo.password)) {
        this.$message({
          message: "账号或密码不能为空！",
          type: "warning",
          center: true
        });
      } else {
        try {
          const loginState = await this.$store.dispatch("userLogin", userInfo);
          if (loginState.data.Error) {
            this.$message({
              type: "error",
              message: "账号或密码错误！",
              center: true
            });
          } else {
            this.$router.push("/outwork");
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-image: url(../../static/image/login/img_background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .login_box {
    margin-top: 16%;
    height: 345px;
    background-color: #ffffff;
    box-shadow: 0 3px 43px 0px rgba(40, 121, 194, 0.36);
    border-radius: 10px;
    .top_sign {
      height: 62px;
      img {
        width: 100%;
        margin-top: -23%;
      }
    }
    .user_login:hover {
      border-radius: 10px;
      background: rgb(66, 152, 240);
      color: #fff;
    }
    .input {
      border-bottom: 2px solid#e5e5e5;
      input {
        width: 82%;
        letter-spacing: 1px;
        font-size: 16px;
        color: #9babbb;
        vertical-align: 6px;
      }
      :-ms-input-placeholder {
        letter-spacing: 1px;
        font-size: 16px;
        color: #e5e5e5;
      }
      ::-webkit-input-placeholder {
        letter-spacing: 2px;
        font-size: 16px;
        color: #e5e5e5;
      }
      i {
        display: inline-block;
        width: 7%;
        img {
          width: 100%;
        }
      }
    }
    .login_btn {
      background-color: #59a4f2;
      height: 51px;
      border-radius: 10px;
      font-size: 18px;
      letter-spacing: 4px;
      color: #f2f6fc;
      text-align: center;
      line-height: 51px;
      font-weight: bold;
      cursor: pointer;
    }
    .version{
      color: #59a4f2;
      font-size: 12px;
      text-align: right;
      margin-top: 40px;
      margin-right: 8%;
    }
  }
}
</style>