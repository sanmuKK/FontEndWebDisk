<template>
  <div>
    <el-row>
      <el-col :span="5">
        <creat-new-catalog @pageChange="pageChange"></creat-new-catalog>
      </el-col>
      <el-col :span="19">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="8"
          :current-page="currentPage"
          :total="currentTotal"
          @current-change="pageChange"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column label="文件夹" width="180">
        <template slot-scope="scope">
          <i class="el-icon-folder"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传者" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.ownerUserName }}</p>
            <p>ID: {{ scope.row.ownerUserId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.ownerUserName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="上传日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.uploadTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" @click="open(scope.row.id)" type="primary">打开</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import CreatNewCatalog from "./CreatNewCatalog.vue";
export default {
  name: "Catalog",
  components: {
    CreatNewCatalog,
  },
  data() {
    return {
      currentPage: 1,
      currentTotal: 10,
      tableData: [],
      loading: true,
    };
  },
  mounted() {
    this.pageChange(1);
  },
  methods: {
    pageChange(current) {
      const that = this;
      this.$axios
        .get("/api/getMyCatalog", {
          params: {
            page: current,
          },
        })
        .then(function (response) {
          if (response.data.code === 0) {
            that.tableData = response.data.catalogList;
            that.currentTotal = response.data.total;
            that.loading = false;
            that.currentPage = current;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    open(catalogId) {
      this.$router.push({
        path: "/home/file",
        query: {
          catalogId: catalogId,
        },
      });
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件夹, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get("/api/delCatalog", {
              params: {
                id: id,
              },
            })
            .then((res) => {
              if (res.data.code === 0) {
                this.pageChange(1);
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else
                this.$message({
                  type: "info",
                  message: "删除失败",
                });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  creatCatalog() {},
};
</script>
<style scoped>
</style>