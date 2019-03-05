<template>
  <div id="app">
    <router-view/>
		<Nav v-if="navs"/>
  </div>
</template>

<script>
import Nav from './components/Nav';
export default {
  name: 'App',
	components: {
		//组件名:引入名
		'Nav':Nav
	},
	data(){
		return {
			navs:true
		}
	},
	beforeMount(){//挂载前状态,使用mounted也行
		let ThisPagex=this.$route.path;
		if (ThisPagex === '/cinema' || ThisPagex === '/mine' || ThisPagex === '/movie/nowplay'|| ThisPagex === '/movie/nextplay') {
			this.navs = true;
		} else {
			this.navs = false;
		}
	},
	watch: { // 监听路由变化
		$route (to, from) {
			let ThisPage = to.name;
			if (ThisPage === 'cinema' || ThisPage === 'mine' || ThisPage === 'nowplay'|| ThisPage === 'nextplay') {
				this.navs = true;
			} else {
				this.navs = false;
			}
		}
	} 
	
}
</script>

<style lang="scss">
#app{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction:column;
	justify-content:space-between
}
.navtitle{
	width: 100%;
	height: .44rem;
	font-size: .16rem;
	position: relative;
	color: #191a1b;
	background: #fff;
	i{
		font-size: .24rem;
	}
	.lf{
		position: absolute;
		top:50%;
		left: .15rem;
		transform: translateY(-50%);
	}
	.lr{
		position: absolute;
		top:50%;
		right: .15rem;
		transform: translateY(-50%);
	}
	.center{
		position: absolute;
		font-size: .17rem;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	
}
::-webkit-scrollbar {/*隐藏滚轮*/
	display: none;
}
</style>
