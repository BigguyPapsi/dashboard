<template>
  <div class="body">
  <div class="card" style="width: 550px">
    <router-link to="/user" style="display: flex; justify-content: end; margin: 10px 10px 0 0;">
    <button style="justify-content: center;" type="button" class="btn-close" aria-label="Close" />
    </router-link>
    <!-- <h3>{{ values }}</h3> -->
    <div class="card-body text-center">
      <h1 style="margin: 0 0 20px 0">ເພີ່ມຜູ້ໃຊ້</h1>
      <b-form @submit.prevent="onSubmit">
        <div class="inputForm">
          <b-input-group>
            <b-input-group-text>
              <i class="fa-solid fa-user"></i>
            </b-input-group-text>
            <b-form-input placeholder="ຊື່" v-model="users.firstname" />
            <b-form-input placeholder="ນາມສະກຸນ" v-model="users.lastname" />
          </b-input-group>
        </div>

        <div class="inputForm">
          <b-input-group>
            <b-input-group-text
              ><i class="fa-solid fa-phone"></i
            ></b-input-group-text>
            <b-form-input
              placeholder="ເບີໂທລະສັບ (020, 030 XXXX XXXX...)"
              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              v-model="users.phone_number"
          /></b-input-group>
        </div>

        <div class="inputForm">
          <b-input-group>
            <b-input-group-text
              ><i class="fa-solid fa-location-dot"></i
            ></b-input-group-text>
            <b-form-input placeholder="ບ້ານ" v-model="users.village" />
            <b-form-input placeholder="ເມືອງ" v-model="users.district" />
          </b-input-group>
        </div>

        <div class="inputForm">
          <b-input-group>
            <b-form-input placeholder="ແຂວງ" v-model="users.province"
          /></b-input-group>
        </div>

        <div class="inputForm">
          <b-input-group>
            <b-input-group-text
              ><i class="fa-solid fa-lock"></i
            ></b-input-group-text>
            <b-form-input
              type="password"
              placeholder="ລະຫັດ"
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
              placeholder="ລະຫັດຍືນຍັນ"
              v-model="users.password_confirmation"
            />
          </b-input-group>
        </div>

        <div style="display: flex">
          <p>
            <b style="justify-content: start"
              >ເພດ: &nbsp; &nbsp;&nbsp; &nbsp;</b
            >
          </p>
          <b-form-group>
            <td>
              <b-form-radio
                v-model="users.gender"
                :aria-describedby="ariaDescribedby"
                name="some-radios1"
                value="Male"
                >ຊາຍ &nbsp; &nbsp;</b-form-radio
              >
            </td>

            <td>
              <b-form-radio
                v-model="users.gender"
                :aria-describedby="ariaDescribedby"
                name="some-radios1"
                value="Female"
                >ຍິງ &nbsp; &nbsp;
              </b-form-radio>
            </td>

            <td>
              <b-form-radio
                v-model="users.gender"
                :aria-describedby="ariaDescribedby"
                name="some-radios1"
                value="Other"
                >ອື່ນໆ &nbsp; &nbsp;
              </b-form-radio>
            </td>
          </b-form-group>
        </div>

        <div style="display: flex">
          <p>
            <b style="justify-content: start"
              >ຕຳແໜ່ງ: &nbsp; &nbsp;&nbsp; &nbsp;</b
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
              placeholder="ເລືອກຮູບພາບ"
              v-model="users.profile_img"
              :state="Boolean(users.profile_img)"
              id="form-image"
              :disabled="busy"
              accept="image/*"
            ></b-form-file>
          </b-input-group>
        </b-form-group>

        <div class="d-flex justify-content-center">
          <b-button variant="primary" ref="submit" type="submit" :disabled="busy"
            >ບັນທືກ</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';
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
        .post("http://localhost:8000/api/EmployeeRegister", this.users, {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          
        })
        .then(() => {
          // alert("ບັນທືກແລ້ວ");
          // console.log(data);
          // window.location.reload();
          Swal.fire({
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
          icon: "success",
          
        });
        this.$router.push({ path: "/user" });
        })
        .catch(() => {
          // alert("ໃສ່ຂໍ້ມູນບໍ່ຄົບ");
          Swal.fire({
            text: "ໃສ່ຂໍ້ມູນບໍ່ຄົບ ຫຼື ເບີໂທລະສັບຊ້ຳ",
            icon: "error",
          });



        });
    },
  },
};
</script>

<style scoped>
.body{
  display: flex;
  justify-content: center;
}
.inputForm {
  margin-bottom: 3%;
}
</style>
