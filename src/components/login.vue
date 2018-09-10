<template>
  <div class="login">
    <p>{{title}}</p>
    <div class="account">
      <el-input v-model="account" placeholder="请输入账号"></el-input>
    </div>
    <div class="password">
      <el-input v-model="passwd" placeholder="请输入密码" type="password"></el-input>
    </div>
    <div class="loginBtn">
      <el-row>
        <el-button @click="login" type="primary" round>登录</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'login',
  data () {
    return {
      title: 'login',
      account: '',
      passwd: ''
    }
  },
  methods: {
    login: function () {
      var that = this
      axios.post('http://localhost:3000/login', {
        name: that.account,
        password: that.passwd
      }).then(function (response) {
        console.log(response)
        var data = response.data
        if (data.stat === 1) {
          that.$router.push('/index')
        }
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
      })
    }
  }
}
</script>

<style scoped>
  .login p{
    width: 100%;
    height: 50px;
    background: #599f88;
    line-height: 50px;
    text-align: center;
  }
  .account,.password{
    width: 200px;
    margin: 0 auto;
  }
   .account{
     margin: 200px auto 20px auto;
   }
  .loginBtn{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .loginBtn button{
    width: 200px;
    margin-top: 20px;
  }
</style>
