import {inject,ObserverLocator,bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {MultiObserver} from 'multi-observer'; 
import {getLookups} from '../.././masterfiles';
import breeze from 'breeze-client';
import {EntityManager, EntityQuery} from '../../entity-manager-factory';
import {getFilter} from '../../helpers';
import {obj_personnel} from '../obj_personnel';

@inject(MultiObserver,DialogController,ObserverLocator, obj_personnel)
export class ppid_search
{
	obj_personnel=null;
	varFilterArrayLength=0;
	varFilterArray=[];
	lstPredicates=[];
	currPredicate=null;
	observerLocator=null;
	constructor(multiObserver,controller, observerLocator, obj_personnel){
		this.controller = controller;
		this.observerLocator = observerLocator;
		this.obj_personnel = obj_personnel;
		
		multiObserver.observe([
			[this, "_bglobal_indiv_id"],
			//[this, "_btin"],
			//[this, "_bgroup"],
			[this, "_blast_name"],
			[this, "_bfirst_name"],
			[this, "_bnickname"]
			//[this, "_bproject_name"],
			//[this, "_bcountry"]
		], (newValue, oldValue)=> this.onSpeculateProp(newValue, oldValue));
		
	}
	
	fnManualFilter(tmpVar)
	{		
		this.lstPredicates = [];
		//_rppid_queries
		_.each(this._rppid_queries.querySelectorAll('input'), all=> {						
			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));
			if(varOb.getValue()!=undefined && varOb.getValue()!=null && varOb.getValue()!="" && varOb.getValue()!="undefined")
			{
				if((varOb.propertyName.indexOf('global_indiv_id')>-1) /*|| (varOb.propertyName.indexOf('tin')>-1 && varOb.getValue().length>=15)*/)
				{
					if(varOb.getValue().length>=17)
						this.lstPredicates.push(breeze.Predicate.create(varOb.propertyName.replace('_b','').toUpperCase(), "==", varOb.getValue().toUpperCase()));
				}
				else if(!(varOb.propertyName.indexOf('global_indiv_id')>-1))
				{					
					this.lstPredicates.push(breeze.Predicate.create(varOb.propertyName.replace('_b','').toUpperCase().replace('FIRST_NAME','GIVEN_NAME').replace('NICKNAME','ALIAS'), breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
				} 
				
				if(tmpVar.length>0)
				{
					tmpVar = getFilter(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
				}
			}
		});
		return tmpVar;
	}
	
	onSpeculateProp(newValue, oldValue)
	{
		var varValuesHasChanged=false;
		//check if inputs has value else return;
		_.each(this._rppid_queries.querySelectorAll('input'), all => {
			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));

			if(varOb.getValue()!='' && varOb.getValue()!==undefined)
			{	
				varValuesHasChanged=true;
			}
		});
		
		if(!varValuesHasChanged) return;		
		
		var tmpVar = this.fnManualFilter(this.varFilterArray);
		
		if(tmpVar.length>0){			
			var tmpVarNew=_.sortBy(tmpVar, 'GLOBAL_INDIV_ID').reverse();
			this.varFilterArray = tmpVarNew;
			this.varFilterArrayLength=this.varFilterArray.length;
			return;
		}

		if(this.lstPredicates.length==0)
			return;

		this.currPredicate=this.lstPredicates;		
		setTimeout((a)=>{
			if(a!==this.currPredicate)
				return;
			
			var _query = EntityQuery().from('GLOBAL_INDIV_MSTR').where(breeze.Predicate.and(this.currPredicate))
			//.expand('GLOBAL_GRP_MSTR')
			.orderBy('GLOBAL_INDIV_ID desc')
			.select('GLOBAL_INDIV_ID,GIVEN_NAME,LAST_NAME,ALIAS');
			EntityManager().executeQuery(_query).then(
			(success)=>{
				tmpVar=[];
				_.each(success.results, (all)=>{
					//console.log(all.GLOBAL_INDIV_ID);
					tmpVar.push({
						GLOBAL_INDIV_ID: all.GLOBAL_INDIV_ID,
						//TIN: all.GLOBAL_INDIV_ID,
						GROUP: "Test group", 
						LAST_NAME: all.LAST_NAME,
						FIRST_NAME: all.GIVEN_NAME,
						NICK_NAME: all.ALIAS,
						//PROJECT_NAME: "Coming soon.",
						//COUNTRY: "PHILIPPINES"
					});
				});
				
				this.varFilterArray = tmpVar;
				this.varFilterArrayLength = this.varFilterArray.length;
			}, 
			(failed)=>{
				//console.log(failed);
				toastr.error(failed, "Failed loading Personnel Info");				
			})
			
		}, 500, this.currPredicate);
	}
	
	selectedPersonnel(item)
	{
		this.obj_personnel.OBSERVERS.ppid_dialog.forEach((all)=>{
			all(item.GLOBAL_INDIV_ID);
		});
		this.controller.ok();
	}
	
	fnKeyup(evt,item){
		if(evt.keyCode==13){
			if(this.varFilterArray.length==1)
			{
				this.selectedPersonnel(this.varFilterArray[0]);
				//this.selectedBudget(this.varFilterArray[0]);
			}
		}
	}	
	
	
}