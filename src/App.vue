<template>
    <router-view></router-view>
</template>

<script>
    export default {
        
    }
</script>


<style>
    @import url("./assets/css/style.css");

    @font-face {
        font-family: "google-sans";
        src: url("./assets/fonts/google-sans.woff2");
    }

    @font-face {
        font-family: "firago";
        src: url("./assets/fonts/FiraGO-Regular.otf");
    }

    * {
        box-sizing: border-box;
        font-family: "firago" !important;
    }

    .bg-image {
        background-image: url("./assets/images/village.jpg");
        background-size: cover;
        background-repeat: no-repeat;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>