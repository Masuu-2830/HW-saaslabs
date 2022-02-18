<template>
    <b-modal class="modal" id="firebaseModal" hide-footer>
        <template #modal-title class="modal-header">
            <h5 class="modal-title">Attention!!</h5>
        </template>
        <div class="modal-body">
            {{ this.$store.state.firebaseModal }}
            <div
                class="d-flex align-items-center justify-content-center"
                style="margin-top: 10px"
            >
                <button
                    type="button"
                    @click.stop.prevent="closeModal"
                    class="btn btn-xs btn-primary"
                >
                    Ok
                </button>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import {bus} from "../../main";
    export default {
        methods: {
            closeModal(){
                this.$bvModal.hide('firebaseModal');
                this.$store.dispatch('updateFirebaseModal', '');
                bus.$emit("broad");
            },
        },
    }
</script>

<style scoped>
</style>