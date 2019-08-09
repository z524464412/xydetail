import App from '../App'
import Vue from 'vue'
import Router from 'vue-router'
import { routerMode } from '../config/env'

import sweepCode from "@/page/sweepCode";
import harmful from "@/page/harmful/harmful";
import certificate from "@/page/certificate/certificate";
import video from "@/page/video/video";
import example from "@/page/example/example"
import article from "@/page/article/article"
import knowledge from '@/page/knowledge/knowledge'

const index = () => import(/* webpackChunkName: "index" */ '@/page/index')
const dataInfo = () => import(/* webpackChunkName: "dataInfo" */ '@/page/dataInfo')
const projectDetail = () => import(/* webpackChunkName: "projectDetail" */ '@/page/project/projectDetail');
const productDetail = () => import(/* webpackChunkName: "productDetail" */ '@/page/product/productDetail');
const pdf = () =>import(/* webpackChunkName: "PDF" */ '@/components/common/pdf/pdf')
const vrIndex = () =>import(/* webpackChunkName: "vrIndex" */ '@/page/vrIndex')
const vr = () =>import(/* webpackChunkName: "vr" */ '@/page/vr')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children:[
      	{
      		path:'',
      		redirect:'/sweepCode'
      	},
      	{
	    		path:'/sweepCode',
		    	name:'sweepCode',
		    	component:sweepCode,
		    	meta: {
		        keepAlive: false // 需要被缓存
		      }
	    	},
        {
          path:'/harmful',
          name:'harmful',
          component:harmful,
          meta: {
            keepAlive: false // 需要被缓存
          }
        },
        {
          path:'/certificate',
          name:'certificate',
          component:certificate,
          meta: {
            keepAlive: false // 需要被缓存
          }
        },
        {
          path:'/video',
          name:'video',
          component:video,
          meta: {
            keepAlive: false // 需要被缓存
          }
        },
        {
          path:"/example",
          name:'example',
          component:example,
          meta:{
            keepAlive: false // 需要被缓存
          }
        },
        {
          path:"/article",
          name:'productArticle',
          component:article,
          meta:{
            keepAlive: false // 需要被缓存
          }
        },
        {
          path:"/knowledge",
          name:'knowledge',
          component:knowledge,
          meta:{
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
        {
          path: '/vrIndex',
          name: 'vrIndex',
          component: vrIndex,
          meta: {
            keepAlive: false // 需要被缓存
          }
        },
        {
          path: '/vr',
          name: 'vr',
          component: vr,
          meta: {
            keepAlive: false // 需要被缓存
          }
        }
      ]
    },
  ],
  mode:routerMode
})
