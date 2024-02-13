<template>
    <div>
        <MyHeader />

        <div class="container mb-5" style="margin-top: 90px">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-6 col-xs-12 col-sm-12 bg-white rounded p-5 border mt-5">
                    <form @submit.prevent="editStatement()" class="row g-3" ref="statement_form">
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
                            <label for="product" class="mb-1">პროდუქტი</label>
                            <v-select id="product" :options="options" label="name" v-model="selectedProduct"></v-select>
                        </div>
                        <div class="col-md-4">
                            <label for="price" class="mb-1">ფასი</label>
                            <input type="number" id="price" class="form-control" v-model="product_price">
                        </div>
                        <div class="col-md-3">
                            <label class="d-block">ქმედება</label>
                            <button type="button" class="btn btn-warning w-100" style="margin-top:7px" @click="addField">დამატება</button>
                        </div>

                        <table class="table table-bordered" v-if="formData.statement_products">
                            <thead>
                                <tr>
                                    <th>პროდუქტის დასახელება</th>
                                    <th>პროდუქტის ჯამური თანხა</th>
                                    <th>ქმედება</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in products" :key="index">
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.product_price }}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger w-100" @click="removeField(index)">წაშლა</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="col-md-12">
                            <label for="amount" class="d-block mb-2">ჯამური თანხა</label>
                            <input type="text" id="amount" class="form-control" v-model="formData.full_amount">
                        </div>

                        <div class="col-md-12">
                            <label class="d-block mb-2">ზედნადების ატვირთვა</label>
                            <file-pond
                                name="files"
                                label-idle="ატვირთეთ/ჩააგდეთ ფაილები აქ ..."
                                v-bind:allow-multiple="true"
                                :acceptedFileTypes="['application/pdf']"
                                :server="{
                                    url : '',

                                    process : {
                                        url : 'https://nuts.rda.gov.ge/api/statement/file/upload',
                                        method : 'POST',
                                        onload : handle
                                    },

                                    revert : {
                                        url : 'https://nuts.rda.gov.ge/api/statement/file/delete'
                                    }
                                }"
                                v-bind:files="files"
                            />
                            <div v-for="(data, index) in files_details" :key="data.id">
                                <div class="container">
                                    <div class="d-flex justify-content-between align-items-center mt-2 rounded p-2 bg-dark bg-opacity-50 text-white">
                                        <span style="font-family: sans-serif">{{ data.name }}</span>
                                        <button class="times" type="button" :data-id="data.id" @click="deleteFile($event, index)">&times;</button>
                                    </div>
                                </div>
                            </div>
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
                        <div class="col-md-12 mb-3">
                            <div class="d-grid">
                                <button type="submit" class="btn btn-success" :disabled="disabled">
                                    ზედნადების დამატება
                                    <span v-if="loader" class="spinner-border spinner-border-sm"></span>
                                </button>
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
    import vueFilePond from "vue-filepond";
    import "filepond/dist/filepond.min.css";

    export default {
        name : "StatementEdit",

        components : {
            MyHeader,
            "file-pond" : vueFilePond(),
            vSelect,
            FlatPickr
        },

        mounted() {
            document.title = "განაცხადის რედაქტირება";

            axios.get("/product/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.options = response.data;
            }).catch(err => {
                console.log(err);
            });

            axios.get("/statement/get/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.formData = response.data;

                response.data.statement_products.map((item, index) => {
                    this.products.push({
                        id : item.product_id,
                        name : item.products.name,
                        product_price : item.price
                    })    
                });
            }).catch(err => {
                console.log(err);
            });
        },

        data() {
            return {
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

                disabled : false,
                loader : false,

                errors : [],

                options : [],

                selectedProduct : "",
                product_price : "",

                formData : {},
                products : [],
                
                files_details : [],

                flatpickrOptions: {
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                },
            }
        },

        methods : {
            handle(response) {
                const _this_ = this;

                this.formData.files.push(JSON.parse(response).id);
                
                this.files_details.push({
                    id : JSON.parse(response).id,
                    name : JSON.parse(response).name,
                });
            },

            deleteFile($event, index) {
                const id = Number(event.target.getAttribute("data-id"));
                const _this_ = this;

                axios.delete("/statement/file/delete/" + id, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    console.log(response.data);

                    _this_.files_details.splice(index, 1);
                    _this_.formData.files.splice(index, 1);
                }).catch(err => console.log(err));
            },

            editStatement() {
                this.disabled = true;
                this.loader = true;

                axios.post("/statement/edit/" + this.$route.params.id, Object.assign(this.formData, {products : this.products}), {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.$swal({
                        title : "ზედნადები დაემატა",
                        icon : "success",
                    });

                    this.$refs.statement_form.reset();
                    this.disabled = false;
                    this.loader = false;
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }

                    this.disabled = false;
                    this.loader = false;
                })
            },

            addField() {
                const _this_ = this;
                if(this.selectedProduct != "" && this.product_price != "") {
                    this.products.push(
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
                this.products.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
    .times {
        width: 1.625em;
        height: 1.625em;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border-radius: 150px;
        outline: none;
        border: none;
        font-weight: bolder;
    }
</style>