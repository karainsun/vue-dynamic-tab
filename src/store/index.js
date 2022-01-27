import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routeVisited: JSON.parse(localStorage.getItem("tabs")) || [],
    // 按点击顺序储存路由，这样删除当前项会时激活当前项的上一个所点击的路由
    routesCache:  JSON.parse(localStorage.getItem("tabs_cache")) || [], 
  },
  mutations: {
    ADD_ROUTE_VISITED(state, route) {
      if (
        state.routesCache.some((r) => r.path === route.path) &&
        state.routesCache.length > 1
      ) {
        for (let i = 0; i < state.routesCache.length; i++) {
          if (state.routesCache[i].path === route.path) {
            state.routesCache.splice(i, 1);
          }
        }
        state.routesCache.push({
          name: route.name,
          path: route.path,
        });
      } else if (!state.routesCache.some((r) => r.path === route.path)) {
        state.routesCache.push({
          name: route.name,
          path: route.path,
        });
      }
      localStorage.setItem("tabs_cache", JSON.stringify(state.routesCache));
      if (state.routeVisited.some((r) => r.path === route.path)) return;
      state.routeVisited.push({
        name: route.name,
        path: route.path,
      });
      localStorage.setItem("tabs", JSON.stringify(state.routeVisited));
    },
    DEL_ROUTE_VISITED(state, route) {
      if (Array.isArray(route)) { // 如果传入的是数组
        state.routeVisited = route.map((r) => {
          return {
            name: r.name,
            path: r.path,
          };
        });
        if (route.length === 0) {
          state.routesCache = [];
        } else {
          for (let i = 0; i < state.routesCache.length; i++) {
            if (state.routesCache[i].path === route[i].path) {
              state.routesCache.splice(i, 1);
            }
          }
        }
      } else { // 如果传入的是对象
        state.routeVisited = state.routeVisited
          .filter((r) => r.path !== route.path)
          .map((r) => {
            return {
              name: r.name,
              path: r.path,
            };
          });
        for (let i = 0; i < state.routesCache.length; i++) {
          if (state.routesCache[i].path === route.path) {
            state.routesCache.splice(i, 1);
          }
        }
      }
      localStorage.setItem("tabs_cache", JSON.stringify(state.routesCache));
      localStorage.setItem("tabs", JSON.stringify(state.routeVisited));
    },
  },
  actions: {
    addRouteVisited({ commit }, route) {
      commit("ADD_ROUTE_VISITED", route);
    },
    delRouteVisited({ commit }, route) {
      commit("DEL_ROUTE_VISITED", route);
    },
  },
  modules: {},
});
