<template>
  <div>
    <el-row class="query_hurdle">
      <el-col :span="2" style="width: 5%;" class="center">
        <span>负责人:</span>
      </el-col>
      <el-col :span="2" style="width: 7%;">
        <el-input placeholder="输入查体人" v-model="search.principal" size="small"></el-input>
      </el-col>
      <el-col :span="2" style="width: 5%;line-height: 30px" class="center">
        <span>体检类型:</span>
      </el-col>
      <el-col :span="2" style="width: 7%;">
        <el-select size="small" :clearable="true" v-model="search.tjTypeValue">
          <el-option v-for="item in tjType" :key="item.id" :value="item.id" :label="item.name"></el-option>
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
      <el-col :span="2" style="width: 5.33%;">
        <el-button
          type="primary"
          size="small"
          style="margin-left: 10px"
          @click="getControlCommunities()"
        >查询</el-button>
      </el-col>
    </el-row>
    <el-row class="statistics">
      <el-col class="module" :span="5">
        <p>社区数</p>
        <h2>{{totalStatistic.communityCount || 0}}</h2>
      </el-col>
      <el-col class="module" :span="5">
        <p>体检人数</p>
        <h2>{{totalStatistic.physicalIdTotalCount || 0}}</h2>
      </el-col>
      <el-col class="module" :span="5">
        <p>问题人数</p>
        <h2>{{totalStatistic.problemCount || 0}}</h2>
      </el-col>
      <el-col class="module" :span="5">
        <p>已到访</p>
        <h2>{{totalStatistic.visitTotalCount || 0}}</h2>
      </el-col>
    </el-row>
    <el-row class="graph">
      <el-col class="graph_box">
        <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetBigCustomRepeat } from "../../../api/datalist";
import { Promise, all, async } from "q";
export default {
  name: "App",
  data() {
    return {
      // date: "",
      search: {
        principal: null,
        examTime: null,
        tjTypeValue: null
      },
      //体检类型
      tjType: [
        { name: "入园", id: 1 },
        { name: "入校", id: 2 },
        { name: "入托", id: 3 }
      ],
      totalStatistic: {
        problemCount: null, //问题人数
        communityCount: null, //社区数量
        physicalIdTotalCount: null, //体检总人数
        visitTotalCount: null //到访总人数
      },
      totalStatistic2: []
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
          linkPeopleName: this.search.principal || null, //负责人
          physicalBeginTime:
            this.search.examTime == null ? null : this.search.examTime[0], //查体开始时间
          physicalEndTime:
            this.search.examTime == null ? null : this.search.examTime[1], //查体结束时间
          physicalType: this.search.tjTypeValue || null //查体类型
        }
      };
      const loading = this.$loading({
            lock: true,
            text: "加载中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
      GetBigCustomRepeat(arg)
        .then(res => {
          console.log(res);
          
          let dataList = res.data.ResponseModel;
          if (dataList) {
            this.totalStatistic.problemCount = dataList.problemCount;
            this.totalStatistic.communityCount = dataList.communityCount;
            this.totalStatistic.physicalIdTotalCount =
              dataList.physicalIdTotalCount;
            this.totalStatistic.visitTotalCount = dataList.visitTotalCount;
            this.totalStatistic2[0] = dataList.poorarchcount;
            this.totalStatistic2[1] = dataList.pronation;
            this.totalStatistic2[2] = dataList.pronationout;
            this.totalStatistic2[3] = dataList.strephenopodia;
            this.totalStatistic2[4] = dataList.strephenopodiaout;
            this.totalStatistic2[5] = dataList.calcanealvarus;
            this.totalStatistic2[6] = dataList.heelboneeversion;
            this.totalStatistic2[7] = dataList.genylegCount;
            this.totalStatistic2[8] = dataList.bandylegCount;
            this.totalStatistic2[9] = dataList.kennlegCount;
            this.totalStatistic2[10] = dataList.kneebuckling;
            this.totalStatistic2[11] = dataList.longshortlegCount;
            this.totalStatistic2[12] = dataList.humpbackCount;
            this.totalStatistic2[13] = dataList.halluxvalgusCount;
            this.totalStatistic2[14] = dataList.torticollisCount;
            this.totalStatistic2[15] = dataList.highlowshoulderCount;
            this.totalStatistic2[16] = dataList.chickenbreastCount;
            this.totalStatistic2[17] = dataList.scoliosisCount;
            this.totalStatistic2[18] = dataList.inclinationCount;
            setTimeout(() => {
              loading.close();
              this.drawLine();
            }, 1000);
          } else {
            loading.close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //echart
    drawLine() {
      //  debugger
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      // var  tatolData= this.totalStatistic2
      // console.log(this.totalStatistic2)
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
          // formatter: "{b} <br> 总人数: {c}个<br> 占比：{e}"
          formatter:(params)=>{
            // console.log(params)
            let pct=params[0].value/this.totalStatistic.physicalIdTotalCount*100
            let content=params[0].name+'<br/>'+"问题人数："+params[0].value+"例"+'<br>'+"问题占比："+pct.toFixed(1)+"%"
            return content
          }
        },
        /*legend: {
              data: [date]
          },*/
        // grid: {
        //     left: '4%',
        //     right: '4%',
        //     bottom: '2%',
        //     containLabel: true
        // },
        xAxis: {
          type: "value",
           name: "人数（个）",
           nameTextStyle:{
            fontStyle:"oblique",
            fontWeight:"bolder",
            fontSize:15
          },
          // boundaryGap: [0, 0.01],
          //           min: 0,
          // max: function(value) {
          //   return value.max + 2;
          // },
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
          name: "病症类型",
          nameTextStyle:{
            fontStyle:"oblique",
            fontWeight:"bolder",
             fontSize:15
          },
          data: [
            "足弓发育不良",
            "足内旋",
            "足外旋",
            "足内翻",
            "足外翻",
            "跟骨内翻",
            "跟骨外翻",
            "膝外翻",
            "膝内翻",
            "膝过伸",
            "膝屈曲",
            "长短腿",
            "驼背",
            "拇外翻",
            "斜颈",
            "高低肩",
            "鸡胸",
            "脊柱侧弯",
            "骨盆倾斜"
          ],
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
                  return val+"例";
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
                    "#C1232B",
                    "#B5C334",
                    "#FCCE10",
                    "#E87C25",
                    "#27727B",
                    "#FE8463",
                    "#9BCA63",
                    "#FAD860",
                    "#F3A43B",
                    "#60C0DD",
                    "#D7504B",
                    "#C6E579",
                    "#F4E001",
                    "#F0805A",
                    "#26C0C0",
                    "#E87C25",
                    "#27727B",
                    "#FE8463",
                    "#9BCA63",
                    "#FAD860"
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
  background: rgba(244, 244, 244, 1);
  margin-left: 3%;
  margin-top: 20px;
}
</style>