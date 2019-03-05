<template>
	<div class="swiper-container">
		<ul class="swiper-wrapper">
			<li v-for="(item,index) in banner"
			:key="index"
			class="swiper-slide">
				<img :src="item.srcx" width="100%">
			</li>
		</ul>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
	import Swiper from 'swiper';
	export default {
		data() {
			return {
				banner:[{
						url:"",
						srcx:"../../static/images/mai1.png"
					},
					{
						url:"",
						srcx:"../../static/images/mai2.png"
					},
					{
						url:"",
						srcx:"../../static/images/mai3.png"
					},
					{
						url:"",
						srcx:"../../static/images/mai4.png"
					},
					{
						url:"",
						srcx:"../../static/images/mai5.png"
					},
					{
						url:"",
						srcx:"../../static/images/mai6.png"
					},
					{
						url:"",
						srcx:"../../static/images/mai7.jpg"
					},
					{
						url:"",
						srcx:"../../static/images/mai8.png"
					},
					{
						url:"",
						srcx:"../../static/images/mai9.png"
					}
				]
			}
		},
		mounted () {
			new Swiper('.swiper-container', {
				loop: true, // 循环模式选项
				speed:300,//即slider自动滑动开始到结束的时间
				//autoplay : true,
				autoplay : {
					 delay: 2000,//1秒切换一次
					 disableOnInteraction: false
					 //如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
				},	
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination'
				}
			})
		}		
	}
</script>

<style lang="scss">
	@import 'swiper/dist/css/swiper.min.css';
	.swiper-container {
		height: 2.1rem;
		width: 100%;
		.swiper-pagination{
			left:32%;
			bottom:4%;
			.swiper-pagination-bullet {
				width: .03rem;
				height: .03rem;
				border: .01rem solid #fff;
				background: transparent;
				margin: 0 .02rem;
			}
			.swiper-pagination-bullet-active {
				background: white;
			}
		} 
	}
</style>
