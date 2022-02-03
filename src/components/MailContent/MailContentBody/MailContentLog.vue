<template>
  <div
    v-if="
      this.$store.state.inboxData.type == 'mail' ||
      this.$store.state.inboxData.type == 'chat' ||
      this.$store.state.inboxData.type == 'sms'
    "
    class="tx-12 thread-log row text-center assignment-log"
    style="padding-right: 40px"
  >
    <span class="col-6 offset-3 text-center">
      {{ item.data.body }}
    </span>
    <div
      class="col-3 text-right px-0"
      v-on:mouseover="mouseover"
      v-on:mouseleave="mouseleave"
    >
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
  <div
    v-else
    class="
      d-flex
      tx-13 tx-gray-800
      assignment-log
      thread-log
      justify-content-between
    "
    style="margin: auto; max-width: 600px; margin-top: 0px"
  >
    <div>{{ item.data.body }}</div>
    <div
      v-if="show"
      v-on:mouseover="mouseover"
      v-on:mouseleave="mouseleave"
      class="hw_rel-date text-right"
      :data_date="item.data.at"
      style="min-width: 180px"
    >
      {{ this.item.timestamp | moment("from", "now") }}
    </div>
    <div
      v-if="!show"
      v-on:mouseover="mouseover"
      v-on:mouseleave="mouseleave"
      class="hw_rel-date text-right"
      :data_date="item.data.at"
      style="min-width: 180px"
    >
      {{ this.item.timestamp | moment("MMM D, YYYY hh:mm a") }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MailContentLog",
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