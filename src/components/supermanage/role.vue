<template>
  <div class="container">
    <el-row>
      <el-col :span="2" class="margin-l-p1">
        <!-- 新增社区 -->
        <el-button type="primary" size="small" @click="addUserBut" :disabled="limit.add">新增角色</el-button>
      </el-col>
      <!-- 查询数据 -->
      <el-col :span="9">
        <el-form :inline="true" :model="formInline" size="small">
          <el-form-item label="角色名称">
            <el-input size="small" clearable v-model="formInline.searchUser" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" icon="el-icon-search" @click="searchData(formInline.searchUser)">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 角色列表 -->
    <el-table :border="true" max-height="620" :data="clientData" class="client_table">
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="roleName" label="角色名称" min-width="20"></el-table-column>
      <el-table-column label="功能" prop="menuName" min-width="100"></el-table-column>
      <el-table-column align="center" label="操作" min-width="40">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleModify(scope.row.roleId)" size="small">修改</el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row.roleId)"
            size="small"
            :disabled="limit.delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页列表-->
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
      width="70%"
      title="数据录入"
      :visible.sync="DatadialogVisible"
      center
    >
      <el-row class="line-h-30">
        <el-col :span="2">
          <span class="after-red">角色名称</span>
        </el-col>
        <el-col :span="3">
          <el-input size="small" v-model="formInline.addUser" placeholder="请输入角色名称"></el-input>
        </el-col>
        <el-col :span="10" :offset="1" class="line-h-30">
          <span style="color:#FFA116">温馨提示：角色名称要简明扼要，字数不宜太长</span>
        </el-col>
      </el-row>
      <!-- 添加用户表格 -->
      <el-table
        v-if="mTable"
        ref="multipleTable"
        :data="selection"
        tooltip-effect="dark"
        style="width: 100%;margin-top:20px"
        border
        :max-height="481"
      >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column label="模块名称" width="200">
          <template slot-scope="scope">
            <el-checkbox
              :indeterminate="scope.row.isIndeterminate"
              v-model="scope.row.checkAll"
              @change="handleCheckAllChange(scope.$index,$event,selection,1)"
            >{{scope.row.menuName}}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="功能">
          <template slot-scope="scope">
            <el-checkbox-group
              v-model="scope.row.checkedCities"
              @change="handleCheckedCitiesChange(scope.$index,$event,selection,1)"
            >
              <el-checkbox
                v-for="(city,index) in scope.row.childs"
                :label="city"
                :key="index"
              >{{city.menuName}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改用户表格 -->
      <el-table
        v-else
        ref="multipleTable"
        :data="modifymune"
        tooltip-effect="dark"
        style="width: 100%;margin-top:20px"
        border
        :max-height="481"
      >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column label="模块名称" width="200">
          <template slot-scope="scope">
            <el-checkbox
              :indeterminate="scope.row.isIndeterminate"
              v-model="scope.row.checkAll"
              @change="handleCheckAllChange(scope.$index,$event,modifymune,2)"
            >{{scope.row.menuName}}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="功能">
          <template slot-scope="scope">
            <el-checkbox-group
              v-model="scope.row.checkedList"
              @change="handleCheckedCitiesChange(scope.$index,$event,modifymune,2)"
            >
              <el-checkbox
                v-for="(model,index) in scope.row.jinengList"
                :label="model"
                :key="index"
              >{{model}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </el-table>
      <!--添加-->
      <span slot="footer" v-if="mTable">
        <el-button @click="toggleSelection" class="padding-lr" type="success" size="middle">返回</el-button>
        <el-button
          class="padding-lr"
          type="primary"
          @click="saveCommunity(formInline.addUser)"
          size="middle"
        >保存</el-button>
      </span>
      <!--修改-->
      <span slot="footer" v-else>
        <el-button class="padding-lr" @click="toggleSelection2" type="success" size="middle">返回</el-button>
        <el-button
          class="padding-lr"
          type="primary"
          @click="saveCommunity2(formInline.addUser)"
          size="middle"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetMenus,
  GetRoles,
  OperateRole,
  GetRolesDetail
} from "../../api/datalist";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      mTable: true,
      // 修改用户时的信息
      modifymune: [],
      // 添加用户时的信息
      selection: [],
      //添加和查询时用户名
      formInline: {
        seachUser: null,
        addUser: ""
      },
      //权限管理
      limit: {
        add: true,
        delete: true
      },
      //表格数据
      clientData: [],
      //录入数据弹出框
      DatadialogVisible: false,
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      //弹框
      ModifydialogVisible: false,
      roleId: ""
    };
  },
  created() {
    this.getMenus();
  },
  mounted() {
    //获取用户权限
    this.limit.add = !!!session.getItem("userlimit")[0];
    this.limit.delete = !!!session.getItem("userlimit")[1];
    // this.limit.update = !!!this.$store.state.login.userlimit[2];
    // this.limit.select =  !!!this.$store.state.login.userlimit[3];
    this.getControlCommunities();
  },
  methods: {
    addUserBut() {
      this.DatadialogVisible = true;
      this.mTable = true;
    },
    // 获取用户管理列表
    async getMenus() {
      GetMenus()
        .then(res => {
          let array = [];
          let data = res.data.ResponseModel;
          data.map((item, index) => {
            array.push(
              Object.assign({}, item, {
                checkedCities: [],
                checkAll: false,
                isIndeterminate: false
              })
            );
          });
          console.log(array)
          this.selection = array;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加修改用户全选名称
    handleCheckAllChange(index, val, data, change) {
      let sIndex = data[index];
      if (change === 1) {
        sIndex.checkedCities = val ? sIndex.childs : [];
      } else {
        sIndex.checkedList = val ? sIndex.jinengList : [];
      }
      if (val === true) {
        sIndex.isIndeterminate = false;
        sIndex.checkAll = true;
      } else {
        sIndex.isIndeterminate = false;
        sIndex.checkAll = false;
      }
    },
    //添加修改用户选择功能
    handleCheckedCitiesChange(index, value, data, change) {
      let sIndex = data[index];
      let checkedCount = value.length;
      let modLenght = [];
      if (change === 1) {
        modLenght = sIndex.childs;
      } else {
        modLenght = sIndex.jinengList;
      }
      sIndex.checkAll = checkedCount === modLenght.length;
      sIndex.isIndeterminate =
        checkedCount > 0 && checkedCount < modLenght.length;
    },
    //取消按钮
    toggleSelection() {
      this.DatadialogVisible = false;
      this.formInline.addUser = null;
      this.selection.forEach(e => {
        e.checkedCities = [];
        e.isIndeterminate = false;
        e.checkAll = false;
      });
    },
    //查询数据
    searchData(name) {
      name = undefined ? null : name;
      this.getControlCommunities(name);
    },
    //获取用户列表
    async getControlCommunities(name = null, pageIndex = 1, pageSize = 10) {
      let arg = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        whereLambda: {}
      };
      arg.whereLambda.roleName = name || null; //名称
      GetRoles(arg)
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
    // 修改保存
    saveCommunity2(name) {
      if (name === "") {
        this.$message({
          type: "warning",
          message: "角色名称不能为空！",
          center: true
        });
        return false;
      } else {
        let postList = [];
        this.modifymune.forEach(data => {
          //   console.log(data)
          data.childs.forEach(childs => {
            data.checkedList.forEach(checkedList => {
              if (childs.menuName == checkedList) {
                postList.push(childs.menuId);
              }
            });
          });
        });
        let a = postList.join(",");
        // console.log(this.modifymune);
        let data = {
          roleName: this.formInline.addUser,
          isDelete: 0,
          menuId: a,
          roleId: this.roleId
        };
        OperateRole(data)
          .then(res => {
            const loading = this.$loading({
              lock: true,
              text: "加载中",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            setTimeout(() => {
              loading.close();
              this.$message({
                type: "success",
                message: "修改成功！",
                center: true
              });
              this.DatadialogVisible = false;
              this.getControlCommunities(
                null,
                this.pages.currentPage,
                this.pages.pageSize
              );
            }, 500);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    toggleSelection2() {
      this.formInline.addUser = null;
      this.DatadialogVisible = false;
      // this.getControlCommunities(
      //   null,
      //   this.pages.currentPage,
      //   this.pages.pageSize
      // );
    },
    // 添加用户
    async saveCommunity(name) {
      if (name === "") {
        this.$message({
          type: "warning",
          message: "角色名称不能为空！",
          center: true
        });
        return false;
      } else {
        let sbmitData = {
          roleName: name,
          menuId: []
        };
        for (let index = 0; index < this.selection.length; index++) {
          const element = this.selection[index];
          for (let dex = 0; dex < element.checkedCities.length; dex++) {
            sbmitData.menuId.push(element.checkedCities[dex].menuId);
          }
        }
        sbmitData.menuId = sbmitData.menuId.join(",");
        console.log(sbmitData);
        debugger
        OperateRole(sbmitData)
          .then(res => {
            const loading = this.$loading({
              lock: true,
              text: "加载中",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            setTimeout(() => {
              loading.close();
              this.$message({
                type: "success",
                message: "添加成功！",
                center: true
              });
              this.toggleSelection();
              this.getControlCommunities(
                null,
                this.pages.currentPage,
                this.pages.pageSize
              );
            }, 500);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //当前页面变化时
    handleCurrentChange(num) {
      this.pages.currentPage = num;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.getControlCommunities(null, pageIndex, pageSize);
    },
    //页面条数发生变化时
    handleSizeChange(val) {
      this.pages.pageSize = val;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.getControlCommunities(null, pageIndex, pageSize);
    },
    //修改
    handleModify(id) {
      this.mTable = false;
      this.DatadialogVisible = true;
      this.roleId = id;
      let data = { roleId: id };
      GetRolesDetail(data)
        .then(res => {
          let array = [];
          let data = res.data.ResponseModel.menu_eList;

          data.map((item, index) => {
            array.push(
              Object.assign({}, item, {
                checkAll: false,
                isIndeterminate: false,
                jinengList: [],
                checkedList: []
              })
            );
          });
          console.log(array)
          // debugger
          array.forEach(array => {
            array.selectMenus.forEach(selectMenus => {
              array.checkedList.push(selectMenus.menuName);
            });

            array.childs.forEach(childs => {
              array.jinengList.push(childs.menuName);
            });
            if (array.selectMenus.length != 0) {
              array.isIndeterminate = true;
            }
            if (array.selectMenus.length == array.childs.length) {
              array.checkAll = true;
              array.isIndeterminate = false;
            }
          });
          console.log(array);
          this.modifymune = array;
          this.formInline.addUser = res.data.ResponseModel.roleName;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除用户
    async handleDelete(id) {
      if (id) {
        let deleteData = {
          isDelete: 1,
          roleId: id
        };
        this.$confirm("此操作将永久删除该文件, 是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            try {
              return new Promise((resolve, reject) => {
                OperateRole(deleteData)
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
                          null,
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
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  .pagination {
    margin-top: 10px;
    text-align: center;
  }
  .client_table {
    margin-top: 20px;
  }
}
.line-h-30 {
  line-height: 30px;
}
.padding-lr {
  padding-left: 40px;
  padding-right: 40px;
}
.margin-l-p1 {
  margin-left: 1%;
}
</style>