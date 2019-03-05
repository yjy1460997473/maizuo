<template>
	<div class="movie" @scroll="scrollEvent">
		<div class="moviehead" v-if="xi">
			<div class="navtitle">
				<span class="lf">
					{{this.$store.state.citymovie}}
					<i class="iconfont icon-xiajiantou"></i>
				</span>
				<span class="center">{{title}}</span>
			</div>
		</div>
		<div :style="{position: 'relative'}">
			<Banner ref="banner"/>
			<router-link tag="div" class="city" to="/city">
				<span>{{ this.$store.state.citymovie }}</span>
				<i class="iconfont icon-ico_open"></i>
			</router-link >
		</div>
		<div :class="xi ? 'moviec xiding' : 'moviec'">
		<!-- <div class="moviec" :class="xi ? ' xiding' : ''">这样也行	 -->
			<router-link 
			:to="{name:'nowplay'}"
			active-class="spanc"
			tag="span">
				{{moviex}}<i></i>
			</router-link>
			<router-link 
			:to="{name:'nextplay'}"
			active-class="spanc"
			tag="span">
				{{moviey}}<i></i>
			</router-link>
		</div>
		<!-- 路由匹配到的组件将显示在这里 -->
		<router-view/>
	</div>
</template>

<script>
	import Banner from '../components/Banner';	
	export default {	
		components: {
			//组件名:引入名
			'Banner':Banner
		},
		data() {
			return {
				title:"电影",
				moviex:"正在热映",
				moviey:"即将上映",
				city:"定位失败",
				xi:false
			}
		},
		mounted: function () {
		  this.$nextTick(function () {
			// Code that will run only after the
			// entire view has been rendered
		  })
		},
		methods: {
			scrollEvent(e){
				let scrollTop=e.srcElement.scrollTop;
				let banner=this.$refs.banner.$el.clientHeight||this.$refs.banner.$el.offsetHeight;
				if(scrollTop>=banner){
					this.xi=true
				}else{
					this.xi=false
				}
			},
		}

	}
</script>

<style lang="scss">
//在vue中引入了scoped这个概念，scoped的设计思想就是让当前组件的样式不会修改到其它地方的样式，
//使用了data-v-hash的方式来使css有了它对应模块的标识
.movie{
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	.lf{
		font-size: .14rem;
	}
	.icon-xiajiantou{
		font-size: .12rem;
	}
}	
.moviehead{
	z-index:10;
	position:fixed;
	top:0;
	width:100%;
}
.city{
	position: absolute;
	z-index: 10;
	color: white; 
	top:.16rem;
	left:.08rem;
	padding: 0 .08rem;
	height: .3rem;
	line-height: .3rem;
	font-size: .12rem;
	border-radius: .15rem;
	background:rgba(0,0,0,.3);
	.iconfont{
		font-size:.1rem;
	}
}
.xiding{
	position: fixed;
	top:.44rem;
}
.moviec{
	background: #fff;
	z-index: 10;
	height: .49rem;
	width: 100%;
	border-bottom: .01rem solid #ededed;
	display: flex;
	span{
		flex: 1;
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		i{
			display: block;
			position: absolute;
			top:.47rem;
			left:50%;
			transform: translateX(-50%);
			height: .02rem;
			width: .64rem;
			background:#ffffff;
		}
	}
	.spanc{
		color:#ff5f16;
		i{
			background: #ff5f16;
		}
	}
}

</style>
