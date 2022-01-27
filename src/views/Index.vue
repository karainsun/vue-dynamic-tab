<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo">工作台</div>
        <Nav></Nav>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <tabs />
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '10px', padding: '20px', background: '#fff', height: 'calc(100vh - 70px)' }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Tabs from '@/components/Tabs'

export default {
  components:{
    Nav,
    Tabs
  },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style scope>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 30px;
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 9px;
  line-height: 32px;
  color: white;
  text-align: center;
}
.ant-layout-header {
  height: 60px !important;
  line-height: 0px !important;
} 
</style>