<template>
  <div class="container">
    <el-row class="search">
        <el-col :span="2" style="width: 5.5%;line-height: 30px">
          <span>客户姓名</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="clientName" size="small" placeholder="请输入姓名"></el-input>
        </el-col>
        <el-col :span="2" style="width: 5.5%;line-height: 30px">
          <span>产品名</span>
        </el-col>
        <el-col :span="3">
          <el-input size="small" v-model="clientPhone" placeholder="请输入联系电话"></el-input>  
        </el-col>
        <el-col :span="1" style="width: 4.8%;margin-left: 1%;">
          <el-button size="small" type="primary" class="btns">查询</el-button>
        </el-col>
        <el-col :span="2" style="width: 5.5%;margin-left: 47%;line-height: 30px">
          <el-button type="warning" size="small">批量打印订单</el-button>
        </el-col>
    </el-row>
    <el-row class="client_table">
        <el-col :span="24">
          <el-table :border="true" :data="clientData" style="width: 100%">
            <el-table-column width="60" align="center" type="index" label="序号">

            </el-table-column>
            <el-table-column align="center" prop="name" label="客户姓名" min-width="60"></el-table-column>
            <el-table-column align="center" prop="phone" label="年龄" min-width="80"></el-table-column>
            <el-table-column align="center" prop="sex" label="产品名称" min-width="80"></el-table-column>
            <el-table-column align="center" prop="takePeople" label="产品型号" min-width="80"></el-table-column>
            <el-table-column align="center" prop="productName" label="是否加急" min-width="80"></el-table-column>
            <el-table-column align="center" prop="time" label="是否有X光片" min-width="60"></el-table-column>
            <el-table-column align="center" prop="moduleState" label="主取型人" min-width="80"></el-table-column>
            <el-table-column align="center" prop="moduleState" label="交货日期" min-width="80"></el-table-column>
            <el-table-column align="center" prop="operation" label="操作" min-width="120">
              <template slot-scope="scope">
                <el-button type="primary" @click="handleOrder(scope.row)" size="small">打印</el-button>
                <el-button type="primary" @click="handleOrder(scope.row)" size="small">验收</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
        clientName: '',
        clientPhone: '',
        clientChoseDate: '',
        isMember: '',
        clientData: [{
          name: '张三',
          sex: '男',
          phone: '1829416233',
          takePeople: '王麻子',
          productName: '拉升期',
          moduleState: '完成',
          time: String(new Date().toLocaleDateString()),
          isMember: '是',
        }],
      }
  }
};
</script>

<style scoped lang="scss">
.container{
  width: 100%;
  .search{
    text-align: center; 
  }
  .another_row{
    text-align: center;
    margin-top: 20px;
    span{
      line-height: 30px;
    }
  }
  .client_table{
    margin-top: 20px;
  }
}
</style>
