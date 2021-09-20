<template>
  <div
      class="mail-group-header justify-content-center"
      style="top: 55px; height: 40px"
    >
      <div
        class="row flex-column d-flex"
        id="mails-toolbar"
        style="padding-left: 20px"
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
            <div id="bulk-operations" class="align-items-center" :class="checkAll && 'show'">
              <span id="bulk-close" class="align-items-center d-flex px-2">
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
              <span id="bulk-done" class="align-items-center d-none px-2">
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
              <span id="bulk-read" class="align-items-center d-flex px-2">
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

              <span id="bulk-unread" class="align-items-center d-flex px-2">
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
                    >
                      <span>Tomorrow</span>
                      <span class="bulk-snooze-tomorrow">Tue 9 am</span>
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
                    >
                      <span>One Week</span>
                      <span class="bulk-snooze-week">Mon 6 pm</span>
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
                    >
                      <span>One month</span>
                      <span class="bulk-snooze-month">9 Sep</span>
                    </div>
                  </button>

                  <div
                    class="dropdown-item snooze-drop-down bulk-snooze-threads"
                  >
                    <span>Pick date &amp; time</span>
                  </div>
                </div>
              </span>

              <span id="bulk-trash" class="align-items-center d-flex px-2">
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
                id="bulk-permanent-delete"
                class="align-items-center px-2 d-none"
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
              <span id="bulk-spam" class="align-items-center d-flex px-2">
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
                id="bulk-move-to-inbox"
                class="align-items-center px-2 d-none"
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
                  <polyline
                    points="22 12 16 12 14 15 10 15 8 12 2 12"
                  ></polyline>
                  <path
                    d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                  ></path>
                </svg>
              </span>
              <span
                id="bulk-star-threads"
                class="align-items-center d-flex px-2"
                title="Mark as Important"
                data-toggle="tooltip"
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
                id="bulk-unstar-threads"
                title="Unmark as Important"
                data-toggle="tooltip"
                class="align-items-center px-2 d-none"
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
                title=""
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
                      placeholder="Seach Tags..."
                    />
                  </div>
                  <div class="dropdown-divider mt-2 mb-2"></div>
                  <div
                    class="thread-tags-list"
                    style="overflow-y: scroll; height: 200px"
                  >
                    <div
                      v-for="tag in tags" :key="tag.id"
                      class="dropdown-item mt-2 tagBtn"
                      :id="'bulk-'+tag.id"
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
                            :id="'bulk-thread-tag-'+tag.id"
                          />
                          <label
                            :for="'bulk-thread-tag-'+tag.id"
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
                        >
                          <svg
                            :style="{color: tag.color}"
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
                          <span class="tx-12 tagName tx-color-03 ml-2">{{tag.name}}</span>
                        </div>
                      </div>
                    </div>

                    
                  </div>
                  <a
                    class="dropdown-item mt-2 load-more-btn text-center"
                    style=""
                  >
                    <span class="tx-13 tx-bold ml-2">Load more</span>
                  </a>
                  <a
                    class="dropdown-item mt-2 quick-tag-btn"
                    style="display: none"
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
                    <span class="quickCreateLabel"></span>
                  </a>
                  <a
                    class="dropdown-item mt-2 new-tag-btn"
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
                  <a class="dropdown-item mt-2 remove-all-tags">
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
                  <a class="dropdown-item mt-2 applyTags">
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

              <span
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

              <div
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
                      class="form-control form-control-sm"
                      id="search-assign-users"
                      aria-describedby="emailHelp"
                      placeholder="Seach..."
                    />
                  </div>
                  <div
                    id="bulk-unassigned-to-item"
                    class="dropdown-item"
                    style="cursor: pointer"
                  >
                    <div
                      class="d-flex align-items-center justify-content-start"
                    >
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
                          class="
                            feather feather-user
                            rounded-circle
                            text-primary
                          "
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
                    style="cursor: pointer"
                    data-text="Me"
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
                      <div v-html="userInfo.avatarTag" class="avatar avatar-xxs mr-1">
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
                      <div v-html="teammate.avatarTag" class="avatar avatar-xxs mr-1">
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
                        >{{teammate.name}}</span
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
                  :disabled="currPage == 1 && 'disabled'"
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
            <div v-if="this.$route.params.type !== 'unassigned' && this.$route.params.type !== 'mine' && this.$route.params.type !== 'mentions' && this.$route.params.type !== 'discussions' && this.$route.params.type !== 'starred' && this.$route.params.type !== 'drafts'" id="threads-filter" style="">
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
                {{ currName == '' ? 'All' : currName }}
              </button>
              <div
                class="dropdown-menu"
                style="max-height: 200px; overflow-y: scroll"
              >
                <button class="dropdown-item" data-val="all" data-text="All" @click="filterPerson(0, '')">
                  All
                </button>
                <button
                  class="dropdown-item"
                  data-val="unassigned"
                  data-text="Unassigned"
                  @click="filterPerson(1, 'Unassigned')"
                  v-if="this.$route.params.type !== 'snoozed'"
                >
                  Unassigned
                </button>
                <button
                  class="dropdown-item"
                  data-val="unread"
                  data-text="Unread"
                  @click="filterPerson(2, 'Unread')"
                  v-if="this.$route.params.type !== 'snoozed'"
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
                      <div v-html="userInfo.avatarTag" class="avatar avatar-xxs mr-1">
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
                      ><span v-if="userInfo.id in mailbox.userAssignmentCount"
                        class="user-assigned-count"
                        :id="'user-assigned-count-'+userInfo.id"
                      >{{ mailbox.userAssignmentCount[userInfo.id] }}</span>
                      <span v-else
                        class="user-assigned-count"
                        :id="'user-assigned-count-'+userInfo.id"
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
                      <div v-html="teammate.avatarTag" class="avatar avatar-xxs mr-1">
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
                        >{{teammate.name}}</span
                      ><span v-if="teammate.id in mailbox.userAssignmentCount"
                        class="user-assigned-count"
                        :id="'user-assigned-count-'+teammate.id"
                      >{{ mailbox.userAssignmentCount[teammate.id] }}</span>
                      <span v-else
                        class="user-assigned-count"
                        :id="'user-assigned-count-'+teammate.id"
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
            <div v-if="this.$route.params.type !== 'snoozed' && this.$route.params.type !== 'mentions' && this.$route.params.type !== 'discussions' && this.$route.params.type !== 'starred' && this.$route.params.type !== 'drafts'" id="orderThreadsBy" style="margin-left: 5px">
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
import { bus } from '../main';
export default {
    name: 'MailsHeaderSelectAll',
    props: {
      mailsnum: Number,
      startThread: Number,
      endThread: Number,
      isnextPage: Boolean,
      currPage: Number,
      mailbox: Object,
    },
    data() {
        return {
            checkAll: false,
            currId: 0,
            currName: '',
            order: 'Newest'
        }
    },
    created() {
      bus.$on('changeType', () => {
          this.currName = '',
          this.order = 'Newest',
          this.checkAll = false
      });
    },
    methods: {
        checkAllBoxes() {
            this.checkAll = !this.checkAll;
            if(this.checkAll == true) {
              bus.$emit('checkAll');
            } else {
              bus.$emit('unCheckAll');
            }
        },
        prevPage() {
            bus.$emit('prevPage');
        },
        nextPage() {
            bus.$emit('nextPage');
        },
        filterPerson(id, name) {
          this.currId = id;
          this.currName = name;
          bus.$emit('filterPerson', id);
        },
        filterOrder(order, orderType) {
          this.order = order;
          bus.$emit('filterOrder', orderType);
        }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      tags() {
        return this.$store.state.tags
      },
      teammates() {
        return this.$store.state.teammates
      },
      teammatesNew: function() {
        return this.teammates.filter(item => item.id !== this.userInfo.id);
      }
    }
}
</script>

<style>

</style>