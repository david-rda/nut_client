<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 120px">
            <div class="row justify-content-between mb-3 align-items-center">
                <table class="table bg-white border rounded">
                    <thead>
                        <tr class="text-center">
                            <th>კომპანია</th>
                            <th>მაღაზიის მისამართი</th>
                            <th>ზედნადების ნომერი</th>
                            <th>ზედნადების თარიღი</th>
                            <th>სახელი, გვარი</th>
                            <th>ჯამური თანხა</th>
                            <th>ბარათის ნომერი</th>
                            <th>სტატუსი</th>
                            <th>ქმედება</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" class="form-control" placeholder="კომპანიის სახელი" v-model="formData.company_name">
                            </td>
                            <td>
                                <input type="text" class="form-control" placeholder="მაღაზიის მისამართი" v-model="formData.store_address">
                            </td>
                            <td>
                                <input type="text" class="form-control" placeholder="ზედნადების ნომერი" v-model="formData.overhead_number">
                            </td>
                            <td>
                                <flat-pickr class="form-control border" id="datetime-picker" :config="flatpickrOptions" v-model="formData.overhead_date"></flat-pickr>
                            </td>
                            <td>
                                <input type="email" class="form-control" placeholder="სახელი, გვარი" v-model="formData.beneficiary_name">
                            </td>
                            <td>
                                <input type="number" min="0" class="form-control" placeholder="ჯამური თანხა" v-model="formData.full_amount">
                            </td>
                            <td>
                                <input type="number" placeholder="ბოლო 4 ციფრი" min="0" onkeypress="if(this.value.length == 4) return false" class="form-control" v-model="formData.card_number">
                            </td>
                            <td>
                                <select class="form-select" v-model="formData.status">
                                    <option value="" selected disabled>სტატუსი</option>
                                    <option value="operator" v-if="user.permission != 'company'">გადაწერილია ოპერატორზე</option>
                                    <option value="new">ახალი</option>
                                    <option value="rejected">დახარვეზებული</option>
                                    <option value="stopped">შეჩერებული</option>
                                    <option value="approved">დადასტურებული</option>
                                </select>
                            </td>
                            <td>
                                <button type="button" class="btn btn-success w-100" :disabled="disabled" @click="searchOverhead">
                                    <span class="spinner-border spinner-border-sm" v-if="loader"></span>
                                    <span v-else><BIconSearch /></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex w-100 justify-content-between align-items-center mb-3">
                <h4 class="text-muted">განაცხადები</h4>

                <router-link to="/statement/add" class="btn btn-success" v-if="permission == 'company'">ზედნადების დამატება</router-link>
            </div>
            
            <div class="row justify-content-center mb-3">
                <span class="spinner-border spinner-border" v-if="loader_table"></span>
            </div>

            <div class="row" v-if="loader_table == false">
                <table class="table table-hover bg-white border rounded">
                    <thead>
                        <tr class="text-center">
                            <th class="text-center" v-if="permission == 'coordinator'">
                                <input type="checkbox" @change="selectAllStatements" v-model="selectAll">
                            </th>
                            <th>კომპანია</th>
                            <th>მაღაზიის მისამართი</th>
                            <th>ზედნადების ნომერი</th>
                            <th>ზედნადების თარიღი</th>
                            <th>სახელი, გვარი</th>
                            <th>ჯამური თანხა</th>
                            <th>ბარათის ნომერი</th>
                            <th>სტატუსი</th>
                            <th>ქმედება</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="data in statements.data" :key="data.id">
                            <td v-if="permission == 'coordinator'">
                                <input type="checkbox" v-model="selectedStatements" :value="data.id">
                            </td>
                            <td>{{ data?.company_name }}</td>
                            <td>{{ data?.store_address }}</td>
                            <td>{{ data?.overhead_number }}</td>
                            <td>{{ data?.overhead_date }}</td>
                            <td>{{ data?.beneficiary_name }}</td>
                            <td>{{ data?.full_amount }}</td>
                            <td>{{ data?.card_number }}</td>
                            <td>
                                {{ (data?.status == "new") ? 'ახალი' : (data?.status == "operator" && permission != 'company') ? 'გადაწერილია ოპერატორზე' : (data?.status == "rejected") ? 'დახარვეზებული' : (data?.status == "stopped") ? 'შეჩერებული' : (data?.status == "approved") ? 'დადასტურებული' : '' }}
                                <span v-if="data.status == 'operator' && permission != 'company'" class="badge bg-primary">{{ data?.operator.name }}</span>
                            </td>
                            <td class="d-flex gap-1">
                                <router-link :to="'/statement/read/' + data?.id" type="button" class="btn btn-success" v-tippy="{ content: 'დათვალიერება' }">
                                    <BIconTicketDetailed style="pointer-events:none" />
                                </router-link>
                                <button type="button" v-tippy="{ content: 'დოკუმენტის ნახვა' }" :data-id="data?.id" class="btn btn-warning" @click="viewPdf">
                                    <BIconFilePdf style="pointer-events:none" />
                                </button>
                                <router-link :to="'/statement/edit/' + data?.id" type="button" class="btn btn-success" v-tippy="{ content: 'რედაქტირება' }" v-if="data?.status == 'rejected' && permission == 'company'">
                                    <BIconPencilSquare style="pointer-events:none" />
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="col-4" v-if="permission == 'coordinator'">
                    <div class="d-flex">
                        <select class="form-select mb-3" v-model="operator">
                            <option value="" disabled selected>აირჩიეთ ოპერატორი</option>
                            <option :value="item.id" v-for="(item, index) in operators" :key="index">{{ item.name }}</option>
                        </select>
                        <button type="button" @click="changeStatus" class="btn btn-success mb-2 ms-3" style="height: 39px">გადაწერა</button>
                    </div>
                </div>
                <Pagination v-model="page" :records="Number(statements.total)" :per-page="Number(statements.per_page)" @paginate="getResults" :hideCount="true" />
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import MyHeader from "../../components/Header.vue";
    import FlatPickr from "vue-flatpickr-component";
    import 'flatpickr/dist/flatpickr.css';
    import Pagination from 'v-pagination-3';

    export default {
        name : "DashBoard",

        components : {
            MyHeader,
            FlatPickr,
            Pagination
        },
        
        data() {
            return {
                statements : [],
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                user : JSON.parse(window.localStorage.getItem("user")),
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

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
                loader : false,
                loader_table : false,

                page : 1,

                operators : [],
                operator : ""
            }
        },

        methods : {
            searchOverhead() {
                this.disabled = true;
                this.loader = true;
                this.loader_table = true;

                axios.post("/statement/search", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.statements = response.data;
                    this.disabled = false;
                    this.loader = false;
                    this.loader_table = false;
                }).catch(err => {
                    console.log(err);
                    this.disabled = false;
                    this.loader = false;
                    this.loader_table = false;
                });
            },

            changeStatus() {
                axios.post("/statement/change/massive", {
                    operator_id : this.operator,
                    statements : this.selectedStatements
                }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.$swal({
                        title : "მოთხოვნა შესრულდა",
                        icon : "success",
                    });
                }).catch(err => {
                    console.log(err);
                });
            },

            selectAllStatements() {
                if (this.selectAll) {
                    this.selectedStatements = this.statements.data.map(item => item.id);
                } else {
                    this.selectedStatements = [];
                }
            },

            viewPdf(event) {
                window.open('https://nuts.rda.gov.ge/api/statement/pdf/' + event.target.getAttribute("data-id"));
            },

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

<style scoped>
    .VuePagination p  {
        display: none !important;
    }
</style>