import { createStore } from 'vuex'
import user from './modules/user'
import submission from './modules/submission'
import paper from './modules/paper'

export default createStore({
  actions: {
    resetAllData(){
      this.dispatch('user/resetData')
      this.dispatch('paper/resetData')
      this.dispatch('submission/resetData')
    }
  },
  modules: {
    user,
    submission,
    paper
  }
})
