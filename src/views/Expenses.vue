<template>
  <div>
    <div class="employee">
      <h2 style="margin: 25px 0 25px 0">Expenses</h2>
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
          <b>ລາຍຈ່າຍທັ້ງໝົດ:&nbsp;</b>{{ sumN(getIngre).toLocaleString()
          }}<b>&nbsp;LAK</b>
        </p>
        <div class="table-responsive" style="height: 450px">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ລາຍຈ່າຍ</th>
                <th scope="col">ວັນທີ</th>
                <th scope="col">ເວລາ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in getIngre" :key="index">
                <th scope="row">{{ 1 + index }}</th>
                <td style="color: red">
                  - {{ item.total_price.toLocaleString() }}
                </td>
                <td>
                  {{
                    new Date(item.created_at).toLocaleString("nl-NL").substring(0, 10)
                  }}
                </td>
                <td>
                  {{
                    new Date(item.created_at).toLocaleString("nl-NL").substring(21, 9)
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
export default {
  data() {
    return {
      loading: true,
      order: "",
      price_total: "",
      getIngre: "",
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
      .get("http://localhost:8000/api/withuser", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getIngre = res.data.reverse();
        this.loading = false;
      });
  },

  methods: {
    sumN(_inputSets) {
      let total_price = 0;

      _inputSets.forEach((value) => {
        total_price += Number(value.total_price);
      });

      return total_price;
    },

    submit() {
      const token = localStorage.getItem("token");
      axios
        .get(
          `http://localhost:8000/api/expen?start_date=${this.info.dateStart}&end_date=${this.info.dateEnd}`,
          {
            headers: {
              "ngrok-skip-browser-warning": true,
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          this.getIngre = res.data;
        });
    },

    refreshPage() {
      window.location.reload();
    },
  },
};
</script>

<style></style>
