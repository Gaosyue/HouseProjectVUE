<template>
  <div>
    <h1>合同信息</h1>

    <el-form ref="form" :model="form" label-width="80px">
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="合同编号" label-width="200px">
            <el-input v-model="form.ContractId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="合同文本编号" label-width="200px">
            <el-input v-model="form.ContractNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="合同名称" label-width="200px">
            <el-input v-model="form.ContractName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="建设单位" label-width="200px">
            <el-input v-model="form.ConstructionUnit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="工程负责人" label-width="200px">
            <el-input v-model="form.ProjectLeader"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工程负责人电话" label-width="200px">
            <el-input v-model="form.Phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="甲方负责人" label-width="200px">
            <el-input v-model="form.FirstParty"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="甲方负责人电话" label-width="200px">
            <el-input v-model="form.FirstPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="工程地点" label-width="200px">
            <el-input v-model="form.ProjectlLocation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="原始合同额" label-width="200px">
            <el-input v-model="form.OriginalAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="实际合同额" label-width="200px">
            <el-input v-model="form.ActualAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="合同签约日期" label-width="200px">
            <el-date-picker
              v-model="form.SigningDate"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <h1>甲方负责人</h1>
      <el-button type="text" @click="dialogFormVisible = true">添加</el-button>

      <el-dialog title="添加甲方负责人" :visible.sync="dialogFormVisible">
        <el-form :model="fom">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="fom.Name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职务" :label-width="formLabelWidth">
            <el-input v-model="fom.Post" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth">
            <el-input v-model="fom.Dep" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="fom.Phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email" :label-width="formLabelWidth">
            <el-input v-model="fom.Email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="DustomerId" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="Name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="Post" label="职务"> </el-table-column>
        <el-table-column prop="Dep" label="部门"> </el-table-column>
        <el-table-column prop="Phone" label="电话"> </el-table-column>
        <el-table-column prop="Email" label="Email"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <h1>附件</h1>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="FileName" label="文件名" width="180">
        </el-table-column>
        <el-table-column prop="UploadTime" label="上传时间" width="180">
        </el-table-column>
        <el-table-column prop="FileSize" label="文件大小"> </el-table-column>
        <el-table-column prop="FileType" label="文件类型"> </el-table-column>
        <el-table-column prop="Enteredby" label="用户"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      form: {
        Number: "",
        CustomerName: "",
        CompanyAddress: "",
        Contacts: "",
        Telephone: "",
        BankAccount: "",
        BankName: "",
        EnterpriseCode: "",
        CustomerType: "",
        Industry: "",
        CreditRating: "",
        Representative: "",
        TaxpayerNum: "",
      },
      fom: {
        DustomerId: "",
        Name: "",
        Post: "",
        Phone: "",
        Dep: "",
        Email: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  methods: {
    onSubmit() {
      console.info(this.form);
      this.axios
        .post("https://localhost:44360/api/Customerinfo/CustAdd", this.form)
        .then((result) => {
          if (result.data == true) {
            this.$message.success("保存成功");
          } else {
            this.$message.error("添加失败");
          }
        });
    },

    add() {
      this.axios
        .post("https://localhost:44360/api/Customerinfo/PersonAdd", this.fom)
        .then((result) => {
          if (result.data == true) {
            this.$message.success("保存成功");
            this.dialogFormVisible = false;
            this.GetAll();
          } else {
            this.$message.error("添加失败");
            this.dialogFormVisible = false;
            this.GetAll();
          }
        });
    },
    GetAll() {
      this.axios
        .get("https://localhost:44360/api/Customerinfo/GetPerson")
        .then((res) => {
          this.tableData = res.data;
        });
    },
  },
  created() {
    this.GetAll();
  },
};
</script>