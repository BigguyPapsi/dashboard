<template>
  <div>
    <div class="employee">
      <h2 style="margin: 25px 0 25px 0">Ingredient Management</h2>
    </div>
    <b-tabs
      align="center"
      nav-class="bg-secondary d-flex align-items-center rounded"
      active-nav-item-class="font-weight-bold text-uppercase bg-dark text-white py-3 rounded"
    >
      <b-tab title="ຄຳນວນວັດຖຸດິບ" active title-link-class="text-white ">
        <div
          style="
            background-color: #fff;
            filter: drop-shadow(0px 3px 2px #9b9b9b);
          "
        >
          <div class="card-body">
            <b-button
              @click="addInputSet"
              variant="success"
              style="margin: 20px 0 20px 0"
            >
              <i class="fa-regular fa-square-plus"></i>
              ເພີ່ມລາຍການ
            </b-button>

            <b-form @submit.prevent="onSubmit">
              <div class="table-responsive" style="height: 360px">
                <div v-for="(inputSet, index) in inputSets" :key="index">
                  <b>{{ index + 1 }} &nbsp; </b>
                  <label>
                    ຊື່:
                    <b-input
                      style="width: 200px"
                      type="text"
                      v-model="inputSet.ingre_name"
                      placeholder="ຊື່ວັດຖຸດິບ"
                    />
                  </label>

                  <label class="ml-5">
                    ຈຳນວນ:
                    <b-input
                      style="width: 100px"
                      type="number"
                      v-model="inputSet.quantity"
                      min="0"
                      @input="calculatetotal(inputSet)"
                    />
                  </label>

                  <label class="ml-5">
                    ລາຄາ(ຕໍ່ອັນ):
                    <b-input
                      type="number"
                      min="0"
                      v-model="inputSet.price"
                      @input="calculatetotal(inputSet)"
                      step="500"
                    />
                  </label>

                  <label class="ml-5">
                    ຫົວໜ່ວຍ
                    <b-input
                      style="width: 150px"
                      type="text"
                      v-model="inputSet.unit"
                    />
                  </label>

                  <label class="ml-5">
                    ລວມ:
                    <!-- <b-input type="number" :value="inputSet.total" disabled /> -->
                    <p style="width: 150px">
                      {{ inputSet.total.toLocaleString() }} LAK
                    </p>
                  </label>

                  <b-button
                    variant="danger"
                    @click="removeInputSet(index)"
                    v-if="inputSets.length > 1"
                    ><i class="fa-solid fa-xmark"></i> ເອົາອອກ</b-button
                  >

                  <b-button v-else disabled
                    ><i class="fa-solid fa-xmark"></i> ເອົາອອກ</b-button
                  >
                </div>
              </div>

              <li
                class="list-group-item"
                style="display: flex; justify-content: space-between"
              >
                <b-button variant="dark" type="submit"> ບັນທຶກ</b-button>

                <b
                  ><td style="color: rgb(126, 126, 126)">
                    ລາຍການທັ້ງໝົດ:&nbsp;
                  </td>
                  <td>{{ inputSets.length }}</td>
                </b>

                <div style="width: 400px">
                  <b>
                    <!-- <td>{{ sumN(inputSets).toLocaleString() }}</td> -->
                    <td class="numberWcomma">
                      ລວມທັ້ງໝົດ: &nbsp;{{
                        sumN(inputSets).toLocaleString()
                      }}LAK
                    </td>
                  </b>
                </div>
              </li>
            </b-form>
          </div>
        </div>
      </b-tab>

      <!-- --------------------------------------------------------------- -->

      <b-tab title="ປະຫວັດການຄຳນວນ" title-link-class="text-white ">
        <!-- v-for="(item, i) in getIngre" :key="i" -->

        <div
          style="
            background-color: #fff;
            filter: drop-shadow(0px 3px 2px #9b9b9b);
          "
        >
          <div class="card-body">
            <div class="table-responsive" style="height: 500px">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ຊື່</th>
                    <th scope="col">ວັນທີ</th>
                    <th scope="col">ເວລາ</th>
                    <th scope="col">ເບິ່ງລາຍລະອຽດ</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(item, i) in getIngre"
                    :key="i"
                    @click="toggleDetail(index)"
                    :v-if="getIngre"
                  >
                    <td>{{ 1 + i }}</td>
                    <td>{{ item.user_name }}</td>
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

                    <!-- <td><b-button @click="viewInfo(item.id)">ລານລະອຽດ</b-button></td> -->
                    <td>
                      <b-button
                        variant="outline-primary"
                        v-b-modal.modal-center
                        @click="viewInfo(item.id)"
                      >
                        <i class="fa-solid fa-expand" />
                        ລາຍລະອຽດ
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <b-modal id="modal-center" centered title="ລາຍລະອຽດ" hide-footer>
          <div style="height: 350px" class="table-responsive">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
              "
            >
              <td>ຊື່: {{ view.user_name }}</td>
              <td>ລວມທັ້ງໝົດ:&nbsp;{{ view.total_price }}&nbsp;LAK</td>
            </div>

            <div
              style="display: flex; justify-content: end; margin-bottom: 5px"
            >
              <div>
                ວັນທີ:
                {{
                  new Date(view.created_at)
                    .toLocaleString("nl-NL")
                    .substring(0, 10)
                }}
              </div>
            </div>

            <div
              style="display: flex; justify-content: end; margin-bottom: 25px"
            >
              <div>
                ເວລາ:
                {{
                  new Date(view.created_at)
                    .toLocaleString("nl-NL")
                    .substring(21, 9)
                }}
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ຊື່</th>
                  <th scope="col">ຈຳນວນ</th>
                  <th scope="col">ຫົວໜ່ວຍ</th>
                  <th scope="col">ລາຄາ(ຕໍ່ອັນ)</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :v-if="view.import_in_detail"
                  v-for="(item, index) in view.import_in_detail"
                  :key="index"
                >
                  <th scope="row">{{ 1 + index }}</th>
                  <td>{{ item.ingre_name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.unit }}</td>
                  <td>{{ item.price.toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-modal>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    const sumN = (_inputSets) => {
      let total = 0;
      _inputSets.forEach((value) => {
        total += Number(value.total);
      });

      return total;
    };

    return {
      getIngre: "",
      view: "",
      sum: 0,
      sumN,
      inputSets: [
        {
          ingre_name: "",
          quantity: 1,
          price: 0,
          total: 0,
          total_price: 0,
          unit: "",
          created_at: null,
        },
      ],
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
        this.getIngre = res.data;
        console.log(res.data);
      });
  },

  methods: {
    async deleteIngre(id) {
      // let x = window.confirm("You want to delete the user?");

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("token");

          await axios.delete("http://localhost:8000/api/import_in/" + id, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          // window.location.reload();
        }
      });

      // console.log(user);
      // alert("User deleted!");
      // window.location.reload();
    },

    moment: function () {
      return moment();
    },

    async viewInfo(id) {
      if (id !== null) {
        const token = localStorage.getItem("token");
        const view = await axios.get(
          "http://localhost:8000/api/import_in/" + id,
          {
            headers: {
              "ngrok-skip-browser-warning": true,
              Authorization: "Bearer " + token,
            },
          }
        );

        this.view = view.data;
      }
    },
    save() {
      if (this.users !== null) {
        this.saveData();
      }
    },
    onSubmit(even) {
      even.preventDefault();
      console.log("hello");
      this.save();
    },

    saveData() {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("_method", "PATH");
      axios
        .post(
          "http://localhost:8000/api/import_in",
          {
            import_in_details: this.inputSets,
            total_price: this.sumN(this.inputSets),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(() => {
          Swal.fire({
            text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
            icon: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch(() => {
          // alert("ໃສ່ຂໍ້ມູນບໍ່ຄົບ");
          Swal.fire({
            text: "ໃສ່ຂໍ້ມູນບໍ່ຄົບ",
            icon: "error",
            showConfirmButton: false,
          });
        });
    },

    comma(numb) {
      if (numb == "undefined" || !numb) return "";
      return numb.toLocaleString();
    },

    calculatetotal(inputSet) {
      inputSet.total = inputSet.quantity * inputSet.price;
    },

    addInputSet() {
      this.inputSets.push({
        ingre_name: "",
        quantity: 1,
        price: 0,
        total: 0,
      });
    },
    removeInputSet(index) {
      this.inputSets.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.numberWcomma {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
