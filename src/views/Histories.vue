<template>
  <div style="content">
    <div class="employee">
      <h2 style="margin: 25px 0 25px 0">History</h2>
    </div>
    <v-data-table
      :headers="headers"
      :items="getOrder"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
      <template v-slot:item.created_at="{ item }">
        {{ new Date(item.created_at).toLocaleString("nl-NL") }}
      </template>
      <template v-slot:item.action="{ item }">
        <b-button
          variant="outline-primary"
          v-b-modal.modal-scrollable
          @click="historyById(item.id)"
          >View</b-button
        >
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>

    <!-- Modal -->
    <div v-if="viewItem">
      <b-modal id="modal-scrollable" size="lg" hide-footer>
        <div class="modal-content">
          <div class="head-content">
            <h4 class="text-center">ລາຍລະອຽດ</h4>
            <h6 class="text-center">ລະຫັດບິນ: {{ viewItem.id }}</h6>
            <div class="customer-info">
              <div>
                <p class="mt-1">
                  User Id: {{ viewItem.user_id }} <br />
                  Role:
                  {{ viewItem.roles }}
                </p>
                <h6>ຊື່: {{ viewItem.firstname }}</h6>
                <h6>ເບີໂທ: {{ viewItem.tel }}</h6>
              </div>
              <div>
                <h6>
                  ວັນທີ:
                  {{
                    new Date(viewItem.created_at)
                      .toLocaleString("nl-NL")
                      .substring(0, 10)
                  }}
                </h6>
                <h6>
                  ເວລາ :
                  {{
                    new Date(viewItem.created_at)
                      .toLocaleString("nl-NL")
                      .substring(21, 9)
                  }}
                </h6>
              </div>
            </div>
            <hr class="mt-3" />
            <div class="product-detail">
              <h5 class="text-warning">ລາຍການສິນຄ້າ:</h5>
              <div class="pro-table">
                <table class="table">
                  <thead>
                    <tr>
                      <th>ລະຫັດ</th>
                      <th>ຊື່ສຶນຄ້າ</th>
                      <th>ຈຳນວນ</th>
                      <th>ລາຄາ/ຫົວໜ່ວຍ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(history, i) in viewItem.order_detail" :key="i">
                      <td>{{ history.id }}</td>
                      <td>{{ history.name }}</td>
                      <td>{{ history.quantity }}</td>
                      <td>{{ history.price }} kip/ {{ history.unit }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="total-content">
                  <p>
                    <b>ລາຄາລວມ: </b
                    ><span class="text-danger">
                      {{ viewItem.price_total }}</span
                    >
                    kip
                  </p>
                </div>
                <hr class="mt-3" />
                <div class="payment" v-show="viewItem.receipt_image !== null">
                  <h><b>ຕິດຄັດການຊ່ຳລະ</b></h>
                  <div class="img-payment">
                    <img
                      width="300"
                      alt="image"
                      :src="
                        'http://127.0.0.1:8000/storage/' +
                        viewItem.receipt_image
                      "
                    />
                  </div>
                </div>
                <div
                  class="location-content"
                  v-show="viewItem.location !== null"
                >
                  <div class="location-des">
                    <h><b>ສະຖານທີ່: </b></h>
                    <p class="txt-location">{{ viewItem.location }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>

    <history-table />
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";

export default {
  comments: {},
  data() {
    return {
      getOrder: [],
      getUser: [],
      userName: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      viewItem: [],
      headers: [
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
        { text: "ລາຄາລວມ", value: "price_total" },
        { text: "action", value: "action" },
      ],
    };
  },

  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/allorderwithdetail", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getOrder = res.data.reverse();
      });

    // axios
    //   .get("http://localhost:8000/api/users", {
    //     headers: {
    //       "ngrok-skip-browser-warning": true,
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //   .then((res) => {
    //     this.getUser = res.data.reverse();
    //   });
  },
  methods: {
    dayjs: function () {
      return dayjs();
    },
    //------------------------------------------------------------------------------//
    historyById(item) {
      console.log("history:" + item);
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:8000/api/getOrderById/" + item, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.viewItem = res.data;
          //   console.log(viewItem);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-content {
  padding: 1rem;
  .head-content {
    .customer-info {
      padding-top: 1rem;
      display: flex;
      align-items: end;
      justify-content: space-between;
      h6 {
        text-align: start;
      }
    }
  }
}
.payment {
  .img-payment {
    margin-top: 7px;
    display: flex;
    height: 100%;
    width: 100%;
    object-fit: cover;
    background-color: #e2e2e2;
    justify-content: center;
  }
}
.location-content {
  padding: 1rem 0;
  .location-des {
    .txt-location {
      margin-top: 7px;
      padding: 0.5rem;
      border: 1px solid gray;
    }
  }
}
</style>
