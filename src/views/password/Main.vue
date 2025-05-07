<template>
    <div class="h-screen flex">
        <LeftSide />
        <div class="w-full md:w-1/2">
            <div class="w-full md:flex md:justify-center p-3">
                <div class="w-full md:w-1/2 p-4 mt-36 md:mt-50">
                    <div v-if="!sent">
                        <h1 class="text-center text-lg font-bold mb-10 select-none">პაროლის აღდგენა</h1>

                        <form method="post" @submit.prevent="sendReset()" class="mb-5">
                            <div class="block mb-3">
                                <label for="email" class="block mb-1">ელ. ფოსტა</label>
                                <input type="email" id="email" placeholder="ელ. ფოსტა" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled" v-model="email">
                            </div>
                            <div class="block mb-5">
                                <button type="submit" :disabled="disabled" class="w-full cursor-pointer bg-green-800 hover:bg-green-900 transition duration-200 p-3 text-white rounded-lg disabled:cursor-not-allowed disabled:opacity-40">გაგზავნა</button>
                            </div>

                            <a href="#" @click="$router.back()" class="text-green-900 underline">უკან</a>
                        </form>

                        <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border border-red-200 p-3 w-full mb-3 rounded-md select-none">
                            <strong class="text-red-900">{{ item[0] }}</strong>
                        </div>
                    </div>
                    
                    <div class="p-3 bg-green-100 border-1 border-green-500 rounded-md text-center" v-else>
                        <strong class="text-green-900">პაროლის აღდგენის ლინკი გაიგზავნა მითითებულ ელ. ფოსტაზე</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios, { AxiosError } from 'axios';
    import LeftSide from '@/components/LeftSide.vue';
import router from '@/router/router';

    export default {
        name : "ResetMain",

        components : {
            LeftSide
        },

        data() {
            return {
                disabled : false,
                email : "",
                sent : false,

                errors : [],
            }
        },

        methods : {
            sendReset() {
                this.disabled = true;

                axios.post("/password/send/reset", {
                    email : this.email
                }).then((response) => {
                    this.disabled = false;

                    this.sent = true;
                }).catch((err) => {
                    if(err instanceof AxiosError) {
                        this.errors = err.response.data.errors;
                    }

                    this.disabled = false;
                });
            }
        }
    }
</script>