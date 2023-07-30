<template>
  <div>
    <div class="employee">
      <h2>Users manage</h2>
    </div>
    <div>
      <div class="btn-create">
        <router-link to="/user/create"
          ><b-button variant="primary">+ Create</b-button></router-link
        >
      </div>
      <v-card>
        <v-card-title>
          Users Information
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>


        <v-data-table :headers="headers" :items="getUser" :search="search">
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
        </v-data-table>

       
      </v-card>

      <b-modal
        id="modal-scrollable"
        hide-footer
        scrollable
        title="User Information"
      >
        <div>
          <div style="display: flex; justify-content: center">
            <b-img
              v-if="view.profile_img"
              style="
                width: 140px;
                height: 140px;
                object-fit: cover;
                border-radius: 100%;
              "
              :src="'http://localhost:8000/storage/' + view.profile_img"
            />
            <b-avatar v-else variant="secondary"  size="140px"></b-avatar>
          </div>

          <div
            style="
              display: flex;
              justify-content: center;
              margin-top: 20px;
              margin-bottom: 20px;
            "
          >
            <router-link :to="{ name: 'userEdit', params: { id: view.id } }">
              <b-button variant="warning"
                ><i class="fa-solid fa-pen-to-square"></i> Edit
              </b-button>
            </router-link>
            &nbsp; &nbsp; &nbsp;

            <b-button variant="outline-danger" @click="deleteUser(view.id)">
              <i class="fa-regular fa-trash-can"></i> Delete</b-button
            >
          </div>

          <div>
            <h3 style="display: flex; justify-content: center">
              {{ view.firstname }} {{ view.lastname }}
            </h3>
            <br />

            <div>
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td><i class="fa-solid fa-phone"></i>&nbsp; phone:</td>
                    <td>{{ view.phone_number }}</td>
                  </tr>
                  <tr>
                    <td>
                      <i class="fa-solid fa-venus-mars"></i>&nbsp; gender:
                    </td>
                    <td>{{ view.gender }}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-users"></i>&nbsp; role:</td>
                    <td>{{ view.roles }}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-map-pin"></i> village:</td>
                    <td>{{ view.village }}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-map-pin"></i> district:</td>
                    <td>{{ view.district }}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-map-pin"></i> province:</td>
                    <td>{{ view.province }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      getUser: [],
      search: "",
      data: [],
      view: [],
      headers: [
        {
          text: "fristname",
          align: "start",
          sortable: false,
          value: "firstname",
        },
        { text: "lastname", value: "lastname" },
        { text: "gender", value: "gender" },
        { text: "roles", value: "roles" },
        { text: "option", value: "option" },
      ],
    };
  },
  methods: {
    async deleteUser(id) {
      let x = window.confirm("You want to delete the user?");

      if (x) {
        const token = localStorage.getItem("token");
        const user = await axios.delete(
          "http://localhost:8000/api/users/" + id,
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
          "http://localhost:8000/api/users/selOne/" + id,
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
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.getUser = res.data;
      });
  },
};
</script>

<style lang="scss" scoped>
.btn-addEmp {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .btn {
    width: 50px;
  }
}

.btn-create {
  display: flex;
  justify-content: end;
  margin-bottom: 2%;
}
</style>
