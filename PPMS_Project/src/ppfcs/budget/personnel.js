import {  bindable, inject } from 'aurelia-framework';
import { cache_budget } from 'ppfcs/cache_budget';
import { cache_obj } from 'cache_obj';
import { EntityManager, EntityQuery, generateID } from 'entity-manager-factory';
import {  getLookups,getJobByGlobalCompany,getJobByName } from 'masterfiles';
import {  substringMatcher } from 'helpers';
import typeahead from 'typeahead';
import settings from 'settings';
import _ from 'underscore';
import {  ModalWizard } from 'modals/modal-wizard';
import numeral from 'numeral';
import { MultiObserver } from 'multi-observer';
import toastr from "toastr";

import { globalindivmstr } from '../../modals/globalindivmstr';
import { indivmstr } from '../../modals/indivmstr';
import { job } from '../../modals/job';
import { paymentterm } from '../../modals/paymentterm';
import {DialogService} from 'aurelia-dialog';
import breeze from 'breeze-client';

@inject(cache_obj, cache_budget, ModalWizard, MultiObserver, DialogService)
export class PersonnelCustomElement
{

  @bindable toPerson;
  @bindable toPersonModel;

  _cache_obj = null;
  _cache_budget = null;

  styleStringHidden = 'visibility: hidden;display:none;';
  styleStringVisible = 'visibility: visible;';
  _ModalWizard;
  _selectedItem;
  _JOBS = null;
  _PYMNTTERM = [];
  _currentIndex;
  _ce_head;
  _personnelSearch;
  _signal;
  _Personnel=[];
  _PersonnelTM=[];
  _Index=0;
  varPymnt=null;
  isIndivMstrTalentsDisabled=false;
  isIndivMstrManagerDisabled=false;
  isJobDisabled=false;
  isIndivMstrDisabled=false;
  dialogService=null;
  _cache_budget;

  constructor(cache_obj, cache_budget, ModalWizard, multiObserver,dialogService) 
  {

    if (EntityManager() === undefined) {
        return;
    }

    this.cache_budget = cache_budget;
    this.dialogService=dialogService;

    this._cache_obj = cache_obj;
    this._cache_budget = cache_budget;
      
    this._ModalWizard = ModalWizard;
    this._ce_head = "+";

    multiObserver.observe(
      [
      [this, '_personnelSearch']
      ], (newValue, oldValue) => this.onSpeculateProp(newValue, oldValue));

    
    
    this._cache_budget.OBSERVERS.disable_search_personnel.push((val) => {
      this.ButtonStatus(val);
    });

    //this._cache_budget.OBSERVERS.login_passed.push(() => {
    //  this.LoginPassed();
    //});

    this._cache_budget.OBSERVERS.reset_all.push(() => {
      this.resetView();
    });

    this._cache_obj.OBSERVERS.budget_dialog.push((val) => {
      this.CloseBudgetDialog(val);
    });

    this._cache_budget.OBSERVERS.enable_approved.push((val) => {
      this.ButtonStatus(val);
    });

    this._cache_budget.OBSERVERS.copy_template.push((val) => {
      this.fnCallCopy(val);
    });

    this._cache_budget.OBSERVERS.pass_indiv.push((val) => {
      this.PassedIndiv(val);
    });

    this._cache_budget.OBSERVERS.pass_group.push((val) => {
      this.PassedGroup(val);
    });

    this._cache_budget.OBSERVERS.refreshPersonnelTab.push((val) => {
      this.refreshOnSelect(val);
    });

    this._cache_budget.OBSERVERS.pass_job.push((val) => {
      this.passJob(val);
    });

    this._PYMNTTERM = getLookups().PAYMENT_TERM;
    //GET BACK HERE!!!. these part is being saved 3 times, regular, semi and staff
    this._JOBS = getLookups().JOB_GRP_CATEGORY.filter
        ((all) => all.COMPANY_ID == this._cache_obj.USER.COMPANY_ID);

    //console.log(this._PYMNTTERM);
  }


  
  //LoginPassed() 
  //{

  //  //GET BACK HERE!!!. these part is being saved 3 times, regular, semi and staff
  //  this._PYMNTTERM = getLookups().PAYMENT_TERM;
  //  //GET BACK HERE!!!. these part is being saved 3 times, regular, semi and staff
  //  this._JOBS = getLookups().JOB_GRP_CATEGORY.filter
  //  ((all)=>all.COMPANY_ID==this._cache_obj.USER.COMPANY_ID);

  //}


  passJob(job)
  {
    var index = this._Index;
    
    this._Personnel[index].JOB_ID = job.JOB_ID;
    this._Personnel[index].JOB_DESC = job.JOB_DESC;
    var varGrpCategory = getLookups().JOB_GRP_CATEGORY.find((all) => all.JOB_ID == this._Personnel[index].JOB_ID && all.COMPANY_ID ==
      this._cache_obj.USER.COMPANY_ID);

    if (varGrpCategory !== undefined) {
      this._Personnel[index].CATEGORY_ID = varGrpCategory.CATEGORY_ID;
      this._Personnel[index].CATEGORY_DESC = varGrpCategory.CATEGORY_DESC;
    }
    
  }

  onSpeculateProp(newValue, oldValue)
  {

    var varResult = [];

    this._Personnel.forEach((all) =>
    {
      all.visible = true;

      if (this._personnelSearch.toUpperCase() !== "") 
      {
        if (all['PERSONNEL_NAME'] !== undefined && all['PERSONNEL_NAME']!=null)
          if (!all['PERSONNEL_NAME'].toUpperCase().includes(this._personnelSearch.toUpperCase())) 
          {
            all.visible = false;
          }

          if (all['BLANK_PERSONNEL_NAME'] !== undefined && all['PERSONNEL_NAME']!=null)
            if (!all['BLANK_PERSONNEL_NAME'].toUpperCase().includes(this._personnelSearch.toUpperCase())) 
            {
              all.visible = false;
            }

          }
          
        });

    this._signal = generateID();

  }


  
  //@handle('reset.all')
  resetView() 
  {

    this._signal = generateID();

  }

  collapse_expand_head()
  {
    if (this._ce_head == "+") 
    {
      this._ce_head = "-";
      this._Personnel.forEach((item) => 
      {
        item.ce_value = "-";
        item.styleString = this.styleStringVisible;
      });

    } 
    else 
    {
      this._ce_head = "+";
      this._Personnel.forEach((item) => 
      {
        item.ce_value = "+";
        item.styleString = this.styleStringHidden;
      });
    }

  }

  collapse_expand(item) 
  {

    if (item.ce_value == "+") 
    {

      item.ce_value = "-";
      item.styleString = this.styleStringVisible;

    } 
    else 
    {

      item.ce_value = "+";
      item.styleString = this.styleStringHidden;

    }
  }


  //@handle('budget.dialog')
  CloseBudgetDialog(value) 
  {

    this.fnCheckBudget(value);

  }


  fnCheckExistingTalents(TALENTS,item)
  {

    if(TALENTS==undefined || TALENTS==null || TALENTS=="")
    {
     
      return true;
    }
    else if(TALENTS.length>0)
    {
      if(item)
        item.REMOVE=false;

      return false;
    }
    
    return true;

  } 

  myFunction() 
  {

    alert('loaded');

  }

  //@handle('enable.approved')
  ButtonStatus(value) 
  {

      this._cache_obj.OBSERVERS.enable_modal_button.forEach((all)=>
    {
      this.isIndivMstrDisabled=!value;
      this.isIndivMstrTalentsDisabled=!value;
      
    });

  }


 //@handle('copy.template')
 fnCallCopy(usr)
 {
   
  this._Personnel.forEach((item) => 
  {
    if (item.TALENT_MANAGER !== undefined) 
    {
      item.TALENT_MANAGER.BDGT_TMPL_DTL_ID_TMP = undefined;
      item.TALENT_MANAGER.BDGT_TMPL_DTL_ID = undefined;
    };
    item.BDGT_TMPL_DTL_ID=undefined;
    
    item.BDGT_TMPL_DTL_ID_LINK = undefined;
    item.BDGT_TMPL_DTL_ID_LINK_TMP = undefined;

  });
  
  if (this.toPersonModel.USE == usr)
   this.savePersonnel(1);

 
}



fnCheckBudget(BDGT_TMPL_ID) 
{


  this._cache_obj.OBSERVERS.enable_modal_button.forEach((all)=>
  {
    this.isIndivMstrDisabled=false;
    this.isIndivMstrTalentsDisabled=false;
  });

  
  setTimeout(() => 
  {

    this.scrollDiv();

  }, 5000);

  var varPsClType="";
  if (this.toPersonModel.USE == "REGULAR") 
  {

    varPsClType = "Regular";
    this._cache_budget.REGULAR = [];

  } 
  else if (this.toPersonModel.USE == "SEMI_REGULAR") 
  {

    varPsClType = "Semi-Regular";
    this._cache_budget.SEMI_REGULAR = [];

  } 
  else if (this.toPersonModel.USE == "STAFF") 
  {

    varPsClType = "Staff";
    this._cache_budget.STAFF = [];

  }
  

  var p1 = breeze.Predicate.create('BDGT_TMPL_ID', '==', BDGT_TMPL_ID);
  var p2 = breeze.Predicate.create('PERSONNEL_CLASS_TYPE', '==', varPsClType);
  var pred = breeze.Predicate.and([p1, p2]);
  

  var _query = EntityQuery().from('BDGT_TMPL_DTL').where(pred).orderBy("GROUP_ORDER");
  EntityManager().executeQuery(_query).then((found) => {

      //this._cache_budget.REGULAR = found.results.filter(all => all.PERSONNEL_CLASS_TYPE.toUpperCase() == "REGULAR");

      var varJobLength = getLookups().JOB_MSTR.length - 1;
      var varCategoryLength = getLookups().CATEGORY_MSTR.length - 1;
      
      this._Personnel.splice(0,this._Personnel.length);
      this._PersonnelTM.splice(0,this._PersonnelTM.length);
      

      found.results.forEach((item)=>
      {

        this._Personnel.push(
        {
          BDGT_TMPL_DTL_ID: item.BDGT_TMPL_DTL_ID,
          BDGT_TMPL_ID: this._cache_budget.HEADER.BDGT_TMPL_ID,
          JOB_ID: item.JOB_ID,
          GLOBAL_ID: item.GLOBAL_ID,
          CONTRACT_AMT: item.CONTRACT_AMT,
          CATEGORY_ID: item.CATEGORY_ID,
          STAFF_WORK: item.STAFF_WORK,
          PYMNT_TERM_CD: item.PYMNT_TERM_CD,
          PAY_TO_PERSON_FL: 'T',
          PAY_RATE_FACTOR: item.PAY_RATE_FACTOR,
          BUDGET_AMT: item.INPUT_AMT,
          TAPING_DAY_CNT: this._cache_budget.HEADER.TAPING_DAYS,
          PERSONNEL_CLASS_CD: item.PERSONNEL_CLASS_CD,
          REMARKS: item.REMARKS,
          PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
          PERSONNEL_NAME: item.PERSONNEL_NAME,
          INPUT_AMT: item.INPUT_AMT,
          CONFIDENTIAL: item.CONFIDENTIAL,
          POOL_RECORD: item.POOL_RECORD,
          GROUP_ORDER: item.GROUP_ORDER,
          GLOBAL_ID_LINK: item.GLOBAL_ID_LINK,
          BDGT_TMPL_DTL_ID_LINK: item.BDGT_TMPL_DTL_ID_LINK
        });

      });
      


      if (this.toPersonModel.USE == "REGULAR") 
      {

        this._cache_budget.REGULAR = this._Personnel;

        if(this._cache_budget.REGULAR.length>0)
          toastr.success("REGULAR PERSONNEL", "Loading Successful.");
        //this._Personnel = this._cache_budget.REGULAR;
        this.setPersonnelValues(this._cache_budget.REGULAR, varJobLength, varCategoryLength);

      }
      else if (this.toPersonModel.USE == "SEMI_REGULAR") 
      {

        varPsClType = "Semi-Regular";

        this._cache_budget.SEMI_REGULAR = this._Personnel;
        
        if(this._cache_budget.SEMI_REGULAR.length>0)
          toastr.success("SEMI-REGULAR PERSONNEL", "Loading Successful.");

        //this._Personnel = this._cache_budget.SEMI_REGULAR;
        this.setPersonnelValues(this._cache_budget.SEMI_REGULAR, varJobLength, varCategoryLength);

      }
      else if (this.toPersonModel.USE == "STAFF")
      {

        varPsClType = "Staff";

        this._cache_budget.STAFF = this._Personnel;

        if(this._cache_budget.STAFF.length>0)
          toastr.success("STAFF PERSONNEL", "Loading Successful.");
        
        //this._Personnel = this._cache_budget.STAFF;
        this.setPersonnelValues(this._cache_budget.STAFF, varJobLength, varCategoryLength);

      }

      this._signal = generateID();
      

      this._cache_budget.OBSERVERS.reset_summary.forEach((all)=>
      {

        all();

      });

    });
  
}

setPersonnelValues(obj,varJobLength,varCategoryLength) 
{
 
     //move this undefined setting in able not to conflict while adding new talents on the second looop
     _.each(obj, (item) => {
      item.TALENTS = undefined; 
    });
     
     _.each(obj, (item) => {

       
      for (var i = 0; i <= varJobLength; ++i) {
        if (getLookups().JOB_MSTR[i].JOB_ID == item.JOB_ID) {
          item.JOB_DESC = getLookups().JOB_MSTR[i].JOB_DESC;
          break;
        }
      };

      for (var i = 0; i <= varCategoryLength; ++i) {
        if (getLookups().CATEGORY_MSTR[i].CATEGORY_ID == item.CATEGORY_ID) {
          item.CATEGORY_DESC = getLookups().CATEGORY_MSTR[i].CATEGORY_DESC;
          break;
        }
      };


      for (var i = 0; i <= this._PYMNTTERM.length - 1; ++i) {
        if (this._PYMNTTERM[i].REF_CD == item.PYMNT_TERM_CD) {
          item.PAYMENT_TERM = this._PYMNTTERM[i].REF_DESC;
          break;
        }
      };


      if (item.BDGT_TMPL_DTL_ID_LINK !== 0) {

        //var varTalent = getLookups().GLOBAL_INDIV_WITH_ALIAS.find((allIndiv) => allIndiv.GLOBAL_INDIV_ID == item.GLOBAL_ID_LINK);
       //console.log(item.BDGT_TMPL_DTL_ID_LINK);
       var varTM = obj.find((all)=>all.BDGT_TMPL_DTL_ID==item.BDGT_TMPL_DTL_ID_LINK);
       item.TALENT_MANAGER = {
        BDGT_TMPL_DTL_ID_TMP: varTM.BDGT_TMPL_DTL_ID,
        GLOBAL_INDIV_ID: varTM.GLOBAL_ID,
        PERSONNEL_NAME: varTM.PERSONNEL_NAME,
        CONTRACT_AMT_TMP:numeral(varTM.CONTRACT_AMT).format('0,0.00'),
        INPUT_AMT_TMP:numeral(varTM.INPUT_AMT).format('0,0.00'),
        PAY_RATE_FACTOR_TMP:numeral(varTM.PAY_RATE_FACTOR).format('0,0.00'),
        REMARKS: varTM.REMARKS,
        JOB_ID: varTM.JOB_ID,
        CATEGORY_ID: varTM.CATEGORY_ID,
        GROUP_ORDER:-1
      };

      this._PersonnelTM.push({
        BDGT_TMPL_DTL_ID: varTM.BDGT_TMPL_DTL_ID,
        BDGT_TMPL_DTL_ID_TMP: varTM.BDGT_TMPL_DTL_ID,
        GLOBAL_INDIV_ID: varTM.GLOBAL_ID,
        PERSONNEL_NAME: varTM.PERSONNEL_NAME,
        CONTRACT_AMT_TMP:numeral(varTM.CONTRACT_AMT).format('0,0.00'),
        INPUT_AMT_TMP:numeral(varTM.INPUT_AMT).format('0,0.00'),
        PAY_RATE_FACTOR_TMP:numeral(varTM.PAY_RATE_FACTOR).format('0,0.00'),
        REMARKS: varTM.REMARKS,
        JOB_ID: varTM.JOB_ID,
        CATEGORY_ID: varTM.CATEGORY_ID,
        GROUP_ORDER:-1
      });

      

    }



    item.BLANK_PERSONNEL_NAME = item.PERSONNEL_NAME;
    item.CONTRACT_AMT_TMP = numeral(item.CONTRACT_AMT).format('0,0.00');
    item.INPUT_AMT_TMP = numeral(item.INPUT_AMT).format('0,0.00');
    item.PAY_RATE_FACTOR_TMP = numeral(item.PAY_RATE_FACTOR).format('0,0.00');
    item.CONFIDENTIAL_TMP = (item.CONFIDENTIAL == 1 ? true : false);
    item.STAFF_WORK_TMP = (item.STAFF_WORK == 1 ? true : false);
    item.POOL_RECORD_TMP = (item.POOL_RECORD == 1 ? true : false);

    item.BDGT_TMPL_DTL_ID_LINK_TMP = item.BDGT_TMPL_DTL_ID_LINK;
    
    item.styleString = this.styleStringHidden;
    item.ce_value = "+";
    item.visible = true;
    

  });
     
     
     for (var i = obj.length - 1; i >= 0; i--) {
      var varToDelete = this._PersonnelTM.find((all)=>all.BDGT_TMPL_DTL_ID_TMP==obj[i].BDGT_TMPL_DTL_ID);

      if(varToDelete!==undefined)
      { 
        obj.splice(i,1);
      }
    }
    
  }


  removeTalent(parent,item,index)
  {
    this._Personnel.forEach((all)=>{
      if(all.GLOBAL_ID==item.GLOBAL_INDIV_ID)
      {
        //remove this on the list of talents of talent manager
        var varToSplice = parent.item.TALENTS.splice(index,1);

        delete item.TALENT_MANAGER.CONTRACT_AMT_TMP;
        delete item.TALENT_MANAGER.INPUT_AMT_TMP;
        delete item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP;
        delete item.TALENT_MANAGER.REMARKS;
        delete item.TALENT_MANAGER;

        this._signal = generateID();
      }
    });
  }

  fnRegularFocus(index, prop) 
  {

    this._Index = index;
    if (prop == "JOB")
    { 

      this.fnModalJob();

      return;
    }


    this.fnModalPaymentTerm();
    

    
  }

  //CREATE typeahead on focus instead...........!!!!!!!!!!!!
  // fnReloadTypeahead() {

  //   //$('.jobclass').typeahead('destroy');

  //   var varCnt = 0;

  //   _.each($(this.tblData).find(".jobclass"), (all) => {

  //     $(all).attr("tableJobIndex", varCnt);
  //     //$("input[tableJobIndex*='" + varCnt + "']").removeAttr("hasTypeahead");
  //     ++varCnt;


  //   });


  //   $(".pymnttrmclass").typeahead('destroy');
  //   $(".pymnttrmclass")
  //     .typeahead({
  //       hint: false,
  //       highlight: true,
  //       minLength: 1,
  //       limit: 10
  //     }, {
  //       source: substringMatcher(this._PYMNTTERM.map((item) => {
  //         return item.REF_DESC
  //       }))


  //     });

  //   varCnt = 0;
  //   _.each($(this.tblData).find(".pymnttrmclass"), (all) => {
  //     $(all).attr("tableTermIndex", varCnt);

  //     ++varCnt;


  //   });
  // }

  scrollDiv() 
  {


    $(this.tblHeader).css("visibility","visible");
    // console.log($(this.tblData).position().top);
    // console.log($(this.tblHeader).height());
    // console.log($(this.divRegular).scrollTop());
    $(this.tblHeader).css("top", $(this.divRegular).scrollTop() + $(this.tblData).position().top);

    var varCol = 0;
    _.each($(this.tblData).find('td'), (item) => {

      //last two is not really td element
      if (varCol > $(this.tblHeader).find('td').length - 2)
        return;

      $($(this.tblHeader).find('td')[varCol]).css("width", $(this.tblData).find('td')[varCol].clientWidth + 1);
      ++varCol;
    });


  }

  AmountBlur(item, property) 
  {

    var varConverted = numeral(item[property]).format('0,0.00');
    item[property] = varConverted;

  }

  showTalents(item)
  {

    this._selectedItem = item;

    this._cache_budget.OBSERVERS.open_modal.forEach((all)=>{
      //all(this.modalIndivMstrTalents.id, true);
      this.isIndivMstrTalentsDisabled=false;
    });

    //this._dispatcher.dispatch('open.modal', this.modalIndivMstrTalents.id, true);
  }


  showTalentMngr(item) 
  {

    this._selectedItem = item;

    this.fnIndivMstr();
    
  }

  removeTalentMngr(item)
  {
    item.TALENT_MANAGER = undefined;

    
     // AURELIA now is not supporting removing of property, changed it to undefined instead
     // delete all.TALENT_MANAGER.CONTRACT_AMT_TMP;
     // delete all.TALENT_MANAGER.INPUT_AMT_TMP;
     // delete all.TALENT_MANAGER.PAY_RATE_FACTOR_TMP;
     // delete all.TALENT_MANAGER.REMARKS;
     //delete all.TALENT_MANAGER;
     

     this._signal = generateID();

     this._cache_budget.OBSERVERS.reset_summary.forEach((all)=>{
       all();
     });

   }

  //@handle('pass.indiv')
  PassedIndiv(value) 
  {
   // if (this.modalIndivMstrManager.id == this._ModalWizard.ids[this._ModalWizard.ids.length - 1]) {
  //    this._ModalWizard.ids.pop();


    // this._cache_budget.OBSERVERS.close_modal.forEach((all)=>{
    //   all(this.modalIndivMstrManager.id);
    // });

      //this._dispatcher.dispatch('close.modal', this.modalIndivMstrManager.id);
      if(this._selectedItem!==undefined)
        if(value.GLOBAL_INDIV_ID==this._selectedItem.GLOBAL_ID)
        {
          toastr.error("<strong>Talent Manager cannot be same Personnel</strong>.", "Problem occured");
          return;
        }

      // this._selectedItem.TALENT_MANAGER = value;
      // this._selectedItem.TALENT_MANAGER.CONTRACT_AMT_TMP = numeral(0).format('0,0.00');
      // this._selectedItem.TALENT_MANAGER.INPUT_AMT_TMP = numeral(0).format('0,0.00');
      // this._selectedItem.TALENT_MANAGER.PAY_RATE_FACTOR_TMP = numeral(0).format('0,0.00');


      var varJobTManager = getJobByName("TALENT MANAGER");
      if(parseInt(varJobTManager.COMPANY_ID)!=parseInt(this._cache_obj.USER.COMPANY_ID))
      {
        toastr.error(varJobTManager.JOB_DESC+" Job is not included on jobs from users company.", "Problem occured");
        varJobTManager.JOB_ID="";
        varJobTManager.JOB_DESC="";
      }


      this.getDefaultPymntTerm();

      this._selectedItem.TALENT_MANAGER = { GLOBAL_INDIV_ID: value.GLOBAL_INDIV_ID, PERSONNEL_NAME: value.PERSONNEL_NAME,
        PERSONNEL_INFO_SRC: value.PERSONNEL_INFO_SRC,
        JOB_ID: varJobTManager.JOB_ID,
        JOB_DESC: varJobTManager.JOB_DESC,
        PYMNT_TERM_CD: this.varPymnt.REF_CD,
        PAYMENT_TERM: this.varPymnt.REF_DESC,
        CATEGORY_ID: varJobTManager.CATEGORY_ID,
        CATEGORY_DESC: varJobTManager.CATEGORY_DESC,
        PAY_RATE_FACTOR_TMP: numeral(1).format('0,0.00'),
        CONTRACT_AMT_TMP: numeral(0).format('0,0.00'),
        INPUT_AMT_TMP: numeral(0).format('0,0.00')
      };  

      
      this._cache_budget.OBSERVERS.reset_summary.forEach((all)=>
      {
        all();
      });

      

    //}
  }

  getDefaultPymntTerm()
  {

    if(this.varPymnt==null)
      this.varPymnt=this._PYMNTTERM.find(all => all.REF_GRP_CD == 'PYMNT_TERM_CD' && all.REF_CD == 'DAILY');

  }

  fnPassedPersonnels(value)
  {
    //  console.log(value);
    this.getDefaultPymntTerm();

    value.forEach((val) => {

      var varJob =  getJobByGlobalCompany(val.GLOBAL_INDIV_ID);

      if (parseInt(varJob.COMPANY_ID) !== parseInt(this._cache_obj.USER.COMPANY_ID)) {
        toastr.error(varJob.JOB_DESC +" Job is not included on jobs from users company.", "Problem occured");
        varJob.JOB_ID = "";
        varJob.JOB_DESC = "";
      }

      this._Personnel.push({
        GLOBAL_ID: val.GLOBAL_INDIV_ID,
        PERSONNEL_NAME: val.PERSONNEL_NAME,
        PERSONNEL_INFO_SRC: val.PERSONNEL_INFO_SRC,
        JOB_ID: varJob.JOB_ID,
        JOB_DESC: varJob.JOB_DESC,
        PYMNT_TERM_CD: this.varPymnt.REF_CD,
        PAYMENT_TERM: this.varPymnt.REF_DESC,
        CATEGORY_ID: varJob.CATEGORY_ID,
        CATEGORY_DESC: varJob.CATEGORY_DESC,
        PAY_RATE_FACTOR_TMP: numeral(1).format('0,0.00'),
        CONTRACT_AMT_TMP: numeral(0).format('0,0.00'),
        INPUT_AMT_TMP: numeral(0).format('0,0.00'),
        STAFF_WORK_TMP: false,
        CONFIDENTIAL_TMP: false,
        visible: true
          //t_talent_manager:true
        });

      
    });


    this._Personnel.forEach((all) => {
      if (all.STATUS_CD == "" || all.STATUS_CD === undefined) {
        all.STATUS_CD = "";
      }
      all.ce_value = "+";
      all.styleString = this.styleStringHidden;
    });


      //this.setPersonnel(tmpgrpMembers) ;
      
      
      this._Personnel.forEach((all)=>{
        var varIndiv = getLookups().GRP_INDIV_MSTR.find((allIndiv)=>allIndiv.GLOBAL_INDIV_ID==all.GLOBAL_ID);
        
        if(varIndiv!==undefined)
        {
         var varJobTManager = getJobByName("TALENT MANAGER");

         if (parseInt(varJobTManager.COMPANY_ID) != parseInt(this._cache_obj.USER.COMPANY_ID)) {
          toastr.error(varJobTManager.JOB_DESC + "Job is not included on jobs from users company.", "Problem occured");
          varJobTManager.JOB_ID = "";
          varJobTManager.JOB_DESC = "";
        }

        var varTalent = getLookups().GLOBAL_GRP_MSTR.find((allIndiv)=>allIndiv.GLOBAL_GRP_ID==varIndiv.GLOBAL_GRP_ID);
        all.TALENT_MANAGER = { GLOBAL_INDIV_ID: varTalent.GLOBAL_GRP_ID, PERSONNEL_NAME: varTalent.GROUP_NAME,
          PERSONNEL_INFO_SRC: varJobTManager.PERSONNEL_INFO_SRC,
          JOB_ID: varJobTManager.JOB_ID,
          JOB_DESC: varJobTManager.JOB_DESC,
          PYMNT_TERM_CD: this.varPymnt.REF_CD,
          PAYMENT_TERM: this.varPymnt.REF_DESC,
          CATEGORY_ID: varJobTManager.CATEGORY_ID,
          CATEGORY_DESC: varJobTManager.CATEGORY_DESC,
          PAY_RATE_FACTOR_TMP: numeral(1).format('0,0.00'),
          CONTRACT_AMT_TMP: numeral(0).format('0,0.00'),
          INPUT_AMT_TMP: numeral(0).format('0,0.00'),
          STAFF_WORK_TMP: false,
          CONFIDENTIAL_TMP: false
        };  

        
      }

    });
      

      this._cache_budget.OBSERVERS.reset_summary.forEach((all)=>{
        all();
      });


    }

  //@handle('pass.group')
  PassedGroup(value) 
  {

    // if (this.modalIndivMstr.id == this._ModalWizard.ids[this._ModalWizard.ids.length - 1]) {


    //   this._ModalWizard.ids.pop();


    //   this._cache_obj.OBSERVERS.close_modal.forEach((all)=>{
    //     all(this.modalIndivMstr.id);
    //   });



    // } else 

    if (this.modalIndivMstrTalents.id == this._ModalWizard.ids[this._ModalWizard.ids.length - 1]) {

      
      //var tmpgrpMembers = this._Personnel;
      
      this.getDefaultPymntTerm();

      this._selectedItem.TALENTS = value;

      this._selectedItem.TALENTS.forEach((all)=>{
        if (this._Personnel.find((allReg) => allReg.GLOBAL_ID == all.GLOBAL_INDIV_ID) === undefined) {
          
          var varJob = getJobByGlobalCompany(all.GLOBAL_INDIV_ID);

          if (parseInt(varJob.COMPANY_ID) != parseInt(this._cache_obj.USER.COMPANY_ID)) {
            toastr.error(varJob.JOB_DESC+" Job is not included on jobs from users company.", "Problem occured");
            varJob.JOB_ID = "";
            varJob.JOB_DESC = "";
          }

          var varTalent = getLookups().GLOBAL_INDIV_WITH_ALIAS.find((allIndiv)=>allIndiv.GLOBAL_INDIV_ID==all.GLOBAL_INDIV_ID);

          this._Personnel.push({
            GLOBAL_ID: all.GLOBAL_INDIV_ID,
            PERSONNEL_NAME: all.PERSONNEL_NAME,
            PERSONNEL_INFO_SRC: varTalent.PERSONNEL_INFO_SRC,
            JOB_ID: varJob.JOB_ID,
            JOB_DESC: varJob.JOB_DESC,
            PYMNT_TERM_CD: this.varPymnt.REF_CD,
            PAYMENT_TERM: this.varPymnt.REF_DESC,
            CATEGORY_ID: varJob.CATEGORY_ID,
            CATEGORY_DESC: varJob.CATEGORY_DESC,
            PAY_RATE_FACTOR_TMP: numeral(1).format('0,0.00'),
            CONTRACT_AMT_TMP: numeral(0).format('0,0.00'),
            INPUT_AMT_TMP: numeral(0).format('0,0.00'),
            STAFF_WORK_TMP: false,
            CONFIDENTIAL_TMP: false,
            GLOBAL_ID_LINK: this._selectedItem.GLOBAL_ID,
            TALENT_MANAGER: {
              GLOBAL_INDIV_ID: this._selectedItem.GLOBAL_ID,
              PERSONNEL_NAME: this._selectedItem.PERSONNEL_NAME
            }
          });
        }
      });
      

      this._ModalWizard.ids.pop();



      // this._cache_budget.OBSERVERS.close_modal.forEach((all)=>{
      //   all(this.modalIndivMstrTalents.id);
      // });


      this._cache_budget.OBSERVERS.reset_summary.forEach((all)=>{
        all();
      });

    }

    this._signal = generateID();

    // setTimeout(() => {
    //   this.fnReloadTypeahead();
    //  }, 5000);
  }

  //@handle('refreshPersonnelTab')
  refreshOnSelect(personnel) 
  {
    $(this.tblHeader).css("visibility","hidden");
  }

  moveTrigger(value) 
  {

    if (value == "up") 
    {
      if (this._currentIndex > 0) 
      {

        this._Personnel.splice(this._currentIndex-1, 0, this._Personnel[this._currentIndex]);
        var varCopy = this._Personnel.splice(this._currentIndex + 1, 1);
        this._currentIndex = this._currentIndex-1;

      }

    } 
    else 
    {

      if (this._currentIndex < this._Personnel.length - 1) {

       // var varIndex=this._currentIndex + 1;
       //  var varFinish=false;
       //  while (!varFinish) {
       //    if (this._Personnel[varIndex].GROUP_ORDER == -1) {
       //        ++varIndex;
       //        console.log(varIndex);
       //    }
       //    else
       //    {
       //        varFinish=true;
       //    }


       //    if(varIndex<0)
       //    {
       //      varFinish=true;
       //      varIndex=this._Personnel.length - 1;
       //    }
       //  }

       //  this._Personnel.splice(this._currentIndex + 2, 0, this._Personnel[this._currentIndex]);
       //  var varCopy = this._Personnel.splice(this._currentIndex, 1);
       //  this._currentIndex = this._currentIndex + 1;

       this._Personnel.splice(this._currentIndex + 2, 0, this._Personnel[this._currentIndex]);
       var varCopy = this._Personnel.splice(this._currentIndex, 1);
       this._currentIndex = this._currentIndex + 1;
     }
   }

    //have to do bec refreshing on filter arrangement will not be refreshed.
    this._signal = generateID();
  }

  focusTrigger(index)
  {

    this._currentIndex = index;
    
  }

  savePersonnel(tag) 
  {
    
    var varErrorDuplicate = "";
    var varErrorJobTerms = "";
    var varErrorCheckTalentManager = "";

    var varDuplicateValidation = [];

    var varI=0;//eliminate talent manager
    var varJ=0;//eliminate talent manager

    for (var i = 0; i <= this._Personnel.length - 1; ++i) {
      
      
      for (var j = 0; j <= this._Personnel.length - 1; ++j) {

        if(this._Personnel[j].GROUP_ORDER!==-1 && this._Personnel[i].GROUP_ORDER!==-1)
        {
          if (this._Personnel[j].PERSONNEL_NAME == this._Personnel[i].PERSONNEL_NAME &&
            this._Personnel[j].JOB_ID == this._Personnel[i].JOB_ID && i != j && varDuplicateValidation.find((all) => all == this._Personnel[j].PERSONNEL_NAME) == undefined && (this._Personnel[i].PERSONNEL_NAME == null ? "" : this._Personnel[i].PERSONNEL_NAME.trim()) != "") {

            varErrorDuplicate += "<br /><br />" + this._Personnel[j].PERSONNEL_NAME + "-" + this._Personnel[j].JOB_DESC + " Row(" + (varJ + 1) + ").";

          varDuplicateValidation.push(this._Personnel[j].PERSONNEL_NAME);
        }
        
      }

      if(this._Personnel[j].GROUP_ORDER!==-1)
      {
        ++varJ;
      }
      
    }

    if (this._Personnel[i].GROUP_ORDER !== -1) {
      ++varI;
    }
  }

    varI=0;//eliminate talent manager
    varJ=0;//eliminate talent manager

    for (var j = 0; j <= this._Personnel.length - 1; ++j) {

      if(this._Personnel[j].GROUP_ORDER!==-1)
        if (this._Personnel[j].JOB_ID === undefined || this._Personnel[j].JOB_ID == "" || this._Personnel[j].PYMNT_TERM_CD == "" || this._Personnel[j].PYMNT_TERM_CD === undefined || this._Personnel[j].JOB_ID === null || this._Personnel[j].PYMNT_TERM_CD === null)
        { 
          varErrorJobTerms += "<br /><br />" + "Row (" + (varJ + 1) + ").";
        }


        if(this._Personnel[j].GROUP_ORDER!==-1)
        {
          ++varJ;
        }
        
      }


      if (varErrorDuplicate != "") {
        toastr.error("<strong>Duplicate Personnel and Job</strong>" + varErrorDuplicate + "<br /><br />Saving cancelled.", "Problem occured");
      }

      if (varErrorJobTerms != "") {
        toastr.error("<strong>JOB/PAYMENT TERM not set</strong>" + varErrorJobTerms + "<br /><br />Saving cancelled.", "Problem occured");
      }


      if (varErrorDuplicate != "" || varErrorJobTerms!="" || varErrorCheckTalentManager!="") {
        return;
      }

      

      var getMax = EntityQuery().from('BDGT_TMPL_DTL').orderByDesc('BDGT_TMPL_DTL_ID').take(1);
      EntityManager().executeQuery(getMax).then((successMax) => {
        var getMax = 1;
        
        if (successMax.results.length > 0)
          getMax = successMax.results[0].BDGT_TMPL_DTL_ID + 1;

        var varIndex = 1;
        

        var getAllDtl = EntityQuery().from('BDGT_TMPL_DTL').where("BDGT_TMPL_ID", '==', this._cache_budget.HEADER.BDGT_TMPL_ID);
        EntityManager().executeQuery(getAllDtl).then((foundDtl) => {

          this._Personnel.forEach((item) => {
            if (item.BDGT_TMPL_DTL_ID === undefined) {
              item.BDGT_TMPL_DTL_ID_TMP = getMax;
              ++getMax;
            }
          });

          this._Personnel.forEach((item) => {
              if (item.TALENT_MANAGER !== undefined && item.BDGT_TMPL_DTL_ID_LINK_TMP !== undefined && item.BDGT_TMPL_DTL_ID_LINK_TMP !== 0) {

              if (item.TALENT_MANAGER.BDGT_TMPL_DTL_ID_TMP == undefined) {
                item.TALENT_MANAGER.BDGT_TMPL_DTL_ID_TMP = getMax;
                item.BDGT_TMPL_DTL_ID_LINK = getMax;
                item.TALENT_MANAGER.IsNewTalent = true;
                ++getMax;
              }


            }

          });



          this._Personnel.forEach((item) => {
           

            if (item.BDGT_TMPL_DTL_ID === undefined && item.GROUP_ORDER !== -1) {
              
              var varInsert = EntityManager().createEntity('BDGT_TMPL_DTL', {
                BDGT_TMPL_DTL_ID: item.BDGT_TMPL_DTL_ID_TMP,
                BDGT_TMPL_ID: this._cache_budget.HEADER.BDGT_TMPL_ID,
                JOB_ID: item.JOB_ID,
                GLOBAL_ID: item.GLOBAL_ID,
                CONTRACT_AMT: item.CONTRACT_AMT_TMP.replace(/,/g, ''),
                CATEGORY_ID: item.CATEGORY_ID,
                STAFF_WORK: (item.STAFF_WORK_TMP === undefined ? 0 : (item.STAFF_WORK_TMP == true ? 1 : 0)),
                PYMNT_TERM_CD: item.PYMNT_TERM_CD,
                PAY_TO_PERSON_FL: 'T',
                PAY_RATE_FACTOR: item.PAY_RATE_FACTOR_TMP.replace(/,/g, ''),
                BUDGET_AMT: item.INPUT_AMT_TMP.replace(/,/g, ''),
                TAPING_DAY_CNT: this._cache_budget.HEADER.TAPING_DAYS,
                PERSONNEL_CLASS_CD: (this.toPersonModel.USE != "STAFF" ? "Mainstay" : "Staff"),
                REMARKS: item.REMARKS,
                PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
                PERSONNEL_NAME: (item.BLANK_PERSONNEL_NAME !== undefined ? item.BLANK_PERSONNEL_NAME : item.PERSONNEL_NAME),
                CREATED_BY: this._cache_obj.USER.USER_ID,
                CREATED_DT: new Date(),
                LAST_UPDATED_BY: this._cache_obj.USER.USER_ID,
                LAST_UPDATED_DT: new Date(),
                INPUT_AMT: item.INPUT_AMT_TMP.replace(/,/g, ''),
                EPISODES: this._cache_budget.HEADER.EPISODES,
                CONFIDENTIAL: (item.CONFIDENTIAL_TMP === undefined ? 0 : (item.CONFIDENTIAL_TMP == true ? 1 : 0)),
                PER_TAPING_DAY_RATE: 0,
                PERSONNEL_CLASS_TYPE: this.getPersonnelClassType(),
                POOL_RECORD: (item.POOL_RECORD_TMP==null || item.POOL_RECORD_TMP==undefined?0:(item.POOL_RECORD_TMP == true ? 1 : 0)),
                GROUP_ORDER: varIndex,
                GLOBAL_ID_LINK: (item.TALENT_MANAGER !== undefined && item.TALENT_MANAGER !== null ? item.TALENT_MANAGER.GLOBAL_INDIV_ID : "NONE"),
                BDGT_TMPL_DTL_ID_LINK: (item.BDGT_TMPL_DTL_ID_LINK !== undefined && item.BDGT_TMPL_DTL_ID_LINK !== null? item.BDGT_TMPL_DTL_ID_LINK : 0),
                WITH_TALENT_MANAGER: (item.TALENT_MANAGER !== undefined && item.TALENT_MANAGER !== null ? '1' : '0')
              });
              

              EntityManager().addEntity(varInsert);

            //has talent manager
            if (item.TALENT_MANAGER !== undefined) {
              
              var varInsertTM = EntityManager().createEntity('BDGT_TMPL_DTL', {
                BDGT_TMPL_DTL_ID: item.TALENT_MANAGER.BDGT_TMPL_DTL_ID_TMP,
                BDGT_TMPL_ID: this._cache_budget.HEADER.BDGT_TMPL_ID,
                JOB_ID: item.TALENT_MANAGER.JOB_ID,
                GLOBAL_ID: item.TALENT_MANAGER.GLOBAL_INDIV_ID,
                CONTRACT_AMT: item.TALENT_MANAGER.CONTRACT_AMT_TMP.replace(/,/g, ''),
                CATEGORY_ID: item.TALENT_MANAGER.CATEGORY_ID,
                STAFF_WORK: 0,
                PYMNT_TERM_CD: item.PYMNT_TERM_CD,
                PAY_TO_PERSON_FL: 'T',
                PAY_RATE_FACTOR: item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP.replace(/,/g, ''),
                BUDGET_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                TAPING_DAY_CNT: this._cache_budget.HEADER.TAPING_DAYS,
                PERSONNEL_CLASS_CD: (this.toPersonModel.USE != "STAFF" ? "Mainstay" : "Staff"),
                REMARKS: item.TALENT_MANAGER.REMARKS,
                PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
                PERSONNEL_NAME: item.TALENT_MANAGER.PERSONNEL_NAME,
                CREATED_BY: this._cache_obj.USER.USER_ID,
                CREATED_DT: new Date(),
                LAST_UPDATED_BY: this._cache_obj.USER.USER_ID,
                LAST_UPDATED_DT: new Date(),
                INPUT_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                EPISODES: this._cache_budget.HEADER.EPISODES,
                CONFIDENTIAL: 0,
                PER_TAPING_DAY_RATE: 0,
                PERSONNEL_CLASS_TYPE: this.getPersonnelClassType(),
                POOL_RECORD: 0,
                GROUP_ORDER: -1,
                WITH_TALENT_MANAGER: '0',
                GLOBAL_ID_LINK: 'NONE',
                BDGT_TMPL_DTL_ID_LINK:0
              });

              EntityManager().addEntity(varInsertTM);
            }

          } else if (item.REMOVE == true) {
            
            if (item.TALENT_MANAGER !== undefined) {
              var varTalentMngrToDelete = foundDtl.results.find((allTm) => allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP);
              
              varTalentMngrToDelete.entityAspect.setDeleted();
            }
            
            var varTalentToDelete = foundDtl.results.find((allTm) => allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID);

            
            varTalentToDelete.entityAspect.setDeleted();
            // item.entityAspect.setDeleted();     
            

          } else {
           
            var varTalentToEdit = foundDtl.results.find((allTm) => allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID);

            varTalentToEdit.JOB_ID = item.JOB_ID;
            
            varTalentToEdit.GLOBAL_ID = item.GLOBAL_ID;
            varTalentToEdit.CONTRACT_AMT = item.CONTRACT_AMT_TMP.replace(/,/g, '');
            varTalentToEdit.CATEGORY_ID = item.CATEGORY_ID;
            varTalentToEdit.STAFF_WORK = (item.STAFF_WORK_TMP === undefined ? 0 : (item.STAFF_WORK_TMP == true ? 1 : 0));
            varTalentToEdit.PYMNT_TERM_CD = item.PYMNT_TERM_CD;
            varTalentToEdit.PAY_RATE_FACTOR = item.PAY_RATE_FACTOR_TMP.replace(/,/g, '');
            varTalentToEdit.BUDGET_AMT = item.INPUT_AMT_TMP.replace(/,/g, '');
            varTalentToEdit.TAPING_DAY_CNT = this._cache_budget.HEADER.TAPING_DAYS;
            varTalentToEdit.REMARKS = item.REMARKS;
            varTalentToEdit.PERSONNEL_INFO_SRC = item.PERSONNEL_INFO_SRC;
            varTalentToEdit.PERSONNEL_NAME = (item.BLANK_PERSONNEL_NAME !== undefined ? item.BLANK_PERSONNEL_NAME : item.PERSONNEL_NAME);
            varTalentToEdit.LAST_UPDATED_BY = this._cache_obj.USER.USER_ID;
            varTalentToEdit.LAST_UPDATED_DT = new Date();
            varTalentToEdit.INPUT_AMT = item.INPUT_AMT_TMP.replace(/,/g, '');
            varTalentToEdit.EPISODES = this._cache_budget.HEADER.EPISODES;
            varTalentToEdit.CONFIDENTIAL = (item.CONFIDENTIAL_TMP === undefined ? 0 : (item.CONFIDENTIAL_TMP == true ? 1 : 0));
            varTalentToEdit.POOL_RECORD = (item.POOL_RECORD_TMP==null || item.POOL_RECORD_TMP==undefined?0:(item.POOL_RECORD_TMP == true ? 1 : 0));

            if (varTalentToEdit.GROUP_ORDER !== -1)
              varTalentToEdit.GROUP_ORDER = varIndex;

            varTalentToEdit.GLOBAL_ID_LINK = (item.TALENT_MANAGER !== undefined && item.TALENT_MANAGER !== null ? item.TALENT_MANAGER.GLOBAL_INDIV_ID : "NONE");
            varTalentToEdit.BDGT_TMPL_DTL_ID_LINK = (item.BDGT_TMPL_DTL_ID_LINK !== undefined && item.BDGT_TMPL_DTL_ID_LINK !== null ? item.BDGT_TMPL_DTL_ID_LINK : 0);
            varTalentToEdit.WITH_TALENT_MANAGER = (item.TALENT_MANAGER !== undefined && item.TALENT_MANAGER!==null ? '1' : '0');


            if (item.TALENT_MANAGER !== undefined) {

             

                if (item.BDGT_TMPL_DTL_ID_LINK_TMP !== undefined && item.BDGT_TMPL_DTL_ID_LINK_TMP !== 0) {
                //check existing linked talent manager before saving check if not match
                var varCheckTalent = this._PersonnelTM.find((allTalent) => allTalent.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP);
                save
                if (varCheckTalent !== undefined) {

                    if (varCheckTalent.BDGT_TMPL_DTL_ID !== item.BDGT_TMPL_DTL_ID_LINK && item.BDGT_TMPL_DTL_ID_LINK != 0) {
                        
                    var varTalentMngrToEdit = foundDtl.results.find((allTm) => allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP);
                    
                    varTalentMngrToEdit.entityAspect.setDeleted();
                    // //varCheckTalent.entityAspect.setDeleted();
                    //   var varRemoveTalent = this._Personnel.find((allTalent) => allTalent.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP);
                    //   if (varRemoveTalent !== undefined) {
                    //     var getForDelete = EntityQuery().from('BDGT_TMPL_DTL').where("BDGT_TMPL_DTL_ID", '==', varRemoveTalent.BDGT_TMPL_DTL_ID);
                    //     EntityManager().executeQuery(getForDelete).then((found) => {
                    //       found.results[0].setDeleted();
                    //     });

                    //     // varRemoveTalent.entityAspect.setDeleted();      
                    //   }
                  } else {
                    var varTalentMngrToEdit = foundDtl.results.find((allTm) => allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP);
                    varTalentMngrToEdit.CONTRACT_AMT = item.TALENT_MANAGER.CONTRACT_AMT_TMP.replace(/,/g, '');
                    varTalentMngrToEdit.PAY_RATE_FACTOR = item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP.replace(/,/g, '');
                    varTalentMngrToEdit.INPUT_AMT = item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, '');
                    varTalentMngrToEdit.BUDGET_AMT = item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, '');
                    varTalentMngrToEdit.REMARKS = item.TALENT_MANAGER.REMARKS;

                  }

                }
              }

              if (item.TALENT_MANAGER.IsNewTalent) {
                //add new Talent Manager, existing Talent Manager should be remove before adding new
                var varInsertTM = EntityManager().createEntity('BDGT_TMPL_DTL', {
                  BDGT_TMPL_DTL_ID: item.TALENT_MANAGER.BDGT_TMPL_DTL_ID_TMP,
                  BDGT_TMPL_ID: this._cache_budget.HEADER.BDGT_TMPL_ID,
                  JOB_ID: item.TALENT_MANAGER.JOB_ID,
                  GLOBAL_ID: item.TALENT_MANAGER.GLOBAL_INDIV_ID,
                  CONTRACT_AMT: item.TALENT_MANAGER.CONTRACT_AMT_TMP.replace(/,/g, ''),
                  CATEGORY_ID: item.TALENT_MANAGER.CATEGORY_ID,
                  STAFF_WORK: 0,
                  PYMNT_TERM_CD: item.PYMNT_TERM_CD,
                  PAY_TO_PERSON_FL: 'T',
                  PAY_RATE_FACTOR: item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP.replace(/,/g, ''),
                  BUDGET_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                  TAPING_DAY_CNT: this._cache_budget.HEADER.TAPING_DAYS,
                  PERSONNEL_CLASS_CD: (this.toPersonModel.USE != "STAFF" ? "Mainstay" : "Staff"),
                  REMARKS: item.TALENT_MANAGER.REMARKS,
                  PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
                  PERSONNEL_NAME: item.TALENT_MANAGER.PERSONNEL_NAME,
                  CREATED_BY: this._cache_obj.USER.USER_ID,
                  CREATED_DT: new Date(),
                  LAST_UPDATED_BY: this._cache_obj.USER.USER_ID,
                  LAST_UPDATED_DT: new Date(),
                  INPUT_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                  EPISODES: this._cache_budget.HEADER.EPISODES,
                  CONFIDENTIAL: 0,
                  PER_TAPING_DAY_RATE: 0,
                  PERSONNEL_CLASS_TYPE: this.getPersonnelClassType(),
                  POOL_RECORD: 0,
                  GROUP_ORDER: -1,
                  WITH_TALENT_MANAGER:'0',
                  GLOBAL_ID_LINK: 'NONE',
                  BDGT_TMPL_DTL_ID_LINK:0,
                });
                EntityManager().addEntity(varInsertTM);
              }

            } else if (item.TALENT_MANAGER === undefined && item.BDGT_TMPL_DTL_ID_LINK_TMP !== undefined  && item.BDGT_TMPL_DTL_ID_LINK_TMP !== 0) {

              var varTalentMngrToDelete = foundDtl.results.find((allTm) => allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP);

              if (varTalentMngrToDelete !== undefined)
              {
                  consoole.log(item.BDGT_TMPL_DTL_ID);
                var varTalentToEdit = foundDtl.results.find((allTm) => allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID);
                varTalentMngrToDelete.entityAspect.setDeleted();

                varTalentToEdit.GLOBAL_ID_LINK = 'NONE';
                varTalentToEdit.BDGT_TMPL_DTL_ID_LINK = 0;
                varTalentToEdit.WITH_TALENT_MANAGER = '0';

              }
              
            }

          }

          ++varIndex;

        });

EntityManager().saveChanges().then((success) => {
  this.fnCheckBudget(this._cache_budget.HEADER.BDGT_TMPL_ID);
  toastr.success("Succesfully Saved", this.toPersonModel.USE);

  if(tag==1)
    this.fnSequenceDispatch();

}, (fail) => {

  EntityManager().getEntities().forEach(function(entity) {
    var errors = entity.entityAspect.getValidationErrors();
    if (errors.length > 0)
      console.log(errors);
  });
  console.log(fail);
  toastr.error("Error Occured",
    fail);

  if(tag==1)
    this.fnSequenceDispatch();
  

});


      }); //foundDtl






    });//max dtl

}

fnSequenceDispatch()
{

  if (this.toPersonModel.USE == "REGULAR")
  {

    this._cache_budget.OBSERVERS.copy_template.forEach((all)=>{
      all('SEMI_REGULAR');
    });

  }
  else if (this.toPersonModel.USE == "SEMI_REGULAR")
  {

    this._cache_budget.OBSERVERS.copy_template.forEach((all)=>{
      all('STAFF');
    });

  }
  else if (this.toPersonModel.USE == "STAFF")
  {

    this._cache_budget.OBSERVERS.copy_template_guest.forEach((all)=>{
     all();
   }); 

  }


  
}

getPersonnelClassType()
{
  if(this.toPersonModel.USE=='REGULAR')
  {
    return 'Regular';
  }
  else if(this.toPersonModel.USE=='SEMI_REGULAR')
  {
    return 'Semi-Regular';
  }
  else
    return 'Staff'; 
}

fnRegularBlurEvt(item, property, index, BDGT_TMPL_DTL_ID)
{


 if (property == "TERM") {
  if($("input[tableTermIndex*='" + index + "']").val()===undefined) return;
  this._Personnel[index].PAYMENT_TERM = $("input[tableTermIndex*='" + index + "']").val().toUpperCase();

  var varPaymentTerm=this._Personnel[index].PAYMENT_TERM.trim();
  var varFound = this._PYMNTTERM.find((all) => {
    return varPaymentTerm == all.REF_DESC.trim();
  });


  if (varFound !== undefined) {
    this._Personnel[index].PYMNT_TERM_CD = varFound.REF_CD;
  } else
  this._Personnel[index].PYMNT_TERM_CD = "";


}

}

fnBlankPersonnelRegular()
{
  
  this.getDefaultPymntTerm();

  this._Personnel.push({visible:true,PAY_RATE_FACTOR_TMP: numeral(1).format('0,0.00'),
    CONTRACT_AMT_TMP: numeral(0).format('0,0.00'),
    INPUT_AMT_TMP: numeral(0).format('0,0.00'),
    PYMNT_TERM_CD: this.varPymnt.REF_CD,
    PAYMENT_TERM: this.varPymnt.REF_DESC
  });

  var varBudgetLast = this._Personnel[this._Personnel.length - 1];
  varBudgetLast.ce_value = "+";
  varBudgetLast.styleString = this.styleStringHidden;

    // setTimeout(()=>{this.fnReloadTypeahead();},500);
    
    this._signal = generateID();

    this._cache_budget.OBSERVERS.reset_summary.forEach((all)=>{
      all();
    });

    //this._cache_budget.CALLER.ACTION='reset.summary';

    //this._dispatcher.dispatch('reset.summary');
  }

  chkRemove(item)
  {
    if(item.REMOVE)
    {
      item.REMOVE=false;
    }
    else
    {
      item.REMOVE=true;
    }
  }

  removeRegular(index) 
  {
   
    var varRemoved = this._Personnel.splice(index, 1);
    this._signal = generateID();
    //this._cache_budget.CALLER.ACTION='reset.summary';
    this._cache_budget.OBSERVERS.reset_summary.forEach((all)=>{
      all();
    });
    //this._dispatcher.dispatch('reset.summary');
  }

  fnIndivMstrTalents(){
    this.dialogService.open({
      viewModel: globalindivmstr, model: {allPersonnel:false}
    }).whenClosed(response => {
      
      if (!response.wasCancelled) {
        
      } else {
        
      }
    });
  }

  fnIndivMstr()
  {
    this.dialogService.open({
      viewModel: indivmstr, model: {allPersonnel:false}
    }).whenClosed(response => {
      
      if (!response.wasCancelled) {
        this.PassedIndiv(response.output);
      } else {
        
      }
    });
  }

  fnModalJob()
  {
    this.dialogService.open({
      viewModel: job
    }).whenClosed(response => {
      
      if (!response.wasCancelled) {
        this.passJob(response.output);
      } else {
        
      }
    });
  }


  fnModalPaymentTerm()
  {
    this.dialogService.open({
      viewModel: paymentterm
    }).whenClosed(response => {
      
      if (!response.wasCancelled) {
        this.passTerm(response.output);
      } else {
        
      }
    });
  }


  passTerm(term) 
  {

    var index = this._Index;
    
    this._Personnel[index].PYMNT_TERM_CD = term.REF_CD;
    this._Personnel[index].PAYMENT_TERM = term.REF_DESC;
    
  }

  fnIndivMstrManager()
  {
   this.dialogService.open({
    viewModel: globalindivmstr, model: {allPersonnel:false}
   }).whenClosed(response => {
    
    if (!response.wasCancelled) {
      this.fnPassedPersonnels(response.output);
    } else {
      
    }
  });
}
}