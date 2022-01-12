<template>
  <div
    class="comment-body"
    :id="'comment-options-'+item.data.id"
    style="margin-left: 20px; margin-top: 20px; margin-right: 20px"
  >
    <div class="comment d-flex justify-content-between align-items-center">
      <div
        class="avtar-message d-flex justify-content-start align-items-center"
      >
        <div v-html="item.data.by.avatarTag" class="avatar">
        </div>
        <div
          class="
            message-name
            d-flex
            flex-column
            justify-content-start
            align-items-start
          "
          style="margin-left: 10px; margin-bottom: 10px"
        >
          <span class="tx-12" style="font-weight: 300">{{ item.data.by.firstname}} {{ item.data.by.lastname}}</span>
          <div
            class="
              msg-del-wrapper
              d-flex
              justify-content-between
              align-items-center
            "
          >
            <div
              class="card"
              style="padding: 5px; background-color: #feedaf; max-width: 650px"
            >
              <div v-html="item.data.body" class="tx-13" :id="'edit-comment-'+item.data.id">
                
              </div>
              <div class="list-group" :id="'edit-comment-attachment-'+item.data.id"></div>
            </div>
            <span
              ><div class="edit-comment-btn ml-1" :id="'edit-comment-btn-'+item.data.id">
                <svg
                  style="color: #8392a5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-edit-2"
                >
                  <path
                    d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                  ></path>
                </svg></div
            ></span>
            <span
              ><div class="delete-comment-btn ml-1">
                <svg
                  style="color: #8392a5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-trash"
                  height="18"
                  width="18"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg></div
            ></span>
          </div>
        </div>
      </div>
      <div
        class="comment-time hw_rel-date text-right tx-12"
        :data_date="item.data.at"
        style="min-width: 180px; font-weight: 300"
      >
        {{ item.timestamp | moment("from", "now") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MailContentComment",
  props: {
    item: Object,
  },
};
</script>

<style>
</style>