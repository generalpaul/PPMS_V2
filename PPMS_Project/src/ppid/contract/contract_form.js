//import {autocomplete} from '{aurelia-autocomplete}';
import {bindable,inject} from 'aurelia-framework';
import { cache_obj } from 'cache_obj';
import { cache_contract } from 'ppid/contract/cache_contract';
import { EntityManager, EntityQuery, generateID} from 'entity-manager-factory';
import { getLookups } from 'masterfiles';
import settings from 'settings';
import {ModalWizard} from 'modals/modal-wizard';
import toastr from "toastr";
import moment from 'moment';
import _ from 'underscore';
import { MultiObserver }from 'multi-observer';
import {DialogService} from 'aurelia-dialog';
import breeze from 'breeze-client';
import { contract_search } from 'ppid/contract/contract_search';


@inject(cache_obj, cache_contract, ModalWizard, toastr, MultiObserver, DialogService)

export class contract_form {

@bindable EMPLOYEE_NAME;
//@bindable EMPLOYEE_ALIAS;

_cache_obj;
_cache_contract;

_disableCreateContract = false;
_disableEditContract = true;
_disableCancelContract=true;
_disableRefreshContract=true;
_disableSaveContract=true;
_disablePrintContract=true;



MSTR_LIST=[];
NAME_ARRAY=[];
ALIAS_ARRAY=[];
COMPANY=[{ref:'', desc:''}];
DIVISION=[];
JOB_GRP_ARRAY=[];
JOB=[];
ALIAS=[];
CONTRACT_STATUS=[];



MSTR_LIST1;
COMPANY1;
DIVISION1;
JOB_GRP1;
JOB1;
ALIAS_NAME1;

CONTRACT_HDR_ID1;
GLOBAL_ID1;
COMPANY_CD1;
DIVISION_CD1;
CONTRACT_NO1;
JOB_ID1;
COMPENTENCY_LEVEL1;
CONTRACT_START_DT1;
CONTRACT_END_DT1;
DURATION_MONTHS1;
CONTRACT_FEE1;
MONTHLY_FEE1;
CONTRACT_TYPE1;
CONTRACT_STATUS1;
MAIN_CONTRACT_NO1;
TERMINATE_REASON1;
TERMINATE_DT1;
CREATED_BY1;
CREATED_DT1;
LAST_UPDATED_BY1;
LAST_UPDATED_DT1;
LEVEL_NO1;
BATCH1;
ALIAS1;

COMPANY_NAME1;
DIVISION_NAME1;
JOB_NAME1;
JOB_GRP_NAME1;
menuNameShow = false;
menuAliasShow=false;

dialogService=null;

  constructor(cache_obj,cache_contract,ModalWizard,toastr,multiObserver,DialogService) {
      if (EntityManager() === undefined) {
        return;
      }

      this.dialogService = DialogService;
      this._cache_obj= cache_obj;
      this._cache_contract= cache_contract;
      this.COMPANY1 = this._cache_obj.USER.COMPANY_ID;

      //to follow the real one
      //this._cache_obj.USER.LEVEL_NO=1;

      this.LEVEL_NO1 = this._cache_obj.USER.LEVEL_NO;
      console.log(this._cache_obj.USER);

      this._cache_obj.OBSERVERS.contract_dialog.push((val) => {
        this.fnCheckContract(val);
      });


      EntityManager().executeQuery(EntityQuery().from('COMPANY_MSTR').where('COMPANY_ID','==', this.COMPANY1)).then((found) => {
        this.COMPANY_NAME1 = found.results[0].COMPANY_NAME;
        this.COMPANY_CD1 = found.results[0].COMPANY_CD;
      });

      if (this.LEVEL_NO1==3)
      {
         var personnel = getLookups().GLOBAL_INDIV_WITH_ALIAS;
         var newPersonnel = _.sortBy(personnel, 'PERSONNEL_NAME');
         newPersonnel.forEach((item) =>
         {
           if (item.PERSONNEL_INFO_SRC=='INDIV')
             this.MSTR_LIST.push({ref:item.GLOBAL_INDIV_ID, desc:item.PERSONNEL_NAME});
         });
      }
      else
      {
        var personnel = getLookups().GLOBAL_INDIV_MSTR;
        var newPersonnel = _.sortBy(personnel, 'LAST_NAME', 'GIVEN_NAME', 'MIDDLE_NAME');
        //console.log(newPersonnel);
        newPersonnel.forEach((item) =>
        {
            this.MSTR_LIST.push({ref:item.GLOBAL_INDIV_ID, desc:item.LAST_NAME+', '+item.GIVEN_NAME+' '+item.MIDDLE_NAME});
        });
      }

      this.CONTRACT_STATUS.push({ref:'ACTIVE', desc:'ACTIVE'});
      this.CONTRACT_STATUS.push({ref:'EXPIRED', desc:'EXPIRED'});

      this.DIVISION=[{ref:'', desc:''}];
      EntityManager().executeQuery(EntityQuery().from('DIVISION_MSTR').where('COMPANY_ID','==',this.COMPANY1).orderBy('DIVISION_NAME')).then((found) => {
        found.results.forEach((all)=>{
          this.DIVISION.push({ref:all.DIVISION_ID, desc:all.DIVISION_NAME});
        });
      });

      EntityManager().executeQuery(EntityQuery().from('JOB_GRP_MSTR').where('COMPANY_ID','==',this.COMPANY1).orderBy('JOB_GRP_DESC')).then((found) => {
        found.results.forEach((all)=>{
          this.JOB_GRP_ARRAY.push(all.JOB_GRP_ID);
        });
      });



      this.JOB=[{ref:'', desc:''}];
      EntityManager().executeQuery(EntityQuery().from('JOB_MSTR').orderBy('JOB_DESC')).then((found) => {
        found.results.forEach((all)=>{
          if (this.JOB_GRP_ARRAY.indexOf(all.JOB_GRP_ID) > -1) {
            this.JOB.push({ref:all.JOB_ID, desc:all.JOB_DESC});
          }
        });
      });

      setTimeout(() => {
        $('#dtPicker1').datepicker({
            format: "mm/dd/yyyy"
          })
          .on("changeDate", () => {
            //console.log($('#dtPicker1').val());
            this.CONTRACT_START_DT1 = moment(new Date($('#dtPicker1').val())).format('MM/DD/YYYY');
            if (new Date($('#dtPicker1').val()) > new Date($('#dtPicker2').val())) {
              toastr.error("Invalid date range.", "Date Change..");
              //$('#CONTRACT_END_DT1').datepicker("setValue", new Date($('#CONTRACT_START_DT1').val()));
              return;
            }
            if (!Date(this.CONTRACT_START_DT1) || !Date(this.CONTRACT_END_DT1) || this.CONTRACT_START_DT1==undefined || this.CONTRACT_END_DT1==undefined || this.CONTRACT_START_DT1=='' || this.CONTRACT_END_DT1=='')
            {
              this.DURATION_MONTHS1 = 0;
            }
            else
            {
              this.DURATION_MONTHS1 = this.monthDiff(this.CONTRACT_START_DT1, this.CONTRACT_END_DT1);
            }
            $('#dtPicker1').datepicker('hide');
          });


        $('#dtPicker2').datepicker({
            format: "mm/dd/yyyy"
          })
          .on("changeDate", () => {
            //console.log($('#dtPicker2').val());
            this.CONTRACT_END_DT1 = moment(new Date($('#dtPicker2').val())).format('MM/DD/YYYY');
            if (new Date($('#dtPicker2').val()) < new Date($('#dtPicker1').val())) {
              toastr.error("Invalid date range.", "Date Change..");
              //$('#CONTRACT_START_DT1').datepicker("setValue", new Date($('#CONTRACT_END_DT1').val()));
              return;
            }
            if (!Date(this.CONTRACT_START_DT1) || !Date(this.CONTRACT_END_DT1) || this.CONTRACT_START_DT1==undefined || this.CONTRACT_END_DT1==undefined || this.CONTRACT_START_DT1=='' || this.CONTRACT_END_DT1=='')
            {
              this.DURATION_MONTHS1 = 0;
            }
            else
            {
              this.DURATION_MONTHS1 = this.monthDiff(this.CONTRACT_START_DT1, this.CONTRACT_END_DT1);
            }
            $('#dtPicker2').datepicker('hide');
          });
      }, 1000);
  }

  pad(str, max) {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  }

  EMPLOYEE_NAMEChanged() {
    this.NAME_ARRAY=this.MSTR_LIST.filter((all)=>all.desc.substring(0,this.EMPLOYEE_NAME.length)==this.EMPLOYEE_NAME.toUpperCase());
  }

  //EMPLOYEE_ALIASChanged()
  //{
  //  this.ALIAS_ARRAY = this.ALIAS; //.filter((all)=>all.substring(0, this.EMPLOYEE_ALIAS.length)==this.EMPLOYEE_ALIAS.toUpperCase());
  //}

  division_change(){
    EntityManager().executeQuery(EntityQuery().from('DIVISION_MSTR').where("DIVISION_ID","==",this.DIVISION1)).then((success) => {
      this.DIVISION_CD1 = success.results[0].DIVISION_CD;
      this._cache_contract.ISSAVE = false;
    }, (fail) =>{
      toastr.error("Error Division", "Division CD not found");
      return;
    });

  }

  job_change() {
    EntityManager().executeQuery(EntityQuery().from('JOB_MSTR').where('JOB_ID','==',this.JOB1)).then((found) => {
      EntityManager().executeQuery(EntityQuery().from('JOB_GRP_MSTR').where('JOB_GRP_ID','==',found.results[0].JOB_GRP_ID)).then((found1) => {
        this.JOB_GRP_NAME1 = found1.results[0].JOB_GRP_DESC;
        this._cache_contract.ISSAVE = false;
        });
      });
    }

  name_change() {
    this.ALIAS=[];

    this.GLOBAL_ID1 = this.MSTR_LIST1;
    if (this.LEVEL_NO1==3)
    {
      var personnel = getLookups().GLOBAL_INDIV_WITH_ALIAS.find((found) => found.GLOBAL_INDIV_ID == this.MSTR_LIST1);
      personnel.ALIASES.forEach((all)=>
      {
        this.ALIAS.push(all);
      });
      this.ALIAS.push(personnel.PERSONNEL_NAME);
    }
    else {
      var personnel = getLookups().GLOBAL_INDIV_MSTR.find((found) => found.GLOBAL_INDIV_ID == this.MSTR_LIST1);
      this.ALIAS.push(personnel.LAST_NAME+', '+personnel.GIVEN_NAME+' '+personnel.MIDDLE_NAME);
    }
    this._cache_contract.ISSAVE = false;
  }

  name_change(item, name){
    this.ALIAS=[];
    this.EMPLOYEE_NAME = name;
    this.EMPLOYEE_ALIAS = '';
    this.MSTR_LIST1 = item;
    this.GLOBAL_ID1 = this.MSTR_LIST1;
    if (this.LEVEL_NO1==3)
    {
      var personnel = getLookups().GLOBAL_INDIV_WITH_ALIAS.find((found) => found.GLOBAL_INDIV_ID == this.MSTR_LIST1);

      personnel.ALIASES.forEach((all)=>
      {
        this.ALIAS.push(all);
      });
      this.ALIAS.push(personnel.PERSONNEL_NAME);
    }
    else {
      var personnel = getLookups().GLOBAL_INDIV_MSTR.find((found) => found.GLOBAL_INDIV_ID == this.MSTR_LIST1);
      this.ALIAS.push(personnel.LAST_NAME+', '+personnel.GIVEN_NAME+' '+personnel.MIDDLE_NAME);
    }
    this.ALIAS_ARRAY = this.ALIAS;
    this._cache_contract.ISSAVE = false;
  }

  alias_change(item){
    this.EMPLOYEE_ALIAS= item;
    this._cache_contract.ISSAVE = false;
  }

  onfocusName(){
    if (!(this._disableEditContract || !this._cache_contract.ISNEWCONTRACT))
      this.menuNameShow =true;
  }

  lostfocusName(){
    setTimeout(() => {
      this.menuNameShow =false;
    }, 200);
  }

  onfocusAlias(){
    if (!this._disableEditContract)
      this.menuAliasShow = true;
  }

  lostfocusAlias(){
    setTimeout(() => {
      this.menuAliasShow = false;
    }, 200);
  }

  onchangeName(){
    this._cache_contract.ISSAVE= false;
  }

  onchangeAlias()
  {
    this._cache_contract.ISSAVE= false;
  }

  checkDate() {
    setTimeout(() => {
      if (!Date(this.CONTRACT_START_DT1) || !Date(this.CONTRACT_END_DT1) || this.CONTRACT_START_DT1==undefined || this.CONTRACT_END_DT1==undefined || this.CONTRACT_START_DT1=='' || this.CONTRACT_END_DT1=='')
      {
        this.DURATION_MONTHS1 = 0;
      }
      else
      {
        this.DURATION_MONTHS1 = this.monthDiff(this.CONTRACT_START_DT1, this.CONTRACT_END_DT1);
      }
    }, 1000);
    this._cache_contract.ISSAVE = false;
  }




  monthDiff(d1, d2) {
    var date1= new Date(d1);
    var date2 = new Date(d2);

    var months =  (date2.getDate() - date1.getDate()) / 30 +
    date2.getMonth() - date1.getMonth() +
    (12 * (date2.getFullYear() - date1.getFullYear()));
    return Math.round(months);
  }

  keyStroke(evt) {
    return true;
    if (evt.keyCode==8 || evt.keyCode>=48 && evt.keyCode<=57 || evt.keyCode==190 || evt.keyCode==9){
    }
    return false;
  }

  fnContract(eventName){
    switch (eventName) {
      case 'create':
        this._disableCreateContract = true;
        this._disableEditContract = false;
        this._disableCancelContract=false;
        this._disableRefreshContract=false;
        this._disableSaveContract=false;
        this._disablePrintContract=false;
        this.initializeEntry();
        break;

      case 'save':
        this.saveEntry();
        //toastr.success('Save successfully', 'Success');
        break;

      case 'cancel':
        //ask if want to save changes
        if (!this._cache_contract.ISSAVE)
        {
          if (!confirm('You made changes. Are you sure you want to cancel it?'))
            return;



        }
        this._disableCreateContract = false;
        this._disableEditContract = true;
        this._disableCancelContract = true;
        this._disableRefreshContract = true;
        this._disableSaveContract = true;
        this._disablePrintContract = true;
        this._cache_contract.ISSAVE = true;

        this.initializeEntry();


        this.menuNameShow=false;
        this.menuAliasShow=false;

      default:

    }
  }

  initializeEntry() {
    this.LEVEL_NO1 = this._cache_obj.USER.LEVEL_NO;
    this.MSTR_LIST1='';
    this.DIVISION1='';
    this.JOB1='';
    this.ALIAS_NAME1='';

    this.CONTRACT_HDR_ID1='';
    this.GLOBAL_ID1='';
    this.CONTRACT_NO1='';
    this.COMPENTENCY_LEVEL1='';
    this.JOB_ID1='';
    this.JOB_GRP_NAME1 ='';
    this.CONTRACT_END_DT1='';
    this.CONTRACT_START_DT1='';
    this.DURATION_MONTHS1='';
    this.CONTRACT_FEE1=0.00;
    this.CONTRACT_TYPE1='';
    this.MONTHLY_FEE1=0.00;
    this.CONTRACT_STATUS1='ACTIVE';
    this.MAIN_CONTRACT_NO1='';
    this.TERMINATE_REASON1='';
    this.TERMINATE_DT1='';
    this.CREATED_BY1='';
    this.LAST_UPDATED_BY1='';
    this.CREATED_DT1='';
    this.LAST_UPDATED_DT1='';
    this.BATCH1='';
    this.ALIAS1='';
    //this.LEVEL_NO1 = 1 //_cache_obj.USER.LEVEL_NO;

    this.EMPLOYEE_NAME='';
    this.EMPLOYEE_ALIAS='';

    $('#dtPicker1').val('');
    $('#dtPicker2').val('');


    this._cache_contract ={
        ISNEWCONTRACT : true,
        CONTRACT_STATUS : 'ACTIVE',
        ISSAVE : false,
    };
  }

  saveEntry(){

    if (this.MSTR_LIST1==null || this.MSTR_LIST1=='') {
      toastr.error("Error Saving", "Empty MASTER LIST");
      return;
    }

    if (this.DIVISION1==null || this.DIVISION1==''){
      toastr.error("Error Saving", "Empty DIVISION NAME");
      return;
    }

    if (this.JOB1==null || this.JOB1==''){
      toastr.error("Error Saving", "Empty JOB NAME");
      return;
    }

    if (this.CONTRACT_START_DT1==null || this.CONTRACT_START_DT1==''){
      toastr.error("Error Saving", "Empty Contract Start");
      return;
    }

    if (this.CONTRACT_STATUS1==null || this.CONTRACT_STATUS1==''){
      toastr.error("Error Saving", "Empty Contract Stutus");
      return;
    }

    this.CONTRACT_START_DT1 = moment(new Date(this.CONTRACT_START_DT1)).format('MM/DD/YYYY');
    this.CONTRACT_END_DT1 = moment(new Date(this.CONTRACT_END_DT1)).format('MM/DD/YYYY');

    if (this.CONTRACT_START_DT1 > this.CONTRACT_END_DT1){
      toastr.error("Error Saving", "Contract range is invalid");
      return;
    }

    this.DURATION_MONTHS1 = this.monthDiff(this.CONTRACT_START_DT1, this.CONTRACT_END_DT1);



    this.JOB_ID1 = this.JOB1;
    this.ALIAS1 = this.EMPLOYEE_ALIAS.toUpperCase();
    this.GLOBAL_ID1 = this.MSTR_LIST1;




    if(!this._cache_contract.ISNEWCONTRACT) {

      if (this._cache_contract.CONTRACT_STATUS=='EXPIRED')
      {
        toastr.error("Unsuccesfully Saved", "NPS Contract Transaction");
        return;
      }

      var getContractForEdit = EntityQuery().from('NPS_CONTRACT_HDR_TRX').where("CONTRACT_HDR_ID","==",this.CONTRACT_HDR_ID1);
      EntityManager().executeQuery(getContractForEdit).then((success) => {
        this.LAST_UPDATED_BY1 = this._cache_obj.USER.USER_ID;
        //success.results[0].COMPANY_CD=this.COMPANY_CD1;
        success.results[0].DIVISION_CD=this.DIVISION_CD1;
        //success.results[0].CONTRACT_NO=this.CONTRACT_NO1;
        success.results[0].JOB_ID=this.JOB_ID1;
        //success.results[0].COMPENTENCY_LEVEL=this.COMPENTENCY_LEVEL1;
        success.results[0].CONTRACT_START_DT=this.CONTRACT_START_DT1;
        success.results[0].CONTRACT_END_DT= this.CONTRACT_END_DT1;
        success.results[0].DURATION_MONTHS=this.DURATION_MONTHS1;
        //success.results[0].CONTRACT_FEE=this.CONTRACT_FEE1;
        //success.results[0].MONTHLY_FEE=this.MONTHLY_FEE1;
        //success.results[0].CONTRACT_TYPE=this.CONTRACT_TYPE1;
        success.results[0].CONTRACT_STATUS=this.CONTRACT_STATUS1;
        //success.results[0].MAIN_CONTRACT_NO=this.MAIN_CONTRACT_NO1;
        //success.results[0].TERMINATE_REASON=this.TERMINATE_REASON1;
        //success.results[0].TERMINATE_DT=new Date(this.TERMINATE_DT1);
        success.results[0].LAST_UPDATED_BY=this.LAST_UPDATED_BY1;
        success.results[0].LAST_UPDATED_DT=new Date(Date.now());
        //success.results[0].LEVEL_NO=this.LEVEL_NO1;
        //success.results[0].BATCH=this.BATCH1;
        success.results[0].ALIAS=this.ALIAS1;

        EntityManager().saveChanges().then((success) => {
          console.log(success);
          toastr.success("Succesfully Saved", "NPS Contract Transaction");
        }, (fail) => {
            toastr.error("Error Occured", fail);
          });
        });

        this._cache_contract ={
            ISNEWCONTRACT : false,
            ISSAVE : true,
            CONTRACT_STATUS: this.CONTRACT_STATUS1,
        };
        return;
      }
      ///INSERTING
      this.CREATED_BY1 = this._cache_obj.USER.USER_ID;

      var getMax = EntityQuery().from('NPS_CONTRACT_HDR_TRX').orderByDesc('CONTRACT_HDR_ID').take(1);
      EntityManager().executeQuery(getMax).then((successMax) => {

        var getMax = 1;

				if (successMax.results.length > 0)
					getMax = parseInt(successMax.results[0].CONTRACT_HDR_ID) + 1;


        var varInsert = EntityManager().createEntity('NPS_CONTRACT_HDR_TRX', {
          CONTRACT_HDR_ID : this.pad(getMax, 20),
          GLOBAL_ID : this.GLOBAL_ID1,
          COMPANY_CD : this.COMPANY_CD1,
          DIVISION_CD : this.DIVISION_CD1,
          //CONTRACT_NO : this.CONTRACT_NO1,
          JOB_ID : this.JOB_ID1,
          //COMPENTENCY_LEVEL :  this.COMPENTENCY_LEVEL1,
          CONTRACT_START_DT : this.CONTRACT_START_DT1,
          CONTRACT_END_DT : this.CONTRACT_END_DT1,
          DURATION_MONTHS : this.DURATION_MONTHS1,
          //CONTRACT_FEE : this.CONTRACT_FEE1,
          //MONTHLY_FEE : this.MONTHLY_FEE1,
          //CONTRACT_TYPE : this.CONTRACT_TYPE1,
          CONTRACT_STATUS : this.CONTRACT_STATUS1,
          //MAIN_CONTRACT_NO : this.MAIN_CONTRACT_NO1,
          //TERMINATE_REASON : this.TERMINATE_REASON1,
          //TERMINATE_DT : new Date(this.TERMINATE_DT1),
          CREATED_BY : this.CREATED_BY1,
          CREATED_DT : new Date(Date.now()),
          LEVEL_NO : this.LEVEL_NO1,
          //BATCH : this.BATCH1,
          ALIAS : this.ALIAS1,
        });

      //  console.log(varInsert);
        EntityManager().addEntity(varInsert);

        EntityManager().saveChanges().then((success) => {
          console.log(success);
          toastr.success("Succesfully Saved", "NPS Contract Transaction");

          this.CONTRACT_HDR_ID1 = varInsert.CONTRACT_HDR_ID;
          this._cache_contract ={
              ISNEWCONTRACT : false,
              CONTRACT_STATUS : this.CONTRACT_STATUS1,
              ISSAVE : true,
          };
        }, (fail) => {
            console.log(fail);
            toastr.error("Error Occured", fail);
          });
        }, (fail2) =>{
            console.log(fail2);
            toastr.error("Error Occured", fail2);
        });
  }

  searchContract(){
    this.dialogService.open({
      viewModel: contract_search
    }).whenClosed(response => {
      if (!response.wasCancelled) {
      } else {
      }
    });
  }

  fnCheckContract(val){
    this._cache_contract.CONTRACT_HDR_ID = val;

    EntityManager().executeQuery(EntityQuery().from('NPS_CONTRACT_HDR_TRX').where('CONTRACT_HDR_ID','==', this._cache_contract.CONTRACT_HDR_ID)).then((success) =>
    {


      var result = success.results[0];

      this.MSTR_LIST1=result.GLOBAL_ID;

      this.DIVISION_CD1 = result.DIVISION_CD;
      EntityManager().executeQuery(EntityQuery().from('DIVISION_MSTR').where("DIVISION_CD","==",result.DIVISION_CD)).then((success_div) => {
        this.DIVISION1 = success_div.results[0].DIVISION_ID.toString();
        this.DIVISION_NAME1 = success_div.results[0].DIVISION_NAME;
      });

      this.JOB1=result.JOB_ID.toString();

      EntityManager().executeQuery(EntityQuery().from('JOB_MSTR').where('JOB_ID','==',this.JOB1)).then((success_job) => {
        EntityManager().executeQuery(EntityQuery().from('JOB_GRP_MSTR').where('JOB_GRP_ID','==',success_job.results[0].JOB_GRP_ID)).then((success_job_grp) => {
          this.JOB_GRP_NAME1 = success_job_grp.results[0].JOB_GRP_DESC;
          this.JOB_NAME1 = success_job.results[0].JOB_DESC;
        });
      });


      var nameofemployee = this.MSTR_LIST.find((all)=>all.ref==this.MSTR_LIST1);

      //console.log(nameofemployee);

      this.EMPLOYEE_NAME = nameofemployee.desc;

      this.ALIAS=[];

      if (this.LEVEL_NO1==3)
      {

        var personnel = getLookups().GLOBAL_INDIV_WITH_ALIAS.find((sucess_alias) => sucess_alias.GLOBAL_INDIV_ID == this.MSTR_LIST1);
        personnel.ALIASES.forEach((all_alias)=>
        {
          this.ALIAS.push(all_alias);
        });
        this.ALIAS.push(personnel.PERSONNEL_NAME);
      }
      else {
        var personnel = getLookups().GLOBAL_INDIV_MSTR.find((success_alias) => success_alias.GLOBAL_INDIV_ID == this.MSTR_LIST1);
        this.ALIAS.push(personnel.LAST_NAME+', '+personnel.GIVEN_NAME+' '+personnel.MIDDLE_NAME);
      }


      if (result.ALIAS!=null && result.ALIAS!='' && this.ALIAS.filter((all)=>all==result.ALIAS).length==0)
      {
        this.ALIAS.push(result.ALIAS);
      }

      this.ALIAS_ARRAY = this.ALIAS;
      this.ALIAS_NAME1=result.ALIAS;
      this.EMPLOYEE_ALIAS = result.ALIAS;

      this.CONTRACT_HDR_ID1=result.CONTRACT_HDR_ID;
      this.GLOBAL_ID1=result.GLOBAL_ID;
      this.CONTRACT_NO1=result.CONTRACT_NO;
      this.COMPENTENCY_LEVEL1=result.COMPENTENCY_LEVEL;
      this.JOB_ID1=result.JOB_ID;
      this.CONTRACT_END_DT1=moment(new Date(result.CONTRACT_END_DT)).format('MM/DD/YYYY');
      this.CONTRACT_START_DT1=moment(new Date(result.CONTRACT_START_DT)).format('MM/DD/YYYY') ;
      this.DURATION_MONTHS1=result.DURATION_MONTHS;
      this.CONTRACT_FEE1=result.CONTRACT_FEE;
      this.CONTRACT_TYPE1=result.CONTRACT_TYPE;
      this.MONTHLY_FEE1=result.MONTHLY_FEE;
      this.CONTRACT_STATUS1=result.CONTRACT_STATUS;
      this.MAIN_CONTRACT_NO1=result.MAIN_CONTRACT_NO;
      this.TERMINATE_REASON1=result.TERMINATE_REASON;
      this.TERMINATE_DT1=result.TERMINATE_DT;
      this.CREATED_BY1=result.CREATED_BY;
      this.LAST_UPDATED_BY1=result.LAST_UPDATED_BY;
      this.CREATED_DT1=result.CREATED_DT;
      this.LAST_UPDATED_DT1=result.LAST_UPDATED_DT;
      this.BATCH1=result.BATCH;
      this.ALIAS1=result.ALIAS;
      this.LEVEL_NO1 = result.LEVEL_NO;

      this._cache_contract ={
          ISNEWCONTRACT : false,
          CONTRACT_STATUS : result.CONTRACT_STATUS,
          ISSAVE : true,
      };

      $('#dtPicker1').val(this.CONTRACT_START_DT1);
      $('#dtPicker2').val(this.CONTRACT_END_DT1);

      this._disableCreateContract = false;
      this._disableEditContract = this.CONTRACT_STATUS1!="ACTIVE";
      this._disableCancelContract=false;
      this._disableRefreshContract=false;
      this._disableSaveContract=false;
      this._disablePrintContract=false;
      this.menuNameShow =false;
      this.menuAliasShow=false;
    });
  }
}
