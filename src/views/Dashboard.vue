<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 150px">
            <div class="row justify-content-center" v-if="loader">
                <span class="spinner-border spinner-border"></span>
            </div>
            
            <div v-else>
                <table class="table table-responsive w-50">
                    <tr>
                        <th class="p-3" v-if="permission == 'company'">კომპანიის დასახელება</th>
                        <td class="p-3" v-if="permission == 'company'">{{ user.company_name }}</td>
                    </tr>
                    <tr>
                        <th class="p-3" v-if="permission == 'company'">საიდენტიფიკაციო კოდი</th>
                        <td class="p-3" v-if="permission == 'company'">{{ user.identification_code }}</td>
                    </tr>
                    <tr>
                        <th class="p-3" v-if="permission != 'company'">მომხმარებელი</th>
                        <td class="p-3" v-if="permission != 'company'">{{ user.name }}</td>
                    </tr>
                    <tr>
                        <th class="p-3">ტელეფონის ნომერი</th>
                        <td class="p-3">{{ user.mobile }}</td>
                    </tr>
                    <tr>
                        <th class="p-3">ელ. ფოსტა</th>
                        <td class="p-3">{{ user.email }}</td>
                    </tr>
                    <tr>
                        <th class="p-3">ანგარიშის სტატუსი</th>
                        <td class="p-3"><span class="badge bg-success text-white">{{ (user.status == 'pending' ? 'დაუდასტურებელი' : 'აქტიური') }}</span></td>
                    </tr>
                </table>
                <!-- <div class="row justify-content-center">
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
                </div> -->

                <table class="table table-responsive w-50">
                    <tr class="border-bottom-0">
                        <th rowspan="5" class="p-3 fs-5">განაცხადები</th>
                    </tr>
                    <tr>
                        <th style="font-size:16px" class="p-3 text-primary">ახალი</th>
                        <td style="font-size:16px" class="p-3 text-primary">{{ data.new }}</td>
                    </tr>
                    <tr>
                        <th style="font-size:16px" class="p-3 text-success">დადასტურებული</th>
                        <td style="font-size:16px" class="p-3 text-success">{{ data.approved }}</td>
                    </tr>
                    <tr>
                        <th style="font-size:16px" class="p-3 text-warning">დახარვეზებული</th>
                        <td style="font-size:16px" class="p-3 text-warning">{{ data.rejected }}</td>
                    </tr>
                    <tr>
                        <th style="font-size:16px" class="p-3 text-danger">შეჩერებული</th>
                        <td style="font-size:16px" class="p-3 text-danger">{{ data.stopped }}</td>
                    </tr>
                </table>
                
                <!-- <div class="row">
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
                </div> -->
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
