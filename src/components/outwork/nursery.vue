<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="margin-t-10">
      <el-tab-pane label="便携/台式设备" name="first">
        <outwork-foot></outwork-foot>
      </el-tab-pane>
      <el-tab-pane label="数据设备" name="second">
        <outwork-bone></outwork-bone>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style scoped lang="scss">
.margin-t-10 {
  margin-top: -10px;
}
</style>