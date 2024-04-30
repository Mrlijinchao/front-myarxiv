<template>
 <div class="container">
    <HeaderTop></HeaderTop>
    <HeaderBar></HeaderBar>
 </div>
</template>
<script setup lang="ts">
import HeaderBar from "./components/HeaderBar.vue"
import HeaderTop from "./components/HeaderTop.vue"
</script>

<style>
.container{
    display: flex;
    flex-direction: column;
    height: 100%;
    width:100%;
}
</style>