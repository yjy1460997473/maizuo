<template>
	<div>
		<div class="loginx">
			<img src="../../static/images/loginx.png"/>
		</div>
		<form>
			<div>
				<input type="tel" placeholder="手机号" @input="tel()" v-model="telx" ref="tel" maxlength="11"/>
				<span><i @click="clear()" class="iconfont icon-cuowu" v-show="cuowu"></i>获取验证码</span>
			</div>
			<p v-if="p_login">{{message}}</p>
			<div><input type="text" placeholder="验证码" v-model="pass"/></div>
			<div><button @click.prevent="tely()">登入</button></div>
		</form>
		<div class="login_popup" v-if="popup_l">
			<div>
				<div>验证码已失效，请重新获取。</div>
				<div><span @click="popup()">好</span></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title:"我的资料",
			telx:"",
			pass:"",
			cuowu:false,
			popup_l:false,
			p_login:false,
			message:""
			//infor:[{title:"头像",content:},{}]
		}
	},
	methods:{
		clear(){
			this.telx="";
			this.cuowu=false;
		},
		tel(){
			//this.telx=this.telx.replace(/\s/g,"");无法输入空格
			this.telx=this.telx.replace(/[^\d]/g,'');//限定输入数字
			this.cuowu=true;
			/* if((11-this.$refs.tel.value.length)<0){
				this.telx=this.$refs.tel.value.slice(0,11)也限制11位但会闪。
			} */
		},
		tely(){
			if(this.telx.length==0){
				this.p_login=true;
				this.message="手机号码不为空";  
			}else if(!(/^1[34578]\d{9}$/.test(this.telx))){ 
				this.p_login=true;
				this.message="请输入11位正确的手机号码" ;
			}else if(!(this.$store.state.password==(this.pass))){
				this.popup_l=true;
			}else{
				console.log("ok")
			}
		},
		popup(){
			this.popup_l=false;
		}
	},
	watch:{
		telx:function(){
			
		}
	}
}
</script>

<style lang="scss">
.loginx{
	width: 100%;
	height: .6rem;
	margin:.8rem 0 .4rem;
	display: flex;
	justify-content: center;
	img{
		height: .6rem;
	}
}
form{
	>div{
		margin: 0 5%;
		height: .16rem;
		padding: .2rem 0;
		display: flex;
		justify-content: space-between;
		border-bottom: .01rem solid #ededed;
	}
	>div:last-child{
		padding:0;
		height: .44rem;
		margin-top: .7rem;
	}
	p{
		color: #ff5f16;
		font-size:.12rem;
		margin: 0 5%;
		height: .2rem;
		line-height: .2rem;
	}
	input{
		border: 0;
		outline: none;
		font-size: .16rem;
		letter-spacing:.01rem;
	}
	button{
		display: block;
		width: 100%;
		height: .44rem;
		background:#ff5f16;
		color: #fff;
		font-size: .16rem;
		border-radius: .04rem;
	}
	span{
		color: #bdc0c5;
		font-size: .12rem;
		width: 1rem;
		position: relative;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.iconfont{
			position: absolute;
			top:50%;
			left: 0;
			transform: translateY(-50%);
		}
	}
}
.login_popup{
	position: fixed;
	top:0;
	left: 0;
	z-index: 100;
	width: 100%;
	height: 100%;
	background: rgba($color: #000000, $alpha: .4);
	>div{
		width: 2.8rem;
		height: 1.2rem;
		border-radius: .05rem;
		position: absolute;
		top: 24%;
		left: 50%;
		transform: translateX(-50%);
		background: #fff;
		color: #999;
		div{
			display: flex;
			height: .5rem;
			width: 100%;
			justify-content: center;
			align-items: center;
		}
		div:first-child{
			height: .69rem;
			border-bottom: .01rem solid #ededed;
		}
	}
}
</style>
