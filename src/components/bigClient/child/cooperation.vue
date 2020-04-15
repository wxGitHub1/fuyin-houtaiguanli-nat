<template>
  <div class="container">
    <el-row>
      <el-col :span="2" style="width: 6.5%;line-height: 30px;text-align: center;">
        <span>负责人</span>
      </el-col>
      <el-col :span="3">
        <el-input v-model="clientName" size="small" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="2" style="width: 6.5%;line-height: 30px;text-align: center;">
        <span>区县</span>
      </el-col>
      <el-col :span="3">
        <el-select size="small" v-model="isMember">
          <el-option value="[1, 2, 3]"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 6.5%;line-height: 30px;text-align: center;">
        <span>体检类型</span>
      </el-col>
      <el-col :span="3">
        <el-select size="small" v-model="isMember">
          <el-option value="[1, 2, 3]"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 6.5%;line-height: 30px;text-align: center;">
        <span>体检时间</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="clientChoseDate"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" style="margin-left: 2%">
        <el-button size="small" type="primary">查询</el-button>
      </el-col>
    </el-row>
    <el-row class="statistic">
      <el-col :span="5" class="box">
        <p>机构数量</p>
        <h2>0</h2>
      </el-col>
      <el-col :span="5" class="box">
        <p>到访人数</p>
        <h2>0</h2>
      </el-col>
      <el-col :span="5" class="box">
        <p>问题人数</p>
        <h2>0</h2>
      </el-col>
      <el-col :span="5" class="box">
        <p>会员人数</p>
        <h2>0</h2>
      </el-col>
    </el-row>
    <el-row class="graph_pool">
      <el-col :span="24" class="graph_area">
        <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "extendsPage",
  data() {
    return {
      clientName: "",
      isMember: "",
      clientChoseDate: "",
      sad:1
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          // color: ['#3398DB'],
          title: {
              text: '入托、入园、入校可视化图表',
              //textStyle: {
              //    color: '#fff'
              //}
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              },
              formatter: "{b} <br> 合格率: {c}%"
              // formatter: (datas)=> 
              // {
              //   console.log(this.sad)
              //     var res = datas[0].name + '<br/>', val;
              //     for(var i = 0, length = datas.length; i < length; i++) {
              //           val = (datas[i].value*100) + '%';
              //           res += datas[i].seriesName + '：' + val + '<br/>';
              //       }
              //       return res;
              //  }
          
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
              type: 'value',
              boundaryGap: [0, 0.01],
              min: 0,
              max: 100,
              interval: 20,
              axisLabel: {
                  formatter: '{value}%',
                  textStyle: {
                      //color: '#fff',  
                      fontWeight: '80'
                  }
              }
          },
          yAxis: {
              type: 'category',
              data: ['托管类', '培训类'],
              axisLabel: {
                  show: true,
                  interval: 0,
                  rotate: 0,
                  margin: 10,
                  inside: false,
                  textStyle: {
                      //color: '#fff',
                      fontWeight: '50'
                  }
              }
          },
          series: [{
              type: 'bar',
              label: {
                  normal: {
                      show: true,
                      // formatter: '{c}',
                      formatter: function(v) {
                          var val = v.data;
                          if (val == 0) {
                              return '';
                          }
                          return val;
                      },
                      color: '#fff'
                  }
              },
              itemStyle: {
                    normal: {
                        color:
                         function(params) {
                            // 根据需要构建色彩
                            var colorList = [
                              '#F4E001','#C6E579','#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },

　　　　　　　　　　　　　　//以下为是否显示，显示位置和显示格式的设置了
//                         label: {
//                             show: true,
//                             position: 'right',
// //                             formatter: '{c}'
//                             formatter: '{b}\n{c}',
//                             color:"#000"
//                         }
                    }
                },
              data: [22, 33]
              
          }]
      });
      setTimeout(function (){
        window.onresize = function () {
          myChart.resize();
        }
	    },200)
    },
  }
};
</script>

<style scoped lang="scss">
  .statistic {
    margin: 15px 0;
    text-align: center;
    .box {
      margin-left: 3%;
      border: 1px solid rgba(187, 187, 187, 0.5);
    }
  }
  .graph_area {
    width: 95.3%;
    height: 550px;
    background: rgba(244, 244, 244, 1);
    margin-left: 3%;
  }
</style>