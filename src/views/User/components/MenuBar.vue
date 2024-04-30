<template>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" class="function-bar">
        <div class="function-item" :class="{active: (route.path == '/user/home' ? true: false)}" @click="gotoUserHome()">
                <div>
                    <el-icon size="30"><HomeFilled /></el-icon>
                    <h3>首页</h3> 
                </div>
        </div>
        <div class="function-item" :class="{active: (route.path == '/user/unpublish' ? true: false)}" @click="gotoUnPublishedPage()">
                <div>
                    <el-icon size="30"><Tickets /></el-icon>
                    <h3>未发表</h3>
                </div>
        </div>            
        <div class="function-item" :class="{active: (route.path == '/user/publish' ? true: false)}" @click="gotoPublishedPage()">
                <div>
                    <el-icon size="30"><Document /></el-icon>
                    <h3>已发表</h3>
                </div>
        </div>           
    </el-col>
</template>
  
<script setup>
import {onMounted} from 'vue'
import { HomeFilled, Tickets, Document} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import { useRoute } from 'vue-router'
onMounted(() => {
    // console.log(route.path)
})
const route = useRoute()
// import { ElMessage } from 'element-plus'
let router = useRouter();
function gotoUserHome(){
    router.push({
        path:"/user/home",
        })
}
function gotoPublishedPage(){
    router.push({
        path:"/user/publish",
        })
}

function gotoUnPublishedPage(){
    router.push({
        path:"/user/unpublish",
        })
}

</script>
<style>
.function-bar{
    display: flex;
    justify-content: left;
    align-items: center;
    height: 100%;
}
.function-item{
    height: 100%;
    width: 100%;
    margin-left: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: blue; */
}
.active{
        background-color: rgb(236, 117, 81);
    }
</style>
  

  