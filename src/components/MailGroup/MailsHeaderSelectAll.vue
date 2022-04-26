<template>
  <div
    v-if="this.$store.state.stateLoaded"
    class="mail-group-header justify-content-center"
    style="position: relative; height: 40px; /* border-top: 1px solid rgba(72, 94, 144, 0.16);*/ border-bottom: none"
  >
    <div
      class="row flex-column d-flex"
      id="mails-toolbar"
      style="padding-left: 12px"
    >
      <div class="d-flex justify-content-between">
        <div
          id="bulk-operations-container"
          class="justify-content-between align-items-center d-flex"
        >
          <div class="custom-control custom-checkbox mr-2">
            <input
              type="checkbox"
              @click="checkAllBoxes"
              class="custom-control-input"
              id="bulk-select"
              v-model="checkAll"
            />
            <label class="custom-control-label" for="bulk-select"></label>
          </div>
          <div
            id="bulk-operations"
            class="align-items-center"
            :class="selectedIds.length && 'show'"
          >
            <span
              v-if="
                this.$store.state.type !== 'closed' && 
                this.$store.state.type !== 'trash'
              "
              @click.stop.prevent="bulkClose"
              id="bulk-close"
              data-toggle="tooltip"
              title="Close"
              class="align-items-center d-flex px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-check"
                title="Close"
                data-toggle="tooltip"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span
              v-if="
                this.$store.state.type == 'mentions'
              "
              @click.stop.prevent="bulkDone"
              id="bulk-done"
              data-toggle="tooltip"
              title="Done"
              class="align-items-center d-flex px-2"
            >
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
                class="feather feather-check-circle"
                title="Done"
                data-toggle="tooltip"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
            <span
              v-if="
                this.$store.state.type !== 'mentions' &&
                this.$store.state.type !== 'discussions' && 
                this.$store.state.type !== 'starred' &&
                this.$store.state.type !== 'snoozed' &&
                this.$store.state.type !== 'drafts' && 
                this.$store.state.type !== 'sent' && 
                this.$store.state.type !== 'scheduled' && 
                this.$store.state.type !== 'closed' && 
                this.$store.state.type !== 'spam' && 
                this.$store.state.type !== 'trash'
              "
              @click.stop.prevent="bulkRead(1)"
              id="bulk-read"
              data-toggle="tooltip"
              title="Mark Read"
              class="align-items-center d-flex px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                title="Mark Read"
                data-toggle="tooltip"
              >
                <path
                  d="M 12 1.9921875 L 2.0214844 8.8769531 L 2.0195312 8.8769531 L 2.0195312 20.041016 C 2.0195312 21.122736 2.917925 22.007812 4.015625 22.007812 L 19.982422 22.007812 C 21.080172 22.007812 21.978516 21.122816 21.978516 20.041016 L 21.978516 8.8769531 L 12 1.9921875 z M 21.978516,8.8769531 12.000047,15.761718 2.021531,8.8769531"
                ></path>
              </svg>
            </span>

            <span
              v-if="
                this.$store.state.type !== 'mentions' &&
                this.$store.state.type !== 'discussions' && 
                this.$store.state.type !== 'starred' &&
                this.$store.state.type !== 'snoozed' &&
                this.$store.state.type !== 'drafts' && 
                this.$store.state.type !== 'sent' && 
                this.$store.state.type !== 'scheduled' && 
                this.$store.state.type !== 'closed' && 
                this.$store.state.type !== 'spam' && 
                this.$store.state.type !== 'trash'
              "
              @click.stop.prevent="bulkRead(0)"
              id="bulk-unread"
              data-toggle="tooltip"
              title="Mark Unread"
              class="align-items-center d-flex px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-mail"
                title="Mark Unread"
                data-toggle="tooltip"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>

            <span
              class="
                bulk-snooze
                dropdown
                dropright
                align-items-center
                d-flex
                px-2
              "
              data-toggle="tooltip"
              title="Snooze"
            >
              <svg
                class="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                title="Snooze"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>

              <div
                class="dropdown-menu snooze-options"
                aria-labelledby="snooze-icon-${thread.id}"
                style="
                  position: absolute;
                  transform: translate3d(111px, 0px, 0px);
                  top: 0px;
                  left: 0px;
                  will-change: transform;
                  z-index: 99999;
                "
              >
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time
                    bulk-snooze-today-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                    @click="bulkSnooze('later today')"
                  >
                    <span>Later today</span>
                    <span class="bulk-snooze-later-today">In 3 hour</span>
                  </div>
                </button>
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time
                    bulk-snooze-tomorrow-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                    @click="bulkSnooze('tommorrow')"
                  >
                    <span>Tomorrow</span>
                    <span class="bulk-snooze-tomorrow"
                      >{{ new Date() | moment("add", "1 day", "ddd") }} 9
                      am</span
                    >
                  </div>
                </button>
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time
                    bulk-snooze-monday-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                    @click="bulkSnooze('nextMon')"
                  >
                    <span>Next Monday</span>
                    <span class="bulk-snooze-monday">9 am</span>
                  </div>
                </button>
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time
                    bulk-snooze-week-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                    @click="bulkSnooze('oneWeek')"
                  >
                    <span>One Week</span>
                    <span class="bulk-snooze-week">{{
                      new Date() | moment("add", "1 week", "ddd h a")
                    }}</span>
                  </div>
                </button>

                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time
                    bulk-snooze-month-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                    @click="bulkSnooze('oneMonth')"
                  >
                    <span>One month</span>
                    <span class="bulk-snooze-month">{{
                      new Date() | moment("add", "1 month", "DD MMM")
                    }}</span>
                  </div>
                </button>

                <div
                  v-b-modal.snooze-thread-modal
                  class="dropdown-item snooze-drop-down bulk-snooze-threads"
                >
                  <span>Pick date &amp; time</span>
                </div>
                <b-modal
                ref="snooze-thread-modal"
                  id="snooze-thread-modal"
                  size="sm"
                  title="Pick Date & Time"
                  hide-footer
                >
                  <div class="modal-body">
                    <div class="d-flex align-items-center justify-content-center">
                      <date-picker :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="30" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false"></date-picker>
                    </div>
                    <div class="d-flex align-items-center justify-content-center" style="margin-top:10px;">
                        <button type="button" @click.stop.prevent="bulkSnooze('newDate')" class="btn btn-xs btn-primary bulk-select-snooze-btn" :disabled="datetime == '' && true">Snooze</button>
                    </div>
                  </div>
                </b-modal>
              </div>
            </span>

            <span
              v-if="this.$store.state.type !== 'trash'"
              @click.stop.prevent="bulkDelete"
              id="bulk-trash"
              data-toggle="tooltip"
              title="Delete"
              class="align-items-center d-flex px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-trash"
                title="Delete"
                data-toggle="tooltip"
                data-original-title="Delete"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path>
              </svg>
            </span>

            <span
              v-if="this.$store.state.type == 'trash'"
              @click.stop.prevent="bulkPerDelete"
              id="bulk-permanent-delete"
              data-toggle="tooltip"
              title="Permanently Delete"
              class="align-items-center px-2 d-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-trash"
                title="Permanently Delete"
                data-toggle="tooltip"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path>
              </svg>
            </span>
            <span
              v-if="this.$store.state.type !== 'spam' && this.$store.state.type !== 'trash'"
              @click.stop.prevent="bulkSpam"
              id="bulk-spam"
              data-toggle="tooltip"
              title="Mark Spam"
              class="align-items-center d-flex px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-alert-octagon"
                title="Mark Spam"
                data-toggle="tooltip"
              >
                <polygon
                  points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                ></polygon>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12" y2="16"></line>
              </svg>
            </span>

            <span
              v-if="
                this.$store.state.type == 'snoozed' || 
                this.$store.state.type == 'closed' || 
                this.$store.state.type == 'spam' || 
                this.$store.state.type == 'trash'
              "              
              @click.stop.prevent="bulkMove"
              id="bulk-move-to-inbox"
              data-toggle="tooltip"
              title="Move to Inbox"
              class="align-items-center px-2 d-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                title="Move to Inbox"
                data-toggle="tooltip"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-inbox"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path
                  d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                ></path>
              </svg>
            </span>
            <span
              v-if="
                this.$store.state.type !== 'starred'
              "
              id="bulk-star-threads"
              class="align-items-center d-flex px-2"
              title="Mark as Important"
              data-toggle="tooltip"
              @click.stop.prevent="bulkStar()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-star"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                ></polygon>
              </svg>
            </span>
            <span
              v-if="
                this.$store.state.type == 'starred'
              "
              @click.stop.prevent="bulkStar()"
              id="bulk-unstar-threads"
              title="Unmark as Important"
              data-toggle="tooltip"
              class="align-items-center px-2 d-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#f4b400"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-star"
                style="color: #f4b400"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                ></polygon>
              </svg>
            </span>

            <div
              id="bulk-thread-tags"
              class="dropdown px-2 nav-link d-none d-sm-block"
              style="cursor: pointer"
              title="Add Tag"
              data-toggle="tooltip"
              data-original-title="Add Tag"
            >
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
                class="dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <path
                  d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                ></path>
                <line x1="7" y1="7" x2="7" y2="7"></line>
              </svg>

              <div
                class="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                x-placement="bottom-start"
                style="
                  position: absolute;
                  will-change: transform;
                  top: 0px;
                  left: 0px;
                  transform: translate3d(-147px, 19px, 0px);
                "
              >
                <div class="dropdown-item" style="padding: 2px !important">
                  <input
                    type="text"
                    class="form-control form-control-sm search-tag"
                    aria-describedby="emailHelp"
                    v-model="sqTag"
                    placeholder="Seach Tags..."
                  />
                </div>
                <div class="dropdown-divider mt-2 mb-2"></div>
                <div
                  class="thread-tags-list"
                  style="overflow-y: scroll; height: 200px"
                >
                  <div
                  @click.stop
                    v-for="tag in tags"
                    :key="tag.id"
                    class="dropdown-item mt-2 tagBtn"
                    :id="'bulk-' + tag.id"
                    :data-tag-id="tag.id"
                  >
                    <div
                      class="d-flex flex-row justify-content-between"
                      style="padding: 3px"
                    >
                      <div
                        class="
                          custom-control custom-checkbox
                          tagUntagCheckboxWrapper
                          d-flex
                        "
                      >
                        <input
                          type="checkbox"
                          :data-tag-id="tag.id"
                          class="custom-control-input tagUntagCheckbox"
                          :id="'bulk-thread-tag-' + tag.id"
                          :checked="tagsInAll.some(t => t === tag.id)"
                          :indeterminate.prop="tagsPartial.some(t => t === tag.id)"
                          @click.stop="toggleTags(tag.id, $event)"
                        />
                        <label
                          :for="'bulk-thread-tag-' + tag.id"
                          class="
                            d-flex
                            flex-row
                            justify-content-start
                            custom-control-label
                            tagUntagLabel
                          "
                        >
                        </label>
                      </div>
                      <div
                        class="tagClickableWrapper flex-grow-1"
                        :data-tag-id="tag.id"
                        @click="toggleTag(tag.id)"
                      >
                        <svg
                          :style="{ color: tag.color }"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="dropdown-toggle"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <path
                            d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                          ></path>
                          <line x1="7" y1="7" x2="7" y2="7"></line>
                        </svg>
                        <span class="tx-12 tagName tx-color-03 ml-2">{{
                          tag.name
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <a
                  class="dropdown-item mt-2 load-more-btn text-center"
                  style=""
                >
                  <span class="tx-13 tx-bold ml-2">Load more</span>
                </a> -->
                <a
                  @click="createTag('quick')"
                  class="dropdown-item mt-2 quick-tag-btn"
                  :style="{display: tags.findIndex(tag => tag.name == sqTag.toLowerCase().trim()) !== -1 ? 'none' : ''}"
                >
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
                    class="dropdown-toggle"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <path
                      d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                    ></path>
                    <line x1="7" y1="7" x2="7" y2="7"></line>
                  </svg>
                  <span class="tx-13 tx-bold ml-2">Quick Create</span>
                  <span class="quickCreateLabel">"{{sqTag}}"</span>
                </a>
                
                <a
                  class="dropdown-item mt-2 new-tag-btn"
                  v-b-modal.bulk-newtag-modal
                  data-toggle="modal"
                  data-target="#new-tag-modal"
                >
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
                    class="dropdown-toggle"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <path
                      d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                    ></path>
                    <line x1="7" y1="7" x2="7" y2="7"></line>
                  </svg>
                  <span class="tx-13 tx-bold ml-2">New Tag</span>
                  </a>
                  <b-modal ref="bulk-newtag-modal" id="bulk-newtag-modal" title="Create Tag">
              <div class="modal-body">
                <div class="form-group">
                  <label for="formGroupExampleInput" class="d-block"
                    >Tag Name</label
                  >
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="tag-name-inputbox"
                    autofocus=""
                    v-model="tagName"
                  />
                  <div class="invalid-feedback" id="tag-msg"></div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="createTagPinned"
                      name="createTagPinned"
                      v-model="tagPinned"
                    />
                    <label class="custom-control-label" for="createTagPinned"
                      >Show Tag as a Folder</label
                    >
                  </div>
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput" class="d-block"
                    >Tag Color</label
                  >
                  <div
                    id="tags-colors"
                    class="d-flex flex-row justify-content-between"
                  >
                    <div
                      class="
                        square
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                      @click.stop.prevent="changeTagColor('#7fc7af')"
                      style="background-color: #7fc7af"
                    >
                      <i class="fas fa-check fa-1x" style="color:white" v-if="tagColor == '#7fc7af'"></i></div>
                    <div
                      class="
                        square
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                      @click.stop.prevent="changeTagColor('#9b59b6')"
                      style="background-color: #9b59b6"
                    >
                      <i class="fas fa-check fa-1x" style="color:white" v-if="tagColor == '#9b59b6'"></i></div>
                    <div
                      class="
                        square
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                      @click.stop.prevent="changeTagColor('#f1c40f')"
                      style="background-color: #f1c40f"
                    >
                      <i class="fas fa-check fa-1x" style="color:white" v-if="tagColor == '#f1c40f'"></i></div>
                    <div
                      class="
                        square
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                      @click.stop.prevent="changeTagColor('#e74c3c')"
                      style="background-color: #e74c3c"
                    >
                      <i class="fas fa-check fa-1x" style="color:white" v-if="tagColor == '#e74c3c'"></i></div>
                    <div
                      class="
                        square
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                      @click.stop.prevent="changeTagColor('#00ff41')"
                      style="background-color: #00ff41"
                    >
                      <i class="fas fa-check fa-1x" style="color:white" v-if="tagColor == '#00ff41'"></i></div>
                    <div
                      class="
                        square
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                      @click.stop.prevent="changeTagColor('#2aaccf')"
                      style="background-color: #2aaccf"
                    >
                      <i class="fas fa-check fa-1x" style="color:white" v-if="tagColor == '#2aaccf'"></i></div>
                    <div
                      class="
                        square
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                      @click.stop.prevent="changeTagColor('#d0d7d8')"
                      style="background-color: #d0d7d8"
                    >
                      <i class="fas fa-check fa-1x" style="color:white" v-if="tagColor == '#d0d7d8'"></i></div>
                    <div
                      class="
                        square
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                      @click.stop.prevent="changeTagColor('#ff3d7f')"
                      style="background-color: #ff3d7f"
                    >
                      <i class="fas fa-check fa-1x" style="color:white" v-if="tagColor == '#ff3d7f'"></i></div>
                    <div
                      class="
                        square
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                      @click.stop.prevent="changeTagColor('#f7bd80')"
                      style="background-color: #f7bd80"
                    >
                      <i class="fas fa-check fa-1x" style="color:white" v-if="tagColor == '#f7bd80'"></i></div>
                  </div>
                  <p id="tag-color-error-msg" style="color: red"></p>
                </div>
              </div>
              <template
                class="align-items-center justify-content-between"
                #modal-footer="{ cancel }"
              >
                <b-row class="text-center" align-v="center">
                  <b-col class="float-left">
                    <b-button
                      size="xs"
                      variant="outline-secondary"
                      @click="cancel()"
                    >
                      Cancel
                    </b-button>
                  </b-col>
                  <b-col class="float-right">
                    <b-button @click.stop="createTag('new')" size="xs" variant="outline-primary">
                      Create
                    </b-button>
                  </b-col>
                </b-row>
              </template>
            </b-modal>
                
                <a class="dropdown-item mt-2 remove-all-tags" @click="clearTags">
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
                    class="feather feather-delete"
                  >
                    <path
                      d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
                    ></path>
                    <line x1="18" y1="9" x2="12" y2="15"></line>
                    <line x1="12" y1="9" x2="18" y2="15"></line>
                  </svg>
                  <span class="tx-13 tx-bold ml-2">Clear Tags</span>
                </a>
                <a class="dropdown-item mt-2 applyTags" @click="applyTags">
                  <span class="tx-13 tx-bold ml-2">Apply</span>
                </a>
              </div>
            </div>

            <!-- <div class="dropdown align-items-center d-flex px-2" data-toggle="tooltip" title="Apply Tags">
                                    <div id="bulk-apply-tags" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag">
                                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z">
                                            </path>
                                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                        </svg>
                                    </div>

                                    <div class="dropdown-menu" id="bulk-tags-list" aria-labelledby="bulk-apply-tags" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 21px, 0px);">
                                        <button class="dropdown-item" id="add-new-tag-bulk">
                                        </button>
                                    </div>

                                </div> -->

            <span
              v-b-modal.bulk-merge-modal
              id="bulk-merge"
              title="Merge Conversations"
              data-toggle="tooltip"
              class="align-items-center d-flex px-2"
            >
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
                class="feather feather-shuffle"
              >
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="15" x2="21" y2="21"></line>
                <line x1="4" y1="4" x2="9" y2="9"></line>
              </svg>
            </span>
            <b-modal ref="bulk-merge-modal" id="bulk-merge-modal" title="Attention Required!">
              <div class="modal-body">
                  Are you sure you want to merge these conversations? This action can't be undone
              </div>
              <template
                #modal-footer="{ cancel }"
              >
                <b-row class="text-center" align-v="center">
                  <b-col class="float-left">
                    <b-button size="xs" variant="secondary" @click="cancel()">
                      No
                    </b-button>
                  </b-col>
                  <!-- Button with custom close trigger value -->
                  <b-col class="float-right">
                    <b-button @click="bulkMerge" size="xs" variant="primary">Yes</b-button>
                  </b-col>
                </b-row>
              </template>
            </b-modal>
            <span
              v-b-modal.bulk-move-modal
              id="bulk-move"
              title="Move Conversations"
              data-toggle="tooltip"
              class="align-items-center d-flex px-2"
            >
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
                class="feather feather-arrow-right"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <b-modal ref="move-thread-modal" id="bulk-move-modal" title="Select Inbox">
              <div class="modal-body">
                Chose the Inbox you want to move these conversations to.
                <!-- <div class="form-group">
                  <select
                    id="moveToInbox"
                    data-select2-id="moveToInbox"
                    tabindex="-1"
                    class="select2-hidden-accessible"
                    aria-hidden="true"
                  >
                    <option value="204420" data-select2-id="22">
                      Helpwise Support (vibhor@saaslabs.co)
                    </option>
                    <option value="204794" data-select2-id="23">
                      My Mailbox (hello@helpwise.io)
                    </option>
                    <option value="204912" data-select2-id="25">
                      Testing Stuff (tst@helpwise.io)
                    </option>
                    <option value="204940" data-select2-id="27">
                      Vibhor (vibhor350a@gmail.com)
                    </option>
                    <option value="205077" data-select2-id="29">
                      My Mailbox2 (test18@helpwisemail.com)
                    </option>
                    <option value="205166" data-select2-id="31">
                      hello123 (hello123@helpwise.io)
                    </option>
                    <option value="205167" data-select2-id="33">
                      asjaskjjka (asjaskjjka@akjskasj.com)
                    </option>
                    <option value="205216" data-select2-id="35">
                      Demo Mailbox (helpscoutmailbox.demo+107987@example.net)
                    </option>
                    <option value="205217" data-select2-id="37">
                      Rishabh Mailbox (rishicentury@gmail.com)
                    </option>
                    <option value="206800" data-select2-id="39">
                      Christel Rojo (christel@helpwise.io)
                    </option>
                    <option value="210248" data-select2-id="41">
                      Claudia Keen (vibhor1997a@protonmail.com)
                    </option>
                    <option value="210359" data-select2-id="43">
                      Mayank Banga (mayank.banga1996@gmail.com)
                    </option>
                    <option value="211276" data-select2-id="45">
                      Outlook_69CB7129AD598D06 (outlook_69cb7129ad598d06@outlook.com)
                    </option>
                    <option value="211336" data-select2-id="47">
                      Test1023 (test1023@helpwise.io)
                    </option>
                    <option value="212339" data-select2-id="49">
                      Helpwise.dev (helpwise.dev@helpwise.io)
                    </option>
                    <option value="212794" data-select2-id="51">
                      Outlook Dev (helpwise.dev@outlook.com)
                    </option>
                    <option value="213545" data-select2-id="53">
                      harit test (harit@justcall.io)
                    </option>
                    <option value="215050" data-select2-id="55">
                      Tushar Gmail (tushar@justcall.io)
                    </option></select
                  ><span
                    class="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="56"
                    style="width: 100%"
                    ><span class="selection"
                      ><span
                        class="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabindex="0"
                        aria-labelledby="select2-moveToInbox-container"
                        ><span
                          class="select2-selection__rendered"
                          id="select2-moveToInbox-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Helpwise Support (vibhor@saaslabs.co)"
                          >Helpwise Support (vibhor@saaslabs.co)</span
                        ><span class="select2-selection__arrow" role="presentation"
                          ><b role="presentation"></b></span></span></span
                    ><span class="dropdown-wrapper" aria-hidden="true"></span
                  ></span>
                </div> -->
                <b-form-select v-model="inboxSelected" class="mb-3">
                  <b-form-select-option selected="true" value="b"
                    >Please select an option</b-form-select-option
                  >
                  <b-form-select-option v-for="mailbox in mailboxes" :key="mailbox.id" :value="mailbox.id">{{mailbox.displayName}} ({{mailbox.externalAddress}})</b-form-select-option>
                </b-form-select>
              </div>
              <template
                class="align-items-center justify-content-between"
                #modal-footer="{ cancel }"
              >
                <b-row class="text-center" align-v="center">
                  <b-col class="float-left">
                    <b-button size="xs" variant="outline-secondary" @click="cancel()">
                      Cancel
                    </b-button>
                  </b-col>
                  <!-- Button with custom close trigger value -->
                  <b-col class="float-right">
                    <b-button @click="moveToInbox" size="xs" variant="primary"> Move </b-button>
                  </b-col>
                </b-row>
              </template>
            </b-modal>
            <div
              v-if="
                this.$store.state.type !== 'drafts' && 
                this.$store.state.type !== 'sent' && 
                this.$store.state.type !== 'scheduled'
              "
              class="
                dropdown
                px-2
                d-flex
                border border-secondary
                rounded-pill
                align-items-center
                justify-content-between
                ml-2
              "
            >
              <button
                class="btn d-flex"
                type="button"
                id="bulk-assign-threads"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style="
                  font-size: 11px;
                  padding-top: 1px;
                  padding-bottom: 1px;
                  border-radius: 0.25rem;
                  padding-left: 5px;
                  padding-right: 5px;
                "
              >
                Assign
              </button>
              <div
                class="dropdown-menu bulk-assign-user-items"
                aria-labelledby="bulk-assign-threads"
                style="overflow-y: scroll; max-height: 300px"
              >
                <div class="dropdown-item">
                  <input
                    type="text"
                    v-model="sqTm"
                    class="form-control form-control-sm"
                    id="search-assign-users"
                    aria-describedby="emailHelp"
                    placeholder="Seach..."
                  />
                </div>
                <div
                  v-if="sqTm == ''"
                  id="bulk-unassigned-to-item"
                  @click="bulkAssign('')"
                  class="dropdown-item"
                  style="cursor: pointer"
                >
                  <div class="d-flex align-items-center justify-content-start">
                    <div class="avatar avatar-xxs mr-1">
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
                        class="feather feather-user rounded-circle text-primary"
                        style="background-color: rgb(224, 237, 255)"
                      >
                        <path
                          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <span
                      class="tx-13 ml-1 tx-color-02 display-name"
                      style="
                        width: 90%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      "
                      >Unassigned</span
                    >
                  </div>
                </div>
                <div
                  v-if="sqTm == ''"
                  style="cursor: pointer"
                  data-text="Me"
                  @click="bulkAssign(userInfo.id)"
                  :data-val="userInfo.id"
                  class="
                    bulk-assigned-to-item
                    dropdown-item
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                >
                  <div
                    class="
                      d-flex
                      align-items-center
                      justify-content-start
                      w-100
                    "
                  >
                    <div
                      v-html="userInfo.avatarTag"
                      class="avatar avatar-xxs mr-1"
                    >
                      <!-- <span
                          class="avatar-initial rounded-circle"
                          style="background-color: hsl(125, 32%, 64%)"
                          >MM</span
                        > -->
                    </div>
                    <span
                      class="tx-13 ml-1 tx-color-02 display-name"
                      style="
                        width: 90%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      "
                      >Me</span
                    >
                  </div>
                  <span class="checked-icon" style="display: none">
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
                      class="feather feather-check text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                </div>
                <div
                  v-for="teammate in teammatesNew"
                  :key="teammate.id"
                  style="cursor: pointer"
                  :data-text="teammate.name"
                  :data-val="teammate.id"
                  @click="bulkAssign(teammate.id)"
                  class="
                    bulk-assigned-to-item
                    dropdown-item
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                >
                  <div
                    class="
                      d-flex
                      align-items-center
                      justify-content-start
                      w-100
                    "
                  >
                    <div
                      v-html="teammate.avatarTag"
                      class="avatar avatar-xxs mr-1"
                    >
                      <!-- <span
                          class="avatar-initial rounded-circle"
                          style="background-color: hsl(53, 32%, 64%)"
                          >AR</span
                        > -->
                    </div>
                    <span
                      class="tx-13 ml-1 tx-color-02 display-name"
                      style="
                        width: 90%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      "
                      >{{ teammate.name }}</span
                    >
                  </div>
                  <span class="checked-icon" style="display: none">
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
                      class="feather feather-check text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="right-toolbar-container"
          class="d-flex align-items-center justify-content-between"
          :class="$store.state.openThread !== null && 'flex-grow-1'"
        >
          <div
            class="
              align-items-center
              justify-content-end
              pagination-container
              d-flex
            "
          >
            <div class="float-right mr-2">
              <span class="current-indicator">
                <span class="current-indicator-start">{{ startThread }}</span>
                -
                <span class="current-indicator-end">{{ endThread }}</span>
                <!-- <span v-else class="current-indicator-end">20</span> -->
              </span>
              <button
                style="display: inline-block"
                class="mr-1 ml-1 btn p-0 prev-page-btn"
                @click="prevPage"
                :disabled="currPage == '1' && 'disabled'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-left"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                style="display: inline-block"
                class="ml-1 mr-1 btn p-0 next-page-btn"
                @click="nextPage"
                :disabled="isnextPage == false && 'disabled'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <div
            v-if="
              this.$store.state.type !== 'unassigned' &&
              this.$store.state.type !== 'mine' &&
              this.$store.state.type !== 'mentions' &&
              this.$store.state.type !== 'discussions' &&
              this.$store.state.type !== 'starred' &&
              this.$store.state.type !== 'drafts'
            "
            id="threads-filter"
            style=""
          >
            <button
              type="button"
              data-toggle="dropdown"
              style="
                padding-bottom: 0px !important;
                padding-top: 0px !important;
                padding-left: 5px;
                padding-right: 5px;
                max-width: 110px;
              "
              aria-haspopup="true"
              aria-expanded="false"
              class="
                btn btn-xs
                text-truncate
                btn-outline-secondary
                pb-1
                pt-1
                bt-xs
                dropdown-toggle
              "
            >
              {{ currName == "" ? "All" : currName }}
            </button>
            <div
              class="dropdown-menu"
              style="max-height: 200px; overflow-y: scroll"
            >
              <button
                class="dropdown-item"
                data-val="all"
                data-text="All"
                @click="filterPerson(0, '')"
              >
                All
              </button>
              <button
                class="dropdown-item"
                data-val="unassigned"
                data-text="Unassigned"
                @click="filterPerson(1, 'Unassigned')"
                v-if="this.$store.state.type !== 'snoozed'"
              >
                Unassigned
              </button>
              <button
                class="dropdown-item"
                data-val="unread"
                data-text="Unread"
                @click="filterPerson(2, 'Unread')"
                v-if="this.$store.state.type !== 'snoozed'"
              >
                Unread
              </button>
              <div class="dropdown-divider"></div>
              <div class="assigned-to">
                <div
                  style="cursor: pointer"
                  data-text="Me"
                  :data-val="userInfo.id"
                  @click="filterPerson(userInfo.id, 'Me')"
                  class="
                    assigned-to-item
                    dropdown-item
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                >
                  <div
                    class="
                      d-flex
                      align-items-center
                      justify-content-start
                      w-100
                    "
                  >
                    <div
                      v-html="userInfo.avatarTag"
                      class="avatar avatar-xxs mr-1"
                    >
                      <!-- <span
                          class="avatar-initial rounded-circle"
                          style="background-color: hsl(125, 32%, 64%)"
                          >MM</span
                        > -->
                    </div>
                    <span
                      class="tx-13 ml-1 tx-color-02 display-name"
                      style="
                        width: 90%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      "
                      >Me&nbsp;&nbsp;&nbsp;</span
                    ><span
                      v-if="mailbox.userAssignmentCount && userInfo.id in Object.keys(mailbox.userAssignmentCount)"
                      class="user-assigned-count d-none"
                      :id="'user-assigned-count-' + userInfo.id"
                      v-html="mailbox.userAssignmentCount[userInfo.id]"
                      >{{ mailbox.userAssignmentCount[userInfo.id] }} h</span
                    >
                    <span
                      v-else
                      class="user-assigned-count"
                      :id="'user-assigned-count-' + userInfo.id"
                    ></span>
                  </div>
                  <span class="checked-icon" style="display: none">
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
                      class="feather feather-check text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                </div>
                <div
                  v-for="teammate in teammatesNew"
                  :key="teammate.id"
                  style="cursor: pointer"
                  :data-text="teammate.name"
                  :data-val="teammate.id"
                  @click="filterPerson(teammate.id, teammate.name)"
                  class="
                    assigned-to-item
                    dropdown-item
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                >
                  <div
                    class="
                      d-flex
                      align-items-center
                      justify-content-start
                      w-100
                    "
                  >
                    <div
                      v-html="teammate.avatarTag"
                      class="avatar avatar-xxs mr-1"
                    >
                      <!-- <span
                          class="avatar-initial rounded-circle"
                          style="background-color: hsl(53, 32%, 64%)"
                          >AR</span
                        > -->
                    </div>
                    <span
                      class="tx-13 ml-1 tx-color-02 display-name"
                      style="
                        width: 90%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      "
                      >{{ teammate.name }}</span
                    ><span
                      v-if="mailbox.userAssignmentCount && teammate.id in Object.keys(mailbox.userAssignmentCount)"
                      class="user-assigned-count"
                      :id="'user-assigned-count-' + teammate.id"
                      v-html="mailbox.userAssignmentCount[teammate.id]"
                      >{{ mailbox.userAssignmentCount[teammate.id] }}</span
                    >
                    <span
                      v-else
                      class="user-assigned-count"
                      :id="'user-assigned-count-' + teammate.id"
                    ></span>
                  </div>
                  <span class="checked-icon" style="display: none">
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
                      class="feather feather-check text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="
              this.$store.state.type !== 'snoozed' &&
              this.$store.state.type !== 'mentions' &&
              this.$store.state.type !== 'discussions' &&
              this.$store.state.type !== 'starred' &&
              this.$store.state.type !== 'drafts'
            "
            id="orderThreadsBy"
            style="margin-left: 5px"
          >
            <button
              type="button"
              data-toggle="dropdown"
              style="
                padding-bottom: 0px !important;
                padding-top: 0px !important;
                padding-left: 5px;
                padding-right: 5px;
              "
              aria-haspopup="true"
              aria-expanded="false"
              class="
                btn btn-xs
                text-truncate
                btn-outline-secondary
                pb-1
                pt-1
                bt-xs
                dropdown-toggle
              "
            >
              {{ order }}
            </button>
            <div
              class="dropdown-menu"
              style="max-height: 200px; overflow-y: scroll"
            >
              <button
                class="dropdown-item"
                data-val="newest"
                data-text="Newest"
                @click="filterOrder('Newest', 'newest')"
              >
                Newest
              </button>
              <button
                class="dropdown-item"
                data-val="oldest"
                data-text="Oldest"
                @click="filterOrder('Oldest', 'oldest')"
              >
                Oldest
              </button>
              <button
                class="dropdown-item"
                data-val="waitingLongest"
                data-text="Waiting"
                @click="filterOrder('Waiting', 'waitingLongest')"
              >
                Waiting Longest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../../main";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  name: "MailsHeaderSelectAll",
  components: { DatePicker },
  props: {
    mailsnum: Number,
    startThread: Number,
    endThread: Number,
    isnextPage: Boolean,
    currPage: String,
    mailbox: Object,
    selectedIds: Array,
    tagsInAll: Array,
    tagsPartial: Array,
  },
  data() {
    return {
      sqTm: "",
      sqTag: "",
      checkAll: false,
      currId: 0,
      currName: "",
      order: "Newest",
      inboxSelected: this.$route.params.mailboxId,
      addtags: [],
      removetags: [],
      tagPinned: false,
      tagName: "",
      tagColor: "",
      datetime: "",
      newDateOpen: false
    };
  },
  created() {
    bus.$on("changeType", () => {
      (this.currName = ""), (this.order = "Newest"), (this.checkAll = false);
    });
    console.log(typeof this.currPage);
    console.log((this.mailbox));
    console.log(this.order)
    // console.log(this.mailbox.userAssignmentCount[this.userInfo.id])
  },
  methods: {
    handleChange(value, type) {
      if (type === 'minute') {
        this.newDateOpen = false;
      }
    },
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
    notBeforeNow(date) {
      return date < new Date(new Date().setHours(new Date().getHours() + 1, 0, 0, 0));
    },
    changeTagColor(color) {
      this.tagColor = color
    },
    createTag(type) {
      this.removetags = [];
      this.addtags = [];
      console.log(this.tagName, this.tagPinned, this.tagColor);
      if(type == "new") {
        bus.$emit("createTags", this.selectedIds, this.tagName, this.tagColor, this.tagPinned);
      } else if(type == "quick") {
        var items = Array("#7fc7af", "#9b59b6", "#f1c40f", "#e74c3c", "#00ff41", "#2aaccf", "#d0d7d8", "#ff3d7f", "#f7bd80");
        var color = items[Math.floor(Math.random()*items.length)];
        bus.$emit("createTags", this.selectedIds, this.sqTag, color, false);
      }
      this.$refs['bulk-newtag-modal'].hide();
      this.tagName = "";
      this.tagColor = "";
      this.tagPinned = false;
      this.sqTag = "";
      // if(type == "new") {
      //   requestOptions = {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       mailboxThreadMap,
      //       color: this.tagColor,
      //       folder: this.tagPinned,
      //       name: this.tagName,
      //     }),
      //     credentials: "include",
      //   };
      // } else {
      //   var randomColor = Math.floor(Math.random()*16777215).toString(16);
      //   requestOptions = {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       mailboxThreadMap,
      //       color: "#" + randomColor,
      //       folder: this.tagPinned,
      //       name: this.sqTag,
      //     }),
      //     credentials: "include",
      //   };
      // }
      // fetch(this.$apiBaseURL + "unifiedv2/tags/createTags.php", requestOptions)
      // .then(async response => { 
      //   const data = await response.json();
      //   if(data.status !== "success") {
      //     const error = (data && data.message) || response.status;
      //     return Promise.reject(error);
      //   }
      //   this.addtags.push(data.data);
      //   bus.$emit(
      //     "toggleTags",
      //     this.selectedIds,
      //     this.addtags,
      //     this.removetags,
      //     data.data
      //   );
        
      // }).catch(error => {
      //   alert(error);
      // })
    },
    toggleTag(id) {
      this.removetags = [];
      this.addtags = [];
      if (this.tagsInAll.some((el) => el == id)) {
        this.removetags.push(id);
      } else if(!this.tagsPartial.some((el) => el == id)) {
        this.addtags.push(id);
      }
      bus.$emit(
        "toggleTags",
        this.selectedIds,
        this.addtags,
        this.removetags
      );
    },
    toggleTags(id, event) {
      console.log(event.target.checked, id);
      if(event.target.checked) {
        if(!this.addtags.some(i => i == id)) {
          this.addtags.push(id);
        }
        this.removetags = this.removetags.filter((tag) => tag !== id);
      }
      if(!event.target.checked) {
        if(!this.removetags.some(i => i == id)) {
          this.removetags.push(id);
        }
        this.addtags = this.addtags.filter((tag) => tag !== id);
      }
      // if (
      //   event.target.checked &&
      //   (this.thread.data.tags.length == 0 ||
      //     this.thread.data.tags.some((el) => el.id !== id))
      // ) {
      //   console.log("1");
      //   this.addtags.push(id);
      //   this.removetags = this.removetags.filter((tag) => tag !== id);
      // } else if (
      //   !event.target.checked &&
      //   this.thread.data.tags.some((el) => el.id == id)
      // ) {
      //   console.log("2");
      //   this.removetags.push(id);
      //   this.addtags = this.addtags.filter((tag) => tag !== id);
      // } else if (
      //   event.target.checked &&
      //   this.thread.data.tags.some((el) => el.id == id)
      // ) {
      //   console.log("3");
      //   this.removetags = this.removetags.filter((tag) => tag !== id);
      // } else if (
      //   !event.target.checked &&
      //   this.thread.data.tags.some((el) => el.id !== id)
      // ) {
      //   console.log("4");
      //   this.addtags = this.addtags.filter((tag) => tag !== id);
      // }
      console.log(this.addtags);
      console.log(this.removetags);
    },
    applyTags() {
      bus.$emit(
        "toggleTags",
        this.selectedIds,
        this.addtags,
        this.removetags
      );
      console.log("applying");
    },
    clearTags() {
      console.log("clearing");
      this.removetags = this.tagsInAll;
      this.addtags = [];
      console.log(this.tagsInAll);
      console.log(this.removetags);
      bus.$emit(
        "toggleTags",
        this.selectedIds,
        this.addtags,
        this.removetags
      );
    },
    checkAllBoxes() {
      this.checkAll = !this.checkAll;
      if (this.checkAll == true) {
        bus.$emit("check", 1, true);
      } else {
        bus.$emit("check", 1, false);
      }
    },
    bulkRead(r) {
      if (r == 1) {
        this.$emit("bulkRead", true);
      } else {
        this.$emit("bulkRead", false);
      }
    },
    bulkStar() {
      this.$emit("bulkStar");
    },
    bulkSpam() {
      bus.$emit("spamThreads", this.selectedIds);
    },
    bulkMove() {
      bus.$emit("restoreThreads", this.selectedIds);
    },
    bulkDelete() {
      bus.$emit("deleteThreads", this.selectedIds);
    },
    bulkPerDelete() {
      this.$emit("perDeleteThreads", this.selectedIds);
    },
    bulkClose() {
      bus.$emit("closeThread", this.selectedIds);
    },
    bulkDone() {
      bus.$emit("doneThreads", this.selectedIds);
    },
    bulkAssign(id) {
      bus.$emit("assignThread", this.selectedIds, id);
    },
    moveToInbox() {
      bus.$emit('moveToInbox', this.selectedIds, this.inboxSelected);
      this.$refs['move-thread-modal'].hide()
    },
    bulkMerge() {
      this.$emit('bulkMerge', this.selectedIds);
      this.$refs['bulk-merge-modal'].hide()
    },
    bulkSnooze(till) {
      console.log(till);
      var mom;
      if (till == "later today") {
        mom = moment(
          moment().add(3, "hours").format("YYYY-MM-DD hh:mm A"),
          "YYYY-MM-DD hh:mm A"
        );
      } else if (till == "tommorrow") {
        mom = moment(
          `${moment().add(1, "day").format("YYYY-MM-DD")} 09:00 am`,
          "YYYY-MM-DD hh:mm A"
        );
      } else if (till == "nextMon") {
        mom = moment(
          `${moment().day(8).format("YYYY-MM-DD ")} 09:00 am`,
          "YYYY-MM-DD hh:mm A"
        );
      } else if (till == "oneWeek") {
        mom = moment().add(1, "week").minutes(0);
      } else if (till == "oneMonth") {
        mom = moment(
          moment().add(1, "month").format("YYYY-MM-DD hh:mm"),
          "YYYY-MM-DD hh:mm A"
        );
      } else if (till == "newDate") {
        console.log(this.datetime);
        mom = new Date(this.datetime);
        this.datetime = "";
        this.$refs["snooze-thread-modal"].hide();
      }
      console.log(mom.toISOString());
      bus.$emit("snoozeThread", this.selectedIds, mom);
    },
    prevPage() {
      this.$emit("prevPage");
    },
    nextPage() {
      this.$emit("nextPage");
    },
    filterPerson(id, name) {
      this.currId = id;
      this.currName = name;
      console.log(this.currName);
      this.$emit("filterPerson", id);
    },
    filterOrder(order, orderType) {
      this.order = order;
      console.log(this.order, order)
      this.$emit("filterOrder", orderType);
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    tags() {
      let query = this.sqTag.toLowerCase().trim();
      if (query == "") {
        return this.$store.state.tags;
        // console.log(this.teammatesNew);
      } else {
        return this.$store.state.tags.filter(
          (item) =>
            item.name.toLowerCase().search(query) !== -1
        );
        // console.log(this.teammatesNew);
      }
    },

    mailboxes() {
      return this.$store.state.mailboxes;
    },
    teammates() {
      return this.$store.state.teammates;
    },
    teammatesNew: function () {
      let query = this.sqTm.toLowerCase().trim();
      if(query == "") {
        return this.teammates.filter((item) => item.id !== this.userInfo.id);
        // console.log(this.teammatesNew);
      } else {
        return this.teammates.filter((item) => item.id !== this.userInfo.id && item.name.toLowerCase().search(query) !== -1);
        // console.log(this.teammatesNew);
      }
      // return this.teammates.filter((item) => item.id !== this.userInfo.id);
    },
  },
};
</script>

<style>
</style>