<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="getOrder"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>

</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      getOrder: [],
      getUser: [],
      userName: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text: "Calories", value: "firstname" },
        { text: "Fat (g)", value: "price_total" },
        { text: "Protein (g)", value: "created_at" },
      ],
    };
  },

  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/order/user", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getOrder = res.data.reverse();
      });

    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getUser = res.data.reverse();
      });
  },
};
</script>

<style></style>
