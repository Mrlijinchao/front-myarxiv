<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="LayoutComponents[layout]" />
</template>

<script setup lang="ts" name="layout">
import { type Component,ref, onMounted } from "vue";
import LayoutFacade from "./LayoutFacade/indexPage.vue";
import LayoutUser from "./LayoutUser/indexPage.vue";
import LayoutSubmission from "./LayoutSubmission/IndexPage.vue";
import LayoutPaper from "./LayoutPaper/indexPage.vue"
import LayoutGeneral from "./LayoutGeneral/indexPage.vue"
import { useRoute } from 'vue-router'
const route = useRoute()

const LayoutComponents: Record<any, Component> = {
  'facade': LayoutFacade,
  'user': LayoutUser,
  'submission': LayoutSubmission,
  'paper': LayoutPaper,
  'general': LayoutGeneral
};

const layout = ref("")

onMounted(() => {
  if (typeof route.meta.layout === 'string') {
    layout.value = route.meta.layout;
  }

})

</script>

<style scoped lang="scss">
.layout {
    height: 100%;
    width: 100%;
    background-color: rgb(36, 33, 201);
}
</style>

