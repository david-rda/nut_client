<template>
    <div>
        <MyHeader />

        <div class="container" style="margin-top: 90px">
            <div class="row justify-content-center">
                <div class="col-6">
                    <form @submit.prevent="report()">
                        <div class="form-group mb-3">
                            <label for="datetime-picker1">საიდან</label>
                            <flat-pickr class="form-control" id="datetime-picker1" v-model="from" :config="flatpickrOptions"></flat-pickr>
                        </div>
                        <div class="form-group mb-3">
                            <label for="datetime-picker2">სადამდე</label>
                            <flat-pickr class="form-control" id="datetime-picker2" v-model="to" :config="flatpickrOptions"></flat-pickr>
                        </div>
                        <div class="form-group mb-3">
                            <label for="status">სადამდე</label>
                            <select class="form-select" v-model="status" id="status">
                                <option value="all" selected disabled>სტატუსი</option>
                                <option value="operator">გადაწერილია ოპერატორზე</option>
                                <option value="new">ახალი</option>
                                <option value="correction">დახარვეზებული</option>
                            </select>
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
    import axios from 'axios';

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
                status : "all",

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
                window.open("https://nuts.rda.gov.ge/api/statement/report/" + this.from + "/" + this.to + "/" + this.status + "/" + this.user_id);
            }
        }
    }
</script>
