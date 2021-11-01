<template>
    <div>
        <button class="btn" :class="{'selected': isActive}" @click="openInt" data-toggle="tooltip" title="{{integration.name}}">
            <img src="{{integration.icon}}" />
        </button>
    </div>
</template>

<script>
    export default {
        props: ["integration"],
        data(){
            return {
                isActive: true
            }
        },
        methods: {
            openInt(){
                this.$emit("openInt", this.integration.name);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>