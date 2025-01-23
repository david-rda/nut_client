<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 120px">
            <div class="d-flex w-100 justify-content-between align-items-center mb-3">
                <h4 class="text-muted">პროდუქტები</h4>

                <router-link to="/product/add" class="btn btn-success">პროდუქტის დამატება</router-link>
            </div>

            <!-- <div class="mb-3">
                <input type="text" v-model="search" class="form-control" placeholder="ძიება..." @keyup="filterProduct">
            </div> -->

            <table class="table table-hover border bg-white rounded">
                <thead>
                    <tr class="text-center">
                        <th>#</th>
                        <th>დასახელება</th>
                        <th>სტატუსი</th>
                        <th>ქმედება</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center" v-for="(data, index) in products.data" :key="index">
                        <td :class="(data.status == 'disabled') ? 'table-danger' : ''">{{ index + 1 }}</td>
                        <td :class="(data.status == 'disabled') ? 'table-danger' : ''">{{ data.name }}</td>
                        <td :class="(data.status == 'disabled') ? 'table-danger' : ''">{{ (data.status == "disabled") ? 'არააქტიურია' : 'აქტიურია' }}</td>
                        <!-- <td :class="(data.status == 'disabled') ? 'table-danger' : ''">{{ new Date(data.updated_at).toISOString().split('T')[0] }}</td> -->
                        <td :class="(data.status == 'disabled') ? 'table-danger' : ''">
                            <router-link :to="'/product/edit/' + data.id" type="button" class="btn btn-warning" v-tippy="{ content: 'რედაქტირება' }">
                                <BIconPencilSquare />
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination v-model="page" :records="Number(products.total)" :per-page="Number(products.per_page)" @paginate="getResults" :hideCount="true" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import MyHeader from "../../components/Header.vue";
    import Pagination from 'v-pagination-3';

    export default {
        name : "DashBoard",

        components : {
            MyHeader,
            Pagination,
        },
        
        data() {
            return {
                products : [],
                page : 1,
                // search : ""
            }
        },

        methods : {
            getResults(page = 1) {
                axios.get("/product/list?page=" + page/* + "&query=" + this.search*/, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    this.products = response.data;
                }).catch(err => {
                    console.log(err);
                });
            },

            // filterProduct() {
            //     this.getResults();
            // }
        },

        mounted() {
            document.title = "პროდუქტები";

            this.getResults();
            
            // axios.get("/product/list", {
            //     headers : {
            //         "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
            //     }
            // }).then(response => {
            //     this.products = response.data;
            // }).catch(err => {
            //     console.log(err);
            // })
        }
    }
</script>

<style scoped>
    
</style>