export default {
    namespaced:true,
    state: {
        paper: {
            id: null,
            subjectId: null,
            licenseId: null,
            submissionId: null,
            categoryId: null,
            title: null,
            abstracts: null,
            identifier: null,
            authors: null,
            comments: null,
            acmClass: null,
            mscClass: null,
            reportNumber: null,
            journalReference: null,
            doi: null,
            hash: null,
            version: null,
            usingVersion: null,
            samePaperIdentifier: null,
            auditStatus: null,
            remark: null,
        },
        refreshFlag: 0
    },
    getters: {
      getPaperInfo(state:any){
        return state.paper
      }
    },
    mutations: {
      SET_PAPER_INFO(state:any,paper:any){
        state.paper = paper;
      },
      SET_PAPER_ID(state:any,id:any){
        state.paper.id = id;
      },
      CHANGE_REFRESH(state:any,flag:any){
        state.refreshFlag = flag;
      },
      RESET_DATA(state:any){
        state.paper = { 
            id: null,
            subjectId: null,
            licenseId: null,
            submissionId: null,
            categoryId: null,
            title: null,
            abstracts: null,
            identifier: null,
            authors: null,
            comments: null,
            acmClass: null,
            mscClass: null,
            reportNumber: null,
            journalReference: null,
            doi: null,
            hash: null,
            version: null,
            usingVersion: null,
            samePaperIdentifier: null,
            auditStatus: null,
            remark: null,
      }
      state.refreshFlag = 0
      }
    },
    actions: {
      setPaperInfo(context:any,paper:any){
        context.commit('SET_PAPER_INFO',paper)
      },
      setPaperId(context:any,id:any){
        context.commit('SET_PAPER_ID',id)
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