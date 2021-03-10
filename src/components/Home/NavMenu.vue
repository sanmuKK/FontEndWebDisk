<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">网盘</el-menu-item>
      <el-menu-item index="3" disabled>分享</el-menu-item>
      <el-menu-item index="3" disabled>更多</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "NavMenu",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
.el-menu-item {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 16px;
}
.el-menu {
  border-bottom-color: #ffffff !important;
}
</style>
