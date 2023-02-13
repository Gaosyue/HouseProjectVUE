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
      <el-table-column prop="ContractName" label="合同名称" width="180">
      </el-table-column>
      <el-table-column prop="ConstructionUnit" label="建设单位" width="180">
      </el-table-column>
      <el-table-column prop="FirstParty" label="甲方负责人" width="180">
      </el-table-column>
      <el-table-column prop="FirstPhone" label="甲方负责人电话" width="180">
      </el-table-column>
      <el-table-column
        prop="OriginalAmount"
        label="原始合同额(万元)"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="ActualAmount"
        label="实际合同额（万元）"
        width="100"
      >
      </el-table-column>
      <el-table-column label="收费比例">
        <template slot-scope="scope">
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="(scope.row.Percentage / scope.row.ActualAmount) * 100"
            status="success"
          ></el-progress>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="subcri(scope.row.ContractId)"
            >收费</el-button
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

    <el-dialog title="收货详细列表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="Id"
          label="序号"
          width="200"
        ></el-table-column>
        <el-table-column
          property="AmountRecorded"
          label="入账金额（万元）"
        ></el-table-column>
        <el-table-column
          property="Contractinfo"
          label="合同信息"
        ></el-table-column>
        <el-table-column property="RecordedTime" label="入账时间">
          <template slot-scope="scope">
            {{ scope.row.RecordedTime.substring(0, 10) }}
          </template>
        </el-table-column>
        <el-table-column property="Remarks" label="备注"></el-table-column>
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
        @size-change="dialogSizeChange"
        @current-change="dialogCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="dialogpage.pagesize"
        layout="total, prev, pager, next"
        :total="dialogpage.total"
      >
      </el-pagination>

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :span="22">
          <el-col :span="11">
            <el-form-item label="入账金额" prop="AmountRecorded">
              <el-input
                v-model="form.AmountRecorded"
                placeholder="单位（万元）"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="合同信息" prop="Contractinfo">
              <el-input v-model="form.Contractinfo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="22">
          <el-col :span="11">
            <el-form-item label="入账时间" prop="RecordedTime">
              <el-date-picker
                v-model="form.RecordedTime"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="备注" prop="Remarks">
              <el-input v-model="form.Remarks"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="addsub">收款</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      dialogpage: {
        pageindex: 1,
        pagedata: 5,
        total: 0,
        totalpage: 0,
      },
      form: {
        ContractId: "",
        AmountRecorded: "",
        Contractinfo: "",
        RecordedTime: "",
        Remarks: "",
      },
      tableData: [],
      gridData: [],
      dialogTableVisible: false,
      rules: {
        AmountRecorded: [
          { required: true, trigger: "blur", message: "金额不能为空" },
          {
            pattern:
              /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确额格式,可保留两位小数",
          },
        ],
        Contractinfo: [
          { required: true, message: "合同名称不能为空", trigger: "blur" },
        ],
        Remarks: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        SigningDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
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

    subcri(id) {
      this.dialogTableVisible = true;
      this.form.ContractId = id;
      var token = {
        params: {
          pageindex: this.dialogpage.pageindex,
          pagesize: this.dialogpage.pagedata,
        },
      };
      this.axios
        .get(
          "https://localhost:44360/api/ContractInfo/GetContractChargesList?contractId=" +
            id,
          token
        )
        .then((result) => {
          var data = result.data;
          if (data.Code == 200) {
            this.gridData = data.Data;

            this.dialogpage.total = data.DataCount;
            this.dialogpage.totalpage = data.PageCount;
          }
        });
    },
    addsub() {
      this.axios
        .post("https://localhost:44360/api/ContractInfo/ContractAdd", this.form)
        .then((result) => {
          if (result.data == true) {
            this.$message.success("保存成功");
            this.dialogTableVisible = false;
            this.onSubmit();
          } else {
            this.$message.error("添加失败");
            this.dialogTableVisible = false;
          }
        });
    },
    handleSizeChange(val) {
      this.page.PageSize = val;
      this.onSubmit();
    },
    handleCurrentChange(val) {
      this.page.pageindex = val;
      this.onSubmit();
    },
    dialogSizeChange(val) {
      this.dialogpage.PageSize = val;
      this.onSubmit();
    },
    dialogCurrentChange(val) {
      this.dialogpage.pageindex = val;
      this.onSubmit();
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
              "https://localhost:44360/api/ContractInfo/DelContractCharges?id=" +
                id
            )
            .then((result) => {
              if (result.data > 0) {
                this.$message.success("删除成功");
                this.addsub();
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