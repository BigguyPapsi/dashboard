<template>
  <div>
    <div class="employee">
      <h2 style="margin: 25px 0 25px 0">Users Management</h2>
    </div>
    <div>
      <v-card>
        <v-card-title>
          <div class="btn-create">
            <router-link to="/user/create"
              ><b-button variant="primary">+ ເພີ່ມຜູ້ໃຊ້</b-button></router-link
            >
          </div>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ຄົ້ນຫາ"
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
              <i class="fa-solid fa-expand" /> ລາຍລະອຽດ
            </b-button>
            &nbsp;
            <!-- 
            <b-button
              disabled
              v-if="userState.id == item.id"
              variant="outline-warning"
              style="opacity: 50%"
            >
              <i class="fa-solid fa-pen-to-square" /> ແກ້ໄຂ
            </b-button> -->

            <router-link :to="{ name: 'userEdit', params: { id: item.id } }">
              <b-button variant="outline-warning">
                <i class="fa-solid fa-pen-to-square" /> ແກ້ໄຂ
              </b-button>
            </router-link>
            &nbsp;

            <span
              v-if="userState.id == item.id"
              class="d-inline-block"
              tabindex="0"
              v-b-tooltip.top
              title="! ບັນຊິນີ້ Login ຢູ່ ບໍ່ສາມາດລົບໄດ້ "
            >
              <b-button
                variant="outline-danger"
                style="pointer-events: none; opacity: 50%"
                disabled
              >
                <i class="fa-regular fa-trash-can"></i>
                ລຶບ</b-button
              >
            </span>

            <b-button
              v-else
              variant="outline-danger"
              @click="deleteUser(item.id)"
            >
              <i class="fa-regular fa-trash-can"></i> ລຶບ</b-button
            >
          </template>
        </v-data-table>
      </v-card>

      <b-modal
        id="modal-scrollable"
        hide-footer
        scrollable
        title="ຂໍ້ມູນຜູ້ໃຊ້"
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
            <b-avatar v-else variant="secondary" size="140px"></b-avatar>
          </div>

          <div
            style="
              display: flex;
              justify-content: center;
              margin-top: 20px;
              margin-bottom: 20px;
            "
          ></div>

          <div>
            <h3 style="display: flex; justify-content: center">
              {{ view.firstname }} {{ view.lastname }}
            </h3>
            <br />

            <div>
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td><i class="fa-solid fa-phone"></i>&nbsp; ເບີໂທ:</td>
                    <td>{{ view.phone_number }}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-venus-mars"></i>&nbsp; ເພດ:</td>
                    <td>{{ view.gender }}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-users"></i>&nbsp; ຕຳແໜ່ງ:</td>
                    <td>{{ view.roles }}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-map-pin"></i>&nbsp; ບ້ານ:</td>
                    <td>{{ view.village }}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-map-pin"></i>&nbsp; ເມືອງ:</td>
                    <td>{{ view.district }}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-map-pin"></i>&nbsp; ແຂວງ:</td>
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
import Swal from "sweetalert2";
export default {
  data() {
    return {
      userState: JSON.parse(localStorage.getItem("userState")),
      getUser: [],
      search: "",
      data: [],
      view: [],
      headers: [
        {
          text: "ຊື່",
          align: "start",
          sortable: false,
          value: "firstname",
        },
        { text: "ນາມສະກຸນ", value: "lastname" },
        { text: "ເພດ", value: "gender" },
        { text: "ຕຳແໜ່ງ", value: "roles" },
        { text: "ຕັ້ງຄ່າ", value: "option" },
      ],
    };
  },
  methods: {
    async deleteUser(id) {
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

          await axios.delete("http://localhost:8000/api/users/" + id, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          window.location.reload();
        }
      });

      // console.log(user);
      // alert("User deleted!");
      // window.location.reload();
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
