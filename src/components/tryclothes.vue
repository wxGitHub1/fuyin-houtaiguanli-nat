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
      tableNav: 'willmessage',
      tabIndex: 'willmessage',
      tables: [{
        title: '待通知',
        name: 'willmessage',
        content: 'try-message',
        isClose: false,
      }],
      navTable: [{
        name: 'willmessage',
        title: '待通知',
      },{
        name: 'willrepair',
        title: '待报修',
      },{
        name: 'willtake',
        title: '待试穿',
      },{
        name: 'willmaintain',
        title: '待维修',
      },{
        name: 'take',
        title: '已试穿',
      },{
        name: 'maintain',
        title: '已维修',
      },],
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
          case 'willmessage':
            _this.tableNav = newTabName;
            break;
          case 'willtake':
            _this.tables.push(
              {
                title: '待试穿',
                name: newTabName,
                content: 'try-willtake',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'willrepair':
            _this.tables.push(
              {
                title: '待报修',
                name: newTabName,
                content: 'maintain-repair',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'willtake':
            _this.tables.push(
              {
                title: '待试穿',
                name: newTabName,
                content: 'try-willtake',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'willmaintain':
            _this.tables.push(
              {
                title: '待维修',
                name: newTabName,
                content: 'will-maintain',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'take':
            _this.tables.push(
              {
                title: '已试穿',
                name: newTabName,
                content: 'try-take',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'maintain':
            _this.tables.push(
              {
                title: '已维修',
                name: newTabName,
                content: 'maintain',
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
