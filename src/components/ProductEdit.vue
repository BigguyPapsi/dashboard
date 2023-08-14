<template>
  <div style="display: flex; justify-content: center">
    <div class="card" style="width: 600px">
      <router-link
        to="/product"
        style="display: flex; justify-content: end; margin: 10px 10px 0 0"
      >
        <button
          style="justify-content: center"
          type="button"
          class="btn-close"
          aria-label="Close"
        />
      </router-link>
      <div class="card-body">
        <h2 style="display: flex; justify-content: center">ແກ້ສິນຄ້າ</h2>
        <b-form @submit.prevent="onSubmit">
          <b-input-group>
            <b-input-group-text
              ><i class="fa-solid fa-bowl-food"></i
            ></b-input-group-text>
            <b-form-input placeholder="Product name" v-model="products.name" />
          </b-input-group>

          <div class="mt-5">
            <b-input-group>
              <b-input-group-text
                ><i class="fa-solid fa-dollar-sign"></i
              ></b-input-group-text>
              <b-form-input
                v-model="products.price"
                type="number"
                placeholder="Price"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              />
              <b-input-group-append>
                <b-form-select v-model="products.product_type_id">
                  <b-form-select-option :value="null"
                    >Select product type</b-form-select-option
                  >
                  <b-form-select-option
                    v-for="(item, i) in getSelect"
                    :key="i"
                    :value="item.id"
                    >{{ item.name }}</b-form-select-option
                  >
                </b-form-select>
              </b-input-group-append>
            </b-input-group>
          </div>

          <b-form-group label-for="form-image" class="mt-5">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="image-fill"></b-icon>
              </b-input-group-prepend>

              <b-form-file
                v-model="products.img"
                :state="Boolean(products.img)"
                id="form-image"
                :disabled="busy"
                accept="image/*"
              ></b-form-file>
            </b-input-group>
          </b-form-group>

          <div class="mt-5">
            <td><label for="sb-inline">Quantity</label> &nbsp;&nbsp;</td>
            <td>
              <vue-numeric-input
                v-model="products.quantity"
                :min="0"
                :max="999"
                :step="1"
                style="width: 100px"
              />
            </td>
            <td>
              <b-input-group size="sm" style="margin-left: 15px">
                <b-input-group-text>
                  <i class="fa-solid fa-bars"></i>
                </b-input-group-text>
                <b-form-input placeholder="Unit" v-model="products.unit">
                </b-form-input>
              </b-input-group>
            </td>
          </div>

          <td style="padding-right: 10px">
            <div>
              <b-input-group prepend="Special" class="mb-2 mt-5">
                <b-input-group-append is-text>
                  <b-form-checkbox
                    v-model="products.special"
                    name="check-button success "
                    switch
                    class="mr-n2"
                  >
                  </b-form-checkbox>
                </b-input-group-append>
              </b-input-group>
            </div>
          </td>

          <td style="padding-right: 10px">
            <div>
              <b-input-group prepend="Recent" class="mb-2 mt-5">
                <b-input-group-append is-text>
                  <b-form-checkbox
                    v-model="products.recent"
                    name="check-button"
                    switch
                    class="mr-n2"
                  >
                  </b-form-checkbox>
                </b-input-group-append>
              </b-input-group>
            </div>
          </td>

          <td>
            <div>
              <b-input-group prepend="Popular" class="mb-2 mt-5">
                <b-input-group-append is-text>
                  <b-form-checkbox
                    v-model="products.popular"
                    name="check-button"
                    switch
                    class="mr-n2"
                  >
                  </b-form-checkbox>
                </b-input-group-append>
              </b-input-group>
            </div>
          </td>

          <b-row class="mt-2">
            <b-col>
              <b-form-textarea
                style="height: 150px"
                id="textarea-default"
                v-model="products.description"
                placeholder="Product description"
              ></b-form-textarea>
            </b-col>
          </b-row>

          <div class="d-flex justify-content-center mt-5">
            <b-button ref="submit" type="submit" :disabled="busy"
              >Submit</b-button
            >
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import VueNumericInput from "vue-numeric-input";
export default {
  components: {
    VueNumericInput,
  },
  data() {
    return {
      getSelect: {},
      prodId: this.$route.params.id,
      getProd: {},
      getByid: {},
      products: {
        name: "",
        product_type_id: null,
        description: "",
        unit: "",
        price: "",
        special: false,
        recent: false,
        popular: false,
        quantity: 0,
      },
    };
  },

  methods: {
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
      const formData = new FormData();

      formData.append("_method", "put");
      formData.append("name", this.products.name);
      formData.append("product_type_id", this.products.product_type_id);
      formData.append("special", this.products.special);
      formData.append("recent", this.products.recent);
      formData.append("description", this.products.description);
      formData.append("quantity", this.products.quantity);
      formData.append("unit", this.products.unit);
      formData.append("price", this.products.price);
      formData.append("popular", this.products.popular);

      if (typeof this.products.img !== "string") {
        formData.append("img", this.products.img);
      }
      const token = localStorage.getItem("token");

      axios
        .post("http://localhost:8000/api/product/" + this.prodId, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
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
          // alert("saveddddd");
          // window.location.reload();
          this.$router.push({ path: "/product" });
        });
    },
  },

  mounted() {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/product_type/", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getSelect = res.data;
      });

    axios
      .get("http://localhost:8000/api/product/" + this.prodId, {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.products = res.data;
      });
  },
};
</script>

<style></style>
