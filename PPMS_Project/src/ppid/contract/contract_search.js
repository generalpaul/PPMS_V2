import {getLookups} from 'masterfiles';
import {MultiObserver} from 'multi-observer';
import {inject, ObserverLocator,bindable} from 'aurelia-framework';
import {getFilter} from 'helpers';
import _ from 'underscore';
import $ from 'jquery';
//import {Dispatcher, handle} from 'aurelia-flux';
import {EntityManager, EntityQuery} from 'entity-manager-factory';
import toastr from "toastr";
import {cache_obj} from 'cache_obj';
import { DialogController } from 'aurelia-dialog';
import breeze from 'breeze-client';
import { cache_contract } from 'ppid/contract/cache_contract';

@inject(cache_contract, MultiObserver,ObserverLocator,Element,cache_obj,DialogController)

export class contract_search {
  //items = [];
	observerLocator = null;
	pageindex=0;
	varFilterArrayLength=0;
	varFilterArray = [];
	currPredicate=null;
	_cache_obj;
	_cache_contract;
	lstPredicates=[];
	controller=null;
  varGlobaIndivWithNps=[];

  constructor(cache_contract, multiObserver,observerLocator,Element,cache_obj,controller) {
    this.controller=controller;
		//this._dispatcher=Dispatcher;
		this._cache_obj=cache_obj;
		this.observerLocator=observerLocator;
		this._cache_contract= cache_contract;

		var personnel;

		if (this._cache_obj.USER.LEVEL_NO==3)
		{
			personnel = getLookups().GLOBAL_INDIV_WITH_ALIAS;
		}
		else {
			personnel = getLookups().GLOBAL_INDIV_MSTR;
		}

    var getContractList = EntityQuery().from('NPS_CONTRACT_HDR_TRX').where('LEVEL_NO','==', this._cache_obj.USER.LEVEL_NO);
    EntityManager().executeQuery(getContractList).then((success) => {
			success.results.forEach((result) =>{
				var varCheck = personnel.find((all)=>all.GLOBAL_INDIV_ID==result.GLOBAL_ID);
				if (varCheck !== undefined)
	      {
					var contract = result;
					this.varGlobaIndivWithNps.push({
						CONTRACT_HDR_ID: contract.CONTRACT_HDR_ID,
						GLOBAL_ID: contract.GLOBAL_ID,
						LAST_NAME: varCheck.LAST_NAME,
						GIVEN_NAME: varCheck.GIVEN_NAME,
						MIDDLE_NAME: varCheck.MIDDLE_NAME,
						CONTRACT_STATUS: contract.CONTRACT_STATUS
					});
	      }
			});
    });

    multiObserver.observe(
			[
			[this, '_bGLOBAL_ID'],
			[this, '_bLAST_NAME'],
			[this, '_bGIVEN_NAME'],
			[this, '_bMIDDLE_NAME'],
      [this, '_bCONTRACT_STATUS']
			], (newValue, oldValue) => this.onSpeculateProp(newValue, oldValue));
  }

  fnManualFilter(tmpVar)
  {
    this.lstPredicates=[];

    _.each(this._rCONTRACT_TITLE.querySelectorAll('input'), all => {
      var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));


      if(varOb.getValue()!=undefined && varOb.getValue()!=null && varOb.getValue()!="" && varOb.getValue()!="undefined")
        if(tmpVar.length>0)
        {
          tmpVar = getFilter(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
        }
      });

    return tmpVar;
  }


  onSpeculateProp(newValue, oldValue) {

    var varValuesHasChanged=false;
    //check if inputs has value else return;
    _.each(this._rCONTRACT_TITLE.querySelectorAll('input'), all => {
      var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));

      if(varOb.getValue()!='' && varOb.getValue()!==undefined)
      {
        varValuesHasChanged=true;
      }
    });

    if(!varValuesHasChanged) return;

    if(this.varFilterArray.length==0)
    {
	   	_.each(this.varGlobaIndivWithNps, (all) => {
      	this.varFilterArray.push({
					CONTRACT_HDR_ID: all.CONTRACT_HDR_ID,
          GLOBAL_ID: all.GLOBAL_ID,
          LAST_NAME: all.LAST_NAME,
          GIVEN_NAME: all.GIVEN_NAME,
          MIDDLE_NAME: all.MIDDLE_NAME,
          CONTRACT_STATUS: all.CONTRACT_STATUS
        });
      });
    }
    var tmpVar = this.fnManualFilter(this.varFilterArray);


    //if has existing results, use it, else, query to server
    if(tmpVar.length>0)
    {
      var tmpVarNew=_.sortBy(tmpVar, 'LAST_NAME','GIVEN_NAME', 'MIDDLE_NAME'); //.reverse();
      this.varFilterArray = tmpVarNew;
      this.varFilterArrayLength=this.varFilterArray.length;
      return;
    }
    else {
        this.varFilterArray=[];
    }
  }

  selectedContract(item) {
		this._cache_obj.OBSERVERS.contract_dialog.forEach((all)=>{
			all(item.CONTRACT_HDR_ID);
		});

    this.controller.ok();
  }

  fnKeyup(evt,item){
		if(evt.keyCode==13){
			if(this.varFilterArray.length==1)
			{
				this.selectedContract(this.varFilterArray[0]);
			}
		}
	}
}
