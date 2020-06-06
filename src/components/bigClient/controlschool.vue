<template>
  <!-- 学校管理 -->
  <div class="container" style="height: 800px;overflow-y: scroll">
    <el-row class="search">
    <!-- 查询数据 -->
      <el-col :span="2" class="first-text-two">
        <span>省份:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          :clearable="true"
          size="small"
          v-model="search.province"
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
      <el-col :span="3">
        <el-select
          size="small"
          :clearable="true"
          value-key="cityId"
          v-model="search.city"
          @change="getCounty(search.city, type=2)"
        >
          <el-option v-for="item in cities" :key="item.cityId" :value="item" :label="item.cityName"></el-option>
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
          v-model="siteId"
        >
          <el-option v-for="item in siteList" :key="item.hospitalId" :value="item.hospitalId" :label="item.name"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="text-two">
        <span>区县:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          size="small"
          :clearable="true"
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
      <el-col :span="3">
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
        <span>负责人:</span>
      </el-col>
      <el-col :span="2">
        <el-input v-model="search.principal" placeholder="请输入姓名" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="2" class="first-text-four">
        <span>学校类型:</span>
      </el-col>
      <el-col :span="3">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.schoolType">
          <el-option v-for="item in schoolType" :key="item.zoom" :value="item" :label="item.type"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 130px;line-height: 30px;margin-left:1%">
        <span>学校/幼儿园名称:</span>
      </el-col>
      <el-col :span="4">
        <el-input v-model="search.schoolName" placeholder="请输入学校名称" size="small"></el-input>
      </el-col>
      <el-col :span="1" class="top-schear-but">
        <el-button size="small" type="warning" style="width:100%" class="btns" @click="searchData()">查询</el-button>
      </el-col>
      <el-col :span="1" class="top-schear-but">
        <el-button
          type="primary"
          style="width:100%"
          size="small"
          @click="DatadialogVisible = true"
          :disabled="limit.add"
        >新增</el-button>
      </el-col>
    </el-row>



    <el-row class="client_table">
      <el-col :span="24">
        <el-table :border="true" :data="clientData" style="width: 100%">
          <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="proviceName" label="省份" min-width="60"></el-table-column>
          <el-table-column align="center" prop="cityName" label="城市" min-width="60"></el-table-column>
          <el-table-column align="center" prop="hospitalName" label="站点" min-width="60"></el-table-column>
          <el-table-column align="center" prop="countyName" label="区县" min-width="60"></el-table-column>
          <el-table-column align="center" prop="communityName" label="社区" min-width="80"></el-table-column>
          <el-table-column align="center" prop="principal" label="负责人" min-width="60"></el-table-column>
          <el-table-column align="center" prop="type" label="学校类型" min-width="100"></el-table-column>
          <el-table-column align="center" prop="schoolName" label="学校名称" min-width="60"></el-table-column>
          <el-table-column align="center" prop="presidentName" label="校长姓名" min-width="60"></el-table-column>
          <el-table-column align="center" prop="presidentTel" label="校长电话" min-width="60"></el-table-column>
          <el-table-column align="center" prop="schoolDoctorName" label="校医姓名" min-width="60"></el-table-column>
          <el-table-column align="center" prop="schoolDoctorTel" label="校医电话" min-width="60"></el-table-column>
          <el-table-column align="center" prop="schoolAddress" label="学校地址" min-width="60"></el-table-column>
          <el-table-column align="center" prop="addTime" label="录入时间" min-width="80"></el-table-column>
          <el-table-column align="center" prop="userName" label="创建人" min-width="80"></el-table-column>
          <el-table-column align="center" prop="operation" label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleModify(scope.row)" size="small">修改</el-button>
              <el-button
                type="danger"
                @click="handleDelete(scope.row)"
                size="small"
                :disabled="limit.delete"
              >删除</el-button>
            </template>
          </el-table-column>
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
    <el-dialog
          :close-on-click-modal="false"
          title="数据录入"
          :visible.sync="DatadialogVisible"
          center
          :before-close="addClose"
        >
          <el-row>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
              <span class="after-red">省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                v-model="province"
                :clearable="true"
                value-key="proviceId"
                @change="getCities(province, type=1)"
              >
                <el-option
                  v-for="item in provinces"
                  :key="item.proviceId"
                  :value="item"
                  :label="item.proviceName"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left:1%;text-align:center;">
              <span class="after-red">城市:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                :clearable="true"
                value-key="cityId"
                v-model="city"
                @change="getCounty(city, type=1)"
              >
                <el-option
                  v-for="item in cities"
                  :key="item.cityId"
                  :value="item"
                  :label="item.cityName"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
              <span class="after-red">区县:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                :clearable="true"
                size="small"
                value-key="countyId"
                v-model="county"
                @change="getCountyId(county, type=1)"
              >
                <el-option
                  v-for="item in counties"
                  :key="item.countyId"
                  :value="item"
                  :label="item.countyName"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
              <span class="after-red">社区:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                :clearable="true"
                size="small"
                value-key="communityId"
                v-model="allData.community"
              >
                <el-option
                  v-for="item in communityList"
                  :key="item.communityId"
                  :value="item"
                  :label="item.communityName"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row
            style="margin-top: 30px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
          >
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%">
              <span class="after-red">负责人:</span>
            </el-col>
            <el-col :span="3">
              <el-input v-model="allData.principal" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left:1%">
              <span class="after-red">学校类型:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                :clearable="true"
                value-key="zoom"
                v-model="allData.schoolType"
              >
                <el-option
                  v-for="item in schoolType"
                  :key="item.zoom"
                  :value="item"
                  :label="item.type"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" style="width: 13%;line-height: 30px;margin-left: 1%;">
              <span class="after-red">学校/幼儿园名称:</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="allData.schoolName" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px;">
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 10%;">
              <span>校长姓名:</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="schoolObj.principalName" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 30%;">
              <span>校长电话:</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="schoolObj.principalPhone" placeholder="请输入电话" size="small"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px;">
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 10%;">
              <span>校医姓名:</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="schoolObj.schoolDoctorName" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 30%;">
              <span>校医电话:</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="schoolObj.schoolDoctorPhone" placeholder="请输入电话" size="small"></el-input>
            </el-col>
          </el-row>
          <el-row
            style="margin-top: 30px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
          >
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 10%;">
              <span>学校地址:</span>
            </el-col>
            <el-col :span="17">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入学校地址"
                v-model="schoolObj.schoolAddress"
              ></el-input>
            </el-col>
          </el-row>
          <el-row class="foot_btn" style="margin-top:30px;">
            <el-col :span="2" :offset="10">
              <el-button
                @click="addClose()"
                type="success"
                style="width: 100%;"
                size="middle"
              >返回</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button
                style="width: 100%;"
                type="primary"
                @click="saveCommunity()"
                size="middle"
              >保存</el-button>
            </el-col>
          </el-row>
        </el-dialog>
    <!-- 修改数据 -->
    <el-dialog
      :close-on-click-modal="false"
      width="70%"
      title="数据修改"
      :visible.sync="ModifydialogVisible"
      center
    >
      <el-row style="text-align: center;">
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
          <span class="after-red">省份:</span>
        </el-col>
        <el-col :span="3">
          <el-select
            :clearable="true"
            size="small"
            v-model="modifySelection.province"
            value-key="proviceId"
            @change="getCities(modifySelection.province, type=3)"
          >
            <el-option
              v-for="item in provinces"
              :key="item.proviceId"
              :value="item"
              :label="item.proviceName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
          <span class="after-red">城市:</span>
        </el-col>
        <el-col :span="4">
          <el-select
            :clearable="true"
            size="small"
            value-key="cityId"
            v-model="modifySelection.city"
            @change="getCounty(modifySelection.city, type=3)"
          >
            <el-option
              v-for="item in cities"
              :key="item.cityId"
              :value="item"
              :label="item.cityName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
          <span class="after-red">区县:</span>
        </el-col>
        <el-col :span="4">
          <el-select
            :clearable="true"
            size="small"
            value-key="countyId"
            v-model="modifySelection.county"
            @change="getCountyId(modifySelection.county, type=3)"
          >
            <el-option
              v-for="item in counties"
              :key="item.countyId"
              :value="item"
              :label="item.countyName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
          <span class="after-red">社区:</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="modifySelection.communityName" placeholder="请输入社区" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row
        style="margin-top: 30px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228); text-align: center"
      >
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%">
          <span class="after-red">学校类型:</span>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            :clearable="true"
            value-key="zoom"
            v-model="modifySelection.schoolType"
          >
            <el-option v-for="item in schoolType" :key="item.zoom" :value="item" :label="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
          <span class="after-red">学校名称:</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="modifySelection.schoolName" placeholder="请输入联系电话" size="small"></el-input>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
          <span class="after-red">负责人:</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="modifySelection.principal" placeholder="请输入姓名" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row style="padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);">
        <el-row style="margin-top: 30px;">
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 10%;">
              <span>校长姓名:</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="modfiyLeaderShip.principalName" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 30%;">
              <span>校长电话:</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="modfiyLeaderShip.principalPhone" placeholder="请输入电话" size="small"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px;">
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 10%;">
              <span>校医姓名:</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="modfiyLeaderShip.schoolDoctorName" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 30%;">
              <span>校医电话:</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="modfiyLeaderShip.schoolDoctorPhone" placeholder="请输入电话" size="small"></el-input>
            </el-col>
          </el-row>
          <el-row
            style="margin-top: 30px;"
          >
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 10%;">
              <span>学校地址:</span>
            </el-col>
            <el-col :span="17">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入学校地址"
                v-model="modfiyLeaderShip.schoolAddress"
              ></el-input>
            </el-col>
          </el-row>
      </el-row>
      <el-row
        style="padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
      >
        <h3>
          教师信息
          <el-button
            type="primary"
            size="mini"
            class="el-icon-plus right"
            @click="addTeacher()"
          >添加教师</el-button>
        </h3>
        <el-col :span="24">
          <el-table :border="true" :data="teacherList">
            <el-table-column align="center" prop="gradeName" label="年级"></el-table-column>
            <el-table-column align="center" prop="className" label="班级"></el-table-column>
            <el-table-column align="center" prop="teacherName" label="老师姓名"></el-table-column>
            <el-table-column align="center" prop="teacherTel" label="老师电话"></el-table-column>
            <el-table-column align="center" label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button type="primary" @click="modifyTeacher(scope)" size="small">修改</el-button>
                <el-button
                  type="danger"
                  @click="deleteTeacher(scope)"
                  size="small"
                  :disabled="limit.delete"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="foot_btn" style="margin-top:30px;">
        <el-col :span="2" :offset="10">
          <el-button
            @click="ModifydialogVisible = false"
            type="success"
            style="width: 100%;"
            size="middle"
          >返回</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button style="width: 100%;" type="primary" @click="modifySave('修改')" size="middle">保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 添加老师 -->
    <el-dialog :close-on-click-modal="false" title="数据录入" :visible.sync="addTeacherDialog" center>
      <el-row style="margin-top: 30px;">
        <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 10%;">
          <span class="after-red">年级:</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="schoolObj.grade" placeholder="请输入年级" size="small"></el-input>
        </el-col>
        <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 30%;">
          <span class="after-red">班级:</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="schoolObj.class" placeholder="请输入班级" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px;">
        <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 10%;">
          <span >老师姓名:</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="schoolObj.teacherName" placeholder="请输入姓名" size="small"></el-input>
        </el-col>
        <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 30%;">
          <span >老师电话:</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="schoolObj.teacherPhone" placeholder="请输入电话" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row class="foot_btn" style="margin-top:30px;">
        <el-col :span="2" :offset="10">
          <el-button @click="cenl()" type="success" style="width: 100%;" size="middle">返回</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button
            v-if="xzTeacher"
            style="width: 100%;"
            type="primary"
            @click="saveTeacher('新增老师')"
            size="middle"
          >保存</el-button>
          <el-button
            v-else
            style="width: 100%;"
            type="primary"
            @click="saveTeacher('修改老师')"
            size="middle"
          >保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProvince,
  getCity,
  getCountys,
  addCommunity,
  getCommunity
} from "../../api/address";
import {
  getControlCommunity,
  schoolSelectData,
  schoolModifyData
} from "../../api/datalist";
import formatTime, { timeFormat } from "../../utils/timeformat";
import { isString } from "../../utils/types";
import { Promise } from "q";
import { setTimeout } from "timers";
import { dateFormat } from "../../utils/timeformat";
import session from "../../utils/session";
var qwer = 100000;
export default {
  name: "App",
  data() {
    return {
      siteId:null,
      siteList:[],
      user:null,
      //权限管理
      limit: {
        add: true,
        delete: true,
        update: true,
        select: true
      },
      clientName: "",
      clientPhone: "",
      isMember: "",
      //表格数据
      clientData: [],
      clientChoseDate: "",
      //录入数据弹出框
      DatadialogVisible: false,
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
      //新增学校
      allData: {
        proviceId: null,
        cityId: null,
        countyId: null,
        community: null,
        isDelete: 0,
        principal: null,
        schoolType: null,
        schoolName: null
      },
      fullscreenLoading: false,
      addTeacherDialog: false,
      //查询条件
      search: {
        principal: null,
        province: null,
        city: null,
        county: null,
        community: null,
        schoolType: null,
        schoolName: null
      },
      //学校类型
      schoolType: [
        { type: "幼儿园", zoom: 1 },
        { type: "小学", zoom: 2 },
        { type: "初中", zoom: 3 },
        { type: "高中", zoom: 4 }
      ],
      //社区列表
      communityList: null,
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      //修改
      ModifydialogVisible: false,
      //修改条件
      modifySelection: {
        province: null,
        city: null,
        county: null,
        communityName: null,
        schoolType: null,
        schoolName: null,
        principal: null,
        // provinceId: null,
        cityId: null,
        countyId: null,
        schoolId: null,
        createTime: null,
        addTime: null
      },
      schoolObj: {
        schoolId: null,
        principalName: null,
        principalPhone: null,
        schoolDoctorName: null,
        schoolDoctorPhone: null,
        schoolAddress: null,
        grade: null,
        class: null,
        teacherName: null,
        teacherPhone: null
      },
      modfiyLeaderShip:{
        principalName: null,
        principalPhone: null,
        schoolDoctorName: null,
        schoolDoctorPhone: null,
        schoolAddress: null,
      },
      titleUserId: null,
      teacherList:[],
      addTeachersId: null,
      xzTeacher: true,
      teacherId: null,
      rowId:null,
      myRow:null
    };
  },

  mounted() {
    //获取用户权限
    this.limit.add = !!!session.getItem("userlimit")[0];
    this.limit.delete = !!!session.getItem("userlimit")[1];
    this.limit.update = !!!session.getItem("userlimit")[2];
    this.limit.select = !!!session.getItem("userlimit")[3];
    this.titleUserId = session.getItem("user");
    this.siteList = session.getItem("site");
    this.userId = session.getItem("user");
    this.getAddress();
    this.getControlCommunities();
  },

  methods: {
    //导出Execl
    // outExcel() {
      // let arg = {
      //   whereLambda: {}
      // };
      // if (this.search.province) {
      //   arg.whereLambda.proviceId = this.search.province.proviceId; //省份
      // } else {
      //   arg.whereLambda.proviceId = null;
      // }
      // if (this.search.city) {
      //   arg.whereLambda.cityId = this.search.city.cityId; //城市
      // } else {
      //   arg.whereLambda.cityId = null;
      // }
      // if (this.search.community) {
      //   arg.whereLambda.communityId = this.search.community.communityId; //社区
      // } else {
      //   arg.whereLambda.communityId = null;
      // }
      // if (this.search.county) {
      //   arg.whereLambda.countyId = this.search.county.countyId; //区县
      // } else {
      //   arg.whereLambda.countyId = null;
      // }

      // arg.whereLambda.sysUserName = this.search.principal || null; //负责人

      // if (this.search.schoolType) {
      //   arg.whereLambda.schoolType = this.search.schoolType.zoom; //学校类型
      // } else {
      //   arg.whereLambda.schoolType = null;
      // }

      // arg.whereLambda.schoolName = this.search.schoolName || null; //学校名称

      // let baseUrl = 'http://117.34.105.87:88/api/Userphysical/ExportOutUserphysicals';

      // let exportArg = '?userName=' + arg.whereLambda.userName + '&patriarchicPhone=' + arg.whereLambda.telephone + '&isVisit=' + arg.whereLambda.isVisit + '&inputPeople=' + arg.whereLambda.inputPeople + '&bak=' + arg.whereLambda.bak + '&proviceId=' + arg.whereLambda.proviceId + '&cityId=' + arg.whereLambda.cityId + '&countyId=' + arg.whereLambda.countyId + '&communityId=' + arg.whereLambda.communityId + '&sysUserName=' + arg.whereLambda.sysUserName + '&physicalPeriod=' + null + '&physicalBeginTime=' + arg.whereLambda.physicalStartTime + '&physicalEndTime=' + arg.whereLambda.physicalEndTime + '&inputBeginTime=' + arg.whereLambda.inputBeginTime + '&inputEndTime=' + arg.whereLambda.inputEndTime + '&quarter=' + arg.whereLambda.quarter;

      // let endArg = baseUrl + exportArg;

      // window.location.href = endArg;
    // },
    //查询数据
    searchData() {
      this.getControlCommunities();
    },
    //获取社区列表
    async getControlCommunities(pageIndex = 1, pageSize = 10) {
      let arg = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        whereLambda: {
           hospitalId: this.siteId || null,
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

      arg.whereLambda.principal = this.search.principal || null; //负责人

      if (this.search.schoolType) {
        arg.whereLambda.schoolType = this.search.schoolType.zoom; //学校类型
      } else {
        arg.whereLambda.schoolType = null;
      }

      arg.whereLambda.schoolName = this.search.schoolName || null; //学校名称

      try {
        return new Promise((resolve, reject) => {
          schoolSelectData(arg)
            .then(res => {
              const loading = this.$loading({
                lock: true,
                text: "加载中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              resolve(res);
              let dataList = res.data.ResponseModel;
              if (dataList) {
                loading.close();
                // console.log(dataList);
                this.clientData = dataList.list;
                this.pages.total = dataList.total;
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
          this.city = null;
          this.county = null;
          this.community = null;
          break;
        case 2:
          this.search.city = null;
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.modifySelection.city = null;
          this.modifySelection.county = null;
          // this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      if (item) {
        let proviceVal = item.proviceId;
        this.allData.proviceId = item.proviceId;
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
          this.county = null;
          this.community = null;
          break;
        case 2:
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.modifySelection.county = null;
          // this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      if (item) {
        let cityVal = item.cityId;
        this.allData.cityId = item.cityId;
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
          this.community = null;
          break;
        case 2:
          this.search.community = null;
          break;
        case 3:
          // this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      this.allData.countyId = item.countyId;
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

    // 保存社区
    async saveCommunity() {
      if (
        !!this.province&&
        !!this.city&&
        !!this.county&&
        !!this.allData.principal &&
        !!this.allData.schoolType &&
        !!this.allData.schoolName &&
        !!this.allData.community
      ) {
        let inputData = {
          proviceId: this.province.proviceId,
          cityId: this.city.cityId,
          countyId: this.county.countyId,
          communityId: this.allData.community.communityId,
          schoolName: this.allData.schoolName,
          type: this.allData.schoolType.zoom,
          person: this.allData.principal,
          presidentName: this.schoolObj.principalName || null,
          presidentTel: this.schoolObj.principalPhone || null,
          schoolDoctorName: this.schoolObj.schoolDoctorName || null,
          schoolDoctorTel: this.schoolObj.schoolDoctorPhone || null,
          schoolAddress: this.schoolObj.schoolAddress || null,
          userId: this.titleUserId,
          isDelete: 0
        };

        try {
          return new Promise((resolve, reject) => {
            schoolModifyData(inputData)
              .then(res => {
                if (res.data.Error) {
                  this.$message({
                    type: "warning",
                    message: res.data.ErrorMessage,
                    center: true
                  });
                } else {
                  const loading = this.$loading({
                    lock: true,
                    text: "加载中",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                  });
                  resolve(res);
                  setTimeout(() => {
                    loading.close();
                    this.$message({
                      type: "success",
                      message: "添加学校成功",
                      center: true
                    });
                    this.addClose()
                    this.getControlCommunities(
                      this.pages.currentPage,
                      this.pages.pageSize
                    );
                    
                  }, 1000);
                }
              })
              .catch(err => {
                reject(res);
              });
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$message({
          type: "warning",
          message: "请正确填写表格！",
          center: true
        });
      }
    },
    addClose(){
      this.DatadialogVisible = false;
      this.province=null;
      this.city=null;
      this.county=null;
      this.allData.principal=null;
      this.allData.schoolType=null;
      this.allData.schoolName=null;
      this.allData.community=null;
      this.schoolObj.principalName=null;
      this.schoolObj.principalPhone=null;
      this.schoolObj.schoolDoctorName=null;
      this.schoolObj.schoolDoctorPhone=null;
      this.schoolObj.schoolAddress=null;
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
    //修改
    handleModify(row) {
      console.log(row);
      this.myRow = row;
      this.ModifydialogVisible = true;
      this.modifySelection.province = row.proviceName;
      this.modifySelection.city = row.cityName;
      this.modifySelection.county = row.countyName;
      this.modifySelection.community = row.communityName;
      this.modifySelection.communityId = row.communityId;
      this.modifySelection.communityName = row.communityName;
      this.modifySelection.schoolName = row.schoolName;
      this.modifySelection.principal = row.principal;
      this.modifySelection.schoolType = row.type;
      this.modifySelection.schoolId = row.schoolId;
      this.modifySelection.proviceId = row.proviceId;
      this.modifySelection.cityId = row.cityId;
      this.modifySelection.countyId = row.countyId;
      this.modifySelection.createTime = row.addTime;
      this.modifySelection.addTime = row.addTime;
      this.schoolObj.schoolId = row.schoolId;
      this.teacherList=row.teachers || [];
      this.modfiyLeaderShip.principalName = row.presidentName;
      this.modfiyLeaderShip.principalPhone = row.presidentTel;
      this.modfiyLeaderShip.schoolDoctorName = row.schoolDoctorName;
      this.modfiyLeaderShip.schoolDoctorPhone = row.schoolDoctorTel;
      this.modfiyLeaderShip.schoolAddress = row.schoolAddress;

    },
    // 修改保存
    async modifySave(xiugai) {
      let modifyData = this.modifySelection;

      // console.log(modifyData);
      //第一步 验证是否为空
      for (let p in modifyData) {
        if (modifyData[p] === null || modifyData[p] === "") {
          this.$message({
            type: "warning",
            message: "信息不能为空",
            center: true
          });
          return false;
        }
      }

      // 第二步  整理后端接口数据

      //如果不改变省市区县
      let allSelects;
      if (isString(modifyData.province)) {
        allSelects = {
          proviceId: this.modifySelection.proviceId,
          cityId: this.modifySelection.cityId,
          countyId: this.modifySelection.countyId,
          isDelete: 0,
          person: this.modifySelection.principal,
          schoolId: this.modifySelection.schoolId,
          schoolName: this.modifySelection.schoolName,
          communityId: this.modifySelection.communityId,
          createTime: this.modifySelection.createTime,
          addTime: this.modifySelection.addTime,
          teachers: this.teacherList,
          presidentName:this.modfiyLeaderShip.principalName,
          presidentTel:this.modfiyLeaderShip.principalPhone,
          schoolDoctorName:this.modfiyLeaderShip.schoolDoctorName,
          schoolDoctorTel:this.modfiyLeaderShip.schoolDoctorPhone,
          schoolAddress:this.modfiyLeaderShip.schoolAddress,
          userId: this.titleUserId,
        };
      } else {
        allSelects = {
          proviceId: this.modifySelection.province.proviceId,
          cityId: this.modifySelection.city.cityId,
          countyId: this.modifySelection.county.countyId,
          isDelete: 0,
          person: this.modifySelection.principal,
          schoolId: this.modifySelection.schoolId,
          schoolName: this.modifySelection.schoolName,
          communityId: this.modifySelection.community.communityId,
          createTime: this.modifySelection.createTime,
          addTime: this.modifySelection.addTime,
          teachers: this.teacherList,
          presidentName:this.modfiyLeaderShip.principalName,
          presidentTel:this.modfiyLeaderShip.principalPhone,
          schoolDoctorName:this.modfiyLeaderShip.schoolDoctorName,
          schoolDoctorTel:this.modfiyLeaderShip.schoolDoctorPhone,
          schoolAddress:this.modfiyLeaderShip.schoolAddress,
          userId: this.titleUserId,
        };
      }

      if (isString(this.modifySelection.schoolType)) {
        switch (this.modifySelection.schoolType) {
          case "幼儿园":
            allSelects.type = 1;
            break;
          case "小学":
            allSelects.type = 2;
            break;
          case "初中":
            allSelects.type = 3;
            break;
          case "高中":
            allSelects.type = 4;
            break;
          default:
            allSelects.type = 1;
            break;
        }
      } else {
        allSelects.type = this.modifySelection.schoolType.zoom;
      }
      try {
        return new Promise((resolve, reject) => {
          schoolModifyData(allSelects)
            .then(res => {
              const loading = this.$loading({
                lock: true,
                text: "加载中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              resolve(res);
              setTimeout(() => {
                loading.close();
                
                if( xiugai=="修改" ){
                    this.$message({
                      type: "success",
                      message: "修改学校成功",
                      center: true
                    });
                }
                this.ModifydialogVisible = false;
                this.getControlCommunities(
                  this.pages.currentPage,
                  this.pages.pageSize
                );
              }, 1000);
              qwer=0;
            })
            .catch(err => {
              reject(res);
            });
        });
      } catch (err) {
        console.log(err);
      }
    },
    // 保存老师
    saveTeacher(mOrS) {
      console.log(this.schoolObj);
      if (
        
        !!this.schoolObj.class &&
        !!this.schoolObj.grade
      ) {
        if (mOrS == "新增老师") {
          // debugger
          this.teacherList.push({
            teacherTel: this.schoolObj.teacherPhone || null,
            teacherName: this.schoolObj.teacherName || null,
            className: this.schoolObj.class,
            gradeName: this.schoolObj.grade,
            schoolId: this.schoolObj.schoolId,
            lsId: this.addTeachersId
          });
          this.cenl();
        } else {
          console.log(this.teachersId);
          // if(this.teacherId == null){
          //   let obj = {
          //   teacherTel: this.schoolObj.teacherPhone,
          //   teacherName: this.schoolObj.teacherName,
          //   className: this.schoolObj.class,
          //   gradeName: this.schoolObj.grade,
          //   schoolId: this.schoolObj.schoolId,
          //   lsId: this.teachersId
          // };
          // this.teacherList = this.teacherList.map(item =>
          //   item.lsId === obj.lsId ? obj : item
          // );
          
          // }else{
            let obj = {
            teacherTel: this.schoolObj.teacherPhone,
            teacherName: this.schoolObj.teacherName,
            className: this.schoolObj.class,
            gradeName: this.schoolObj.grade,
            schoolId: this.schoolObj.schoolId,
            lsId: this.teacherId,
          };
          this.teacherList = this.teacherList.map(item =>
            item.teacherId === obj.lsId ? obj : item
          );
          this.teacherId=null
          }
          this.cenl();
        // }
      this.modifySave("修改学校")
      
      } else {
        this.$message({
          type: "warning",
          message: "请正确填写表格！",
          center: true
        });
      }
    },
    // 删除一行老师
    deleteTeacher(date) {
      this.teacherList.splice(date.$index, 1);
    },
    //修改老师信息
    modifyTeacher(date) {
      this.xzTeacher = false;
      this.addTeacherDialog = true;
      this.schoolObj.teacherPhone = date.row.teacherTel;
      this.schoolObj.teacherName = date.row.teacherName;
      this.schoolObj.class = date.row.className;
      this.schoolObj.grade = date.row.gradeName;
      this.rowId = date.$index;
      this.teacherId=date.row.teacherId
    },
    //新增老师
    addTeacher() {
      this.addTeacherDialog = true;
      this.xzTeacher = true;
      this.addTeachersId = qwer++;
    },
    //取消保存
    cenl() {
      this.addTeacherDialog = false;
      this.schoolObj.teacherPhone = null;
      this.schoolObj.teacherName = null;
      this.schoolObj.class = null;
      this.schoolObj.grade = null;
    },
    //删除
    async handleDelete(row) {
      if (row) {
        let deleteData = {
          isDelete: 1,
          schoolId: row.schoolId
        };
        this.$confirm("此操作将永久删除该文件, 是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            try {
              return new Promise((resolve, reject) => {
                schoolModifyData(deleteData)
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
    }
    //修改社区信息
    //删除社区
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  scrollbar {
    width: 10px;
    height: 10px;
  }
  scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rosybrown;
    border-radius: 3px;
  }
  scrollbar-thumb {
    border-radius: 7px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #e8e8e8;
  }
  scrollbar-button {
    background-color: cyan;
  }
  scrollbar-corner {
    background: khaki;
  }
  // .search {
  //   // text-align: center;
  // }
  .another_row {
    text-align: center;
    margin-top: 20px;
    span {
      line-height: 30px;
    }
  }
  .pagination {
    margin-top: 10px;
    text-align: center;
  }
  .client_table {
    margin-top: 20px;
  }
}
</style>