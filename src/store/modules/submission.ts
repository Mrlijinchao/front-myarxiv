export default {
    namespaced:true,
    state: {
        submission: {
            id: null,
            licenseId: null
        },
        refreshFlag: 0
    },
    getters: {
      getSubmissionInfo(state:any){
        return state.submission
      }
    },
    mutations: {
      SET_SUBMISSION_INFO(state:any,submission:any){
        state.submission = submission;
      },
      SET_SUBMISSION_ID(state:any,id:any){
        state.submission.id = id;
      },
      SET_LICENSE_ID(state:any,id:any){
        state.submission.licenseId = id;
      },
      CHANGE_REFRESH(state:any,flag:any){
        state.refreshFlag = flag;
      },
      RESET_DATA(state:any){
        state.submission = { 
          id: null,
          licenseId: null
      }
      state.refreshFlag = 0
      }
    },
    actions: {
      setSubmissionInfo(context:any,submission:any){
        context.commit('SET_SUBMISSION_INFO',submission)
      },
      setSubmissionId(context:any,id:any){
        context.commit('SET_SUBMISSION_ID',id)
      },
      setLicenseId(context:any,id:any){
        context.commit('SET_LICENSE_ID',id)
      },
      changeRefresh(context:any,flag:any){
        context.commit('CHANGE_REFRESH',flag)
      },
      resetData(context:any){
        context.commit('RESET_DATA')
      }
    },
    modules: {
    }
  }