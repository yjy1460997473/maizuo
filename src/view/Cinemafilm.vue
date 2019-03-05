<template>
	<div class="cinemafilm" @scroll="scrollEvent_cnf">
		<div class="navtitle">
			<i class="iconfont icon-zuojiantou lf" @click="$router.back(-1)" v-show="!cinf_d"></i>
			<i class="iconfont icon-error lf" @click="cinfm()" v-show="cinf_d"></i>
		</div>
		<div class="titlecen" :style="{position:cinf_top?'fixed':'relative'}" ref='cinf_top'>
			<i class="iconfont icon-zuojiantou lf" @click="$router.back(-1)" v-show="!cinf_d&&cinf_top"></i>
			{{title}}
		</div>	
		<div class="cinf_main" v-show="!cinf_d">
			<div ref="cinfx">
				<div class="notices" @click="cinfmx()"> 
					<span v-for="(item,index) in notice" :key="index">{{item.name}}</span> 
					<i class="iconfont icon-youjiantou"></i>
				</div>
				<div class="cinf_address">
					<span><i class="iconfont icon-04"></i></span>
					<p>{{cinf_address}}</p>
					<span><i class="iconfont icon-dianhua"></i></span>
				</div>
				<div class="cinf_img">
					<div class="cinf_imgx" >
							<div class="swiper-container">
							<ul class="swiper-wrapper">
								<li v-for="(item,index) in cinm" :key="index" class="swiper-slide" >
									<img :src="item.poster" :class="{imgx:index==cinm_index}" />
								</li>
							</ul>
						  </div>
					</div>
					<div class="to_up_triangle"></div>
					<div class="cinf_imghidden">
						<!-- <div v-for="(item,index) in cinm" 
						:key="index"
						class="mohu"
						:style="{background:'url('+item.poster+')'}"
						v-if="index==cinm_index"></div> -->
						<div class="mohu" :style="{background:'url('+cinm_poster+')'}"></div>
					</div>
				</div>
			</div>
			<div :class="cinf_xi ? 'cinf_filmdet' : ''" ref="cinfy">
				<div v-for="(item,index) in cinm" 
				:key="index"
				class="cinf_film"
				v-if="index==cinm_index">
					<p><span>{{item.name}}</span><span><i>{{item.grade}} </i> 分</span></p>
					<p class="cinf_right"><i class="iconfont icon-youjiantou"></i></p>
					<p>{{item.category}} | {{item.runtime}} 分钟 | {{actorsList(item.actors)}}</p>
				</div>
				<ul class="cinf_titletime">
					<li v-for="(item,index) in cinm_time" :key="index" @click="cinm_timeindex(index)" :style="{color:cinm_timex==index?'#ff5f16':''}">
						<span> {{timestampToTime(item)[0]}}</span>
						<i :style="{background:cinm_timex==index?'#ff5f16':''}"></i>
					</li>
				</ul>
			</div>
			<div>
				<!-- <ul  class="cinf_filmtime">
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
				</ul> -->
				<router-view>
				</router-view>
			</div>
		</div>
		<div class="notice" v-show="cinf_d">
			<div v-for="(item,index) in notice" :key="index"><span><em>{{item.name}}</em></span><p>{{item.description}}</p></div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Swiper from 'swiper';
	//import Movietime from '../components/Movietime';	
	export default {
		/* components: {
			//组件名:引入名
			'Movietime':Movietime
		}, */
		data(){
			return {
				title:"",
				notice:"",
				cinf_address:"",
				cinf_d:false,
				cinm:"",
				cinm_length:0,
				cinm_index:0,
				cinm_poster:"",
				cinm_time:"",
				cinf_vip:"",
				cinm_timex:0,
				cinf_top:false,
				cinf_middle:true,
				cinf_xi:false,
				
			}
		},
		created: function()  {
			axios.get('../../static/json/cinemafilm.json').then(response =>{
				let cinf=response.data.data.cinema
				this.title=cinf.name;
				this.notice=cinf.services;
				this.cinf_address=cinf.address;
			});
			axios.get('../../static/json/cinf_film.json').then(response =>{
				let cinm=response.data.data.films
				this.cinm=cinm;
				this.cinm_length=cinm.length;
				this.cinm_poster=cinm[0].poster
				this.cinm_time=cinm[0].showDate
			})
			axios.get('../../static/json/vipcinema.json').then(response =>{
				let cinf_vip=response.data.data.schedules
				this.cinf_vip=cinf_vip;
			})	
		},
		mounted : function() {
			let _this=this;
				var swiper = new Swiper('.swiper-container', {
					speed:400,
					slidesPerView: 4,
					spaceBetween: 14,
					centeredSlides: true,
					observer:true,
					observeParents:true,
					slideToClickedSlide: true,//设置为true则点击slide会过渡到这个slide。
					//把初始化swiper放在数据获取成功之后；然后打开observer:true,observeParents:true，实时监听swiper的子元素的变化
					/* on: {
						slideChangeTransitionEnd: function(){//当当前Slide切换时执行(activeIndex发生改变)
						  _this.cinm_index=this.activeIndex;//切换结束时，告诉我现在是第几个slide
						  let cinf_img=document.getElementsByClassName('imgx')[0].src
						  _this.cinm_poster=cinf_img
						  //console.log(cinf_img)
						},
					} */
				});
				swiper.on('slideChangeTransitionEnd', function () {
					 _this.cinm_index=this.activeIndex;//切换结束时，告诉我现在是第几个slide
					let cinf_img=document.getElementsByClassName('imgx')[0].src
					_this.cinm_poster=cinf_img;
					//_this.cinm_poster=_this.cinm[this.activeIndex].poster;
					_this.cinm_time=_this.cinm[this.activeIndex].showDate;
				});
		},	
		methods:{
			cinfm(){
				this.cinf_d=false;
			},
			cinfmx(){
				this.cinf_d=true; 
			},
			cinm_timeindex(index){
				this.cinm_timex=index;
			},
			/* cinm_now(time){
				if(time<(Date.parse(new Date())/1000)){
					return false;
				}else{
					return true;
				}
			}, */
			scrollEvent_cnf(e){
				let scrollTop=e.srcElement.scrollTop;
				let cinf_top=this.$refs.cinf_top.clientHeight||this.$refs.cinf_top.offsetHeight;
				let cinfx=this.$refs.cinfx.clientHeight||this.$refs.cinfx.offsetHeight;
				if(scrollTop>=cinf_top){
					this.cinf_top=true
					if(scrollTop>=(cinf_top+cinfx)){
						this.cinf_xi=true;
					}else{
						this.cinf_xi=false;
					}
				}else{
					this.cinf_top=false;
				}
				
				//console.log(cinf)
/* 				if(scrollTop>=cinf){
					this.cinf_tone=true
				}else{
					this.cinf_tone=false
				} */
			},
			actorsList (list) {
			    let arr = [];
			    if (list) {
			      arr = list.map(itemx => {
			        return itemx.name;
			      });
			    }else{
					return "暂无主演"
				}
			    return arr.join(' ');
			}
			
		}	
	}
</script>

<style lang="scss">
	@import 'swiper/dist/css/swiper.min.css';
.cinemafilm{
	width: 100%;
	height: 100%;
	overflow-y: scroll;
}
.notice{
	padding:0 .3rem;
	background: #fff;
	font-size: .1rem;
	div{
		margin-top:.2rem;
		display: flex;	
	}
	span{
		width: .6rem;
		em{
			color: #ffb232;
			padding: 0 .05rem;
			border:.01rem solid #ffb232;
		}
	}
	p{
		flex:1;
		color: #797d82;
		font-size: .12rem;
	}
}
.titlecen{
	top:0;
	left: 0;
	padding: 0 10%;
	width: 80%;
	height: .44rem;
	line-height: .44rem;
	font-size: .16rem;
	background: #fff;
	z-index: 200;
	text-align: center;	
	white-space: nowrap;
	overflow: hidden;
	text-overflow:ellipsis;
	.lf{
		position: absolute;
		top:50%;
		left: .15rem;
		transform: translateY(-50%);
		font-size: .24rem;
	}
}
.cinf_main{
	width: 100%;
	height: 100%;
	.notices{
		display: flex;
		justify-content: center;
		align-items: center;
		height: .3rem;
		margin: .15rem 0 .15rem 0;
		color: #ffb232;
		span{
			font-size: .1rem;
			padding: 0 .05rem;
			border:.01rem solid #ffb232;
			margin-left: .06rem;
		}
	}
	.cinf_address{
		margin:0 5%;
		display: flex;
		height: .4rem;
		align-items: center;	
		justify-content: space-between;
		p{
			width: 80%;
			font-size: .14rem;
			text-align: center;	
			white-space: nowrap;
			overflow: hidden;
			text-overflow:ellipsis;
		}
		.iconfont{
			font-size: .24rem;
		}
	}
	.cinf_img{
		width: 100%;
		height: 1.3rem;
		padding: .15rem 0;
		position: relative;
		.cinf_imghidden{
			width: 100%;
			height: 100%;
			position:absolute;
			top:0;
			left: 0;
			overflow: hidden;
		}
		.mohu{	
			width: 100%;
			height: 100%;
			filter: blur(30px);
		}
	}	
	.cinf_imgx{
		width: 100%;
		height: 100%;
		.swiper-container {
		  width: 100%;
		  height: 100%;
		  .swiper-slide {
			flex-shrink:0;
		    text-align: center;
			background: transparent;
		    display: flex;
		    justify-content: center;
			align-items:flex-end;
			img{
				height: 80%;
				width: 80%;
				transition:all .5s ease-out;
			}
			.imgx{
				width: 100%;
				height: 100%;
			}
		  }
		}
	}
	.to_up_triangle{
		position: absolute;
		bottom: -.01rem;
		left: 50%;
		z-index: 10;
		transform: translateX(-50%);
		width:0;
		height: 0;
		border-left: .1rem solid transparent;
		border-right: .1rem solid transparent;
		border-bottom: .12rem solid #fff;
	}
	.cinf_filmdet{
		position: fixed;
		top:.44rem;
		left: 0;
		width: 100%;
	}
	.cinf_film{
		background: #fff;
		padding: .15rem;
		p:first-child{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: .16rem;
			span{
				margin-left: .06rem;
			}
			span:last-child{
				color: #ffb232;
				font-size: .12rem;
				i{
					font-size: .16rem;
				}
			}
		}
		.cinf_right{
			display: flex;
			justify-content: flex-end;
		}
		p:last-child{
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow:ellipsis;
			font-size: .12rem;
			color: #797d82;
			margin:0 .3rem;
		}
	}
}

.cinf_titletime{
	height: .5rem;
	overflow-x:auto;
	border-top:.01rem solid #ededed;
	display: flex;
	background: #fff;
	li{
		flex-shrink:0;
		font-size: .14rem;
		margin:0 .15rem;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		i{
			display: block;
			position: absolute;
			top:.47rem;
			left:50%;
			transform: translateX(-50%);
			height: .02rem;
			width:100%;
			background:#fff;
		}
	}
}
</style>
