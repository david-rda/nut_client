<template>
    <div>
        <nav class="w-full bg-white p-3 fixed top-0 left-0">
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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                        <Transition name="fade">
                            <ul class="fixed bg-white rounded-md w-1/9 mt-3 p-3 space-y-2 shadow-md" v-if="show_drop">
                                <li>
                                    <router-link to="/settings" class="flex items-center gap-2 rounded-md p-2 hover:bg-gray-100 transition duration-200 active:scale-95">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        პარამეტრები
                                    </router-link>
                                </li>
                                <li>
                                    <a href="#" @click="signout()" class="flex items-center gap-2 rounded-md p-2 hover:bg-gray-100 transition duration-200 active:scale-95">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                        </svg>
                                        გასვლა
                                    </a>
                                </li>
                            </ul>
                        </Transition>
                    </a>
                </div>
                <button type="button" class="bg-gray-100 text-black p-2 md:hidden block transition duration-500 rounded-md" @click="show_nav()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 select-none pointer-events-none">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
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