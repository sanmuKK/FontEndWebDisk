<template>
  <div>
    <el-row>
      <el-col :span="5">
        <upload :catalogId="catalogId"></upload>
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
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :center="true"
      top="3vh"
    >
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column label="文件" width="180">
        <template slot-scope="scope">
          <i class="el-icon-picture-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传者" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.uploadUserName }}</p>
            <p>ID: {{ scope.row.uploadUserId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.uploadUserName }}</el-tag>
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
          <el-button size="mini" @click="open(scope.row.id)" type="primary">预览</el-button>
          <el-button plain size="mini" @click="download(scope.row.id, scope.row.name)" type="primary"
            >下载</el-button
          >
          <el-button size="mini" type="danger" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Upload from "./Upload.vue";
export default {
  name: "Catalog",
  components: {
    Upload,
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      currentPage: 1,
      currentTotal: 10,
      tableData: [],
      loading: true,
      catalogId: this.$route.query.catalogId,
    };
  },
  mounted() {
    this.pageChange(1);
  },
  methods: {
    pageChange(current) {
      const that = this;
      this.$axios
        .get("/api/viewFile", {
          params: {
            page: current,
            catalogId: this.catalogId,
          },
        })
        .then(function (response) {
          if (response.data.code === 0) {
            that.tableData = response.data.resourcesList;
            that.currentTotal = response.data.total;
            that.loading = false;
            that.currentPage = current;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    open(id) {
      const that = this;
      this.$axios
        .get("/api/download", {
          params: {
            fileId: id,
          },
          responseType: "arraybuffer",
        })
        .then((response) => {
          that.dialogImageUrl =
            "data:image/jpeg;base64," + that.arrayBufferToBase64(response.data);
          that.dialogVisible = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    },
    download(id, name) {
      this.$axios
        .get("/api/download", {
          params: {
            fileId: id,
          },
          responseType: "blob",
        })
        .then((res) => {
          let blob = new Blob([res.data]);
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = name;
          downloadElement.click();
          window.URL.revokeObjectURL(href);
        });
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get("/api/delFile", {
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
};
</script>
<style scoped>
</style>