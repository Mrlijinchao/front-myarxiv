<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="notify-area">
        <div class="box-card" style="color: white;">
            <div class="title1">
                这是第一个通知
            </div>
            <div class="content1">
                This coming Wednesday, May 22, 2024, the arXiv editorial staff will be attending a team development retreat. Because all editorial staff will be participating in this professional development, it will temporarily affect arXiv’s mailings, help desk, and announcement schedule. This brief change will only affect the announcement of new submissions; arXiv servers will otherwise remain…
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped>
.notify-area{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
}
.box-card{
    position: relative;
    width: 90%;
}

/* 通知1 */
.title1{
    position: absolute;
    background-color: gray;
    width: 50%;
    margin-top: -10px;
}
.content1{
    background-color: black;
    color: white;
    border-radius: 6px;
    border: 3px solid black;
    padding: 20px;
    text-align: left;
}




</style>