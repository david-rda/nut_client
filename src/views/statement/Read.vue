<template>
    <div>
        <MyHeader />

        <div class="container-fluid" style="margin-top: 84.5px">
            <div class="row justify-content-center mb-3">
                <span class="spinner-border spinner-border" v-if="loader_table"></span>
            </div>

            <div class="row vh-100" v-if="loader_table == false">
                <div class="col-6">
                    <div class="container">
                        <div class="d-flex justify-content-between">
                            <h1 class="d-inline-block">განაცხადი</h1>
                            <button :class="(data.status == 'approved') ? 'btn btn-success' : (data.status == 'rejected') ? 'btn btn-danger' : (data.status == 'stopped') ? 'btn btn-warning' : (data.status == 'new') ? 'btn btn-primary' : (data.status == 'new') ? 'btn btn-info' : ''">
                                {{ 
                                    (data.status == 'approved' ? 'დადასტურებული' : 
                                    (data.status == 'rejected' ? 'უარყოფილი' : 
                                    (data.status == 'stopped') ? 'შეჩერებული' : 
                                    (data.status == 'new') ? 'ახალი' : 
                                    (data.status == 'new') ? 'განსახილველი' : ''))
                                }}
                            </button>
                        </div>
                        <p><strong>ბენეფიციარის სახელი, გვარი:</strong> {{ data.beneficiary_name }}</p>
                        <p><strong>ზედნადების ნომერი:</strong> {{ data.overhead_number }}</p>
                        <p><strong>ზედნადების თარიღი:</strong> {{ data.overhead_date }}</p>
                        <p><strong>მაღაზიის მისამართი:</strong> {{ data.store_address }}</p>
                        <p><strong>ბარათის ბოლო 4 ციფრი:</strong> {{ data.card_number }}</p>
                        <p><strong>ჯამური თანხა:</strong> {{ data.full_amount }}</p>

                        <hr>

                        <table class="table table-bordered bg-white border rounded-5">
                            <thead>
                                <tr>
                                    <th>პროდუქტი</th>
                                    <th>ფასი</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in data.statement_products" :key="index">
                                    <td>{{ item.products?.name }} </td>
                                    <td>{{ item.price }} </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="card p-3" v-if="permission == 'coordinator'">
                            <h5 class="text-center text-muted">ოპერატორზე გადაწერა</h5>
                            <div class="col-12">
                                <select class="form-select mb-3" v-model="operator">
                                    <option value="" disabled selected>აირჩიეთ ოპერატორი</option>
                                    <option :value="item.id" v-for="(item, index) in operators" :key="index">{{ item.name }}</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <button type="button" @click="changeStatus" class="btn btn-success">გადაწერა</button>
                            </div>
                        </div>

                        <div class="card p-3" v-if="permission == 'operator'">
                            <div class="col-12">
                                <select class="form-select mb-3" v-model="status">
                                    <option value="" disabled selected>აირციეთ სტატუსი</option>
                                    <option value="approved">დადასტურებული</option>
                                    <option value="rejected">უარყოფილი</option>
                                    <option value="stopped">შეჩერებული</option>
                                </select>
                            </div>

                            <div v-if="status == 'rejected' || status == 'stopped'">
                                <div class="col-12 mb-3">
                                    <textarea style="resize:none" class="form-control" placeholder="კომენტარი" v-model="comment"></textarea>
                                </div>
                            </div>
                            <div class="col-12 mb-3">
                                <button type="button" @click="changeStatus" class="btn btn-success">შენახვა</button>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" v-if="permission == 'coordinator'">ქმედებათა ისტორია&nbsp;<BIconClockHistory /></button>
                            </div>
                        </div>

                        <div class="card p-3 mb-3" v-if="permission == 'company'">
                            <div v-if="status == 'rejected' || status == 'stopped'">
                                <div class="col-12 mb-3">
                                    <textarea style="resize:none" :value="data.comment" class="form-control" placeholder="კომენტარი" disabled>
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" v-if="permission == 'coordinator'">ქმედებათა ისტორია&nbsp;<BIconClockHistory /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <iframe width="100%" height="100%" :src="'https://nuts.rda.gov.ge/api/statement/pdf/' + this.$route.params.id"></iframe>
                </div>
            </div>
        </div>
        <div class="offcanvas offcanvas-start w-50" id="offcanvasExample">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="staticBackdropLabel">ისტორია&nbsp;<BIconClockHistory /></h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ოპერატორი</th>
                            <th>კომენტარი</th>
                            <th>თარიღი</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in data.logs" :key="index">
                            <td>{{ item.operator_data.name }}</td>
                            <td>{{ item.comment }}</td>
                            <td>{{ item.created_at.split('T')[0] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/Header.vue";
    import axios from "axios";

    export default {
        name : "StatementRead",

        components : {
            MyHeader,
        },

        data() {
            return {
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

                data : [],

                operators : [],
                operator : "",
                comment : "",
                status : "",

                loader_table : false
            }
        },

        mounted() {
            document.title = "განაცხადი";

            this.loader_table = true;

            axios.get("/statement/get/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.data = response.data;
                this.status = response.data.status;
                this.loader_table = false;
            }).catch(err => {
                console.log(err);
                this.loader_table = false;
            });

            axios.get("/operator/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.operators = response.data;
            }).catch(err => {
                console.log(err);
            })
        },

        methods : {
            changeStatus() {
                axios.put("/statement/change/status/" + this.$route.params.id, {
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
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
