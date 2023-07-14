<template>
  <div>
    <div class="employee">
      <h2 > Employee Information</h2>
        <br>
        <v-row>
          <v-col cols="8" >
            <v-text-field
              class="p-0 m-0 mt-6"
              full-width
              dense
              append-icon="mdi-magnify"
              outlined
              rounded
              placeholder="Search"
            />
          </v-col>
          <v-col cols="4" class="btn-addEmp">
            <div type="button" block class="mt-2  btn" >Submit</div>
          </v-col>
        </v-row>
    </div>
    <div >
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">firstname</th>
          <th scope="col">lastname</th>
          <th scope="col">email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in data" :key="i">
          <td scope="row">{{ item.name }}</td>
          <td scope="row">{{ item.username }}</td>
          <td scope="row">{{ item.email }}</td>
        </tr>
        </tbody>
      </table>

      
    </div>
</div>
</template>

<script>
import axios from "axios";
export default{
  data()
  {
    return {
      data:[],
    };
  },
  methods: {
    // async getData () {
    //   await axios.get("https://jsonplaceholder.typicode.com/users") .then((res) =>(this.data = res.data));
    // },
   
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((res) => {
        this.data = res.data;
      });
  },
}
</script>

<style lang="scss" scoped>
.btn-addEmp{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .btn{
    width: 50px;
  }
}
</style>
