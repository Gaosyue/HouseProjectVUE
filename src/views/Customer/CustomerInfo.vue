<template>
  <div id="app">
    <el-row>
      <el-col :span="10"
        ><div class="grid-content bg-purple" style="float: left">
          客户名称:<el-input
            v-model="searth.name"
            style="width: 300px"
          ></el-input></div
      ></el-col>
      <el-col :span="10"><div class="grid-content bg-purple-light">
        查询条件
      </div></el-col>
      <el-col :span="2"
        ><div class="grid-content bg-purple"></div>
        <el-button type="primary" size="default" @click="GetAll()"
          >查询</el-button
        >
      </el-col>
      <el-col :span="2"
        ><div class="grid-content bg-purple-light">
          <el-button type="primary" size="default" @click="npoi()"
            >导出数据</el-button
          >
        </div></el-col
      >
    </el-row>
    
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      ref="table"
      @selection-change="handleSelectionChange"
    >
      <!--配置菜单开始-->
      <el-table-column fixed type="index" align="center" :index="1">
        <template #header>
          <el-popover placement="bottom" :width="200" :visible="visible">
            <!-- 配置列面板 -->
            <transition name="fade">
              <div>
                <div>选择显示字段</div>
                <div>
                  <!--在这里配置他的数列-->
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.Number">编号</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.CustomerName">客户名称</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.CompanyAddress">地址</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.Contacts">负责人</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                  <el-checkbox v-model="showColumn.Telephone">电话</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                  <el-checkbox v-model="showColumn.BankAccount">银行账户</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                  <el-checkbox v-model="showColumn.BankName">所属银行</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                  <el-checkbox v-model="showColumn.CustomerType">客户类型</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.Industry">所属行业</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.CreditRating">信用级别</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.EnterpriseCode">企业代码</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.TaxpayerNum">纳税人识别号</el-checkbox>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                      <el-checkbox v-model="showColumn.Representative">法定代表</el-checkbox>
                    </div></el-col>
                  </el-row>
                </div>
              </div>
            </transition>
            <template #reference>
              <i
                class="el-icon-setting"
                style="font-size: 22px; cursor: pointer"
                @click="visible = true"
              ></i>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <!--配置菜单结束-->
      <!--数据表格的展示，运用v-if使其实现效果-->
      <el-table-column type="selection" width="55" v-if="showColumn.select" >
      </el-table-column>
      <el-table-column
        prop="Number"
        label="编号"
        width="140"
        v-if="showColumn.Number"
      >
      </el-table-column>
      <el-table-column
        prop="CustomerName"
        label="客户名称"
        width="260"
        v-if="showColumn.CustomerName"
      >
      </el-table-column>
      <el-table-column
        prop="CompanyAddress"
        label="地址"
        width="220"
        v-if="showColumn.CompanyAddress"
      >
      </el-table-column>
      <el-table-column
        prop="Contacts"
        label="负责人"
        width="90"
        v-if="showColumn.Contacts"
      >
      </el-table-column>
      <el-table-column
        prop="Telephone"
        label="电话"
        width="110"
        v-if="showColumn.Telephone"
      >
      </el-table-column>
      <el-table-column
        prop="BankAccount"
        label="银行账户"
        width="180"
        v-if="showColumn.BankAccount"
      >
      </el-table-column>
      <el-table-column
        prop="BankName"
        label="所属银行"
        width="120"
        v-if="showColumn.BankName"
      >
      </el-table-column>
      <el-table-column
        prop="CustomerType"
        label="客户类型"
        width="120"
        v-if="showColumn.CustomerType"
      >
      </el-table-column>
      <el-table-column
        prop="Industry"
        label="所属行业"
        width="120"
        v-if="showColumn.Industry"
      >
      </el-table-column>
      <el-table-column
        prop="CreditRating"
        label="信用级别"
        width="120"
        v-if="showColumn.CreditRating"
      >
      </el-table-column>
      <el-table-column
        prop="EnterpriseCode"
        label="企业代码"
        width="180"
        v-if="showColumn.EnterpriseCode"
      >
      </el-table-column>
      <el-table-column
        prop="TaxpayerNum"
        label="纳税人识别号"
        width="180"
        v-if="showColumn.TaxpayerNum"
      >
      </el-table-column>
      <el-table-column
        prop="Representative"
        label="法人代表"
        width="90"
        v-if="showColumn.Representative"
      >
      </el-table-column>
      
      <el-table-column label="操作" width="100" align="center">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--数据表格的展示，运用v-if使其实现效果（结束）-->
    <!--分页开始-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
    <!--分页结束-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showColumn:{},
      searth: {
        name: "",
      },
      page: {
        pageindex: 1,
        pagesize: 5,
        total: 0,
        totalpage: 0,
      },
      visible: false,
      tableData: [],
    };
  },
  mounted() {
    this.GetAll();
    // 发请求得到showColumnInitData的列的名字
    if (localStorage.getItem("columnSet")) {
      this.showColumn = JSON.parse(localStorage.getItem("columnSet"));
    } else {
      this.showColumn = {
        Number: true,
        CustomerName: true,
        Contacts: true,
        Telephone: true,
        EnterpriseCode: true,
        TaxpayerNum: true,
        Representative: true,
      };
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
    },
    handleClick(row) {
      console.log(row);
    },
    saveColumn() {
      localStorage.setItem("columnSet", JSON.stringify(this.showColumn));
      this.visible = false;
    },

    //分页显示数
    handleSizeChange(val) {
      this.page.pagesize = val;
      this.GetAll();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page.pageindex = val;
      this.GetAll();
    },
    GetAll() {
      this.axios(
        "https://localhost:44360/api/Customerinfo/GetCust?name="+this.searth.name+"&pageindex="+this.page.pageindex+"&pagesize="+this.page.pagesize
      ).then((res) => {
        if (res.data.Code == 200) {
          this.tableData = res.data.Data;
          this.page.total = res.data.DataCount;
          this.page.totalpage = res.data.PageCount;
        }
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
/* 控制淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>