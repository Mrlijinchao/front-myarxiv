<template>
    <el-row>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="logo-col">
                            <img @click="gotoFacade()" src="../../../../../../public/images/myarxiv logo(1).svg" class="logo"/>
                        </el-col>
                        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
                        ><div class="grid-content ep-bg-purple-light"
                        /></el-col>
                        <el-col class="search-col" :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                            <SearchBar></SearchBar>
                        </el-col>
                        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                            <div class="rightArea">
                                <el-link href="http://43.139.8.186:8861/#/login" :icon="Avatar">Background</el-link>
                                <!-- <el-link href="/login"  :icon="UserFilled">
                                    Login
                                </el-link> -->
                                <router-link to="/facade/login" target="myRout" style="color: white;">login</router-link>
                            </div>
                        </el-col>
    </el-row>
</template>
<script setup>
import SearchBar from '@/components/SearchBar.vue'
import {useRouter} from "vue-router";
let router = useRouter();

function gotoFacade(){
    router.push({
        path:"/facade/home",
    })
}
</script>
<style scoped>
/* 顶栏样式 */
/* .hearerBar{
    display: flex;
    justify-content: space-around;
    align-items:center;
    height: 100%;
    width: 100%;
    background-color: blue;
} */
.el-row {
  margin-bottom: 20px;
  height: 100%;
  background-color: red;
  padding: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  background-color: red;
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

/* 搜索框 */
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.search-col{
    display: flex;
    justify-content: right;
    align-items:center;
}
.search-div{
    display: flex;
    justify-content: right;
    align-items:center;
    height: 100%;
    background-color: red;
    width: 60%;
}

/* 登录，后台链接区域 */
.rightArea{
    display: flex;
    justify-content: center;
    align-items:center;
    height: 100%;
}
.el-link {
  margin-right: 8px;
  color: white;
}
</style>

