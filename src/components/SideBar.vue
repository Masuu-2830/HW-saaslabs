<template>
  <div class="mail-sidebar">
    <div class="mail-sidebar-body ps ps--active-y">
      <div class="pd-20" style="padding-bottom: 25px">
        <div class="d-flex justify-content-between align-items-start">
          <h5 id="mailbox-title">{{ this.$store.state.inboxData.name }}</h5>
          <router-link
            to="settings"
            id="mailbox-settings-link"
            class=""
            target="_blank"
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
              class="feather feather-settings"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              ></path>
            </svg>
          </router-link>
        </div>
        <div role="group" class="btn-group btn-block">
          <button
            @click="openCompose"
            class="
              tx-uppercase
              mailComposeBtn
              tx-10 tx-medium tx-sans tx-spacing-4
              btn btn-primary
            "
            style="border-right: 2px solid #0153c7 !important"
          >
            Compose
          </button>
          <div class="btn-group" role="group">
            <button
              id="composeDrop"
              style="border-right: 2px solid #0153c7 !important"
              type="button"
              class="btn btn-primary btn-xs dropdown-toggle px-2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></button>
            <div
              class="dropdown-menu composeDropMenu"
              style="width: 30px !important"
            >
              <a class="dropdown-item mailComposeBtn" href=""> New Message </a>
              <a class="dropdown-item startDiscussionBtn" href="">
                Start Discussion
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="pd-b-10 pd-l-10">
        <div id="nav-links-container" class="pd-r-10">
          <nav class="nav nav-sidebar tx-13" id="labels-nav">
            <router-link :to="{ name: 'type', params: {type: 'mine', mailboxId: this.$route.params.mailboxId}}">
            <span
              style="cursor: pointer"
              id="mine-label"
              class="nav-link hw-label-badge"
              :class="this.$route.params.type == 'mine' && 'active'"
            >
              <!--?xml version="1.0" encoding="utf-8"?-->
              <svg
                style="stroke-width: 25px"
                version="1.1"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 492 492"
                xml:space="preserve"
              >
                <g id="Master_Layer_2"></g>
                <g id="Layer_1">
                  <polygon
                    points="126,385 149,415 185,446 231.8,468 295,468 338,454 367.4,431 384,400 396,363 396,281 396,176 
        396,124 372,105.6 348.3,112.2 335.2,110.8 335.9,72.2 315.6,53.8 283.4,60.4 274.3,63.6 270.3,34.1 246,21.7 220.5,29.7 212,63.6 
        214.6,85.9 199.5,61 172.6,59.1 153.6,74.1 151,299 109.7,239.4 88.7,240 69.5,254.4 65.8,279.4 	"
                  ></polygon>
                  <g>
                    <polygon
                      points="367.4,99.5 367.4,99.5 367.4,99.5 		"
                    ></polygon>
                    <path
                      d="M62.2,287c0.3,0.6,0.5,1.1,0.8,1.5c0.1,0.2,0.2,0.4,0.3,0.5l0,0l0,0l0,0l67.7,117.2c0.3,0.6,0.7,1.2,1.2,1.8l5.4-4.8
            l-5.4,4.8c29.9,33.9,64.2,55,98,64.5c29.4,8.2,58.5,7.6,84.3-1c26-8.7,48.6-25.4,64.8-49.5c15.9-23.5,25.6-54.1,26.3-90.8
            c0-0.3,0-0.5,0-0.8V137.6c0-10.5-4.3-20-11.2-26.9c-6.9-6.9-16.4-11.2-26.9-11.2c-8.9,0-17.1,3.1-23.6,8.3V83.4
            c0-10.5-4.3-20-11.2-26.9c-6.9-6.9-16.4-11.2-26.9-11.2c-8.9,0-17.1,3.1-23.6,8.3v-0.2c0-10.5-4.3-20-11.2-26.9
            c-6.9-6.9-16.4-11.2-26.9-11.2c-10.5,0-20,4.3-26.9,11.2c-6.9,6.9-11.2,16.4-11.2,26.9v4.4c-6.5-5.2-14.7-8.3-23.6-8.3
            c-10.5,0-20,4.3-26.9,11.2c-6.9,6.9-11.2,16.4-11.2,26.9v136h0l0,53.1l-14.7-25.4c-0.1-0.1-0.1-0.3-0.2-0.4l0,0l0,0l0,0
            c-5.4-9.3-13.4-15.2-22.5-17.6c-9.1-2.4-19.2-1.4-28.5,3.1c-0.2,0.1-0.5,0.2-0.7,0.3l0,0c-0.4,0.2-1,0.5-1.8,1
            c-8.5,4.9-14.1,13-16.5,22C57,268.6,57.9,278.4,62.2,287z M69.5,285.4l6.3-3.6c-0.1-0.1-0.2-0.3-0.2-0.4c-0.2-0.4-0.4-0.6-0.5-0.9
            c-2.7-5.4-3.2-11.6-1.8-17.2c1.4-5.4,4.7-10.2,9.7-13.1c0.1-0.1,0.5-0.2,1.1-0.5l-3.2-6.5l3.2,6.5c0.2-0.1,0.4-0.2,0.5-0.3
            c6.2-2.9,12.7-3.7,18.5-2.1c5.5,1.5,10.4,5.1,13.7,10.8l6.2-3.6l-6.3,3.6c0.1,0.1,0.2,0.3,0.3,0.4l28.1,48.7l0,0
            c2,3.5,6.4,4.6,9.9,2.6c2.5-1.5,3.8-4.2,3.6-6.9l0-79.4h0v-136c0-6.5,2.7-12.4,7-16.7c4.3-4.3,10.2-7,16.7-7
            c6.5,0,12.4,2.7,16.7,7c4.3,4.3,7,10.2,7,16.7v136h14.5v-136V53.3c0-6.5,2.7-12.4,7-16.7c4.3-4.3,10.2-7,16.7-7
            c6.5,0,12.4,2.7,16.7,7c4.3,4.3,7,10.2,7,16.7v30v140.2H282V83.4c0-6.5,2.7-12.4,7-16.7c4.3-4.3,10.2-7,16.7-7
            c6.5,0,12.4,2.7,16.7,7c4.3,4.3,7,10.2,7,16.7v54.2v86h14.5v-86c0-6.5,2.7-12.4,7-16.7c4.3-4.3,10.2-7,16.7-7
            c6.5,0,12.4,2.7,16.7,7c4.3,4.3,7,10.2,7,16.7v192.8c0,0.2,0,0.3,0,0.5c-0.6,33.7-9.4,61.6-23.8,83
            c-14.4,21.3-34.4,36.2-57.4,43.9c-23.1,7.7-49.3,8.2-75.9,0.8c-31.1-8.7-62.7-28.2-90.6-59.6L75.7,281.8L69.5,285.4z"
                    ></path>
                  </g>
                </g>
              </svg>
              <span>Mine</span>
              <span class="badge text-primary hw-count" id="mine-count">{{mailbox.stats.mine > 0 || (typeof mailbox.stats.mine) === 'string' ? mailbox.stats.mine == 0 ? '' : mailbox.stats.mine : ''}}</span
            ></span>
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'mentions', mailboxId: this.$route.params.mailboxId}}">
            <span
              style="cursor: pointer"
              id="mentions-label"
              class="nav-link hw-label-badge"
              :class="this.$route.params.type == 'mentions' && 'active'"
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
                class="feather feather-at-sign"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
              </svg>
              <span>Mentions</span>
              <span class="badge text-primary hw-count" id="mentions-count"
                >{{mailbox.stats.mentions > 0 || (typeof mailbox.stats.mentions) === 'string' ? mailbox.stats.mentions == 0 ? '' : mailbox.stats.mentions : ''}}</span
              > </span
            ></router-link>
            <router-link :to="{ name: 'type', params: {type: 'discussions', mailboxId: this.$route.params.mailboxId}}">
            <span
              style="cursor: pointer"
              id="discussions-label"
              class="nav-link hw-label-badge"
              :class="this.$route.params.type == 'discussions' && 'active'"
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
                class="feather feather-message-circle"
              >
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                ></path>
              </svg>
              <span>Discussions</span>
              <span
                class="badge text-primary hw-count"
                id="discussions-count"
              >{{mailbox.stats.discussions > 0 || (typeof mailbox.stats.discussions) === 'string' ? mailbox.stats.discussions == 0 ? '' : mailbox.stats.discussions : ''}}</span>
            </span>
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'all', mailboxId: this.$route.params.mailboxId}}">
            <span
              style="cursor: pointer"
              id="all-label"
              class="nav-link hw-label-badge"
              :class="this.$route.params.type == 'all' && 'active'"
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
              <span>All</span>
              <span class="badge text-primary hw-count" id="all-count"
                >{{mailbox.stats.inbox > 0 || (typeof mailbox.stats.inbox) === 'string' ? mailbox.stats.inbox == 0 ? '' : mailbox.stats.inbox : ''}}</span
              >
            </span>
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'assigned', mailboxId: this.$route.params.mailboxId}}">
            <span
              style="cursor: pointer"
              id="assigned-label"
              class="nav-link hw-label-badge"
              :class="this.$route.params.type == 'assigned' && 'active'"
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
                class="feather feather-mail"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Assigned</span>
              <span class="badge text-primary hw-count" id="assigned-count"
                >{{mailbox.stats.assigned > 0 || (typeof mailbox.stats.assigned) === 'string' ? mailbox.stats.assigned == 0 ? '' : mailbox.stats.assigned : ''}}</span
              >
            </span>
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'unassigned', mailboxId: this.$route.params.mailboxId}}">
            <span
              style="cursor: pointer"
              id="unassigned-label"
              class="nav-link hw-label-badge"
              :class="this.$route.params.type == 'unassigned' && 'active'"
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
              >
                <path
                  d="M 12 1.9921875 L 2.0214844 8.8769531 L 2.0195312 8.8769531 L 2.0195312 20.041016 C 2.0195312 21.122736 2.917925 22.007812 4.015625 22.007812 L 19.982422 22.007812 C 21.080172 22.007812 21.978516 21.122816 21.978516 20.041016 L 21.978516 8.8769531 L 12 1.9921875 z M 21.978516,8.8769531 12.000047,15.761718 2.021531,8.8769531"
                ></path>
              </svg>
              <span>Unassigned</span>
              <span class="badge text-primary hw-count" id="unassigned-count"
                >{{mailbox.stats.unassigned > 0 || (typeof mailbox.stats.unassigned) === 'string' ? mailbox.stats.unassigned == 0 ? '' : mailbox.stats.unassigned : ''}}</span
              > </span
            >
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'starred', mailboxId: this.$route.params.mailboxId}}">
            <span
              style="cursor: pointer"
              id="starred-label"
              class="nav-link hw-label-badge"
              :class="this.$route.params.type == 'starred' && 'active'"
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
                class="feather feather-star"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                ></polygon>
              </svg>
              <span>Starred</span>
              <span
                class="badge text-primary hw-count"
                id="starred-count"
              >{{mailbox.stats.starred > 0 || (typeof mailbox.stats.starred) === 'string' ? mailbox.stats.starred == 0 ? '' : mailbox.stats.starred : ''}}</span>
            </span>
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'snoozed', mailboxId: this.$route.params.mailboxId}}">
            <span
              style="cursor: pointer"
              id="snoozed-label"
              class="nav-link hw-label-badge"
              :class="this.$route.params.type == 'snoozed' && 'active'"
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
                class="feather feather-clock"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Snoozed</span>
              <span
                class="badge text-primary hw-count"
                id="snoozed-count"
              >{{mailbox.stats.snoozed > 0 || (typeof mailbox.stats.snoozed) === 'string' ? mailbox.stats.snoozed == 0 ? '' : mailbox.stats.snoozed : ''}}</span>
            </span>
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'drafts', mailboxId: this.$route.params.mailboxId}}">
            <span
              style="cursor: pointer"
              id="drafts-label"
              class="nav-link hw-label-badge"
              :class="this.$route.params.type == 'drafts' && 'active'"
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
                class="feather feather-file"
              >
                <path
                  d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                ></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
              <span>Drafts</span>
              <span class="badge text-primary hw-count" id="drafts-count"
                >{{mailbox.stats.drafts > 0 || (typeof mailbox.stats.drafts) === 'string' ? mailbox.stats.drafts == 0 ? '' : mailbox.stats.drafts : ''}}</span
              >
            </span>
            </router-link>
            <!-- </div> -->
            <span
              style="cursor: pointer"
              id="more-less-toggle"
              class="nav-link"
              :class="more ? 'less' : 'more'"
              @click="expandMore"
            >
              <div class="less justify-content-between">
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
                  class="feather feather-chevron-up"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                <span>Less</span>
              </div>
              <div class="more justify-content-between">
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
                <span>More</span>
              </div>
            </span>
            <div
              id="more-less-labels"
              class="w-100"
              :class="more ? '' : 'd-none'"
              style="max-height: 22vh; overflow-y: scroll"
            >
            <router-link :to="{ name: 'type', params: {type: 'sent', mailboxId: this.$route.params.mailboxId}}">
              <span
                style="cursor: pointer"
                id="sent-label"
                class="nav-link hw-label-badge"
                :class="this.$route.params.type == 'sent' && 'active'"
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
                  class="feather feather-send"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                <span>Sent Mail</span> <span class="badge"></span
              ></span>
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'scheduled', mailboxId: this.$route.params.mailboxId}}">
              <span
                style="cursor: pointer"
                id="scheduled-label"
                class="nav-link hw-label-badge"
                :class="this.$route.params.type == 'scheduled' && 'active'"
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
                  class="feather feather-clock"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Scheduled</span> <span class="badge"></span
              ></span>
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'closed', mailboxId: this.$route.params.mailboxId}}">
              <span
                style="cursor: pointer"
                id="closed-label"
                class="nav-link hw-label-badge"
                :class="this.$route.params.type == 'closed' && 'active'"
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
                <span>Closed</span> <span class="badge"></span
              ></span>
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'spam', mailboxId: this.$route.params.mailboxId}}">
              <span
                style="cursor: pointer"
                id="spam-label"
                class="nav-link hw-label-badge"
                :class="this.$route.params.type == 'spam' && 'active'"
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
                  class="feather feather-alert-octagon"
                >
                  <polygon
                    points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                  ></polygon>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12" y2="16"></line>
                </svg>
                <span>Spam</span>
                <span
                  class="badge text-primary hw-count"
                  id="spam-count"
                ></span>
              </span>
            </router-link>
            <router-link :to="{ name: 'type', params: {type: 'trash', mailboxId: this.$route.params.mailboxId}}">
              <span
                style="cursor: pointer"
                id="trash-label"
                class="nav-link hw-label-badge"
                :class="this.$route.params.type == 'trash' && 'active'"
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
                  class="feather feather-trash"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg>
                <span>Trash</span>
                <span class="badge"></span>
              </span>
            </router-link>
              <a
                v-for="tag in tags" :key="tag.id"
                style="cursor: pointer"
                :data-mailbox-id="mailbox.id"
                :data-tag-id="tag.id"
                class="nav-link hw_sidebarTag hw-label-badge"
                :href="'https://app.helpwise.io/mail/204420/tag/'+tag.id"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="fill: none"
                  :style="{color: tag.color}"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-tag"
                >
                  <path
                    d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                  ></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <span
                  style="
                    width: 65%;
                    white-space: nowrap;
                    overflow: hidden !important;
                    text-overflow: ellipsis;
                  "
                >{{tag.name}}</span>
                <span class="badge text-primary hw-count hw_sidebarTagCount">
                </span>
              </a>
              
            </div>
          </nav>
        </div>
        <div class="dropdown-divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";
import Compose from "./Compose.vue";
import Vue from 'vue';
export default {
  name:'SideBar',
  props: {
    mailbox: Object,
  },
  data() {
    return {
      more: false,
      // compose: {}
    }
  },
  computed: {
    tags() {
      return this.$store.state.tags
    }
  },
  methods: {
    expandMore() {
      this.more = !this.more;
    },
    openCompose() {
      console.log("open")
      let hash = Date.now() + '-' + Math.floor(Math.random() * 100000000000);
      // this.$set(this.compose, hash, { id: hash });
      bus.$emit("openCompose", hash);
      // console.log(this.compose);
    }
  }
};
</script>

<style>
</style>