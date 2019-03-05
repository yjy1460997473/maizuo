import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//引入store

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
	store,//使用store
  components: { App },
  template: '<App/>'
})
Vue.prototype.contains = function (arrays, obj) {
	let i = arrays.length;
		while (i--) {
			if (arrays[i] === obj) {
				return i;
			}
		}
	return false;
}
Vue.prototype.timestampToTime = function (timestamp) {
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let datenow = new Date(new Date().toLocaleDateString()).getTime()/1000;
		let datenext = datenow + 86400;
		let dateafter = datenext + 86400;
        //let Y = date.getFullYear() + '年';
		let show_day=new Array('周日','周一','周二','周三','周四','周五','周六','今天','明天','后天'); 
        let M = date.getMonth()+1 + '月';
        let D = date.getDate() + '日';
        let h = date.getHours() + ':';
        let m = date.getMinutes();
		if(timestamp==datenow){
			return [show_day[7]+M+D,h+m]
		}else if(timestamp==datenext){
			return [show_day[8]+M+D,h+m]
		}else if(timestamp==dateafter){
			return [show_day[9]+M+D,h+m]
		}else{
			 return [show_day[date.getDay()]+M+D,h+m]
		}  
    }
