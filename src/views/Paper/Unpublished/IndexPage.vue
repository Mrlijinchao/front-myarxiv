<template>
    <div>
        <div class="main-area">
            <div class="unSubmitted-area">
                <div>
                    <h3>待提交论文</h3>
                </div>
                <div class="submission-box">
                <div class="submission-btn"><el-button type="primary" @click="createSubmission()" plain>START NEW SUBMISSION</el-button> </div>
                <el-table :data="submissionItemList1" style="width: 100%">
                <el-table-column fixed prop="submissionIdentifier" label="Identifier" width="200" />
                <el-table-column prop="type" label="Type" width="200" />
                <el-table-column prop="title" label="Title" width="200" />
                <el-table-column prop="status" label="Status" width="200">
                    <template #default>
                        <el-link>incomplete</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="expires" label="Expires" width="300" />
                <el-table-column fixed="right" label="Actions" width="300">
                <template #default="scope">
                <el-button link type="primary" size="small" @click="updateSubmission(scope.row.id)">Update</el-button>
                <el-button @click="deleteSubmission(scope.row.id)" link type="primary" size="small">Delete</el-button>


                <el-popover trigger="click" placement="top" :width="300">
                <div style="text-align: left; margin: 0">
                 <template v-for="(item,i) in fileList" :key="i">
                            <div class="tran-sty">
                                <div><b>Name：</b>{{ item.name }}</div>
                                <div><b>transactionHash：</b>{{ item.hash }}</div>
                            </div>
                        </template>
                </div>
                <template #reference>
                    <el-button link type="primary" @click="lookFile(scope.row.id)">transactionHash</el-button>
                </template>
                </el-popover>
                
                </template>
                </el-table-column>
                </el-table>

                <!-- <div>
                    
                        <template v-for="(item,i) in fileList" :key="i">
                            <div>
                                <span>{{ item.name + "：" }}</span>
                                <span>{{ item.hash }}</span>
                            </div>
                        </template>
                    
                </div> -->

                </div>
                
            </div>
            <div class="unSubmitted-area">
                <div>
                    <h3>已提交未审核通过论文</h3>
                </div>
                <el-table :data="submissionItemList2" style="width: 100%">  
                <el-table-column fixed prop="submissionIdentifier" label="Identifier" width="200" />
                <el-table-column prop="type" label="Type" width="200" />
                <el-table-column prop="title" label="Title" width="200" />
                <el-table-column prop="status" label="Status" width="200">
                    <template #default>
                        <el-link>processing</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="expires" label="Expires" width="300" />
                <el-table-column fixed="right" label="Actions" width="300">
            <template  #default="scope">
                <el-button link type="primary" size="small" @click="updateSubmission(scope.row.id)">Update</el-button>
                <!-- <el-button link type="primary" size="small">Delete</el-button> -->
                <el-button @click="unSubmitPaper(scope.row.id)" link type="primary" size="small">UnSubmit</el-button>

                <el-popover trigger="click" placement="top" :width="300">
                <div style="text-align: left; margin: 0">
                 <template v-for="(item,i) in fileList" :key="i">
                            <div class="tran-sty">
                                <div><b>Name：</b>{{ item.name }}</div>
                                <div><b>transactionHash：</b>{{ item.hash }}</div>
                            </div>
                        </template>
                </div>
                <template #reference>
                    <el-button link type="primary" @click="lookFile(scope.row.id)">transactionHash</el-button>
                </template>
                </el-popover>
                

             </template>
                 </el-table-column>
            </el-table>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import { useStore } from "vuex";
import {useRouter} from "vue-router";
import { queryUnpublished,removeSubmission,unSubmit } from "@/api/paper/paper"
import moment from 'moment'
import { ElMessage,ElMessageBox} from 'element-plus'
import { getFileBySubmission } from '@/api/paper/paper'

let router = useRouter();
let store = useStore();


const handleClick = () => {
  console.log('click')
}

let submissionList = ref([]);
let submissionItemList1 = ref([]);
let submissionItemList2 = ref([]);

const userId = ref()

onMounted(() => {
    userId.value = JSON.parse(localStorage.getItem('user'))?.id
    getUnpublished()
})

const fileList = ref();
// 查询文件列表
function lookFile(id){
    getFileBySubmission({submissionId: id}).then((res) => {
        if(res.code == 200){
          fileList.value = res.data  
        } 
        console.log('结束')
    })
}

// 创建一个论文
function createSubmission(){
    router.push({
              path:"/submission/first",
              query: {
                new:'new'
              }
          })
}

function getUnpublished(){
    queryUnpublished({isSubmit: false,userId: userId.value}).then((res) => {
        if(res.code == 200){
           submissionItemList1.value = res.data;

            for(let i = 0;i<res.data.length;i++){
                submissionItemList1.value[i].expires = moment(submissionItemList1.value[i].expires).format('YYYY-MM-DD')
            }

        }
    })
    queryUnpublished({isSubmit: true,userId: userId.value}).then((res) => {
        if(res.code == 200){
           submissionItemList2.value = res.data;
           for(let i = 0;i<res.data.length;i++){
                submissionItemList2.value[i].expires = moment(submissionItemList2.value[i].expires).format('YYYY-MM-DD')
            }

        }
    })
}

function updateSubmission(id){
    router.push({
              path:"/submission/first",
              query: {submissionId: id}
          })
}

function deleteSubmission(id){
    removeSubmission({id: id}).then((res) => {
        if(res.code == 200){
            getUnpublished()
            ElMessage({
                type: 'success',
                message: '删除成功！',
            })
        }else{
            ElMessage({
                type: 'error',
                message: '删除失败！',
            })
        }
    })
}

function unSubmitPaper(id){
    unSubmit({id: id}).then((res) => {
        if(res.code == 200){
            getUnpublished()
            ElMessage({
                type: 'success',
                message: '撤销成功！',
            })
        }else{
            ElMessage({
                type: 'error',
                message: '撤销失败！',
            })
        }
    })
}

</script>
<style scoped>
.unSubmitted-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 0
}
.main-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.submission-btn{
    width: 20%;
    text-align: center;
}
.tran-sty{
    margin-top: 3px;
    border: 1px solid rgb(147, 143, 143);
    padding: 2px;
    border-radius: 2px;
}
/* .submission-box{

} */
</style>