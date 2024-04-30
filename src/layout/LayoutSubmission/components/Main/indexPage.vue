<template>
    <el-main :style="{height: screenHeight + 'px'}">
      <router-view v-slot="{ Component, route }" :key="route.path">
        <transition appear name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </router-view>
    </el-main>
    <!-- <el-main :style="{height: screenHeight + 'px'}">
      <router-view v-slot="{ Component, route }" :key="route.path">
        <transition appear name="fade-transform" mode="out-in">
          <keep-alive>
            <template v-if="$route.meta.keepAlive">
              <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
            </template>
          </keep-alive>
          <template v-if="!$route.meta.keepAlive">
              <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
          </template>
        </transition>
      </router-view>
    </el-main> -->
</template>
  
  <script setup lang="ts">
  import { ref,provide,onMounted} from "vue";
  import { useRoute } from 'vue-router'
  const route = useRoute()
  
  
  // 注入刷新页面方法
  const isRouterShow = ref(true);
  const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
  provide("refresh", refreshCurrentPage);
  
  //获取屏幕宽度
const screenHeight = ref(window.innerHeight)
const handleResize = () => {
    screenHeight.value = window.innerHeight
}
 
 
 
onMounted(() => {
  window.addEventListener("resize", handleResize)
})
  
  </script>
  
  <style scoped lang="sass">

  </style>