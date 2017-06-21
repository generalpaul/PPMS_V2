
import {bindable,inject} from 'aurelia-framework';
import {objBudget} from 'objBudget';
import {EntityManager,EntityQuery} from './entity-manager-factory';
import {generateID} from './entity-manager-factory';
//import {handle, Dispatcher} from 'aurelia-flux';  
import {getLookups} from './masterfiles';
import settings from './settings';
// import $ from 'jquery';
import {ModalWizard} from 'modals/modal-wizard';
import toastr from "toastr";
import moment from 'moment';
import _ from 'underscore';
import { MultiObserver }from 'multi-observer';
import {DialogService} from 'aurelia-dialog';
import {program} from 'modals/program';
import {budget} from 'modals/budget';
import {confirm_dialog} from 'modals/confirm_dialog';
import breeze from 'breeze-client';

//import  datepicker  from 'bootstrap-datepicker';

/*
  NOTES
  breeze.debug.js function getUriKey(aspect) is updated
  fmtProperty(kps[0], aspect) is replaced by
  fmtProperty(kps[0], aspect).replace("M","") because odata
  is not accepting decimal with 'M' - decimal identity

  example id 123M is being passed, accepted is 123
  existing primary cannot be replaced to int from decimal bec. ppp is using it.
  if breeze is updated, implement this again

*/


@inject(objBudget,ModalWizard,toastr,MultiObserver,DialogService)
export class MainHeaderCustomElement {
  
  @bindable to;
  _objBudget = null;
  _user;
  //_dispatcher;
  _PROGRAM_GENRE_MSTR=[];
  _TELECAST_MODE_MSTR=[];
  _EPISODE_TYPE_MSTR=[];
  _STATIONS=[];
  _STATUS;//=["DRAFT","APPROVED","CLOSED","EXPIRED"];
  //@bindable modalBudget;
  _COMPANY_ID;
  _ModalWizard;
  

  _disableCreateBudget = false;
  _disableCancelBudget=true;
  _disableRefreshBudget=true;
  _disableSaveBudget=true;
  _disableBudgetId=false;
  _disablePrintBudget=true;
  _disableCopyBudget=true;
  dialogService=null;
  programDisabled=true;
  budgetDisabled=false;

  

  constructor(objBudget,ModalWizard,toastr,multiObserver,DialogService) {
      if (EntityManager() === undefined) {
         
          return;
      }

    this.dialogService=DialogService;
    this._objBudget=objBudget;


    this.LoginPassed(this._objBudget.USER);
    //this._objBudget.OBSERVERS.login_passed.push((val) => {
    //  this.LoginPassed(val);
    //});

    //this._objBudget.OBSERVERS.loggedout.push(() => {
    //  this.LoggedOut();
    //});

    this._objBudget.OBSERVERS.budget_dialog.push((val) => {
      this.CloseBudgetDialog(val);
    });

    this._objBudget.OBSERVERS.pass_program.push((val) => {
      this.PassedProgram(val);
    });

    this._objBudget.OBSERVERS.budget_refresh.push(() => {
      this.fnBudgetRefreshHandle();
    });

    this._objBudget.OBSERVERS.budget_loaded.push(() => {
       if(this._disableSaveBudget==true)
       {
          this._disableSaveBudget = false;
          settings.isNavigating = false;
          toastr.success("Budget has been successfully loaded.", "Budget Template");
       }
    });

    this._toastr = toastr;
    
    
   // this._dispatcher=Dispatcher;
    this.fnClearHeader();


    this._disableCreateBudget = false;
    this._disableCancelBudget=true;
    this._disableRefreshBudget=true;
    this._disableSaveBudget=true;
    this._disableBudgetId=false;
    this._disablePrintBudget=true;
    this._disableCopyBudget=true;
    this._ModalWizard = ModalWizard;

    
    //this.fnExecuteDatePicker();
    setTimeout(() => {
      
       $('.datepicker').datepicker();
     // this._objBudget.TESTT('hahaa');        
      $('#refFrom').datepicker({
          format: "mm/dd/yyyy"
        })
        .on("changeDate", () => {

          if (new Date($('#refFrom').val()) > new Date($('#refTo').val())) {
            toastr.error("Invalid date range.", "Date Change..");
            $('#refTo').datepicker("setValue", new Date($('#refFrom').val()));
            return;
          }

          this._objBudget.HEADER.BDGT_FROM = $('#refFrom').val();
          if(this._objBudget.HEADER.BDGT_TO=="")
          {
              this._objBudget.HEADER.BDGT_TO=this._objBudget.HEADER.BDGT_FROM;
          }

          $('#refFrom').datepicker('hide');
        });


      $('#refTo').datepicker({
          format: "mm/dd/yyyy"
        })
        .on("changeDate", () => {

          if (new Date($('#refTo').val()) < new Date($('#refFrom').val())) {
            toastr.error("Invalid date range.", "Date Change..");
            $('#refFrom').datepicker("setValue", new Date($('#refTo').val()));
            return;
          }

          this._objBudget.HEADER.BDGT_TO = $('#refTo').val();
          $('#refTo').datepicker('hide');
        });
    }, 1000);
    

    //UPDATE EXPIRED BUDGET    
    var varToday = new Date(Date.now());
    var p1 = breeze.Predicate.create('BDGT_TO', '<=', new Date(varToday.getFullYear(), varToday.getMonth(), varToday.getDate()));
    var p2 = breeze.Predicate.create('APPR_STAT_CD', '==', "APP-APPROVED");
    var pred = breeze.Predicate.and([p1, p2]);


    var checkExpired = EntityQuery().from('BDGT_TMPL_HDR').where(pred);
    
    
    EntityManager().executeQuery(checkExpired).then((success) => {
      success.results.forEach((all) => {
        //console.log(all);
        all.APPR_STAT_CD="APP-EXPIRED";
        all.LAST_UPDATED_BY="ADMIN";
        all.LAST_UPDATED_DT= new Date(Date.now());
      });

      EntityManager().saveChanges().then((success) => {
      //  console.log(success);
      }, (fail) => {
        console.log(fail);
      });
    });

  }

  /////cannot use this bec first value is undefined before correct data will be placed by datepicker
  checkDate(id){

     setTimeout(() => {
     // console.log($("#"+id).val());
     // console.log(Date.parse($("#"+id).val()));
      if(!Date.parse($("#"+id).val()))
      {
        toastr.error("Invalid starting date ", "Date Change..");  
      }
      else
      {
        $("#"+id).datepicker("setValue", new Date($("#"+id).val()));
      }

     },1000);
    
    // if(!moment($('#refFrom').val(),'MM-DD-YYYY',true).isValid()){
    //     item
    // }
    // console.log(moment($('#refFrom').val(),'MM-DD-YYYY')._i);
    //   this._objBudget.HEADER.BDGT_FROM=moment($('#refFrom').val(),'MM-DD-YYYY');
  }


  validate() {

    // var _query = EntityQuery().from('BDGT_TMPL_HDR').where('BDGT_TMPL_ID', '==', '0');
    // this._objBudget = EntityManager().executeQueryLocally(_query)[0]; //if has offline;
    // //console.log(EntityManager().executeQueryLocally(_query));
    // EntityManager().executeQuery(_query).then((found) => {
    
    // });
  }


  inputChanged(evt, value) {
    if (evt.keyCode == 13) {

    // this._objBudget.CALLER.VALUE1=this._objBudget.HEADER.BDGT_TMPL_ID; 
    // this._objBudget.CALLER.ACTION='budget.dialog';

    settings.isNavigating = true;
    this._objBudget.OBSERVERS.budget_dialog.forEach((all)=>{
      all(this._objBudget.HEADER.BDGT_TMPL_ID);
    });

      // this._dispatcher.dispatch('budget.dialog', this._objBudget.HEADER.BDGT_TMPL_ID);
    }
  }

  speak() {
    console.log(this._objBudget);
    //alert(`Hello ${this.to}!`);
  }

  speak1() {
    alert(`Hello ${this.to}!`);

  }

  //@handle('login.passed')
  LoginPassed(user) {
      
    this._user = user.USER_ID;
    this._COMPANY_ID = user.COMPANY_ID;

   

    this.budgetDisabled=false;

    // this._objBudget.OBSERVERS.enable_modal_button.forEach((all)=>{
    //   all(this.modalBudget.id, true);
    // });
    
    this.programDisabled=true;
    // this._objBudget.OBSERVERS.enable_modal_button.forEach((all) => {
    //   all(this.modalProgram.id, false);
    // });

   
    this.fnClearBudget();

    this._disableCreateBudget=false;
    this._disableCancelBudget=true;
    this._disableRefreshBudget=true;
    this._disableSaveBudget=true;
    this._disablePrintBudget=true;
    this._disableCopyBudget=true;
  }

  //@handle('loggedout')
  LoggedOut()
  {
      alert(44);
    this._disableCreateBudget = true;
    this._disableCancelBudget = true;
    this._disableRefreshBudget = true;
    this._disableSaveBudget = true;
    this._disablePrintBudget = true;
    this._disableCopyBudget=true;

    this.budgetDisabled=false;
    // this._objBudget.OBSERVERS.enable_modal_button.forEach((all)=>{
    //   all(this.modalBudget.id, false);
    // });

    this.programDisabled=true;
    // this._objBudget.OBSERVERS.enable_modal_button.forEach((all)=>{
    //   all(this.modalProgram.id, false);
    // });

    //this._dispatcher.dispatch('enable.modal.button', this.modalBudget.id, false);
    //this._dispatcher.dispatch('enable.modal.button', this.modalProgram.id, false);

    this.fnClearHeader();
  }

  fnClearHeader(){
     //var PROGRAM_MSTR={PROGRAM_TITLE:""}  ;
     this._objBudget.HEADER = {
      BDGT_TMPL_ID:"",
      //PROGRAM_MSTR.PROGRAM_TITLE:"",
      CHARGE_CD:"",
      PROGRAM_GENRE_CD:"",
      TELECAST_MODE_CD:"",
      EPISODE_TYPE_CD:"",
      EPISODES:"",
      TAPING_DAYS:"",
      BDGT_FROM:"",
      BDGT_TO:"",
      STATION_ID:"",
      APPR_STAT_CD:"",
      REMARKS:""
   };

    while (this._objBudget.REGULAR.length > 0) {
      this._objBudget.REGULAR.pop();
    }
    this._objBudget.REGULAR=[];

    while (this._objBudget.SEMI_REGULAR.length > 0) {
      this._objBudget.SEMI_REGULAR.pop();
    }
    this._objBudget.SEMI_REGULAR = [];
   
    while (this._objBudget.STAFF.length > 0) {
      this._objBudget.STAFF.pop();
    }
    this._objBudget.STAFF = [];

    while (this._objBudget.GUEST.length > 0) {
      this._objBudget.GUEST.pop();
    }

    this._objBudget.GUEST = [];

    this._objBudget.OBSERVERS.reset_summary.forEach((all) => {
      all();
    });


    // setTimeout(() => {
    //   this._objBudget.CALLER.ACTION = 'reset.summary';
    // }, 200);

    //this._dispatcher.dispatch('reset.summary');

    this._disableBudgetId=false;

     this._objBudget.OBSERVERS.reset_all.forEach((all) => {
      all();
    });

    // setTimeout(() => {
    //   this._objBudget.CALLER.ACTION = 'reset.all';
    // }, 400);

    //this._dispatcher.dispatch('reset.all');

  }

  fnClearBudget(){
    this.fnClearHeader();

    this._PROGRAM_GENRE_MSTR=getLookups().PROGRAM_GENRE_MSTR;
    this._PROGRAM_GENRE_MSTR.unshift({});
    this._TELECAST_MODE_MSTR=getLookups().TELECAST_MODE_MSTR;
    this._TELECAST_MODE_MSTR.unshift({});
    this._EPISODE_TYPE_MSTR=getLookups().EPISODE_TYPE_MSTR;
    this._EPISODE_TYPE_MSTR.unshift({});
    this._STATIONS=settings.STATIONS;

    this._STATUS=[{}];
    // getLookups().REFERENCE_CD_MSTR.forEach((item)=>{
    //   if(item.REF_GRP_CD=='APPR_STAT_CD')
    //   {
    //       this._STATUS.push(item);
    //       console.log(item);
    //   }
    // });
  }

  //@handle('budget.dialog')
  CloseBudgetDialog(value) {


    //  if (this.modalBudget.id == this._ModalWizard.ids[this._ModalWizard.ids.length-1]) {
    //   this._ModalWizard.ids.pop();

    //   this._objBudget.OBSERVERS.close_modal.forEach((all) => {
    //     all(this.modalBudget.id);
    //   });

    //   //this._dispatcher.dispatch('close.modal', this.modalBudget.id);
    // }

    
    var _query = EntityQuery().from('BDGT_TMPL_HDR').where('BDGT_TMPL_ID', '==', value).expand('PROGRAM_MSTR').select('BDGT_TMPL_ID, PROGRAM_MSTR, CHARGE_CD, PROGRAM_GENRE_CD,  TELECAST_MODE_CD,  EPISODE_TYPE_CD,   EPISODES,  TAPING_DAYS, BDGT_FROM, BDGT_TO, STATION_ID, APPR_STAT_CD, REMARKS, CREATED_BY, LAST_UPDATED_BY ');

    EntityManager().executeQuery(_query).then((found) => {
 
        this._STATUS=[{REF_CD:"APP-DRAFT",REF_DESC:"APP-DRAFT"},{REF_CD:"APP-APPROVED",REF_DESC:"APP-APPROVED"}];       
        
        if(found.results.length==0) return;

        this._objBudget.HEADER = found.results[0];

        this._objBudget.HEADER.BDGT_FROM=moment(new Date(this._objBudget.HEADER.BDGT_FROM)).format('MM-DD-YYYY');
        this._objBudget.HEADER.BDGT_TO=moment(new Date(this._objBudget.HEADER.BDGT_TO)).format('MM-DD-YYYY');
        
        this._disableBudgetId=true;
        //update buttons
        this._disableCreateBudget=true;
        this._disableCancelBudget=false;
        this._disableRefreshBudget=false;

        this._objBudget._LOADING_BUDGET=1;
        this._disableSaveBudget=true;
        
        this._disablePrintBudget = false;
        this._disableCopyBudget=false;

        this.budgetDisabled=true;        
        // this._objBudget.OBSERVERS.enable_modal_button.forEach((all) => {
        //   all(this.modalBudget.id, false);
        // });

        //this._dispatcher.dispatch('enable.modal.button', this.modalBudget.id, false);

        if(this._objBudget.HEADER.APPR_STAT_CD=="APP-CLOSED")
        {
          this._STATUS=[{REF_CD:"APP-CLOSED",REF_DESC:"APP-CLOSED"}];
          this._disableSaveBudget = true;
          //this._disablePrintBudget = true;
        }
        else if(this._objBudget.HEADER.APPR_STAT_CD=="APP-EXPIRED")
        {
          this._STATUS=[{REF_CD:"APP-EXPIRED",REF_DESC:"APP-EXPIRED"}];
          this._disableSaveBudget = true;
          this._disablePrintBudget = true;
          //this._disableCopyBudget=false;
        }
        else if(this._objBudget.HEADER.APPR_STAT_CD=="APP-DRAFT")
        {
          
          this.programDisabled=false;
          // this._objBudget.OBSERVERS.enable_modal_button.forEach((all) => {
          //   all( this.modalProgram.id, true);
          // });

          //this._dispatcher.dispatch('enable.modal.button', this.modalProgram.id, true);



          this._objBudget.OBSERVERS.enable_approved.forEach((all) => {
            all(true);
          });

          //this._dispatcher.dispatch('enable.approved',true);
        }
        else
        {

            this._objBudget.OBSERVERS.enable_approved.forEach((all) => {
              all(false);
            });

            //this._dispatcher.dispatch('enable.approved', false);
        }

         if(this._objBudget.HEADER.APPR_STAT_CD=="APP-APPROVED")
         {

            this._objBudget.STATUS="APPROVED";
            this._disableSaveBudget=true;

            this.programDisabled=true;
            // this._objBudget.OBSERVERS.enable_modal_button.forEach((all) => {
            //   all(this.modalProgram.id, false);
            // });

            //this._dispatcher.dispatch('enable.modal.button', this.modalProgram.id, false);
         }
         // else if(this._objBudget.HEADER.APPR_STAT_CD=="APP-APPROVED")
         // {
         //    this._objBudget.STATUS="EXPIRED";
         // }
         else
            this._objBudget.STATUS="VIEW";

         
        this._objBudget.OBSERVERS.disable_search_personnel.forEach((all) => {
            all(this._objBudget.HEADER.APPR_STAT_CD=="APP-DRAFT");
        });         

    },(fail)=>{
      console.log(fail);

    });

  }

  


  //@handle('pass.program')
  PassedProgram(value) {
    this._objBudget.HEADER.PROGRAM_MSTR=value;
    this._objBudget.HEADER.CHARGE_CD=value.PROGRAM_CD;


    // if (this.modalProgram.id == this._ModalWizard.ids[this._ModalWizard.ids.length-1]) {
    //   this._ModalWizard.ids.pop();

    //   this._objBudget.OBSERVERS.close_modal.forEach((all)=>{
    //     all(this.modalProgram.id);
    //   });

    // }
  }


  //@handle('budget.refresh')
  fnBudgetRefreshHandle()
  {
      this.fnBudget("refresh");
  }

  
  fnBudget(call){

    switch(call)
    {
      case "create":
      {
        this._disableCreateBudget=true;
        this._disableCancelBudget=false;
        this._disableRefreshBudget=true;
        this._disableSaveBudget=false;
        this._disableBudgetId=true;
        this._disablePrintBudget = true;


        this.budgetDisabled=true;
        this.programDisabled=false;
        // this._objBudget.OBSERVERS.enable_modal_button.forEach((all)=>{
        //   all(this.modalBudget.id, false);
        //   all(this.modalProgram.id, true);
        // });

    
        this._objBudget.STATUS="CREATE";
        this._STATUS=[{REF_CD:"APP-DRAFT",REF_DESC:"APP-DRAFT"}];

        this.fnDialogProgram();

        break;
      }
      case "cancel":
      {
        this.fnClearHeader();
        this._disableCreateBudget=false;
        this._disableCancelBudget=false;
        this._disableRefreshBudget=true;
        this._disableSaveBudget=true;
        this._disablePrintBudget = true;

        this.budgetDisabled=false;
        this.programDisabled=true;
        // this._objBudget.OBSERVERS.enable_modal_button.forEach((all) => {
        //   all(this.modalBudget.id, true);
        //   all(this.modalProgram.id, false);
        // });

        // this._dispatcher.dispatch('enable.modal.button', this.modalProgram.id, false);
        // this._dispatcher.dispatch('enable.modal.button', this.modalBudget.id, true);
        this._objBudget.STATUS="NONE";
        break;
      }
      case "refresh":
      {

        this._disableCreateBudget=true;
        this._disableSaveBudget=false;
        this._disableCancelBudget=false;
        this._disableRefreshBudget=false;
        this._disablePrintBudget = true;
    
        this._objBudget.OBSERVERS.budget_dialog.forEach((all) => {
          all(this._objBudget.HEADER.BDGT_TMPL_ID);
        });

        this.budgetDisabled=true;
        this.programDisabled=false;
        // this._objBudget.OBSERVERS.enable_modal_button.forEach((all) => {
        //   all(this.modalBudget.id, false);
        //   all(this.modalProgram.id, true);
        // });

        // this._dispatcher.dispatch('budget.dialog', this._objBudget.HEADER.BDGT_TMPL_ID);
        // this._dispatcher.dispatch('enable.modal.button', this.modalBudget.id, false);
        // this._dispatcher.dispatch('enable.modal.button', this.modalProgram.id, true);

        break;
      }
      case "save":
      {
       
        this.fnSaveBudget("");

        break;
      }
      case "print":
      {

        var varUseReport="";
        if(this._objBudget.HEADER.APPR_STAT_CD=="APP-DRAFT")
        {
            varUseReport="Draft";
        }
        if(this._objBudget.HEADER.APPR_STAT_CD=="APP-APPROVED")
        {
            varUseReport="Approved";
        }


        if(varUseReport!="")
        {
           // var popup = window.open("http://absppms:8080/ReportServer/Pages/ReportViewer.aspx?%2fPPID+Reports%2fBudget_Print&rs:Command=Render&Actual_Cost_id="+this._objBudget.HEADER.BDGT_TMPL_ID+"&isConfidential="+this._objBudget.ALLOW_PASS_CONFIDENTIAL+"", "popupWindow", "width=1280px,height=1024px,scrollbars=yes,directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,addressbar=0,fullscreen=false");
            var popup = window.open(settings.ActualCostService+"/report/Budget_"+varUseReport+"_Report.aspx?BDID="+this._objBudget.HEADER.BDGT_TMPL_ID+"&ConcealConfidentialBudgetAmt="+this._objBudget.ALLOW_PASS_CONFIDENTIAL+"&USER_ACCOUNT="+this._user+"&COMPANY_ID="+this._COMPANY_ID, "popupWindow", "width=1280px,height=1024px,scrollbars=yes,directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,addressbar=0,fullscreen=false");
           popup.moveTo(0, 0);
        }
        
        
         break;
      }
      case "copy":
      {
        

                this.dialogService.open({ viewModel: confirm_dialog, model: 'Copy Template?' }).whenClosed(response => {
          if (!response.wasCancelled) {
             //console.log(response.output);


              var varGetHeader = EntityQuery().from('BDGT_TMPL_HDR').where('BDGT_TMPL_ID', '==', this._objBudget.HEADER.BDGT_TMPL_ID);

              EntityManager().executeQuery(varGetHeader).then((found) => {
                found.results[0].APPR_STAT_CD = "APP-CLOSED";
                EntityManager().saveChanges().then((success) => {

                  this._objBudget.HEADER.BDGT_TMPL_ID = "";
                  this._objBudget.HEADER.APPR_STAT_CD = "APP-DRAFT";
                  this._objBudget.STATUS = "DRAFT";
                  this._objBudget.IS_COPYING = true;
                  
                  this.fnSaveBudget("");

                });
              });

            


          } else {
            
          }
         
        });

      }
      break;
      case "close":{

            this.dialogService.open({ viewModel: confirm_dialog, model: 'Close Template?' }).whenClosed(response => {
          if (!response.wasCancelled) {
            
                //this._objBudget.HEADER.APPR_STAT_CD='APP-CLOSED';
                this.fnSaveBudget('APP-CLOSED');
           
            
          } else {
            
          }
         
        });

      }
      break;


    }
  }


  fnBudgetValidation_1(){
   
      return new Promise((resolve,reject)=>{ 

      var varAddMin = new Date(this._objBudget.HEADER.BDGT_TO);
      var varSubMin = new Date(this._objBudget.HEADER.BDGT_FROM);

      var p1 = breeze.Predicate.create('BDGT_FROM', '>=', new Date(varSubMin.getFullYear(), varSubMin.getMonth(), varSubMin.getDate() - 1));
      var p2 = breeze.Predicate.create('BDGT_TO', '<=', new Date(varAddMin.getFullYear(), varAddMin.getMonth(), varAddMin.getDate() + 1));
      var p3 = breeze.Predicate.create('BDGT_TMPL_ID', '!=', this._objBudget.HEADER.BDGT_TMPL_ID);
      var p4 = breeze.Predicate.create('EPISODE_TYPE_CD', '==', this._objBudget.HEADER.EPISODE_TYPE_CD);
      var pred = breeze.Predicate.and([p1, p2, p3, p4]);

      var _query = EntityQuery().from('BDGT_TMPL_HDR').where(pred);
      EntityManager().executeQuery(_query).then((found) => {
        if (found.results !== undefined) {
          var countError=0;
          found.results.forEach((all) => {
            //if (all.APPR_STAT_CD.includes('EXPIRE') || all.APPR_STAT_CD.includes('CLOSE')) {
              toastr.error("Budget can only be acceptable if date will be out of range of the last CLOSED/EXPIRED TEMPLATE");
              ++countError; 
            //}
          });

          if(countError>0)
            reject(false); 
          else
            resolve(true);

        }
        else
          resolve(true);
      });

          

      });

  }

  fnBudgetValidation_2(){

     return new Promise((resolve,reject)=>{ 

      var varAddMin = new Date(this._objBudget.HEADER.BDGT_TO);
      var varSubMin = new Date(this._objBudget.HEADER.BDGT_FROM);

      var p3 = breeze.Predicate.create('BDGT_TMPL_ID', '!=', this._objBudget.HEADER.BDGT_TMPL_ID);
      var c1 = breeze.Predicate.create('BDGT_TMPL_HDR.PROGRAM_ID', '==', this._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID)

      var pred2 = breeze.Predicate.and([c1, p3]);
      var _queryCheckActual = EntityQuery().from('ACTUAL_COST_HDR').where(pred2).expand("BDGT_TMPL_HDR");
      EntityManager().executeQuery(_queryCheckActual).then((found) => {

        if (found.results !== undefined) {

              var varPromises = [];
              found.results.forEach((all) => {


                var newPromise = new Promise((resolve_2, reject_2) => {

                  var varTmpFrom = new Date(all.ACTUAL_FROM.getFullYear(), all.ACTUAL_FROM.getMonth(), all.ACTUAL_FROM.getDate());
                  var varTmpTo = new Date(all.ACTUAL_TO.getFullYear(), all.ACTUAL_TO.getMonth(), all.ACTUAL_TO.getDate());

                if ((varTmpFrom <= new Date(this._objBudget.HEADER.BDGT_FROM) && varTmpFrom >= new Date(this._objBudget.HEADER.BDGT_TO)) ||
                      (varTmpTo <= new Date(this._objBudget.HEADER.BDGT_FROM) && varTmpTo >= new Date(this._objBudget.HEADER.BDGT_TO)) ||
                      (varTmpFrom >= new Date(this._objBudget.HEADER.BDGT_TO)) ||
                      (varTmpFrom >= new Date(this._objBudget.HEADER.BDGT_FROM) && varTmpTo <= new Date(this._objBudget.HEADER.BDGT_TO))
                    ) {
                      toastr.error("Please enter range beyond the created budget (AC:" + all.ACTUAL_COST_ID + ")");
                      reject_2(false); 
                    }



                  var _queryCheckVtr = EntityQuery().from('VTR_LIVE_DT_DTL').where('ACTUAL_COST_ID', '==', all.ACTUAL_COST_ID);
                  EntityManager().executeQuery(_queryCheckVtr).then((foundVtr) => {

                    if (foundVtr.results === undefined) {
                      resolve_2(true);
                    }

                    var varDataFromCompare = new Date(this._objBudget.HEADER.BDGT_FROM);
                    var varDataToCompare = new Date(this._objBudget.HEADER.BDGT_FROM);

                    var varMaxDate = null;
                    foundVtr.results.forEach((allDate) => {

                      //var varVtr = new Date(all.VTR_LIVE_DT.getFullYear(), all.VTR_LIVE_DT.getMonth(), all.VTR_LIVE_DT.getDate());
                        var varVtr = moment(new Date(allDate.VTR_LIVE_DT)).format('MM-DD-YYYY');
                        var varDateCompare = new Date(varVtr);

                        if (varDataFromCompare <= varDateCompare && varDateCompare <= varDataToCompare) {
                        if (varMaxDate == null)
                          varMaxDate = varVtr;
                        else if (varMaxDate < varVtr)
                          varMaxDate = varVtr;

                        //toastr.error("Please enter range beyond the created budget (AC:" + all.ACTUAL_COST_ID + ")");
                      }
                    });

                    if (varMaxDate == null) {
                      resolve_2(true);
                    } else {
                      var new_date = moment(varMaxDate, "MM-DD-YYYY");
                      new_date.add(1, 'days');
                      new_date = moment(new Date(new_date)).format('MM-DD-YYYY');

                      //console.log(new_date);
                      //console.log(new Date(this._objBudget.HEADER.BDGT_FROM));
                      //if (new_date > new Date(this._objBudget.HEADER.BDGT_FROM))
                      toastr.error("An existing ActualCost with Id (" + all.ACTUAL_COST_ID + ") is using this budget template. <br>BudgetId (" + all.BDGT_TMPL_ID + ") with status (" + all.BDGT_TMPL_HDR.APPR_STAT_CD.replace("APP-", "") + ")." +
                        " Either open the existing Budget Template and create a Copy, or start the validity on " + new_date);

                      reject_2(false);
                    }

             
                  });


                });

                varPromises.push(newPromise);



              });

              Promise.all(varPromises).then((passed) => {
                resolve(true);
              }, (fail) => {
                reject(false);
                //reject(fail);
              });


          // found.results.forEach((all) => {


          //   var varTmpFrom = new Date(all.ACTUAL_FROM.getFullYear(), all.ACTUAL_FROM.getMonth(), all.ACTUAL_FROM.getDate());
          //   var varTmpTo = new Date(all.ACTUAL_TO.getFullYear(), all.ACTUAL_TO.getMonth(), all.ACTUAL_TO.getDate());

          //   if ((varTmpFrom <= new Date(this._objBudget.HEADER.BDGT_FROM) && varTmpFrom >= new Date(this._objBudget.HEADER.BDGT_TO)) ||
          //     (varTmpTo <= new Date(this._objBudget.HEADER.BDGT_FROM) && varTmpTo >= new Date(this._objBudget.HEADER.BDGT_TO)) ||
          //     (varTmpFrom >= new Date(this._objBudget.HEADER.BDGT_TO)) ||
          //     (varTmpFrom >= new Date(this._objBudget.HEADER.BDGT_FROM) && varTmpTo <= new Date(this._objBudget.HEADER.BDGT_TO))
          //   ) {
          //     toastr.error("Please enter range beyond the created budget (AC:" + all.ACTUAL_COST_ID + ")");
          //     reject(false); 
          //   }



          //   var _queryCheckVtr = EntityQuery().from('VTR_LIVE_DT_DTL').where('ACTUAL_COST_ID', '==', all.ACTUAL_COST_ID);
          //   EntityManager().executeQuery(_queryCheckVtr).then((foundVtr) => {

          //     var varMaxDate = null;
          //     foundVtr.results.forEach((allDate) => {

          //       //var varVtr = new Date(all.VTR_LIVE_DT.getFullYear(), all.VTR_LIVE_DT.getMonth(), all.VTR_LIVE_DT.getDate());
          //       var varVtr = moment(new Date(allDate.VTR_LIVE_DT)).format('MM-DD-YYYY');
          //       if (this._objBudget.HEADER.BDGT_FROM >= varVtr && varVtr <= this._objBudget.HEADER.BDGT_TO) {
          //         if (varMaxDate == null)
          //           varMaxDate = varVtr;
          //         else if (varMaxDate < varVtr)
          //           varMaxDate = varVtr;

          //       }
          //     });

          //     if (varMaxDate !== null && (all.BDGT_TMPL_HDR.APPR_STAT_CD == "APP-EXPIRED" || all.BDGT_TMPL_HDR.APPR_STAT_CD == "APP-CLOSED" || all.BDGT_TMPL_HDR.APPR_STAT_CD == "APP-APPROVED")) {
          //       var new_date = moment(varMaxDate, "DD-MM-YYYY").add(1, 'days');
          //       new_date = moment(new Date(new_date)).format('MM-DD-YYYY');
          //       toastr.error("An existing ActualCost with Id (" + all.ACTUAL_COST_ID + ") is using this budget template. <br>BudgetId (" + all.BDGT_TMPL_ID + ") with status (" + all.BDGT_TMPL_HDR.APPR_STAT_CD.replace("APP-", "") + ")." +
          //         " Either open the existing Budget Template and create a Copy, or start the validity on " + new_date);

          //        reject(false); 
          //     }

          //   });

          // });



        }
        else
            resolve(true); 

      });




       

      });



  }

  fnValidation_Approved(){

    return new Promise((resolve,reject) => 
    {
      var p3 = breeze.Predicate.create('BDGT_TMPL_ID', '!=', this._objBudget.HEADER.BDGT_TMPL_ID);
      var c1 = breeze.Predicate.create('BDGT_TMPL_HDR.PROGRAM_ID', '==', this._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID);
      var c2 = breeze.Predicate.create('APPR_STAT_CD', '==', "APP-APPROVED");
      var pred2 = breeze.Predicate.and([c1, c2, p3]);
      var _queryCheckActual = EntityQuery().from('ACTUAL_COST_HDR').where(pred2).expand("BDGT_TMPL_HDR");
      EntityManager().executeQuery(_queryCheckActual).then((found) => {

        if (found.results !== undefined) {

          var varPromises=[];
          found.results.forEach((all) => {


             var newPromise =  new Promise((resolve_2, reject_2) => {

              var varTmpFrom = new Date(all.ACTUAL_FROM.getFullYear(), all.ACTUAL_FROM.getMonth(), all.ACTUAL_FROM.getDate());
              var varTmpTo = new Date(all.ACTUAL_TO.getFullYear(), all.ACTUAL_TO.getMonth(), all.ACTUAL_TO.getDate());



              var _queryCheckVtr = EntityQuery().from('VTR_LIVE_DT_DTL').where('ACTUAL_COST_ID', '==', all.ACTUAL_COST_ID);
              EntityManager().executeQuery(_queryCheckVtr).then((foundVtr) => {

                if (foundVtr.results === undefined) {
                   resolve_2(true);
                }
                var varDataFromCompare = new Date(this._objBudget.HEADER.BDGT_FROM);
                var varDataToCompare = new Date(this._objBudget.HEADER.BDGT_FROM);

                var varMaxDate = null;
                foundVtr.results.forEach((allDate) => {

                  //var varVtr = new Date(all.VTR_LIVE_DT.getFullYear(), all.VTR_LIVE_DT.getMonth(), all.VTR_LIVE_DT.getDate());
                  var varVtr = moment(new Date(allDate.VTR_LIVE_DT)).format('MM-DD-YYYY');
                 
                //  if (this._objBudget.HEADER.BDGT_FROM <= varVtr && varVtr <= this._objBudget.HEADER.BDGT_TO) {
                  var varVtr = moment(new Date(allDate.VTR_LIVE_DT)).format('MM-DD-YYYY');
                  var varDateCompare = new Date(varVtr);

                  if (varDataFromCompare <= varDateCompare && varDateCompare <= varDataToCompare) {
                    if (varMaxDate == null)
                      varMaxDate = varVtr;
                    else if (varMaxDate < varVtr)
                      varMaxDate = varVtr;

                    //toastr.error("Please enter range beyond the created budget (AC:" + all.ACTUAL_COST_ID + ")");
                  }
                });

                if(varMaxDate==null)
                {
                    resolve_2(true);
                } 
                else
                {
                  //console.log(varMaxDate);
                  var new_date = moment(varMaxDate, "MM-DD-YYYY");
                  //console.log(new_date);
                  new_date.add(1, 'days');
                  new_date = moment(new Date(new_date)).format('MM-DD-YYYY');
                 //    console.log(new_date);
                  //   console.log(new Date(this._objBudget.HEADER.BDGT_FROM));
                 //    if (new_date > new Date(this._objBudget.HEADER.BDGT_FROM))
                  toastr.error("An existing ActualCost with Id (" + all.ACTUAL_COST_ID + ") is using this budget template. <br>BudgetId (" + all.BDGT_TMPL_ID + ") with status (" + all.BDGT_TMPL_HDR.APPR_STAT_CD.replace("APP-", "") + ")." +
                    " Either open the existing Budget Template and create a Copy, or start the validity on " + new_date);

                  reject_2(false);
                }

             
              });


             });

            varPromises.push(newPromise);

          });

         Promise.all(varPromises).then((passed) => {
             resolve(true);
          }, (fail) => {
             reject(false);
             //reject(fail);
          });

        }
        else
           resolve(true);
        

      });

      

    });
    
  }


  fnSaveBudget(passed_status) 
  {

     var strValidation="";

     if(this._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE=="")
     {
        strValidation+="No Program specified. <br>";
     }
     
     if(!moment(this._objBudget.HEADER.BDGT_FROM).isValid() || !moment(this._objBudget.HEADER.BDGT_TO).isValid())
     {
        strValidation+="Invalid Template Start/End Date validity. <br>";
     }

     if(this._objBudget.HEADER.PROGRAM_GENRE_CD=="")
     {
        strValidation+="No Program Genre. <br>";
     }
     
     if(this._objBudget.HEADER.EPISODE_TYPE_CD=="")
     {
        strValidation+="No Episode Type. <br>";
     }

     if(this._objBudget.HEADER.TELECAST_MODE_CD=="")
     {
        strValidation+="No Telecast Mode. <br>";
     }

     if(!parseInt(this._objBudget.HEADER.TAPING_DAYS)>0)
     {
        strValidation+="Invalid Taping Day(s).<br>";
     }

     if(!parseInt(this._objBudget.HEADER.EPISODES)>0)
     {
        strValidation+="Invalid Episode(s).<br>";
     }

     if(strValidation!="")
     {
        toastr.error("Exception occured. <br/><br/>"+strValidation, "Budget Template");
        return;
     }
     
     if(this._objBudget.TOTAL<=0 && this._objBudget.HEADER.APPR_STAT_CD.includes('APPROVED'))
     {
        toastr.error("Cannot have Zero Total Budget.", "Budget Template");
        return;
     }

     //have to add +8 hrs or browser minus 8 hrs when passed to server
    // if (this._objBudget.HEADER.BDGT_FROM !== undefined)
    //   this._objBudget.HEADER.BDGT_FROM = moment(new Date(this._objBudget.HEADER.BDGT_FROM)).add(8, 'hours');

    // if (this._objBudget.HEADER.BDGT_TO !== undefined)
    //   this._objBudget.HEADER.BDGT_TO = moment(new Date(this._objBudget.HEADER.BDGT_TO)).add(8, 'hours');
     //this._objBudget.HEADER.APPR_STAT_CD
     if (passed_status.includes('EXPIRE') || passed_status.includes('CLOSE')) {
        //this.fnBudgetValidation_1(),  removed
      Promise.all([this.fnBudgetValidation_2()]).then((passed) => {
       if(passed_status!='')
         this._objBudget.HEADER.APPR_STAT_CD=passed_status;
         this.fnExecuteSaveBudgetHeader();
      }, (fail) => {
        toastr.error("Saving Cancelled.", "Saving..");

      });
    }
    else if (this._objBudget.HEADER.APPR_STAT_CD.includes('APPROVED')) {

      this.fnValidation_Approved().then((passed) => {

        var varToday = new Date(Date.now());

        if (new Date(varToday.getFullYear(), varToday.getMonth(), varToday.getDate()) >= new Date(moment(this._objBudget.HEADER.BDGT_TO).subtract(8, 'hours').format('MM-DD-YYYY'))) {
          this._objBudget.HEADER.APPR_STAT_CD = "APP-EXPIRED";
        }

        this.fnExecuteSaveBudgetHeader();

      }, (fail) => {
        toastr.error("Saving Cancelled.", "Saving..");
      });
      
    }
    else
    {
      this.fnExecuteSaveBudgetHeader();
    }


    return;

  }





  fnExecuteSaveBudgetHeader()
  {

      var varInsert=null;

    // if (this._objBudget.HEADER.BDGT_FROM !== undefined)
    //   this._objBudget.HEADER.BDGT_FROM = moment(new Date(this._objBudget.HEADER.BDGT_FROM)).add(8, 'hours');

    // if (this._objBudget.HEADER.BDGT_TO !== undefined)
    //   this._objBudget.HEADER.BDGT_TO = moment(new Date(this._objBudget.HEADER.BDGT_TO)).add(8, 'hours');


    // console.log(this._objBudget.HEADER.BDGT_FROM);
    // console.log(this._objBudget.HEADER.BDGT_TO);

      var varFrom = moment(new Date(this._objBudget.HEADER.BDGT_FROM)).add(8, 'hours');
      varFrom = new Date(varFrom);

      var varTo = moment(new Date(this._objBudget.HEADER.BDGT_TO)).add(8, 'hours');
      varTo = new Date(varTo);

      //var varTo = new Date(this._objBudget.HEADER.BDGT_TO);

      // console.log(varFrom);
      // console.log(varTo);

      if (this._objBudget.HEADER.REMARKS === undefined || this._objBudget.HEADER.REMARKS == null) {
        this._objBudget.HEADER.REMARKS="NONE";
      }
      else if (this._objBudget.HEADER.REMARKS.trim()=="")
      {
        this._objBudget.HEADER.REMARKS="NONE";
      }


      if (this._objBudget.HEADER.BDGT_TMPL_ID == "") {
      var getMax = EntityQuery().from('BDGT_TMPL_HDR').orderByDesc('BDGT_TMPL_ID').take(1);

      //CHANGED 6-17-2016, changed bec before if only 1 value available will auto bind to APPR_STAT_CD, now have to set it first
      if(this._objBudget.HEADER.APPR_STAT_CD==null || this._objBudget.HEADER.APPR_STAT_CD==undefined || this._objBudget.HEADER.APPR_STAT_CD=='undefined')
      {
        this._objBudget.HEADER.APPR_STAT_CD=this._STATUS[0].REF_CD;
      }

      //console.log(this._objBudget.HEADER.APPR_STAT_CD);

      EntityManager().executeQuery(getMax).then((successMax) => {
        var getMax = 1;

        if (successMax.results.length > 0)
          getMax = successMax.results[0].BDGT_TMPL_ID + 1;

          varInsert = EntityManager().createEntity('BDGT_TMPL_HDR', {
          BDGT_TMPL_ID: getMax,
          COMPANY_ID: this._COMPANY_ID,
          BDGT_FROM: varFrom,
          BDGT_TO: varTo,
          //PROGRAM_TYPE_CD: indiv.GLOBAL_GRP_ID,
          //EPISODE_MODE_CD: indiv.GLOBAL_GRP_ID,
          EPISODE_TYPE_CD: this._objBudget.HEADER.EPISODE_TYPE_CD,
          BDGT_VIEW_FCTR: 1,
          TAPING_DAYS: this._objBudget.HEADER.TAPING_DAYS,
          PROGRAM_ID: this._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID,
          CHARGE_CD: this._objBudget.HEADER.CHARGE_CD,
          PROGRAM_GENRE_CD: this._objBudget.HEADER.PROGRAM_GENRE_CD,
          PARENT_PROGRAM_ID: this._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID,
          BDGT_VIEW_CD: 'EPISODIC',
          APPR_STAT_CD: this._objBudget.HEADER.APPR_STAT_CD,
          CHARGE_TYPE_CD: '',
          BDGT_TOTAL: 0,
          REMARKS: this._objBudget.HEADER.REMARKS,
          CREATED_BY: this._user,
          CREATED_DT: new Date(Date.now()),
          //LAST_UPDATED_BY: indiv.GLOBAL_GRP_ID,
          //LAST_UPDATED_DT: indiv.GLOBAL_GRP_ID,
          TELECAST_MODE_CD: this._objBudget.HEADER.TELECAST_MODE_CD,
          BDGT_STAT_CD: getMax,
          //BDGT_TMPL_TYPE_CD: indiv.GLOBAL_GRP_ID,
          BDGT_FOR_CD: 'BDGT-EPISODIC',
          PROGRAM_NAME: this._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE,
          EPISODES: this._objBudget.HEADER.EPISODES,
          STATION_ID: this._objBudget.HEADER.STATION_ID,
          STATION_SENT_DATE: new Date(),
          STATION_SENT: 0
        });

        EntityManager().addEntity(varInsert);

        EntityManager().saveChanges().then((success) => {

          this._objBudget.HEADER.BDGT_TMPL_ID = success.entities[0].BDGT_TMPL_ID;

          this._disableCreateBudget=true;
          this._disableCancelBudget=false;
          this._disableRefreshBudget=false;
          this._disableSaveBudget=false;


          if(this._objBudget.HEADER.APPR_STAT_CD=="APP-APPROVED")
          {
            this._objBudget.STATUS="APPROVED";
            this._disableSaveBudget=true;

            this.budgetDisabled=true;
            this.programDisabled=true;

            // this._objBudget.OBSERVERS.enable_modal_button.forEach((all)=>{
            //   all(this.modalBudget.id, false);
            //   all(this.modalProgram.id, false);
            // });

            // this._dispatcher.dispatch('enable.modal.button', this.modalBudget.id, false);
            // this._dispatcher.dispatch('enable.modal.button', this.modalProgram.id, false);
          }
          else
          {
          
            this.budgetDisabled=true;
            this.programDisabled=false;

            // this._objBudget.OBSERVERS.enable_modal_button.forEach((all) => {
            //   all(this.modalBudget.id, false);
            //   all(this.modalProgram.id, true);
            // });

            // this._dispatcher.dispatch('enable.modal.button', this.modalBudget.id, false);
            // this._dispatcher.dispatch('enable.modal.button', this.modalProgram.id, true);
          }

          toastr.success("Succesfully Saved", "Budget Template");


          if(this._objBudget.IS_COPYING)
          {

            this._objBudget.OBSERVERS.copy_template.forEach((all) => {
              
              all('REGULAR');
              //all('GUEST');
            });


            // this._dispatcher.dispatch('copy.template','REGULAR');
            // this._dispatcher.dispatch('copy.template','GUEST');


            this._objBudget.IS_COPYING=false;

            //  setTimeout(()=>{

            
            //   this.fnBudget("refresh");
            // },5000);
            
            //this._IS_COPYING="";
          }
          else
          {
            this.fnBudget("refresh"); 
          }

          this._disableCreateBudget=true;
          this._disableSaveBudget=false;
          this._disableCancelBudget=false;
          this._disableRefreshBudget=false;
          this._disablePrintBudget = true;

          this.budgetDisabled=false;
          this.programDisabled=false;

          // this._objBudget.OBSERVERS.enable_modal_button.forEach((all)=>{
          //   all(this.modalBudget.id, true);
          //   all(this.modalProgram.id, true);
          // });

          // this._dispatcher.dispatch('enable.modal.button', this.modalBudget.id, true);
          // this._dispatcher.dispatch('enable.modal.button', this.modalProgram.id, true);


        }, (fail) => {

          if(varInsert!=null)
          {
            varInsert.entityAspect.setDeleted();  
          }
          
          EntityManager().getEntities().forEach(function(entity) {
            var errors = entity.entityAspect.getValidationErrors();
            if (errors.length > 0)
              console.log(errors);
          });
          console.log(fail);
          toastr.error("Error Occured", fail);
        });

      });

    } else {
      
      var getEntityQuery = EntityQuery().from('BDGT_TMPL_HDR').where("BDGT_TMPL_ID", "==", this._objBudget.HEADER.BDGT_TMPL_ID);
      EntityManager().executeQuery(getEntityQuery).then((item) => {

        item.results[0].BDGT_FROM = varFrom;
        item.results[0].BDGT_TO = varTo;
        item.results[0].EPISODE_TYPE_CD = this._objBudget.HEADER.EPISODE_TYPE_CD;
        item.results[0].TAPING_DAYS = this._objBudget.HEADER.TAPING_DAYS;
        item.results[0].PROGRAM_ID = this._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID;
        item.results[0].CHARGE_CD = this._objBudget.HEADER.CHARGE_CD;
        item.results[0].PROGRAM_GENRE_CD = this._objBudget.HEADER.PROGRAM_GENRE_CD;
        item.results[0].PARENT_PROGRAM_ID = this._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID;
        item.results[0].APPR_STAT_CD = this._objBudget.HEADER.APPR_STAT_CD;
        item.results[0].REMARKS = this._objBudget.HEADER.REMARKS;
        item.results[0].LAST_UPDATED_BY = this._user;
        item.results[0].LAST_UPDATED_DT = new Date(Date.now());
        item.results[0].TELECAST_MODE_CD = this._objBudget.HEADER.TELECAST_MODE_CD;
        item.results[0].PROGRAM_NAME = this._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE;
        item.results[0].EPISODES = this._objBudget.HEADER.EPISODES;
        item.results[0].STATION_ID =  this._objBudget.HEADER.STATION_ID;

        EntityManager().saveChanges().then((success) => {
          
          this._disableCreateBudget = true;
          this._disableCancelBudget = false;
          this._disableRefreshBudget = false;
          this._disableSaveBudget = false;


          this.budgetDisabled=true;
          this.programDisabled=false;
          // this._objBudget.OBSERVERS.enable_modal_button.forEach((all)=>{
          //   all(this.modalBudget.id, false);
          //   all(this.modalProgram.id, true);
          // });

          // this._dispatcher.dispatch('enable.modal.button', this.modalBudget.id, false);
          // this._dispatcher.dispatch('enable.modal.button', this.modalProgram.id, true);

          toastr.success("Succesfully Saved", "Budget Template");
          this.fnBudget("refresh"); 
        }, (fail) => {

          EntityManager().getEntities().forEach(function(entity) {
            var errors = entity.entityAspect.getValidationErrors();
            if (errors.length > 0)
              console.log(errors);
          });
          console.log(fail);
          toastr.error("Error Occured", fail);
        });


      });
     

        
      this._disableBudgetId=true;

      // this._objBudget.CALLER.VALUE1 = this.modalBudget.id;
      // this._objBudget.CALLER.VALUE2 = false;
      // this._objBudget.CALLER.ACTION = 'enable.modal.button';

      this.budgetDisabled=true;
      // this._objBudget.OBSERVERS.enable_modal_button.forEach((all) => {
      //   all(this.modalBudget.id, false);
      // });

      //this._dispatcher.dispatch('enable.modal.button', this.modalBudget.id, false);
      this._disablePrintBudget = false;
    }



  }



    fnDialogProgram(){
      this.dialogService.open({
        viewModel: program
      }).whenClosed(response => {
        
        if (!response.wasCancelled) {
          
        } else {
          
        }
      });
    }



    fnDialogBudget(){
      this.dialogService.open({
        viewModel: budget
      }).whenClosed(response => {
          settings.isNavigating = true;
        if (!response.wasCancelled) {
        
        } else {
          
        }
      });
    }


}