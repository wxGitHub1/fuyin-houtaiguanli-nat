<template>
  <div>
    <el-row class="query_hurdle">
      <el-col :span="2" style="width: 5%;" class="center">
        <span>查体人:</span>
      </el-col>
      <el-col :span="2" style="width: 7%;">
        <el-input placeholder="输入查体人"  v-model="search.examPeople" size="small"></el-input>
      </el-col>
      <el-col :span="2" style="width: 5%;line-height: 30px" class="center">
        <span>季度:</span>
      </el-col>
      <el-col :span="2" style="width: 7%;">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.quarter">
          <el-option v-for="item in season" :key="item.zoom" :value="item.zoom" :label="item.type"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 8%;" class="center">查体时间：</el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="search.examTime"
          type="daterange"
          range-separator="至"
          size="small"
          style="width:100%"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" style="width: 5.33%;" class="center">
        <el-button
          type="primary"
          size="small"
          style="margin-left: 10px"
          @click="getControlCommunities()"
        >查询</el-button>
      </el-col>
    </el-row>
    <el-row class="statistics">
      <el-col class="module" :span="3">
        <p>体检总次数</p>
        <h2>{{totalStatistic.physicalCount || 0}}</h2>
      </el-col>
      <el-col class="module" :span="3">
        <p>到访人数</p>
        <h2>{{totalStatistic.visitCount || 0}}</h2>
      </el-col>
      <el-col class="module" :span="3">
        <p>营业金额</p>
        <h2>{{totalStatistic.totalMoney || 0}}</h2>
      </el-col>
    </el-row>
    <el-row class="graph">
      <el-col class="graph_box">
        <div id="myChart2" :style="{width: '100%', height: '100%'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { examStatisticUser } from "../../api/datalist";
import { Promise, all, async } from "q";
export default {
  name: "App",
  data() {
    return {
      // date: "",
      search: {
        examPeople: null,
        examTime: null,
        quarter: null
      },
      //季度
      season: [{ type: "春季", zoom: 1 }, { type: "秋季", zoom: 2 }],
      totalStatistic: {
        physicalCount: null, //体检次数
        enrolledCount: null, //入校
        entergardenCount: null, //入园
        nurseryCount: null, //入托
        visitCount: null, //到访人数
        totalMoney: null //消费金额
      },
      totalStatistic2:[0,0,0]
    };
  },
  created() {},
  mounted() {
    this.getControlCommunities();
  },
  methods: {
    
    //获取列表
    getControlCommunities(pageIndex = 1, pageSize = 10) {
      let arg = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        whereLambda: {
          sysUserName: this.search.examPeople || null, //查体人
          physicalBeginTime:
            this.search.examTime == null ? null : this.search.examTime[0], //查体开始时间
          physicalEndTime:
            this.search.examTime == null ? null : this.search.examTime[1], //查体结束时间
          quarter: this.search.quarter || null //季度
        }
      };
       const loading = this.$loading({
            lock: true,
            text: "加载中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
      examStatisticUser(arg)
        .then(res => {
          // console.log(res);
         
          let dataList = res.data.ResponseModel;
          if (dataList) {
            this.totalStatistic.physicalCount = dataList.physicalCount;
            this.totalStatistic.enrolledCount = dataList.enrolledCount;
            this.totalStatistic.entergardenCount = dataList.entergardenCount;
            this.totalStatistic.nurseryCount = dataList.nurseryCount;
            this.totalStatistic.visitCount = dataList.visitCount;
            this.totalStatistic.totalMoney = dataList.totalMoney;
            // this.totalStatistic2.push(dataList.nurseryCount,dataList.entergardenCount,dataList.enrolledCount)
            this.totalStatistic2[0] = dataList.nurseryCount;
            this.totalStatistic2[1] = dataList.entergardenCount;
            this.totalStatistic2[2] = dataList.enrolledCount;
            // console.log(this.totalStatistic2)
          }
          setTimeout(() => {
              loading.close();
              this.drawLine();
            }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //echart
    drawLine() {
      //  debugger
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      // var  tatolData= this.totalStatistic2
      console.log(this.totalStatistic2);
      // debugger
      let option = {
        // color: ['#3398DB'],
        title: {
          // text: "入托、入园、入校可视化图表"
          //textStyle: {
          //    color: '#fff'
          //}
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          padding: 10,
          // formatter: "{b}体检<br> 总人数: {c}次"
          formatter: params => {
            // console.log(params)
            let pct =
              (params[0].value / this.totalStatistic.problemCount) * 100;
            let content =
              params[0].name +
              "体检" +
              "<br/>" +
              "体检总人数：" +
              params[0].value +
              "人" +
              "<br>" +
              "问题人数：" +
              0 +
              "人" +
              "<br>" +
              "到访人数：" +
              0 +
              "人" +
              "<br>" +
              "营业额：" +
              0 +
              "元"
            return content;
          }
        },
        /*legend: {
              data: [date]
          },*/
        grid: {
            left: '3%',
            right: '8%',
            // bottom: '2%',
            // containLabel: true
        },
        xAxis: {
          type: "value",
          name: "人数（人次）",
          nameTextStyle: {
            fontStyle: "oblique",
            fontWeight: "bolder",
            fontSize: 15
          },
          // boundaryGap: [0, 0.01],
          //           min: 0,
          max: function(value) {
            return value.max + 2;
          },
          // interval: 20,
          axisLabel: {
            // formatter: "{value}%",
            textStyle: {
              //color: '#fff',
              // fontWeight: "80"
            }
          }
        },
        yAxis: {
          type: "category",
          name: "查体类型",
          nameTextStyle: {
            fontStyle: "oblique",
            fontWeight: "bolder",
            fontSize: 15
          },
          data: ["入托", "入园", "入校"],
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,
            margin: 10,
            inside: false,
            textStyle: {
              //color: '#fff',
              fontWeight: "50"
            }
          }
        },
        series: [
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                // formatter: '{c}',
                formatter: function(v) {
                  var val = v.data;
                  if (val == 0) {
                    return "";
                  }
                  return val + "人";
                },
                color: "#fff"
              }
            },
            itemStyle: {
              normal: {
                //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                color: function(params) {
                  // 根据需要构建色彩
                  var colorList = [
                    "#8fd3f4",
                    "#e0c3fc",
                    "#FCCE10",
                    "#fa709a",
                  ];
                  return colorList[params.dataIndex];
                } //以下为是否显示，显示位置和显示格式的设置了
                //                         label: {
                //                             show: true,
                //                             position: 'right',
                // //                             formatter: '{c}'
                //                             formatter: '{b}\n{c}',
                //                             color:"#000"
                //                         }
              }
            },
            data: this.totalStatistic2
          }
        ]
      };
      myChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          myChart.resize();
        };
      }, 200);
    }
  }
};
</script>

<style scoped lang="scss">
.query_hurdle {
  //   font-size: 14px;
  //   letter-spacing: 1px;
  color: #606266;
  line-height: 30px;
  //   text-align: left;
  //   cursor: pointer;
  padding: 10px 0;
  padding-top: 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #eeeeee;
}
.statistics {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0);
  padding-top: 20px;
  .module {
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 0.5);
    margin-left: 3%;
  }
}
.graph_box {
  width: 90%;
  height: 550px;
  // background: rgba(244, 244, 244, 1);
  margin-left: 3%;
  margin-top: 20px;
}
</style>