<template>
  <div>
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
                  <b-input-group-text
                    ><i class="fa-solid fa-mug-hot"></i
                  ></b-input-group-text>

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
                      id="form-image1"
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

    <b-modal id="modal-1" title="BootstrapVue" hide-footer>
      <b-form @submit.prevent="onUpdate">
        <b-input-group>
          <b-input-group-text
            ><i class="fa-solid fa-mug-hot"></i
          ></b-input-group-text>

          <b-form-input
            v-model="selectedPdtype.name"
            placeholder="Add product type name"
          />
        </b-input-group>

        <b-form-group label-for="form-image">
          <label for="example-input" class="mt-5">Image</label>
          <b-input-group>
            <b-input-group-prepend is-text>
              <b-icon icon="image-fill"></b-icon>
            </b-input-group-prepend>

            <b-form-file
              id="form-image"
              v-model="selectedPdtype.img"
              :state="Boolean(selectedPdtype.img)"
              :disabled="busy"
              accept="image/*"
            ></b-form-file>
          </b-input-group>
        </b-form-group>

        <b-button type="submit"> Update </b-button>
      </b-form>
    </b-modal>

    <!-- ------------------------------------- -->

    <div>
      <v-card>
        <v-card-title>
          <router-link to="/product/create">
            <b-button variant="primary"> + Create new product </b-button>
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
          <template v-slot:item.option="{ item }">
            <b-button
              variant="outline-primary"
              @click="viewInfo(item.id)"
              v-b-modal.modal-scrollable
            >
              <i class="fa-solid fa-expand"></i> View</b-button
            >
            &nbsp;

            <router-link :to="{ name: 'userEdit', params: { id: item.id } }">
              <b-button variant="outline-warning">
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </b-button>
            </router-link>
            &nbsp;

            <b-button variant="outline-danger" @click="deleteUser(item.id)">
              <i class="fa-regular fa-trash-can"></i> Delete</b-button
            >
          </template>

          <template v-slot:item.popular_icon="{ item }">
            <div v-if="item.popular == 1">
              <i class="fa-solid fa-star"></i>
            </div>
            <div v-else>
              <i class="fa-regular fa-star"></i>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import Vue from "vue";
Vue.use(VueViewer);
export default {
  data() {
    return {
      selectedPdtype: {},
      getProt: [],
      search: "",
      pdType: {
        name: "",
        img: null,
      },

      headers: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Product type", value: "product_type_name" },
        { text: "Quantity", value: "quantity" },
        { text: "Unit", value: "unit" },
        { text: "Price", value: "price" },
        { text: "Popular", value: "popular_icon" },
        { text: "Option", value: "option" },
      ],
      getProd: [],
    };
  },
  methods: {
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

      if (typeof this.selectedPdtype.profile_img !== "string") {
        formData.append("pdType", this.selectedPdtype.img);
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
          alert("saveddddd");
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
          window.location.reload();
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
      .get("http://localhost:8000/api/product", {
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
