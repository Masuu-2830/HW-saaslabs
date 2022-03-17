<template>
    <div class="df-settings-body pd-l-10 pd-r-15">
        <div class="pd-t-20">
            <label class="tx-sans tx-10 tx-uppercase tx-bold tx-spacing-1 tx-color-02 mg-b-15">{{ integrationName }}</label>
            <!-- <div class="d-flex align-items-start" :id="integration_data.lname + '-loading-window'">
                <div class="spinner-border spinner-border-sm mg-r-10" role="status"></div>
                <p :class="integration_data.lname + '_main_loading'" style="color: grey">Data Loading...</p>
            </div> -->
            <p class="integration_main_loading" style="display: none;color: grey">Loading...</p>
        </div>
        <div class="integration-data">
            <div v-if="!dataStatus">
                <p style="padding:5px;color:#4f5d6b;">{{ errorMsg }}<br>
                </p> 
            </div>
            <div v-else>
                <div v-for= "(sidebar, index) in sidebarData.fetch"
                :key = "index">

                    <!-- Component for CRM -->
                    <div class="pd-y-10" v-if= "sidebar.type == 'crm' || sidebar.type == 'custom-app'">
                        <div class="integration-collapse-body shadow-sm bg-white rounded" style="border-style: solid;border-width: thin;border-color: rgb(210, 210, 210);">
                            <div class="collapse-header row custom-header" style="cursor: pointer;">
                                <div class="col-8">
                                    <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                        <i :class="sidebar.icon"></i>
                                        <span class="text-truncate" style="max-width:135px;display:inline_block;white-space:initial;margin-left:5px;margin-right:5px;">{{ sidebar.title }}</span>
                                        <i v-if="sidebar.update==1 && sidebar.component_type=='single'" class="fas fa-xs fa-pen" :class="integrationName + '_' + sidebar.class + '_edit_button'" @click="openUpdateForm(sidebar.class, sidebar.components[0], integrationName)"></i>
                                    </p>  
                                </div>
                                <div class="col-4 pd-t-15" @click="collapseHeader('.' + sidebar.class + '_integration_collapsible')">
                                    <p class="integration_collapse_header pd-r-10 text-right">
                                        <i class="fas fa-caret-up" :class="sidebar.class + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="pd-l-0 pd-b-1 collapse show" :class="sidebar.class + '_integration_collapsible'"  style="word-wrap: break-word;line-height: 1.5;">
                                
                                <!-- Single Component -->
                                <div v-if="sidebar.component_type == 'single'" class="col s12">
                                    <p v-for= "(component, index) in sidebar.components[0]"
                                        :key = "index"
                                    >
                                        <span v-if="(component.type=='text'  || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='tags' || component.type=='email' || component.type=='dropdown_api') && component.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">
                                            {{ component.label }}
                                        </span>
                                        <br v-if="(component.type=='text' || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='tags' || component.type=='tags' || component.type=='email' || component.type=='dropdown_api') && component.show == 1">
                                        <span v-if="(component.type=='text'  || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='email' || component.type=='dropdown_api') && component.show == 1" style="color:#4f5d6b;font-size:13px;">
                                            {{component.value ? component.value : 'No ' + component.label}}
                                        </span>
                                        <span v-else-if="component.type=='link' && component.show == 1">
                                            <a :href="component.value" target="_blank">{{component.label}}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        </span>
                                        <span v-else-if="(component.type=='button' || component.type=='api_button') && component.show == 1">
                                            <button type="button" class="mb-2 btn btn-xs btn-primary" :class="component.class" @click="buttonFunction(component.api, integrationName, integrationID, sidebar.components[0], '')">{{ component.label }}</button>
                                        </span>
                                        <span v-else-if="component.type=='link_button' && component.show == 1">
                                            <a :href="component.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="component.class">{{ component.label }}</button></a>
                                        </span>
                                        <span v-else-if="component.type=='tags' && component.show == 1">
                                            <span v-for= "(tag, index) in component.value"
                                            :key= "index"
                                            >
                                                <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                            </span>
                                        </span>
                                        <span v-else-if="(component.type=='single_component' || component.type=='multiple_component') && component.show == 1">
                                            <div class="collapse-body shadow-sm bg-white rounded mg-y-10" style="border-style: solid; border-width: thin; border-color: rgb(210, 210, 210);">
                                                <div class="collapse-header row custom-header" style="cursor: pointer;">
                                                    <div class="col-8">
                                                        <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                                            {{ component.label }}
                                                        </p>  
                                                    </div>
                                                    <div class="col-4 pd-t-15" @click="collapseHeader('.' + component.class + sidebar.components[0][0].value + '_integration_collapsible')">
                                                        <p class="integration_collapse_header pd-r-10 text-right">
                                                            <i class="fas fa-caret-up" :class="component.class +  sidebar.components[0][0].value + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="pd-l-0 pd-b-1 collapse show" :class="component.class + sidebar.components[0][0].value + '_integration_collapsible'"  style="word-wrap: break-word;line-height: 1.5;">
                                                    <!-- Single Component -->
                                                    <div v-if="component.type == 'single_component'" class="col s12">
                                                        <p v-for= "(comp, index) in component.value"
                                                            :key = "index"
                                                        >
                                                            <span v-if="(comp.type=='text'  || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list' || comp.type=='email') && comp.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ comp.label }}</span><br v-if="(comp.type=='text' || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list' || comp.type=='email') && comp.show == 1">
                                                            <span v-if="(comp.type=='text'  || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='email') && comp.show == 1" style="color:#4f5d6b;font-size:13px;">{{comp.value ? comp.value : 'No ' + comp.label}}</span>
                                                            <span v-else-if="comp.type=='link' && comp.show == 1">
                                                                <a :href="comp.value" target="_blank">{{comp.label}}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                        <polyline points="15 3 21 3 21 9"></polyline>
                                                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                    </svg>
                                                                </a>
                                                            </span>
                                                            <span v-else-if="(comp.type=='button' || comp.type=='api_button') && comp.show == 1">
                                                                <button type="button" class="mb-2 btn btn-xs btn-primary" :class="comp.class" @click="buttonFunction(comp.api, integrationName, integrationID, component, '')">{{ comp.label }}</button>
                                                            </span>
                                                            <span v-else-if="comp.type=='link_button' && comp.show == 1">
                                                                <a :href="comp.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="comp.class">{{ comp.label }}</button></a>
                                                            </span>
                                                            <span v-else-if="comp.type=='tags' && comp.show == 1">
                                                                <span v-for= "(tag, index) in comp.value"
                                                                :key= "index"
                                                                >
                                                                    <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                                </span>
                                                            </span>
                                                        </p>                  
                                                    </div>

                                                    <!-- Multiple Component -->
                                                    <div v-else-if="component.type == 'multiple_component'" class="pd-5">
                                                        <div class="card rounded mg-b-10" v-for= "(compo, index) in component.value"
                                                        :key= "index"
                                                        >
                                                            <div class="d-flex align-items-center justify-content-between bg-gray-100" style="padding: 15px;">
                                                                <span style="font-size:13px;">{{ compo[1].value }}</span>    
                                                                <div>
                                                                    <!-- <span style="cursor:pointer;" :class="integrationName + '_edit_' + sidebar.class + '_button'" class="mg-r-10" v-if="sidebar.update == 1" @click="openUpdateForm(sidebar.class, component, integrationName)"><i class="fas fa-pen fa-xs"></i></span> -->
                                                                    <span style="cursor:pointer;" @click="collapseHeader('.' + integrationName + '_' + component.class + '_' + compo[0].value)">
                                                                        <i class="fas fa-caret-down" :class="integrationName + '_' + component.class + '_' + compo[0].value + '_caret'" style="color: silver;border-radius:5px;"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="mg-l-10 mg-r-10 collapse" :class="integrationName + '_' + component.class + '_' + compo[0].value">
                                                                <p v-for= "(com, index) in compo"
                                                                    :key = "index"
                                                                >   
                                                                    <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags' || com.type=='list') && com.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ com.label }}</span><br v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags' || com.type=='list') && com.show == 1">
                                                                    <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number') && com.show == 1" style="color:#4f5d6b;font-size:13px;">{{com.value ? com.value : 'No ' + com.label}}</span>
                                                                    <span v-else-if="com.type=='link' && com.show == 1">
                                                                        <a :href="com.value" target="_blank">{{com.label}}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                            </svg>
                                                                        </a>
                                                                    </span>
                                                                    <span v-else-if="com.type=='link_button' && com.show == 1">
                                                                        <a :href="com.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="com.class">{{ com.label }}</button></a>
                                                                    </span>
                                                                    <span v-else-if="com.type=='tags' && com.show == 1">
                                                                        <span v-for= "(tag, index) in com.value"
                                                                        :key= "index"
                                                                        >
                                                                            <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                                        </span>
                                                                    </span>
                                                                </p>  
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </span>
                                    </p>                  
                                </div>

                                <!-- Multiple Component -->
                                <div v-else-if="sidebar.component_type == 'multiple'" class="pd-5">
                                    <div class="card rounded mg-b-10" v-for= "(component, index) in sidebar.components"
                                        :key= "index"
                                    >
                                        <div class="d-flex align-items-center justify-content-between bg-gray-100" style="padding: 15px;">
                                            <span style="font-size:13px;">{{ component[1].value }}</span>    
                                            <div>
                                                <span style="cursor:pointer;" :class="integrationName + '_edit_' + sidebar.class + '_button'" class="mg-r-10" v-if="sidebar.update == 1" @click="openUpdateForm(sidebar.class, component, integrationName)"><i class="fas fa-pen fa-xs"></i></span>
                                                <span style="cursor:pointer;" @click="collapseHeader('.' + integrationName + '_' + sidebar.class + '_' + component[0].value)"><i class="fas fa-caret-down" :class="integrationName + '_' + sidebar.class + '_' + component[0].value + '_caret'" style="color: silver;border-radius:5px;"></i></span>
                                            </div>
                                        </div>
                                        <div class="mg-l-10 mg-r-10 collapse" :class="integrationName + '_' + sidebar.class + '_' + component[0].value">
                                            <p v-for= "(com, index) in component"
                                                :key = "index"
                                            >   
                                                <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='dropdown_api' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags') && com.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ com.label }}</span><br v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='dropdown_api' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags') && com.show == 1">
                                                <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='dropdown_api' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number') && com.show == 1" style="color:#4f5d6b;font-size:13px;">{{com.value ? com.value : 'No ' + com.label}}</span>
                                                <span v-else-if="com.type=='link' && com.show == 1">
                                                    <a :href="com.value" target="_blank">{{com.label}}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                            <polyline points="15 3 21 3 21 9"></polyline>
                                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                                        </svg>
                                                    </a>
                                                </span>
                                                <span v-else-if="com.type=='link_button' && com.show == 1">
                                                    <a :href="com.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="com.class">{{ com.label }}</button></a>
                                                </span>
                                                <span v-else-if="com.type=='tags' && com.show == 1">
                                                    <span v-for= "(tag, index) in com.value"
                                                    :key= "index"
                                                    >
                                                        <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                    </span>
                                                </span>
                                                <span v-else-if="(com.type=='single_component' || com.type=='multiple_component')">
                                                    <div class="collapse-body shadow-sm bg-white rounded mg-y-10" style="border-style: solid; border-width: thin; border-color: rgb(210, 210, 210);">
                                                        <div class="collapse-header row custom-header" style="cursor: pointer;">
                                                            <div class="col-8">
                                                                <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                                                    {{ com.label }}
                                                                </p>  
                                                            </div>
                                                            <div class="col-4 pd-t-15" @click="collapseHeader('.' + com.class + component[0].value + '_integration_collapsible')">
                                                                <p class="integration_collapse_header pd-r-10 text-right">
                                                                    <i class="fas fa-caret-up" :class="com.class + component[0].value + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div class="pd-l-0 pd-b-1 collapse show" :class="com.class + component[0].value + '_integration_collapsible'"  style="word-wrap: break-word;line-height: 1.5;">
                                                            <!-- Single Component -->
                                                            <div v-if="com.type == 'single_component'" class="col s12">
                                                                <p v-for= "(comp, index) in com.value"
                                                                    :key = "index"
                                                                >
                                                                    <span v-if="(comp.type=='text'  || comp.type=='dropdown' || comp.type=='dropdown_api' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list' || comp.type=='email') && comp.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ comp.label }}</span><br v-if="(comp.type=='text' || comp.type=='dropdown' || comp.type=='dropdown_api' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list' || comp.type=='email') && comp.show == 1">
                                                                    <span v-if="(comp.type=='text'  || comp.type=='dropdown' || comp.type=='dropdown_api' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='email') && comp.show == 1" style="color:#4f5d6b;font-size:13px;">{{comp.value ? comp.value : 'No ' + comp.label}}</span>
                                                                    <span v-else-if="comp.type=='link' && comp.show == 1">
                                                                        <a :href="comp.value" target="_blank">{{comp.label}}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                            </svg>
                                                                        </a>
                                                                    </span>
                                                                    <span v-else-if="(comp.type=='button' || comp.type=='api_button') && comp.show == 1">
                                                                        <button type="button" class="mb-2 btn btn-xs btn-primary" :class="comp.class" @click="buttonFunction(comp.api, integrationName, integrationID, com, '')">{{ comp.label }}</button>
                                                                    </span>
                                                                    <span v-else-if="comp.type=='link_button' && comp.show == 1">
                                                                        <a :href="comp.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="comp.class">{{ comp.label }}</button></a>
                                                                    </span>
                                                                    <span v-else-if="comp.type=='tags' && comp.show == 1">
                                                                        <span v-for= "(tag, index) in comp.value"
                                                                        :key= "index"
                                                                        >
                                                                            <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                                        </span>
                                                                    </span>
                                                                </p>                  
                                                            </div>

                                                            <!-- Multiple Component -->
                                                            <div v-else-if="com.type == 'multiple_component' && com.value.length!=0" class="pd-5">
                                                                <div class="card rounded mg-b-10" v-for= "(compo, index) in com.value"
                                                                :key= "index"
                                                                >
                                                                    <div class="d-flex align-items-center justify-content-between bg-gray-100" style="padding: 15px;">
                                                                        <span style="font-size:13px;">{{ compo[1].value }}</span>    
                                                                        <div>
                                                                            <!-- <span style="cursor:pointer;" :class="integrationName + '_edit_' + sidebar.class + '_button'" class="mg-r-10" v-if="sidebar.update == 1" @click="openUpdateForm(sidebar.class, component, integrationName)"><i class="fas fa-pen fa-xs"></i></span> -->
                                                                            <span style="cursor:pointer;" @click="collapseHeader('.' + integrationName + '_' + com.class + '_' + compo[0].value)">
                                                                                <i class="fas fa-caret-down" :class="integrationName + '_' + com.class + '_' + compo[0].value + '_caret'" style="color: silver;border-radius:5px;"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="mg-l-10 mg-r-10 collapse" :class="integrationName + '_' + com.class + '_' + compo[0].value">
                                                                        <p v-for= "(comp, index) in compo"
                                                                            :key = "index"
                                                                        >   
                                                                            <span v-if= "(comp.type=='text' || comp.type=='dropdown' || comp.type=='dropdown_api' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list') && comp.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ comp.label }}</span><br v-if= "(comp.type=='text' || comp.type=='dropdown' || comp.type=='dropdown_api' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list') && comp.show == 1">
                                                                            <span v-if= "(comp.type=='text' || comp.type=='dropdown' || comp.type=='dropdown_api' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number') && comp.show == 1" style="color:#4f5d6b;font-size:13px;">{{comp.value ? comp.value : 'No ' + comp.label}}</span>
                                                                            <span v-else-if="comp.type=='link' && comp.show == 1">
                                                                                <a :href="comp.value" target="_blank">{{comp.label}}
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                                        <polyline points="15 3 21 3 21 9"></polyline>
                                                                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                                    </svg>
                                                                                </a>
                                                                            </span>
                                                                            <span v-else-if="comp.type=='link_button' && comp.show == 1">
                                                                                <a :href="comp.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="comp.class">{{ comp.label }}</button></a>
                                                                            </span>
                                                                            <span v-else-if="comp.type=='tags' && comp.show == 1">
                                                                                <span v-for= "(tag, index) in comp.value"
                                                                                :key= "index"
                                                                                >
                                                                                    <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                                                </span>
                                                                            </span>
                                                                        </p>  
                                                                    </div>
                                                                </div>

                                                                <!-- create inner component form -->
                                                                <div class="col s12 mg-b-10 mg-t-10" v-if="sidebarData.create[com.class]" style="text-align: center;">
                                                                    <button type="button" :class="integrationName + '_add_' + com.class + '_btn'" class="btn btn-xs btn-secondary" @click="openCreateForm(com.class)">Add
                                                                        {{ capitalizeFirstLetter(com.label) }}
                                                                    </button>
                                                                </div>
                                                                <div class="col s12 pd-x-0" :class="integrationName + '_create_' + com.class + '_form'" v-if="sidebarData.create[com.class] && openCreateFormArrayInternal[com.class]">
                                                                    <form :class="'create_'+com.class+'_form_field'">
                                                                        <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                                                            <div v-for = "(createComponent, index) in sidebarData.create[com.class].components"
                                                                                :key = "index"
                                                                                class="form-group">
                                                                                <label v-if="createComponent.type!='button' && createComponent.type!='input_field'" class="d-block">{{ createComponent.label }}</label>
                                                                                <input v-if="createComponent.type == 'text' || createComponent.type == 'number'" min="0" :max="createComponent.type == 'number' ? createComponent.max : ''" :type="createComponent.type" class="form-control" :class="integrationName + '_create_' + com.class + '_' + createComponent.class"
                                                                                :placeholder="createComponent.placeholder">
                                                                                <input v-else-if="createComponent.type == 'email'" type="email" class="form-control" :class="integrationName + '_create_' + com.class + '_' + createComponent.class" :value="createComponent.value" readonly="true">
                                                                                <select v-if="createComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_create_' + com.class + '_'  + createComponent.class">
                                                                                    <option v-for= "(option, index) in createComponent.dropdown"
                                                                                    :key= "index"
                                                                                    :value="option.value">{{ option.label }}
                                                                                    </option>
                                                                                </select>
                                                                                <select v-if="createComponent.type == 'dropdown_api'" class="form-control custom-select" :class="integrationName + '_create_' + com.class + '_'  + createComponent.class" @change="callRandomApi(integrationName, createComponent.class, createComponent.api, integrationID, createComponent.attributes, createComponent.email, $event, 'create', com.class, createComponent.type, '')">
                                                                                    <option v-for= "(option, index) in createComponent.dropdown"
                                                                                    :key= "index"
                                                                                    :value="option.value">{{ option.label }}
                                                                                    </option>
                                                                                </select>
                                                                                <span v-else-if="createComponent.type=='date'">
                                                                                    <date-picker :class="integrationName + '_create_' + com.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="date" v-model="date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                                                                </span>
                                                                                <span v-else-if="createComponent.type=='time'">
                                                                                    <date-picker :class="integrationName + '_create_' + com.class + '_'  + createComponent.class" :open.sync="newTimeOpen" @change="handleChange2" type="time" v-model="time" value-type="timestamp" :showSecond="false" :disabled-time="notBeforeNow" placeholder="Select Time" :clearable="false" style="width: 100%;"></date-picker>
                                                                                </span>
                                                                                <span v-else-if="createComponent.type=='datetime'">
                                                                                    <date-picker :class="integrationName + '_create_' + com.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                                                                </span>
                                                                                <div class="invalid-feedback" :class="integrationName + '-create-' + com.class + '-' + createComponent.class + '-error'"></div>
                                                                            </div>
                                                                            
                                                                            <div :class="integrationName + '-create-' + com.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                                                <button type="button"
                                                                                    class="btn btn-xs btn-primary" @click="createCustomData(com.class, sidebarData.create[com.class].components, integrationName, integrationID, com, component[0].value)">Create
                                                                                </button>
                                                                                <button type="button"
                                                                                    class="btn btn-xs btn-secondary" @click="openCreateForm(com.class)">Cancel
                                                                                </button>
                                                                            </div>
                                                                        </fieldset>
                                                                    </form>
                                                                </div>
                                                            </div>

                                                            <div v-if="com.type == 'multiple_component' && com.value.length == 0" class="pd-5">
                                                                <p style="color:#4f5d6b;">{{ com.text }}</p>
                                                                <p v-if="sidebarData.create[com.class] && !openCreateFormArrayInternal[com.class]" style="color:#0168fa; cursor:pointer;" @click="openCreateForm(com.class)">Create new {{ com.class }}</p>
                                                            </div>

                                                        </div>
                                                    </div> 
                                                </span>
                                            </p>  
                                        </div>
                                    </div>
                                </div>

                                <!-- No Component -->
                                <div v-if="sidebar.component_type == 'no'" class="col s12" :class="'no_' + sidebar.class + '_component'">
                                    <p style="color:#4f5d6b;">{{ sidebar.text }}</p>
                                    <p v-if="sidebarData.create[sidebar.class] && !openCreateFormArrayInternal[sidebar.class]" style="color:#0168fa; cursor:pointer;" @click="openCreateForm(sidebar.class)">Create new {{ sidebar.class }}</p>
                                </div>

                                <!-- Create Button for Multiple Component -->
                                <div class="col s12 mg-b-10" v-if="sidebar.component_type == 'multiple' && sidebarData.create[sidebar.class]" style="text-align: center;">
                                    <button type="button" :class="integrationName + '_add_' + sidebar.class + '_btn'" class="btn btn-xs btn-secondary" @click="openCreateForm(sidebar.class)">New
                                        {{ capitalizeFirstLetter(sidebar.class) }}
                                    </button>
                                </div>

                                <!-- Create Form -->
                                <div class="col s12 pd-x-0" :class="integrationName + '_create_' + sidebar.class + '_form'" v-if="sidebarData.create[sidebar.class] && openCreateFormArrayInternal[sidebar.class]">
                                    <form :class="'create_'+sidebar.class+'_form_field'">
                                        <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                            <div v-for = "(createComponent, index) in sidebarData.create[sidebar.class].components"
                                                :key = "index"
                                                class="form-group">
                                                <label v-if="createComponent.type!='button' && createComponent.type!='input_field' && createComponent.type!='add_field'" class="d-block">{{ createComponent.label }}</label>
                                                <input v-if="createComponent.type == 'text' || createComponent.type == 'number'" min="0" :max="createComponent.type == 'number' ? createComponent.max : ''" :type="createComponent.type" class="form-control" :class="integrationName + '_create_' + sidebar.class + '_' + createComponent.class"
                                                :placeholder="createComponent.placeholder">
                                                <input v-else-if="createComponent.type == 'email'" type="email" class="form-control" :class="integrationName + '_create_' + sidebar.class + '_' + createComponent.class" :value="createComponent.value" readonly="true">
                                                <select v-if="createComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class">
                                                    <option v-for= "(option, index) in createComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <select v-if="createComponent.type == 'dropdown_api'" class="form-control custom-select" :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" @change="callRandomApi(integrationName, createComponent.class, createComponent.api, integrationID, createComponent.attributes, createComponent.email, $event, 'create', sidebar.class, createComponent.type, '')">
                                                    <option v-for= "(option, index) in createComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <span v-if="createComponent.type=='button'">
                                                    <div :class="'create_'+ sidebar.class + '_' + createComponent.class + '_div'">
                                                        <div v-for= "(dropdownValue, index) in randomDropdown"
                                                        :key= "index"
                                                        >
                                                            <div v-if="dropdownValue!=''" class="mg-t-10 d-flex align-items-center justify-content-between">
                                                                <div class="form-group pd-l-0" style="width: -webkit-fill-available;">
                                                                    <label class="d-block">{{ capitalizeFirstLetter(createComponent.class) }} {{ index + 1 }}</label>
                                                                    <input type="text" :name="'create_'+createComponent.name" :value="dropdownValue" class="form-control" readonly>
                                                                </div>
                                                                <div class="form-group mg-b-0 pd-l-10">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="removeRandomData(index, dropdownValue)">
                                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="mb-2 btn btn-xs btn-primary" :class="createComponent.class" @click="addRandomData(createComponent, integrationName, integrationID, sidebar.class, 'create','create_'+ sidebar.class + '_' + createComponent.class + '_div')">{{ createComponent.label }}</button>
                                                </span>
                                                <span v-if="createComponent.type=='add_field'">
                                                    <div :class="'create_'+ sidebar.class + '_' + createComponent.class + '_div'">
                                                        <div v-for= "(emailValue, index) in guestEmails"
                                                        :key= "index"
                                                        class="d-flex align-items-center justify-content-between">
                                                            <div class="form-group pd-l-0" style="width: -webkit-fill-available;">
                                                                <label class="d-block">{{ capitalizeFirstLetter(createComponent.class) }} {{ index + 1 }}</label>
                                                                <input type="text" class="form-control" :placeholder="createComponent.placeholder" :name="'create_'+createComponent.name" :value="emailValue">
                                                            </div>
                                                            <div class="form-group mg-b-0 pd-l-10">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="removeRandomData(index, emailValue)">
                                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="mb-2 btn btn-xs btn-primary" :class="createComponent.class" @click="addRandomData(createComponent, integrationName, integrationID, sidebar.class, 'create','create_'+ sidebar.class + '_' + createComponent.class + '_div')">{{ createComponent.label }}</button>
                                                </span>
                                                <span v-else-if="createComponent.type=='date'">
                                                    <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="date" v-model="date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="createComponent.type=='time'">
                                                    <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newTimeOpen" @change="handleChange2" type="time" v-model="time" value-type="timestamp" :showSecond="false" :disabled-time="notBeforeNow" placeholder="Select Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="createComponent.type=='datetime'">
                                                    <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <div class="invalid-feedback" :class="integrationName + '-create-' + sidebar.class + '-' + createComponent.class + '-error'"></div>
                                            </div>
                                            
                                            <div :class="integrationName + '-create-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                <button type="button"
                                                    class="btn btn-xs btn-primary" @click="createData(sidebar.class, sidebarData.create[sidebar.class].components, integrationName, integrationID)">Create {{sidebar.class}}
                                                </button>
                                                <button type="button"
                                                    class="btn btn-xs btn-secondary" @click="openCreateForm(sidebar.class)">Cancel
                                                </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>

                                <!-- Edit Form -->
                                <div class="col s12 pd-x-0" :class="integrationName + '_edit_' + sidebar.class + '_form'" v-if="openUpdateFormArrayInternal[sidebar.class] && sidebar.update==1">
                                    <form :class="'edit_'+sidebar.class+'_form_field'">
                                        <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                            <div v-for = "(updateComponent, index) in sidebarData.update[sidebar.class].components"
                                                :key = "index"
                                                class="form-group">
                                                <label v-if="updateComponent.type!='button' && updateComponent.type!='input_field' && updateComponent.type!='add_field'" class="d-block">{{ updateComponent.label }}</label>
                                                <input v-if="updateComponent.type == 'text' || updateComponent.type == 'number'" min="0" :max="updateComponent.type == 'number'? updateComponent.max : ''" :type="updateComponent.type" class="form-control" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class"
                                                :placeholder="updateComponent.placeholder" :value="formData[sidebar.class][updateComponent.label]">
                                                <input v-else-if="updateComponent.type == 'email'" type="email" class="form-control" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class" :value="updateComponent.value" readonly="true">
                                                <select v-if="updateComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class">
                                                    <option v-for= "(option, index) in updateComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <span v-else-if="updateComponent.type=='date'">
                                                    <date-picker :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class" :open.sync="newDateOpen" @change="handleChange" type="date" v-model="date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="updateComponent.type=='time'">
                                                    <date-picker :class="integrationName + '_edit_' + sidebar.class + '_'  + updateComponent.class" :open.sync="newTimeOpen" @change="handleChange2" type="time" v-model="time" value-type="timestamp" :showSecond="false" :disabled-time="notBeforeNow" placeholder="Select Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="updateComponent.type=='datetime'">
                                                    <date-picker :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class" :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-if="updateComponent.type=='button' || updateComponent.type=='add_field'">
                                                    <div :class="'edit_'+ sidebar.class + '_' + updateComponent.class + '_div'">
                                                        <div v-for= "(emailValue, index) in guestEmails"
                                                        :key= "index"
                                                        class="d-flex align-items-center justify-content-between">
                                                            <div class="form-group pd-l-0" style="width: -webkit-fill-available;">
                                                                <label class="d-block">{{ capitalizeFirstLetter(updateComponent.class) }} {{ index + 1 }}</label>
                                                                <input type="text" class="form-control" :placeholder="updateComponent.placeholder" :name="'edit_'+updateComponent.name" :value="emailValue">
                                                            </div>
                                                            <div class="form-group mg-b-0 pd-l-10">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="removeRandomData(index, emailValue)">
                                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="mb-2 btn btn-xs btn-primary" :class="updateComponent.class" @click="addRandomData(updateComponent, integrationName, integrationID, sidebar.class, 'edit','edit_'+ sidebar.class + '_' + updateComponent.class + '_div')">{{ updateComponent.label }}</button>
                                                </span>
                                                <div class="invalid-feedback" :class="integrationName + '-edit-' + sidebar.class + '-' + updateComponent.class + '-error'"></div>
                                            </div>
                                            
                                            <div :class="integrationName + '-edit-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                <button type="button"
                                                    class="btn btn-xs btn-primary" @click="updateData(sidebar.class, sidebarData.update[sidebar.class].components, integrationName, integrationID)">Save
                                                </button>
                                                <button type="button"
                                                    class="btn btn-xs btn-secondary" @click="openUpdateForm(sidebar.class, [], integrationName)">Cancel
                                                </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Multiple Component for Calendar -->
                    <div class="pd-y-10" v-if= "sidebar.type == 'calendar'">
                        <div class="col s12 pd-x-0">
                            <form>
                                <fieldset class="form-fieldset pd-x-0 pd-y-0" style="border: none;">
                                    <div>
                                        <label class="tx-color-03 d-block pt-2">Search Event</label>
                                        <date-picker :class="integrationName+'_search_event'" :open.sync="searchDateOpen" @change="searchEvent" type="date" v-model="search_date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                    </div> 
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <div class="pd-y-10" v-if= "sidebar.type == 'calendar'">
                        <div class="integration-collapse-body shadow-sm bg-white rounded" style="border-style: solid;border-width: thin;border-color: rgb(210, 210, 210);">
                            <div class="row integration_header" style="cursor: pointer;">
                                <div class="col-8">
                                    <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                        <i :class="sidebar.icon"></i>
                                        <span class="text-truncate" style="max-width:135px;display:inline_block;white-space:initial;margin-left:5px;margin-right:5px;">{{ sidebar.title }}</span>
                                    </p>
                                </div>
                                <div class="col-4 pd-t-15" @click="collapseHeader('.' + sidebar.class + '_integration_collapsible')">
                                    <p class="integration_collapse_header pd-r-10 text-right">
                                        <i class="fas fa-caret-up" :class="sidebar.class + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="pd-l-0 pd-b-1 collapse show" :class="sidebar.class + '_integration_collapsible'" style="word-wrap: break-word;line-height: 1.5;">
                                <!-- no component -->
                                <div v-if="sidebar.component_type == 'no'" class="col s12" :class="'no_' + sidebar.class + '_component'">
                                    <p style="color:#4f5d6b;">{{ sidebar.text }}</p>
                                </div>

                                <div v-else-if="sidebar.component_type == 'multiple'" class="pd-5">
                                    <div class="card rounded mg-b-10" v-for= "(component, index) in sidebar.components"
                                        :key= "index"
                                    >
                                        <div class="d-flex align-items-center justify-content-between bg-gray-100" style="padding: 15px;">
                                            <span style="font-size:13px;">{{ component[1].value }}</span>    
                                            <div>
                                                <span style="cursor:pointer;" :class="integrationName + '_edit_' + sidebar.class + '_button'" class="mg-r-10" v-if="sidebar.update == 1" @click="openUpdateForm(sidebar.class, component, integrationName)"><i class="fas fa-pen fa-xs"></i></span>
                                                <span style="cursor:pointer;" @click="collapseHeader('.' + integrationName + '_' + sidebar.class + '_' + component[0].value)"><i class="fas fa-caret-down" :class="integrationName + '_' + sidebar.class + '_' + component[0].value + '_caret'" style="color: silver;border-radius:5px;"></i></span>
                                            </div>
                                        </div>
                                        <div class="mg-l-10 mg-r-10 collapse" :class="integrationName + '_' + sidebar.class + '_' + component[0].value">
                                            <p v-for= "(com, index) in component"
                                                :key = "index"
                                            >   
                                                <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='datetime1' || com.type=='number' || com.type=='tags' || com.type=='list') && com.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ com.label }}</span><br v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='datetime1' || com.type=='number' || com.type=='tags' || com.type=='list') && com.show == 1">
                                                <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='datetime1') && com.show == 1" style="color:#4f5d6b;font-size:13px;">{{com.value ? com.value : 'No ' + com.label}}</span>
                                                <span v-else-if="com.type=='link' && com.show == 1">
                                                    <a :href="com.value" target="_blank">{{com.label}}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                            <polyline points="15 3 21 3 21 9"></polyline>
                                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                                        </svg>
                                                    </a>
                                                </span>
                                                <span v-else-if="com.type=='link_button' && com.show == 1">
                                                    <a :href="com.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="com.class">{{ com.label }}</button></a>
                                                </span>
                                                <span v-else-if="com.type=='tags' && com.show == 1">
                                                    <span v-for= "(tag, index) in com.value"
                                                    :key= "index"
                                                    >
                                                        <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                    </span>
                                                </span>
                                                <span v-else-if="com.type=='list' && com.show == 1">
                                                    <span v-for= "(list, index) in com.value"
                                                    :key= "index"
                                                    >
                                                        <span style="color: rgb(79, 93, 107); font-size: 13px;">{{ list.label }}</span>
                                                        <svg v-if="list.value=='accepted'" width="14" height="14">
                                                            <path fill="#CEEAD6" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                            <path fill="none" stroke="#137333" stroke-width="1.5" d="M3.5 6.5L6 9l5-5"></path>
                                                        </svg><br v-if="list.value=='accepted'">
                                                        <svg v-if="list.value=='awaiting'" width="14" height="14">
                                                            <path fill="#E8EAED" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                            <path fill="none" stroke="#3C4043" stroke-width="1.5" d="M5 5c0-1.1.9-2 2-2s2 .9 2 2-1 1.5-1.5 2S7 8 7 9M7 10v1.5"></path>
                                                        </svg><br v-if="list.value=='awaiting'">
                                                        <svg v-if="list.value=='declined'" width="14" height="14">
                                                            <path fill="#FAD2CF" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                            <path fill="none" stroke="#B31412" stroke-width="1.5" d="M4 10l6-6M10 10L4 4"></path>
                                                        </svg><br v-if="list.value=='declined'">
                                                        <br v-if="list.value==''">
                                                    </span>
                                                </span>
                                                <span v-else-if="com.type=='api_button' && com.show == 1">
                                                    <div style="border-top: #dadce0 1px solid; align-items: center; padding-top: 13px;">
                                                        <div class="d-flex justify-content-center align-items-center">
                                                            <div v-for="(button,index) in com.value"
                                                            :key="index"
                                                            role="button" class="calendar_button" :style= "button.response == 1 ? {'background-color':'#e8f0fe'} : {'background-color':'#ffffff'}">
                                                                <span style="margin: 0;display: flex;"><span style="margin: auto;" :style= "button.response == 1 ? {'color':'#1a73e8'} : {'color':'#5f6368'}" @click="buttonFunction(com.api, integrationName, integrationID, component, button.value)">{{ button.label }}</span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </span>
                                            </p>  
                                        </div>
                                    </div>
                                </div>

                                <div class="col s12 pd-x-0" :class="integrationName + '_edit_' + sidebar.class + '_form'" v-if="openUpdateFormArrayInternal[sidebar.class] && sidebar.update==1">
                                    <form :class="'edit_'+sidebar.class+'_form_field'">
                                        <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                            <div v-for = "(updateComponent, index) in sidebarData.update[sidebar.class].components"
                                                :key = "index"
                                                class="form-group">
                                                <label v-if="updateComponent.type!='button' && updateComponent.type!='input_field' && updateComponent.type!='add_field'" class="d-block">{{ updateComponent.label }}</label>
                                                <input v-model="updateComponentModal[updateComponent.class]" v-if="updateComponent.type == 'text' || updateComponent.type == 'number'" min="0" :max="updateComponent.type == 'number'? updateComponent.max : ''" :type="updateComponent.type" class="form-control" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class"
                                                :placeholder="updateComponent.placeholder" :value="formData[sidebar.class][updateComponent.label]">
                                                <input v-else-if="updateComponent.type == 'email'" type="email" class="form-control" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class" :value="updateComponent.value" readonly="true">
                                                <select v-if="updateComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class">
                                                    <option v-for= "(option, index) in updateComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <span v-if="updateComponent.type=='button'">
                                                    <div :class="'edit_'+ sidebar.class + '_' + updateComponent.class + '_div'">
                                                        <div v-for= "(emailValue, index) in guestEmails"
                                                        :key= "index"
                                                        class="d-flex align-items-center justify-content-between">
                                                            <div class="form-group pd-l-0" style="width: -webkit-fill-available;">
                                                                <label class="d-block">{{ capitalizeFirstLetter(updateComponent.class) }} {{ index + 1 }}</label>
                                                                <input type="text" class="form-control" :placeholder="updateComponent.placeholder" :name="'edit_'+updateComponent.name" :value="emailValue">
                                                            </div>
                                                            <div class="form-group mg-b-0 pd-l-10">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="removeRandomData(index, emailValue)">
                                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="mb-2 btn btn-xs btn-primary" :class="updateComponent.class" @click="addRandomData(updateComponent, integrationName, integrationID, sidebar.class, 'edit','edit_'+ sidebar.class + '_' + updateComponent.class + '_div')">{{ updateComponent.label }}</button>
                                                </span>
                                                <span v-else-if="updateComponent.type=='date'">
                                                    <date-picker :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class" :open.sync="newDateOpen" @change="handleChange" type="date" v-model="date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="updateComponent.type=='time'">
                                                    <date-picker :class="integrationName + '_edit_' + sidebar.class + '_'  + updateComponent.class" :open.sync="newTimeOpen" @change="handleChange2" type="time" v-model="time" value-type="timestamp" :showSecond="false" :disabled-time="notBeforeNow" placeholder="Select Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="updateComponent.type=='datetime'">
                                                    <date-picker :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class" :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="updateComponent.type=='datetime1'">
                                                    <date-picker :class="integrationName + '_edit_' + sidebar.class + '_'  + updateComponent.class" :open.sync="newDateOpen1" @change="handleChange1" type="datetime" v-model="datetime1" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <div class="invalid-feedback" :class="integrationName + '-edit-' + sidebar.class + '-' + updateComponent.class + '-error'"></div>
                                            </div>
                                            
                                            <div :class="integrationName + '-edit-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                <button type="button"
                                                    class="btn btn-xs btn-primary" @click="updateData(sidebar.class, sidebarData.update[sidebar.class].components, integrationName, integrationID)">Save
                                                </button>
                                                <button type="button"
                                                    class="btn btn-xs btn-secondary" @click="openUpdateForm(sidebar.class, [], integrationName)">Cancel
                                                </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- create form -->
                        <div class="col s12 mg-b-10 mg-t-10" v-if="sidebarData.create[sidebar.class]" style="text-align: center;">
                            <button type="button" :class="integrationName + '_add_' + sidebar.class + '_btn'" class="btn btn-xs btn-secondary" @click="openCreateForm(sidebar.class)">New
                                {{ capitalizeFirstLetter(sidebar.class) }}
                            </button>
                        </div>
                        <div class="col s12 pd-x-0" :class="integrationName + '_create_' + sidebar.class + '_form'" v-if="sidebarData.create[sidebar.class] && openCreateFormArrayInternal[sidebar.class]">
                            <form :class="'create_'+sidebar.class+'_form_field'">
                                <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                    <div v-for = "(createComponent, index) in sidebarData.create[sidebar.class].components"
                                        :key = "index"
                                        class="form-group">
                                        <label v-if="createComponent.type!='button' && createComponent.type!='input_field' && createComponent.type!='add_field'" class="d-block">{{ createComponent.label }}</label>
                                        <input v-if="createComponent.type == 'text' || createComponent.type == 'number'" min="0" :max="createComponent.type == 'number' ? createComponent.max : ''" :type="createComponent.type" class="form-control" :class="integrationName + '_create_' + sidebar.class + '_' + createComponent.class"
                                        :placeholder="createComponent.placeholder">
                                        <input v-else-if="createComponent.type == 'email'" type="email" class="form-control" :class="integrationName + '_create_' + sidebar.class + '_' + createComponent.class" :value="createComponent.value" readonly="true">
                                        <select v-if="createComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class">
                                            <option v-for= "(option, index) in createComponent.dropdown"
                                            :key= "index"
                                            :value="option.value">{{ option.label }}
                                            </option>
                                        </select>
                                        <span v-if="createComponent.type=='button'">
                                            <div :class="'create_'+ sidebar.class + '_' + createComponent.class + '_div'">
                                                <div v-for= "(emailValue, index) in guestEmails"
                                                :key= "index"
                                                class="d-flex align-items-center justify-content-between">
                                                    <div class="form-group pd-l-0" style="width: -webkit-fill-available;">
                                                        <label class="d-block">{{ capitalizeFirstLetter(createComponent.class) }} {{ index + 1 }}</label>
                                                        <input type="text" class="form-control" :placeholder="createComponent.placeholder" :name="'create_'+createComponent.name" :value="emailValue">
                                                    </div>
                                                    <div class="form-group mg-b-0 pd-l-10">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="removeRandomData(index, emailValue)">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" class="mb-2 btn btn-xs btn-primary" :class="createComponent.class" @click="addRandomData(createComponent, integrationName, integrationID, sidebar.class, 'create','create_'+ sidebar.class + '_' + createComponent.class + '_div')">{{ createComponent.label }}</button>
                                        </span>
                                        <span v-else-if="createComponent.type=='date'">
                                            <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="date" v-model="date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                        </span>
                                        <span v-else-if="createComponent.type=='time'">
                                            <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newTimeOpen" @change="handleChange2" type="time" v-model="time" value-type="timestamp" :showSecond="false" :disabled-time="notBeforeNow" placeholder="Select Time" :clearable="false" style="width: 100%;"></date-picker>
                                        </span>
                                        <span v-else-if="createComponent.type=='datetime'">
                                            <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                        </span>
                                        <span v-else-if="createComponent.type=='datetime1'">
                                            <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newDateOpen1" @change="handleChange1" type="datetime" v-model="datetime1" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                        </span>
                                        <div class="invalid-feedback" :class="integrationName + '-create-' + sidebar.class + '-' + createComponent.class + '-error'"></div>
                                    </div>
                                    
                                    <div :class="integrationName + '-create-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                        <button type="button"
                                            class="btn btn-xs btn-primary" @click="createData(sidebar.class, sidebarData.create[sidebar.class].components, integrationName, integrationID)">Create {{sidebar.class}}
                                        </button>
                                        <button type="button"
                                            class="btn btn-xs btn-secondary" @click="openCreateForm(sidebar.class)">Cancel
                                        </button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>

                    <!-- Component for Project Management -->
                    <div class="pd-y-10" v-if= "sidebar.type =='project_management' && sidebar.dropdown_components.length >= 0">
                        <div v-for= "(component, index) in sidebar.dropdown_components"
                        :key="index">
                            <select v-if="component.type == 'dropdown_api'" class="form-control custom-select" :class="integrationName + '_fetch_custom_' + component.class" @change="callRandomApi(integrationName, component.class, component.api, integrationID, component.attributes, component.email, $event, 'fetch', sidebar.class, component.type, '')" style="margin-top:10px;">
                                <option v-for= "(option, index) in component.value"
                                :key= "index"
                                :value="option.value">{{ option.label }}
                                </option>
                            </select>
                        </div>

                        <div v-if="sidebar.final==1" class="integration-collapse-body shadow-sm bg-white rounded mg-t-10" style="border-style: solid;border-width: thin;border-color: rgb(210, 210, 210);">
                            <div class="row integration_header" style="cursor: pointer;">
                                <div class="col-8">
                                    <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                        <i :class="sidebar.icon"></i>
                                        <span v-if="integrationName=='asana'" class="text-truncate" style="max-width:135px;display:inline_block;white-space:initial;margin-left:5px;margin-right:5px;">{{ sidebar.components[0][1]['value'] }}</span>
                                        <span v-else class="text-truncate" style="max-width:135px;display:inline_block;white-space:initial;margin-left:5px;margin-right:5px;">{{ sidebar.title }}</span>
                                        <i v-if="sidebar.update==1 && sidebar.component_type=='single'" class="fas fa-xs fa-pen" :class="integrationName + '_' + sidebar.class + '_edit_button'" @click="openUpdateForm(sidebar.class, sidebar.components[0], integrationName)"></i>
                                    </p>
                                </div>
                                <div class="col-4 pd-t-15" @click="collapseHeader('.' + sidebar.class + '_integration_collapsible')">
                                    <p class="integration_collapse_header pd-r-10 text-right">
                                        <i class="fas fa-caret-up" :class="sidebar.class + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="pd-l-0 pd-b-1 collapse show" :class="sidebar.class + '_integration_collapsible'" style="word-wrap: break-word;line-height: 1.5;">
                                <div v-if="sidebar.component_type == 'no'" class="col s12" :class="'no_' + sidebar.class + '_component'">
                                    <p style="color:#4f5d6b;">{{ sidebar.text }}</p>
                                </div>
                                <div v-else-if="sidebar.component_type == 'single'" class="col s12 integration_component_details">
                                    <p v-for= "(component, index) in sidebar.components[0]"
                                        :key = "index"
                                    >
                                        <span v-if="(component.type=='text'  || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='tags' || component.type=='list' || component.type=='email') && component.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ component.label }}</span><br v-if="(component.type=='text' || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='tags' || component.type=='list' || component.type=='email') && component.show == 1">
                                        <span v-if="(component.type=='text'  || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='email') && component.show == 1" style="color:#4f5d6b;font-size:13px;">{{component.value ? component.value : 'No ' + component.label}}</span>
                                        <span v-else-if="component.type=='link' && component.show == 1">
                                            <a :href="component.value" target="_blank">{{component.label}}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        </span>
                                        <span v-else-if="(component.type=='button' || component.type=='api_button') && component.show == 1">
                                            <button type="button" class="mb-2 btn btn-xs btn-primary" :class="component.class" @click="buttonFunction(component.api, integrationName, integrationID, sidebar.components[0], '')">{{ component.label }}</button>
                                        </span>
                                        <span v-else-if="component.type=='link_button' && component.show == 1">
                                            <a :href="component.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="component.class">{{ component.label }}</button></a>
                                        </span>
                                        <span v-else-if="component.type=='tags' && component.show == 1">
                                            <span v-for= "(tag, index) in component.value"
                                            :key= "index"
                                            >
                                                <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                            </span>
                                        </span>
                                        <span v-else-if="component.type=='list' && component.show == 1">
                                            <span v-for= "(list, index) in component.value"
                                            :key= "index"
                                            >
                                                <span style="color: rgb(79, 93, 107); font-size: 13px;">{{ list.label }}</span>
                                                <svg v-if="list.value=='accepted'" width="14" height="14">
                                                    <path fill="#CEEAD6" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                    <path fill="none" stroke="#137333" stroke-width="1.5" d="M3.5 6.5L6 9l5-5"></path>
                                                </svg><br v-if="list.value=='accepted'">
                                                <svg v-if="list.value=='awaiting'" width="14" height="14">
                                                    <path fill="#E8EAED" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                    <path fill="none" stroke="#3C4043" stroke-width="1.5" d="M5 5c0-1.1.9-2 2-2s2 .9 2 2-1 1.5-1.5 2S7 8 7 9M7 10v1.5"></path>
                                                </svg><br v-if="list.value=='awaiting'">
                                                <svg v-if="list.value=='declined'" width="14" height="14">
                                                    <path fill="#FAD2CF" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                    <path fill="none" stroke="#B31412" stroke-width="1.5" d="M4 10l6-6M10 10L4 4"></path>
                                                </svg><br v-if="list.value=='declined'">
                                                <br v-if="list.value==''">
                                            </span>
                                        </span>
                                        <span v-else-if="component.type=='api_button' && component.show == 1">
                                            <div style="border-top: #dadce0 1px solid; align-items: center; padding-top: 13px;">
                                                <div class="d-flex justify-content-center align-items-center">
                                                    <div v-for="(button,index) in component.value"
                                                    :key="index"
                                                    role="button" class="calendar_button" :style= "button.response == 1 ? {'background-color':'#e8f0fe'} : {'background-color':'#ffffff'}">
                                                        <span style="margin: 0;display: flex;"><span style="margin: auto;" :style= "button.response == 1 ? {'color':'#1a73e8'} : {'color':'#5f6368'}" @click="buttonFunction(component.api, integrationName, integrationID, sidebar.components[0], button.value)">{{ button.label }}</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </p>                  
                                </div>
                                <div v-else-if="sidebar.component_type == 'multiple'" class="pd-5">
                                    <div class="card rounded mg-b-10" v-for= "(task, index) in sidebar.components"
                                        :key= "index"
                                    >
                                        <div class="d-flex align-items-center justify-content-between bg-gray-100" style="padding: 15px;">
                                            <span style="font-size:13px;">{{ task[1].value }}</span>    
                                            <div>
                                                <span style="cursor:pointer;" :class="integrationName + '_edit_' + sidebar.class + '_button'" class="mg-r-10" v-if="sidebar.update == 1" @click="openUpdateForm(sidebar.class, task, integrationName)"><i class="fas fa-pen fa-xs"></i></span>
                                                <span style="cursor:pointer;" @click="collapseHeader('.' + integrationName + '_' + sidebar.class + '_' + task[0].value)"><i class="fas fa-caret-down" :class="integrationName + '_' + sidebar.class + '_' + task[0].value + '_caret'" style="color: silver;border-radius:5px;"></i></span>
                                            </div>
                                        </div>
                                        <div class="mg-l-10 mg-r-10 collapse" :class="integrationName + '_' + sidebar.class + '_' + task[0].value">
                                            <p v-for= "(com, index) in task"
                                                :key = "index"
                                            >   
                                                <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags' || com.type=='list') && com.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ com.label }}</span><br v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags' || com.type=='list') && com.show == 1">
                                                <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number') && com.show == 1" style="color:#4f5d6b;font-size:13px;">{{com.value ? com.value : 'No ' + com.label}}</span>
                                                <span v-else-if="com.type=='link' && com.show == 1">
                                                    <a :href="com.value" target="_blank">{{com.label}}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                            <polyline points="15 3 21 3 21 9"></polyline>
                                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                                        </svg>
                                                    </a>
                                                </span>
                                                <span v-else-if="com.type=='link_button' && com.show == 1">
                                                    <a :href="com.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="com.class">{{ com.label }}</button></a>
                                                </span>
                                                <span v-else-if="com.type=='tags' && com.show == 1">
                                                    <span v-for= "(tag, index) in com.value"
                                                    :key= "index"
                                                    >
                                                        <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                    </span>
                                                </span>
                                                <span v-else-if="com.type=='list' && com.show == 1">
                                                    <span v-for= "(list, index) in com.value"
                                                    :key= "index"
                                                    >
                                                        <span style="color: rgb(79, 93, 107); font-size: 13px;">{{ list.label }}</span>
                                                        <svg v-if="list.value=='accepted'" width="14" height="14">
                                                            <path fill="#CEEAD6" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                            <path fill="none" stroke="#137333" stroke-width="1.5" d="M3.5 6.5L6 9l5-5"></path>
                                                        </svg><br v-if="list.value=='accepted'">
                                                        <svg v-if="list.value=='awaiting'" width="14" height="14">
                                                            <path fill="#E8EAED" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                            <path fill="none" stroke="#3C4043" stroke-width="1.5" d="M5 5c0-1.1.9-2 2-2s2 .9 2 2-1 1.5-1.5 2S7 8 7 9M7 10v1.5"></path>
                                                        </svg><br v-if="list.value=='awaiting'">
                                                        <svg v-if="list.value=='declined'" width="14" height="14">
                                                            <path fill="#FAD2CF" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                            <path fill="none" stroke="#B31412" stroke-width="1.5" d="M4 10l6-6M10 10L4 4"></path>
                                                        </svg><br v-if="list.value=='declined'">
                                                        <br v-if="list.value==''">
                                                    </span>
                                                </span>
                                                <span v-else-if="com.type=='api_button' && com.show == 1">
                                                    <div style="border-top: #dadce0 1px solid; align-items: center; padding-top: 13px;">
                                                        <div class="d-flex justify-content-center align-items-center">
                                                            <div v-for="(button,index) in com.value"
                                                            :key="index"
                                                            role="button" class="calendar_button" :style= "button.response == 1 ? {'background-color':'#e8f0fe'} : {'background-color':'#ffffff'}">
                                                                <span style="margin: 0;display: flex;"><span style="margin: auto;" :style= "button.response == 1 ? {'color':'#1a73e8'} : {'color':'#5f6368'}" @click="buttonFunction(com.api, integrationName, integrationID, task, button.value)">{{ button.label }}</span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span v-else-if="com.type=='link_api' && com.show == 1">
                                                    <div class="collapse-body shadow-sm bg-white rounded mg-y-10" style="border-style: solid; border-width: thin; border-color: rgb(210, 210, 210);">
                                                        <div class="collapse-header row custom-header" style="cursor: pointer;">
                                                            <div class="col-8">
                                                                <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                                                    <i :class="com.icon"></i>
                                                                    <span class="text-truncate" style="max-width:135px;display:inline_block;white-space:initial;margin-left:5px;margin-right:5px;">{{ com.label }}</span>
                                                                </p>
                                                            </div>
                                                            <div class="col-4 pd-t-15" @click="collapseHeader('.' + com.class + '_' + task[0].value + '_integration_collapsible')">
                                                                <p class="integration_collapse_header pd-r-10 text-right">
                                                                    <i class="fas fa-caret-up" :class="com.class + '_' + task[0].value + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div class="pd-l-0 pd-b-1 collapse show" :class="com.class + '_' + task[0].value + '_integration_collapsible'"  style="word-wrap: break-word;line-height: 1.5;">
                                                            <span @click="callRandomApi(integrationName, com.class, com.api, integrationID, com.attributes, com.email, $event, 'fetch', sidebar.class, com.type, task[0].value)" :class="integrationName + '_' + sidebar.class + '_view_all_' + com.class + '_' + task[0].value" class="mg-l-55" style="color:#0168fa; cursor:pointer;">{{ 'View all ' + com.label }}</span>
                                                            <div v-if="commentData[task[0].value].length != 0" class="pd-5">
                                                                <div class="card rounded mg-b-10" v-for= "(compo, index) in commentData[task[0].value]"
                                                                    :key= "index"
                                                                >
                                                                    <div class="d-flex align-items-center justify-content-between bg-gray-100" style="padding: 15px;">
                                                                        <span style="font-size:13px;">{{ compo[1].value }}</span>    
                                                                        <div>
                                                                            <span style="cursor:pointer;" @click="collapseHeader('.' + integrationName + '_' + sidebar.class + '_' + compo[0].value)"><i class="fas fa-caret-down" :class="integrationName + '_' + sidebar.class + '_' + compo[0].value + '_caret'" style="color: silver;border-radius:5px;"></i></span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="mg-l-10 mg-r-10 collapse" :class="integrationName + '_' + sidebar.class + '_' + compo[0].value">
                                                                        <p v-for= "(comp, index) in compo"
                                                                            :key = "index"
                                                                        >   
                                                                            <span v-if= "(comp.type=='text' || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list') && comp.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ comp.label }}</span><br v-if= "(comp.type=='text' || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list') && comp.show == 1">
                                                                            <span v-if= "(comp.type=='text' || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number') && comp.show == 1" style="color:#4f5d6b;font-size:13px;">{{comp.value ? comp.value : 'No ' + comp.label}}</span>
                                                                            <span v-else-if="comp.type=='link' && comp.show == 1">
                                                                                <a :href="comp.value" target="_blank">{{comp.label}}
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                                        <polyline points="15 3 21 3 21 9"></polyline>
                                                                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                                    </svg>
                                                                                </a>
                                                                            </span>
                                                                            <span v-else-if="comp.type=='link_button' && comp.show == 1">
                                                                                <a :href="comp.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="comp.class">{{ comp.label }}</button></a>
                                                                            </span>
                                                                            <span v-else-if="comp.type=='tags' && comp.show == 1">
                                                                                <span v-for= "(tag, index) in comp.value"
                                                                                :key= "index"
                                                                                >
                                                                                    <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                                                </span>
                                                                            </span>
                                                                            <span v-else-if="comp.type=='list' && comp.show == 1">
                                                                                <span v-for= "(list, index) in comp.value"
                                                                                :key= "index"
                                                                                >
                                                                                    <span style="color: rgb(79, 93, 107); font-size: 13px;">{{ list.label }}</span>
                                                                                    <svg v-if="list.value=='accepted'" width="14" height="14">
                                                                                        <path fill="#CEEAD6" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                                                        <path fill="none" stroke="#137333" stroke-width="1.5" d="M3.5 6.5L6 9l5-5"></path>
                                                                                    </svg><br v-if="list.value=='accepted'">
                                                                                    <svg v-if="list.value=='awaiting'" width="14" height="14">
                                                                                        <path fill="#E8EAED" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                                                        <path fill="none" stroke="#3C4043" stroke-width="1.5" d="M5 5c0-1.1.9-2 2-2s2 .9 2 2-1 1.5-1.5 2S7 8 7 9M7 10v1.5"></path>
                                                                                    </svg><br v-if="list.value=='awaiting'">
                                                                                    <svg v-if="list.value=='declined'" width="14" height="14">
                                                                                        <path fill="#FAD2CF" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"></path>
                                                                                        <path fill="none" stroke="#B31412" stroke-width="1.5" d="M4 10l6-6M10 10L4 4"></path>
                                                                                    </svg><br v-if="list.value=='declined'">
                                                                                    <br v-if="list.value==''">
                                                                                </span>
                                                                            </span>
                                                                            <span v-else-if="comp.type=='api_button' && comp.show == 1">
                                                                                <div style="border-top: #dadce0 1px solid; align-items: center; padding-top: 13px;">
                                                                                    <div class="d-flex justify-content-center align-items-center">
                                                                                        <div v-for="(button,index) in comp.value"
                                                                                        :key="index"
                                                                                        role="button" class="calendar_button" :style= "button.response == 1 ? {'background-color':'#e8f0fe'} : {'background-color':'#ffffff'}">
                                                                                            <span style="margin: 0;display: flex;"><span style="margin: auto;" :style= "button.response == 1 ? {'color':'#1a73e8'} : {'color':'#5f6368'}" @click="buttonFunction(comp.api, integrationName, integrationID, compo, button.value)">{{ button.label }}</span></span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                            <span v-else-if="comp.type=='link_api' && comp.show == 1">
                                                                                <div class="collapse-body shadow-sm bg-white rounded mg-y-10" style="border-style: solid; border-width: thin; border-color: rgb(210, 210, 210);">
                                                                                    <div class="collapse-header row custom-header" style="cursor: pointer;">
                                                                                        <div class="col-8">
                                                                                            <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                                                                                <i :class="comp.icon"></i>
                                                                                                <span class="text-truncate" style="max-width:135px;display:inline_block;white-space:initial;margin-left:5px;margin-right:5px;">{{ com.label }}</span>
                                                                                            </p>
                                                                                        </div>
                                                                                        <div class="col-4 pd-t-15" @click="collapseHeader('.' + comp.class + '_' + compo[0].value + '_integration_collapsible')">
                                                                                            <p class="integration_collapse_header pd-r-10 text-right">
                                                                                                <i class="fas fa-caret-up" :class="comp.class + '_' + compo[0].value + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="pd-l-0 pd-b-1 collapse show" :class="comp.class + '_' + compo[0].value + '_integration_collapsible'"  style="word-wrap: break-word;line-height: 1.5;">
                                                                                        <span @click="callRandomApi(integrationName, comp.class, comp.api, integrationID, comp.attributes, comp.email, $event, 'fetch', sidebar.class, comp.type, compo[0].value)" :class="integrationName + '_' + sidebar.class + '_view_all_' + comp.class + '_' + compo[0].value" style="color:#0168fa; cursor:pointer;">{{ comp.label }}</span>
                                                                                        <div :class="integrationName + '_' + sidebar.class + '_all_' + comp.class + '_' + compo[0].value"></div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </p>  
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- create inner component for comment -->
                                                        <div class="col s12 mg-b-10 mg-t-10" v-if="sidebarData.create[com.class]" style="text-align: center;">
                                                            <button type="button" :class="integrationName + '_add_' + com.class + '_btn'" class="btn btn-xs btn-secondary" @click="openCreateForm(com.class)">Add
                                                                {{ capitalizeFirstLetter(com.label) }}
                                                            </button>
                                                        </div>
                                                        <div class="col s12 pd-x-0" :class="integrationName + '_create_' + com.class + '_form'" v-if="sidebarData.create[com.class] && openCreateFormArrayInternal[com.class]">
                                                            <form :class="'create_'+com.class+'_form_field'">
                                                                <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                                                    <div v-for = "(createComponent, index) in sidebarData.create[com.class].components"
                                                                        :key = "index"
                                                                        class="form-group">
                                                                        <label v-if="createComponent.type!='button' && createComponent.type!='input_field'" class="d-block">{{ createComponent.label }}</label>
                                                                        <input v-if="createComponent.type == 'text' || createComponent.type == 'number'" min="0" :max="createComponent.type == 'number' ? createComponent.max : ''" :type="createComponent.type" class="form-control" :class="integrationName + '_create_' + com.class + '_' + createComponent.class + '_' + task[0].value"
                                                                        :placeholder="createComponent.placeholder">
                                                                        <input v-else-if="createComponent.type == 'email'" type="email" class="form-control" :class="integrationName + '_create_' + multi_compo.class + '_' + createComponent.class + '_' + task[0].value" :value="createComponent.value" readonly="true">
                                                                        <select v-if="createComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_create_' + multi_compo.class + '_'  + createComponent.class + '_' + task[0].value">
                                                                            <option v-for= "(option, index) in createComponent.dropdown"
                                                                            :key= "index"
                                                                            :value="option.value">{{ option.label }}
                                                                            </option>
                                                                        </select>
                                                                        <select v-if="createComponent.type == 'dropdown_api'" class="form-control custom-select" :class="integrationName + '_create_' + com.class + '_'  + createComponent.class" @change="callRandomApi(integrationName, createComponent.class, createComponent.api, integrationID, createComponent.attributes, createComponent.email, $event, 'create', com.class, createComponent.type, '')">
                                                                            <option v-for= "(option, index) in createComponent.dropdown"
                                                                            :key= "index"
                                                                            :value="option.value">{{ option.label }}
                                                                            </option>
                                                                        </select>
                                                                        <span v-else-if="createComponent.type=='date'">
                                                                            <date-picker :class="integrationName + '_create_' + com.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="date" v-model="date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                                                        </span>
                                                                        <span v-else-if="createComponent.type=='time'">
                                                                            <date-picker :class="integrationName + '_create_' + com.class + '_'  + createComponent.class" :open.sync="newTimeOpen" @change="handleChange2" type="time" v-model="time" value-type="timestamp" :showSecond="false" :disabled-time="notBeforeNow" placeholder="Select Time" :clearable="false" style="width: 100%;"></date-picker>
                                                                        </span>
                                                                        <span v-else-if="createComponent.type=='datetime'">
                                                                            <date-picker :class="integrationName + '_create_' + com.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                                                        </span>
                                                                        <div class="invalid-feedback" :class="integrationName + '-create-' + com.class + '-' + createComponent.class + '-error'"></div>
                                                                    </div>
                                                                    
                                                                    <div :class="integrationName + '-create-' + com.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                                        <button type="button"
                                                                            class="btn btn-xs btn-primary" @click="createCustomData(com.class, sidebarData.create[com.class].components, integrationName, integrationID, com, task[0].value)">Create
                                                                        </button>
                                                                        <button type="button"
                                                                            class="btn btn-xs btn-secondary" @click="openCreateForm(com.class)">Cancel
                                                                        </button>
                                                                    </div>
                                                                </fieldset>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </span>
                                            </p>  
                                        </div>
                                    </div>
                                </div>
                                <div class="col s12 pd-x-0" :class="integrationName + '_edit_' + sidebar.class + '_form'" v-if="openUpdateFormArrayInternal[sidebar.class] && sidebar.update==1">
                                    <form :class="'edit_'+sidebar.class+'_form_field'">
                                        <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                            <div v-for = "(updateComponent, index) in sidebarData.update[sidebar.class].components"
                                                :key = "index"
                                                class="form-group">
                                                <label v-if="updateComponent.type!='button' && updateComponent.type!='input_field'" class="d-block">{{ updateComponent.label }}</label>
                                                <input v-if="updateComponent.type == 'text' || updateComponent.type == 'number'" min="0" :max="updateComponent.type == 'number'? updateComponent.max : ''" :type="updateComponent.type" class="form-control" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class"
                                                :placeholder="updateComponent.placeholder" :value="formData[sidebar.class][updateComponent.label]">
                                                <input v-else-if="updateComponent.type == 'email'" type="email" class="form-control" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class" :value="updateComponent.value" readonly="true">
                                                <select v-if="updateComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class">
                                                    <option v-for= "(option, index) in updateComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <span v-if="updateComponent.type=='button'">
                                                    <div :class="'edit_'+ sidebar.class + '_' + updateComponent.class + '_div'">
                                                        <div v-for= "(emailValue, index) in guestEmails"
                                                        :key= "index"
                                                        class="d-flex align-items-center justify-content-between">
                                                            <div class="form-group pd-l-0" style="width: -webkit-fill-available;">
                                                                <label class="d-block">{{ capitalizeFirstLetter(updateComponent.class) }} {{ index + 1 }}</label>
                                                                <input type="text" class="form-control" :placeholder="updateComponent.placeholder" :name="'edit_'+updateComponent.name" :value="emailValue">
                                                            </div>
                                                            <div class="form-group mg-b-0 pd-l-10">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="removeRandomData(index, emailValue)">
                                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="mb-2 btn btn-xs btn-primary" :class="updateComponent.class" @click="addRandomData(updateComponent, integrationName, integrationID, sidebar.class, 'edit','edit_'+ sidebar.class + '_' + updateComponent.class + '_div')">{{ updateComponent.label }}</button>
                                                </span>
                                                <span v-else-if="updateComponent.type=='date'">
                                                    <date-picker :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class" :open.sync="newDateOpen" @change="handleChange" type="date" v-model="date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="updateComponent.type=='time'">
                                                    <date-picker :class="integrationName + '_edit_' + sidebar.class + '_'  + updateComponent.class" :open.sync="newTimeOpen" @change="handleChange2" type="time" v-model="time" value-type="timestamp" :showSecond="false" :disabled-time="notBeforeNow" placeholder="Select Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="updateComponent.type=='datetime'">
                                                    <date-picker :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class" :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <div class="invalid-feedback" :class="integrationName + '-edit-' + sidebar.class + '-' + updateComponent.class + '-error'"></div>
                                            </div>
                                            
                                            <div :class="integrationName + '-edit-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                <button type="button"
                                                    class="btn btn-xs btn-primary" @click="updateData(sidebar.class, sidebarData.update[sidebar.class].components, integrationName, integrationID)">Save
                                                </button>
                                                <button type="button"
                                                    class="btn btn-xs btn-secondary" @click="openUpdateForm(sidebar.class, [], integrationName)">Cancel
                                                </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="col s12 mg-b-10 mg-t-10" v-if="sidebarData.create[sidebar.class]" style="text-align: center;">
                            <button type="button" :class="integrationName + '_add_' + sidebar.class + '_btn'" class="btn btn-xs btn-secondary" @click="openCreateForm(sidebar.class)">New
                                {{ capitalizeFirstLetter(sidebar.class) }}
                            </button>
                        </div>
                        <div class="col s12 pd-x-0" :class="integrationName + '_create_' + sidebar.class + '_form'" v-if="sidebarData.create[sidebar.class] && openCreateFormArrayInternal[sidebar.class]">
                            <form :class="'create_'+sidebar.class+'_form_field'">
                                <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                    <div v-for = "(createComponent, index) in sidebarData.create[sidebar.class].components"
                                        :key = "index"
                                        class="form-group">
                                        <label v-if="createComponent.type!='button' && createComponent.type!='input_field'" class="d-block">{{ createComponent.label }}</label>
                                        <input v-if="createComponent.type == 'text' || createComponent.type == 'number'" min="0" :max="createComponent.type == 'number' ? createComponent.max : ''" :type="createComponent.type" class="form-control" :class="integrationName + '_create_' + sidebar.class + '_' + createComponent.class"
                                        :placeholder="createComponent.placeholder">
                                        <input v-else-if="createComponent.type == 'email'" type="email" class="form-control" :class="integrationName + '_create_' + sidebar.class + '_' + createComponent.class" :value="createComponent.value" readonly="true">
                                        <select v-if="createComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class">
                                            <option v-for= "(option, index) in createComponent.dropdown"
                                            :key= "index"
                                            :value="option.value">{{ option.label }}
                                            </option>
                                        </select>
                                        <select v-if="createComponent.type == 'dropdown_api'" class="form-control custom-select" :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" @change="callRandomApi(integrationName, createComponent.class, createComponent.api, integrationID, createComponent.attributes, createComponent.email, $event, 'create', sidebar.class, createComponent.type, '')">
                                            <option v-for= "(option, index) in createComponent.dropdown"
                                            :key= "index"
                                            :value="option.value">{{ option.label }}
                                            </option>
                                        </select>
                                        <span v-if="createComponent.type=='button'">
                                            <div :class="'create_'+ sidebar.class + '_' + createComponent.class + '_div'">
                                                <div v-for= "(emailValue, index) in guestEmails"
                                                :key= "index"
                                                class="mg-t-10 d-flex align-items-center justify-content-between">
                                                    <div class="form-group pd-l-0" style="width: -webkit-fill-available;">
                                                        <label class="d-block">{{ capitalizeFirstLetter(createComponent.class) }} {{ index + 1 }}</label>
                                                        <input type="text" class="form-control" :placeholder="createComponent.placeholder" :name="'create_'+createComponent.name" :value="emailValue">
                                                    </div>
                                                    <div class="form-group mg-b-0 pd-l-10">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="removeRandomData(index, emailValue)">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" class="mb-2 btn btn-xs btn-primary" :class="createComponent.class" @click="addRandomData(createComponent, integrationName, integrationID, sidebar.class, 'create','create_'+ sidebar.class + '_' + createComponent.class + '_div')">{{ createComponent.label }}</button>
                                        </span>
                                        <span v-else-if="createComponent.type=='date'">
                                            <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="date" v-model="date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                        </span>
                                        <span v-else-if="createComponent.type=='time'">
                                            <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newTimeOpen" @change="handleChange2" type="time" v-model="time" value-type="timestamp" :showSecond="false" :disabled-time="notBeforeNow" placeholder="Select Time" :clearable="false" style="width: 100%;"></date-picker>
                                        </span>
                                        <span v-else-if="createComponent.type=='datetime'">
                                            <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                        </span>
                                        <div class="invalid-feedback" :class="integrationName + '-create-' + sidebar.class + '-' + createComponent.class + '-error'"></div>
                                    </div>
                                    
                                    <div :class="integrationName + '-create-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                        <button type="button"
                                            class="btn btn-xs btn-primary" @click="createData(sidebar.class, sidebarData.create[sidebar.class].components, integrationName, integrationID)">Create {{sidebar.class}}
                                        </button>
                                        <button type="button"
                                            class="btn btn-xs btn-secondary" @click="openCreateForm(sidebar.class)">Cancel
                                        </button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>

                    <!-- Component for E-commerce -->
                    <div class="pd-y-10" v-if= "sidebar.type == 'e-commerce'">
                        <div class="collapse-body shadow-sm bg-white rounded">
                            <div class="collapse-header custom-header row" style="cursor: pointer;">
                                <div class="col-8">
                                    <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0" style="display:flex;align-items:center;">
                                        <i :class="sidebar.icon"></i>
                                        <span class="text-truncate" style="max-width:135px;display:inline_block;white-space:initial;margin-left:10px;">{{ sidebar.title }}</span>
                                    </p>
                                </div>

                                <div class="col-4 pd-t-15" @click="collapseHeader('.' + sidebar.class + '_integration_collapsible')">
                                    <p class="integration_collapse_header pd-r-10 text-right">
                                        <i class="fas fa-caret-up" :class="sidebar.class + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="pd-l-0 pd-b-1 collapse show" :class="sidebar.class + '_integration_collapsible'" style="word-wrap: break-word;line-height: 1.50;padding:5px;">

                                <!-- Single component -->
                                <div v-if="sidebar.component_type == 'single'" class="col s12">
                                    <p v-for= "(component, index) in sidebar.components[0]"
                                        :key = "index"
                                    >
                                        <span v-if="(component.type=='text'  || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='tags' || component.type=='email') && component.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ component.label }}</span><br v-if="(component.type=='text' || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='tags' || component.type=='email') && component.show == 1">
                                        <span v-if="(component.type=='text'  || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='email') && component.show == 1" style="color:#4f5d6b;font-size:13px;">{{component.value ? component.value : 'No ' + component.label}}</span>
                                        <span v-else-if="component.type=='link' && component.show == 1">
                                            <a :href="component.value" target="_blank">{{component.label}}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        </span>
                                        <span v-else-if="(component.type=='button' || component.type=='api_button') && component.show == 1">
                                            <button type="button" class="mb-2 btn btn-xs btn-primary" :class="component.class" @click="buttonFunction(component.api, integrationName, integrationID, sidebar.components[0], '')">{{ component.label }}</button>
                                        </span>
                                        <span v-else-if="component.type=='link_button' && component.show == 1">
                                            <a :href="component.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="component.class">{{ component.label }}</button></a>
                                        </span>
                                        <span v-else-if="component.type=='tags' && component.show == 1">
                                            <span v-for= "(tag, index) in component.value"
                                            :key= "index"
                                            >
                                                <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                            </span>
                                        </span>
                                    </p>                  
                                </div>

                                <!-- Multiple component -->
                                <div v-if="sidebar.component_type == 'multiple'" class="pd-5">
                                    <div class="pd-y-10" v-for= "(store_component, index) in sidebar.components"
                                    :key= "index"
                                    >
                                        <div class="collapse-body shadow-sm bg-white rounded" style="border-style: solid;border-width: thin;border-color: #d2d2d2;">
                                            <div class="collapse-header custom-header row" style="cursor: pointer;">
                                                <div class="col-8">
                                                    <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                                        <i :class="store_component.icon"></i>
                                                        <span class="text-truncate" style="max-width:135px;display:inline_block;white-space:initial;margin-left:10px;">{{ store_component.title }}</span>
                                                    </p>
                                                </div>
                                                <div class="col-4 pd-t-15" @click="collapseHeader('.' + store_component.class + '_integration_collapsible')">
                                                    <p class="pd-r-10 text-right">
                                                        <i class="fas fa-caret-up" :class="store_component.class + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="pd-l-0 pd-b-1 collapse show" :class="store_component.class + '_integration_collapsible'" style="word-wrap: break-word;line-height: 1.50;">
                                                <!-- inner no component -->
                                                <div v-if="store_component.component_type == 'no'" class="col s12" :class="'no_' + store_component.class + '_component'">
                                                    <p style="color:#4f5d6b;">{{ store_component.text }}</p>
                                                </div>
                                                
                                                <!-- inner single component -->
                                                <div class="col s12" v-else-if="store_component.component_type == 'single'">
                                                    <p v-for= "(com, index) in store_component.components"
                                                        :key = "index"
                                                    >
                                                        <span v-if="(com.type=='text'  || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags' || com.type=='email') && com.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ com.label }}</span><br v-if="(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags' || com.type=='email') && com.show == 1">
                                                        <span v-if="(com.type=='text'  || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='email') && com.show == 1" style="color:#4f5d6b;font-size:13px;">{{com.value ? com.value : 'No ' + com.label}}</span>
                                                        <span v-else-if="com.type=='link' && com.show == 1">
                                                            <a :href="com.value" target="_blank">{{com.label}}
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                </svg>
                                                            </a>
                                                        </span>
                                                        <span v-else-if="(com.type=='button' || com.type=='api_button') && com.show == 1">
                                                            <button type="button" class="mb-2 btn btn-xs btn-primary" :class="com.class" @click="buttonFunction(com.api, integrationName, integrationID, component.components[0], '')">{{ com.label }}</button>
                                                        </span>
                                                        <span v-else-if="com.type=='link_button' && com.show == 1">
                                                            <a :href="com.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="com.class">{{ com.label }}</button></a>
                                                        </span>
                                                        <span v-else-if="com.type=='tags' && com.show == 1">
                                                            <span v-for= "(tag, index) in com.value"
                                                            :key= "index"
                                                            >
                                                                <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                            </span>
                                                        </span>
                                                    </p> 
                                                </div>

                                                <!-- inner multiple component -->
                                                <div v-else-if="store_component.component_type == 'multiple'" class="pd-5">
                                                    <div class="card rounded mg-b-10" v-for= "(multi_compos, index) in store_component.components"
                                                        :key= "index"
                                                    >
                                                        <div class="d-flex align-items-center justify-content-between bg-gray-100" style="padding: 15px;">
                                                            <span style="font-size:13px;">{{ multi_compos[1].value }}</span>    
                                                            <div>
                                                                <span style="cursor:pointer;" @click="collapseHeader('.' + integrationName + '_' + store_component.class + '_' + multi_compos[0].value)">
                                                                    <i class="fas fa-caret-down" :class="integrationName + '_' + store_component.class + '_' + multi_compos[0].value + '_caret'" style="color: silver;border-radius:5px;"></i>
                                                                </span>
                                                            </div>
                                                        </div>


                                                        <div class="pd-l-0 pd-b-1 collapse" :class="integrationName + '_' + store_component.class + '_' + multi_compos[0].value">
                                                            <div class="pd-5">
                                                                <div v-for= "(multi_compo,index) in multi_compos"
                                                                :key= "index">
                                                                    <div class="collapse-body shadow-sm bg-white rounded mg-y-10" v-if="multi_compo.show==1 && (multi_compo.type == 'multiple_component' || multi_compo.type=='single_component')" style="border-style: solid; border-width: thin; border-color: rgb(210, 210, 210);">
                                                                        <div class="collapse-header row custom-header" style="cursor: pointer;">
                                                                            <div class="col-8">
                                                                                <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                                                                    {{ multi_compo.label }}
                                                                                    <!-- <i v-if="sidebar.update==1 && sidebar.component_type=='single'" class="fas fa-xs fa-pen" :class="integrationName + '_' + sidebar.class + '_edit_button'" @click="openUpdateForm(sidebar.class, sidebar.components[0], integrationName)"></i> -->
                                                                                </p>  
                                                                            </div>
                                                                            <div class="col-4 pd-t-15" @click="collapseHeader('.' + multi_compo.class + '_' + multi_compos[0].value + '_integration_collapsible')">
                                                                                <p class="integration_collapse_header pd-r-10 text-right">
                                                                                    <i class="fas fa-caret-up" :class="multi_compo.class + '_' + multi_compos[0].value + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="pd-l-0 pd-b-1 collapse show" :class="multi_compo.class + '_' + multi_compos[0].value + '_integration_collapsible'"  style="word-wrap: break-word;line-height: 1.5;">

                                                                            <!-- Single Component -->
                                                                            <div v-if="multi_compo.type == 'single_component'" class="col s12">
                                                                                <p v-for= "(comp, index) in multi_compo.value"
                                                                                    :key = "index"
                                                                                >
                                                                                    <span v-if="(comp.type=='text'  || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list' || comp.type=='email') && comp.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ comp.label }}</span><br v-if="(comp.type=='text' || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list' || comp.type=='email') && comp.show == 1">
                                                                                    <span v-if="(comp.type=='text'  || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='email') && comp.show == 1" style="color:#4f5d6b;font-size:13px;">{{comp.value ? comp.value : 'No ' + comp.label}}</span>
                                                                                    <span v-else-if="comp.type=='link' && comp.show == 1">
                                                                                        <a :href="comp.value" target="_blank">{{comp.label}}
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                                            </svg>
                                                                                        </a>
                                                                                    </span>
                                                                                    <span v-else-if="(comp.type=='button' || comp.type=='api_button') && comp.show == 1">
                                                                                        <button type="button" class="mb-2 btn btn-xs btn-primary" :class="comp.class" @click="buttonFunction(comp.api, integrationName, integrationID, multi_compo, '')">{{ comp.label }}</button>
                                                                                    </span>
                                                                                    <span v-else-if="comp.type=='link_button' && comp.show == 1">
                                                                                        <a :href="comp.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="comp.class">{{ comp.label }}</button></a>
                                                                                    </span>
                                                                                    <span v-else-if="comp.type=='tags' && comp.show == 1">
                                                                                        <span v-for= "(tag, index) in comp.value"
                                                                                        :key= "index"
                                                                                        >
                                                                                            <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                                                        </span>
                                                                                    </span>
                                                                                </p>                  
                                                                            </div>

                                                                            <!-- Multiple Component -->
                                                                            <div v-else-if="multi_compo.type == 'multiple_component'" class="pd-5">
                                                                                <div class="card rounded mg-b-10" v-for= "(compo, index) in multi_compo.value"
                                                                                :key= "index"
                                                                                >
                                                                                    <div class="d-flex align-items-center justify-content-between bg-gray-100" style="padding: 15px;">
                                                                                        <span style="font-size:13px;">{{ compo[1].value }}</span>    
                                                                                        <div>
                                                                                            <!-- <span style="cursor:pointer;" :class="integrationName + '_edit_' + sidebar.class + '_button'" class="mg-r-10" v-if="sidebar.update == 1" @click="openUpdateForm(sidebar.class, component, integrationName)"><i class="fas fa-pen fa-xs"></i></span> -->
                                                                                            <span style="cursor:pointer;" @click="collapseHeader('.' + integrationName + '_' + multi_compo.class + '_' + compo[0].value)">
                                                                                                <i class="fas fa-caret-down" :class="integrationName + '_' + multi_compo.class + '_' + compo[0].value + '_caret'" style="color: silver;border-radius:5px;"></i>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="mg-l-10 mg-r-10 collapse" :class="integrationName + '_' + multi_compo.class + '_' + compo[0].value">
                                                                                        <p v-for= "(com, index) in compo"
                                                                                            :key = "index"
                                                                                        >   
                                                                                            <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags' || com.type=='list') && com.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ com.label }}</span><br v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags' || com.type=='list') && com.show == 1">
                                                                                            <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number') && com.show == 1" style="color:#4f5d6b;font-size:13px;">{{com.value ? com.value : 'No ' + com.label}}</span>
                                                                                            <span v-else-if="com.type=='link' && com.show == 1">
                                                                                                <a :href="com.value" target="_blank">{{com.label}}
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                                                        <polyline points="15 3 21 3 21 9"></polyline>
                                                                                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                                                    </svg>
                                                                                                </a>
                                                                                            </span>
                                                                                            <span v-else-if="com.type=='link_button' && com.show == 1">
                                                                                                <a :href="com.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="com.class">{{ com.label }}</button></a>
                                                                                            </span>
                                                                                            <span v-else-if="com.type=='tags' && com.show == 1">
                                                                                                <span v-for= "(tag, index) in com.value"
                                                                                                :key= "index"
                                                                                                >
                                                                                                    <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                                                                </span>
                                                                                            </span>
                                                                                        </p>  
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <!-- create inner component(custom field for WooCommerce) -->
                                                                            <div class="col s12 mg-b-10 mg-t-10" v-if="sidebarData.create[multi_compo.class]" style="text-align: center;">
                                                                                <button type="button" :class="integrationName + '_add_' + multi_compo.class + '_btn'" class="btn btn-xs btn-secondary" @click="openCreateForm(multi_compo.class)">Add
                                                                                    {{ capitalizeFirstLetter(multi_compo.label) }}
                                                                                </button>
                                                                            </div>
                                                                            <div class="col s12 pd-x-0" :class="integrationName + '_create_' + multi_compo.class + '_form'" v-if="sidebarData.create[multi_compo.class] && openCreateFormArrayInternal[multi_compo.class]">
                                                                                <form :class="'create_'+multi_compo.class+'_form_field'">
                                                                                    <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                                                                        <div v-for = "(createComponent, index) in sidebarData.create[multi_compo.class].components"
                                                                                            :key = "index"
                                                                                            class="form-group">
                                                                                            <label v-if="createComponent.type!='button' && createComponent.type!='input_field'" class="d-block">{{ createComponent.label }}</label>
                                                                                            <input v-if="createComponent.type == 'text' || createComponent.type == 'number'" min="0" :max="createComponent.type == 'number' ? createComponent.max : ''" :type="createComponent.type" class="form-control" :class="integrationName + '_create_' + multi_compo.class + '_' + createComponent.class"
                                                                                            :placeholder="createComponent.placeholder">
                                                                                            <input v-else-if="createComponent.type == 'email'" type="email" class="form-control" :class="integrationName + '_create_' + multi_compo.class + '_' + createComponent.class" :value="createComponent.value" readonly="true">
                                                                                            <select v-if="createComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_create_' + multi_compo.class + '_'  + createComponent.class">
                                                                                                <option v-for= "(option, index) in createComponent.dropdown"
                                                                                                :key= "index"
                                                                                                :value="option.value">{{ option.label }}
                                                                                                </option>
                                                                                            </select>
                                                                                            <select v-if="createComponent.type == 'dropdown_api'" class="form-control custom-select" :class="integrationName + '_create_' + multi_compo.class + '_'  + createComponent.class" @change="callRandomApi(integrationName, createComponent.class, createComponent.api, integrationID, createComponent.attributes, createComponent.email, $event, 'create', multi_compo.class, createComponent.type, '')">
                                                                                                <option v-for= "(option, index) in createComponent.dropdown"
                                                                                                :key= "index"
                                                                                                :value="option.value">{{ option.label }}
                                                                                                </option>
                                                                                            </select>
                                                                                            <span v-else-if="createComponent.type=='date'">
                                                                                                <date-picker :class="integrationName + '_create_' + multi_compo.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="date" v-model="date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                                                                            </span>
                                                                                            <span v-else-if="createComponent.type=='time'">
                                                                                                <date-picker :class="integrationName + '_create_' + multi_compo.class + '_'  + createComponent.class" :open.sync="newTimeOpen" @change="handleChange2" type="time" v-model="time" value-type="timestamp" :showSecond="false" :disabled-time="notBeforeNow" placeholder="Select Time" :clearable="false" style="width: 100%;"></date-picker>
                                                                                            </span>
                                                                                            <span v-else-if="createComponent.type=='datetime'">
                                                                                                <date-picker :class="integrationName + '_create_' + multi_compo.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                                                                            </span>
                                                                                            <div class="invalid-feedback" :class="integrationName + '-create-' + multi_compo.class + '-' + createComponent.class + '-error'"></div>
                                                                                        </div>
                                                                                        
                                                                                        <div :class="integrationName + '-create-' + multi_compo.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                                                            <button type="button"
                                                                                                class="btn btn-xs btn-primary" @click="createCustomData(multi_compo.class, sidebarData.create[multi_compo.class].components, integrationName, integrationID, multi_compo, multi_compos[0].value)">Create
                                                                                            </button>
                                                                                            <button type="button"
                                                                                                class="btn btn-xs btn-secondary" @click="openCreateForm(multi_compo.class)">Cancel
                                                                                            </button>
                                                                                        </div>
                                                                                    </fieldset>
                                                                                </form>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div class="d-flex justify-content-center" v-else-if="multi_compo.show==1 && multi_compo.type=='link'">
                                                                        <a :href="multi_compo.value" target="_blank">{{multi_compo.label}}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                            </svg>
                                                                        </a>
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
                            </div>
                        </div>
                    </div>

                    <!-- Component for Thuosci -->
                    <div class="pd-y-10" v-if= "sidebar.type == 'thuosci'">
                        <div class="integration-collapse-body shadow-sm bg-white rounded" style="border-style: solid;border-width: thin;border-color: rgb(210, 210, 210);">
                            <div class="collapse-header row custom-header" style="cursor: pointer;">
                                <div v-if="sidebar.class != 'order'" class="col-8">
                                    <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                        <i :class="sidebar.icon"></i>
                                        <span class="text-truncate" style="max-width:135px;display:inline_block;white-space:initial;margin-left:5px;margin-right:5px;">{{ sidebar.title }}</span>
                                        <!-- <i v-if="sidebar.update==1 && sidebar.component_type=='single'" class="fas fa-xs fa-pen" :class="integrationName + '_' + sidebar.class + '_edit_button'" @click="openUpdateForm(sidebar.class, sidebar.components[0], integrationName)"></i> -->
                                    </p>  
                                </div>
                                <div v-else class="col-8">
                                    <div class="col-8">
                                        <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                            <i :class="sidebar.icon"></i>
                                            <span class="text-truncate" style="max-width:135px;display:inline_block;white-space:initial;margin-left:5px;margin-right:5px;">{{ sidebar.title }}</span>
                                            <!-- <i v-if="sidebar.update==1 && sidebar.component_type=='single'" class="fas fa-xs fa-pen" :class="integrationName + '_' + sidebar.class + '_edit_button'" @click="openUpdateForm(sidebar.class, sidebar.components[0], integrationName)"></i> -->
                                        </p> 
                                    </div>
                                    <div class="col-4">
                                        <p class="pd-r-10 text-right">{{ sidebar.count }}</p>
                                    </div> 
                                </div>
                                <div class="col-4 pd-t-15" @click="collapseHeader('.' + sidebar.class + '_integration_collapsible')">
                                    <p class="integration_collapse_header pd-r-10 text-right">
                                        <i class="fas fa-caret-up" :class="sidebar.class + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="pd-l-0 pd-b-1 collapse show" :class="sidebar.class + '_integration_collapsible'"  style="word-wrap: break-word;line-height: 1.5;">
                                
                                <!-- Single Component -->
                                <div v-if="sidebar.component_type == 'single'" class="col s12">
                                    <p v-for= "(component, index) in sidebar.components[0]"
                                        :key = "index"
                                    >
                                        <span v-if="(component.type=='text'  || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='tags' || component.type=='email' || component.type=='dropdown_api') && component.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">
                                            {{ component.label }}
                                        </span>
                                        <br v-if="(component.type=='text' || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='tags' || component.type=='tags' || component.type=='email' || component.type=='dropdown_api') && component.show == 1">
                                        <span v-if="(component.type=='text'  || component.type=='dropdown' || component.type=='date' || component.type=='time' || component.type=='datetime' || component.type=='number' || component.type=='email' || component.type=='dropdown_api') && component.show == 1" style="color:#4f5d6b;font-size:13px;">
                                            {{component.value ? component.value : 'No ' + component.label}}
                                        </span>
                                        <span v-else-if="component.type=='link' && component.show == 1">
                                            <a :href="component.value" target="_blank">{{component.label}}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        </span>
                                        <span v-else-if="(component.type=='button' || component.type=='api_button') && component.show == 1">
                                            <button type="button" class="mb-2 btn btn-xs btn-primary" :class="component.class" @click="buttonFunction(component.api, integrationName, integrationID, sidebar.components[0], '')">{{ component.label }}</button>
                                        </span>
                                        <span v-else-if="component.type=='link_button' && component.show == 1">
                                            <a :href="component.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="component.class">{{ component.label }}</button></a>
                                        </span>
                                        <span v-else-if="component.type=='tags' && component.show == 1">
                                            <span v-for= "(tag, index) in component.value"
                                            :key= "index"
                                            >
                                                <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                            </span>
                                        </span>
                                        <span v-else-if="(component.type=='single_component' || component.type=='multiple_component') && component.show == 1">
                                            <div class="collapse-body shadow-sm bg-white rounded mg-y-10" style="border-style: solid; border-width: thin; border-color: rgb(210, 210, 210);">
                                                <div class="collapse-header row custom-header" style="cursor: pointer;">
                                                    <div class="col-8">
                                                        <p class="pd-l-13 pd-t-15 pd-b-10 mg-b-0">
                                                            {{ component.label }}
                                                        </p>  
                                                    </div>
                                                    <div class="col-4 pd-t-15" @click="collapseHeader('.' + component.class + sidebar.components[0][0].value + '_integration_collapsible')">
                                                        <p class="integration_collapse_header pd-r-10 text-right">
                                                            <i class="fas fa-caret-up" :class="component.class +  sidebar.components[0][0].value + '_integration_collapsible_caret'" style="color: silver;border-radius:5px;"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="pd-l-0 pd-b-1 collapse show" :class="component.class + sidebar.components[0][0].value + '_integration_collapsible'"  style="word-wrap: break-word;line-height: 1.5;">
                                                    <!-- Single Component -->
                                                    <div v-if="component.type == 'single_component'" class="col s12">
                                                        <p v-for= "(comp, index) in component.value"
                                                            :key = "index"
                                                        >
                                                            <span v-if="(comp.type=='text'  || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list' || comp.type=='email') && comp.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ comp.label }}</span><br v-if="(comp.type=='text' || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='tags' || comp.type=='list' || comp.type=='email') && comp.show == 1">
                                                            <span v-if="(comp.type=='text'  || comp.type=='dropdown' || comp.type=='date' || comp.type=='time' || comp.type=='datetime' || comp.type=='number' || comp.type=='email') && comp.show == 1" style="color:#4f5d6b;font-size:13px;">{{comp.value ? comp.value : 'No ' + comp.label}}</span>
                                                            <span v-else-if="comp.type=='link' && comp.show == 1">
                                                                <a :href="comp.value" target="_blank">{{comp.label}}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                        <polyline points="15 3 21 3 21 9"></polyline>
                                                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                    </svg>
                                                                </a>
                                                            </span>
                                                            <span v-else-if="(comp.type=='button' || comp.type=='api_button') && comp.show == 1">
                                                                <button type="button" class="mb-2 btn btn-xs btn-primary" :class="comp.class" @click="buttonFunction(comp.api, integrationName, integrationID, component, '')">{{ comp.label }}</button>
                                                            </span>
                                                            <span v-else-if="comp.type=='link_button' && comp.show == 1">
                                                                <a :href="comp.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="comp.class">{{ comp.label }}</button></a>
                                                            </span>
                                                            <span v-else-if="comp.type=='tags' && comp.show == 1">
                                                                <span v-for= "(tag, index) in comp.value"
                                                                :key= "index"
                                                                >
                                                                    <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                                </span>
                                                            </span>
                                                        </p>                  
                                                    </div>

                                                    <!-- Multiple Component -->
                                                    <div v-else-if="component.type == 'multiple_component'" class="pd-5">
                                                        <div class="card rounded mg-b-10" v-for= "(compo, index) in component.value"
                                                        :key= "index"
                                                        >
                                                            <div class="d-flex align-items-center justify-content-between bg-gray-100" style="padding: 15px;">
                                                                <span style="font-size:13px;">{{ compo[1].value }}</span>    
                                                                <div>
                                                                    <!-- <span style="cursor:pointer;" :class="integrationName + '_edit_' + sidebar.class + '_button'" class="mg-r-10" v-if="sidebar.update == 1" @click="openUpdateForm(sidebar.class, component, integrationName)"><i class="fas fa-pen fa-xs"></i></span> -->
                                                                    <span style="cursor:pointer;" @click="collapseHeader('.' + integrationName + '_' + component.class + '_' + compo[0].value)">
                                                                        <i class="fas fa-caret-down" :class="integrationName + '_' + component.class + '_' + compo[0].value + '_caret'" style="color: silver;border-radius:5px;"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="mg-l-10 mg-r-10 collapse" :class="integrationName + '_' + component.class + '_' + compo[0].value">
                                                                <p v-for= "(com, index) in compo"
                                                                    :key = "index"
                                                                >   
                                                                    <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags' || com.type=='list') && com.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ com.label }}</span><br v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags' || com.type=='list') && com.show == 1">
                                                                    <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number') && com.show == 1" style="color:#4f5d6b;font-size:13px;">{{com.value ? com.value : 'No ' + com.label}}</span>
                                                                    <span v-else-if="com.type=='link' && com.show == 1">
                                                                        <a :href="com.value" target="_blank">{{com.label}}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                            </svg>
                                                                        </a>
                                                                    </span>
                                                                    <span v-else-if="com.type=='link_button' && com.show == 1">
                                                                        <a :href="com.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="com.class">{{ com.label }}</button></a>
                                                                    </span>
                                                                    <span v-else-if="com.type=='tags' && com.show == 1">
                                                                        <span v-for= "(tag, index) in com.value"
                                                                        :key= "index"
                                                                        >
                                                                            <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                                        </span>
                                                                    </span>
                                                                </p>  
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </span>
                                    </p>                  
                                </div>

                                <!-- Multiple Component -->
                                <div v-else-if="sidebar.component_type == 'multiple'" class="pd-5">
                                    <div class="card" style="border-left: none; border-right: none; border-radius: 0px;" v-for= "(component, index) in sidebar.components"
                                        :key= "index"
                                    >
                                        <div class="d-flex align-items-center justify-content-between" style="padding: 15px;">
                                            <span style="font-size:13px;">{{ component[0].value }}</span>    
                                            <div>
                                                <!-- <span style="cursor:pointer;" :class="integrationName + '_edit_' + sidebar.class + '_button'" class="mg-r-10" v-if="sidebar.update == 1" @click="openUpdateForm(sidebar.class, component, integrationName)"><i class="fas fa-pen fa-xs"></i></span> -->
                                                <span style="cursor:pointer;" @click="collapseHeader('.' + integrationName + '_' + sidebar.class + '_' + component[0].value)"><i class="fas fa-caret-down" :class="integrationName + '_' + sidebar.class + '_' + component[0].value + '_caret'" style="color: silver;border-radius:5px;"></i></span>
                                            </div>
                                        </div>
                                        <div class="mg-l-10 mg-r-10 collapse" :class="integrationName + '_' + sidebar.class + '_' + component[0].value">
                                            <p v-for= "(com, index) in component"
                                                :key = "index"
                                            >   
                                                <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='dropdown_api' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags') && com.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ com.label }}</span><br v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='dropdown_api' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number' || com.type=='tags') && com.show == 1">
                                                <span v-if= "(com.type=='text' || com.type=='dropdown' || com.type=='dropdown_api' || com.type=='date' || com.type=='time' || com.type=='datetime' || com.type=='number') && com.show == 1" style="color:#4f5d6b;font-size:13px;">{{com.value ? com.value : 'No ' + com.label}}</span>
                                                <span v-else-if="com.type=='link' && com.show == 1">
                                                    <a :href="com.value" target="_blank">{{com.label}}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                            <polyline points="15 3 21 3 21 9"></polyline>
                                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                                        </svg>
                                                    </a>
                                                </span>
                                                <span v-else-if="com.type=='link_button' && com.show == 1">
                                                    <a :href="com.value" target="_blank"><button type="button" class="mb-2 btn btn-xs btn-secondary" :class="com.class">{{ com.label }}</button></a>
                                                </span>
                                                <span v-else-if="com.type=='tags' && com.show == 1">
                                                    <span v-for= "(tag, index) in com.value"
                                                    :key= "index"
                                                    >
                                                        <span style="background-color:#737e8a; color:white; margin-left:0.125rem; margin-right:0.125rem;" class="badge badge-pill">{{ tag }}</span><br>
                                                    </span>
                                                </span>
                                                <span v-else-if="(com.type=='single_component' || com.type=='multiple_component' || com.type=='no_component')">
                                                    <div class="card mg-12" style="border-radius: 10px; border-width: 1.5px; border-color: #297acf; margin-bottom: 10px;">
                                                        <div class="d-flex align-items-center justify-content-center" style="padding: 10px;">
                                                            <a :href="'https://internal.thuocsi.vn/cs/ticket/new?orderId=' + component[0].value" target="_blank">
                                                                <span style="cursor:pointer; margin-right: 4px;"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1d74cf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></span>
                                                                <span style="font-size:13px; color: #297acf; font-weight: 100; cursor:pointer;">Add New Ticket</span>
                                                            </a>
                                                        </div>   
                                                    </div>
                                                    <!-- Multiple Component -->
                                                    <div v-if="com.type == 'multiple_component' && com.value.length!=0" class="pd-5">
                                                        <div class="card mg-12" style="border-radius: 10px; border-width: 1.5px; border-color: #cad6e6;border-left-width: 3px; border-left-color: #768aa0; margin-bottom: 10px;" v-for= "(compo, index) in com.value"
                                                        :key= "index"
                                                        >
                                                            <div class="d-flex align-items-center justify-content-between" style="padding: 10px;">
                                                                <span style="font-size:13px;">{{ compo[1].value }}</span>
                                                                <div>    
                                                                    <span style="color:#4f5d6b;font-size:12px;">{{ compo[4].value }}</span>
                                                                    <span class="view-order-ticket" style="cursor:pointer;" @click="openThucosiModal(compo)"><svg xmlns="http://www.w3.org/2000/svg" title="" width="15" height="15" data-toggle="tooltip" viewBox="0 0 24 24" fill="none" stroke="#f7c179" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></span>
                                                                    <span style="cursor:pointer;"><a :href="'https://internal.thuocsi.vn/cs/ticket/my-ticket?ticketCode='+compo[1].value" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#84aed9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg></a></span>
                                                                </div>   
                                                            </div>
                                                        </div>
                                                    </div>
                                                </span>
                                            </p>  
                                        </div>
                                    </div>
                                </div>

                                <!-- No Component -->
                                <div v-if="sidebar.component_type == 'no'" class="col s12" :class="'no_' + sidebar.class + '_component'">
                                    <p style="color:#4f5d6b;">{{ sidebar.text }}</p>
                                    <p v-if="sidebarData.create[sidebar.class] && !openCreateFormArrayInternal[sidebar.class]" style="color:#0168fa; cursor:pointer;" @click="openCreateForm(sidebar.class)">Create new {{ sidebar.class }}</p>
                                </div>

                                <!-- Create Form -->
                                <div class="col s12 pd-x-0" :class="integrationName + '_create_' + sidebar.class + '_form'" v-if="sidebarData.create[sidebar.class] && openCreateFormArrayInternal[sidebar.class]">
                                    <form :class="'create_'+sidebar.class+'_form_field'">
                                        <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                            <div v-for = "(createComponent, index) in sidebarData.create[sidebar.class].components"
                                                :key = "index"
                                                class="form-group">
                                                <label v-if="createComponent.type!='button' && createComponent.type!='input_field' && createComponent.type!='add_field'" class="d-block">{{ createComponent.label }}</label>
                                                <input v-if="createComponent.type == 'text' || createComponent.type == 'number'" min="0" :max="createComponent.type == 'number' ? createComponent.max : ''" :type="createComponent.type" class="form-control" :class="integrationName + '_create_' + sidebar.class + '_' + createComponent.class"
                                                :placeholder="createComponent.placeholder">
                                                <input v-else-if="createComponent.type == 'email'" type="email" class="form-control" :class="integrationName + '_create_' + sidebar.class + '_' + createComponent.class" :value="createComponent.value" readonly="true">
                                                <select v-if="createComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class">
                                                    <option v-for= "(option, index) in createComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <select v-if="createComponent.type == 'dropdown_api'" class="form-control custom-select" :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" @change="callRandomApi(integrationName, createComponent.class, createComponent.api, integrationID, createComponent.attributes, createComponent.email, $event, 'create', sidebar.class, createComponent.type, '')">
                                                    <option v-for= "(option, index) in createComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <span v-if="createComponent.type=='button'">
                                                    <div :class="'create_'+ sidebar.class + '_' + createComponent.class + '_div'">
                                                        <div v-for= "(dropdownValue, index) in randomDropdown"
                                                        :key= "index"
                                                        >
                                                            <div v-if="dropdownValue!=''" class="mg-t-10 d-flex align-items-center justify-content-between">
                                                                <div class="form-group pd-l-0" style="width: -webkit-fill-available;">
                                                                    <label class="d-block">{{ capitalizeFirstLetter(createComponent.class) }} {{ index + 1 }}</label>
                                                                    <input type="text" :name="'create_'+createComponent.name" :value="dropdownValue" class="form-control" readonly>
                                                                </div>
                                                                <div class="form-group mg-b-0 pd-l-10">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="removeRandomData(index, dropdownValue)">
                                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="mb-2 btn btn-xs btn-primary" :class="createComponent.class" @click="addRandomData(createComponent, integrationName, integrationID, sidebar.class, 'create','create_'+ sidebar.class + '_' + createComponent.class + '_div')">{{ createComponent.label }}</button>
                                                </span>
                                                <span v-if="createComponent.type=='add_field'">
                                                    <div :class="'create_'+ sidebar.class + '_' + createComponent.class + '_div'">
                                                        <div v-for= "(emailValue, index) in guestEmails"
                                                        :key= "index"
                                                        class="d-flex align-items-center justify-content-between">
                                                            <div class="form-group pd-l-0" style="width: -webkit-fill-available;">
                                                                <label class="d-block">{{ capitalizeFirstLetter(createComponent.class) }} {{ index + 1 }}</label>
                                                                <input type="text" class="form-control" :placeholder="createComponent.placeholder" :name="'create_'+createComponent.name" :value="emailValue">
                                                            </div>
                                                            <div class="form-group mg-b-0 pd-l-10">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="removeRandomData(index, emailValue)">
                                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="mb-2 btn btn-xs btn-primary" :class="createComponent.class" @click="addRandomData(createComponent, integrationName, integrationID, sidebar.class, 'create','create_'+ sidebar.class + '_' + createComponent.class + '_div')">{{ createComponent.label }}</button>
                                                </span>
                                                <span v-else-if="createComponent.type=='date'">
                                                    <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="date" v-model="date" value-type="timestamp" :showMinute="false" :showSecond="false" :default-value="new Date()" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="createComponent.type=='time'">
                                                    <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newTimeOpen" @change="handleChange2" type="time" v-model="time" value-type="timestamp" :showSecond="false" :disabled-time="notBeforeNow" placeholder="Select Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <span v-else-if="createComponent.type=='datetime'">
                                                    <date-picker :class="integrationName + '_create_' + sidebar.class + '_'  + createComponent.class" :open.sync="newDateOpen" @change="handleChange" type="datetime" v-model="datetime" value-type="timestamp" :minute-step="1" :showSecond="false" :default-value="new Date().setHours(new Date().getHours() + 1, 0, 0, 0)" :disabled-date="notBeforeToday" :disabled-time="notBeforeNow" placeholder="Select Date & Time" :clearable="false" style="width: 100%;"></date-picker>
                                                </span>
                                                <div class="invalid-feedback" :class="integrationName + '-create-' + sidebar.class + '-' + createComponent.class + '-error'"></div>
                                            </div>
                                            
                                            <div :class="integrationName + '-create-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                <button type="button"
                                                    class="btn btn-xs btn-primary" @click="createData(sidebar.class, sidebarData.create[sidebar.class].components, integrationName, integrationID)">Create {{sidebar.class}}
                                                </button>
                                                <button type="button"
                                                    class="btn btn-xs btn-secondary" @click="openCreateForm(sidebar.class)">Cancel
                                                </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { component } from 'vue/types/umd';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    components: { DatePicker },
    props: ["sidebarData", "integrationName", "dataStatus","openCreateFormArray","openUpdateFormArray", "integrationID", "errorMsg", "commentData", "thread"],
    data(){
        return {
            formData: {},
            openCreateFormArrayInternal: {},
            openUpdateFormArrayInternal: {},
            randomData: {},
            guestEmails: [""],
            randomDropdown: [],
            arrayObject: [],
            datetime: "",
            datetime1: "",
            newDateOpen: false,
            newDateOpen1: false,
            newTimeOpen: false,
            date: "",
            time:"",
            searchDateOpen: false,
            search_date: "",
            updateComponentModal: {}
        }
    },
    methods: {
        collapseHeader(selectorName){
            if($(`${selectorName}`).hasClass('show')){
                $(`${selectorName}`).removeClass('show');
                $(`${selectorName}_caret`).removeClass('fa-caret-up').addClass('fa-caret-down');
            }else{
                $(`${selectorName}`).addClass('show');
                $(`${selectorName}_caret`).addClass('fa-caret-up').removeClass('fa-caret-down');
            }
        },
        buttonFunction(api_name, int_name, int_id, components, buttonValue){
            let bodyData = {};
            components.forEach(component => {
                let identifier = component.class; 
                let identifier_value = component.value;
                if(component.type == 'dropdown'){
                    identifier_value = component.dropdown_value;
                }
                bodyData[identifier] = identifier_value;
                if(this.sidebarData.fetch[0]['associated_id'] && this.sidebarData.fetch[0]['associated_id']!=''){
                    bodyData['associated_id'] = this.sidebarData.fetch[0]['associated_id'];
                }
                if(this.sidebarData.fetch[0]['associated_type'] && this.sidebarData.fetch[0]['associated_type']!=''){
                    bodyData['associated_type'] = this.sidebarData.fetch[0]['associated_type'];
                }
                if(this.sidebarData.fetch[0]['class'] == 'contact' && this.sidebarData.fetch[0]['components'].length != 0 && this.sidebarData.fetch[0]['components'][0][0]['value']!=''){
                    bodyData['contact_id'] = this.sidebarData.fetch[0]['components'][0][0]['value'];
                }
                if(this.sidebarData.fetch[0]['organizer_email'] && this.sidebarData.fetch[0]['organizer_email']!=''){
                    bodyData['organizer_email'] = this.sidebarData.fetch[0]['organizer_email'];
                }
            });
            bodyData['integration_id'] = int_id;
            if(buttonValue!=''){
                bodyData['buttonValue'] = buttonValue;
            }

            fetch("https://app.helpwise.io/api/integration-vue/"+int_name+"/"+api_name+".php", {
                method: 'POST', 
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            })
            .then(async response => {
                const dataResponse = await response.json();
                if (!response.status) {
                    const error = (dataResponse && dataResponse.message) || response.status;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
            this.randomData = {};
            this.$emit("postData", int_name);
        },
        createCustomData(className, components, int_name, int_id, componentData, parentComponentID){
            let createFormData = {};
            let flag=0;
            components.forEach(component => {
                let identifier = component.class;
                let identifier_value = $(`.${int_name}_create_${className}_${identifier}`).val();
                let identifier_label = component.label;
                if(component.type == 'date' || component.type == 'time' || component.type == 'datetime' || component.type == 'datetime1'){
                    identifier_value = $(`.${int_name}_create_${className}_${identifier}`).children().children().val();
                }
                if(int_name == 'jira' || int_name == 'clickup' || int_name == 'trello'){
                    identifier_value = $(`.${int_name}_create_${className}_${identifier}_${parentComponentID}`).val();
                }
                if(component.required == 1 && (identifier_value == '' || identifier_value == 0)){
                    if(int_name == 'jira' || int_name == 'clickup' || int_name == 'trello'){
                        $(`.${int_name}_create_${className}_${identifier}_${parentComponentID}`).removeClass('is-valid').addClass('is-invalid');
                    }else{
                        $(`.${int_name}_create_${className}_${identifier}`).removeClass('is-valid').addClass('is-invalid');
                    }
                    $(`.${int_name}-create-${className}-${identifier}-error`).text(`${identifier_label} cannot be empty`);
                    flag=1;
                }else{
                    if(int_name == 'jira' || int_name == 'clickup' || int_name == 'trello'){
                        $(`.${int_name}_create_${className}_${identifier}_${parentComponentID}`).removeClass('is-invalid');
                    }else{
                        $(`.${int_name}_create_${className}_${identifier}`).removeClass('is-invalid');
                    }
                    $(`.${int_name}-create-${className}-${identifier}-error`).text('');
                }
                createFormData[identifier] = identifier_value;
                if(component.type == 'button'){
                    if(component.action == 'input_field'){
                        let emailData = {};
                        $(`input[name=create_${component.name}]`).each(function () {
                            if ($(this).val() != "" && $(this).val() != undefined && $(this).val() != null) {
                                let random_text = $(this).val();
                                emailData[random_text] = random_text;
                            }
                        });
                        createFormData['emailData'] = emailData;
                    }
                }
            });
            if(flag == 0){
                createFormData['integration_id'] = int_id;
                createFormData['functionality'] = 'create_' + className;
                createFormData['locationURL'] = location.pathname;
                let comData = [];
                if(int_name == 'woocommerce'){
                    componentData.value.forEach(ran => {
                        let coData = {};
                        ran.forEach(rand => {
                            let label = '';
                            if(rand.class == 'custom_field_id'){
                                label = "id";
                            }else if(rand.class == 'custom_field_key'){
                                label = "key";
                            }else if(rand.class == 'custom_field_value'){
                                label = "value";
                            }
                            let label_value = rand.value; 
                            coData[label] = label_value;
                        });
                        comData.push(coData);
                    });
                    createFormData['componentData'] = comData;
                }
                createFormData['parent_component_id'] = parentComponentID;
                if(Object.keys(this.randomData).length!=0){
                    createFormData['randomData'] = this.randomData;
                }
                if(this.sidebarData.fetch[0]['associated_id'] && this.sidebarData.fetch[0]['associated_id']!=''){
                    createFormData['associated_id'] = this.sidebarData.fetch[0]['associated_id'];
                }
                if(this.sidebarData.fetch[0]['associated_type'] && this.sidebarData.fetch[0]['associated_type']!=''){
                    createFormData['associated_type'] = this.sidebarData.fetch[0]['associated_type'];
                }
                if(this.sidebarData.fetch[0]['class'] == 'contact' && this.sidebarData.fetch[0]['components'].length != 0 && this.sidebarData.fetch[0]['components'][0][0]['value']!=''){
                    createFormData['contact_id'] = this.sidebarData.fetch[0]['components'][0][0]['value'];
                }
                if(this.sidebarData.fetch[0]['organizer_email'] && this.sidebarData.fetch[0]['organizer_email']!=''){
                    createFormData['organizer_email'] = this.sidebarData.fetch[0]['organizer_email'];
                }
                fetch("https://app.helpwise.io/api/integration-vue/"+int_name+"/post.php", {
                    method: 'POST', 
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(createFormData)
                })
                .then(async response => {
                    const createResponse = await response.json();
                    if (!response.status) {
                        const error = (createResponse && createResponse.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error("There was an error!", error);
                });
                this.openCreateFormArrayInternal[className] = false;
                this.randomData = {};
                this.randomDropdown = [];
                this.guestEmails = [];
                this.arrayObject = [];
                this.$emit("postData", int_name);
            }
        },
        createData(className, components, int_name, int_id){
            let createFormData = {};
            let flag=0;
            components.forEach(component => {
                let identifier = component.class;
                let identifier_value = $(`.${int_name}_create_${className}_${identifier}`).val();
                let identifier_label = component.label;
                if(component.type == 'date' || component.type == 'time' || component.type == 'datetime' || component.type == 'datetime1'){
                    identifier_value = $(`.${int_name}_create_${className}_${identifier}`).children().children().val();
                }
                if(component.required == 1 && (identifier_value == '' || identifier_value == 0)){
                    $(`.${int_name}_create_${className}_${identifier}`).removeClass('is-valid').addClass('is-invalid');
                    $(`.${int_name}-create-${className}-${identifier}-error`).text(`${identifier_label} cannot be empty`);
                    flag=1;
                }else{
                    if(component.required == 1 && component.type == 'number'){
                        if(identifier_value < 0 || (component.max!='' && identifier_value > component.max)){
                            $(`.${int_name}_create_${className}_${identifier}`).removeClass('is-valid').addClass('is-invalid');
                            $(`.${int_name}-create-${className}-${identifier}-error`).text(`Please enter valid ${identifier_label}`);
                            flag=1;
                        }else{
                            $(`.${int_name}_create_${className}_${identifier}`).removeClass('is-invalid');
                            $(`.${int_name}-create-${className}-${identifier}-error`).text('');
                        }
                    }else if(component.required == 1 && component.type == 'datetime1'){
                        let identifier_value1 = $(`.${int_name}_create_${className}_start_date`).children().children().val();
                        if(moment(identifier_value1).format("X") >= moment(identifier_value).format("X")){
                            $(`.${int_name}_create_${className}_${identifier}`).removeClass('is-valid').addClass('is-invalid');
                            $(`.${int_name}-create-${className}-${identifier}-error`).text(`End time must be greater than Start time`);
                            flag=1;
                        }else{
                            $(`.${int_name}_create_${className}_${identifier}`).removeClass('is-invalid');
                            $(`.${int_name}-create-${className}-${identifier}-error`).text('');
                        }
                    }else{
                        $(`.${int_name}_create_${className}_${identifier}`).removeClass('is-invalid');
                        $(`.${int_name}-create-${className}-${identifier}-error`).text('');
                    }
                }
                createFormData[identifier] = identifier_value;
                if(component.type == 'button' || component.type == 'add_field'){
                    if(component.action == 'input_field'){
                        let emailData = {};
                        $(`input[name=create_${component.name}]`).each(function () {
                            if ($(this).val() != "" && $(this).val() != undefined && $(this).val() != null) {
                                let random_text = $(this).val();
                                emailData[random_text] = random_text;
                            }
                        });
                        createFormData['emailData'] = emailData;
                    }
                }
            });
            if(flag == 0){
                createFormData['integration_id'] = int_id;
                createFormData['functionality'] = 'create_' + className;
                createFormData['locationURL'] = location.pathname;
                if(Object.keys(this.randomData).length!=0){
                    createFormData['randomData'] = this.randomData;
                }
                if(this.sidebarData.fetch[0]['associated_id'] && this.sidebarData.fetch[0]['associated_id']!=''){
                    createFormData['associated_id'] = this.sidebarData.fetch[0]['associated_id'];
                }
                if(this.sidebarData.fetch[0]['associated_type'] && this.sidebarData.fetch[0]['associated_type']!=''){
                    createFormData['associated_type'] = this.sidebarData.fetch[0]['associated_type'];
                }
                if(this.sidebarData.fetch[0]['class'] == 'contact' && this.sidebarData.fetch[0]['components'].length != 0 && this.sidebarData.fetch[0]['components'][0][0]['value']!=''){
                    createFormData['contact_id'] = this.sidebarData.fetch[0]['components'][0][0]['value'];
                }
                if(this.sidebarData.fetch[0]['organizer_email'] && this.sidebarData.fetch[0]['organizer_email']!=''){
                    createFormData['organizer_email'] = this.sidebarData.fetch[0]['organizer_email'];
                }
                fetch("https://app.helpwise.io/api/integration-vue/"+int_name+"/post.php", {
                    method: 'POST', 
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(createFormData)
                })
                .then(async response => {
                    const createResponse = await response.json();
                    if (!response.status) {
                        const error = (createResponse && createResponse.message) || response.status;
                        return Promise.reject(error);
                    }
                    this.openCreateFormArrayInternal[className] = false;
                    this.randomData = {};
                    this.randomDropdown = [];
                    this.guestEmails = [];
                    this.arrayObject = [];
                    if(int_name == 'easy-calendar' || int_name == 'google-calendar' || int_name == 'outlook-calendar'){
                        let calendarData = {
                            "int_name": int_name,
                            "int_id": int_id,
                            "date": $(`.${int_name}_search_event`).children().children().val(),
                            "contactID": this.thread.data.contact.id,
                            "email": this.thread.data.contact.emails[0],
                            "inboxType": this.thread.data.mailboxType,
                            "mailbox_id": this.thread.data.mailbox_id
                        };
                        this.$emit('calendarIntegration',calendarData);
                    }else{
                        this.$emit("postData", int_name);
                    }
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error("There was an error!", error);
                });
            }
        },
        updateData(className, components, int_name, int_id){
            let updateFormData = {};
            let flag=0;
            components.forEach(component => {
                let identifier = component.class;
                let identifier_value = $(`.${int_name}_edit_${className}_${identifier}`).val();
                // let identifier_value = document.getElementsByClassName(int_name+'_edit_'+className+'_'+identifier)[0].value;
                let identifier_label = component.label;
                if(component.type == 'date' || component.type == 'time' || component.type == 'datetime' || component.type == 'datetime1'){
                    identifier_value = $(`.${int_name}_edit_${className}_${identifier}`).children().children().val();
                }
                if(component.required == 1 && (identifier_value == '' || identifier_value == 0)){
                    $(`.${int_name}_edit_${className}_${identifier}`).removeClass('is-valid').addClass('is-invalid');
                    $(`.${int_name}-edit-${className}-${identifier}-error`).text(`${identifier_label} cannot be empty`);
                    flag=1;
                }else{
                    if(component.required == 1 && component.type == 'number'){
                        if(identifier_value < 0 || (component.max!='' && identifier_value > component.max)){
                            $(`.${int_name}_edit_${className}_${identifier}`).removeClass('is-valid').addClass('is-invalid');
                            $(`.${int_name}-edit-${className}-${identifier}-error`).text(`Please enter valid ${identifier_label}`);
                            flag=1;
                        }else{
                            $(`.${int_name}_edit_${className}_${identifier}`).removeClass('is-invalid');
                            $(`.${int_name}-edit-${className}-${identifier}-error`).text('');
                        }
                    }else if(component.required == 1 && component.type == 'datetime1'){
                        let identifier_value1 = $(`.${int_name}_edit_${className}_start_date`).children().children().val();
                        if(moment(identifier_value1).format("X") >= moment(identifier_value).format("X")){
                            $(`.${int_name}_edit_${className}_${identifier}`).removeClass('is-valid').addClass('is-invalid');
                            $(`.${int_name}-edit-${className}-${identifier}-error`).text(`End time must be greater than Start time`);
                            flag=1;
                        }else{
                            $(`.${int_name}_edit_${className}_${identifier}`).removeClass('is-invalid');
                            $(`.${int_name}-edit-${className}-${identifier}-error`).text('');
                        }
                    }else{
                        $(`.${int_name}_edit_${className}_${identifier}`).removeClass('is-invalid');
                        $(`.${int_name}-edit-${className}-${identifier}-error`).text('');
                    }
                }
                updateFormData[identifier] = identifier_value;
                if(component.type == 'button' || component.type == 'add_field'){
                    if(component.action == 'input_field'){
                        let emailData = {};
                        $(`input[name=edit_${component.name}]`).each(function () {
                            if ($(this).val() != "" && $(this).val() != undefined && $(this).val() != null) {
                                let random_text = $(this).val();
                                emailData[random_text] = random_text;
                            }
                        });
                        updateFormData['emailData'] = emailData;
                    }
                }
                if(component.text_value && component.text_value!= ''){
                    updateFormData[identifier+'_id'] = component.text_value;
                }
            });
            if(flag == 0){
                updateFormData['id'] = this.formData[className]['id'];
                updateFormData['functionality'] = 'update_' + className;
                updateFormData['integration_id'] = int_id;
                updateFormData['locationURL'] = location.pathname;
                if(this.sidebarData.fetch[0]['associated_id'] && this.sidebarData.fetch[0]['associated_id']!=''){
                    updateFormData['associated_id'] = this.sidebarData.fetch[0]['associated_id'];
                }
                if(this.sidebarData.fetch[0]['associated_type'] && this.sidebarData.fetch[0]['associated_type']!=''){
                    updateFormData['associated_type'] = this.sidebarData.fetch[0]['associated_type'];
                }
                if(this.sidebarData.fetch[0]['class'] == 'contact' && this.sidebarData.fetch[0]['components'].length != 0 && this.sidebarData.fetch[0]['components'][0][0]['value']!=''){
                    updateFormData['contact_id'] = this.sidebarData.fetch[0]['components'][0][0]['value'];
                }
                if(this.sidebarData.fetch[0]['organizer_email'] && this.sidebarData.fetch[0]['organizer_email']!=''){
                    updateFormData['organizer_email'] = this.sidebarData.fetch[0]['organizer_email'];
                }
                if(Object.keys(this.randomData).length!=0){
                    updateFormData['randomData'] = this.randomData;
                }
                fetch("https://app.helpwise.io/api/integration-vue/"+int_name+"/post.php", {
                    method: 'POST', 
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateFormData)
                })
                .then(async response => {
                    const updateResponse = await response.json();
                    if (!response.status) {
                        const error = (updateResponse && updateResponse.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error("There was an error!", error);
                });
                this.openUpdateFormArrayInternal[className] = false;
                this.randomData = {};
                this.randomDropdown = [];
                this.guestEmails = [];
                this.arrayObject = [];
                this.$emit("postData", int_name);
            }
        },
        openCreateForm(className){
            this.openCreateFormArrayInternal[className] = !this.openCreateFormArrayInternal[className];
            this.randomData = {};
        },
        openUpdateForm(className, components, int_name){
            this.guestEmails = [];
            if(!this.openUpdateFormArrayInternal[className] || this.openUpdateFormArrayInternal[className] == false || components.length != 0){
                this.openUpdateFormArrayInternal[className] = true;
            }else{
                this.openUpdateFormArrayInternal[className] = false;
            }
            this.randomData = {};
            this.formData = {};
            this.formData[className] = {};
            this.updateComponentModal = {};
            components.forEach(component => {
                let identifier = component.class; 
                let identifier_value = component.value;
                let identifier_label = component.label;
                this.updateComponentModal[identifier] = identifier_value;
                if(component.type == 'dropdown'){
                    identifier_value = component.dropdown_value;
                }
                if(component.type == 'list' && component.value.length!=0){
                    component.value.forEach(guestData => {
                        if(!this.guestEmails.includes(guestData.label)){
                            this.guestEmails.push(guestData.label);
                        }
                    });
                }
                if(component.type == 'tags' && component.value.length!=0 && int_name == 'daylite'){
                    component.value.forEach(guestData => {
                        if(!this.guestEmails.includes(guestData)){
                            this.guestEmails.push(guestData);
                        }
                    });
                }
                this.formData[className][identifier_label] = identifier_value;
                $(`.${int_name}_edit_${className}_${identifier}`).val(identifier_value);
            });
        },
        addRandomData(component, int_name, int_id, className, action, classDiv){
            let value = $(`.${int_name}_${action}_${className}_${component.class}`).val();
            // let divLength = $(`.${classDiv}`).children('div').length;
            // let capClassName = component.class.charAt(0).toUpperCase() + component.class.slice(1);
            // divLength =  parseInt(divLength) + 1;
            if(component.action == "dropdown" && value!='' || value!=undefined){
                if(!this.randomData[value]){
                    var selectedData = $(`.${int_name}_${action}_${className}_${component.class} option[value=${value}]`).text();
                    selectedData = selectedData.trim();
                    var random_index = '';
                    if(!this.randomDropdown.includes(selectedData) && selectedData!=''){
                        this.randomDropdown.push(selectedData);
                    }
                    this.randomData[value]=value;
                    this.arrayObject[selectedData] = value;
                }
            }    
            if(component.action == "input_field"){
                // $(`.${classDiv}`).append(`
                //     <div class="mg-t-10 d-flex align-items-center justify-content-between ${classDiv}_${divLength}">
                //         <div class="form-group pd-l-0" style="width: -webkit-fill-available;">
                //             <label class="d-block">${capClassName} ${divLength}</label>
                //             <input type="text" class="form-control ${component.class}" placeholder="${component.placeholder}" name="${action}_${component.name}">
                //         </div>
                //         <div class="form-group mg-b-0 pd-l-10">
                //             <svg class="close-create-random-data" id="${int_name}_${action}_${classDiv}_${divLength}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                //             <line x1="18" y1="6" x2="6" y2="18"></line>
                //             <line x1="6" y1="6" x2="18" y2="18"></line>
                //             </svg>
                //         </div>
                //     </div>
                // `);
                var random_text = '';
                var random_index = '';
                $(`input[name=${action}_${component.name}]`).each(function (index) {
                    if ($(this).val() != undefined && $(this).val() != null) {
                        random_text = $(this).val();
                        random_index = index;
                    }
                });
                if(!this.guestEmails.includes(random_text)){
                    this.guestEmails.splice(random_index, 0, random_text);
                }else if(random_text!=''){
                    this.guestEmails.push('');
                }
            }
        },
        removeRandomData(indexData, selectedData){
            if(this.guestEmails.length!=0){
                this.guestEmails.splice(indexData, 1);
            }
            if(this.randomDropdown.length!=0){
                let value = this.arrayObject[selectedData.trim()];
                delete this.randomData[value];
                this.randomDropdown.splice(indexData, 1);
            }
        },
        callRandomApi(int_name, className, api_name, int_id, attributes, email, event, action, sectionClass, action_type, parentClassValue){
            let pm_data = {};
            if(event.target.value!=0){
                if(attributes.length!=0){
                    attributes.forEach(attribute => {
                        let identifier = attribute.class; 
                        let identifier_value = $(`.${int_name}_fetch_custom_${identifier}`).val();
                        if(identifier_value!=0){
                            pm_data[identifier] = identifier_value;
                        }
                    });
                }
                pm_data[className] = event.target.value;
                pm_data[sectionClass] = parentClassValue;
                pm_data['locationURL'] = location.pathname;
                pm_data['email'] = email;
                pm_data['integration_id'] = int_id;
                fetch("https://app.helpwise.io/api/integration-vue/"+int_name+"/"+api_name+".php", {
                    method: 'POST', 
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pm_data)
                })
                .then(async response => {
                    const dataResponse = await response.json();
                    if(dataResponse.data['fetch'][0]['final'] == 1){
                        this.$emit("pmIntegration", dataResponse.data);
                    }else{
                        if(action == 'create' || action == 'update'){
                            let componentData = dataResponse.data['fetch'][0];
                            $(`.${int_name}_${action}_${sectionClass}_${componentData.class}`).html('');
                            componentData.components[0].value.forEach(component => {
                                $(`.${int_name}_${action}_${sectionClass}_${componentData.class}`).append(`<option value="${component.value}">${component.label}</option>`);
                            });
                        }else{
                            let componentData = dataResponse.data['fetch'][0];
                            if(action_type == 'link_api'){
                                $(`.${int_name}_${sectionClass}_view_all_${className}_${parentClassValue}`).addClass('d-none');
                                if(this.commentData[parentClassValue].length==0 && componentData.components.length!=0){
                                    this.commentData[parentClassValue] = componentData.components;
                                    // this.$emit("commentData",this.commentData);
                                }
                                // $(`.${int_name}_${sectionClass}_all_${className}_${parentClassValue}`).html('');
                                // $(`${int_name}_${sectionClass}_all_${className}_${parentClassValue}`).append(`<option value="${component.value}">${component.label}</option>`);
                            }else{
                                for(let i=0; i<componentData.components.length; i++){
                                    if(componentData.components[i].value.length > 1){
                                        let fetchClass = componentData.components[i].class;
                                        $(`.${int_name}_fetch_custom_${fetchClass}`).removeClass('d-none');
                                        $(`.${int_name}_fetch_custom_${fetchClass}`).html('');
                                        componentData.components[i].value.forEach(component => {
                                            $(`.${int_name}_fetch_custom_${fetchClass}`).append(`<option value="${component.value}">${component.label}</option>`);
                                        });
                                    }else{
                                        $(`.${int_name}_fetch_custom_${componentData.class}`).addClass('d-none');
                                    }
                                }
                            }
                        }
                    }
                    if (!response.status) {
                        const error = (dataResponse && dataResponse.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error("There was an error!", error);
                });
            }
        },
        searchEvent(value, type) {
            console.log("value",value);
            this.searchDateOpen = false;
            let calendarData = {
                "int_name": this.integrationName,
                "int_id": this.integrationID,
                "date": moment(value).format("YYYY-MM-DD"),
                "contactID": this.thread.data.contact.id,
                "email": this.thread.data.contact.emails[0],
                "inboxType": this.thread.data.mailboxType,
                "mailbox_id": this.thread.data.mailbox_id
            };
            this.$emit('calendarIntegration',calendarData);
        },
        handleChange(value, type) {
            if (type === 'minute') {
                this.newDateOpen = false;
            }
        },
        handleChange1(value, type) {
            if (type === 'minute') {
                this.newDateOpen1 = false;
            }
        },
        handleChange2(value, type){
            if(type == 'minute'){
                this.newTimeOpen = false;
            }
        },
        notBeforeToday(date) {
            return date < new Date(new Date().setHours(0, 0, 0, 0));
        },
        notBeforeNow(date) {
            return date < new Date(new Date().setHours(new Date().getHours() + 1, 0, 0, 0));
        },
        capitalizeFirstLetter(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
    beforeMount() {
        this.openUpdateFormArrayInternal = {...this.openUpdateFormArray};
        this.openCreateFormArrayInternal = {...this.openCreateFormArray};
        this.randomData = {};
    },
}
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
    .calendar_button{
        padding: 2px 8px;
        margin-left: 8px;
        border: 1px solid #dadce0;
        border-radius: 14px;
        background-color: transparent;
        min-width: 48px;
        max-width: 100%;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
    }
    .fa-pen{
        cursor: pointer;
    }
</style>