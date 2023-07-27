<template>
  <div class="card text-center" style="width: 550px">
    <h1>Employee_Create</h1>
    <h3>{{ values }}</h3>
    <div class="card-body">
      <b-form @submit.prevent="onSubmit">
        <div class="inputForm">
          <b-input-group>
            <b-input-group-text>
              <i class="fa-solid fa-user"></i>
            </b-input-group-text>
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

        <div class="inputForm">
          <b-input-group>
            <b-input-group-text
              ><i class="fa-solid fa-lock"></i
            ></b-input-group-text>
            <b-form-input
              type="password"
              placeholder="Password"
              v-model="users.password"
            />
          </b-input-group>
        </div>

        <div class="inputForm">
          <b-input-group>
            <b-input-group-text
              ><i class="fa-solid fa-key"></i
            ></b-input-group-text>
            <b-form-input
              type="password"
              placeholder="Confirm Password"
              v-model="users.password_confirmation"
            />
          </b-input-group>
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
              >Role: &nbsp; &nbsp;&nbsp; &nbsp;</b
            >
          </p>
          <b-form-group>
            <td>
              <b-form-radio
                v-model="users.roles"
                :aria-describedby="ariaDescribedby"
                name="some-radios2"
                value="OWNER"
                >Owner &nbsp; &nbsp;</b-form-radio
              >
            </td>

            <td>
              <b-form-radio
                v-model="users.roles"
                :aria-describedby="ariaDescribedby"
                name="some-radios2"
                value="EMPLOYEE"
                >Employee &nbsp; &nbsp;
              </b-form-radio>
            </td>

            <td>
              <b-form-radio
                v-model="users.roles"
                :aria-describedby="ariaDescribedby"
                name="some-radios2"
                value="ADMIN"
                >Admin &nbsp; &nbsp;
              </b-form-radio>
            </td>

            <td>
              <b-form-radio
                v-model="users.roles"
                :aria-describedby="ariaDescribedby"
                name="some-radios2"
                value="CUSTOMER"
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
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EmployeeCreate",
  data() {
    return {
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
      formData.append("_method", "PATH");
      formData.append("profile_img", this.users.profile_img);

      axios
        .post("http://localhost:8000/api/register", this.users, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          alert("saveddddd");
          console.log(data);
          window.location.reload();
        });
    },
  },
};
</script>

<style>
.inputForm {
  margin-bottom: 3%;
}
</style>
