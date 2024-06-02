<template>
    <div class="main-area">
        <div class="top-area">
            <div class="step-area">
                <div class="step-button">
                    <el-button type="primary" style="margin-top: 12px" @click="last" plain>Last step</el-button>
                </div>
                <div class="button-area">
                    <el-button type="primary" style="margin-top: 12px" @click="lastSubmitPaper" plain>提交</el-button>
                </div>
            </div>
            <div class="tip-area">
                <div class="tip-title">
                   <h3>Check your submission</h3> 
                </div>
                <div class="tip-content">
                    <p>1、Review the abstract data displayed on the page.Edit metadata as necessary</p>
                    <p>2、Check your primary category selection on "categories" and resolves any conflicts before processing...</p>
                    <p>3、View your article by clicking the button</p>
                    <p>4、Add secondary categories and...</p>
                </div>
            </div>
        </div>
        <el-divider />
        <div class="bottom-area">
            <div class="metadata-area">
            <div class="metadata-content">
                <h3><span>Title:</span>{{ paper.title }}</h3>
            </div>
            <div class="metadata-content">
                <h4><span>Authors:</span>{{ paper.authors }}</h4>
            </div>
            <div class="metadata-content">
                <p><span>Abstract:</span>{{ paper.abstracts }}</p>
            </div>
            <div v-if="paper.comments != null" class="metadata-content">
                <h4><span>Comments:</span>{{ paper.comments }}</h4>
            </div>
            <div v-if="paper.reportNumber != null" class="metadata-content">
                <h4><span>ReportNumber:</span>{{ paper.reportNumber }}</h4>
            </div>
            <div v-if="paper.journalReference != null" class="metadata-content">
                <h4><span>JournalReference:</span>{{ paper.journalReference }}</h4>
            </div>
            <div v-if="paper.doi != null" class="metadata-content">
                <h4><span>DOI:</span>{{ paper.doi }}</h4>
            </div>
            <div v-if="paper.acmClass != null" class="metadata-content">
                <h4><span>AcmClass:</span>{{ paper.acmClass }}</h4>
            </div>
            <div v-if="paper.mscClass != null" class="metadata-content">
                <h4><span>MscClass:</span>{{ paper.mscClass }}</h4>
            </div>
            <div class="metadata-content">
                <h4><span>License:</span>{{ license?.link }}</h4>
            </div>
            </div>
        </div>
        <el-divider />
        <div class="category-area">
            <div class="title-area">
                    <div class="title-bar">
                       <h3>Categories</h3> 
                    </div>
            </div>
            <div class="cate-choose">
                <div>
                    Primary：Robots
                </div>
                <div class="option">
                    <p>Cross lists(optional)</p>
                    <el-cascader :options="subjectCategoryList" v-model="categoryValue" :props="props" clearable />
                </div>
            </div>
        </div>
        <el-divider />
        <div class="view-area">
            <div class="title-area">
                <div class="title-bar">
                    <h3>View Files</h3> 
                </div>
            </div>
            <div class="view-item">
                <div class="view-detail">
                    <div>
                    SUCCESS: You can preview Your paper again
                    </div>
                    <div>
                    <el-button type="success" @click="boxShow = !boxShow" plain>View article</el-button>  
                    </div>
                    <div>
                      <transition name="animation" appear>  <!-- transition 为vue中的dom添加样式   appear 为初始的时候就加入动画, 就是刷新页面
                      transition 里面只能存在一个同级的根标签, -->
                        <div class="file-show" v-show="boxShow">
                          <template v-for="(item,i) in existFileList" v-bind:key="i">
                            <el-link type="primary" @click="btnClick(item.cid,item.name)">{{ item.name }}</el-link><br>
                          </template>
                        </div>
                      </transition>

                    </div>
                    </div> 
                </div>
               
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { getPaperBySUbmission,getLicense,submitPaper } from "@/api/paper/paper"
import { reactive, onMounted,ref} from 'vue';
import { useStore } from "vuex";
import {queryCurrentUser} from '@/api/user/user'
import { getSubjectCategory } from '@/api/subject/subject'
import { getFileBySubmission } from '@/api/paper/paper'
import { downloadFile } from '@/api/file/file'
import { ElMessage,ElMessageBox} from 'element-plus'
let store = useStore();
const router = useRouter()

const licenseId = ref()

const license = ref()

const submissionId = ref()

const subjectCategoryList = ref([]);

const categoryValue = ref()

const boxShow = ref(false)

const existFileList = ref([])

onMounted(() => {
  let submission = store.getters['submission/getSubmissionInfo']
  licenseId.value = submission.licenseId
  submissionId.value = submission.id
  console.log(licenseId.value)
  queryPaper()
  getLicenseInfo()
  getUserInfo()
  queryExistFile()
  // if(JSON.parse(localStorage.getItem('paper')) != null){
  //   paper = JSON.parse(localStorage.getItem('paper'))
  // }
  
})


const paper = reactive({
            id: null,
            subjectId: null,
            licenseId: null,
            submissionId: null,
            categoryId: null,
            title: null,
            abstracts: null,
            identifier: null,
            authors: null,
            comments: null,
            acmClass: null,
            mscClass: null,
            reportNumber: null,
            journalReference: null,
            doi: null,
            hash: null,
            version: null,
            usingVersion: null,
            samePaperIdentifier: null,
            auditStatus: null,
            remark: null,
})

// 查询证书信息
function getLicenseInfo(){
  getLicense({ id: licenseId.value }).then((res) => {
    console.log(res.data)
    if(res.code == 200){
      console.log(res.data)
      license.value = res.data;
    }
  })
}

// 查询论文
function queryPaper(){
    if(submissionId.value == null || submissionId.value == undefined){
        return;
    }
    getPaperBySUbmission({submissionId: submissionId.value}).then((res) => {
        console.log(res)
        if(res.code == 200){
            paper.id = res.data.id
            paper.title = res.data.title
            paper.authors = res.data.authors
            paper.abstracts = res.data.abstracts
            paper.comments = res.data.comments
            paper.reportNumber = res.data.reportNumber
            paper.journalReference = res.data.journalReference
            paper.doi = res.data.doi
            paper.acmClass = res.data.acmClass
            paper.mscClass = res.data.mscClass
        }
    })
}


// 获取用户完整信息
function getUserInfo(){
  queryCurrentUser().then((res) => {
        getSubjectCategoryInfo(res.data.subjectId);
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


// 查询已存在的文件
function queryExistFile(){
    console.log(submissionId.value)
    getFileBySubmission({submissionId: submissionId.value}).then((res) => {
        if(res.code == 200){
          existFileList.value = res.data  
        } 
        console.log('结束')
    })
}


function btnClick(cid,fileName){ 
    downloadFile({cid: cid}).then((res)=>{
        // fileDownload(res, 'xxx.pdf'

        let blob = new Blob([res]
        , {
            type: res['type'],
        }
    ); // 获取请求返回的response对象中的blob 设置文件类型

    let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    // a.click();
    window.open(url);
    window.URL.revokeObjectURL(url); //释放blob对象
        



     })
}

function lastSubmitPaper(){
  submitPaper({
    submissionId: submissionId.value,
    categoryValue: categoryValue.value?.toString()
  }).then((res) => {
    if(res.code == 200){

      ElMessageBox.alert('提交成功！返回主页', '提示', {
        // if you want to disable its autofocus
       // autofocus: false,
        confirmButtonText: 'OK',
        callback: () => {
          // 清除缓存数据
          store.dispatch('index/resetAllData')
          localStorage.removeItem('secondReturnInfo')
          router.replace({
            path:"/user/home",
          })
        },
      })

    }else{
      ElMessage({
        type: 'error',
        message: '提交失败！',
      })
    }
  })
}



function last(){
    router.push({
        path:"/submission/fourth",
    })
}



</script>
<style scoped>
.main-area{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* background-color: rgb(255, 115, 0); */
}
.step-area{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    /* background-color: rgb(0, 174, 255);  */
}
.step-button{
    padding-bottom : 10px;
    /* background-color: green; */
}
.top-area{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    width:100%;
    /* background-color: rgb(255, 0, 195); */
}
.tip-area{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: left;
    width: 100%;
    text-align: left;
    /* background-color: rgb(0, 195, 255); */
}
/* .tip-title{

} */
/* .tip-content{ */
    /* background-color: red; */
/* } */
.metadata-area{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: left;
    text-align: left;
    width: 100%;
    /* background-color: rgb(0, 255, 42); */
}
.metadata-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    border-bottom: 1px solid rgb(101, 99, 99);
    border-radius: 2px;
    margin-top: 2px;
}
.bottom-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.category-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 100%;
    /* background-color: rgb(0, 255, 195); */
}
.title-area{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;
    /* background-color: rgb(187, 194, 197);  */
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
.cate-choose{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
    margin-top: 10px;
    /* background-color: rgb(76, 0, 255); */
}
/* .option{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
} */
.view-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 100%;
}
.view-item{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    margin-top: 10px;
    /* background-color: rgb(152, 242, 165); */
}
.view-detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    align-items: left;
    border: 2px solid rgb(23, 139, 23);
    border-radius: 5px;
    background-color: rgb(222, 249, 222);
    padding: 20px;
    width: 100%;
}


/* .box{
    height:200px;width: 200px;
    background-color:black;
}
.draw-enter-active, .draw-leave-active {
    transition: all 1s ease;
}
.draw-enter, .draw-leave-to {
    height: 0;
} */




.animation-enter-active{
            animation: aaa 1.5s;
        } /* 动画样式 animation 为名字(自己随便定义), 后面的enter-active 和 leave-active 分别代表进场和出场 Vue 会自动识别 */
        .animation-leave-active{
            animation: aaa 1.5s reverse;
        }
        @keyframes aaa{
            0% {
                opacity: 0;
                transform: translateY(100%);
            }
            100% {
                opacity: 1;
                transform: translateY(0%);
            }
        }

/* .file-show{
  background-color: blue;
} */


</style>