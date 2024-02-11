<template>
    <div>
        <MyHeader />

        <div class="container-fluid" style="margin-top: 93px">
            <div class="row vh-100">
                <div class="col-6"></div>
                <div class="col-6">
                    <iframe width="100%" height="100%" :src="'http://localhost:8000/api/statement/pdf/' + this.$route.params.id"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/Header.vue";

    export default {
        name : "StatementRead",

        components : {
            MyHeader,
        },

        data() {
            return {
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,
            }
        },

        mounted() {
            document.title = "განაცხადი";
        }
    }
</script>
