<template>
    <div>
        <MyHeader />

        <Transition name="fade" appear>
            <div class="container mx-auto p-8 mt-25">
                <div class="p-4 w-full">
                    <form @submit.prevent="edit">
                        <div class="form-group mb-3">
                            <label for="currentPassword">პროდუქტის დასახელება</label>
                            <input type="text" class="w-full p-3 border bg-white border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled" id="currentPassword" v-model="title">
                        </div>
                        <div class="grid grid-cols-3 gap-5">
                            <div class="mb-3">
                                <label for="datetime-picker">პროდუქტის ვადა</label>
                                <flat-pickr class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 border bg-white" id="datetime-picker" :disabled="disabled" :config="flatpickrOptions" v-model="maturity"></flat-pickr>
                            </div>
                            <div class="mb-3">
                                <label for="datetime-picker">პარტიის ნომერი</label>
                                <input type="text" class="w-full p-3 border border-gray-200 bg-white outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled" id="product_name" v-model="set_number" placeholder="პარტიის ნომერი">
                            </div>
                            <div class="form-group mb-3">
                                <label for="status">სტატუსი</label>
                                <select class="w-full p-3 border bg-white border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled" id="status" v-model="status">
                                    <option value="" selected disabled>აირჩიეთ სტატუსი</option>
                                    <option value="enabled">აქტიურია</option>
                                    <option value="disabled">არააქტიურია</option>
                                </select>
                            </div>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="bg-green-900 text-white rounded-lg p-3 w-full cursor-pointer transition duration-200 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-green-800 mb-3" :disabled="disabled">რედაქტირება</button>
                        </div>
                    </form>

                    <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border-1 border-red-200 p-3 w-full mb-3 rounded-md select-none">
                        <strong class="text-red-900">{{ item[0] }}</strong>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
    import axios from "axios";
    import FlatPickr from "vue-flatpickr-component";
    import 'flatpickr/dist/flatpickr.css';
    import MyHeader from "../../components/Header.vue";

    export default {
        name : "AddProduct",

        data() {
            return {
                title: "",
                status : "",
                maturity : "",
                set_number : "",

                errors : [],
                
                disabled : false,
                loader : false,

                flatpickrOptions: {
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                },
            };
        },
        
        components : {
            MyHeader,
            FlatPickr
        },

        mounted() {
            document.title = "პროდუქტის რედაქტირება";

            axios.get("/product/get/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.title = response.data.name;
                this.status = response.data.status;
                this.maturity = response.data.maturity;
            }).catch(err => {
                console.log(err);
            });
        },

        methods: {
            edit() {
                this.disabled = true;
                this.loader = true;
                
                axios.post('/product/edit/' + this.$route.params.id, { title: this.title, status : this.status, maturity : this.maturity, set_number : this.set_number }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.errors = [];

                    this.$swal({
                        title : "პროდუქტი დარედაქტირდა",
                        icon : "success",
                    });
                    
                    this.disabled = false;
                    this.loader = false;
                }).catch(error => {
                    this.errors = error?.response?.data?.errors;
                    this.disabled = false;
                    this.loader = false;
                });
            }
        }
    };
</script>