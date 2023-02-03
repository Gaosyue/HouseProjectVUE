<template>
  <div>
    <el-button type="success" @click="addtype()">新增字典类</el-button>
    <el-row>
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-table :data="typelist" style="width: 100%" height="450">
            <el-table-column fixed prop="Id" label="字典编号" width="80">
            </el-table-column>
            <el-table-column prop="Name" label="字典类名" width="150">
            </el-table-column>
            <el-table-column prop="Desc" label="描述"> </el-table-column>
            <el-table-column label="操作" width="280">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="mini"
                  @click="getitemlist(scope.row.Id)"
                  >查看</el-button
                >
                <el-button type="primary" size="mini" @click="additem(scope.row.Id)">添加</el-button>
                <!-- <el-button
                  type="info"
                  size="mini"
                  @click="dialogFormVisible = true">修改</el-button> -->
                <el-button type="danger" size="mini" @click="DelType(scope.row.Id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div></el-col
      >
      <el-col :span="2"> </el-col>
      <el-col :span="10"
        ><div class="grid-content bg-purple-light">
          <el-table :data="itemlist" style="width: 100%" height="450">
            <el-table-column fixed prop="Id" label="字典编号" width="80">
            </el-table-column>
            <el-table-column prop="ItemName" label="字典项名" width="150">
            </el-table-column>
            <el-table-column prop="city" label="操作">
              <template slot-scope="scope">
                <!-- <el-button
                  type="info"
                  size="mini"
                  @click="updItem(scope.row.Id)"
                  >修改</el-button
                > -->
                <el-button
                  type="danger"
                  size="mini"
                  @click="DelItem(scope.row.Id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div></el-col
      >
    </el-row>

    <!-- 使用Dialog对字典类进行添加和修改的操作 -->
    <el-dialog title="字典类添加/修改" :visible.sync="dialogFormVisible">
      <el-form :model="typeform">
        <el-form-item label="字典类名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="typeform.Name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="相关描述" prop="desc" :label-width="formLabelWidth">
          <el-input v-model="typeform.Desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="inserttype()"
          >确 定</el-button
        >
      </div>
    </el-dialog>

<!-- 使用Dialog对字典项进行添加和修改的操作 -->
    <el-dialog title="字典项添加/修改" :visible.sync="dialogFormItem">
      <el-form :model="itemform">
        <el-form-item label="字典项名" prop="itemname" :label-width="formLabelWidth">
          <el-input v-model="itemform.ItemName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序号码" prop="orderid" :label-width="formLabelWidth">
          <el-input v-model="itemform.OrderId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertitem()"
          >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      typeid: "",
      typelist: [],
      itemlist: [],

      dialogFormVisible: false, //dialog开启关闭控制器

      dialogFormItem:false,//字典类添加dialog开启关闭控制器
      //添加和修改的字典类模型
      typeform: {
        Name: "",
        Desc: "",
        State: true,
      },
      //添加和修改的字典类模型
      itemform: {
        Coding:'',
        ItemName: "",
        OrderId: "",
        State: true,
      },
      rules: {
        name: [
          { required: true, message: "请输入字典类名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        orderid:[{required: true}],
        desc: [{ required: true, message: "请填写相关描述", trigger: "blur" }],
      },
    };
  },
  methods: {
    DelType(id){
      this.axios.delete("https://localhost:44360/api/Dict/DelType?id="+id).then(res=>{
        if(res.data){
          this.$message.success("删除成功!")
          this.gettypelist();
        }
      })
    },
    DelItem(id){
      this.axios.delete("https://localhost:44360/api/Dict/DelItem?id="+id).then(res=>{
        if(res.data){
          this.$message.success("删除成功!")
          this.gettypelist();
        }
      })
    },
    gettypelist() {
      this.axios("https://localhost:44360/api/Dict/GetDictTypeList").then(
        (res) => {
          this.typelist = res.data;
        }
      );
    },
    getitemlist(id) {
      this.axios(
        "https://localhost:44360/api/Dict/GetDictItemList?cod=" + id
      ).then((res) => {
        this.itemlist = res.data;
      });
    },
    addtype() {
      this.dialogFormVisible = true;
    },
    inserttype() {
      this.axios
        .post("https://localhost:44360/api/Dict/AddDictType", this.typeform)
        .then((res) => {
          if (res.data) {
            this.gettypelist();
            this.dialogFormVisible = false;
          }
        });
    },
    additem(id){
        this.itemform.Coding = id;
        this.dialogFormItem = true;
    },
    insertitem(){
        this.axios.post("https://localhost:44360/api/Dict/AddDictItem",this.itemform).then(res=>{
            if(res.data){   
                this.axios.post("https://localhost:44360/api/Dict/AddDictItem",this.itemform).then(res=>{
                if(res.data){   
                    this.dialogFormItem = false;
                    this.getitemlist(this.itemform.Coding);
            }
        })
            }
        })
    }
  },
  created() {
    this.gettypelist();
  },
};
</script>
<style>
.right {
  float: left;
  width: 300px;
  border: 3px solid #73ad21;
  padding: 10px;
}
</style>