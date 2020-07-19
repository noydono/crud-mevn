import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import createIdea from '../views/CreateIdea.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/create-idea',
    name:'create-idea',
    component: createIdea
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
