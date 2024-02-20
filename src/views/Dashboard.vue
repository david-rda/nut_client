<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 150px">
            <div class="row justify-content-center">
                <span class="spinner-border spinner-border" v-if="loader"></span>
            </div>
            
            <div class="row justify-content-center">
                <div class="col-3">
                    <p class="text-muted" v-if="permission == 'company'" style="user-select:none"><strong>კომპანიის დასახელება:&nbsp;</strong></p>
                    <p class="text-muted" v-if="permission == 'company'" style="user-select:none;margin-top: 38px;margin-bottom:30px"><strong>საიდენტიფიკაციო კოდი:&nbsp;</strong></p>
                    <p class="text-muted" v-if="permission != 'company'"><strong>მომხმარებელი:&nbsp;</strong></p>
                    <p class="text-muted" :style="(permission == 'company') ? 'user-select:none' : 'user-select:none;margin-top: 33px'"><strong>ტელეფონის ნომერი:&nbsp;</strong></p>
                    <p class="text-muted" :style="(permission == 'company') ? 'user-select:none;margin-top: 25px;' : 'user-select:none;margin-top: 32px'"><strong>ელ. ფოსტა:&nbsp;</strong></p>
                    <p class="text-muted" style="user-select:none;margin-top: 38px">
                        <strong>ანგარიშის სტატუსი:&nbsp;</strong>
                    </p>
                </div>
                <div class="col-9">
                    <p v-if="permission == 'company'" style="user-select:none">{{ user.company_name }}</p>
                    <hr v-if="permission == 'company'">
                    <p v-if="permission == 'company'" style="user-select:none">{{ user.identification_code }}</p>
                    <p class="text-muted" v-if="permission != 'company'"> {{ user.name }}</p>
                    <hr>
                    <p style="user-select:none">{{ user.mobile }}</p>
                    <hr>
                    <p style="user-select:none">{{ user.email }}</p>
                    <hr>
                    <p style="user-select:none">
                        <span class="badge bg-success">{{ (user.status == 'pending' ? 'დაუდასტურებელი' : 'აქტიური') }}</span>
                    </p>
                </div>
            </div>
            <hr>
            <div class="row" v-if="loader == false">
                <div class="col-3">
                    <h6 class="text-muted"><strong>განაცხადები</strong></h6>
                </div>
                <div class="col-9">
                    <p class="text-primary"><strong>ახალი&nbsp;&nbsp;</strong>{{ data.new }}</p>
                    <hr>
                    <p class="text-success"><strong>დადასტურებული&nbsp;&nbsp;</strong>{{ data.approved }}</p>
                    <hr>
                    <p class="text-warning"><strong>დახარვეზებული&nbsp;&nbsp;</strong>{{ data.rejected }}</p>
                    <hr>
                    <p class="text-danger"><strong>შეჩერებული&nbsp;&nbsp;</strong>{{ data.stopped }}</p>
                    <hr>
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
