import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import(/* webpackChunkName: "resource" */ "@/views/home/Home.vue"),
      },
      {
        path: "/one",
        name: "one",
        component: () =>
        import(/* webpackChunkName: "one" */ "@/views/pages/One.vue"),
      },
      {
        path: "/two",
        name: "two",
        component: () =>
          import(/* webpackChunkName: "two" */ "@/views/pages/Two.vue"),
      },
      {
        path: "/three",
        name: "three",
        component: () =>
          import(/* webpackChunkName: "three" */ "@/views/pages/Three.vue"),
      },
      {
        path: "/four",
        name: "four",
        component: () =>
          import(/* webpackChunkName: "four" */ "@/views/pages/Four.vue"),
      },
      {
        path: "/five",
        name: "five",
        component: () =>
          import(/* webpackChunkName: "five" */ "@/views/pages/Five.vue"),
      },
      {
        path: "/six",
        name: "six",
        component: () =>
          import(/* webpackChunkName: "six" */ "@/views/pages/Six.vue"),
      },
      {
        path: "/seven",
        name: "seven",
        component: () =>
          import(/* webpackChunkName: "seven" */ "@/views/pages/Seven.vue"),
      },
      {
        path: "/eight",
        name: "eight",
        component: () =>
          import(/* webpackChunkName: "eight" */ "@/views/pages/Eight.vue"),
      },
      {
        path: "/nine",
        name: "nine",
        component: () =>
          import(/* webpackChunkName: "nine" */ "@/views/pages/Nine.vue"),
      },
      {
        path: "/ten",
        name: "ten",
        component: () =>
          import(/* webpackChunkName: "ten" */ "@/views/pages/Ten.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
