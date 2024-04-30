import axios from "axios";
import serverConfig from "./config";
import JSONBIG from "json-bigint";
// import { useStore } from "vuex";
// let store = useStore()
// import qs from "qs";

const fileType = ["application/pdf","application/msword","application/octet-stream","image/png",
"image/jpeg","text/plain","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
"text/html","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation",
"application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

// 创建 axios 请求实例
const serviceAxios = axios.create({
  baseURL: serverConfig.baseURL, // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
});


// 创建请求拦截
serviceAxios.interceptors.request.use(
  (config) => {
    // 如果开启 token 认证
    if (serverConfig.useTokenAuthorization) {
      config.headers["Authorization"] = sessionStorage.getItem("token"); // 请求头携带 token
      // config.headers["Authorization"] = store.getters['user/getUserToken']
    }
    // 设置请求头
    if(!config.headers["content-type"]) { // 如果没有设置请求头
      // if(config.method === 'post') {
      //   config.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
      //   config.data = qs.stringify(config.data); // 序列化,比如表单数据
      // } else {
        config.headers["content-type"] = "application/json"; // 默认类型
        // console.log('修改请求头')
      // }
    }
    if(config.isFile === '1'){
      config.headers["content-type"] = "multipart/form-data";
      // console.log('进入isFile')
    }
    // console.log("请求配置", config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


// 创建响应拦截
serviceAxios.interceptors.response.use(
  (res) => {
    // // 
    // if (res.headers['content-type'].search('octet-stream') > -1) {
    //   return res.data;
    // }
    // console.log("响应res")
    // console.log(res)
    // let data = res.data;
    // // const json = JSONBIG({
    // //   storeAsString: true
    // // })
    // // const res1 = json.parse(data)
    // // 处理自己的业务逻辑，比如判断 token 是否过期等等
    // // 代码块
    // console.log(res.data)
    return res.data;
  },
  (error) => {
    let message = "";
    if (error && error.response) {
      switch (error.response.status) {
        case 302:
          message = "接口重定向了！";
          break;
        case 400:
          message = "参数不正确！";
          break;
        case 401:
          message = "您未登录，或者登录已经超时，请先登录！";
          break;
        case 403:
          message = "您没有权限操作！";
          break;
        case 404:
          message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          message = "请求超时！";
          break;
        case 409:
          message = "系统已存在相同数据！";
          break;
        case 500:
          message = "服务器内部错误！";
          break;
        case 501:
          message = "服务未实现！";
          break;
        case 502:
          message = "网关错误！";
          break;
        case 503:
          message = "服务不可用！";
          break;
        case 504:
          message = "服务暂时无法访问，请稍后再试！";
          break;
        case 505:
          message = "HTTP 版本不受支持！";
          break;
        default:
          message = "异常问题，请联系管理员！";
          break;
      }
    }
    return Promise.reject(message);
  }
);

// 数据预处理
serviceAxios.defaults.transformResponse = [
  function (data) {
    // 如果返回的数据是文件类型就不需要转换
    // if (data['type'] == 'application/octet-stream') {
    //   return data;
    // }
    // console.log(data)
    // if(fileType.includes(data['type'])){
    //   return data;
    // }
    if(data instanceof Blob){
      return data;
    }
    // console.log(data)
    const json = JSONBIG({
      storeAsString: true
    })
    const res = json.parse(data)
    console.log(res)
    return res
  }
]

export default serviceAxios;
