 import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={   //要设置的全局访问的state对象

	citymovie:"北京",
	money:0,
	nickname:"666",
	sex:"未设置",
	birth:"未设置",
	password:"123456"
     //要设置的初始属性值
};
const getters = {   //实时监听state值的变化(最新状态)
	getcity(state) {  //方法名随意,主要是来承载变化的citymovie的值
       return state.citymovie
    },
	getmoney(state) {  
	   return state.money
	},
};
const mutations = {
	changecity(state,city) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.citymovie = city;//还传了需要变化的值city
    }
};
const actions = {
	actioncity(context,city) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('changecity',city);//city为要变化的形参
    }
};
const store = new Vuex.Store({
       state,
       getters,
       mutations,
       actions
});
export default store;