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

    export default {
        name : "ResetMain",

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