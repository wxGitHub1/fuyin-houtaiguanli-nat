<template>
  <!--便携足弓设备 -->
  <div class="container">
    <el-row>
      <el-col :span="24" style="border-bottom: 1px solid #EBEEF5;padding-bottom: 16px;">
        <el-row>
            <!-- 录入数据弹出框 -->
            <el-dialog
              style="text-align: center"
              :close-on-click-modal="false"
              width="80%"
              title="详情数据"
              :visible.sync="InputdialogVisible"
            >
              <el-row>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
                  <span class="after-red">省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
                </el-col>
                <el-col :span="3">
                  <el-select
                    size="small"
                    v-model="inputData.province"
                    :clearable="true"
                    value-key="proviceId"
                    @change="getCities(inputData.province, type=3)"
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
                <el-col :span="3">
                  <el-select
                    size="small"
                    :clearable="true"
                    value-key="cityId"
                    v-model="inputData.city"
                    @change="getCounty(inputData.city, type=3)"
                  >
                    <el-option
                      v-for="item in cities"
                      :key="item.cityId"
                      :value="item"
                      :label="item.cityName"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" style="width: 5%;line-height: 30px;margin-left:1%;">
                  <span class="after-red">区县:</span>
                </el-col>
                <el-col :span="3">
                  <el-select
                    :clearable="true"
                    size="small"
                    value-key="countyId"
                    v-model="inputData.county"
                    @change="getCountyId(inputData.county, type=3)"
                  >
                    <el-option
                      v-for="item in counties"
                      :key="item.countyId"
                      :value="item"
                      :label="item.countyName"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" style="width: 5%;line-height: 30px;margin-left:1%;">
                  <span class="after-red">社区:</span>
                </el-col>
                <el-col :span="3">
                  <el-select
                    :clearable="true"
                    size="small"
                    value-key="communityId"
                    v-model="inputData.community"
                     @change="getSchoolId(inputData.community)"
                  >
                    <el-option
                      v-for="item in communityList"
                      :key="item.communityId"
                      :value="item"
                      :label="item.communityName"
                    ></el-option>
                  </el-select>
                </el-col>
                <!-- <el-col :span="2" style="width: 6%;line-height: 30px;">
                  <span>学校类型:</span>
                </el-col>
                <el-col :span="2" style="text-align: left;width: 7%;">
                  <el-select
                    size="small"
                    :clearable="true"
                    value-key="zoom"
                    v-model="inputData.quarter"
                  >
                    <el-option
                      v-for="item in schoolType"
                      :key="item.zoom"
                      :value="item"
                      :label="item.type"
                    ></el-option>
                  </el-select>
                </el-col> -->
              </el-row>
              <el-row
                style="margin-top: 20px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
              >
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%;">
                  <span class="after-red">查体人:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                  <el-input placeholder="请输入查体人" size="small" v-model="inputData.examPeople"></el-input>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
                  <span class="after-red">录入人:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                  <el-input placeholder="请输入录入人" v-model="inputData.inputPeople" size="small"></el-input>
                </el-col>
                <el-col :span="2" style="width: 5%;line-height: 30px;margin-left: 1%">
                  <span class="after-red">查体时间:</span>
                </el-col>
                <el-col :span="3">
                  <el-date-picker 
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd" 
                  style="width: 100%;" size="small" v-model="inputData.examTime"></el-date-picker>
                </el-col>
                <el-col :span="2" style="width: 5%;line-height: 30px;margin-left: 1%;">
                  <span class="after-red">查体总数:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                  <el-input placeholder="请输入查体人数" v-model="inputData.sumNumber" size="small"></el-input>
                </el-col>
                <el-col :span="3" style="margin-left: 0.4%">
                  <el-badge :value="countStatus" type="primary">
                    <el-button type="danger" size="small">问题人数</el-button>
                  </el-badge>
                </el-col>
              </el-row>
              <el-row style="margin-top: 30px;">
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%;">
                  <span class="after-red">客户姓名:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                  <el-input placeholder="请输入客户姓名" v-model="inputData.clientName" size="small"></el-input>
                </el-col>
                <el-col :span="2" style="line-height: 30px;">
                  <span class="after-red">性别:</span>
                </el-col>
                <el-col :span="2" style="line-height: 30px;text-align:left;">
                  <el-radio v-model="inputData.sex" label="1">男</el-radio>
                  <el-radio v-model="inputData.sex" label="2">女</el-radio>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
                  <span class="after-red">班级:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                  <el-input placeholder="请输入班级" v-model="inputData.className" size="small"></el-input>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
                  <span class="after-red">年级:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                  <el-input placeholder="请输入年级" v-model="inputData.grade" size="small"></el-input>
                </el-col>
              </el-row>
              <el-row
                style="margin-top: 30px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
              >
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%;">
                  <span class="after-red">老师电话:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                  <el-input placeholder="请输入联系电话" v-model="inputData.teacherPhone" size="small"></el-input>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
                  <span class="after-red">学校名称:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                  <el-select
                  :clearable="true"
                  size="small"
                  value-key="schoolId"
                  v-model="inputData.schoolName"
                >
                  <el-option
                    v-for="item in schoolList"
                    :key="item.schoolId"
                    :value="item"
                    :label="item.schoolName"
                  ></el-option>
                </el-select>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
                  <span class="after-red">出生日期:</span>
                </el-col>
                <el-col :span="3">
                  <el-date-picker 
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd" 
                  style="width: 100%;" size="small" v-model="inputData.birthday"></el-date-picker>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
                  <span class="after-red">老师姓名:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                  <el-input placeholder="请输入老师姓名" v-model="inputData.teacherName" size="small"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 30px;">
                <el-col :span="2" :offset="2">
                  <span class="after-red">病症:</span>
                </el-col>
                <el-col :span="20" style="text-align: left;">
                  <el-checkbox-group v-model="inputData.illnessList">
                    <el-checkbox class="check_box" border label="足弓发育不良"></el-checkbox>
                    <el-checkbox class="check_box" border label="跟骨外翻"></el-checkbox>
                    <el-checkbox class="check_box" border label="跟骨内翻"></el-checkbox>
                    <el-checkbox class="check_box" border label="足内旋"></el-checkbox>
                    <el-checkbox class="check_box" border label="足外旋"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row style="margin-top: 30px;">
                <el-col :span="20" :offset="4" style="text-align: left;">
                  <el-checkbox-group v-model="inputData.illnessList">
                    <el-checkbox class="check_box" border label="足内翻"></el-checkbox>
                    <el-checkbox class="check_box" border label="足外翻"></el-checkbox>
                    <el-checkbox class="check_box" border label="膝内翻"></el-checkbox>
                    <el-checkbox class="check_box" border label="膝外翻"></el-checkbox>
                    <el-checkbox class="check_box" border label="驼背"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row style="margin-top: 30px;">
                <el-col :span="20" :offset="4" style="text-align: left;">
                  <el-checkbox-group v-model="inputData.illnessList">
                    <el-checkbox class="check_box" border label="斜颈"></el-checkbox>
                    <el-checkbox class="check_box" border label="拇外翻"></el-checkbox>
                    <el-checkbox class="check_box" border label="膝过伸"></el-checkbox>
                    <el-checkbox class="check_box" border label="膝屈曲"></el-checkbox>
                    <el-checkbox class="check_box" border label="长短腿"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row style="margin-top: 30px;">
                <el-col :span="20" :offset="4" style="text-align: left;">
                  <el-checkbox-group v-model="inputData.illnessList">
                    <el-checkbox class="check_box" border label="鸡胸"></el-checkbox>
                    <el-checkbox class="check_box" border label="脊柱侧弯"></el-checkbox>
                    <el-checkbox class="check_box" border label="高低肩"></el-checkbox>
                    <el-checkbox class="check_box" border label="骨盆倾斜"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row class="foot_btn">
                <el-col :span="2" :offset="14">
                  <el-button
                    @click="InputdialogVisible = false"
                    type="success"
                    style="width: 100%;"
                    size="middle"
                  >返回</el-button>
                </el-col>
                <el-col :span="2" :offset="1">
                  <el-button
                    style="width: 100%;"
                    type="primary"
                    size="middle"
                    @click="saveInputData('input')"
                  >保存</el-button>
                </el-col>
                <el-col :span="3" :offset="1">
                  <el-button
                    style="width: 100%;"
                    type="danger"
                    size="middle"
                    @click="endInput()"
                  >结束本次录入</el-button>
                </el-col>
              </el-row>
            </el-dialog>
        
          <!-- 详情弹出框 -->
          <!-- <el-dialog
            style="text-align: center"
            :close-on-click-modal="false"
            width="80%"
            title="详情数据"
            :visible.sync="InfodialogVisible"
          >
            <el-row>
              <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
                <span>省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
              </el-col>
              <el-col :span="3">
                <el-select
                  size="small"
                  v-model="modifyData.province"
                  :clearable="true"
                  value-key="proviceId"
                  @change="getCities(modifyData.province, type=1)"
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
                <span>城市:</span>
              </el-col>
              <el-col :span="3">
                <el-select
                  size="small"
                  :clearable="true"
                  value-key="cityId"
                  v-model="modifyData.city"
                  @change="getCounty(modifyData.city, type=1)"
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
                <span>区县:</span>
              </el-col>
              <el-col :span="3">
                <el-select
                  :clearable="true"
                  size="small"
                  value-key="countyId"
                  v-model="modifyData.county"
                  @change="getCountyId(modifyData.county, type=1)"
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
                <span>社区:</span>
              </el-col>
              <el-col :span="3">
                <el-select
                  :clearable="true"
                  size="small"
                  value-key="communityId"
                  v-model="modifyData.community"
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
              style="margin-top: 20px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
            >
              <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%;">
                <span>查体人:</span>
              </el-col>
              <el-col :span="3" style="text-align: left">
                <el-input placeholder="请输入查体人" size="small" v-model="modifyData.examPeople"></el-input>
              </el-col>
              <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
                <span>录入人:</span>
              </el-col>
              <el-col :span="3" style="text-align: left">
                <el-input placeholder="请输入录入人" v-model="modifyData.inputPeople" size="small"></el-input>
              </el-col>
              <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
                <span>查体时间:</span>
              </el-col>
              <el-col :span="3">
                <el-date-picker style="width: 100%;" size="small" v-model="modifyData.examTime"></el-date-picker>
              </el-col>
              <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
                <span>季度:</span>
              </el-col>
              <el-col :span="2" style="text-align: left;width: 7%;">
                <el-select
                  size="small"
                  :clearable="true"
                  value-key="zoom"
                  v-model="modifyData.quarter"
                >
                  <el-option
                    v-for="item in season"
                    :key="item.zoom"
                    :value="item"
                    :label="item.type"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
              <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%;">
                <span>客户姓名:</span>
              </el-col>
              <el-col :span="3" style="text-align: left">
                <el-input placeholder="请输入客户姓名" v-model="modifyData.clientName" size="small"></el-input>
              </el-col>
              <el-col :span="2" style="line-height: 30px;">
                <span>性别:</span>
              </el-col>
              <el-col :span="4" style="line-height: 30px;text-align:left;">
                <el-radio v-model="modifyData.sex" label="男">男</el-radio>
                <el-radio v-model="modifyData.sex" label="女">女</el-radio>
              </el-col>
            </el-row>
            <el-row
              style="margin-top: 30px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
            >
              <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%;">
                <span>联系电话:</span>
              </el-col>
              <el-col :span="3" style="text-align: left">
                <el-input placeholder="请输入联系电话" v-model="modifyData.phone" size="small"></el-input>
              </el-col>
              <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
                <span>学校名称:</span>
              </el-col>
              <el-col :span="3" style="text-align: left">
                <el-input placeholder="请输入学校名称" v-model="modifyData.schoolName" size="small"></el-input>
              </el-col>
              <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
                <span>出生日期:</span>
              </el-col>
              <el-col :span="3">
                <el-date-picker style="width: 100%;" size="small" v-model="modifyData.birthday"></el-date-picker>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
              <el-col :span="2" :offset="2">
                <span>病症:</span>
              </el-col>
              <el-col :span="20" style="text-align: left;">
                <el-checkbox-group v-model="modifyData.illnessList">
                  <el-checkbox class="check_box" border label="足弓发育不良"></el-checkbox>
                  <el-checkbox class="check_box" border label="跟骨外翻"></el-checkbox>
                  <el-checkbox class="check_box" border label="跟骨内翻"></el-checkbox>
                  <el-checkbox class="check_box" border label="足内旋"></el-checkbox>
                  <el-checkbox class="check_box" border label="足外旋"></el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
              <el-col :span="20" :offset="4" style="text-align: left;">
                <el-checkbox-group v-model="modifyData.illnessList">
                  <el-checkbox class="check_box" border label="足内翻"></el-checkbox>
                  <el-checkbox class="check_box" border label="足外翻"></el-checkbox>
                  <el-checkbox class="check_box" border label="膝内翻"></el-checkbox>
                  <el-checkbox class="check_box" border label="膝外翻"></el-checkbox>
                  <el-checkbox class="check_box" border label="驼背"></el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
              <el-col :span="20" :offset="4" style="text-align: left;">
                <el-checkbox-group v-model="modifyData.illnessList">
                  <el-checkbox class="check_box" border label="斜颈"></el-checkbox>
                  <el-checkbox class="check_box" border label="拇外翻"></el-checkbox>
                  <el-checkbox class="check_box" border label="膝过伸"></el-checkbox>
                  <el-checkbox class="check_box" border label="膝屈曲"></el-checkbox>
                  <el-checkbox class="check_box" border label="长短腿"></el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
              <el-col :span="20" :offset="4" style="text-align: left;">
                <el-checkbox-group v-model="modifyData.illnessList">
                  <el-checkbox class="check_box" border label="鸡胸"></el-checkbox>
                  <el-checkbox class="check_box" border label="脊柱侧弯"></el-checkbox>
                  <el-checkbox class="check_box" border label="高低肩"></el-checkbox>
                  <el-checkbox class="check_box" border label="骨盆倾斜"></el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row class="foot_btn">
              <el-col :span="2" :offset="16">
                <el-button
                  @click="InfodialogVisible = false"
                  type="success"
                  style="width: 100%;"
                  size="middle"
                >返回</el-button>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-button
                  style="width: 100%;"
                  type="primary"
                  size="middle"
                  @click="saveInputData('info')"
                >保存</el-button>
              </el-col>
            </el-row>
          </el-dialog>-->
          <el-col :span="2" style="margin-left:2%;width: 70px;line-height: 30px">
            <span>客户姓名:</span>
          </el-col>
          <el-col :span="2">
            <el-input placeholder="请输入姓名" v-model="search.clientName" size="small"></el-input>
          </el-col>
          <!-- <el-col :span="2" style="width: 5.5%;line-height:30px;margin-left:1%;">
            <span>联系电话:</span>
          </el-col>
          <el-col :span="2" style="text-align: left">
            <el-input placeholder="请输入联系电话" v-model="search.phone" size="small"></el-input>
          </el-col> -->
          <el-col :span="2" style="width: 40px;line-height: 30px;margin-left:1%;">
            <span>性别:</span>
          </el-col>
          <el-col :span="2">
            <el-select size="small" :clearable="true" value-key="zoom" v-model="search.sex">
              <el-option v-for="item in sex" :key="item.zoom" :value="item" :label="item.type"></el-option>
            </el-select>
          </el-col>
          <!-- <el-col :span="2" style="width: 4.5%;line-height: 30px;margin-left: 1%;">
            <span>录入人:</span>
          </el-col>
          <el-col :span="2" style="text-align: left">
            <el-input placeholder="输入录入人" size="small" v-model="search.inputPeople"></el-input>
          </el-col> -->
          <el-col :span="2" class="text-three">
            <span>幼儿园:</span>
          </el-col>
          <el-col :span="2" style="text-align: left">
            <el-input placeholder="请输入幼儿园名称" size="small" v-model="search.schoolName"></el-input>
          </el-col>
          <el-col :span="2" style="width: 40px;line-height: 30px;margin-left: 1%;">
            <span>病症:</span>
          </el-col>
          <el-col :span="2">
            <el-select size="small" :clearable="true" v-model="search.illness">
              <el-option v-for="(item, index) in illnessList" :key="index" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width: 56px;line-height: 30px;margin-left: 1%;">
        <span>查体人:</span>
      </el-col>
      <el-col :span="2">
        <el-input placeholder="输入查体人" v-model="search.examPeople" size="small"></el-input>
      </el-col>
       <el-col :span="2" class="text-four">查体时间:</el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="search.examTime"
          type="daterange"
          range-separator="至"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="search">
      <el-col :span="2" class="first-text-two">
        <span>省份:</span>
      </el-col>
      <el-col :span="2">
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
      <el-col :span="2">
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
      <el-col :span="2" class="text-two">
        <span>区县:</span>
      </el-col>
      <el-col :span="2">
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
      <el-col :span="2">
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
      
      <el-col :span="2" class="text-two">
        <span>季度:</span>
      </el-col>
      <el-col :span="2">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.quarter">
          <el-option v-for="item in season" :key="item.zoom" :value="item" :label="item.type"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="2" class="first-text-four">录入时间:</el-col>
      <el-col :span="5">
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
      <el-col :span="1" class="top-schear-but">
        <el-button style="width: 100%;" type="success" size="small" @click="searchData()">查询</el-button>
      </el-col>
      <el-col :span="2" class="top-schear-but">
        <el-button style="width: 100%;" type="warning" size="small" @click="outExcel()">导出Excel</el-button>
      </el-col>
      <el-col :span="2" class="top-schear-but">
        <el-button
          style="width: 100%;"
          type="danger"
          size="small"
          :disabled="allDelete"
          @click="toggleSelection()"
        >批量删除</el-button>
      </el-col>
      <el-col :span="2"  class="top-schear-but">
        <el-button type="success" style="width: 100%;" size="small" @click="InputdialogVisible = true">录入数据</el-button>
      </el-col>
      <el-col :span="2" class="top-schear-but">
        <el-button type="primary" size="small" style="width:100%" @click="importDialog()">导入数据</el-button>
      </el-col>
    </el-row>

    <el-table
      :border="true"
      ref="multipleTable"
      :data="clientData"
      @selection-change="handleSelectionChange"
      class="client_table"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="proviceName" label="省份" min-width="60"></el-table-column>
      <el-table-column align="center" prop="cityName" label="城市" min-width="60"></el-table-column>
      <el-table-column align="center" prop="hospitalName" label="站点" min-width="60"></el-table-column>
      <el-table-column align="center" prop="countyName" label="区县" min-width="80"></el-table-column>
      <el-table-column align="center" prop="communityName" label="社区" min-width="100"></el-table-column>
      <el-table-column align="center" prop="sysUserName" label="查体人" min-width="60"></el-table-column>
      <el-table-column align="center" prop="inputPeople" label="录入人" min-width="60"></el-table-column>
      <el-table-column align="center" prop="inputTime" label="录入时间" min-width="80"></el-table-column>
      <el-table-column align="center" prop="physicalTime" label="查体时间" min-width="80"></el-table-column>
      <el-table-column align="center" prop="physicalPeriod" label="查体周期" min-width="70"></el-table-column>
      <!-- <el-table-column align="center" prop="userName" label="客户姓名" min-width="70"></el-table-column> -->
      <!-- <el-table-column align="center" prop="sex" label="性别" min-width="60"></el-table-column> -->
      <!-- <el-table-column align="center" prop="birthday" label="出生日期" min-width="80"></el-table-column> -->
      <!-- <el-table-column align="center" prop="result" label="足弓发育不良" min-width="50"></el-table-column> -->
      <!-- <el-table-column align="center" prop="bak" label="并发症" min-width="100"></el-table-column> -->
      <!-- <el-table-column align="center" prop="patriarchicPhone" label="联系电话" min-width="80"></el-table-column> -->
      <!-- <el-table-column align="center" prop="isVisit" label="性别" min-width="50"></el-table-column> -->
      <el-table-column align="center" prop="schoolType" label="学校类型" min-width="100"></el-table-column>
      <el-table-column align="center" prop="schoolName" label="学校名称" min-width="100"></el-table-column>
      <el-table-column align="center" prop="className" label="班级" min-width="100"></el-table-column>
      <el-table-column align="center" prop="gradeName" label="年级" min-width="100"></el-table-column>
      <!-- <el-table-column align="center" prop="quarter" label="季度" min-width="60"></el-table-column> -->
      <!-- <el-table-column align="center" prop="operation" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleOrder(scope.row)" size="small">详情</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
    ></el-pagination>
    <!-- 导入数据 -->
    <el-dialog
      :close-on-click-modal="false"
      title="数据录入"
      :visible.sync="importDialogVisible"
      center
    >
      <el-row>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
          <span class="after-red">省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="inputData.province"
            :clearable="true"
            value-key="proviceId"
            @change="getCities(inputData.province, type=3)"
          >
            <el-option
              v-for="item in provinces"
              :key="item.proviceId"
              :value="item"
              :label="item.proviceName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:2%;">
          <span class="after-red">城市:</span>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            :clearable="true"
            value-key="cityId"
            v-model="inputData.city"
            @change="getCounty(inputData.city, type=3)"
          >
            <el-option
              v-for="item in cities"
              :key="item.cityId"
              :value="item"
              :label="item.cityName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:2%;">
          <span class="after-red">区县:</span>
        </el-col>
        <el-col :span="3">
          <el-select
            :clearable="true"
            size="small"
            value-key="countyId"
            v-model="inputData.county"
            @change="getCountyId(inputData.county, type=3)"
          >
            <el-option
              v-for="item in counties"
              :key="item.countyId"
              :value="item"
              :label="item.countyName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:2%;">
          <span class="after-red">社区:</span>
        </el-col>
        <el-col :span="3">
          <el-select
            :clearable="true"
            size="small"
            value-key="communityId"
            v-model="inputData.community"
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
        style="margin-top: 20px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
      >
        <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 10%;">
          <span class="after-red">体检总数:</span>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="请输入数量" size="small" v-model="inputData.tjTotal"></el-input>
        </el-col>
        <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 2%">
          <span class="after-red">问题人数:</span>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="请输人数" size="small" v-model="inputData.wtTotal"></el-input>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 2%;">
          <span class="after-red">季度:</span>
        </el-col>
        <el-col :span="3">
          <el-select size="small" :clearable="true" value-key="zoom" v-model="inputData.quarter">
            <el-option v-for="item in season" :key="item.zoom" :value="item" :label="item.type"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 50px;">
        <el-col :span="5" style="margin-left: 3.6%;">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="action"
            :on-success="handleSuccess"
            :before-upload="handleUpload"
            :auto-upload="false"
            multiple
            :limit="1"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击选择</el-button>
            <div slot="tip" class="el-upload__tip">选择上传文件</div>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="foot_btn">
        <el-col :span="2" :offset="16">
          <el-button @click="importDialogVisible = false" type="success" size="middle">返回</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" size="middle" @click="saveData()">保存</el-button>
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
  getCommunity,
  getOutCommunity
} from "../../../api/address";
import {
  outputNurseryData,
  addNurseryData,
  inputStatus,
  outExcelData,
  outworkNursePortableDelete,
  SchoolImportData
} from "../../../api/datalist";
import {
  OperateOutSchoolUserphysical, //入校增删改
  GetOutSchoolUserphysicals, //入校列表查询
  DeleteAllOutUserphysical, //入校批量删除
  Getschools, //入校学校列表
  ExportOutSchoolUserphysicals //入校导出Excel
} from "../../../api/datalist";
import session from "../../../utils/session";
import pathUrl from "../../../api/pathUrl";
import { all, Promise } from "q";
import $axios from "axios";
import { isString } from "../../../utils/types";
import { resolve } from "url";
import { dateFormat, timeFormat } from "../../../utils/timeformat";

export default {
  name: "App",
  data() {
    return {
      action:pathUrl.pathUrl_net+'/api/UserphysicalForGarden/SchoolImportExcel',
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
      //多选
      multipleSelection: [],
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
      //学校列表
      schoolList: null,
      //查询数据
      search: {
        clientName: null,
        phone: null,
        sex: null,
        inputPeople: null,
        illness: null,
        province: null,
        city: null,
        county: null,
        community: null,
        examPeople: null,
        examTime: null,
        schoolName:null,
        // timeLength: null,
        // examCycle: null,
        inputTime: null,
        quarter: null
      },
      //季度
      season: [{ type: "春季", zoom: 1 }, { type: "秋季", zoom: 2 }],
      //学校类型
      schoolType: [{ type: "小学", zoom: 1 }, { type: "初中", zoom: 2 }, { type: "高中", zoom: 3 }],
      //性别
      sex: [{ type: "男", zoom: 1 }, { type: "女", zoom: 2 }],
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
        sex: null,
        birthday: null,
        phone: null,
        schoolName: null,
        className:null,
        grade:null,
        teacherName:null,
        teacherPhone:null,
        sumNumber: null,
        quarter: null,
        illnessList: []
      },
      //数据详情与修改
      modifyData: {
        province: null,
        provinceId: null,
        city: null,
        cityId: null,
        community: null,
        communityId: null,
        county: null,
        countyId: null,
        examPeople: null,
        inputPeople: null,
        examTime: null,
        clientName: null,
        sex: "男",
        birthday: null,
        quarter: null,
        phone: null,
        schoolName: null,
        userphysicalId: null,
        illnessList: []
      },
      //问题人数添加状态
      countStatus: 0,
      //批量删除状态
      allDelete: true,
      //录入数据
      importDialogVisible:false
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
    saveData() {
      if (
        !!this.inputData.province &&
        !!this.inputData.city &&
        !!this.inputData.county &&
        !!this.inputData.community &&
        !!this.inputData.quarter &&
        !!this.inputData.tjTotal &&
        !!this.inputData.wtTotal
      ) {
        let obj = {
          proviceId: this.inputData.province.proviceId,
          cityId: this.inputData.city.cityId,
          countyId: this.inputData.county.countyId,
          communityId: this.inputData.community.communityId,
          quarter: this.inputData.quarter.zoom,
          physicalIdTotalCount: this.inputData.tjTotal,
          problemCount: this.inputData.wtTotal
        };
        SchoolImportData(obj)
          .then(res => {
            this.$refs.upload.submit();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "warning",
          message: "请正确填写表格！",
          center: true
        });
      }
    },
    //导入数据按钮
    importDialog() {
      this.importDialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      // console.log(response)
      if (response.Error) {
        this.$message({
          type: "warning",
          message: response.ErrorMessage,
          center: true
        });
      } else {
        this.$message({
          type: "success",
          message: "上传成功!",
          center: true
        });
        this.$refs.upload.clearFiles();
        this.importDialogVisible = false;
        this.getControlCommunities();
        this.inputData.province = null;
        this.inputData.city = null;
        this.inputData.county = null;
        this.inputData.community = null;
        this.inputData.quarter = null;
        this.inputData.tjTotal = null;
        this.inputData.wtTotal = null;
      }
    },
    handleUpload(file) {
      let fileType = file.name
        .slice(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      if (fileType === "csv") {
        return true;
      } else {
        this.$message({
          type: "warning",
          message: "文件格式不正确，必须为csv格式的文件！",
          center: true
        });
        return false;
      }
    },
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

      arg.whereLambda.userName = this.search.clientName || null; //客户姓名

      arg.whereLambda.patriarchicPhone = this.search.phone || null; //联系电话

      arg.whereLambda.sex = this.search.sex || 0  ; //性别

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

      arg.whereLambda.bak = this.search.illness || null; //病情

      arg.whereLambda.sysUserName = this.search.examPeople || null; //体检人
      arg.whereLambda.schoolName = this.search.schoolName || null; //学校名称

      arg.whereLambda.inputPeople = this.search.inputPeople || null; //录入人

      if (this.search.quarter) {
        arg.whereLambda.quarter = this.search.quarter.zoom; //季度
      } else {
        arg.whereLambda.quarter = 0;
      }

      // if (this.search.sex) {
      //   arg.whereLambda.sex = this.search.sex.zoom; //性别
      // } else {
      //   arg.whereLambda.sex = null;
      // }

      arg.whereLambda.bak = this.search.illness || null;

      // let baseUrl ="http://117.34.105.87:88/api/UserphysicalForGarden/ExportOutGardenUserphysicals";//上线地址
      let baseUrl = pathUrl.pathUrl_net+"/api/UserphysicalForSchool/ExportOutSchoolUserphysicals";//测试
      let exportArg =
        "?userName=" +
        arg.whereLambda.userName +
        // "&patriarchicPhone=" +
        // arg.whereLambda.patriarchicPhone +
        "&sex=" +
        arg.whereLambda.sex +
        // "&inputPeople=" +
        // arg.whereLambda.inputPeople +
        "&bak=" +
        arg.whereLambda.bak +
        "&schoolName=" +
        arg.whereLambda.schoolName +
        "&proviceId=" +
        arg.whereLambda.proviceId +
        "&cityId=" +
        arg.whereLambda.cityId +
        "&countyId=" +
        arg.whereLambda.countyId +
        "&communityId=" +
        arg.whereLambda.communityId +
        "&sysUserName=" +
        arg.whereLambda.sysUserName +
        "&physicalPeriod=" +
        0 +
        "&physicalBeginTime=" +
        arg.whereLambda.physicalStartTime +
        "&physicalEndTime=" +
        arg.whereLambda.physicalEndTime +
        "&inputBeginTime=" +
        arg.whereLambda.inputBeginTime +
        "&inputEndTime=" +
        arg.whereLambda.inputEndTime +
        "&quarter=" +
        arg.whereLambda.quarter+
        "&userId=" +
        arg.whereLambda.userId+
        "&hospitalId=" +
        arg.whereLambda.hospitalId;

      let endArg = baseUrl + exportArg;

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

      arg.whereLambda.userName = this.search.clientName || null; //客户姓名
      arg.whereLambda.schoolName = this.search.schoolName || null; //学校名称

      arg.whereLambda.patriarchicPhone = this.search.phone || null; //联系电话

      // arg.whereLambda.sex = this.search.sex || null; //性别

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

      arg.whereLambda.inputPeople = this.search.inputPeople || null;

      if (this.search.quarter) {
        arg.whereLambda.quarter = this.search.quarter.zoom; //季度
      } else {
        arg.whereLambda.quarter = null;
      }

      if (this.search.sex) {
        arg.whereLambda.sex = this.search.sex.zoom; //性别
      } else {
        arg.whereLambda.sex = null;
      }

      arg.whereLambda.bak = this.search.illness || null;

      try {
        return new Promise((resolve, reject) => {
          GetOutSchoolUserphysicals(arg)
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
                setTimeout(() => {
                  loading.close();
                  this.clientData = dataList.list;
                  this.pages.total = dataList.total;
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
            getOutCommunity({ countyId: countyVal,physicalType:2})
              .then(res => {
                  if (res.data.Error) {
                  this.$message({
                    type: "warning",
                    message: res.data.ErrorMessage,
                    center: true
                  });
                } else {
                resolve(res);
                if (res.data.Error) {
                  this.communityList = null;
                } else {
                  this.communityList = res.data.ResponseModel.list;
                }
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
    // handleRemove(file, fileList) {
    //   // console.log(file, fileList);
    // },

    // handlePreview(file) {
    //   // console.log(file);
    // },

    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },

    //获取详情
    handleOrder(item) {
      this.InfodialogVisible = true;
      if (item) {
        this.modifyData.province = item.proviceName;
        this.modifyData.provinceId = item.proviceId;
        this.modifyData.city = item.cityName;
        this.modifyData.cityId = item.cityId;
        this.modifyData.community = item.communityName;
        this.modifyData.communityId = item.communityId;
        this.modifyData.county = item.countyName;
        this.modifyData.countyId = item.countyId;
        this.modifyData.examPeople = item.sysUserName;
        this.modifyData.inputPeople = item.inputPeople;
        this.modifyData.examTime = item.inputTime;
        this.modifyData.clientName = item.userName;
        this.modifyData.sex = item.sex;
        this.modifyData.quarter = item.quarter;
        this.modifyData.phone = item.patriarchicPhone;
        this.modifyData.schoolName = item.schoolId;
        this.modifyData.userphysicalId = item.userphysicalId;
        this.modifyData.birthday = item.birthday;
        if (item.bak) {
          this.modifyData.illnessList = item.bak.split(",");
        }
      }
    },

    //批量删除
    toggleSelection() {
      //数组去重
      // function distinct() {
      //   return Array.from(new Set([...this.multipleSelection]));
      // }
      let data = [];

      this.multipleSelection.map(item => {
        data.push(item.userphysicalId);
      });

      let arg = {
        userphysicalIds: data
      };

      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          try {
            return new Promise((resolve, reject) => {
              outworkNursePortableDelete(arg).then(res => {
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
              });
            });
          } catch (err) {
            console.log(err);
          }
        })
        .catch(e => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    handleSelectionChange(val) {
      //更改删除按钮状态
      val.length === 0 ? (this.allDelete = true) : (this.allDelete = false);
      if (val) {
        //将勾选的数据传入数组中
        this.multipleSelection = val;
      }
    },

    //删除
    handleDelete(row) {
      let deleteData = {
        isDelete: 1,
        userphysicalId: row.userphysicalId
      };
      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          try {
            return new Promise((resolve, reject) => {
              OperateOutSchoolUserphysical(deleteData)
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
            message: "已取消删除"
          });
        });
    },

    //录入数据
    async saveInputData(type) {
      // debugger
      let allData;
      let inputDatas;
      if (type === "input") {
        allData = this.inputData;
        console.log(allData);
        if (
          !(
            !!allData.province &&
            !!allData.city &&
            !!allData.county &&
            !!allData.community &&
            !!allData.examPeople &&
            !!allData.inputPeople &&
            !!allData.examTime &&
            !!allData.teacherName &&
            !!allData.className &&
            !!allData.grade &&
            !!allData.schoolName&&
            !!allData.teacherPhone
            // &&!!allData.quarter
          )
        ) {
          this.$message({
            type: "warning",
            message: "请正确填写表格信息！",
            center: true
          });
          return false;
        } else if (allData.illnessList.length === 0) {
          this.$message({
            type: "warning",
            message: "请正确填写表格信息！",
            center: true
          });
          return false;
        }

      //   if (allData.birthday) {
      //     allData.birthday = timeFormat(allData.birthday);
      //   }
      //   var examTimeData = allData.examTime
      //   if (allData.examTime) {
      //     examTimeData = timeFormat(allData.examTime);
      // }

        inputDatas = {
          proviceId: allData.province.proviceId,
          cityId: allData.city.cityId,
          countyId: allData.county.countyId,
          communityId: allData.community.communityId,
          physicalTime: allData.examTime,
          inputPeople: allData.inputPeople,
          sysUserName: allData.examPeople,
          userName: allData.clientName,
          sex: allData.sex,
          birthday: allData.birthday,
          patriarchicPhone: allData.phone,
          schoolId: allData.schoolName.schoolId,
          // schoolType:allData.quarter.zoom,
          teacherName:allData.teacherName,
          classId:allData.className,
          gradeId:allData.grade,
          teacherTel:allData.teacherPhone,
          physicalIdTotalCount: allData.sumNumber,
          // quarter: allData.quarter.zoom,
          bak: allData.illnessList.join(",")
        };
      } else if (type === "info") {
        allData = this.modifyData;

        //第一步 验证是否为空

        if (
          !(
            !!allData.province &&
            !!allData.city &&
            !!allData.county &&
            !!allData.community &&
            !!allData.examPeople &&
            !!allData.inputPeople &&
            !!allData.schoolName&&
            !!allData.examTime &&
            !!allData.quarter
          )
        ) {
          this.$message({
            type: "warning",
            message: "请正确填写表格信息！",
            center: true
          });
          return false;
        } else if (allData.illnessList.length === 0) {
          this.$message({
            type: "warning",
            message: "请正确填写表格信息！",
            center: true
          });
          return false;
        }
        // console.log(allData);

        // 第二步  整理后端接口数据

        //如果不改变省市区县
        if (isString(allData.province)) {
          inputDatas = {
            proviceId: allData.provinceId,
            cityId: allData.cityId,
            countyId: allData.countyId,
            communityId: allData.communityId,
            inputPeople: allData.inputPeople,
            sysUserName: allData.examPeople,
            userName: allData.clientName,
            sex: allData.sex,
            birthday: allData.birthday,
            patriarchicPhone: allData.phone,
            schoolId: allData.schoolName,
            userphysicalId: allData.userphysicalId,
            isDelete: 0,
            bak: allData.illnessList.join(",")
          };
        } else {
          inputDatas = {
            proviceId: allData.province.proviceId,
            cityId: allData.city.cityId,
            countyId: allData.county.countyId,
            communityId: allData.community.communityId,
            inputPeople: allData.inputPeople,
            sysUserName: allData.examPeople,
            userName: allData.clientName,
            sex: allData.sex,
            birthday: allData.birthday,
            patriarchicPhone: allData.phone,
            schoolId: allData.schoolName,
            userphysicalId: allData.userphysicalId,
            isDelete: 0,
            bak: allData.illnessList.join(",")
          };
        }

        if (isString(allData.quarter)) {
          switch (allData.quarter) {
            case "春季":
              inputDatas.quarter = 1;
              break;
            case "秋季":
              inputDatas.quarter = 2;
              break;
            default:
              inputDatas.quarter = 1;
              break;
          }
        } else {
          inputDatas.quarter = allData.quarter.zoom;
        }

        if (allData.birthday) {
          inputDatas.birthday = isString(allData.birthday)
            ? allData.birthday
            : timeFormat(allData.birthday);
        }

        inputDatas.physicalTime = isString(allData.examTime)
          ? allData.examTime
          : timeFormat(allData.examTime);

        console.log(inputDatas);
      }
      try {
        return new Promise((resolve, reject) => {
          // debugger
          OperateOutSchoolUserphysical(inputDatas)
            .then(res => {
              resolve(res);
              const loading = this.$loading({
                lock: true,
                text: "保存中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              // debugger
              if (res.data.Error) {
                this.$message({
                    type: "warning",
                    message: res.data.ErrorMessage,
                    center: true
                  });
                  loading.close();
              }else{
                let uid = session.getItem("user");
                let arg = {
                  uId: uid,
                  ope: 0
                };
                setTimeout(() => {
                  loading.close();
                  this.getControlCommunities();
                  this.$message({
                    type: "success",
                    message: "保存成功！",
                    center: true
                  });
                }, 1000);
                this.inputData.clientName = null;
                this.inputData.phone = null;
                this.inputData.illnessList = [];
                this.inputData.birthday = null;
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
                        .catch(err => {
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
     //获取学校
    async getSchoolId(item) {
      console.log(item);
      let currentCommunity = item.communityId || null;
      if (currentCommunity) {
        try {
          await Getschools({ communityId: currentCommunity })
            .then(res => {
              if (res.data.Error) {
                this.schoolList = null;
              } else {
                this.schoolList = res.data.ResponseModel;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
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
                  if(res.data.Error){
                    this.$message({
                        type: "warning",
                        message: res.data.ErrorMessage,
                        center: true
                      });
                  }else{
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
  .pagination {
    margin-top: 10px;
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