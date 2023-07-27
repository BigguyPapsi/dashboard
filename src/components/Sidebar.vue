<template >
  <v-navigation-drawer v-model="drawer" app style="background-color: rgb(231, 231, 227);">
    <v-img>
      <div class="text-center">
        <v-avatar class="mb-3" color="grey darken-1" size="85" >
          <v-img
            aspect-ratio="50"
            src="https://cdn.discordapp.com/attachments/1036997845498220614/1062024344743710793/309496074_461585429329899_1581586192334159311_n.png"
          />
        </v-avatar>
      </div>
    </v-img>

    
    <v-list rounded="xl" v-for="[icon, text, path] in links" :key="icon" >
      <router-link :to="path" type="a" style="text-decoration: none;">
      <v-list-item link >
        
        <v-list-item-icon>
          <v-icon class="taghover">{{ icon }}</v-icon>
        </v-list-item-icon>
        
        <v-list-item-content>
          <v-list-item-title class="taghover">{{ text }}</v-list-item-title>
        </v-list-item-content>
        
      </v-list-item>
    </router-link>
    </v-list>
    
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-microsoft-windows", "Dashboard", "/"],
        ["mdi-account", "Users","/user"],
        ["mdi-clipboard-list-outline", "Products","/product"],
        ["mdi-clipboard-list-outline", "Products","/"],
        ["mdi-card-account-details-outline", "Orders","/"],
        ["mdi-clipboard-list-outline", "Reports","/"],
        ["mdi-cog", "System Setting","/"],
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
*{
  text-decoration: none;
  
}
.taghover{
    &:hover{
      text-decoration: none !important;
    }
  }
</style>
