<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12 offset-md-3 offset-lg-3 bg-white rounded p-5 border" style="margin-top: 10%">
                <div class="header-logo">
                    <img src="../assets/RDA-Logo-Geo.png" />
                </div>
                <form @submit.prevent="Login_To_Panel()">
                    <div class="mb-3">
                        <label for="email">ელ.&nbsp;ფოსტა</label>
                        <input type="email" v-model="email" id="email" class="form-control border" v-bind:class="(email_validate == 1) ? 'error' : ''">
                    </div>
                    <div class="mb-3">
                        <label for="password">პაროლი</label>
                        <input type="password" v-model="password" id="password" class="form-control border" v-bind:class="(password_validate == 1) ? 'error' : ''">
                    </div>

                    <div class="row justify-content-between align-items-center">
                        <div class="col-md-4 col-12">
                            <div class="d-grid mb-5">
                                <router-link to="/signup">რეგისტრაცია</router-link>
                            </div>
                        </div>
                        <div class="col-md-4 col-12">
                            <div class="d-grid mb-5 text-center">
                                <button type="submit" class="btn btn-success" :disabled="disabled">
                                    შესვლა
                                    <span class="spinner-border spinner-border-sm" v-if="loader"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div v-for="(item, index) in errors" :key="index" class="alert alert-danger">
                    <strong>{{ item[0] }}</strong>
                </div>
            </div>
        </div>
        <p class="disabled text-center text-muted mt-3">&copy;&nbsp;2024&nbsp;{{ this.year }}&nbsp;Created&nbsp;by&nbsp;<strong>RDA</strong>&nbsp;IT&nbsp;team</p>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                email : "",
                password : "",
                year : "",

                disabled : false,
                loader : false,

                errors : []
            }
        },

        methods : {
            Login_To_Panel : function() {
                this.disabled = true;
                this.loader = true;

                axios.post("/signin", {
                    email : this.email,
                    password : this.password
                }).then((response) => {
                    window.localStorage.setItem("user", JSON.stringify(response.data.user));
                    window.localStorage.setItem("token", JSON.stringify(response.data.token));

                    this.$router.push("/home");
                }).catch((err) => {
                    this.errors = err.response.data.errors;

                    this.disabled = false;
                    this.loader = false;
                });
            }
        },

        mounted() {
            document.title = "სისტემაში შესვლა";
            
            const data = window.localStorage.getItem("user");
            
            if(data != null) {
                this.$router.push("/home");
            }

            var date = new Date();
            
            if("2022" != date.getFullYear()) {
                this.year = " - " + date.getFullYear();
            }
        }
    }
</script>

<style scoped>
    
</style>