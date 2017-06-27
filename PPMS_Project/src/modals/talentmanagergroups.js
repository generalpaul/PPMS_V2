import {getLookups} from '../masterfiles';
import {MultiObserver} from 'multi-observer'; 
import {inject, ObserverLocator,bindable} from 'aurelia-framework';
import {getFilter} from '../helpers';
import _ from 'underscore';
import $ from 'jquery';
//import {Dispatcher, handle} from 'aurelia-flux';  
import {cache_obj} from 'cache_obj';
import {DialogController} from 'aurelia-dialog';

@inject(MultiObserver,ObserverLocator,Element,cache_obj,DialogController)
export class talentmanagergroups {
	items = [];
	observerLocator = null;

	varFilterArray = [];
	//_dispatcher;
	varFilterArrayLength=0;
	pageindex=0;
	_cache_obj;
	controller=null;

	constructor(multiObserver,observerLocator,Element,cache_obj,controller) {
		this.controller=controller;
		//this._dispatcher=Dispatcher;
		this._cache_obj = cache_obj;
		this.observerLocator=observerLocator;
		
		this.items=getLookups().GLOBAL_GRP_MSTR;
		multiObserver.observe(
			[
			[this, '_bGLOBAL_GRP_ID'],
			[this, '_bGROUP_NAME']
			], (newValue, oldValue) => this.onSpeculateProp(newValue, oldValue));

		this._cache_obj.OBSERVERS.clear_talentmanager_modal.push(() => {
			this.ClearSearch();
		});

	}

	selectedTalent(item)
	{
		
		this.controller.ok(item);

	}

	fnKeyup(evt,item)
	{
		if(evt.keyCode==13){
			if(this.varFilterArray.length==1)
			{
				this._cache_obj.OBSERVERS.pass_value.forEach((all) => {
					all(this.varFilterArray[0]);
				});
			}
		}
	}

	onSpeculateProp(newValue, oldValue) 
	{


		var varValuesHasChanged=false;
		//check if inputs has value else return;
		_.each(this._rGROUP_TITLE.querySelectorAll('input'), all => {
			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));

			if(varOb.getValue()!='' && varOb.getValue()!==undefined)
			{	
				varValuesHasChanged=true;
			}
		});
		


		if(!varValuesHasChanged) return;

		var tmpVar = this.items;
		_.each(this._rGROUP_TITLE.querySelectorAll('input'), all => {

			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));
			
			if(varOb.getValue()!=undefined && varOb.getValue()!=null && varOb.getValue()!="" && varOb.getValue()!="undefined")
				tmpVar = getFilter(tmpVar, varOb.getValue().toUpperCase() , all.getAttribute('searchable').replace('_s', ''));

		});

		this.varFilterArray = tmpVar;
		this.varFilterArrayLength=this.varFilterArray.length;
	}

	//@handle('clear.talentmanager.modal')
	ClearSearch()
	{
		this.varFilterArray=[];
		this.varFilterArrayLength=0;
		this._bGLOBAL_GRP_ID="";
		this._bGROUP_NAME="";
		this.varFilterArray = [];
		this.varFilterArrayLength=0;
	}
}