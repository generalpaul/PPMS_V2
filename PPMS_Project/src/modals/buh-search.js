import {getLookups} from '../masterfiles';
import {MultiObserver} from 'multi-observer'; 
import {inject, ObserverLocator,bindable} from 'aurelia-framework';
import {getFilter} from '../helpers';
import _ from 'underscore';
import $ from 'jquery';
//import {Dispatcher, handle} from 'aurelia-flux';  
import {EntityManager, EntityQuery} from '../entity-manager-factory';
import toastr from "toastr";
import {cache_obj} from 'cache_obj';
import {DialogController} from 'aurelia-dialog';
import breeze from 'breeze-client';


@inject(MultiObserver,ObserverLocator,Element, cache_obj,DialogController)
export class buhSearch {
	items = [];
	observerLocator = null;
	pageindex=0;
	varFilterArrayLength=0;
	varFilterArray = [];
	currPredicate=null;
	controller=null;
	constructor(multiObserver,observerLocator,Element, cache_obj, controller) {
		this.controller=controller;

		this.observerLocator=observerLocator;
		
		this._cache_obj=cache_obj;
		
		var _query = EntityQuery().from('BUH_PERSONNEL').orderByDesc("BUH_PERSONNEL_ID");
		EntityManager().executeQuery(_query).then((success) => {
			this.items=success.results;

		}, (failed) => {
			toastr.error(failed, "Failed loading PROGRAM Names");
		});

		multiObserver.observe(
			[
			[this, '_bOPTIONAL_GLOBAL_ID'],
			[this, '_bFIRST_NAME'],
			[this, '_bLAST_NAME'],
			[this, '_bMIDDLE_NAME'],
			[this, '_bEMAIL_ADDRESS'],
			], (newValue, oldValue) => this.onSpeculateProp(newValue, oldValue));

		

		this._cache_obj.OBSERVERS.clear_program_modal.push(() => {
			this.ClearSearch();
		});

	}

	selectedTalent(item){
	
		this._cache_obj.OBSERVERS.pass_value.forEach((all) => {
			all(item);
		});
	}

	onSpeculateProp(newValue, oldValue) {
		
		
		var varValuesHasChanged=false;
		//check if inputs has value else return;
		_.each(this._rBUH_SEARCH.querySelectorAll('input'), all => {
			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));

			if(varOb.getValue()!='' && varOb.getValue()!==undefined)
			{	
				varValuesHasChanged=true;
			}
		});
		

		if(!varValuesHasChanged) return;
		//++this.intTest;
		var tmpVar = [];
		if(this.varFilterArray.length>0)
			tmpVar=this.varFilterArray;


		var lstPredicates=[];
		_.each(this._rBUH_SEARCH.querySelectorAll('input'), all => {

			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));
			
			if(varOb.getValue()!=undefined && varOb.getValue()!=null && varOb.getValue()!="" && varOb.getValue()!="undefined")
			// if(varOb.propertyName.indexOf("OPTIONAL_GLOBAL_ID")>-1)
			// {
			// 	lstPredicates.push(breeze.Predicate.create(varOb.propertyName.replace('_b', ''), "==", varOb.getValue().toUpperCase()));
			// }
			// else
			// {
				lstPredicates.push(breeze.Predicate.create(varOb.propertyName.replace('_b', ''), breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
			//}

			if(tmpVar.length>0)
			{
				tmpVar = getFilter(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
			}


		});

		//console.log(lstPredicates);
		this.currPredicate=lstPredicates;


		//if has existing results, use it, else, query to server
		if(tmpVar.length>0) 
		{
			this.varFilterArray = tmpVar;
			this.varFilterArrayLength=this.varFilterArray.length;
			return;
		}

		//delay to get minimize bloated multiple/simultaneous searching
		setTimeout((a) => {

			if (a !== this.currPredicate)
				return;

			this.varFilterArray = [];

			var _query = EntityQuery().from('BUH_PERSONNEL').where(breeze.Predicate.and(this.currPredicate)).select('BUH_PERSONNEL_ID,OPTIONAL_GLOBAL_ID,FIRST_NAME,MIDDLE_NAME,LAST_NAME, EMAIL_ADDRESS');
			EntityManager().executeQuery(_query).then((success) => {
				tmpVar = [];
				
				
				_.each(success.results, (all) => {
					tmpVar.push(all);
				});

				
				this.varFilterArray = tmpVar;
				this.varFilterArrayLength = this.varFilterArray.length;


			}, (failed) => {
				toastr.error(failed, "Failed loading BUH Names");
			});

		}, 500, this.currPredicate);

	}

	selectedBUH(item){
		this.controller.ok(item);
		
	}

	//@handle('clear.program.modal')
	ClearSearch(){
		this._bOPTIONAL_GLOBAL_ID="";
		this._bFIRST_NAME="";
		this.varFilterArray = [];
		this.varFilterArrayLength = 0;
	}
}
