
<!-- 查体扫描统计 -->
<template>
  <div>
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="导向">
        <el-select class="w-150" clearable v-model="seach.productOrderType" placeholder="请选择">
          <el-option
            v-for="item in seach.productOrderTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话">
        <el-input class="w-150" v-model="seach.memberName" placeholder="请输入客户电话"></el-input>
      </el-form-item>
      <el-form-item label="扫描时间">
        <el-date-picker
          class="w-250"
          v-model="seach.deliveryTime"
          type="datetimerange"
          format="yyyy-MM-dd HH-mm"
          value-format="yyyy-MM-dd HH-mm"
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
      <el-table-column align="center" prop="memberName" label="电话"></el-table-column>
      <el-table-column align="center" prop="sex" label="导向"></el-table-column>
      <el-table-column align="center" prop="phone" label="扫描时间"></el-table-column>
      <el-table-column align="center" prop="orderTime" label="是否到访"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="details(scope)"
            size="small"
          >匹配到访</el-button>
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
  </div>
</template>

<script>
// import { makeInsole, getHospitalList } from "../../api/javaApi";
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
      seach: { },
      loading: true
    };
  },
  mounted() {
    this.pageList();
  },
  methods: {
    //订单列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        orderUserName: this.seach.orderUserName || null,
        orderTimeBegin:
          this.seach.orderTime == null ? null : this.seach.orderTime[0],
        orderTimeEnd:
          this.seach.orderTime == null ? null : this.seach.orderTime[1],
        deliveryTimeBegin:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[0],
        deliveryTimeEnd:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[1],
        baseId: this.seach.baseId || null,
        hospitalId: this.seach.hospitalId || null,
        productOrderType: this.seach.productOrderType || null
      };
      this.loading = true;
      makeInsole(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.loading = false;
            let dataList = res.data.data;
            this.clientData = dataList.data;
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
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        orderUserName: this.seach.orderUserName || null,
        orderTimeBegin:
          this.seach.orderTime == null ? null : this.seach.orderTime[0],
        orderTimeEnd:
          this.seach.orderTime == null ? null : this.seach.orderTime[1],
        deliveryTimeBegin:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[0],
        deliveryTimeEnd:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[1],
        baseId: this.seach.baseId || null,
        hospitalId: this.seach.hospitalId || null,
        productOrderType: this.seach.productOrderType || null
      };
      const lsyObj = {
        method: "post",
        fileName: "鞋垫制作统计表",
        url: javaApi.makeInsoleExport,
        data: data
      };
      exportMethod(this, lsyObj);
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
    },
  }
};
</script>

<style scoped lang="scss">
.pagination {
    margin-top: 10px;
    text-align: center;
  }
</style>
