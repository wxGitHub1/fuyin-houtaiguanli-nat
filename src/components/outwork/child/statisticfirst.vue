<template>
  <!-- 体检统计 -->
  <div class="container" style="height: 750px;overflow-y: scroll">
    <el-row>
      <el-col
        :span="24"
        style="border-bottom: 1px solid #EBEEF5;padding-bottom: 16px;text-align: center;"
      >
        <el-row>
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
          <el-col :span="2" class="text-three">
            <span>查体人:</span>
          </el-col>
          <el-col :span="2" style="width: 7%;">
            <el-input placeholder="输入查体人" v-model="search.examPeople" size="small"></el-input>
          </el-col>
          <el-col :span="2" class="text-two">
            <span>病情:</span>
          </el-col>
          <el-col :span="2">
            <el-select size="small" :clearable="true" v-model="search.illness">
              <el-option v-for="(item, index) in illnessList" :key="index" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="text-four">查体时间:</el-col>
          <el-col :span="4">
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
      <el-col :span="2" class="text-two">
        <span>站点:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          size="small"
          :clearable="true"
          value-key="cityId"
          v-model="search.siteId"
        >
          <el-option v-for="item in siteList" :key="item.hospitalId" :value="item.hospitalId" :label="item.name"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="text-four">
        <span>查体设备:</span>
      </el-col>
      <el-col :span="2" style="width: 7%">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.examDevice">
          <el-option v-for="item in examDevice" :key="item.zoom" :value="item" :label="item.type"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="text-three">
        <span>录入人:</span>
      </el-col>
      <el-col :span="2">
        <el-input placeholder="输入录入人" size="small" v-model="search.inputPeople"></el-input>
      </el-col>
      <el-col :span="2" class="text-two">
        <span>季度:</span>
      </el-col>
      <el-col :span="2" style="text-align: left;width: 7%;">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.quarter">
          <el-option v-for="item in season" :key="item.zoom" :value="item" :label="item.type"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="text-four">录入时间:</el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="search.inputTime"
          type="daterange"
          range-separator="至"
          size="small"
          style="width: 100%"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" class="top-schear-but">
        <el-button type="warning" size="small" style="width:100%" @click="outExcel()">导出Excel</el-button>
      </el-col>
      <el-col :span="1" class="top-schear-but">
        <el-button type="success" size="small" style="width:100%" @click="searchData()">查询</el-button>
      </el-col>
    </el-row>
    <el-row class="client_table" style="min-height: 470px;">
      <el-col :span="24">
        <el-table :border="true" :data="clientData" style="width: 100%">
          <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="countyName" label="区县" min-width="60"></el-table-column>
          <el-table-column align="center" prop="hospitalName" label="站点" min-width="60"></el-table-column>
          <el-table-column align="center" prop="communityName" label="社区" min-width="80"></el-table-column>
          <el-table-column align="center" prop="physicalIdcount" label="查体总数" min-width="100"></el-table-column>
          <el-table-column align="center" prop="communityproblemCount" label="问题人数" min-width="60"></el-table-column>
          <el-table-column align="center" prop="physicalType" label="查体类型" min-width="60"></el-table-column>
          <el-table-column align="center" prop="physicalDevice" label="查体设备" min-width="80"></el-table-column>
          <el-table-column align="center" prop="quarter" label="季度" min-width="70"></el-table-column>
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
    <el-row class="statistic_row" style="margin-top: 15px;">
      <el-col :span="1" :offset="1">
        <span>合计：</span>
      </el-col>
      <el-col :span="3">
        <span>查体总人数：{{totalStatistic.physicalIdTotalCount  || 0}}</span>
      </el-col>
      <el-col :span="3">
        <span>问题总人数：{{totalStatistic.problemCount || 0}}</span>
      </el-col>
      <el-col :span="3">
        <span>足弓发育不良：{{totalStatistic.poorarchcount || 0}}</span>
      </el-col>
      <el-col :span="2">驼背: {{totalStatistic.humpbackCount || 0}}</el-col>
      <el-col :span="2">
        <span>跟骨内翻：{{totalStatistic.calcanealvarus || 0}}</span>
      </el-col>
      <el-col :span="2">
        <span>跟骨外翻：{{totalStatistic.heelboneeversion || 0}}</span>
      </el-col>
      <el-col :span="2">
        <span>膝外翻：{{totalStatistic.genylegCount || 0}}</span>
      </el-col>
      <el-col :span="2">
        <span>膝内翻：{{totalStatistic.bandylegCount || 0}}</span>
      </el-col>
      <el-col :span="2">
        <span>膝过伸：{{totalStatistic.kennlegCount || 0}}</span>
      </el-col>
    </el-row>
    <el-row class="statistic_row">
      <el-col :span="3" style="margin-left: 33.1%;">长短腿: {{totalStatistic.longshortlegCount || 0}}</el-col>
      <el-col :span="2">拇外翻: {{totalStatistic.halluxvalgusCount || 0}}</el-col>
      <el-col :span="2">斜颈: {{totalStatistic.torticollisCount || 0}}</el-col>
      <el-col :span="2">高低肩: {{totalStatistic.highlowshoulderCount || 0}}</el-col>
      <el-col :span="2">鸡胸:{{totalStatistic.chickenbreastCount || 0}}</el-col>
      <el-col :span="2">脊柱侧弯: {{totalStatistic. scoliosisCount || 0}}</el-col>
      <el-col :span="2">膝屈曲:{{totalStatistic.kneebuckling || 0}}</el-col>
    </el-row>
    <el-row class="statistic_row">
      <el-col :span="3" style="margin-left: 33.1%;">骨盆倾斜: {{totalStatistic.inclinationCount || 0}}</el-col>
      <el-col :span="2">足内旋: {{totalStatistic.pronation || 0}}</el-col>
      <el-col :span="2">足外旋: {{totalStatistic.pronationout || 0}}</el-col>
      <el-col :span="2">足内翻: {{totalStatistic.strephenopodia || 0}}</el-col>
      <el-col :span="2">
        <span>足外翻：{{totalStatistic.strephenopodiaout || 0}}</span>
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
  outputNurseryData,
  addNurseryData,
  inputStatus,
  outExcelData,
  examStatistic
} from "../../../api/datalist";
import session from "../../../utils/session";
import pathUrl from "../../../api/pathUrl";
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
      clientChoseDate: "",
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
        inputPeople: null,
        illness: null,
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
      //季度
      season: [{ type: "春季", zoom: 1 }, { type: "秋季", zoom: 2 }],
      //是否到访
      isVisit: [{ type: "是", zoom: 1 }, { type: "否", zoom: 2 }],
      //体检设备
      examDevice: [
        { type: "便携设备", zoom: 1 },
        { type: "台式设备", zoom: 2 },
        { type: "数据设备", zoom: 3 }
      ],
      examType: [
        { type: "入园", zoom: 1 },
        { type: "入校", zoom: 2 },
        { type: "入托", zoom: 3 }
      ],
      //病情
      illnessList: [
        "足弓发育不良",
        "拇外翻",
        "足外旋",
        "足内旋",
        "足外翻",
        "足内翻",
        "跟骨外翻",
        "跟骨内翻",
        "膝外翻",
        "膝内翻",
        "膝过伸",
        "膝屈曲",
        "骨盆倾斜",
        "脊柱侧弯",
        "高低肩",
        "驼背",
        "斜颈",
        "长短腿",
        "鸡胸"
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
        inputPeople: null,
        examTime: null,
        clientName: null,
        sex: "1",
        phone: null,
        schoolName: null,
        sumNumber: null,
        illnessList: []
      },
      //数据详情与修改
      modifyData: {
        province: null,
        city: null,
        community: null,
        county: null,
        examPeople: null,
        inputPeople: null,
        examTime: null,
        clientName: null,
        sex: "男",
        phone: null,
        schoolName: null,
        illnessList: []
      },
      //问题人数添加状态
      countStatus: 0,
      //合计统计
      totalStatistic: {
        //体检总人数
        physicalIdTotalCount: null,
        //问题总人数
        problemCount: null,
        //足弓发育不良
        poorarchcount: null,
        //足内旋
        pronation: null,
        //足外旋
        pronationout: null,
        //足内翻
        strephenopodia: null,
        //足外翻
        strephenopodiaout: null,
        //跟骨内翻
        calcanealvarus: null,
        //跟骨外翻
        heelboneeversion: null,
        //膝外翻
        genylegCount: null,
        //膝内翻
        bandylegCount: null,
        //膝过伸
        kennlegCount: null,
        //长短腿
        longshortlegCount: null,
        //驼背
        humpbackCount: null,
        //拇外翻
        halluxvalgusCount: null,
        //斜颈
        torticollisCount: null,
        //高低肩
        highlowshoulderCount: null,
        //鸡胸
        chickenbreastCount: null,
        //膝屈曲
        kneebuckling: null,
        //脊柱侧弯
        scoliosisCount: null,
        //骨盆倾斜
        inclinationCount: null
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

      if (this.search.inputTime) {
        let result = dateFormat(
          this.search.inputTime[0],
          this.search.inputTime[1]
        );
        arg.whereLambda.inputBeginTime = result.beginTimes || null; //录入开始时间
        arg.whereLambda.inputEndTime = result.endTimes || null; //录入结束时间
      } else {
        arg.whereLambda.inputBeginTime = null;
        arg.whereLambda.inputEndTime = null;
      }

      arg.whereLambda.sysUserName = this.search.examPeople || null; //体检人

      arg.whereLambda.inputPeople = this.search.inputPeople || null; //录入人

      if (this.search.examDevice) {
        arg.whereLambda.device = this.search.examDevice.zoom; //体检设备
      } else {
        arg.whereLambda.device = null;
      }

      if (this.search.examType) {
        arg.whereLambda.physicalType = this.search.examType.zoom; //体检类型
      } else {
        arg.whereLambda.physicalType = null;
      }

      if (this.search.quarter) {
        //季度
        arg.whereLambda.quarter = this.search.quarter.zoom;
      } else {
        arg.whereLambda.quarter = null;
      }

      arg.whereLambda.bak = this.search.illness || null;

      let envUrl =pathUrl.pathUrl_net+'/api/Userphysical/ExportRepeat';//测试
      // let envUrl = "http://117.34.105.87:88/api/Userphysical/ExportRepeat";//上线

      let exportArg =
        "?proviceId=" +
        arg.whereLambda.proviceId +
        "&cityId=" +
        arg.whereLambda.cityId +
        "&countyId=" +
        arg.whereLambda.countyId +
        "&communityId=" +
        arg.whereLambda.communityId +
        "&sysUserName=" +
        arg.whereLambda.sysUserName +
        "&bak=" +
        arg.whereLambda.bak +
        "&physicalBeginTime=" +
        arg.whereLambda.physicalStartTime +
        "&physicalEndTime=" +
        arg.whereLambda.physicalEndTime +
        "&physicalType=" +
        arg.whereLambda.physicalType +
        "&physicalDevice=" +
        arg.whereLambda.device +
        "&inputPeople=" +
        arg.whereLambda.inputPeople +
        "&quarter=" +
        arg.whereLambda.quarter +
        "&inputBeginTime=" +
        arg.whereLambda.inputBeginTime +
        "&inputEndTime=" +
        arg.whereLambda.inputEndTime+
        "&userId=" +
        arg.whereLambda.userId+
        "&hospitalId=" +
        arg.whereLambda.hospitalId;

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

      if (this.search.inputTime) {
        let result = dateFormat(
          this.search.inputTime[0],
          this.search.inputTime[1]
        );
        arg.whereLambda.inputBeginTime = result.beginTimes || null; //录入开始时间
        arg.whereLambda.inputEndTime = result.endTimes || null; //录入结束时间
      } else {
        arg.whereLambda.inputBeginTime = null;
        arg.whereLambda.inputEndTime = null;
      }

      arg.whereLambda.sysUserName = this.search.examPeople || null; //体检人

      if (this.search.examDevice) {
        arg.whereLambda.device = this.search.examDevice.zoom || null; //体检设备
      } else {
        arg.whereLambda.device = null;
      }

      if (this.search.examType) {
        arg.whereLambda.physicalType = this.search.examType.zoom || null; //体检类型
      } else {
        arg.whereLambda.physicalType = null;
      }

      if (this.search.quarter) {
        //季度
        arg.whereLambda.quarter = this.search.quarter.zoom;
      } else {
        arg.whereLambda.quarter = null;
      }

      arg.whereLambda.bak = this.search.illness || null;

      try {
        return new Promise((resolve, reject) => {
          examStatistic(arg)
            .then(res => {
              // debugger
              const loading = this.$loading({
                lock: true,
                text: "加载中",
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
                  this.totalStatistic.physicalIdTotalCount =
                    dataList.physicalIdTotalCount;
                  this.totalStatistic.problemCount = dataList.problemCount;
                  this.totalStatistic.pronation = dataList.pronation;
                  this.totalStatistic.poorarchcount = dataList.poorarchcount;
                  this.totalStatistic.pronationout = dataList.pronationout;
                  this.totalStatistic.strephenopodia = dataList.strephenopodia;
                  this.totalStatistic.strephenopodiaout =
                    dataList.strephenopodiaout;
                  this.totalStatistic.calcanealvarus = dataList.calcanealvarus;
                  this.totalStatistic.heelboneeversion =
                    dataList.heelboneeversion;
                  this.totalStatistic.genylegCount = dataList.genylegCount;
                  this.totalStatistic.bandylegCount = dataList.bandylegCount;
                  this.totalStatistic.kennlegCount = dataList.kennlegCount;
                  this.totalStatistic.longshortlegCount =
                    dataList.longshortlegCount;
                  this.totalStatistic.humpbackCount = dataList.humpbackCount;
                  this.totalStatistic.halluxvalgusCount =
                    dataList.halluxvalgusCount;
                  this.totalStatistic.torticollisCount =
                    dataList.torticollisCount;
                  this.totalStatistic.highlowshoulderCount =
                    dataList.highlowshoulderCount;
                  this.totalStatistic.chickenbreastCount =
                    dataList.chickenbreastCount;
                  this.totalStatistic.funnelchestCount =
                    dataList.funnelchestCount;
                  this.totalStatistic.kneebuckling = dataList.kneebuckling;
                  this.totalStatistic.scoliosisCount = dataList.scoliosisCount;
                  this.totalStatistic.inclinationCount =
                    dataList.inclinationCount;
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

    //上传文件
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },

    handlePreview(file) {
      // console.log(file);
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    //获取详情
    handleOrder(item) {
      this.InfodialogVisible = true;
      if (item) {
        this.modifyData.province = item.proviceName;
        this.modifyData.city = item.cityName;
        this.modifyData.community = item.communityName;
        this.modifyData.county = item.countyName;
        this.modifyData.examPeople = item.sysUserName;
        this.modifyData.inputPeople = item.inputPeople;
        this.modifyData.examTime = item.inputTime;
        this.modifyData.clientName = item.userName;
        this.modifyData.sex = item.sex;
        this.modifyData.sex = item.sex;
        this.modifyData.phone = item.patriarchicPhone;
        this.modifyData.schoolName = item.schoolId;
        if (item.bak) {
          this.modifyData.illnessList = item.bak.split(",");
        }
      }
    },

    //删除
    handleDelete(item) {
      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功！"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //录入数据
    async saveInputData(type) {
      let allData;
      if (type === "input") {
        allData = this.inputData;
      } else if (type === "info") {
        allData = this.modifyData;
      }
      for (let name in allData) {
        if (allData[name] === null || allData[name] === "") {
          this.$message({
            type: "warning",
            message: "请正确填写表格！",
            center: true
          });
          return false;
        }
      }
      let inputDatas = {
        proviceId: allData.province.proviceId,
        cityId: allData.city.cityId,
        countyId: allData.county.countyId,
        communityId: allData.community.communityId,
        physicalTime: allData.examTime,
        inputPeople: allData.inputPeople,
        sysUserName: allData.examPeople,
        userName: allData.clientName,
        sex: allData.sex,
        patriarchicPhone: allData.phone,
        schoolId: "1",
        physicalIdTotalCount: allData.sumNumber,
        bak: allData.illnessList.join(",")
      };
      try {
        return new Promise((resolve, reject) => {
          addNurseryData(inputDatas)
            .then(res => {
              resolve(res);
              const loading = this.$loading({
                lock: true,
                text: "保存中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              if (!res.data.Error) {
                let uid = session.getItem("user");
                let arg = {
                  uId: uid,
                  ope: 0
                };
                setTimeout(() => {
                  loading.close();
                  this.getControlCommunities(pageIndex, pageSize);
                  this.$message({
                    type: "success",
                    message: "保存成功！",
                    center: true
                  });
                }, 1000);
                this.inputData.clientName = null;
                this.inputData.phone = null;
                this.inputData.schoolName = null;
                this.inputData.illnessList = [];
                if (type === "input") {
                  try {
                    return new Promise((resolve, reject) => {
                      inputStatus(arg)
                        .then(res => {
                          resolve(res);
                          if (res) {
                            let countState = res.data.ResponseModel.sCount;
                            this.countStatus = countState;
                          }
                        })
                        .then(err => {
                          console.log(err);
                        });
                    }).then(err => {
                      reject(res);
                    });
                  } catch (err) {
                    console.log(err);
                  }
                } else if (type === "info") {
                  this.InfodialogVisible = false;
                }
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
    //结束本次录入
    async endInput() {
      let uid = session.getItem("user");
      let arg = {
        uId: uid,
        ope: 1
      };
      this.$confirm("此操作将结束你的录入状态，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          try {
            return new Promise((resolve, reject) => {
              inputStatus(arg)
                .then(res => {
                  const loading = this.$loading({
                    lock: true,
                    text: "保存中",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                  });
                  resolve(res);
                  if (!res.data.Error) {
                    this.countStatus = 0;
                    setTimeout(() => {
                      loading.close();
                      this.$message({
                        type: "success",
                        message: "已结束录入！",
                        center: true
                      });
                      this.InputdialogVisible = false;
                    }, 1000);
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
            message: "已取消！",
            center: true
          });
        });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  .search {
    text-align: center;
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


// WEBPACK FOOTER //
// src/components/outwork/child/statisticfirst.vue