<template>
	<ul class="navclass">
		<router-link
		v-for="(item,index) in navs"
		:to="{name:item.path}"
		active-class="lic"
		:key="index"
		tag="li">
			<i :class="item.icon"></i>
			<span>{{item.title}}</span>
		</router-link>
	</ul>
</template>

<script>
	export default {
		data(){
			return {
				current:0,
				navs:[
					{
						path:'movie',
						title:"电影",
						icon:"iconfont icon-imovie"
					},
					{
						path:'cinema',
						title:"影院",
						icon:"iconfont icon-iphoto"
					},
					{
						path:'assemble',
						title:"9.9拼团",
						icon:"iconfont icon-ituan"
					},
					{
						path:'mine',
						title:"我的",
						icon:"iconfont icon-imine"
					}
				]
			}
		}
	}
</script>

<style>
.navclass{
	flex-shrink: 0;/* 不受兄弟压缩 */
	display: flex;
	height: .49rem;
	border-top:.01rem solid #ededed;
    color: #797d82;
}
.navclass li{
	flex: 1;
	display: flex;
	flex-direction:column;
	justify-content: center;
	align-items: center;
	font-size: .10rem;
}
.navclass li .iconfont{
	font-size: .24rem;
}
.lic{
	color: #ff5f16;
}
</style>
