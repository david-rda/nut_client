<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 90px">
            <div class="row justify-content-center">
                <div class="col-6">
                    <form @submit.prevent="report()">
                        <div class="form-group mb-3">
                            <label for="datetime-picker1">თარიღიდან</label>
                            <flat-pickr class="form-control" id="datetime-picker1" v-model="from" :config="flatpickrOptions"></flat-pickr>
                        </div>
                        <div class="form-group mb-3">
                            <label for="datetime-picker2">თარიღამდე</label>
                            <flat-pickr class="form-control" id="datetime-picker2" v-model="to" :config="flatpickrOptions"></flat-pickr>
                        </div>
                        <div class="form-group mb-3 d-grid">
                            <input type="submit" class="btn btn-success" value="ჩამოტვირთვა">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../components/Header.vue";
    import FlatPickr from "vue-flatpickr-component";
    import 'flatpickr/dist/flatpickr.css';

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
            }
        },

        mounted() {
            document.title = "მთავარი";
        },

        methods : {
            report() {
                window.open("https://nuts.rda.gov.ge/api/statement/report/" + this.from + "/" + this.to + "/" + this.user_id);
            }
        }
    }
</script>
