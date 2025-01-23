<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-6 col-xs-12 col-sm-12">
                <div class="card bg-white rounded p-5 border-0 rounded-5 mt-5">
                    <div class="header-logo">
                        <img src="../assets/RDA-Logo-Geo.png" />
                    </div>
                    <form @submit.prevent="signup()" class="row g-3">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="company_name" class="fw-bold">კომპანიის დასახელება</label>
                                <input type="text" v-model="formData.company_name" id="company_name" class="form-control border">
                            </div>
                            <div class="mb-3">
                                <label for="identification_code" class="fw-bold">საიდენტიფიკაციო კოდი</label>
                                <input type="number" min="0" onkeypress="if(this.value.length === 11) return false" v-model="formData.identification_code" id="identification_code" class="form-control border">
                            </div>
                            <div class="mb-3">
                                <label for="legal_address" class="fw-bold">იურიდიული მისამართი</label>
                                <input type="text" v-model="formData.legal_address" id="legal_address" class="form-control border">
                            </div>
                            <div>
                                <label for="actual_address" class="fw-bold">ფაქტობრივი მისამართი</label>
                                <input type="text" v-model="formData.actual_address" id="actual_address" class="form-control border">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="name" class="fw-bold">კომპანიის წარმომადგენლის სახელი, გვარი</label>
                                <input type="text" v-model="formData.name" id="name" class="form-control border">
                            </div>
                            <div class="mb-3">
                                <label for="personal_id" class="fw-bold">კომპანიის წარმომადგენლის პირადი ნომერი</label>
                                <input type="text" v-model="formData.personal_id" id="personal_id" onkeypress="if(this.value.length === 11) return false" class="form-control border">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="fw-bold">კომპანიის წარმომადგენლის ელ.&nbsp;ფოსტა</label>
                                <input type="email" v-model="formData.email" id="email" class="form-control border">
                            </div>
                            <div>
                                <label for="mobile" class="fw-bold">კომპანიის წარმომადგენლის ტელეფონის ნომერი</label>
                                <input type="number" min="0" onkeypress="if(this.value.length === 9) return false" v-model="formData.mobile" id="mobile" class="form-control border">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="password" class="fw-bold">პაროლი</label>
                                <input type="password" v-model="formData.password" id="password" class="form-control border">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="d-grid mb-5">
                                <button type="submit" class="btn btn-success" :disabled="disabled">
                                    რეგისტრაცია
                                    <span class="spinner-border spinner-border-sm" v-if="loader"></span>
                                </button>
                            </div>
                            <div class="mb-5">
                                <router-link to="/" class="btn btn-secondary">უკან დაბრუნება</router-link>
                            </div>
                        </div>
                    </form>
                    <div v-for="(item, index) in errors" :key="index" class="alert alert-danger border-0">
                        <strong>{{ item[0] }}</strong>
                    </div>
                </div>
            </div>
            <p class="disabled text-center text-muted mt-3">&copy;&nbsp;{{ this.year }}&nbsp;Created&nbsp;by&nbsp;<strong>RDA</strong>&nbsp;IT&nbsp;team</p>
        </div>
    </div>
</template>

<script>
    import axios, { AxiosError } from 'axios';

    export default {
        name : "SignUp",

        data() {
            return {
                year : (new Date().getFullYear() != "2024") ? "2024 - " + new Date().getFullYear() : new Date().getFullYear(),

                // formData
                formData : {
                    company_name : "",
                    identification_code : "",
                    legal_address : "",
                    actual_address : "",
                    name : "",
                    personal_id : "",
                    email : "",
                    mobile : "",
                    password : "",
                },

                errors : [],

                disabled : false,
                loader : false,
            }
        },

        methods : {
            signup() {
                this.disabled = true;
                this.loader = true;
                axios.post("/signup", this.formData).then((response) => {
                    this.$swal({
                        title : "რეგისტრაცია წარმატებით განხორციელდა",
                        icon : "success",
                        timerProgressBar: true,
                        timer : 2000,
                        toast : true,
                        position : "top-end"
                    });

                    this.disabled = false;
                    this.loader = false;

                    setTimeout(() => {
                        this.$router.push("/")
                    }, 2000);
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
            document.title = "რეგისტრაცია";
        }
    }
</script>

<style scoped>

</style>