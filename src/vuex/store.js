import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './action';
import * as mutations from './mutations';
import * as getters from './getter';


Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        DeviceList: [],//设备集合所用
        DeviveItem: [], //设备遍历所用
        page: {
            total: 0,
            totalpage: 0,
        },
        BackState: false, //后台返回前台的值
        FirstSelectItem: [],//获取第一个下拉框集合
        SecondSelectItem: [],//获取第二个下拉框集合
    },
    getters,
    actions,
    mutations,
});