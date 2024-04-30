<template>
    <div class="main-box">
        <div class="paper-box">
            <div class="left-box">
                <div class="paper-top-box">
                    <div class="cate-box">
                        <h4>{{ paperInfo?.subject?.name }} > {{ paperInfo?.primaryCategory?.name }}</h4>
                    </div>
                    <div class="date-box">
                      <h6>[Submitted on {{ moment(paperInfo?.updateDate).format('YYYY-MM-DD') }}]</h6>  
                    </div>
                </div>
                <div class="paper-info-box">
                    <div class="title-author-abstract-box">
                        <div>
                            <h1>{{ paperInfo?.title }}</h1>
                        </div>
                        <div>
                            <template v-for="(item,i) in paperInfo?.authors?.split(',')" :key="i">
                                <el-link type="primary">{{ item + "," }}</el-link>
                            </template>
                        </div>
                        <div>
                            <p>
                                {{ paperInfo?.abstracts }}
                            </p>
                        </div>
                    </div>
                    <div class="detail-paper-info">
                        <div v-if="paperInfo?.comments != undefined || paperInfo?.comments != null" style="margin-top: 4px;">
                            Comments:	{{ paperInfo?.comments }}
                        </div>
                        <div style="margin-top: 4px;">
                            Subjects: {{ paperInfo?.primaryCategory?.name+"(" + paperInfo?.primaryCategory?.code + ");" }}
                                <template v-for="(item,i) in paperInfo?.crossCategoryList" :key="i">
                                    {{ item.name + "(" + item.code + ");" }}
                                </template>
                        </div>
                        <div class="cite-as">
                            <div style="margin-top: 3px;">
                                <span>Cite as: </span>
                            </div>
                            <div>
                                <div style="margin-top: 3px;">
                                    <span>{{ paperInfo?.identifier }} [{{ paperInfo?.primaryCategory?.code }}]</span>  
                                </div>
                            <div style="margin-top: 3px;">
                                <span>	(or {{paperInfo?.identifier + " "}}v{{ paperInfo?.version }} [{{ paperInfo?.primaryCategory?.code }}] for this version)</span>
                            </div>
                            <div style="margin-top: 3px;">
                                <span>https://doi.org/10.48550/arXiv.2404.16035</span>
                            </div>
                            </div>

                        </div>
                    </div>
                    <div class="paper-version">
                        <span style="margin-top: 4x;">Submission history</span>
                        <span style="margin-top: 4x;">From: {{ paperInfo?.authors }} [<el-link type="primary">view email</el-link>]</span>
                        <!-- <span style="margin-top: 4x;">[v{{ paperInfo?.version }}] {{ moment(paperInfo?.createDate).format('YYYY-MM-DD') }}</span> -->
                        <template v-for="(item,i) in paperVersionList" :key="i">
                            <span style="margin-top: 4x;"><el-link @click="gotoVersion(item.id)" type="primary">[v{{ item.version }}] {{ moment(item.createDate).format('YYYY-MM-DD') }}</el-link></span>
                        </template>
                    </div>
                </div>
            </div>
            <div class="right-box">
                <div class="handle-box">
                    <div>
                        <h1>Access Paper:</h1>
                    </div>
                    <div class="view-file">
                        <template v-for="(item,i) in paperInfo?.fileList" :key="i">
                           <el-link @click="btnClick(item.cid,item.name)" type="primary">{{ item.name }}</el-link> 
                        </template>
                        <!-- <el-link type="primary">HTML (experimental)</el-link>
                        <el-link type="primary">TeX Source</el-link>
                        <el-link type="primary">Other Formats</el-link> -->
                    </div>
                    <div>
                        <el-link type="primary">View License</el-link>
                    </div>
                </div>
                <div class="handle-box">
                    <div>
                        <p>Current browse context:</p>
                        <h6>cs.CV</h6>
                    </div>
                    <div class="prev-next">
                        <div>
                          <el-link type="primary">prev</el-link>  
                        </div>
                        <div>
                            <el-link type="primary">next</el-link> 
                        </div>
                       
                    </div>
                    <!-- <div>
                        <p>Change to browse by:</p>
                    </div> -->
                </div>
                <div class="ref-citation">
                    <div>
                        <h3>References & Citations</h3>
                    </div>
                    <div class="ref-list">
                        <el-link type="primary">NASA ADS</el-link>
                        <el-link type="primary">Google Scholar</el-link>
                        <el-link type="primary">Semantic Scholar</el-link>
                    </div>
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import { queryPaperInfoById,getPaperVersionAll } from "@/api/paper/paper"
import { useRouter,useRoute } from 'vue-router'
import { downloadFile } from '@/api/file/file'
import moment from 'moment'
const router = useRouter()
const route = useRoute()

const paperId = ref()

const paperInfo = ref()

const paperVersionList = ref()

onMounted(() => {
    if(route.query.paperId != undefined && route.query.paperId != null){
        paperId.value = route.query.paperId;
    }
    getPaperInfo()
    getPaperVersion()
})

function getPaperInfo(){
    queryPaperInfoById({paperId: paperId.value}).then((res) => {
        if(res.code == 200){
            paperInfo.value = res.data
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

function getPaperVersion(){
    getPaperVersionAll({paperId: paperId.value}).then((res) => {
        if(res.code == 200){
            paperVersionList.value = res.data;
        }
    })
}

function gotoVersion(id){
    paperId.value = id;
    getPaperInfo()
}

</script>
<style scoped>
.paper-box{
    display: flex;
    justify-content: center;
    align-items: center;
}
.left-box{
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: center; */
    width: 80%;
    text-align: left;
    margin-right: 2rem;
}
.right-box{
    display: flex;
    flex-direction: column;
    width: 20%;
    /* text-align: left; */
    /* border-style:solid;
	border-width:medium; */
    border:4px solid rgb(126, 124, 124);
    border-radius: 3px;
    outline:rgb(55, 55, 55) dotted thick;
    padding: 2rem 2rem;
}
.paper-top-box{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    /* background-color: aquamarine; */
    margin-right: auto;
    width: 100%;
}
.cate-box{
    display: flex;
    background-color: aliceblue;
    text-align: left;
}
.detail-paper-info{
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
}
.paper-version{
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
}
.view-file{
    display: flex;
    flex-direction: column;
    /* background-color: aqua; */
    text-align: left;
}
.prev-next{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.ref-citation{
    display: flex;
    flex-direction: column;
}
.ref-list{
    display: flex;
    flex-direction: column;
}
.cite-as{
    display: flex;

}
.handle-box{
    border-bottom: 2px solid;
    padding: 5px;
}
</style>