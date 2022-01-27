<template>
  <div class="tabs">
    <scroll-pane ref="scrollPane">
      <router-link
        ref="tab"
        class="tab-item"
        v-for="tab in routeVisited"
        :to="tab.path"
        :key="tab.path"
        @contextmenu.prevent.native="openLeftMenu(tab, $event)"
      >
        <span class="tab-span"
          ><i>{{ tab.name }} Page</i><a-icon
            type="close"
            style="
              font-size: 12px;
              top: -3px;
              margin-left: 6px; 
            "
            @click.prevent.stop="closeTab(tab, 'this')"
        /></span>
      </router-link>
    </scroll-pane>
    <div
      v-if="visible"
      class="left-menu"
      :style="{ left: `${menuLeft}px`, top: `${menuTop}px` }"
    >
      <ul>
        <li @click="closeTab(rightSelect, 'this')">关闭当前</li>
        <li @click="closeTab(rightSelect, 'others')">关闭其他</li>
        <li @click="closeTab(rightSelect, 'all')">关闭所有</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: { ScrollPane },
  computed: {
    ...mapState(["routeVisited", "routesCache"]),
  },
  data() {
    return {
      menuLeft: 0,
      menuTop: 0,
      visible: false,
      rightSelect: null,
    };
  },
  methods: {
    ...mapActions(["addRouteVisited", "delRouteVisited"]),
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    closeTab(tab, key) {
      const routes = [...this.routeVisited];
      if (routes.length === 1) return;
      if (key === "this") {
        this.delRouteVisited(tab);
        if (this.isActive(tab)) {
          const lastPath = this.routesCache.slice(-1)[0];
          this.$router.push(lastPath);
        }
      } else if (key === "others") {
        this.delRouteVisited([tab]);
        this.tabToMove();
      } else {
        this.delRouteVisited([]);
        this.$router.push("/");
      }
    },
    openLeftMenu(tab, event) {
      const clientW = document.documentElement.clientWidth;
      let leftPX = event.clientX;
      if (clientW - event.clientX < 76) {
        leftPX = clientW - 84;
      }
      this.visible = true;
      this.rightSelect = tab;
      this.menuLeft = leftPX;
      this.menuTop = event.clientY;
    },
    setDefaultTab() {
      if (!this.$route.name) {
        return false;
      }
      this.addRouteVisited(this.$route);
    },
    tabToMove() {
      const tabs = this.$refs.tab;
      this.$nextTick(() => {
        for (const tab of tabs) {
          if (tab.to === this.$route.path) {
            this.$refs.scrollPane.moveTo(tab.$el);
            break;
          }
        }
      });
    },
    closeLeftMenu() {
      this.visible = false;
    },
  },
  watch: {
    $route() {
      this.setDefaultTab();
      this.tabToMove();
    },
  },
  mounted() {
    this.setDefaultTab();
    setTimeout(() => this.tabToMove(), 100)
    document.body.addEventListener("click", this.closeLeftMenu);
  },
  destroyed() {
    document.body.removeEventListener("click", this.closeLeftMenu);
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
}
.left-menu {
  top: 30px;
  position: absolute;
  background-color: #fff;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.3);
}
.left-menu li {
  padding: 0 10px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  font-size: 14px;
}
.left-menu li:hover {
  background-color: #f3f3f3;
}
a.tab-item .tab-span {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  padding: 0 15px 0 5px;
  background-color: #f3f3f3;
  color: rgb(117, 117, 117);
  border-radius: 24px;
}
a.router-link-active .tab-span {
  background-color: #4c8fcd;
  color: #fff;
}
</style>
