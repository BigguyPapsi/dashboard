<template>
<div style="display: flex; justify-content: center;">
  <div class="card text-center" style="width: 550px">
    <router-link to="/user" style="display: flex; justify-content: end; margin: 10px 10px 0 0;">
    <button style="justify-content: center;" type="button" class="btn-close" aria-label="Close" />
    </router-link>
    <h1>ແກ້ໄຂຜູ້ໃຊ້</h1>
    <div class="card-body">
      <b-form @submit.prevent="onSubmit">
        <div class="inputForm">
          <b-input-group>
            <b-input-group-text
              ><i class="fa-solid fa-user"></i
            ></b-input-group-text>
            <b-form-input placeholder="Frist name" v-model="users.firstname" />
            <b-form-input placeholder="Last name" v-model="users.lastname" />
          </b-input-group>
        </div>

        <div class="inputForm">
          <b-input-group>
            <b-input-group-text
              ><i class="fa-solid fa-phone"></i
            ></b-input-group-text>
            <b-form-input
              placeholder="Phone(020 xxx...)"
              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              v-model="users.phone_number"
          /></b-input-group>
        </div>

        <div class="inputForm">
          <b-input-group>
            <b-input-group-text
              ><i class="fa-solid fa-location-dot"></i
            ></b-input-group-text>
            <b-form-input placeholder="Village" v-model="users.village" />
            <b-form-input placeholder="District" v-model="users.district" />
          </b-input-group>
        </div>

        <div class="inputForm">
          <b-input-group>
            <b-form-input placeholder="Province" v-model="users.province"
          /></b-input-group>
        </div>

        <div style="display: flex">
          <p>
            <b style="justify-content: start"
              >Gender: &nbsp; &nbsp;&nbsp; &nbsp;</b
            >
          </p>
          <b-form-group>
            <td>
              <b-form-radio
                v-model="users.gender"
                :aria-describedby="ariaDescribedby"
                name="some-radios1"
                value="Male"
                >Male &nbsp; &nbsp;</b-form-radio
              >
            </td>

            <td>
              <b-form-radio
                v-model="users.gender"
                :aria-describedby="ariaDescribedby"
                name="some-radios1"
                value="Female"
                >Female &nbsp; &nbsp;
              </b-form-radio>
            </td>

            <td>
              <b-form-radio
                v-model="users.gender"
                :aria-describedby="ariaDescribedby"
                name="some-radios1"
                value="Other"
                >Other &nbsp; &nbsp;
              </b-form-radio>
            </td>
          </b-form-group>
        </div>

        <div style="display: flex">
          <p>
            <b style="justify-content: start"
              >Gender: &nbsp; &nbsp;&nbsp; &nbsp;</b
            >
          </p>
          <b-form-group>
            <td>
              <b-form-radio
                v-model="users.roles"
                :aria-describedby="ariaDescribedby"
                name="some-radios2"
                value="Owner"
                >Owner &nbsp; &nbsp;</b-form-radio
              >
            </td>

            <td>
              <b-form-radio
                v-model="users.roles"
                :aria-describedby="ariaDescribedby"
                name="some-radios2"
                value="Employee"
                >Employee &nbsp; &nbsp;
              </b-form-radio>
            </td>

            <td>
              <b-form-radio
                v-model="users.roles"
                :aria-describedby="ariaDescribedby"
                name="some-radios2"
                value="Admin"
                >Admin &nbsp; &nbsp;
              </b-form-radio>
            </td>

            <td>
              <b-form-radio
                v-model="users.roles"
                :aria-describedby="ariaDescribedby"
                name="some-radios2"
                value="Customer"
                >Customer &nbsp; &nbsp;
              </b-form-radio>
            </td>
          </b-form-group>
        </div>

        <b-form-group label-for="form-image">
          <b-input-group>
            <b-input-group-prepend is-text>
              <b-icon icon="image-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-file
              v-model="users.profile_img"
              :state="Boolean(users.profile_img)"
              id="form-image"
              :disabled="busy"
              accept="image/*"
            ></b-form-file>
          </b-input-group>
        </b-form-group>

        <div class="d-flex justify-content-center">
          <b-button ref="submit" type="submit" :disabled="busy"
            >Submit</b-button
          >
        </div>

        <!-- $route.params.id -->
      </b-form>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "EmployeeCreate",
  data() {
    return {
      userId: this.$route.params.id,
      getByid: {},
      result: {},
      users: {
        firstname: "",
        lastname: "",
        gender: "",
        roles: "",
        village: "",
        district: "",
        province: "",
        phone_number: "",
        profile_img: null,
        password: "",
        password_confirmation: "",
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
      formData.append("firstname", this.users.firstname);
      formData.append("lastname", this.users.lastname);
      formData.append("gender", this.users.gender);
      formData.append("roles", this.users.roles);
      formData.append("village", this.users.roles);
      formData.append("district", this.users.roles);
      formData.append("province", this.users.roles);
      formData.append("phone_number", this.users.phone_number);
      // formData.append('profile_img', this.users.profile_img)

      if (typeof this.users.profile_img !== "string") {
        formData.append("profile_img", this.users.profile_img);
      }
      const token = localStorage.getItem("token");

      axios
        .post("http://localhost:8000/api/users/" + this.userId, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(({ data }) => {
          // alert("saveddddd");

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
      
          this.$router.push({ path: "/user" });
         
          console.log(data);
        });
    },
  },

  mounted() {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/users/selOne/" + this.userId, {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.users = res.data;
        console.log(this.getByid);
      });
  },
};

</script>

<style>
.inputForm {
  margin-bottom: 3%;
}
</style>
