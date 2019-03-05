<template>
	<div>
		<ul  class="cinf_filmtime">
			<li v-for="(item,index) in cinf_vip" 
			:key="index"
			:style="{color:cinm_now(item.showAt)?'':'#d2d6dc'}" 
			class="cinm_color">
				<div class="cinm_timestyle">
					<span>{{timestampToTime(item.showAt)[1]}}</span>
					<span :style="{color:cinm_now(item.showAt)?'#797d82':'#d2d6dc'}">{{timestampToTime(item.endAt)[1]}}散场</span>
				</div>
				<div class="cinm_timestyle">
					<span class="">{{item.filmLanguage}}{{item.imagery}}</span>
					<span :style="{color:cinm_now(item.showAt)?'#797d82':'#d2d6dc'}">{{item.hallName}}</span>
				</div>
				<div class="cinm_price" :style="{color:cinm_now(item.showAt)?'#ff5f16':'#d2d6dc'}">
					<span><em>￥</em>{{item.salePrice/100}}</span>
					<span v-if="cinm_now(item.showAt)" class="cinm_ok">购票</span>
					<span v-if="!cinm_now(item.showAt)" class="cinm_stop">停售</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data(){
			return {
				cinf_vip:"",		
			}
		},
		created: function()  {
			axios.get('../../static/json/vipcinema.json').then(response =>{
				let cinf_vip=response.data.data.schedules
				this.cinf_vip=cinf_vip;
			})	
		},
		methods:{
			cinm_now(time){
				if(time<(Date.parse(new Date())/1000)){
					return false;
				}else{
					return true;
				}
			},
		}
	}
</script>
 
<style lang="scss">
	.cinf_filmtime{
			width: 100%;
			li{
				height: .44rem;
				padding:.15rem;
				border-top:.01rem solid #ededed;
				display: flex;
				justify-content: space-between;
				.cinm_timestyle{
					width: 30%;
					display: flex;
					flex-direction: column;
					font-size: .15rem;
					justify-content: space-between;
					span:last-child{
						font-size: .13rem;
						white-space: nowrap;
						overflow: hidden;
						text-overflow:ellipsis;
					}
				}
				.cinm_price{
					width: 28%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					span{
						font-size: .15rem;
						em{
							font-size: .12rem;
						}
					}
					.cinm_ok{
						display: inline-block;
						padding:.05rem .09rem;
						font-size: .12rem;
						border: .01rem solid #ff5f16;
					}
					.cinm_stop{
						display: inline-block;
						padding:.05rem .09rem;
						font-size: .12rem;
						border: .01rem solid #d2d6dc;
					}
				}
			}
	}
</style>
