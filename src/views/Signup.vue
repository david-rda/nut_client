<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-6 col-xs-12 col-sm-12 bg-white rounded p-5 border mt-5">
                <div class="header-logo">
                    <img src="../assets/RDA-Logo-Geo.png" />
                </div>
                <form @submit.prevent="signup()" class="row g-3">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="company_name">კომპანიის დასახელება</label>
                            <input type="text" v-model="formData.company_name" id="company_name" class="form-control border">
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
                            <button type="submit">რეგისტრაცია</button>
                        </div>
                        <div class="mb-5">
                            <router-link to="/" class="btn btn-secondary">უკან დაბრუნება</router-link>
                        </div>
                    </div>
                </form>
                <div v-for="(item, index) in errors" :key="index" class="alert alert-danger">
                    <strong>{{ item[0] }}</strong>
                </div>
            </div>
            <p class="disabled text-center text-muted mt-3">&copy;&nbsp;2024&nbsp;{{ this.year }}&nbsp;Created&nbsp;by&nbsp;<strong>RDA</strong>&nbsp;IT&nbsp;team</p>
        </div>
    </div>
</template>

<script>
    import axios, { AxiosError } from 'axios';

    export default {
        name : "SignUp",

        data() {
            return {
                show : false,
                loading : true,
                year : "",

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

                email_validate : 0,
                password_validate : 0,

                errors : []
            }
        },

        methods : {
            signup() {
                axios.post("/signup", this.formData).then((response) => {
                    this.$swal({
                        title : "რეგისტრაცია წარმატებით განხორციელდა",
                        icon : "success",
                        timerProgressBar: true,
                        timer : 2000,
                        toast : true,
                        position : "top-end"
                    });

                    setTimeout(() => {
                        this.$router.push("/")
                    }, 2000);
                }).catch((err) => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }
                });
            }
        },

        mounted() {
            document.title = "რეგისტრაცია";
        }
    }
</script>

<style scoped>
    /**
        ღია მწვანე: #82be00
        მუქი მწვანე: #005019
        background : #F3F3F3
        font #3c3c3c
    */
    @font-face {
        font-family: "frutiger_geo";
        src: url("../fonts/Linotype - Neue Frutiger Georgian Black.otf");
    }

    @font-face {
        font-family: "frutiger_geo_regular";
        src: url("../fonts/Linotype - Neue Frutiger Georgian Regular.otf");
    }

    @font-face {
        font-family: "frutiger_geo_caps";
        src: url("../fonts/NeueFrutigerGeorgianCAPS-Black.ttf");
    }

    * {
        font-family: "frutiger_geo";
        box-sizing: border-box;
    }

    .header-logo {
        width: 100% !important;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header-logo > img {
        height: 100px;
        margin-left: 40px !important;
    }

    label {
        color: #3c3c3c;
        font-size: 13px;
    }

    input[type="email"], input[type="password"], input[type="text"], input[type="number"] {
        padding: 8px;
        color: #3c3c3c;
        background-color: #ffffff;
        border: 1px solid transparent;
        border-radius: 4px;
        font-size: 15px;
        outline: none;
        font-family: "frutiger_geo_regular";
        margin-top: 10px;
    }

    .form-control:focus {
        box-shadow: none !important;
        outline: none !important;
    }

    button {
        padding: 8px;
        border: none;
        color: #005019;
        background-color: #82be00;
        text-transform: uppercase;
        font-weight: 900;
        cursor: pointer;
        border-radius: 4px;
        font-family: "frutiger_geo_caps" !important;
        font-size: 15px;
        outline: none;
    }

    button:hover {
        background-color: #005019;
        color: #fff;
    }

    .error {
        border: 1px solid #d9534f !important;
    }

    .success {
        border: 1px solid #2a8b37 !important;
    }

    .text-muted {
        user-select: none;
        font-size: 14px !important;
    }
</style>