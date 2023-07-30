<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <h3>Item</h3>
        <label>Name</label> <label style="margin-left: 400px">Price</label>
        <div v-for="(item, index) in form" :key="item">
          <div class="row"> 
            <div class="col-sm-5">
              <input type="text" class="form-control" v-model="item.name" />
            </div>
            <div class="col-sm-5">
              <input type="number" class="form-control" v-model="item.price" />
            </div>
            <div class="col-sm-2 pt-4">
              <button
                type="button"
                class="btn btn-success btn-sm"
                @click="addRow"
              >
              <i class="fa-solid fa-plus"></i>
                </button
              >&nbsp;
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="removeRow(index)"
              >
              <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- <button type="button" class="btn btn-success mt-3" @click="saveItem">
          Save
        </button> -->

        <button type="button" v-b-modal.modal-1 class="btn btn-success mt-3" @click="sumN">
          Counting
        </button>
       
      </div>
    </div>

    <b-modal id="modal-1" title="BootstrapVue" hide-footer>
<!-- <div v-for="(item, i) in form" :key="i">

      <td>{{ item.name }}&nbsp;</td>
      <td>{{ item.price }}</td>
</div> -->

<table class="table" >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">name</th>
      <th scope="col">price</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    <tr v-for="(item, i) in form" :key="i">
      <th scope="row" style="width: 30px;">{{ i+1 }}</th>
      <td style="opacity: 75%;"> {{ item.name }}</td>
      <td style="opacity: 75%;"> {{item.price}}</td>
  
    </tr>
    <tr>
      <td colspan="2" class="table-success"><b>Total price:</b></td>
      <td class="table-success"> {{comma(total_price)}} </td>
    </tr>
  </tbody>

</table>


<div style="display: flex; justify-content: center;" >
  <b-button variant="success" style="margin-top:15px; margin-bottom: 15px;">submit</b-button>
</div>

  </b-modal>

    
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    const form = reactive([{ name: "", price: 0 }]);

    const onPress = () => {};




    const addRow = () => {
      form.push({ name: "", price: 0 });

      // let total_price = 0;
      // this.form.forEach((value) => {
      //   total_price += Number(value.price);
      // });
      // this.total_price = total_price;
    };

    
    const sumN = () => {
      let total_price = 0;
      this.form.forEach((value) => {
        total_price += Number(value.price);
      });
      this.total_price = total_price;

    };





    const removeRow = (index) => {
      if (form.length > 1) {
        form.splice(index, 1);
      }

      let total_price = 0;
      this.form.forEach((value) => {
        total_price += Number(value.price);
      });
      this.total_price = total_price;
    };

    const saveItem = () => {
      // axios
      axios.post("items", form).then((res) => {
        console.log(res);
      });
    };

    return {
      total_price: 0,
      onPress,
      form,
      sumN,
      addRow,
      saveItem,
      removeRow,
    };
  },

  methods: {
    comma(numb){
  if (numb == "undefined" || !numb) return ""
  return numb.toLocaleString()
},
  }
};
</script>

<style></style>
