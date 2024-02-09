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
                            <button type="submit" class="btn btn-success">შეცვლა</button>
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
    
</style>