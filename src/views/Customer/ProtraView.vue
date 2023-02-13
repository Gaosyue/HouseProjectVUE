<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="StartTime"
        label="项目开始时间"
        label-width="200px"
      >
        <template slot-scope="scope">
          {{ scope.row.StartTime.substring(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column prop="EndTime" label="项目结束时间" label-width="200px">
        <template slot-scope="scope">
          {{ scope.row.EndTime.substring(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column prop="Overview" label="项目概况" label-width="200px">
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
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>

    <el-dialog title="编辑项目信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item
                label="项目开始时间"
                label-width="200px"
                prop="StartTime"
              >
                <el-date-picker
                  v-model="form.StartTime"
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
                  v-model="form.EndTime"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item label="项目概况">
                <el-input type="textarea" v-model="form.Overview"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light"></div
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
      formInline: {},
      tableData: [],
      page: {
        pageindex: 1,
        pagesize: 10,
        count: 0,
        total: 0,
      },
      form: {
        Id: "",
        ContractId: "",
        StartTime: "",
        EndTime: "",
        Overview: "",
        EntryTime: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        StartTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        EndTime: [
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
          name: this.formInline.name,
          pageindex: this.page.pageindex,
          pagesize: this.page.pagesize,
        },
      };
      this.axios
        .get("https://localhost:44360/api/Projectinfo/GetPerson", token)
        .then((res) => {
          var data = res.data;
          if (data.Code == 200) {
            this.tableData = [];
            this.tableData = data.Data;

            this.page.count = data.PageCount;
            this.page.total = data.DataCount;
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
              "https://localhost:44360/api/Projectinfo/DelProject?id=" + id
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
          "https://localhost:44360/api/Projectinfo/ReverProject?id=" +
            this.form.Id
        )
        .then((result) => {
          this.form = result.data.Item;
        });
    },

    upContractInfo() {
      this.axios
        .post(
          "https://localhost:44360/api/Projectinfo/UpContractInfo",
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
  },
  created() {
    this.onSubmit();
  },
};
</script>

<style lang="sass" scoped>
</style>