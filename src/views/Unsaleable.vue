<template>
  <div>
    <div class="employee">
      <h2 style="margin: 25px 0 25px 0">Unsaleable</h2>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th>name</th>
          <th>ຈໍານວນທີ່ຂາຍໄດ້</th>
          <th>total price</th>
          <th>stock</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in getBadSeller" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.total_quantity_sold }}</td>
          <td>{{ item.total_sales_value }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      loading: true,
      getBadSeller: "",
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/BadSelling", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getBadSeller = res.data;
        this.loading = false;
      });
  },
};
</script>

<style></style>
