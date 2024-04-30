<template>
    <div class="paperInfo">
        <div class="identifier-file">
            <div>
                [{{num}}]
              </div>
            <div>
                <p5><el-link @click="gotoPaperDetail(paper.id)" type="primary">{{ paper.identifier }}</el-link></p5>
            </div>
            <div>
                [
                
                <el-popover placement="right" :width="400" effect="dark" trigger="click">
                    <template #reference>
                        <span>
                           <el-link @click="flag=true" type="primary">pdf</el-link>,<el-link @click="flag=false" type="primary">other</el-link> 
                        </span>
                    </template>
                        <template v-for="(item,i) in paper.fileList" :key="i">
                            <el-link @click="btnClick(item.cid,item.name,false)" v-if="item.suffix == 'pdf' && flag == true" type="primary">{{ item.name }}</el-link><br/>
                            <el-link @click="btnClick(item.cid,item.name,true)" v-if="item.suffix != 'pdf' && flag == false" type="primary">{{ item.name }}</el-link><br/>
                        </template>
                </el-popover>
            ]
                <!-- <el-link type="primary">pdf</el-link>,<el-link type="primary">other</el-link>] -->
            </div>
        </div>
        <div class="paper-detail">
            <div>
                <h3>{{ paper.title }}</h3>
            </div>
            <div>
                <template v-for="(item,i) in paper.authors.split(',')" :key="i">
                    <el-link type="primary">{{ item + "," }}</el-link>
                </template>
            </div>
            <div v-if="abstractShow">
                <p>Abstract: {{ paper?.abstracts }}</p>
            </div>
            <div>
                <template v-if="paper.comments != null || paper.comments != undefined">
                    <p>Comments: {{ paper.comments }}</p>
                </template>
            </div>
            <div>
                Subjects: {{ paper.primaryCategory?.name+"(" + paper.primaryCategory?.code + ");" }}
                <template v-for="(item,i) in paper.crossCategoryList" :key="i">
                    {{ item.name + "(" + item.code + ");" }}
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { downloadFile } from '@/api/file/file'
import {useRouter} from "vue-router";
let router = useRouter();
const flag = ref(true)
const { paper,num,abstractShow } = defineProps(['paper','num','abstractShow'])
 // 获取父组件方法
const emit = defineEmits(["leave"]);

function btnClick(cid,fileName,flag){ 
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
    if(flag){
        a.click(); 
    }else{
        window.open(url);
    }
    // a.click();
    // window.open(url);
    window.URL.revokeObjectURL(url); //释放blob对象
        



     })
}

function gotoPaperDetail(id){
    emit("leave");
    router.push({
        path:"/paper/detail",
        query: {paperId: id}
    })

}

</script>

<style scoped>
.paperInfo{
    display: flex;
    flex-direction: column;
    text-align: left;
    /* border-top: 1px solid rgb(219, 212, 212); */
    border-bottom: 1px solid rgb(219, 212, 212);
    margin-top: 2rem;
    padding: 1rem;
}
.identifier-file{
    display: flex;
    flex-direction: row;
}
.paper-detail{
    margin-left: 2rem;
}
</style>