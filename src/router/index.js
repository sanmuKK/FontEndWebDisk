import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import LoginCard from '@/components/Login/LoginCard'
import RegisterCard from '@/components/Login/RegisterCard'
import Catalog from '@/components/Home/Catalog'
import File from '@/components/Home/File'
import AdminLoginCard from '@/components/Login/AdminLoginCard'
import AdminHome from '@/components/Home/AdminHome'


Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'toHome',
      redirect: '/home/catalog',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
          path: '/home/catalog',
          name: 'Catalog',
          component: Catalog,
        },
        {
          path: '/home/file',
          name: 'File',
          component: File,
        },
        {
          path: '/home/admin',
          name: 'AdminHome',
          component: AdminHome,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginCard
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterCard
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: AdminLoginCard
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/admin/login') {
    next();
  } else {
    const token = localStorage.getItem('token');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;