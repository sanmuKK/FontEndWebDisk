<template>
  <el-button class="location1" type="primary" @click="logout">注销</el-button>
</template>
<script>
export default {
  name: "Avatar",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$confirm("此操作将注销登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "注销成功!",
          });
          localStorage.removeItem("token");
          this.$goRoute("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>
<style scoped>
.location1 {
  margin-top: 12px;
  margin-left: 8px;
}
</style>
