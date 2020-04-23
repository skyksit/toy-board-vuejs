import Vue from "vue";
import VueRouter from "vue-router";

//Views
const Home = () => import('@/views/main/Home');
const BoardMain = () => import('@/views/board/Main');
const Login = () => import('@/views/user/Login');
const Join = () => import('@/views/user/Join');
const ModifyUser = () => import('@/views/user/Modify');

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
    redirect: '/user/login',
    name: 'User',
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
        path: 'modifyuser',
        name: 'ModifyUser',
        component: ModifyUser
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;