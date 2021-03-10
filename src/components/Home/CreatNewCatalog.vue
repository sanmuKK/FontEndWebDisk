<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-folder-add"
      @click="dialogFormVisible = true"
      >新建文件夹</el-button
    >

    <el-dialog title="新建文件夹" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" class="demo-ruleForm">
        <el-form-item
          label="文件夹名称"
          :label-width="formLabelWidth"
          :rules="[{ required: true, message: '文件夹名字不能为空' }]"
          prop="catalogName"
        >
          <el-input v-model="form.catalogName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "CreatNewCatalog",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        catalogName: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    create() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.$axios
            .post("/api/createCatalog", {
              catalogName: this.form.catalogName,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          this.$emit("pageChange", 1);
        }
      });
    },
  },
  props: ["currentPage"],
};
</script>
<style scoped>
</style>
