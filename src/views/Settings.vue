<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 10%">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form @submit.prevent="changePassword()">
                        <div class="form-group mb-3">
                            <label for="currentPassword">მიმდინარე პაროლი</label>
                            <input type="password" class="form-control" id="currentPassword" v-model="formData.current_password">
                        </div>
                        <div class="form-group mb-3">
                            <label for="newPassword">ახალი პაროლი</label>
                            <input type="password" class="form-control" id="newPassword" v-model="formData.new_password">
                        </div>
                        <div class="form-group mb-3">
                            <label for="confirmPassword">გაიმეორეთ ახალი პაროლი</label>
                            <input type="password" class="form-control" id="confirmPassword" v-model="formData.confirm_password">
                        </div>
                        <div class="form-group d-grid mb-3">
                            <button type="submit">შეცვლა</button>
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
    import MyHeader from "../components/Header.vue";

    export default {
        name : "MySettings",

        components : {
            MyHeader,
        },

        data() {
            return {
                formData : {
                    current_password : "",
                    new_password : "",
                    confirm_password : ""
                },

                errors : []
            }
        },

        mounted() {
            document.title = "პაროლის შეცვლა";
        },

        methods : {
            changePassword() {
                axios.post("/change_password", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.$swal({
                        title : "პაროლი წარმატებით შეიცვალა",
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

    label {
        color: #3c3c3c;
        font-size: 13px;
    }

    input[type="email"], input[type="password"] {
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