<template>
  <v-navigation-drawer v-model="drawer" app style="background-color: #f8c632">
    <v-img>
      <div class="text-center">
        <img aspect-ratio="50" src="../assets/IMG_1432.svg" width="120px" />
      </div>
    </v-img>

    <v-list rounded="xl" v-for="[icon, text, path] in links" :key="icon">
      <router-link :to="path" type="a" style="text-decoration: none">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon class="taghover">{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="taghover">{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>

    <div style="margin-top: 10px" v-show="userState.roles != 'Admin'">
      <b-button
        v-b-toggle.collapse-1
        variant="warning"
        style="
          width: 100%;
          background-color: #f8c632;
          border: none;
          display: flex;
          justify-content: start;
        "
      >
        <i
          class="fa-solid fa-bullhorn"
          style="opacity: 60%; margin-left: 18px; margin-right: 30px"
        ></i>
        Report
      </b-button>

      <b-collapse id="collapse-1" class="mt-2">
        <b-card bg-variant="dark" style="border-radius: 0px">
          <div style="width: 100%">
            <router-link to="/report/income">
              <b-button
                variant="dark"
                style="width: 100%; border-radius: 100px"
                class="text-start"
              >
                <i
                  class="fa-solid fa-chart-line"
                  style="margin-right: 30px"
                ></i>
                Income</b-button
              >
            </router-link>

            <router-link to="/report/expenses">
              <b-button
                variant="dark"
                style="width: 100%; border-radius: 100px"
                class="text-start"
              >
                <i
                  class="fa-solid fa-arrow-trend-down"
                  style="margin-right: 30px"
                ></i>
                Expenses
              </b-button>
            </router-link>

            <router-link to="/report/best_seller">
              <b-button
                variant="dark"
                style="width: 100%; border-radius: 100px"
                class="text-start"
              >
                <i class="fa-regular fa-star" style="margin-right: 30px"></i>
                Best seller</b-button
              >
            </router-link>

            <router-link to="/report/unsaleable">
              <b-button
                variant="dark"
                style="width: 100%; border-radius: 100px"
                class="text-start"
              >
                <i
                  class="fa-regular fa-thumbs-down"
                  style="margin-right: 30px"
                ></i>
                Unsaleable</b-button
              >
            </router-link>
          </div>
        </b-card>
      </b-collapse>
    </div>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      userState: [],
      links: [
        ["mdi-microsoft-windows", "Dashboard", "/"],
        ["mdi-account-outline", "Users", "/user"],
        ["mdi-book-outline", "Products", "/product"],
        ["mdi-card-account-details-outline", "History", "/history"],
        ["mdi-clipboard-list-outline", "Ingredients", "/ingredients"],
        // ["mdi-bullhorn-variant-outline", "Report", "/report"],
      ],
    };
  },

  mounted() {
    const token = localStorage.getItem("token");
    const id = JSON.parse(localStorage.getItem("userState")).id;
    // console.log(JSON.parse(localStorage.getItem("userState")));

    axios
      .get("http://localhost:8000/api/users/selOne/" + id, {
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

<style lang="scss" scoped>
* {
  text-decoration: none;
}
.taghover {
  &:hover {
    text-decoration: none !important;
  }
}
</style>
