<template>
    <div class="h-screen flex">
        <LeftSide />
        <div class="w-full md:w-1/2">
            <div class="w-full md:flex md:justify-center p-3">
                <div class="w-full md:w-1/2 p-4 mt-36 md:mt-50" v-if="!reseted">
                    <h1 class="text-center text-lg font-bold mb-10 select-none">პაროლის აღდგენა</h1>

                    <form method="POST" @submit.prevent="reset()">
                        <div class="block mb-3">
                            <label for="password" class="block mb-1">ახალი პაროლი</label>
                            <input type="password" id="password" placeholder="ახალი პაროლი" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" v-model="new_password" :disabled="disabled">
                        </div>

                        <div class="block mb-3">
                            <label for="confirm" class="block mb-1">დაადასტურეთ პაროლი</label>
                            <input type="password" id="confirm" placeholder="დაადასტურეთ პაროლი" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" v-model="confirm_password" :disabled="disabled">
                        </div>

                        <div class="mt-4 mb-3">
                            <input type="submit" class="w-full bg-green-900 text-white p-3 rounded-lg hover:bg-green-800 transition duration-200 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed" value="პაროლის განახლება" :disabled="disabled">
                        </div>
                    </form>

                    <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border border-red-200 p-3 w-full mb-3 rounded-md select-none">
                        <strong class="text-red-900">{{ item[0] }}</strong>
                    </div>
                </div>
                <div class="p-3 bg-green-100 border-1 border-green-500 rounded-md text-center" v-else>
                    <strong class="text-green-900">პაროლის აღდგენა განხორციელდა</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios, { AxiosError } from 'axios';
    import LeftSide from '@/components/LeftSide.vue';

    export default {
        name : "ResetComponent",

        components : {
            LeftSide
        },

        data() {
            return {
                errors : [],

                checkSttaus : "",

                new_password : "",
                confirm_password : "",
                disabled : false,
                reseted : false
            }
        },

        mounted() {
            const _this_ = this;

            axios.get("/password/reset/check/" + this.$route.params.token + "/" + this.$route.params.email).then(function(response) {
                _this_.checkSttaus = response.data.status;
            }).catch(function() {
                _this_.$router.push("/");
            });
        },

        methods : {
            reset() {
                const _this_ = this;

                this.disabled = true;

                axios.post("/password/reset", {
                    new : this.new_password,
                    confirm : this.confirm_password,
                    email : this.$route.params.email,
                    token : this.$route.params.token
                }).then(function(response) {
                    _this_.disabled = false;
                    _this_.reseted = true;

                    setTimeout(function() {
                        _this_.$router.push("/");
                    }, 2000);
                }).catch(function(err) {
                    if(err instanceof AxiosError) {
                        _this_.errors = err.response.data.errors;
                    }

                    _this_.disabled = false;
                    _this_.reseted = false;
                })
            }
        }
    }
</script>