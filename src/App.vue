<template>
    <router-view></router-view>
</template>

<script>
    export default {
        
    }
</script>


<style>
    * {
        box-sizing: border-box;
    }

    html, body {    
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
    }

    @font-face {
        font-family: "frutiger_geo_regular";
        src: url("./fonts/Linotype - Neue Frutiger Georgian Regular.otf");
    }

    @font-face {
        font-family: "frutiger_geo_caps";
        src: url("./fonts/NeueFrutigerGeorgianCAPS-Black.ttf");
    }

    th, td {
        font-family: "frutiger_geo_regular";
        font-weight: 300;
    }
</style>