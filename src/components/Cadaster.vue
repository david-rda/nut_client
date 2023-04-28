<template>
    <div>
        <header-navigation></header-navigation>

        <div class="data-block container">
            <div class="forms">
                <form>
                    <div class="form-group">
                        <label for="check">პირადი ნომერი</label>
                        <input type="text" placeholder="შეიყვანეთ პირადი ნომერი" v-model="personal" maxlength="11">
                    </div><br>
                    <div class="form-group">
                        <button type="submit">ძებნა</button>
                    </div>
                </form>
            </div>

            <br>

            <center><div v-if="loading" class="spinner-border text-success"></div></center>
        </div>
    </div>
</template>

<script>
    import HeaderNavigation from "./layouts/Header.vue";

    export default {
        name : "NutsCadaster",

        components : {
            "header-navigation" : HeaderNavigation
        },

        data() {
            return {
                personal : "",
                check : null,
                loading: ""
            }
        },

        methods: {

        },

        mounted() {
            document.title = "თხილის კადასტრი";
        }
    }
</script>

<style scoped lang="scss">
    * {
        box-sizing: border-box;
    }

    .status {
        background-color: #d9534f;
        padding: 5px;
        color: #fff;
        margin-top: 10px;
        border-radius: 4px;
        display: flex;
        align-content: center;

        p {
            padding-top: 14px;
            padding-left: 10px;
        }
    }

    .status_ok {
        background-color: lighten(#005019, 15%);
        padding: 5px;
        color: #fff;
        margin-top: 10px;
        border-radius: 4px;
        display: flex;
        align-content: center;

        p {
            padding-top: 14px;
            padding-left: 10px;
        }
    }

    label {
        color: #3c3c3c;
        font-family: "frutiger_geo";
    }

    .data-block {
        margin-top: 40px;
        background-color: #fff;
        padding: 20px;
        overflow: hidden;
        font-family: "frutiger_geo_regular";
    }

    input[type="text"] {
        width: 100%;
        height: 55px;
        padding: 0 15px;
        color: #3c3c3c;
        background-color: #f3f3f3;
        border: 1px solid transparent;
        border-radius: 4px;
        outline: none;
        margin-top: 10px;
        font-family: "frutiger_geo_regular";
    }

    button {
        width: 100%;
        height: 55px;
        padding: 0 15px;
        border: none;
        color: #005019;
        background-color: #82be00;
        text-transform: uppercase;
        font-weight: 900;
        cursor: pointer;
        border-radius: 4px;
        font-family: "frutiger_geo_caps" !important;
        font-size: 20px;

        &:hover {
            color: #fff;
            background-color: #005019;
        }
    }
</style>