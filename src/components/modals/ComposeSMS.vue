<template>
  <div>
    <b-modal class="modal" id="composeSMSModal" hide-footer>
      <template #modal-title class="modal-header">
        <h5 class="modal-title">Compose</h5>
      </template>
      <div class="modal-body"></div>
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$bvModal.hide("composeSMSModal");
    },
  },
};
</script>

<style scoped>
</style>