import serviceAxios from "../utils/request.js";

// 密码登录
export const passwordLogin = (data) => {
    return serviceAxios({
      url: "/auth/doLogin",
      method: "post",
      data
    });
  };
  
// 邮箱登录
export const emailLogin = (data) => {
    return serviceAxios({
      url: "/auth/emailLogin",
      method: "post",
      data
    });
  };

// 用户退出登录
export const userLogout = (data) => {
  return serviceAxios({
    url: "/auth/exit",
    method: "post",
    data
  });
};
  
// 发送邮件
export const sendEmail = (data) => {
    return serviceAxios({
      url: "/email",
      method: "post",
      data
    });
  };


// 检查用户名(账户)是否已存在
export const checkUserAccount = (params) => {
  return serviceAxios({
    url: "/user/checkUserCodeIsExist",
    method: "get",
    params
  });
};

// 注册
export const userRegister = (data) => {
  return serviceAxios({
    url: "/user/register",
    method: "post",
    data
  });
};

// 获取当前用户信息  直接根据token从redis里面获取
export const queryCurrentUser = () => {
  return serviceAxios({
    url: "/user/queryCurrentUser",
    method: "get"
  });
};

// 获取当前用户信息  直接根据token从redis里面获取
export const queryCompletionUser = () => {
  return serviceAxios({
    url: "/user/queryCompletionUser",
    method: "get"
  });
};

export const modifyUserInfo = (data) => {
  return serviceAxios({
    url: "/user/modify",
    method: "put",
    data
  });
};

export const modifyUserPassword = (data) => {
  return serviceAxios({
    url: "/user/modifyPassword",
    method: "put",
    data
  });
};


