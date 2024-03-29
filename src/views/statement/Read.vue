<template>
    <div>
        <MyHeader />

        <div class="container-fluid" style="margin-top: 75px">
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
                                    (data.status == 'rejected' ? 'დახარვეზებული' : 
                                    (data.status == 'stopped') ? 'შეჩერებული' : 
                                    (data.status == 'new') ? 'ახალი' : 
                                    (data.status == 'new') ? 'განსახილველი' : ''))
                                }}
                            </button>
                        </div>
                        <p><strong>კომპანიის სახელი:</strong> {{ data.company_name }}</p>
                        <p><strong>მაღაზიის მისამართი:</strong> {{ data.store_address }}</p>
                        <p><strong>ზედნადების ნომერი:</strong> {{ data.overhead_number }}</p>
                        <p><strong>ზედნადების თარიღი:</strong> {{ data.overhead_date }}</p>
                        <p><strong>აგრობარათის მფლობელი:</strong> {{ data.beneficiary_name }}</p>
                        <p><strong>აგრობარათის ბოლო 4 ციფრი:</strong> {{ data.card_number }}</p>
                        <p><strong>ჯამური აგროქულა:</strong> {{ data.full_amount }}</p>

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

                        <div class="card p-3" style="height: 400px !important" v-if="permission == 'operator'">
                            <div class="row">
                                <div class="col-12">
                                    <select class="form-select mb-3" v-model="status">
                                        <option value="" disabled selected>აირჩიეთ სტატუსი</option>
                                        <option value="approved">დადასტურებული</option>
                                        <option value="rejected">დახარვეზებული</option>
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
                                <div class="form-group mb-3">
                                    <button type="button" class="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" v-if="permission == 'coordinator'">ქმედებათა ისტორია&nbsp;<BIconClockHistory /></button>
                                </div>

                                <h6 class="text-muted text-center">ისტორია</h6>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th v-if="permission != 'company'">ოპერატორი</th>
                                            <th>კომენტარი</th>
                                            <th>თარიღი</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in data.logs" :key="index">
                                            <td v-if="permission != 'company'">{{ item.operator_data?.name }}</td>
                                            <td>{{ item.comment }}</td>
                                            <td>{{ item.created_at.split('T')[0] }}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div v-for="(item, index) in errors" :key="index" class="alert alert-danger">
                                    <strong>{{ item[0] }}</strong>
                                </div>
                            </div>
                        </div>

                        <div class="card p-3 mb-3" v-if="permission == 'company'">
                            <div v-if="status == 'rejected' || status == 'stopped'">
                                <div class="col-12 mb-3">
                                    <p class="mb-1">კომენტარი</p>
                                    <textarea style="resize:none" :value="data.comment" class="form-control" placeholder="კომენტარი" disabled></textarea>
                                </div>
                            </div>

                            <h6 class="text-muted text-center">ისტორია</h6>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th v-if="permission != 'company'">ოპერატორი</th>
                                            <th>კომენტარი</th>
                                            <th>თარიღი</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in data.logs" :key="index">
                                            <td v-if="permission != 'company'">{{ item.operator_data?.name }}</td>
                                            <td>{{ item.comment }}</td>
                                            <td>{{ item.created_at.split('T')[0] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                        <div class="card p-3 mb-3" v-if="permission == 'coordinator'">
                            <div class="form-group">
                                <button type="button" class="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">ქმედებათა ისტორია&nbsp;<BIconClockHistory /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6" v-if="pdfUrl.name.split('.')[1] == 'pdf'">
                    <iframe :src="'data:application/pdf;base64,' + pdfUrl.file" type="application/pdf" width="100%" height="100%" :title="title"></iframe>
                </div>
                <div class="col-6" v-if="pdfUrl.name.split('.')[1] == 'jpg' || pdfUrl.name.split('.')[1] == 'jpeg'">
                    <img :src="'data:image/jpg;base64,' + pdfUrl.file" width="100%" height="100%" :title="title">
                </div>
                <div class="col-6" v-if="pdfUrl.name.split('.')[1] == 'png'">
                    <img :src="'data:image/png;base64,' + pdfUrl.file" width="100%" height="100%" :title="title">
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
                            <th v-if="permission != 'company'">ოპერატორი</th>
                            <th>კომენტარი</th>
                            <th>თარიღი</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in data.logs" :key="index">
                            <td v-if="permission != 'company'">{{ item.operator_data?.name }}</td>
                            <td>{{ item.comment }}</td>
                            <td>{{ item.created_at.split('T')[0] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal fade" id="confirmationModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">გთხოვთ დაადასტუროთ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ნამდვიად გსურთ წაშლა?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">არა</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteProduct">კი</button>
                    </div>
                </div>
            </div>
        </div>
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
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

                data : [],

                operators : [],
                operator : "",
                comment : "",
                status : "",

                pdfUrl : "",
                title : "",

                errors : [],

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
                this.title = response.data.files.name;

                this.pdfUrl = response.data.files;

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
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }
                });
            }
        }
    }
</script>
