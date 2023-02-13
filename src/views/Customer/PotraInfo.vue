<template>
  <div>
    <div style="width: 90%">
      <div>
        <h4 style="text-align: left">项目信息</h4>
        <el-form ref="form" :model="ContractInfo" label-width="80px">
          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="项目名称" label-width="200px">
                  <el-input
                    v-model="ContractInfo.ContractName"
                    readonly
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="合同关联" label-width="200px">
                  <el-select
                    v-model="ContractInfo.ContractId"
                    placeholder="请选择客户"
                    @change="bindContract"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in ContractList"
                      :key="item.ContractId"
                      :label="item.ContractName"
                      :value="item.ContractId"
                    ></el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
          </el-row>

          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <el-form-item label="建设单位" label-width="200px">
                  <el-input
                    v-model="ContractInfo.ConstructionUnit"
                    readonly
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="工程地点" label-width="200px">
                  <el-input
                    v-model="ContractInfo.ProjectlLocation"
                    readonly
                  ></el-input>
                </el-form-item></div
            ></el-col>
          </el-row>

          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="合同额" label-width="200px">
                  <el-input
                    v-model="ContractInfo.ActualAmount"
                    readonly
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <el-form-item label="甲方负责人" label-width="200px">
                  <el-input
                    v-model="ContractInfo.FirstParty"
                    readonly
                  ></el-input>
                </el-form-item></div
            ></el-col>
          </el-row>

          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="甲方负责人电话" label-width="200px">
                  <el-input
                    v-model="ContractInfo.FirstPhone"
                    readonly
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="项目负责人" label-width="200px">
                  <el-input
                    v-model="ContractInfo.ProjectLeader"
                    readonly
                  ></el-input>
                </el-form-item></div
            ></el-col>
          </el-row>

          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <el-form-item
                  label="项目开始时间"
                  label-width="200px"
                  prop="StartTime"
                >
                  <el-date-picker
                    v-model="Projectinfo.StartTime"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%"
                  >
                  </el-date-picker>
                </el-form-item></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <el-form-item
                  label="项目完成时间"
                  label-width="200px"
                  prop="EndTime"
                >
                  <el-date-picker
                    v-model="Projectinfo.EndTime"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%"
                  >
                  </el-date-picker>
                </el-form-item></div
            ></el-col>
          </el-row>

          <el-col :span="24"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="项目概况">
                <el-input
                  type="textarea"
                  v-model="Projectinfo.Overview"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <div>
            <h1>项目高清图</h1>
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

              <el-table-column prop="FileSize" label="文件大小">
              </el-table-column>
              <el-table-column prop="FileType" label="文件类型">
              </el-table-column>
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
              <el-button type="primary" @click="Add">添加</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //合同信息
      ContractInfo: {
        ContractId: "",
        ContractName: "",
        ConstructionUnit: "",
        ProjectLeader: "",
        FirstPhone: "",
        FirstParty: "",
        ProjectlLocation: "",
        ActualAmount: "",
      },
      //立项信息
      Projectinfo: {
        ContractId: "",
        StartTime: "",
        EndTime: "",
        Overview: "",
      },
      fileform: {
        Cus_Id: "", //项目编号
        FileName: "",
        UploadTime: "",
        FileSize: "",
        FileType: "",
        Enteredby: "",
        Url: "",
        FIleCategroy: "项目附件",
      },
      filetable: [],
      //合同信息集合
      ContractList: [],
      customer: {
        CustomerName: "",
        Number: "",
        CompanyAddress: "",
        Telephone: "",
      },
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
    //查询合同列表放入下拉框
    GetContract() {
      this.axios
        .get("https://localhost:44360/api/Projectinfo/GetContractInfo")
        .then((res) => {
          this.ContractList = res.data.Data;
        });
    },

    //获取下拉框选中的合同Id反填页面控件
    bindContract(val) {
      this.axios
        .get(
          "https://localhost:44360/api/Projectinfo/GetContractChargesId?id=" +
            val
        )
        .then((res) => {
          this.ContractInfo = res.data.Item;
        });
    },
    Add() {
      this.Projectinfo.ContractId = this.ContractInfo.ContractId;
      this.axios
        .post(
          "https://localhost:44360/api/Projectinfo/Add_project",
          this.Projectinfo
        )
        .then((res) => {
          if (res.data.Code == "1") {
            this.$message("添加成功");
            this.Get();
          }
        });
    },
    //上传之后的回调函数
    handlePreview(result) {
      this.fileform = result;
      this.fileform.Cus_Id = this.ContractInfo.ContractId;
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
                this.ContractInfo.ContractId
            ).then((res) => {
              this.filetable = res.data;
            });
          }
        });
    },
  },

  created() {
    this.GetContract();
  },
};
</script>
<style>
</style>