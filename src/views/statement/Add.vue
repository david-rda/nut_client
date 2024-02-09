<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 90px">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-6 col-xs-12 col-sm-12 bg-white rounded p-5 border mt-5">
                    <form @submit.prevent="addStatement()" class="row g-3" ref="statement_form">
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="overhead_number">ზედნადების ნომერი</label>
                                <input type="text" v-model="formData.overhead_number" id="overhead_number" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="overhead_date">ზედნადების თარიღი</label>
                                <flat-pickr class="form-control" id="datetime-picker" v-model="formData.overhead_date" :config="flatpickrOptions"></flat-pickr>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group mb-3">
                                <label for="store_address">მაღაზიის მისამართი</label>
                                <input type="text" v-model="formData.store_address" id="store_address" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="beneficiary_name">სახელი, გვარი</label>
                                <input type="text" v-model="formData.beneficiary_name" id="beneficiary_name" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="card_number">ბარათის ბოლო 4 ციფრი</label>
                                <input type="number" min="0" v-model="formData.card_number" id="card_number" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-5">
                            <label for="card_number" class="">პროდუქტი</label>
                            <v-select :options="options" label="name" v-model="selectedProduct"></v-select>
                        </div>
                        <div class="col-md-4">
                            <label for="card_number">ფასი</label>
                            <input type="number" class="form-control" v-model="product_price">
                        </div>
                        <div class="col-md-3">
                            <label for="card_number" class="d-block">ქმედება</label>
                            <button type="button" class="btn btn-warning w-100" style="margin-top:7px" @click="addField">დამატება</button>
                        </div>

                        <table class="table table-bordered" v-if="formData.products.length > 0">
                            <thead>
                                <tr>
                                    <th>პროდუქტის დასახელება</th>
                                    <th>პროდუქტის ჯამური თანხა</th>
                                    <th>ქმედება</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in formData.products" :key="index">
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.product_price }}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger w-100" @click="removeField(index)">წაშლა</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="col-md-12">
                            <label for="card_number" class="d-block mb-2">ჯამური თანხა</label>
                            <input type="text" class="form-control" v-model="formData.full_amount">
                        </div>

                        <div class="col-md-12">
                            <label for="card_number" class="d-block mb-2">ზედნადების ატვირთვა</label>
                            <input type="file" multiple class="form-control" @change="handleFileChange">
                        </div>

                        <div class="col-md-12" v-if="permission != 'company'">
                            <div class="form-group mb-3">
                                <label for="personal_id">სტატუსი</label>
                                <select class="form-select" v-model="formData.status">
                                    <option value="" selected disabled>სტატუსი</option>
                                    <option value="active">აქტიური</option>
                                    <option value="inactive">არააქტიური</option>
                                    <option value="pending">pending</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12" v-if="permission != 'company'">
                            <div class="form-group mb-3">
                                <label for="comment">კომენტარი</label>
                                <textarea class="form-control" id="comment" style="resize:none" v-model="formData.comment"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="d-grid mb-5">
                                <button type="submit" class="btn btn-success">ზედნადების დამატება</button>
                            </div>
                        </div>
                    </form>
                    <div v-for="(item, index) in errors" :key="index" class="alert alert-danger">
                        <strong>{{ item[0] }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios, { AxiosError } from 'axios';
    import MyHeader from "../../components/Header.vue";
    import vSelect from "vue-select";
    import "vue-select/dist/vue-select.css"
    import FlatPickr from "vue-flatpickr-component";
    import 'flatpickr/dist/flatpickr.css';

    export default {
        name : "StatementAdd",

        components : {
            MyHeader,
            vSelect,
            FlatPickr
        },

        mounted() {
            document.title = "განაცხადის დამატება";

            axios.get("/product/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.options = response.data;
            }).catch(err => {
                console.log(err);
            })
        },

        data() {
            return {
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

                errors : [],

                options : [],

                selectedProduct : "",
                product_price : "",

                formData : {
                    overhead_number : "",
                    overhead_date : new Date(),
                    store_address : "",
                    full_amount : "",
                    beneficiary_name : "",
                    card_number : "",
                    comment : "",
                    files : [],

                    products : []
                },

                flatpickrOptions: {
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                },
            }
        },

        methods : {
            addStatement() {
                console.log(this.formData);
                axios.post("/statement/add", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.$swal({
                        title : "პროდუქტი დაემატა",
                        icon : "success",
                    });

                    this.$refs.statement_form.reset();
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }
                })
            },

            handleFileChange(event) {
                this.formData.files = Array.from(event.target.files);
            },

            addField() {
                if(this.selectedProduct != "" && this.product_price != "") {
                    this.formData.products.push(
                        {
                            product_id : this.selectedProduct.id,
                            name : this.selectedProduct.name,
                            product_price : this.product_price
                        }
                    );
                }

                this.selectedProduct = "";
                this.product_price = "";
            },

            removeField(index) {
                this.formData.products.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
    #vs2__combobox {
        height: 39px !important;
    }
</style>