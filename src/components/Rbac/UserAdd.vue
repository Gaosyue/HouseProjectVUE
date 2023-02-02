<template>
  <div>
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="人力资源">
        <el-select v-model="sizeForm.humanId" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="sizeForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="sizeForm.pwd" type="password"></el-input>
      </el-form-item>

      <el-form-item label="部门">
        <el-select v-model="sizeForm.classId" placeholder="请选择活动区域">
          <el-option label="区域一" value="0"></el-option>
          <el-option label="区域二" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="在职状态">
        <el-radio
          v-model="sizeForm.onlineState"
          label="在职"
          value="1"
        ></el-radio>
        <el-radio
          v-model="sizeForm.onlineState"
          label="离职"
          value="2"
        ></el-radio>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="https://localhost:5001/api/Personnel/FileLoad"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
            style="wdth: 180px; height: 60px"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: "",
      sizeForm: {
        humanId: "",
        name: "",
        account: "",
        pwd: "",
        classId: 0,
        onlineState: "",
        handIcon: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.axios
        .post("https://localhost:5001/api/Personnel/CreateAdd", this.sizeForm)
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
    handleAvatarSuccess(val) {
      console.log(val);
      this.imageUrl = val;
      this.sizeForm.handIcon = val;
    },
  },
};
</script>

