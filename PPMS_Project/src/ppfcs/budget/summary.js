import {bindable,inject} from 'aurelia-framework';
import { cache_obj } from 'cache_obj';
import { cache_budget } from 'ppfcs/cache_budget';
import {EntityManager,EntityQuery} from 'entity-manager-factory';
import {generateID} from 'entity-manager-factory';
//import {handle, Dispatcher} from 'aurelia-flux';  
import {getLookups} from 'masterfiles';
import {  substringMatcher } from 'helpers';
import typeahead from 'typeahead';
import settings from 'settings';
import _ from 'underscore';
import numeral from 'numeral';
import toastr from "toastr";
import {  MultiObserver }from 'multi-observer';

@inject(cache_obj,cache_budget,MultiObserver)
export class SummaryCustomElement {

  @bindable to;
  _cache_obj = null;
  //_dispatcher;
  _enableAdd=false;
  _enableRemove=false;
  _signal;
  _PYMNTTERM;
  _multiObserver;
  _INPUT_AMT_MAINSTAY=0;
  _INPUT_AMT_STAFF=0;
  _INPUT_AMT_GUEST=0;
  _INPUT_AMT_TOTAL=0;
  varObserveSubscriptions=[];
  _cache_budget = null;
  constructor(cache_obj, cache_budget, multiObserver) {
    this._cache_obj = cache_obj;
    this._cache_budget = cache_budget;
    this._multiObserver=multiObserver;

    this._cache_obj.OBSERVERS.budget_dialog.push((val) => {
      this.fnCheckSummary(val);
    });

    this._cache_budget.OBSERVERS.reset_summary.push(() => {
      this.fnResetSummarySubscription();
    });

  }

  fnCheckAll(){

    this._INPUT_AMT_MAINSTAY=0;
    this._INPUT_AMT_TOTAL=0;
    this._cache_budget._INPUT_AMT_REGULAR=0;
    this._cache_budget._INPUT_AMT_SEMI_REGULAR=0;

    this._cache_budget.REGULAR.forEach((all)=>{

      if (this._cache_obj.ALLOW_PASS_CONFIDENTIAL || !all.CONFIDENTIAL_TMP) {
        if (all.GROUP_ORDER !== -1)
          if (all.INPUT_AMT_TMP != "" && all.INPUT_AMT_TMP != null && all.INPUT_AMT_TMP != undefined) {
            this._INPUT_AMT_MAINSTAY += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
            
          }

          if (all.TALENT_MANAGER) {
            if (all.TALENT_MANAGER.INPUT_AMT_TMP != "" && all.TALENT_MANAGER.INPUT_AMT_TMP != null && all.TALENT_MANAGER.INPUT_AMT_TMP != undefined) {
              this._INPUT_AMT_MAINSTAY += parseFloat(all.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''));

            }            
          }
        }
      });

    this._cache_budget._INPUT_AMT_REGULAR = numeral(this._INPUT_AMT_MAINSTAY).format('0,0.00');

    this._cache_budget.SEMI_REGULAR.forEach((all)=>{

      if (all.INPUT_AMT_TMP != "" && all.INPUT_AMT_TMP != null && all.INPUT_AMT_TMP != undefined) {
        if (all.GROUP_ORDER !== -1) {
          if (this._cache_obj.ALLOW_PASS_CONFIDENTIAL || !all.CONFIDENTIAL_TMP)
            this._INPUT_AMT_MAINSTAY += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
          this._cache_budget._INPUT_AMT_SEMI_REGULAR+=parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
        }

        if (all.TALENT_MANAGER) {
          if (all.TALENT_MANAGER.INPUT_AMT_TMP != "" && all.TALENT_MANAGER.INPUT_AMT_TMP != null && all.TALENT_MANAGER.INPUT_AMT_TMP != undefined) {
            this._INPUT_AMT_MAINSTAY += parseFloat(all.TALENT_MANAGER.INPUT_AMT_TMP .replace(/,/g, ''));
            this._cache_budget._INPUT_AMT_SEMI_REGULAR+=parseFloat(all.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''));
          }            
        }

      }

    });
    
    this._INPUT_AMT_TOTAL=this._INPUT_AMT_MAINSTAY;
    this._INPUT_AMT_MAINSTAY=numeral(this._INPUT_AMT_MAINSTAY).format('0,0.00');

    this._cache_budget._INPUT_AMT_SEMI_REGULAR=numeral(this._cache_budget._INPUT_AMT_SEMI_REGULAR).format('0,0.00');

    this._INPUT_AMT_STAFF=0;
    this._cache_budget._INPUT_AMT_STAFF=0; 

    this._cache_budget.STAFF.forEach((all)=>{

      if (all.INPUT_AMT_TMP != "" && all.INPUT_AMT_TMP != null && all.INPUT_AMT_TMP != undefined)
      {

        if (all.GROUP_ORDER !== -1)
        {

          if (this._cache_obj.ALLOW_PASS_CONFIDENTIAL || !all.CONFIDENTIAL_TMP)
            this._INPUT_AMT_STAFF += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
        }

        if (all.TALENT_MANAGER) 
        {

          if (all.TALENT_MANAGER.INPUT_AMT_TMP != "" && all.TALENT_MANAGER.INPUT_AMT_TMP != null && all.TALENT_MANAGER.INPUT_AMT_TMP != undefined) {
            this._INPUT_AMT_STAFF += parseFloat(all.TALENT_MANAGER.INPUT_AMT_TMP .replace(/,/g, ''));
          }          

        }

      }

    });

    

    this._INPUT_AMT_TOTAL+=this._INPUT_AMT_STAFF;
    this._INPUT_AMT_STAFF=numeral(this._INPUT_AMT_STAFF).format('0,0.00');
    this._cache_budget._INPUT_AMT_STAFF=this._INPUT_AMT_STAFF;

    this._INPUT_AMT_GUEST=0;
    this._cache_budget.GUEST.forEach((all) => 
    {
        if(all.INPUT_AMT_TMP!="" && all.INPUT_AMT_TMP!=null && all.INPUT_AMT_TMP!=undefined)
           this._INPUT_AMT_GUEST += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, '')) * all.PAY_RATE_FACTOR;

   });

    

    this._INPUT_AMT_TOTAL+=this._INPUT_AMT_GUEST;
    this._INPUT_AMT_GUEST=numeral(this._INPUT_AMT_GUEST).format('0,0.00');
    this._cache_budget._INPUT_AMT_GUEST=numeral(this._INPUT_AMT_GUEST).format('0,0.00');

    this._INPUT_AMT_TOTAL=numeral(this._INPUT_AMT_TOTAL).format('0,0.00');    

    this._cache_budget.TOTAL = this._INPUT_AMT_TOTAL;
    
   

    if(this._cache_budget._LOADING_BUDGET==1 && this._cache_budget.TOTAL!=0)
    {
      this._cache_budget_LOADING_BUDGET=0;
      // this._cache_budget.OBSERVERS.budget_loaded.forEach((all)=>{
      //   all();
      // });
    }
    
  }

  //@handle('budget.dialog')
  fnCheckSummary(value) {

    setTimeout(() => 
    {

                      //REGULAR
                      for (var name in this._cache_budget.REGULAR) 
                      {

                       var varSubscription = this._multiObserver.observe(
                        [
                        [this._cache_budget.REGULAR[name], 'INPUT_AMT_TMP']
                            // [this._cache_budget.REGULAR[name], 'PAY_RATE_FACTOR_TMP'],
                            // [this._cache_budget.REGULAR[name], 'CONTRACT_AMT_TMP']
                            ], (newValue, oldValue) => {

                              this.fnCheckAll();

                            });

                       this.varObserveSubscriptions.push(varSubscription);

                       if(this._cache_budget.REGULAR[name].TALENT_MANAGER!==undefined)
                       {
                            //[this._cache_budget.REGULAR[name].TALENT_MANAGER, 'INPUT_AMT_TMP']

                            var varSubscriptionTM = this._multiObserver.observe(
                              [
                              [this._cache_budget.REGULAR[name].TALENT_MANAGER, 'INPUT_AMT_TMP']
                                    // [this._cache_budget.REGULAR[name], 'PAY_RATE_FACTOR_TMP'],
                                    // [this._cache_budget.REGULAR[name], 'CONTRACT_AMT_TMP']


                                    ], (newValue, oldValue) => {

                                      this.fnCheckAll();

                                    });

                            this.varObserveSubscriptions.push(varSubscriptionTM);

                          }

                        }


                      //SEMI-REGULAR
                      for (var name in this._cache_budget.SEMI_REGULAR)
                      {

                        var varSubscription = this._multiObserver.observe(
                          [
                          [this._cache_budget.SEMI_REGULAR[name], 'INPUT_AMT_TMP'],
                            //[this._cache_budget.SEMI_REGULAR[name].TALENT_MANAGER, 'INPUT_AMT_TMP']
                            // [this._cache_budget.SEMI_REGULAR[name], 'PAY_RATE_FACTOR_TMP'],
                            // [this._cache_budget.SEMI_REGULAR[name], 'CONTRACT_AMT_TMP']


                            ], (newValue, oldValue) =>
                            {

                              this.fnCheckAll();

                            });

                        this.varObserveSubscriptions.push(varSubscription);

                        if(this._cache_budget.SEMI_REGULAR[name].TALENT_MANAGER!==undefined)
                        {
                              //[this._cache_budget.REGULAR[name].TALENT_MANAGER, 'INPUT_AMT_TMP']

                              var varSubscriptionTM = this._multiObserver.observe(
                                [
                                [this._cache_budget.SEMI_REGULAR[name].TALENT_MANAGER, 'INPUT_AMT_TMP']
                                      // [this._cache_budget.REGULAR[name], 'PAY_RATE_FACTOR_TMP'],
                                      // [this._cache_budget.REGULAR[name], 'CONTRACT_AMT_TMP']


                                      ], (newValue, oldValue) => {

                                        this.fnCheckAll();

                                      });

                              this.varObserveSubscriptions.push(varSubscriptionTM);

                            }
                          }


                    //STAFF
                    for (var name in this._cache_budget.STAFF) 
                    {

                      var varSubscription = this._multiObserver.observe(
                        [
                        [this._cache_budget.STAFF[name], 'INPUT_AMT_TMP'],
                          //[this._cache_budget.STAFF[name].TALENT_MANAGER, 'INPUT_AMT_TMP']
                          // [this._cache_budget.STAFF[name], 'PAY_RATE_FACTOR_TMP'],
                          // [this._cache_budget.STAFF[name], 'CONTRACT_AMT_TMP']


                          ], (newValue, oldValue) => {



                            this.fnCheckAll();

                          });

                      this.varObserveSubscriptions.push(varSubscription);

                      if (this._cache_budget.STAFF[name].TALENT_MANAGER!==undefined) 
                      {
                        //[this._cache_budget.REGULAR[name].TALENT_MANAGER, 'INPUT_AMT_TMP']

                        var varSubscriptionTM = this._multiObserver.observe(
                          [
                          [this._cache_budget.STAFF[name].TALENT_MANAGER, 'INPUT_AMT_TMP']
                            // [this._cache_budget.REGULAR[name], 'PAY_RATE_FACTOR_TMP'],
                            // [this._cache_budget.REGULAR[name], 'CONTRACT_AMT_TMP']


                            ], (newValue, oldValue) => {



                              this.fnCheckAll();

                            });

                        this.varObserveSubscriptions.push(varSubscriptionTM);

                      }

                    }


                  //GUEST
                  for (var name in this._cache_budget.GUEST)
                  {

                    var varSubscription = this._multiObserver.observe(
                      [
                      [this._cache_budget.GUEST[name], 'INPUT_AMT_TMP']
                        // [this._cache_budget.GUEST[name], 'PAY_RATE_FACTOR_TMP']

                        ], (newValue, oldValue) => {


                          this.fnCheckAll();

                        });

                    this.varObserveSubscriptions.push(varSubscription);

                  }

                  this.fnCheckAll();

                }

                , 6000);

}

  //@handle('reset.summary')
  fnResetSummarySubscription()
  {

    this.varObserveSubscriptions.forEach((toDispose) => {
      toDispose();
    });

    while (this.varObserveSubscriptions.length > 0) {
     this.varObserveSubscriptions.pop();
   }

   this.fnCheckSummary();
 }
 
}