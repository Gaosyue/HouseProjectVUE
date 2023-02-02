<template>
  <div>
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="权限名称">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="上级id">
        <el-select
          v-model="sizeForm.superiorId"
          placeholder="请选择在哪个权限内"
        >
          <el-option
            v-for="val in Selectitem"
            :key="val.Id"
            :value="val.Id"
            :label="val.Name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="sizeForm.url"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit()">添加数据</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: true,
      sizeForm: {
        pageIndex: 0,
        pageSize: 0,
        name: "",
        icon: "",
        superiorId: "",
        url: "",
        orderId: this.value == false ? 0 : 1,
      },
      Selectitem: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.sizeForm.superiorId == null || this.sizeForm.superiorId == "") {
        this.sizeForm.superiorId = 0;
      }

      this.axios
        .post("https://localhost:5001/api/Power/CreateAdd", this.sizeForm)
        .then((res) => {
          var state = res.data;
          if (state == true) {
            this.$emit("Success", "数据传输");
          } else {
            this.$message({
              showClose: true,
              message: "你的数据填写有误",
            });
          }
        });
    },
    //#region  下拉框查询全部数据
    SelectitemShow() {
      this.axios.get("https://localhost:5001/api/Power/GetAll").then((res) => {
        this.Selectitem = res.data.Data;
      });
    },
    //#endregion
  },
  created() {
    this.SelectitemShow();
  },
};
</script>