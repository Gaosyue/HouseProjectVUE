import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/LoginUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',  //主窗口（登录页面）
    name: 'home',
    component: HomeView
  },
  {
    path: '/ConTian', //布局容器（登录显示完页面）
    name: 'ConTian',
    component: () => import('../views/ConTian.vue'),
    children: [
      //#region 客户管理
      {
        path: '/CustomerEntry', // 客户信息录入
        name: 'CustomerEntry',
        component: () => import('../views/Customer/CustomerEntry.vue')
      },
      {
        path: '/CustomerInfo',// 客户信息列表
        name: 'CustomerInfo',
        component: () => import('../views/Customer/CustomerInfo.vue')
      },
       {
        path: '/CustomerView',// 客户信息列表
        name: 'CustomerView',
        component: () => import('../views/Customer/CustomerView.vue')
      },
       {
        path: '/ContractView',// 客户信息列表
        name: 'ContractView',
        component: () => import('../views/Customer/ContractView.vue')
      },
      {
        path: '/SubscriptionInfo',// 客户信息列表
        name: 'SubscriptionInfo',
        component: () => import('../views/Customer/SubscriptionInfo.vue')
      },
      {
        path: '/ContractInfo',// 合同信息列表
        name: 'ContractInfo',
        component: () => import('../views/Customer/ContractInfo.vue')
      },
      {
        path: '/PotraInfo',// 合同信息列表
        name: 'PotraInfo',
        component: () => import('../views/Customer/PotraInfo.vue')
      },
       {
        path: '/ProtraView',// 合同信息列表
        name: 'ProtraView',
        component: () => import('../views/Customer/ProtraView.vue')
      },
      {
        path: '/NoticeInfo',// 合同信息列表
        name: 'NoticeInfo',
        component: () => import('../views/Customer/NoticeInfo.vue')
      },
      {
        path: '/LoginLog',// 登录日志
        name: 'LoginLog',
        component: () => import('../views/Customer/LoginLog.vue')
      },
        {
        path: '/AssesMest',// 登录日志
        name: 'AssesMest',
        component: () => import('../views/Customer/AssesMest.vue')
      },
      {
        path: '/NoView',// 登录日志
        name: 'NoView',
        component: () => import('../views/Customer/NoView.vue')
      },
      //#endregion

      //#region RBAC
      {
        path: '/PermissionsView', //权限操作
        name: 'PermissionsView',
        component: () => import('../views/Rbac/PermissionsView.vue')
      },
      {
        path: '/RoleShow', //角色操作
        name: 'RoleShow',
        component: () => import('../views/Rbac/RoleShow.vue')
      }
      ,
      {
        path: '/UserShow', //人员操作
        name: 'UserShow',
        component: () => import('../views/Rbac/UserShow.vue')
      },
      //#endregion

      //#region 设备管理
      {
        path: '/watercost', //水表
        name: 'watercost',
        component: () => import('../views/DeviceManagement/WaterCost.vue')
      },
       {
        path: '/ElectricCost', //水表
        name: 'ElectricCost',
        component: () => import('../views/DeviceManagement/ElectricCost.vue')
      },
      //#endregion
      

      //#region 字典管理
      {
        path: '/dict', //
        name: 'dict',
        component: () => import('../views/Rbac/DictView.vue')
      },
      //#endregion

      //#region 字典管理
      {
        path: '/PersonCharge', //
        name: 'PersonCharge',
        component: () => import('../views/Customer/PersonCharge.vue')
      },
      //#endregion

      //#region 合同管理
      {
        path: '/ContractInfo', //
        name: 'ContractInfo',
        component: () => import('../views/Customer/ContractInfo.vue')
      },
      //#endregion

      //#region 合同录入
      {
        path: '/ContractView', //
        name: 'ContractView',
        component: () => import('../views/Customer/ContractView.vue')
      },
      //#endregion
      
      //#region 合同录入
      {
        path: '/LeaveList', //
        name: 'LeaveList',
        component: () => import('../views/Application/LeaveList.vue')
      },
      //#endregion

      //#region 合同录入
      {
        path: '/OutworkList', //
        name: 'OutworkList',
        component: () => import('../views/Application/OutworkList.vue')
      },
      //#endregion
    ]
  },


]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  var userid = localStorage.getItem("UserInfo");

  if (to.name !== 'home' && userid == null) { next({ name: 'home' }) }
  else {
    next()
  }

})


export default router
