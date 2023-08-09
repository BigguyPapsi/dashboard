import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue';

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
    path: '/user/edit',
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
    path: '/product/edit',
    name: 'productEdit',
    component: () => import('../components/ProductEdit.vue'),
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue'),
  },

 {
    path: '/history',
    name: 'history',
    component: () => import('../views/Histories.vue'),
  },
  {
    path: '/ingredients',
    name: 'ingredients',
    component: () => import('../views/Ingredients.vue'),
  },
  {
    path: '/report/income',
    name: 'report_income',
    component: () => import('../views/Income.vue'),
  },

  {
    path: '/report/expenses',
    name: 'report_expenses',
    component: () => import('../views/Expenses.vue'),
  },

  {
    path: '/report/best_seller',
    name: 'report_best_seller',
    component: () => import('../views/Bestseller.vue'),
  },

  {
    path: '/report/unsaleable',
    name: 'report_unsaleable',
    component: () => import('../views/Unsaleable.vue'),
  },


  {
    path: '*',
    component: NotFound
  },









  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router
