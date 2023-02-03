<template>
  <div id="app">
    <el-row>
      <el-col :span="8"
        ><div class="grid-content bg-purple" style="float: left">
          联系人姓名:<el-input
            v-model="searth.pname"
            style="width: 300px"
          ></el-input></div
      ></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">
        客户名称:<el-input
            v-model="searth.cname"
            style="width: 300px"
          ></el-input>
        </div></el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple"></div>
        <el-button type="primary" size="default" @click="GetAll()"
          >查询</el-button>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple-light">
          <el-button type="primary" size="default" @click="npoi()"
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
          <el-popover placement="bottom" :width="200" :visible="visible">
            <!-- 配置列面板 -->
            <transition name="fade">
              <div>
                <div>选择显示字段</div>
                <div>
                  <!--在这里配置他的数列-->
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.CustomerId">客户编号</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.CustomerName">客户名称</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.Name">联系人姓名</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.Post">职务</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                  <el-checkbox v-model="showColumn.Dep">部门</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                  <el-checkbox v-model="showColumn.Phone">电话</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                  <el-checkbox v-model="showColumn.Email">邮箱</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                  <el-checkbox v-model="showColumn.EntryTime">录入时间</el-checkbox>
                    </div></el-col>
                  </el-row>
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
      <el-table-column type="selection" width="55" v-if="showColumn.select" >
      </el-table-column>
      <el-table-column
        prop="CustomerId"
        label="客户编号"
        width="140"
        v-if="showColumn.CustomerId"
      >
      </el-table-column>
      <el-table-column
        prop="CustomerName"
        label="客户名称"
        width="260"
        v-if="showColumn.CustomerName"
      >
      </el-table-column>
      <el-table-column
        prop="Name"
        label="联系人姓名"
        width="220"
        v-if="showColumn.Name"
      >
      </el-table-column>
      <el-table-column
        prop="Post"
        label="职务"
        width="90"
        v-if="showColumn.Post"
      >
      </el-table-column>
      <el-table-column
        prop="Dep"
        label="部门"
        width="110"
        v-if="showColumn.Dep"
      >
      </el-table-column>
      <el-table-column
        prop="Phone"
        label="电话"
        width="180"
        v-if="showColumn.Phone"
      >
      </el-table-column>
      <el-table-column
        prop="Email"
        label="邮箱"
        width="120"
        v-if="showColumn.Email"
      >
      </el-table-column>
      <el-table-column
        prop="EntryTime"
        label="录入时间"
        width="120"
        v-if="showColumn.EntryTime"
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
      :page-sizes="[5, 10, 15, 20]"
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
      showColumn:{},
      searth: {
        pname: "",
        cname: "",
      },
      page: {
        pageindex: 1,
        pagesize: 5,
        total: 0,
        totalpage: 0,
      },
      visible: false,
      tableData: [],
    };
  },
  mounted() {
    this.GetAll();
    // 发请求得到showColumnInitData的列的名字
    if (localStorage.getItem("columnSet")) {
      this.showColumn = JSON.parse(localStorage.getItem("columnSet"));
    } else {
      this.showColumn = {
        CustomerId: true,
        CustomerName: true,
        Name: true,
        Post: false,
        Dep: false,
        Phone: true,
        Email: true,
        EntryTime:true
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
      this.page.pagesize = val;
      this.GetAll();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page.pageindex = val;
      this.GetAll();
    },
    GetAll() {
      this.axios(
        "https://localhost:44360/api/Customerinfo/GetPersonChargeList?pname="+this.searth.pname+"&cname="+this.searth.cname+"&index="+this.page.pageindex+"&size="+this.page.pagesize
      ).then((res) => {
        if (res.data.Code == 200) {
          this.tableData = res.data.Data;
          this.page.total = res.data.DataCount;
          this.page.totalpage = res.data.PageCount;
        }
      });
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