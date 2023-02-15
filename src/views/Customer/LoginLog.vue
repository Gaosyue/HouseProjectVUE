<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="User" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="LoginTime" label="登录时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.LoginTime.substring(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column prop="PCIP" label="Ip地址"> </el-table-column>
      <el-table-column prop="PCName" label="计算机名称"> </el-table-column>
      <el-table-column prop="OS" label="操作系统"> </el-table-column>
      <el-table-column prop="Browser" label="浏览器名称"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: {
        pageindex: 1,
        pagesize: 10,
        count: 0,
        total: 0,
      },
      tableData: [],
    };
  },
  methods: {
    onSubmit() {
      var token = {
        params: {
          pageindex: this.page.pageindex,
          pagesize: this.page.pagesize,
        },
      };
      this.axios
        .get("https://localhost:44360/api/Login/GetLogin", token)
        .then((res) => {
          var data = res.data;
          if (data.Code == 200) {
            this.tableData = [];
            this.tableData = data.Data;

            this.page.count = data.PageCount;
            this.page.total = data.DataCount;
          }
        });
    },
    handleSizeChange(val) {
      this.page.pagesize = val;
      this.onSubmit();
    },
    handleCurrentChange(val) {
      this.page.pageindex = val;
      this.onSubmit();
    },
  },
  created() {
    this.onSubmit();
  },
};
</script>

<style lang="sass" scoped>
</style>