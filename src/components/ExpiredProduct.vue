<template>
  <div>
    <h2 class="my-5">Expired Product</h2>
    <!-- <p>Days since last date: {{ daysSinceLastDate }}</p>
    <p>
      {{ new Date().toLocaleString("nl").substring(0, 10) }}
    </p> -->
    <!-- <p>{{ items }}</p> -->
    <!-- <div v-for="(item, i) in dateTest" :key="i">
      <p v-if="daysSinceLastDate(item) > 2">
        test: {{ item.id }} ==> {{ item.created_at }} ({{
          daysSinceLastDate(item)
        }}
        )
      </p>
    </div> -->
    <div>
      <v-card>
        <v-card-title>
          <div class="search">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </div>
          <v-spacer></v-spacer>
          <div class="count-content">
            <h6>ສິນຄ້າໝົດກຳນົດ: 2 ລາຍການ</h6>
          </div>
        </v-card-title>
        <v-data-table :headers="headers" :items="getOrder" :search="search">
          <template v-slot:item.created_at="{ item }">
            {{ new Date(item.created_at).toLocaleString("nl-NL") }}
          </template>
          <template v-slot:item.countTime="{ item }">
            <p>test: {{ daysSinceLastDate(item) }} day</p>
          </template>
          <template v-slot:item.option="{ item }">
            <b-button variant="outline-danger" @click="deleteStock(item.id)">
              <i class="fa-regular fa-trash-can"></i> Delete</b-button
            >
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
// import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from "axios";
export default {
  data() {
    return {
      search: [],
      expiredPro: 3,
      dateTest: [],
      items: [],
      expiredItems: [],
      getOrder: [],
      //   lastDate: "2023-08-10",
      headers: [
        // {
        //   text: "id",
        //   align: "start",
        //   sortable: false,
        //   value: "id",
        // },
        // { text: "name", value: "name" },
        // { text: "qauantity", value: "quantity" },
        // { text: "time add", value: "time_at" },
        {
          text: "ເລກບິນ",
          align: "start",
          sortable: false,
          value: "id",
        },
        // { text: "ສະຖານະ", value: "status" },
        { text: "user id", value: "user_id" },
        { text: "role", value: "roles" },
        { text: "ເວລາ", value: "created_at" },
        { text: "time add - today", value: "countTime" },
        { text: "ລາຄາລວມ", value: "price_total" },
        { text: "Option", value: "option" },
      ],
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/product", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.items = res.data;
      });
    axios
      .get("http://localhost:8000/api/allorderwithdetail", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // this.getOrder = res.data.reverse();
        const timeFilter = res.data;
        const data = timeFilter.filter((item) => {
          const currentDate = new Date();
          const previousDate = new Date(item.created_at);
          const timeDifference = currentDate.getTime() - previousDate.getTime();
          const daysDifference = Math.floor(
            timeDifference / (1000 * 60 * 60 * 24)
          );
          const test = daysDifference >= this.expiredPro; //expired Product time
          return test;
        });
        this.getOrder = data;
      });
  },
  methods: {
    dayjs: function () {
      return dayjs();
    },
    deleteStock(item) {
      console.log("show id: ", item);
    },
    daysSinceLastDate(item) {
      const currentDate = new Date();
      const previousDate = new Date(item.created_at);
      const timeDifference = currentDate.getTime() - previousDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference;
    },
  },
  // computed: {
  //   daysSinceLastDate(created_at) {
  //     const currentDate = new Date();
  //     const previousDate = new Date(created_at);
  //     console.log("show==>", previousDate);
  //     const timeDifference = currentDate.getTime() - previousDate.getTime();
  //     const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  //     return daysDifference;
  //   },
  // },
};
</script>
<style lang="scss" scoped>
.search {
  width: 500px;
}
.count-content {
  display: flex;
  height: 45px;
  padding: 0 0.5rem;
  align-items: center;
  background-color: #eece57;
}
</style>
