<template>
    <div>
        <MyHeader />

        <Transition name="fade" appear>
            <div class="container mx-auto p-8 mt-25">
                <div class="p-4 md:w-1/3 w-full rounded-md">
                    <form @submit.prevent="add">
                        <div class="mb-3">
                            <label for="product_name">პროდუქტის დასახელება</label>
                            <input type="text" class="w-full p-3 border border-gray-200 bg-white outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled" id="product_name" v-model="title" placeholder="პროდუქტის დასახელება">
                        </div>
                        <div class="mb-3">
                            <label for="status">სტატუსი</label>
                            <select class="w-full p-3 border bg-white border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" id="status" v-model="status" :disabled="disabled">
                                <option value="" selected disabled>აირჩიეთ სტატუსი</option>
                                <option value="enabled">აქტიურია</option>
                                <option value="disabled">არააქტიურია</option>
                            </select>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="bg-green-900 text-white rounded-lg p-3 w-full cursor-pointer transition duration-200 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-green-800 mb-3" :disabled="disabled">დამატება</button>
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
    import MyHeader from "../../components/Header.vue";

    export default {
        name : "AddProduct",

        data() {
            return {
                title: '',
                status : "",

                errors : [],

                disabled : false,
                loader : false,
            };
        },
        
        components : {
            MyHeader,
        },

        mounted() {
            document.title = "პროდუქტის დამატება";
        },

        methods: {
            add() {
                this.disabled = true;
                this.loader = true;

                axios.post('/product/add', { title: this.title, status : this.status }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.status = "";
                    this.title = '';
                    this.errors = [];

                    this.$swal({
                        title : "პროდუქტი დაემატა",
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