<template>
    <div>
        <div class="unSubmitted-area">
                <div>
                    <h3>已审核通过论文</h3>
                </div>
                <el-table :data="paperList" style="width: 100%">  
                <el-table-column fixed prop="identifier" label="Identifier" width="200" />
                <el-table-column prop="subjectCategory" label="PrimaryCategory" width="200" />
                <el-table-column prop="title" label="Title">
                    <template #default="scope">
                        <el-button link type="primary" @click="gotoPaperDetail(scope.row.id)">{{scope.row.title}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="authors" label="Authors" width="200" />
                <el-table-column fixed="right" label="Actions" width="300">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="gotoUpdateVersion(scope.row.id)">UpdateVersion</el-button>
                <el-button link type="primary" size="small" @click="">Withdraw</el-button>
                <el-button link type="primary" size="small" @click="">Cross list</el-button>
             </template>
                 </el-table-column>
            </el-table>
            </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import { useStore } from "vuex";
import {useRouter} from "vue-router";
import { queryPublished} from "@/api/paper/paper"
let router = useRouter();
let store = useStore();

let paperList = ref([]);
const userId = ref()

onMounted(() => {
    userId.value = JSON.parse(localStorage.getItem('user'))?.id
    getPublished()
})

function getPublished(){
    queryPublished({userId: userId.value}).then((res) => {
        if(res.code == 200){
            paperList.value = res.data;
        }
    })
}

function gotoPaperDetail(id){

    router.push({
        path:"/paper/detail",
        query: {paperId: id}
    })

}

function gotoUpdateVersion(id){
    router.push({
        path:"/general/updateVersion",
        query: {paperId: id}
    })
}

</script>
<style scoped>
.unSubmitted-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 0 /* 解决报错ResizeObserver loop completed with undelivered notifications. */
}
.main-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.submission-btn{
    width: 20%;
    text-align: center;
}
/* .submission-box{

} */
</style>