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
        <el-button type="primary" @click="add">添加</el-button>
        <el-button type="success" icon="el-icon-loading" @click="expor"
          >导出</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="ContractId" label="合同编号" width="180">
      </el-table-column>
      <el-table-column prop="ContractNum" label="合同文本编号" width="180">
      </el-table-column>
      <el-table-column prop="ContractName" label="合同名称" width="180">
      </el-table-column>
      <el-table-column prop="ProjectLeader" label="工程负责人" width="180">
      </el-table-column>
      <el-table-column prop="Phone" label="工程负责人电话" width="180">
      </el-table-column>
      <el-table-column prop="OriginalAmount" label="原始合同额" width="180">
      </el-table-column>
      <el-table-column prop="SigningDate" label="合同签约日期" width="180">
        <template slot-scope="scope">
          {{ scope.row.SigningDate.substring(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.Id)"
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
      :page-sizes="[5, 10, 15]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>

    <el-dialog title="编辑合同" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item label="合同文本编号" :label-width="formLabelWidth">
                <el-input
                  v-model="form.ContractNum"
                  autocomplete="off"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                label="合同名称"
                :label-width="formLabelWidth"
                prop="ContractName"
              >
                <el-input
                  v-model="form.ContractName"
                  autocomplete="off"
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item
                label="工程负责人"
                :label-width="formLabelWidth"
                prop="ProjectLeader"
              >
                <el-input
                  v-model="form.ProjectLeader"
                  autocomplete="off"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                label="工程负责人电话"
                :label-width="formLabelWidth"
                prop="Phone"
              >
                <el-input v-model="form.Phone" autocomplete="off"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item
                label="原始合同额"
                :label-width="formLabelWidth"
                prop="OriginalAmount"
              >
                <el-input
                  v-model="form.OriginalAmount"
                  autocomplete="off"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                label="合同签约日期"
                :label-width="formLabelWidth"
                prop="SigningDate"
              >
                <el-date-picker
                  v-model="form.SigningDate"
                  autocomplete="off"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upContractInfo()">确 定</el-button>
      </div>
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
        pagesize: 10,
        count: 0, //总条数
        total: 0, //总页数
      },
      form: {
        Id: "",
        ContractName: "",
        ProjectLeader: "",
        Phone: "",
        ProjectlLocation: "",
        OriginalAmount: "",
        SigningDate: "",
        Percentage: "",
      },
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        ContractName: [
          { required: true, message: "合同名称不能为空", trigger: "blur" },
        ],
        ProjectLeader: [
          { required: true, message: "工程负责人不能为空", trigger: "blur" },
        ],
        OriginalAmount: [
          { required: true, trigger: "blur", message: "金额不能为空" },
          {
            pattern:
              /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确额格式,可保留两位小数",
          },
        ],
        Phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
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
          pagesize: this.page.pagesize,
        },
      };
      this.axios
        .get("https://localhost:44360/api/ContractInfo/GetCust", token)
        .then((result) => {
          var data = result.data;
          if (data.Code == 200) {
            this.tableData = [];
            this.tableData = data.Data;

            this.page.count = data.DataCount;
            this.page.total = data.PageCount;
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
    handleEdit(id) {
      this.dialogFormVisible = true;
      this.form.Id = id;
      this.reverContractInfo();
    },
    reverContractInfo() {
      this.axios
        .put(
          "https://localhost:44360/api/ContractInfo/ReverContractInfo?id=" +
            this.form.Id
        )
        .then((result) => {
          this.form = result.data.Item;
        });
    },

    upContractInfo() {
      this.axios
        .post(
          "https://localhost:44360/api/ContractInfo/UpContractInfo",
          this.form
        )
        .then((result) => {
          if (result.data.Code == "1") {
            this.$message.success("修改成功");
            this.onSubmit();
          }
        });
      this.dialogFormVisible = false;
    },
    add() {
      this.$router.push("/ContractView");
    },
    expor() {
      this.axios
        .get("https://localhost:44360/api/ContractInfo/PersonNpoiExportExcel")
        .then((result) => {
          if (result.data) {
            this.$message.success("成功");
          }
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