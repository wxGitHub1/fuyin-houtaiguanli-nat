<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="体检拓展" name="first">
        <big-extends v-if='activeName === "first"'></big-extends>
      </el-tab-pane>
      <!-- <el-tab-pane label="合作机构" name="second">
        <big-cooperation v-if='activeName === "second"'></big-cooperation>
      </el-tab-pane> -->
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
  methods: {}
};
</script>

<style scoped lang="scss">
.container {
  margin-top: -10px;
}
</style>