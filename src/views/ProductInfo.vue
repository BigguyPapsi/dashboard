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
                    <td>image</td>
                    <td>Product_type</td>
                    <td class="text-center">Options</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in getProt" :key="i">
                    <td class="text-center">
                      <viewer :images="item.img">
                        <img
                          style="width: 50px; height: 50px; object-fit: cover"
                          :src="'http://localhost:8000/storage/' + item.img"
                        />
                      </viewer>
                    </td>
                    <td>{{ item.name }}</td>

                    <td class="text-center">
                      <b-button variant="outline-warning"> Edit </b-button>
                      &nbsp;
                      <b-button variant="outline-danger"> Delete </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <router-link to="/user/create"
              ><b-button variant="primary">
                + Create new product type
              </b-button></router-link
            >
          </div>
        </td>
      </div>

      <td>
        <div class="card" style="width: 500px; height: 400px">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <td>image</td>
                  <td>Product_type</td>
                  <td class="text-center">Options</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in getProt" :key="i">
                  <td class="text-center">
                    <viewer :images="item.img">
                      <img
                        style="width: 50px; height: 50px; object-fit: cover"
                        :src="'http://localhost:8000/storage/' + item.img"
                      />
                    </viewer>
                  </td>
                  <td>{{ item.name }}</td>

                  <td class="text-center">
                    <b-button variant="outline-warning"> Edit </b-button>
                    &nbsp;
                    <b-button variant="outline-danger"> Delete </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <router-link to="/user/create"
            ><b-button variant="primary"> + Create </b-button>
          </router-link>
        </div>
      </td>
    </div>
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
          <template>
            <!-- v-slot:item.option="{ item }" -->
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

          <template>
            <!-- v-slot:item.popular_icon="{ item }" -->
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
      getProt: [],
      search: "",
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
