<template>
    <div>
        <div class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
            <div class="container-fluid">
                <div class="navbar-brand">
                    <router-link to="/home" class="nav-link"><img src="../assets/RDA-Logo-Geo.png" style="width: 120px"></router-link>
                </div>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/manage/user" class="nav-link">მომხმარებლების მართვა</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">პროდუქტების მართვა</a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link to="/product/list" class="dropdown-item">პროდუქტები</router-link>
                            </li>
                            <li>
                                <router-link to="/product/add" class="dropdown-item">პროდუქტის დამატება</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link to="/statements" class="nav-link">განაცხადები</router-link>
                    </li>
                </ul>
                <div class="ms-auto navbar-nav">
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">{{ user?.name }}</a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link to="/settings" class="dropdown-item nav-link">პარამეტრები</router-link>
                            </li>
                            <li class="dropdown-divider"></li>
                            <li>
                                <a class="dropdown-item" href="#" @click="LogOut()">გასვლა</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name : "MyHeader",

        data() {
            return {
                user : JSON.parse(window.localStorage.getItem("user")),
            }
        },

        methods: {
            LogOut() {
                window.localStorage.clear()
                this.$router.push("/"); // გადამისამართდება მთავარ (ავტორიზაციის) გვერდზე
            },
        },

        mounted() {
            const data = window.localStorage.getItem("user");
            
            if(data == null) {
                this.$router.push("/");
            }
        },
    }
</script>

<style scoped lang="scss">
    .navigation {
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: #fff;
        overflow: hidden;

        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;

            li.i {
                float: right;

                a {
                    padding: 15px 18px;
                    display: block;
                    text-decoration: none;
                    text-align: center;
                    color: #202020;
                    font-family: "frutiger_geo_regular";

                    &:hover {
                        background-color: lighten(gray, 40);
                    }
                }
            }

            li {
                float: left;
            }
        }
    }

    @media screen and (max-width: 768px) {
        li.i {
            display: none;
        }

        .burger-menu {
            display: block;
            float: right !important;
            padding: 10px;

            img {
                pointer-events: none;
            }

            &:hover {
                background-color: lightgray;
            }
        }
    }

    .nav-link {
        font-family: "frutiger_geo_regular";
    }
</style>