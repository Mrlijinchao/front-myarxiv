<template>

    <div class="subject-list">
      <div class="subject-item" v-for="(subjectItem,i) in subjectCategoryList" v-bind:key="i">
        <h2>{{subjectItem.name}}</h2>
        <div v-for="(categoryItem1,i1) in subjectItem.categoryList" v-bind:key="i1">
            <h3>{{ categoryItem1.name }}</h3>
            <div v-for="(categoryItem2,i2) in categoryItem1.children" v-bind:key="i2">
                <el-link @click="getCategoryPaperList(categoryItem2.id,categoryItem2.name)" style="font-size: medium;" type="primary">{{ categoryItem2.name }}</el-link>
            </div>
        </div>
    </div>  
    </div>
</template>
<script setup>


import {getHomeInfo} from "@/api/paper/paper.js";
import { onMounted,ref } from "vue";
import {useRouter} from "vue-router";
import { ElLoading } from 'element-plus'
import { getSubjectCategory } from "@/api/subject/subject"

let router = useRouter();

const subjectCategoryList = ref([])

// 周期钩子函数
onMounted(() => {
    querySubjectCategory()
    // getInfo();
})

// // 请求主页信息
// let homeInfoList  = ref([])
// async function getInfo() {
//     // let data = await getHomeInfo()
//     // console.log(data)
//     const loading = ElLoading.service({
//         lock: true,
//         text: 'Loading',
//         background: 'rgba(0, 0, 0, 0.7)',
//     })
//     getHomeInfo().then((data) => {
//         homeInfoList.value = data.message
//         loading.close();
//         console.log("返回结果")
//         console.log(homeInfoList.value)
//     });
// }

function querySubjectCategory(){
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    getSubjectCategory().then((res) => {
        subjectCategoryList.value = res.data;
        loading.close();
    })
}

// 获取分类id并跳转到分类论文列表页面

function getCategoryPaperList(categoryId,categoryName) {
    console.log(categoryId);
    router.push({
    path:"/paper/list",
    query:{ //query是个配置项
        categoryId: categoryId,
        categoryName: categoryName
    }
})
}



</script>
<style scoped>
.subject-list{
    border: 1px solid gainsboro;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    text-align:left;
}
.subject-item{
    background-color: white;
    border-radius: 1px;
    border-bottom: 1px solid gainsboro;
}
</style>