<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-card shadow="always">
          <h1 style="text-align: center">欢迎登陆</h1>
          <el-divider></el-divider>
          <!-- form表单 -->
          <el-form
            :model="nameValidateForm"
            ref="nameValidateForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- 用户名 -->
            <el-form-item
              label="手机号"
              prop="tel"
              :rules="[{ required: true, message: '手机号不能为空' }]"
            >
              <el-input
                placeholder="请输入手机号"
                type="text"
                v-model="nameValidateForm.tel"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item
              label="密码"
              prop="password"
              :rules="[{ required: true, message: '密码不能为空' }]"
            >
              <el-input
                placeholder="请输入密码"
                v-model="nameValidateForm.password"
                show-password
              ></el-input>
            </el-form-item>

            <!-- 按钮 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('nameValidateForm')"
                >登录</el-button
              >
              <el-button @click="$goRoute('/register')">注册</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LoginCard",
  data() {
    return {
      nameValidateForm: {
        tel: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this;
          this.$axios
            .post("/api/login", {
              account: this.nameValidateForm.tel,
              password: this.nameValidateForm.password,
            })
            .then(function (response) {
              if(response.data.code === 0)
              {
                localStorage.setItem("token",response.data.token);
                alert("登录成功");
                that.$goRoute("/home/catalog");
              }
              else
              {
                alert("手机号或密码错误");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("格式错误");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.el-radio-group {
  display: flex;
  margin: 20px;
  /* 边缘 */
  justify-content: center;
}
.el-card {
  border-radius: 30px;
  width: 380px;
  /* box-shadow: 0 2px 12px 0 rgb(243, 102, 102); */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
}
.grid-content {
  /* background: rgb(14, 214, 131); */
  border-radius: 4px;
  min-height: 80px;
}
.el-row {
  margin-bottom: 20px;
}
/* .el-input{
  width: 250px;  
  } */
.el-form-item {
  width: 300px;
}
</style>