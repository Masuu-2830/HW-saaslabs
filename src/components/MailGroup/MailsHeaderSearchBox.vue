<template>
  <div class="mail-group-header">
      <div class="search-form">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-search"
          onclick="$('#search-threads').trigger($.Event('keypress',{which:13}))"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          id="search-threads"
          class="form-control"
          v-model="squery"
          v-on:keyup.enter="submit"
          :placeholder="'Search'"
        />
        <a
          class="collapsed"
          :class="isCompact ? 'd-none' : ''"
          data-toggle="collapse"
          id="adv-arrow-down"
          href="#adv-form-collapse"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          ><svg
            focusable="false"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 10l5 5 5-5z"></path>
            <path d="M0 0h24v24H0z" fill="none"></path></svg
        ></a>
        <a
          class="collapsed"
          style="display: none"
          data-toggle="collapse"
          id="adv-arrow-up"
          href="#adv-form-collapse"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M7 14l5-5 5 5H7z"></path></svg
        ></a>
      </div>
      <div
        class="mg-t-5 collapse"
        id="adv-form-collapse"
        style="width: 104%; margin-left: -21px"
      >
        <div class="card card-body" style="padding-bottom: 0px; z-index: 1">
          <form class="col-md-11 col-sm-12 offset-md-1" id="adv-search-form">
            <div class="row mg-b-10">
              <div class="d-flex col-5">
                <label
                  for="formGroupExampleInput "
                  class="tx-color-03 col-3 d-block pt-2"
                  >From
                </label>
                <input
                  type="text"
                  class="col form-control"
                  id="adv-from"
                  style="height: calc(1.5em + 0.782rem + 0px)"
                  placeholder=""
                />
              </div>
              <div class="d-flex col-5">
                <label
                  for="formGroupExampleInput2 "
                  class="tx-color-03 col-3 d-block pt-2"
                  >To
                </label>
                <input
                  type="text"
                  id="adv-to"
                  style="height: calc(1.5em + 0.782rem + 0px)"
                  class="col form-control"
                  placeholder=""
                />
              </div>
            </div>
            <div class="row mg-b-10">
              <div class="d-flex col-5">
                <label
                  for="formGroupExampleInput2 "
                  class="tx-color-03 col-3 d-block pt-2"
                  >Cc
                </label>
                <input
                  type="text"
                  id="adv-cc"
                  style="height: calc(1.5em + 0.782rem + 0px)"
                  class="col form-control"
                  placeholder=""
                />
              </div>
              <div class="d-flex col-5">
                <label
                  for="formGroupExampleInput2 "
                  class="tx-color-03 col-3 d-block pt-2"
                  >Bcc
                </label>
                <input
                  type="text"
                  id="adv-bcc"
                  style="height: calc(1.5em + 0.782rem + 0px)"
                  class="col form-control"
                  placeholder=""
                />
              </div>
            </div>
            <div class="row mg-b-10">
              <div class="d-flex col-5">
                <label
                  for="formGroupExampleInput2 "
                  class="tx-color-03 col-3 d-block pt-2"
                  >Subject
                </label>
                <input
                  type="text"
                  id="adv-subject"
                  style="height: calc(1.5em + 0.782rem + 0px)"
                  class="col form-control"
                  placeholder=""
                />
              </div>
              <div class="d-flex col-5">
                <label
                  for="formGroupExampleInput2 "
                  class="tx-color-03 col-3 d-block pt-2"
                  >Has word
                </label>
                <input
                  type="text"
                  id="adv-body"
                  style="height: calc(1.5em + 0.782rem + 0px)"
                  class="col form-control"
                  placeholder=""
                />
              </div>
            </div>
            <div class="row mg-b-10">
              <div class="d-flex col-5">
                <label
                  for="formGroupExampleInput2 "
                  style=""
                  class="tx-color-03 col-3 d-block pt-2"
                  >Date range</label
                >
                <input
                  type="text"
                  id="adv-date-start"
                  style="height: calc(1.5em + 0.782rem + 0px)"
                  class="col form-control"
                  placeholder=""
                />
              </div>
              <div class="d-flex col-5">
                <label
                  for="formGroupExampleInput "
                  class="tx-color-03 col-3 d-block pt-2"
                  >Thread is
                </label>
                <select
                  class="col form-control"
                  id="thread-status"
                  style="height: calc(1em + 0.782rem + 0px); width: 100%"
                  placeholder=""
                >
                  <option value="0">Select</option>
                  <option value="1">Closed</option>
                  <option value="2">Snoozed</option>
                  <option value="3">Open</option>
                </select>
              </div>
            </div>
            <div class="row mg-b-10">
              <div class="d-flex col-5">
                <label
                  for="formGroupExampleInput "
                  class="tx-color-03 col-3 d-block pt-2"
                  >Has tag
                </label>
                <select
                  class="col form-control"
                  multiple="multiple"
                  id="adv-search-tag"
                  style="height: calc(1em + 0.782rem + 0px); width: 100%"
                  placeholder=""
                >
                  <option value="0">Select tag</option>
                </select>
              </div>
              <div class="d-flex col-5">
                <label
                  for="formGroupExampleInput2 "
                  class="tx-color-03 col-3 d-block pt-2"
                  >Notes
                </label>
                <input
                  type="text"
                  id="adv-notes"
                  style="height: calc(1.5em + 0.782rem + 0px)"
                  class="col form-control form-control-sm"
                  placeholder=""
                />
              </div>
            </div>
            <div class="row mg-l-3 mg-b-10">
              <div class="col-5">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="adv-trash"
                    name="customRadio"
                    class="custom-control-input"
                  />
                  <label
                    class="custom-control-label tx-color-03"
                    for="adv-trash"
                    >Include Trash</label
                  >
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="adv-spam"
                    name="customRadio"
                    class="custom-control-input"
                  />
                  <label class="custom-control-label tx-color-03" for="adv-spam"
                    >Include Spam</label
                  >
                </div>
              </div>
              <div class="col-5">
                <button
                  class="btn btn-primary float-right mg-l-8"
                  type="submit"
                  id="adv-search"
                >
                  Search
                </button>
                <button
                  class="btn btn-secondary float-right"
                  type="cancel"
                  id="adv-clear"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import { bus } from '../../main';
export default {
    name: 'MailsHeaderSearchBox',
    data() {
      return {
        isCompact: false,
        squery: ""
      }
    },
    created() {
      bus.$on('compact', (data) => {
          this.isCompact = true;
      });
      bus.$on('broad', () => {
          this.isCompact = false;
      });
      bus.$on('changeType', () => {
          this.squery = "";
      });
    },
    methods: {
      submit() {
        this.$emit('squery', this.squery);
      }
    }
}
</script>

<style>

</style>