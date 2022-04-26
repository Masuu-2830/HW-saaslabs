<template>
  <div class="flex-column mail-group-header" style="position: relative; height: 40px; justify-content: center">
    <div class="d-flex justify-content-around">
      <div
        v-for="type in types"
        :key="type.name"
        class=""
        style="
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <router-link
          :to="{
            name: 'type',
            params: {
              type: $store.state.type,
              mailboxId: $store.state.inboxData.id,
              filterSection: type.type == 'all' ? 'open' : type.type,
              pageNo: 1,
            },
          }"
        >
          <p
            class="filterP"
            :class="
              $store.state.filterSection == type.type ||
              ($store.state.filterSection == 'open' && type.type == 'all')
                ? 'isActive'
                : ''
            "
            :style="
              $store.state.openThread == null
                ? 'padding: 0.3rem 1.5rem;'
                : 'padding: 0.1rem 0.5rem;'
            "
          >
            <span style="cursor: pointer">{{ type.name }}</span>
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MailsTypeFilter",
  data() {
    return {
      types: {
        0: {
          name: "Open",
          type: "all",
        },
        1: {
          name: "Closed",
          type: "closed",
        },
        2: {
          name: "Snoozed",
          type: "snoozed",
        },
        3: {
          name: "Trash",
          type: "trash",
        },
      },
    };
  },
};
</script>

<style scoped>
.isActive {
  color: #0168fa;
  background-color: #eef0f7;
  border-radius: 1rem;
  font-weight: bold;
}

.filterP {
  display: table-cell;
  margin-bottom: 0;
  text-align: center;
  vertical-align: middle;
  height: 25px;
  min-width: 100%;
  /* display: flex; */
  justify-content: center;
}
</style>