import serviceAxios from "../utils/request.js";

// 获取主页信息
export const getHomeInfo = (params) => {
  return serviceAxios({
    url: "http://43.139.8.186:8088/home/getHomeInfo",
    // url: "/home/getHomeInfo",
    method: "get",
    params,
  });
};

// 获取论文信息
export const getPaperInfoById = (params) => {
  return serviceAxios({
    url: "http://43.139.8.186:8088/home/getPapers",
    // url: "/home/getPapers",
    method: "get",
    params,
  });
};

// 获取license信息
export const getLicense = (params) => {
  return serviceAxios({
    url: "/paper/license",
    method: "get",
    params,
  });
};

// 背书
export const endorsement = (data) => {
  return serviceAxios({
    url: "/auth/endorsement",
    method: "post",
    data
  });
};

// 论文提交第一步
export const firstStep = (data) => {
  return serviceAxios({
    url: "/submit/first",
    method: "post",
    data
  });
};

// 论文提交第四步
export const fourthStep = (data) => {
  return serviceAxios({
    url: "/submit/fourth",
    method: "post",
    data
  });
};

// 上传文件
export const uploadFile = (data) => {
  return serviceAxios({
    url: "/",
    method: "post",
    data
  });
}

// 获取一个submission对应的文件
export const getFileBySubmission = (params) => {
  return serviceAxios({
    url: "/submit/getExistFile",
    method: "get",
    params,
  });
};

// 查询提交信息
export const getSubmissionInfo = (params) => {
  return serviceAxios({
    url: "/submit/getSubmissionInfo",
    method: "get",
    params,
  });
};

// 根据submissionId查询论文信息
export const getPaperBySUbmission = (params) => {
  return serviceAxios({
    url: "/paper/getBySubmission",
    method: "get",
    params,
  });
};

// 最后提交论文
export const submitPaper = (data) => {
  return serviceAxios({
    url: "/submit",
    method: "post",
    data
  });
}

// 查询未完成或者已完成提交的论文（未审核）
export const queryUnpublished = (params) => {
  return serviceAxios({
    url: "/submit/unpublished",
    method: "get",
    params,
  });
};

// 查询已经审核通过的论文
export const queryPublished = (params) => {
  return serviceAxios({
    url: "/paper/publishedPaper",
    method: "get",
    params,
  });
};

// 根据id获取论文
export const queryPaperInfoById = (params) => {
  return serviceAxios({
    url: "/paper/queryPaperInfoById",
    method: "get",
    params,
  });
};

// 根据id分页查询论文
export const queryPaperByPage = (params) => {
  return serviceAxios({
    url: "/paper/getPaperByPage",
    method: "get",
    params,
  });
};


// 获取一个submission对应的文件
export const getFileByPaperId = (params) => {
  return serviceAxios({
    url: "/paper/queryFileByPaperId",
    method: "get",
    params,
  });
};

// 更新论文版本
export const updateVersion = (data) => {
  return serviceAxios({
    url: "/paper/updateVersion",
    method: "post",
    data
  });
}

// 获取一个论文的所有版本
export const getPaperVersionAll = (params) => {
  return serviceAxios({
    url: "/paper/queryPaperVersionAll",
    method: "get",
    params,
  });
};

// 多条件分页查询论文
export const queryPaperPageByMultipleCondition = (params) => {
  return serviceAxios({
    url: "/paper/queryPaperByCondition",
    method: "get",
    params,
  });
};

// 删除提交
export const removeSubmission = (data) => {
  return serviceAxios({
    url: "/submit/removeSubmission",
    method: "delete",
    data,
  });
};

// 撤销提交
export const unSubmit = (data) => {
  return serviceAxios({
    url: "/submit/unSubmit",
    method: "put",
    data,
  });
};
