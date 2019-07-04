import home from './views/home.js'
import result from './views/result.js'

const router = new VueRouter({
  routes:[
    {
      path: '/',
      redirect: '/home',
    },
    { 
      path: '/home',
      name: 'home',
      component:home
    },
    { 
      path: '/result',
      name: 'result',
      component:result
    },
    {
      path: '*',
      redirect: {name:'home'},
    }
  ]
})
export default router