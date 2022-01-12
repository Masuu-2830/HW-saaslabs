<template>
  <div
    v-if="item.cardType == 'log'"
    class="
      d-flex
      tx-13 tx-gray-800
      assignment-log
      thread-log
      justify-content-between
    "
    style="margin-left: 20px; margin-top: 0px; margin-right: 20px; padding-bottom: 15px"
  >
    <span class="col-6 offset-3 text-center">
        {{ item.data.body }}
    </span>
    <div class="col-3 text-right px-0" v-on:mouseover="mouseover" v-on:mouseleave="mouseleave">
        <span
        v-if="show"
        class="hw_rel-date col-3 text-right px-0"
        :data_date="item.data.at"
        style="min-width: 180px"
        >{{ this.item.timestamp | moment("from", "now") }}</span
        >
        <span
        v-if="!show"
        class="hw_rel-date col-3 text-right px-0"
        :data_date="item.data.at"
        style="min-width: 180px"
        >{{ this.item.timestamp | moment("MMM D, YYYY hh:mm a") }}</span
        >
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatContentLog",
  props: {
    item: Object,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    mouseover: function () {
      this.show = false;
    },
    mouseleave: function () {
      this.show = true;
    },
  },
};
</script>

<style>
</style>