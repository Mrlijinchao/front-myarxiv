<template>
    <div class="main-area">
        <div class="top-area">
            <div class="step-area">
                <div class="step-button">
                    <el-button type="primary" style="margin-top: 12px" @click="last" plain>Last step</el-button>
                </div>
                <div class="step-button">
                    <el-button type="primary" style="margin-top: 12px" @click="savePaper" plain>Next step</el-button>
                </div>
            </div>

            <div class="title-area">
                <div class="title-bar">
                    <h3>Enter Metadata: Titles,Abstract,Comments,etc.</h3>
                </div>
                <!-- <el-button type="primary" @click="show">打印</el-button> -->
            </div>

        </div>
        <el-divider/>
        <div class="metadata-area">
            <el-form
                ref="ruleFormRef"
                :model="paper"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
                size="default"
                status-icon
            >
            <el-form-item label="Title" prop="title">
                <span>(Review title requirements)</span>
                <el-input v-model="paper.title" size="large" placeholder="Please input" />
            </el-form-item>
            
            <el-form-item label="Authors" prop="authors">
                <span>(First names first)</span>
                <el-input v-model="paper.authors" placeholder="Please input" />
            </el-form-item>

            <el-form-item label="Abstracts" prop="abstracts">
                <span>(Abstract title requirements)</span>
                <el-input
                    v-model="paper.abstracts"
                    :rows="10"
                    type="textarea"
                    placeholder="Please input"
                />
            </el-form-item>

            <el-form-item label="Comments" prop="comments">
                <span>(Review comment help)</span>
                <el-input v-model="paper.comments" placeholder="Please input" />
            </el-form-item>

            <el-form-item label="ReportNumber" prop="reportNumber">
                <span>(Review report number help)</span>
                <el-input v-model="paper.reportNumber" placeholder="Please input" />
            </el-form-item>

            <el-form-item label="JournalReference" prop="journalReference">
                <span>(Review reference help)</span>
                <el-input v-model="paper.journalReference" placeholder="Please input" />
            </el-form-item>

            <el-form-item label="DOI" prop="doi">
                <span>(Review DOI help)</span>
                <el-input v-model="paper.doi" placeholder="Please input" />
            </el-form-item>

            <el-form-item label="AcmClass" prop="acmClass">
                <span>(Review ACM class help)</span>
                <el-input v-model="paper.acmClass" placeholder="Please input" />
            </el-form-item>

            <el-form-item label="MscClass" prop="mscClass">
                <span>(Review MSC class help)</span>
                <el-input v-model="paper.mscClass" placeholder="Please input" />
            </el-form-item>

            </el-form>
            
        </div>
    </div>
</template>
<script setup>
import { ref,reactive,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import { getPaperBySUbmission , fourthStep } from "@/api/paper/paper"
let store = useStore();
const router = useRouter()

const submissionId = ref();

const paper = reactive({
    submissionId: null,
    title: null,
    authors: null,
    abstracts: null,
    comments: null,
    reportNumber: null,
    journalReference: null,
    doi: null,
    acmClass: null,
    mscClass: null
})

onMounted(() => {
    submissionId.value = store.getters['submission/getSubmissionInfo'].id
    paper.submissionId = submissionId.value
    queryPaper()
})

// 查询论文
function queryPaper(){
    if(submissionId.value == null || submissionId.value == undefined){
        return;
    }
    getPaperBySUbmission({submissionId: submissionId.value}).then((res) => {
        console.log(res)
        if(res.code == 200){
            paper.title = res.data.title
            paper.authors = res.data.authors
            paper.abstracts = res.data.abstracts
            paper.comments = res.data.comments
            paper.reportNumber = res.data.reportNumber
            paper.journalReference = res.data.journalReference
            paper.doi = res.data.doi
            paper.acmClass = res.data.acmClass
            paper.mscClass = res.data.mscClass
        }
    })
}

// 保存论文信息
function savePaper(){
    fourthStep(paper).then((res) => {
        if(res.code == 200){
            next()
            // localStorage.setItem('paper',JSON.stringify(res.data));
        }
    })
}

// 下一步
function next(){
    // savePaper()
    router.push({
        path:"/submission/fifth",
    })
}
function last(){
    router.push({
        path:"/submission/third",
    })
}

// function show(){
//     console.log(paper)
// }

const rules = reactive({
    title: [
    { required: true, message: 'Please input title', trigger: 'blur'},
    // { validator: validatorEmail ,trigger: 'blur'},
    ],
    authors: [
        {
            required: true,
            message: 'Please input authors',
            trigger: 'blur',
        }
    ],
    abstracts: [
        {
            required: true,
            message: 'Please input abstracts',
            trigger: 'blur',
        }
    ],
    comments: [
        {
            message: 'Please input comments',
            trigger: 'blur',
        }
    ],
    reportNumber: [
        {
            message: 'Please input reportNumber',
            trigger: 'blur',
        }
    ],
    journalReference: [
        {
            message: 'Please input journalReference',
            trigger: 'blur',
        }
    ],
    doi: [
        {
            message: 'Please input doi',
            trigger: 'blur',
        }
    ],
    acmClass: [
        {
            message: 'Please input acmClass',
            trigger: 'blur',
        }
    ],
    mscClass: [
        {
            message: 'Please input mscClass',
            trigger: 'blur',
        }
    ]

})

</script>
<style scoped>
.main-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.metadata-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 100%;
    /* background-color: red; */
}

.demo-ruleForm{
    /* background-color: rgb(146, 146, 105); */
    padding: 3rem;
}
.title-area{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;
    /* background-color: rgb(187, 194, 197); */
}
.title-bar{
    background-color: red;
    height: 2rem;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.top-area{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    width:100%;
    /* background-color: rgb(255, 0, 195); */
}
.step-area{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    /* background-color: rgb(0, 174, 255);  */
}
.step-button{
    padding-bottom : 10px;
    /* background-color: green; */
}
.text-annotation{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  text-align: left;
}
</style>