<template>
<div style="display: flex; justify-content: center; margin-top: 100px;">
  
  <div
    class="card"
    style="width: 500px;">
    
   

    <div class="card-body">
      <div style="display: flex; justify-content: center; margin-top: 25px;">
       <img src="../assets/IMG_1433.png" style="width: 250px; height: 150px; object-fit: cover; "/>
      
       
      </div>
      <div style="display: flex; justify-content: center; margin-top: 15px;">
        <h2><b>ເຂົ້າສູ່ລະບົບ</b></h2>
      </div>
      
      <v-form ref="form" @submit.prevent="logIn" lazy-validation class="pa-10">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="login.phone_number"
              placeholder="Phone number"
              prepend-inner-icon="mdi-phone-outline"
              density="compact"
              required
              variant="outlined"
              dense
            ></v-text-field>

            <v-text-field
              v-model="login.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              density="compact"
              placeholder=" Password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              dense
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn  color="#f8c632" type="submit" block class="btn">
              <b style="color: #424242;">ເຂົ້າສູລະບົບ</b>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      login: { phone_number: "", password: "" },
      show1: false,
      // phone_number: "",
      // password: "",
      token: "",
    };
  },

  methods: {
    //   async login () {
    //     const response = axios.post ("http://localhost:8000/api/login",
    //     {
    //         phone_number: this.phone_number,
    //         password: this.password,
    //         token: this.token,

    //       },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }).then(() => {
    //       alert("saveddddd");

    //       this.$router.push({ path: '/' })

    //     }).catch(() => {
    //       alert("fail")
    //     })

    //     const data = await response.json();
    //     if (response.ok) {
    //       "success"
    //     } else {
    //       console.error(data.message);
    //     }
    //   },
    // },

    // ----------------------------------------------------------------------------login: { phone_number: "", password: "" },

    async logIn() {
      if (this.$refs.form.validate() == true) {
        await axios
          .post("http://localhost:8000/api/login", this.login)
          .then((res) => {

            if (res.data.user.roles == "Customer") {


              Swal.fire({
                position: "center",
                icon: "error",
                title: "ທ່ານບໍ່ມີສິດເຂົ້າເຖິງ !!",
                text: "something was wrong !!",
                showConfirmButton: true,
                width: 600,
                padding: "3em",
                iconColor: "crimson",
                confirmButtonText: "ຕົກລົງ",
                confirmButtonColor: "#1d2186",
              });
              return;
            }
            Swal.fire({
              position: "center",
              icon: "success",
              title: "ເຂົ້າສູ່ລະບົບສຳເລັດ !",
              text: "Successful !",
              showConfirmButton: false,
              iconColor: "limegreen",
              width: 600,
              padding: "3em",
              timer: 1500,
            });





            let token = res.data.token;
            let id = res.data.user.id;

            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token);
            localStorage.setItem("id", id);
            localStorage.setItem("userState", JSON.stringify(res.data.user));

            this.$router.replace("/");
            setTimeout(() => {
              // window.location.reload();
            }, 10);
            //window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            alert("ກະລຸນາກວດສອບຂໍ້ມູນຂອງທ່ານອີກຄັ້ງ !");
          });
      } else {
        alert("ກະລຸນາກວດສອບສິດຂອງທ່ານອີກຄັ້ງ !");
      }
    },
  },
};
</script>

<style></style>
