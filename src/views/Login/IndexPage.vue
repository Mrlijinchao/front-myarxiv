<template>
    <div class="main-area">
         <!-- 整体背景 -->
   <div class="login-wrap">
     <!--输入框-->
     <div v-if="passwordOrEmail" class="form-wrapper">
       <div class="header">
         Log in
         <el-link @click="changeWay()" type="primary">验证码登录</el-link>
       </div>
       <div class="input-wrapper">
         <div class="border-wrapper">
           <input type="text" v-model="username" placeholder="username" class="border-item" autocomplete="off" />
         </div>
         <div class="border-wrapper">
           <input type="password" v-model="password" placeholder="password" class="border-item" autocomplete="off" />
         </div>
       </div>
       <div class="action">
         <div class="btn" @click="login()">login</div>
       </div>
       <div class="form-bottom">
         <div><router-link to="/facade/login" style="color: #409EFF;">忘记密码吗？</router-link></div>
         <div><router-link to="/facade/register" target="myRout" style="color: #409EFF;">去注册</router-link></div>
       </div>
     </div>
 
     <div v-if="!passwordOrEmail" class="form-wrapper">
       <div class="header">
         Log in
         <el-link @click="changeWay()" type="primary">密码登录</el-link>
       </div>
       <div class="input-wrapper">
         <div class="border-wrapper">
           <input type="text" v-model="userEmail" placeholder="email" class="border-item" autocomplete="off" />
         </div>
         <div class="border-wrapper">
           <input type="password" v-model="verifyCode" placeholder="code" class="border-item" autocomplete="off" />
           <!-- <span>发送验证码</span> -->
           <div class="send-sty" @click="sendLoginEmail()">{{ content }}</div>
         </div>
       </div>
       <div class="action">
         <div class="btn" @click="userEmailLogin()">login</div>
       </div>
       <div class="form-bottom">
        <div><router-link to="/facade/login" style="color: #409EFF;">忘记密码吗？</router-link></div>
         <div><router-link to="/facade/register" target="myRout" style="color: #409EFF;">去注册</router-link></div>
       </div>
     </div>
 
   </div>
    </div>
   
 
 </template>
   
 <script setup>
import { ref } from "vue";
import { passwordLogin, emailLogin, sendEmail } from "@/api/user/user"
import { ElMessage,ElLoading } from 'element-plus'
import {useRouter} from "vue-router";
let router = useRouter();
import { useStore } from "vuex";
let store = useStore();

let passwordOrEmail = ref(true);


// 改变登录方式
function changeWay() {
    passwordOrEmail.value = !passwordOrEmail.value;
}

// 发送登录邮件
let content = ref("获取验证码");
let totalTime = ref(60);
let canClick = ref(true);
function sendLoginEmail() {
      if (!canClick.value) {
        return;
      } //节流

      if(userEmail.value.trim() === ''){
            ElMessage({
                message: '请填写邮箱号！',
                type: 'warning',
            })
            return;
        }
        
      sendEmail({
        email: userEmail.value.trim(),
        emailTitle: '登录验证码邮件',
        emailSubject: '登录验证码'
      }).then((res) => {

        if(res.code === 200){
            ElMessage({
                message: res.data,
                type: 'success',
            })

            canClick.value = false;
            content.value = totalTime.value + "秒";
            let clock = window.setInterval(() => {
            totalTime.value--;
            content.value = totalTime.value + "秒";
             if (totalTime.value < 0) {
             //当倒计时小于0时清除定时器
            window.clearInterval(clock); //关闭
            content.value = "重新发送";
            totalTime.value = 60;
            canClick.value = true; //这里重新开启
            }
            }, 1000);

        }else {
            ElMessage({
                message: res.message,
                type: 'warning',
            })
        }
      })
      
}

// 密码登录
let username = ref('');
let password = ref('');
function login() {
    username.value = username.value.trim()
    password.value = password.value.trim()
    if(username.value === '' || password.value === ''){
        ElMessage({
            message: '请填写完整信息！',
            type: 'warning',
        })
        return;
    }
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    passwordLogin({
        code: username.value,
        password: password.value
    }).then((res) => {
        console.log(res)
        if(res.code === 200){
          // store.dispatch('user/setUserToken',data.meta.token)
          sessionStorage.setItem("token",res.data.token)
          sessionStorage.setItem("userId",res.data.userInfo.id)
          router.push({
              path:"/user/home",
              query: {token: res.data.token}
          })
        }else{
          ElMessage({
            message: res.message,
            type: 'warning',
        })
        }
        loading.close();
    })
    
}

// 邮箱验证码登录
let userEmail = ref('');
let verifyCode = ref('');
function userEmailLogin() {
    userEmail.value = userEmail.value.trim();
    verifyCode.value = verifyCode.value.trim();
    if(userEmail.value === '' || verifyCode.value === ''){
        ElMessage({
            message: '请填写完整信息！',
            type: 'warning',
        })
        return;
    }

    emailLogin({
        email:  userEmail.value, 
        emailCode: verifyCode.value 
    }).then((res) => {
      console.log(res)
        if(res.code === 200){
          // store.dispatch('user/setUserToken',data.meta.token)
          sessionStorage.setItem("token",res.data.token)
          sessionStorage.setItem("userId",res.data.userInfo.id)
          router.push({
              path:"/user/home",
              query: {token: res.data.token}
          })
        }else{
          ElMessage({
            message: res.message,
            type: 'warning',
        })
        }
    })

}
 </script>
   
 <style scoped>
 .main-area{
    height: 100%;
    width: 100%;
 }
 .login-wrap {
   height: 100%;
   font-family: JetBrains Mono Medium;
   display: flex;
   align-items: center;
   justify-content: center;
   /* background-color: white; */
   background: url('../../../public/images/背景图.jpg');
   background-size: 100% 100%;
 }
  
 .form-wrapper {
   width: 300px;
   background-color: rgba(41, 45, 62, 0.8);
   color: #fff;
   border-radius: 1rem;
   padding: 4rem;
   margin-top: -15rem;
 }
  
 .form-wrapper .header {
   text-align: center;
   font-size: 2rem;
   text-transform: uppercase;
   line-height: 3rem;
   display: flex;
   flex-direction: column;
   justify-content:center;
   align-items: center;
 }
  
 .form-wrapper .input-wrapper input {
   background-color: rgb(41, 45, 62);
   border: 0;
   width: 100%;
   text-align: center;
   font-size: 1rem;
   color: #fff;
   outline: none;
 }
  
 .form-wrapper .input-wrapper input::placeholder {
   text-transform: uppercase;
 }
  
 .form-wrapper .input-wrapper .border-wrapper {
   background-image: linear-gradient(to right, #e8198b, #0eb4dd);
   width: 100%;
   height: 3rem;
   margin-bottom: 2rem;
   border-radius: 2rem;
   display: flex;
   align-items: center;
   justify-content: center;
 }
  
 .form-wrapper .input-wrapper .border-wrapper .border-item {
   height: calc(100% - 0.2rem);
   width: calc(100% - 0.2rem);
   border-radius: 2rem;
 }
  
 .form-wrapper .action {
   display: flex;
   justify-content: center;
 }
  
 .form-wrapper .action .btn {
   width: 60%;
   text-transform: uppercase;
   border: 2px solid #0e92b3;
   text-align: center;
   line-height: 3rem;
   border-radius: 30px;
   cursor: pointer;
 }
  
 .form-wrapper .action .btn:hover {
   background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
 }
  
 .form-wrapper .icon-wrapper {
   text-align: center;
   width: 60%;
   margin: 0 auto;
   margin-top: 2rem;
   border-top: 1px dashed rgb(146, 146, 146);
   padding: 3rem;
 }
  
 .form-wrapper .icon-wrapper i {
   font-size: 2rem;
   color: rgb(187, 187, 187);
   cursor: pointer;
   border: 1px solid #fff;
   padding: 5px;
   border-radius: 2rem;
 }
  
 .form-wrapper .icon-wrapper i:hover {
   background-color: #0e92b3;
 }
 .form-bottom{
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-top: 2rem;
 }
 .send-sty{
     width: 50%;
     font-size: 1rem;
 }
 </style>