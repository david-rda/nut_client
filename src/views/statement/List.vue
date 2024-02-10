<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 120px">
            <div class="row justify-content-between mb-3 align-items-center">
                <table class="table bg-white border rounded">
                    <thead>
                        <tr class="text-center">
                            <th>ზედნადების ნომერი</th>
                            <th>ზედნადების თარიღი</th>
                            <th>მაღაზიის მისამართი</th>
                            <th>სახელი, გვარი</th>
                            <th>ჯამური თანხა</th>
                            <th>სტატუსი</th>
                            <th>ქმედება</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" class="form-control" placeholder="ზედნადების ნომერი" v-model="formData.overhead_number">
                            </td>
                            <td>
                                <flat-pickr class="form-control border" id="datetime-picker" :config="flatpickrOptions" v-model="formData.overhead_date"></flat-pickr>
                            </td>
                            <td>
                                <input type="text" class="form-control" placeholder="მაღაზიის მისამართი" v-model="formData.store_address">
                            </td>
                            <td>
                                <input type="email" class="form-control" placeholder="სახელი, გვარი" v-model="formData.beneficiary_name">
                            </td>
                            <td>
                                <input type="number" min="0" class="form-control" placeholder="ჯამური თანხა" v-model="formData.full_amount">
                            </td>
                            <td>
                                <select class="form-select" v-model="formData.status">
                                    <option value="" selected disabled>სტატუსი</option>
                                    <option value="active">აქტიური</option>
                                    <option value="inactive">არააქტიური</option>
                                    <option value="pending">pending</option>
                                </select>
                            </td>
                            <td>
                                <button type="button" class="btn btn-success w-100" :disabled="disabled" @click="searchOverhead">
                                    <span class="spinner-border spinner-border-sm" v-if="loader"></span>
                                    <span v-else>ძებნა</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex w-100 justify-content-between align-items-center mb-3">
                <h4 class="text-muted">განაცხადები</h4>

                <router-link to="/statement/add" class="btn btn-success">ზედნადების დამატება</router-link>
            </div>

            <div class="row">
                <table class="table table-hover bg-white border rounded">
                    <thead>
                        <tr class="text-center">
                            <th>ზედნადების ნომერი</th>
                            <th>ზედნადების თარიღი</th>
                            <th>მაღაზიის მისამართი</th>
                            <th>სახელი, გვარი</th>
                            <th>ჯამური თანხა</th>
                            <th>სტატუსი</th>
                            <th>ქმედება</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="data in statements.data" :key="data.id">
                            <td>{{ data.overhead_number }}</td>
                            <td>{{ data.overhead_date }}</td>
                            <td>{{ data.store_address }}</td>
                            <td>{{ data.beneficiary_name }}</td>
                            <td>{{ data.full_amount }}</td>
                            <td>{{ (data.status == "new") ? 'ახალია': '' }}</td>
                            <td>
                                <router-link :to="'/statement/read/' + data.id" type="button" class="btn btn-success">დათვალიერება</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import MyHeader from "../../components/Header.vue";
    import FlatPickr from "vue-flatpickr-component";
    import 'flatpickr/dist/flatpickr.css';

    export default {
        name : "DashBoard",

        components : {
            MyHeader,
            FlatPickr,
        },
        
        data() {
            return {
                statements : [],
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

                flatpickrOptions: {
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                },

                formData : {
                    overhead_number : "",
                    overhead_date : new Date(),
                    store_address : "",
                    full_amount : "",
                    beneficiary_name : "",
                    status : ""
                },

                disabled : false,
                loader : false,
            }
        },

        methods : {
            searchOverhead() {
                this.disabled = true;
                this.loader = true;

                axios.post("/statement/search", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.statements = response.data;
                    this.disabled = false;
                    this.loader = false;
                }).catch(err => {
                    console.log(err);
                    this.disabled = false;
                    this.loader = false;
                });
            }
        },

        mounted() {
            document.title = "განაცხადები";
            
            axios.get("/statement/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.statements = response.data;
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>
