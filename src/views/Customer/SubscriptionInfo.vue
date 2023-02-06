<template>
  <div>
    <el-dialog title="合同金额" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="ContractId"
          label="合同Id"
          width="200"
        ></el-table-column>
        <el-table-column
          property="AmountRecorded"
          label="入账金额"
          width="200"
        ></el-table-column>
        <el-table-column
          property="Contractinfo"
          label="合同信息"
          width="200"
        ></el-table-column>
        <el-table-column
          property="RecordedTime"
          label="入账时间"
          width="150"
        ></el-table-column>
        <el-table-column
          property="Remarks"
          label="备注"
          width="200"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <h1>查询合同收费</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="合同名称:">
        <el-input
          v-model="formInline.agreementName"
          placeholder="合同名称"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <h1>联系人信息</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="ContractId" label="合同编号" width="180">
      </el-table-column>
      <el-table-column prop="AgreementName" label="协议名称" width="180">
      </el-table-column>
      <el-table-column prop="BuiltupArea" label="建筑面积" width="180">
      </el-table-column>
      <el-table-column prop="ActualAmount" label="实际合同额" width="180">
      </el-table-column>
      <el-table-column prop="ChargingStatus" label="收费状态" width="180">
      </el-table-column>
      <el-table-column label="详细">
        <el-button type="text" @click="dialogTableVisible = true"
          >查看</el-button
        >
      </el-table-column>
      <el-table-column label="收费">
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
      gridData: [],
      tableData: [],
      dialogTableVisible: false,
      page: {
        pageindex: 1,
        pagedata: 10,
        total: 0,
        totalpage: 0,
      },
      formInline: {
        agreementName: "",
      },
    };
  },
  methods: {
    onSubmit() {
      var token = {
        params: {
          agreementName: this.formInline.agreementName,
          pageindex: this.page.pageindex,
          pagesize: this.page.pagedata,
        },
      };
      this.axios
        .get("https://localhost:44360/api/ContractInfo/GetPerson", token)
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
    onsu() {
      this.axios
        .get("https://localhost:44360/api/ContractInfo/GetContract")
        .then((result) => {
          var data = result.data;
          if (data.Code == 200) {
            this.gridData = [];
            this.gridData = data.Data;
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    Jump() {},
  },
  created() {
    this.onSubmit();
    this.onsu();
  },
};
</script>

<style>
</style>