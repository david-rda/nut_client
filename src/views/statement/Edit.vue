<template>
    <div>
        <MyHeader />

        <div class="container mx-auto p-5 mt-25">
            <div class="p-4 w-full rounded-md">
                <form @submit.prevent="editStatement()" class="space-y-6" ref="statement_form">
                    <div class="flex flex-col md:flex-row md:space-x-6">
                        <div class="w-full md:w-1/2">
                            <label for="overhead_number">ზედნადების ნომერი</label>
                            <input type="text" v-model="formData.overhead_number" id="overhead_number" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 bg-white  disabled:opacity-20" :disabled="disabled">
                        </div>
                        <div class="w-full md:w-1/2">
                            <label for="overhead_date">ზედნადების თარიღი</label>
                            <flat-pickr class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 bg-white  disabled:opacity-20" id="datetime-picker" v-model="formData.overhead_date" :config="flatpickrOptions"></flat-pickr>
                        </div>
                    </div>
                    <div>
                        <div class="mb-3">
                            <label for="store_address">მაღაზიის მისამართი</label>
                            <input type="text" v-model="formData.store_address" id="store_address" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 bg-white  disabled:opacity-20" :disabled="disabled">
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row md:space-x-6">
                        <div class="w-full md:w-1/2">
                            <label for="beneficiary_name">აგრობარათის მფლობელი</label>
                            <input type="text" v-model="formData.beneficiary_name" id="beneficiary_name" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 bg-white  disabled:opacity-20" :disabled="disabled">
                        </div>
                        <div class="w-full md:w-1/2">
                            <label for="card_number">აგრობარათის ბოლო 4 ციფრი</label>
                            <input type="text" v-model="formData.card_number" id="card_number" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 bg-white  disabled:opacity-20" :disabled="disabled">
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row md:space-x-6">
                        <div class="w-full md:w-1/2">
                            <label for="product" class="block text-gray-700 mb-1">პროდუქტი</label>
                            <v-select id="product" class="bg-white" :options="options" label="name" v-model="selectedProduct"></v-select>
                        </div>
                        
                        <div class="w-full md:w-1/3">
                            <label for="price" class="block text-gray-700 mb-1">ფასი</label>
                            <input type="number" id="price" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 bg-white  disabled:opacity-20" :disabled="disabled" v-model="product_price" @paste="onPaste">
                        </div>
                    
                        <div class="w-full md:w-1/6">
                            <label class="block text-gray-700 mb-1">ქმედება</label>
                            <button type="button" class="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-200 cursor-pointer" @click="addField">დამატება</button>
                        </div>
                    </div>

                    <div class="bg-white border border-gray-300 rounded-lg overflow-hidden mt-3">
                        <table class="w-full table-auto" v-if="formData.statement_products">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">პროდუქტის დასახელება</th>
                                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">პროდუქტის ჯამური თანხა</th>
                                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">ქმედება</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in formData.statement_products" :key="index">
                                    <td class="px-4 py-2 text-sm text-gray-700">{{ item.name }}</td>
                                    <td class="px-4 py-2 text-sm text-gray-700">{{ item.price }}</td>
                                    <td class="px-4 py-2">
                                        <button type="button" class="text-red-500 hover:bg-red-200 bg-red-100 p-2 rounded-md transition duration-200 cursor-pointer" @click="setId(index)">წაშლა</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="my-3">
                        <label for="amount" class="block text-gray-700 mb-1">ჯამური აგროქულა</label>
                        <input type="text" id="amount" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 bg-white  disabled:opacity-20" v-model="formData.full_amount" @paste="onPaste" @keyup="replaceComma">
                    </div>

                    <div>
                        <label class="mb-2">ზედნადების ატვირთვა</label>
                        <file-pond name="files" label-idle="ატვირთეთ/ჩააგდეთ ფაილი აქ ..." :acceptedFileTypes="['application/pdf']"
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
                            v-bind:files="files" />
                        <div class="container" v-if="formData?.files" id="main">
                            <div class="flex justify-between items-center bg-gray-800 text-white p-2 rounded">
                                <span style="font-family: sans-serif">{{ formData?.files?.name }}</span>
                                <button class="text-white cursor-pointer rounded-full p-2 bg-gray-500 flex h-7 w-7 items-center justify-center hover:bg-gray-700 transition duration-200" type="button" :data-id="formData?.files?.id" @click="deleteFile($event, index)">&times;</button>
                            </div>
                        </div>
                        <!-- <div v-for="(data, index) in files_details" :key="index">
                            <div class="container">
                                <div class="d-flex justify-content-between align-items-center mt-2 rounded p-2 bg-dark bg-opacity-50 text-white">
                                    <span style="font-family: sans-serif">{{ data?.name }}</span>
                                    <button class="times" type="button" :data-id="data?.id" @click="deleteFile($event, index)">&times;</button>
                                </div>
                            </div>
                        </div> -->
                    </div>

                    <div v-if="permission != 'company'">
                        <div class="mb-3">
                            <label for="personal_id">სტატუსი</label>
                            <select class="form-select" v-model="formData.status">
                                <option value="" selected disabled>სტატუსი</option>
                                <option value="active">აქტიური</option>
                                <option value="inactive">არააქტიური</option>
                                <option value="pending">pending</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="permission != 'company'">
                        <div class="mb-3">
                            <label for="comment">კომენტარი</label>
                            <textarea class="form-control" id="comment" style="resize:none" v-model="formData.comment"></textarea>
                        </div>
                    </div>
                    <div class="my-3">
                        <button type="submit" class="w-full py-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed" :disabled="disabled">განაცხადის გადაგზავნა</button>
                    </div>
                </form>
                <div v-for="(item, index) in errors" :key="index" class="alert alert-danger border-0">
                    <strong>{{ item[0] }}</strong>
                </div>
            </div>
        </div>

        <Transition name="fade">
            <div class="fixed w-full h-full bg-gray-800/50 backdrop-blur-xs top-0 left-0 flex items-center justify-center" v-if="show_modal">
                <div class="p-4 w-1/3 bg-white rounded-md">
                    <div class="border-b border-b-gray-200 flex justify-between items-center">
                        <h1>გთხოვთ დაადასტუროთ</h1>
                        <button type="button" class="p-2 bg-gray-100 transition duration-200 hover:bg-gray-200 rounded-md cursor-pointer mb-2" @click="modalToggle()">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p class="mt-3">ნამდვიად გსურთ წაშლა?</p>
                    <div class="flex gap-2 mt-3 border-t border-t-gray-200 items-center">
                        <button type="button" class="p-2 bg-gray-100 rounded-md mt-2 transition duration-200 cursor-pointer hover:bg-gray-200" @click="modalToggle()">არა</button>
                        <button type="button" class="p-2 bg-red-100 text-red-900 rounded-md mt-2 transition duration-200 cursor-pointer hover:bg-red-200" @click="removeField">კი</button>
                    </div>
                </div>
            </div>
        </Transition>
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

        data() {
            return {
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

                disabled : false,
                loader : false,
                show_modal : false,

                errors : [],

                id : "",

                options : [],

                selectedProduct : "",
                product_price : "",

                formData : {},
                products : [],
                file : [],
                
                files_details : [],

                flatpickrOptions: {
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                },
            }
        },

        mounted() {
            document.title = "განაცხადის რედაქტირება";

            axios.get("/products", {
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
                        name : item.name,
                        product_price : item.price
                    })    
                });
            }).catch(err => {
                console.log(err);
            });
        },

        methods : {
            setId(index) {
                this.id = index;

                this.show_modal = true;
            },

            handle(response) {
                this.file.push(JSON.parse(response).id);
                
                this.files_details.push({
                    id : JSON.parse(response).id,
                    name : JSON.parse(response).name,
                });
            },

            deleteFile(event, index) {
                const id = Number(event.target.getAttribute("data-id"));
                const _this_ = this;

                axios.get("/statement/file/delete/" + id, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.$swal({
                        title : "ფაილი წაიშალა",
                        icon : "success",
                    });

                    // _this_.files_details.splice(index, 1);
                    // _this_.formData.files.splice(index, 1);

                    _this_.formData = response.data.data;
                }).catch(err => console.log(err));
            },

            editStatement() {
                this.disabled = true;
                this.loader = true;

                axios.post("/statement/edit/" + this.$route.params.id, Object.assign(this.formData, {file : this.file}), {
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

                    setTimeout(() => {
                        document.location.href = "https://nuts.rda.gov.ge/statement/read/" + this.$route.params.id;
                    }, 1000);
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
                    this.formData.statement_products.push(
                        {
                            product_id : this.selectedProduct.id,
                            name : this.selectedProduct.name,
                            price : this.product_price
                        }
                    );
                }

                this.selectedProduct = "";
                this.product_price = "";
                
                console.log(this.formData.statement_products);
            },

            removeField() {
                this.formData.statement_products.splice(this.id, 1);
                this.show_modal = false;
            },

            onPaste(event) {
                var _this_ = this;
                event.preventDefault();
                console.log('Pasting is disabled.');
                _this_.pst = 1;
            },

            replaceComma() {
                var _this_ = this;
                _this_.formData.full_amount = _this_.formData.full_amount.replace(',', '.');
            },

            modalToggle() {
                this.show_modal = false;
            },
        }
    }
</script>