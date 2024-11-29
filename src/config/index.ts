import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/gasoline',
      name: 'gasoline',
      component: () => import('@/components/gasoline/GasolineView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/about/AboutView.vue'),
    },
  ],
})

export default router
