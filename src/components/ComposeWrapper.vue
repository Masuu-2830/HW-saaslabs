<template>
    <div id="composeWindowWrapper" v-if="show">
        <compose v-for="(composer, index) in composers" :key="composer.id" :align="index" :composer="composer" />
    </div>
</template>

<script>
import { bus } from "../main";

import Compose from "./Compose.vue";
export default {
    name: "ComposeWrapper",
    components: {Compose},
    data() {
        return {
            composers: [],
            show: false
        }
    },
    created() {
        bus.$on("openCompose", (data, email) => {
            console.log("openingg",data, email);
            if(email == undefined) {
                let obj = { hash: data };
                this.composers.push(obj);
            } else {
                email["hash"] = data;
                this.composers.push(email);
            }
            this.show = true;
            console.log(this.composers);
        });
        bus.$on("closeCompose", (data) => {
            console.log("closing",data);
            // Vue.delete(this.compose, data);
            this.composers = this.composers.filter(el => el.hash !== data);
            console.log(this.composers);
        });
    }
}
</script>

<style>

</style>