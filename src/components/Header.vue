<template>
    <div>
        <nav class="w-full bg-white p-3 fixed top-0 left-0 z-999">
            <div class="container mx-auto flex flex-row justify-between items-center">
                <div class="md:flex md:items-center">
                    <router-link to="/home" class="active:scale-95 transition duration-200">
                        <img src="../../public/logo.svg" width="40px">
                    </router-link>
                </div>
                <div class="md:flex md:ms-8 md:space-x-3 md:items-center hidden">
                    <router-link class="p-2 rounded-md hover:bg-gray-100 transition duration-200" to="/manage/user" v-if="user?.permission == 'coordinator'">მომხმარებლების მართვა</router-link>
                    <router-link class="p-2 rounded-md hover:bg-gray-100 transition duration-200" to="/product/list" v-if="user?.permission == 'coordinator'">პროდუქტების მართვა</router-link>
                    <router-link class="p-2 rounded-md hover:bg-gray-100 transition duration-200" to="/statements" v-if="(user?.permission == 'company' && user?.status != 'pending') || user?.permission == 'operator' || user?.permission == 'coordinator'">განაცხადები</router-link>
                    <router-link class="p-2 rounded-md hover:bg-gray-100 transition duration-200" to="/statement/reports" v-if="user?.permission == 'coordinator' || user?.permission == 'company'">რეპორტები</router-link>
                </div>

                <Transition name="fade">
                    <ul class="fixed left-0 top-18 bg-white w-full shadow-2xl p-2" v-if="show_navbar">
                        <li class="p-3">
                            <router-link to="/manage/user" v-if="user?.permission == 'coordinator'">მომხმარებლების მართვა</router-link>
                        </li>
                        <li class="p-3">
                            <router-link to="/product/list" v-if="user?.permission == 'coordinator'">პროდუქტების მართვა</router-link>
                        </li>
                        <li class="p-3">
                            <router-link to="/statements" v-if="(user?.permission == 'company' && user?.status != 'pending') || user?.permission == 'operator' || user?.permission == 'coordinator'">განაცხადები</router-link>
                        </li>
                        <li class="p-3">
                            <router-link to="/statement/reports" v-if="user?.permission == 'coordinator' || user?.permission == 'company'">რეპორტები</router-link>
                        </li>
                        <li class="p-3">
                            <router-link to="/settings" class="dropdown-item">პარამეტრები</router-link>
                        </li>
                        <li class="p-3">
                            <a class="rounded-md bg-red-100 text-red-900 p-3" href="#" @click="signout()">გასვლა</a>
                        </li>
                    </ul>
                </Transition>

                <div class="md:flex md:items-center ml-auto hidden">
                    <a href="#">
                        <span class="flex items-center gap-1 p-2 rounded-md hover:bg-gray-100 transition duration-200" @click="show_dropdown()">
                            <span v-if="user?.permission == 'company'" class="rounded-full bg-green-100 text-green-900 w-9 h-9 flex items-center justify-center font-bold">{{ nameInitials }}</span>
                            <span v-else class="rounded-full bg-green-100 text-green-900 w-9 h-9 flex items-center justify-center font-bold">{{ nameInitials }}</span>
                            {{ (user?.permission == 'company') ? user?.company_name : user?.name }}
                            <ChevronDownIcon class="size-5" />
                        </span>
                        <Transition name="fade">
                            <ul class="fixed bg-white rounded-md w-1/9 mt-3 p-3 space-y-2 shadow-md" v-if="show_drop">
                                <li>
                                    <router-link to="/settings" class="flex items-center gap-2 rounded-md p-2 hover:bg-gray-100 transition duration-200 active:scale-95">
                                        <Cog8ToothIcon class="size-5" />
                                        პარამეტრები
                                    </router-link>
                                </li>
                                <li>
                                    <a href="#" @click="signout()" class="flex items-center gap-2 rounded-md p-2 text-red-700 hover:bg-red-100 transition duration-200 active:scale-95">
                                        <ArrowRightStartOnRectangleIcon class="size-5" />
                                        გასვლა
                                    </a>
                                </li>
                            </ul>
                        </Transition>
                    </a>
                </div>
                <button type="button" class="bg-gray-100 text-black p-2 md:hidden block transition duration-500 rounded-md" @click="show_nav()">
                    <Bars3Icon class="size-5" />
                </button>
            </div>
        </nav>
    </div>
</template>

<script>
    import axios from 'axios'
    
    export default {
        name : "MyHeader",

        data() {
            return {
                user : JSON.parse(window.localStorage.getItem("user")),
                show_navbar : false,
                show_drop : false,
            }
        },

        mounted() {
            if(this.user == null) {
                this.$router.push("/");
            }
        },

        methods: {
            signout() {
                axios.get("/signout", {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(response => {
                    window.localStorage.clear();
                    this.$router.push("/");
                }).catch(err => {
                    console.log(err);
                });
            },

            show_nav() {
                this.show_navbar = !this.show_navbar;
            },

            show_dropdown() {
                this.show_drop = !this.show_drop;
            }
        },

        computed : {
            nameInitials() {
                if(this.user != null) {
                    if(this.user?.permission == 'company') {
                        let _user = this.user?.company_name.split(" ");

                        if(_user?.length > 1) {
                            return _user[0][0] + _user[1][0]
                        }else {
                            return _user[0][0];
                        }
                    }else {
                        let _user = this.user?.name.split(" ");

                        if(_user?.length > 1) {
                            return _user[0][0] + _user[1][0]
                        }else {
                            return _user[0][0];
                        }
                    }
                }else {
                    return false;
                }
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