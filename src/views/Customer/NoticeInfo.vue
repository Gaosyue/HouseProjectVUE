<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="dialogFormVisibleNo = true"
          >添加</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="Title" label="标题" width="180"> </el-table-column>
      <el-table-column prop="Content" label="内容" width="180">
      </el-table-column>
      <el-table-column prop="ReleaseTime" label="发布时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.ReleaseTime.substring(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column prop="PublishUser" label="发布人" width="180">
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

    <el-dialog title="编辑公告" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item label="公告标题" :label-width="formLabelWidth">
                <el-input v-model="form.Title" autocomplete="off"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                label="公告内容"
                :label-width="formLabelWidth"
                prop="ContractName"
              >
                <el-input v-model="form.Content" autocomplete="off"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item
                label="发布人"
                :label-width="formLabelWidth"
                prop="OriginalAmount"
              >
                <el-input
                  v-model="form.PublishUser"
                  autocomplete="off"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                label="合同签约日期"
                :label-width="formLabelWidth"
                prop="SigningDate"
              >
                <el-date-picker
                  v-model="form.ReleaseTime"
                  autocomplete="off"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upContractInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加公告" :visible.sync="dialogFormVisibleNo">
      <el-form :model="notice">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item label="公告标题" :label-width="formLabelWidth">
                <el-input v-model="notice.Title" autocomplete="off"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                label="公告内容"
                :label-width="formLabelWidth"
                prop="ContractName"
              >
                <el-input
                  v-model="notice.Content"
                  autocomplete="off"
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form-item
                label="发布人"
                :label-width="formLabelWidth"
                prop="OriginalAmount"
              >
                <el-input
                  v-model="notice.PublishUser"
                  autocomplete="off"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                label="合同签约日期"
                :label-width="formLabelWidth"
                prop="SigningDate"
              >
                <el-date-picker
                  v-model="notice.ReleaseTime"
                  autocomplete="off"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-form-item label="状态">
                <el-radio-group v-model="notice.State">
                  <el-radio label="1">未选择</el-radio>
                  <el-radio label="2">已选择</el-radio>
                </el-radio-group>
              </el-form-item>
            </div></el-col
          >
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleNo = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        title: "",
      },
      page: {
        pageindex: 1,
        pagesize: 10,
        count: 0,
        total: 0,
      },
      form: {
        Id: "",
        Title: "",
        Content: "",
        ReleaseTime: "",
        PublishUser: "",
        State: "",
      },
      notice: {
        Title: "",
        Content: "",
        ReleaseTime: "",
        PublishUser: "",
        State: "",
      },
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisibleNo: false,
      formLabelWidth: "120px",
    };
  },
  methods: {
    onSubmit() {
      var token = {
        params: {
          title: this.formInline.title,
          pageindex: this.page.pageindex,
          pagesize: this.page.pagesize,
        },
      };
      this.axios
        .get("https://localhost:44360/api/Notice/GetCust", token)
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
            .get("https://localhost:44360/api/Notice/Delete?id=" + id)
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
          "https://localhost:44360/api/Notice/ReverNotice?id=" + this.form.Id
        )
        .then((result) => {
          this.form = result.data.Item;
        });
    },

    upContractInfo() {
      this.axios
        .post("https://localhost:44360/api/Notice/UpReverNotice", this.form)
        .then((result) => {
          if (result.data.Code == "1") {
            this.$message.success("修改成功");
            this.onSubmit();
          }
        });
      this.dialogFormVisible = false;
    },
    add() {
      this.axios
        .post("https://localhost:44360/api/Notice/CreateAdd", this.notice)
        .then((result) => {
          if (result.data == true) {
            this.$message.success("保存成功");
            this.dialogFormVisibleNo = false;
            this.onSubmit();
          } else {
            this.$message.error("添加失败");
            this.dialogFormVisibleNo = false;
            this.onSubmit();
          }
        });
    },
  },
  created() {
    this.onSubmit();
  },
};
</script>

<style lang="sass" scoped>
</style>