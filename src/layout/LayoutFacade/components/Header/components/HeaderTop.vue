<template>
    <div>
        <el-row style="background-color: black;" class="row-bg" justify="space-between">
                        <el-col style="background-color: black;" class="logo-col" :span="7">
                          <!-- <img @click="gotoFacade()" src="../../../../../../public/images/myarxiv logo(1).svg" class="logo"/> -->
                          
                            <img src="../../../../../../public/images/mypaper.png.svg" class="logo"/>
                        </el-col>
                        <el-col style="background-color: black;" :span="4">
                            <h2>Welcome!</h2>
                        </el-col>
                        <el-col :span="7" style="text-align:center;background-color: black;" class="el-col-text">
                            We gratefully acknowledge support from the Simons Foundation, member institutions, and all contributors. Donate
                        </el-col>
                    </el-row>
    </div>
</template>
<script setup>
import {useRouter} from "vue-router";
let router = useRouter();

function gotoFacade(){
    router.push({
        path:"/facade/home",
    })
}
</script>
<style setup>
/* 顶栏样式 */
.el-row {
  margin-bottom: 20px;
  height: 100%;
  padding: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  color: whitesmoke;
}

.el-col-text{
    display: flex; 
    justify-content: center;
    align-items:center;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
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
</style>