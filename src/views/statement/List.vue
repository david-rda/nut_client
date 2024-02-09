<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 120px">
            <div class="d-flex w-100 justify-content-between align-items-center mb-3">
                <h4 class="text-muted">განაცხადები</h4>

                <router-link to="/statement/add" class="btn btn-success">ზედნადების დამატება</router-link>
            </div>
            <div class="row">
                <table class="table table-hover">
                    <thead>
                        <tr class="text-center">
                            <th>ზედნადების ნომერი</th>
                            <th>ზედნადების თარიღი</th>
                            <th>მაღაზიის მისამართი</th>
                            <th>სახელი, გვარი</th>
                            <th>ჯამური თანხა</th>
                            <th>სტატუსი</th>
                            <th>ქმედება</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="data in statements" :key="data.id">
                            <td>{{ data.overhead_number }}</td>
                            <td>{{ data.overhead_date }}</td>
                            <td>{{ data.store_address }}</td>
                            <td>{{ data.beneficiary_name }}</td>
                            <td>{{ data.full_amount }}</td>
                            <td>{{ (data.status == "new") ? 'ახალია': '' }}</td>
                            <td>
                                <router-link :to="'/statement/read/' + data.id" type="button" class="btn btn-success">დათვალიერება</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
                statements : [],
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,
            }
        },

        mounted() {
            axios.get("/statement/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.statements = response.data.data;
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>
