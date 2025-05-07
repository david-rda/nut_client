<template>
    <div class="h-screen flex">
        <LeftSide />
        <div class="w-full md:w-1/2 overflow-y-scroll py-10">
            <a href="#" class="text-center p-3 rounded-md bg-gray-200 hover:bg-gray-300 mx-10 transition duration-200" @click="back()">უკან</a>
            <h1 class="text-center text-lg font-bold">რეგისტრაცია</h1>
            <div class="w-full md:flex md:justify-center p-3 mt-10 md:mt-20">
                <form @submit.prevent="signup()" class="space-y-2">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="mb-3">
                            <label for="company_name" class="block mb-1">კომპანიის დასახელება</label>
                            <input type="text" v-model="formData.company_name" id="company_name" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="კომპანიის დასახელება">
                        </div>
                        <div class="mb-3">
                            <label for="identification_code" class="block mb-1">საიდენტიფიკაციო კოდი</label>
                            <input type="number" min="0" onkeypress="if(this.value.length === 11) return false" v-model="formData.identification_code" id="identification_code" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="საიდენტიფიკაციო კოდი">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="mb-3">
                            <label for="legal_address" class="block mb-1">იურიდიული მისამართი</label>
                            <input type="text" v-model="formData.legal_address" id="legal_address" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="იურიდიული მისამართი">
                        </div>
                        <div class="mb-3">
                            <label for="actual_address" class="block mb-1">ფაქტობრივი მისამართი</label>
                            <input type="text" v-model="formData.actual_address" id="actual_address" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="ფაქტობრივი მისამართი">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="mb-3">
                            <label for="name" class="block mb-1">კომპანიის წარმომადგენლის სახელი, გვარი</label>
                            <input type="text" v-model="formData.name" id="name" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="კომპანიის წარმომადგენლის სახელი, გვარი">
                        </div>
                        <div class="mb-3">
                            <label for="personal_id" class="block mb-1">კომპანიის წარმომადგენლის პირადი ნომერი</label>
                            <input type="text" v-model="formData.personal_id" id="personal_id" onkeypress="if(this.value.length === 11) return false" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="კომპანიის წარმომადგენლის პირადი ნომერი">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="mb-3">
                            <label for="email" class="block mb-1">კომპანიის წარმომადგენლის ელ.&nbsp;ფოსტა</label>
                            <input type="email" v-model="formData.email" id="email" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="კომპანიის წარმომადგენლის ელ. ფოსტა">
                        </div>
                        <div class="mb-3">
                            <label for="mobile" class="block mb-1">კომპანიის წარმომადგენლის ტელეფონის ნომერი</label>
                            <input type="number" min="0" onkeypress="if(this.value.length === 9) return false" v-model="formData.mobile" id="mobile" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="კომპანიის წარმომადგენლის ტელეფონის ნომერი">
                        </div>
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block mb-1">პაროლი</label>
                        <input type="password" v-model="formData.password" id="password" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" placeholder="პაროლი">
                    </div>
                    <div class="flex flex-col mb-3">
                        <div class="w-full">
                            <button type="submit" class="w-full cursor-pointer bg-green-800 hover:bg-green-900 transition duration-200 p-3 text-white rounded-lg disabled:cursor-not-allowed disabled:opacity-40" :disabled="disabled">
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="disabled">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                <span>რეგისტრაცია</span>
                            </button>
                        </div>
                    </div>
                    <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border border-red-200 p-3 w-full rounded-md select-none">
                        <strong class="text-red-900">{{ item[0] }}</strong>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios, { AxiosError } from 'axios';
    import LeftSide from '@/components/LeftSide.vue';

    export default {
        name : "SignUp",

        components : {
            LeftSide
        },

        data() {
            return {
                year : (new Date().getFullYear() != "2024") ? "2024 - " + new Date().getFullYear() : new Date().getFullYear(),

                // formData
                formData : {
                    company_name : "",
                    identification_code : "",
                    legal_address : "",
                    actual_address : "",
                    name : "",
                    personal_id : "",
                    email : "",
                    mobile : "",
                    password : "",
                },

                errors : [],

                disabled : false,
            }
        },

        methods : {
            signup() {
                this.disabled = true;

                axios.post("/signup", this.formData).then((response) => {
                    this.$swal({
                        title : "რეგისტრაცია წარმატებით განხორციელდა",
                        icon : "success",
                        timerProgressBar: true,
                        timer : 2000,
                        toast : true,
                        position : "top-end"
                    });

                    this.disabled = false;

                    setTimeout(() => {
                        this.$router.push("/")
                    }, 2000);
                }).catch((err) => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }
                    
                    this.disabled = false;
                });
            },

            // "მარშუტებში" უკან გასვლის ფუნქცია
            back() {
                this.$router.back();
            }
        },

        mounted() {
            document.title = "რეგისტრაცია";
        }
    }
</script>