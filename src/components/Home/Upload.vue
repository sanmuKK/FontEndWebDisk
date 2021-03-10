<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-folder-add"
      @click="dialogFormVisible = true"
      >上传文件</el-button
    >

    <el-dialog title="上传文件" :visible.sync="dialogFormVisible">
      <el-upload
        list-type="picture-card"
        accept="image/jpeg,image/gif,image/png,image/jpg"
        ref="upload"
        :action="ip"
        :on-preview="handlePictureCardPreview"
        :data="uploadData"
        :limit="3"
        :headers="token"
        :auto-upload="false"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog
        :visible.sync="dialogVisible"
        append-to-body="true"
        center="true"
        top="3vh"
      >
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadFileList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Upload",
  props: ["catalogId"],
  data() {
    return {
      ip: this.$axios.defaults.baseURL + "/api/upload",
      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      uploadData: {
        catalogId: this.catalogId,
      },
      token: {
        token: localStorage.getItem("token"),
      },
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFileList() {
      this.$refs.upload.submit();
      this.dialogFormVisible = false;
      this.$refs.upload.clearFiles();
      this.$notify({
        title: "成功",
        message: "上传成功,请等待管理员审核",
        type: "success",
      });
    },
  },
};
</script>
<style scoped>
</style>
