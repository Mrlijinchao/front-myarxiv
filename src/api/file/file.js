import serviceAxios from "../utils/request.js";

// 上传文件
export const saveFiles = (data) => {
    // @ts-ignore
    return serviceAxios({
      // url: "http://localhost:8099/file",
      url: "http://43.139.8.186:8099/file",
      method: "post",
      // 如果是文件就把请求头设置为 multipart/form-data
      isFile: '1',
      data
    });
  };

  // 下载文件
  export const downloadFile = (params) => {
    return serviceAxios({
      url: "http://43.139.8.186:8099/file/new",
      // url: "http://localhost:8099/file/new",
      method: "get",
      responseType: 'blob',
      params
    });
  };

// 删除文件
export const deleteFile = (data) => {
  return serviceAxios({
    // url: "http://localhost:8099/file",
    url: "http://43.139.8.186:8099/file",
    method: "delete",
    data
  });
}

// 更新文件信息
export const updateFileInfo = (data) => {
  return serviceAxios({
    url: "/submit/updateFileInfo",
    // url: "http://43.139.8.186:8099/file",
    method: "put",
    data
  });
}

