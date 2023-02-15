<template>
  <div>
    <h1>外勤申请列表</h1>
    <el-button type="primary" round @click="insert()">新增申请</el-button>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="ProjectName" label="项目/事由" width="100">
      </el-table-column>
      <el-table-column prop="Place" label="地点" width="100"> </el-table-column>
      <el-table-column prop="StartTime" label="开始时间" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.StartTime | dataFormat("yyyy-MM-dd") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="EndTime" label="结束时间" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.EndTime | dataFormat("yyyy-MM-dd") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Duration" label="外勤市场（小时）" width="100">
      </el-table-column>
      <el-table-column prop="Kilometers" label="路程"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            round
            plain
            @click="getinfo(scope.row.Id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            round
            plain
            @click="del(scope.row.Id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--Dialog 弹框添加修改 -->
    <el-dialog title="添加/修改请假申请" :visible.sync="dialogFormVisible">
      {{ this.form }}
      <el-form :model="form" ref="form" label-width="100px" class="demo-form">
        <el-form-item label="事由/项目：" prop="name">
          <el-input v-model="form.ProjectName" style="width: 100%"> </el-input>
        </el-form-item>
        <el-form-item label="地点：" prop="name">
          <el-input v-model="form.Place" style="width: 100%"> </el-input>
        </el-form-item>
        <el-form-item label="申请时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="开始时间"
                v-model="form.StartTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-item prop="date2">
              <el-date-picker
                placeholder="结束时间"
                type="date"
                v-model="form.EndTime"
                style="width: 100%"
              ></el-date-picker>
            </el-date-item>
          </el-col>
        </el-form-item>
        <el-form-item label="加班时常" prop="name">
          <el-input
            v-model="form.Duration"
            type="number"
            style="width: 80%"
          ></el-input
          >小时(数字必填)
        </el-form-item>
        <el-form-item label="公里数" prop="name">
          <el-input
            v-model="form.Kilometers"
            type="number"
            style="width: 80%"
          ></el-input
          >小时(数字必填)
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      //dialog弹框控制器
      dialogFormVisible: false,
      form: {
        Id: 0,
        ProjectName: "",
        Place: "",
        StartTime: "",
        EndTime: "",
        Duration: "",
        Kilometers: "",
        Applicant: "",
      },
    };
  },
  methods: {
    getlist() {
      //获取local里的用户对象
      var userinfo = localStorage.getItem("UserInfo");
      //格式化对象后取出用户名
      var userid = JSON.parse(userinfo).Id;
      this.axios(
        "https://localhost:44360/api/Application/GetTravelApplication?applicant=" +
          userid
      ).then((res) => {
        this.list = res.data.Data;
      });
    },
    getinfo(id) {
      this.axios(
        "https://localhost:44360/api/Application/GetTravelModel?id=" + id
      ).then((res) => {
        this.form = res.data.Item;
        this.dialogFormVisible = true;
      });
    },
    insert() {
      this.dialogFormVisible = true;
    },
    resetForm() {
      this.form = {};
      this.dialogFormVisible = false;
      this.getlist();
    },
    save() {
      //获取local里的用户对象
      var userinfo = localStorage.getItem("UserInfo");
      //格式化对象后取出用户名
      this.form.Applicant = JSON.parse(userinfo).Id;
      this.axios
        .post("https://localhost:44360/api/Application/TravelSave", this.form)
        .then((res) => {
          if (res.data) {
            this.dialogFormVisible = false;
            this.$message.success("保存成功");
            this.form = {};
            this.getlist();
          }
        });
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .delete(
              "https://localhost:44360/api/Application/DelTravel?id=" + id
            )
            .then((res) => {
              if (res.data) {
                this.getlist();
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
  mounted() {
    this.getlist();
  },
  filters: {
    // 私有局部过滤器，只能在 当前 VM 对象所控制的 View 区域进行使用
    dataFormat(input, pattern = "") {
      // 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
      var dt = new Date(input);
      // 获取年月日
      var y = dt.getFullYear();
      var m = (dt.getMonth() + 1).toString().padStart(2, "0");
      var d = dt.getDate().toString().padStart(2, "0");
      // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
      // 否则，就返回  年-月-日 时：分：秒
      if (pattern.toLowerCase() === "yyyy-mm-dd") {
        return `${y}-${m}-${d}`;
      } else {
        // 获取时分秒
        var hh = dt.getHours().toString().padStart(2, "0");
        var mm = dt.getMinutes().toString().padStart(2, "0");
        var ss = dt.getSeconds().toString().padStart(2, "0");
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
      }
    },
  },
};
</script>
<style>
h2 {
  text-align: left;
}
</style>