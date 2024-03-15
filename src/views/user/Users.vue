<template>
    <div>
        <MyHeader />
        <div class="container-fluid p-5" style="margin-top: 90px">
            <div class="d-flex justify-content-between mb-3 align-items-center">
                <table class="table table-hover bg-white border rounded">
                    <thead>
                        <tr class="text-center">
                            <th>კომპანიის დასახელება</th>
                            <th>ს/კ</th>
                            <th>სახელი, გვარი</th>
                            <th>ელ. ფოსტა</th>
                            <th>ტელეფონი</th>
                            <th>პ/ნ</th>
                            <th>სტატუსი</th>
                            <th>ნებართვა</th>
                            <th>ქმედება</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" class="form-control" placeholder="დასახელება" v-model="formData.company_name">
                            </td>
                            <td>
                                <input type="number" min="0" class="form-control" placeholder="ს/კ" v-model="formData.id_code">
                            </td>
                            <td>
                                <input type="text" class="form-control" placeholder="სახელი, გვარი" v-model="formData.name">
                            </td>
                            <td>
                                <input type="email" class="form-control" placeholder="ელ. ფოსტა" v-model="formData.email">
                            </td>
                            <td>
                                <input type="number" min="0" class="form-control" placeholder="ტელეფონი" v-model="formData.mobile">
                            </td>
                            <td>
                                <input type="number" min="0" class="form-control" placeholder="პ/ნ" v-model="formData.personal_id">
                            </td>
                            <td>
                                <select class="form-select" v-model="formData.status">
                                    <option value="" selected disabled>სტატუსი</option>
                                    <option value="active">აქტიური</option>
                                    <option value="pending">არააქტიური</option>
                                    <!-- <option value="pending">დაუდასტურებელი</option> -->
                                </select>
                            </td>
                            <td>
                                <select class="form-select" v-model="formData.permission">
                                    <option value="" selected disabled>ნებართვა</option>
                                    <option value="coordinator">კოორდინატორი</option>
                                    <option value="company">კომპანია</option>
                                    <option value="operator">ოპერატორი</option>
                                </select>
                            </td>
                            <td>
                                <button type="button" class="btn btn-success w-100" :disabled="disabled" @click="searchUser">
                                    <span class="spinner-border spinner-border-sm" v-if="loader"></span>
                                    <span v-else><BIconSearch /></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex justify-content-between mb-3 align-items-center">
                <h4 class="text-muted">მომხმარებლის მართვა</h4>

                <router-link to="/user/add" class="btn btn-success">ოპერატორის დამატება</router-link>
            </div>

            <table class="table table-hover bg-white border rounded">
                <thead>
                    <tr class="text-center">
                        <th>ID</th>
                        <th>კომპანიის დასახელება</th>
                        <th>ს/კ</th>
                        <th>სახელი, გვარი</th>
                        <th>ელ. ფოსტა</th>
                        <th>ტელეფონი</th>
                        <th>პ/ნ</th>
                        <th>სტატუსი</th>
                        <th>ნებართვა</th>
                        <th>ქმედება</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center" v-for="(data, index) in users.data" :key="data.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ data.company_name }}</td>
                        <td>{{ data.identification_code }}</td>
                        <td>{{ data.name }}</td>
                        <td>{{ data.email }}</td>
                        <td>{{ data.mobile }}</td>
                        <td>{{ data.personal_id }}</td>
                        <td>{{ (data.status == 'pending') ? 'არააქტიური' : 'აქტიური' }}</td>
                        <td>{{ (data.permission == 'company') ? 'კომპანია' : (data.permission == 'coordinator') ? 'კოორდინატორი' : 'ოპერატორი' }}</td>
                        <td>
                            <router-link :to="'/user/edit/' + data.id" type="button" class="btn btn-warning" v-tippy="{ content: 'რედაქტირება' }">
                                <BIconPencilSquare style="pointer-events: none" />
                            </router-link>
                            <button type="button" class="btn btn-success ms-2" v-tippy="{ content: 'ავტორიზაციის დადასტურება' }" :data-user-id="data.id" @click="authorize($event)">
                                <BIconCheckCircle style="pointer-events: none" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination v-model="page" :records="Number(users.total)" :per-page="Number(users.per_page)" @paginate="getUsers"/>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/Header.vue";
    import axios from "axios";
    import Pagination from 'v-pagination-3';

    export default {
        name : "UsersGrid",

        components : {
            MyHeader,
            Pagination
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
                loader : false,

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
                }).catch(err => {
                    console.log(err);
                })
            },

            searchUser() {
                this.disabled = true;
                this.loader = true;
                
                axios.post("/search/user", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.users = response.data;
                    this.disabled = false;
                    this.loader = false;
                }).catch(err => {
                    console.log(err);
                    this.disabled = false;
                    this.loader = false;
                });
            }
        },

        mounted() {
            document.title = "მომხმარებლები";

            this.getUsers();
        }
    }
</script>