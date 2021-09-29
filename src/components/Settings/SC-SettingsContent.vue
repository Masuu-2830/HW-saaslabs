<template>
  <div id="mailbox-settings-content" class="col-9 h-100" style="padding-top: 1%; padding-right: 0px; overflow-y: scroll; padding-bottom: 20px;">
                    <div id="success-alert" class="alert alert-success d-flex justify-content-between fade show" role="alert" style="width:90%;display:none !important;">
                        <span id="success-alert-message"></span>
                        <button type="button" class="close" aria-label="Close" onclick="$('#success-alert').removeClass('d-none').addClass('d-flex'); $('#success-alert-message').text('');">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div id="danger-alert" class="alert alert-danger d-flex justify-content-between fade show" role="alert" style="width:90%;display:none !important;">
                        <span id="danger-alert-message"></span>
                        <button type="button" class="close" aria-label="Close" onclick="$('#danger-alert').removeClass('d-none').addClass('d-flex');$('#danger-alert-message').text('');">
                            <span aria-hidden="true ">×</span>
                        </button>
                    </div>
                    <div class="tab-content" id="v-pills-tabContent">
                        <ul id="generalSettingsTab" class="list-group" style="width:90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;"><strong>General
                                    Settings</strong>
                            </li>
                            <li class="list-group-item">
                                <form>
                                    <div class="form-group">
                                        <label id="maibox-name-label" class="d-block">Inbox
                                            Name</label>
                                        <input id="mailbox-name" type="text" class="form-control">
                                        <div id="mailbox-name-valid"></div>
                                    </div>
                                    <div class="form-group">
                                        <label id="mailbox-email-label" class="d-block">Email Address</label>
                                        <input id="mailbox-email" type="text" class="form-control" readonly="readonly">
                                    </div>

                                    <div class="form-group d-none" id="incomingAPI">
                                        <label id="mailbox-internal-email-label" class="d-block">Incoming API</label>
                                        <input id="mailbox-incoming-api" type="text" class="form-control" readonly="">
                                    </div>

                                    <div class="form-group d-none" id="widget_form_group">
                                        <label id="widget-domain-label" class="d-block">
                                            <div class="d-flex align-items-center">
                                                <span>Domain</span>
                                                <span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="Specify the domain on which you want to use Live Chat Widget" data-original-title="" title="">
                                                    <i class="far fa-question-circle"></i>
                                                </span>
                                            </div>
                                        </label>
                                        <input id="widget-domain" type="text" class="form-control">
                                        <div class="domain-invalid-feedback"></div>
                                    </div>

                                    <div class="form-group" id="autoBccWrapper">
                                        <label id="mailbox-auto-bcc-label" class="d-block">
                                            <div class="d-flex align-items-center">
                                                <span>Auto Bcc</span>
                                                <span style="margin-left: 5px;cursor: pointer;" data-container="body" data-toggle="popover" data-placement="top" data-content="We will include this email address in every email you send from this Inbox." data-original-title="" title="">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                                    </svg>
                                                </span>
                                            </div>
                                        </label>
                                        <input id="mailbox-auto-bcc" type="text" class="form-control">
                                        <div class="invalid-feedback">Please enter a valid email addresses seperated by
                                            comma</div>
                                    </div>
                                </form>
                            </li>
                            <li class="list-group-item" id="saving-progress">
                                <button id="save-mailbox-btn" class="btn btn-sm btn-primary">Save</button>

                            </li>
                        </ul>

                        <ul id="livechatSettingsTab" class="list-group d-none mg-t-30" style="width:90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;"><strong>Live Chat Widget
                                    Customizations</strong>
                            </li>
                            <li class="list-group-item">

                                <div class="custom-control custom-switch mg-y-20">
                                    <input type="checkbox" class="custom-control-input" id="isLeadFormMandatory">
                                    <label class="custom-control-label" for="isLeadFormMandatory">Ask for details before
                                        starting new conversation from a lead</label>
                                </div>

                                <div class="custom-control custom-switch mg-b-20 mg-t-10">
                                    <input type="checkbox" class="custom-control-input" id="backgroundGradient">
                                    <label class="custom-control-label" for="backgroundGradient"> Enable
                                        Gradient</label>
                                </div>

                                <div class="d-flex flex-column mg-b-10">
                                    <label> Background Color </label>
                                    <div class="d-flex align-items-center">
                                        <div id="color-picker-3"></div>
                                        <label for="color-picker-3" id="color-pick-value" style="padding-left: 15px; margin-bottom: 0px;">#0372D2</label>
                                        <div style="width: 100%;margin-left: 20px;height: 35px; linear-gradient(135deg, #0372D2 0%, #00184D 100%); color:white;" id="bg_color_preview" class="d-flex align-items-center justify-content-center">Preview</div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="welcomeText" class="d-block">Welcome Message</label>
                                    <input type="text" class="form-control" placeholder="Hi, How can we help you?" id="welcomeText">
                                </div>

                                <div class="form-group">
                                    <label for="welcomeText" class="d-block mg-l-5">Salutation <span class="tx-color-03" style="cursor:pointer;" tabindex="0" role="button" data-toggle="popover" title="" data-content="You can use as a variable in your message. Currently, is only supported varibales. If the recipient is Lead then value of will be there" data-original-title="Salutation"><i class="far fa-question-circle"></i></span></label>
                                    <input type="text" class="form-control" placeholder="Hi there!" id="homePageGreetings">
                                </div>

                                <div class="form-group">
                                    <label for="homePageText" class="d-block">Help Text</label>
                                    <input type="text" class="form-control" placeholder="Got a question? We're here to help." id="homePageText">
                                </div>

                                <div class="form-group">
                                    <label for="buttonText" class="d-block">Button Text</label>
                                    <input type="text" class="form-control" placeholder="Start a conversation" id="buttonText">
                                </div>

                                <div class="form-group">
                                    <label for="previousConversationBtnText" class="d-block">Previous Conversation
                                        Button Text</label>
                                    <input type="text" class="form-control" placeholder="Start a conversation" id="previousConversationBtnText">
                                </div>

                                <div class="form-group">
                                    <label for="leadCaptureMessage" class="d-block">Ask visitor for Email</label>
                                    <input type="text" class="form-control" placeholder="Start a conversation" id="leadCaptureMessage">
                                </div>

                                <div class="form-group">
                                    <label for="emailLabel" class="d-block">Heading in Email box</label>
                                    <input type="text" class="form-control" placeholder="Start a conversation" id="emailLabel">
                                </div>

                                <div class="d-flex mg-b-20">
                                    <div class="d-flex flex-column">
                                        <div class="d-flex flex-column justify-content-center align-items-center image-upload bg-gray-200 wd-100 ht-100 rounded-10" style="cursor: pointer;" id="hw_widget_logo">
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload-cloud">
                                                    <polyline points="16 16 12 12 8 16"></polyline>
                                                    <line x1="12" y1="12" x2="12" y2="21"></line>
                                                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                                    <polyline points="16 16 12 12 8 16"></polyline>
                                                </svg>
                                            </label>
                                            <label>Upload a logo.</label>
                                        </div>
                                        <div class="image-upload">
                                            <input id="hw_widget_logo_input" type="file">
                                        </div>
                                        <label id="hw_widget_logo_msg"></label>
                                    </div>
                                    <button class="mg-l-10 pd-0" type="button" style="outline: none; border:none;background:none;" id="hw_widget_remove_logo" data-toggle="tooltip" data-placement="right" title="Remove Logo">
                                        <svg style="color: #8392a5;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash" height="18" width="18">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                            </path>
                                        </svg>
                                    </button>
                                </div>

                                <div class="d-flex align-items-center justify-content-start">
                                    <button class="btn btn-sm btn-primary" type="button" id="chat_widget_settings_save">Save</button>
                                </div>
                            </li>


                            <li class="list-group-item mg-t-30" style="background-color: #eef0f7;"><strong>Select team members to show on Live Chat Widget</strong>
                            </li>

                            <li class="list-group-item">
                                <div class="alert alert-danger w-100 d-none" id="usersListForWidget-error" role="alert">Please select atleast one member</div>
                                <div class="row mg-t-10" id="usersListForWidget">
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-211561" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-211561">Ayush Rastogi</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-204522" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-204522">Claudia Keen</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-204378" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-204378">Curtis Jackson</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-214898" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-214898">Gatti Ramya</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-209729" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-209729">Harit Dagar</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-213850" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-213850">Harry Potter</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-213006" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-213006">Helpwise Outlook</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-205764" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-205764">Hikisox</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-214896" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-214896">Kunal Kumar Singh</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-214897" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-214897">Masood Muhammad</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-208848" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-208848">Mayank Banga</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-204622" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-204622">Nick Farrante</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-204715" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-204715">Prabhat Mishra</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-204773" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-204773">Rishabh Rawat</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-207083" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-207083">test test</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-204820" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-204820">Test User</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-211103" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-211103">Tushar Sankla</label>
                                        </div>
                                    </div>
                               
                                    <div class="col-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input userForWidget" id="widgetUser-204964" checked="checked">
                                            <label class="custom-control-label" for="widgetUser-204964">uyyusa ashjhas</label>
                                        </div>
                                    </div>
                               </div>
                                <div class="mg-t-20">
                                    <button id="saveUsersForWidget" class="btn btn-sm btn-primary">Save</button>
                                </div>
                            </li>



                            <li class="list-group-item mg-t-30" style="background-color: #eef0f7;"><strong>Live Chat
                                    Widget Visibility</strong>
                            </li>
                            <li class="list-group-item">
                                <p> This lets you to control who can see the widget on your website. </p>
                                <ul class="nav nav-line" id="widgetVisibilityTab" role="tablist" style="border-bottom: none;">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="widget-Leads-tab" data-toggle="tab" href="#widgetLeads" role="tab" aria-controls="widgetLeads" aria-selected="true">Leads</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="widget-users-tab" data-toggle="tab" href="#widgetUsers" role="tab" aria-controls="widgetUsers" aria-selected="false">Users</a>
                                    </li>
                                </ul>
                                <div class="tab-content pd-y-20" id="widgetVisibilityContent">
                                    <div class="tab-pane fade show active" id="widgetLeads" role="tabpanel" aria-labelledby="widget-Leads-tab">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="isWidgetEnableForLeads" checked="">
                                            <label class="custom-control-label" for="isWidgetEnableForLeads">Showing
                                                widget to all Leads</label>
                                        </div>
                                        <div class="collapse show mg-t-20" id="widgetLeadsDiv">
                                            <div class="d-flex flex-column">
                                                <div class="d-flex flex-column">
                                                    <div class="custom-control custom-radio mg-r-20 ">
                                                        <input type="radio" id="showToAllLeads" name="showtoLeadsRadio" class="custom-control-input showToRadioLeads" checked="">
                                                        <label class="custom-control-label" for="showToAllLeads">Show to
                                                            all Leads</label>
                                                    </div>

                                                    <div class="custom-control custom-radio">
                                                        <input type="radio" id="showToCustomLeads" name="showtoLeadsRadio" class="custom-control-input showToRadioLeads">
                                                        <label class="custom-control-label" for="showToCustomLeads">Show
                                                            to Leads with following data</label>
                                                    </div>
                                                </div>
                                                <div class="collapse mg-t-20 pd-20" id="leadsMatchData">
                                                    <div class="d-flex flex-column">
                                                        <div class="d-flex">
                                                            <div class="bd pd-10 match_data selectedOption" id="matchAllLeads">
                                                                <p class="mg-b-0" style="color: currentColor;">Match All
                                                                </p>
                                                                <p class="tx-color-03 mg-b-0">All of the below
                                                                    conditions should satisy</p>
                                                            </div>
                                                            <div class="divider-text divider-vertical" data-text="or">OR
                                                            </div>
                                                            <div class="bd pd-10 match_data" id="matchAnyLeads">
                                                                <p class="mg-b-0" style="color: currentColor;">Match Any
                                                                </p>
                                                                <p class="tx-color-03 mg-b-0">Any of the below
                                                                    conditions should satisy</p>
                                                            </div>
                                                        </div>
                                                        <div class="mg-t-20">
                                                            <button class="btn btn-link" type="button" id="addDataInLeads">+ Add Data</button>
                                                        </div>
                                                        <div class="collapse mg-t-20" id="addDataInLeadsCollapse">
                                                            <div class="d-flex flex-column bd pd-x-10 pd-y-15 rounded-5">
                                                                <div class="d-flex flex-column" id="matchLeadsData">
                                                                    <div class="row w-100 d-flex align-items-center">
                                                                        <div class="col-3 w-100">
                                                                            <label class="mg-b-0">Current Page
                                                                                URL</label>
                                                                        </div>
                                                                        <div class="col-3 w-100">
                                                                            <div class="dropdown w-100">
                                                                                <button class="btn dropdown-toggle bd w-100 d-flex justify-content-between align-items-center" type="button" id="subFilterBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-id="is">
                                                                                    is
                                                                                </button>
                                                                                <div class="dropdown-menu w-100" aria-labelledby="subFilterBtn" id="subFilterContent">
                                                                                    <p class="subFilterValues dropdown-item active" id="is">is</p>
                                                                                    <p class="subFilterValues dropdown-item" id="isNot">is not</p>
                                                                                    <p class="subFilterValues dropdown-item" id="contains">contains</p>
                                                                                    <p class="subFilterValues dropdown-item" id="doesNotContain">does not
                                                                                        contain</p>
                                                                                    <p class="subFilterValues dropdown-item" id="startsWith">starts with</p>
                                                                                    <p class="subFilterValues dropdown-item" id="endsWith">ends with</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-6 w-100">
                                                                            <div class="d-flex flex-column w-100">
                                                                                <input type="text" class="form-control" id="addValueInLeadsData" placeholder="Enter Value">
                                                                                <div class="invalid-feedback" id="addValueInLeadsData-error">
                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                    <div class="row w-100 d-flex justify-content-end mg-t-20">
                                                                        <button class="btn btn-primary d-none" type="button" id="updateDataInLeads">Update</button>
                                                                        <button class="btn btn-primary" type="button" id="saveDataInLeads">Save</button>
                                                                        <button class="btn mg-l-20 btn-outline-light" type="button" id="cancelAddDataInLeads">Cancel</button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-column mg-t-20" id="dataForLeads">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="widgetUsers" role="tabpanel" aria-labelledby="widget-users-tab">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="isWidgetEnableForUsers" checked="">
                                            <label class="custom-control-label" for="isWidgetEnableForUsers">Showing
                                                widget to all Users</label>
                                        </div>

                                        <div class="mg-t-20 collapse show" id="widgetUsersDiv">
                                            <div class="d-flex flex-column">
                                                <div class="d-flex flex-column">
                                                    <div class="custom-control custom-radio mg-r-20 ">
                                                        <input type="radio" id="showToAllUsers" name="showtoUsersRadio" class="custom-control-input showToRadioUsers" checked="">
                                                        <label class="custom-control-label" for="showToAllUsers">Show to
                                                            all Users</label>
                                                    </div>

                                                    <div class="custom-control custom-radio">
                                                        <input type="radio" id="showToCustomUsers" name="showtoUsersRadio" class="custom-control-input showToRadioUsers">
                                                        <label class="custom-control-label" for="showToCustomUsers">Show
                                                            to Users with following data</label>
                                                    </div>
                                                </div>
                                                <div class="collapse mg-t-20 pd-20" id="usersMatchData">
                                                    <div class="d-flex flex-column">
                                                        <div class="d-flex">
                                                            <div class="bd pd-10 match_data selectedOption" id="matchAllUsers">
                                                                <p class="mg-b-0" style="color: currentColor;">Match All
                                                                </p>
                                                                <p class="tx-color-03 mg-b-0">All of the below
                                                                    conditions should satisy</p>
                                                            </div>
                                                            <div class="divider-text divider-vertical" data-text="or">OR
                                                            </div>
                                                            <div class="bd pd-10 match_data" id="matchAnyUsers">
                                                                <p class="mg-b-0" style="color: currentColor;">Match Any
                                                                </p>
                                                                <p class="tx-color-03 mg-b-0">Any of the below
                                                                    conditions should satisy</p>
                                                            </div>
                                                        </div>
                                                        <div class="mg-t-20">
                                                            <button class="btn btn-link" type="button" id="addDataInUsers">+ Add Data</button>
                                                        </div>
                                                        <div class="collapse mg-t-20" id="addDataInUsersCollapse">
                                                            <div class="d-flex flex-column bd pd-x-10 pd-y-15 rounded-5">
                                                                <div class="d-flex flex-column" id="matchUsersData">
                                                                    <div class="row w-100 d-flex align-items-center">
                                                                        <div class="col-3 w-100">
                                                                            <label class="mg-b-0">Current Page
                                                                                URL</label>
                                                                        </div>
                                                                        <div class="col-3 w-100">
                                                                            <div class="dropdown w-100">
                                                                                <button class="btn dropdown-toggle bd w-100 d-flex justify-content-between align-items-center" type="button" id="subFilterBtnUsers" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-id="is">
                                                                                    is
                                                                                </button>
                                                                                <div class="dropdown-menu w-100" aria-labelledby="subFilterBtnUsers" id="subFilterContentUsers">
                                                                                    <p class="subFilterValuesUsers dropdown-item active" id="is">is</p>
                                                                                    <p class="subFilterValuesUsers dropdown-item" id="isNot">is not</p>
                                                                                    <p class="subFilterValuesUsers dropdown-item" id="contains">contains</p>
                                                                                    <p class="subFilterValuesUsers dropdown-item" id="doesNotContain">does not
                                                                                        contain</p>
                                                                                    <p class="subFilterValuesUsers dropdown-item" id="startsWith">starts with</p>
                                                                                    <p class="subFilterValuesUsers dropdown-item" id="endsWith">ends with</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-6 w-100">
                                                                            <div class="d-flex flex-column w-100">
                                                                                <input type="text" class="form-control" id="addValueInUsersData" placeholder="Enter Value">
                                                                                <div class="invalid-feedback" id="addValueInUsersData-error">
                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                    <div class="row w-100 d-flex justify-content-end mg-t-20">
                                                                        <button class="btn btn-primary d-none" type="button" id="updateDataInUsers">Update</button>
                                                                        <button class="btn btn-primary" type="button" id="saveDataInUsers">Save</button>
                                                                        <button class="btn mg-l-20 btn-outline-light" type="button" id="cancelAddDataInUsers">Cancel</button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-column mg-t-20" id="dataForUsers">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item" id="saveWidgetVisibiltySettings">
                                <button id="saveWidgetVisibiltyBtn" class="btn btn-sm btn-primary">Save</button>
                            </li>
                            <!-- </li> -->


                            <li class="list-group-item mg-t-30" style="background-color: #eef0f7;"><strong>Perform action on your chat widget on the basis of working hours</strong>
                            </li>
                            <li class="list-group-item">

                                <p>Set your office working hours and then perform action on chat widget on the basis of it.</p>


                                <div class="d-flex flex-column">

                                    <div id="widgetOfficeWorkingHours">
                                        <div class="d-flex flex-column">
                                            <div class="d-flex flex-column">
                                                <label class="tx-color-03">Select Working Hours</label>
                                                <div class="d-flex flex-column pd-x-10">
                                                    <div class="custom-control custom-radio mg-y-5">
                                                        <input type="radio" id="alwaysOpen" name="officeWorkingHours" class="custom-control-input officeWorkingHours" checked="">
                                                        <label class="custom-control-label" for="alwaysOpen">Always
                                                            Open</label>
                                                    </div>
                                                    <div class="custom-control custom-radio mg-y-5">
                                                        <input type="radio" id="alwaysClosed" name="officeWorkingHours" class="custom-control-input officeWorkingHours">
                                                        <label class="custom-control-label" for="alwaysClosed">Always
                                                            Closed</label>
                                                    </div>
                                                    <div class="custom-control custom-radio mg-t-5">
                                                        <input type="radio" id="customTime" name="officeWorkingHours" class="custom-control-input officeWorkingHours">
                                                        <label class="custom-control-label" for="customTime">Custom</label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="collapse mg-y-20" id="showCustomWorkingHours">

                                                <div class="row">
                                                    <div class="d-flex flex-column offset-1 col-10 w-100">
                                                        <label class="d-block">
                                                            <div class="d-flex align-items-center">
                                                                <span class="tx-color-03">Select Timezone</span>
                                                                <span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="Specify the timezone for your company" data-original-title="" title="">
                                                                    <i class="far fa-question-circle"></i>
                                                                </span>
                                                            </div>
                                                        </label>
                                                        <div class="form-group">
                                                            <select id="setOfficeTimezone" data-select2-id="setOfficeTimezone" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true"><option id="tz2-Pacific/Midway" value="204377" data-select2-id="tz2-Pacific/Midway">(GMT-11:00) Midway Island - Samoa</option><option id="tz2-America/Adak" value="204378">(GMT-10:00) Hawaii-Aleutian</option><option id="tz2-Etc/GMT+10" value="204379">(GMT-10:00) Hawaii</option><option id="tz2-Pacific/Marquesas" value="204380">(GMT-09:30) Marquesas Islands</option><option id="tz2-Pacific/Gambier" value="204381">(GMT-09:00) Gambier Islands</option><option id="tz2-America/Anchorage" value="204382">(GMT-09:00) Alaska</option><option id="tz2-America/Ensenada" value="204383">(GMT-08:00) Tijuana - Baja California</option><option id="tz2-Etc/GMT+8" value="204384">(GMT-08:00) Pitcairn Islands</option><option id="tz2-America/Los_Angeles" value="204385">(GMT-08:00) Pacific Time (US &amp; Canada)</option><option id="tz2-America/Denver" value="204386">(GMT-07:00) Mountain Time (US &amp; Canada)</option><option id="tz2-America/Chihuahua" value="204387">(GMT-07:00) Chihuahua - La Paz - Mazatlan</option><option id="tz2-America/Dawson_Creek" value="204388">(GMT-07:00) Arizona</option><option id="tz2-America/Belize" value="204389">(GMT-06:00) Saskatchewan - Central America</option><option id="tz2-America/Cancun" value="204390">(GMT-06:00) Guadalajara - Mexico City - Monterrey</option><option id="tz2-Chile/EasterIsland" value="204391">(GMT-06:00) Easter Island</option><option id="tz2-America/Chicago" value="204392">(GMT-06:00) Central Time (US &amp; Canada)</option><option id="tz2-America/New_York" value="204393">(GMT-05:00) Eastern Time (US &amp; Canada)</option><option id="tz2-America/Havana" value="204394">(GMT-05:00) Cuba</option><option id="tz2-America/Bogota" value="204395">(GMT-05:00) Bogota - Lima - Quito - Rio Branco</option><option id="tz2-America/Caracas" value="204396">(GMT-04:30) Caracas</option><option id="tz2-America/Santiago" value="204397">(GMT-04:00) Santiago</option><option id="tz2-America/La_Paz" value="204398">(GMT-04:00) La Paz</option><option id="tz2-Atlantic/Stanley" value="204399">(GMT-04:00) Faukland Islands</option><option id="tz2-America/Campo_Grande" value="204400">(GMT-04:00) Brazil</option><option id="tz2-America/Goose_Bay" value="204401">(GMT-04:00) Atlantic Time (Goose Bay)</option><option id="tz2-America/Glace_Bay" value="204402">(GMT-04:00) Atlantic Time (Canada)</option><option id="tz2-America/St_Johns" value="204403">(GMT-03:30) Newfoundland</option><option id="tz2-America/Araguaina" value="204404">(GMT-03:00) UTC-3</option><option id="tz2-America/Montevideo" value="204405">(GMT-03:00) Montevideo</option><option id="tz2-America/Miquelon" value="204406">(GMT-03:00) Miquelon - St. Pierre</option><option id="tz2-America/Godthab" value="204407">(GMT-03:00) Greenland</option><option id="tz2-America/Argentina/Buenos_Aires" value="204408">(GMT-03:00) Buenos Aires</option><option id="tz2-America/Sao_Paulo" value="204409">(GMT-03:00) Brasilia</option><option id="tz2-America/Noronha" value="204410">(GMT-02:00) Mid-Atlantic</option><option id="tz2-Atlantic/Cape_Verde" value="204411">(GMT-01:00) Cape Verde Is.</option><option id="tz2-Atlantic/Azores" value="204412">(GMT-01:00) Azores</option><option id="tz2-Europe/Belfast" value="204413">(GMT) Greenwich Mean Time : Belfast</option><option id="tz2-Europe/Dublin" value="204414">(GMT) Greenwich Mean Time : Dublin</option><option id="tz2-Europe/Lisbon" value="204415">(GMT) Greenwich Mean Time : Lisbon</option><option id="tz2-Europe/London" value="204416">(GMT) Greenwich Mean Time : London</option><option id="tz2-Africa/Abidjan" value="204417">(GMT) Monrovia - Reykjavik</option><option id="tz2-Europe/Amsterdam" value="204418">(GMT+01:00) Amsterdam - Berlin - Bern - Rome - Stockholm - V</option><option id="tz2-Europe/Belgrade" value="204419">(GMT+01:00) Belgrade - Bratislava - Budapest - Ljubljana - P</option><option id="tz2-Europe/Brussels" value="204420">(GMT+01:00) Brussels - Copenhagen - Madrid - Paris</option><option id="tz2-Africa/Algiers" value="204421">(GMT+01:00) West Central Africa</option><option id="tz2-Africa/Windhoek" value="204422">(GMT+01:00) Windhoek</option><option id="tz2-Asia/Beirut" value="204423">(GMT+02:00) Beirut</option><option id="tz2-Africa/Cairo" value="204424">(GMT+02:00) Cairo</option><option id="tz2-Asia/Gaza" value="204425">(GMT+02:00) Gaza</option><option id="tz2-Africa/Blantyre" value="204426">(GMT+02:00) Harare - Pretoria</option><option id="tz2-Asia/Jerusalem" value="204427">(GMT+02:00) Jerusalem</option><option id="tz2-Europe/Minsk" value="204428">(GMT+02:00) Minsk</option><option id="tz2-Asia/Damascus" value="204429">(GMT+02:00) Syria</option><option id="tz2-Europe/Moscow" value="204430">(GMT+03:00) Moscow - St. Petersburg - Volgograd</option><option id="tz2-Africa/Addis_Ababa" value="204431">(GMT+03:00) Nairobi</option><option id="tz2-Asia/Tehran" value="204432">(GMT+03:30) Tehran</option><option id="tz2-Asia/Dubai" value="204433">(GMT+04:00) Abu Dhabi - Muscat</option><option id="tz2-Asia/Yerevan" value="204434">(GMT+04:00) Yerevan</option><option id="tz2-Asia/Kabul" value="204435">(GMT+04:30) Kabul</option><option id="tz2-Asia/Yekaterinburg" value="204436">(GMT+05:00) Ekaterinburg</option><option id="tz2-Asia/Tashkent" value="204437">(GMT+05:00) Tashkent</option><option id="tz2-Asia/Kolkata" value="204438">(GMT+05:30) Chennai - Kolkata - Mumbai - New Delhi
</option><option id="tz2-Asia/Katmandu" value="204439">(GMT+05:45) Kathmandu</option><option id="tz2-Asia/Dhaka" value="204440">(GMT+06:00) Astana - Dhaka</option><option id="tz2-Asia/Novosibirsk" value="204441">(GMT+06:00) Novosibirsk</option><option id="tz2-Asia/Rangoon" value="204442">(GMT+06:30) Yangon (Rangoon)</option><option id="tz2-Asia/Bangkok" value="204443">(GMT+07:00) Bangkok - Hanoi - Jakarta</option><option id="tz2-Asia/Krasnoyarsk" value="204444">(GMT+07:00) Krasnoyarsk</option><option id="tz2-Asia/Hong_Kong" value="204445">(GMT+08:00) Beijing - Chongqing - Hong Kong - Urumqi</option><option id="tz2-Asia/Irkutsk" value="204446">(GMT+08:00) Irkutsk - Ulaan Bataar</option><option id="tz2-Australia/Perth" value="204447">(GMT+08:00) Perth</option><option id="tz2-Australia/Eucla" value="204448">(GMT+08:45) Eucla</option><option id="tz2-Asia/Tokyo" value="204449">(GMT+09:00) Osaka - Sapporo - Tokyo</option><option id="tz2-Asia/Seoul" value="204450">(GMT+09:00) Seoul</option><option id="tz2-Asia/Yakutsk" value="204451">(GMT+09:00) Yakutsk</option><option id="tz2-Australia/Adelaide" value="204452">(GMT+09:30) Adelaide</option><option id="tz2-Australia/Darwin" value="204453">(GMT+09:30) Darwin</option><option id="tz2-Australia/Brisbane" value="204454">(GMT+10:00) Brisbane</option><option id="tz2-Australia/Hobart" value="204455">(GMT+10:00) Hobart</option><option id="tz2-Asia/Vladivostok" value="204456">(GMT+10:00) Vladivostok</option><option id="tz2-Australia/Lord_Howe" value="204457">(GMT+10:30) Lord Howe Island</option><option id="tz2-Asia/Magadan" value="204459">(GMT+11:00) Magadan</option><option id="tz2-Pacific/Norfolk" value="204460">(GMT+11:30) Norfolk Island</option><option id="tz2-Pacific/Auckland" value="204462">(GMT+12:00) Auckland - Wellington</option><option id="tz2-Europe/Stockholm" value="204463">(GMT+02:00) Stockholm</option><option id="tz2-Europe/Kiev" value="204464">(GMT+03:00) Kiev</option><option id="tz2-Australia/Melbourne" value="204465">(GMT+11:00) Melbourne</option><option id="tz2-Europe/Helsinki" value="204466">(GMT+02:00) Helsinki</option><option id="tz2-UTC" value="204467">UTC</option><option id="tz2-Pacific/Guam" value="204468">(GMT+10:00) Chamorro Standard Time</option></select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1310" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-setOfficeTimezone-container"><span class="select2-selection__rendered" id="select2-setOfficeTimezone-container" role="textbox" aria-readonly="true" title="(GMT-11:00) Midway Island - Samoa">(GMT-11:00) Midway Island - Samoa</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row weekDaysRow mg-t-20">
                                                    <div class="offset-1 col-3 d-flex align-items-center">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input officeDays" id="officeOn-Monday">
                                                            <label class="custom-control-label tx-16 tx-color-01" style="font-weight: 400" for="officeOn-Monday">Monday</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-3">
                                                        <select class="setFromTime-select select2-hidden-accessible" id="officeOn-Monday-setFromTime" data-select2-id="officeOn-Monday-setFromTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="2">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="3">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="5">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="7">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="9">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="11">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="13">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="15">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="17">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="19">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="21">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="23">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="25">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="27">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="29">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="31">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="33">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="35">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="37">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="39">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="41">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="43">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="45">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="47">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="49">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="51">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="53">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="55">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="57">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="59">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="61">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="63">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="65">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="67">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="69">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="71">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="73">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="75">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="77">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="79">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="81">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="83">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="85">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="87">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="89">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="91">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="92" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Monday-setFromTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Monday-setFromTime-container" role="textbox" aria-readonly="true" title="09:00 am">09:00 am</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                                        to</div>

                                                    <div class="col-3">
                                                        <select class="setToTime-select select2-hidden-accessible" id="officeOn-Monday-setToTime" data-select2-id="officeOn-Monday-setToTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="646">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="647">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="649">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="651">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="653">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="655">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="657">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="659">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="661">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="663">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="665">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="667">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="669">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="671">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="673">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="675">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="677">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="679">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="681">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="683">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="685">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="687">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="689">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="691">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="693">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="695">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="697">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="699">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="701">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="703">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="705">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="707">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="709">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="711">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="713">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="715">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="717">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="719">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="721">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="723">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="725">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="727">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="729">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="731">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="733">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="735">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="736" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Monday-setToTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Monday-setToTime-container" role="textbox" aria-readonly="true" title="06:00 pm">06:00 pm</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                </div>

                                                <div class="row weekDaysRow mg-t-20">
                                                    <div class="offset-1 col-3 d-flex align-items-center">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input officeDays" id="officeOn-Tuesday">
                                                            <label class="custom-control-label tx-16 tx-color-01" style="font-weight: 400" for="officeOn-Tuesday">Tuesday</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-3">
                                                        <select class="setFromTime-select select2-hidden-accessible" id="officeOn-Tuesday-setFromTime" data-select2-id="officeOn-Tuesday-setFromTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="94">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="95">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="97">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="99">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="101">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="103">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="105">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="107">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="109">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="111">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="113">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="115">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="117">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="119">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="121">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="123">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="125">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="127">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="129">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="131">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="133">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="135">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="137">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="139">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="141">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="143">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="145">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="147">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="149">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="151">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="153">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="155">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="157">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="159">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="161">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="163">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="165">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="167">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="169">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="171">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="173">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="175">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="177">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="179">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="181">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="183">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="184" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Tuesday-setFromTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Tuesday-setFromTime-container" role="textbox" aria-readonly="true" title="09:00 am">09:00 am</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                                        to</div>

                                                    <div class="col-3">
                                                        <select class="setToTime-select select2-hidden-accessible" id="officeOn-Tuesday-setToTime" data-select2-id="officeOn-Tuesday-setToTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="738">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="739">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="741">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="743">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="745">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="747">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="749">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="751">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="753">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="755">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="757">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="759">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="761">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="763">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="765">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="767">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="769">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="771">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="773">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="775">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="777">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="779">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="781">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="783">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="785">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="787">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="789">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="791">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="793">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="795">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="797">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="799">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="801">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="803">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="805">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="807">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="809">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="811">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="813">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="815">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="817">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="819">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="821">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="823">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="825">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="827">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="828" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Tuesday-setToTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Tuesday-setToTime-container" role="textbox" aria-readonly="true" title="06:00 pm">06:00 pm</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                </div>

                                                <div class="row weekDaysRow mg-t-20">
                                                    <div class="offset-1 col-3 d-flex align-items-center">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input officeDays" id="officeOn-Wednesday">
                                                            <label class="custom-control-label tx-16 tx-color-01" style="font-weight: 400" for="officeOn-Wednesday">Wednesday</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-3">
                                                        <select class="setFromTime-select select2-hidden-accessible" id="officeOn-Wednesday-setFromTime" data-select2-id="officeOn-Wednesday-setFromTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="186">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="187">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="189">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="191">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="193">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="195">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="197">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="199">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="201">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="203">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="205">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="207">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="209">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="211">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="213">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="215">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="217">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="219">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="221">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="223">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="225">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="227">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="229">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="231">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="233">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="235">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="237">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="239">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="241">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="243">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="245">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="247">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="249">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="251">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="253">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="255">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="257">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="259">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="261">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="263">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="265">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="267">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="269">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="271">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="273">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="275">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="276" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Wednesday-setFromTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Wednesday-setFromTime-container" role="textbox" aria-readonly="true" title="09:00 am">09:00 am</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                                        to</div>

                                                    <div class="col-3">
                                                        <select class="setToTime-select select2-hidden-accessible" id="officeOn-Wednesday-setToTime" data-select2-id="officeOn-Wednesday-setToTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="830">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="831">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="833">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="835">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="837">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="839">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="841">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="843">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="845">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="847">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="849">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="851">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="853">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="855">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="857">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="859">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="861">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="863">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="865">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="867">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="869">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="871">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="873">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="875">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="877">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="879">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="881">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="883">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="885">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="887">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="889">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="891">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="893">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="895">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="897">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="899">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="901">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="903">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="905">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="907">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="909">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="911">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="913">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="915">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="917">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="919">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="920" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Wednesday-setToTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Wednesday-setToTime-container" role="textbox" aria-readonly="true" title="06:00 pm">06:00 pm</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                </div>

                                                <div class="row weekDaysRow mg-t-20">
                                                    <div class="offset-1 col-3 d-flex align-items-center">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input officeDays" id="officeOn-Thursday">
                                                            <label class="custom-control-label tx-16 tx-color-01" style="font-weight: 400" for="officeOn-Thursday">Thursday</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-3">
                                                        <select class="setFromTime-select select2-hidden-accessible" id="officeOn-Thursday-setFromTime" data-select2-id="officeOn-Thursday-setFromTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="278">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="279">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="281">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="283">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="285">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="287">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="289">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="291">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="293">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="295">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="297">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="299">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="301">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="303">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="305">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="307">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="309">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="311">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="313">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="315">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="317">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="319">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="321">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="323">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="325">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="327">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="329">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="331">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="333">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="335">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="337">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="339">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="341">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="343">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="345">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="347">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="349">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="351">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="353">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="355">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="357">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="359">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="361">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="363">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="365">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="367">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="368" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Thursday-setFromTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Thursday-setFromTime-container" role="textbox" aria-readonly="true" title="09:00 am">09:00 am</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                                        to</div>

                                                    <div class="col-3">
                                                        <select class="setToTime-select select2-hidden-accessible" id="officeOn-Thursday-setToTime" data-select2-id="officeOn-Thursday-setToTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="922">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="923">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="925">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="927">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="929">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="931">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="933">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="935">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="937">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="939">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="941">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="943">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="945">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="947">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="949">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="951">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="953">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="955">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="957">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="959">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="961">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="963">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="965">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="967">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="969">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="971">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="973">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="975">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="977">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="979">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="981">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="983">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="985">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="987">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="989">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="991">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="993">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="995">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="997">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="999">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="1001">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="1003">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="1005">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="1007">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="1009">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="1011">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1012" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Thursday-setToTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Thursday-setToTime-container" role="textbox" aria-readonly="true" title="06:00 pm">06:00 pm</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                </div>

                                                <div class="row weekDaysRow mg-t-20">
                                                    <div class="offset-1 col-3 d-flex align-items-center">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input officeDays" id="officeOn-Friday">
                                                            <label class="custom-control-label tx-16 tx-color-01" style="font-weight: 400" for="officeOn-Friday">Friday</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-3">
                                                        <select class="setFromTime-select select2-hidden-accessible" id="officeOn-Friday-setFromTime" data-select2-id="officeOn-Friday-setFromTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="370">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="371">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="373">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="375">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="377">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="379">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="381">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="383">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="385">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="387">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="389">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="391">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="393">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="395">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="397">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="399">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="401">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="403">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="405">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="407">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="409">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="411">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="413">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="415">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="417">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="419">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="421">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="423">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="425">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="427">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="429">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="431">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="433">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="435">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="437">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="439">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="441">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="443">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="445">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="447">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="449">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="451">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="453">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="455">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="457">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="459">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="460" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Friday-setFromTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Friday-setFromTime-container" role="textbox" aria-readonly="true" title="09:00 am">09:00 am</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                                        to</div>

                                                    <div class="col-3">
                                                        <select class="setToTime-select select2-hidden-accessible" id="officeOn-Friday-setToTime" data-select2-id="officeOn-Friday-setToTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="1014">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="1015">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="1017">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="1019">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="1021">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="1023">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="1025">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="1027">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="1029">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="1031">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="1033">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="1035">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="1037">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="1039">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="1041">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="1043">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="1045">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="1047">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="1049">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="1051">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="1053">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="1055">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="1057">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="1059">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="1061">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="1063">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="1065">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="1067">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="1069">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="1071">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="1073">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="1075">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="1077">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="1079">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="1081">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="1083">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="1085">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="1087">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="1089">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="1091">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="1093">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="1095">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="1097">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="1099">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="1101">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="1103">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1104" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Friday-setToTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Friday-setToTime-container" role="textbox" aria-readonly="true" title="06:00 pm">06:00 pm</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                </div>

                                                <div class="row weekDaysRow mg-t-20">
                                                    <div class="offset-1 col-3 d-flex align-items-center">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input officeDays" id="officeOn-Saturday">
                                                            <label class="custom-control-label tx-16 tx-color-01" style="font-weight: 400" for="officeOn-Saturday">Saturday</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-3">
                                                        <select class="setFromTime-select select2-hidden-accessible" id="officeOn-Saturday-setFromTime" data-select2-id="officeOn-Saturday-setFromTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="462">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="463">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="465">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="467">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="469">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="471">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="473">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="475">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="477">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="479">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="481">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="483">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="485">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="487">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="489">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="491">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="493">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="495">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="497">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="499">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="501">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="503">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="505">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="507">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="509">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="511">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="513">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="515">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="517">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="519">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="521">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="523">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="525">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="527">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="529">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="531">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="533">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="535">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="537">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="539">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="541">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="543">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="545">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="547">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="549">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="551">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="552" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Saturday-setFromTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Saturday-setFromTime-container" role="textbox" aria-readonly="true" title="09:00 am">09:00 am</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                                        to</div>

                                                    <div class="col-3">
                                                        <select class="setToTime-select select2-hidden-accessible" id="officeOn-Saturday-setToTime" data-select2-id="officeOn-Saturday-setToTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="1106">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="1107">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="1109">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="1111">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="1113">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="1115">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="1117">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="1119">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="1121">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="1123">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="1125">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="1127">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="1129">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="1131">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="1133">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="1135">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="1137">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="1139">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="1141">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="1143">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="1145">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="1147">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="1149">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="1151">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="1153">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="1155">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="1157">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="1159">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="1161">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="1163">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="1165">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="1167">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="1169">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="1171">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="1173">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="1175">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="1177">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="1179">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="1181">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="1183">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="1185">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="1187">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="1189">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="1191">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="1193">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="1195">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1196" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Saturday-setToTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Saturday-setToTime-container" role="textbox" aria-readonly="true" title="06:00 pm">06:00 pm</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                </div>

                                                <div class="row weekDaysRow mg-t-20">
                                                    <div class="offset-1 col-3 d-flex align-items-center">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input officeDays" id="officeOn-Sunday">
                                                            <label class="custom-control-label tx-16 tx-color-01" style="font-weight: 400" for="officeOn-Sunday">Sunday</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-3">
                                                        <select class="setFromTime-select select2-hidden-accessible" id="officeOn-Sunday-setFromTime" data-select2-id="officeOn-Sunday-setFromTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="554">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="555">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="557">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="559">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="561">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="563">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="565">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="567">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="569">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="571">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="573">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="575">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="577">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="579">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="581">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="583">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="585">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="587">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="589">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="591">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="593">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="595">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="597">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="599">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="601">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="603">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="605">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="607">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="609">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="611">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="613">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="615">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="617">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="619">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="621">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="623">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="625">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="627">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="629">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="631">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="633">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="635">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="637">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="639">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="641">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="643">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="644" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Sunday-setFromTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Sunday-setFromTime-container" role="textbox" aria-readonly="true" title="09:00 am">09:00 am</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                                        to</div>

                                                    <div class="col-3">
                                                        <select class="setToTime-select select2-hidden-accessible" id="officeOn-Sunday-setToTime" data-select2-id="officeOn-Sunday-setToTime" tabindex="-1" aria-hidden="true">
                    <option value="12:00 am" data-select2-id="1198">12:00 am</option>
                
                    <option value="12:30 am" data-select2-id="1199">12:30 am</option>
                
                    <option value="01:00 am" data-select2-id="1201">01:00 am</option>
                
                    <option value="01:30 am" data-select2-id="1203">01:30 am</option>
                
                    <option value="02:00 am" data-select2-id="1205">02:00 am</option>
                
                    <option value="02:30 am" data-select2-id="1207">02:30 am</option>
                
                    <option value="03:00 am" data-select2-id="1209">03:00 am</option>
                
                    <option value="03:30 am" data-select2-id="1211">03:30 am</option>
                
                    <option value="04:00 am" data-select2-id="1213">04:00 am</option>
                
                    <option value="04:30 am" data-select2-id="1215">04:30 am</option>
                
                    <option value="05:00 am" data-select2-id="1217">05:00 am</option>
                
                    <option value="05:30 am" data-select2-id="1219">05:30 am</option>
                
                    <option value="06:00 am" data-select2-id="1221">06:00 am</option>
                
                    <option value="06:30 am" data-select2-id="1223">06:30 am</option>
                
                    <option value="07:00 am" data-select2-id="1225">07:00 am</option>
                
                    <option value="07:30 am" data-select2-id="1227">07:30 am</option>
                
                    <option value="08:00 am" data-select2-id="1229">08:00 am</option>
                
                    <option value="08:30 am" data-select2-id="1231">08:30 am</option>
                
                    <option value="09:00 am" data-select2-id="1233">09:00 am</option>
                
                    <option value="09:30 am" data-select2-id="1235">09:30 am</option>
                
                    <option value="10:00 am" data-select2-id="1237">10:00 am</option>
                
                    <option value="10:30 am" data-select2-id="1239">10:30 am</option>
                
                    <option value="11:30 am" data-select2-id="1241">11:30 am</option>
                
                    <option value="12:00 pm" data-select2-id="1243">12:00 pm</option>
                
                    <option value="12:30 pm" data-select2-id="1245">12:30 pm</option>
                
                    <option value="01:00 pm" data-select2-id="1247">01:00 pm</option>
                
                    <option value="01:30 pm" data-select2-id="1249">01:30 pm</option>
                
                    <option value="02:00 pm" data-select2-id="1251">02:00 pm</option>
                
                    <option value="02:30 pm" data-select2-id="1253">02:30 pm</option>
                
                    <option value="03:00 pm" data-select2-id="1255">03:00 pm</option>
                
                    <option value="03:30 pm" data-select2-id="1257">03:30 pm</option>
                
                    <option value="04:00 pm" data-select2-id="1259">04:00 pm</option>
                
                    <option value="04:30 pm" data-select2-id="1261">04:30 pm</option>
                
                    <option value="05:00 pm" data-select2-id="1263">05:00 pm</option>
                
                    <option value="05:30 pm" data-select2-id="1265">05:30 pm</option>
                
                    <option value="06:00 pm" data-select2-id="1267">06:00 pm</option>
                
                    <option value="06:30 pm" data-select2-id="1269">06:30 pm</option>
                
                    <option value="07:00 pm" data-select2-id="1271">07:00 pm</option>
                
                    <option value="07:30 pm" data-select2-id="1273">07:30 pm</option>
                
                    <option value="08:00 pm" data-select2-id="1275">08:00 pm</option>
                
                    <option value="08:30 pm" data-select2-id="1277">08:30 pm</option>
                
                    <option value="09:00 pm" data-select2-id="1279">09:00 pm</option>
                
                    <option value="09:30 pm" data-select2-id="1281">09:30 pm</option>
                
                    <option value="10:00 pm" data-select2-id="1283">10:00 pm</option>
                
                    <option value="10:30 pm" data-select2-id="1285">10:30 pm</option>
                
                    <option value="11:30 pm" data-select2-id="1287">11:30 pm</option>
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1288" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-officeOn-Sunday-setToTime-container"><span class="select2-selection__rendered" id="select2-officeOn-Sunday-setToTime-container" role="textbox" aria-readonly="true" title="06:00 pm">06:00 pm</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-column mg-t-30">
                                        <label class="tx-color-03">Perform actions on chat widget</label>
                                        <div class="d-flex flex-column pd-l-20">

                                            <div class="custom-control custom-radio mg-y-5">
                                                <input type="radio" id="isAutoReplyEnabled" name="performActionOnWidgetOptions" class="custom-control-input performActionOnWidgetOptions">
                                                <label class="custom-control-label" for="isAutoReplyEnabled">
                                                    Enable automated first reply feature on new conversations
                                                    <span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="This will allow you to send a specified message automatically to the customers when they start the conversation" data-original-title="" title="">
                                                        <i class="far fa-question-circle"></i>
                                                    </span>
                                                </label>
                                            </div>

                                            <div class="collapse pd-l-30" id="widgetAutoReplyDiv">
                                                <div class="d-flex flex-column mg-y-20">
                                                    <label class="tx-color-03">
                                                        <span>Message during working hours</span>
                                                        <span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="This message will be sent to the customer when the user sends a message in working hours" data-original-title="" title="">
                                                            <i class="far fa-question-circle"></i>
                                                        </span>
                                                    </label>
                                                    <input type="text" class="form-control" placeholder="" id="autoReplyWithInTime">
                                                </div>

                                                <div class="d-flex flex-column mg-b-20">
                                                    <label class="tx-color-03">
                                                        <span>Message after working hours</span>
                                                        <span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="This message will be sent to the customer when the user sends a message after the working hours" data-original-title="" title="">
                                                            <i class="far fa-question-circle"></i>
                                                        </span>
                                                    </label>
                                                    <input type="text" class="form-control" placeholder="" id="autoReplyafterTime">
                                                </div>
                                            </div>

                                            <div class="custom-control custom-radio mg-y-5">
                                                <input type="radio" id="performActionOnWidgetVisibility" name="performActionOnWidgetOptions" class="custom-control-input performActionOnWidgetOptions">
                                                <label class="custom-control-label" for="performActionOnWidgetVisibility">
                                                    Perform action on Widget visibility
                                                    <span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="This will allow you to perform action on widget visibility on the basis of the working hours i.e. show/hide the widget on your website on basis of working hours." data-original-title="" title="">
                                                        <i class="far fa-question-circle"></i>
                                                    </span>
                                                </label>
                                            </div>

                                            <div class="collapse pd-l-30" id="widgetVisibilityAction">
                                                <div class="d-flex mg-y-20 align-item-end" style="max-width: 1200px;">
                                                    <div class="row w-100 align-item-end">
                                                        <div class="col-2 text-right pd-x-0 align-items-end d-flex justify-content-end">
                                                            <label class="tx-color-03 mg-b-0">Turn widget </label>
                                                        </div>
                                                        <div class="col-3 pd-r-0">
                                                            <select class="custom-select" id="widgetVisibilityActionOptions">
                                                                <option value="0" selected="">off</option>
                                                                <option value="1">on</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-3 pd-r-0">
                                                            <select class="custom-select" id="widgetVisibilityActionTrigger">
                                                                <option value="0" selected="">after</option>
                                                                <option value="1">during</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-2 pd-r-0 align-items-end d-flex justify-content-start">
                                                            <label class="tx-color-03 mg-b-0">working hours</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="custom-control custom-radio mg-y-5">
                                                <input type="radio" id="showNoticeOnChatMessageScreen" name="performActionOnWidgetOptions" class="custom-control-input performActionOnWidgetOptions">
                                                <label class="custom-control-label" for="showNoticeOnChatMessageScreen">
                                                    Show the notice on chat message screen after working hours.
                                                    <span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="This will show the notice on the chat message screen after working hours." data-original-title="" title="">
                                                        <i class="far fa-question-circle"></i>
                                                    </span>
                                                </label>
                                            </div>

                                            <div class="collapse pd-l-30" id="showNoticeOnChatMessageScreenDiv">
                                                <!-- <label class="tx-color-03"><em>NOTE: This feature will only disable the live chat option for new conversation. Widget user can still send you message on previous conversations but you can set a notice to show on the previous conversations</em></label> -->
                                                <div class="d-flex flex-column mg-t-20">

                                                    <!-- <div class="form-group">
                                                        <label for="messageToShowAfterEmailForm" class="d-block">Message to show when user submits the message on email form.</label>
                                                        <input type="text" class="form-control" placeholder="Thanks for contacting the support. Please wait till our agent gets available." id="messageToShowAfterEmailForm">
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input" id="isNoticeEnabledForPrevThread">
                                                            <label class="custom-control-label" for="isNoticeEnabledForPrevThread">
                                                                Show notice in previous conversations.
                                                            </label>
                                                        </div> 
                                                    </div> -->

                                                    <!-- <div class="form-group collapse mg-b-0" id="noticeForPrevThreadDiv"> -->
                                                        <div class="form-group">
                                                            <label for="noticeForPrevThread" class="d-block tx-color-03">Please enter the message to show as a notice</label>
                                                            <input type="text" class="form-control" placeholder="Our agents are currently unavailable. We will get back to you as soon as possible." id="noticeForPrevThread">
                                                        </div>
                                                    <!-- </div> -->

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="d-flex flex-column mg-t-30">
                                        <label class="tx-color-03">Set your reply time on chat widget and let people know in how much time your team will reply</label>


                                        <div class="d-flex flex-column">

                                            <div class="custom-control custom-switch mg-b-20">
                                                <input type="checkbox" class="custom-control-input" id="isReplyTimeEnabled">
                                                <label class="custom-control-label" for="isReplyTimeEnabled">Show reply time on widget
                                                    <span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="Turn this on if you want to show the reply time to the customers when they start the conversation" data-original-title="" title="">
                                                        <i class="far fa-question-circle"></i>
                                                    </span>
                                                </label>
                                            </div>



                                            <div class="collapse pd-l-20" id="widgetReplyTimeDiv">

                                                <div class="d-flex justify-content-between bd rounded-10 pd-20">
                                                    <div class="d-flex flex-column">
                                                        <div class="custom-control custom-switch mg-b-10" style="min-width: 303.81px;">
                                                            <input type="checkbox" class="custom-control-input" id="showReplyTimeDuringWH" checked="">
                                                            <label class="custom-control-label" for="showReplyTimeDuringWH">
                                                                During working hours
                                                            </label>
                                                        </div>


                                                        <div class="collapse show" id="replyTimeDuringWHDiv">
                                                            <div class="d-flex flex-column mg-b-20">
                                                                <label class="tx-color-03">
                                                                    <span>Select the reply time for during working hours</span>
                                                                    <span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="Fill in the time to the show the widget users that how quickly your team replies during office hours" data-original-title="" title="">
                                                                        <i class="far fa-question-circle"></i>
                                                                    </span>
                                                                </label>

                                                                <div class="d-flex flex-column pd-x-10">
                                                                    <div class="custom-control custom-radio mg-y-5">
                                                                        <input type="radio" id="inFewMinutes" name="widgetReplyTime" class="custom-control-input widgetReplyTime" checked="">
                                                                        <label class="custom-control-label" for="inFewMinutes">In a few
                                                                            minutes</label>
                                                                    </div>

                                                                    <div class="custom-control custom-radio mg-y-5">
                                                                        <input type="radio" id="inFewHours" name="widgetReplyTime" class="custom-control-input widgetReplyTime">
                                                                        <label class="custom-control-label" for="inFewHours">In a few
                                                                            hours</label>
                                                                    </div>

                                                                    <div class="custom-control custom-radio mg-y-5">
                                                                        <input type="radio" id="inFewDay" name="widgetReplyTime" class="custom-control-input widgetReplyTime">
                                                                        <label class="custom-control-label" for="inFewDay">In a day</label>
                                                                    </div>

                                                                    <div class="custom-control custom-radio mg-y-5">
                                                                        <input type="radio" id="inCustomMinutes" name="widgetReplyTime" class="custom-control-input widgetReplyTime">
                                                                        <label class="custom-control-label" for="inCustomMinutes">
                                                                            <div class="d-flex">In <input type="number" class="form-control bd-x-0 bd-t-0 mg-x-5 rounded-0 pd-t-0 pd-b-2" value="10" style="outline: none; width: 80px; height: fit-content; box-shadow: none;" placeholder="" id="inCustomMinutesTime"> minutes</div>
                                                                        </label>
                                                                    </div>

                                                                    <div class="custom-control custom-radio mg-y-5">
                                                                        <input type="radio" id="inCustomDays" name="widgetReplyTime" class="custom-control-input widgetReplyTime">
                                                                        <label class="custom-control-label" for="inCustomDays">
                                                                            <div class="d-flex">In <input type="number" class="form-control bd-x-0 bd-t-0 mg-x-5 rounded-0 pd-t-0 pd-b-2" value="2" style="outline: none; width: 80px; height: fit-content; box-shadow: none;" placeholder="" id="inCustomDayTime"> days</div>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="divider-text divider-vertical" data-text=""></div>


                                                    <div class="d-flex flex-column">

                                                        <div class="custom-control custom-switch mg-b-10" style="min-width: 292.91px;">
                                                            <input type="checkbox" class="custom-control-input" id="showReplyTimeAfterWH">
                                                            <label class="custom-control-label" for="showReplyTimeAfterWH">
                                                                After working hours
                                                            </label>
                                                        </div>

                                                        <div class="collapse" id="replyTimeAfterWHDiv">
                                                            <div class="d-flex flex-column mg-b-20">
                                                                <label class="tx-color-03">
                                                                    <span>Select the reply time for after working hours</span>
                                                                    <span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="Fill in the time to the show the widget users that how quickly your team replies after office hours" data-original-title="" title="">
                                                                        <i class="far fa-question-circle"></i>
                                                                    </span>
                                                                </label>

                                                                <div class="d-flex flex-column pd-x-10">
                                                                    <div class="custom-control custom-radio mg-y-5">
                                                                        <input type="radio" id="inFewMinutesAfterWH" name="widgetReplyTimeAfterWH" class="custom-control-input widgetReplyTimeAfterWH" checked="">
                                                                        <label class="custom-control-label" for="inFewMinutesAfterWH">In a few minutes</label>
                                                                    </div>

                                                                    <div class="custom-control custom-radio mg-y-5">
                                                                        <input type="radio" id="inFewHoursAfterWH" name="widgetReplyTimeAfterWH" class="custom-control-input widgetReplyTimeAfterWH">
                                                                        <label class="custom-control-label" for="inFewHoursAfterWH">In a few hours</label>
                                                                    </div>

                                                                    <div class="custom-control custom-radio mg-y-5">
                                                                        <input type="radio" id="inFewDayAfterWH" name="widgetReplyTimeAfterWH" class="custom-control-input widgetReplyTimeAfterWH">
                                                                        <label class="custom-control-label" for="inFewDayAfterWH">In a day</label>
                                                                    </div>

                                                                    <div class="custom-control custom-radio mg-y-5">
                                                                        <input type="radio" id="inCustomMinutesAfterWH" name="widgetReplyTimeAfterWH" class="custom-control-input widgetReplyTimeAfterWH">
                                                                        <label class="custom-control-label" for="inCustomMinutesAfterWH">
                                                                            <div class="d-flex">In <input type="number" class="form-control bd-x-0 bd-t-0 mg-x-5 rounded-0 pd-t-0 pd-b-2" value="30" style="outline: none; width: 80px; height: fit-content; box-shadow: none;" placeholder="" id="inCustomMinutesTimeAfterWH"> minutes</div>
                                                                        </label>
                                                                    </div>

                                                                    <div class="custom-control custom-radio mg-y-5">
                                                                        <input type="radio" id="inCustomDaysAfterWH" name="widgetReplyTimeAfterWH" class="custom-control-input widgetReplyTimeAfterWH">
                                                                        <label class="custom-control-label" for="inCustomDaysAfterWH">
                                                                            <div class="d-flex">In <input type="number" class="form-control bd-x-0 bd-t-0 mg-x-5 rounded-0 pd-t-0 pd-b-2" value="3" style="outline: none; width: 80px; height: fit-content; box-shadow: none;" placeholder="" id="inCustomDayTimeAfterWH"> days</div>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </li>
                            <li class="list-group-item">
                                <button id="saveWidgetWorkingHoursAndActions" class="btn btn-sm btn-primary">Save</button>
                            </li>

                            <li class="list-group-item mg-t-30" style="background-color: #eef0f7;">
                                <strong>Set widget icon visibility on your website</strong>
                            </li>
                            <li class="list-group-item">
                                <p class="tx-color-03">Hide your widget icon on the specific/all URL on your webpage and then show/hide the widget screen with a click on an element on your webpage</p>

                                <div class="d-flex flex-column">
                                    <div class="custom-control custom-switch mg-b-20 mg-t-10">
                                        <input type="checkbox" class="custom-control-input" id="hideWidgetIconInitially">
                                        <label class="custom-control-label" for="hideWidgetIconInitially"> 
                                            Hide widget icon on your website.
                                        </label>
                                    </div>

                                    <div class="pd-l-30 collapse" id="hideIconOnURLoptionsDiv">
                                        <div class="d-flex">
                                            <div class="bd pd-15 match_data selectedOption rounded-5" id="hideIconOnAllPages">
                                                <p class="mg-b-0" style="color: currentColor;">
                                                    Hide on all pages
                                                </p>
                                            </div>
                                            <div class="divider-text divider-vertical" data-text="or">OR
                                            </div>
                                            <div class="bd pd-15 match_data rounded-5" id="hideIconOnSpecifiedPages">
                                                <p class="mg-b-0" style="color: currentColor;">
                                                    Hide on the specified URLs
                                                </p>
                                            </div>
                                        </div>

                                        <div class="hideIconOnSpecifiedURLdiv collapse">
                                            <div class="d-flex flex-column">
                                                <div class="d-none mg-t-20 flex-column" id="specifiedURLsForIconHide">
                                                    
                                                </div>
                                                <div class="d-flex flex-column mg-y-20">
                                                    <label for="urlInputForSpecified" class="mg-b-0">When URL contains</label>

                                                    <div class="row w-100">
                                                        <div class="col-8">
                                                            <input type="text" class="form-control" placeholder="helpwise.io" id="urlInputForSpecified">
                                                        </div>

                                                        <div class="col-4 d-flex">
                                                            <button class="btn btn-primary mg-r-10" id="addMoreUrlForSpecified">Add More</button>
                                                            <button class="d-none btn btn-primary mg-r-10" id="updateUrlForSpecified">Update</button>
                                                            <button class="btn btn-outline-secondary" id="cancelUrlForSpecified">Cancel</button>
                                                        </div>

                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <button id="saveHideWidgetIconSettings" class="btn btn-sm btn-primary">Save</button>
                            </li>



                            <li class="list-group-item mg-t-30" style="background-color: #eef0f7;"><strong>Live Chat
                                    Setup</strong>
                            </li>
                            <li class="list-group-item">

                                <div class="custom-control custom-switch mg-b-20 mg-t-10">
                                    <input type="checkbox" class="custom-control-input" id="enableWidget">
                                    <label class="custom-control-label" for="enableWidget"> Enable Live Chat
                                        Widget</label>
                                </div>

                                <form>

                                    <div class="form-group">
                                        <label id="chat-script-label" class="d-block">Chat Script</label>
                                        <textarea class="form-control" id="chat-script-textarea" rows="10" readonly="">COPY PASTE THIS SCRIPT BEFORE CLOSING THE BODY TAG TO ADD LIVE CHAT WIDGET
&lt;script&gt;
    helpwiseSettings = {
        widget_id: '&lt;YOUR LIVE CHAT WIDGET ID&gt;',
        align: 'right',
    }
&lt;/script&gt;
&lt;script src="https://cdn.helpwise.io/assets/js/livechat.js"&gt;&lt;/script&gt;
                                        </textarea>
                                        <div id="chat-script-valid"></div>
                                    </div>
                                    <div class="form-group d-none">
                                        <label id="chat-helpwise-settings" class="d-block">Live Chat Helpwise
                                            Settings</label>
                                        <textarea class="form-control" id="chat-helpwise-settings" rows="15" readonly="">Provide settings of user/lead to the Helpwise Inbox so that you can view users settings directly in Helpwise. Keep this script above the widget script

&lt;script&gt;
    helpwiseSettings = {
        widget_id: '&lt;YOUR LIVE CHAT WIDGET ID&gt;',
        align: '&lt;RIGHT OR LEFT&gt;',
        firstname: '&lt;FIRST NAME OF USER&gt;',
        lastname: '&lt;LAST NAME OF USER&gt;',
        email: '&lt;EMAIL ADDRESS OF USER&gt;',
        phone: '&lt;PHONE NUMBER OF USER&gt;'
    }
&lt;/script&gt;
&lt;script src="https://cdn.helpwise.io/assets/js/livechat.js"&gt;&lt;/script&gt;
                                        </textarea>
                                    </div>
                                </form>
                            </li>
                        </ul>




                        <ul id="mailbox-users-tab" class="list-group mg-t-30" style="width: 90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;"><strong id="mailbox-user-label">Inbox
                                    Users</strong></li>
                            <li class="list-group-item">
                                <div class="d-flex flex-column flex-wrap align-items-start justify-content-start">
                                    <div class="d-flex flex-row flex-wrap justify-content-start" id="settings-mailboxes-users-list">
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-204378" class="custom-control-input" disabled="" checked="">
                    <label class="custom-control-label" for="mailbox-user-204378">Curtis Jackson</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-211561" class="custom-control-input" disabled="" checked="">
                    <label class="custom-control-label" for="mailbox-user-211561">Ayush Rastogi</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-211103" class="custom-control-input" disabled="" checked="">
                    <label class="custom-control-label" for="mailbox-user-211103">Tushar Sankla</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-204964" class="custom-control-input" disabled="" checked="">
                    <label class="custom-control-label" for="mailbox-user-204964">uyyusa ashjhas</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-208848" class="custom-control-input" disabled="" checked="">
                    <label class="custom-control-label" for="mailbox-user-208848">Mayank Banga</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-204773" class="custom-control-input" disabled="" checked="">
                    <label class="custom-control-label" for="mailbox-user-204773">Rishabh Rawat</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-204522" class="custom-control-input" disabled="" checked="">
                    <label class="custom-control-label" for="mailbox-user-204522">Claudia Keen</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-213006" class="custom-control-input" disabled="" checked="">
                    <label class="custom-control-label" for="mailbox-user-213006">Helpwise Outlook</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-209729" class="custom-control-input" disabled="" checked="">
                    <label class="custom-control-label" for="mailbox-user-209729">Harit Dagar</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-213850" class="custom-control-input" checked="">
                    <label class="custom-control-label" for="mailbox-user-213850">Harry Potter</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-211562" class="custom-control-input">
                    <label class="custom-control-label" for="mailbox-user-211562">Test User</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-214896" class="custom-control-input" checked="">
                    <label class="custom-control-label" for="mailbox-user-214896">Kunal Kumar Singh</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-214897" class="custom-control-input" checked="">
                    <label class="custom-control-label" for="mailbox-user-214897">Masood Muhammad</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-214898" class="custom-control-input" checked="">
                    <label class="custom-control-label" for="mailbox-user-214898">Gatti Ramya</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-204963" class="custom-control-input">
                    <label class="custom-control-label" for="mailbox-user-204963">Test User</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-204966" class="custom-control-input">
                    <label class="custom-control-label" for="mailbox-user-204966">sjkkjas jkjksa</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-204715" class="custom-control-input" checked="">
                    <label class="custom-control-label" for="mailbox-user-204715">Prabhat Mishra</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-205764" class="custom-control-input" checked="">
                    <label class="custom-control-label" for="mailbox-user-205764">Hikisox</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-207083" class="custom-control-input" checked="">
                    <label class="custom-control-label" for="mailbox-user-207083">test test</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-204820" class="custom-control-input" checked="">
                    <label class="custom-control-label" for="mailbox-user-204820">Test User</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-214046" class="custom-control-input">
                    <label class="custom-control-label" for="mailbox-user-214046">Test Account</label>
                    </div>
                    
                    <div class="custom-control custom-checkbox mg-10 ">
                     <input type="checkbox" id="mailbox-user-204622" class="custom-control-input" checked="">
                    <label class="custom-control-label" for="mailbox-user-204622">Nick Farrante</label>
                    </div>
                    </div>
                                    <button id="save-mailboxes-user" class="btn btn-primary btn-sm mt-2">Save</button>
                                </div>
                            </li>
                        </ul>

                        <ul id="WhatsApp-inbox-templates" class="list-group mg-t-30" style="width: 90%; display: none;">
                            <li class="list-group-item" style="background-color: #eef0f7;"><strong>WhatsApp
                                    Templates</strong></li>
                            <li class="list-group-item">

                                <div id="templatesList" class="list-group" style="overflow-y:scroll;max-height:200px">

                                </div>
                                <button class="btn btn-xs btn-primary mg-t-15" id="addNewWhatsappTemplates">Add
                                    New</button>

                            </li>
                        </ul>

                        <ul id="customInboxAPIResponses" class="list-group mg-t-30 d-none" style="width: 90%;">
                            <li class="list-group-item mg-t-30" style="background-color: #eef0f7;"><strong>Custom Inbox
                                    Setup</strong>
                            </li>
                            <li class="list-group-item">
                                <form>

                                    <div class="form-group">
                                        <label id="custom-inbox-outgoing-api-label" class="d-block">Outgoing API Response</label>
                                        <textarea class="form-control" id="custom-inbox-outgoing-api-textarea" rows="10" readonly=""> 
                                            {
                                                "id": 12345,
                                                "type": "custom",
                                                "direction": "outgoing",
                                                "created_at": "2021-01-11 16:20:27",
                                                "body": "Hello",
                                                "thread_id": 12345678,
                                                "mailbox_id": 1234567,
                                                "subject": "Custom Inbox",
                                                "custom_data": "{\"Custom Field\":\"6758\"}",
                                                "agent": {
                                                    "id": 45678,
                                                    "email": "adamsmith@gmail.com",
                                                    "user_name": "Mark Adam",
                                                    "first_name": "Mark",
                                                    "last_name": "Adam",
                                                    "is_admin": true
                                                },
                                                "recipients": [
                                                    [
                                                        {
                                                            "id": 98765,
                                                            "first_name": "Mike",
                                                            "last_name": "Smith",
                                                            "email": [
                                                                        "mikesmith@gmail.com"
                                                                    ],
                                                            "phone": [
                                                                        "4678904353"
                                                                    ]
                                                        }
                                                    ]
                                                ]
                                            }
                                        </textarea>
                                    </div>

                                    <div class="form-group">
                                        <label id="custom-inbox-incoming-api-label" class="d-block">Incoming API Request</label>
                                        <textarea class="form-control" id="custom-inbox-incoming-api-textarea" rows="10" readonly="">                                            {
                                                "thread_id": Thread ID of an existing thread(Optional),
                                                "body": Body of the message,
                                                "subject": Subject of the message(Optional),
                                                "sender": 
                                                {
                                                    "id" : Contact ID of the sender,
                                                    "email" : Contact Email of the sender,
                                                    "phone" : Contact Number of the sender
                                                }
                                            }
                                        </textarea>
                                    </div>
                                    
                                </form>
                            </li>
                        </ul>


                        <ul id="inbound-tab-setting" class="list-group mg-t-30" style="width:90%;">
                            <li class="list-group-item d-flex align-item-center justify-content-start" style="background-color: #eef0f7;">
                                <div>
                                    <strong>Incoming Email Settings</strong>&nbsp;|&nbsp;
                                    Forward your incoming emails to following address
                                </div>
                                <div id="inboundStatusText" style="">
                                    <span class="badge ml-3 tx-uppercase statusText badge-success" data-toggle="tooltip" data-original-title="We were able to verify your forwarding settings successfully.">verified</span>
                                </div>
                            </li>
                            <li class="list-group-item" style="padding:20px;">
                                <div class="container" id="forwarding-display-wrapper">
                                    <div class="col-6 offset-3 px-0">
                                        <div class="d-flex flex-column justify-content-center align-item-center">
                                            <div class="d-flex flex-column justify-content-start">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="forwarding-input" aria-describedby="basic-addon2" readonly="">
                                                    <div class="input-group-append">
                                                        <button onclick="copyForwarding()" class="btn btn-brand-02" type="button" id="basic-addon2">Copy</button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style="color:#32CD32;float:right;" id="forwarding-success">
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="tx-color-03 tx-14 mt-3" style="margin-bottom:0px;">Copy the email
                                                address below and
                                                forward your emails to Helpwise.
                                            </p>
                                            <span><a target="_black" href="https://helpwise.io/help/shared-inbox-gmail-guide/" style="font-size:13px;">Guide for Gmail users</a></span>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-center align-item-center col-6 offset-3">
                                        <button class="btn btn-primary mt-3 testForwardingBtn">Test Forwarding</button>
                                    </div>
                                    <div style="display:none" id="forwardingStatusContainer" class="card col-6 offset-3 mt-4">
                                        <div class="card-body">
                                            <div class="d-flex flex-column justify-content-center align-items-center" style="">
                                                <div id="forwardingStatusImg">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div></div>
                                                <div class="h5 tx-color-02 mt-3" id="forwardingStatusText">We are currently trying to verify your forwarding settings.</div>
                                                <div class="align-items-center justify-content-center mt-2 tryAgainContainer d-none">
                                                    <button class="btn btn-sm btn-primary mr-2 tryAgain testForwardingBtn">Try
                                                        Again</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul id="outbound-tab-setting" class="list-group mg-t-30" style="width:90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;"><strong>Outgoing Email
                                    Settings</strong> | How do you want to send emails from Helpwise?<a target="_black" href="https://helpwise.io/help/outbound-settings/" style="font-size:13px;">&nbsp;(Guide)</a>
                            </li>
                            <li class="list-group-item">
                                <div class="alert alert-danger d-none" id="outbound-settings-error-msg"></div>
                                <div style=" display: none" class="alert alert-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="8"></line>
                                    </svg>
                                    You haven not verified your
                                    SPF/DKIM
                                    settings. This may result in your emails landing in spam
                                </div>
                                <div class="form-check mg-5">
                                    <input type="radio" id="helpwise_radio_btn" class="form-check-input" name="optradio">
                                    <label class="form-check-label" for="helpwise_radio_btn">
                                        I will use Helpwise.io to
                                        send my emails (recommended)
                                    </label>
                                </div>
                                <div class="form-check mg-5">
                                    <input type="radio" id="google_radio_btn" class="form-check-input" name="optradio">
                                    <label class="form-check-label" for="google_radio_btn">
                                        I will use Gmail to send my emails
                                    </label>
                                </div>
                                <div class="form-check mg-5">
                                    <input type="radio" id="microsoft_radio_btn" class="form-check-input" name="optradio">
                                    <label class="form-check-label" for="microsoft_radio_btn">
                                        I will use Microsoft Outlook to send my emails
                                    </label>
                                </div>
                                <div class="form-check mg-5">
                                    <input type="radio" id="smtp_radio_btn" class="form-check-input" name="optradio">
                                    <label class="form-check-label" for="smtp_radio_btn">
                                        Use my custom outgoing (SMTP) settings
                                    </label>
                                </div>
                                <div id="smtp-settings" class="connection-setting" style="display: none;">
                                    <form>
                                        <div class="form-group">
                                            <label>Outgoing Server</label>
                                            <input type="text" class="form-control" id="outgoing">
                                        </div>
                                        <div class="form-group">
                                            <label>User Name</label>
                                            <input type="text" class="form-control" id="username">
                                        </div>
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input type="password" class="form-control" id="pwdsmtp">
                                        </div>
                                        <div class="form-group">
                                            <label>Port</label>
                                            <input type="text" class="form-control" id="port">
                                        </div>
                                        <div class="form-group">
                                            <label for="sel1">Security:</label>
                                            <select class="form-control custom-select" id="sel1">
                                                <option value="1">SSL</option>
                                                <option value="2">TLS</option>
                                                <option value="3">NONE</option>
                                            </select>
                                        </div>
                                        <div class="d-flex justify-content-start">
                                            <button class="btn btn-primary" id="custom_smtp_save_btn">Verify and
                                                Save</button></div>
                                    </form>
                                </div>
                                <div id="google-settings" class="connection-setting" style="display: none;">
                                    <button class="btn border-secondary rounded" id="google-conn">
                                        <img src="https://cdn.helpwise.io/assets/images/google-logo.png">
                                        <span>
                                            Connect with Google
                                        </span>
                                    </button>
                                    <div id="connected-g-acc" style="display: none;">

                                        <a class="btn border-secondary rounded mt-2">
                                            <img src="https://cdn.helpwise.io/assets/images/google-logo.png">
                                            <span id="google-connected-email">
                                            </span>

                                            <span class="google-delink" data-toggle="tooltip" data-placement="bottom" title="Delink Google" style="cursor:pointer;margin-left:4px">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                    </path>
                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                                </svg>
                                            </span>

                                        </a>
                                    </div>
                                </div>
                                <div id="microsoft-settings" class="connection-setting" style="display: none;">
                                    <a id="microsoft-conn" class="btn border-secondary rounded mt-2" href="https://app.helpwise.io/oauth/microsoft">
                                        <img src="https://helpwise.io/assets/images/microsoft-logo.svg" height="20" width="20">
                                        <span id="connect-with-microsoft">Connect with Microsoft</span>
                                        <span id="microsoft-connected" style="display:none">
                                        </span>
                                    </a>
                                </div>
                                <div id="spf-dkim-settings" data-mailgun="true" class="connection-setting" style="">
                                    <button class="btn btn-sm btn-warning" id="getDNSRecords" style="font-weight:500">Get DNS settings</button>
                                    <ul class="list-group mg-10" id="dnsRecordsWrapper" style="display:none">
                                        <li class="list-group-item d-flex align-item-center justify-content-start" style="background-color: #eef0f7;">
                                            <div>DNS Records</div>
                                            <div id="dns-settings-status" style="display: none"></div>
                                        </li>
                                        <li class="list-group-item">
                                            <table id="dns-table" class="table" style="table-layout:fixed">
                                                <thead>
                                                    <tr><th style="width:45%">Host</th>
                                                    <th style="width:10%">Type</th>
                                                    <th style="width:45%">Value</th>
                                                </tr></thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </li>
                                        <li class="list-group-item">
                                            <button class="btn btn-sm btn-primary" id="dns-verify-btn">Verify</button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="list-group-item" id="saveButtonWrapper">
                                <button id="save-outgoing-settings-btn" class="btn btn-sm btn-primary">Save</button>
                            </li>
                        </ul>
                        <ul id="mailbox-name-appear-tab" class="list-group mg-t-30" style="width:90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>
                                    How do you want the name to appear in the customer's inbox?
                                </strong>
                            </li>
                            <li class="list-group-item">
                                <div class="form-check mg-5" id="outgoingDisplayStatusMailbox">
                                    <input type="radio" id="ogrb1" class="form-check-input outgoingDisplayStatus" name="outgoingDisplayStatus">
                                    <label class="form-check-label" for="ogrb1">
                                        I want to show the inbox name that is <span class="example" style="font-weight:500">Helpwise Support</span>
                                    </label>
                                </div>
                                <div class="form-check mg-5" id="outgoingDisplayStatusUser">
                                    <input type="radio" id="obrb2" class="form-check-input outgoingDisplayStatus" name="outgoingDisplayStatus">
                                    <label class="form-check-label" for="obrb2">
                                        I want to show the sender's name that is <span class="example" style="font-weight:500">Masood Muhammad</span>
                                    </label>
                                </div>
                                <div class="form-check mg-5" id="outgoingDisplayStatusUserFromMailbox">
                                    <input type="radio" id="obrb3" class="form-check-input outgoingDisplayStatus" name="outgoingDisplayStatus">
                                    <label class="form-check-label" for="obrb3">
                                        I want to show both the sender's name and inbox name that is <span class="example" style="font-weight:500">Masood from Helpwise Support</span>
                                    </label>
                                </div>
                                <div class="form-check mg-5" id="outgoingDisplayStatusCustom">
                                    <input type="radio" id="obrb3" class="form-check-input outgoingDisplayStatus" name="outgoingDisplayStatus">
                                    <label class="form-check-label d-flex align-items-center" for="obrb3">
                                        <span>I want to customize it </span>
                                        <input type="text" id="customDisplayStatus" style="display: inline; margin-left: 5px;" class="form-control">
                                    </label>
                                </div>
                                <button id="saveOutgoingDisplay" class="btn btn-primary btn-sm mt-2">Save</button>
                            </li>
                        </ul>


                        <ul id="gmailSyncTab" class="list-group mg-t-30" style="width:90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>
                                    Gmail Sync
                                </strong> | Do you wish Helpwise to maintain a full 2-way sync with Gmail?
                            </li>
                            <li class="list-group-item">
                                <button class="btn border-secondary rounded" id="googleFullSyncBtn">
                                    <img src="https://cdn.helpwise.io/assets/images/google-logo.png">
                                    <span>
                                        Connect with Google
                                    </span>
                                </button>

                                <div id="connected-g-acc-fullSync" style="display:none">
                                    <a class="btn border-secondary rounded mt-2">
                                        <img src="https://cdn.helpwise.io/assets/images/google-logo.png">
                                        <span id="google-fullSync-connected-email"></span>
                                        <span class="google-delink" data-toggle="tooltip" data-placement="bottom" title="Delink Google" style="cursor:pointer;margin-left:4px">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                </path>
                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="mt-4 gmailSettings d-none">
                                    <div class="mb-3 ml-1"><label class=" mb-4 ml-3"><strong>Settings for Gmail sync</strong></label><span style="margin-left: 5px;cursor: pointer;" class="tx-color-03" data-container="body" data-toggle="popover" data-placement="top" data-content="Select which actions will reflect on Gmail" data-original-title="" title="">
                                            <i class="far fa-question-circle"></i>
                                        </span>
                                        <div class="custom-control custom-switch mg-b-20 mg-t-10 ml-3">
                                            <input type="checkbox" class="custom-control-input" id="gmailArchiveAction">
                                            <label class="custom-control-label" for="gmailArchiveAction">Mark emails Archive from Helpwise to Gmail</label>
                                        </div>
                                        <div class="custom-control custom-switch mg-b-20 mg-t-10 ml-3">
                                            <input type="checkbox" class="custom-control-input" id="gmailTrashAction">
                                            <label class="custom-control-label" for="gmailTrashAction">Mark emails Trash from Helpwise to Gmail</label>
                                        </div>
                                        <div class="custom-control custom-switch mg-b-20 mg-t-10 ml-3">
                                            <input type="checkbox" class="custom-control-input" id="gmailSpamAction">
                                            <label class="custom-control-label" for="gmailSpamAction">Mark emails Spam from Helpwise to Gmail</label>
                                        </div>
                                        <div class="custom-control custom-switch mg-b-20 mg-t-10 ml-3">
                                            <input type="checkbox" class="custom-control-input" id="gmailReadAction">
                                            <label class="custom-control-label" for="gmailReadAction">Mark emails Read from Helpwise to Gmail</label>
                                        </div>


                                    </div>


                                </div>
                                
                            </li>
                        </ul>


                        <ul id="outlookSyncTab" class="list-group mg-t-30" style="width:90%;">
                                <li class="list-group-item" style="background-color: #eef0f7;">
                                    <strong>
                                        Outlook Sync
                                    </strong> | Do you wish Helpwise to maintain a full 2-way sync with Outlook?
                                </li>
                                <li class="list-group-item">
                                    <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=dbf8dc4f-144a-41a3-af07-de45bf8d9c2f&amp;response_type=code&amp;redirect_uri=https://app.helpwise.io/oauth/outlook_switch.php&amp;response_mode=query&amp;grant_type=client_credentials&amp;scope=offline_access%20Mail.Read%20Mail.ReadWrite%20Mail.Send%20User.Read&amp;state=nothing" class="btn border-secondary rounded" id="outlookFullSyncBtn">
                                        <img src="https://cdn.helpwise.io/assets/images/outlookSyncLogo.png">
                                        <span>
                                            Connect with Microsoft
                                        </span>
                                    </a>

                                    <div id="connected-m-acc-fullSync" style="display:none">
                                        <a class="btn border-secondary rounded mt-2">
                                            <img src="https://cdn.helpwise.io/assets/images/outlookSyncLogo.png">
                                            <span id="outlook-fullSync-connected-email"></span>
                                            <span class="outlook-delink" data-toggle="tooltip" data-placement="bottom" title="Delink Outlook" style="cursor:pointer;margin-left:4px">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                    </path>
                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </li>
                            </ul>

                        <ul id="ticket-tab" class="list-group mg-t-30" style="width: 90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>
                                    Ticket Number
                                </strong>
                            </li>
                            <li class="list-group-item">
                                <div class="mb-3">
                                    Don't Show Ticket Number
                                    <label class="switch ml-2 mr-2">
                                        <input type="checkbox" id="showTicketNumber">
                                        <span class="slider round"></span>
                                    </label>
                                    Show Ticket Number
                                </div>
                            </li>
                        </ul>
                        <ul id="open-tracking-tab" class="list-group mg-t-30" style="width: 90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>
                                    Open Tracking
                                </strong> | Do you want Helpwise to track if email has been opened by the
                                recipient?
                            </li>
                            <li class="list-group-item">
                                <div class="mb-3">
                                    Disabled
                                    <label class="switch ml-2 mr-2">
                                        <input type="checkbox" id="openTracking">
                                        <span class="slider round"></span>
                                    </label>
                                    Enabled
                                </div>
                            </li>
                        </ul>
                        <ul id="twitter-dm-connect" class="list-group mg-t-30" style="width:90%;display:none;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>
                                    Twitter Dm
                                </strong> | This will create a seperate inbox and you will receive all your messages
                                there
                            </li>
                            <li class="list-group-item">
                                <div class="mb-3">
                                    Disabled
                                    <label class="switch ml-2 mr-2">
                                        <input type="checkbox" id="dm-toggle">
                                        <span class="slider round"></span>
                                    </label>
                                    Enabled
                                </div>
                            </li>
                        </ul>
                        <ul id="spam-filter-tab" class="list-group mg-t-30" style="width: 90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>
                                    Spam Filter
                                </strong> | Do you want Helpwise to flag messages as Spam?
                            </li>
                            <li class="list-group-item">
                                <div class="mb-3">
                                    Disabled
                                    <label class="switch ml-2 mr-2">
                                        <input type="checkbox" id="spamFilter">
                                        <span class="slider round"></span>
                                    </label>
                                    Enabled
                                </div>
                            </li>
                        </ul>
                        <ul id="auto-replies-toggle" class="list-group mg-t-30" style="width:90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>
                                    Auto Reply
                                </strong> | Do you want auto replies to show in your conversations?
                            </li>
                            <li class="list-group-item">
                                <div class="mb-3">
                                    Disabled
                                    <label class="switch ml-2 mr-2">
                                        <input type="checkbox" id="auto-reply-toggle">
                                        <span class="slider round"></span>
                                    </label>
                                    Enabled
                                </div>
                            </li>
                        </ul>

                        <ul id="autoTaggingTab" class="list-group mg-t-30" style="width: 90%;">
    <li class="list-group-item" style="background-color: #eef0f7;">
        <strong>
            Auto Tagging
        </strong> | Do you want Helpwise to automatically tag messages?
    </li>
    <li class="list-group-item">
        <div class="mb-3">
            Disabled
            <label class="switch ml-2 mr-2">
                <input type="checkbox" id="autoTagging">
                <span class="slider round"></span>
            </label>
            Enabled
        </div>
    </li>
</ul>
                        <ul id="reassignmentTab" class="list-group mg-t-30" style="width:90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>
                                    Reassignment
                                </strong> | What should Helpwise do when assigned agent is not available?
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-4">
                                        <select id="reassignment" data-select2-id="reassignment" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
                                            <option value="leave" data-select2-id="1290">Ignore Unavailibity</option>
                                            <option value="unassign">Unassign Conversation</option>
                                            <option value="autoAssign">Assign Automatically</option>                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1289" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-reassignment-container"><span class="select2-selection__rendered" id="select2-reassignment-container" role="textbox" aria-readonly="true" title="Ignore Unavailibity">Ignore Unavailibity</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-4">
                                        <button class="btn btn-xs btn-primary" id="saveReassignment">Save</button>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <ul id="autoAssignmentTab" class="list-group mg-t-30" style="width:90%;">
    <li class="list-group-item" style="background-color: #eef0f7;">
        <strong>
            Auto Assignment
        </strong> | How do you want Helpwise to distribute new conversations?
    </li>
    <li class="list-group-item">
        <div class="row">
            <div class="col-4">
                <select id="autoAssignment" data-select2-id="autoAssignment" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
                    <option value="disabled">Disabled</option>
                    <option value="roundRobin" data-select2-id="1292">Round Robin</option>
                    <option value="random">Assign Randomly</option>
                    
                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1291" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-autoAssignment-container"><span class="select2-selection__rendered" id="select2-autoAssignment-container" role="textbox" aria-readonly="true" title="Round Robin">Round Robin</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
            </div>
        </div>
        <div id="assignAmongContainer" style="margin-top:10px">
            <div class="row">
                <div class="col-2">
                    Assign Among
                </div>
            </div>
            <div class="row">
                <div class="d-flex flex-row flex-wrap justify-content-start col-12" id="autoAssignTeammatesContainer"><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="211561" id="autoAssignTeammate-211561" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-211561">Ayush</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="204522" id="autoAssignTeammate-204522" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-204522">Claudia</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="204378" id="autoAssignTeammate-204378" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-204378">Curtis</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="214898" id="autoAssignTeammate-214898" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-214898">Gatti</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="209729" id="autoAssignTeammate-209729" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-209729">Harit</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="213850" id="autoAssignTeammate-213850" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-213850">Harry</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="213006" id="autoAssignTeammate-213006" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-213006">Helpwise</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="205764" id="autoAssignTeammate-205764" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-205764">Hikisox</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="214896" id="autoAssignTeammate-214896" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-214896">Kunal</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="214897" id="autoAssignTeammate-214897" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-214897">Masood</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="208848" id="autoAssignTeammate-208848" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-208848">Mayank</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="204622" id="autoAssignTeammate-204622" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-204622">Nick</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="204715" id="autoAssignTeammate-204715" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-204715">Prabhat</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="204773" id="autoAssignTeammate-204773" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-204773">Rishabh</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="207083" id="autoAssignTeammate-207083" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-207083">test</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="204820" id="autoAssignTeammate-204820" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-204820">Test</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="211103" id="autoAssignTeammate-211103" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-211103">Tushar</label>
                               </div><div class="custom-control custom-checkbox mg-10 ">
                                <input type="checkbox" data-teammate-id="204964" id="autoAssignTeammate-204964" class="custom-control-input autoAssignTeammate">
                               <label class="custom-control-label" for="autoAssignTeammate-204964">uyyusa</label>
                               </div></div>
            </div>
        </div>
        <div class="row" style="margin-top: 10px;">
            <div class="col-4">
                <button class="btn btn-xs btn-primary" id="saveAutoAssignment">Save</button>
            </div>
        </div>
    </li>
</ul>

                        <ul id="sectionsTab" class="list-group mg-t-30" style="width:90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>Customize Inbox View</strong> | Choose the type of conversations you want to see
                                in different section of this inbox.
                            </li>
                            <li class="list-group-item">
                                <div class="row align-items-center my-1">
                                    <div class="col-3">
                                        Mine
                                    </div>
                                    <div class="col-4">
                                        <select id="mineSection" data-select2-id="mineSection" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
                                            <option value="inbound">Incoming</option>
                                            <option value="inboundOutbound" data-select2-id="1294">Incoming and Outgoing</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1293" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-mineSection-container"><span class="select2-selection__rendered" id="select2-mineSection-container" role="textbox" aria-readonly="true" title="Incoming and Outgoing">Incoming and Outgoing</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="row align-items-center my-1">
                                    <div class="col-3">
                                        All/Unassigned/Assigned
                                    </div>
                                    <div class="col-4">
                                        <select id="allUnassignedAssignedSection" data-select2-id="allUnassignedAssignedSection" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
                                            <option value="inbound" data-select2-id="1296">Incoming</option>
                                            <option value="inboundOutbound">Incoming and Outgoing</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1295" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-allUnassignedAssignedSection-container"><span class="select2-selection__rendered" id="select2-allUnassignedAssignedSection-container" role="textbox" aria-readonly="true" title="Incoming">Incoming</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="row align-items-center my-1">
                                    <div class="col-3">
                                        Mentions
                                    </div>
                                    <div class="col-4">
                                        <select id="mentionsSection" data-select2-id="mentionsSection" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
                                            <option value="all" data-select2-id="1298">All</option>
                                            <option value="active">Active</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1297" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-mentionsSection-container"><span class="select2-selection__rendered" id="select2-mentionsSection-container" role="textbox" aria-readonly="true" title="All">All</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="row align-items-center my-1">
                                    <div class="col-3">
                                        Starred
                                    </div>
                                    <div class="col-4">
                                        <select id="starredSection" data-select2-id="starredSection" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
                                            <option value="all">All</option>
                                            <option value="active" data-select2-id="1300">Active</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1299" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-starredSection-container"><span class="select2-selection__rendered" id="select2-starredSection-container" role="textbox" aria-readonly="true" title="Active">Active</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="row align-items-center my-1">
                                    <div class="col-3">
                                        Tags
                                    </div>
                                    <div class="col-4">
                                        <select id="tagsSection" data-select2-id="tagsSection" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
                                            <option value="all" data-select2-id="1302">All</option>
                                            <option value="active">Active</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1301" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-tagsSection-container"><span class="select2-selection__rendered" id="select2-tagsSection-container" role="textbox" aria-readonly="true" title="All">All</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-4">
                                        <button class="btn btn-xs btn-primary" id="saveSections">Save</button>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <ul id="aliases-tab" class="list-group mg-t-30" style="width:90%;<?echo($display)?>">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>Aliases</strong>
                            </li>
                            <li class="list-group-item">
                                <div class="mb-3">
                                    Reply as Inbox Email
                                    <label class="switch ml-2 mr-2">
                                        <input type="checkbox" id="replyAsAlias">
                                        <span class="slider round"></span>
                                    </label>
                                    Reply as Alias
                                </div>

                                <div class="d-none" id="no-aliases">
                                </div>
                                <div class="col-8" id="alias-list">
                                    <ul class="list-group"><li class="list-group-item d-flex align-items-center justify-content-between hw_alias" id="alias-204881">
            <div class="d-flex col-4 flex-column align-items-start justify-content-between">
                <span>Vibhor Agrawal</span>
                <span>vibhor@helpwise.io</span>
            </div>
            
        <div class="col-4 text-center">
            <span class="verified text-success">Verified<span>
        </span></span></div>
            <div class="d-flex col-4 align-items-center justify-content-end">
                
                <span class="deleteAlias" style="cursor:pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                <span>
            </span></span></div>
        </li></ul>
                                </div>
                                <div class="mt-3">
                                    <button id="add-alias" data-toggle="modal" data-target="#createAliasModal" class="btn btn-primary btn-xs">Add an Alias</button>
                                </div>
                            </li>
                        </ul>
                        <ul id="reconnect_fb" class="list-group mg-t-30" style="width: 90%; display: none;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>Reauthorize Facebook</strong> | Reconnect
                            </li>
                            <li class="list-group-item" style="background-color: white;">
                                <div class="form-group mb-1">
                                    <button class="btn btn-xs btn-primary" id="reauthorize_fb"><i class="fab fa-facebook mr-2"></i>Reauthorize</button>
                                </div>
                            </li>
                        </ul>
                        <ul id="helpcenter-tab" class="list-group mg-t-30" style="width: 90%; display: none;">
                            <li class="list-group-item" style="background-color: #eef0f7;">
                                <strong>Help Center</strong> | Configure a Help Center with inbox
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-4">
                                        <select id="helpCenterOptions">
                                            <option value="204376">All Helpcenter</option>
                                            <option value="204375">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-4">
                                        <button class="btn btn-xs btn-primary" id="saveConnectedHelpcenter">Save</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul id="signature-tab" class="list-group mg-t-30" style="width: 90%;">
                            <li class="list-group-item" style="background-color: #eef0f7;"><strong>Your
                                    Signature</strong></li>
                            <li class="list-group-item">
                                <div class="container d-flex align-items-start justify-content-center flex-column" id="signature-container">
                                    <ul class="nav nav-line" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="plain-tab" data-toggle="tab" href="#plain" role="tab" aria-controls="plain" aria-selected="true">Plain</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="html-tab" data-toggle="tab" href="#html" role="tab" aria-controls="html" aria-selected="false">HTML</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content bd bd-gray-300 bd-t-0 pd-20" id="myTabContent" style="border: none;padding-left:0px;width:40%">
                                        <div class="tab-pane fade show active" id="plain" role="tabpanel" aria-labelledby="plain-tab">
                                            <div id="signature-editor" class="fr-box fr-basic fr-bottom" role="application"><div class="fr-wrapper" dir="auto" style="max-height: 200px; overflow: auto;"><div class="fr-element fr-view" dir="auto" contenteditable="true" aria-disabled="false" style="min-height: 150px;" spellcheck="true">--<br>Regards,<br>Masood Muhammad</div><span class="fr-placeholder" style="font-size: 14px; line-height: 22.4px; margin-top: 0px; padding-top: 20px; padding-left: 20px; margin-left: 0px; padding-right: 20px; margin-right: 0px; text-align: left;">Type something</span></div><div class="fr-toolbar fr-desktop fr-bottom fr-basic" style=""><div class="fr-more-toolbar" data-name="moreText-1"><button id="textColor-1" type="button" tabindex="-1" role="button" title="Text Color" class="fr-command fr-btn" data-cmd="textColor" data-popup="true"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.2,13.494s-3.6,3.9-3.6,6.3a3.65,3.65,0,0,0,7.3.1v-.1C18.9,17.394,15.2,13.494,15.2,13.494Zm-1.47-1.357.669-.724L12.1,5h-2l-5,14h2l1.43-4h2.943A24.426,24.426,0,0,1,13.726,12.137ZM11.1,7.8l1.86,5.2H9.244Z"></path></svg><span class="fr-sr-only">Text Color</span></button><button id="fontFamily-1" type="button" tabindex="-1" role="button" aria-controls="dropdown-menu-fontFamily-1" aria-expanded="false" aria-haspopup="true" title="Font Family" class="fr-command fr-btn fr-dropdown fr-selection" data-cmd="fontFamily"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16,19h2L13,5H11L6,19H8l1.43-4h5.14Zm-5.86-6L12,7.8,13.86,13Z"></path></svg><span class="fr-sr-only">Font Family</span></button><div id="dropdown-menu-fontFamily-1" class="fr-dropdown-menu" role="listbox" aria-labelledby="fontFamily-1" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation"><ul class="fr-dropdown-list" role="presentation"><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="Arial,Helvetica,sans-serif" style="font-family: Arial,Helvetica,sans-serif" title="Arial">Arial</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="'Arial Black',Helvetica,sans-serif" style="font-family: 'Arial Black',Helvetica,sans-serif" title="Arial Black">Arial Black</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="'Comic Sans MS',Helvetica,sans-serif" style="font-family: 'Comic Sans MS',Helvetica,sans-serif" title="Comic Sans MS">Comic Sans MS</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="'Courier New',Helvetica,sans-serif" style="font-family: 'Courier New',Helvetica,sans-serif" title="Courier New">Courier New</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="Georgia,serif" style="font-family: Georgia,serif" title="Georgia">Georgia</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="Impact,Charcoal,sans-serif" style="font-family: Impact,Charcoal,sans-serif" title="Impact">Impact</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="'Lucida Grande',Charcoal,sans-serif" style="font-family: 'Lucida Grande',Charcoal,sans-serif" title="Lucida Grande">Lucida Grande</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="sans-serif" style="font-family: sans-serif" title="Sans Serif">Sans Serif</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="Tahoma,Geneva,sans-serif" style="font-family: Tahoma,Geneva,sans-serif" title="Tahoma">Tahoma</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="'Times New Roman',Times,serif" style="font-family: 'Times New Roman',Times,serif" title="Times New Roman">Times New Roman</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="Verdana,Geneva,sans-serif" style="font-family: Verdana,Geneva,sans-serif" title="Verdana">Verdana</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontFamily" data-param1="'IBM Plex Sans',Helvetica,sans-serif" style="font-family: 'IBM Plex Sans',Helvetica,sans-serif" title="IBM Plex Sans">IBM Plex Sans</a></li></ul></div></div></div><button id="backgroundColor-1" type="button" tabindex="-1" role="button" title="Background Color" class="fr-command fr-btn" data-cmd="backgroundColor" data-popup="true"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.91752,12.24082l7.74791-5.39017,1.17942,1.29591-6.094,7.20747L9.91752,12.24082M7.58741,12.652l4.53533,4.98327a.93412.93412,0,0,0,1.39531-.0909L20.96943,8.7314A.90827.90827,0,0,0,20.99075,7.533l-2.513-2.76116a.90827.90827,0,0,0-1.19509-.09132L7.809,11.27135A.93412.93412,0,0,0,7.58741,12.652ZM2.7939,18.52772,8.41126,19.5l1.47913-1.34617-3.02889-3.328Z"></path></svg><span class="fr-sr-only">Background Color</span></button><button id="fontSize-1" type="button" tabindex="-1" role="button" aria-controls="dropdown-menu-fontSize-1" aria-expanded="false" aria-haspopup="true" title="Font Size" class="fr-command fr-btn fr-dropdown fr-selection" data-cmd="fontSize"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.75,19h1.5l-3-10h-1.5l-3,10h1.5L17,16.5h3Zm-3.3-4,1.05-3.5L19.55,15Zm-5.7,4h2l-5-14h-2l-5,14h2l1.43-4h5.14ZM5.89,13,7.75,7.8,9.61,13Z"></path></svg><span class="fr-sr-only">Font Size</span></button><div id="dropdown-menu-fontSize-1" class="fr-dropdown-menu" role="listbox" aria-labelledby="fontSize-1" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation"><ul class="fr-dropdown-list" role="presentation"><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="8px" title="8">8</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="9px" title="9">9</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="10px" title="10">10</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="11px" title="11">11</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="12px" title="12">12</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="14px" title="14">14</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="18px" title="18">18</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="24px" title="24">24</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="30px" title="30">30</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="36px" title="36">36</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="48px" title="48">48</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="60px" title="60">60</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="72px" title="72">72</a></li><li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="fontSize" data-param1="96px" title="96">96</a></li></ul></div></div></div></div><div class="fr-more-toolbar" data-name="moreRich-1"><button id="insertImage-1" type="button" tabindex="-1" role="button" title="Insert Image (Ctrl+P)" class="fr-command fr-btn" data-cmd="insertImage" data-popup="true"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.2,11l3.8,5H6l3-3.9l2.1,2.7L14,11H14.2z M8.5,11c0.8,0,1.5-0.7,1.5-1.5S9.3,8,8.5,8S7,8.7,7,9.5C7,10.3,7.7,11,8.5,11z   M22,6v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,8.8V6H4v12h16V8.8z"></path></svg><span class="fr-sr-only">Insert Image</span></button></div><div class="fr-newline"></div><div class="fr-btn-grp fr-float-left"><button id="bold-1" type="button" tabindex="-1" role="button" aria-pressed="false" title="Bold (Ctrl+B)" class="fr-command fr-btn" data-cmd="bold"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.25,11.8h0A3.68,3.68,0,0,0,17,9a3.93,3.93,0,0,0-3.86-4H6.65V19h7a3.74,3.74,0,0,0,3.7-3.78V15.1A3.64,3.64,0,0,0,15.25,11.8ZM8.65,7h4.2a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61,2.23,2.23,0,0,1-.63.09H8.65Zm4.6,10H8.65V13h4.6a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61A2.23,2.23,0,0,1,13.25,17Z"></path></svg><span class="fr-sr-only">Bold</span></button><button id="underline-1" type="button" tabindex="-1" role="button" aria-pressed="false" title="Underline (Ctrl+U)" class="fr-command fr-btn" data-cmd="underline"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,20v2H5V20Zm-3-6.785a4,4,0,0,1-5.74,3.4A3.75,3.75,0,0,1,8,13.085V5.005H6v8.21a6,6,0,0,0,8,5.44,5.851,5.851,0,0,0,4-5.65v-8H16ZM16,5v0h2V5ZM8,5H6v0H8Z"></path></svg><span class="fr-sr-only">Underline</span></button><button id="italic-1" type="button" tabindex="-1" role="button" aria-pressed="false" title="Italic (Ctrl+I)" class="fr-command fr-btn" data-cmd="italic"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.76,9h2l-2.2,10h-2Zm1.68-4a1,1,0,1,0,1,1,1,1,0,0,0-1-1Z"></path></svg><span class="fr-sr-only">Italic</span></button><button id="moreText-1" data-group-name="moreText-1" type="button" tabindex="-1" role="button" title="More Text" class="fr-command fr-btn" data-cmd="moreText"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.55,19h2l-5-14h-2l-5,14h2l1.4-4h5.1Zm-5.9-6,1.9-5.2,1.9,5.2Zm12.8,4.5a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,17.5Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,13.5Zm0-4A1.5,1.5,0,1,1,18.95,8,1.5,1.5,0,0,1,20.45,9.5Z"></path></svg><span class="fr-sr-only">More Text</span></button></div><div class="fr-btn-grp fr-float-left"><button id="insertLink-1" type="button" tabindex="-1" role="button" title="Insert Link (Ctrl+K)" class="fr-command fr-btn" data-cmd="insertLink" data-popup="true"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11,17H7A5,5,0,0,1,7,7h4V9H7a3,3,0,0,0,0,6h4ZM17,7H13V9h4a3,3,0,0,1,0,6H13v2h4A5,5,0,0,0,17,7Zm-1,4H8v2h8Z"></path></svg><span class="fr-sr-only">Insert Link</span></button><button id="moreRich-1" data-group-name="moreRich-1" type="button" tabindex="-1" role="button" title="More Rich" class="fr-command fr-btn" data-cmd="moreRich"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.5,13h-6v6h-2V13h-6V11h6V5h2v6h6Zm5,4.5A1.5,1.5,0,1,1,20,16,1.5,1.5,0,0,1,21.5,17.5Zm0-4A1.5,1.5,0,1,1,20,12,1.5,1.5,0,0,1,21.5,13.5Zm0-4A1.5,1.5,0,1,1,20,8,1.5,1.5,0,0,1,21.5,9.5Z"></path></svg><span class="fr-sr-only">More Rich</span></button></div></div></div>
                                        </div>
                                        <div class="tab-pane fade" id="html" role="tabpanel" aria-labelledby="html-tab">
                                            <textarea name="" id="signature-editor-html" rows="8" cols="30"></textarea>
                                        </div>
                                    </div>
                                    <button id="save-signature-btn" class="btn btn-primary btn-sm mt-2">Save</button>
                                </div>
                            </li>
                        </ul>
                        <ul id="remove-inbox-tab" class="list-group mg-t-30" style="width: 90%;">
                            <li class="list-group-item" style="background-color: #fc7978; color:white;">Danger Area</li>
                            <li class="list-group-item">
                                <div class="d-flex align-items-end justify-content">
                                    <span class="remove-inbox delete-mailboxe-inboxes tx-color-03" style="cursor:pointer;" id="delete-mailbox-204420">
                                        Remove Inbox
                                    </span>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
</template>

<script>
export default {
    name: 'SCSettingsContent'
}
</script>

<style>

</style>