<template>
    <div class="body-area">
        <div class="info-area">
            <div class="top-area">
                <div class="step-area">
                    <div class="step-button">
                        <div>
                           <el-button type="primary" style="margin-top: 12px" @click="last" plain>Last step</el-button> 
                        </div>
                    </div>
                    <div class="step-button">
                        <el-button type="primary" style="margin-top: 12px" @click="next" plain>Next step</el-button>
                    </div>
                </div>
                <div class="title-area">
                    <div class="title-bar">
                       <h3>Submission Files</h3> 
                    </div>
                </div>
            </div>
            <div class="middle-area">
                <div class="condition-area">
                    <div>
                        <h4>
                            Your submission to the archive must be in one of the fllowing formats (listed inorder of preference):
                        </h4>
                        <h4 style="color: blue">PDF</h4>
                        <h4 style="color: blue">DOCX</h4>
                        <h4 style="color: blue">TXT</h4>
                        <h4 style="color: blue">MD</h4>
                    </div>
                </div>
                <div class="tip-area">
                    <el-card>
                        <div>
                       <h5>➊You can upload all your files at once as a
                        single .tar.gz or .2ip fle, or upload individual files
                        as needed.</h5>
                        <h5>
                            ➊If your submission is (L a)TeX, then you must
                        submit the source (plus necessary macros andfigures), not derlvative dvi, Postscript, or PDF
                        (see Why TeX?). For more information on formats
                        and other submission details see Submission
                        Help.
                        </h5>
                        <h5>
                        ➊TeX source uploaded to arXiv will be made
                        publicly avalable.
                       </h5>
                    </div>
                    </el-card>
                    
                </div>
            </div>
        </div>
        <el-divider/>
        <div class="bottom-area">
            <!-- <div>
                <h3>选择文件</h3>
            </div> -->
            <div>
                <div>
                    <h3>已上传文件</h3>
                </div>
                <template v-for="(item,i) in existFileList" v-bind:key="i">
                    <el-link type="primary" @click="btnClick(item.cid,item.name)">{{ item.name }}</el-link><br>
                </template>
            </div>
            <div>
                <h3>选择文件</h3>
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action=""
                    drag
                    multiple
                    v-model:file-list="fileList"
                    :auto-upload="false"
                    :on-change="handleChange"
                    :on-remove="handleRemove"
                >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            Drop file here or <em>click to select</em>
                        </div>
                <template #tip>
                    <div class="el-upload__tip">
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    </div>
                </template>
                </el-upload>
                <div v-show="progressFlag">
                    <el-progress
                    :text-inside="true"
                    :stroke-width="14"
                    :percentage="progressPercent"
                ></el-progress>
      </div>
            </div>
        </div>
    </div>
    
</template>
<script setup>
import { useRouter } from 'vue-router'
import { UploadFilled } from '@element-plus/icons-vue'
import { ref,onMounted } from 'vue'
import { ElMessage} from 'element-plus'
import { saveFiles } from '@/api/file/file'
import { getFileBySubmission } from '@/api/paper/paper'
import { useStore } from "vuex";
import { downloadFile } from '@/api/file/file'
let store = useStore();
const router = useRouter()

const fileList = ref([])

const submissionId = ref(0)

const progressPercent = ref(0)

const progressFlag = ref(false)

const existFileList = ref([])


onMounted(() => {
    submissionId.value = store.getters['submission/getSubmissionInfo'].id
    // 根据submissionId查询已经上传的文件
    queryExistFile()
})

// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用,function(file, fileList)
function handleChange(file, fileList) {
    fileList.value = fileList
}
// 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。function(file, fileList)
function handleRemove(file, fileList) {
    fileList.value = fileList
}
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


    const config = {
        onUploadProgress: (progressEvent) => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          progressPercent.value = Number(
            ((progressEvent.loaded / progressEvent.total) * 90).toFixed(2)
          );
        },
      };
      progressFlag.value = true

    // 下面的代码将创建一个空的FormData对象:
    const formData = new FormData()
    // 你可以使用FormData.append来添加键/值对到表单里面；
    fileList.value.forEach((file) => {
        formData.append('file', file.raw)
    })
    formData.append('submissionId',submissionId.value)
    // axios({
    //     method: 'post',
    //     url: 'http://localhost:8099/file',
    //     data: formData
    // });
    saveFiles(formData,config).then((res) => {
        console.log(res)

        progressPercent.value = 100;
        progressFlag.value = false

        localStorage.setItem('secondReturnInfo',JSON.stringify(res));
        ElMessage({
        type: 'success',
        message: '文件已上传',
      })
      // 更新已上传文件列表
      queryExistFile()
    })

    // 添加自定义参数，不传可删除
    // formData.append('parentId', '49')
    // formData.append('uploadType', '备料单')
    // formData.append('versions', 'v4.0')
 
    // alert(fileList.value.length)

    //自定义的接口也可以用ajax或者自己封装的接口
                // request({
                //     method: 'POST',
                //     url: '/uploadFile',   //填写自己的接口
                //     data: formData        //填写包装好的formData对象
                // }).then(res => {
                //     if (res.data.code == 200) {
                //         this.$message.success('上传成功');
                //     } else {
                //         this.$message.error('上传失败');
                //     }
                //     //清空fileList
                //     this.fileList = []
                // })
}

// 查询已存在的文件
function queryExistFile(){
    console.log(submissionId.value)
    getFileBySubmission({submissionId: submissionId.value}).then((res) => {
        if(res.code == 200){
          existFileList.value = res.data  
        } 
        console.log('结束')
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


// 下一步
function next(){
    if(existFileList.value.length == 0){
        localStorage.removeItem('secondReturnInfo');
    }
    router.push({
        path:"/submission/third",
    })
}
function last(){
    router.push({
        path:"/submission/first",
    })
}
</script>
<style lang="scss" scoped>
.body-area{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    height: 100%;
    width: 100%;
    /* background-color: rgb(179, 255, 0); */
}
.info-area{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    height: 100%;
    width: 100%;
    /* background-color: rgb(255, 166, 0); */
}
.top-area{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items:left;
    width: 100%;
    /* background-color: rgb(0, 255, 174); */
}
.step-area{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    /* background-color: rgb(0, 174, 255); */
}
.title-area{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
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
.middle-area{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items:center;
    height: 100%;
    width: 100%;
    /* background-color: rgb(221, 0, 255); */
}
.condition-area{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    text-align: left;
    /* background-color: rgb(255, 0, 68); */
}
.tip-area{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    text-align: left;
    /* background-color: rgb(0, 255, 0); */
}
.bottom-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    height: 100%;
    width: 100%;
}
.step-button{
    padding-bottom : 10px;
    /* background-color: green; */
}
</style>