<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="合同名称">
        <el-input
          v-model="formInline.contractName"
          placeholder="合同名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="ContractId" label="合同编号" width="180">
      </el-table-column>
      <el-table-column prop="ContractNum" label="合同文本编号" width="180">
      </el-table-column>
      <el-table-column prop="ContractName" label="合同名称" width="180">
      </el-table-column>
      <el-table-column prop="ConstructionUnit" label="建设单位" width="180">
      </el-table-column>
      <el-table-column prop="ProjectLeader" label="工程负责人" width="180">
      </el-table-column>
      <el-table-column prop="Phone" label="工程负责人电话" width="180">
      </el-table-column>
      <el-table-column prop="FirstParty" label="甲方负责人" width="180">
      </el-table-column>
      <el-table-column prop="FirstPhone" label="甲方负责人电话" width="180">
      </el-table-column>
      <el-table-column prop="ProjectlLocation" label="工程地点" width="180">
      </el-table-column>
      <el-table-column prop="OriginalAmount" label="原始合同额" width="180">
      </el-table-column>
      <el-table-column prop="ActualAmount" label="实际合同额" width="180">
      </el-table-column>
      <el-table-column prop="SigningDate" label="合同签约日期" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.Id)"
            >删除</el-button
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
      formInline: {
        contractName: "",
      },
      page: {
        pageindex: 1,
        pagedata: 10,
        total: 0,
        totalpage: 0,
      },
      tableData: [],
    };
  },
  methods: {
    onSubmit() {
      var token = {
        params: {
          contractName: this.formInline.contractName,
          pageindex: this.page.pageindex,
          pagesize: this.page.pagedata,
        },
      };
      this.axios
        .get("https://localhost:44360/api/ContractInfo/GetCust", token)
        .then((result) => {
          var data = result.data;
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
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .delete(
              "https://localhost:44360/api/ContractInfo/DelSubscr?id=" + id
            )
            .then((result) => {
              if (result.data > 0) {
                this.$message.success("删除成功");
                this.onSubmit();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.onSubmit();
  },
};
</script>

<style lang="sass" scoped>
</style>