<template>
  <v-app id="inspire">
    <Sidebar v-if="showNavBar" :drawer="drawer" />
    <Topbar v-if="showNavBar" @drawerEvent="drawer = !drawer" />

    <v-main style="background: #fffce1">
      <v-container class="content" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
*,
body {
  font-family: "Noto Sans Lao", sans-serif;
}
</style>

<script>
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default {
  name: "App",
  components: { Topbar, Sidebar },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
  }),
  methods: {},

  computed: {
    showNavBar() {
      // Show the sidebar only if the current route is "/", "/history", or "/order"
      return (
        this.$route.path === "/" ||
        this.$route.path === "/user" ||
        this.$route.path === "/user/create" ||
        this.$route.path === "/user/edit" ||
        this.$route.path === "/product" ||
        this.$route.path === "/product/create" ||
        this.$route.path === "/product/edit" ||
        this.$route.path === "/history" ||
        this.$route.path === "/ingredients" ||
        this.$route.path === "/report/income" ||
        this.$route.path === "/report/expenses" ||
        this.$route.path === "/report/best_seller" ||
        this.$route.path === "/report/unsaleable"
      );
    },
  },
};
</script>
