<template>
	<div class="nowplay">
		<ul>
			<router-link v-for="(item,index) in movienow"
			:key="index"
			:to="{ name: 'detailed', params: { filmsid: item.filmId }}"
			tag="li">
				<img :src="item.poster"/>
				<div class="introduce">
					<span class="big">{{item.name}}<em>{{item.filmType.name}}</em></span>
					<span :class="{hidden:!item.grade}">观众评分:<i>{{item.grade}}</i></span>
					<!-- <span v-if='item.grade' :style="{visibility: 'normal'}">观众评分:<i>{{item.grade}}</i></span>
					<span v-else :style="{visibility: 'hidden'}">观众评分:<i>{{item.grade}}</i></span> -->
					<span><div>主演:{{actorsList(item.actors)}}</div></span>
					<span>{{item.nation}}|{{item.runtime}}分钟</span>
				</div>
				<div class="next"><span>购票</span></div>
			</router-link>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data(){
			return {
				movienow:[]
			}
		},
		created: function()  {
			axios.get('../../static/json/nowplay.json').then(response =>{
				this.movienow=response.data.data.films;
				
			})	
		},
		methods: {
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
.hidden{
	visibility: hidden;
}
.nowplay{
	margin-left:.15rem;
	ul{
		
	}
	li{
		width: 100%;
		height:1.24rem;
		padding: .15rem;
		padding-left: 0;
		border-bottom: .01rem solid #eee;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: .12rem;
		img{
			height:100%;
		}
		.introduce{
			width: 2.1rem;
			height: 88%;
			display: flex;
			flex-direction:column;
			span{
				display: flex;
				align-items:center;
				flex: 1;
				width: 100%;
				text-align: left;
				color:#797d82;
				overflow: hidden;
				i{
					margin-left: .04rem;
					font-style: normal;
					font-size: .14rem;
					color: #ffb232;
				}
				em{
					color:#fff;
					font-size: .1rem;
					background: #d2d6dc;
					padding:0 .03rem;
					margin-left: .05rem;
					border-radius: .02rem;
				}
				div{
					width: 100%;
					//三个点在flex无效时里面再套一个div
					white-space: nowrap;
					overflow: hidden;
					text-overflow:ellipsis;
				}
			}
			span:first-child{
				color:#C03131
			}
			.big{
				font-size: .14rem;
				color:#333;
			}
		}
		.next{
			width: .5rem;
			height: .24rem;
			line-height:.24rem;
			text-align: center;
			border-radius: .04rem;
			border:.01rem solid #ff5f16;
			color:#ff5f16;
		}
	}
}
</style>

