<template>
  <div class="container">
    <el-row class="header">
      <el-col :span="4">
        <div class="left_banner">
          <img src="../../../static/image/login/img_title.png" alt />
        </div>
      </el-col>
      <el-col :span="17" class="middle_banner"></el-col>
      <el-col :span="3" class="right_banner">
        <el-row>
          <el-col :span="12" class="name_type center">
            <p @click="changePerson()">{{user.name || '无'}}</p>
            <p @click="changePerson()">{{witchPage}}</p>
          </el-col>
          <el-col :span="6">
            <div class="head_pic" @click="changePerson()">
              <img src="../../../static/image/login/icon_zh.png" alt />
            </div>
          </el-col>
          <el-col :span="6" class="arrow_box">
            <el-dropdown :hide-on-click="false" type="primary" trigger="click">
              <span class="el-dropdown-link">
                <span class="arrows"></span>
              </span>
              <el-dropdown-menu :split-button="true" slot="dropdown" style="width: 9%;">
                <el-dropdown-item
                  @click.native="gotoBigClient(item.roleName)"
                  v-for="(item,index) in menu "
                  :key="index"
                >{{item.roleName}}</el-dropdown-item>
                <!-- 
                    <el-dropdown-item @click.native="gotoBigClient('/bigclient')">大客户管理</el-dropdown-item>
                     <el-dropdown-item @click.native="gotoBigClient('/outwork')">外出体检管理</el-dropdown-item> 
                     <el-dropdown-item @click.native="gotoBigClient('/supermanage')">系统管理</el-dropdown-item>
                     <el-dropdown-item>前台管理</el-dropdown-item>
                     <el-dropdown-item>测评管理</el-dropdown-item>
                     <el-dropdown-item>库房管理</el-dropdown-item>
                -->
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="nav_bar">
      <el-row v-for="(nav,index) in navTables" :key="nav.name">
        <el-col class="nav_box" :span="24" :class="{active:cur==index}">
          <i>
            <img src="../../../static/image/login/icon_khgl.png" alt />
          </i>
          <span @click="switchTitle(nav.name,index)">{{nav.title}}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import session from "../../utils/session";
export default {
  name: "HelloWorld",
  props: {
    navTables: Array,
    required: true
  },
  data() {
    return {
      newNavTable: [],
      user: {
        name: null,
        limit: null
      },
      //显示当前页面名称
      witchPage: null,
      menu: [],
      cur: null
    };
  },
  created() {
    this.user.name = session.getItem("username");
    this.user.limit = session.getItem("userlimit");
    this.menu = session.getItem("menu");
  },
  mounted() {
    this.viewPage(String(window.location.href));

    if (this.$store.state.login.username) {
      this.user.name = this.$store.state.login.username;
      this.user.limit = this.$store.state.login.userlimit;
      this.menu = this.$store.state.login.menu;
      // debugger
      // console.log(this.$store.state.login.menu)
    } else {
      this.user.name = session.getItem("username");
      this.user.limit = session.getItem("userlimit");
      this.menu = session.getItem("menu");
    }
    this.$store.dispatch("saveStatus", this.user);
    this.$store.dispatch("saveStatus", this.menu);
  },
  methods: {
    //根据当前链接地址 显示界面信息
    viewPage(arg) {
      // debugger
      let outworks = new RegExp("outwork");
      let bigclients = new RegExp("bigclient");
      let supermanage = new RegExp("supermanage");
      if (outworks.test(arg)) {
        this.witchPage = "外出体检";
      } else if (bigclients.test(arg)) {
        this.witchPage = "大客户";
      } else if (supermanage.test(arg)) {
        this.witchPage = "系统管理";
      }
    },
    switchTitle(item, index) {
      this.$emit("acceptTitle", item);
      this.cur = index;
    },
    //切换账户
    changePerson() {
      this.$confirm("是否退出并更改账号？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          this.$router.push("/login");
          session.removeItem("user");
          this.$message({
            type: "info",
            message: "已退出系统"
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //跳转页面
    gotoBigClient(adress) {
      let actions = {
        系统管理: "/supermanage",
        大客户: "/bigclient",
        外出体检: "/outwork",
        "404": "/404"
      };
      // debugger
      let action = actions[adress] || actions["404"];
      this.$router.push(action);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #56a9ff;
    .left_banner {
      width: 73.5%;
      margin-top: -42px;
      margin-left: -50px;
    }
    .middle_banner {
      height: 100%;
    }
    .right_banner {
      height: 100%;
      background: #2883e0;
      .head_pic {
        height: 60px;
        line-height: 72px;
        text-align: center;
        img {
          width: 28px;
          height: 28px;
        }
      }
      .name_type {
        height: 60px;
        line-height: 20px;
        cursor: pointer;
        p {
          margin: 0;
          padding: 0;
          color: #ffffff;
          letter-spacing: 1px;
        }
        p:first-child {
          font-size: 18px;
          margin-top: 10px;
        }
        p:last-child {
          font-size: 12px;
          // margin-top: 2px;
        }
      }
      .arrow_box {
        height: 60px;
        // margin-top: 13px;
        border-left: 2px solid #1465b7;
        text-align: center;
        .arrows {
          display: inline-block;
          width: 15px;
          height: 15px;
          border-right: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: rotate(45deg);
          margin-top: 3px;
        }
      }
    }
  }
  .nav_bar {
    width: 180px;
    height: calc(100% - 60px);
    display: inline-block;
    background: #ffffff;
    position: relative;
    right: 16.8%;
    border-right: 1px solid #eeeeee;

    .nav_box {
      font-size: 16px;
      letter-spacing: 1px;
      color: #606266;
      padding-left: 20px;
      margin-top: 20px;
      cursor: pointer;
      span {
        position: relative;
        bottom: 8px;
      }
    }
    .active {
      background: rgb(244, 244, 244);
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
