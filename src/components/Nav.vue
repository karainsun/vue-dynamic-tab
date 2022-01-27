<template>
  <div>
    <a-menu
      theme="dark"
      mode="inline"
      :default-selected-keys="['home']"
      :selectedKeys="[$route.path]"
      class="menu"
    >
      <a-menu-item v-for="item in routes" :key="item.path">
        <router-link :to="item.path">
          <a-icon type="home" />
          <span>{{item.name}}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import {routes} from '@/router'

export default {
  data(){
    return {
      routes: routes[0].children,
    }
  }
};
</script>

<style scope>
.menu {
  height: calc(100vh - 50px);
  overflow-y: scroll;
}

.ant-menu::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
/*定义滚动条轨道 内阴影+圆角*/
.ant-menu::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}
/*定义滑块 内阴影+圆角*/
.ant-menu::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #bdbdbd;
}
/*滑块效果*/
.ant-menu::-webkit-scrollbar-thumb:hover {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.4);
}
</style>