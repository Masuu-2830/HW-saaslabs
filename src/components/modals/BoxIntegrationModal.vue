<template>
    <b-modal class="modal" id="box-integration-modal" hide-footer>
        <template #modal-title class="modal-header">
            <h5 class="modal-title">Pick files from Box</h5>
            <!-- <b-button @click="closeModal" class="close"><span aria-hidden="true">&times;</span></b-button> -->
        </template>
        <div class="modal-body">
            <div class="boxIntegration">
            </div>
        </div>
    </b-modal>
</template>

<script>
    import {bus} from "../../main";
    export default {
        data(){
            return{
                
            }
        },
        methods: {
            closeModal(){
                this.$bvModal.hide('box-integration-modal');
            },
            showModal(){
                this.$bvModal.show('box-integration-modal');
            },
        },
    }
</script>

<style scoped>
    
</style>