<template>
    <div>
        <MyHeader />

        <div class="container-fluid" style="margin-top: 84.5px">
            <div class="row vh-100">
                <div class="col-6">
                    <div class="container">
                        <h1>განაცხადი</h1>
                        <p><strong>ბენეფიციარის სახელი, გვარი:</strong> {{ data.beneficiary_name }}</p>
                        <p><strong>ზედნადების ნომერი:</strong> {{ data.overhead_number }}</p>
                        <p><strong>ზედნადების თარიღი:</strong> {{ data.overhead_date }}</p>
                        <p><strong>მაღაზიის მისამართი:</strong> {{ data.store_address }}</p>
                        <p><strong>ბარათის ბოლო 4 ციფრი:</strong> {{ data.card_number }}</p>
                        <p><strong>ჯამური თანხა:</strong> {{ data.full_amount }}</p>

                        <hr>

                        <table class="table table-bordered bg-white border rounded-5">
                            <thead>
                                <tr>
                                    <th>პროდუქტი</th>
                                    <th>ფასი</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in data.statement_products" :key="index">
                                    <td>{{ item.products[index].name }} </td>
                                    <td>{{ item.price }} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-6">
                    <iframe width="100%" height="100%" :src="'http://localhost:8000/api/statement/pdf/' + this.$route.params.id"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/Header.vue";
    import axios from "axios";

    export default {
        name : "StatementRead",

        components : {
            MyHeader,
        },

        data() {
            return {
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

                data : []
            }
        },

        mounted() {
            document.title = "განაცხადი";

            axios.get("/statement/get/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.data = response.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
</script>
