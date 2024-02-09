<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 120px">
            <table class="table table-hover">
                <thead>
                    <tr class="text-center">
                        <th>ID</th>
                        <th>დასახელება</th>
                        <th>სტატუსი</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center" v-for="data in products" :key="data.id">
                        <td :class="(data.status == 'disabled') ? 'table-danger' : ''">{{ data.id }}</td>
                        <td :class="(data.status == 'disabled') ? 'table-danger' : ''">{{ data.name }}</td>
                        <td :class="(data.status == 'disabled') ? 'table-danger' : ''">{{ (data.status == "disabled") ? 'გამორთულია' : 'ჩართულია' }}</td>
                        <td :class="(data.status == 'disabled') ? 'table-danger' : ''">
                            <router-link :to="'/product/edit/' + data.id" type="button" class="btn btn-warning">რედაქტირება</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import MyHeader from "../../components/Header.vue";

    export default {
        name : "DashBoard",

        components : {
            MyHeader,
        },
        
        data() {
            return {
                products : []
            }
        },

        mounted() {
            axios.get("/product/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.products = response.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
</script>
