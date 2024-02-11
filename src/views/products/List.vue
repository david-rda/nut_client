<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 120px">
            <div class="d-flex w-100 justify-content-between align-items-center mb-3">
                <h4 class="text-muted">პროდუქტები</h4>

                <router-link to="/product/add" class="btn btn-success">პროდუქტის დამატება</router-link>
            </div>

            <table class="table table-hover border bg-white rounded">
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
                        <td :class="(data.status == 'disabled') ? 'table-danger' : ''">{{ (data.status == "disabled") ? 'აქტიურია' : 'არააქტიურია' }}</td>
                        <td :class="(data.status == 'disabled') ? 'table-danger' : ''">
                            <router-link :to="'/product/edit/' + data.id" type="button" class="btn btn-warning" v-tippy="{ content: 'რედაქტირება' }">
                                <BIconPencilSquare />
                            </router-link>
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
            document.title = "პროდუქტები";
            
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