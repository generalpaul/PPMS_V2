export class objBudget{
    HEADER = {};
    REGULAR = [];
    SEMI_REGULAR = [];
    STAFF = [];
    GUEST=[];
    USER={};
    TOTAL=0;
    STATUS="NONE";
    ALLOW_PASS_CONFIDENTIAL=false;
    IS_COPYING=false;
    _INPUT_AMT_REGULAR=0;
    _INPUT_AMT_SEMI_REGULAR=0;
    _INPUT_AMT_STAFF=0;
    _INPUT_AMT_GUEST=0;
    _INPUT_AMT_TOTAL=0;
    PROGRAM_USER=[];
    _LOADING_BUDGET=0;
    CALLER={ACTION:null,ACTION_CALLER:null,VALUE1:null,VALUE2:null,VALUE3:null,VALUE4:null};
    OBSERVERS = {
        init_modal:[], //0
        close_modal:[], //1
        open_modal:[], //1 
        enable_modal_button: [], //2,
        clear_budget_modal:[], //0, 
        open_modal_message:[], //3
        clear_indiv_modal: [], //0
        clear_program_modal: [], //0
        clear_log:[], //0
        clear_login_modal:[], //0
        clear_talentmanager_modal: [],//
        pass_value:[],//1
        login_passed:[],//1
        pass_group:[], //1
        copy_template:[], //1
        copy_template_guest:[],
        reset_all:[], //0
        loggedout:[], //0
        budget_dialog:[], //1
        pass_program:[], //1
        budget_refresh:[], //0
        confirm_dialog:[],//1
        enable_approved:[], //1
        pass_indiv:[], //0
        refreshPersonnelTab:[], //1
        reset_summary:[],//0
        pass_job:[],//1
        clear_job_modal:[],
        disable_search_personnel:[], //1,
        budget_loaded: [],
        logoutPage: [],
        loginPage:[]
    };
}