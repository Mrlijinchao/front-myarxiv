import serviceAxios from "../utils/request.js";

// 上传文件
export const saveFiles = (data,config) => {
    // @ts-ignore
    return serviceAxios({
      url: "http://localhost:8099/file",
      method: "post",
      // 如果是文件就把请求头设置为 multipart/form-data
      isFile: '1',
      data,
      config
    });
  };

  // 下载文件
  export const downloadFile = (params) => {
    return serviceAxios({
      url: "http://127.0.0.1:8099/file/new",
      method: "get",
      responseType: 'blob',
      params
    });
  };

// 删除文件
export const deleteFile = (data) => {
  return serviceAxios({
    url: "http://127.0.0.1:8099/file",
    method: "delete",
    data
  });
}

