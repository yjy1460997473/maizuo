<template>
	<div class="assemble">
		<ul>
			<li v-for="(item,index) in pingtuan" :key="index">
				<img :src="item.activeImage"/>
				<div>
					<p class="ass_title">{{item.title}}</p>
					<p class="ass_describe">{{item.describe}}</p>
					<div class="ass_infor">
						<div>
							<span class="ass_price">￥<em>{{pricex(item.groupPrice)}}</em></span>
							<div class="ass_user">
								<div v-for="(itemx,index) in item.userList" :key="index"><img :src="itemx.icon" width="100%" /></div>
							</div>
						</div>
						<button>去拼单</button>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			pingtuan:[]
		}
	},
	created: function()  {
		axios.get('../../static/json/assemble.json').then(response =>{
			this.pingtuan=response.data.data.list;
		})	
	},
	methods: {
		pricex(price) {
			  return price/100;
		},
		
	},
	
}
</script>

<style lang="scss">
.assemble{
	background: #F4F4F4;
	overflow-y:auto;
	li{
		margin-bottom: .1rem;
		width: 100%;
		background: #fff;
		overflow: hidden;
		>img{
			display: block;
			width: 100%;
		}
		>div{
			padding:.15rem .15rem 0;	
		}
		.ass_title{
			height: .2rem;
			line-height: .2rem;
			font-size: .16rem;
		}
		.ass_describe{
			color: #797d82;
			padding:.05rem 0;
			font-size: .13rem;
		}
		.ass_infor{
			height: .5rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			>div{
				width: 68%;
				display: flex;
				justify-content: space-between;
			}
			button{
				width: .9rem;
				height: .32rem;
				color:#fff;
				border-radius: .03rem;
				background-color: #c03131;
			}
		}
		.ass_user{
			width: .5rem;
			height: .3rem;
			position: relative;
			div{
				position: absolute;
				top:0;
				left: 0;
				width: .3rem;
				height: .3rem;
				border-radius: 50%;
				overflow: hidden;
			}
			div:first-child{
				left:.2rem; 
			}
			
		}
		.ass_price{
			color: #c03131;
			font-size: .16rem;
			em{
				font-size: .2rem;
			}
		}
		
	}
}
</style>
