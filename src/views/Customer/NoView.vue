<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户：">
            <el-input
              v-model="formInline.user"
              placeholder="请输入用户"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="show">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="Id" label="序号"> </el-table-column>
          <el-table-column prop="Name" label="姓名"> </el-table-column>
          <el-table-column prop="HumanId" label="账号"> </el-table-column>
          <el-table-column prop="OnlineState" label="在职状态">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="info" @click="info(scope.row.Id)" plain
                >信息按钮</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageindex"
          :page-sizes="[10, 12, 15, 20]"
          :page-size="page.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //查询
      formInline: {
        user: "",
      },
      //显示
      tableData: [],
      //分页
      page: {
        pageindex: 1,
        pagesize: 10,
        total: 20,
      },
    };
  },
  //钩子函数
  mounted() {
    this.show();
    this.handleSizeChange();
    this.handleCurrentChange();
  },
  methods: {
    //页大小点击事件
    handleSizeChange(size) {
      this.page.pagesize = size;
      this.show();
    },
    //当前页点击事件
    handleCurrentChange(index) {
      this.page.pageindex = index;
      this.show();
    },
    //显示方法
    show() {
      const searchcontra = {
        params: {
          name: this.formInline.user,
          pageindex: this.page.pageindex,
          pagesize: this.page.pagesize,
        },
      };

      this.axios
        .get("https://localhost:44360/api/Personnel/GetData", searchcontra)
        .then((res) => {
          this.tableData = res.data.Data;
          this.page.total = res.data.PageCount;
        });
    },
    //信息按钮
    info(id) {
      alert("序号ID为：" + id);
    },
  },
};
</script>
<style>
.box-card {
  width: 100;
}
</style>