import {getLookups} from '../masterfiles';
import {MultiObserver} from 'multi-observer'; 
import {inject, ObserverLocator,bindable} from 'aurelia-framework';
import {getFilter} from '../helpers';
import _ from 'underscore';
import $ from 'jquery';  
import {EntityManager, EntityQuery} from '../entity-manager-factory';
import toastr from "toastr";
import {cache_obj} from 'cache_obj';
import {DialogController} from 'aurelia-dialog';
import breeze from 'breeze-client';

@inject(MultiObserver,ObserverLocator,Element, cache_obj,DialogController)
export class program {
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
		
		this.items=getLookups().BDGT_TMPL_HDR;

		this._cache_obj=cache_obj;
	
		multiObserver.observe(
			[
				[this, '_bPROGRAM_CD'],
				[this, '_bPROGRAM_TITLE']
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
		_.each(this._rBUDGET_TITLE.querySelectorAll('input'), all => {
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
		_.each(this._rBUDGET_TITLE.querySelectorAll('input'), all => {

			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));
			
			if(varOb.getValue()!=undefined && varOb.getValue()!=null && varOb.getValue()!="" && varOb.getValue()!="undefined")
			
				lstPredicates.push(breeze.Predicate.create(varOb.propertyName.replace('_b', ''), breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
			
			if(tmpVar.length>0)
			{
				tmpVar = getFilter(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
			}
				

		});

		this.currPredicate=lstPredicates;


		//if has existing results, use it, else, query to server
		if(tmpVar.length>0) 
		{
 			this.varFilterArray = tmpVar;
			this.varFilterArrayLength=this.varFilterArray.length;
			return;
		}

	//console.log(this._cache_obj.PROGRAM_USER);
		if(this._cache_obj.PROGRAM_USER.length==0)
		{

			var _query = EntityQuery().from('PROGRAM_USER_TRX').where("USER_ID", "==", this._cache_obj.USER.USER_ID);
			EntityManager().executeQuery(_query).then((success) => {
			//	console.log(success.results);
				success.results.forEach((all)=>{
					//console.log(all.PROGRAM_ID +"TEST"+all.USER_ID);
					if(all.USER_ID==this._cache_obj.USER.USER_ID)
						this._cache_obj.PROGRAM_USER.push(all);
				});
					//var findProgramUser=this._cache_obj.PROGRAM_USER.find((allP)=>allP.PROGRAM_ID=="9233");
					//console.log(findProgramUser);
			});
		
		}//

		//delay to get minimize bloated multiple/simultaneous searching
		setTimeout((a) => {
			
			if (a !== this.currPredicate)
				return;

			this.varFilterArray = [];

			var _query = EntityQuery().from('PROGRAM_MSTR').where(breeze.Predicate.and(this.currPredicate)).select('PROGRAM_CD,PROGRAM_TITLE,PROGRAM_ID,BUH_PERSONNEL_ID');
			EntityManager().executeQuery(_query).then((success) => {
				tmpVar = [];

				_.each(success.results, (all) => {

					
					var findProgramUser=this._cache_obj.PROGRAM_USER.find((allP)=>allP.PROGRAM_ID==all.PROGRAM_ID);
					if(findProgramUser!== undefined)
					{

						tmpVar.push({
						PROGRAM_TITLE: all.PROGRAM_TITLE,
						PROGRAM_CD: all.PROGRAM_CD,
						PROGRAM_ID: all.PROGRAM_ID,
						});
					}
					


				});

				//if (tmpVar.length < this.varFilterArray.length || this.varFilterArray.length == 0) { //console.log(tmpVar);
					this.varFilterArray = tmpVar;
					this.varFilterArrayLength = this.varFilterArray.length;
				//}

			}, (failed) => {
				toastr.error(failed, "Failed loading PROGRAM Names");
			});

		}, 500, this.currPredicate);

	}

	selectedProgram(item){

		// this._cache_obj.CALLER.VALUE1 = item;
		// this._cache_obj.CALLER.ACTION="pass.program";

		this._cache_obj.OBSERVERS.pass_program.forEach((all) => {
			all(item);
		});

		this.controller.ok();
		//this._dispatcher.dispatch('pass.program', item);
	}

	//@handle('clear.program.modal')
	ClearSearch(){
		this._bPROGRAM_CD="";
		this._bPROGRAM_TITLE="";
		this.varFilterArray = [];
		this.varFilterArrayLength = 0;
	}
}
