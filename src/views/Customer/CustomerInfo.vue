<template>
  <div id="app">
    <el-row>
      <el-col :span="6"
        ><div class="grid-content bg-purple" style="float: left">
          生产部门:<el-input
            v-model="searth.name"
            style="width: 300px"
          ></el-input></div
      ></el-col>
      <el-col :span="10"
        ><div class="grid-content bg-purple-light">
          录入时间
          <el-date-picker
            v-model="searth.sdate"
            type="date"
            placeholder="选择日期"
            style="width: 300px"
          >
          </el-date-picker>

          至:
          <el-date-picker
            v-model="searth.odate"
            type="date"
            placeholder="选择日期"
            style="width: 300px"
          >
          </el-date-picker></div
      ></el-col>
      <el-col :span="2"
        ><div class="grid-content bg-purple"></div>
        <el-button type="primary" size="default" @click="Load()"
          >查询</el-button
        >
      </el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple-light">
          <el-button type="primary" size="default" @click="Load()"
            >导出数据</el-button
          >
        </div></el-col
      >
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      ref="table"
      @selection-change="handleSelectionChange"
    >
      <!--配置菜单开始-->
      <el-table-column fixed type="index" align="center" :index="1">
        <template #header>
          <el-popover placement="bottom" :width="600" :visible="visible">
            <!-- 配置列面板 -->
            <transition name="fade">
              <div>
                <div>选择显示字段</div>
                <div>
                  <!--在这里配置他的数列-->
                  <el-checkbox v-model="showColumn.select">复选框</el-checkbox>
                  <el-checkbox v-model="showColumn.date">日期</el-checkbox>
                  <el-checkbox v-model="showColumn.name">姓名</el-checkbox>
                  <el-checkbox v-model="showColumn.provinces">省份</el-checkbox>
                  <el-checkbox v-model="showColumn.city">市区</el-checkbox>
                  <el-checkbox v-model="showColumn.adreess">地址</el-checkbox>
                  <el-checkbox v-model="showColumn.zipCode">邮编</el-checkbox>
                </div>
              </div>
            </transition>
            <template #reference>
              <i
                class="el-icon-setting"
                style="font-size: 22px; cursor: pointer"
                @click="visible = true"
              ></i>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <!--配置菜单结束-->
      <!--数据表格的展示，运用v-if使其实现效果-->
      <el-table-column type="selection" width="55" v-if="showColumn.select">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="150"
        v-if="showColumn.date"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
        v-if="showColumn.name"
      >
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120"
        v-if="showColumn.provinces"
      >
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120"
        v-if="showColumn.city"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        minWidth="120"
        maxWidth="140"
        v-if="showColumn.adreess"
      >
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120"
        v-if="showColumn.zipCode"
      >
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--数据表格的展示，运用v-if使其实现效果（结束）-->
    <!--分页开始-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
    <!--分页结束-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      searth: {
        name: "",
        sdate: "",
        odate: "",
      },
      page: {
        pageindex: 1,
        pagedata: 10,
        total: 0,
        totalpage: 0,
      },
      visible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
      // 列的配置化对象，存储配置信息
      showColumn: {
        select: true,
        date: true,
        name: true,
        provinces: true,
        city: true,
        adreess: true,
        zipCode: true,
      },
    };
  },
  mounted() {
    // 发请求得到showColumnInitData的列的名字
    if (localStorage.getItem("columnSet")) {
      this.showColumn = JSON.parse(localStorage.getItem("columnSet"));
    } else {
      this.showColumn = {
        select: true,
        date: true,
        name: true,
        provinces: true,
        city: true,
        adreess: true,
        zipCode: true,
      };
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
    },
    handleClick(row) {
      console.log(row);
    },
    saveColumn() {
      localStorage.setItem("columnSet", JSON.stringify(this.showColumn));
      this.visible = false;
    },

    //分页显示数
    handleSizeChange(val) {
      this.page.pagedata = val;
      this.GetAll();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page.pageindex = val;
      this.GetAll();
    },
  },
};
</script>

<style lang="postcss" scoped>
/* 控制淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>