<template>
    <div>
        <MyHeader />

        <Transition name="fade" appear>
            <div class="container mx-auto p-4 w-full mt-25 rounded-md">
                <h1 class="mb-8 fond-bold text-xl">პაროლის ცვლილება</h1>

                <form @submit.prevent="changePassword()">
                    <div class="block mb-3">
                        <label for="currentPassword" class="block mb-1">მიმდინარე პაროლი</label>
                        <input type="password" class="bg-white md:w-1/3 w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" id="currentPassword" placeholder="მიმდინარე პაროლი" v-model="formData.current_password">
                    </div>
                    <div class="block mb-3">
                        <label for="newPassword" class="block mb-1">ახალი პაროლი</label>
                        <input type="password" class="bg-white md:w-1/3 w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" id="newPassword" placeholder="ახალი პაროლი" v-model="formData.new_password">
                    </div>
                    <div class="block mb-3">
                        <label for="confirmPassword" class="block mb-1">გაიმეორეთ ახალი პაროლი</label>
                        <input type="password" class="bg-white md:w-1/3 w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" id="confirmPassword" placeholder="გაიმეორეთ ახალი პაროლი" v-model="formData.confirm_password">
                    </div>
                    <div class="form-group d-grid mb-3">
                        <button type="submit" class="bg-green-900 text-white rounded-lg p-3 md:w-1/3 w-full cursor-pointer transition duration-200 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-green-800" :disabled="disabled">შეცვლა</button>
                    </div>
                </form>
                
                <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border-1 border-red-200 p-3 md:w-1/3 w-full mb-3 rounded-md select-none">
                    <span class="text-red-900">{{ item[0] }}</span>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
    import axios, { AxiosError } from 'axios';
    import MyHeader from "../components/Header.vue";

    export default {
        name : "MySettings",

        components : {
            MyHeader,
        },

        data() {
            return {
                formData : {
                    current_password : "",
                    new_password : "",
                    confirm_password : ""
                },

                errors : [],

                disabled : false,
                loader : false,
            }
        },

        mounted() {
            document.title = "პაროლის შეცვლა";
        },

        methods : {
            changePassword() {
                this.disabled = true;
                this.loader = true;
                
                axios.post("/change_password", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.$swal({
                        title : "პაროლი წარმატებით შეიცვალა",
                        icon : "success",
                    });

                    this.disabled = false;
                    this.loader = false;
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }

                    this.disabled = false;
                    this.loader = false;
                });
            }
        }
    }
</script>

<style scoped>
    
</style>