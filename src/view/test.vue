<template>
	<div class="test">
		<div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      <div class="swiper-slide">Slide 4</div>
      <div class="swiper-slide">Slide 5</div>
      <div class="swiper-slide">Slide 6</div>
      <div class="swiper-slide">Slide 7</div>
      <div class="swiper-slide">Slide 8</div>
      <div class="swiper-slide">Slide 9</div>
      <div class="swiper-slide">Slide 10</div>
    </div>
  </div>
  </div>
</template>

<script>
	import Swiper from 'swiper';
	export default {
		data(){
			return {
				title:"",	
			}
		},
		mounted : function() {
			var swiper = new Swiper('.swiper-container', {
					on: {
						slideChangeTransitionEnd: function($event){//当当前Slide切换时执行(activeIndex发生改变)
						
						},
					}
			});
			//主要是这部分
			swiper.on('slideChangeTransitionEnd', function () {
			 //var imgurl = document.getElementsByClassName('.swiper-slide-active img')[0].attr("src");
			 //var txt = document.getElementsByClassName('.swiper-slide-active')[0].html();
			 //console.log(txt);

			});
	
		},
		methods:{
			
		}	
	}
</script>

<style lang="scss">
	@import 'swiper/dist/css/swiper.min.css';
	.test{
		width: 100%;
		height: 100%;
		background: #eee;
      font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color:#000;
      margin: 0;
      padding: 0;
	}
	.swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
       text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
</style>
