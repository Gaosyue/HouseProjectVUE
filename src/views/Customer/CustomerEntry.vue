<template>
  <div>
    <h1>客户信息</h1>

    <el-form ref="form" :model="form" label-width="80px">
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="编号" label-width="100px">
            <el-input v-model="form.Number" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="客户名称" label-width="100px" prop="name">
            <el-input v-model="form.CustomerName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="公司地址" label-width="100px" prop="name">
            <el-input v-model="form.CompanyAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="联系人" label-width="100px" prop="name">
            <el-input v-model="form.Contacts"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="公司电话" label-width="100px" prop="tel">
            <el-input v-model="form.Telephone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="开户银行账号" label-width="100px" prop="name">
            <el-input v-model="form.BankAccount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="开户银行名称" label-width="100px" prop="name">
            <el-input v-model="form.BankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="企业代码" label-width="100px" prop="name">
            <el-input v-model="form.EnterpriseCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="客户类型" label-width="100px" prop="name">
            <el-select
              v-model="form.CustomerType"
              placeholder="请选择客户类型"
              style="width: 100%"
            >
              <el-option label="普通客户" value="普通客户"></el-option>
              <el-option label="VIP客户" value="VIP客户"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="所属行业" label-width="100px" prop="name">
            <el-select
              v-model="form.Industry"
              placeholder="请选择所属行业"
              style="width: 100%"
            >
              <el-option label="科教行业" value="科教行业"></el-option>
              <el-option label="运输行业" value="运输行业"></el-option>
              <el-option label="建筑行业" value="建筑行业"></el-option>
              <el-option label="IT行业" value="IT行业"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="信用级别" label-width="100px" prop="name">
            <el-select
              v-model="form.CreditRating"
              placeholder="请选择信用级别"
              style="width: 100%"
            >
              <el-option label="一级" value="一级"></el-option>
              <el-option label="二级" value="二级"></el-option>
              <el-option label="三级" value="三级"></el-option>
              <el-option label="四级" value="四级"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="法定代表" label-width="100px" prop="name">
            <el-input v-model="form.Representative"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="22">
        <el-col :span="11">
          <el-form-item label="纳税人识别号" label-width="100px" prop="name">
            <el-input v-model="form.TaxpayerNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11"> </el-col>
      </el-row>

      <el-row>
        <el-col :span="16"
          ><div class="grid-content bg-purple"><h1>甲方负责人</h1></div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <el-button type="text" @click="dialogFormVisible = true"
              >添加</el-button
            >
          </div></el-col
        >
      </el-row>

      <el-dialog title="添加甲方负责人" :visible.sync="dialogFormVisible">
        <el-form :model="fom">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="fom.Name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职务" :label-width="formLabelWidth" prop="name">
            <el-select
              v-model="fom.Post"
              placeholder="请选择联系人职务"
              style="width: 100%"
            >
              <el-option label="部门经理" value="部门经理"></el-option>
              <el-option label="部门骨干" value="部门骨干"></el-option>
              <el-option label="部门组员" value="部门组员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth" prop="name">
            <el-input v-model="fom.Dep" autocomplete="off"></el-input>
            <el-select
              v-model="fom.Dep"
              placeholder="请选择联系人部门"
              style="width: 100%"
            >
              <el-option label="市场部" value="市场部"></el-option>
              <el-option label="行政部" value="行政部"></el-option>
              <el-option label="业务部" value="业务部"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="name">
            <el-input v-model="fom.Phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email" :label-width="formLabelWidth" prop="name">
            <el-input v-model="fom.Email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="Name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="Post" label="职务"> </el-table-column>
        <el-table-column prop="Dep" label="部门"> </el-table-column>
        <el-table-column prop="Phone" label="电话"> </el-table-column>
        <el-table-column prop="Email" label="Email"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <hr />
      <el-row>
        <el-col :span="16"
          ><div class="grid-content bg-purple"><h1>附件</h1></div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <el-upload
              class="upload-demo"
              action="https://localhost:44360/api/Customerinfo/UpFile/"
              :on-success="handlePreview"
              :show-file-list="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload></div
        ></el-col>
      </el-row>

      <el-table :data="filetable" style="width: 100%">
        <el-table-column prop="FileName" label="文件名" width="180">
        </el-table-column>
        <el-table-column
          prop="UploadTime"
          label="上传时间"
          width="180"
          :formatter="formatTime"
        >
        </el-table-column>

        <el-table-column prop="FileSize" label="文件大小"> </el-table-column>
        <el-table-column prop="FileType" label="文件类型"> </el-table-column>
        <el-table-column prop="Enteredby" label="用户"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="deleteFile(scope.$index, filetable)"
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
      tableData: [], //联系人表
      filetable: [], //附件表
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
        CustomerId: "",
        Name: "",
        Post: "",
        Phone: "",
        Dep: "",
        Email: "",
      },
      fileform: {
        Cus_Id: "",
        Enteredby: "",
        FIleCategroy: "",
        FileName: "",
        FileSize: "",
        FileType: "",
        UploadTime: "",
      },
      rules: {
        name: [{ required: true, message: "必填项！", trigger: "blur" }],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
      },

      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  methods: {
    //格式化时间
    formatTime(row, column) {
      let data = row[column.property];
      let dtime = new Date(data);
      const year = dtime.getFullYear();
      let month = dtime.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = dtime.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let hour = dtime.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      let minute = dtime.getMinutes();
      if (minute < 10) {
        minute = "0" + minute;
      }
      let second = dtime.getSeconds();
      if (second < 10) {
        second = "0" + second;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    deleteFile(index, rows) {
      rows.splice(index, 1);
    },
    onSubmit() {
      console.info(this.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.axios
            .post("https://localhost:44360/api/Customerinfo/CustAdd", this.form)
            .then((result) => {
              if (result.data) {
                this.axios
                  .post(
                    "https://localhost:44360/api/Customerinfo/PersonAdd",
                    this.tableData
                  )
                  .then((res) => {
                    if (res.data) {
                      this.axios
                        .post(
                          "https://localhost:44360/api/Customerinfo/InsertFileInfo",
                          this.filetable
                        )
                        .then((res) => {
                          if (res.data) {
                            this.$message.success("保存成功");
                            this.$router.push("/CustomerInfo");
                          }
                        });
                    }
                  });
              } else {
                this.$message.error("添加失败");
              }
            });
        } else {
          this.$message.error("请补全基础信息!");
          return false;
        }
      });
    },
    //添加联系人到redis里
    add() {
      this.fom.CustomerId = this.form.Number;
      this.axios
        .post(
          "https://localhost:44360/api/Customerinfo/PersonAddRedis",
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
          "https://localhost:44360/api/Customerinfo/GetRedisPersoncharge?cusid=" +
            this.form.Number
        )
        .then((res) => {
          this.tableData = res.data;
        });
    },
    //获取客户编号
    getCodeNum() {
      this.axios(
        "https://localhost:44360/api/Customerinfo/GetDateTimeCode"
      ).then((res) => {
        this.form.Number = res.data;
      });
    },
    //上传之后的回调函数
    handlePreview(result) {
      this.fileform = result;
      this.fileform.Cus_Id = this.form.Number;
      this.fileform.FIleCategroy = "客户附件";
      //从页面localStorage里取出登录员的json对象
      var user = localStorage.getItem("UserInfo");
      //系列化为对象
      var username = JSON.parse(user).Name;

      this.fileform.Enteredby = username;
      //把数据添加到redis里
      this.axios
        .post(
          "https://localhost:44360/api/Customerinfo/FileinfoAddRedis",
          this.fileform
        )
        .then((res) => {
          if (res.data) {
            //读取redis里的数据存入页面数组里用于显示
            this.axios(
              "https://localhost:44360/api/Customerinfo/GetRedisFileinfo?cusid=" +
                this.form.Number
            ).then((res) => {
              this.filetable = res.data;
            });
          }
        });
    },
  },
  created() {
    this.getCodeNum();
  },
};
</script>