<template>
    <div>
        <div class="verify-info-box">
            <div class="step-btn">
                <div class="title-area">
                    <div class="title-bar">
                      <h3>Verify Your Contact Information</h3>  
                    </div>
                </div>
                <div>
                    <!-- <div>
                        <el-button style="margin-top: 12px" @click="last">Last step</el-button>
                    </div> -->
                    <div>
                        <el-button type="primary" style="margin-top: 12px" @click="next" plain>Next step</el-button>
                    </div>       
                </div>
            </div>
            
                 <div class="userInfo-area">
            <div>
                <div class="userInfo-area-left">
                    <el-descriptions
                        class="description-form"
                        title="Verify Your Contact Information"
                        :column="1"
                        :size="size"
                        border
                    >
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <user />
                                    </el-icon>
                                    Username
                                 </div>
                            </template>
                                    {{ userInfo?.code }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <IceCreamSquare />
                                    </el-icon>
                                    Full-name
                                    </div>
                            </template>
                                    {{ userInfo?.name }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <ChatLineSquare />
                                    </el-icon>
                                    Email
                                </div>
                            </template>
                                     {{ userInfo?.email }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                 <div class="cell-item">
                                     <el-icon :style="iconStyle">
                                      <office-building />
                                   </el-icon>
                                        {{ userInfo?.school }}
                                </div>
                            </template>
                                <el-tag size="small">厦门理工</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                         <Avatar />
                                     </el-icon>
                                     Affiliation
                                </div>
                            </template>
                            {{ userInfo?.organization }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <div>
                        <el-checkbox v-model="certify" label="I certify that the above information is correct." size="large" />
                    </div>
                </div>
                    
            </div>
            
            <div>
                <el-card class="box-card">
                    <h4>
                        ! We must have current contact information, especially your email address. Verify your name and institutional affiliation; make sure that we've segmented your first and last names correctly and that any accented characters are properly represented. Return to the registration form to update your information. If your e-mail address {{ userInfo?.email }} is no longer valid, then you must change your E-mail address BEFORE proceeding.
                    </h4>
                </el-card>
            </div>

        </div>
        </div>

        <el-divider />
        
        <div class="agree-area">
            <div class="title-area">
                <div class="title-bar">
                     <h3>Submission Agreement</h3>   
                </div>
            </div>
            <div>
                <div>
                <p>Read and agree to the full Instructions for Submission (opens in a new tab) before proceeding</p>
                    <el-checkbox v-model="agree1"  :label="city"><b> I have read and agree to the Instructions for Submission</b></el-checkbox>
            </div>
            <div>
                <p>Read and accept the Submission Terms and Agreement (opens a new window) before proceeding</p>
                <el-checkbox v-model="agree2" :label="city"><b> By submitting to arXiv I have read and accept the Submission Terms and Agreement</b></el-checkbox>
                <p>If you are under 18 years of age: Please ask an older co-author to submit the work. If that is not possible you must complete the arXiv parent/guardian consent form before proceeding.</p>
            </div>
            </div>
            
        </div>

        <el-divider />

        <div class="author-area">
            <div class="title-area">
                <div class="title-bar">
                    <h3>Authorship</h3>  
                </div>
            </div>
            <el-radio-group v-model="authorshipRadio" class="ml-4">
                <div class="author-radio">
                     <el-radio :label="1" size="large"><b>I am submitting as an author of this article</b> </el-radio><br>
                <el-radio :label="2" size="large"><b>I am not an author but have obtained pre-authorization from arXiv to submit as a third-party submitter</b></el-radio>
                </div>
               
             </el-radio-group>
        </div>

        <el-divider />

        <div class="license-area">
            <div class="title-area">
                    <div class="title-bar">
                      <h3>License Statement</h3>   
                    </div>
            </div>
            <div>
                 <div>
                <p>All articles and source files posted on arXiv.org can be viewed and downloaded by anyone.</p>
                <p>Please select the license you would like to use to make your content available. Your chosen license is irrevocable. For all licenses here, except CC Zero, the original copyright holder retains ownership after posting on arXiv.</p>
                <p>arXiv encourages open access and a liberal license for re-use of the paper. However, each situation is unique. Funders may require specific licenses. Journals have different policies regarding preprints, accepted manuscripts, embargo periods, and post-publication distribution. Please note that different versions of the work can have different licenses.</p>
            </div>
            <div>
                <p>It is the submitter’s responsibility to choose the appropriate license for their content and ensure that they have the right to submit the content. Need help? See License Information.</p>
                <div>
                    <el-radio-group v-model="licenseRadio" class="ml-4">
                         <div class="author-radio">
                          <div class="subject-item" v-for="(license,i) in licenseInfo" v-bind:key="i">
                            <el-radio :value="license.id" :label="i" size="large"><el-link type="primary"><b>{{ license.code }}</b></el-link> </el-radio>
                          </div>
                            <!-- <el-radio :value="ee" label="1" size="large"><el-link type="primary"><b>CC BY: Creative Commons Attribution </b></el-link> </el-radio><br>
                            <el-radio label="2" size="large"><el-link type="primary"><b>CC BY-SA: Creative Commons Attribution-ShareAlike </b></el-link> </el-radio>
                            <el-radio label="3" size="large"><el-link type="primary"><b>CC BY-NC-SA: Creative Commons Attribution-Noncommercial-ShareAlike </b></el-link> </el-radio>
                            <el-radio label="4" size="large"><el-link type="primary"><b>CC BY-NC-ND: Creative Commons Attribution-NonCommercial-NoDerivatives </b></el-link> </el-radio>
                            <el-radio label="5" size="large"><el-link type="primary"><b>arXiv.org perpetual, non-exclusive license </b></el-link> </el-radio>
                            <el-radio label="6" size="large"><el-link type="primary"><b>CC Zero: No Rights Reserved  </b></el-link> </el-radio> -->
                        </div>
                    </el-radio-group>
                </div>
            </div>
            </div>
           
        </div>

        <el-divider />

        <div class="subject-area">
            <div class="title-area">
                    <div class="title-bar">
                        <h3>Archive and Subject Class</h3>   
                    </div>
            </div>
            <div>
                <div>
                    <p>Please read the category descriptions carefully to ensure you select the best-fitting category for your submission. Failure to do so may significantly delay the listing of your submission, and creates additional work for our volunteer moderators.</p>
                    <p>lijinchao#1 has registered as author to the groups: cs</p>
                    <p>If your desired submission archive does not appear below, or you wish to change any defaults, return to your registration form and make any necessary changes.</p>
                </div>
                <div>
                    <p>Choose a primary classification for this submission:</p>
                    <div>

                        <el-cascader v-model="value" :options="subjectCategoryList" clearable />

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref,onMounted,computed } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import {queryCurrentUser} from '@/api/user/user'
import {getLicense,firstStep,getSubmissionInfo} from '@/api/paper/paper'
import { getSubjectCategory } from '@/api/subject/subject'
import { ElMessage, ElMessageBox } from 'element-plus'
import {encrypt,decrypt} from '@/utils/secret'
import {sendEmail} from '@/api/email/email'
const router = useRouter()
const route = useRoute()
import { useStore } from "vuex";
let store = useStore();
// const radio = ref(3)
import {
  IceCreamSquare,
  ChatLineSquare,
  OfficeBuilding,
  Avatar,
  User,
} from '@element-plus/icons-vue'



// 单选框参数
const authorshipRadio = ref()

const licenseRadio = ref()

const value = ref([])

const agree1 = ref()

const agree2 = ref()

const certify = ref();

const submissionId = ref()

let code = ref('')

const categoryValue = computed(() => {
      return value.value.toString().substr(-1);
    })

let userInfo = ref();

let licenseInfo = ref([]);

let subjectCategoryList = ref([]);

onMounted(() => {
  // 清除第二步的缓存数据
    store.dispatch('index/resetAllData')
    localStorage.removeItem('secondReturnInfo')
    getUserInfo();
    getLicenseInfo();

    if(route.query.new == 'new'){
      return;
    }

    // 如果是新建一个submission路由里面就不会携带参数，如果是某个已经存在的submission跳转过来，就会携带submissionId
    if(route.query.submissionId == undefined || route.query.submissionId == null){
      submissionId.value = store.getters['submission/getSubmissionInfo'].id
    }else{
      submissionId.value = route.query.submissionId
    }
    querySubmissionInfo()
})


// 下一步
function next(){

  // console.log(authorshipRadio.value)
  // console.log(licenseRadio.value)
  // console.log(agree1.value)
  // console.log(agree2.value)
  // console.log(certify.value)
  // console.log(value.value)

  if(authorshipRadio.value == undefined || licenseRadio.value == undefined ||
    agree1.value == undefined || agree2.value == undefined || certify.value == undefined ||
    value.value == undefined || value.value.length == 0){
      ElMessage({
          type: 'warning',
          message: '请填写完整',
        })
    return;
  }

  
  checkGuarantee();
}

// 发送请求，检验是否有担保，如果有就创建一条submission
function checkGuarantee(){
  firstStep({
    id: submissionId.value,
    certifyInformation: 1,
    agreement: 1,
    authorship: authorshipRadio.value == 1 ? "Myself" : "Third-party",
    licenseId: licenseRadio.value,
    categoryValue: value.value.toString()
}).then((res) => {
    if(res.code == 101){
      sendGuaranteeEmail();
    }else{
      if(res.code == 200){
        store.dispatch('submission/setSubmissionId',res.data.id)
        store.dispatch('submission/setLicenseId',res.data.licenseId)
        router.push({
          path:"/submission/second",
          // query: {token: res.data}
        })
      }else{
        ElMessage({
          type: 'error',
          message: '服务器忙',
        })
      }
      
    }
  })
}

// 如果此前已经有提交就查询提交信息并填充
function querySubmissionInfo(){
  if(submissionId.value == undefined || submissionId.value == null){
    return;
  }
  console.log(submissionId.value)
  getSubmissionInfo({submissionId: submissionId.value}).then((res) => {
    if(res.code == 200){
      console.log(res)
      certify.value = true;
      agree1.value = true;
      agree2.value = true;
      // authorshipRadio.value = res.data.authorship == "Myself" ? 1 : 2;
      licenseRadio.value = res.data.licenseId;
      if(res.data.authorship == 'Myself'){
        authorshipRadio.value = 1;
      }else{
        authorshipRadio.value = 2;
      }

     let stringArray  = res.data.categoryValue.split(',');
      // 将字符串数组转换为数字数组
    stringArray.forEach(item => {
      value.value.push(parseInt(item));
    });

    }
  })
}


// 获取用户完整信息
function getUserInfo(){
  queryCurrentUser().then((res) => {
        userInfo.value = res.data;
        getSubjectCategoryInfo(userInfo.value.subjectId);
    })
}

// 获取许可证书
function getLicenseInfo(){
  getLicense().then((res) => {
    licenseInfo.value = res.data;
    console.log(res);
  })
}

function getSubjectCategoryInfo(subject){
  getSubjectCategory({
    subjectId: subject
  }).then((res) => {
    subjectCategoryList.value = []
    let categoryList = res.data[0].categoryList;
      let item = transformSubjectToOptions(categoryList,res.data[0]?.id,res.data[0]?.name);
    let options = {
      value: res.data[0]?.id,
      label: res.data[0]?.name,
      children: item
    }
    subjectCategoryList.value.push(options);
  })
}

function transformSubjectToOptions(subjectCategory,id,name){
  if (typeof subjectCategory != "undefined"  
      && subjectCategory != null  
      && subjectCategory.length != null  
      && subjectCategory.length > 0){
        let arr = [];
      
        for(let i = 0;i < subjectCategory.length;i++){
          let obj = transformSubjectToOptions(subjectCategory[i]?.children,subjectCategory[i]?.id,subjectCategory[i]?.name);
          // console.log(subjectCategory[i]?.name);
          // console.log(obj);
          if(obj.length > 0){
            let item = {
              value: subjectCategory[i]?.id,
              label: subjectCategory[i]?.name,
              children:obj
            };
            arr.push(item)
          }else{
            let item = {
              value: subjectCategory[i]?.id,
              label: subjectCategory[i]?.name
            };
            arr.push(item);
          }
        }
        // item.children = arr;
        return arr;
    }else{
      return [];
    }
}

// function handleChange(){
//   alert(authorshipRadio.value);
// }

function sendGuaranteeEmail() {
  ElMessageBox.confirm(
    '您需要有一个有资历的人帮您背书之后才能继续提交！点击发送，我们会给您发送一封背书邮件。',
    'Warning',
    {
      confirmButtonText: '发送',
      cancelButtonText: '关闭',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      code.value = Math.random().toString(36).slice(-6);
      console.log(code.value)
      console.log("设置")
      let str = encrypt(userInfo.value?.id + ":" + value.value + ":" + code.value.toUpperCase())
      console.log("设置")
      console.log(userInfo.value?.id)
      // let guaranteeEmailContent = "<!DOCTYPE html><HTML><HEAD><META  charset=\" gbk\"><TITLE>"+emailTitle+"</TITLE></HEAD><BODY>("+userInfo.name+" should forward this email to someone who's registered as an endorser for the cs.ET (Emerging Technologies) subject class of arXiv.)"+ userInfo.name+" requests your endorsement to submit an article to thecs.ET section of arXiv. To tell us that you would (or would not) like to endorse this person, please visit the following URL:http://localhost:8080/facade/endorsement?x="+str+ "and enter the following six-digit alphanumeric string:Endorsement Code: " + code.value+ "<img src=\"https://pic4.zhimg.com/v2-1b1ea64759584f6b9d90f0bfa32cb5af_r.jpg\" width=\"900\" height=\"600\" /></BODY></HTML>"
                // console.log(str)
      
      let emailContent   = "http://43.139.8.186:8860/facade/endorsement?x=" + str + "    Endorsement Code:" + code.value.toUpperCase()
                
      sendEmail({
        email: userInfo.value?.email,
        emailContent: emailContent,
        emailSubject: '背书邮件'
      }).then((res) => {
        ElMessage({
        type: 'success',
        message: '已发送邮件',
      })
      })
      console.log("设置")
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消发送',
      })
    })
}



</script>
<style lang="scss" scoped>
.cell-item {
  display: flex;
  align-items: center;
}
.description-form {
  margin-top: 20px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  text-align: left;
}

.userInfo-area{
    display: flex;
    justify-content: left;
    align-items: center;
    .userInfo-area-left{
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: left;
        text-align: left;
    }
}

.verify-info-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;

}
.verify-info-box-title{
        background-color: red;
        height: 2rem;
        // width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
.title-area{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;
    // background-color: rgb(187, 194, 197); 
}
.title-bar{
    background-color: red;
    height: 2rem;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.agree-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
}

.author-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
}
.author-radio{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
}

.license-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
}


.subject-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
}

/* 上方的下一步和上一步 */
.step-btn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

</style>