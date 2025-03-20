import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import AddrList from '../pages/shop-address/list'
import AddrAdd from '../pages/shop-address/addOrUpdate'
import Order from '../pages/shop-order/list'
import OrderConfirm from '../pages/shop-order/confirm'
import Cart from '../pages/shop-cart/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import zixunleixingList from '../pages/zixunleixing/list'
import zixunleixingDetail from '../pages/zixunleixing/detail'
import zixunleixingAdd from '../pages/zixunleixing/add'
import zixunxinxiList from '../pages/zixunxinxi/list'
import zixunxinxiDetail from '../pages/zixunxinxi/detail'
import zixunxinxiAdd from '../pages/zixunxinxi/add'
import dianyingleixingList from '../pages/dianyingleixing/list'
import dianyingleixingDetail from '../pages/dianyingleixing/detail'
import dianyingleixingAdd from '../pages/dianyingleixing/add'
import dianyingxinxiList from '../pages/dianyingxinxi/list'
import dianyingxinxiDetail from '../pages/dianyingxinxi/detail'
import dianyingxinxiAdd from '../pages/dianyingxinxi/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'storeup',
					component: Storeup
				},
                {
                    path: 'shop-address/list',
                    component: AddrList
                },
                {
                    path: 'shop-address/addOrUpdate',
                    component: AddrAdd
                },
				{
					path: 'shop-order/order',
					component: Order
				},
				{
					path: 'cart',
					component: Cart
				},
				{
					path: 'shop-order/orderConfirm',
					component: OrderConfirm
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'zixunleixing',
					component: zixunleixingList
				},
				{
					path: 'zixunleixingDetail',
					component: zixunleixingDetail
				},
				{
					path: 'zixunleixingAdd',
					component: zixunleixingAdd
				},
				{
					path: 'zixunxinxi',
					component: zixunxinxiList
				},
				{
					path: 'zixunxinxiDetail',
					component: zixunxinxiDetail
				},
				{
					path: 'zixunxinxiAdd',
					component: zixunxinxiAdd
				},
				{
					path: 'dianyingleixing',
					component: dianyingleixingList
				},
				{
					path: 'dianyingleixingDetail',
					component: dianyingleixingDetail
				},
				{
					path: 'dianyingleixingAdd',
					component: dianyingleixingAdd
				},
				{
					path: 'dianyingxinxi',
					component: dianyingxinxiList
				},
				{
					path: 'dianyingxinxiDetail',
					component: dianyingxinxiDetail
				},
				{
					path: 'dianyingxinxiAdd',
					component: dianyingxinxiAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
