<template>
    <div>
        <div class="category-name">
            <h1>{{ categoryName }}</h1>
            <h3>Authors and titles for recent submissions</h3>
        </div>
        <div class="paper-list-sty">
            <div class="top-area">
               <PaginationBar :total="pageTotal" @page="getPageInfo"></PaginationBar>
               <div>
                <DataPicker @transmitDate="getDate"></DataPicker> 
               </div>
                
            </div>
            <div>
                <template v-for="(item,i) in paperInfoList" v-bind:key="i">
                  <PaperBox :paper="item" :num="i+1"></PaperBox>  
                </template>
            </div>
            <PaginationBar :total="pageTotal" @page="getPageInfo"></PaginationBar>
        </div>
        
    </div>
</template>
<script setup>
import { onMounted,ref,reactive } from "vue";
import {useRoute} from "vue-router";
import PaginationBar from "../../../../components/PaginationBar.vue";
import DataPicker from "../../../../components/DataPicker.vue";
import { ElLoading } from 'element-plus'
import PaperBox from "./components/PaperBox.vue"
import { queryPaperByPage } from "@/api/paper/paper"

let route = useRoute();

//分类id
let categoryId = ref(0);
let categoryName = ref('');
// 分页信息
let pageTotal = ref(0);
// 获取论文列表
let paperInfoList = ref([])

onMounted(() => {
    categoryId.value = route.query.categoryId;
    categoryName.value = route.query.categoryName;
    requestParam.categoryId = route.query.categoryId;
    getPaperByPage()
})

let requestParam = reactive({
    categoryId: 0,
    pageSize: 4,
    pageNum: 1,
    startTime: null,
    endTime: null
  });
function getPageInfo(page) {
    requestParam.pageSize = page.pageSize;
    requestParam.pageNum = page.pageNum;
    console.log(page.pageSize)
    console.log(page.pageNum)
    getPaperByPage()
}


function getPaperByPage(){
    queryPaperByPage(requestParam).then((res) => {
        paperInfoList.value = res.data.records
        pageTotal.value = res.data.total
        console.log(res)
        console.log(paperInfoList.value)
    })
}

// 获取日期
function getDate(date){
    requestParam.startTime = date[0]
    requestParam.endTime = date[1]
    getPaperByPage()
}

</script>
<style scoped>
.paper-box{
    border-bottom: 1px solid gainsboro;
    background-color: white;
    text-align: left;
    margin-top: 2rem;
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
    justify-content: left;
    align-items: center;
}
.category-name{
    text-align: left;
}
</style>