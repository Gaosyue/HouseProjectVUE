<template>
  <div>
    <h1>请假申请列表</h1>
    <el-button type="primary" round @click="insert()">新增申请</el-button>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="Reason" label="请假类型" width="100"> </el-table-column>
      <el-table-column prop="StartTime" label="开始时间" width="100" >
        <template slot-scope="scope">
          <span>{{scope.row.StartTime |dataFormat("yyyy-MM-dd")}}</span>
        </template>
        </el-table-column>
      <el-table-column prop="EndTime" label="结束时间" width="100" >
        <template slot-scope="scope">
          <span>{{scope.row.EndTime |dataFormat("yyyy-MM-dd")}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Name" label="申请人" width="100"> </el-table-column>
      <el-table-column prop="Remarks" label="详情"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="success" size="mini" round plain @click="getinfo(scope.row.Id)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" round plain @click="del(scope.row.Id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--Dialog 弹框添加修改 -->
    <el-dialog title="添加/修改请假申请" :visible.sync="dialogFormVisible">
    {{this.form}}
      <el-form
        :model="form"

        ref="form"
        label-width="100px"
        class="demo-form"
      >
        <el-form-item label="请假类型" prop="resource">
          <el-radio-group v-model="form.Reason">
            <el-radio label="年假"></el-radio>
            <el-radio label="事假"></el-radio>
            <el-radio label="病假"></el-radio>
            <el-radio label="婚假"></el-radio>
            <el-radio label="产/陪产假"></el-radio>
            <el-radio label="丧假"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="请假时间" required>
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
        <el-form-item label="考勤时常" prop="name">
          <el-input v-model="form.Statistics" type="number" style="width: 80%"></el-input>小时(数字必填)
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="form.Remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm()">取 消</el-button>
        <el-button type="primary" @click="save()"
          >确 定</el-button
        >
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
        Reason: "",
        StartTime: "",
        EndTime: "",
        Statistics: "",
        Remarks: "",
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
        "https://localhost:44360/api/Application/GetLeaveApplication?applicant=" +
          userid
      ).then((res) => {
        this.list = res.data.Data;
      });
    },
    getinfo(id){
      this.axios("https://localhost:44360/api/Application/GetLeaveModel?id="+id).then(res=>{
        this.form = res.data.Item;
        this.dialogFormVisible = true;
      })
    },
    insert() {
      this.dialogFormVisible = true;
    },
    resetForm() {
      this.form = {}
      this.dialogFormVisible = false;
    },
    save(){
      //获取local里的用户对象
      var userinfo = localStorage.getItem("UserInfo");
      //格式化对象后取出用户名
      this.form.Applicant = JSON.parse(userinfo).Id;
      this.axios.post("https://localhost:44360/api/Application/LeaveSave",this.form).then(res=>{
        if(res.data){
          this.dialogFormVisible = false;
          this.$message.success("保存成功")
          this.form = {}
        }
      })
    },

  },
  mounted() {
    this.getlist();
  },
  filters:{
		// 私有局部过滤器，只能在 当前 VM 对象所控制的 View 区域进行使用
		dataFormat(input, pattern = "") {
			// 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
			var dt = new Date(input)
			// 获取年月日
			var y = dt.getFullYear()
			var m = (dt.getMonth() + 1).toString().padStart(2, "0")
			var d = dt.getDate().toString().padStart(2, "0")
			// 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
			// 否则，就返回  年-月-日 时：分：秒
			if (pattern.toLowerCase() === "yyyy-mm-dd") {
				return `${y}-${m}-${d}`
			} else {
				// 获取时分秒
				var hh = dt.getHours().toString().padStart(2, "0")
				var mm = dt.getMinutes().toString().padStart(2, "0")
				var ss = dt.getSeconds().toString().padStart(2, "0")
				return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
			}
		},
  }
};
</script>
<style>
h2 {
text-align: left
}
</style>