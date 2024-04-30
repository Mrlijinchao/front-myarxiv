<template>
    <div class="search-box">
        <div class="search-handle">
            <div>
                <h2 v-if="inputData == undefined || inputData == null || inputData == ''">Search</h2>
                <template v-if="inputData != undefined && inputData != null && inputData != ''">
                    <h2>Showing {{1 }}–{{ (requestParam.pageNum * requestParam.pageSize) > pageTotal ? pageTotal : (requestParam.pageNum * requestParam.pageSize) }} of {{ pageTotal }} results for {{ selectedValue }}: {{ inputData }}</h2>
                </template>
            </div>
            <template v-if="subjectName != undefined && subjectName != null">
               <p>Searching in archive {{ subjectName }}. <el-link type="primary">Search in all archives.</el-link></p> 
            </template>
            <div style="margin-top: 1rem;">
                <el-input
            v-model="inputData"
            placeholder="Please input"
            class="input-with-select"
            size="large"
            autofocus
            clearable
            >
            <template #prepend>
                <el-select v-model="selectedValue" placeholder="Select"  class="select-bar" size="large">
                    <el-option label="All Fields" value="allFields" />
                    <el-option label="Title" value="title" />
                    <el-option label="Abstract" value="abstract" />
                    <el-option label="Comments" value="comments" />
                    <el-option label="Journal reference" value="journal" />
                    <el-option label="ACM classification" value="acm" />
                    <el-option label="MSC classification" value="msc" />
                    <el-option label="Report number" value="report" />
                    <el-option label="MyArxiv identifier" value="identifier" />
                    <el-option label="DOI" value="doi" />
                    <!-- <el-option label="ORCID" value="orcid" /> -->
                    <el-option label="Author" value="author" />
                    <el-option label="Full text" value="fullText" />
                </el-select>
            </template>
                <template #append>
                    <!-- <el-button @click="search()" type="primary" style="background-color: rgb(78, 156, 240);" size="large" :icon="Search" /> -->
                    <el-button @click="getPaperByPage()" type="primary" style="background-color: rgb(78, 156, 240);color: aliceblue;" size="large" :icon="Search">Search</el-button>
                </template>
            </el-input>
            </div>
            <div style="margin-top: 1rem;">
                <el-radio-group v-model="abstractShow">
                    <el-radio :label="true" size="large" border>Show abstracts</el-radio>
                    <el-radio :label="false" size="large" border>Hide abstracts</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="search-content">

            <div v-if="isShow" class="paper-list-sty">
            <div class="top-area">
               <PaginationBar :total="pageTotal" @page="getPageInfo"></PaginationBar>
               <div>
                <DataPicker @transmitDate="getDate"></DataPicker> 
               </div>
                
            </div>
            <div>
                <template v-for="(item,i) in paperList" v-bind:key="i">
                  <PaperBox @leave="gotoSomewhere" :abstractShow="abstractShow" :paper="item" :num="i+1"></PaperBox>  
                </template>
            </div>
            <PaginationBar :total="pageTotal" @page="getPageInfo"></PaginationBar>
            </div>
            
            <div class="data-empty" v-if="!isShow">
                <div class="data-empty1">
                    <div class="message-top">
                        <h4>Searching by Author Name</h4>
                    </div>
                    <div class="message-bottom">
                        <p>Using the Author(s) field produces best results for author name searches.</p>
                        <p>For the most precise name search, follow surname(s), forename(s) or surname(s), initial(s) pattern: example Hawking, S or Hawking, Stephen</p>
                        <p>For best results on multiple author names, separate individuals with a ; (semicolon). Example: Jin, D S; Ye, J</p>
                        <p>Author names enclosed in quotes will return only exact matches. For example, "Stephen Hawking" will not return matches for Stephen W. Hawking.</p>
                        <p>Diacritic character variants are automatically searched in the Author(s) field.</p>
                        <p>Queries with no punctuation will treat each term independently.</p>
                    </div>
                </div>
                <div class="data-empty2">
                    <div class="message-top">
                        <h4>Searching by subcategory</h4>
                    </div>
                    <div class="message-bottom">
                        <p>To search within a subcategory select All fields.</p>
                        <p>A subcategory search can be combined with an author or keyword search by clicking on add another term in advanced search.</p>
                    </div>
                </div>
                <div class="data-empty3">

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,onMounted,reactive } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { Search} from '@element-plus/icons-vue'
import { queryPaperPageByMultipleCondition } from '@/api/paper/paper'
import DataPicker from "@/components/DataPicker.vue";
import PaperBox from './components/PaperBox.vue'
import PaginationBar from "@/components/PaginationBar.vue";
import { ElMessage} from 'element-plus'

const router = useRouter()
const route = useRoute()

const inputData = ref()
const selectedValue = ref('allFields')
const subjectId = ref()
const subjectName = ref()
const abstractShow = ref(true)

const isShow = ref(false)

const paperList = ref([])
// 分页信息
let pageTotal = ref(0);

onMounted(() => {
    // 为了保存页面信息
    if(localStorage.getItem('inputData') != undefined && localStorage.getItem('inputData') != null){
            inputData.value = localStorage.getItem('inputData')
    }else{
        if(route.query.inputData != undefined && route.query.inputData != null){
            inputData.value = route.query.inputData;
        }        
    } 
    // 为了保存页面信息
    if(localStorage.getItem('selectedValue') != undefined && localStorage.getItem('selectedValue') != null){
            selectedValue.value = localStorage.getItem('selectedValue')
    }else{
        if(route.query.selectedValue != undefined && route.query.selectedValue != null){
            selectedValue.value = route.query.selectedValue;
        }        
    }
    
    // 为了保存页面信息
    if(localStorage.getItem('subjectId') != undefined && localStorage.getItem('subjectId') != null){
            subjectId.value = localStorage.getItem('subjectId')
            subjectName.value = localStorage.getItem('subjectName')
    }else{
        if(route.query.subjectId != undefined && route.query.subjectId != null){
            subjectId.value = route.query.subjectId;
            subjectName.value = route.query.subjectName;
        }         
    }   
    
    // 为了保存页面信息
    if(localStorage.getItem('isShow') != undefined && localStorage.getItem('isShow') != null){
        isShow.value = localStorage.getItem('isShow')
    }

    getPaperByPage()
})

let requestParam = reactive({
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
    pageSize: 10,
    pageNum: 1,
    startTime: null,
    endTime: null
  });
function getPageInfo(page) {
    requestParam.pageSize = page.pageSize;
    requestParam.pageNum = page.pageNum;
    // console.log(page.pageSize)
    // console.log(page.pageNum)
    getPaperByPage()
}

// 获取日期
function getDate(date){
    requestParam.startTime = date[0]
    requestParam.endTime = date[1]
    getPaperByPage()
}

function getPaperByPage(){

    if(inputData.value == undefined || inputData.value == null || inputData.value.trim() == ''){
        ElMessage({
        type: 'warning',
        message: '请先输入关键字！',
      })
        return;
    }

    handleRequestData()
    queryPaperPageByMultipleCondition(requestParam).then((res) => {
        if(res.code == 200){
            paperList.value = res.data.records
            pageTotal.value = res.data.total
            isShow.value = true;
            // console.log(res)
            // console.log(paperList.value)
            localStorage.removeItem('selectedValue');
            localStorage.removeItem("inputData");
            localStorage.removeItem("subjectId");
            localStorage.removeItem("subjectName");
            localStorage.removeItem("isShow");
        }
    })
}

function handleRequestData(){
    console.log(selectedValue.value)
    if(selectedValue.value == 'allFields'){
        requestParam.title = inputData.value
        requestParam.abstracts = inputData.value
        requestParam.identifier = inputData.value
        requestParam.authors = inputData.value
        requestParam.comments = inputData.value
        requestParam.acmClass = inputData.value
        requestParam.mscClass = inputData.value
        requestParam.reportNumber = inputData.value
        requestParam.journalReference = inputData.value
        requestParam.doi = inputData.value
    }
    if(selectedValue.value === 'title'){
        requestParam.title = inputData.value
    }
    if(selectedValue.value == 'abstract'){
        requestParam.abstracts = inputData.value
    }
    if(selectedValue.value == 'comments'){
        requestParam.comments = inputData.value
    }
    if(selectedValue.value == 'journal'){
        requestParam.journalReference = inputData.value
    }
    if(selectedValue.value == 'acm'){
        requestParam.acmClass = inputData.value
    }
    if(selectedValue.value == 'msc'){
        requestParam.mscClass = inputData.value
    }
    if(selectedValue.value == 'report'){
        requestParam.reportNumber = inputData.value
    }
    if(selectedValue.value == 'identifier'){
        requestParam.identifier = inputData.value
    }
    if(selectedValue.value == 'doi'){
        requestParam.doi = inputData.value
    }
    if(selectedValue.value == 'author'){
        requestParam.authors = inputData.value
    }
    if(selectedValue.value == 'fullText'){
        // 后续实现全文搜索
    }

}

function gotoSomewhere(){
    // 保存状态
    localStorage.setItem("selectedValue",selectedValue.value)
    localStorage.setItem("inputData",inputData.value)
    localStorage.setItem("subjectId",subjectId.value)
    localStorage.setItem("subjectName",subjectName.value)
    localStorage.setItem("isShow",isShow.value)
}


</script>
<style>
.search-box{
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: center;
    align-items: center;
    /* background-color: antiquewhite; */
}
.search-handle{
    display: flex;
    flex-direction: column;
    width: 90%;
}
.search-content{
    display: flex;
    flex-direction: column;
    width: 90%;
}
.paper-list-sty{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    background-color: white;
}
.top-area{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    margin-top: 2rem;
}

.data-empty{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
}
.data-empty1{
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    /* border: 2px solid blue; */
    width: 80%
}
.data-empty2{
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    width: 80%
}
.data-empty3{
    display: flex;
    flex-direction: column;
}
.message-bottom{
    background-color: rgb(221, 240, 245);
    height: 80%;
    padding: 1rem;
    border-radius: 2px;
}
.message-top{
    background-color: rgb(10, 136, 238);
    height: 20%;
    padding: 1rem;
    border-radius: 2px;
}
</style>