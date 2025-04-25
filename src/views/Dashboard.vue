<template>
    <div>
        <MyHeader />

        <Transition name="fade" appear>
            <div class="container mx-auto mt-25 md:p-0 p-5">
                <h1 class="font-bold select-none">განაცხადები</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6 select-none">
                    <div class="bg-blue-100 rounded-lg p-6 flex flex-col items-center">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">ახალი</h3>
                        <p class="text-4xl font-bold text-blue-900">{{ data?.new }}</p>
                    </div>
                    <div class="bg-green-100 rounded-lg p-6 flex flex-col items-center select-none">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">დადასტურებული</h3>
                        <p class="text-4xl font-bold text-green-900">{{ data?.approved }}</p>
                    </div>
                    <div class="bg-yellow-100 rounded-lg p-6 flex flex-col items-center select-none">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">შეჩერებული</h3>
                        <p class="text-4xl font-bold text-yellow-900">{{ data?.stopped }}</p>
                    </div>
                    <div class="bg-red-100 rounded-lg p-6 flex flex-col items-center select-none">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">დახარვეზებული</h3>
                        <p class="text-4xl font-bold text-red-900">{{ data?.rejected }}</p>
                    </div>
                </div>

                <table class="w-full bg-white rounded-lg overflow-hidden">
                    <tbody>
                        <tr v-if="user?.permission == 'company'">
                            <th class="p-4 select-none text-left font-semibold text-gray-700">კომპანიის დასახელება</th>
                            <td class="p-4 select-none text-gray-900">{{ user?.company_name }}</td>
                        </tr>
                        <tr v-if="user?.permission == 'company'">
                            <th class="p-4 select-none text-left font-semibold text-gray-700">საიდენტიფიკაციო კოდი</th>
                            <td class="p-4 select-none text-gray-900">{{ user?.identification_code }}</td>
                        </tr>
                        <tr v-if="user?.permission != 'company'">
                            <th class="p-4 select-none text-left font-semibold text-gray-700">მომხმარებელი</th>
                            <td class="p-4 select-none text-gray-900">{{ user?.name }}</td>
                        </tr>
                        <tr>
                            <th class="p-4 select-none text-left font-semibold text-gray-700">ტელეფონის ნომერი</th>
                            <td class="p-4 select-none text-gray-900">{{ user?.mobile }}</td>
                        </tr>
                        <tr>
                            <th class="p-4 select-none text-left font-semibold text-gray-700">ელ. ფოსტა</th>
                            <td class="p-4 select-none text-gray-900">{{ user?.email }}</td>
                        </tr>
                        <tr>
                            <th class="p-4 select-none text-left font-semibold text-gray-700">ანგარიშის სტატუსი</th>
                            <td class="p-4 select-none">
                                <span :class="user?.status === 'pending' ? 'bg-yellow-100 text-yellow-900' : 'bg-green-100 text-green-900'" class="inline-block px-3 py-1 rounded-md text-sm select-none">
                                    {{ user?.status == 'pending' ? 'დაუდასტურებელი' : 'აქტიური' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Transition>
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
                user : "",

                data : [],
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
                this.user = response.data.user;
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>
