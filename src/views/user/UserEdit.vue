<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 90px">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-6 col-xs-12 col-sm-12 bg-white rounded p-5 border mt-5">
                    <h4 class="text-secondary text-center mb-5">მომხმარებლის რედაქტირება</h4>
                    <form @submit.prevent="edit()" class="row g-3 needs-validation" novalidate>
                        <div class="col-md-6">
                            <div class="mb-3 has-validation">
                                <label for="company_name">კომპანიის დასახელება</label>
                                <input type="text" v-model="formData.company_name" id="company_name" class="form-control border" required>
                                <h1 class="invalid-feedback">სავალი დასაპოვებელია</h1>
                            </div>
                            <div class="mb-3">
                                <label for="identification_code">საიდენტიფიკაციო კოდი</label>
                                <input type="number" v-model="formData.identification_code" id="identification_code" class="form-control border">
                            </div>
                            <div class="mb-3">
                                <label for="legal_address">იურიდიული მისამართი</label>
                                <input type="text" v-model="formData.legal_address" id="legal_address" class="form-control border">
                            </div>
                            <div class="">
                                <label for="actual_address">ფაქტობრივი მისამართი</label>
                                <input type="text" v-model="formData.actual_address" id="actual_address" class="form-control border">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="name">კომპანიის წარმომადგენლის სახელი, გვარი</label>
                                <input type="text" v-model="formData.name" id="name" class="form-control border">
                            </div>
                            <div class="mb-3">
                                <label for="personal_id">კომპანიის წარმომადგენლის პირადი ნომერი</label>
                                <input type="text" v-model="formData.personal_id" id="personal_id" class="form-control border">
                            </div>
                            <div class="mb-3">
                                <label for="email">კომპანიის წარმომადგენლის ელ.&nbsp;ფოსტა</label>
                                <input type="email" v-model="formData.email" id="email" class="form-control border">
                            </div>
                            <div class="">
                                <label for="mobile">კომპანიის წარმომადგენლის ტელეფონის ნომერი</label>
                                <input type="number" v-model="formData.mobile" id="mobile" class="form-control border">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="password">პაროლი</label>
                                <input type="password" v-model="formData.password" id="password" class="form-control border">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="d-grid mb-5">
                                <button type="submit" class="btn btn-success" :disabled="disabled">
                                    რედაქტირება
                                    <span class="spinner-border spinner-border-sm" v-if="loader"></span>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div v-for="(item, index) in errors" :key="index" class="alert alert-danger">
                        <strong>{{ item[0] }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios, { AxiosError } from 'axios';
    import MyHeader from "../../components/Header.vue";

    export default {
        name : "UserEdit",

        components : {
            MyHeader,
        },

        data() {
            return {
                // formData
                formData : {

                },

                errors : [],

                disabled : false,
                loader : false,
            }
        },

        methods : {
            edit() {
                this.disabled = true;
                this.loader = true;
                
                axios.put("/user/edit/" + this.$route.params.id, this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then((response) => {
                    this.$swal({
                        title : "რედაქტირება განხორციელდა",
                        icon : "success",
                    });
                    
                    this.disabled = false;
                    this.loader = false;
                }).catch((err) => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }

                    this.disabled = false;
                    this.loader = false;
                });
            }
        },

        mounted() {
            document.title = "მომხმარებლის რედაქტირება";

            axios.get("/user/get/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then((response) => {
                this.formData = response.data;
            }).catch((err) => {
                console.log(err);
            });
        }
    }
</script>