<template>
	<div class="cinema">
		<div class="cinematop">
			<div class="navtitle">
				<router-link tag="span" class="lf" to="/city">
					{{this.$store.state.citymovie}}
					<i class="iconfont icon-xiajiantou"></i>
				</router-link>
				<span class="center">{{title}}</span>
				<i class="iconfont icon-fangdajingx lr"></i>
			</div>
			<div class="cin_change">
				<span @click="cin_placex" :style="{color:cin_properx?'#ff5f16':''}">{{cin_place}}<i class="iconfont icon-xiajiantou"></i></span>
				<span @click="cin_timex" :style="{color:cin_lately?'#ff5f16':''}">{{cin_time}}<i class="iconfont icon-xiajiantou"></i></span>
			</div>
		</div>
		<div class="cin_proper" v-show="cin_properx" @click="cin_propery">  
			<ul>
				<li v-for="(item,index) in cin_proper" :key="index" @click.capture="cin_onepro($event)" :class="{color:index==indexx}">{{item}}</li>
				<!-- 捕获冒泡，即有冒泡发生时，有该修饰符的dom元素会先执行，如果有多个，从外到内依次执行，然后再按自然顺序执行触发的事件。 -->
			</ul>
		</div>
		<div class="cin_lately" v-show="cin_lately" @click="cin_timey">
			<div v-for="(item,index) in cin_timez" :key="index" @click.capture="cin_oneprox($event)" :class="{colory:index==indexy}">
				<i class="iconfont icon-dui" :class="{hide:index==indexy}"></i><span>{{item}}</span>
			</div>
		</div>
		<div class="cinemax">
			<ul>
				<router-link v-for="(item,index) in cin_list" 
				:key="index" 
				tag="li"
				:to="{ name: 'cinemafilm',name:'movietime', params: { cinfid: item.cinemaId,timeid: item.cinemaId}}">
				<!-- :to="{path: '/cinemafilm/' + item.cinemaId+'/movietime/'+item.cinemaId}" > -->
				<!--  -->
					<div>
						<span>{{item.name}}</span>
						<div><div class="cin_place">{{item.address}}</div></div>
					</div>
					<div>
						<span class="cin_price">￥<em>{{item.lowPrice/100}}</em>起</span>
						<span class="cin_place">距离未知</span>
					</div>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			title:"影院",
			cin_place:"全城",
			cin_time:"最近去过",
			cin_timez:["最近去过","离我最近"],
			cin_list:[],
			cin_proper:[],
			cin_properx:false,
			cin_lately:false,
			indexx:0,
			indexy:0
		}
	},
	created: function()  {
		axios.get('../../static/json/cinema.json').then(response =>{
			const cin=response.data.data.cinemas;
			this.cin_list=cin;
			let proper=["全城"],newproper=[];
			for(let i=0;i<cin.length;i++){
				proper.push(cin[i].districtName)
			}
			for(let i=0; i<proper.length; i++){
				if(newproper.indexOf(proper[i]) == -1){
					newproper.push(proper[i]);
				}
			}
			this.cin_proper=newproper;
		})	
	},
	watch:{
		cin_place:function(){
			this.indexx=this.contains(this.cin_proper,this.cin_place);
		},
		cin_time:function(){
			this.indexy=this.contains(this.cin_timez,this.cin_time);
		}
	},
	methods:{
		cin_placex(){
			//console.log("cin_placex")
			this.cin_properx=true;
			this.cin_lately=false;
		},
		cin_propery(){
			this.cin_properx=false;
		},
		cin_timex(){
			//console.log("cin_timex")
			this.cin_lately=true;
			this.cin_properx=false;
		},
		cin_timey(){
			this.cin_lately=false;
		},
		cin_onepro($event){
			this.cin_place=$event.currentTarget.innerText;
		},
		cin_oneprox($event){
			this.cin_time=$event.currentTarget.innerText;
		},
	}
}
</script>

<style lang="scss">

.cinema{
	width: 100%;
	height: 100%;
	overflow-y: scroll;
}
.cinematop{
	position: fixed;
	top:0;
	left: 0;
	background: #fff;
	width: 100%;
	.lf{
		font-size: .14rem;
	}
	.icon-xiajiantou{
		font-size: .12rem;
	}
	.cin_change{
		display: flex;
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		border-bottom: .01rem solid #ededed;
		font-size: .14rem;
		span{
			flex: 1;
			display: flex;
			justify-content: center;
		}
	}
}
.cin_proper{
	position: fixed;
	top:.95rem;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
	font-size: .12rem;
	color: #797d82;
	.color{
		color: #ff5f16;
		border-color:#ff5f16;
	}
	ul{
		padding: .1rem;
		background:#fff;
		li{
			display: inline-block;
			width: 20%;
			text-align: center;
			height: .3rem;
			line-height: .3rem;
			border-radius: .06rem;
			border:.01rem solid #ededed;
			margin: 0 .1rem .1rem 0;
		}
	}
}
.cin_lately{
	position: fixed;
	top:.95rem;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
	font-size: .12rem;
	div{
		width: 100%;
		height: .44rem;
		line-height: .44rem;
		border-bottom: .01rem solid #EDEDED;
		background: #fff;
		padding-left: .15rem;
		color: #797d82;
		span{
			margin-left: .15rem;
		}
		i{
			opacity: 0;
		}
		.hide{
			opacity: 1;
		}
	}
	.colory{
		color:#ff5f16;
	}
}
.cinemax{
	margin-top:.96rem;
	li{
		padding: .15rem;
		height: .44rem;
		display: flex;
		justify-content: space-between;
		border-bottom: .01rem solid #ededed;
		>div{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: .16rem;
			width: 2.7rem;
			div{
				width: 100%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow:ellipsis;
			}
		}
		>div:last-child{
			width: .6rem;
			text-align: right;
		}
		.cin_price{
			text-align: right;
			color: #ff5f16;
			font-size:.12rem;
			em{
				font-size:.16rem;
			}
		}
		.cin_place{
			color: #797d82;
			font-size:.12rem;
		}
	}
}
</style>
