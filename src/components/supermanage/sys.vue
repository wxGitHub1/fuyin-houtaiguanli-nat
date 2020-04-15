<template>
  <div id="sys">
    <el-row>
      <el-col :span="2" class="margin-l-p1">
        <el-button type="primary" size="small" @click="addUserBut" :disabled="limit.add">新增用户</el-button>
      </el-col>
      <el-col :span="14" :offset="6">
        <el-form :inline="true" :model="formInline" size="small">
          <el-form-item label="用户姓名">
            <el-input clearable v-model="formInline.user" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input clearable v-model="formInline.userMobile" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-select clearable v-model="formInline.region" placeholder="请选择">
              <el-option
                v-for="item in formInline.options"
                :key="item.value"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 用户列表 -->
    <el-table class="client_table" :border="true" max-height="619" :data="clientData" style="width: 100%">
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="userName" label="用户姓名" min-width="60"></el-table-column>
      <el-table-column align="center" prop="mobile" label="用户电话" min-width="100"></el-table-column>
      <el-table-column align="center" prop="loginName" label="登录账户" min-width="100"></el-table-column>
      <el-table-column align="center" prop="hospitalIdName" label="负责站点" min-width="100"></el-table-column>
      <el-table-column align="center" prop="roleNames" label="用户角色" min-width="160"></el-table-column>
      <el-table-column align="center" label="操作" min-width="160">
        <template slot-scope="scope">
          <el-button type="warning" @click="handleModify(scope.row)" size="small">修改信息</el-button>
          <el-button
            type="danger"
            :disabled="limit.delete"
            @click="handleDelete(scope.row.userId)"
            size="small"
          >删除用户</el-button>
          <el-button type="primary" @click="handlePassword(scope.row.userId)" size="small">密码重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
      class="pagination"
    ></el-pagination>
    <!-- 弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :before-close="toggleSelection"
      id="sys-el-dialog"
      title="数据录入"
      :visible.sync="DatadialogVisible"
      center
    >
      <el-form
        :inline="true"
        :rules="rules"
        ref="ruleForm"
        :model="formInline2"
        class="form"
        size="small"
      >
        <el-form-item label="用户姓名">
          <el-input clearable v-model="formInline2.userName" prop="name" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="userMobile">
          <el-input clearable v-model.number="formInline2.userMobile" placeholder="请输入用户电话"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="登录密码" prop="password">
          <el-input
            clearable
            show-password
            v-model="formInline2.password"
            placeholder="默认生成123456可修改"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            clearable
            show-password
            v-model="formInline2.confirmPassword"
            placeholder="默认生成123456可修改"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="用户角色">
          <el-select
           
            @change="changeSelection(formInline2)"
            v-model="formInline2.region"
            placeholder="请选择"
          >
            <el-option
              v-for="item in formInline2.options"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
          <el-button @click="roleAll" type="primary" size="small">选择全部角色</el-button>
        </el-form-item>
        <br />
        <el-table :data="formInline2.tableData" style="width: 100%">
          <el-table-column prop="date.roleName" label="已选角色" min-width="50"></el-table-column>
          <el-table-column label="角色权限" min-width="100">
            <template slot-scope="scope">
              <el-select clearable size="small" v-model="scope.row.region" placeholder="请选择角色权限">
                <el-option
                  v-for="item in scope.row.options"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column min-width="180" label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click.native.prevent="deleteRow(scope.$index, formInline2.tableData)"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item label="负责站点" style="margin-top:20px;">
          <el-select
            clearable
            size="small"
            multiple
            v-model="formInline2.regionHospital"
            placeholder="请选择"
          >
            <el-option
              v-for="item in formInline2.optionsHospital"
              :key="item.hospitalId"
              :label="item.name"
              :value="item.hospitalId"
            ></el-option>
          </el-select>
          <el-button @click="hospitalAll" type="primary" size="small">选择全部医院</el-button>
        </el-form-item>
      </el-form>
      <span  slot="footer">
        <el-button class="padding-lr" @click="toggleSelection" type="success" size="middle">返回</el-button>
        <el-button v-if="mode" class="padding-lr" type="primary" @click="saveCommunity(1)" size="middle">保存</el-button>
        <el-button v-else class="padding-lr" type="primary" @click="saveCommunity(0)" size="middle">保存</el-button>
      </span>
      <!-- <span  slot="footer">
        <el-button class="padding-lr" @click="toggleSelection" type="success" size="middle">返回</el-button>
        
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  OperateSysusers,
  UpdatePassWord,
  GetSysusers,
  GetHospitals,
  GetRoleList
} from "../../api/datalist";
import { Promise, all, async } from "q";
import session from '../../utils/session';
export default {
  name: "App",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formInline2.password !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formInline2.password) {
        this.formInline2.confirmPassword = null;
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var phoneNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (typeof(value) == "number") {
       callback();
      } else {
        this.formInline2.userMobile = null;
        callback(new Error("请输入手机号"));
        
      }
    };
    return {
      formInline: {
        user: "",
        userMobile: "",
        region: "",
        options: []
      },
      formInline2: {
        userName: null,
        userId: null,
        userMobile: null,
        password: null,
        confirmPassword: null,
        region: null,
        options: [],
        regionHospital: [],
        optionsHospital: [],
        tableData: []
      },
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      // 数据列表
      clientData: [],
      //权限管理
      limit: {
        add: true,
        delete: true
      },
      //录入数据弹出框
      DatadialogVisible: false,
      //验证规则
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
        userMobile:[{ type: 'number',validator: phoneNumber, trigger: "blur"}]
      },
      // 弹框底部保存取消状态
      mode: true
    };
  },
  mounted() {
    //获取用户权限
    this.limit.add =  !!!session.getItem('userlimit')[0];
    this.limit.delete = !!!session.getItem('userlimit')[1];
    // this.limit.update = !!!this.$store.state.login.userlimit[2];
    // this.limit.select = !!!this.$store.state.login.userlimit[3];
    this.getControlCommunities();
    this.getRoleList();
    this.GetHospitals();
  },
  methods: {
    // 保存用户
    saveCommunity(parameter) {
      // console.log(this.formInline2);
      let formdata = this.formInline2;
      let errtext = 1;
      for (let index = 0; index < formdata.tableData.length; index++) {
        const element = formdata.tableData[index].region;
        if (element === "") {
          errtext = 0;
          break;
        }
      }
      let data2 = {
        userName: formdata.userName,
        mobile: formdata.userMobile,
        password: formdata.password,
        confirmpassword: formdata.confirmPassword,
        roles: [],
        hospitalIds: formdata.regionHospital
      };
  // debugger
      if (parameter == 0) {
        data2.isDelete = parameter;
        data2.userId = formdata.userId;
      }
      formdata.tableData.forEach(res => {
        data2.roles.push({ roleId: res.date.roleId, authority: res.region });
      });
      // debugger
      if (
        data2.userName == null ||
        data2.mobile == null ||
        data2.password == null ||
        data2.password == "" ||
        data2.confirmpassword == null ||
        data2.confirmpassword == "" ||
        data2.roles.length == 0 ||
        data2.hospitalIds.length == 0 ||
        errtext == 0
      ) {
        this.$message({
          type: "warning",
          message: "请填写全部信息！",
          center: true
        });
      } else {
        // console.log(data2);
        OperateSysusers(data2)
          .then(res => {
            if(res.data.Error){
              this.$message({
                type: "warning",
                message: res.data.ErrorMessage,
                center: true
              });
            }else{
            if (parameter == 0) {
              this.$message({
                type: "success",
                message: "修改成功！",
                center: true
              });
            } else {
              this.$message({
                type: "success",
                message: "添加成功！",
                center: true
              });
            }
            this.toggleSelection();
            this.getControlCommunities(
              this.pages.currentPage,
              this.pages.pageSize
            );
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //选择角色options 发生变化时
    changeSelection(formInline2) {
      console.log(formInline2)
      let region = [];
      formInline2.options.forEach(options => {
        if (options.roleId == formInline2.region) {
          region.push(options);
        }
      });
      let region2 = {};
      region.forEach(region => {
        region2.roleName = region.roleName;
        region2.roleId = region.roleId;
      });
      // console.log(region2);
      let data = {
        date: region2,
        region: "",
        options: [
          { roleName: "一级", roleId: 1 },
          { roleName: "二级", roleId: 2 },
          { roleName: "三级", roleId: 3 }
        ]
      };
      this.formInline2.tableData.push(data);
      // console.log(this.formInline2.tableData);
    },
    // 移除行
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    //选择全部角色
    roleAll() {
      let dataList = [];
      this.formInline2.options.forEach(res => {
        let data = {
          date: {},
          region: "",
          options: [
            { roleName: "一级", roleId: 1 },
            { roleName: "二级", roleId: 2 },
            { roleName: "三级", roleId: 3 }
          ]
        };
        data.date.roleName = res.roleName;
        data.date.roleId = res.roleId;
        dataList.push(data);
      });
      // console.log(dataList);
      this.formInline2.tableData = dataList;
    },
    //选择全部医院
    hospitalAll() {
      this.formInline2.optionsHospital.forEach(res => {
        this.formInline2.regionHospital.push(res.hospitalId);
      });
      //console.log(this.formInline2.regionHospital)
    },
    // 新增用户按钮
    addUserBut() {
      this.DatadialogVisible = true;
      this.mode=true;
      this.getRoleList();
    },
    //查询
    onSubmit(name) {
      this.getControlCommunities();
    },
    // 修改
    handleModify(rowData) {
      this.DatadialogVisible = true;
      this.mode = false;
      // console.log(rowData);
      this.formInline2.userName = rowData.userName;
      this.formInline2.userId = rowData.userId;
      this.formInline2.userMobile = rowData.mobile;
      this.formInline2.password = rowData.password;
      this.formInline2.confirmPassword = rowData.confirmpassword;
      this.formInline2.regionHospital = rowData.hospitalIds;

      let dataList = [];
      this.formInline2.options.forEach(options => {
        rowData.roles.forEach(res => {
          let data = {
            date: {},
            region: "",
            options: [
              { roleName: "一级", roleId: 1 },
              { roleName: "二级", roleId: 2 },
              { roleName: "三级", roleId: 3 }
            ]
          };
          if (res.roleId == options.roleId) {
            res.authority == 1
              ? (data.region = 1)
              : res.authority == 2
              ? (data.region = 2)
              : res.authority == 3
              ? (data.region = 3)
              : (data.region = "");
            data.date.roleName = options.roleName;
            data.date.roleId = options.roleId;
            dataList.push(data);
          }
        });
      });

      this.formInline2.tableData = dataList;
      // console.log(this.formInline2);
    },
    // 删除
    handleDelete(id) {
      if (id) {
        let deleteData = {
          isDelete: 1,
          userId: id
        };
        this.$confirm("此操作将永久删除该文件, 是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            try {
              return new Promise((resolve, reject) => {
                OperateSysusers(deleteData)
                  .then(res => {
                    const loading = this.$loading({
                      lock: true,
                      text: "加载中",
                      spinner: "el-icon-loading",
                      background: "rgba(0, 0, 0, 0.7)"
                    });
                    resolve(res);
                    if (!res.Error) {
                      setTimeout(() => {
                        loading.close();
                        this.$message({
                          type: "success",
                          message: "删除成功！",
                          center: true
                        });
                        this.getControlCommunities(
                          this.pages.currentPage,
                          this.pages.pageSize
                        );
                      }, 500);
                    }
                  })
                  .catch(err => {
                    reject(err);
                  });
              });
            } catch (err) {
              console.log(err);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除"
            });
          });
      }
    },
    // 重置密码
    handlePassword(id) {
      let data={userId: id}
      UpdatePassWord(data)
        .then(res => {
          this.$confirm("此操作将重置密码, 是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "重置成功！",
                center: true
              });
              this.getControlCommunities(
                this.pages.currentPage,
                this.pages.pageSize
              );
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消密码重置！"
              });
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取用户列表
    async getControlCommunities(pageIndex = 1, pageSize = 10) {
      let arg = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        whereLambda: {}
      };
      arg.whereLambda.userName = this.formInline.user || null; //名称
      arg.whereLambda.mobile = this.formInline.userMobile || null; //电话
      arg.whereLambda.roleId = this.formInline.region || null; //id
      // debugger
      GetSysusers(arg)
        .then(res => {
          const loading = this.$loading({
            lock: true,
            text: "加载中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          let dataList = res.data.ResponseModel;
          if (dataList) {
            loading.close();
            // console.log(dataList.list);
            this.clientData = dataList.list;
            this.pages.total = dataList.total;
          } else {
            this.clientData = null;
            this.pages.total = 0;
            loading.close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取下拉角色列表
    getRoleList() {
      GetRoleList()
        .then(res => {
          let data = res.data.ResponseModel;
          this.formInline.options = data.list;
          this.formInline2.options = data.list;
          console.log(this.formInline.options);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取下拉医院列表
    GetHospitals() {
      GetHospitals()
        .then(res => {
          this.formInline2.optionsHospital = res.data.ResponseModel;
          console.log(this.formInline2.optionsHospital);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消按钮
    toggleSelection() {
      this.DatadialogVisible = false;
      let FromData = this.formInline2;
      FromData.userName = null;
      FromData.userMobile = null;
      FromData.password = null;
      FromData.confirmPassword = null;
      FromData.region = null;
      FromData.regionHospital = [];
      // FromData.optionsHospital = [];
      FromData.tableData = [];
    },
    //当前页面变化时
    handleCurrentChange(num) {
      this.pages.currentPage = num;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.getControlCommunities(pageIndex, pageSize);
    },
    //页面条数发生变化时
    handleSizeChange(val) {
      this.pages.pageSize = val;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.getControlCommunities(pageIndex, pageSize);
    }
  }
};
</script>

<style scoped lang="scss">
.form{
  width: 600px;
  margin: 0 auto;
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
.client_table {
  margin-top: 20px;
}
.line-h-30 {
  line-height: 30px;
}
.text-align {
  text-align: center;
}
.padding-lr {
  padding-left: 40px;
  padding-right: 40px;
}
.margin-l-p1{
  margin-left: 1%
}
</style>
<style>
  #sys-el-dialog .el-dialog--center{
  min-width: 640px;
}
</style>