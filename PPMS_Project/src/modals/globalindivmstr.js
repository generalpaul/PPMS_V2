import {getLookups} from '../masterfiles';
import {MultiObserver} from 'multi-observer';
import {inject, ObserverLocator,bindable} from 'aurelia-framework';
import {getFilter} from '../helpers';
import _ from 'underscore';
import $ from 'jquery';
//import {Dispatcher, handle} from 'aurelia-flux';
import {EntityManager, EntityQuery} from '../entity-manager-factory';
import toastr from "toastr";
import {ModalWizard} from 'modals/modal-wizard';
import {cache_obj} from 'cache_obj';
import {DialogController} from 'aurelia-dialog';
import breeze from 'breeze-client';


@inject(MultiObserver, ObserverLocator, Element, ModalWizard, cache_obj, DialogController)
export class globalindivmstr {
	items = [];
	observerLocator = null;
	pageindex=0;
	varFilterArray = [];
	varFilterArraySelected=[];
	varFilterArrayLength=0;
	_ModalWizard;
	_cache_obj;
	controller=null;
	varActiveFromCompanyMstr=[];
	constructor(multiObserver, observerLocator, Element, ModalWizard, cache_obj,controller) {
		this.controller=controller;

		this._ModalWizard=ModalWizard;
		this._cache_obj=cache_obj;

		toastr.info("Personnel Data...", "Loading..");
		this.varActiveFromCompanyMstr = _.filter(getLookups().GLOBAL_COMPANY_MSTR,(all)=>all.STATUS_CD!='ACTV').map((val)=>{return val.GLOBAL_ID});

		toastr.success("Start Search...", "Loading Finish..");
		this.observerLocator = observerLocator;

		multiObserver.observe(
			[
				[this, '_bGLOBAL_INDIV_ID'],
				[this, '_bPERSONNEL_NAME']
			], (newValue, oldValue) => this.onSpeculateProp(newValue, oldValue));

		this._cache_obj.OBSERVERS.clear_indiv_modal.push(() => {
			this.ClearSearch();
		});

	}

	attached(){
    		//console.log($(this));
  	}

	selectedTalent(item)
	{

		var isFound=this.varFilterArraySelected.find((_item)=>{
			if(_item.GLOBAL_INDIV_ID==item.GLOBAL_INDIV_ID)
			{
				return true;
			}
		});

		if( isFound===undefined){
			this.varFilterArraySelected.push(item);
		}

	}

	fnKeyup(evt,item)
	{
		if(evt.keyCode==13){
			if(this.varFilterArray.length==1)
			{
				this.varFilterArraySelected.push(this.varFilterArray[0]);
			}
		}
	}

	fnManualFilter(tmpVar)
	{
		var lstPredicates=[];
		_.each(this._rGROUP_TITLE.querySelectorAll('input'), all => {

			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));

			if(varOb.getValue()!=undefined && varOb.getValue()!=null && varOb.getValue()!="" && varOb.getValue()!="undefined"){

				if(varOb.propertyName.indexOf("PERSONNEL_NAME")>-1)
				{
					//varOb.propertyName="concat(concat(concat(LAST_NAME,', '), GIVEN_NAME)), MIDDLE_NAME)";
					lstPredicates.push(breeze.Predicate.create("concat(concat(concat(LAST_NAME,', '), GIVEN_NAME), MIDDLE_NAME)", breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
				}
				else
				{
					lstPredicates.push(breeze.Predicate.create(varOb.propertyName.replace('_b', ''), breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
				}
			}

			tmpVar = getFilter(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));

		});

		return tmpVar;
	}


	onSpeculateProp(newValue, oldValue) {

		if(this._rGROUP_TITLE===undefined || this._rGROUP_TITLE===null || this._rGROUP_TITLE==='') return;

		var tmpVar = this.fnManualFilter(this.varFilterArray);

		if(tmpVar.length>0)
		{



			var tmpVarNew=_.sortBy(tmpVar, 'PERSONNEL_NAME').reverse();
 			this.varFilterArray = tmpVarNew;
			this.varFilterArrayLength=this.varFilterArray.length;
			return;
		}
		else
		{
			tmpVar=this.fnManualFilter(getLookups().GLOBAL_INDIV_WITH_ALIAS);
			//console.log(tmpVar);
			//console.log(this.varActiveFromCompanyMstr);
			var varFound=_.filter(tmpVar,(all)=>{

				var result_p=_.find(this.varActiveFromCompanyMstr,(all_p)=>{
 					return all_p==all.GLOBAL_INDIV_ID;
 				});

			 return result_p==undefined;

			});
			tmpVar=varFound;
			//console.log(varFound);
		}

		this.varFilterArray = tmpVar;
		this.varFilterArrayLength = this.varFilterArray.length;

	}

	deleteSelected(index){
		this.varFilterArraySelected.splice(index,1);
	}

	SelectingDone(){

		this.controller.ok(this.varFilterArraySelected);

	}

	ClearSearch(){

		this.varFilterArraySelected=[];
		this._bGLOBAL_INDIV_ID="";
		this._bPERSONNEL_NAME="";
		this.varFilterArray = [];
		this.varFilterArrayLength = 0;

	}

}
