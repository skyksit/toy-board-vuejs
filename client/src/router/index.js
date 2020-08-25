import Vue from "vue";
import VueRouter from "vue-router";
import { getUser } from "../utils/auth";

//Views
const Home = () => import('@/views/main/Home');
const Login = () => import('@/views/user/Login');
const Join = () => import('@/views/user/Join');
const UserModify = () => import('@/views/user/Modify');

const BoardMain = () => import('@/views/board/BoardMain');
const BoardView = () => import('@/views/board/BoardView');
const BoardModify = () => import('@/views/board/BoardModify');
const BoardWrite = () => import('@/views/board/BoardWrite');

//Pages-Error
const Page404 = () => import('@/views/pages/Page404');
const Page500 = () => import('@/views/pages/Page500');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board',
    name: 'BoardMain',
    component: BoardMain
  },
  {
    path: '/boardview',
    name: 'BoardView',
    component: BoardView
  },
  {
    path: '/boardmodify',
    name: 'BoardModify',
    component: BoardModify
  },
  {
    path: '/boarddelete',
    beforeEnter(to, from, next) {
      alert('삭제되었습니다');
      next('/board');
    }
  },
  {
    path: '/boardwrite',
    name: 'BoardWrite',
    component: BoardWrite
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: Page404
      },
      {
        path: '500',
        name: 'Page500',
        component: Page500
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/user/login',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'join',
        name: 'Join',
        component: Join
      },
      {
        path: 'modify',
        name: 'UserModify',
        component: UserModify,
        meta: { requriresAuth: true }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 })
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requriresAuth)) {
    const loggedIn = getUser();
    if (!loggedIn) {
      next({
        path: '/user/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;