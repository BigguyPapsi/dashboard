<template>
  <div>
    <div class="employee">
      <h2 style="margin: 25px 0 25px 0">Product Management</h2>
    </div>
    <div>
      <div
        style="display: flex; justify-content: space-between; margin-bottom: 2%"
      >
        <td>
          <div class="card" style="width: 500px; height: 400px">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <td class="text-center">image</td>
                    <td class="text-center">Product_type</td>
                    <td class="text-center">Options</td>
                  </tr>
                </thead>
                <tbody>
                  <p></p>
                  <tr v-for="(item, i) in getProt" :key="i">
                    <td class="text-center">
                      <viewer :images="item.img" v-if="item.img">
                        <img
                          style="width: 50px; height: 50px; object-fit: cover"
                          :src="'http://localhost:8000/storage/' + item.img"
                        />
                      </viewer>

                      <img
                        v-b-tooltip.hover
                        title="No image"
                        v-else
                        style="
                          width: 50px;
                          height: 50px;
                          object-fit: cover;
                          opacity: 35%;
                        "
                        src="https://media.discordapp.net/attachments/898893230928711750/1134203169862340799/download.png?width=662&height=662"
                      />
                    </td>
                    <td class="text-center">{{ item.name }}</td>

                    <td class="text-center">
                      <b-button
                        v-b-modal.modal-1
                        variant="outline-warning"
                        @click="OnShow(item)"
                      >
                        Edit
                      </b-button>
                      &nbsp;
                      <b-button
                        variant="outline-danger"
                        @click="deleteptType(item.id)"
                      >
                        Delete
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- <router-link to="/product_tpye/create" ></router-link> -->

            <!-- <b-button variant="primary" style="width: 500px">
              + Create new product type
            </b-button> -->
          </div>
        </td>

        <!----------------------------------------------------------------------------->

        <td>
          <div class="card" style="width: 500px; height: 400px">
            <div class="card-body">
              <h3
                style="
                  display: flex;
                  justify-content: center;
                  margin-bottom: 20px;
                "
              >
                Create new product type
              </h3>

              <label for="example-input" class="mt-5">Name</label>
              <b-form ref="form" @submit.prevent="onSubmit">
                <b-input-group>
                  <b-input-group-text>
                    <i class="fa-solid fa-mug-hot" />
                  </b-input-group-text>

                  <b-form-input
                    v-model="pdType.name"
                    placeholder="Add product type name"
                  />
                </b-input-group>

                <b-form-group label-for="form-image">
                  <label for="example-input" class="mt-5">Image</label>
                  <b-input-group>
                    <b-input-group-prepend is-text>
                      <b-icon icon="image-fill"></b-icon>
                    </b-input-group-prepend>

                    <!-- v-model="users.profile_img"
                    :state="Boolean(users.profile_img)" -->

                    <b-form-file
                      id="form-image"
                      v-model="pdType.img"
                      :state="Boolean(pdType.img)"
                      :disabled="busy"
                      accept="image/*"
                    ></b-form-file>
                  </b-input-group>
                </b-form-group>

                <div style="display: flex; justify-content: center">
                  <b-button
                    class="mt-3"
                    variant="success"
                    ref="submit"
                    type="submit"
                  >
                    <i class="fa-solid fa-plus"></i>
                    Add
                  </b-button>

                  <b-button
                    class="mt-3 ml-3"
                    variant="danger"
                    @click="resetForm"
                  >
                    <i class="fa-solid fa-rotate-right"></i>
                    Reset
                  </b-button>
                </div>
              </b-form>
            </div>
          </div>
        </td>
      </div>
    </div>

    <!-- -------------------Modal-------------------- -->

    <b-modal id="modal-1" title="BootstrapVue" hide-footer size="lg">
      <div class="card" style="margin: 0 200px">
        <div class="card-body">
          <b-form @submit.prevent="onUpdate">
            <b-input-group>
              <b-input-group-text
                ><i class="fa-solid fa-mug-hot"> </i>
              </b-input-group-text>

              <b-form-input
                v-model="selectedPdtype.name"
                placeholder="Add product type name"
              />
            </b-input-group>

            <b-form-group label-for="form-image">
              <label for="example-input" class="mt-5"> Image </label>
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="image-fill"></b-icon>
                </b-input-group-prepend>

                <b-form-file
                  id="form-image2"
                  v-model="selectedPdtype.img"
                  :state="Boolean(selectedPdtype.img)"
                  :disabled="busy"
                  accept="image/*"
                ></b-form-file>
              </b-input-group>
            </b-form-group>
            <div style="display: flex; justify-content: center">
              <b-button type="submit" variant="warning"> Update </b-button>
            </div>
          </b-form>
        </div>
      </div>
    </b-modal>

    <!-- ------------------ product form ------------------- -->

    <div>
      <v-card>
        <v-card-title>
          <div v-if="getProt.length == 0">
            <span id="disabled-wrapper" class="d-inline-block" tabindex="0">
              <b-button style="pointer-events: none" disabled>
                + ເພີ່ມສິນຄ້າ
              </b-button>
            </span>
            <b-tooltip target="disabled-wrapper"
              >ຍັງບໍ່ທັນມີປະເພດສິນຄ້າ</b-tooltip
            >
          </div>

          <router-link v-else to="/product/create">
            <b-button variant="primary"> + ເພີ່ມສິນຄ້າ</b-button>
          </router-link>

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="getProd" :search="search">
          <template v-slot:item.stocks="{ item }">
            <div v-if="item.quantity != 0">
              <p>
                {{
                  daysSinceLastDate(item.stocks.slice().reverse()[0].created_at)
                }}
                ວັນ
              </p>
            </div>
            <div v-else>
              <p>ຍັງບໍ່ມີລາຍການ stock ໃໝ່</p>
            </div>
          </template>
          <template v-slot:item.option="{ item }">
            <b-button
              variant="outline-primary"
              @click="viewInfo(item.id)"
              v-b-modal.modal-2
            >
              <i class="fa-solid fa-expand"></i> View
            </b-button>
            &nbsp;

            <router-link :to="{ name: 'productEdit', params: { id: item.id } }">
              <b-button variant="outline-warning">
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </b-button>
            </router-link>
            &nbsp;

            <b-button variant="outline-danger" @click="deleteProduct(item.id)">
              <i class="fa-regular fa-trash-can"></i> Delete</b-button
            >
          </template>

          <template v-slot:item.popular_icon="{ item }">
            <div v-if="item.popular == 'true'">
              <i class="fa-solid fa-star"></i>
            </div>
            <div v-else>
              <i class="fa-regular fa-star"></i>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <!-- ---------------------------- product modal -------------------------------- -->

    <b-modal id="modal-2" title=" ລາຍລະອຽດສິນຄ້າ" hide-footer scrollable>
      <div style="height: 550px">
        <img
          style="width: 100%; height: 320px; object-fit: cover"
          :src="'http://localhost:8000/storage/' + view.img"
        />
        <table class="table table-bordered" v-if="view">
          <tbody>
            <tr>
              <td style="width: 120px">&nbsp;ຊື່:</td>
              <td>{{ comma(view.name) }}</td>
            </tr>
            <tr>
              <td style="width: 120px">&nbsp;ປະເພດ:</td>
              <td>{{ view.product_type_name }}</td>
            </tr>
            <tr>
              <td style="width: 120px">&nbsp;ຈຳນວນ:</td>
              <td>
                {{ view.quantity }} {{ view.unit }}
                <b-button
                  variant="success"
                  v-b-modal.modal-center
                  style="margin-left: 100px"
                  >+ ເພີ່ມ</b-button
                >
              </td>
            </tr>
            <tr>
              <td style="width: 120px">&nbsp;ລາຄາ(ຕໍ່ອັນ):</td>
              <td>{{ view.price }}</td>
            </tr>
            <tr>
              <td style="width: 120px">&nbsp;ພິເສດ:</td>
              <td v-if="view.special == 'true'">
                <i class="fa-solid fa-check" style="color: green" />
              </td>
              <td v-else><i class="fa-solid fa-xmark" style="color: red" /></td>
            </tr>
            <tr>
              <td style="width: 120px">&nbsp;ເມນູໃໝ່:</td>
              <!-- <td>{{ view.recent }}</td> -->
              <td v-if="view.recent == 'true'">
                <i class="fa-solid fa-check" style="color: green" />
              </td>
              <td v-else><i class="fa-solid fa-xmark" style="color: red" /></td>
            </tr>
            <tr>
              <td style="width: 120px">&nbsp;ແນະນຳ:</td>
              <!-- <td>{{ view.popular }}</td> -->
              <td v-if="view.popular == 'true'">
                <i class="fa-solid fa-check" style="color: green" />
              </td>
              <td v-else><i class="fa-solid fa-xmark" style="color: red" /></td>
            </tr>
            <td colspan="2">
              <h4>ຄຳອະທິບາຍ:</h4>

              {{ view.description }}
            </td>
          </tbody>
        </table>
      </div>
    </b-modal>

    <b-modal id="modal-center" centered title="ເພີ່ມ Stock" hide-footer>
      <b-input-group prepend="ຈຳນວນ" class="mt-3">
        <b-form-input
          type="number"
          v-model="quantityPlus"
          min="1"
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="success" @click="saveQ">ບັນທຶກ</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-modal>

    <!-- ---------------------------------clear stock ---------------------------------------------------------------------------- -->
    <expired-product />
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import Vue from "vue";
import ExpiredProduct from "../components/ExpiredProduct.vue";
Vue.use(VueViewer);
export default {
  components: { ExpiredProduct },
  data() {
    return {
      quantityPlus: 1,
      view: [],
      selectedPdtype: {},
      getProt: [],
      search: "",
      pdType: {
        name: "",
        img: null,
      },

      headers: [
        {
          text: "ລະຫັດ",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "name",
          value: "name",
        },
        // { text: "Product type", value: "product_type_name" },
        { text: "Quantity", value: "quantity" },
        // { text: "Unit", value: "unit" },
        { text: "Price", value: "price" },
        { text: "Popular", value: "popular_icon" },
        { text: "expiration_time", value: "expiration_time" },
        { text: "time add - now", value: "stocks" },
        { text: "Option", value: "option" },
      ],
      getProd: [],
    };
  },
  methods: {
    saveQ() {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      // formData.append("_method", "PATH");
      formData.append("quantity", this.quantityPlus);
      formData.append("product_id", this.view.id);

      axios
        .post("http://localhost:8000/api/stock", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          // alert("ບັນທືກແລ້ວ");
          // console.log(data);
          // window.location.reload();

          //
          setTimeout(() => {
            window.location.reload();
          }, 1000);

          Swal.fire({
            text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
            icon: "success",
            showConfirmButton: false,
          });

          this.$router.push({ path: "/product" });
        })
        .catch(() => {
          // alert("ໃສ່ຂໍ້ມູນບໍ່ຄົບ");
          Swal.fire({
            text: "ໃສ່ຂໍ້ມູນບໍ່ຖືກຕ້ອງ",
            icon: "error",
          });
        });
    },

    comma(numb) {
      if (numb == "undefined" || !numb) return "";
      return numb.toLocaleString();
    },

    async deleteProduct(id) {
      let x = window.confirm("You want to delete the user?");

      if (x) {
        const token = localStorage.getItem("token");
        const user = await axios.delete(
          "http://localhost:8000/api/product/" + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        console.log(user);
        alert("User deleted!");
        window.location.reload();
      }
    },

    async viewInfo(id) {
      if (id !== null) {
        const token = localStorage.getItem("token");
        const view = await axios.get(
          "http://localhost:8000/api/product/" + id,
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

    mounted() {
      const token = localStorage.getItem("token");

      axios
        .get("http://localhost:8000/api/product_type" + this.userId, {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.pdType = res.data;
          console.log(this.getByid);
        });
    },

    update() {
      if (this.pdType !== null) {
        this.updateData();
      }
    },
    onUpdate(even) {
      even.preventDefault();
      console.log("hello");
      this.update();
    },

    updateData() {
      const formData = new FormData();
      formData.append("_method", "put");
      formData.append("name", this.selectedPdtype.name);

      // formData.append('profile_img', this.users.profile_img)

      if (typeof this.selectedPdtype.img !== "string") {
        formData.append("img", this.selectedPdtype.img);
      }
      const token = localStorage.getItem("token");

      axios
        .post(
          "http://localhost:8000/api/product_type/" + this.selectedPdtype.id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(({ data }) => {
          // alert("saveddddd");
          // alert("ບັນທຶກຂໍ້ມູນສຳເລັດ");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ບັນທຶກຂໍ້ມູນສຳເລັດ !",
            text: "Successful !",
            showConfirmButton: false,
            iconColor: "limegreen",
            width: 600,
            padding: "3em",
            timer: 1500,
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
          // window.location.reload();
          this.$router.push({ path: "/product" });
          console.log(data);
        });
    },

    async OnShow(item) {
      this.selectedPdtype = item;
      console.log(item);
    },

    async deleteptType(id) {
      let x = window.confirm("Do you want to delete this product type?");

      if (x) {
        const token = localStorage.getItem("token");
        await axios.delete("http://localhost:8000/api/product_type/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        window.location.reload();
        alert("Product type deleted!");
      }
    },

    save() {
      if (this.users !== null) {
        this.saveData();
      }
    },
    onSubmit(even) {
      even.preventDefault();
      this.save();
    },

    saveData() {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      formData.append("_method", "PATH");
      formData.append("profile_img", this.pdType.img);

      axios
        .post("http://localhost:8000/api/product_type", this.pdType, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          Swal.fire({
            text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);

          // this.$router.push({ path: "/product" });
        })
        .catch(() => {
          Swal.fire({
            text: "ຍັງບໍ່ໄດ້ປ້ອນຂໍ້ມູນ",
            icon: "error",
          });
        });
    },

    resetForm() {
      this.$refs.form.reset();
    },

    show() {
      this.$viewerApi({
        images: this.images,
      });
    },
    //-----------------------------------------------------------------------------------------------//
    daysSinceLastDate(item) {
      const currentDate = new Date();
      const previousDate = new Date(item);
      const timeDifference = currentDate.getTime() - previousDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference;
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/product_type", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getProt = res.data;
      });

    axios
      .get("http://localhost:8000/api/new", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getProd = res.data;
      });
  },
};
</script>

<style></style>
