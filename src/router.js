import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/book' 
  },
  {
    path:'/book',
    component: () => import('./views/book/index.vue'),
    children:[
      {
        path:':fileName',
        component:() => import('./components/book/BookReader.vue')
      }
    ]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
