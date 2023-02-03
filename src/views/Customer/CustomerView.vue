<template>
  <div>
    <h1>查询联系人</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="联系人姓名">
        <el-input v-model="formInline.name" placeholder="联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="录入时间">
        <el-date-picker
          v-model="formInline.entrytime"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker
          v-model="formInline.endtime"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <h1>联系人信息</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="CustomerId" label="序号" width="180">
      </el-table-column>
      <el-table-column prop="Name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="Post" label="职务" width="180"> </el-table-column>
      <el-table-column prop="Phone" label="部门" width="180"> </el-table-column>
      <el-table-column prop="Dep" label="电话" width="180"> </el-table-column>
      <el-table-column prop="Email" label="Email" width="180">
      </el-table-column>
      <el-table-column prop="EntryTime" label="录入时间" width="180">
      </el-table-column>
      <el-table-column label="客户">
        <el-button size="mini" @click="Jump">查看</el-button>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
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
      tableData: [],
      page: {
        pageindex: 1,
        pagedata: 10,
        total: 0,
        totalpage: 0,
      },
      formInline: {
        name: "",
        entrytime: "",
        endtime: "",
      },
    };
  },
  methods: {
    onSubmit() {
      var token = {
        params: {
          name: this.formInline.name,
          entrytime: this.formInline.entrytime,
          endtime: this.formInline.endtime,
          pageindex: this.page.pageindex,
          pagesize: this.page.pagedata,
        },
      };
      this.axios
        .get("https://localhost:44360/api/Customerinfo/GetPerson", token)
        .then((res) => {
          var data = res.data;
          if (data.Code == 200) {
            this.tableData = [];
            this.tableData = data.Data;

            this.page.total = data.PageCount;
            this.page.totalpage = data.PageSize;
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    Jump() {
      this.$router.push("/CustomerEntry");
    },
  },
  created() {
    this.onSubmit();
  },
};
</script>

<style>
</style>