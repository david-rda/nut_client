<template>
    <div>
        <header-component></header-component>

        <div class="container mt-5">
            <div class="row gx-3 gy-4">
                <SideBar />

                <div class="col-md-9 col-lg-9 col-sm-12 col-xs-12">
                    <div class="container p-3 bg-white">
                        <form method="POST" @submit.prevent="addUser()">
                            <div class="mb-3">
                                <label for="name" class="mb-2">სახელი</label>
                                <input type="text" name="name" id="name" v-model="this.name">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="mb-2">ელ.&nbsp;ფოსტა</label>
                                <input type="text" name="email" id="email" v-model="this.email">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="mb-2">პაროლი</label>
                                <input type="password" name="password" id="password" v-model="this.password">
                            </div>
                            <div class="mb-3">
                                <label for="role" class="mb-2">როლი</label>
                                <select v-model="this.role" id="role" name="role">
                                    <option value="1">მომხმარებელი</option>
                                    <option value="2">ადმინი</option>
                                    <option value="3">სუპერ ადმინი</option>
                                </select>
                            </div>
                            <div class="d-grid mb-3">
                                <button type="submit">დამატება</button>
                            </div>
                            <div class="d-grid justify-content-center" v-if="loading">
                                <div class="spinner-grow text-success"></div>
                            </div>
                            <!-- მოცემული ბლოკი განკუთვნილია დამატებისას დაბრუნებული success შეტყობინებისთვის-->
                            <div class="d-grid text-center">
                                <div class="alert alert-success alert-dismissible fade show" v-if="success">
                                    <p>{{ message }}</p>
                                    <a href="#" class="btn-close" data-bs-dismiss="alert"></a>
                                </div>
                            </div>
                            <!-- მოცემული ბლოკი განკუთვნილია დამატებისას დაბრუნებული error შეტყობინებისთვის-->
                            <div class="d-grid text-center" v-if="error">
                                <div class="alert alert-danger alert-dismissible fade show mb-3" v-for="(item, index) in message" :key="index">
                                    <span>{{ item[0] }}</span>
                                    <a href="#" class="btn-close" data-bs-dismiss="alert"></a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderComponent from "../../layouts/Header.vue";
    import SideBar from "../../layouts/Sidebar.vue";
    import axios, { AxiosError } from "axios";

    export default {
        name : "UserAdd",

        data() {
            return {
                name : "",
                email : "",
                password : "",
                role : "",

                message : "",

                success : false,
                error : false,

                loading: false
            }
        },

        components : {
            HeaderComponent,
            SideBar
        },

        methods : {
            async addUser() {
                this.loading = true;
                try {
                    const data = await axios.post("http://api.farmer.rda.gov.ge/user/add", {
                        name : this.name,
                        email : this.email,
                        password : this.password,
                        role : this.role
                    }, {
                        headers : {
                            "Authorization" : `Bearer ${window.localStorage.getItem("token")}`
                        }
                    });
                    
                    this.success = true;
                    this.error = false;
                    this.loading = false;

                    this.message = data.data.message;
                }catch(err) {
                    if(err instanceof AxiosError) {
                        this.success = false;
                        this.error = true;
                        this.message = err.response.data.errors;
                        this.loading = false;
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    button, input, label, option, select, .alert {
        font-family: "frutiger_geo_regular";
    }

    button[type="submit"] {
        background-color: #82be00;
        color: #104f27;
        font-family: "frutiger_geo_caps";
        padding: 15px 18px;
        border: none;
        outline: none;
        border-radius: 4px;
        
        &:hover {
            background-color: #104f27;
            color: #fff;
        }
    }

    input, select {
        padding: 15px 18px;
        width: 100%;
        border: none;
        background-color: #F7F7F7;
        outline: none;
        border-radius: 4px;
        color: #3c3c3c;
    }

    .message {
        padding: 10px 18px;
        color: #fff;
        font-family: "frutiger_geo_regular";
        border-radius: 4px;
        background-color: #104f27;
    }
</style>