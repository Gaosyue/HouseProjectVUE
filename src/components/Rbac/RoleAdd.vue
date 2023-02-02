<template>
  <div>
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="权限名称">
        <el-input v-model="sizeForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch
          v-model="sizeForm.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sizeForm: {
        roleName: "",
        state: true,
      },
    };
  },
  methods: {
    onSubmit() {
      this.axios
        .post("https://localhost:5001/api/Role/CreateAdd", this.sizeForm)
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
  },
};
</script>