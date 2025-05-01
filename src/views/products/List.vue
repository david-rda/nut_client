<template>
    <div>
        <MyHeader />

        <Transition name="fade" appear>
            <div class="container mx-auto md:py-8 p-2 mt-25">
                <div class="flex justify-between mb-4 items-center md:p-0 px-3">
                    <h4 class="text-muted">პროდუქტები</h4>

                    <router-link to="/product/add" class="bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800 focus:border-green-900 transition duration-200 flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        პროდუქტის დამატება
                    </router-link>
                </div>

                <form @submit.prevent="filterProduct()" class="flex mb-3">
                    <input type="text" :disabled="disabled" v-model="search" class="disabled:cursor-not-allowed disabled:opacity-20 bg-white border border-gray-200 p-3 md:w-1/4 w-full rounded-tl-md rounded-bl-md outline-none" placeholder="ძიება...">
                    <button type="submit" :disabled="disabled" class="disabled:cursor-not-allowed disabled:opacity-20 rounded-tr-md rounded-br-md bg-green-800 text-white p-3 cursor-pointer transition duration-200 hover:bg-green-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>

                <div class="md:overflow-x-hidden overflow-x-scroll" v-if="!disabled">
                    <table class="w-full text-sm text-gray-500 text-gray-400 rounded-lg overflow-hidden">
                        <thead class="text-xs text-gray-700 bg-gray-50">
                            <tr class="text-sm text-center text-black">
                                <th class="px-6 py-3 font-bold">#</th>
                                <th class="px-6 py-3 font-bold">დასახელება</th>
                                <th class="px-6 py-3 font-bold">სტატუსი</th>
                                <th class="px-6 py-3 font-bold">ქმედება</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center bg-white text-black" v-for="(data, index) in products.data" :key="index">
                                <td class="px-6 py-3">{{ index + 1 }}</td>
                                <td class="px-6 py-3">{{ data.name }}</td>
                                <td class="px-6 py-3">
                                    <span v-if="data.status == 'disabled'" class="bg-red-100 text-red-900 p-2 rounded-md select-none">არააქტიური</span>
                                    <span v-else class="bg-green-100 text-green-900 p-2 rounded-md select-none">აქტიური</span>
                                </td>
                                <td class="px-6 py-3 flex gap-2 justify-center">
                                    <router-link :to="'/product/edit/' + data.id" type="button" class="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer flex gap-2 items-center" target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 pointer-events-none">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                        რედაქტირება
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="flex justify-center">
                    <span>
                        <svg aria-hidden="true" role="status" class="w-10 h-10 text-center animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                    </span>
                </div>

                <vue3-tailwind-pagination :total="Number(products.total)" :per_page="Number(products.per_page)" :active_color="'text-white'" :active_background="'bg-blue-500'" :current_page="Number(products.current_page)" @change="getResults"/>
            </div>
        </Transition>
    </div>
</template>

<script>
    import axios from 'axios';
    import MyHeader from "../../components/Header.vue";

    export default {
        name : "DashBoard",

        components : {
            MyHeader,
        },
        
        data() {
            return {
                products : [],
                page : 1,
                search : "",

                disabled : false
            }
        },

        methods : {
            getResults(page = 1) {
                const _this_ = this;

                this.disabled = true;

                axios.get("/product/list?page=" + page + "&query=" + this.search, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.products = response.data;
                    _this_.disabled = false;
                }).catch(err => {
                    console.log(err);
                    _this_.disabled = false;
                });
            },

            filterProduct() {
                this.getResults();
            }
        },

        mounted() {
            document.title = "პროდუქტები";

            this.getResults();
            
            axios.get("/product/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.products = response.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
</script>