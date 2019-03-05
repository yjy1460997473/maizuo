<template>
	<div :style="{background:'#f4f4f4',height:'100%'}">
		<div class="minetop">
			<div class="head_portrait" @click="user()">
				<img src="../../static/images/login.png" :style="{width: '100%'}"/>
			</div>
			<div class="your_name" @click="user()">{{your_name}}</div>
		</div>
		<div>
			<ul class="minenav">
				<router-link 
				v-for="(item,index) in minenav" 
				:key="index"
				:to="{name:item.path}"
				tag="li">
					<img :src="item.img" />
					<span>{{item.text}}</span>
				</router-link>
			</ul>
		</div>
		<div class="minemain">
			<div>
				<img src="../../static/images/x1.png"/>
				<div>卖座卡</div>
				<img src="../../static/images/x.png"/>
			</div> 
			<div>
				<img src="../../static/images/x2.png"/>
				<div><span>余额</span><span class="money"><em>￥</em>{{this.$store.state.money}}</span></div>
				<img src="../../static/images/x.png"/>
			</div>
			<div>
				<img src="../../static/images/x3.png"/>
				<div>设置</div>
				<img src="../../static/images/x.png"/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			your_name:"立即登录",
			minenav:[{img:"../../static/images/Movie.png",text:"电影订单",path:"login"},
			{img:"../../static/images/assemble.png",text:"拼团订单",path:"login"}]
		}
	},
	methods:{
		user(){
			this.$router.push({name: 'user'});
		}
	}
}
</script>

<style lang="scss">
.minetop{
	display: flex;
	width:100%;
	height: 1.6rem;
	background: url('../../static/images/bg.png');
	background-size: 100%;
	align-items: center;
	.head_portrait{
		margin-left: .3rem;
		width: .64rem;
		height: .64rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.your_name{
		color:#fff;
		margin-left: .3rem;
	}
}
.minenav{
	display: flex;
	width: 100%;
	height: .8rem;
	background: #fff;
	margin-bottom: .1rem;
	font-size: .14rem;
	li{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		color: #797d82;
		font-size: .13rem;
		padding: .15rem 0;
		img{
			width: .26rem;
			height: .26rem;
		}
	}
}
.minemain{
	height: 1.5rem;
	width: 100%;
	background: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	>div{
		flex: 1;
		display: flex;
		width: 92%;
		justify-content: space-between;
		align-items: center;
		border-bottom: .01rem solid #ededed;
		img{
			width: .2rem;
			height: .2rem;
		}
		img:last-child{
			width: .06rem;
			height: .1rem;
		}
		div{
			flex: 1;
			display: flex;
			justify-content: space-between;
			padding:0 .1rem; 
		}
		.money{
			color: #797d82;
			em{
				font-style: normal;
				font-size: .1rem;
			}
		}
	}
}
</style>
