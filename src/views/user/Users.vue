<template>
    <div>
        <MyHeader />
        <div class="container-fluid p-5" style="margin-top: 90px">
            <div class="d-flex justify-content-between mb-3 align-items-center">
                <table class="table">
                    <thead>
                        <tr class="text-center">
                            <th>დასახელება</th>
                            <th>ს/კ</th>
                            <th>სახელი, გვარი</th>
                            <th>ელ. ფოსტა</th>
                            <th>ტელეფონი</th>
                            <th>პ/ნ</th>
                            <th>სტატუსი</th>
                            <th>ფერმიშენი</th>
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
                                    <option value="inactive">არააქტიური</option>
                                    <option value="pending">pending</option>
                                </select>
                            </td>
                            <td>
                                <select class="form-select" v-model="formData.permission">
                                    <option value="" selected disabled>წვდომა</option>
                                    <option value="coordinator">კოორდინატორი</option>
                                    <option value="company">კომპანია</option>
                                    <option value="operator">ოპერატორი</option>
                                </select>
                            </td>
                            <td><button type="button" class="btn btn-success" @click="searchUser">ძებნა</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex justify-content-between mb-3 align-items-center">
                <h4 class="text-muted">მოხმარებლების მართვა</h4>

                <router-link to="/user/add" class="btn btn-success">ოპერატორის დამატება</router-link>
            </div>

            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr class="text-center">
                            <th>ID</th>
                            <th>დასახელება</th>
                            <th>ს/კ</th>
                            <th>სახელი, გვარი</th>
                            <th>ელ. ფოსტა</th>
                            <th>ტელეფონი</th>
                            <th>პ/ნ</th>
                            <th>სტატუსი</th>
                            <th>ფერმიშენი</th>
                            <th>ქმედება</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="data in users" :key="data.id">
                            <td>{{ data.id }}</td>
                            <td>{{ data.company_name }}</td>
                            <td>{{ data.identification_code }}</td>
                            <td>{{ data.name }}</td>
                            <td>{{ data.email }}</td>
                            <td>{{ data.mobile }}</td>
                            <td>{{ data.personal_id }}</td>
                            <td>{{ data.status }}</td>
                            <td>{{ data.permission }}</td>
                            <td>
                                <router-link :to="'/user/edit/' + data.id" type="button" class="btn btn-warning">რედაქტირება</router-link>
                            </td>
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
                }
            }
        },

        methods : {
            searchUser() {
                axios.post("/search/user", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.users = response.data.data;
                }).catch(err => {
                    console.log(err);
                });
            }
        },

        mounted() {
            axios.get("/user/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.users = response.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
</script>

<style scoped>
    @font-face {
        font-family: "frutiger_geo_regular";
        src: url("../../fonts/Linotype - Neue Frutiger Georgian Regular.otf");
    }

    * {
        font-family: "frutiger_geo_regular";
        box-sizing: border-box;
    }

</style>