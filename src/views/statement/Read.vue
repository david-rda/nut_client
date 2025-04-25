<template>
    <div>
        <MyHeader />

        <div class="w-full h-screen pt-19">
            <div class="h-full md:grid md:grid-cols-2">
                <div class="p-3 h-full">
                    <div class="container">
                        <button :class="(data.status == 'approved') ? 'p-3 bg-green-100 text-green-900 rounded-md' : (data.status == 'rejected') ? 'p-3 bg-red-100 text-red-900 rounded-md' : (data.status == 'stopped') ? 'p-3 bg-yellow-100 text-yellow-900 rounded-md' : (data.status == 'new') ? 'p-3 bg-blue-100 text-blue-900 rounded-md' : 'p-3 bg-blue-100 text-blue-900 rounded-md'">
                            {{ 
                                (data.status == 'approved' ? 'დადასტურებული' : 
                                (data.status == 'rejected' ? 'დახარვეზებული' : 
                                (data.status == 'stopped') ? 'შეჩერებული' : 
                                (data.status == 'new') ? 'ახალი' : 'გადაწერილია ოპერატორზე'))
                            }}
                        </button>

                        <table class="w-full text-sm text-gray-500 text-gray-400 rounded-lg overflow-hidden mt-5">
                            <tbody>
                                <tr>
                                    <td class="px-4 py-2 font-semibold text-gray-900 border-r border-r-gray-200 bg-white">კომპანიის სახელი:</td>
                                    <td class="px-4 py-2 bg-white">{{ data.company_name }}</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 font-semibold text-gray-900 border-r border-r-gray-200 bg-white">მაღაზიის მისამართი:</td>
                                    <td class="px-4 py-2 bg-white">{{ data.store_address }}</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 font-semibold text-gray-900 border-r border-r-gray-200 bg-white">ზედნადების ნომერი:</td>
                                    <td class="px-4 py-2 bg-white">{{ data.overhead_number }}</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 font-semibold text-gray-900 border-r border-r-gray-200 bg-white">ზედნადების თარიღი:</td>
                                    <td class="px-4 py-2 bg-white">{{ data.overhead_date }}</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 font-semibold text-gray-900 border-r border-r-gray-200 bg-white">აგრობარათის მფლობელი:</td>
                                    <td class="px-4 py-2 bg-white">{{ data.beneficiary_name }}</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 font-semibold text-gray-900 border-r border-r-gray-200 bg-white">აგრობარათის ბოლო 4 ციფრი:</td>
                                    <td class="px-4 py-2 bg-white">{{ data.card_number }}</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 font-semibold text-gray-900 border-r border-r-gray-200 bg-white">ჯამური აგროქულა:</td>
                                    <td class="px-4 py-2 bg-white">{{ parseFloat(data.full_amount).toFixed(2) }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="w-full text-sm text-gray-500 text-gray-400 rounded-lg overflow-hidden mt-12">
                            <thead class="text-xs text-gray-700 bg-gray-50">
                                <tr class="text-black text-sm text-center">
                                    <th class="px-6 py-3 text-left font-semibold">პროდუქტი</th>
                                    <th class="px-6 py-3 text-left font-semibold">ფასი</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in data.statement_products" :key="index" class="bg-white text-black">
                                    <td class="px-6 py-4">{{ item.name }}</td>
                                    <td class="px-6 py-4">{{ parseFloat(item.price).toFixed(2) }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="p-3 mt-3 bg-white rounded-md" v-if="permission == 'operator'">
                            <select class="mb-3 w-full p-2 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:ring-1 ring-offset-2 ring-green-900 disabled:opacity-20" v-model="status">
                                <option value="" disabled selected>აირჩიეთ სტატუსი</option>
                                <option value="approved">დადასტურებული</option>
                                <option value="rejected">დახარვეზებული</option>
                                <option value="stopped">შეჩერებული</option>
                            </select>

                            <div v-if="status == 'rejected' || status == 'stopped'">
                                <div class="mb-3">
                                    <textarea class="w-full p-2 border-1 border-gray-200 outline-none rounded-lg transition duration-200 focus:ring-1 ring-offset-2 ring-green-900 disabled:opacity-20 resize-none" placeholder="კომენტარი" v-model="comment"></textarea>
                                </div>
                            </div>
                            <div class="mb-3">
                                <button type="button" @click="changeStatus" class="p-2 text-white bg-green-900 transition duration-200 hover:bg-green-800 rounded-md cursor-pointer w-1/6 disabled:opacity-20 disabled:cursor-not-allowed" :disabled="disabled">შენახვა</button>
                            </div>
                            <div class="mb-3">
                                <button type="button" class="p-3 bg-gray-100 text-gray-900 rounded-md cursor-pointer" v-if="permission == 'coordinator'">ქმედებათა ისტორია&nbsp;<BIconClockHistory /></button>
                            </div>

                            <h6 class="select-none mt-10">ისტორია</h6>

                            <table class="w-full text-sm text-gray-500 text-gray-400 rounded-lg overflow-hidden">
                                <thead class="text-xs text-gray-700 bg-gray-50">
                                    <tr class="text-black text-sm text-center">
                                        <th v-if="permission != 'company'" class="px-6 py-3 text-left font-semibold">ოპერატორი</th>
                                        <th class="px-6 py-3 text-left font-semibold">კომენტარი</th>
                                        <th class="px-6 py-3 text-left font-semibold">თარიღი</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data.logs" :key="index" class="bg-white text-black">
                                        <td v-if="permission != 'company'" class="px-6 py-4">{{ item.operator_data?.name }}</td>
                                        <td class="px-6 py-4">{{ item.comment }}</td>
                                        <td class="px-6 py-4">{{ item.created_at.split('T')[0] }}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div v-for="(item, index) in errors" :key="index" class="alert alert-danger border-0">
                                <strong>{{ item[0] }}</strong>
                            </div>
                        </div>

                        <div class="p-3 mb-3" v-if="permission == 'company'">
                            <div v-if="status == 'rejected' || status == 'stopped'">
                                <div class="mb-3">
                                    <p class="mb-1">კომენტარი</p>
                                    <div class="w-full p-3 bg-gray-200 rounded-md select-none">{{ data.comment }}</div>
                                </div>
                            </div>

                            <h6 class="select-none">ისტორია</h6>

                            <table class="w-full text-sm text-gray-500 text-gray-400 rounded-lg overflow-hidden">
                                <thead class="text-xs text-gray-700 bg-gray-50">
                                    <tr class="text-black text-sm text-center">
                                        <th v-if="permission != 'company'" class="px-6 py-3 text-left font-semibold">ოპერატორი</th>
                                        <th class="px-6 py-3 text-left font-semibold">კომენტარი</th>
                                        <th class="px-6 py-3 text-left font-semibold">თარიღი</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data.logs" :key="index" class="bg-white text-black">
                                        <td v-if="permission != 'company'">{{ item.operator_data?.name }}</td>
                                        <td class="px-6 py-4">{{ item.comment }}</td>
                                        <td class="px-6 py-4">{{ item.created_at.split('T')[0] }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="mb-3 mt-3" v-if="permission == 'coordinator'">
                            <button type="button" class="p-3 bg-gray-200 text-gray-900 rounded-md cursor-pointer flex items-center gap-2 transition duration-200 hover:bg-gray-300" @click="offcanvasToggle()">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                ქმედებათა ისტორია
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="this.pdfUrl" class="h-full">
                    <div class="h-full" v-if="pdfUrl?.name?.split('.').at(-1) == 'pdf'">
                        <iframe :src="'data:application/pdf;base64,' + pdfUrl.file" type="application/pdf" width="100%" height="100%" :title="title"></iframe>
                    </div>
                    <div class="h-full" v-if="pdfUrl?.name?.split('.').at(-1) == 'jpg' || pdfUrl.name?.split('.').at(-1) == 'jpeg'">
                        <img :src="'data:image/jpg;base64,' + pdfUrl.file" width="100%" height="100%" :title="title">
                    </div>
                    <div class="h-full" v-if="pdfUrl?.name?.split('.').at(-1) == 'png'">
                        <img :src="'data:image/png;base64,' + pdfUrl.file" width="100%" height="100%" :title="title">
                    </div>
                </div>
            </div>
        </div>

        <Transition name="fade">
            <div class="fixed md:w-1/4 w-full h-full bg-white shadow-xl top-0 left-0 overflow-y-scroll" v-if="open_offcanvas">
                <div class="flex items-center justify-between p-4">
                    <h5 class="text-lg flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        ისტორორია
                    </h5>
                    <button type="button" class="p-3 bg-gray-100 transition duration-200 hover:bg-gray-200 rounded-md cursor-pointer" @click="offcanvasToggle()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <table class="table-auto w-full text-left">
                        <thead>
                            <tr>
                                <th v-if="permission != 'company'" class="px-4 py-2">ოპერატორი</th>
                                <th class="px-4 py-2">კომენტარი</th>
                                <th class="px-4 py-2">თარიღი</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in data.logs" :key="index" class="border-t">
                                <td v-if="permission != 'company'" class="px-4 py-2">{{ item.operator_data?.name }}</td>
                                <td class="px-4 py-2">{{ item.comment }}</td>
                                <td class="px-4 py-2">{{ item.created_at.split('T')[0] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
    import MyHeader from "../../components/Header.vue";
    import axios, { AxiosError } from "axios";

    export default {
        name : "StatementRead",

        components : {
            MyHeader,
        },

        data() {
            return {
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

                data : [],

                operators : [],
                operator : "",
                comment : "",
                status : "",

                pdfUrl : "",
                title : "",

                open_offcanvas : false,
                disabled : false,

                errors : [],
            }
        },

        mounted() {
            document.title = "განაცხადი";

            axios.get("/statement/get/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.data = response.data;
                this.status = response.data.status;
                this.title = response.data.files.name;

                this.pdfUrl = response.data.files;
            }).catch(err => {
                console.log(err);
            });

            axios.get("/operator/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.operators = response.data;
            }).catch(err => {
                console.log(err);
            });
        },

        methods : {
            changeStatus() {
                this.disabled = true;

                const _this_ = this;
                axios.post("/statement/change/status/" + this.$route.params.id, {
                    operator_id : this.operator,
                    comment : this.comment,
                    status : this.status,
                }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.$swal({
                        title : "მოთხოვნა შესრულდა",
                        icon : "success",
                    });

                    _this_.disabled = false;
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }
                    _this_.disabled = false;
                });
            },

            offcanvasToggle() {
                this.open_offcanvas = !this.open_offcanvas;
            },
        },
    }
</script>