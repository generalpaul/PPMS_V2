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

@inject(MultiObserver,ObserverLocator,Element, cache_obj, DialogController)
export class job {
	observerLocator = null;
	pageindex=0;
	varFilterArrayLength=0;
	varFilterArray = [];
	currPredicate=null;
	intTest=0;
	hasFocus=true;
	controller=null;
	constructor(multiObserver,observerLocator,Element, cache_obj, controller) {

		this.controller=controller;

		this.observerLocator=observerLocator;
		
		this._cache_obj=cache_obj;

		multiObserver.observe(
			[
			[this, '_bJOB_GRP'],
			[this, '_bJOB_DESC']
			], (newValue, oldValue) => this.onSpeculateProp(newValue, oldValue));


		this._cache_obj.OBSERVERS.clear_job_modal.push(() => {
			this.ClearSearch();
		});
		
		
	}

	selectedTalent(item)
	{

		this._cache_obj.OBSERVERS.pass_job.forEach((all)=>{
			all(item);
		});

	}

	fnManualFilter(tmpVar)
	{
		this.currPredicate = [];
		_.each(this._rJOB_TITLE.querySelectorAll('input'), all => {

			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));

			if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined")
				this.currPredicate.push(breeze.Predicate.create(varOb.propertyName.replace('_b', ''), breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));

			if (tmpVar.length > 0)
				tmpVar = getFilter(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));

		});

		return tmpVar;
	}

	onSpeculateProp(newValue, oldValue) 
	{
		

		var varValuesHasChanged=false;

		//check if inputs has value else return;
		_.each(this._rJOB_TITLE.querySelectorAll('input'), all => 
		{
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
			var tmpVarNew=_.sortBy(tmpVar, 'JOB_DESC').reverse();
			this.varFilterArray = tmpVarNew;
			this.varFilterArrayLength=this.varFilterArray.length;
			return;
		}

		//delay to get minimize bloated multiple/simultaneous searching
		setTimeout((a) => 
		{

			if (a !== this.currPredicate)
				return;

			var varJobs = getLookups().JOB_GRP_CATEGORY.filter
			((all)=>all.COMPANY_ID==this._cache_obj.USER.COMPANY_ID);

			this.varFilterArray = [];

			_.each(varJobs, (all) => {
				if(all.JOB_DESC.indexOf("[SELECT")==-1)
					tmpVar.push({
						JOB_DESC: all.JOB_DESC,
						JOB_GRP: all.CATEGORY_DESC,
						JOB_ID: all.JOB_ID
					});
			});

			tmpVar=this.fnManualFilter(tmpVar); 

			this.varFilterArray = tmpVar;
			this.varFilterArrayLength = this.varFilterArray.length;

		}, 

		500, this.currPredicate);

	}

	selectedJob(item)
	{

		this.controller.ok(item);

	}

	ClearSearch()
	{
		this._bJOB_GRP="";
		this._bJOB_DESC="";
		this.varFilterArray = [];
		this.varFilterArrayLength = 0;
		
		setTimeout(() => {
			$(this.refJobDesc).focus();
		}, 500);
	}


	fnKeyup(evt,item){
		if(evt.keyCode==13){
			if(this.varFilterArray.length==1)
			{

				this._cache_obj.OBSERVERS.pass_job.forEach((all)=>{
					all(this.varFilterArray[0]);
				});
				
			}
		}
	}
}
