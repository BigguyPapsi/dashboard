<template>
  <v-app id="inspire">
    <Sidebar v-if="showNavBar" :drawer="drawer" />
    <Topbar v-if="showNavBar" @drawerEvent="drawer = !drawer" />
    <v-main style="background: #f5f5f540">
      <v-container class="py-8 px-6" fluid>

        <router-view></router-view>

      </v-container>
    </v-main>
  </v-app>
</template>

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
  methods: {
    
  },
  computed: {
    showNavBar() {
      // check if the current route is not the login route
      return this.$route.path !== '/login';
    },
  },
};
</script>
