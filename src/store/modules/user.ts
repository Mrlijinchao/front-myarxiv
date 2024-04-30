export default {
    namespaced:true,
    state: {
      userToken: null,
        user: { 
          id: null,
          code: null,
          name: null,
          email: null,
          password: null,
          country: null,
          organization: null,
          careerStatus: null,
          subjectId: null,
          categoryId: null,
          homePage: null,
          identityCode: null,
          gender: null,
          phone: null,
          education: null,
          school: null,
          remark: null,
          description: null,
          statusCd: null,
          updateStaff: null,
          updateDate: null,
          createStaff: null,
          createDate: null,
          isDeleted: null
        },
        refreshFlag: false
    },
    getters: {
      getUserInfo(state:any){
        return state.user
      },
      getUserToken(state:any){
        return state.userToken
      },
      getRefreshCode(state:any){
        return state.refreshFlag;
      }
    },
    mutations: {
      SET_USER_INFO(state:any,user:any){
        state.user = user;
      },
      SET_USER_EMAIL(state:any,email:any){
        state.user.userEmail = email
      },
      CHANGE_REFRESH(state:any,flag:any){
        state.refreshFlag = flag;
      },
      SET_USER_TOKEN(state:any,token:any){
        state.userToken = token
      },
      RESET_DATA(state:any){
        state.user = { 
          id: null,
          code: null,
          name: null,
          email: null,
          password: null,
          country: null,
          organization: null,
          careerStatus: null,
          subjectId: null,
          categoryId: null,
          homePage: null,
          identityCode: null,
          gender: null,
          phone: null,
          education: null,
          school: null,
          remark: null,
          description: null,
          statusCd: null,
          updateStaff: null,
          updateDate: null,
          createStaff: null,
          createDate: null,
          isDeleted: null
      }
      state.refreshFlag = 0
      }
    },
    actions: {
      setUserInfo(context:any,user:any){
        context.commit('SET_USER_INFO',user)
      },
      setUserEmail(context:any,email:any){
        context.commit('SET_USER_EMAIL',email)
      },
      changeRefresh(context:any,flag:any){
        context.commit('CHANGE_REFRESH',flag)
      },
      setUserToken(context:any,token:any){
        context.commit('SET_USER_TOKEN',token)
      },
      resetData(context:any){
        context.commit('RESET_DATA')
      }
    },
    modules: {
    }
  }
  