<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <el-card shadow="always">
          <p class="title">注册</p>
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item prop="tel">
              <el-input
                v-model="ruleForm2.tel"
                auto-complete="off"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="userName">
              <el-input
                v-model="ruleForm2.userName"
                auto-complete="off"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="smscode" class="code">
              <el-input
                v-model="ruleForm2.smscode"
                placeholder="验证码"
              ></el-input>
              <el-button
                type="primary"
                :disabled="isDisabled"
                @click="sendCode"
                >{{ buttonText }}</el-button
              >
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                type="password"
                v-model="ruleForm2.pass"
                auto-complete="off"
                placeholder="输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm2.checkPass"
                auto-complete="off"
                placeholder="确认密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm2')"
                style="width: 100%"
                >注册</el-button
              >
              <p class="login" @click="$goRoute('/login')">已有账号？立即登录</p>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "Register",
  data() {
    let checkUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    let checkTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!this.checkMobile(value)) {
        callback(new Error("手机号码不合法"));
      } else {
        callback();
      }
    };
    let checkSmscode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机验证码"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        userName: "",
        pass: "",
        checkPass: "",
        tel: "",
        smscode: "",
      },
      rules2: {
        userName: [
          { validator: checkUserName, trigger: "change" },
          {
            max: 8,
            message: "用户名长度在 1 到 8 个字符",
            trigger: "change",
          },
        ],
        pass: [
          { validator: validatePass, trigger: "change" },
          {
            min: 8,
            max: 16,
            message: "密码长度在 8 到 16 个字符",
            trigger: "change",
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        tel: [{ validator: checkTel, trigger: "change" }],
        smscode: [{ validator: checkSmscode, trigger: "change" }],
      },
      buttonText: "发送验证码",
      isDisabled: false,
      flag: true,
    };
  },
  methods: {
    sendCode() {
      let tel = this.ruleForm2.tel;
      if (this.checkMobile(tel)) {
        console.log(tel);
        this.$axios
          .get("/api/register", {
            params: {
              phone: this.ruleForm2.tel,
            },
          })
          .catch(function (error) {
            console.log(error);
          });
        let time = 60;
        this.buttonText = "已发送";
        this.isDisabled = true;
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + " 秒";
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = "重新获取";
              this.isDisabled = false;
              this.flag = true;
            }
          }, 1000);
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this;
          this.$axios
            .post("/api/register", {
              account: this.ruleForm2.tel,
              password: this.ruleForm2.pass,
              code: this.ruleForm2.smscode,
              userName: this.ruleForm2.userName,
              avatar: "4",
            })
            .then(function (response) {
              if (response.data.code === 0) {
                setTimeout(() => {
                  alert("注册成功");
                  that.$goRoute('/login');
                }, 400);
              } else {
                setTimeout(() => {
                  if (response.data.code === 12) alert("验证码错误");
                  else alert("注册失败");
                }, 400);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    checkMobile(str) {
      let re = /^1\d{10}$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: absolute;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}
.login:hover {
  color: #2c2fd6;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.el-button--primary:focus {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
</style>