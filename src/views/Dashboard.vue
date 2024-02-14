<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 90px">
            <div class="row justify-content-center">
                <span class="spinner-border spinner-border" v-if="loader"></span>
            </div>
            
            <div class="row justify-content-center">
                <p style="user-select:none"><strong>სახელი:&nbsp;</strong>{{ permission == 'company' ? user.company_name : user.name }}</p>
                <p style="user-select:none"><strong>მობილური:&nbsp;</strong>{{ user.mobile }}</p>
                <p style="user-select:none"><strong>ელ. ფოსტა:&nbsp;</strong>{{ user.email }}</p>
                <p style="user-select:none">
                    <strong>ანგარიშის სტატუსი:&nbsp;</strong>
                    <span class="badge bg-success">{{ (user.status == 'pending' ? 'დუდასტურებელი' : 'აქტიური') }}</span>
                </p>
            </div>

            <div class="row" v-if="loader == false">
                <div class="col-3">
                    <div class="card">
                        <div class="card-header  d-flex align-items-center text-center">
                            <h6 class="card-title">ახალი განაცხადების რაოდენობა</h6>
                        </div>
                        <div class="card-body text-center">
                            <h1>{{ data.new }}</h1>
                        </div>
                    </div>
                </div>

                <div class="col-3">
                    <div class="card">
                        <div class="card-header  d-flex align-items-center text-center">
                            <h6 class="card-title">დახარვეზებული განაცხადების რაოდენობა</h6>
                        </div>
                        <div class="card-body text-center">
                            <h1>{{ data.rejected }}</h1>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card">
                        <div class="card-header  d-flex align-items-center text-center">
                            <h6 class="card-title">დადასტურებული განაცხადების რაოდენობა</h6>
                        </div>
                        <div class="card-body text-center">
                            <h1>{{ data.approved }}</h1>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card">
                        <div class="card-header  d-flex align-items-center text-center">
                            <h6 class="card-title">შეჩერებული განაცხადების რაოდენობა</h6>
                        </div>
                        <div class="card-body text-center">
                            <h1>{{ data.stopped }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    import MyHeader from "../components/Header.vue";

    export default {
        name : "DashBoard",

        components : {
            MyHeader,
        },

        data() {
            return {
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,
                user : JSON.parse(window.localStorage.getItem("user")),

                data : [],

                loader : true
            }
        },

        mounted() {
            document.title = "მთავარი";

            axios.get("/statement/statistic", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                }
            }).then(response => {
                this.data = response.data;
                this.loader = false;
            }).catch(err => {
                console.log(err);
                this.loader = true;
            })
        }
    }
</script>
