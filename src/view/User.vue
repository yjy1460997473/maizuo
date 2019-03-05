<template>
	<div :style="{background:'#f4f4f4',height:'100%'}">
		<div class="navtitle">
			<i class="iconfont icon-zuojiantou lf" @click="$router.back(-1)"></i><span class="center">{{title}}</span>
		</div>
		<ul class="userinfor">
			<li>
				<span>头像</span>
				<div><img src="../../static/images/head.jpg" class="imgx"/></div>
				<img src="../../static/images/x.png"/>
			</li>
			<li>
				<span>昵称</span>
				<div><span>{{this.$store.state.nickname}}</span></div>
				<img src="../../static/images/x.png"/>
			</li>
			<li>
				<span>性别</span>
				<div><span>{{this.$store.state.sex}}</span></div>
				<img src="../../static/images/x.png"/>
			</li>
			<li>
				<span>出生日期</span>
				<div><span>{{this.$store.state.birth}}</span></div>
				<img src="../../static/images/x.png"/>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title:"我的资料",
			//infor:[{title:"头像",content:},{}]
		}
	},
	methods:{
		backmovie(){//方法2
			this.$router.go(-1);//返回上一层
		}
	}
}
</script>

<style lang="scss">
.userinfor{
	width: 100%;
	margin-top:.1rem;
	height: 2.2rem;
	background: #fff;
	li{
		margin: 0 4%;
		height: .49rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: .01rem solid #ededed;
		img{
			width: .06rem;
			height: .1rem;
		}
		div{
			flex: 1;
			text-align: right;
			padding-right: 0.1rem;
		}
	}
	li:first-child{
		height: .69rem;
		border-bottom: .01rem solid #ededed;
		.imgx{
			width: .5rem;
			height: .5rem;
		}
	}
}
</style>
