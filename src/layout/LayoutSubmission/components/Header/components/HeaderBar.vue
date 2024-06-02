<template>
  <el-row>

    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="logo-col">
        <!-- <img src="../../../../public/img/icons/arxiv-logo-one-color-white.svg" class="logo"/> -->
        <logo @click="gotoFacade()" class="logo"></logo>
    </el-col>
    <el-col class="back-home" :xs="4" :sm="6" :md="2" :lg="2" :xl="11">
        <el-icon><ArrowLeftBold /></el-icon>
        <router-link to="/user/home" target="myRout" style="color: white;">返回主页</router-link>
    </el-col>
    <el-col class="step-area" :xs="4" :sm="6" :md="14" :lg="17" :xl="11">
        <StepBar></StepBar>
    </el-col>

    <el-col class="image-header" :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
        <div>
                    <!-- <el-avatar src="../../../../public/img/icons/apple-touch-icon-120x120.png" /> -->
                    <img class="img-style" src="../../../../../../public/images/apple-touch-icon-120x120.png" />
        </div>
        


    </el-col>
  </el-row>
</template>
<script setup>
import { Edit, Picture, UploadFilled,ArrowLeftBold } from '@element-plus/icons-vue'
import {watch,computed,ref} from 'vue'
import { useStore } from "vuex";
import Logo from '../../../../../components/Logo-MyarXiv.vue'
import StepBar from '@/views/Submission/components/StepBar.vue'
let store = useStore();

let active = ref(0)
import {useRouter} from "vue-router";
let router = useRouter();

function gotoFacade(){
    router.push({
        path:"/facade/home",
    })
}
// const getStepActive = computed(()=>{
// 	//返回的是ref对象
// 	return store.state.stepController.stepActive
// })

// watch(getStepActive , (newVal, oldVal) => {
//     if(newVal != oldVal){
//         active.value = newVal;
//     }
// }, 
// {
//     immediate:true,
//     deep:true}
// );

</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
  height: 100%;
  background-color: red;
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


.image-header{
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.img-style{
    border-radius: 50%;
    height: 4rem;
}

.step-area{
    display: flex;
    justify-content: center;
    align-items: center;
}
.step-bar{
    background-color: red;
    width: 100%;
    height: auto;
    color: white;
}
.back-home{
    display: flex;
    justify-content: center;
    align-items: center;
    
}
</style>
