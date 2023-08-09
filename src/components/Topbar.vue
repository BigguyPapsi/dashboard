<template>
  <v-app-bar app elevate-on-scroll elevation="3" color="#30343b">
    <v-app-bar-nav-icon @click="$emit('drawerEvent')" style="color: #f8c600;"></v-app-bar-nav-icon>
    <v-spacer />
    <v-col lg="6" cols="12"> </v-col>
    <v-spacer />
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span
          class="mx-5 mr-10"
          style="cursor: pointer"
          v-bind="attrs"
          v-on="on"
        >
  
        </span>
      </template>
      
      <v-list three-line width="250">
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            :v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title :v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                :v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>

    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span style="cursor: pointer" v-bind="attrs" v-on="on">
          <v-chip link style="background-color: #f8c600">
            <v-badge dot bottom color="green" offset-y="10" offset-x="10">
              <v-avatar size="40" style="margin-left: -7px;">
                <v-img
                  v-if="userState.profile_img"
                  :src="
                    'http://localhost:8000/storage/' + userState.profile_img
                  "
                />
                <b-avatar v-else variant="secondary" size="140px"></b-avatar>
              </v-avatar>
            </v-badge>
            <span class="ml-3">{{ userState.firstname }}</span>
          </v-chip>
        </span>
      </template>
      <v-list width="300" class="py-2">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img
              style="object-fit: cover"
              v-if="userState.profile_img"
              :src="'http://localhost:8000/storage/' + userState.profile_img"
            />
            <b-avatar v-else variant="secondary" size="140px"></b-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title style="height: 22px"
              >{{ userState.firstname }}
              {{ userState.lastname }}</v-list-item-title
            >

            <div style="display: flex; justify-content: center">
              <v-list-item-subtitle style="height: 22px; color: #26c949">
                <i class="fa-regular fa-circle-check"></i>
                ລົງະບຽນແລ້ວ
              </v-list-item-subtitle>
              ||
              <v-list-item-subtitle style="height: 22px; color: #f8c600">
                {{ userState.roles }}
              </v-list-item-subtitle>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list-item link v-for="(menu, i) in menus" :key="i">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ menu.title }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="Logout">
          <v-list-item-icon>
            <v-icon style="color: rgb(255, 85, 85)"> mdi-logout </v-icon>
          </v-list-item-icon>
          <v-list-item-title style="color: rgb(255, 85, 85)">
            ອອກຈາກລະບົບ
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import axios from "axios";
export default {
  name: "Topbar",
  data() {
    return {
      // userState: JSON.parse(localStorage.getItem("userState")),
      userState: "",
    };
  },

  methods: {
    Logout() {
      localStorage.clear();
      // window.location.reload();
      this.$router.push("/login");
    },


    
  },


  mounted() {
      const token = localStorage.getItem("token");
      const id = JSON.parse(localStorage.getItem("userState")).id
      // console.log(JSON.parse(localStorage.getItem("userState")));

      axios
      .get("http://localhost:8000/api/users/selOne/" + id , {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.userState = res.data;
       
      });

    },








};
</script>

<style scoped></style>
