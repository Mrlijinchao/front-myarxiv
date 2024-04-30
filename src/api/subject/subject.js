import serviceAxios from "../utils/request.js";

// 获取学科及其分类
export const getSubjectCategory = (params) => {
    return serviceAxios({
      url: "/subject/query",
      method: "get",
      params
    });
  };

export const getAttribute = (params) => {
    return serviceAxios({
      url: "/attr/query",
      method: "get",
      params
    });
};

// 获取categoryValue
export const queryCategoryValue = (params) => {
  return serviceAxios({
    url: "/category/queryCategoryValue",
    method: "get",
    params
  });
};

// 获取学科列表
export const querySubjectList = (params) => {
  return serviceAxios({
    url: "/subject",
    method: "get",
    params
  });
};

  
