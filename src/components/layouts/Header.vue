<template>
    <div>
        <div class="navigation">
            <div class="container">
                <ul>
                    <li>
                        <router-link to="/">
                            <img src="../../assets/RDA-Logo-Geo.png" style="width: 120px;">
                        </router-link>
                    </li>
                    <li class="burger-menu">
                        <a href="javascript:void(0)" data-bs-toggle="offcanvas" data-bs-target="#offcanvas">
                            <img src="../../assets/icons/burger-menu.svg">
                        </a>
                    </li>
                    <li class="i">
                        <a href="javascript:void(0)" title="სისტემიდან გასვლა" v-on:click="LogOut()">
                            <img src="../../assets/icons/log-out.svg">
                        </a>
                    </li>
                    <li class="i">
                        <router-link to="/settings" title="პარამეტრები">
                            <img src="../../assets/icons/settings.png">
                        </router-link>
                    </li>
                    <li class="i" v-show="this.role == 3">
                        <router-link to="/admin">ადმინ პანელი</router-link>
                    </li>
                    <li class="i" v-show="this.role == 2 || this.role == 3">
                        <router-link to="/farmer_check">ფერმერთა რეესტრი</router-link>
                    </li>
                    <li class="i" v-show="this.role == 2 || this.role == 3">
                        <router-link to="/panel">საჯარო რეესტრი</router-link>
                    </li>
                    <li class="i">
                        <a href="https://rda.gov.ge" target="_blank">
                            <img src="../../assets/icons/home.svg">
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="offcanvas offcanvas-end" id="offcanvas">
            <div class="offcanvas-header">
                <a href="javascript:void(0)" class="btn-close" data-bs-dismiss="offcanvas"></a>
            </div>
            <div class="offcanvas-body">
                <ul class="list-unstyled text-center">
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="https://rda.gov.ge">მთავარი</a>
                    </li>
                    <li v-show="this.role == 2 || this.role == 3" class="nav-item">
                        <router-link to="/farmer_check" class="nav-link text-dark">ფერმერთა რეესტრი</router-link>
                    </li>
                    <li v-show="this.role == 2 || this.role == 3" class="nav-item">
                        <router-link to="/panel" class="nav-link text-dark">საჯარო რეესტრი</router-link>
                    </li>
                    <li v-show="this.role == 3" class="nav-item">
                        <router-link to="/admin" class="nav-link text-dark">ადმინ პანელი</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/settings" title="პარამეტრები" class="nav-link text-dark">
                            <span>პარამეტრები</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a href="javascript:void(0)" title="სისტემიდან გასვლა" v-on:click="LogOut()" class="nav-link text-dark">
                            <span>გასვლა</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name : "HeaderNavigation",

        data() {
            return {
                role : "",
                layer_show : false,
                sidenav_show : false
            }
        },

        methods: {
            async LogOut() {
                try {
                    await axios.post("https://apifarmer.rda.gov.ge/logout"); // გაიგზავნება მოთხოვნა სისტემიდან გამოსასვლელად
                    
                    this.$router.push("/"); // გადამისამართდება მთავარ (ავტორიზაციის) გვერდზე
                    window.localStorage.removeItem("loggedin");
                    window.localStorage.removeItem("role"); // ავტორიზირებული მომხმარებლის როლის შენახვა
                    window.localStorage.removeItem("id"); // ავტორიზირებული მომხმარებლის აიდის შენახვა
                    window.localStorage.removeItem("token"); // access ტოკენის წაშლა სტორიჯიდან

                    console.clear(); // მოცემული ბრძანება გაასუფთავებს კონსოლის ფანჯარას არსებული შეტყობინებებისგან
                }catch(err) {
                    return false;
                }
            },
        },

        mounted() {
            let loggedin = window.localStorage.getItem("loggedin");

            if(!loggedin) this.$router.push("/");

            this.role = window.localStorage.getItem("role");
        },
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: "frutiger_geo_regular";
        src: url("../../fonts/Linotype - Neue Frutiger Georgian Regular.otf");
    }

    @font-face {
        font-family: "frutiger_geo";
        src: url("../../fonts/Linotype - Neue Frutiger Georgian Black.otf");
    }

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

    .burger-menu {
        display: none;
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