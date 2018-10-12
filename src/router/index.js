import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage';
import StorePage from '../pages/StorePage';
import FindPage from '../pages/FindPage';
import OrderPage from '../pages/OrderPage';
import MySelfPage from '../pages/MyselfPage';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path:'/store/:id',
      component:StorePage
    },
    {
      path:'/find',
      component:FindPage
    },
    {
      path:'/order',
      component:OrderPage
    },
    {
      path:'/myself',
      component:MySelfPage
    }
  ]
})


