<template>
    <div>
        <MyHeader />

        <div class="container mx-auto py-8 mt-25">
            <div class="bg-white p-4 w-full rounded-md">
                <form @submit.prevent="addOperator()">
                    <div class="mb-3">
                        <label for="name" class="block mb-1">ოპერატორის სახელი, გვარი</label>
                        <input type="text" v-model="formData.name" id="name" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="block mb-1">ელ.&nbsp;ფოსტა</label>
                        <input type="email" v-model="formData.email" id="email" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled">
                    </div>
                    <div class="mb-3">
                        <label for="mobile" class="block mb-1">ტელეფონის ნომერი</label>
                        <input type="number" min="0" onkeypress="if(this.value.length == 9) return false" v-model="formData.mobile" id="mobile" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled">
                    </div>
                    <div class="mb-3">
                        <label for="mobile" class="block mb-1">პაროლი</label>
                        <input type="password" v-model="formData.password" id="mobile" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled">
                    </div>
                    <button type="submit" class="bg-green-900 text-white rounded-lg p-3 w-full cursor-pointer transition duration-200 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-green-800 mb-3" :disabled="disabled">დამატება</button>
                </form>
                <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border-1 border-red-200 p-3 w-full mb-3 rounded-md select-none">
                    <strong class="text-red-900">{{ item[0] }}</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/Header.vue";
    import axios, { AxiosError } from "axios";

    export default {
        name : "DashBoard",

        components : {
            MyHeader,
        },

        data() {
            return {
                // formData
                formData : {
                    name : "",
                    password : "",
                    email : "",
                    mobile : "",
                },

                errors : [],

                disabled : false,
                loader : false,
            }
        },

        methods : {
            addOperator() {
                this.disabled = true;
                this.loader = true;
                
                axios.post("/user/operator/add", this.formData, {
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
            document.title = "მომხმარებლის დამატება";
        }
    }
</script>