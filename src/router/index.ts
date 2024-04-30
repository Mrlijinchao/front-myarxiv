import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/facade/home"
  },
  // {
  //   path: '/home/view',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../layout/indexPage.vue')
  },
  {
    path: '/facade',
    name: 'facade',
    redirect: "/facade/home",
    component: () => import('../layout/LayoutFacade/indexPage.vue'),
    meta: {
      layout: 'facade'
    },
    children: [
      {
        path: '/facade/home',
        name: 'facade/home',
        component: () => import('@/views/Facade/IndexPage.vue'),
      },
      {
        path: '/facade/login',
        name: 'facadeLogin',
        component: () => import('@/views/Login/IndexPage.vue'),
      },
      {
        path: '/facade/register',
        name: 'facadeRegister',
        component: () => import('@/views/Register/IndexPage.vue'),
      },
      {
        path: '/facade/endorsement',
        name: 'endorsement',
        component: () => import('@/views/Endorsement/IndexPage.vue')
      }
    ]
  },
  {
    path: '/user',
    redirect: "/user/home",
    name: 'user',
    component: () => import('../layout/LayoutUser/indexPage.vue'),
    meta: {
      layout: 'user'
    },
    children: [
      {
        path: '/user/home',
        name: 'userHome',
        component: () => import('@/views/User/IndexPage.vue'),
      },
      {
        path: '/user/publish',
        name: 'userPublish',
        component: () => import('@/views/Paper/Published/IndexPage.vue'),
      },
      {
        path: '/user/unpublish',
        name: 'userUnpublish',
        component: () => import('@/views/Paper/Unpublished/IndexPage.vue'),
      }
    ]
  },
  {
    path: '/submission',
    redirect: "/submission/first",
    name: 'submission',
    component: () => import('@/layout/LayoutSubmission/IndexPage.vue'),
    meta: {
      layout: 'submission'
    },
    children: [
      {
        path: '/submission/first',
        name: 'submissionFirst',
        component: () => import('@/views/Submission/FirstStep/IndexPage.vue'),
        meta: {
          keepAlive: true
        },
      },
      {
        path: '/submission/second',
        name: 'submissionSecond',
        component: () => import('@/views/Submission/SecondStep/IndexPage.vue'),
        meta: {
          keepAlive: true
        },
      },
      {
        path: '/submission/third',
        name: 'submissionThird',
        component: () => import('@/views/Submission/ThirdStep/IndexPage.vue'),
        meta: {
          keepAlive: true
        },
      },
      {
        path: '/submission/fourth',
        name: 'submissionFourth',
        component: () => import('@/views/Submission/FourthStep/IndexPage.vue'),
        meta: {
          keepAlive: true
        },
      },
      {
        path: '/submission/fifth',
        name: 'submissionFifth',
        component: () => import('@/views/Submission/FifthStep/IndexPage.vue'),
        meta: {
          keepAlive: true
        },
      },
    ]
  },

  {
    path: '/paper',
    redirect: "/paper/list",
    name: 'paper',
    component: () => import('@/layout/LayoutPaper/indexPage.vue'),
    meta: {
      layout: 'paper'
    },
    children: [
      {
        path: '/paper/list',
        name: 'paperList',
        component: () => import('@/views/Paper/PaperInfo/PaperList/IndexPage.vue'),
      },
      {
        path: '/paper/detail',
        name: 'paperDetail',
        component: () => import('@/views/Paper/PaperInfo/PaperDetails/IndexPage.vue'),
      }
    ]
  },

  {
    path: '/general',
    redirect: "/general/updateVersion",
    name: 'general',
    component: () => import('@/layout/LayoutGeneral/indexPage.vue'),
    meta: {
      layout: 'general'
    },
    children: [
      {
        path: '/general/updateVersion',
        name: 'updateVersion',
        component: () => import('@/views/Paper/UpdateVersion/IndexPage.vue'),
      }
    ]
  },

  {
    path: '/search',
    redirect: "/search/home",
    name: 'search',
    component: () => import('@/layout/LayoutSearch/indexPage.vue'),
    meta: {
      layout: 'search'
    },
    children: [
      {
        path: '/search/home',
        name: 'searchHome',
        component: () => import('@/views/Search/IndexPage.vue'),
      }
    ]
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
