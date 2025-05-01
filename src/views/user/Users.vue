<template>
    <div>
        <MyHeader />

        <Transition name="fade" appear>
            <div class="container mx-auto md:py-8 p-2 mt-25">
                <div class="flex justify-between mb-4 items-center">
                    <div class="md:overflow-x-hidden overflow-x-scroll">
                        <table class="w-full text-sm text-gray-500 text-gray-400 rounded-lg overflow-hidden">
                            <thead class="text-xs text-gray-700 bg-gray-50">
                                <tr class="text-sm text-center text-black">
                                    <th class="px-6 py-3 font-bold">კომპანიის დასახელება</th>
                                    <th class="px-6 py-3 font-bold">ს/კ</th>
                                    <th class="px-6 py-3 font-bold">სახელი, გვარი</th>
                                    <th class="px-6 py-3 font-bold">ელ. ფოსტა</th>
                                    <th class="px-6 py-3 font-bold">ტელეფონი</th>
                                    <th class="px-6 py-3 font-bold">პ/ნ</th>
                                    <th class="px-6 py-3 font-bold">სტატუსი</th>
                                    <th class="px-6 py-3 font-bold">ნებართვა</th>
                                    <th class="px-6 py-3 font-bold">ქმედება</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center border-t border-gray-100 bg-white">
                                    <td class="p-3">
                                        <input type="text" :disabled="disabled1" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="დასახელება" v-model="formData.company_name">
                                    </td>
                                    <td class="p-3">
                                        <input type="number" :disabled="disabled1" min="0" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="ს/კ" v-model="formData.id_code">
                                    </td>
                                    <td class="p-3">
                                        <input type="text" :disabled="disabled1" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="სახელი, გვარი" v-model="formData.name">
                                    </td>
                                    <td class="p-3">
                                        <input type="email" :disabled="disabled1" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="ელ. ფოსტა" v-model="formData.email">
                                    </td>
                                    <td class="p-3">
                                        <input type="number" :disabled="disabled1" min="0" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="ტელეფონი" v-model="formData.mobile">
                                    </td>
                                    <td class="p-3">
                                        <input type="number" :disabled="disabled1" min="0" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="პ/ნ" v-model="formData.personal_id">
                                    </td>
                                    <td class="p-3">
                                        <select class="p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled1" v-model="formData.status">
                                            <option value="" selected disabled>სტატუსი</option>
                                            <option value="active">აქტიური</option>
                                            <option value="pending">არააქტიური</option>
                                        </select>
                                    </td>
                                    <td class="p-3">
                                        <select class="p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" :disabled="disabled1" v-model="formData.permission">
                                            <option value="" selected disabled>ნებართვა</option>
                                            <option value="coordinator">კოორდინატორი</option>
                                            <option value="company">კომპანია</option>
                                            <option value="operator">ოპერატორი</option>
                                        </select>
                                    </td>
                                    <td class="p-3">
                                        <button type="button" class="bg-green-900 text-center text-white w-full p-3 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 flex gap-1 transition duration-200 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center" :disabled="disabled1" @click="searchUser">
                                            <span class="flex items-center gap-1 pointer-events-none" v-if="!disabled1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                </svg>
                                                ძებნა
                                            </span>
                                            <span v-else class="pointer-events-none">
                                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="flex justify-between mb-4 items-center md:px-0 px-5">
                    <h4 class="text-gray-500 text-lg font-semibold select-none">მომხმარებლის მართვა</h4>
                    <button class="ml-auto mr-5 p-3 bg-green-100 text-green-900 transition duration-200 hover:bg-green-200 rounded-lg flex gap-2 items-center cursor-pointer font-semibold disabled:opacity-20 disabled:cursor-not-allowed" @click="downloadUserReport()" :disabled="disabled_report">
                        <span v-if="!disabled_report" class="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            რეპორტი
                        </span>
                        <span class="flex gap-2 items-center" v-else>
                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            დაელოდეთ
                    </span>
                    </button>
                    <router-link to="/user/add" class="bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="md:block hidden">ოპერატორის დამატება</span>
                    </router-link>
                </div>

                <div class="md:overflow-x-hidden overflow-x-scroll">
                    <table class="w-full text-sm text-gray-500 text-gray-400 rounded-lg overflow-hidden">
                        <thead class="text-xs text-gray-700 bg-gray-50">
                            <tr class="text-sm text-center text-black">
                                <th class="px-6 py-3 font-bold">ID</th>
                                <th class="px-6 py-3 font-bold">კომპანიის დასახელება</th>
                                <th class="px-6 py-3 font-bold">ს/კ</th>
                                <th class="px-6 py-3 font-bold">სახელი, გვარი</th>
                                <th class="px-6 py-3 font-bold">ელ. ფოსტა</th>
                                <th class="px-6 py-3 font-bold">ტელეფონი</th>
                                <th class="px-6 py-3 font-bold">პ/ნ</th>
                                <th class="px-6 py-3 font-bold">სტატუსი</th>
                                <th class="px-6 py-3 font-bold">ნებართვა</th>
                                <th class="px-6 py-3 font-bold">ქმედება</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center bg-white text-black" v-for="(data, index) in users.data" :key="data.id">
                                <td class="px-6 py-3">{{ index + 1 }}</td>
                                <td class="px-6 py-3">{{ data.company_name }}</td>
                                <td class="px-6 py-3">{{ data.identification_code }}</td>
                                <td class="px-6 py-3">{{ data.name }}</td>
                                <td class="px-6 py-3">{{ data.email }}</td>
                                <td class="px-6 py-3">{{ data.mobile }}</td>
                                <td class="px-6 py-3">{{ data.personal_id }}</td>
                                <td class="px-6 py-3">{{ (data.status == 'pending') ? 'არააქტიური' : 'აქტიური' }}</td>
                                <td class="px-6 py-3">{{ (data.permission == 'company') ? 'კომპანია' : (data.permission == 'coordinator') ? 'კოორდინატორი' : 'ოპერატორი' }}</td>
                                <td class="px-6 py-3 flex gap-2 justify-center">
                                    <router-link :to="'/user/edit/' + data.id" type="button" class="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer" v-tippy="{ content: 'რედაქტირება' }">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 pointer-events-none">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </router-link>
                                    <button type="button" class="bg-green-900 text-white p-2 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 ms-2 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center" v-tippy="{ content: 'ავტორიზაციის დადასტურება' }" :data-user-id="data.id" @click="authorize($event)" v-show="data.status != 'active'" :disabled="disabled">
                                        <span v-if="!disabled" class="pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 pointer-events-none">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </span>
                                        <span v-else class="pointer-events-none">
                                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <vue3-tailwind-pagination :total="Number(users.total)" :per_page="Number(users.per_page)" :active_color="'text-white'" :active_background="'bg-blue-500'" :current_page="Number(users.current_page)" @change="getUsers"/>
            </div>
        </Transition>
    </div>
</template>

<script>
    import MyHeader from "../../components/Header.vue";
    import axios from "axios";

    export default {
        name : "UsersGrid",

        components : {
            MyHeader,
        },

        data() {
            return {
                users : [],
                
                formData : {
                    company_name : "",
                    id_code : "",
                    name : "",
                    email : "",
                    mobile : "",
                    personal_id : "",
                    status : "",
                    permission : ""
                },

                disabled : false,
                disabled1 : false,
                disabled_report : false,

                page : 1
            }
        },

        methods : {
            getUsers(page = 1) {
                axios.get("/user/list?page=" + page, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.users = response.data;
                }).catch(err => {
                    console.log(err);
                })
            },

            authorize(event) {
                const user_id = Number(event.target.getAttribute("data-user-id"));
                this.disabled = true;

                axios.get("/user/change/status/" + user_id, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.$swal({
                        title : "მოთხოვნა შესრულდა",
                        icon : "success",
                    });

                    this.users = response.data.users;
                    this.disabled = false;
                }).catch(err => {
                    console.log(err);
                    this.disabled = false;
                });
            },

            searchUser() {
                this.disabled1 = true;
                
                axios.post("/search/user", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.users = response.data;
                    this.disabled1 = false;
                }).catch(err => {
                    console.log(err);
                    this.disabled1 = false;
                });
            },

            downloadUserReport() {
                this.disabled_report = true;
                const _this_ = this;

                axios.get("/user/report/", {
                    responseType: 'blob',
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(function(response) {
                    _this_.disabled_report = false;

                    const blob = response.data;
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'users.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }).catch(function(err) {
                    _this_.disabled_report = false;
                    console.log(err);
                });
            }
        },

        mounted() {
            document.title = "მომხმარებლები";

            this.getUsers();
        }
    }
</script>