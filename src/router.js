//封装路由

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      //name: 'index',
      component: () => import('./views/index'),
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('./views/orderList/Order')
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('./views/my/My')
        }
      ]
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: () => import('./views/my/MyInfo')
    },
    {
      path: '/myRights',
      name: 'myRights',
      component: () => import('./views/my/membership/MyRights')
    },
    {
      path: '/allRights',
      name: 'allRights',
      component: () => import('./views/my/membership/AllRights')
    },
      {
          path: '/aboutRights',
          name: 'aboutRights',
          component: () => import('./views/my/membership/AboutRights')
      },
    {
      path: '/points',
      name: 'points',
      component: () => import('./views/my/PointsDetail')
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: () => import('./views/my/Coupon'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('./views/my/Feedback')
    },
    {
      path: '/invite',
      name: 'invite',
      component: () => import('./views/my/Invite')
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      component: () => import('./views/my/MyAddress'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import('./views/orderList/OrderDetail')
    },
    {
      path: '/oneCheck',
      name: 'oneCheck',
      component: () => import('./views/placeOrder/OrderOneCheck'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: () => import('./views/placeOrder/OrderSuccess')
    },
    {
      path: '/selectModel',
      name: 'selectModel',
      component: () => import('./views/placeOrder/orderProcess/SelectModel'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/selectFault',
      name: 'selectFault',
      component: () => import('./views/placeOrder/orderProcess/SelectFault'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/perfectInfo',
      name: 'perfectInfo',
      component: () => import('./views/placeOrder/orderProcess/PerfectInfo'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/storeLists',
      name: 'storeLists',
      component: () => import('./views/placeOrder/orderProcess/StoreLists'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('./views/placeOrder/orderProcess/Map')
    },
    {
      path: '/upgrade',
      name: 'upgrade',
      component: () => import('./views/placeOrder/Upgrade'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/orderUpgrade',
      name: 'orderUpgrade',
      component: () => import('./views/placeOrder/OrderUpgrade'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register')
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('./views/my/ResetPassword')
    },
    {
      path: '/benefit',
      name: 'benefit',
      component: () => import('./views/others/Benefit')
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () => import('./views/others/Agreement')
    }
  ]
});

router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.userToken ? true : false;
  if(to.path == '/login' || to.path == '/register' || to.path == '/reset'
      || to.path == '/home'  || to.path == '/selectModel' || to.path == '/selectFault'
      || to.path == '/agreement' || to.path == '/oneCheck' || to.path == '/orderSuccess'
      || to.path == '/upgrade' || to.path == '/orderUpgrade'
  ){
      next();
  }else{
      // isLogin ? next() : next('/login');
     isLogin ? next() : Vue.$login(to.path,from.path);
  }
});

export default router;
