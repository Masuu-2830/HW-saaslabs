<template>
  <div class="inbox-sidebar col-3 h-100">
    <ul class="list-group h-100">
      <li class="list-group-item">
        <form autocomplete="off">
          <input
            type="text"
            id="hw-setting-inboxes-search-maibox"
            placeholder="Search Inbox"
            class="form-control"
          />
        </form>
      </li>
      <li
        class="list-group-item h-100"
        style="padding: 0px; padding-right: 0px; overflow-y: scroll"
      >
        <div
          class="nav flex-column"
          id="v-pills-tab-inboxes"
          role="tablist"
          aria-orientation="vertical"
        >
          <a v-for="mailbox in mailboxes" :key="mailbox.id"
            class="nav-link setting-inboxes-mailbox"
            :class="{ 'bd bg-gray-50': activeInd == mailbox.id }"
            :id="'v-pills-'+mailbox.id+'-tab'"
            role="tab"
            style="
              cursor: pointer;
              padding: 0px;
              
            "
            :style="activeInd == mailbox.id && 'border-left-color: rgb(1, 104, 250);border-left-width: medium;'"
            @click="clickMail(mailbox.id)"
          >
            <div class="pd-y-10 pd-x-10">
              <h6 class="tx-13 mg-b-3">{{mailbox.displayName}}</h6>
              <p class="mg-b-0 tx-12">{{mailbox.externalAddress}}</p>
            </div>
          </a>
          
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'SCInboxSidebar',
    props: {
      mailboxes: Array
    },
    data() {
      return {
        activeInd: '',
      }
    },
    methods: {
      clickMail(ind) {
        this.activeInd = ind;
        console.log(ind);
      }
    }
};
</script>

<style>
</style>