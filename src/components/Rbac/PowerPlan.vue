<template >
  <div>
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      node-key="Id"
      :default-checked-keys="DisPlay"
      :props="defaultProps"
      @check-change="handleCheckChange"
    >
    </el-tree>
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
      List: [],
    };
  },
  methods: {
    Recoil() {
      this.axios
        .get(`https://localhost:5001/api/Role/RoleLoad?rid=${this.id}`)
        .then((res) => {
          for (let d of res.data) {
            this.DisPlay.push(d.Pid);
          }
        });
    },
    handleCheckChange() {
      this.List = [];
      let res = this.$refs.tree.getCheckedNodes();

      for (let d of res) {
        var Content = {
          roleId: this.id,
          powerId: d.Id,
        };
        this.List.push(Content);
      }
    },
    handleNodeClick(data) {
      console.log(data);
    },
    GetAll() {
      this.axios.get("https://localhost:5001/api/Power/GetMenu").then((res) => {
        this.data = res.data;
      });
    },
    Save() {
      this.axios
        .post("https://localhost:5001/api/Role/RPDelete", this.List)
        .then((res) => {
          var state = res.data;
          if (state == true) {
            this.$emit("Success", "数据传输");
          }
        });
    },
  },
  created() {
    this.GetAll();
    this.Recoil();
  },
};
</script>
<style >
</style>