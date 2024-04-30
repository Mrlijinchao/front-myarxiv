<template>
    <div>
        <div>
            <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
                <el-step title="Step 1" />
                <el-step title="Step 2" />
                <el-step title="Step 3" />
            </el-steps>
        </div>
        <div>
            <div>
                <!-- 表单 -->
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
  <!-- 第一页 -->
  <div v-if="active === 0">
    <el-form-item label="Email" prop="email">
      <div class="text-annotation">
        <p>(请确保邮箱能够接收到验证码)</p>
        <el-input v-model="ruleForm.email" size="large" class="step1-sty" placeholder="Please input email" />
      </div>
      
    </el-form-item>
    <el-form-item label="Username" prop="username">
      <el-input v-model="ruleForm.username" size="large" class="step1-sty" placeholder="Please input username" />
    </el-form-item>
    <el-form-item label="Gender" prop="gender">
      <el-radio-group v-model="ruleForm.gender">
        <el-radio label="男" size="large" border>男</el-radio>
        <el-radio label="女" size="large" border>女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Password" prop="password" >
      <div class="text-annotation">
        <p>(密码至少包含大写字母，小写字母，数字，特殊字符其中三种，且长度为8到12位！)</p>
        <el-input type="password" v-model="ruleForm.password" size="large" class="step1-sty" placeholder="Please input password" />
      </div>
    </el-form-item>
    <el-form-item label="RePassword" prop="rePassword" >
      <el-input type="password"  v-model="ruleForm.rePassword" size="large" class="step1-sty" placeholder="Please input password again" />
    </el-form-item>
    <el-form-item label="PhoneNumber" prop="phone" >
      <el-input v-model="ruleForm.phone" size="large" class="step1-sty" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="School" prop="school" >
      <el-input v-model="ruleForm.school" size="large" class="step1-sty" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="Verification" prop="validate">
      <div class="verify-code">
        <el-input
            v-model="ruleForm.validate"
            placeholder="Verification code"
            size="large" 
            class="step1-sty"
          ></el-input>
          <div class="code" @click="refreshCode">
            <VerifyCode :identifyCode="identifyCode"></VerifyCode>
          </div>
      </div> 
        </el-form-item>
  </div>
  <!-- 第二页 -->
  <div v-if="active === 1">
    <el-form-item label="Full-name" prop="fullName">
      <div class="full-name">
        <el-input size="large" v-model="ruleForm.fullName.first" placeholder="First or Given name" />
        <el-input size="large" v-model="ruleForm.fullName.last" placeholder="Last or family name" />
        <el-input size="large" v-model="ruleForm.fullName.suffix" placeholder="Suffix" />
      </div>
      
    </el-form-item>
    <el-form-item label="Organization" prop="organization">
      <div class="organization">
        <p>(Users who do not have a current affiliation can select "Unaffiliated" or "Independent Researcher")</p>
      <el-select 
        v-model="ruleForm.organization" 
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
        placeholder="Please input your organization"
        size="large"
      >
        <el-option label="Unaffiliated" value="Unaffiliated" />
        <el-option label="Independent Researcher" value="Independent Researcher" />
      </el-select>
      </div>
    </el-form-item>
    <el-form-item label="Country" prop="country">
      <el-select-v2
        v-model="ruleForm.country"
        :options="countryList"
        placeholder="Country"
        size="large"
      />

      <!-- <el-select v-model="ruleForm.country" clearable placeholder="Country" size="large">
        <el-option
          v-for="item in countryList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->

    </el-form-item>
    <el-form-item label="Status" prop="status">
      <el-select-v2
        v-model="ruleForm.status"
        :options="careerStatusList"
        placeholder="Status"
        size="large"
      />
    </el-form-item>
    <el-form-item label="Group" prop="group">
      <el-radio-group v-model="ruleForm.group">
        <el-radio v-for="(item,i) in subjectList" v-bind:key="i" :label="item.value" name="type" @change="getCategoryTree(item.value)">
        {{ item.label }}
        </el-radio>
        <!-- <el-radio label="Online activities" name="type" />
        <el-radio label="Promotion activities" name="type" />
        <el-radio label="Offline activities" name="type" />
        <el-radio label="Simple brand exposure" name="type" /> -->
      </el-radio-group>
    </el-form-item>
    <el-form-item label="DefaultCategory" prop="defaultCategory">
      <div class="text-annotation">
        <p>(请先选择一个Group)</p>
        <el-cascader 
        v-model="ruleForm.defaultCategory" 
        :options="categoryTree" 
        placeholder="Default category" 
        clearable 
        :show-all-levels="false"/>
        <!-- <el-select-v2
        class="select-v2"
        v-model="ruleForm.defaultCategory"
        :options="categorySecondaryList"
        placeholder="Default category"
        size="large"
        @change="print"
      /> -->
      </div>
      
    </el-form-item>
    <el-form-item label="homePage" prop="homePage">
      <el-input v-model="ruleForm.homePage" size="large" class="step1-sty" placeholder="Please input your homePage URL" />
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </div>
<!-- 第三页 -->
  <div v-if="active === 2">
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email" size="large" class="step1-sty" placeholder="Please input email" disabled />
    </el-form-item>
    <el-form-item label="Username" prop="username">
      <el-input v-model="ruleForm.username" size="large" class="step1-sty" placeholder="Please input username" disabled />
    </el-form-item>
    <el-form-item label="Gender" prop="gender">
      <el-radio-group v-model="ruleForm.gender" disabled>
        <el-radio label="男" size="large" border>男</el-radio>
        <el-radio label="女" size="large" border>女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Password" prop="password" >
      <el-input type="password" v-model="ruleForm.password" size="large" class="step1-sty" placeholder="Please input password" disabled />
    </el-form-item>
    <el-form-item label="RePassword" prop="rePassword" >
      <el-input type="password" v-model="ruleForm.rePassword" size="large" class="step1-sty" placeholder="Please input password again" disabled />
    </el-form-item>
        <el-form-item label="Full-name" prop="fullName">
      <div class="full-name">
        <el-input size="large" v-model="ruleForm.fullName.first" placeholder="First or Given name" disabled />
        <el-input size="large" v-model="ruleForm.fullName.last" placeholder="Last or family name" disabled />
        <el-input size="large" v-model="ruleForm.fullName.suffix" placeholder="Suffix" disabled />
      </div>
      
    </el-form-item>
    <el-form-item label="Organization" prop="organization">
      <el-select 
        v-model="ruleForm.organization" 
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
        placeholder="Please input your organization"
        size="large"
        disabled
      >
        <el-option label="Unaffiliated" value="Unaffiliated" />
        <el-option label="Independent Researcher" value="Independent Researcher" />
      </el-select>
    </el-form-item>
    <el-form-item label="Country" prop="country">
      <el-select-v2
        v-model="ruleForm.country"
        :options="countryList"
        placeholder="Country"
        size="large"
        disabled
      />
    </el-form-item>
    <el-form-item label="Status" prop="status">
      <el-select-v2
        v-model="ruleForm.status"
        :options="careerStatusList"
        placeholder="Status"
        size="large"
        disabled
      />
    </el-form-item>
    <el-form-item label="Group" prop="group">
      <el-radio-group v-model="ruleForm.group" disabled>
        <el-radio v-for="(item,i) in subjectList" v-bind:key="i" :label="item.value" name="type">
        {{ item.label }}
        </el-radio>
        <!-- <el-radio label="Promotion activities" name="type" />
        <el-radio label="Offline activities" name="type" />
        <el-radio label="Simple brand exposure" name="type" /> -->
      </el-radio-group>
    </el-form-item>
    <el-form-item label="DefaultCategory" prop="defaultCategory">
        <el-cascader 
        v-model="ruleForm.defaultCategory" 
        :options="categoryTree" 
        placeholder="Default category" 
        clearable 
        :show-all-levels="false"
        disabled/>
      <!-- <el-select-v2
        class="select-v2"
        v-model="ruleForm.defaultCategory"
        :options="categorySecondaryList"
        placeholder="Default category"
        size="large"
        disabled
      /> -->
    </el-form-item>
    <el-form-item label="homePage" prop="homePage">
      <el-input v-model="ruleForm.homePage" size="large" class="step1-sty" disabled  placeholder="Please input your homePage URL"/>
    </el-form-item>
    <el-form-item label="emailVerifyCode" prop="emailVerifyCode">
      <el-input placeholder="Please input emailVerifyCode" v-model="ruleForm.emailVerifyCode" size="large" class="step1-sty"/>
      <el-button size="large" type="primary" @click="sendRegisterEmail()" plain>发送邮箱验证码</el-button>
    </el-form-item>
  </div>
  <template v-if="active === 1 || active === 2 ">
            <el-button style="margin-top: 12px" @click="last">Last step</el-button>
          </template>
          <template v-if="active === 0 || active === 1 ">
            <el-button style="margin-top: 12px" @click="next">Next step</el-button>
          </template>
          <template v-if="active === 2">
            <el-button style="margin-top: 12px" type="primary" @click="submitForm(ruleFormRef)">Register</el-button>
          </template>
  </el-form>  
        </div>
        <!-- 点击注册之后的弹出框 -->
        <el-dialog v-model="centerDialogVisible" title="提示" width="30%" center>
          <span>
            恭喜您注册成功！
          </span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="gotoLogin()">
              去登录
             </el-button>
          </span>
        </template>
        </el-dialog>

        </div>
    </div>
</template>
<script setup>
import { reactive,ref,onMounted } from 'vue'
import VerifyCode from "./components/VerifyCode.vue";
import { ElMessage } from 'element-plus'
import {checkUserAccount,sendEmail,userRegister} from '@/api/user/user';
import {getSubjectCategory, getAttribute } from '@/api/subject/subject'

const centerDialogVisible = ref(false)

// type MyType = {
//    value: number;
//    label: string
// }

let countryList = ref([]);
let careerStatusList = ref([]);
let subjectList = ref([]);
let categoryTree = ref([]);
let subjectMap = ref({})
let categorySecondaryList = ref([])


onMounted(() => {
  // 刷新验证码
  refreshCode();
  getRegisterNeededInfo();
})

// 获取注册所需信息
function getRegisterNeededInfo() {
    getSubjectCategory().then((res) => {
        transferSubjectData(res.data);
        console.log(res.data);
    })

    getAttribute({
        code: 'COUNTRY'
    }).then((res) => {
        transferAttributeData(res.data,'COUNTRY')
        console.log(res.data);
    })

    getAttribute({
        code: 'CAREER'
    }).then((res) => {
        transferAttributeData(res.data,'CAREER')
        console.log(res.data);
    })

}

// 转换数据
function transferAttributeData(data,code){
    let map = new Map(Object.entries(data));
    if(code === 'CAREER'){
        let careerList = map.get('CAREER'); 
        let arr = new Array();
        for(let i = 0;i<careerList.length;i++){
            let career = {
                value: careerList[i].value,
                label: careerList[i].value,
            }
            arr.push(career);
        }
        careerStatusList.value = arr;
    }
    if(code === 'COUNTRY'){
        let countryList1 = map.get('COUNTRY');
        let arr = new Array();
        for(let i = 0;i<countryList1.length;i++){
            let country = {
                value: countryList1[i].value,
                label: countryList1[i].value,
            }
            arr.push(country);
        }
        countryList.value = arr;
    }
}


// 转换学科数据
function transferSubjectData(data) {
    subjectMap.value = new Map();
  for(let i = 0;i<data.length;i++){
    let subject = {
      value: data[i].id,
      label: data[i].name,
    }
    subjectList.value.push(subject);
    subjectMap.value.set(data[i].id,data[i].categoryList)
  }
  console.log(" 转换学科数据")
  console.log(subjectMap.value);
}

// 根据subjectId生成分类树
function getCategoryTree(subjectId){
    // 清空之前的数据
    categoryTree.value = [];
    // console.log(subjectId)
    let initialCategoryTree = subjectMap.value.get(subjectId);
    console.log(initialCategoryTree)
    for(let i=0;i < initialCategoryTree.length;i++){
        let tempCategoryTree = transformTree(initialCategoryTree[i]);
        // console.log(initialCategoryTree[i])
        categoryTree.value.push(tempCategoryTree);
    }
    console.log(categoryTree.value)
}

// 生成树
function transformTree(data) {
    // 如果有子节点就继续递归，如果没有就返回
    if (data.children && data.children.length > 0) {
        let result = {
        value: data.id,
        label: data.name,
        children: []
        };
        for(let i = 0;i < data.children.length; i++){
            result.children.push(transformTree(data.children[i]));
        }
        return result;
    }else{
        let result = {
        value: data.id,
        label: data.name
        };
        return result;
    }
    
}


// 步骤条
const active = ref(0)
const next = () => {
  if (active.value++ > 2) active.value = 0
}

const last = () => {
  if(active.value-- < 0) active.value = 0;
}



// 以下为自定义校验方法

// 验证码校验
const validatorCode = (rule, value, callback) => {
      if (value !== identifyCode.value) {
        callback(new Error("验证码不正确"));
        // alert("验证码不正确")
      } else {
        callback();
      }
    };

// 全名校验
const validatorFullName = (rule, value, callback) => {
  if(value.first === '' || value.last === '' || value.suffix === ''){
    callback(new Error("Please input FullName"));
  }else{
      callback();
  }
}

// 邮箱校验
const validatorEmail = (rule, value, callback) => {
  
  let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

  if(!regEmail.test(value)){
    callback(new Error("邮箱格式错误！"));
  }else{
    callback();
  }
  
}
// 校验密码
const validatorPassword = (rule, value, callback) => {
  let regPassword = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/
  if(!regPassword.test(value)){
    callback(new Error("密码强度太弱！"));
  }else{
    callback();
  }

}

// 判断密码是否一致
const validatorRePassword = (rule, value, callback) => {
  if(value != ruleForm.password){
    callback(new Error("密码不一致！"));
  }else{
    callback();
  }

}

// 检查用户名是否已存在
const checkRepetition = (rule, value, callback) => {
  checkUserAccount({code: value}).then((res) => {
    console.log(res)
    if(res.code !== 200){
      callback(new Error(res.message));
    }else{
      callback();
    }
  })

}

// 发送邮箱验证码

function sendRegisterEmail() {
  sendEmail({
        email: ruleForm.email.trim(),
        emailTitle: '注册验证码邮件',
        emailSubject: '注册验证码'
    }).then((res) => {
      if(res.code == 200){
        ElMessage({
        message: res.data,
        type: 'success',
      })
    }else{
      ElMessage({
        message: '验证码发送失败！请重试！',
        type: 'warning',
      })
      }
  })
}



const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
  email: '',
  username: '',
  gender: '',
  password: '',
  rePassword: '',
  validate: [],
  fullName: {
    first: '',
    last: '',
    suffix: ''
  },
  organization: '',
  country: null ,
  status: null ,
  group: '',
  defaultCategory: null ,
  homePage: '',
  emailVerifyCode:'',
  phone: '',
  school: ''
})

const rules = reactive({
  email: [
    { required: true, message: 'Please input email', trigger: 'blur'},
    { validator: validatorEmail ,trigger: 'blur'},
  ],
  username: [
    {
      required: true,
      message: 'Please input unique username',
      trigger: 'blur',
    },
    {
      validator: checkRepetition,
      trigger: 'blur',
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur',
    },
    {
      trigger: 'blur',
      validator: validatorPassword
    }
  ],
  rePassword: [
    {
      required: true,
      message: 'Please input password again',
      trigger: 'blur',
    },
    {
      trigger: 'blur',
      validator: validatorRePassword
    }
  ],
  validate: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
          {
            validator: validatorCode,
            trigger: "blur",
          },
        ],
  fullName: [
    {
      required: true,
      validator: validatorFullName,
      trigger: "blur",
    }
  ],
  organization: [
    {
      required: true,
      message: 'Please input',
      trigger: 'change',
    },
  ],
  country: [
    {
      required: true,
      message: 'Please select',
      trigger: 'change',
    },
  ],
  status: [
    { required: true,
      message: 'Please select', 
      trigger: 'change' 
    },
  ],
  group: [
    { required: true,
      message: 'Please select', 
      trigger: 'change' 
    },
  ],
  defaultCategory: [
    { required: true,
      message: 'Please select', 
      trigger: 'change' 
    },
  ],
  homePage: [
    {
      message: 'Please input', 
      trigger: 'blur' 
    },
  ],
  emailVerifyCode:[
    {
      required: true,
      message: 'Please input', 
      trigger: 'blur' 
    }
  ],
  phone:[
    {
      message: 'Please input', 
      trigger: 'blur' 
    }
  ],
  school:[
    {
      required: true,
      message: 'Please input', 
      trigger: 'blur' 
    }
  ],
  gender: [
    { required: true,
      message: 'Please select', 
      trigger: 'change' 
    },
  ]

})

// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      prepareDataAndRegister();
      console.log('submit!')
    } else {
      ElMessage({
      message: '请按规则填写完整信息，点击Last step退回修改',
      type: 'warning',
  })
    }
  })
}

// 整理表单数据，并发送
function prepareDataAndRegister() {

  let registerInfo = {
    user: {
        code: ruleForm.username,
        gender: ruleForm.gender,
        name: ruleForm.fullName.first + " " + ruleForm.fullName.last + " " + ruleForm.fullName.suffix,
        email: ruleForm.email,
        password: ruleForm.password,
        organization: ruleForm.organization,
        country: ruleForm.country,
        careerStatus: ruleForm.status,
        subjectId: ruleForm.group,
        categoryId: ruleForm.defaultCategory.slice(-1)[0],
        homePage: ruleForm.homePage,
        phone: ruleForm.phone,
        school: ruleForm.school
    },
    verificationCode: ruleForm.emailVerifyCode
}
console.log(registerInfo)
// return;
userRegister(registerInfo).then((res) => {
  if(res.code === 200){
    centerDialogVisible.value = true;
  }else{
    ElMessage({
        message: res.message,
        type: 'warning',
      })
  }
})


}

// 注册成功去登录
import {useRouter} from "vue-router";
let router = useRouter();
function gotoLogin(){
  router.push({
    path:"/facade/login",
  })
}

// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`,
// }))


// 验证码
let identifyCode = ref('');
let identifyCodes = ref('1234567890');
 // 点击刷新，更新验证码
function refreshCode() {
      identifyCode.value = "";
      makeCode(identifyCodes.value, 4);
    }
    // 制作验证
function makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        identifyCode.value +=
          identifyCodes.value[randomNum(0, identifyCodes.value.length)];
      }
    }
    // 生成随机数
function randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

</script>
<style scoped>
.demo-ruleForm{
    background-color: rgb(251, 251, 250);
    padding: 3rem;
}
.step1-sty{
    width: 30rem;
}
.verify-code{
  display: flex;
  justify-content: left;
  align-items: center;
}
.code{
  margin-bottom: -0.9rem;
  margin-left:1rem;
}
.full-name{
  display:flex;
  justify-content: left;
  align-items: center;
}
.organization{
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
}
.text-annotation{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  text-align: left;
}
.select-v2{
  width:20rem;
}
</style>