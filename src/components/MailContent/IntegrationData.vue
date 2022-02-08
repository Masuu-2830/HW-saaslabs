<template>
    <!-- <a :class="[ 'df-settings-link-' + integration_data.lname , 'df-' + integration_data.lname + '-settings  all_icon integrations-settings-sidebar']" @click="openInt" data-toggle="tooltip" :title="integration_data.name" style="left: -44px; background: transparent; border-right: none; display: flex;" :style="'top:'+ integration_data.pixel +'px !important;'"> -->
    <div 
        :class="[ 'df-settings-link-' + integration_data.lname , 'df-' + integration_data.lname + '-settings all_icon integrations-settings-sidebar', activeInt == integration_data.lname ? 'active' : '']"
        @click="openInt" 
        data-toggle="tooltip" 
        :title="integration_data.name"
    >
        <img :src="integration_data.icon" width="30" height="30" />
    </div>
</template>

<script>
    export default {
        props: ["integration_data", "activeInt"],
        data(){
            return {
                isOpen: false
            }
        },
        methods: {
            openInt(){
                this.isOpen = !this.isOpen;
                this.$emit("openInt", this.integration_data);
            }
        },
        computed: {
        }
    }
</script>

<style scoped>
    .integrations-settings-sidebar {
        width: 45px;
        height: 45px;
        background: transparent;
        /* color: #7987a1; */
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .3s cubic-bezier(.4,0,.2,1);
        z-index: 1;
        border-radius: 50%;
    }
    @media (prefers-reduced-motion: reduce) {
        .integrations-settings-sidebar {
            transition: none;
        }
    } 
    .integrations-settings-sidebar:hover,
    .integrations-settings-sidebar:focus {
        color: #1c273c;
        border-color: #8392a5;
        box-shadow: 0 0 10px 2px rgba(28, 39, 60, 0.1);
    }
    .integrations-settings-sidebar svg {
        width: 20px;
        height: 20px;
    }

    .integrationIcons.open .integrations-settings-sidebar.active{
        background: #fff;
        box-shadow: 0 0 20px 4px rgba(0,0,0,0.16);
    }
    .fas.fa-caret-down{
        transition: transform 250ms ease;
        transform: rotateZ(0deg);
    }
    .fas.fa-caret-down.on{
        transform: rotateZ(180deg);
    }
    body > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-right.datepicker-orient-bottom{
        width: 200px !important;
        left: 1219px;
    }
</style>