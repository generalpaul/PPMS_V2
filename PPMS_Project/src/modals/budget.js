import {getLookups} from '../masterfiles';
import {MultiObserver} from 'multi-observer'; 
import {inject, ObserverLocator,bindable} from 'aurelia-framework';
import {getFilter} from '../helpers';
import _ from 'underscore';
import $ from 'jquery';
//import {Dispatcher, handle} from 'aurelia-flux';  
import {EntityManager, EntityQuery} from '../entity-manager-factory';
import toastr from "toastr";
import {objBudget} from 'objBudget';
import { DialogController } from 'aurelia-dialog';
import breeze from 'breeze-client';

@inject(MultiObserver,ObserverLocator,Element,objBudget,DialogController)
export class budget {
	items = [];
	observerLocator = null;
	pageindex=0;
	varFilterArrayLength=0;
	varFilterArray = [];
	currPredicate=null;
	_objBudget;
	lstPredicates=[];
	controller=null;
	constructor(multiObserver,observerLocator,Element,objBudget,controller) {
		this.controller=controller;
		//this._dispatcher=Dispatcher;
		this._objBudget=objBudget;
		this.observerLocator=observerLocator;
		
		this.items=getLookups().BDGT_TMPL_HDR;

		// var _query = EntityQuery().from('BDGT_TMPL_HDR').where("BDGT_TMPL_ID", "==", this._GLOBAL_GRP_ID);
		// EntityManager().executeQuery(_query).then((success) => {});

		multiObserver.observe(
			[
			[this, '_bBDGT_TMPL_ID'],
			[this, '_bPROGRAM_TITLE'],
			[this, '_bPROGRAM_IO'],
			[this, '_bAPPR_STAT_CD']
			], (newValue, oldValue) => this.onSpeculateProp(newValue, oldValue));


		this._objBudget.OBSERVERS.clear_budget_modal.push(()=>{
			this.ClearSearch();
		});

	}


	fnManualFilter(tmpVar)
	{
		
		this.lstPredicates=[];

		_.each(this._rBUDGET_TITLE.querySelectorAll('input'), all => {

			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));
			
			if(varOb.getValue()!=undefined && varOb.getValue()!=null && varOb.getValue()!="" && varOb.getValue()!="undefined")
				if(varOb.propertyName.indexOf("BDGT_TMPL_ID")>-1)
				{
					this.lstPredicates.push(breeze.Predicate.create(varOb.propertyName.replace('_b', ''), "==", varOb.getValue()));
				}
				else
				{
					this.lstPredicates.push(breeze.Predicate.create(varOb.propertyName.replace('_b', '').replace('PROGRAM_TITLE','PROGRAM_MSTR.PROGRAM_TITLE').replace('PROGRAM_IO','PROGRAM_MSTR.PROGRAM_IO'), breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
				}
				
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
		_.each(this._rBUDGET_TITLE.querySelectorAll('input'), all => {
			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));

			if(varOb.getValue()!='' && varOb.getValue()!==undefined)
			{	
				varValuesHasChanged=true;
			}
		});

		if(!varValuesHasChanged) return;

		var tmpVar = this.fnManualFilter(this.varFilterArray);

		//if has existing results, use it, else, query to server
		if(tmpVar.length>0) 
		{
			var tmpVarNew=_.sortBy(tmpVar, 'BDGT_TMPL_ID').reverse();
			this.varFilterArray = tmpVarNew;
			this.varFilterArrayLength=this.varFilterArray.length;
			return;
		}

		this.currPredicate=this.lstPredicates;
		
		//delay to get minimize bloated multiple/simultaneous searching
		setTimeout((a) => {

			if (a !== this.currPredicate)
				return;

			this.varFilterArray = [];

			var _query = EntityQuery().from('BDGT_TMPL_HDR').where(breeze.Predicate.and(this.currPredicate)).expand('PROGRAM_MSTR').orderBy("BDGT_TMPL_ID desc").select('BDGT_TMPL_ID,PROGRAM_MSTR.PROGRAM_TITLE,PROGRAM_MSTR.PROGRAM_IO, APPR_STAT_CD');
            EntityManager().executeQuery(_query).then((success) => {
                
				tmpVar = [];
				_.each(success.results, (all) => {
					tmpVar.push({
						PROGRAM_TITLE: all.PROGRAM_MSTR.PROGRAM_TITLE,
						BDGT_TMPL_ID: parseInt(all.BDGT_TMPL_ID),
						PROGRAM_IO: all.PROGRAM_MSTR.PROGRAM_IO,
						APPR_STAT_CD: all.APPR_STAT_CD.replace('APP-','')
					});
				});

				this.varFilterArray = tmpVar;
				this.varFilterArrayLength = this.varFilterArray.length;

			}, (failed) => {
				toastr.error(failed, "Failed loading PROGRAM Names");
			});

		}, 500, this.currPredicate);

	}

	selectedBudget(item){
		
		this._objBudget.OBSERVERS.budget_dialog.forEach((all)=>{
			all(item.BDGT_TMPL_ID);
		});

		this.controller.ok();

	}

	fnKeyup(evt,item){
		if(evt.keyCode==13){
			if(this.varFilterArray.length==1)
			{
				this.selectedBudget(this.varFilterArray[0]);
			}
		}
	}

	ClearSearch(){
		this._bBDGT_TMPL_ID="";
		this._bPROGRAM_TITLE="";
		this._bPROGRAM_IO="";
		this._bAPPR_STAT_CD="";
		
		this.varFilterArray=[];
		this.varFilterArrayLength = 0;
	}
}
