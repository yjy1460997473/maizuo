<template>
	<div :style="{height:'100%'}">
		<div class="navtitle">
			<i class="iconfont icon-error lf" @click="backmovie()"></i><span class="center">{{title}}</span>
		</div>
		<div class="search">
			<div class="searchx" :style="{'width':qu ? '88%':'100%'}">
				<i class="iconfont icon-fangdajing"></i>
				<input type="text" placeholder="输入城市名或拼音" @focus="quxiao()" v-model="searchcity"/>
			</div>
			<div class="quxiao" v-if="qu" @click="quback()">取消</div>
		</div>
		<div class="cityall" v-show="showy">
			<div class="city_main">
				<div>
					<div>
						<p>GPS定位你所在城市</p>
						<ul>
							<li>定位失败</li>
						</ul>
					</div>
					<div>
						<p>热门城市</p>
						<ul>
							<!-- <li v-for="(item,index) in citylist" :key="index" v-if="item.isHot">{{item.name}}</li> -->
							<li v-for="(item,index) in isHot" :key="index" @click="citytext($event)">{{item}}</li>
						</ul>
					</div>
				</div>
				<ul>
					<li v-for="(item,index) in citylist" :key="index" class="cityli" :id="item.lettertop">
						<p>{{item.lettertop}}</p>
						<ul>
							<li v-for="(itemx,index) in item.city" :key="index" @click="citytext($event)">{{itemx}}</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="city_letter">
				<ul>
					<li v-for="(item,index) in letter" :key="index" @click="lettercity($event)">{{item}}</li>
				</ul>
			</div>
			<div class="showletter" v-if='showx' :class="{addshow:showx}">{{showletterx}}</div>
		</div>
		<div v-show="!showy">
			<div class="searchcityi" v-show="searchn">
				<i class="iconfont icon-chengshi"></i>
				<p>没有找到匹配的城市</p>
			</div>
			<ul class="searchcitym" v-show="!searchn">
				<li v-for="(item,index) in searchm" :key="index" @click="citytext($event)">{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data(){
			return {
				title:"当前城市 - ",
				letter:[],
				isHot:[],
				citylist:[],
				citylistc:[],
				showletterx:"",
				showx:false,
				qu:false,
				searchcity:"",
				showy:true,
				searchm:[],
				searchn:true
			}
		},
		created: function()  {
			axios.get('../../static/json/city.json').then(response =>{
				const citylist=response.data.cities;
				this.citylistc=response.data.cities;
				let cityhead=[],newcityhead=[],isHotx=[],citymain=[];
				for(let i=0;i<citylist.length;i++){
					let ishotlist=citylist[i].name;
					let letterx=citylist[i].pinyin.charAt(0).toUpperCase();
					if(citylist[i].isHot){
						isHotx.push(ishotlist);
					}
					cityhead.push(letterx);
				}
				for(let i=0; i<cityhead.length; i++){
					if(newcityhead.indexOf(cityhead[i]) == -1){
						newcityhead.push(cityhead[i]);
					}
				}
				newcityhead = newcityhead.sort(function compareFunction(item1, item2) {
					return item1.localeCompare(item2);
				});
				this.isHot=isHotx;
				this.letter=newcityhead;
				for(let i=0;i<newcityhead.length;i++){
					let obj = new Object();
					//为对象添加动态属性
					obj.lettertop = newcityhead[i];
					obj.city=[];
					for(let j=0;j<citylist.length;j++){
						if(newcityhead[i].toLowerCase()===citylist[j].pinyin.charAt(0)){
							obj.city.push(citylist[j].name);
						}
					}
					citymain.push(obj)	
				}
				this.citylist=citymain;
			})	
		},
		methods:{
			backmovie(){
				this.$router.push({name: 'nowplay'});
			},
			lettercity($event){
				let text=$event.currentTarget.innerText;
				let _this=this;
				let letter = document.getElementById(text);
				var citym = document.getElementsByClassName("city_main")[0];
				//console.log(document.getElementsByClassName("city_main")[0])
				this.showletterx=text;
				this.showx=true;
				setTimeout(function(){
					_this.showx=false;
				}, 1600);
				citym.scrollTo(0,letter.offsetTop - 144)			
			},
			quxiao(){
				this.qu=true;
			},
			quback(){
				this.qu=false;
				this.searchcity="";
				this.showy=true;
			},
			citytext($event){
				let text=$event.currentTarget.innerText;
				this.$store.dispatch('actioncity',text) // 利用派发全局state.citymovie的值来控制 text要变化的实参
				//this.$store.state.citymovie=text也行但不符合规范;
				this.$router.push({name: 'nowplay'});
			}
		},
		/* computed:{
			getcity(){
			   return this.$store.getters.getcity;
			}
		}, */
		watch:{
			searchcity:function(){
				var citysearchs=[];
				//this.searchcity.split(" ").join("").length = 0
				//判断input输入内容全是空格
				if(this.searchcity != ""){
					this.showy=false;	
					for(let i=0; i<this.citylistc.length; i++){
						let str = this.citylistc[i].pinyin;
						 if(str.indexOf(this.searchcity) != -1 ){
							citysearchs.push(this.citylistc[i].name)
						}
					}
				}
				this.searchm=citysearchs;
				if(this.searchm.length==0){
					this.searchn=true
				}else{
					this.searchn=false
				}
			}
		}
	}
</script>

<style lang="scss">
.search{
	width: 100%;	
	height: .5rem;
	box-sizing: border-box;
	padding: .1rem .15rem;
	background: #f4f4f4;
	display:flex;
	justify-content: space-between;
	.searchx{
		width: 100%;
		height: 100%;
		/* position: relative; */
		background: #ffffff;
		border-radius: .05rem;
		
		display: flex;
		
	}
	.quxiao{
		
		flex:1;
		display:flex;
		font-size: .14rem;
		justify-content:flex-end;
		align-items: center;
	}
	i{
		/* position: absolute;
		top:50%;
		transform: translateY(-50%);
		left: .1rem; */
		
		display: flex;
		align-items: center;
		margin:0 .05rem 0 .1rem;
		
		color: #797d82;
	}
	input{
		border: none;
		outline: none;
		height: 100%;
		/* margin-left: .3rem; */
		width: 80%;
		font-size: .12rem;
	}
}
.cityall{
	width: 100%;
	height: 100%;
	.city_letter{
		width: .15rem;
		text-align: center;
		position: fixed;
		top: .94rem;
		bottom: 0;
		right: 0;
		font-size: .12rem;
		ul{
			position: absolute;	
			top:50%;
			transform: translateY(-50%);		
		}
	}
	.city_main{
		height: 100%;
		overflow-y: scroll;
		margin-right: .15rem;
		> div{
			padding-left: .15rem;
			p{
				font-size: .13rem;
				color: #797d82;
				margin:.1rem 0;
			}
			li{
				display: inline-block;
				width: 29%;
				margin: .06rem;
				text-align:center;
				height: .32rem;
				line-height: .32rem;
				border-radius: .05rem;
				background-color: #f4f4f4;
				font-size: .14rem;
			}
		}
		.cityli{
			p{
				height: .3rem;
				line-height: .3rem;
				color: #797d82;
				font-size: .13rem;
				padding-left: .15rem;
				background-color: #f4f4f4;
			}
			ul{
				padding-left: .15rem;
				li{
					display: inline-block;
					width: 33.3%;
					text-align:center;
					height: .42rem;
					line-height: .42rem;
					overflow: hidden;
					font-size: .14rem;
				}
			}
		}
	}
	.showletter{
		position: fixed;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 100;
		width: .4rem;
		text-align: center;
		height: .4rem;
		line-height: .4rem;
		font-size: .24rem;
		border-radius: .08rem;
		color: #ffffff;
		background: rgba(0,0,0,.4);
	}
	.addshow{
		animation: citykey 2s linear;
	}
	@keyframes citykey{
		0% { opacity: 0}
		40% {opacity:1}
		80% {opacity:1}
		100% {opacity: 0}
	}
}
.searchcityi{
	color: #bdc0c5;
	.iconfont{
		margin-top: .8rem;
		display: block;
		text-align: center;
		font-size: 1rem;
	}
	p{
		text-align: center;
	}
}
.searchcitym{
	li{
		height: .4rem;
		line-height: .4rem;
		margin:0 .16rem;
		font-size: .14rem;
		border-bottom: 1px solid #ededed;
	}
}
</style>
