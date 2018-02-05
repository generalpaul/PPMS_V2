import {bindable,inject} from 'aurelia-framework';
import { cache_budget } from 'ppfcs/cache_budget';
import { EntityManager, EntityQuery, generateID } from 'entity-manager-factory';
//import {handle, Dispatcher} from 'aurelia-flux';  
import { getLookups } from 'masterfiles';
import {  substringMatcher } from 'helpers';
import typeahead from 'typeahead';
import settings from 'settings';
import _ from 'underscore';
import numeral from 'numeral';
import toastr from "toastr";
import { MultiObserver }from 'multi-observer';
import { paymentterm } from '../../modals/paymentterm';
import {DialogService} from 'aurelia-dialog';
import { cache_obj } from 'cache_obj';

@inject(cache_obj,cache_budget,MultiObserver,DialogService)
export class GuestCustomElement {

  @bindable to;
  _cache_budget = null;
  //_dispatcher;
  _enableAdd=false;
  _enableRemove=false;
  _signal;
  _PYMNTTERM;
  dialogService = null;
  _cache_obj = null;
  constructor(cache_obj, cache_budget, multiObserver, dialogService) {
      if (EntityManager() === undefined) {
          return;
      }

    this._cache_budget = cache_budget;
    this.dialogService=dialogService;
    this._cache_obj = cache_obj;
    
    this._cache_obj.OBSERVERS.budget_dialog.push((val) => {
      this.fnCheckBudget(val);
    });

    this._cache_budget.OBSERVERS.copy_template_guest.push(() => {
      this.fnCallCopyGuest();
    });

    this._cache_budget.OBSERVERS.reset_all.push(() => {
      this.resetView();
    });

    this._PYMNTTERM = getLookups().PAYMENT_TERM;

  }
  

  fnModalPaymentTerm(){
    this.dialogService.open({
      viewModel: paymentterm
    }).whenClosed(response => {
      
      if (!response.wasCancelled) {
        this.passTerm(response.output);
      } else {
        
      }
    });
  }


  passTerm(term) {
      this._cache_budget.GUEST[0].PAYMENT_TERM=term.REF_DESC
      this._cache_budget.GUEST[0].PYMNT_TERM_CD = term.REF_CD;
  }

  
  //LoginPassed() {
  //  this._PYMNTTERM = getLookups().PAYMENT_TERM;
  //}

  //@handle('budget.dialog')
  fnCheckBudget(value) {

    var _query = EntityQuery().from('BDGT_TMPL_GUEST_DTL').where('BDGT_TMPL_ID', '==', value);
    EntityManager().executeQuery(_query).then((found) => {
      
        this._cache_budget.GUEST = found.results;
      
      var varRefCd = [];

      _.each(this._cache_budget.GUEST, (item) => {

        for (var i = 0; i <= this._PYMNTTERM.length - 1; ++i) {
          if (this._PYMNTTERM[i].REF_CD == item.PYMNT_TERM_CD) {
            item.PAYMENT_TERM = this._PYMNTTERM[i].REF_DESC;
            break;
          }
        };

        
        item.PAY_RATE_FACTOR_TMP=numeral(item.PAY_RATE_FACTOR).format('0,0.00');
        item.INPUT_AMT_TMP=numeral(item.INPUT_AMT).format('0,0.00');
        item.visible=true;
      });

      this._enableAdd=false;
      this._enableRemove=false;

      if (this._cache_budget.GUEST.length==0)
        this._enableAdd=true;
      else
        this._enableRemove=true;        


      // this.fnReloadTypeahead();

      //this._cache_budget.CALLER.ACTION='reset.summary';

      this._cache_budget.OBSERVERS.reset_summary.forEach((all) => {
        all();
      });

      if (this._cache_budget.GUEST.length>0)
        toastr.success("GUEST PERSONNEL", "Loading Successful.");
      //this._dispatcher.dispatch('reset.summary');

       this._cache_budget.OBSERVERS.loaded_results.push('GUEST');
       this._cache_budget.OBSERVERS.budget_loaded.forEach((all) => {
            all(true);
          });
    });

  }

 //@handle('copy.template')
 fnCallCopyGuest()
 {
   // console.log('passed');
  //if (use=="GUEST") {
    this.saveGuest(1);
  //}
}



  // //CREATE typeahead on focus instead...........!!!!!!!!!!!!
  // fnReloadTypeahead() {

  //   $('.pymnttrmclass').typeahead('destroy');

  //   var varCnt = 0;

  //   _.each($(this.tblData).find(".pymnttrmclass"), (all) => {

  //     $(all).attr("tableTermIndex", varCnt);
  //     ++varCnt;
  //   });


  //   $("input[tableTermIndex*='" + 0 + "']")
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

  // }

  fnAddGuest(){
      if (this._cache_budget.GUEST.length>0)
    {
          this._cache_budget.GUEST[0].visible=true;  
    }
    else
          this._cache_budget.GUEST.push({INPUT_AMT_TMP:numeral(0).format('0,0.00'),PAY_RATE_FACTOR_TMP:numeral(1).format('0,0.00'),
        INPUT_AMT:0,PAY_RATE_FACTOR:1,visible:true});

      //delayed bec breeze is still processing
      // setTimeout(()=>{
      //   this.fnReloadTypeahead();
      // },200);
      

      this._enableAdd=false;
      this._enableRemove=true;
      this._signal = generateID();
    }

    
  //@handle('reset.all')
  resetView() {
    this._signal = generateID();
  }
  
  fnRemoveGuest() {
      if (this._cache_budget.GUEST.length > 0) {
          this._cache_budget.GUEST[0].visible = false;
    }

    this._enableAdd = true;
    this._enableRemove = false;
    this._signal = generateID();
  }

  saveGuest(tag){


    if (this._cache_budget.GUEST.length > 0) {
          if (this._cache_budget.GUEST[0].PYMNT_TERM_CD == "" || this._cache_budget.GUEST[0] == undefined || this._cache_budget.GUEST[0] == null) {
        toastr.error("<strong>Payment Term not defined</strong><br /><br />Saving cancelled.", "Problem occured");
        return;
      }
    }


    var getMax = EntityQuery().from('BDGT_TMPL_GUEST_DTL').orderByDesc('BDGT_TMPL_GUEST_DTL_ID').take(1);
    EntityManager().executeQuery(getMax).then((successMax) => {
      var getMax = 1;

      if (successMax.results.length > 0)
        getMax = successMax.results[0].BDGT_TMPL_GUEST_DTL_ID + 1;


      var _query = EntityQuery().from('BDGT_TMPL_GUEST_DTL').where('BDGT_TMPL_ID', '==', this._cache_budget.HEADER.BDGT_TMPL_ID);
      EntityManager().executeQuery(_query).then((found) => {

        
          if (this._cache_budget.GUEST.length>0)
              if (this._cache_budget.GUEST[0].visible) {

            if (found.results.length > 0) {

                found.results[0].BDGT_AMT = parseFloat(this._cache_budget.GUEST[0].INPUT_AMT_TMP.replace(/,/g,''));
                found.results[0].PYMNT_TERM_CD = this._cache_budget.GUEST[0].PYMNT_TERM_CD;
                found.results[0].INPUT_AMT = parseFloat(this._cache_budget.GUEST[0].INPUT_AMT_TMP.replace(/,/g,''));
                found.results[0].PAY_RATE_FACTOR = parseFloat(this._cache_budget.GUEST[0].PAY_RATE_FACTOR_TMP.replace(/,/g,''));
                found.results[0].REMARKS = this._cache_budget.GUEST[0].REMARKS;
                
                found.results[0].LAST_UPDATED_BY = this._cache_obj.USER.USER_ID;
                found.results[0].LAST_UPDATED_DT =  new Date();

              
            } else {

              var varInsert = EntityManager().createEntity('BDGT_TMPL_GUEST_DTL', {
                BDGT_TMPL_GUEST_DTL_ID: getMax,
                PYMNT_TERM_CD: this._cache_budget.GUEST[0].PYMNT_TERM_CD,
                INPUT_AMT: parseFloat(this._cache_budget.GUEST[0].INPUT_AMT_TMP.replace(/,/g,'')),
                BDGT_AMT: parseFloat(this._cache_budget.GUEST[0].INPUT_AMT_TMP.replace(/,/g,'')),
                PAY_RATE_FACTOR: parseFloat(this._cache_budget.GUEST[0].PAY_RATE_FACTOR_TMP.replace(/,/g,'')),
                REMARKS: this._cache_budget.GUEST[0].REMARKS,
                BDGT_TMPL_ID: this._cache_budget.HEADER.BDGT_TMPL_ID,
                CREATED_BY: this._cache_obj.USER.USER_ID,
                CREATED_DT: new Date(),
                LAST_UPDATED_BY: this._cache_obj.USER.USER_ID,
                LAST_UPDATED_DT: new Date()
              });
              
              EntityManager().addEntity(varInsert);

            }
          }
          else
          {
            if (found.results.length > 0)
              found.results[0].entityAspect.setDeleted();

          }


          EntityManager().saveChanges().then((success) => {
            this.fnCheckBudget(this._cache_budget.HEADER.BDGT_TMPL_ID);
            toastr.success("Succesfully Saved", "GUEST");
            
            if(tag==1) { this.fnVerifyCopyOfBudget(); }

          }, (fail) => {

            EntityManager().getEntities().forEach(function(entity) {
              var errors = entity.entityAspect.getValidationErrors();
              if (errors.length > 0)
                console.log(errors);
            });
            
            toastr.error("Error Occured",
              fail);

              if(tag==1) { this.fnVerifyCopyOfBudget(); }

          });

        });


    });

  }

  fnVerifyCopyOfBudget()
  {
       this._cache_budget.OBSERVERS.verify_copied_budget.forEach((all)=>{
                 all();
       });  
  }

  fnRegularBlurEvt(item, index) {

    // if($("input[tableTermIndex*='" + index + "']").val()===undefined) return;


    // this._cache_budget.GUEST[index].PAYMENT_TERM = $("input[tableTermIndex*='" + index + "']").val().toUpperCase();

    //   var varFound = this._PYMNTTERM.find((all) => {
    //     return this._cache_budget.GUEST[index].PAYMENT_TERM.trim() == all.REF_DESC.trim();
    //   });

    //   if (varFound !== undefined) {
    //     this._cache_budget.GUEST[index].PYMNT_TERM_CD = varFound.REF_CD;
    //   } else
    //     this._cache_budget.GUEST[index].PYMNT_TERM_CD = "";

  }

  fnRegularFocus(index, prop) {

    this.fnModalPaymentTerm();
    
  }


  // fnRegularFocus(index) {

  //   // if ($("input[tableTermIndex*='" + index + "']").attr("hasTypeahead") !== undefined) {
  //   //   return;
  //   // }

  //   // $("input[tableTermIndex*='" + index + "']").attr("hasTypeahead", "true");

  //   $("input[tableTermIndex*='" + index + "']").focus();

  // }

  AmountBlur(item, property) {
    var varConverted = numeral(item[property]).format('0,0.00');
    item[property] = varConverted;
  }

}