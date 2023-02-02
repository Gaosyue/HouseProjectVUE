<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-form-item label="权限名称">
          <el-input v-model="Name" placeholder="权限名称"></el-input>
        </el-form-item>
        <el-button type="primary" @click="GetAll()">查询</el-button>
        <el-button type="primary" @click="DigOpen()">添加</el-button>
        <el-button type="primary" @click="DeleteItem()">批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="Id" label="Id" width="100"> </el-table-column>
      <el-table-column prop="Name" label="权限名称" width="120">
      </el-table-column>
      <el-table-column prop="SuperiorId" label="上级Id" width="100">
      </el-table-column>
      <el-table-column prop="Url" label="路径" width="150"> </el-table-column>
      <el-table-column prop="OrderId" label="排序id" width="100">
      </el-table-column>
      <el-table-column prop="OrderId" label="图标" width="200">
        <template slot-scope="scope">
          <i :class="scope.row.Icon"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.Icon }}</i
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="Delete(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页开始-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
    <!--分页结束-->
    <!--这是弹窗的开始-->
    <el-dialog title="权限" :visible.sync="addDid" v-if="addDid" width="30%">
      <span>
        <PermissionsAdd @Success="DigColse"></PermissionsAdd>
      </span>
      <span slot="footer"> </span>
    </el-dialog>
    <el-dialog
      title="权限修改"
      :visible.sync="EditDid"
      v-if="EditDid"
      width="30%"
    >
      <span>
        <PermissionsEdit :id="Fid" @Success="EditDigColse"></PermissionsEdit>
      </span>
      <span slot="footer"> </span>
    </el-dialog>

    <!--这是弹窗的结束-->
  </div>
</template>
<script>
import PermissionsAdd from "../../components/Rbac/PermissionsAdd.vue";
import PermissionsEdit from "../../components/Rbac/PermissionsEdit.vue";
export default {
  components: { PermissionsAdd, PermissionsEdit },
  data() {
    return {
      Name: "",
      page: {
        pageindex: 1,
        pagedata: 10,
        total: 0,
        totalpage: 0,
      },
      addDid: false,
      EditDid: false,
      tableData: [],
      Fid: 0,
      List: [],
    };
  },
  methods: {
    //#region  表格数据方法

    //数据显示
    GetAll() {
      var token = {
        params: {
          name: this.Name,
          pageindex: this.page.pageindex,
          pagesize: this.page.pagedata,
        },
      };
      this.axios
        .get("https://localhost:44360/api/Power/GetData", token)
        .then((res) => {
          var data = res.data;
          if (data.Code == 200) {
            this.tableData = [];
            this.tableData = data.Data;
            this.page.total = data.PageCount;
            this.page.totalpage = data.PageSize;
          }
        });
    },

    //多选
    handleSelectionChange(val) {
      this.List = val;
    },
    //分页显示数
    handleSizeChange(val) {
      this.page.pagedata = val;
      this.GetAll();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page.pageindex = val;
      this.GetAll();
    },
    //#endregion

    //#region 行内数据操作
    //修改方法
    Edit(val) {
      console.log(val.Id);
      this.Fid = val.Id;
      this.EditDid = true;
    },
    //删除方法
    Delete(val) {
      const list = [];
      list.push(val.Id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .post("https://localhost:44360/api/Power/Delete", list)
            .then((res) => {
              var state = res.data;
              if (state == true) {
                this.$message({
                  showClose: true,
                  message: "删除成功",
                });
                this.GetAll();
              } else {
                this.$message({
                  showClose: true,
                  message: "删除失败",
                  type: "warning",
                });
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
    //批量删除
    DeleteItem() {
      const list = [];
      for (let a of this.List) {
        list.push(a.Id);
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .post("https://localhost:44360/api/Power/Delete", list)
            .then((res) => {
              var state = res.data;
              if (state == true) {
                this.$message({
                  showClose: true,
                  message: "删除成功",
                });
                this.GetAll();
              } else {
                this.$message({
                  showClose: true,
                  message: "删除失败",
                  type: "warning",
                });
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
    //#endregion

    //#region  对话框部分
    //弹框开启
    DigOpen() {
      this.addDid = true;
    },
    //弹框关闭
    DigColse(d) {
      console.log(d);
      this.$message.success("添加成功");
      this.addDid = false;
      this.GetAll();
    },

    //修改弹框关闭
    EditDigColse(d) {
      console.log(d);
      this.$message.success("修改成功");
      this.EditDid = false;
      this.GetAll();
    },
    //#endregion
  },
  created() {
    this.GetAll();
  },
};
</script>