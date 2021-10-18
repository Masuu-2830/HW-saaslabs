<template>
    <div class="df-settings sidebar-integration  d-none d-md-block integrations-settings-sidebar-btn" :class="isOpen && 'show'">
        <a :class="[ 'df-settings-link-' + integration_data.lname , 'df-' + integration_data.lname + '-settings  all_icon integrations-settings-sidebar']" @click="openInt" data-toggle="tooltip" :title="integration_data.name" style="left: -44px; background: transparent; border-right: none; display: flex;" :style="'top:'+ integration_data.pixel +'px !important;'">
            <img :src="integration_data.icon" width="30" height="30" />
        </a>
        <div class="df-settings-body pd-l-10 pd-r-15" :class="[integration_data.lname + '-integrations-width', isOpen && 'open']" :id="integration_data.lname + '-scrolling'">
            <div class="pd-t-20">
                <label class="tx-sans tx-10 tx-uppercase tx-bold tx-spacing-1 tx-color-02 mg-b-15">{{ integration_data.name }}</label>
                <!-- <div class="d-flex align-items-start" :id="integration_data.lname + '-loading-window'">
                    <div class="spinner-border spinner-border-sm mg-r-10" role="status"></div>
                    <p :class="integration_data.lname + '_main_loading'" style="color: grey">Data Loading...</p>
                </div> -->
                <p :class="integration_data.lname + '_main_loading'" style="display: none;color: grey">Loading...</p>
            </div>
            <div :id="integration_data.lname + '-data'">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["integration_data"],
        data(){
            return {
                isOpen: false
            }
        },
        methods: {
            openInt(){
                this.isOpen = !this.isOpen;
                this.$emit("openInt", this.integration_data.name);
            },
            // changePixels(){
            //     console.log("pixels",this.pixel);
            //     let changedpixel = this.pixel + 50;
            //     this.pixel = changedpixel;
            //     return changedpixel;
            // }
        },
        computed: {
            // settingsStyleShow: function () {
            //     return {
            //         backgroundColor: '#fff',
            //         border: '#c0ccda',
            //         color: '#1c273c',
            //         boxShadow: 'none'
            //     }
            // },
            // settingsStyle: function () {
            //     return {
            //         position: 'absolute',
            //         top: '98px',
            //         left: '-44px',
            //         width: '45px',
            //         height: '45px',
            //         backgroundColor: '#fff',
            //         color: '#7987a1',
            //         display: 'flex',
            //         align: 'center',
            //         justify: 'center',
            //         border: '1px solid #c0ccda'
                    
            //         // border-right-width: '0',
            //         // border-top-left-radius: 0.25rem;
            //         // border-bottom-left-radius: 0.25rem;
            //         // transition: all 0.2s ease-in-out;
            //         // z-index: 1;
            //     }
            // }
        }
    }
</script>

<style scoped>
    .integrations-settings-sidebar.show .integrations-settings-sidebar,
    .integrations-settings-sidebar.show .integrations-settings-sidebar:hover,
    .integrations-settings-sidebar.show .integrations-settings-sidebar:focus {
        background-color: #fff;
        border-color: #c0ccda;
        color: #1c273c;
        box-shadow: none;
    } 
    .integrations-settings-sidebar {
        position: absolute;
        top: 98px;
        left: -44px;
        width: 45px;
        height: 45px;
        background-color: #fff;
        color: #7987a1;
        display: flex;
        align-items: center;
        justify-content: center;
        /* border: 1px solid #c0ccda; */
        /* border-right-width: 0; */
        /* border-top-left-radius: 0.25rem; */
        /* border-bottom-left-radius: 0.25rem; */
        /* transition: all 0.2s ease-in-out; */
        transition: all .3s cubic-bezier(.4,0,.2,1);
        z-index: 1;
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
    .fas.fa-caret-down{
        transition: transform 250ms ease;
        transform: rotateZ(0deg);
    }
    .fas.fa-caret-down.on{
        transform: rotateZ(180deg);
    }
    /* .df-settings-body.easy-calendar-integrations-width{
        width: 300px !important;
    } */

    .df-settings.show.integrations-settings-sidebar-btn {
        right: 300px;
    }
    body > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-right.datepicker-orient-bottom{
        width: 200px !important;
        left: 1219px;
    }
</style>