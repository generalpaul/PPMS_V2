import {getLookups} from '../masterfiles';
import {MultiObserver} from 'multi-observer'; 
import {inject, ObserverLocator,bindable} from 'aurelia-framework';
import {getFilter} from '../helpers';
import _ from 'underscore';
import $ from 'jquery';
import {EntityManager, EntityQuery} from '../entity-manager-factory';
import toastr from "toastr";
import {ModalWizard} from 'modals/modal-wizard';
import {objBudget} from 'objBudget';
import {DialogController} from 'aurelia-dialog';
import breeze from 'breeze-client';


@inject(MultiObserver, ObserverLocator, Element, ModalWizard, objBudget, DialogController)
export class buhProgramDialog {
	items = [];
	observerLocator = null;
	pageindex=0;
	varFilterArray = [];
	varFilterArraySelected=[];
	varFilterArrayLength=0;
	
	_ModalWizard;
	_objBudget;
	controller=null;
	_programs=[];
	constructor(multiObserver, observerLocator, Element, ModalWizard, objBudget,controller) {
		this.controller=controller;

		this._ModalWizard=ModalWizard;
		this._objBudget=objBudget;
		
		toastr.info("Program Data...", "Loading..");
		
		toastr.success("Start Search...", "Loading Finish..");

		this.observerLocator = observerLocator;
		
		multiObserver.observe(
			[
				[this, '_bPROGRAM_CD'],
				[this, '_bPROGRAM_TITLE']
			], (newValue, oldValue) => this.onSpeculateProp(newValue, oldValue));

		
		var _query = EntityQuery().from('PROGRAM_MSTR').where(breeze.Predicate.and(this.currPredicate)).select('PROGRAM_CD,PROGRAM_TITLE,PROGRAM_ID,BUH_PERSONNEL_ID');
			EntityManager().executeQuery(_query).then((success) => {
				this._programs=success.results;

			}, (failed) => {
				toastr.error(failed, "Failed loading Programs");
			});

	}

	attached(){
    		//console.log($(this));
  	}

	selectedTalent(item) {
		var isFound=this.varFilterArraySelected.find((_item)=>{
			if(_item.PROGRAM_CD==item.PROGRAM_CD)
			{
				return true;
			}
		});

		if( isFound===undefined){
			this.varFilterArraySelected.push(item);
		}
	
	}

	fnKeyup(evt,item){
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
				
				if(varOb.propertyName.indexOf("PROGRAM_TITLE")>-1)
				{
					lstPredicates.push(breeze.Predicate.create("PROGRAM_TITLE", breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
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
			var tmpVarNew=_.sortBy(tmpVar, 'PROGRAM_TITLE').reverse();
 			this.varFilterArray = tmpVarNew;
			this.varFilterArrayLength=this.varFilterArray.length;
			return;
		}
		else
		{
			tmpVar=this.fnManualFilter(this._programs.filter((all)=>all.PROGRAM_TITLE.indexOf('[')<=0)); 
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

	//@handle('clear.indiv.modal')
	ClearSearch(){
		this.varFilterArraySelected=[];
		this._bPROGRAM_CD="";
		this._bPROGRAM_TITLE="";
		this.varFilterArray = [];
		this.varFilterArrayLength = 0;

	}

}