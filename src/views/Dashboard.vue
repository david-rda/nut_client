<template>
    <div>
        <MyHeader />
    </div>
</template>

<script>
    import MyHeader from "../components/Header.vue";

    export default {
        name : "DashBoard",

        components : {
            MyHeader,
        },

        data() {
            return {
                user_id : JSON.parse(window.localStorage.getItem("user")).user_id,
                permission : JSON.parse(window.localStorage.getItem("user")).permission,
            }
        },
    }
</script>
