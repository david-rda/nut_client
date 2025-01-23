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
                                <input type="text" v-model="formData.name" id="name" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="email">ელ.&nbsp;ფოსტა</label>
                                <input type="email" v-model="formData.email" id="email" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="mobile">ტელეფონის ნომერი</label>
                                <input type="number" min="0" onkeypress="if(this.value.length == 9) return false" v-model="formData.mobile" id="mobile" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="mobile">პაროლი</label>
                                <input type="password" v-model="formData.password" id="mobile" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="d-grid mb-5">
                                <button type="submit" class="btn btn-success" :disabled="disabled">
                                    დამატება
                                    <span v-if="loader" class="spinner-border spinner-border-sm"></span>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div v-for="(item, index) in errors" :key="index" class="alert alert-danger border-0">
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

                errors : [],

                disabled : false,
                loader : false,
            }
        },

        methods : {
            addOperator() {
                this.disabled = true;
                this.loader = true;
                
                axios.post("/operator/add", this.formData, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then((response) => {
                    this.$swal({
                        title : "ოპერატორი დაემატა",
                        icon : "success",
                    });

                    setTimeout(() => {
                        this.$router.back()
                    }, 2000);

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
            document.title = "მომხმარებლის დამატება";
        }
    }
</script>

<style scoped>
    
</style>