import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Admin from '@/views/Admin.vue';
import Home from '@/views/Home.vue';
import Products from '@/views/Products.vue';
import ShoppingCard from '@/views/ShoppingCard.vue';
import Customer from '@/views/Customer.vue';
import Login from '@/views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    component: Admin,
  },
  {
    path: '/customer',
    component: Customer,
  },
  {
    path: '/shopping-card',
    component: ShoppingCard,
  },
  {
    path: '/products',
    component: Products,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Home,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
