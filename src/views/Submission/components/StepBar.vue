<template>
    <el-steps class="step-bar" :space="200" :active="active" simple>
            <el-step title="Start" :icon="Edit" />
            <el-step title="Add Files" :icon="UploadFilled" />
            <el-step title="Process" :icon="MagicStick" />
            <el-step title="Metadata" :icon="EditPen" />
            <el-step title="Preview" :icon="CircleCheck" />
    </el-steps>
</template>
<script setup>
import { Edit, UploadFilled,MagicStick,EditPen,CircleCheck} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import {watch,ref} from 'vue'
const route = useRoute()
let active = ref(0);
// const getActive = computed(()=>{
// 	//返回的是ref对象
// 	return route.path;
// })

// watch(getActive , (newVal, oldVal) => {
// 	console.log('newVal, oldVal', newVal, oldVal)
//     if(newVal != oldVal){
//         active.value = newVal;
//     }
// }) 

watch(() => route.path,(newPath, oldPath) => { 
    console.log(newPath) 
    if(newPath == '/submission/first'){
        active.value = 0
    }
    if(newPath == '/submission/second'){
        active.value = 1
    }
    if(newPath == '/submission/third'){
        active.value = 2
    }
    if(newPath == '/submission/fourth'){
        active.value = 3
    }
    if(newPath == '/submission/fifth'){
        active.value = 4
    }
},
{ 
    immediate: true 
});

</script>

<style scoped>
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