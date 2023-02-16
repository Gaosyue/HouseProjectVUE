<template>
  <div>
    <el-row>
      <el-col :span="16"
        ><div class="grid-content bg-purple">
          <el-card class="box-card">
            <div>
              <div>
                <span style="float: left">考核列表</span>
                <el-button
                  style="float: right"
                  type="danger"
                  size="mini"
                  @click="add"
                  >新建任务</el-button
                >
              </div>
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="TaskNo" label="任务编号" width="110">
                </el-table-column>
                <el-table-column prop="StartTime" label="建立时间" width="110">
                  <template slot-scope="scope">
                    {{ scope.row.StartTime.substr(0, 10) }}
                  </template>
                </el-table-column>
                <el-table-column label="起始-截至时间" width="115">
                  <template slot-scope="scope">
                    {{ scope.row.StartTime.substr(0, 10) }} -
                    {{ scope.row.EndTime.substr(0, 10) }}
                  </template>
                </el-table-column>
                <el-table-column prop="Remarks" label="备注" width="200">
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template slot-scope="scope">
                    <span v-if="scope.row.ArchiveorNot">
                      <el-button
                        size="mini"
                        disabled
                        @click="editassessment(scope.row.Id)"
                        >编辑</el-button
                      >
                      <el-button
                        size="mini"
                        disabled
                        @click="handleDel(scope.row.Id)"
                        >删除</el-button
                      >
                    </span>
                    <span v-else>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="editassessment(scope.row.Id)"
                        >编辑</el-button
                      >
                      <el-button
                        size="mini"
                        type="info"
                        @click="delassessment(scope.row.Id)"
                        >删除</el-button
                      >
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="归档" fixed="right">
                  <template slot-scope="scope">
                    <span v-if="scope.row.ArchiveorNot">
                      <el-button
                        size="mini"
                        disabled
                        @click="updarchiveornot(scope.row.Id)"
                        >已归档</el-button
                      >
                    </span>
                    <span v-else>
                      <el-button
                        size="mini"
                        type="warning"
                        @click="updarchiveornot(scope.row.Id)"
                        >发起归档</el-button
                      >
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div></el-col
      >
      <!-- 右上角 -->
      <el-col :span="8"
        ><div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div>
              <div>
                <span style="float: left">任务编辑</span>
                <br /><br /><br /><br />
              </div>

              <el-form ref="form" :model="form" label-width="100">
                <el-form-item label="任务编号：">
                  <el-input v-model="form.TaskNo"></el-input>
                </el-form-item>
                <el-form-item label="起始时间：">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.StartTime"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="截止时间：">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.EndTime"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注信息：">
                  <el-input type="textarea" v-model="form.Remarks"></el-input>
                </el-form-item>
                <el-form-item label="项目考核：">
                  <el-select
                    v-model="form.ProjectAssessment"
                    placeholder="请选择项目考核"
                  >
                    <el-option label="进行中" value="进行中"></el-option>
                    <el-option label="暂停中" value="暂停中"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="部门考核：">
                  <el-select
                    v-model="form.ProjectAssessment"
                    placeholder="请选择部门考核"
                  >
                    <el-option label="进行中" value="jinxing"></el-option>
                    <el-option label="暂停中" value="zanting"></el-option>
                    <el-option label="已完成" value="wancheng"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <span v-if="isshow == 0"></span>
                  <span v-else-if="isshow == 1"
                    ><el-button type="success" @click="addassessment"
                      >立即创建</el-button
                    >
                    <el-button @click="onSubmit">取消</el-button></span
                  >
                  <span v-else
                    ><el-button type="warning" @click="updassessment"
                      >立即修改</el-button
                    >
                    <el-button @click="onSubmit">取消</el-button></span
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //显示
      tableData: [],

      //添加
      form: {
        Id: 0,
        TaskNo: "",
        StartTime: "",
        EndTime: "",
        Remarks: "",
        ProjectAssessment: "",
        ArchiveorNot: 0,
      },

      //按钮状态
      isshow: 0,

      //考核统计
      tableData1: [],
    };
  },
  //构造函数
  mounted() {
    this.getassessment();
  },
  methods: {
    //考核列表显示
    getassessment() {
      this.axios
        .get("https://localhost:44360/api/Assessment/GetAssessment")
        .then((res) => {
          this.tableData = res.data;
        });
    },
    //删除
    delassessment(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(id);
          this.axios
            .delete(
              "https://localhost:44360/api/Assessment/DelAssessment?id=" +
                id +
                ""
            )
            .then((res) => {
              if (res.data.Code == 200) {
                this.$message({
                  message: "恭喜你，删除数据成功！",
                  type: "success",
                });
                this.$router.go(0);
              } else {
                this.$message.error("错了哦，数据删除有误！");
                this.getassessment();
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
    //修改状态
    updarchiveornot(id) {
      this.$confirm("此操作将归档文件, 是否继续?", "发起归档", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(id);
          this.axios
            .put(
              "https://localhost:44360/api/Assessment/UpdArchiveorNot?id=" +
                id +
                ""
            )
            .then((res) => {
              if (res.data) {
                this.$message({
                  message: "恭喜你，归档数据成功！",
                  type: "success",
                });
                this.$router.go(0);
              } else {
                this.$message.error("错了哦，数据归档有误！");
                this.getassessment();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消归档",
          });
        });
    },
    //取消按钮
    onSubmit() {
      this.isshow = 0;
    },
    //新建任务
    add() {
      this.isshow = 1;
      this.form = {
        Id: 0,
        TaskNo: "",
        StartTime: "",
        EndTime: "",
        Remarks: "",
        ProjectAssessment: "",
        ArchiveorNot: 0,
      };
    },
    //添加考核列表
    addassessment() {
      this.axios
        .post("https://localhost:44360/api/Assessment/AddAssessment", this.form)
        .then((res) => {
          if (res.data) {
            this.$message({
              message: "恭喜你，添加成功！",
              type: "success",
            });
            this.getassessment();
          } else {
            this.$message.error("错了哦，数据添加有误！");
            this.getassessment();
          }
        });
    },
    //回显（model双向绑定）
    editassessment(id) {
      this.isshow = 2;
      this.axios
        .get("https://localhost:44360/api/Assessment/EditAssessment?id=" + id)
        .then((res) => {
          this.form = res.data;
        });
    },
    //修改列表
    updassessment() {
      this.axios
        .put("https://localhost:44360/api/Assessment/UpdNotice", this.form)
        .then((res) => {
          if (res.data) {
            this.$message({
              message: "恭喜你，修改成功！",
              type: "success",
            });
            this.getassessment();
          } else {
            this.$message.error("错了哦，数据添加有误！");
            this.getassessment();
          }
        });
    },
  },
};
</script>
<style>
</style>