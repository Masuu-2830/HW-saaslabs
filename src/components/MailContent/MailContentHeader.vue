<template>
  <div
    v-if="Object.keys(thread).length !== 0"
    class="mail-content-header justify-content-between align-items-center"
    style="min-height: unset"
  >
    <div
      class="d-flex justify-content-between align-items-center"
      style="height: 100%; min-height: 54px"
    >
      <a @click="backThread" id="mailContentClose" class="link-02 mg-r-20"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-arrow-left"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline></svg
      ></a>
      <div class="d-flex align-item-center" style="height: 100%">
        <div
          style="max-width: 420px"
          class="d-flex flex-column justify-content-center"
        >
          <h6 v-if="thread.data.subject != ''" class="tx-15 mb-1 mt-2" id="thread-subject" style="width: 100%">
            {{ thread.data.subject }}
          </h6>
          <h6 v-else-if="thread.data.contact.firstname != ''" class="tx-15 mb-1 mt-2" id="thread-subject" style="width: 100%">
            {{ thread.data.contact.firstname + " " + thread.data.contact.lastname }}
          </h6>
          <h6 v-else class="tx-15 mb-1 mt-2" id="thread-subject" style="width: 100%">
            {{ thread.data.contact.emails[0] }}
          </h6>
          <span
            id="tagsTicketContainer"
            class="mb-2 mt-1 tx-11 tx-color-03"
            :class="thread.data.tags.length > 0 ? 'd-block' : 'd-none'"
          >
            <div
              v-if="thread.data.tags.length > 0"
              id="tags-list"
              style="display: inline-block"
            >
              <span
                v-for="tag in thread.data.tags"
                :key="tag.id"
                :id="'thread-tag-ID-' + tag.id"
                data-mailbox_id="204420"
                :data-tag_id="tag.id"
                style="
                  cursor: pointer;
                  padding: 0.0875rem 0.3075rem;
                  margin-right: 3px;
                "
                :style="{ color: tag.color, borderColor: tag.color }"
                class="btn hw-tag"
                onmouseenter="$(this).css({'background-color':$(this).css('border-top-color'),'color': 'white'})"
                onmouseleave="$(this).css({'color':$(this).css('border-bottom-color'),'background-color': 'white'})"
              >
                {{ tag.name }}
              </span>
            </div>
            <div id="ticket-number-wrapper" style="display: inline-block">
              <div
                id="ticket-number"
                class="border border-warning tx-color-01 tx-14 rounded"
                style="display: none; cursor: pointer; padding: 3px"
              ></div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <nav class="nav nav-icon-only">
      <div
        class="dropdown nav-link d-none d-sm-block"
        id="hw_viewing"
        style="cursor: pointer"
        title="Viewing"
        data-toggle="tooltip"
        data-original-title="Viewing"
      >
        <span
          class="
            d-flex
            border border-secondary
            rounded-pill
            align-items-center
            justify-content-between
          "
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <div class="d-flex p-1" id="participants-avatar-wrapper">
            <div
              v-for="viewingUser in viewingUsers"
              :key="viewingUser.id"
              v-html="viewingUser.avatarTag"
              class="avatar avatar-xxs"
              style="margin-right: -3px"
            ></div>
          </div>
          <div class="p-1">
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
              class="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </span>
        <div
          class="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          x-placement="bottom-start"
          style="
            position: absolute;
            will-change: transform;
            top: 0px;
            left: 0px;
            transform: translate3d(0px, 32px, 0px);
          "
        >
          <a
            class="dropdown-item text-center"
            style="padding: 2px !important"
            href="#"
          >
            All Participants
          </a>
          <div class="dropdown-divider mt-2 mb-2"></div>
          <div id="viewing-list" style="max-height: 200px; overflow-y: scroll">
            <div
              id="participant-214897"
              class="
                hw-participant
                dropdown-item
                d-flex
                justify-content-between
                align-items-center
              "
            >
              <span
                class="d-flex align-items-center justify-content-start w-100"
                style="width: 55%"
              >
                <div
                  v-html="userInfo.avatarTag"
                  class="avatar avatar-xxs mr-1"
                ></div>
                <span
                  class="tx-13 ml-1"
                  style="
                    width: 90%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  "
                  >Me</span
                >
              </span>
              <span class="participant-status tx-color-03"
                >Currently Reading</span
              >
            </div>
            <div
              v-for="teammate in teammatesNew"
              :key="teammate.id"
              :id="'participant-' + teammate.id"
              class="
                hw-participant
                dropdown-item
                d-flex
                justify-content-between
                align-items-center
              "
            >
              <span
                class="d-flex align-items-center justify-content-start w-100"
                style="width: 55%"
              >
                <div
                  v-html="teammate.avatarTag"
                  class="avatar avatar-xxs mr-1"
                ></div>
                <span
                  class="tx-13 ml-1"
                  style="
                    width: 90%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  "
                  >{{ teammate.name }}</span
                >
              </span>
              <span
                v-if="thread.data.usersReadMap !== null && teammate.id in thread.data.usersReadMap"
                class="participant-status tx-color-03"
                >Read
                {{
                  thread.data.usersReadMap[teammate.id].readAt
                    | moment("from", "now")
                }}</span
              >
              <span v-else class="participant-status tx-color-03">UnRead</span>
            </div>
          </div>
        </div>
      </div>

      <div
        id="assignmentWrapper"
        class="dropdown nav-link d-none d-sm-block"
        style="cursor: pointer; max-width: 38%"
        title="Assign"
        data-toggle="tooltip"
        data-original-title="Assign"
      >
        <span
          class="
            d-flex
            border border-secondary
            rounded-pill
            align-items-center
            justify-content-between
          "
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <div
            class="d-flex p-1"
            id="current-assignment"
            style="max-width: 75%"
          >
            <div
              v-if="
                thread.data.currentAssignment == null ||
                thread.data.currentAssignment.assigned == null
              "
            >
              Assign
            </div>
            <div v-else class="d-flex justify-content-start align-items-center">
              <div
                v-html="thread.data.currentAssignment.assigned.avatarTag"
                class="avatar avatar-xxs mr-1"
              ></div>
              <span
                v-if="thread.data.currentAssignment.assigned.id == userInfo.id"
                class="tx-12 ml-1"
                style="max-width: 62%"
                >Me</span
              >
              <span v-else class="tx-12 ml-1" style="max-width: 62%"
                >{{ thread.data.currentAssignment.assigned.firstname }}
                {{ thread.data.currentAssignment.assigned.lastname }}</span
              >
            </div>
          </div>
          <div class="p-1">
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
              class="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </span>
        <div
          class="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          x-placement="bottom-start"
          style="
            position: absolute;
            will-change: transform;
            top: 0px;
            left: 0px;
            transform: translate3d(0px, 32px, 0px);
          "
        >
          <input
            type="text"
            v-model="sqTm"
            class="form-control form-control-sm"
            id="search-assignment-users"
            aria-describedby="emailHelp"
            placeholder="Seach Users..."
            autocomplete="off"
          />
          <div class="dropdown-divider mt-2 mb-2"></div>
          <div
            id="assignment-list"
            style="max-height: 200px; overflow-y: scroll"
          >
            <div
              v-if="sqTm == ''"
              @click="assign('')"
              id="assignment-teammate-unassigned"
              class="
                assignment-list-item
                dropdown-item
                d-flex
                justify-content-between
                align-items-center
                w-100
              "
            >
              <div
                class="d-flex align-items-center justify-content-start w-100"
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
                    class="feather feather-user rounded-circle text-primary"
                    style="background-color: rgb(224, 237, 255)"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
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
              v-if="sqTm == ''"
              @click="assign(userInfo.id)"
              :id="'assignment-teammate-' + userInfo.id"
              class="
                assignment-list-item
                dropdown-item
                d-flex
                justify-content-between
                align-items-center
                w-100
              "
              :class="
                thread.data.currentAssignment != null &&
                thread.data.currentAssignment.assigned != null &&
                thread.data.currentAssignment.assigned.id == userInfo.id
                  ? 'assignment-list-item-active'
                  : ''
              "
            >
              <div
                class="d-flex align-items-center justify-content-start w-100"
              >
                <div
                  v-html="userInfo.avatarTag"
                  class="avatar avatar-xxs mr-1"
                ></div>
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
              @click="assign(teammate.id)"
              :id="'assignment-teammate-' + teammate.id"
              class="
                assignment-list-item
                dropdown-item
                d-flex
                justify-content-between
                align-items-center
                w-100
              "
              :class="
                thread.data.currentAssignment != null &&
                thread.data.currentAssignment.assigned != null &&
                thread.data.currentAssignment.assigned.id == teammate.id
                  ? 'assignment-list-item-active'
                  : ''
              "
            >
              <div
                class="d-flex align-items-center justify-content-start w-100"
              >
                <div
                  v-html="teammate.avatarTag"
                  class="avatar avatar-xxs mr-1"
                ></div>
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
      <a
        v-if="
          this.$store.state.filterSection !== 'closed' &&
          this.$store.state.filterSection !== 'drafts'
        "
        href="#"
        @click.stop="closeThread"
        data-toggle="tooltip"
        title="Close Conversation"
        class="nav-link archive-current-thread"
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
          class="feather feather-check"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </a>
      <a
        v-if="
                this.$store.state.filterSection == 'mentions'
              "
        href=""
        @click.stop.prevent="markDone"
        data-toggle="tooltip"
        title="Mark as done"
        class="nav-link done-current-thread"
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
          class="feather feather-check-circle"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </a>
      <a
        href=""
        data-toggle="tooltip"
        title="Move To Inbox"
        class="nav-link reopen-current-thread"
        v-if="
          this.$store.state.filterSection == 'snoozed' ||
          this.$store.state.filterSection == 'closed' ||
          this.$store.state.filterSection == 'spam' ||
          this.$store.state.filterSection == 'trash' ||
          this.$store.state.filterSection == 'drafts'
        "
        @click.stop.prevent="restoreThread"
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
          class="feather feather-inbox"
        >
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
          <path
            d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
          ></path>
        </svg>
      </a>

      <a
        href=""
        data-toggle="tooltip"
        :title="this.thread.data.isStarred ? 'Unstar Thread' : 'Star Thread'"
        @click.stop.prevent="changeStarred"
        data-original-title="Star Thread"
        class="nav-link star-current-thread"
        :style="{ color: this.thread.data.isStarred ? '#f4b400' : '#8392a5' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          :fill="this.thread.data.isStarred ? '#f4b400' : 'none'"
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
      </a>
      <a
        v-if="
          this.$store.state.filterSection !== 'mentions' &&
          this.$store.state.filterSection !== 'discussions' &&
          this.$store.state.filterSection !== 'starred' &&
          this.$store.state.filterSection !== 'snoozed' &&
          this.$store.state.filterSection !== 'drafts' &&
          this.$store.state.filterSection !== 'sent' &&
          this.$store.state.filterSection !== 'scheduled' &&
          this.$store.state.filterSection !== 'closed' &&
          this.$store.state.filterSection !== 'spam' &&
          this.$store.state.filterSection !== 'trash'
        "
        @click.stop="unread"
        data-toggle="tooltip"
        title="Mark Unread"
        href="#"
        class="nav-link d-none d-xl-block mark-unread-current-thread"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-mail"
        >
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
          ></path>
          <polyline points="22,6 12,13 2,6"></polyline></svg
      ></a>

      <div
        id="thread-tags"
        class="dropdown nav-link d-none d-sm-block"
        style="cursor: pointer"
        title="Add Tag"
        data-toggle="tooltip"
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

        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
              :id="'single-' + tag.id"
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
                  style="padding-right: 10px; padding-left: 1.0rem"
                >
                  <input
                    type="checkbox"
                    :data-tag-id="tag.id"
                    class="custom-control-input tagUntagCheckbox"
                    :id="'current-thread-tag-' + tag.id"
                    :checked="
                      thread.data.tags.length > 0 &&
                      thread.data.tags.some((el) => el.id == tag.id)
                    "
                    @click.stop="toggleTags(tag.id, $event)"
                  />
                  <label
                    :for="'current-thread-tag-' + tag.id"
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
                  @click.stop="toggleTag(tag.id)"
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
          <!-- <a class="dropdown-item mt-2 load-more-btn text-center" style="">
            <span class="tx-13 tx-bold ml-2">Load more</span>
          </a> -->

          <a @click="createTag('quick')" class="dropdown-item mt-2 quick-tag-btn"
            :style="{display: tags.findIndex(tag => tag.name == sqTag.toLowerCase().trim()) !== -1 ? 'none' : ''}">
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
            data-toggle="modal"
            data-target="#new-tag-modal"
            v-b-modal.newtag-thread-modal
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

            <b-modal
              ref="newtag-thread-modal"
              id="newtag-thread-modal"
              title="Create Tag"
            >
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
                      <i
                        class="fas fa-check fa-1x"
                        style="color: white"
                        v-if="tagColor == '#7fc7af'"
                      ></i>
                    </div>
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
                      <i
                        class="fas fa-check fa-1x"
                        style="color: white"
                        v-if="tagColor == '#9b59b6'"
                      ></i>
                    </div>
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
                      <i
                        class="fas fa-check fa-1x"
                        style="color: white"
                        v-if="tagColor == '#f1c40f'"
                      ></i>
                    </div>
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
                      <i
                        class="fas fa-check fa-1x"
                        style="color: white"
                        v-if="tagColor == '#e74c3c'"
                      ></i>
                    </div>
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
                      <i
                        class="fas fa-check fa-1x"
                        style="color: white"
                        v-if="tagColor == '#00ff41'"
                      ></i>
                    </div>
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
                      <i
                        class="fas fa-check fa-1x"
                        style="color: white"
                        v-if="tagColor == '#2aaccf'"
                      ></i>
                    </div>
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
                      <i
                        class="fas fa-check fa-1x"
                        style="color: white"
                        v-if="tagColor == '#d0d7d8'"
                      ></i>
                    </div>
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
                      <i
                        class="fas fa-check fa-1x"
                        style="color: white"
                        v-if="tagColor == '#ff3d7f'"
                      ></i>
                    </div>
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
                      <i
                        class="fas fa-check fa-1x"
                        style="color: white"
                        v-if="tagColor == '#f7bd80'"
                      ></i>
                    </div>
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
                    <b-button
                      @click.stop="createTag('new')"
                      size="xs"
                      variant="outline-primary"
                    >
                      Create
                    </b-button>
                  </b-col>
                </b-row>
              </template>
            </b-modal>
          </a>
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
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z">
                                    </path>
                                    <line x1="7" y1="7" x2="7" y2="7"></line>
                                </svg> -->
            <span class="tx-13 tx-bold ml-2">Apply</span>
          </a>
        </div>
      </div>
      <div
        v-if="
              this.$store.state.filterSection !== 'trash'
            "
        id="snooze-thread"
        data-toggle="tooltip"
        title="Snooze"
        class="nav-link d-none d-sm-block dropdown"
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
          class="feather feather-clock clock-icon"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>

        <div
          class="dropdown-menu snooze-options"
          aria-labelledby="snooze-icon"
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
              thread-snooze-today-option
            "
          >
            <div
              class="d-flex align-items-center justify-content-between"
              @click.stop="snoozeThread('later today')"
            >
              <span>Later today</span>
              <span class="snooze-later-today">In 3 hour</span>
            </div>
          </button>
          <button
            class="
              dropdown-item
              snooze-drop-down snooze-time
              thread-snooze-tomorrow-option
            "
          >
            <div
              class="d-flex align-items-center justify-content-between"
              @click.stop="snoozeThread('tommorrow')"
            >
              <span>Tomorrow</span>
              <span class="thread-snooze-tomorrow"
                >{{ new Date() | moment("add", "1 day", "ddd") }} 9 am</span
              >
            </div>
          </button>
          <button
            class="
              dropdown-item
              snooze-drop-down snooze-time
              thread-snooze-monday-option
            "
          >
            <div
              class="d-flex align-items-center justify-content-between"
              @click.stop="snoozeThread('nextMon')"
            >
              <span>Next Monday</span>
              <span class="snooze-monday">9 am</span>
            </div>
          </button>
          <button
            class="
              dropdown-item
              snooze-drop-down snooze-time
              thread-snooze-week-option
            "
          >
            <div
              class="d-flex align-items-center justify-content-between"
              @click.stop="snoozeThread('oneWeek')"
            >
              <span>One Week</span>
              <span class="snooze-week">{{
                new Date() | moment("add", "1 week", "ddd h a")
              }}</span>
            </div>
          </button>

          <button
            class="
              dropdown-item
              snooze-drop-down snooze-time
              thread-snooze-month-option
            "
          >
            <div
              class="d-flex align-items-center justify-content-between"
              @click.stop="snoozeThread('oneMonth')"
            >
              <span>One month</span>
              <span class="thread-snooze-month">{{
                new Date() | moment("add", "1 month", "DD MMM")
              }}</span>
            </div>
          </button>

          <div
            v-b-modal="'snooze-thread-modall' + this.$route.params.threadId"
            class="dropdown-item snooze-drop-down show-thread-snooze-modal"
            style="cursor: pointer"
          >
            <span>Pick date &amp; time</span>
          </div>
          <b-modal
            :id="'snooze-thread-modall' + this.$route.params.threadId"
            :ref="'snooze-thread-modall' + this.$route.params.threadId"
            size="sm"
            title="Pick Date & Time"
            hide-footer
          >
            <div class="modal-body">
              <div class="d-flex align-items-center justify-content-center">
                <date-picker
                  :open.sync="newDateOpen"
                  @change="handleChange"
                  type="datetime"
                  v-model="datetime"
                  value-type="timestamp"
                  :minute-step="30"
                  :showSecond="false"
                  :default-value="
                    new Date().setHours(new Date().getHours() + 1, 0, 0, 0)
                  "
                  :disabled-date="notBeforeToday"
                  :disabled-time="notBeforeNow"
                  placeholder="Select Date & Time"
                  :clearable="false"
                ></date-picker>
              </div>
              <div
                class="d-flex align-items-center justify-content-center"
                style="margin-top: 10px"
              >
                <button
                  type="button"
                  @click.stop.prevent="snoozeThread('newDate')"
                  class="btn btn-xs btn-primary bulk-select-snooze-btn"
                  :disabled="datetime == '' && true"
                >
                  Snooze
                </button>
              </div>
            </div>
          </b-modal>
        </div>
      </div>
      <a
        v-b-modal.move-thread-modal
        href="#"
        id="move-thread"
        data-toggle="tooltip"
        title="Move Conversation"
        class="nav-link"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-toggle="modal"
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
      </a>
      <b-modal
        ref="move-thread-modal"
        id="move-thread-modal"
        title="Select Inbox"
      >
        <div class="modal-body">
          Chose the Inbox you want to move these conversations to.
          <b-form-select v-model="inboxSelected" class="mb-3">
            <b-form-select-option selected="true" value="b"
              >Please select an option</b-form-select-option
            >
            <b-form-select-option
              v-for="mailbox in mailboxes"
              :key="mailbox.id"
              :value="mailbox.id"
              >{{ mailbox.displayName }} ({{
                mailbox.externalAddress
              }})</b-form-select-option
            >
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
              <b-button @click="moveToInbox" size="xs" variant="primary">
                Move
              </b-button>
            </b-col>
          </b-row>
        </template>
      </b-modal>
      <a
        v-if="this.$store.state.filterSection !== 'trash'"
        @click.stop.prevent="deleteConv"
        href=""
        id="trash-thread"
        data-toggle="tooltip"
        title="Delete Conversation"
        class="nav-link"
        data-original-title="Delete Conversation"
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
          class="feather feather-trash"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
        </svg>
      </a>
      <div class="dropdown">
        <span
          class="three-dot"
          id="dropdownMenuLink2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style="
            float: right;
            margin-left: 20px;
            margin-bottom: 3px;
            cursor: pointer;
          "
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-more-vertical"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle></svg
        ></span>

        <div
          class="dropdown-menu"
          aria-labelledby="dropdownMenuLink2"
          x-placement="top-start"
          style="
            position: absolute;
            will-change: transform;
            top: 0px;
            left: 0px;
            transform: translate3d(-230px, -35px, 0px);
          "
        >
          <button type="button" class="dropdown-item create-rule-menu-option d-none">
            Create rule for similar emails
          </button>
          <button
            v-if="thread.data.isArchived == false"
            type="button"
            @click.stop="closeThread"
            class="d-xl-none dropdown-item archive-current-thread"
          >
            Close Conversation
          </button>
          <button
            type="button"
            @click.stop="unread"
            class="d-xl-none dropdown-item mark-unread-current-thread"
          >
            Mark as Unread
          </button>
          <button
            @click.stop="restoreThread"
            type="button"
            v-if="
              this.$store.state.filterSection == 'trash' ||
              this.$store.state.filterSection == 'spam' ||
              this.$store.state.filterSection == 'closed'
            "
            class="dropdown-item d-flex"
            id="move-thread-to-inbox"
          >
            Move To Inbox
          </button>
          <button
            @click.stop="spamThreads"
            v-if="
              this.$store.state.filterSection == 'trash' ||
              this.$store.state.filterSection == 'spam'
            "
            type="button"
            class="dropdown-item d-flex"
            id="mark-spam"
          >
            Mark Spam
          </button>
          <a
            class="dropdown-item"
            :href="
              '/viewConversationInfo/' +
              thread.data.mailbox_id +
              '/' +
              this.$route.params.threadId
            "
            target="_blank"
            id="viewThreadInfo"
            >View Info</a
          >
          <a
            class="dropdown-item"
            :href="
              '/printThread?threadID=' +
              this.$route.params.threadId
            "
            target="_blank"
            >Print</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { bus } from "../../main";
import { firebase_app } from "../../firebaseInit"
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  name: "MailContentHeader",
  components: { DatePicker },
  props: {
    thread: Object,
  },
  data() {
    return {
      // isStarred: this.thread.data.isStarred,
      sqTm: "",
      sqTag: "",
      removetags: [],
      addtags: [],
      inboxSelected: this.$route.params.mailboxId,
      tagPinned: false,
      tagName: "",
      tagColor: "",
      datetime: "",
      newDateOpen: false,
      viewingUsers: "",
    };
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
    teammates() {
      // let query = this.sqTm.toLowerCase().trim();
      // if(query == "") {
      return this.$store.state.teammates;
      // } else {
      // return this.teammates.filter((item) => item.id !== this.userInfo.id);
      // }
    },
    mailboxes() {
      return this.$store.state.mailboxes;
    },
    teammatesNew: function () {
      let query = this.sqTm.toLowerCase().trim();
      if (query == "") {
        return this.teammates.filter((item) => item.id !== this.userInfo.id);
        // console.log(this.teammatesNew);
      } else {
        return this.teammates.filter(
          (item) =>
            item.id !== this.userInfo.id &&
            item.name.toLowerCase().search(query) !== -1
        );
        // console.log(this.teammatesNew);
      }
      // return this.teammates.filter((item) => item.id !== this.userInfo.id);
    },
  },
  mounted(){
    let managerID = this.$store.state.userInfo.accountID;
    let threadID = this.$route.params.threadId;
    const socket = firebase_app.database().ref(`/Account-${managerID}/Thread-${threadID}`);
    // let viewingUserFlag = false;
    socket.child("/viewing user").on("value", (snapshot) => {
      if(snapshot.val()){
        this.viewingUsers = snapshot.val();
      }
    });
  },
  methods: {
    backThread() {
      this.$emit("broad")
      bus.$emit("broad",'back');
    },
    unread() {
      // console.log(this.thread);
      bus.$emit("changeRead", this.$route.params.threadId);
      this.$emit("broad")
      bus.$emit("broad",'back');
    },
    closeThread() {
      // console.log(this.thread);
      bus.$emit("closeThread", this.$route.params.threadId);
      this.$emit("broad")
      bus.$emit("broad",'back');
    },
    markDone() {
      bus.$emit("doneThreads", this.$route.params.threadId);
      this.$emit("broad")
      bus.$emit("broad",'back');
    },
    spamThreads() {
      // console.log(this.thread);
      bus.$emit("spamThreads", this.$route.params.threadId);
      this.$emit("broad")
      bus.$emit("broad",'back');
    },
    changeStarred() {
      // console.log(this.thread);
      bus.$emit("changeStarred", this.$route.params.threadId);
      this.thread.data.isStarred = !this.thread.data.isStarred;
      // bus.$emit("broad");
    },
    deleteConv() {
      bus.$emit("deleteThreads", this.$route.params.threadId);
      this.$emit("broad")
      bus.$emit("broad",'back');
    },
    moveToInbox() {
      console.log(this.inboxSelected);
      bus.$emit("moveToInbox", this.$route.params.threadId, this.inboxSelected);
      this.$refs["move-thread-modal"].hide();
      this.$emit("broad")
      bus.$emit("broad",'back');
    },
    handleChange(value, type) {
      if (type === "minute") {
        this.newDateOpen = false;
      }
    },
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
    notBeforeNow(date) {
      return (
        date < new Date(new Date().setHours(new Date().getHours() + 1, 0, 0, 0))
      );
    },
    snoozeThread(till) {
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
        let ref = "snooze-thread-modall" + this.$route.params.threadId;
        this.$refs[ref].hide();
      }
      console.log(mom.toISOString());
      bus.$emit("snoozeThread", this.$route.params.threadId, mom);
      this.$emit("broad")
      bus.$emit("broad",'back');
    },
    assign(id) {
      console.log(this.$route.params.threadId, id);
      bus.$emit("assignThread", this.$route.params.threadId, id);
    },
    changeTagColor(color) {
      this.tagColor = color;
    },
    createTag(type) {
      this.removetags = [];
      this.addtags = [];
      console.log(this.tagName, this.tagPinned, this.tagColor);
      if(type == "new") {
        bus.$emit("createTags", this.$route.params.threadId, this.tagName, this.tagColor, this.tagPinned);
      } else if(type == "quick") {
        bus.$emit("createTags", this.$route.params.threadId, this.sqTag, '', false);
      }
      this.$refs['newtag-thread-modal'].hide();
      this.tagName = "";
      this.tagColor = "";
      this.tagPinned = false;
      this.sqTag = "";
    },
    toggleTag(id) {
      this.removetags = [];
      this.addtags = [];
      if (this.thread.data.tags.some((el) => el.id == id)) {
        this.removetags.push(id);
      } else {
        this.addtags.push(id);
      }
      bus.$emit(
        "toggleTags",
        this.$route.params.threadId,
        this.addtags,
        this.removetags
      );
    },
    toggleTags(id, event) {
      console.log(event.target.checked, id);
      if (
        event.target.checked &&
        (this.thread.data.tags.length == 0 ||
          this.thread.data.tags.some((el) => el.id !== id))
      ) {
        console.log("1");
        this.addtags.push(id);
        this.removetags = this.removetags.filter((tag) => tag !== id);
      } else if (
        !event.target.checked &&
        this.thread.data.tags.some((el) => el.id == id)
      ) {
        console.log("2");
        this.removetags.push(id);
        this.addtags = this.addtags.filter((tag) => tag !== id);
      } else if (
        event.target.checked &&
        this.thread.data.tags.some((el) => el.id == id)
      ) {
        console.log("3");
        this.removetags = this.removetags.filter((tag) => tag !== id);
      } else if (
        !event.target.checked &&
        this.thread.data.tags.some((el) => el.id !== id)
      ) {
        console.log("4");
        this.addtags = this.addtags.filter((tag) => tag !== id);
      }
      console.log(this.addtags);
      console.log(this.removetags);
    },
    applyTags() {
      bus.$emit(
        "toggleTags",
        this.$route.params.threadId,
        this.addtags,
        this.removetags
      );
      console.log("applying");
    },
    clearTags() {
      console.log("clearing");
      for (var i = 0; i < this.thread.data.tags.length; i++) {
        this.removetags.push(this.thread.data.tags[i].id);
      }
      this.addtags = [];
      bus.$emit(
        "toggleTags",
        this.$route.params.threadId,
        this.addtags,
        this.removetags
      );
    },
    restoreThread() {
      bus.$emit("restoreThreads", this.$route.params.threadId);
      this.$emit("broad")
      bus.$emit("broad",'back');
    },
  },
};
</script>

<style>
</style>