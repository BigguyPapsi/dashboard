<template>
  <div>
    <div class="employee">
      <h2 style="margin: 25px 0 25px 0">Income</h2>
    </div>
    <div
      v-if="loading == true"
      style="
        display: flex;
        justify-content: center;
        height: 80vh;
        align-items: center;
      "
    >
      <b-spinner
        style="width: 80px; height: 80px"
        label="Loading..."
      ></b-spinner>
    </div>

    <div v-else class="card">
      <div class="card-body">
        <div style="margin-bottom: 15px; display: flex; justify-content: end">
          <td style="padding-right: 25px">
            <b-input type="date" v-model="info.dateStart"></b-input>
          </td>
          <td style="padding-right: 25px">
            <b-input type="date" v-model="info.dateEnd"></b-input>
          </td>
          <td style="padding-right: 25px">
            <b-button variant="success" @click="submit()">
              <i class="fa-solid fa-check"></i>
              &nbsp; Submit</b-button
            >
          </td>
          <td>
            <b-button variant="danger" @click="refreshPage" type="button">
              <i class="fa-solid fa-arrow-rotate-right"></i>
              &nbsp; Reset</b-button
            >
          </td>
        </div>
        <p>
          <b>ລາຍຮັບທັ້ງໝົດ:&nbsp;</b> {{ sumN(getOrder).toLocaleString() }}
          <b>&nbsp;LAK</b>
        </p>
        <div class="table-responsive" style="height: 450px">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ລາຍຮັບ</th>
                <th scope="col">ວັນທີ</th>
                <th scope="col">ເວລາ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in getOrder" :key="index">
                <th scope="row">{{ 1 + index }}</th>
                <td style="color: green">
                  + {{ item.price_total.toLocaleString() }}
                </td>
                <td>
                  {{
                    new Date(item.created_at)
                      .toLocaleString("nl-NL")
                      .substring(0, 10)
                  }}
                </td>
                <td>
                  {{
                    new Date(item.created_at)
                      .toLocaleString("nl-NL")
                      .substring(21, 9)
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Swal from 'sweetalert2';
export default {
  data() {
    return {
      loading: true,
      order: "",
      price_total: "",
      getOrder: "",
      getRevenue: "",
      info: {
        dateStart: "",
        dateEnd: "",
      },
    };
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
        this.getOrder = res.data.reverse();
        this.loading = false;
      });
  },

  // .slice(0,2)

  methods: {
    sumN(_inputSets) {
      let price_total = 0;

      _inputSets.forEach((value) => {
        price_total += Number(value.price_total);
      });

      return price_total;
    },

    submit() {
      const token = localStorage.getItem("token");
      axios
        .get(
          `http://localhost:8000/api/param?start_date=${this.info.dateStart}&end_date=${this.info.dateEnd}`,
          {
            headers: {
              "ngrok-skip-browser-warning": true,
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          this.getOrder = res.data;
        });
    },

    refreshPage() {
      window.location.reload();
    },
  },
};
</script>

<style></style>
