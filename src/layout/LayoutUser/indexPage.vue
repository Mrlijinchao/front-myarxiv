<template>
  <!-- <el-scrollbar class="scrollbar"> -->
      <!-- <div :style="{height: screenHeight + 'px'}" class="common-layout"> -->
      <div class="common-layout">
          <div class="box">
              <Header></Header>
          </div>
          <div class="box">
              <Main></Main>
          </div>
          <div class="box">
              <Footer></Footer>
          </div>
      </div>
  <!-- </el-scrollbar>     -->
        
</template>
<script setup lang="ts">
import Main from './components/Main/indexPage.vue'
import Footer from "./components/Footer/indexPage.vue"
import Header from "./components/Header/indexPage.vue"

</script>
<style>
.common-layout{
/* height: 100%; */
widows: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
/* background-color: blue; */
}
.scrollbar{
height: 100%;
width: 100%;
padding: 1px;
/* background-color: brown; */
}
.box{
width: 100%;
height: 100%;
/* background-color: aqua; */
}
</style>