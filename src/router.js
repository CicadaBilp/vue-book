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
    redirect:'./store/shelf',
    children:[
      {
        path:'home',
        component:() => import ('./views/store/StoreHome.vue')
      },
      {
        path:'list',
        component:() => import ('./views/store/StoreList.vue')
      },
      {
        path:'detail',
        component:() => import ('./views/store/StoreDetail.vue')
      },
      {
        path:'shelf',
        component:() => import ('./views/store/StoreShelf.vue')
      },
      {
        path:'category',
        component:() => import ('./views/store/StoreCategory.vue')
      },
      {
        path:'speaking',
        component:() => import ('./views/store/StoreSpeaking.vue')
      }
    ] 
  }
  
]

const router = new VueRouter({
  routes
})

export default router
