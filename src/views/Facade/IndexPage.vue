<template>
    <div class="main-area">
        <div class="top-area">
            <div class="subjectSearch">
                <SubjectSearch></SubjectSearch>
            </div>
            
            <div class="notification">
                <Notification></Notification>
            </div>
        </div>
        <div class="subjectData">
            <SubjectData></SubjectData>
        </div>
    </div>
</template>
<script setup>
import SubjectSearch from './components/SubjectSearch.vue';
import Notification from './components/Notification.vue';
import SubjectData from './components/SubjectData.vue'


</script>
<style scoped>
.main-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.top-area{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.subjectData{
    width: 100%;
}
.subjectSearch{
    width: 50%;
}
.notification{
    width: 50%;
}
</style>