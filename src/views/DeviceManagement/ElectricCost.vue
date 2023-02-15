<template >
  <div>
    <!--查询条件开始-->
    <el-row>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          楼宇:
          <el-select
            v-model="Searth.building"
            placeholder="请选择"
            @change="SeeItem()"
          >
            <el-option
              v-for="item in FirstSelectItem"
              :key="item.Num"
              :label="item.Name"
              :value="item.Num"
            >
            </el-option>
          </el-select></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple-light">
          单元:
          <el-select v-model="Searth.unitnum" placeholder="请选择">
            <el-option
              v-for="item in SecondSelectItem"
              :key="item.Num"
              :label="item.Name"
              :value="item.Num"
            >
            </el-option>
          </el-select></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          状态
          <el-select v-model="Searth.state" placeholder="请选择">
            <el-option label="全部" value="null"></el-option>
            <el-option label="开启" value="true"></el-option>
            <el-option label="关闭" value="false"></el-option>
          </el-select></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple-light">
          <el-button type="primary" @click="Searthitem()">查询</el-button>
        </div></el-col
      >
    </el-row>
    <!--查询条件结束-->
    <div v-for="(item, index) in DeviceList" :key="index">
      <div
        v-for="(item1, index1) in item"
        :key="index1"
        style="
          width: 16%;
          height: 400px;
          float: left;
          border: 1px solid #807e7e;
          margin-right: 5px;
        "
      >
        <p>
          <el-switch
            v-model="item1.WaterState"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="FrontEditState(item1.Id)"
            style="float: left"
            active-text="开启"
            inactive-text="关闭"
          >
          </el-switch>
        </p>
        <br />
        <br />
        <p>
          {{ item1.Building }}号楼 -{{ item1.UnitNum }}单元号 -
          {{ item1.FloorNum }} 层
        </p>
        <p>{{ item1.Building }}{{ item1.UnitNum }}{{ item1.FloorNum }}</p>

        <div
          :id="item1.Id"
          style="height: 100%; border: 1px solid #807e7e"
        ></div>
      </div>
    </div>
    <footer>
      <!--分页开始-->
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="page.totalpage"
        style="background-color: white"
      >
      </el-pagination>
      <!--分页结束-->
    </footer>
  </div>
</template>
<script>
import * as echarts from "echarts";

import store from "@/vuex/store";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      Searth: {
        building: -1,
        unitnum: -1,
        state: "",
        pageindex: 1,
        pagesize: 12,
      },
    };
  },
  methods: {
    ...mapActions([
      "loadElectData",
      "ElectditState",
      "EbtainSelect",
      "EbtainSecondSelect",
    ]),
    ...mapMutations(["SET_Elect_INFO", "SET_Elect_UPDATE"]),
    //循环出echarts的图表
    GaugeBasic() {
      this.DeviveItem.forEach((element) => {
        var dom = document.getElementById(element.Id);
        var myChart = echarts.init(dom, null, {
          renderer: "canvas",
          useDirtyRect: false,
        });

        var option;

        option = {
          tooltip: {
            formatter: "{a} <br/>{b} : {c}%",
          },
          series: [
            {
              name: "Pressure",
              type: "gauge",
              detail: {
                formatter: "{value}",
              },
              data: [
                {
                  value: element.SurplusWater,
                  name: "SCORE",
                },
              ],
            },
          ],
        };

        if (option && typeof option === "object") {
          myChart.setOption(option);
        }

        window.addEventListener("resize", myChart.resize);
      });
    },
    //点击上一页|下一页数据发生改变
    handleCurrentChange(val) {
      this.Searth.pageindex = val;
      this.loadWaterData(this.Searth);
      this.GaugeBasic();
    },
    Searthitem() {
      this.loadWaterData(this.Searth);
    },
    FrontEditState(val) {
      console.log(val);
      this.EditState(val);
      if (this.BackState == true) {
        this.$message({
          showClose: true,
          message: "更改成功",
        });
        this.GaugeBasic();
      } else {
        this.$message({
          showClose: true,
          message: "更改失败",
        });
      }
    },
    //获取以及下拉框的数据
    SeeItem() {
      console.log(this.Searth.building);
      this.ObtainSecondSelect(
        `https://localhost:5001/api/Device/GetElectAll?id=${this.Searth.building}`
      );
    },
  },
  mounted() {
    this.GaugeBasic();
    this.ObtainSelect("https://localhost:5001/api/Device/GetElect");
  },
  created() {
    this.loadWaterData(this.Searth);
  },
  computed: {
    ...mapState([
      "DeviceList",
      "DeviveItem",
      "page",
      "BackState",
      "FirstSelectItem",
      "SecondSelectItem",
    ]),
    ...mapGetters([""]),
  },
  store,
};
</script>

<style >
footer {
  height: 60px;
  line-height: 60px;
  position: absolute;
  margin: auto;
  left: 280px;
  right: 0;
  bottom: 0;
}
.el-switch__label * {
  line-height: 1;
  font-size: 12px;
  display: inline-block;
}
.el-switch__label {
  position: absolute;
  display: none;
  color: #fff !important;
  font-size: 12px !important;
}
/*打开时文字位置设置*/
.el-switch__label--right {
  z-index: 1;
  right: 10px;
}
/*关闭时文字位置设置*/
.el-switch__label--left {
  z-index: 1;
  left: 10px;
}
/*显示文字*/
.el-switch__label.is-active {
  display: block;
}
/*开关宽度*/
.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 50px !important;
}
</style>