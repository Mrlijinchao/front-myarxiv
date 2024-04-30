<template>
     <div class="search-div">
        <el-input
            v-model="inputData"
            placeholder="Please input"
            class="input-with-select"
            clearable
        >
            <template #prepend>
                <el-select v-model="selectedValue" placeholder="Select" style="width: 115px">
                    <el-option label="All Fields" value="allFields" />
                    <el-option label="Title" value="title" />
                    <el-option label="Abstract" value="abstract" />
                    <el-option label="Comments" value="comments" />
                    <el-option label="Journal reference" value="journal" />
                    <el-option label="ACM classification" value="acm" />
                    <el-option label="MSC classification" value="msc" />
                    <el-option label="Report number" value="report" />
                    <el-option label="MyArxiv identifier" value="myarXiv" />
                    <el-option label="DOI" value="doi" />
                    <el-option label="ORCID" value="orcid" />
                    <el-option label="Author" value="author" />
                    <el-option label="Full text" value="fullText" />
                </el-select>
            </template>
                <template #append>
                    <el-button @click="search()" :icon="Search" />
                </template>
    </el-input>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { Search,Avatar} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
const router = useRouter();
const inputData = ref('')
const selectedValue = ref('allFields')

function search(){
    router.push({
        path:"/search/home",
        query: {
            inputData: inputData.value,
            selectedValue: selectedValue.value
        }
    })
}


</script>
<style scoped>
.search-div{
    display: flex;
    justify-content: right;
    align-items:center;
    height: 100%;
    background-color: red;
    width: 60%;
}
</style>