<template>
    <el-main>
      <router-view v-slot="{ Component, route }">
        <transition appear name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </router-view>
    </el-main>
</template>
  
  <script setup lang="ts">
  import { ref,provide} from "vue";
  
  
  
  // 注入刷新页面方法
  const isRouterShow = ref(true);
  const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
  provide("refresh", refreshCurrentPage);
  
  
  </script>
  
  <style scoped lang="sass">

  </style>