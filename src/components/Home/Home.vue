<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="downline">
          <el-row>
            <el-col :span="4">
              <logo></logo>
            </el-col>
            <el-col :span="18">
              <nav-menu></nav-menu>
            </el-col>
            <el-col :span="2">
              <logout></logout>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <el-container>
          <el-aside width="200px" style="margin-top: -20px"
            ><aside-menu></aside-menu
          ></el-aside>
        </el-container>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavMenu from "./NavMenu.vue";
import AsideMenu from "./AsideMenu.vue";
import Logo from "./Logo.vue";
import Logout from "./Logout.vue";

export default {
  name: "Home",
  components: {
    NavMenu,
    AsideMenu,
    Logo,
    Logout,
  },
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
  margin-top: -16px;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
  border-bottom: 2px solid #f3eeeef8;
  top: 0px;
  width: 1510px;
}
.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.downline {
  border-bottom: 2px solid #dcdfe6;
}
</style>
