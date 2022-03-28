<template>
  <div class="row" style="height: 40px; align-items: center">
    <div class="col-sm" style="text-align: center; display: table; justify-content: center">
      <p class="filterP isActive">
        <span style="cursor: pointer">Open</span>
      </p>
    </div>
    <div class="col-sm" style="text-align: center; display: table; justify-content: center">
      <p class="filterP">
        <span style="cursor: pointer">Archived</span>
      </p>
    </div>
    <div class="col-sm" style="text-align: center; display: table; justify-content: center">
      <p class="filterP">
        <span style="cursor: pointer">Snoozed</span>
      </p>
    </div>
    <div class="col-sm" style="text-align: center; display: table; justify-content: center">
      <p class="filterP">
        <span style="cursor: pointer">Trash</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MailsTypeFilter",
};
</script>

<style scoped>

.isActive {
  color: #0168fa;
  background-color: #eef0f7;
  border-radius: 1rem;
}

.filterP {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  height: 25px;
  width: 50%;
  /* display: flex; */
  justify-content: center;
}
</style>