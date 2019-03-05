<template>
	<div :style="{background:'#f4f4f4',overflowY:'scroll'}" @scroll="det_top">
		<div class="detailedtop">
			<div class="navtitle" :style="{'visibility':scrolly ? 'visible':'hidden'}">
				<i class="iconfont icon-zuojiantou lf" @click="$router.back(-1)"></i><span class="center">{{film.name}}</span>
			</div>
			<div class="det_img">
				<img :src="film.poster"/>
			</div>
			<div class="det_main">
				<div><span><span>{{film.name}}</span><em>{{film.filmType.name}}</em></span><span class="det_grade" v-if="film.grade"><i>{{film.grade}}</i>分</span></div>
				<p>{{film.category}}</p>
				<p><span style="letter-spacing:0;">{{getLocalTime(film.premiereAt)}}</span>上映</p>
				<p>{{film.nation}}|{{film.runtime}}分钟</p>
				<div class="det_text"><p :class="{'changefilm':changetext}">{{film.synopsis}}</p><div><img src="../../static/images/y.png" @click="changet" :class="{'changeimg':changetext}"/></div></div>
			</div>
		</div>
		<div class="det_actors">
			<h3>演职人员</h3>
			<div class="swiper-container swiperone">
				<ul class="swiper-wrapper">
					<li v-for="(item,index) in film.actors"
					:key="index"
					class="swiper-slide">
						<img :src="item.avatarAddress"/>
						<div>
							<span>{{item.name}}</span>
							<span>{{item.role}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="det_photos">
			<h3><span>剧照</span><span>全部({{lengthx(film.photos)}})</span></h3>
			 <div class="swiper-container swipertwo">
				<ul class="swiper-wrapper">
					<!-- 尽量不要取相似类名会有一些意想不到的错误 -->
					<li v-for="(item,index) in film.photos"
					:key="index"
					@click="bigphone(index)"
					class="swiper-slide">
						 <img :src="item" width="100%"/>
					</li>
				</ul>
			</div>
		</div>
		<div class="button">选座购票</div>
		<div class="det_allphone" v-if="det_phone">
			<div class="navtitle">
				<i class="iconfont icon-error lf" @click="smallone"></i><span class="center">{{det_index}}/{{lengthx(film.photos)}}</span>
			</div>
			<div class="swiperthree">
				<ul class="swiperul3"  @touchstart.capture="touchStart" @touchend.capture="touchEnd" :style="movetouch" >
					<!-- touchstart: //手指放到屏幕上时触发
					touchmove: //手指在屏幕上滑动式触发
					touchend: //手指离开屏幕时触发
					touchcancel: //系统取消touch事件的时候触发，这个好像比较少用 
					尽量不要取相似类名会有一些意想不到的错误 -->
					<li v-for="(item,index) in film.photos"
					:key="index"
					class="swiperlast">
						 <img :src="item" width="100%"/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper';
	export default {
		data() {
			return {
				scrolly:false,
				changetext:true,
				det_phone:false,
				det_index:1,
				lengthl:0,
				count:0,
				startx:0,
				endx:0,
						"film": {
			"filmId": 4533,
			"name": "阿丽塔：战斗天使",
			"poster": "https://pic.maizuo.com/usr/movie/7903da56455b1d970bba806668d2be4d.jpg",
			"actors": [{
				"name": "罗伯特·罗德里格兹",
				"role": "导演",
				"avatarAddress": "https://pic.maizuo.com/usr/movie/d74bdbb492c3bb2076f93efde2eb70f7.jpg"
			}, {
				"name": " 克里斯托弗·沃尔兹",
				"role": "戴森·艾德博士",
				"avatarAddress": "https://pic.maizuo.com/usr/movie/8c76b219e15784d68d2cea51056012b4.jpg"
			}, {
				"name": "罗莎·萨拉查",
				"role": "阿丽塔",
				"avatarAddress": "https://pic.maizuo.com/usr/movie/231b166c3a0330d549c3a2afad748251.jpg"
			}, {
				"name": "基恩·约翰逊 ",
				"role": "雨果",
				"avatarAddress": "https://pic.maizuo.com/usr/movie/165cb4a2e42c35ee0c98286cbd08595a.jpg"
			}, {
				"name": "詹妮弗·康纳利",
				"role": " 切伦",
				"avatarAddress": "https://pic.maizuo.com/usr/movie/c0ea50ae7224aa3fb702d49f1a9e3d22.jpg"
			}, {
				"name": "艾德·斯克林",
				"role": "萨曼",
				"avatarAddress": "https://pic.maizuo.com/usr/movie/fcaa1121240ac619d2ed33de4f74830a.jpg"
			}],
			"director": "罗伯特·罗德里格兹",
			"category": "动作|科幻|冒险",
			"synopsis": "阿丽塔（罗莎·萨拉扎尔 饰）醒来发现既不记得自己是谁，也不认识这个未来世界。善良的医生依德（克里斯托夫·沃尔兹 饰）收留了阿丽塔，因为他意识到在这被遗弃的机器人外壳下，潜藏着一个有着非凡的心灵。当阿丽塔逐步适应她的新生活和钢铁城的街头险恶时，依德想试图让她远离她那神秘的过往，但她的街头朋友雨果（基恩·约翰逊 饰）则试图帮她唤起回忆。城市腐败统治者对阿丽塔展开了追捕，她却因此发现了有关过去的线索——她具有独特而强大的战斗能力。若她能够逃离他们的控制，她就能成为拯救她的朋友，家人和她所爱世界的关键。",
			"filmType": {
				"name": "2D",
				"value": 1
			},
			"nation": "美国   加拿大 阿根廷",
			"language": "英语   西班牙语",
			"videoId": "XNDAzNDU0NjE1Mg==",
			"premiereAt": 1550793600,
			"timeType": 3,
			"runtime": 100,
			"photos": ["https://pic.maizuo.com/usr/100004533/554d31387fa2a3bcc1865674d200f05a.jpg", "https://pic.maizuo.com/usr/100004533/71e28eeab4db3019830821eb9a9fc81b.jpg", "https://pic.maizuo.com/usr/100004533/90f80c60c3c6c4bef7fdbd434c62fb2f.jpg", "https://pic.maizuo.com/usr/100004533/989073b5380ef7e1c75fd65729dd333c.jpg", "https://pic.maizuo.com/usr/100004533/cdddbaf3ee4e2d0a093d1cbfa454b4bb.jpg", "https://pic.maizuo.com/usr/100004533/d66cef5f98fb11364b0063db01501a4f.jpg", "https://pic.maizuo.com/usr/100004533/e09e68bf0b1b242aa09ee757f9d4e138.jpg"],
			"item": {
				"name": "2D",
				"type": 1
			},
			"isPresale": false,
			"isSale": true
					}
			}
		},
		computed:{
			/* movetouch() {  //这里用了计算属性，用transform来移动整个图片列表
			  return {
				transform:`translate3d(-${this.count}00%,0,0)`
			  }
			} */
			movetouch: function () {
				return {transform:`translate3d(-${this.count}00%,0,0)`}
			}
		},
		methods:{
			getLocalTime(nS) {
				let timer=new Date(parseInt(nS)*1000).toLocaleString().split(" ")[0];
				let reg=new RegExp("/","g"); 
				let timerx=timer.replace(reg,"-");
				return timerx; 
			},
			changet() {
				this.changetext=!this.changetext;
			},
			det_top(e){
				let scrollTop=e.srcElement.scrollTop;
				if(scrollTop>0){
					this.scrolly=true;
				}else{
					this.scrolly=false;
				}
			},
			lengthx(length){
				this.lengthl=length.length;
				return length.length
			},
			bigphone(index){
				this.det_phone=true;
				this.det_index=index+1;
				this.count=index;
			},
			smallone(){
				this.det_phone=false;
				this.count=0;
			},
			 touchStart (e) {
			    // 记录初始位置
			    e.preventDefault() // 阻止默认事件，滚动等
				this.startx=e.touches[0].clientX
				//console.log(e.touches[0].clientX)// 记录滑动开始的位置
			},
			touchEnd (e) {
			    e.preventDefault() // 阻止默认事件
			    // 记录结束位置
				this.endx=e.changedTouches[0].clientX
				//console.log(e.changedTouches[0].clientX)
				if (this.startx - this.endx < -50) {
					//console.log("<");
					if(this.count<=1){
						this.count=1;
					}
					this.count--;
					this.det_index=this.count+1;
				}else if(this.startx - this.endx > 50){
					//console.log(">")
					if(this.count>=this.lengthl-2){
						this.count=this.lengthl-2;
					}
					this.count++
					this.det_index=this.count+1;
				}else{
					console.log(1)
				}
			}
		},
		mounted () {
			var swiper=new Swiper('.swiperone', {				
				speed:300,//即slider自动滑动开始到结束的时间
				slidesPerView :'auto',
				slidesOffsetAfter:10
			});
			var swiper2=new Swiper('.swipertwo', {				
				speed:300,//即slider自动滑动开始到结束的时间
				slidesPerView :'auto',
				slidesOffsetAfter:10
			})
		},
		
	}
</script>

<style lang="scss">
@import 'swiper/dist/css/swiper.min.css';
.detailedtop{
	.navtitle{
		position:fixed;
		visibility:hidden
	}
	.lf{
		width: .3rem;
		height: .3rem;
		text-align: center;
		line-height: .3rem;
		border-radius: 50%;
		visibility:visible;
		background: rgba($color: #fff, $alpha: .4)
	}
	.det_img{
		img{
			width:100%;
			display: block;
		}
	}
	.det_main{
		padding: .15rem;
		color: #797d82;
		font-size: .13rem;
		background:#fff;
		div:first-child{
			display: flex;
			justify-content: space-between;
			>span:first-child{
				font-size: .18rem;
				color: #191a1b;
				display: flex;
				align-items: center;
			}
			em{
				color:#fff;
				font-size: .1rem;
				background: #d2d6dc;
				padding:0 .03rem;
				margin-left: .05rem;
				border-radius: .02rem;
			}
		}
		.det_grade{
			color: #ffb232;
			font-size: .14rem;
			i{
				font-size: .18rem;
				margin-right: .06rem;
			}
		}
		>p{
			margin-top:.05rem;
		}
		.det_text{
			margin-top:.1rem;
			>div{
				height: .18rem;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			img{
				transform:rotate(180deg);
			}
			.changeimg{
				transform:rotate(0deg);
			}
		}
		.changefilm{
			width: 100%;
			height: .36rem;
			overflow: hidden;
		}
	}
}
.det_actors{
	background: #fff;
	margin: .1rem 0;
	h3{
		text-align: left;
		font-size:.16rem;
		padding:.15rem;
	}
	.swiperone{
		height:1.4rem;
		padding: 0 .15rem;
			.swiper-slide{
				display: flex;
				flex-direction: column; 
				margin-right:.1rem;
				width:.85rem;
				img{
					width:.85rem;
					height: .85rem;
				}
				div{
					flex:1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					font-size: .12rem;
					//align-items: center;
					span{
						width: 100%;
						text-align: center;
						white-space: nowrap;
						overflow: hidden;
						text-overflow:ellipsis;
					}
					span:last-child{
						color: #797d82;
					}
				}
			}
	}
}
.det_photos{
	background: #fff;
	margin-bottom: .6rem;
	h3{
		display: flex;
		justify-content: space-between;
		font-size:.16rem;
		padding:.15rem;
	}
	 .swipertwo{
		height:1rem;
		padding: 0 .15rem;
		padding-bottom: .15rem;
		.swiper-slide{
			width:1.5rem !important;
			height:1rem;
			margin-right: .1rem;
			display: flex;
			align-items: center;
			background:#f4f4f4;
			overflow:hidden;
			img{
				width:100%;
			}
		}
	}
	/*.det_all{ 
		height:1rem;	
		//display: -webkit-box;
		display: flex;
		flex-direction: row;
		padding-left:.05rem;
		margin-bottom: .15rem;
		overflow-x: auto;
		overflow-y: auto;
		.det_one{
			width:1.5rem;
			height:1rem;
			//overflow: hidden;
			display: flex;
			align-items: center;
			background:#f4f4f4;
			margin-left:.1rem;
			img{
				width: 1.5rem;
			}
		}
	}*/
}
.det_allphone{
	position: fixed;
	top:0;
	left: 0;
	z-index: 110;
	width: 100%;
	height: 100%;
	background: #000;
	.navtitle{
		background: transparent;
		color:#fff;
	}
	.swiperthree{
		width: 100%;
		height: 80%;
		//overflow: hidden;
		overflow-x:  scroll;
		.swiperul3{
			height: 100%;
			display: flex;
			flex-direction: row;
			transition:all .5s ease-out;
			.swiperlast{
				flex-shrink:0;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}
}
.button{
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 10;
	height: .5rem;
	line-height: .5rem;
	width: 100%;
	text-align: center;
	font-size: .16rem;
	background-color: #ff5f16;
	color: #fff;
}
</style>
