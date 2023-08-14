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
            <h6>ສິນຄ້າໝົດກຳນົດ: {{ getOrder.length }} ລາຍການ</h6>
          </div>
        </v-card-title>
        <v-data-table :headers="headers" :items="getOrder" :search="search">
          <template v-slot:item.created_at="{ item }">
            {{ new Date(item.created_at).toLocaleString("nl-NL") }}
          </template>
          <template v-slot:item.stocks="{ item }">
            <!-- <div v-for="(index, i) in item.stocks" :key="i">
              <p>test: {{ daysSinceLastDate(index.created_at) }} day</p>
            </div> -->
            <!-- <p>test: {{ daysSinceLastDate(item.stocks[0].created_at) }} day</p> -->
            <p>
              {{
                daysSinceLastDate(item.stocks.slice().reverse()[0].created_at)
              }}
              ວັນ
            </p>
          </template>
          <template v-slot:item.option="{ item }">
            <b-button variant="outline-danger" @click="clearStock(item)">
              <i class="fa-regular fa-trash-can"></i> Clear</b-button
            >
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from "axios";
export default {
  data() {
    return {
      quantity: 0,
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
          text: "ລະຫັດ",
          align: "start",
          sortable: false,
          value: "id",
        },
        // { text: "ສະຖານະ", value: "status" },
        { text: "name", value: "name" },
        { text: "quantity", value: "quantity" },
        { text: "ເວລາທີ່ກຳນົດ", value: "expiration_time" },
        { text: "time add - now", value: "stocks" },
        // { text: "ລາຄາລວມ", value: "price_total" },
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
    //----------------------------------------------------------------------------------------------------------//
    axios
      .get("http://localhost:8000/api/new", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // this.getOrder = res.data.reverse();

        const timeFilter = res.data;
        console.log("testt timeFilter ==>", timeFilter);

        const expiTime = timeFilter[0].expiration_time;
        console.log("testt expiTime ==>", expiTime);

        const data = timeFilter.filter((item) => {
          const time = item.stocks.slice().reverse()[0];
          console.log("testt time ==>", time);
          const currentDate = new Date();
          const previousDate = new Date(time.created_at);
          const timeDifference = currentDate.getTime() - previousDate.getTime();
          const daysDifference = Math.floor(
            timeDifference / (1000 * 60 * 60 * 24)
          );
          console.log("testt daysDifference ==>", daysDifference);

          // const test = daysDifference >= this.expiredPro; //expired Product time
          const test = daysDifference >= expiTime && item.quantity > 0;
          console.log("testt test ====>", test);

          return test;
        });
        this.getOrder = data;
      });
  },
  methods: {
    dayjs: function () {
      return dayjs();
    },
    clearStock(item) {
      console.log("show id: ", item);
      const formData = new FormData();
      formData.append("_method", "put");
      formData.append("quantity", this.quantity);

      const token = localStorage.getItem("token");
      axios
        .post("http://localhost:8000/api/new/" + item.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(({ data }) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ສຳເລັດ !!",
            text: "Report problem !!",
            showConfirmButton: false,
            iconColor: "green",
            width: 600,
            padding: "3em",
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          // alert("ດຳເນີນການສຳເລັດ");
          console.log(data);
        });
    },
    daysSinceLastDate(item) {
      const currentDate = new Date();
      const previousDate = new Date(item);
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
  padding: 0.5rem 1rem;
  align-items: center;
  background-color: #eece57;
  border-radius: 5px;
}
</style>
