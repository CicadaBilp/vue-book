import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/store' 
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
  },
  {
    path:'/store',
    component:() => import ('./views/store/index.vue') ,
    redirect:'./store/home',
    children:[
      {
        path:'home',
        component:() => import ('./views/store/StoreHome.vue')
      }
    ] 
  }
  
]

const router = new VueRouter({
  routes
})

export default router
