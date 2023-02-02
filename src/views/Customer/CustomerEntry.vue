<template>
  <div>
    <h1>客户信息</h1>

    <el-form ref="form" :model="form" label-width="80px">
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="编号">
            <el-input v-model="form.Number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="客户名称">
            <el-input v-model="form.CustomerName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="公司地址">
            <el-input v-model="form.CompanyAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="联系人">
            <el-input v-model="form.Contacts"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="公司电话">
            <el-input v-model="form.Telephone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="开户银行账号">
            <el-input v-model="form.BankAccount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="开户银行名称">
            <el-input v-model="form.BankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="企业代码">
            <el-input v-model="form.EnterpriseCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="客户类型">
            <el-select v-model="form.CustomerType" placeholder="请选择客户类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="所属行业">
            <el-select v-model="form.Industry" placeholder="请选择所属行业">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="信用级别">
            <el-select v-model="form.CreditRating" placeholder="请选择信用级别">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="法定代表">
            <el-input v-model="form.Representative"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="纳税人识别号">
            <el-input v-model="form.TaxpayerNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11"> </el-col>
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