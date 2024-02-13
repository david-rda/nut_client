<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 120px">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form @submit.prevent="add">
                        <div class="form-group mb-3">
                            <label for="product_name">პროდუქტის დასახელება</label>
                            <input type="text" class="form-control" id="product_name" v-model="title">
                        </div>
                        <div class="form-group mb-3">
                            <label for="status">სტატუსი</label>
                            <select class="form-select" id="status" v-model="status">
                                <option value="" selected disabled>აირჩიეთ სტატუსი</option>
                                <option value="enabled">აქტიურია</option>
                                <option value="disabled">არააქტიურია</option>
                            </select>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-success" :disabled="disabled">
                                დამატება
                                <span class="spinner-border spinner-border-sm" v-if="loader"></span>
                            </button>
                        </div>
                    </form>

                    <div v-for="(item, index) in errors" :key="index" class="alert alert-danger mt-3">
                        <strong>{{ item[0] }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import MyHeader from "../../components/Header.vue";

    export default {
        name : "AddProduct",

        data() {
            return {
                title: '',
                status : "",

                errors : [],

                disabled : false,
                loader : false,
            };
        },
        
        components : {
            MyHeader,
        },

        mounted() {
            document.title = "პროდუქტის დამატება";
        },

        methods: {
            add() {
                this.disabled = true;
                this.loader = true;

                axios.post('/product/add', { title: this.title, status : this.status }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.status = "";
                    this.title = '';
                    this.errors = [];

                    this.$swal({
                        title : "პროდუქტი დაემატა",
                        icon : "success",
                    });

                    setTimeout(() => {
                        this.$router.back();
                    }, 2000);
                    
                    this.disabled = false;
                    this.loader = false;
                }).catch(error => {
                    this.errors = error?.response?.data?.errors;

                    this.disabled = false;
                    this.loader = false;
                });
            }
        }
    };
</script>

<style scoped>
    
</style>