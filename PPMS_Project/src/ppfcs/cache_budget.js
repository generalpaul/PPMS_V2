export class cache_budget{
    HEADER = {};
    REGULAR = [];
    SEMI_REGULAR = [];
    STAFF = [];
    GUEST=[];
    USER={};
    TOTAL=0;
    STATUS = "NONE";
    IS_COPYING=false;
    _INPUT_AMT_REGULAR=0;
    _INPUT_AMT_SEMI_REGULAR=0;
    _INPUT_AMT_STAFF=0;
    _INPUT_AMT_GUEST=0;
    _INPUT_AMT_TOTAL=0;
    IS_COPYING = false;
    _LOADING_BUDGET = 0;
   
    CALLER={ACTION:null,ACTION_CALLER:null,VALUE1:null,VALUE2:null,VALUE3:null,VALUE4:null};
    OBSERVERS = {
        pass_group: [], 
        pass_indiv: [], 
        enable_approved: [], 
        copy_template_guest:[],
        copy_template:[],
        budget_refresh:[], //0
        reset_all:[],
        refreshPersonnelTab:[], //1
        reset_summary:[],//0
        budget_loaded: [],
        disable_search_personnel: [],
        pass_job: []
    };
}