<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 120px">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form @submit.prevent="edit">
                        <div class="form-group mb-3">
                            <label for="currentPassword">პროდუქტის დასახელება</label>
                            <input type="text" class="form-control" id="currentPassword" v-model="title">
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
                            <button type="submit" class="btn btn-success">რედაქტირება</button>
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

                errors : []
            };
        },
        
        components : {
            MyHeader,
        },

        mounted() {
            document.title = "პროდუქტის რედაქტირება";

            axios.get("/product/get/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.title = response.data.name;
                this.status = response.data.status;
            }).catch(err => {
                console.log(err);
            });
        },

        methods: {
            edit() {
                axios.put('/product/edit/' + this.$route.params.id, { title: this.title, status : this.status }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.errors = [];

                    this.$swal({
                        title : "პროდუქტი დარედაქტირდა",
                        icon : "success",
                    });
                }).catch(error => {
                    this.errors = error?.response?.data?.errors;
                });
            }
        }
    };
</script>

<style scoped>
    
</style>