<template>
    <div class="main-area">
        <div class="top-area">
            <div class="title-step-area">
                <div class="step-area">
                <div class="step-button">
                    <el-button type="primary" style="margin-top: 12px" @click="last" plain>Last step</el-button>
                </div>
                <div class="step-button">
                    <el-button type="primary" style="margin-top: 12px" @click="next" plain>Next step</el-button>
                </div>
                </div>
                <div class="title-area">
                    <div class="title-bar">
                       <h3>Submission Processing</h3> 
                    </div>
                </div>
            </div>
            <div class="log-area">
                <div>
                    <h3>文件处理日志</h3>
                </div>
                <div class="log-area">
                    <div class="log-area">
                        <div>
                            <h4>成功</h4>
                        </div>
                        <div>
                            <h5 style="color: green;" v-for="(item,i) in successInfo" v-bind:key="i">
                                {{ item }}
                            </h5>
                        </div>
                    </div>
                    <div class="log-area">
                        <div>
                            <h4>失败</h4>
                        </div>
                        <div>
                            <h5 style="color: red;" v-for="(item,i) in errorInfo" v-bind:key="i">
                                {{ item }}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <el-divider />
        <div class="bottom-area">
            <div>
                <h3>查看上传成功的文件</h3>
            </div>
            <div>
                <template v-for="(item,i) in successResData" v-bind:key="i">
                    <!-- <a @click="btnClick(item['cid'])">{{ item['fileName'] }}</a> -->
                    <el-link type="primary" @click="btnClick(item['cid'],item['fileName'])">{{ item['fileName'] }}</el-link><br>
                </template>
                <!-- <el-button @click="btnClick">下载文件</el-button>
                
                <h4>文件</h4>
                <h4>文件</h4>
                <h4>文件</h4> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { downloadFile } from '@/api/file/file'
const router = useRouter()

const secondReturnInfo = ref()

const successInfo = ref()
const successResData = ref()
const errorInfo = ref()

onMounted(() => {
    if(JSON.parse(localStorage.getItem('secondReturnInfo')) != null){
      dataProcessing(JSON.parse(localStorage.getItem('secondReturnInfo')))  
    }
    
})

// 处理数据，把错误消息和正确消息分开
function dataProcessing(res){
    if(res.code == 200){
        successResData.value = res.data['successResData']
        successInfo.value = res.data['success']
        errorInfo.value = res.data['error']
        // console.log(successInfo.value)
        // console.log(errorInfo.value)
    }else{

    }
}

// function download(cid){
//     downloadFile(cid)
// }


function btnClick(cid,fileName){
    // console.log(cid)
    // return;   
    downloadFile({cid: cid}).then((res)=>{
        // fileDownload(res, 'xxx.pdf')
        // fileDownload(res, 'xxx.png')
        console.log(res['type'])
        //   //导出文件名
        //   var filename = '霸道的程序猿';
        //   //创建url
        //   let url = window.URL.createObjectURL(res)
        //   //创建a标签 并设置属性
        //   let link = document.createElement('a')
        //   link.style.display = 'none'
        //   link.href = url
        //   link.setAttribute('download', filename + '.png')
        //   //添加a标签
        //   document.body.appendChild(link)
        //   //执行下载
        //   link.click();
        //   //释放url对象
        //   URL.revokeObjectURL(link.href);
        //   //释放a标签
        //   document.body.removeChild(link);


        let blob = new Blob([res]
        , {
            type: res['type'],
    //   type: ' image/png',
      // type:' image/jpeg',
      // type: "application/vnd.ms-excel",
    }
    ); // 获取请求返回的response对象中的blob 设置文件类型

    let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    // a.click();
    window.open(url);
    window.URL.revokeObjectURL(url); //释放blob对象
        
    
    // const url = window.URL.createObjectURL(
    //     new Blob([res])
    //   );
    //   const link = document.createElement("a");
    //   link.href = url;
    //   // 下载的代码
    //   // link.setAttribute("download", 'test');
    //   // document.body.appendChild(link);
    //   // link.click();
    //   // document.body.removeChild(link);
    //   window.open(url); // 直接打开预览的代码
    //   setTimeout(() => {
    //     this.loading = false;
    //   }, 0.5 * 1000);


     })
}


// 下一步
function next(){
    router.push({
        path:"/submission/fourth",
    })
}
function last(){
    router.push({
        path:"/submission/second",
    })
}
</script>
<style lang="scss" scoped>
.main-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: rgb(102, 255, 0); */
}
.top-area{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    width:100%;
    /* background-color: rgb(255, 0, 195); */
}
.bottom-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
    width: 100%;
    /* background-color: rgb(255, 179, 0); */
}
.log-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
    width: 100%;
}
.step-area{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    // background-color: rgb(0, 174, 255); 
}
.step-button{
    padding-bottom : 10px;
    /* background-color: green; */
}
.title-area{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;
    // background-color: rgb(187, 194, 197); 
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
.title-step-area{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    // background-color: rgb(81, 255, 0);
}
</style>