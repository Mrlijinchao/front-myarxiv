<template>
    <div class="user-box">
        <div style="margin-left: -5rem;">
            <h3>用户名：{{ user?.code }}</h3>
        </div>
        <!-- <div>
            <img class="img-style" src="../../../../public/img/icons/apple-touch-icon-120x120.png" />
        </div> -->


        <div>

            <el-popover
                :width="100"
                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
                >
                <template #reference>
                    <!-- <el-avatar src="../../../../public/img/icons/apple-touch-icon-120x120.png" /> -->
                    <img @mouseover="" class="img-style" src="../../../../public/images/OIP-C.jpg" />
                </template>
                <template #default>
                    <div class="setting-sty">
                        <!-- <el-button type="primary" plain>修改信息</el-button>
                        <el-button type="primary" style="margin-left: -0.1rem;" plain>修改密码</el-button>
                        <el-button type="primary" style="margin-left: -0.1rem;"  plain>推出登录</el-button> -->
                        <div class="setting-item" @click="drawer = true">
                            <el-link>修改信息</el-link> 
                        </div>
                        <el-divider />
                        <div class="setting-item" @click="passwordDialogVisible = true">
                            <el-link>修改密码</el-link>
                        </div>
                        <el-divider />
                        <div class="setting-item" @click="emailDialogVisible = true">
                            <el-link>修改邮箱</el-link>
                        </div>
                        <el-divider />
                        <div class="setting-item" @click="logoutDialogVisible = true">   
                            <el-link>退出登录</el-link>
                        </div>
                    </div>
                </template>
            </el-popover>

        </div>

        <div>
            <!-- 修改信息弹出框 -->
            <el-drawer v-model="drawer" title="修改用户信息" size="50%">
                <div>
                        <el-form
                            ref="ruleFormRef"
                            :model="ruleForm"
                            :rules="rules"
                            label-width="120px"
                            class="demo-ruleForm"
                            :size="formSize"
                            status-icon
                        >
                    
                            <el-form-item label="Full-name" prop="name">
                                <div class="full-name">
                                    <el-input size="large" v-model="ruleForm.name" placeholder="your name"/>
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
                                >
                                    <el-option label="Unaffiliated" value="Unaffiliated" />
                                    <el-option label="Independent Researcher" value="Independent Researcher" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Country" prop="country">
                                <el-select-v2
                                    v-model="ruleForm.country"
                                    :options="countryList"
                                    size="large"
                                />
                            </el-form-item>
                            <el-form-item label="Status" prop="careerStatus">
                                <el-select-v2
                                    v-model="ruleForm.careerStatus"
                                    :options="careerStatusList"
                                    size="large"
                                />
                            </el-form-item>
                            <el-form-item label="Group" prop="subjectId">
                                <el-radio-group v-model="ruleForm.subjectId">
                                    <el-radio v-for="(item,i) in subjectList" v-bind:key="i" :label="item.value" name="type" @change="getCategoryTree(item.value)">
                                    {{  item.label }}
                                    </el-radio>
        <!-- <el-radio label="Promotion activities" name="type" />
        <el-radio label="Offline activities" name="type" />
        <el-radio label="Simple brand exposure" name="type" /> -->
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="DefaultCategory" prop="categoryValue">
                                <!-- <el-select-v2
                                    class="select-v2"
                                    v-model="ruleForm.categoryValue"
                                    :options="categoryTree"
                                    size="large"
                                /> -->
                                <!-- <el-cascader @change="show()" v-model="ruleForm.categoryValue" :options="categoryTree" clearable /> -->
                                <el-cascader 
                                    v-model="ruleForm.categoryValue" 
                                    :options="categoryTree" 
                                    clearable
                                    :show-all-levels="false"/>
                                    <!-- <el-cascader v-model="ruleForm.categoryValue" :options="categoryTree" clearable /> -->
                                </el-form-item>
                            <el-form-item label="homePage" prop="homePage">
                                <el-input v-model="ruleForm.homePage" size="large" class="step1-sty"  placeholder="Please input your homePage URL"/>
                            </el-form-item>
                            <el-button style="margin-top: 12px" type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
                        </el-form>
                    </div>
                </el-drawer>

            <!-- 修改密码弹出框 -->
            <el-dialog v-model="passwordDialogVisible" title="修改用户密码" width="30%" center>
                <el-form
                    ref="passwordRuleFormRef"
                    :model="passwordForm"
                    :rules="passwordRules"
                    label-width="120px"
                    :size="formSize"
                    status-icon
                    class="dialog-box"
                >
                <el-form-item class="dialog-box-item" label="原密码" prop="oldPassword">
                    <el-input
                        v-model="passwordForm.oldPassword"
                        type="password"
                        placeholder="Please input old password"
                        show-password
                    />
                </el-form-item>
                    
                    <el-form-item class="dialog-box-item" label="新密码" prop="newPassword">
                        <el-input
                        class="input-bar"
                        v-model="passwordForm.newPassword"
                        type="password"
                        placeholder="Please input new password"
                        show-password
                    />
                    </el-form-item>
                    
                    <el-form-item class="dialog-box-item" label="新密码*" prop="newPasswordAgain">
                        <el-input
                        class="input-bar"
                        v-model="passwordForm.newPasswordAgain"
                        type="password"
                        placeholder="Please input new password again"
                        show-password
                    />
                    </el-form-item>
                    
                </el-form>
                
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="passwordDialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="passwordSubmitForm(passwordRuleFormRef)">
                            Submit
                        </el-button>
                    </span>
                </template>
            </el-dialog>

             <!-- 修改邮箱弹出框 -->
             <el-dialog v-model="emailDialogVisible" title="修改邮箱号" width="30%" center>
                <el-form
                    ref="emailRuleFormRef"
                    :model="emailForm"
                    :rules="emailRules"
                    label-width="120px"
                    :size="formSize"
                    status-icon
                    class="dialog-box"
                >
                    <el-form-item class="dialog-box-item" label="原邮箱号" prop="oldEmail">
                        <el-input
                            class="input-bar"
                            v-model="user.email"
                            placeholder="Please input new email"
                            disabled
                        />
                    </el-form-item>
                    <el-form-item class="dialog-box-item" label="新邮箱号" prop="newEmail">
                        <el-input
                            class="input-bar"
                            v-model="emailForm.newEmail"
                            placeholder="Please input new email"
                        />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="emailDialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="emailSubmitForm(emailRuleFormRef)">
                            Submit
                        </el-button>
                    </span>
                </template>
            </el-dialog>

            <!-- 退出登录弹出框 -->
            <el-dialog v-model="logoutDialogVisible" width="20%" center>
                <span>您确认退出登录吗？</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="logoutDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="logout()">
                            确认
                        </el-button>
                    </span>
                </template>
            </el-dialog>


        </div>

    </div>
</template>
<script setup>
import { ref, onMounted,watch,computed,reactive } from 'vue';
import {queryCompletionUser,userLogout,modifyUserInfo,modifyUserPassword} from '@/api/user/user'
import {useRouter} from "vue-router";
import { ElMessage } from 'element-plus'
import { useStore } from "vuex";
import {getSubjectCategory, getAttribute, queryCategoryValue } from '@/api/subject/subject'
let store = useStore();
let router = useRouter();

const drawer = ref(false)
const passwordDialogVisible = ref(false)
const emailDialogVisible = ref(false)
const logoutDialogVisible = ref(false)

const user = ref()
const careerStatusList = ref()
const countryList = ref()
let subjectList = ref([]);
let categoryTree = ref([]);
let subjectMap = ref({})



onMounted(() => {
    // user.value = JSON.parse(localStorage.getItem('user'))
    // getUserInfo()
    getRegisterNeededInfo()
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
  // 获取用户信息
  getUserInfo()
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





// // 从vuex里面获取用户姓名
// const getUserName = computed(()=>{
// 	//返回的是ref对象
// 	return store.state.user.user.userName;
// })



// 全名校验
const validatorFullName = (rule, value, callback) => {
  if(value.first === '' || value.last === '' || value.suffix === ''){
    callback(new Error("Please input FullName"));
  }else{
      callback();
  }
}

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
  name: null,
  organization: null,
  country: null ,
  careerStatus: null ,
  subjectId: null,
  categoryValue: [] ,
  homePage: null,
})

function getUserInfo(){
    queryCompletionUser().then((res) => {
        user.value = res.data;

        console.log(res.data)

        ruleForm.name = res.data.name
        ruleForm.organization = res.data.organization
        ruleForm.country = res.data.country
        ruleForm.careerStatus = res.data.careerStatus
        ruleForm.subjectId = res.data.subjectId
        // ruleForm.categoryValue = res.data.categoryValue
        ruleForm.homePage = res.data.homePage
        // 根据用户subjectId生成category树
        getCategoryTree(res.data.subjectId)
        getCategoryValue(res.data.categoryId)
    })
}

function getCategoryValue(id){
    queryCategoryValue({categoryId: id}).then((res) => {
        if(res.code == 200){
            let stringArray  = res.data.substr(2).split(',');
      // 将字符串数组转换为数字数组
            stringArray.forEach(item => {
                ruleForm.categoryValue.push(parseInt(item));
            });
        }
        
    })
}

const rules = reactive({
  name: [
    {
      required: true,
      message: 'Please input unique username',
      trigger: 'blur',
    },
    // {
    //   validator: checkRepetition,
    //   trigger: 'blur',
    // }
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
    { 
      required: true,
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
    {
        required: true,
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

})

// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
    //   prepareDataAndRegister();
    changeUserInfo()
      console.log('submit!')
    } else {
      ElMessage({
      message: '请按规则填写完整信息，点击Last step退回修改',
      type: 'warning',
  })
    }
  })
}






// 修改用户信息
function changeUserInfo() {

    user.value.careerStatus = ruleForm.careerStatus
    user.value.subjectId = ruleForm.subjectId
    user.value.homePage = ruleForm.homePage
    user.value.categoryId = ruleForm.categoryValue.slice(-1)[0]

    console.log(user.value)

    modifyUserInfo(user.value).then((res) => {
        if(res.code === 200){
            ElMessage({
                message: '修改用户信息成功！',
                type: 'success',
            })
            let refreshCode = store.getters['user/getRefreshCode']
            store.dispatch('user/changeRefresh',!refreshCode)
        }else{
            ElMessage({
                message: '修改用户信息失败！',
                type: 'warning',
            })
        }
    })

}


// 修改密码表单

// 判断密码是否一致
const validatorRePassword = (rule, value, callback) => {
  if(value != passwordForm.newPassword){
    callback(new Error("密码不一致！"));
  }else{
    callback();
  }

}

const passwordRuleFormRef = ref()
const passwordForm = reactive({
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: ''
})

const passwordRules = reactive({
    oldPassword: [
        {
            required: true,
            message: 'Please input',
            trigger: 'blur',
        },
    ],
    newPassword: [
        {
            required: true,
            message: 'Please input',
            trigger: 'blur',
        },
    ],
    newPasswordAgain: [
        {
            required: true,
            message: 'Please input',
            trigger: 'blur',
        },{
            trigger: 'change',
            validator: validatorRePassword
        }
    ],
})


// 提交表单
const passwordSubmitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
    modifyUserPassword({
        userId: user.value.id,
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
    }).then((res) => {
        if(res.code=== 200){
            ElMessage({
                message: res.data,
                type: 'success',
            })
            passwordForm.oldPassword = '';
            passwordForm.newPassword = '';
            passwordForm.newPasswordAgain = '';
            let refreshCode = store.getters['user/getRefreshCode']
            store.dispatch('user/changeRefresh',!refreshCode)
        }else{
            ElMessage({
                message: res.message,
                type: 'warning',
            })
        }
    })
    passwordDialogVisible.value = false
      console.log('submit!')
    } else {
      ElMessage({
      message: '请按规则填写完整信息',
      type: 'warning',
        })
    }
  })
}

// // 修改邮箱表单

// 判断新旧邮箱号是否一致
const validatorEmail = (rule, value, callback) => {
  if(value === user.value.userEmail){
    callback(new Error("新邮箱号与旧邮箱号相同，没必要修改！"));
  }else{
    callback();
  }

}

const emailRuleFormRef = ref()
const emailForm = reactive({
    oldEmail: '',
    newEmail: '',
})

const emailRules = reactive({
    newEmail: [
        {
            required: true,
            message: 'Please input',
            trigger: 'blur',
        },
        {
            trigger: 'change',
            validator: validatorEmail
        }
    ],
})


// 提交表单
const emailSubmitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
        user.value.email = emailForm.newEmail
        modifyUserInfo(user.value).then((res) => {
            if(res.code === 200){
            ElMessage({
                message: '修改邮箱号成功！',
                type: 'success',
            })
            let refreshCode = store.getters['user/getRefreshCode']
            store.dispatch('user/changeRefresh',!refreshCode)
            }else{
            ElMessage({
                message: '修改邮箱号失败！',
                type: 'warning',
            })
            }
        })
        console.log('submit!')
        emailDialogVisible.value = false
    } else {
      ElMessage({
      message: '请按规则填写完整信息',
      type: 'warning',
  })
    }
  })
}


// 退出登录
function logout(){
    userLogout().then((res) => {
        if(res.code === 200){
            ElMessage({
                message: '已退出登录',
                type: 'success',
            })
            clearCache();
        }else{
            ElMessage({
                message: '退出登录失败',
                type: 'warning',
            })
        }
    })
}

// 清空路由和缓存回到首页
function clearCache(){
    store.dispatch('resetAllData')
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userId")
    localStorage.removeItem('user');
    localStorage.removeItem('secondReturnInfo')
    router.push({ path: '/' });
}

</script>
    <style scoped>
    /* 顶栏样式 */
    /* .hearerBar{
        display: flex;
        justify-content: space-around;
        align-items:center;
        height: 100%;
        width: 100%;
        background-color: blue;
    } */
    .el-row {
      margin-bottom: 20px;
      height: 100%;
      
    }
    .el-row:last-child {
      margin-bottom: 0;
    }
    .el-col {
      border-radius: 1px;
      background-color: red;
    }
    
    .el-col-text{
        display: flex; 
        justify-content: center;
        align-items:center;
    }
    
    
    /* logo */
    .logo{
        height: 5rem;
        width: 10rem;
    }
    .logo-col{
        display: flex;
        justify-content: left;
        align-items:center;
    }
    .function-bar{
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .function-item{
        height: 100%;
        width: 7rem;
        margin-left: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .active{
        background-color: rgb(236, 117, 81);
    }

    .image-header{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .img-style{
        border-radius: 50%;
        height: 4rem;
    }

    .setting-sty{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* gap: 1rem; */
    }



/* 表单 */
    .demo-ruleForm{
    background-color: white;
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



.dialog-box{
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.dialog-box-item{
    background-color: white;
    width: 90%;
    padding-right: 20%;
}

.user-box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

</style>
