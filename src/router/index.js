import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/Dashboard'),
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserInfo.vue'),
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },
  {
    path: '/user/create',
    name: 'userCreate',
    component: () => import('../components/UserCreate.vue'),
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },
  {
    path: '/user/edit/:id',
    name: 'userEdit',
    component: () => import('../components/UserEdit.vue'),
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/ProductInfo.vue'),
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },

  {
    path: '/product/create',
    name: 'productCreate',
    component: () => import('../components/ProductCreate.vue'),
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },
  {
    path: '/product_tpye/create',
    name: 'productType',
    component: () => import('../components/ProductTypeCreate.vue'),
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !token) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router
