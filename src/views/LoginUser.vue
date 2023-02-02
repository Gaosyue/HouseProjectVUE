
<template>
  <div class="body-bg">
    <div class="container">
      <!--这里有条件的话，建议做成二维码登录-->
      <div class="div-description">
        <img src="../Pic/1.jpg" alt="" /><span>更多咨询可扫码观看~</span>
      </div>
      <!--这里有条件的话，建议做成二维码登录结束-->
      <div class="div-form" ref="LoginFrom">
        <!--这个是原先的登录页面，要改造成账号密码登录开始-->
        <form action="" class="form-login" ref="LoginFromf">
          <h1>login</h1>
          <input type="text" placeholder="帐号" v-model="account" />
          <input type="password" placeholder="密码" v-model="password" />

          <button type="button" @click="Login()">Login</button>
          <div class="control">
            <span>没有帐号？<a href="#" ref="Register">Register</a></span>
          </div>
        </form>
        <!--这个是原先的登录页面，要改造成账号密码登录结束-->
        <!--这个是原先的注册页面，要改造成邮箱验证码登录-->
        <form action="" class="form-register disappear" ref="RegisterFromf">
          <h1>Register</h1>
          <input type="text" placeholder="帐号" />
          <input type="password" placeholder="密码" />

          <button type="button">Register</button>
          <div class="control">
            <span>已有帐号？<a href="#" ref="Login">Login</a></span>
          </div>
        </form>
        <!--这个是原先的注册页面，要改造成邮箱验证码登录-->
      </div>
      <!--这里有条件的话，建议做成二维码登录-->
      <div class="div-description">
        <img src="../Pic/1.jpg" alt="" /><span>更多咨询可扫码观看666~</span>
      </div>
      <!--这里有条件的话，建议做成二维码登录结束-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: "admin",
      password: "123456",
    };
  },
  mounted() {
    this.$refs.Register.addEventListener("click", this.qieone);
    this.$refs.Login.addEventListener("click", this.qietwo);
  },
  methods: {
    qieone() {
      this.$refs.LoginFromf.classList.add("disappear");
      this.$refs.RegisterFromf.classList.remove("disappear");
      this.$refs.LoginFrom.style.transform = "rotateY(180deg)";
    },
    qietwo() {
      this.$refs.RegisterFromf.classList.add("disappear");
      this.$refs.LoginFromf.classList.remove("disappear");
      this.$refs.LoginFrom.style.transform = "none";
    },
    Login() {
      var token = {
        params: {
          account: this.account,
          password: this.password,
        },
      };
      this.axios
        .get("https://localhost:44360/api/Login/UserLogin", token)
        .then((res) => {
          var data = res.data;
          if (data.Code != 200) {
            this.$message.success("您的账号或者密码错误");
          } else {
            localStorage.setItem("UserInfo", JSON.stringify(data.Result));
            this.$router.push("/ConTian");
          }
        });
    },
  },
};
</script>

<style >
.body-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-image: linear-gradient(120deg, #a1c4fd, #c2e9fb);
}

.container {
  position: relative;
  display: flex;
  /* 视域 */
  perspective: 1200px;
  transform-style: preserve-3d;
}

.div-description {
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px 0 0 5px;
  transform: translateZ(-1px);
}

.div-description:nth-last-child(1) {
  border-radius: 0 5px 5px 0;
}

.div-description img {
  width: 75%;
  margin-bottom: 15px;
}

.div-description span {
  font-size: 12px;
  color: #555;
}

.div-form {
  width: 300px;
  height: 400px;
  position: absolute;
  left: 0;
  transition: 0.5s;
  transform-origin: right;
}

.div-form .form-login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(to right, #48c6ef 0%, #6f86d6 200%);
  border-radius: 5px 0 0 5px;
}

.div-form .form-register {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(to right, #48c6ef -100%, #6f86d6 100%);
  border-radius: 0 5px 5px 0;
  transform: rotateY(180deg);
}

.div-form form.disappear {
  display: none;
}

.div-form h1 {
  margin: 50px 0 25px 0;
  /* 大写 */
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 5px;
}

.div-form input {
  background-color: transparent;
  width: 70%;
  color: #fff;
  outline: none;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.7);
  padding: 5px 0;
  margin: 8px 0;
  text-indent: 5px;
  font-size: 14px;
  letter-spacing: 1px;
}

.div-form input::placeholder {
  color: #fff;
}

.div-form button[type="button"] {
  width: 70%;
  height: 32px;
  margin: 30px auto 10px;
  font-size: 14px;
  color: #fff;
  border: none;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.4s;
}

.div-form button[type="button"]:hover {
  letter-spacing: 3px;
  background-color: #fff;
  color: #000;
}

.div-form .control {
  color: #fff;
  margin: 5px;
  font-size: 13px;
}

.div-form .control a {
  color: #fff;
  margin: 0 5px;
  letter-spacing: 1px;
}

.div-form .control a:hover {
  color: #000;
}
</style>