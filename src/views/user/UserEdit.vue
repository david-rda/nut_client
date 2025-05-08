<template>
    <div>
        <MyHeader />

        <div class="container mx-auto p-8 mt-25">
            <div class="bg-white p-4 w-full rounded-md">
                <div v-if="formData.permission != 'operator'">
                    <h4 class="text-secondary text-center mb-5">მომხმარებლის რედაქტირება</h4>
                    <form @submit.prevent="edit()" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="col-span-1">
                            <div class="mb-4">
                                <label for="company_name" class="mb-1 block text-sm font-medium">კომპანიის დასახელება</label>
                                <input type="text" v-model="formData.company_name" id="company_name" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20">
                            </div>
                            <div class="mb-4">
                                <label for="identification_code" class="mb-1 block text-sm font-medium">საიდენტიფიკაციო კოდი</label>
                                <input type="number" min="0" onkeypress="if(this.value.length == 9) return false" v-model="formData.identification_code" id="identification_code" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20">
                            </div>
                            <div class="mb-4">
                                <label for="legal_address" class="mb-1 block text-sm font-medium">იურიდიული მისამართი</label>
                                <input type="text" v-model="formData.legal_address" id="legal_address" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20">
                            </div>
                            <div class="mb-4">
                                <label for="actual_address" class="mb-1 block text-sm font-medium">ფაქტობრივი მისამართი</label>
                                <input type="text" v-model="formData.actual_address" id="actual_address" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20">
                            </div>
                        </div>
                        <div class="col-span-1">
                            <div class="mb-4">
                                <label for="name" class="mb-1 block text-sm font-medium">კომპანიის წარმომადგენლის სახელი, გვარი</label>
                                <input type="text" v-model="formData.name" id="name" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20">
                            </div>
                            <div class="mb-4">
                                <label for="personal_id" class="mb-1 block text-sm font-medium">კომპანიის წარმომადგენლის პირადი ნომერი</label>
                                <input type="text" min="0" onkeypress="if(this.value.length == 11) return false" v-model="formData.personal_id" id="personal_id" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20">
                            </div>
                            <div class="mb-4">
                                <label for="email" class="mb-1 block text-sm font-medium">კომპანიის წარმომადგენლის ელ.&nbsp;ფოსტა</label>
                                <input type="email" v-model="formData.email" id="email" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20">
                            </div>
                            <div class="mb-4">
                                <label for="mobile" class="mb-1 block text-sm font-medium">კომპანიის წარმომადგენლის ტელეფონის ნომერი</label>
                                <input type="number" min="0" onkeypress="if(this.value.length == 9) return false" v-model="formData.mobile" id="mobile" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20">
                            </div>
                        </div>
                        <div class="col-span-1">
                            <div class="mb-4">
                                <label for="password" class="mb-1 block text-sm font-medium">პაროლი</label>
                                <input type="password" v-model="formData.password" id="password" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20">
                            </div>
                            
                        </div>
                        <div class="col-span-1 flex items-end justify-start">
                            <div class="mb-4 w-full">
                                <button type="submit" class="w-full py-3 px-4 bg-green-900 text-white rounded-md hover:bg-green-800 disabled:opacity-20 cursor-pointer transition duration-200 disabled:cursor-not-allowed" :disabled="disabled">რედაქტირება</button>
                            </div>
                        </div>
                    </form>

                    <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border-1 border-red-200 p-3 w-full mb-3 rounded-md select-none">
                        <strong class="text-red-900">{{ item[0] }}</strong>
                    </div>
                </div>

                <div v-else>
                    <h1 class="text-center select-none mb-3">ოპერატორის რედაქტირება</h1>
                    <form @submit.prevent="editOperator()" class="row g-3">
                        <div class="mb-3">
                            <label for="name">ოპერატორის სახელი, გვარი</label>
                            <input type="text" v-model="formData.name" id="name" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled">
                        </div>
                        <div class="mb-3">
                            <label for="email">ელ.&nbsp;ფოსტა</label>
                            <input type="email" v-model="formData.email" id="email" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled">
                        </div>
                        <div class="mb-3">
                            <label for="mobile">ტელეფონის ნომერი</label>
                            <input type="number" min="0" onkeypress="if(this.value.length == 9) return false" v-model="formData.mobile" id="mobile" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled">
                        </div>
                        <div class="mb-3">
                            <label for="mobile">პაროლი</label>
                            <input type="password" v-model="formData.password" id="mobile" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled">
                        </div>
                    
                        <div class="d-grid mb-5">
                            <button type="submit" class="bg-green-900 text-white rounded-lg p-3 w-full cursor-pointer transition duration-200 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-green-800 mb-3" :disabled="disabled">რედაქტირება</button>
                        </div>
                    </form>
                    <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border-1 border-red-200 p-3 w-full mb-3 rounded-md select-none border-0">
                        <strong class="text-red-900">{{ item[0] }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios, { AxiosError } from 'axios';
    import MyHeader from "../../components/Header.vue";

    export default {
        name : "UserEdit",

        components : {
            MyHeader,
        },

        data() {
            return {
                // formData
                formData : {

                },

                errors : [],

                disabled : false,
                loader : false,
            }
        },

        methods : {
            edit() {
                this.disabled = true;
                this.loader = true;
                
                axios.post("/user/edit/" + this.$route.params.id, this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then((response) => {
                    this.$swal({
                        title : "რედაქტირება განხორციელდა",
                        icon : "success",
                    });
                    
                    this.disabled = false;
                    this.loader = false;
                }).catch((err) => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }

                    this.disabled = false;
                    this.loader = false;
                });
            },

            editOperator() {
                this.disabled = true;
                this.loader = true;

                axios.post("/user/edit/" + this.$route.params.id, this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then((response) => {
                    this.$swal({
                        title : "ოპერატორი დაემატა",
                        icon : "success",
                    });

                    setTimeout(() => {
                        this.$router.back()
                    }, 2000);

                    this.disabled = false;
                    this.loader = false;
                }).catch((err) => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }

                    this.disabled = false;
                    this.loader = false;
                });
            }
        },

        mounted() {
            document.title = "მომხმარებლის რედაქტირება";

            axios.get("/user/get/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then((response) => {
                this.formData = response.data;
            }).catch((err) => {
                console.log(err);
            });
        }
    }
</script>