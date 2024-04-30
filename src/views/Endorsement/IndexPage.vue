<template>
    <div class="main-box">
        <div class="endorsement-area">
            <div class="box">
                <h2>输入背书码</h2>
            </div>
            <div class="box">
                <p style="text-align: left;">Nhenan anlv use reguests endorsament to submito an archive or subject dlas, heyrecave an endbsemen code.To endose auser youmustgethe endorsement code far thatuser an enlerthe endcxsemen codeinl the
form on this page, An endorsement code is a six character alphanumeric string (ex, H6ZX2L.)</p>
                <p style="text-align: left;">Afterenteimng mhe endorsement ode, we wl Ne you utherinstruclons and askityou ishto endosethe persanwho gave youthe ode Youlalso gethe chance to makean opianal comentabot yourendorsenant orlackof endorsement . vour comment and vour choice to endorse or not endorse this person wil be keot orivate beween yoursel and the arXiv administration.</p>
            </div>
            <div class="box">
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="120px"
                    class="demo-ruleForm"
                    :size="'default'"
                    status-icon
                    >
                    <el-form-item label="EndorsementCode" prop="endorsementCode">
                        <el-input v-model="ruleForm.endorsementCode" size="large" class="step1-sty" placeholder="Please input endorsement code" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="userInfo-area">
            <div class="box">
                <h2>填写您的账号和密码</h2>
            </div>
            <div class="box">
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="120px"
                    class="demo-ruleForm"
                    :size="'default'"
                    status-icon
                    >
                    <el-form-item label="Code" prop="code">
                        <el-input v-model="ruleForm.code" size="large" class="step1-sty" placeholder="Please input account" />
                    </el-form-item>
                    <el-form-item label="password" prop="password">
                        <el-input v-model="ruleForm.password" size="large" class="step1-sty" placeholder="Please input password" />
                    </el-form-item>
                    <div>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive,onMounted,ref } from 'vue'
// import {decrypt} from '@/utils/secret'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import {endorsement} from '@/api/paper/paper'
const router = useRouter()

let cipherText = ref('')
const ruleFormRef = ref();
onMounted(() => {
    let url = window.location.href ;
    let dz_url = url.split('#')[0];                //获取#/之前的字符串
    if(dz_url.split('?')[1] == undefined){
        router.push({
        path:"/",
    })
        return;
    }
    let cs = dz_url.split('?')[1].substring(2);     
    cipherText.value = cs;           //获取?之后的参数字符串
    console.log(cs)
    // let str = decrypt(cs)
    // console.log(str)
    // let cd = str.split(':');
    // console.log(cd)
    // console.log(cd[0])
    // let cs_arr = cs.split('&');       
    // console.log(cs_arr)
})

const ruleForm = reactive({
  code: '',
  password: '',
  endorsementCode: ''
})
const rules = reactive({
  code: [
    { required: true, message: 'Please input code', trigger: 'blur'},
  ],
  password: [
    {required: true, message: 'Please input password', trigger: 'blur'}
  ],
  endorsementCode: [
    {required: true, message: 'Please input endorsementCode', trigger: 'blur'}
  ]
})


// 提交表单
const submitForm = async (formEl) => {
    console.log(formEl)
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
        console.log(ruleForm)
        endorsement({
            code: ruleForm.code,
            password: ruleForm.password,
            endorsementCode: ruleForm.endorsementCode,
            cipherText: cipherText.value
        }).then((res) => {
            if(res.code != 200){
                ElMessage({
                type: 'success',
                message: res.message,
            })
            }else{
                ElMessage({
                    type: 'error',
                    message: res.message,
                })
            }
        })
        // console.log(cipherText.value)
    } else {
        // console.log(ruleForm)
        // console.log(cipherText.value)
      ElMessage({
      message: '请按规则填写完整信息，点击Last step退回修改',
      type: 'warning',
  })
    }
  })
}


function show(){
    console.log(ruleForm)
    console.log(cipherText.value)
}
</script>
<style lang="scss" scoped>
.main-box{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    width: 60%;
}
.endorsement-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    // background-color: rgb(85, 57, 24);
    width: 100%;
}
.userInfo-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background-color: bisque;
    width: 100%;
}
.box{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start
}
</style>