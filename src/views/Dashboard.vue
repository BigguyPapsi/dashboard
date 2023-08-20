<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Dashboard</h3>
      <v-btn color="success"> View Orders </v-btn>
    </v-subheader>
    <br />
    <v-row>
      <v-col lg="7" cols="12">


        <v-row>
          <v-col lg="6" cols="12">
            <v-card elevation="2" class="rounded-lg" style="background-color: rgb(240, 189, 189);">
              <v-card-text class="d-flex justify-space-between align-center">
                <div >
                  <strong>ລູກຄ້າທັ້ງໝົດ</strong> <br />
                  <span>
                    <router-link to="/user">
                      <i class="fa-solid fa-arrow-up-right-from-square"/>
                      Manage</router-link>
                  </span>
                </div>
                <v-avatar size="60" style="border: 3px solid #444" color="white">
                  <span style="color: rgb(0, 0, 0)">{{ role_customer.length }}</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col lg="6" cols="12">
            <v-card elevation="2" class="rounded-lg" style="background-color: rgb(226, 228, 168);">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>ພະນັກງານທັ້ງໝົດ</strong> <br />
                  <span>

                    <router-link to="/user">
                      <i class="fa-solid fa-arrow-up-right-from-square"/>
                      Manage</router-link>

                  </span>
                </div>
                <v-avatar size="60" style="border: 3px solid #bebe73" color="white">
                  <span style="color: rgb(0, 0, 0)">{{ role_employee.length }}</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col lg="6" cols="12">
            <v-card elevation="2" class="rounded-lg" style="background-color: #b1e3c2;">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>ລາຍການສັ່ງຊື້</strong> <br />
                  <span>
                    <router-link to="/history">
                      <i class="fa-solid fa-arrow-up-right-from-square"/>
                      Manage</router-link>

                  </span>
                </div>
                <v-avatar size="60" style="border: 3px solid #b0c990" color="white">
                  <span style="color: rgb(0, 0, 0)">{{ getOrder.length }}</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col lg="6" cols="12">
            <v-card elevation="2" class="rounded-lg" style="background-color: #b1d6e3;">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>ສິນຄ້າທັ້ງໝົດ</strong> <br />
                  <span>
                    <router-link to="/product">
                      <i class="fa-solid fa-arrow-up-right-from-square"/>
                    Manage</router-link>
                  </span>
                </div>
                <v-avatar size="60" style="border: 3px solid #b1b1da" color="white">
                  <span style="color: rgb(0, 0, 0)">{{ getProduct.length }}</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="5">
        <v-card>
          <v-card-title>Activities</v-card-title>

          <v-card-text class="py-0">
            <v-timeline align-top dense>
              <div v-for="(item, index) in getHis" :key="index">
                <v-timeline-item color="green" small>
                  <strong>
                    {{
                      new Date(item.created_at).toLocaleString("nl-NL").substring(0, 10)
                    }}</strong
                  >
                  <div class="text-caption" style="color: green;">+ {{ item.price_total }}</div>
                </v-timeline-item>
              </div>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- <v-col>
        <v-card>
          <v-data-table
            caption="Recent Order list"
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          >
            <template>
        
              <v-btn color="success" outlined small shaped>View</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col> -->
      <div style="width: 100%; height: 250px; border-radius: 10px;background-color: #e4d795; filter: drop-shadow(0px 3px 2px #9b9b9b) ;justify-content: center; align-items: center;display: flex; flex-direction: column; ">
        <h2>Welcome to Admin panel !!! </h2><br/>
        <h4>ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ໜ້າແອັດມິນ !!! </h4>
      </div>

      
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  data() {
    return {
      role_employee:"",
      role_customer:"",

      getOrder:"",
      getProduct:"",

      getHis: [],
      activityLog: [
        {
          title: "Total Products",
          amount: 50,
          icon: "mdi-account",
          color: "cyan lighten-3",
        },
        {
          title: "Total Customer",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "green darken-2",
        },
        {
          title: "Total Sale",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1",
        },
        {
          title: "Pending Orders",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "deep-orange darken-1",
        },
      ],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
        { text: "Actions", value: "action" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  methods: {
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
  },
  mounted() {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/order", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getOrder = res.data;
      });


    axios
      .get("http://localhost:8000/api/product", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getProduct = res.data;
      });




    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getUser = res.data;
        this.role_employee = res.data.filter((item) => item.roles == "Employee" || item.roles == "Admin");
        this.role_customer = res.data.filter((item) => item.roles == "Customer");
      });



    axios
      .get("http://localhost:8000/api/allorderwithdetail", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getHis = res.data.slice(0, 3);
      });
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>
