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
            <div v-if="!datastatus">
                <p style="padding:5px;color:#4f5d6b;">Uh oh, something went wrong.<br>
                </p> 
            </div>
            <div v-else>
                <div v-for= "(sidebar, index) in sidebarData.fetch"
                :key = "index">

                    <!-- Single Component -->
                    <div class="pd-y-10" v-if= "sidebar.components.length == 1">
                        <div class="collapse-body shadow-sm bg-white rounded">
                            <div class="collapse-header row custom-header" style="cursor: pointer;height:50px;">
                                <div class="col-8">
                                    <p class="pd-l-13 pd-t-15">
                                        {{ sidebar.title }}
                                        <i v-if="sidebar.update==1" class="fas fa-xs fa-pen" :class="integrationName + sidebar.class + 'edit_button'" @click="openUpdateForm(sidebar.class)"></i>
                                    </p>  
                                </div>
                                <div class="col-4 pd-t-15">
                                    <p class="integration_collapse_header pd-r-10 text-right">
                                        <i class="fas fa-caret-down" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="integration_collapsible collapse pd-b-1 show" style="word-wrap: break-word;line-height: 1.50;">
                                <div class="col s12 integration_component_details" v-if="updateshowForm == true && sidebar.update==1">
                                    <p v-for= "(component, index) in sidebar.components[0]"
                                        :key = "index"
                                    >
                                        <span v-if="component.type=='text' && component.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ component.label }}</span><br v-if="component.type=='text' && component.show == 1">
                                        <span v-if="component.type=='text' && component.show == 1" style="color:#4f5d6b;font-size:13px;">{{component.value ? component.value : 'No ' + component.label}}</span>
                                        <span v-else-if="component.type=='link' && component.show == 1">
                                            <a :href="component.value" target="_blank">{{component.label}}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        </span>
                                    </p>                  
                                </div>
                                <div class="col s12 integration_component_details pd-x-0" :class="'edit-'+sidebar.class+'-form'" v-else-if="updateshowForm == false && sidebar.update==1">
                                    <form :class="'update_'+sidebar.class+'_form_field'">
                                        <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                            <div v-for = "(updateComponent, index) in sidebarData.update[sidebar.class].components"
                                                :key = "index"
                                                class="form-group">
                                                <label class="d-block">{{ updateComponent.label }}</label>
                                                <input v-if="updateComponent.type == 'text'" type="text" class="form-control" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class"
                                                :placeholder="updateComponent.placeholder">
                                                <select v-if="updateComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_edit_' + sidebar.class + '_stage'">
                                                    <option v-for= "(option, index) in updateComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <div class="invalid-feedback" :class="integrationName + '-edit-' + sidebar.class + '-' + updateComponent.class + '-error'"></div>
                                            </div>
                                            
                                            <div :class="integrationName + '-edit-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                <button type="button"
                                                    class="btn btn-xs btn-primary" @click="updateData(sidebar.class)">Save
                                                </button>
                                                <button type="button"
                                                    class="btn btn-xs btn-secondary" @click="openUpdateForm(sidebar.class)">Cancel
                                                </button>
                                            </div>
                                            <div class="alert alert-danger alert-dismissible fade" role="alert" id="buttonAlert"
                                            style="display: none;">
                                            <div class="alert_message"></div>
                                            <button type="button" class="close" onclick="$('#buttonAlert').hide()">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Multiple Component -->
                    
                    <div class="pd-y-10" v-if= "sidebar.components.length>1">
                        <div class="integration-collapse-body shadow-sm bg-white rounded">
                            <div class="row integration_header" style="cursor: pointer;height:50px;">
                                <div class="col-8">
                                    <p class="pd-l-13 pd-t-15">
                                        {{ sidebar.title }}
                                    </p>
                                </div>
                                <div class="col-4 pd-t-15" data-toggle="collapse" aria-expanded="false" aria-controls="integration_details">
                                    <p class="integration_collapse_header pd-r-10 text-right show">
                                        <i class="fas fa-caret-down" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="pd-l-0 pd-b-1 collapse show" style="word-wrap: break-word;line-height: 1.5;">
                                <div class="pd-5">

                                    <div class="card rounded mg-b-10" v-for= "(component, index) in sidebar.components"
                                        :key= "index"
                                    >
                                        <div class="d-flex align-items-center justify-content-between bg-gray-100"
                                            style="padding: 15px;">
                                            <span style="font-size:13px;">{{ component[1].value }}</span>    
                                            <div>
                                                <span style="cursor:pointer;" :class="integrationName + '_edit_' + sidebar.class + '_button'" class="mg-r-10" v-if="sidebar.update == 1" @click="openMultiUpdateForm(sidebar.class, component, integrationName)"><i class="fas fa-pen fa-xs"></i></span>
                                                <span style="cursor:pointer;"><i class="fas fa-caret-down" style="color: silver;border-radius:5px;"></i></span>
                                            </div>
                                        </div>
                                        <div class="mg-l-10 mg-r-10 collapse">
                                            <p v-for= "(com, index) in component"
                                                :key = "index"
                                            >   
                                                <span v-if= "com.type=='text' && com.show == 1" style="color:#999da0ad;font-size:13px;" class="mg-t-5">{{ com.label }}</span><br v-if= "com.type=='text' && com.show == 1">
                                                <span v-if= "com.type=='text' && com.show == 1" style="color:#4f5d6b;font-size:13px;">{{com.value ? com.value : 'No ' + com.label}}</span>
                                                <span v-else-if="com.type=='link' && com.show == 1">
                                                    <a :href="com.value" target="_blank">{{com.label}}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link ml-1 mb-1">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                            <polyline points="15 3 21 3 21 9"></polyline>
                                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                                        </svg>
                                                    </a>
                                                </span>
                                            </p>  
                                        </div>
                                    </div>
                                </div>
                                <div class="col s12 mg-b-10" v-if="sidebarData.create[sidebar.class] && showForm == true" style="text-align: center;">
                                    <button type="button" :class="integrationName + '_add_' + sidebar.class + '_btn'" class="btn btn-xs btn-secondary" @click="openMultiIntegrationForm(sidebar.class)">New
                                        {{ capitalizeFirstLetter(sidebar.class) }}
                                    </button>
                                </div>
                                <div class="col s12 pd-x-0" :class="integrationName + '_create_' + sidebar.class + '_form'" v-else-if="sidebarData.create[sidebar.class] && showForm == false">
                                    <form :class="'create_'+sidebar.class+'_form_field'">
                                        <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                            <div v-for = "(createComponent, index) in sidebarData.create[sidebar.class].components"
                                                :key = "index"
                                                class="form-group">
                                                <label class="d-block">{{ createComponent.label }}</label>
                                                <input v-if="createComponent.type == 'text'" type="text" class="form-control" :class="integrationName + '_create_' + sidebar.class + '_' + createComponent.class"
                                                :placeholder="createComponent.placeholder">
                                                <select v-if="createComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_create_' + sidebar.class + '_stage'">
                                                    <option v-for= "(option, index) in createComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <div class="invalid-feedback" :class="integrationName + '-create-' + sidebar.class + '-' + createComponent.class + '-error'"></div>
                                            </div>
                                            
                                            <div :class="integrationName + '-create-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                <button type="button"
                                                    class="btn btn-xs btn-primary" @click="createData(sidebar.class)">Create {{sidebar.class}}
                                                </button>
                                                <button type="button"
                                                    class="btn btn-xs btn-secondary" @click="openMultiIntegrationForm(sidebar.class)">Cancel
                                                </button>
                                            </div>
                                            <div class="alert alert-danger alert-dismissible fade" role="alert" id="buttonAlert"
                                            style="display: none;">
                                            <div class="alert_message"></div>
                                            <button type="button" class="close" onclick="$('#buttonAlert').hide()">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div class="col s12 pd-x-0" :class="integrationName + '_edit_' + sidebar.class + '_form'" v-if="sidebarData.update[sidebar.class] && updateMultishowForm == false">
                                    <form :class="'edit_'+sidebar.class+'_form_field'">
                                        <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                            <div v-for = "(updateComponent, index) in sidebarData.update[sidebar.class].components"
                                                :key = "index"
                                                class="form-group">
                                                <label class="d-block">{{ updateComponent.label }}</label>
                                                <input v-if="updateComponent.type == 'text'" type="text" class="form-control" :class="integrationName + '_edit_' + sidebar.class + '_' + updateComponent.class"
                                                :placeholder="updateComponent.placeholder">
                                                <select v-if="updateComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_edit_' + sidebar.class + '_stage'">
                                                    <option v-for= "(option, index) in updateComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <div class="invalid-feedback" :class="integrationName + '-edit-' + sidebar.class + '-' + updateComponent.class + '-error'"></div>
                                            </div>
                                            
                                            <div :class="integrationName + '-edit-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                <button type="button"
                                                    class="btn btn-xs btn-primary" @click="updateData(sidebar.class)">Save
                                                </button>
                                                <button type="button"
                                                    class="btn btn-xs btn-secondary" @click="openMultiUpdateForm(sidebar.class, [], integrationName)">Cancel
                                                </button>
                                            </div>
                                            <div class="alert alert-danger alert-dismissible fade" role="alert" id="buttonAlert"
                                            style="display: none;">
                                            <div class="alert_message"></div>
                                            <button type="button" class="close" onclick="$('#buttonAlert').hide()">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- No component -->
                    <div class="pd-y-10" v-if= "sidebar.components.length == 0">
                        <div class="collapse-body shadow-sm bg-white rounded">
                            <div class="collapse-header row custom-header" style="cursor: pointer;height:50px;">
                                <div class="col-8">
                                    <p class="pd-l-13 pd-t-15">
                                        {{ sidebar.title }}
                                    </p>  
                                </div>
                                <div class="col-4 pd-t-15">
                                    <p class="integration_collapse_header pd-r-10 text-right">
                                        <i class="fas fa-caret-down" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="integration_collapsible collapse pd-b-1 show" style="word-wrap: break-word;line-height: 1.50;">
                                <div class="col s12 integration_component_details" :class="'no_' + sidebar.class + '_component'" v-if="showText == true">
                                    <p style="color:#4f5d6b;">{{ sidebar.text }}</p>
                                    <p style="color:#0168fa; cursor:pointer;" @click="openSingleIntegrationForm(sidebar.class)">Create new {{ sidebar.class }}</p>
                                </div>
                                <div class="col s12 integration_component_details pd-x-0" :class="'create-'+sidebar.class+'-form'" v-else>
                                    <form :class="'create_'+sidebar.class+'_form_field'">
                                        <fieldset class="form-fieldset pd-x-10" style="border: none;">

                                            <div v-for = "(createComponent, index) in sidebarData.create[sidebar.class].components"
                                                :key = "index"
                                                class="form-group">
                                                <label class="d-block">{{ createComponent.label }}</label>
                                                <input v-if="createComponent.type == 'text'" type="text" class="form-control" :class="integrationName + '_create_' + sidebar.class + '_' + createComponent.class"
                                                :placeholder="createComponent.placeholder">
                                                <select v-if="createComponent.type == 'dropdown'" class="form-control custom-select" :class="integrationName + '_create_' + sidebar.class + '_stage'">
                                                    <option v-for= "(option, index) in createComponent.dropdown"
                                                    :key= "index"
                                                    :value="option.value">{{ option.label }}
                                                    </option>
                                                </select>
                                                <div class="invalid-feedback" :class="integrationName + '-create-' + sidebar.class + '-' + createComponent.class + '-error'"></div>
                                            </div>
                                            
                                            <div :class="integrationName + '-create-' + sidebar.class + '-btn-progress'" style="display: flex; justify-content: space-between;">
                                                <button type="button"
                                                    class="btn btn-xs btn-primary" @click="createData(sidebar.class)">Create {{sidebar.class}}
                                                </button>
                                                <button type="button"
                                                    class="btn btn-xs btn-secondary" @click="openSingleIntegrationForm(sidebar.class)">Cancel
                                                </button>
                                            </div>
                                            <div class="alert alert-danger alert-dismissible fade" role="alert" id="buttonAlert"
                                            style="display: none;">
                                            <div class="alert_message"></div>
                                            <button type="button" class="close" onclick="$('#buttonAlert').hide()">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-for= "(sidebar, index) in sidebarData.create"
                :key= "index">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { component } from 'vue/types/umd';
export default {
    props: ["sidebarData", "integrationName", "datastatus"],
    data(){
        return {
            isOpen: false,
            showText: true,
            showForm: true,
            updateshowForm: true,
            updateMultishowForm: true
        }
    },
    methods: {
        openSingleIntegrationForm(classname){
            console.log("classname",classname);
            this.showText=!this.showText;
        },
        openMultiIntegrationForm(classname){
            console.log("classname",classname);
            this.showForm=!this.showForm;
        },
        openUpdateForm(classname){
            this.updateshowForm=!this.updateshowForm;
        },
        openMultiUpdateForm(classname, components, int_name){
            console.log("component dhikhao", component);
            components.forEach(component => {
                console.log("element dhikhana",component);
                let identifier = component.class; 
                let identifier_value = component.value;
                console.log("identifier",identifier);
                console.log("identifier_value",identifier_value);
                document.getElementsByClassName(int_name+'_edit_'+classname+'_'+identifier).value=identifier_value;
            });
            this.updateMultishowForm=!this.updateMultishowForm;
        },
        capitalizeFirstLetter(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
    created() {
        console.log("integration name bhi", this.integrationName);
        console.log("data dhikahao",this.sidebarData);
    }
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
</style>