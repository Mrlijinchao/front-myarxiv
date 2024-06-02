<template>
    <div class="main-box">
        <div>
            <div>
                <el-button @click="updatePaperVersion()" type="success">更新版本</el-button>
            </div>
            <div class="paper-info">
                <div class="left-area">
            <div>
                <div class="title-style">
                    论文基本信息
                </div>
            </div>
            <div>
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
                <el-input v-model="paper.title" size="large" placeholder="Please input" disabled/>
            </el-form-item>
            
            <el-form-item label="Authors" prop="authors">
                <span>(First names first)</span>
                <el-input v-model="paper.authors" placeholder="Please input" disabled/>
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
        <div class="middle-area">
            <div>
                <div class="title-style">论文分类信息</div>
            </div>
            <div>
                <div>
                    <h3>主要分类</h3>
                </div>
                <div>
                    <p>{{ paperInfo?.primaryCategory?.name }}</p>
                </div>
            </div>
            <div>
                <div>
                    <h3>交叉分类</h3>
                </div>
                <div>
                    <template v-for="(item,i) in paperInfo?.crossCategoryList">
                        <p>{{ item.name }}</p>
                    </template>
                </div>
            </div>
        </div>
        <div class="right-area">
            <div>
                <div class="title-style">论文文件</div>
            </div>
            <div class="file-area">
                <div class="file-info" v-for="(item,i) in retFileList">
                    <div>
                        {{ item.name }}
                    </div>
                    <div>
                        <el-button @click="btnClick(item.cid,item.name)" type="primary" plain>查看</el-button>
                    </div>
                    <div>
                        <el-button @click="removeFile(item.id)" type="danger" plain>删除</el-button>
                    </div>
                </div>
                <div class="upload-file">

                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action=""
                        multiple
                        v-model:file-list="fileList"
                        :auto-upload="false"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                    >
                        <template #trigger>
                            <el-button type="primary">选择文件</el-button>
                        </template>

                          <el-button style="margin-left: 1rem;" class="ml-3" type="success" @click="submitUpload">
                            上传
                        </el-button>  
                        
                        <template #tip>
                            <div class="el-upload__tip">
                                jpg/png files with a size less than 500kb
                            </div>
                        </template>
                    </el-upload>

                </div>
            </div>
        </div>
            </div>
        </div>
        
    </div>
</template>
<script setup>
import { reactive,onMounted,ref } from 'vue'
import { queryPaperInfoById,getFileByPaperId,updateVersion } from "@/api/paper/paper"
import { useRoute,useRouter } from 'vue-router'
import { downloadFile,deleteFile } from '@/api/file/file'
import { saveFiles,updateFileInfo  } from '@/api/file/file'
import { ElMessage,ElMessageBox} from 'element-plus'
import {queryCurrentUser} from '@/api/user/user'

const router = useRouter()
const route = useRoute()

const paperId = ref()

const paperInfo = ref()

const retFileList = ref([])

const fileList = ref([])

const paper = reactive({
    id: null,
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

const userInfo = ref()
onMounted(() => {
    if(route.query.paperId != undefined && route.query.paperId != null){
        paperId.value = route.query.paperId;
    }
    getPaperInfo()
    queryCurrentUser().then((res) => {
        userInfo.value = res.data;
    })
})

function getPaperInfo(){
    queryPaperInfoById({paperId: paperId.value}).then((res) => {
        if(res.code == 200){
            paperInfo.value = res.data

            paper.id = res.data.id
            paper.title = res.data.title
            paper.authors = res.data.authors
            paper.abstracts = res.data.abstracts
            paper.comments = res.data.comments
            paper.reportNumber = res.data.reportNumber
            paper.journalReference = res.data.journalReference
            paper.doi = res.data.doi
            paper.acmClass = res.data.acmClass
            paper.mscClass = res.data.mscClass

            retFileList.value = res.data.fileList

            console.log(res.data)
        }
    })
}

function btnClick(cid,fileName){ 
    downloadFile({cid: cid}).then((res)=>{
        // fileDownload(res, 'xxx.pdf'

        let blob = new Blob([res]
        , {
            type: res['type'],
        }
    ); // 获取请求返回的response对象中的blob 设置文件类型

    let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    // a.click();
    window.open(url);
    window.URL.revokeObjectURL(url); //释放blob对象

     })
}

function removeFile(id){
    deleteFile({id: id}).then((res) => {
        if(res.code == 200){
            getPaperInfo()
            // queryFileByPaper()
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        }
    })
}

function queryFileByPaper(){
    getFileByPaperId({paperId: paperId.value}).then((res) => {
        retFileList.value = res.data;
    })
}




// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用,function(file, fileList)
function handleChange(file, fileList) {
    fileList.value = fileList
}
// 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。function(file, fileList)
function handleRemove(file, fileList) {
    fileList.value = fileList
}

let flag = ref(false)
//上传服务器
function submitUpload() {
    //判断是否有文件再上传
    if (fileList.value.length === 0) {
        ElMessage({
        type: 'warning',
        message: '请选择要上传的文件',
      })
      return
    }
    if(flag == true){
        return;
    }
    flag = true;
    // 下面的代码将创建一个空的FormData对象:
    const formData = new FormData()
    // 你可以使用FormData.append来添加键/值对到表单里面；
    fileList.value.forEach((file) => {
        formData.append('file', file.raw)
    })
    formData.append('paperId',paperId.value)
    // axios({
    //     method: 'post',
    //     url: 'http://localhost:8099/file',
    //     data: formData
    // });
    saveFiles(formData).then((res) => {
        console.log("res",res)
        if(res.code == 200){

            // localStorage.setItem('secondReturnInfo',JSON.stringify(res));
                ElMessage({
                type: 'success',
                message: '文件已上传',
            })
      // 更新已上传文件列表
            // queryFileByPaper()
            getPaperInfo()
            let successData = res.data['successResData']
            console.log("successData",successData)
            callSmartContract(successData)

        }
        
        flag = false
    })
}

function updatePaperVersion(){
    updateVersion(paper).then((res) => {
        if(res.code == 200){

            ElMessageBox.alert('版本更新成功！返回主页', '提示', {
        // if you want to disable its autofocus
       // autofocus: false,
        confirmButtonText: 'OK',
        callback: () => {
          router.replace({
            path:"/user/home",
          })
        },
      })

        }
    })
}


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


import { ERC20contractInstance } from "@/blockchain/constant.js";

async function connectWallet() {
      try {
        // 检查是否存在 window.ethereum 对象
        if (!window.ethereum) {
          alert("Please install the MetaMask plugin to continue the operation");
          return;
        }

        // 尝试请求用户授权
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length === 0) {
          alert("请连接到以太坊网络以继续操作");
        } else {
          // 用户已连接，可以执行其他操作或初始化
          console.log("用户已连接，可以执行其他操作");
        }
      } catch (error) {
        // 处理错误
        console.error("连接钱包时出错:", error);
      }
    }

async function callSmartContract(successData) {
      try {
        connectWallet()
        // 调用智能合约函数
        const functionName = "storeHash";
        // this.userInfo.block_chain_address =
        //   this.userInfo.block_chain_address.toLowerCase();

        // if (
        //   this.userInfo.block_chain_address !== window.ethereum.selectedAddress
        // ) {
        //   this.fileList = [];
        //   this.$message({
        //     message: "Please use the your account_address",
        //     type: "warning",
        //   });
        //   return;
        // }
        console.log(window.ethereum.selectedAddress)
        // const result = await ERC20contractInstance.methods[functionName](

        for(let i = 0;successData.length;i++){
                let fileData = successData[i]
                let hash = userInfo.value.id+ "::" + fileData['md5Hash'] +"::"+ fileData['cid']
                console.log(fileData)
                console.log(fileData['fileName'])
                console.log(hash)

                const functionArgs = [hash];

                 await ERC20contractInstance.methods[functionName](
          ...functionArgs
        ).send({
          from: window.ethereum.selectedAddress,
          gasPrice: "0",
        }).then(result => {

        // 输出结果
        console.log("Transaction result:", result);
        // this.form.block_address = result.blockHash;
        // this.form.paper_transaction_address = result.transactionHash;

        ElMessage({
                type: 'success',
                message: '《'+fileData['fileName']+ '》' + '文件信息已上链',
        })
        console.log(result.transactionHash)
        updateFileInfo({
            md5Hash: fileData['md5Hash'],
            cid: fileData['cid'],
            transactionHash: result.transactionHash
        }).then(res => {
            console.log(res)
        })

        });

            }




      } catch (error) {
        // fileList = [];
        // $message({
        //   message: "Upload to blockchain failed",
        //   type: "error",
        // });
        // // 处理错误
        // console.error("Error:", error);
      }
    }



</script>
<style scoped>
.main-box{
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    /* background-color: aqua; */
}
.paper-info{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    /* background-color: aqua; */
}
.left-area{
    width: 40%;
    height: 1500px;
    /* background-color: beige; */
    padding: 2rem;
}
.middle-area{
    width: 25%;
    height: 1500px;
    /* background-color: brown; */
    padding: 2rem;
}
.right-area{
    width: 35%;
    height: 1500px;
    /* background-color: blueviolet; */
    padding: 2rem;
}
.file-area{
    display: flex;
    flex-direction: column;
    /* background-color: #fff; */
    justify-content: center;
    align-items: center;
}
.file-info{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    margin-top: 1rem;
    /* background-color: aqua; */
}
.upload-file{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    margin-top: 2rem;
}
.title-style{
    background-color: red;
    border: 1px solid rgb(209, 208, 211);
    border-radius: 3px;
    padding: 2px;
    font-size: 1.5rem;
    font-weight:bold;
}

</style>