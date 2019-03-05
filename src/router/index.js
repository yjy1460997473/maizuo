import Vue from 'vue'
import Router from 'vue-router'
import Movie from '@/view/Movie'
import Cinema from '@/view/Cinema'
import Assemble from '@/view/Assemble'
import Mine from '@/view/Mine'
import City from '@/view/City'
import Login from '@/view/Login'
import User from '@/view/User'
import Search from '@/view/Search'
import Detailed from '@/view/Detailed'
import Cinemafilm from '@/view/Cinemafilm'
import test from '@/view/test'



import Nowplay from '@/components/Nowplay'
import Nextplay from '@/components/Nextplay'
import Movietime from '@/components/Movietime'

Vue.use(Router)

export default new Router({
	//mode: 'history',//添加之后url中#会消失
	/* vue单页因微信分享和自动登录需要，对于URL中存在’#’的地址，处理起来比较坑。
	用history模式就不会存在这样的问题。但是换成history模式，就会有个新的问题，
	就是页面刷新后，页面就无法显示了（404）。 */
	//使用nginx的配置解决
	routes: [
		{
		  path: '/movie',
		  name:'movie',
		  component: Movie,
		  redirect:'/movie/nowplay',
				children: [
					{
						path: 'nowplay',
						name:'nowplay',
						component: Nowplay
					},
					{
						path: 'nextplay',
						name:'nextplay',
						component: Nextplay
					}
				]
		},
		{
			path:"/cinema",
			name: 'cinema',
			component: Cinema
		},
		{
			path:"/assemble",
			name: 'assemble',
			component: Assemble
		},
		{
			path:"/mine",
			name: 'mine',
			component: Mine
		},
		{
			path:"/login",
			name: 'login',
			component: Login
		},
		{
			path:"/user",
			name: 'user',
			component: User
		},
		{
			path:"/city",
			name: 'city',
			component: City
		},
		{
			path:"/search",
			name: 'search',
			component: Search
		},
		{
			path:"/detailed/:filmsid",
			name: 'detailed',
			component: Detailed
		},
		{
			path:"/cinemafilm/:cinfid",
			name: 'cinemafilm',
			component: Cinemafilm,
			children: [
				{
					path: 'movietime/:timeid',
					name:'movietime',
					component:Movietime
				}
			]
		},
		{
			path:"/test",
			name: 'test',
			component: test
		},
		{
			path:"*",
			redirect:'/movie/nowplay'
		}
  ]
})
