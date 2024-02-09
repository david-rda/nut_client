<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 90px">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-6 col-xs-12 col-sm-12 bg-white rounded p-5 border mt-5">
                    <h1 class="text-center text-muted">ოპერატორის დამატება</h1>
                    <form @submit.prevent="addOperator()" class="row g-3">
                        <div class="col-md-12">
                            <div class="mb-3">
                                <label for="name">ოპერატორის სახელი, გვარი</label>
                                <input type="text" v-model="formData.name" id="name" class="form-control border">
                            </div>
                            <div class="mb-3">
                                <label for="email">ელ.&nbsp;ფოსტა</label>
                                <input type="email" v-model="formData.email" id="email" class="form-control border">
                            </div>
                            <div class="mb-3">
                                <label for="mobile">ტელეფონის ნომერი</label>
                                <input type="number" v-model="formData.mobile" id="mobile" class="form-control border">
                            </div>
                            <div class="mb-3">
                                <label for="mobile">პაროლი</label>
                                <input type="password" v-model="formData.password" id="mobile" class="form-control border">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="d-grid mb-5">
                                <button type="submit">დამატება</button>
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
    import MyHeader from "../../components/Header.vue";
    import axios, { AxiosError } from "axios";

    export default {
        name : "DashBoard",

        components : {
            MyHeader,
        },

        data() {
            return {
                // formData
                formData : {
                    name : "",
                    password : "",
                    email : "",
                    mobile : "",
                },

                errors : []
            }
        },

        methods : {
            addOperator() {
                axios.post("/operator/add", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then((response) => {
                    this.$swal({
                        title : "ოპერატორი დაემატა",
                        icon : "success",
                    });
                }).catch((err) => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }
                });
            }
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
        src: url("../../fonts/Linotype - Neue Frutiger Georgian Black.otf");
    }

    @font-face {
        font-family: "frutiger_geo_regular";
        src: url("../../fonts/Linotype - Neue Frutiger Georgian Regular.otf");
    }

    @font-face {
        font-family: "frutiger_geo_caps";
        src: url("../../fonts/NeueFrutigerGeorgianCAPS-Black.ttf");
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