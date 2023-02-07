<template>
  <div>
    <h1>合同信息</h1>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="合同编号" label-width="200px" prop="contractId">
            <el-input v-model="form.ContractId" disabled></el-input>
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
          <el-form-item
            label="合同名称"
            label-width="200px"
            prop="contractName"
          >
            <el-input v-model="form.ContractName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item
            label="建设单位"
            label-width="200px"
            prop="ConstructionUnit"
          >
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
          <el-form-item label="工程负责人电话" label-width="200px" prop="Phone">
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
          <el-form-item
            label="合同签约日期"
            label-width="200px"
            prop="SigningDate"
          >
            <el-date-picker
              v-model="form.SigningDate"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <h1 style="text-align: left">客户信息</h1>

      <el-form ref="form" :model="foom" label-width="80px">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item label="客户名称">
                <el-select
                  v-model="foom.CustomerName"
                  placeholder="请选择"
                  @change="bindCustomer"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in custList"
                    :key="item.Id"
                    :label="item.CustomerName"
                    :value="item.Number"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="客户编号">
                <el-input v-model="foom.Number" disabled></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item label="客户名称">
                <el-input v-model="foom.CustomerName" disabled></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="公司地址">
                <el-input v-model="foom.CompanyAddress" disabled></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item label="联系人">
                <el-input v-model="foom.Contacts" disabled></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="公司电话">
                <el-input v-model="foom.Telephone" disabled></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
      </el-form>
      <h1>合同签约信息</h1>
      <el-button type="text" @click="dialogFormVisible = true">添加</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="AgreementName" label="协议名称" width="180">
        </el-table-column>
        <el-table-column prop="BuiltupArea" label="建筑面积"> </el-table-column>
        <el-table-column prop="ActualAmount" label="实际合同额">
        </el-table-column>
        <el-table-column prop="ChargingStatus" label="收费状态">
          <template slot-scope="scope">
            <span v-if="scope.row.ChargingStatus">已结清</span>
            <span v-else>未结清</span>
          </template>
        </el-table-column>
        <el-table-column prop="Remarks" label="备注"> </el-table-column>
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

      <el-dialog title="添加合同签约信息" :visible.sync="dialogFormVisible">
        <el-form :model="fom">
          <el-form-item
            label="协议名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="fom.AgreementName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="建筑面积"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="fom.BuiltupArea" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="实际合同额"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="fom.ActualAmount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="收费状态"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-radio
              v-model="fom.ChargingStatus"
              label="true"
              autocomplete="off"
              >已收费</el-radio
            >
            <el-radio
              v-model="fom.ChargingStatus"
              label="false"
              autocomplete="off"
              >未付费</el-radio
            >
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" prop="name">
            <el-input v-model="fom.Remarks" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>

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
      tableData: [], //合同签约信息
      custList: [], //客户信息
      //合同信息
      form: {
        ContractId: "", //合同编号
        ContractNum: "",
        ContractName: "",
        ConstructionUnit: "",
        ProjectLeader: "",
        Phone: "",
        FirstParty: "",
        FirstPhone: "",
        ProjectlLocation: "",
        OriginalAmount: "",
        ActualAmount: "",
        SigningDate: "",
        CustomerId: "",
      },
      //合同信息
      fom: {
        ContractId: "",
        AgreementName: "",
        BuiltupArea: "",
        ActualAmount: "",
        ChargingStatus: "true",
        Remarks: "",
      },
      //客户信息
      foom: {
        Number: "",
        CustomerName: "",
        CompanyAddress: "",
        Contacts: "",
        Telephone: "",
        BankAccount: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        ContractName: [
          { required: true, message: "合同名称", trigger: "blur" },
        ],
        ConstructionUnit: [
          { required: true, message: "建设单位", trigger: "blur" },
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
      this.form.CustomerId = this.foom.Number;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.axios
            .post(
              "https://localhost:44360/api/ContractInfo/SubscrAdd",
              this.form
            )
            .then((result) => {
              if (result.data) {
                this.axios
                  .post(
                    "https://localhost:44360/api/ContractInfo/InsertFileInfo",
                    this.tableData
                  )
                  .then((result) => {
                    if (result.data) {
                      this.$message.success("保存成功");
                    } else {
                      this.$message.error("添加失败");
                    }
                  });
              } else {
                this.$message.error("请补全基础信息!");
                return false;
              }
            });
        } else {
          this.$message.error("请补全基础信息!");
          return false;
        }
      });
    },
    //绑定的下拉框
    getCust() {
      this.axios
        .get("https://localhost:44360/api/Customerinfo/Customer")
        .then((result) => {
          this.custList = result.data.Data;
        });
    },
    //获取详情
    bindCustomer(val) {
      this.axios
        .get("https://localhost:44360/api/Customerinfo/GetCusr?number=" + val)
        .then((result) => {
          this.foom = result.data.Item;
          console.log(this.foom);
          console.log(result.data.Item);
        });
    },
    //添加联系人到redis里
    add() {
      this.fom.ContractId = this.form.ContractId;
      this.axios
        .post(
          "https://localhost:44360/api/ContractInfo/SubscriptionAddRedis",
          this.fom
        )
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
    //根据客户编号查询客户已经添加到redis里的联系人列表
    GetAll() {
      this.axios
        .get(
          "https://localhost:44360/api/ContractInfo/GetRedisSubscr?cusid=" +
            this.form.ContractId
        )
        .then((res) => {
          this.tableData = res.data;
        });
    },
    //获取合同编号
    getCodeNum() {
      this.axios(
        "https://localhost:44360/api/ContractInfo/GetDateTimeCode"
      ).then((res) => {
        this.form.ContractId = res.data;
        this.fom.ContractId = res.data;
      });
    },
  },
  //vue生命周期
  created() {},
  mounted() {
    this.getCodeNum();
    this.getCust();
    this.GetAll();
  },
};
</script>