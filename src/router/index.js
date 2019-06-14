import App from '../App'
import Vue from 'vue'
import Router from 'vue-router'
import { routerMode } from '../config/env'

const index = () => import(/* webpackChunkName: "index" */ '@/page/index')
const dataInfo = () => import(/* webpackChunkName: "dataInfo" */ '@/page/dataInfo')
const projectDetail = () => import(/* webpackChunkName: "projectDetail" */ '@/page/project/projectDetail');
const productDetail = () => import(/* webpackChunkName: "productDetail" */ '@/page/product/productDetail');
const pdf = () =>import(/* webpackChunkName: "PDF" */ '@/components/common/pdf/pdf')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children:[
      	{
      		path:'',
      		redirect:'/index'
      	},
      	{
	    		path:'/index',
		    	name:'index',
		    	component:index,
		    	meta: {
		        keepAlive: false // 需要被缓存
		      }
	    	},
	    	{
	    		path:'/dataInfo',
		    	name:'dataInfo',
		    	component:dataInfo,
		    	meta: {
		        keepAlive: false // 需要被缓存
		      }
        },
        {
          path: '/pdf',
          name: 'pdf',
          component: pdf,
          meta: {
		        keepAlive: false // 需要被缓存
		      }
        },
        {
          path: '/projectDetail',
          name: 'projectDetail',
          component: projectDetail,
          meta: {
		        keepAlive: false // 需要被缓存
		      }
        },
        {
          path: '/productDetail',
          name: 'productDetail',
          component: productDetail,
          meta: {
		        keepAlive: false // 需要被缓存
		      }
        },
        
      ]
    }, 
  ],
  mode:routerMode
})
