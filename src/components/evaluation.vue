<template>
  <div style="width: 100%;height: 100%;">
    <!-- <el-button type="danger" style="position:absolute; z-index:9999;top: 100px;"  @click="addTab('orderManage')">增加</el-button> -->
    <my-header :navTables="navTable" v-on:acceptTitle="newTitle"></my-header>
    <div class="child_page">
      <el-tabs class="table_style" v-model="tableNav" type="card" @tab-remove="removeTab">
        <el-tab-pane class="home_table" v-for="(item) in tables" :key="item.name" :closable="item.isClose" :label="item.title" :name="item.name">
          <component :is="item.content"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      tableNav: 'home',
      tabIndex: 'home',
      tables: [{
        title: '💳',
        name: 'home',
        content: 'evaluation-home',
        isClose: false,
      }],
      navTable: [{
        name: 'willreceive',
        title: '待接待',
      },{
        name: 'receive',
        title: '已接待',
      },{
        name: 'ordermanage',
        title: '订单管理',
      },{
        name: 'product',
        title: '产品维修',
      },{
        name: 'statistic',
        title: '统计报表',
      }],
      Repeat: false,
    };
  },
  directives: {
      noclose: {
        // 指令的定义
        inserted: function (el) {
          let domProperty = el.getAttribute('data');
          el.setAttribute('closable', false);
          if (domProperty === 'homepage') {
            el.setAttribute('closable', true);
          } else {
            console.log(2);
          }
        }
      }
  },
  methods: {
    // 增加标签
    newTitle(prop) {
      let _this = this;
      let newTabName = prop + '';
      this.tableNav = newTabName;
      _this.Repeat = true;
      _this.tables.map((item) => {
        if (item.name === prop) {
          _this.Repeat = false;
        }
      });
      if(_this.Repeat) {
        switch(newTabName) {
          case 'willreceive':
            _this.tables.push({
              title: '待接待',
              name: newTabName,
              content: 'evaluation-willreceive',
              isClose: true,
            });
            this.tableNav = newTabName;
            break;
          case 'receive':
            _this.tables.push(
              {
                title: '已接待',
                name: 'receive',
                content: 'evaluation-receive',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'ordermanage':
            _this.tables.push(
              {
                title: '订单管理',
                name: 'ordermanage',
                content: 'evaluation-order',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'product':
            _this.tables.push(
              {
                title: '产品维修',
                name: 'product',
                content: 'evaluation-product',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'statistic':
            _this.tables.push(
              {
                title: '统计报表',
                name: 'statistic',
                content: 'evaluation-statistic',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
        }
      } else {
        return;
      }
    },

    //移除标签
    /*
     * @param  {Object} targetName {content, isClose, name, title}
     */
    removeTab(targetName) {
      let activeName = this.tableNav;
      let tabs = this.tables;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        })
      };
      this.tableNav = activeName;
      this.tables = tabs.filter(tab => tab.name !== targetName);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.child_page{
  width: 89.6%;
  height: 93.8%;
  display: inline-block;
  position: absolute;
  top: 60px;
  left: 10.4%;
}
</style>
