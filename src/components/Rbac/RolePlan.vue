<template >
  <div>
    <div
      v-for="(item, index) in data"
      :key="index"
      style="width: 320px; height: 50px"
    >
      <span>
        <el-checkbox
          v-for="item1 in item"
          :key="item1.Id"
          :label="item1.Id"
          v-model="RoleList"
          >{{ item1.RoleName }}</el-checkbox
        ></span
      >
    </div>
    <el-button type="primary" size="default" @click="Save()">保存</el-button>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "name",
        id: "Id",
      },
      DisPlay: [],
      RoleList: [],
      List: [],
    };
  },
  methods: {
    Recoil() {
      this.axios
        .get(
          `https://localhost:5001/api/Personnel/PersonnelLoad?rid=${this.id}`
        )
        .then((res) => {
          for (let d of res.data) {
            this.RoleList.push(d.Id);
          }
        });
    },
    GetAll() {
      this.axios.get("https://localhost:5001/api/Role/GetAll").then((res) => {
        let len = res.data.Data.length;
        let n = 4; //假设每行显示4个
        let lineNum = len % 4 === 0 ? len / 4 : Math.floor(len / 4 + 1);
        for (let i = 0; i < lineNum; i++) {
          // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
          let temp = res.data.Data.slice(i * n, i * n + n);
          this.data.push(temp);
        }
      });
    },
    Save() {
      console.log(this.RoleList);
      for (let d of this.RoleList) {
        var Content = {
          personnelId: this.id,
          roleId: d,
        };
        this.List.push(Content);
      }
      console.log(this.List);
      this.axios
        .post("https://localhost:5001/api/Personnel/PRDelete", this.List)
        .then((res) => {
          var state = res.data;
          if (state == true) {
            this.$emit("Success", "数据传输");
          }
        });
    },
  },
  mounted() {
    console.log(this.id);
    this.GetAll();
    this.Recoil();
  },
};
</script>
<style >
</style>