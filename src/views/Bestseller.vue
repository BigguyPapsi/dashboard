<template>
  <div>
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
        <tr v-for="(item, index) in getBestSeller" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.ຈໍານວນທີ່ຂາຍໄດ້ }}</td>
          <td>{{ item.ລາຄາທັງໝົດທີ່ຂາຍໄດ້ }}</td>
          <td>{{ item.ຈໍານວນທີ່ເຫຼືອໃນstock }}</td>
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
      getBestSeller: "",
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/qtyBestseller", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getBestSeller = res.data.slice(0,5);
      });
  },
};
</script>

<style></style>
