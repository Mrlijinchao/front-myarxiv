import serviceAxios from "../utils/request.js";

// 发送邮件
export const sendEmail = (data) => {
    return serviceAxios({
      url: "/email/sendEmail",
      method: "post",
      data
    });
  };