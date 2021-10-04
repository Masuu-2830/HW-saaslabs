<template>
  <div class="w-100 row media m-0 hw-thread media-body" :class="[this.mail.isRead ? 'read' : 'unread']">
    <div class="realtimeMarker"></div>
    <div class="hw_broadThread w-100">
      <div class="row align-items-center w-100" style="padding-left: 20px">
        <div
          class="col-3 d-flex justify-content-between align-items-center pl-0"
        >
          <div class="d-flex align-items-center">
            <div @click.stop class="custom-control hw_thread-selector custom-checkbox">
              <input
                type="checkbox"
                v-model="checkAll"
                @click="checkBox"
                class="custom-control-input"
                :id="'thread-' + mail.id +'-selector'"
              />
              <label
                class="custom-control-label"
                :for="'thread-' + mail.id +'-selector'"
              ></label>
            </div>
            <div @click.stop="changeStarred(mail.id)" class="hw_starThread px-1 mr-1" :style="{color: this.mail.isStarred ? '#f4b400' : '#8392a5'}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                :fill="this.mail.isStarred ? '#f4b400' : 'none'"
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
            </div>
          </div>
          <div class="flex-grow-1 w-100 d-flex thread-addr">
            <div
              v-if="mail.email.from == undefined"
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              (unknown sender)
            </div>
            <div
              v-else-if="this.$route.params.type == 'sent'"
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              To: {{ Object.values(mail.email.to).toString() }}
            </div>
            <div
              v-else
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              {{ Object.values(mail.email.from).toString() }}
            </div>
            <div
              class="text-primary ml-1"
              v-if="mail.hasDraft"
              style="max-width: 25%"
            >
              Draft
            </div>
            <div
              class="text-secondary ml-1 total-email-count"
              style="max-width: 10%"
            >
              {{ mail.totalEmailCount > 1 ? mail.totalEmailCount : "" }}
            </div>
          </div>
        </div>
        <div class="col-7 d-flex align-items-center">
          <div
            class="subject-snippet d-flex align-items-center"
            style="
              white-space: nowrap;
              overflow: hidden !important;
              text-overflow: ellipsis;
            "
          >
            <div class="hw-tags-list mr-2">
              <span
                v-for="tag in mail.tags"
                :key="tag.id"
                style="
                  color: white;
                  margin-left: 0.125rem;
                  margin-right: 0.125rem;
                "
                :style="{ backgroundColor: tag.color }"
                class="badge hw-tag badge-pill hw-tag-204484"
                :data-tag_id="tag.id"
                data-mailbox_id="204420"
                >{{ tag.name }}</span
              >
            </div>
            <div class="d-flex align-items-center">
              <span
                class="tx-14 hw-thread-subject mr-2"
                :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
              >
                {{ mail.email.subject }}
              </span>
              <span
                v-if="mail.snippetType == 'note'"
                class="tx-16 tx-color-03 px-2 tx-bold snippetMarker"
                style="color: #ddcf97"
                >|</span
              >
              <span class="tx-14 tx-color-03">
                {{ mail.email.snippet }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-1 d-none d-lg-flex">
          <div class="row">
            <div class="col-6 user-avatar">
              <div
               v-if="mail.assignedTo !== null"
                class="avatar avatar-xs mr-1"
                data-toggle="tooltip"
                :title="mail.assignedTo.firstname"
                v-html="mail.assignedTo.avatarTag"
              ></div>
            </div>
            <div v-if="this.$route.params.type == 'sent' || mail.seenAt" class="col-6">
              <div data-toggle="tooltip" :title="'Seen '+seenAt" style="color:#8392a5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye mr-2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2 date-thread-options col-lg-1">
          <span
            class="tx-13 thread-date"
            :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >{{ mail.email.humanFriendlyDate }}</span
          >
          <span
            class="
              thread-options
              d-flex
              justify-content-center
              align-items-center
            "
          >
            <span v-if="this.$route.params.type !== 'sent' && this.$route.params.type !== 'closed' && this.$route.params.type !== 'spam' && this.$route.params.type !== 'trash'" class="read-unread-thread pl-1 pr-1 pt-1" @click.stop="changeRead(mail.id)">
              <i
                v-if="!this.mail.isRead"
                class="far fa-envelope-open"
                data-toggle="tooltip"
                data-placement="top"
                title="Read"
                style="font-size: 16px"
              ></i>
              <i
                v-if="this.mail.isRead"
                class="far fa-envelope"
                data-toggle="tooltip"
                data-placement="top"
                title="Unread"
                style="font-size: 16px"
              ></i> </span
            ><span v-if="this.$route.params.type !== 'closed' && this.$route.params.type !== 'trash'" class="archive-thread pr-1 pl-1" @click.stop="closeThread(mail.id)">
              <svg
                data-toggle="tooltip"
                data-placement="top"
                title="Close"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-check"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg> </span
            >
            <span @click.stop="showSnooze"
              class="snooze-thread pr-1 pl-1 dropright"
              :class="show && 'show'"
              data-toggle="tooltip"
              data-placement="top"
              title="Snooze"
              data-original-title="Snooze"
            >
              <svg
                :id="'snooze-icon-'+mail.id"
                type="button"
                class="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                :aria-expanded="show ? 'true' : 'false'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div
                class="dropdown-menu snooze-options"
                 :style="{ display: show ? 'block' : 'none', transform: show && 'translate3d(-217px, 31px, 0px)' }"
                :aria-labelledby="'snooze-icon-'+mail.id"
                :id="'append-snooze-'+mail.id"
                style="
                  position: absolute;
                  transform: translate3d(111px, 0px, 0px);
                  top: 0px;
                  left: 0px;
                  will-change: transform;
                  z-index: 9999;
                  display: block
                "
              >
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time snooze-today-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                    @click.stop="snoozeThread('later today', mail.id)"
                  >
                    <span>Later today</span>
                    <span class="snooze-later-today">In 3 hour</span>
                  </div>
                </button>
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time snooze-tomorrow-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                    @click.stop="snoozeThread('tommorrow', mail.id)"
                  >
                    <span>Tomorrow</span>
                    <span class="snooze-tomorrow">{{ new Date() | moment("add", "1 day", "ddd") }} 9 am</span>
                  </div>
                </button>
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time snooze-monday-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                    @click.stop="snoozeThread('nextMon', mail.id)"
                  >
                    <span>Next Monday</span>
                    <span class="snooze-monday">9 am</span>
                  </div>
                </button>
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time snooze-week-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                    @click.stop="snoozeThread('oneWeek', mail.id)"
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
                    snooze-drop-down snooze-time snooze-month-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                    @click.stop="snoozeThread('oneMonth', mail.id)"
                  >
                    <span>One month</span>
                    <span class="snooze-month">{{
                      new Date() | moment("add", "1 month", "DD MMM")
                    }}</span>
                  </div>
                </button>

                <div
                v-b-modal.snooze-thread-modal
                  class="dropdown-item snooze-drop-down show-snooze-modal"
                  :id="'snooze-modal-thread-'+mail.id"
                >
                  <span>Pick date &amp; time</span>
                </div>
                <b-modal
            id="snooze-thread-modal"
            size="md"
            title="Pick Date & Time"
            hide-footer="true"
          >
            <div class="modal-body">
              <div
                class="dropdown-menu datepicker-menu show"
                style="display: contents"
                aria-labelledby="dropdownMenuButton"
              >
                <div
                  class="
                    d-flex
                    align-item-center
                    justify-content-center
                    datepicker1
                  "
                >
                  <div class="datepicker datepicker-inline">
                    <div class="datepicker-days" style="">
                      <table class="table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="7"
                              class="datepicker-title"
                              style="display: none"
                            ></th>
                          </tr>
                          <tr>
                            <th class="prev">«</th>
                            <th colspan="5" class="datepicker-switch">
                              September 2021
                            </th>
                            <th class="next">»</th>
                          </tr>
                          <tr>
                            <th class="dow">Su</th>
                            <th class="dow">Mo</th>
                            <th class="dow">Tu</th>
                            <th class="dow">We</th>
                            <th class="dow">Th</th>
                            <th class="dow">Fr</th>
                            <th class="dow">Sa</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              class="old disabled day"
                              data-date="1630195200000"
                            >
                              29
                            </td>
                            <td
                              class="old disabled day"
                              data-date="1630281600000"
                            >
                              30
                            </td>
                            <td
                              class="old disabled day"
                              data-date="1630368000000"
                            >
                              31
                            </td>
                            <td class="disabled day" data-date="1630454400000">
                              1
                            </td>
                            <td class="disabled day" data-date="1630540800000">
                              2
                            </td>
                            <td class="disabled day" data-date="1630627200000">
                              3
                            </td>
                            <td class="disabled day" data-date="1630713600000">
                              4
                            </td>
                          </tr>
                          <tr>
                            <td class="disabled day" data-date="1630800000000">
                              5
                            </td>
                            <td class="disabled day" data-date="1630886400000">
                              6
                            </td>
                            <td class="disabled day" data-date="1630972800000">
                              7
                            </td>
                            <td class="disabled day" data-date="1631059200000">
                              8
                            </td>
                            <td class="disabled day" data-date="1631145600000">
                              9
                            </td>
                            <td class="disabled day" data-date="1631232000000">
                              10
                            </td>
                            <td class="disabled day" data-date="1631318400000">
                              11
                            </td>
                          </tr>
                          <tr>
                            <td class="disabled day" data-date="1631404800000">
                              12
                            </td>
                            <td class="disabled day" data-date="1631491200000">
                              13
                            </td>
                            <td class="disabled day" data-date="1631577600000">
                              14
                            </td>
                            <td class="disabled day" data-date="1631664000000">
                              15
                            </td>
                            <td class="disabled day" data-date="1631750400000">
                              16
                            </td>
                            <td class="disabled day" data-date="1631836800000">
                              17
                            </td>
                            <td class="disabled day" data-date="1631923200000">
                              18
                            </td>
                          </tr>
                          <tr>
                            <td class="disabled day" data-date="1632009600000">
                              19
                            </td>
                            <td class="disabled day" data-date="1632096000000">
                              20
                            </td>
                            <td class="disabled day" data-date="1632182400000">
                              21
                            </td>
                            <td class="disabled day" data-date="1632268800000">
                              22
                            </td>
                            <td class="disabled day" data-date="1632355200000">
                              23
                            </td>
                            <td class="disabled day" data-date="1632441600000">
                              24
                            </td>
                            <td class="disabled day" data-date="1632528000000">
                              25
                            </td>
                          </tr>
                          <tr>
                            <td class="disabled day" data-date="1632614400000">
                              26
                            </td>
                            <td class="day" data-date="1632700800000">27</td>
                            <td class="day" data-date="1632787200000">28</td>
                            <td class="day" data-date="1632873600000">29</td>
                            <td class="day" data-date="1632960000000">30</td>
                            <td class="new day" data-date="1633046400000">1</td>
                            <td class="new day" data-date="1633132800000">2</td>
                          </tr>
                          <tr>
                            <td class="new day" data-date="1633219200000">3</td>
                            <td class="new day" data-date="1633305600000">4</td>
                            <td class="new day" data-date="1633392000000">5</td>
                            <td class="new day" data-date="1633478400000">6</td>
                            <td class="new day" data-date="1633564800000">7</td>
                            <td class="new day" data-date="1633651200000">8</td>
                            <td class="new day" data-date="1633737600000">9</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="7" class="today" style="display: none">
                              Today
                            </th>
                          </tr>
                          <tr>
                            <th colspan="7" class="clear" style="display: none">
                              Clear
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div class="datepicker-months" style="display: none">
                      <table class="table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="7"
                              class="datepicker-title"
                              style="display: none"
                            ></th>
                          </tr>
                          <tr>
                            <th class="prev">«</th>
                            <th colspan="5" class="datepicker-switch">2021</th>
                            <th class="next">»</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan="7">
                              <span class="month disabled">Jan</span
                              ><span class="month disabled">Feb</span
                              ><span class="month disabled">Mar</span
                              ><span class="month disabled">Apr</span
                              ><span class="month disabled">May</span
                              ><span class="month disabled">Jun</span
                              ><span class="month disabled">Jul</span
                              ><span class="month disabled">Aug</span
                              ><span class="month focused">Sep</span
                              ><span class="month">Oct</span
                              ><span class="month">Nov</span
                              ><span class="month">Dec</span>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="7" class="today" style="display: none">
                              Today
                            </th>
                          </tr>
                          <tr>
                            <th colspan="7" class="clear" style="display: none">
                              Clear
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div class="datepicker-years" style="display: none">
                      <table class="table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="7"
                              class="datepicker-title"
                              style="display: none"
                            ></th>
                          </tr>
                          <tr>
                            <th class="prev">«</th>
                            <th colspan="5" class="datepicker-switch">
                              2020-2029
                            </th>
                            <th class="next">»</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan="7">
                              <span class="year old disabled">2019</span
                              ><span class="year disabled">2020</span
                              ><span class="year focused">2021</span
                              ><span class="year">2022</span
                              ><span class="year">2023</span
                              ><span class="year">2024</span
                              ><span class="year">2025</span
                              ><span class="year">2026</span
                              ><span class="year">2027</span
                              ><span class="year">2028</span
                              ><span class="year">2029</span
                              ><span class="year new">2030</span>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="7" class="today" style="display: none">
                              Today
                            </th>
                          </tr>
                          <tr>
                            <th colspan="7" class="clear" style="display: none">
                              Clear
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div class="datepicker-decades" style="display: none">
                      <table class="table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="7"
                              class="datepicker-title"
                              style="display: none"
                            ></th>
                          </tr>
                          <tr>
                            <th class="prev">«</th>
                            <th colspan="5" class="datepicker-switch">
                              2000-2090
                            </th>
                            <th class="next">»</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan="7">
                              <span class="decade old disabled">1990</span
                              ><span class="decade disabled">2000</span
                              ><span class="decade disabled">2010</span
                              ><span class="decade disabled focused">2020</span
                              ><span class="decade">2030</span
                              ><span class="decade">2040</span
                              ><span class="decade">2050</span
                              ><span class="decade">2060</span
                              ><span class="decade">2070</span
                              ><span class="decade">2080</span
                              ><span class="decade">2090</span
                              ><span class="decade new">2100</span>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="7" class="today" style="display: none">
                              Today
                            </th>
                          </tr>
                          <tr>
                            <th colspan="7" class="clear" style="display: none">
                              Clear
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div class="datepicker-centuries" style="display: none">
                      <table class="table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="7"
                              class="datepicker-title"
                              style="display: none"
                            ></th>
                          </tr>
                          <tr>
                            <th class="prev">«</th>
                            <th colspan="5" class="datepicker-switch">
                              2000-2900
                            </th>
                            <th class="next">»</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan="7">
                              <span class="century old disabled">1900</span
                              ><span class="century disabled focused">2000</span
                              ><span class="century">2100</span
                              ><span class="century">2200</span
                              ><span class="century">2300</span
                              ><span class="century">2400</span
                              ><span class="century">2500</span
                              ><span class="century">2600</span
                              ><span class="century">2700</span
                              ><span class="century">2800</span
                              ><span class="century">2900</span
                              ><span class="century new">3000</span>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="7" class="today" style="display: none">
                              Today
                            </th>
                          </tr>
                          <tr>
                            <th colspan="7" class="clear" style="display: none">
                              Clear
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
                <select class="custom-select select-time"></select>
                <div
                  class="d-flex align-items-center justify-content-center"
                  style="margin-top: 10px"
                >
                  <button
                    type="button"
                    class="btn btn-xs btn-primary select-snooze-btn"
                    disabled="true"
                  >
                    Snooze
                  </button>
                </div>
              </div>
            </div>
          </b-modal>
              </div>
            </span>
            <span v-if="this.$route.params.type == 'closed' || this.$route.params.type == 'spam' || this.$route.params.type == 'trash'" class="restore-thread pr-1 pl-1" @click.stop="restoreThread(mail.id)">
              <svg data-toggle="tooltip" data-placement="top" title="Move To Inbox" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-original-title="Move to Inbox">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z">
              </path></svg>
            </span>
          </span>
        </div>
      </div>
      <div class="row" style="padding-left: 20px">
        <div class="offset-lg-3 col-7 thread-attachments-list"></div>
      </div>
    </div>
    <div class="hw_compactThread w-100" style="color: #001737;">
      <div class="hw-tags-list mr-2">
        <span
                v-for="tag in mail.tags"
                :key="tag.id"
                style="
                  color: white;
                  margin-left: 0.125rem;
                  margin-right: 0.125rem;
                "
                :style="{ backgroundColor: tag.color }"
                class="badge hw-tag badge-pill hw-tag-204484"
                :data-tag_id="tag.id"
                data-mailbox_id="204420"
                >{{ tag.name }}</span
              >
      </div>
      <div
        class="d-flex align-items-center justify-content-between mg-b-2 w-100"
      >
        <span
          class="
            tx-12
            hw-thread-address
            d-flex
            justify-content-start
            align-items-center
            w-50
          "
          ><div class="flex-grow-1 w-100 d-flex thread-addr">
            <div
              v-if="mail.email.from == undefined"
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              (unknown sender)
            </div>
            <div
              v-else-if="this.$route.params.type == 'sent'"
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              To: {{ Object.values(mail.email.to).toString() }}
            </div>
            <div
              v-else
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              {{ Object.values(mail.email.from).toString() }}
            </div>
            <div
              class="text-primary ml-1"
              v-if="mail.hasDraft"
              style="max-width: 25%"
            >
              Draft
            </div>
            <div
              class="text-secondary ml-1 total-email-count"
              style="max-width: 10%"
            >
              {{ mail.totalEmailCount > 1 ? mail.totalEmailCount : "" }}
            </div>
          </div></span
        >
        <span class="tx-11 thread-date" :style="{ fontWeight: this.mail.isRead ? '' : '600' }">{{
          mail.email.humanFriendlyDate
        }}</span>
      </div>
      <div
        class="tx-13 hw-thread-subject"
        style="
          width: 90%;
          white-space: nowrap;
          overflow: hidden !important;
          text-overflow: ellipsis;
        "
        :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
      >
        {{ mail.email.subject }}
      </div>
      <div
        class="d-flex align-items-center justify-content-between mg-b-2 w-100"
      >
        <p
          class="tx-12 tx-color-03 mg-b-0"
          style="
            width: 90%;
            white-space: nowrap;
            overflow: hidden !important;
            text-overflow: ellipsis;
          "
        >
          <span
            v-if="mail.snippetType == 'note'"
            style="color: #ddcf97"
            class="tx-bold tx-14 px-2 snippetMarker"
            >|</span
          >
          {{ mail.email.snippet }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../../main";
export default {
  name: "MailGroupSingleMail",
  props: {
    mail: Object,
  },
  data() {
    return {
      checkAll: false,
      // isRead: this.mail.isRead,
      // isStarred: this.mail.isStarred,
      show: false
    };
  },
  created() {
    bus.$on("check", (id, check) => {
      if(check == true && (id == 1 || id == this.mail.id)) {
        // console.log(data);
        this.checkAll = true;
      } else if(check == false && (id == 1 || id == this.mail.id)) {
        // console.log(data);
        this.checkAll = false
      }
    });
    // bus.$on("changeStarred", (id) => {
    //   if(this.mail.id == id) {
    //     this.changeStarred(id);
    //   }
    // });
    // bus.$on("read", (data) => {
    //   // console.log(data);
    //   if(this.mail.id == data) {
    //     if(!this.isRead) {
    //       let threadIDs = new Array();
    //       threadIDs[0] = data;
    //       const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ mailboxID: this.$route.params.mailboxId, threadIDs }),
    //         credentials: 'include'
    //       };
    //       fetch(this.$apiBaseURL + "read-thread.php", requestOptions)
    //       .then(response => response.json())
    //       .then(data => (console.log(data)));
    //       this.isRead = !this.isRead
    //     }
    //   }
    // });
    // bus.$on("unread", (data) => {
    //   console.log(data);
    //   if(this.mail.id == data) {
    //     if(this.isRead) {
    //       let threadIDs = new Array();
    //       threadIDs[0] = data;
    //       const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ mailboxID: this.$route.params.mailboxId, threadIDs }),
    //         credentials: 'include'
    //       };
    //       fetch(this.$apiBaseURL + "unread-thread.php", requestOptions)
    //       .then(response => response.json())
    //       .then(data => (console.log(data)));
    //       this.isRead = !this.isRead
    //     }
    //   }
    // });
  },
  computed: {
    seenAt() {
      console.log(this.mail.seenAt);
      return moment(this.mail.seenAt).fromNow();
    }
  },
  methods: {
    checkBox() {
      this.checkAll = !this.checkAll;
      if(this.checkAll == true) {
        bus.$emit('check', this.mail.id, true);
      } else {
        bus.$emit('check', this.mail.id, false);
      }
    },
    showSnooze() {
      this.show = !this.show;
    },
    snoozeThread(till, id) {
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
      }
      console.log(mom.toISOString());
      bus.$emit("snoozeThread", id, mom);
      // bus.$emit("broad");
    },
    changeRead(id) {
      bus.$emit("changeRead", id);
    },
    changeStarred(id) {
      bus.$emit("changeStarred", id);
    },
    closeThread(id) {
      bus.$emit('closeThread', id);
    },
    restoreThread(id) {
      bus.$emit('restoreThreads', id);
    }
  }
};
</script>

<style>
</style>