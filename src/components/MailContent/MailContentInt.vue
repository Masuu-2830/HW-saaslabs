<template>
  <!-- <div  class="integration-sidebar bd-l" style="width: 50px; background: white"> -->
    <!-- <div
      class="df-settings df-contact-settings d-none d-md-block"
      :class="ifIntOpen && 'show'"
    > -->
      <!-- <a
        id="dfSettingsShow"
        @click="openInt"
        class="df-settings-link all_icon"
        :class="ifIntOpen && 'open'"
        style="
          top: 10px !important;
          left: -44px;
          background: transparent;
          border-right: none;
        "
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
          class="feather feather-user"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </a> -->
      <div v-if="Object.keys(thread).length !== 0" class="df-settings-body pd-l-10 pd-r-15">
        <div id="contactDetailsWrapper" style="">
          <div class="pd-t-20">
            <!-- <div id="chatUser-name-window"> -->
            <!-- <div class="w-100 d-flex justify-content-center" id="chatUser_contact_avatar">

                </div> -->
            <div
              class="
                d-flex
                justify-content-between
                mg-l-15 mg-b-15
                align-items-center
              "
            >
              <label
                v-if="firstname !== '' && firstname !== undefined"
                class="
                  tx-sans tx-14 tx-uppercase tx-bold tx-spacing-1 tx-color-01
                  mg-0
                "
                :class="isEditName || isCreateName ? 'd-none' : ''"
                id="chatUser_contact_fullname"
                style="cursor: pointer; width: 1000px; word-break: break-word"
                @click="toggleEditName"
                >{{ firstname }} {{ lastname }}
              </label>
              <label
                v-else
                class="tx-sans tx-13 tx-spacing-1 tx-color-01 mg-0"
                :class="isCreateName || isEditName ? 'd-none' : ''"
                id="chatUser_add_contact_fullname"
                style="cursor: pointer; width: 1000px; word-break: break-word"
                ><button
                  type="button"
                  class="btn btn-link pd-0"
                  id="chatUser_add_contact_button"
                  @click="toggleCreateName"
                >
                  Add Name
                </button></label
              >
              <div
                class="d-flex flex-column w-100"
                id="chatUser_edit_contact_div"
              >
                <label
                  class="tx-sans tx-12 tx-spacing-1 tx-color-03"
                  :class="!isCreateName ? 'd-none' : ''"
                  for="chatUser_create_contact_firstname"
                  >First Name
                </label>
                <input
                  type="text"
                  v-model="firstname"
                  class="form-control"
                  :class="!isCreateName ? 'd-none' : ''"
                  placeholder="First Name"
                  id="chatUser_create_contact_firstname"
                  v-on:keyup.enter="createContact"
                />
                <label
                  class="tx-sans tx-12 tx-spacing-1 tx-color-03"
                  :class="!isEditName ? 'd-none' : ''"
                  for="chatUser_edit_contact_firstname"
                  >First Name
                </label>
                <input
                  type="text"
                  v-model="firstname"
                  class="form-control"
                  :class="!isEditName ? 'd-none' : ''"
                  placeholder="First Name"
                  id="chatUser_edit_contact_firstname"
                  v-on:keyup.enter="editContact"
                />
                <label
                  class="tx-sans tx-12 tx-spacing-1 tx-color-03 pd-t-15"
                  :class="!isCreateName ? 'd-none' : ''"
                  for="chatUser_create_contact_lastname"
                  >Last Name
                </label>
                <input
                  type="text"
                  v-model="lastname"
                  class="form-control"
                  :class="!isCreateName ? 'd-none' : ''"
                  placeholder="Last Name"
                  id="chatUser_create_contact_lastname"
                  v-on:keyup.enter="createContact"
                />
                <label
                  class="tx-sans tx-12 tx-spacing-1 tx-color-03 pd-t-15"
                  :class="!isEditName ? 'd-none' : ''"
                  for="chatUser_edit_contact_lastname"
                  >Last Name
                </label>
                <input
                  type="text"
                  v-model="lastname"
                  class="form-control"
                  :class="!isEditName ? 'd-none' : ''"
                  placeholder="Last Name"
                  id="chatUser_edit_contact_lastname"
                  v-on:keyup.enter="editContact"
                />
                <button
                  class="btn btn-link pd-0 chatUser_contact_close"
                  :class="!isCreateName ? 'd-none' : ''"
                  type="button"
                  id="chatUser_close_create_contact_name"
                  style="color: #8391a5"
                  @click="toggleCreateName"
                >
                  <i class="fas fa-times mg-l-10"></i>
                </button>
                <button
                  class="btn btn-link pd-0 chatUser_contact_close"
                  :class="!isEditName ? 'd-none' : ''"
                  type="button"
                  id="chatUser_close_edit_contact_name"
                  style="color: #8391a5"
                  @click="toggleEditName"
                >
                  <i class="fas fa-times mg-l-10"></i>
                </button>
              </div>
              <!-- <div class="d-flex align-items-center" style="color: #8391a5">
                <i
                  class="fas fa-xs fa-pen chatUser_contact_edit_button d-none"
                  style="cursor: pointer"
                ></i>
                <div class="dropdown-file mg-l-10">
                  <a
                    href=""
                    class="dropdown-link"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8391a5"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-more-vertical"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle></svg
                  ></a>
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    x-placement="bottom-end"
                    style="
                      position: absolute;
                      will-change: transform;
                      top: 0px;
                      left: 0px;
                      transform: translate3d(269px, 38px, 0px);
                      width: 200px !important;
                    "
                  >
                    <button
                      type="button"
                      id="blockChatUserModalBtn"
                      class="dropdown-item details"
                    >
                      <i class="fas fa-ban mg-r-5"></i>Block User
                    </button>
                  </div>
                </div>
              </div> -->
            </div>
            <!-- </div> -->
          </div>

          <div
            id="chatUser_contact_details"
            class="chatUser_collapsible pd-b-1 pd-x-15 collapse show"
            style="overflow-wrap: break-word; line-height: 1.5"
          >
            <div
              v-if="thread.data.contact.emails"
              class="d-flex flex-column mg-b-15"
            >
              <label
                class="tx-sans tx-12 tx-spacing-1 tx-color-03"
                for="chatUser_contact_email"
                >Email
              </label>
              <label
                v-if="emails.length > 0 && emails[0] !== ''"
                class="tx-sans tx-13 tx-spacing-1 tx-color-01 mg-0"
                :class="isCreateEmail ? 'd-none' : ''"
                id="chatUser_contact_email"
                ><div class="d-flex align-items-center">
                  <span id="emailText">{{ emails[0] }}</span
                  ><button
                    class="btn btn-link pd-0 mg-l-10"
                    id="copyEmailText"
                    data-container="body"
                    data-toggle="popover"
                    data-placement="top"
                    data-content="Email copied"
                  >
                    <svg
                      :data-clipboard-text="emails[0].toString()"
                      v-b-popover.click.blur.top="'Email copied'"
                      class="svgInSidebar"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      @click="copyTestingCode(emails[0].toString())"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path
                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                      ></path>
                    </svg>
                  </button></div
              ></label>
              <label
                v-else
                class="tx-sans tx-13 tx-spacing-1 tx-color-01 mg-0"
                :class="isCreateEmail ? 'd-none' : ''"
                id="chatUser_contact_email"
                style="cursor: pointer"
                ><button
                  type="button"
                  class="btn btn-link pd-0"
                  id="chatUser_add_email_button"
                  @click="toggleCreateEmail"
                >
                  Add
                </button></label
              >
              <div class="d-flex">
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  :class="!isCreateEmail ? 'd-none' : ''"
                  placeholder="abc@example.com"
                  id="chatUser_create_contact_email"
                  v-on:keyup.enter="editContact"
                />
                <button
                  class="btn btn-link pd-0 chatUser_contact_close"
                  :class="!isCreateEmail ? 'd-none' : ''"
                  type="button"
                  id="chatUser_close_create_email"
                  style="color: #8391a5"
                  @click="toggleCreateEmail"
                >
                  <i class="fas fa-times mg-l-10"></i>
                </button>
              </div>
            </div>

            <div v-if="id !== ''" class="d-flex flex-column mg-b-15">
              <label
                class="tx-sans tx-12 tx-spacing-1 tx-color-03"
                for="chatUser_contact_phone"
                >Phone</label
              >
              <label
                v-if="phones.length > 0"
                class="tx-sans tx-13 tx-spacing-1 tx-color-01 mg-0"
                :class="isEditPhone || isCreatePhone ? 'd-none' : ''"
                id="chatUser_contact_phone"
                style="cursor: pointer"
                @click="toggleEditPhone"
                >{{ phone }}</label
              >
              <label
                v-else
                class="tx-sans tx-13 tx-spacing-1 tx-color-01 mg-0"
                :class="isCreatePhone || isEditPhone ? 'd-none' : ''"
                id="chatUser_contact_phone"
                style="cursor: pointer"
                ><button
                  type="button"
                  class="btn btn-link pd-0"
                  id="chatUser_add_phone_button"
                  @click="toggleCreatePhone"
                >
                  Add
                </button></label
              >
              <div class="d-flex w-100">
                <input
                  type="tel"
                  v-model="phone"
                  class="form-control"
                  :class="!isCreatePhone ? 'd-none' : ''"
                  placeholder="+919876543210"
                  id="chatUser_create_contact_phone"
                  v-on:keyup.enter="editContact"
                />
                <input
                  type="tel"
                  v-model="phone"
                  class="form-control"
                  :class="!isEditPhone ? 'd-none' : ''"
                  placeholder="+919876543210"
                  id="chatUser_edit_contact_phone"
                  v-on:keyup.enter="editContact"
                />
                <button
                  class="btn btn-link pd-0 chatUser_contact_close"
                  @click="toggleEditPhone"
                  type="button"
                  :class="!isEditPhone ? 'd-none' : ''"
                  id="chatUser_close_edit_contact_phone"
                  style="color: #8391a5"
                >
                  <i class="fas fa-times mg-l-10"></i>
                </button>
                <button
                  class="btn btn-link pd-0 chatUser_contact_close"
                  @click="toggleCreatePhone"
                  type="button"
                  :class="!isCreatePhone ? 'd-none' : ''"
                  id="chatUser_close_create_contact_phone"
                  style="color: #8391a5"
                >
                  <i class="fas fa-times mg-l-10"></i>
                </button>
              </div>
            </div>

            <div v-if="id !== ''" class="d-flex flex-column mg-b-15">
              <label
                class="tx-sans tx-12 tx-spacing-1 tx-color-03"
                for="chatUser_contact_company"
                >Company</label
              >
              <label
                v-if="company !== ''"
                class="tx-sans tx-13 tx-spacing-1 tx-color-01 mg-0"
                :class="isEditCompany || isCreateCompany ? 'd-none' : ''"
                id="chatUser_contact_company"
                style="cursor: pointer"
                @click="toggleEditCompany"
                >{{ company }}</label
              >
              <label
                v-else
                class="tx-sans tx-13 tx-spacing-1 tx-color-01 mg-0"
                :class="isCreateCompany || isEditCompany ? 'd-none' : ''"
                id="chatUser_contact_company"
                style="cursor: pointer"
                ><button
                  type="button"
                  class="btn btn-link pd-0"
                  id="chatUser_add_company_button"
                  @click="toggleCreateCompany"
                >
                  Add
                </button></label
              >
              <div class="d-flex w-100">
                <input
                  type="text"
                  v-model="company"
                  class="form-control"
                  :class="!isCreateCompany ? 'd-none' : ''"
                  placeholder=""
                  id="chatUser_create_contact_company"
                  v-on:keyup.enter="editContact"
                />
                <input
                  type="text"
                  v-model="company"
                  class="form-control"
                  :class="!isEditCompany ? 'd-none' : ''"
                  placeholder=""
                  id="chatUser_edit_contact_company"
                  v-on:keyup.enter="editContact"
                />
                <button
                  class="btn btn-link pd-0 chatUser_contact_close"
                  :class="!isEditCompany ? 'd-none' : ''"
                  type="button"
                  id="chatUser_close_edit_contact_company"
                  style="color: #8391a5"
                  @click="toggleEditCompany"
                >
                  <i class="fas fa-times mg-l-10"></i>
                </button>
                <button
                  class="btn btn-link pd-0 chatUser_contact_close"
                  :class="!isCreateCompany ? 'd-none' : ''"
                  type="button"
                  id="chatUser_close_create_contact_company"
                  style="color: #8391a5"
                  @click="toggleCreateCompany"
                >
                  <i class="fas fa-times mg-l-10"></i>
                </button>
              </div>
            </div>

            <div v-if="id !== ''" class="d-flex flex-column mg-b-15">
              <label
                class="tx-sans tx-12 tx-spacing-1 tx-color-03"
                for="chatUser_contact_job"
                >Job Title</label
              >
              <label
                v-if="job !== ''"
                class="tx-sans tx-13 tx-spacing-1 tx-color-01 mg-0"
                :class="isEditJob || isCreateJob ? 'd-none' : ''"
                id="chatUser_contact_job"
                style="cursor: pointer"
                @click="toggleEditJob"
                >{{ job }}</label
              >
              <label
                v-else
                class="tx-sans tx-13 tx-spacing-1 tx-color-01 mg-0"
                :class="isCreateJob || isEditJob ? 'd-none' : ''"
                id="chatUser_contact_job"
                style="cursor: pointer"
                ><button
                  type="button"
                  class="btn btn-link pd-0"
                  id="chatUser_add_job_button"
                  @click="toggleCreateJob"
                >
                  Add
                </button></label
              >
              <div class="d-flex w-100">
                <input
                  type="text"
                  v-model="job"
                  class="form-control"
                  :class="!isCreateJob ? 'd-none' : ''"
                  placeholder=""
                  id="chatUser_create_contact_job"
                  v-on:keyup.enter="editContact"
                />
                <input
                  type="text"
                  v-model="job"
                  class="form-control"
                  :class="!isEditJob ? 'd-none' : ''"
                  placeholder=""
                  id="chatUser_edit_contact_job"
                  v-on:keyup.enter="editContact"
                />
                <button
                  class="btn btn-link pd-0 chatUser_contact_close"
                  :class="!isEditJob ? 'd-none' : ''"
                  type="button"
                  id="chatUser_close_edit_contact_job"
                  style="color: #8391a5"
                  @click="toggleEditJob"
                >
                  <i class="fas fa-times mg-l-10"></i>
                </button>
                <button
                  class="btn btn-link pd-0 chatUser_contact_close"
                  :class="!isCreateJob ? 'd-none' : ''"
                  type="button"
                  id="chatUser_close_create_contact_job"
                  style="color: #8391a5"
                  @click="toggleCreateJob"
                >
                  <i class="fas fa-times mg-l-10"></i>
                </button>
              </div>
            </div>
          </div>

          <div
            class="chatUser-previous-conversation-window mg-b-20"
            id="previous-threads-wrapper"
            v-if="id !== ''"
          >
            <div class="collapse-body shadow-sm bg-white rounded bd">
              <div
                class="collapse-header row"
                data-toggle="collapse"
                href="#previous-thread-conversation_details"
                role="button"
                aria-expanded="true"
                aria-controls="chatUser_previous-conversation_details"
                style="height: 50px; cursor: pointer"
              >
                <div class="col-10">
                  <p class="pd-l-13 pd-t-15 tx-bold">Previous Conversation</p>
                </div>
                <div class="col-1 pd-0 d-flex align-items-center">
                  <p class="pd-0 mg-b-0">
                    <i
                      class="fas fa-caret-down"
                      style="color: silver; border-radius: 5px"
                    ></i>
                  </p>
                </div>
              </div>
              <div
                id="previous-thread-conversation_details"
                class="pd-b-1 collapse show"
                style="overflow-wrap: break-word; line-height: 1.5"
                v-if="thread.data.contact.threads.length > 0"
              >
                <div
                  style="display: grid; place-content: center"
                  class="pd-y-10 d-none"
                  id="previous-conversation-loader"
                >
                  <div
                    class="spinner-border text-primary tx-10"
                    role="status"
                    style="width: 15px; height: 15px"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>

                <div class="d-flex flex-column" id="previous-threads-list">
                  <!-- <a
                    v-for="thread in thread.data.contact.threads"
                    :key="thread.id"
                    :href="
                      'http://localinbox.helpwise.io:3001/' +
                      thread.mailboxId +
                      '/all/' +
                      thread.id
                    "
                    class="d-flex justify-content-start"
                    target="_blank"
                    style="padding: 5px; color: #4f5d6b"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-mail"
                      style="/*! padding-right: 5px; */"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      ></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span class="tx-11 pd-l-7" style="max-width: 85%">{{
                      thread.subject
                    }}</span>
                  </a> -->
                  <div
                    v-for="thread in thread.data.contact.threads"
                    :key="thread.id"
                    class="d-flex flex-column openPrevThread bd-b pd-y-10"
                    :id="'prev-thread-' + thread.id"
                  >
                    <div class="d-flex mg-b-5 align-items-center">
                      <!-- <div
                        class="
                          avatar avatar-xs
                          mg-r-5
                          d-flex
                          align-items-center
                        "
                        style="width: 26px !important; height: 26px !important"
                      >
                        <div
                          style="
                            display: grid;
                            place-content: center;
                            border: 1px solid;
                            border-radius: 50%;
                            height: 22px;
                            width: 22px;
                          "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-user"
                          >
                            <path
                              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                            ></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                      </div> -->
                      <a
                        class="mg-b-0 tx-12 tx-color-01"
                        :href="
                          'http://localinbox.helpwise.io:3001/' +
                          thread.mailboxId +
                          '/all/' +
                          thread.id
                        "
                        target="_blank"
                        style="
                          font-weight: 500;
                          margin-left: 15px;
                          color: #4f5d6b;
                        "
                      >
                        {{ thread.subject }}
                      </a>
                    </div>
                    <div class="d-flex pd-x-10">
                      <p
                        class="
                          mg-b-0 mg-l-2
                          tx-14 tx-color-03
                          hw_rel-date
                          notOpenDate
                          pd-5
                        "
                        :id="'popoverDate' + thread.date"
                        style="
                          text-align: right;
                          cursor: pointer;
                          margin-left: auto;
                        "
                      >
                        {{ thread.date | moment("from", "now", true) }}
                      </p>
                      <b-popover
                        :target="'popoverDate' + thread.date"
                        triggers="hover"
                        placement="bottom"
                      >
                        {{ thread.date | moment("MMM D, YYYY hh:mm a") }}
                      </b-popover>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else
                style="margin-left: 15px"
                class="d-flex flex-column"
                id="previous-conversation-content"
              >
                <p class="tx-12 tx-color-03">No previous conversation found</p>
              </div>
            </div>
          </div>
          <div class="mg-b-10" v-if="id !== ''">
            <div class="collapse-body shadow-sm bg-white rounded bd">
              <div
                class="collapse-header load-notes row"
                data-toggle="collapse"
                href="#sidebar-notes-container"
                role="button"
                aria-expanded="false"
                aria-controls="sidebar-notes-container"
                style="height: 50px; cursor: pointer"
              >
                <div class="col-10">
                  <p class="pd-l-13 pd-t-15 tx-bold">Notes</p>
                </div>
                <div class="col-1 pd-0 d-flex align-items-center">
                  <p class="pd-0 mg-b-0">
                    <i
                      class="fas fa-caret-down"
                      style="color: silver; border-radius: 5px"
                    ></i>
                  </p>
                </div>
              </div>
              <div
                id="sidebar-notes-container"
                class="pd-b-1 pd-x-12 collapse"
                style="overflow-wrap: break-word; line-height: 1.5"
              >
                <div
                  class="d-flex flex-column mg-b-15"
                  style="text-align: center; align-items: center;
                      justify-content: center"
                >
                  <textarea
                    contenteditable="true"
                    data-tribute="true"
                    class="sidebar-comment col form-control mg-b-10"
                    style="background-color: #feedaf"
                    v-model="note"
                  ></textarea>
                  <button
                    type="button"
                    id="note-push-btn"
                    class="btn btn-outline-primary"
                    style="
                      font-size: 13px;
                      padding-top: 2px;
                      padding-bottom: 2px;
                      border-radius: 0.25rem;
                      width: 100px;
                    "
                    @click="addNote"
                  >
                    Add note
                  </button>
                  <!-- <button class="btn btn-xs btn-secondary" style="width: 100px">
                    Add Note
                  </button> -->
                  <div
                    class="spinner-border mg-10"
                    role="status"
                    style="position: relative; left: 35%; display: none"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                  <!-- <label class="tx-sans tx-11 tx-spacing-1 tx-color-03">Plan</label> -->
                  <!-- <label class="tx-sans tx-13 tx-spacing-1 tx-color-01 mg-0">--</label> -->
                </div>

                <div class="flex-column notes-display-column mg-b-15">
                  <div
                    v-for="note in notes"
                    :key="note.id"
                    class="form-control mg-b-10"
                    :id="'sidebar-comment-' + note.id"
                    style="background-color: #feedaf; height: fit-content"
                    v-html="note.body"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mg-b-10" v-if="id !== ''">
            <div class="collapse-body shadow-sm bg-white rounded bd">
              <div
                class="collapse-header load-activities row collapsed"
                data-toggle="collapse"
                href="#sidebar-activities-container-master"
                role="button"
                aria-expanded="false"
                aria-controls="sidebar-notes-container-master"
                style="height: 50px; cursor: pointer"
              >
                <div class="col-10">
                  <p class="pd-l-13 pd-t-15 tx-bold">Activities</p>
                </div>
                <div class="col-1 pd-0 d-flex align-items-center">
                  <p class="pd-0 mg-b-0">
                    <i
                      class="fas fa-caret-down"
                      style="color: silver; border-radius: 5px"
                    ></i>
                  </p>
                </div>
              </div>
              <div
                id="sidebar-activities-container-master"
                class="mg-b-10 pd-b-1 pd-x-0 collapse"
                style="overflow-wrap: break-word; line-height: 1.5"
              >
                <div
                  class="spinner-border mg-10"
                  role="status"
                  style="position: relative; left: 35%; display: none"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                <div
                  id="sidebar-activities-container"
                  class="mg-b-10 pd-b-1 pd-x-0"
                  style="overflow-wrap: break-word; line-height: 1.5"
                >
                  <div v-for="activity in activities" :key="activity.id">
                    <div
                      class="card mg-5"
                      :id="'sidebar-contact-activity-card-' + activity.id"
                    >
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                        style="background-color: #f3f3f3; padding: 10px"
                      >
                        <span style="font-size: 13px" class="mg-t-5"
                          >{{ activity.body.title }} -
                          {{ activity.body.type }}</span
                        >
                        <div>
                          <span
                            style="cursor: pointer"
                            data-toggle="collapse"
                            :data-target="'#activity-inside-div-' + activity.id"
                            aria-expanded="false"
                            :aria-controls="
                              'activity-inside-div-' + activity.id
                            "
                            class=""
                            ><i
                              class="fas fa-caret-down"
                              id=""
                              style="color: silver; border-radius: 5px"
                            ></i
                          ></span>
                        </div>
                      </div>
                      <div
                        :id="'activity-inside-div-' + activity.id"
                        class="mg-l-10 mg-r-10 collapse"
                        style=""
                      >
                        <p
                          style="color: #999da0ad; font-size: 13px"
                          class="mg-t-5"
                        >
                          Start date<br /><span
                            style="color: #4f5d6b; font-size: 13px"
                            >{{
                              activity.body.start_date
                                | moment("MMM D, YYYY hh:mm a")
                            }}</span
                          >
                        </p>
                        <p
                          style="color: #999da0ad; font-size: 13px"
                          class="mg-t-5"
                        >
                          End date<br /><span
                            style="color: #4f5d6b; font-size: 13px"
                            >{{
                              activity.body.end_date
                                | moment("MMM D, YYYY hh:mm a")
                            }}</span
                          >
                        </p>
                        <p
                          style="color: #999da0ad; font-size: 13px"
                          class="mg-t-5"
                        >
                          Description<br /><span
                            style="color: #4f5d6b; font-size: 13px"
                          >
                          </span>
                        </p>
                        <p v-html="activity.body.body"></p>

                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col s12 mg-b-10" style="text-align: center">
                  <button
                    id="add-activity-modal-show"
                    v-b-modal.activity-modal
                    class="btn btn-xs btn-secondary"
                  >
                    Create new activity
                  </button>
                  <b-modal
                    ref="activity-modal"
                    id="activity-modal"
                    title="Create New Activity"
                  >
                    <div class="modal-body pd-20 pd-sm-30">
                      <form id="formCalendar">
                        <div class="form-group">
                          <input
                            type="text"
                            id="activity-title"
                            class="form-control"
                            v-model="title"
                            placeholder="Add title"
                          />
                        </div>
                        <div class="form-group d-flex align-items-center">
                          <div class="custom-control custom-radio">
                            <input
                              type="radio"
                              id="activity-call"
                              name="customRadio"
                              class="custom-control-input"
                              v-model="type"
                              value="Call"
                            />
                            <label
                              class="custom-control-label"
                              for="activity-call"
                              >Call</label
                            >
                          </div>
                          <div class="custom-control custom-radio mg-l-20">
                            <input
                              type="radio"
                              id="activity-meeting"
                              name="customRadio"
                              class="custom-control-input"
                              v-model="type"
                              value="Meeting"
                            />
                            <label
                              class="custom-control-label"
                              for="activity-meeting"
                              >Meeting</label
                            >
                          </div>
                        </div>
                        <div class="modal-dates form-group mg-t-30">
                          <label
                            class="
                              tx-uppercase
                              tx-sans
                              tx-11
                              tx-medium
                              tx-spacing-1
                              tx-color-03
                            "
                            >Start Date</label
                          >
                          <div class="row row-xs">
                            <div class="col-7">
                              <input
                                v-model="startDate"
                                id="activityStartDate"
                                type="date"
                                value=""
                                class="form-control"
                                placeholder="Select date"
                              />
                            </div>
                            <div class="col-5">
                              <input
                                v-model="startTime"
                                type="time"
                                class="form-control activity-time-start"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="modal-dates form-group">
                          <label
                            class="
                              tx-uppercase
                              tx-sans
                              tx-11
                              tx-medium
                              tx-spacing-1
                              tx-color-03
                            "
                            >End Date</label
                          >
                          <div class="row row-xs">
                            <div class="col-7">
                              <input
                                v-model="endDate"
                                id="activityEndDate"
                                type="date"
                                value=""
                                class="form-control"
                                placeholder="Select date"
                              />
                            </div>
                            <div class="col-5">
                              <input
                                v-model="endTime"
                                type="time"
                                class="form-control activity-time-end"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <textarea
                            id="activity-description"
                            class="form-control"
                            v-model="description"
                            rows="2"
                            placeholder="Write some description (optional)"
                          ></textarea>
                        </div>
                      </form>
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
                            Discard
                          </b-button>
                        </b-col>
                        <!-- Button with custom close trigger value -->
                        <b-col class="float-right">
                          <b-button
                            @click="createActivity"
                            size="xs"
                            style="width: 100px"
                            variant="outline-success"
                          >
                            Add Activity
                          </b-button>
                        </b-col>
                      </b-row>
                    </template>
                  </b-modal>
                </div>
              </div>
            </div>
            <!-- end activity and note -->
          </div>

          <div class="mg-b-10" v-if="id !== ''">
            <div class="collapse-body shadow-sm bg-white rounded bd">
              <div
                class="collapse-header row"
                data-toggle="collapse"
                href="#sidebar-group-container"
                role="button"
                aria-expanded="true"
                aria-controls="sidebar-notes-container"
                style="height: 50px; cursor: pointer"
              >
                <div class="col-10">
                  <p class="pd-l-13 pd-t-15 tx-bold">Groups</p>
                </div>
                <div class="col-1 pd-0 d-flex align-items-center">
                  <p class="pd-0 mg-b-0">
                    <i
                      class="fas fa-caret-down"
                      style="color: silver; border-radius: 5px"
                    ></i>
                  </p>
                </div>
              </div>
              <div
                id="sidebar-group-container"
                class="pd-b-1 pd-x-12 collapse"
                style="overflow-wrap: break-word; line-height: 1.5"
              >
                <div class="d-flex flex-column mg-b-15">
                  <div
                    v-if="groups && groups.length > 0"
                    class="pd-y-20 group-wrapper"
                    id="group-wrapper"
                    style=""
                  >
                    <div class="row d-flex flex-column">
                      <div class="d-flex">
                        <div style="" class="mg-l-20 contact-groups">
                          <span
                            v-for="group in groups"
                            :key="group.group_id"
                            :data-id="group.group_id"
                            class="badge badge-pill mr-2 badge-light"
                            >{{ group.name }}</span
                          >
                        </div>
                      </div>
                    </div>
                    <!-- row -->
                  </div>
                  <div class="row mg-b-10">
                    <div class="mx-auto">
                      <button
                        id="add-group-modal-show"
                        v-b-modal.group-modal
                        class="btn btn-xs btn-secondary"
                      >
                        Add to group
                      </button>
                      <b-modal
                        ref="group-modal"
                        id="group-modal"
                        title="Add to group"
                      >
                        <div class="modal-body pd-20 pd-sm-30">
                          <div id="all-groups-container">
                            <a
                              v-for="grp in availableGrps"
                              :key="grp.id"
                              style="padding-top: 10px; padding-bottom: 10px"
                              class="
                                dropdown-item
                                btn
                                list-group-item
                                map-group
                              "
                              @click="addToGrp(grp.id, grp.name)"
                              :data-id="grp.id"
                              :data-name="grp.name"
                              >{{ grp.name }}</a
                            >
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
                                Close
                              </b-button>
                            </b-col>
                            <!-- Button with custom close trigger value -->
                            <b-col class="float-right">
                              <b-button
                                @click="cancel()"
                                v-b-modal.newgroup-modal
                                size="xs"
                                style="width: 130px"
                                variant="outline-success"
                              >
                                Create new group
                              </b-button>
                            </b-col>
                          </b-row>
                        </template>
                      </b-modal>
                      <b-modal
                        ref="newgroup-modal"
                        id="newgroup-modal"
                        title="Add group"
                      >
                        <div class="modal-body pd-20 pd-sm-30">
                          <div class="form-group">
                            <label id="" class="d-block">Group Name</label>
                            <input
                              id="group-name"
                              type="text"
                              v-model="grpName"
                              class="form-control"
                            />
                            <div id="mailbox-name-valid"></div>
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
                                Close
                              </b-button>
                            </b-col>
                            <!-- Button with custom close trigger value -->
                            <b-col class="float-right">
                              <b-button
                                @click="createGrp"
                                size="xs"
                                variant="outline-success"
                              >
                                Save
                              </b-button>
                            </b-col>
                          </b-row>
                        </template>
                      </b-modal>
                    </div>
                  </div>
                </div>
                <div class="flex-column notes-display-column mg-b-15"></div>
              </div>
            </div>
          </div>
        </div>
        <div id="contactCreateWrapper" class="pd-y-10" style="display: none">
          <div class="collapse-body shadow-sm bg-white rounded">
            <div
              class="collapse-header row"
              style="cursor: pointer; height: 50px"
            >
              <div class="col-8">
                <p class="pd-l-13 pd-t-15">
                  <i class="far fa-address-card"></i>
                  Contact
                </p>
              </div>
            </div>
            <div
              class="pd-b-1 collapse show"
              style="overflow-wrap: break-word; line-height: 1.5"
            >
              <div class="col s12">
                <p style="padding: 5px; color: #4f5d6b">
                  No contact Found associated with this conversation.<a
                    id="createContactBtn"
                    style="color: blue; cursor: pointer"
                  >
                    Create One.</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <IntegrationContainer></IntegrationContainer> -->
    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { bus } from "../../main";
export default {
  name: "MailContentVue",
  props: ["thread"],
  data() {
    return {
      ifIntOpen: false,
      // contact: {},
      id:
        Object.keys(this.thread).length !== 0 && this.thread.data.contact.id !== undefined
          ? this.thread.data.contact.id
          : "",
      firstname:
        Object.keys(this.thread).length !== 0 && this.thread.data.contact.firstname !== undefined
          ? this.thread.data.contact.firstname
          : "",
      lastname:
        Object.keys(this.thread).length !== 0 && this.thread.data.contact.lastname !== undefined
          ? this.thread.data.contact.lastname
          : "",
      company:
        Object.keys(this.thread).length !== 0 && this.thread.data.contact.company !== undefined
          ? this.thread.data.contact.company
          : "",
      job:
        Object.keys(this.thread).length !== 0 && this.thread.data.contact.jobTitle !== undefined
          ? this.thread.data.contact.jobTitle
          : "",
      activities:
        Object.keys(this.thread).length !== 0 && this.thread.data.contact.activities !== undefined
          ? this.thread.data.contact.activities
          : [],
      groups:
        Object.keys(this.thread).length !== 0 && this.thread.data.contact.groups !== undefined
          ? this.thread.data.contact.groups
          : [],
      notes:
        Object.keys(this.thread).length !== 0 && this.thread.data.contact.notes !== undefined
          ? this.thread.data.contact.notes
          : [],
      email: Object.keys(this.thread).length !== 0 && this.thread.data.contact.emails !== undefined &&
        this.thread.data.contact.emails[0] !== undefined
          ? this.thread.data.contact.emails[0] : "",
      emails: Object.keys(this.thread).length !== 0 && this.thread.data.contact.emails !== undefined &&
        this.thread.data.contact.emails[0] !== undefined
          ? this.thread.data.contact.emails : [],
      phones:
        Object.keys(this.thread).length !== 0 && this.thread.data.contact.phones !== undefined &&
        this.thread.data.contact.phones[0] !== undefined
          ? this.thread.data.contact.phones
          : [],
      phone:
        Object.keys(this.thread).length !== 0 && this.thread.data.contact.phones !== undefined &&
        this.thread.data.contact.phones[0] !== undefined
          ? this.thread.data.contact.phones[0].phoneNo
          : "",
      availableGrps: [],
      isEditName: false,
      isEditCompany: false,
      isEditJob: false,
      isEditPhone: false,
      isCreateName: false,
      isCreateCompany: false,
      isCreateJob: false,
      isCreatePhone: false,
      isCreateEmail: false,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      type: "Call",
      title: "",
      description: "",
      note: "",
      grpName: "",
    };
  },
  watch: {
    $route(to, from) {
      if (to.params.threadId !== from.params.threadId) {
        this.ifIntOpen = false;
      }
    },
  },
  beforeMount() {
    fetch(this.$apiBaseURL + "contacts/getGroups.php", {
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        if (data.status !== "success") {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.availableGrps = data.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  methods: {
    openInt() {
      this.ifIntOpen = !this.ifIntOpen;
      this.$emit("openInt");
    },
    editContact() {
      if (this.id !== "") {
        let phones = this.phones;
        if (phones.length > 0) {
          phones[0].phoneNo = this.phone;
          phones[0].phoneTxt = this.phone;
          phones[0].type = "0";
        } else {
          let phone = {};
          phone["phoneNo"] = this.phone;
          phone["phoneTxt"] = this.phone;
          phone["type"] = "0";
          phones.push(phone);
        }
        if (this.emails.length == 0 && this.email !== "") {
          this.emails.push(this.email);
        }
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.id,
            threadId: this.$route.params.threadId,
            mailboxId: this.$route.params.mailboxId,
            firstname: this.firstname,
            lastname: this.lastname,
            company: this.company,
            jobTitle: this.job,
            emails: this.emails,
            phones: phones,
          }),
          credentials: "include",
        };
        console.log(requestOptions.body);
        fetch(this.$apiBaseURL + "contacts/update.php", requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            this.isEditCompany = false;
            this.isEditJob = false;
            this.isEditName = false;
            this.isEditPhone = false;
            this.isCreateName = false;
            this.isCreateCompany = false;
            this.isCreateJob = false;
            this.isCreatePhone = false;
            this.isCreateEmail = false;
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        this.emails = [];
        if (this.emails.length == 0 && this.email !== "") {
          this.emails.push(this.email);
        }
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            threadId: this.$route.params.threadId,
            mailboxId: this.$route.params.mailboxId,
            firstname: this.firstname,
            lastname: this.lastname,
            company: this.company,
            jobTitle: this.job,
            emails: this.emails,
            phones: this.phones,
          }),
          credentials: "include",
        };
        console.log(requestOptions.body);
        fetch(this.$apiBaseURL + "contacts/create.php", requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            this.id = data.data.id;
            this.isEditCompany = false;
            this.isEditJob = false;
            this.isEditName = false;
            this.isEditPhone = false;
            this.isCreateName = false;
            this.isCreateCompany = false;
            this.isCreateJob = false;
            this.isCreatePhone = false;
            this.isCreateEmail = false;
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    addToGrp(id, name) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId: this.id,
          groupId: id,
          name: name,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "contacts/addGroup", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          if (this.groups.some((el) => el.group_id === id)) {
            // this.groups = this.groups.filter(el => el.group_id !== id);
            this.groups.splice(
              this.groups.findIndex((a) => a.group_id === id),
              1
            );
            // console.log(grps);
            // this.groups = grps;
          } else {
            let grp = {};
            grp["group_id"] = id;
            grp["name"] = name;
            this.groups.push(grp);
          }
          console.log(this.groups);
          this.$refs["group-modal"].hide();
        })
        .catch((error) => {
          alert(error);
        });
    },
    createGrp() {
      if (this.grpName !== "") {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.grpName,
          }),
          credentials: "include",
        };
        fetch(this.$apiBaseURL + "contacts/createGroup", requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            let grp = {};
            grp["id"] = data.data.id;
            grp["name"] = this.grpName;
            this.availableGrps.push(grp);
            this.grpName = "";
            this.$refs["newgroup-modal"].hide();
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    addNote() {
      const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contact_id: this.id,
            body: this.note,
          }),
          credentials: "include",
        };
        console.log(requestOptions.body);
        fetch(this.$apiBaseURL + "contacts/addNote", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          let note = {};
          note["body"] = data.data.comment.body;
          note["createdAt"] = new Date().toISOString();
          note["date"] = new Date().toISOString();
          note["id"] = data.data.comment.id;
          note["data_type"] = "notes";
          this.notes.push(note);
          this.note = "";
        })
        .catch((error) => {
          alert(error);
        });
    },
    createActivity() {
      console.log(
        this.startDate + " " + this.startTime,
        this.endDate + " " + this.endTime,
        this.type
      );
      if (this.title !== "") {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contact_id: this.id,
            title: this.title,
            start_date: this.startDate + " " + this.startTime,
            end_date: this.endDate + " " + this.endTime,
            body: this.description,
            type: this.type,
          }),
          credentials: "include",
        };
        console.log(requestOptions.body);
        fetch(this.$apiBaseURL + "contacts/addActivity", requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            let activity = {};
            let body = {};
            body["end_date"] = this.endDate + " " + this.endTime;
            body["start_date"] = this.startDate + " " + this.startTime;
            body["title"] = this.title;
            body["type"] = this.type;
            body["body"] = this.description;
            activity["body"] = body;
            activity["createdAt"] = new Date().toISOString();
            activity["id"] = data.data.activity.id;
            activity["type"] = "custom";
            this.activities.push(activity);
            this.startDate = "";
            this.startTime = "";
            this.endDate = "";
            this.endTime = "";
            this.type = "Call";
            this.title = "";
            this.description = "";
            this.$refs["activity-modal"].hide();
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    fallbackCopyTestingCode(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }

      document.body.removeChild(textArea);
    },
    copyTestingCode(text) {
      if (!navigator.clipboard) {
        this.fallbackCopyTestingCode(text);
        return;
      }
      navigator.clipboard.writeText(text).then(
        function () {
          console.log("Async: Copying to clipboard was successful!");
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    },
    toggleEditName() {
      this.isEditName = !this.isEditName;
    },
    toggleEditPhone() {
      this.isEditPhone = !this.isEditPhone;
    },
    toggleEditCompany() {
      this.isEditCompany = !this.isEditCompany;
    },
    toggleEditJob() {
      this.isEditJob = !this.isEditJob;
    },
    toggleCreateName() {
      this.isCreateName = !this.isCreateName;
    },
    toggleCreateEmail() {
      this.isCreateEmail = !this.isCreateEmail;
    },
    toggleCreatePhone() {
      this.isCreatePhone = !this.isCreatePhone;
    },
    toggleCreateCompany() {
      this.isCreateCompany = !this.isCreateCompany;
    },
    toggleCreateJob() {
      this.isCreateJob = !this.isCreateJob;
    },
  },
};
</script>

<style scoped>
    .df-settings-body {
        position: unset;
        width: 300px !important;
        top: 0;
        left: 0;
        height: 100%;
        background-color: #fff;
        border-left: 1px solid #c0ccda;
        box-shadow: 0 0 15px rgb(28 39 60 / 10%);
        padding: 0 20px;
        overflow-y: auto; 
    }
</style>
