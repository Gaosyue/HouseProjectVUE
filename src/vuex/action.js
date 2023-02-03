import axios from "axios";
// import state from './store';

// 获取水表数据
export const loadWaterData = ({ commit }, data) => {
    return new Promise(() => {
        var Searth = {
            params: {
                building: data.building,
                unitnum: data.unitnum,
                state: data.state,
                pageindex: data.pageindex,
                pagesize: data.pagesize,
            },
        };
        axios.get("https://localhost:44360/api/Device/WaterGetData", Searth).then((res) => {
            commit('SET_Water_INFO', res.data);
        });
    });
};
// 获取水表数据
export const EditState = ({ commit }, data) => {
    return new Promise(() => {
        console.log(data);
        axios.post(`https://localhost:44360/api/Device/EditState?id=${data}`).then((res) => {
            commit('SET_STATE_UPDATE', res.data);
        });
    });
};
//获取下拉的数据
export const ObtainSelect = ({ commit }, data) => {
    return new Promise(() => {

        axios.get(data).then((res) => {
            commit('SET_FIRST_ITEM', res.data);
        });
    });
};

//获取第二个下拉的数据
export const ObtainSecondSelect = ({ commit }, data) => {
    return new Promise(() => {
        console.log(data);
        axios.get(data).then((res) => {
            commit('SET_SECOND_ITEM', res.data);
        });
    });
};

