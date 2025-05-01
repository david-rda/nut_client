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
                                    <th class="px-6 py-3 font-bold">კომპანია</th>
                                    <th class="px-6 py-3 font-bold">მაღაზიის მისამართი</th>
                                    <th class="px-6 py-3 font-bold">ზედნადების ნომერი</th>
                                    <th class="px-6 py-3 font-bold">ზედნადების თარიღი</th>
                                    <th class="px-6 py-3 font-bold">აგრობარათის მფლობელი</th>
                                    <th class="px-6 py-3 font-bold">ჯამური აგროქულა</th>
                                    <th class="px-6 py-3 font-bold">აგრობარათის ნომერი</th>
                                    <th class="px-6 py-3 font-bold">სტატუსი</th>
                                    <th class="px-6 py-3 font-bold">ქმედება</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center border-t border-gray-100 bg-white text-black">
                                    <td class="p-3">
                                        <input type="text" :disabled="disabled" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="კომპანიის სახელი" v-model="formData.company_name">
                                    </td>
                                    <td class="p-3">
                                        <input type="text" :disabled="disabled" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="მაღაზიის მისამართი" v-model="formData.store_address">
                                    </td>
                                    <td class="p-3">
                                        <input type="text" :disabled="disabled" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="ზედნადების ნომერი" v-model="formData.overhead_number">
                                    </td>
                                    <td class="p-3">
                                        <flat-pickr class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20 border" id="datetime-picker" :disabled="disabled" :config="flatpickrOptions" v-model="formData.overhead_date"></flat-pickr>
                                    </td>
                                    <td class="p-3">
                                        <input type="email" :disabled="disabled" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="სახელი, გვარი" v-model="formData.beneficiary_name">
                                    </td>
                                    <td class="p-3">
                                        <input type="number" :disabled="disabled" min="0" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" placeholder="ჯამური თანხა" v-model="formData.full_amount">
                                    </td>
                                    <td class="p-3">
                                        <input type="text" :disabled="disabled" placeholder="ბოლო 4 ციფრი" onkeypress="if(this.value.length == 4) return false" class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" v-model="formData.card_number">
                                    </td>
                                    <td class="p-3">
                                        <select class="w-full p-3 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:border-green-900 disabled:opacity-20" v-model="formData.status" :disabled="disabled">
                                            <option value="" selected disabled>სტატუსი</option>
                                            <option value="operator" v-if="user?.permission != 'company'">გადაწერილია ოპერატორზე</option>
                                            <option value="new">ახალი</option>
                                            <option value="rejected">დახარვეზებული</option>
                                            <option value="stopped">შეჩერებული</option>
                                            <option value="approved">დადასტურებული</option>
                                        </select>
                                    </td>
                                    <td class="px-6 py-3">
                                        <button type="button" class="bg-green-900 text-white w-full p-3 rounded-lg hover:bg-green-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center" :disabled="disabled" @click="searchOverhead()">
                                            <span class="flex items-center justify-center gap-1" v-if="!disabled">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                </svg>
                                                ძებნა
                                            </span>
                                            <span v-else>
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

                <div class="flex w-full justify-between items-center mb-3 md:px-0 px-5">
                    <h4 class="select-none">განაცხადები</h4>

                    <router-link to="/statement/add" class="bg-green-900 text-white py-2 px-2 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 flex gap-2 transition duration-200" v-if="permission == 'company'">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="md:block hidden">ზედნადების დამატება</span>
                    </router-link>
                </div>

                <div class="row">
                    <div class="col-4 ps-0" v-if="permission == 'coordinator'">
                        <select class="w-1/6 p-3 bg-white outline-none rounded-lg transition duration-200 disabled:opacity-20 mb-3" v-model="operator">
                            <option value="" disabled selected>აირჩიეთ ოპერატორი</option>
                            <option :value="item.id" v-for="(item, index) in operators" :key="index">{{ item.name }}</option>
                        </select>
                        <button type="button" @click="changeStatus()" class="p-3 bg-blue-700 rounded-lg mx-2 text-white cursor-pointer hover:bg-blue-900 transition duration-200 disabled:opacity-20 disabled:cursor-not-allowed" :disabled="disabled_operator_btn">გადაწერა</button>
                    </div>
                    <div class="md:overflow-x-hidden overflow-x-scroll">
                        <table class="w-full text-sm text-gray-500 text-gray-400 rounded-lg overflow-hidden">
                            <thead class="text-xs text-gray-700 bg-gray-50">
                                <tr class="text-sm text-center text-black">
                                    <th class="px-6 py-3 font-medium" v-if="permission == 'coordinator'">
                                        <input type="checkbox" @change="selectAllStatements" v-model="selectAll">
                                    </th>
                                    <th class="px-6 py-3 font-bold">კომპანია</th>
                                    <th class="px-6 py-3 font-bold">მაღაზიის მისამართი</th>
                                    <th class="px-6 py-3 font-bold">ზედნადების ნომერი</th>
                                    <th class="px-6 py-3 font-bold">ზედნადების თარიღი</th>
                                    <th class="px-6 py-3 font-bold">აგრობარათის მფლობელი</th>
                                    <th class="px-6 py-3 font-bold">ჯამური აგროქულა</th>
                                    <th class="px-6 py-3 font-bold">აგრობარათის ნომერი</th>
                                    <th class="px-6 py-3 font-bold">სტატუსი</th>
                                    <th class="px-6 py-3 font-bold">ქმედება</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center bg-white text-black" v-for="data in statements.data" :key="data.id">
                                    <td v-if="permission == 'coordinator'" class="px-6 py-3">
                                        <input type="checkbox" v-model="selectedStatements" :value="data.id">
                                    </td>
                                    <td class="px-6 py-3">{{ data?.company_name }}</td>
                                    <td class="px-6 py-3">{{ data?.store_address }}</td>
                                    <td class="px-6 py-3">{{ data?.overhead_number }}</td>
                                    <td class="px-6 py-3">{{ data?.overhead_date }}</td>
                                    <td class="px-6 py-3">{{ data?.beneficiary_name }}</td>
                                    <td class="px-6 py-3">{{ parseFloat(data?.full_amount).toFixed(2) }}</td>
                                    <td class="px-6 py-3">{{ data?.card_number }}</td>
                                    <td class="px-6 py-3">
                                        <div class="flex flex-col">
                                            <span>{{ (data?.status == "new") ? 'ახალი' : (data?.status == "operator" && permission != 'company') ? 'გადაწერილია ოპერატორზე' : (data?.status == "rejected") ? 'დახარვეზებული' : (data?.status == "stopped") ? 'შეჩერებული' : (data?.status == "approved") ? 'დადასტურებული' : '' }}</span>
                                            <span v-if="data.status == 'operator' && permission != 'company'" class="p-2 bg-blue-100 text-blue-900 rounded-md text-xs select-none">{{ data?.operator.name }}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-3">
                                        <div class="flex gap-2 justify-center">
                                            <router-link :to="'/statement/read/' + data?.id" target="_blank" class="bg-green-900 text-white p-2 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 ms-2 cursor-pointer" v-tippy="{ content: 'დათვალიერება' }">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 pointer-events-none">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </router-link>
                                            <router-link :to="'/statement/edit/' + data?.id" class="bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 ms-2 cursor-pointer" v-tippy="{ content: 'რედაქტირება' }" v-if="data?.status == 'rejected' && permission == 'company'">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </router-link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <vue3-tailwind-pagination :total="Number(statements.total)" :per_page="Number(statements.per_page)" :active_color="'text-white'" :active_background="'bg-blue-500'" :current_page="Number(statements.current_page)" @change="getResults"/>

                    <div class="col-4 ps-0 mt-3" v-if="permission == 'coordinator'">
                        <div class="d-flex">
                            <select class="w-1/6 p-3 bg-white outline-none rounded-lg transition duration-200 disabled:opacity-20 mb-3" v-model="operator">
                                <option value="" disabled selected>აირჩიეთ ოპერატორი</option>
                                <option :value="item.id" v-for="(item, index) in operators" :key="index">{{ item.name }}</option>
                            </select>
                            <button type="button" @click="changeStatus()" class="p-3 bg-blue-700 rounded-lg mx-2 text-white cursor-pointer hover:bg-blue-900 transition duration-200 disabled:opacity-20 disabled:cursor-not-allowed" :disabled="disabled_operator_btn">გადაწერა</button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
    import axios from 'axios';
    import MyHeader from "../../components/Header.vue";
    import FlatPickr from "vue-flatpickr-component";
    import 'flatpickr/dist/flatpickr.css';

    export default {
        name : "DashBoard",

        components : {
            MyHeader,
            FlatPickr,
        },
        
        data() {
            return {
                statements : [],
                user_id : JSON.parse(window.localStorage.getItem("user"))?.user_id,
                user : JSON.parse(window.localStorage.getItem("user")),
                permission : JSON.parse(window.localStorage.getItem("user"))?.permission,

                flatpickrOptions: {
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                },

                formData : {
                    overhead_number : "",
                    overhead_date : "",
                    store_address : "",
                    full_amount : "",
                    beneficiary_name : "",
                    company_name : "",
                    status : "",
                    card_number : ""
                },

                selectedStatements : [],
                selectAll : false,

                disabled : false,
                disabled_operator_btn : false,

                page : 1,

                operators : [],
                operator : ""
            }
        },

        methods : {
            searchOverhead() {
                this.disabled = true;

                axios.post("/statement/search", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.statements = response.data;
                    this.disabled = false;
                }).catch(err => {
                    console.log(err);
                    this.disabled = false;
                });
            },

            changeStatus() {
                if(this.operator == null || this.selectedStatements.length == 0 || this.operator == "") {
                    this.$swal({
                        title : "ოპერატორი ან განაცხადი არაა მითითებული",
                        icon : "warning",
                    });
                }else {
                    this.disabled_operator_btn = true;

                    axios.post("/statement/change/massive", {
                        operator_id : this.operator,
                        statements : this.selectedStatements
                    }, {
                        headers : {
                            "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                        }
                    }).then(response => {
                        this.disabled_operator_btn = false;

                        this.$swal({
                            title : "მოთხოვნა შესრულდა",
                            icon : "success",
                        });
                    }).catch(err => {
                        this.disabled_operator_btn = true;

                        this.$swal({
                            title : "მოთხოვნა ვერ შესრულდა",
                            icon : "error",
                        });
                    });
                }
            },

            selectAllStatements() {
                if (this.selectAll) {
                    this.selectedStatements = this.statements.data.map(item => item.id);
                } else {
                    this.selectedStatements = [];
                }
            },

            // viewPdf(event) {
            //     window.open('https://nuts.rda.gov.ge/api/statement/pdf/' + event.target.getAttribute("data-id"));
            // },

            getResults(page = 1) {
                this.loader_table = true;

                axios.get("/statement/list?page=" + page, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.statements = response.data;
                    this.loader_table = false;
                }).catch(err => {
                    console.log(err);
                    this.loader_table = true;
                });
            }
        },

        mounted() {
            document.title = "განაცხადები";
            
            this.getResults();

            axios.get("/operator/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.operators = response.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
</script>