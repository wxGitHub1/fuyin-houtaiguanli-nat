<template>
  <!-- 体检拓展 -->
  <div class="container" style="height: 750px;overflow-y: scroll">
    <el-row style="border-bottom: 1px solid #EBEEF5;padding-bottom: 16px;">
          <el-col :span="2" class="first-text-two">
            <span>省份:</span>
          </el-col>
          <el-col :span="2" style="width: 7%;">
            <el-select
              size="small"
              v-model="search.province"
              :clearable="true"
              value-key="proviceId"
              @change="getCities(search.province, type=2)"
            >
              <el-option
                v-for="item in provinces"
                :key="item.proviceId"
                :value="item"
                :label="item.proviceName"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="text-two">
            <span>城市:</span>
          </el-col>
          <el-col :span="2" style="width: 7%;">
            <el-select
              size="small"
              :clearable="true"
              value-key="cityId"
              v-model="search.city"
              @change="getCounty(search.city, type=2)"
            >
              <el-option
                v-for="item in cities"
                :key="item.cityId"
                :value="item"
                :label="item.cityName"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="text-two">
            <span>站点:</span>
          </el-col>
          <el-col :span="3">
            <el-select
              size="small"
              :clearable="true"
              value-key="cityId"
              v-model="search.siteId"
            >
              <el-option v-for="item in siteList" :key="item.hospitalId" :value="item.hospitalId" :label="item.name"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="text-two">
            <span>区县:</span>
          </el-col>
          <el-col :span="2" style="width: 7%;">
            <el-select
              :clearable="true"
              size="small"
              value-key="countyId"
              v-model="search.county"
              @change="getCountyId(search.county, type=2)"
            >
              <el-option
                v-for="item in counties"
                :key="item.countyId"
                :value="item"
                :label="item.countyName"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="text-two">
            <span>社区:</span>
          </el-col>
          <el-col :span="2" style="width: 7%;">
            <el-select
              :clearable="true"
              size="small"
              value-key="communityId"
              v-model="search.community"
            >
              <el-option
                v-for="item in communityList"
                :key="item.communityId"
                :value="item"
                :label="item.communityName"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="text-four">查体时间:</el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="search.examTime"
              type="daterange"
              range-separator="至"
              size="small"
              style="width: 100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
    </el-row>
    <el-row class="search">
      <el-col :span="2" class="first-text-four">
        <span>查体类型:</span>
      </el-col>
      <el-col :span="2" style="width: 7%">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.examType">
          <el-option v-for="item in examType" :key="item.zoom" :value="item" :label="item.type"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="text-three">
        <span>负责人:</span>
      </el-col>
      <el-col :span="2" >
        <el-input placeholder="输入录入人" size="small" v-model="search.linkPeopleName "></el-input>
      </el-col>
      <el-col :span="2" class="top-schear-but">
        <el-button type="danger" style="width:100%" size="small" @click="outExcel()">导出Excel</el-button>
      </el-col>
      <el-col :span="2" class="top-schear-but">
        <el-button type="success" style="width:100%" size="small" @click="searchData()">查询</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;text-align: center;"></el-row>
    <el-row class="client_table" style="min-height: 470px;">
      <el-col :span="24">
        <el-table :border="true" :data="clientData" style="width: 100%">
          <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="proviceName" label="省份" min-width="60"></el-table-column>
          <el-table-column align="center" prop="cityName" label="城市" min-width="60"></el-table-column>
          <el-table-column align="center" prop="hospitalName" label="站点" min-width="60"></el-table-column>
          <el-table-column align="center" prop="countyName" label="区县" min-width="60"></el-table-column>
          <el-table-column align="center" prop="communityName" label="社区" min-width="80"></el-table-column>
          <el-table-column align="center" prop="physicalType" label="体检类型" min-width="80"></el-table-column>
          <el-table-column align="center" prop="physicalmodelTotalCount" label="体检总人数" min-width="100"></el-table-column>
          <el-table-column align="center" prop="problemmodelTotalCount" label="问题总人数" min-width="60"></el-table-column>
          <el-table-column align="center" prop="visitmodelTotalCount" label="到访人数" min-width="60"></el-table-column>
          <el-table-column align="center" prop="physicalDevice" label="查体设备" min-width="80"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pages.currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pages.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total"
        ></el-pagination>
      </el-col>
    </el-row>
    <el-row class="statistic_row">
      <el-col :span="3" :offset="1">
        <span>合计：</span>
      </el-col>
      <el-col :span="3">
        <span>区县数量：{{totalStatistic.countyCount || 0}}</span>
      </el-col>
      <el-col :span="3">
        <span>社区数量：{{totalStatistic.communityCount || 0}}</span>
      </el-col>
      <el-col :span="3">
        <span>体检总人数：{{totalStatistic.physicalTotalCount || 0}}</span>
      </el-col>
      <el-col :span="3">
        <span>问题总人数：{{totalStatistic.problemTotalCount || 0}}</span>
      </el-col>
      <el-col :span="3">
        <span>到访总人数：{{totalStatistic.visitTotalCount || 0}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getProvince,
  getCity,
  getCountys,
  addCommunity,
  getCommunity,
  getOutCommunity
} from "../../../api/address";
import {
  GetExpandRepeat
} from "../../../api/datalist";
import session from "../../../utils/session";
import { all, Promise } from "q";
import $axios from "axios";
import { dateFormat } from "../../../utils/timeformat";

export default {
  name: "App",
  data() {
    return {
      siteId:null,
      siteList:[],
      user:null,
      clientData: [],
      date: "",
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      //录入数据弹出框
      InputdialogVisible: false,
      // 详情弹出框
      InfodialogVisible: false,
      // 上传文件
      fileList: [],
      //选择性别
      radio: "man",
      //病症
      checkList: [],
      //省份
      province: null,
      provinces: [],
      number: null,
      //城市
      city: null,
      cities: [],
      //区县
      county: null,
      counties: [],
      //社区
      community: null,
      //社区信息
      communityName: null,
      //社区列表
      communityList: null,
      //查询数据
      search: {
        clientName: null,
        phone: null,
        isArrive: null,
        linkPeopleName : null,
        province: null,
        city: null,
        county: null,
        community: null,
        examPeople: null,
        examTime: null,
        // timeLength: null,
        // examCycle: null,
        inputTime: null,
        quarter: null,
        examType: null,
        examDevice: null
      },
    //查体类型
      examType: [
        { type: "入园", zoom: 1 },
        { type: "入校", zoom: 2 },
        { type: "入托", zoom: 3 }
      ],
      
      //体检时间
      examTime: null,
      //录入时间
      inputTime: null,
      // 录入数据
      inputData: {
        province: null,
        city: null,
        community: null,
        county: null,
        examPeople: null,
        linkPeopleName : null,
        examTime: null,
        clientName: null,
        sex: "1",
        phone: null,
        schoolName: null,
        sumNumber: null,
        
      },
      //数据详情与修改
      modifyData: {
        province: null,
        city: null,
        community: null,
        county: null,
        examPeople: null,
        linkPeopleName : null,
        examTime: null,
        clientName: null,
        sex: "男",
        phone: null,
        schoolName: null,
       
      },
      //问题人数添加状态
      countStatus: 0,
      //合计统计
      totalStatistic: {
        communityCount:"",
        countyCount:"",
        physicalTotalCount:"",
        problemTotalCount:"",
        visitTotalCount:"",
      }
    };
  },
  mounted() {
    this.siteList = session.getItem("site");
    this.userId = session.getItem("user");
    //获取列表
    this.getControlCommunities();
    //获取地址
    this.getAddress();
  },
  methods: {
    //导出Execl
    async outExcel() {
      let arg = {
        whereLambda: {
          hospitalId: this.search.siteId || 0,
          userId: this.userId || null,
        }
      };
      if (this.search.province) {
        arg.whereLambda.proviceId = this.search.province.proviceId; //省份
      } else {
        arg.whereLambda.proviceId = 0;
      }
      if (this.search.city) {
        arg.whereLambda.cityId = this.search.city.cityId; //城市
      } else {
        arg.whereLambda.cityId = 0;
      }
      if (this.search.community) {
        arg.whereLambda.communityId = this.search.community.communityId; //社区
      } else {
        arg.whereLambda.communityId = 0;
      }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId; //区县
      } else {
        arg.whereLambda.countyId = 0;
      }

      if (this.search.examTime) {
        let result = dateFormat(
          this.search.examTime[0],
          this.search.examTime[1]
        );
        arg.whereLambda.physicalBeginTime = result.beginTimes || null; //体检开始时间
        arg.whereLambda.physicalEndTime = result.endTimes || null; //体检结束时间
      } else {
        arg.whereLambda.physicalBeginTime = null;
        arg.whereLambda.physicalEndTime = null;
      }

      arg.whereLambda.linkPeopleName  = this.search.linkPeopleName  || null; //负责人

      if (this.search.examType) {
        arg.whereLambda.physicalType = this.search.examType.zoom; //体检类型
      } else {
        arg.whereLambda.physicalType = 0;
      }
      let envUrl = 'http://192.168.3.220:83/api/Userphysical/ExportExpandRepeat';//测试
      // let envUrl = 'http://192.168.3.220:83/api/Userphysical/ExportExpandRepeat';//上线
        let exportArg =
        "?proviceId=" +
        arg.whereLambda.proviceId +
        "&cityId=" +
        arg.whereLambda.cityId +
        "&countyId=" +
        arg.whereLambda.countyId +
        "&communityId=" +
        arg.whereLambda.communityId +
        "&physicalBeginTime=" +
        arg.whereLambda.physicalBeginTime +
        "&physicalEndTime=" +
        arg.whereLambda.physicalEndTime +
        "&physicalType=" +
        arg.whereLambda.physicalType +
        "&linkPeopleName=" +
        arg.whereLambda.linkPeopleName+
        "&hospitalId=" +
        arg.whereLambda.hospitalId 

      let endArg = envUrl + exportArg;

      // window.location.href = endArg;
      window.open(endArg);
    },

    //获取列表
    async getControlCommunities(pageIndex = 1, pageSize = 10) {
      let arg = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        whereLambda: {
          hospitalId: this.search.siteId || null,
          userId: this.userId || null,
        }
      };
      if (this.search.province) {
        arg.whereLambda.proviceId = this.search.province.proviceId; //省份
      } else {
        arg.whereLambda.proviceId = null;
      }
      if (this.search.city) {
        arg.whereLambda.cityId = this.search.city.cityId; //城市
      } else {
        arg.whereLambda.cityId = null;
      }
      if (this.search.community) {
        arg.whereLambda.communityId = this.search.community.communityId; //社区
      } else {
        arg.whereLambda.communityId = null;
      }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId; //区县
      } else {
        arg.whereLambda.countyId = null;
      }

      if (this.search.examTime) {
        let result = dateFormat(
          this.search.examTime[0],
          this.search.examTime[1]
        );
        arg.whereLambda.physicalBeginTime = result.beginTimes || null; //体检开始时间
        arg.whereLambda.physicalEndTime = result.endTimes || null; //体检结束时间
      } else {
        arg.whereLambda.physicalStartTime = null;
        arg.whereLambda.physicalEndTime = null;
      }

      if (this.search.examType) {
        arg.whereLambda.physicalType = this.search.examType.zoom || null; //体检类型
      } else {
        arg.whereLambda.physicalType = null;
      }
      
      arg.whereLambda.linkPeopleName  = this.search.linkPeopleName  || null;// 负责人
      
      try {
        return new Promise((resolve, reject) => {
          GetExpandRepeat(arg)
            .then(res => {
              // debugger
              const loading = this.$loading({
            lock: true,
            text: "加载中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
              resolve(res);
              let dataList = res.data.ResponseModel;
              if (dataList) {
                setTimeout(() => {
                  loading.close();
                  this.clientData = dataList.list;
                  this.pages.total = dataList.total;
                  this.totalStatistic.communityCount=dataList.communityCount;
                  this.totalStatistic.countyCount=dataList.countyCount;
                  this.totalStatistic.physicalTotalCount=dataList.physicalTotalCount;
                  this.totalStatistic.problemTotalCount=dataList.problemTotalCount;
                  this.totalStatistic.visitTotalCount=dataList.visitTotalCount;
                }, 500);
              } else {
                this.clientData = null;
                this.pages.total = 0;
                loading.close();
              }
            })
            .catch(err => {
              reject(err);
            });
        });
      } catch (err) {
        console.log(err);
      }
    },

    //查询数据
    async searchData() {
      this.getControlCommunities();
    },

    //获取省份
    async getAddress() {
      try {
        return new Promise((resolve, reject) => {
          let data={userId:this.userId}
          getProvince(data)
            .then(res => {
              resolve(res);
              this.provinces = res.data.ResponseModel;
            })
            .catch(err => {
              reject(err);
            });
        });
      } catch (e) {
        console.log(e);
      }
    },
    //获取城市

    async getCities(item, type) {
      //根据类型判断重载机制
      switch (type) {
        case 1:
          this.modifyData.city = null;
          this.modifyData.county = null;
          this.modifyData.community = null;
          break;
        case 2:
          this.search.city = null;
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.inputData.city = null;
          this.inputData.county = null;
          this.inputData.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      if (item) {
        let proviceVal = item.proviceId;
        // this.addNewList.proviceId = item.proviceId;
        try {
          return new Promise((resolve, reject) => {
            getCity({ proviceId: proviceVal,userId:this.userId })
              .then(res => {
                resolve(res);
                this.cities = res.data.ResponseModel;
              })
              .catch(err => {
                reject(err);
              });
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    //获取区县
    async getCounty(item, type) {
      switch (type) {
        case 1:
          this.modifyData.county = null;
          this.modifyData.community = null;
          break;
        case 2:
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.inputData.county = null;
          this.inputData.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      if (item) {
        let cityVal = item.cityId;
        // this.addNewList.cityId = item.cityId;
        try {
          return new Promise((resolve, reject) => {
            getCountys({ cityId: cityVal })
              .then(res => {
                resolve(res);
                this.counties = res.data.ResponseModel;
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(err => {
            reject(err);
          });
        } catch (err) {
          console.log(err);
        }
      }
    },

    //获取区县Id
    getCountyId(item, type) {
      switch (type) {
        case 1:
          this.modifyData.community = null;
          break;
        case 2:
          this.search.community = null;
          break;
        case 3:
          this.inputData.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      // this.addNewList.countyId = item.countyId;
      // 获取社区
      if (item) {
        let countyVal = item.countyId;

        try {
          return new Promise((resolve, reject) => {
            getCommunity({ countyId: countyVal })
              .then(res => {
                // debugger
                resolve(res);
                if (res.data.Error) {
                  this.communityList = null;
                  return null;
                } else {
                  this.communityList = res.data.ResponseModel.list;
                }
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(err => {
            reject(err);
          });
        } catch (err) {
          console.log(err);
        }
      }
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
    },
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  .search {
    // text-align: center;
    padding-top: 16px;
  }
  .another_row {
    text-align: center;
    margin-top: 20px;
    span {
      line-height: 30px;
    }
  }
  .client_table {
    margin-top: 20px;
  }
  .statistic_row {
    background-color: rgba(251, 152, 0, 1);
    padding: 15px 0;
    margin-top: 15px;
    color: #fff;
  }
  .pagination {
    margin-top: 0px;
    text-align: center;
  }
  .check_box {
    width: 13%;
  }
  .foot_btn {
    margin: 20px 0 0 0;
  }
}
</style>