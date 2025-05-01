<template>
    <div class="h-screen flex">
        <div class="hidden w-1/2 md:block items-center bg-image">
            <div class="bg-green-900/50 backdrop-blur-xs h-full w-full flex justify-center items-center flex-col gap-y-12">
                <div class="p-3 bg-white rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="53.168" height="51.273" viewBox="0 0 53.168 51.273">
                        <g id="Group_65896" data-name="Group 65896" transform="translate(-577.52 -559.331)">
                            <path id="Path_1788" data-name="Path 1788" d="M594.239,600.211c2.624-2.479,6.641-6.43,8.6-8.6a12.374,12.374,0,0,0,0-17.5c-1.955-2.165-5.972-6.117-8.6-8.6-2.624,2.479-6.641,6.43-8.6,8.6a12.373,12.373,0,0,0,0,17.5C587.6,593.781,591.615,597.732,594.239,600.211Z" transform="translate(-2.354 -3.239)" fill="#82be00"/>
                            <path id="Path_1789" data-name="Path 1789" d="M645.5,600.211c2.624-2.479,6.641-6.43,8.6-8.6a12.373,12.373,0,0,0,0-17.5c-1.954-2.165-5.971-6.117-8.6-8.6-2.624,2.479-6.641,6.43-8.6,8.6a12.374,12.374,0,0,0,0,17.5C638.857,593.781,642.875,597.732,645.5,600.211Z" transform="translate(-29.175 -3.239)" fill="#82be00"/>
                            <path id="Path_1790" data-name="Path 1790" d="M618.469,597.893c2.723-2.6,6.261-6.106,8.042-8.078a14.511,14.511,0,0,0,0-20.375c-1.931-2.139-5.932-6.088-8.714-8.717l-1.473-1.392-1.473,1.392c-2.783,2.63-6.784,6.579-8.715,8.717a17.773,17.773,0,0,0-2.032,2.723,17.729,17.729,0,0,0-2.032-2.723c-1.93-2.139-5.931-6.087-8.714-8.717l-1.473-1.392-1.473,1.392c-2.783,2.63-6.784,6.579-8.714,8.717a14.511,14.511,0,0,0,0,20.374c1.781,1.972,5.319,5.481,8.042,8.078v8.421H579.665v4.29h48.878v-4.29H618.469Zm0-30.555c1.89,1.862,3.742,3.742,4.858,4.978a14.054,14.054,0,0,1,1,1.242l-5.856,5.856Zm0,18.144,7.735-7.735a9.349,9.349,0,0,1,.194,1.88,11.066,11.066,0,0,1-3.07,7.312c-1.116,1.235-2.967,3.116-4.858,4.978Zm-9.148-13.167c1.115-1.235,2.966-3.115,4.857-4.978v12.076l-5.856-5.856A14.044,14.044,0,0,1,609.321,572.315Zm-2.877,5.431,7.735,7.735v6.435c-1.891-1.862-3.742-3.742-4.857-4.978a11.065,11.065,0,0,1-3.071-7.312A9.362,9.362,0,0,1,606.444,577.747ZM594.03,567.338c1.89,1.862,3.742,3.743,4.857,4.978a14.044,14.044,0,0,1,1,1.242l-5.856,5.856Zm0,18.144,7.735-7.735a9.393,9.393,0,0,1,.194,1.88,11.067,11.067,0,0,1-3.071,7.312c-1.115,1.235-2.967,3.115-4.857,4.978Zm-9.148-13.167c1.115-1.235,2.966-3.115,4.857-4.978v12.076l-5.856-5.856A13.967,13.967,0,0,1,584.882,572.315Zm0,14.624a11.065,11.065,0,0,1-3.071-7.312,9.393,9.393,0,0,1,.194-1.88l7.735,7.735v6.435C587.848,590.054,586,588.174,584.882,586.939Zm9.148,11.054L604.1,587.938l10.074,10.054v8.321H606.4v-5.426h-4.587v5.426H594.03Z" fill="#005019"/>
                        </g>
                    </svg>
                </div>
                <h1 class="text-white text-4xl select-none">სოფლის განვითარების სააგენტო</h1>
                <p class="select-none font-light text-center md:mt-12 mt-55 text-white absolute bottom-5">&copy; 2024 - {{ new Date().getFullYear() }}. სოფლის განვითარების სააგენტო</p>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="w-full md:flex md:justify-center p-3">
                <div class="w-full md:w-1/2 p-4 mt-36 md:mt-50">
                    <h1 class="text-center text-lg font-bold mb-10">ავტორიზაცია</h1>

                    <form method="post" @submit.prevent="singin()" class="mb-5">
                        <div class="block mb-3">
                            <label for="email" class="block mb-1">ელ. ფოსტა</label>
                            <input type="email" id="email" placeholder="ელ. ფოსტა" v-model="email" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled">
                        </div>
                        <div class="block mb-3">
                            <label for="password" class="block mb-1">პაროლი</label>
                            <input type="password" id="password" placeholder="პაროლი" v-model="password" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 bg-white" :disabled="disabled">
                        </div>
                        <div class="block mb-5">
                            <button type="submit" :disabled="disabled" class="w-full cursor-pointer bg-green-800 hover:bg-green-900 transition duration-200 p-3 text-white rounded-lg disabled:cursor-not-allowed disabled:opacity-40">
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="disabled">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                <span>შესვლა</span>
                            </button>
                        </div>
                        <router-link to="/signup" class="text-green-900 hover:underline">რეგისტრაცია</router-link>
                    </form>

                    <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border border-red-200 p-3 w-full mb-3 rounded-md select-none">
                        <strong class="text-red-900">{{ item[0] }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name : "SigninPage",

        data() {
            return {
                email : "",
                password : "",

                disabled : false,

                errors : []
            }
        },

        methods : {
            singin() {
                this.disabled = true;

                axios.post("/signin", {
                    email : this.email,
                    password : this.password
                }).then((response) => {
                    window.localStorage.setItem("user", JSON.stringify(response.data.user));
                    window.localStorage.setItem("token", JSON.stringify(response.data.token));

                    this.$router.push("/home");
                }).catch((err) => {
                    this.errors = err.response.data.errors;

                    this.disabled = false;
                });
            }
        },

        mounted() {
            document.title = "სისტემაში შესვლა";
            
            const data = window.localStorage.getItem("user");
            
            if(data != null) {
                this.$router.push("/home");
            }
        }
    }
</script>