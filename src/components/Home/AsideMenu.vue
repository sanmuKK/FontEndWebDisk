<template>
  <div>
    <el-menu
      default-active="1-1"
      class="box1"
    >
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document-copy"></i>
          <span>全部文件</span>
        </template>
        <el-menu-item-group class="aside-group">
          <el-menu-item
            class="aside-group-item"
            index="1-1"
            style="margin-top: -14px"
            @click="toCatalog"
            >图片</el-menu-item
          >
          <el-menu-item class="aside-group-item" index="1-2" disabled>文档</el-menu-item>
          <el-menu-item class="aside-group-item" index="1-3" disabled>视频</el-menu-item>
          <el-menu-item class="aside-group-item" index="1-4" disabled>音乐</el-menu-item>
          <el-menu-item class="aside-group-item" index="1-5" disabled>其他</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2" disabled>
        <i class="el-icon-share"></i>
        <span slot="title">我的分享</span>
      </el-menu-item>
      <el-menu-item index="3" class="location" disabled>
        <i class="el-icon-delete-solid"></i>
        <span slot="title">回收站</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "AsideMenu",
  methods: {
    toCatalog(){
      this.$goRoute('/home/catalog')
    }
  },
};
</script>
<style scoped>
.box1 {
  background-color: #f7f7f7;
  height: 90vh;
  right: 36px;
}
.location {
  margin-left: -14px;
}
</style>
