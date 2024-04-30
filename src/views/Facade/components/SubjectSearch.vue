<template>
    <div class="leftArea">
        <div class="textArea">
            <p>
               arXiv is a free distribution service and an open-access archive for 2,286,311 scholarly articles in the fields of physics, mathematics, computer science, quantitative biology, quantitative finance, statistics, electrical engineering and systems science, and economics. Materials on this site are not peer-reviewed by arXiv.
            </p>
        </div>
        <div class="search-area">
            <div class="search">
                <el-select
                v-model="subjectId"
                placeholder="Select"
                style="width: 240px"
            >
                <el-option
                    v-for="item in subjectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click="getLabel(item.label)"
                />
            </el-select>
            </div>
            <div class="search-button">
                <el-button @click="search()" type="primary">Search</el-button>
                <el-button type="primary" disabled>Form Interface</el-button>
                <el-button type="primary" disabled>Catchup</el-button>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref,onMounted } from 'vue'
import {useRouter} from "vue-router";
import { querySubjectList } from "@/api/subject/subject"
const router = useRouter();

const subjectId = ref()
const subjectName = ref()

const subjectList = ref([])

onMounted(() => {
  getSubjectList()
})

function search(){
  router.push({
        path:"/search/home",
        query: {
            subjectId: subjectId.value,
            subjectName: subjectName.value
        }
    })
}

function getSubjectList(){
  querySubjectList().then((res) => {
    if(res.code == 200){
      // 默认选中第一个
      subjectId.value = res.data[0].id
      subjectName.value = res.data[0].name
      for(let i = 0;i<res.data.length;i++){
        let sub = {
          value: res.data[i].id,
          label: res.data[i].name
        }
        subjectList.value.push(sub);
      }

    }
    
  })
}

function getLabel(label){
  subjectName.value = label; 
}

// const options = [
//   {
//     value: 'physics',
//     label: 'Physics',
//   },
//   {
//     value: 'mathematics',
//     label: 'Mathematics',
//   },
//   {
//     value: 'computerScience',
//     label: 'Computer Science',
//   },
//   {
//     value: 'quantitativeBiology',
//     label: 'Quantitative Biology',
//   },
//   {
//     value: 'quantitativeFinance',
//     label: 'Quantitative Finance',
//   },
//   {
//     value: 'statistics',
//     label: 'Statistics',
//   },
//   {
//     value: 'electricalEngineering',
//     label: 'Electrical Engineering and Systems Science',
//   },
//   {
//     value: 'economics',
//     label: 'Economics',
//   },
// ]
</script>
<style scoped>
.leftArea{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-left: 1rem;
}
.search-area{
    display: flex;
    justify-content: left;
    align-items: center;
}
.search{
    margin-right: 1rem;
}
.search-button{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>

