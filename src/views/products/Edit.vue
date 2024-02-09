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
                                <option value="enabled">ჩართულია</option>
                                <option value="disabled">გამორთულია</option>
                            </select>
                        </div>
                        <div class="d-grid">
                            <button type="submit">რედაქტირება</button>
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
            document.title = "პროდუქტის დამატება";

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
        font-family: "frutiger_geo_regular";
        box-sizing: border-box;
    }

    label {
        color: #3c3c3c;
        font-size: 13px;
    }

    input[type="text"] {
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
</style>