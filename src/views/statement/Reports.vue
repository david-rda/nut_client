<template>
    <div>
        <MyHeader />

        <Transition name="fade" appear>
            <div class="container p-4 w-full mx-auto rounded-lg mt-25">
                <form @submit.prevent="report()">
                    <div class="flex flex-col w-full">
                        <div class="mb-5 w-full">
                            <label for="datetime-picker1" class="block mb-1">თარიღიდან</label>
                            <flat-pickr class="w-full md:w-1/3 p-3 rounded-md bg-white border border-gray-200 outline-none hover:bg-gray-200 transition duration-200 disabled:opacity-20" id="datetime-picker1" v-model="from" :config="flatpickrOptions" :disabled="disabled"></flat-pickr>
                        </div>
                        <div class="mb-5 w-full">
                            <label for="datetime-picker2" class="block mb-1">თარიღამდე</label>
                            <flat-pickr class="w-full md:w-1/3 p-3 rounded-md bg-white border border-gray-200 outline-none hover:bg-gray-200 transition duration-200 disabled:opacity-20" id="datetime-picker2" v-model="to" :config="flatpickrOptions" :disabled="disabled"></flat-pickr>
                        </div>
                    </div>
                    <button type="submit" class="bg-green-900 text-white p-3 rounded-md w-full md:w-1/3 cursor-pointer hover:bg-green-800 transition duration-200 disabled:opacity-20 disabled:cursor-not-allowed flex gap-2 items-center justify-center" :disabled="disabled">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <span>ჩამოტვირთვა</span>
                    </button>
                </form>
            </div>
        </Transition>
    </div>
</template>

<script>
    import MyHeader from "../../components/Header.vue";
    import FlatPickr from "vue-flatpickr-component";
    import 'flatpickr/dist/flatpickr.css';
    import axios from "axios";

    export default {
        name : "MyReport",

        components : {
            MyHeader,
            FlatPickr
        },

        data() {
            return {
                user_id : JSON.parse(window.localStorage.getItem("user")).id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,

                from : new Date().toISOString().split('T')[0],
                to : new Date().toISOString().split('T')[0],

                flatpickrOptions: {
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                },

                disabled : false
            }
        },

        mounted() {
            document.title = "მთავარი";
        },

        methods : {
            report() {
                // window.open("/api/statement/report/" + this.from + "/" + this.to + "/" + this.user_id);

                const _this_ = this;

                this.disabled = true;

                axios.get("/statement/report/" + this.from + "/" + this.to + "/" + this.user_id, {
                    responseType: 'blob',
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("token"))
                    }
                }).then(function(response) {
                    _this_.disabled = false;
                    const blob = response.data;
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'report.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }).catch(function(err) {
                    console.log(err);
                    _this_.disabled = false;
                });
            }
        }
    }
</script>
