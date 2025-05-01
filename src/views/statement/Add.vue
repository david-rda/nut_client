<template>
    <div>
        <MyHeader />

        <div class="container mx-auto p-5 mt-25">
            <div class="p-4 w-full rounded-md">
                <form @submit.prevent="addStatement()" class="space-y-6" ref="statement_form">
                    <div class="flex flex-col md:flex-row md:space-x-6">
                        <div class="w-full md:w-1/2">
                            <label for="overhead_number" class="block text-gray-700">ზედნადების ნომერი</label>
                            <input type="text" v-model="formData.overhead_number" id="overhead_number" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="ზედნადების ნომერი">
                        </div>
                        
                        <div class="w-full md:w-1/2">
                            <label for="overhead_date" class="block text-gray-700">ზედნადების თარიღი</label>
                            <flat-pickr class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" id="datetime-picker" v-model="formData.overhead_date" :config="flatpickrOptions" :disabled="disabled"></flat-pickr>
                        </div>
                    </div>
                    <div>
                        <label for="store_address" class="block text-gray-700">მაღაზიის მისამართი</label>
                        <input type="text" v-model="formData.store_address" id="store_address" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="მაღაზიის მისამართი">
                    </div>

                    <div class="flex flex-col md:flex-row md:space-x-6">
                        <div class="w-full md:w-1/2">
                            <label for="beneficiary_name" class="block text-gray-700">აგრობარათის მფლობელი</label>
                            <input type="text" v-model="formData.beneficiary_name" id="beneficiary_name" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="აგრობარათის მფლობელი">
                        </div>
                        
                        <div class="w-full md:w-1/2">
                            <label for="card_number" class="block text-gray-700">აგრობარათის ბოლო 4 ციფრი</label>
                            <input type="text" onkeypress="if(this.value.length == 4) return false" v-model="formData.card_number" id="card_number" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="აგრობარათის ბოლო 4 ციფრი">
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row md:space-x-6">
                        <div class="w-full md:w-1/2">
                            <label for="product" class="block text-gray-700 mb-1">პროდუქტი</label>
                            <v-select id="product" :options="options" label="name" v-model="selectedProduct" class="bg-white" :disabled="disabled" :class="{'opacity-50 cursor-not-allowed' : disabled}"></v-select>
                        </div>
                        
                        <div class="w-full md:w-1/3">
                            <label for="price" class="block text-gray-700 mb-1">ფასი</label>
                            <input type="number" id="price" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" v-model="product_price" @paste="onPaste" placeholder="ფასი">
                            <span class="text-red-500 text-sm mt-2" v-if="pst">მონაცემი შეიყვანეთ ხელით!</span>
                        </div>

                        <div class="w-full md:w-1/6">
                            <label class="block text-sm text-gray-700 mb-1">&nbsp;</label>
                            <button type="button" class="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-200 cursor-pointer" @click="addField">დამატება</button>
                        </div>
                    </div>

                    <div v-if="formData.products.length > 0" class="space-y-4">
                        <div class="bg-white border border-gray-300 rounded-lg overflow-hidden">
                            <table class="w-full table-auto">
                                <thead class="bg-gray-100">
                                    <tr>
                                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">დასახელება</th>
                                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">ფასი</th>
                                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">ქმედება</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in formData.products" :key="index">
                                        <td class="px-4 py-2 text-sm text-gray-700">{{ item.name }}</td>
                                        <td class="px-4 py-2 text-sm text-gray-700">{{ item.product_price }}</td>
                                        <td class="px-4 py-2">
                                            <button type="button" class="text-red-500 hover:bg-red-200 bg-red-100 p-2 rounded-md transition duration-200 cursor-pointer" @click="setId(index)">წაშლა</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <label for="amount" class="block text-gray-700 mb-1">ჯამური აგროქულა</label>
                        <input type="text" id="amount" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" v-model="formData.full_amount" @paste="onPaste" @keyup="replaceComma" :disabled="disabled" placeholder="ჯამური აგროქულა">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">ზედნადების ატვირთვა</label>
                        <file-pond name="files" label-idle="ატვირთეთ/ჩააგდეთ ფაილი აქ ..." :acceptedFileTypes="['application/pdf']"
                            :server="{
                                url : '',
                                process : {
                                    url : 'http://localhost:8000/api/statement/file/upload',
                                    method : 'POST',
                                    onload : handle
                                },
                                revert : {
                                    url : 'http://localhost:8000/api/statement/file/delete'
                                }
                            }"
                            v-bind:files="files" />
                        <div v-for="(data, index) in files_details" :key="data.id" class="mt-2">
                            <div class="flex justify-between items-center bg-gray-800 text-white p-2 rounded">
                                <span>{{ data.name }}</span>
                                <button type="button" class="text-white cursor-pointer rounded-full p-2 bg-gray-500 flex h-7 w-7 items-center justify-center hover:bg-gray-700 transition duration-200" @click="deleteFile($event, index)">&times;</button>
                            </div>
                        </div>
                    </div>

                    <div v-if="permission != 'company'" class="space-y-4">
                        <div>
                            <label for="personal_id" class="block text-sm font-medium text-gray-700 mb-1">სტატუსი</label>
                            <select v-model="formData.status" id="status" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:ring-1 ring-offset-2 ring-green-900 disabled:opacity-20">
                                <option value="" selected disabled>სტატუსი</option>
                                <option value="active">აქტიური</option>
                                <option value="inactive">არააქტიური</option>
                                <option value="pending">pending</option>
                            </select>
                        </div>

                        <div>
                            <label for="comment" class="block text-sm font-medium text-gray-700 mb-1">კომენტარი</label>
                            <textarea id="comment" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:ring-1 ring-offset-2 ring-green-900 disabled:opacity-20" v-model="formData.comment" style="resize: none;" :disabled="disabled"></textarea>
                        </div>
                    </div>

                    <div class="mt-6 mb-4">
                        <div class="d-grid">
                            <button type="submit" class="w-full py-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed" :disabled="disabled">განაცხადის რედაქტირება</button>
                        </div>
                    </div>
                </form>

                <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border-1 border-red-200 p-3 w-full mb-3 rounded-md select-none">
                    <strong class="text-red-900">{{ item[0] }}</strong>
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
        name : "StatementAdd",

        components : {
            MyHeader,
            "file-pond" : vueFilePond(),
            vSelect,
            FlatPickr
        },

        mounted() {
            document.title = "განაცხადის დამატება";

            axios.get("/products", {
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
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

                disabled : false,
                loader : false,

                show_modal : false,

                errors : [],

                options : [],

                selectedProduct : "",
                product_price : "",
                pst : 0,

                formData : {
                    overhead_number : "",
                    overhead_date : new Date(),
                    store_address : "",
                    full_amount : "",
                    beneficiary_name : "",
                    card_number : "",
                    comment : "",

                    products : [],
                    files : [],
                },

                id : "",
                
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

                axios.get("/statement/file/delete/" + id, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    console.log(response.data);

                    _this_.files_details.splice(index, 1);
                    _this_.formData.files.splice(index, 1);
                }).catch(err => console.log(err));
            },

            addStatement() {
                this.disabled = true;
                this.loader = true;
                const _this_ = this;

                axios.post("/statement/add", this.formData, {
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
                        this.$router.back();
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

            removeField() {
                this.formData.products.splice(this.id, 1);
                this.show_modal = false;
            },

            setId(index) {
                this.id = index;
                this.show_modal = true;
            },

            modalToggle() {
                this.show_modal = false;
            },

            onPaste(event) {
                event.preventDefault();
                console.log('Pasting is disabled.');
                this.pst = 1;
            },

            replaceComma() {
                this.formData.full_amount = this.formData.full_amount.replace(',', '.');
            }
        }
    }
</script>