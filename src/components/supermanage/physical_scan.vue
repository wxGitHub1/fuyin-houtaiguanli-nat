
<!-- 查体扫描统计 -->
<template>
  <div>
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="导向">
        <el-select class="w-150" clearable v-model="seach.guide" placeholder="请选择">
          <el-option
            v-for="item in seach.guideList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否到访">
        <el-select class="w-150" clearable v-model="seach.isVisit" placeholder="请选择">
          <el-option
            v-for="item in seach.isVisitList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入客户电话"></el-input>
      </el-form-item>
      <el-form-item label="扫描时间">
        <el-date-picker
          class="w-250"
          v-model="seach.beginsaomiaoshijian"
          type="datetimerange"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="pageList(pages.currentPage,pages.pageSize)"
          type="warning"
          icon="el-icon-search"
        >查询</el-button>
        <el-button type="danger" icon="el-icon-download" @click="exportExcels()">导出excel</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="clientData"
      max-height="680"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="phone" label="电话"></el-table-column>
      <el-table-column align="center" prop="direct" label="导向"></el-table-column>
      <el-table-column align="center" prop="saomiaoshijian" label="扫描时间"></el-table-column>
      <el-table-column align="center" prop="isvisit" label="是否到访"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="details(scope)" size="small">匹配到访</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Pagination 分页 -->
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
    <!-- 匹配到访弹框 -->
    <el-dialog
      title="匹配到访"
      :visible.sync="matchVisitDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
    >
      <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
        <el-form-item label="测评室">
          <el-select class="w-150" clearable v-model="modifyData" placeholder="请选择">
            <el-option
              v-for="item in modifyDataList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="serve()" type="success" icon="el-icon-circle-check">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetScanList, InsertScan2, ExportData } from "../../api/datalist";
import pathUrl from "../../api/pathUrl";
// import javaApi from "../../api/javaApi";
// import { exportMethod } from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      //分页
      clientData: [],
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      seach: {
        isVisit: null,
        isVisitList: [
          { name: "是", id: "1" },
          { name: "否", id: "0" }
        ],
        guide: null,
        guideList: [
          { id: 1, name: "专业儿童医院" },
          { id: 2, name: "西安市儿童医院" },
          { id: 3, name: "专业骨科医院" },
          { id: 4, name: "西安市红会医院" }
        ],
        phone: null,
        beginsaomiaoshijian: null
      },
      modifyDataList: [
        { name: "15楼测评中心", id: 1 },
        { name: "24楼测评中心", id: 2 }
      ],
      modifyData: null,
      loading: true,
      matchVisitDialog: false,
      scanid: null
    };
  },
  mounted() {
    this.pageList();
  },
  methods: {
    serve() {
      let data = {
        scanid: this.scanid,
        address: this.modifyData
      };
      InsertScan2(data)
        .then(res => {
          console.log(res);
          if (res.data.Error != false) {
            this.$message({
              type: "warning",
              message: res.data.ErrorMessage,
              center: true
            });
          } else {
            this.$message({
              type: "success",
              message: "匹配成功！",
              center: true
            });
            this.cancel();
            this.pageList(this.pages.currentPage, this.pages.pageSize);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(scope) {
      this.scanid = scope.row.scanid;
      this.matchVisitDialog = true;
    },
    cancel() {
      this.matchVisitDialog = false;
      this.scanid = null;
    },
    //订单列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        whereLambda: {
          phone: this.seach.phone || null,
          direct: this.seach.guide || null,
          isvisit: this.seach.isVisit || null,
          beginsaomiaoshijian:
            this.seach.beginsaomiaoshijian == null
              ? null
              : this.seach.beginsaomiaoshijian[0],
          endsaomiaoshijian:
            this.seach.beginsaomiaoshijian == null
              ? null
              : this.seach.beginsaomiaoshijian[1]
        }
      };
      this.loading = true;
      GetScanList(data)
        .then(res => {
          console.log(res);
          if (res.data.Error != false) {
            this.$message({
              type: "warning",
              message: res.data.ErrorMessage,
              center: true
            });
            this.loading = false;
            this.clientData = [];
            this.pages.total = 0;
          } else {
            this.loading = false;
            let dataList = res.data.ResponseModel;
            this.clientData = dataList.list;
            this.pages.total = dataList.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出excel
    exportExcels() {
      let data = {
        phone: this.seach.phone || null,
        direct: this.seach.guide || null,
        isvisit: this.seach.isVisit || null,
        beginsaomiaoshijian:
          this.seach.beginsaomiaoshijian == null
            ? null
            : this.seach.beginsaomiaoshijian[0],
        endsaomiaoshijian:
          this.seach.beginsaomiaoshijian == null
            ? null
            : this.seach.beginsaomiaoshijian[1]
      };
      let envUrl = pathUrl.pathUrl_net + "/api/Community/ExportData";

      let exportArg =
        "?phone=" +
        data.phone +
        "&direct=" +
        data.direct +
        "&isvisit=" +
        data.isvisit +
        "&beginsaomiaoshijian=" +
        data.beginsaomiaoshijian +
        "&endsaomiaoshijian=" +
        data.endsaomiaoshijian;
      let endArg = envUrl + exportArg;

      // window.location.href = endArg;
      window.open(endArg);

      // let data = {
      //     phone:this.seach.phone||null,
      //     direct:this.seach.guide||null,
      //     isvisit:this.seach.isVisit||null,
      //     beginsaomiaoshijian:this.seach.beginsaomiaoshijian == null ? null : this.seach.beginsaomiaoshijian[0],
      //     endsaomiaoshijian:this.seach.beginsaomiaoshijian == null ? null : this.seach.beginsaomiaoshijian[1],
      // };
      //  ExportData(data)
      //   .then(res => {
      //     console.log(res);
      //     if (res.data.Error != false) {
      //       this.$message({
      //         type: "warning",
      //         message: res.data.ErrorMessage,
      //         center: true
      //       });
      //     } else {
      //       this.$message({
      //         type: "success",
      //         message: "导出成功！",
      //         center: true
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // const lsyObj = {
      //   method: "post",
      //   fileName: "鞋垫制作统计表",
      //   url: javaApi.makeInsoleExport,
      //   data: data
      // };
      // exportMethod(this, lsyObj);
    },
    //当前页面变化时
    handleCurrentChange(num) {
      this.pages.currentPage = num;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.pageList(pageIndex, pageSize);
    },
    //页面条数发生变化时
    handleSizeChange(val) {
      this.pages.pageSize = val;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.pageList(pageIndex, pageSize);
    }
  }
};
</script>

<style scoped lang="scss">
.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
