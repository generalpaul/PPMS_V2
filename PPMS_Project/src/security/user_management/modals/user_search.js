import {inject,ObserverLocator,bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {MultiObserver} from 'multi-observer'; 
import {getLookups} from 'masterfiles';
import breeze from 'breeze-client';
import {EntityManager, EntityQuery} from 'entity-manager-factory';
import {getFilter} from 'helpers';
import {obj_user} from '../obj_user';
import toastr from "toastr";
import settings from 'settings';

@inject(MultiObserver,DialogController,ObserverLocator, obj_user, toastr)
export class user_search{	

	obj_user=null;
	varFilterArrayLength=0;
	varFilterArray=[];
	lstPredicates=[];
	currPredicate=null;
	observerLocator=null;
	constructor(multiObserver,controller, observerLocator, obj_user, toastr){
		this.controller = controller;
		this.observerLocator = observerLocator;
		this.obj_user = obj_user;

		multiObserver.observe([
			[this, "_buser_id"],
			[this, "_bemployee_id"],
			[this, "_bname"]
		], (newValue, oldValue)=> this.onSpeculateProp(newValue, oldValue));
	}

	fnManualFilter(tmpVar)
	{		
		this.lstPredicates = [];
		_.each(this._rppid_queries.querySelectorAll('input'), all=> {
			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));
			if(varOb.getValue()!=undefined && varOb.getValue()!=null && varOb.getValue()!="" && varOb.getValue()!="undefined")
			{
				
				if((varOb.propertyName.indexOf('name')>-1)){

					var pred1 = breeze.Predicate.create("GIVEN_NAME", breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase());
					var pred2 = breeze.Predicate.create("LAST_NAME", breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase());
					var finalPred = breeze.Predicate.Or(pred1, pred2);
					this.lstPredicates.push(finalPred);

				}else{
					this.lstPredicates.push(breeze.Predicate.create(varOb.propertyName.replace("_b",'').toUpperCase(), breeze.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
				}

				if(tmpVar.length>0)
				{
					tmpVar = getFilter(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
				}
			}
		});
		return tmpVar;
	}

	onSpeculateProp(newValue, oldValue){

		settings.isNavigating = true;
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
			// var tmpVarNew=_.sortBy(tmpVar, 'GLOBAL_INDIV_ID').reverse();
			this.varFilterArray = tmpVar;
			this.varFilterArrayLength=this.varFilterArray.length;
			return;
		}

		if(this.lstPredicates.length==0)
			return;

		this.currPredicate=this.lstPredicates;		
		setTimeout((a)=>{
			if(a!==this.currPredicate)
				return;
			
			var _query = EntityQuery().from('USER_PROFILE_MSTR').where(breeze.Predicate.and(this.currPredicate))
			// .expand('GLOBAL_GRP_MSTR')
			.orderBy('GIVEN_NAME')
			// .select('GLOBAL_GRP_ID,GROUP_NAME');
			;
			EntityManager().executeQuery(_query).then((success)=>{
				// console.log(success.results);	
				tmpVar=[];

				_.each(success.results, (all)=>{
					tmpVar.push({
						USER_ID: all.USER_ID,
						EMPLOYEE_ID: all.EMPLOYEE_ID,
						NAME: all.GIVEN_NAME + ' ' + all.LAST_NAME
					});
				});
				

				
				this.varFilterArray = tmpVar;
				// console.log(this.varFilterArray);
				this.varFilterArrayLength = this.varFilterArray.length;
				settings.isNavigating = false;
			}, 
			(failed)=>{
				settings.isNavigating = false;
				//console.log(failed);
				toastr.error(failed, "Failed loading Personnel Info");				
			})
			
		}, 500, this.currPredicate);
	}

	selectedGroup(item)
	{
		this.obj_user.OBSERVERS.group_dialog.forEach((all)=>{
			all(item.USER_ID);
		});
		this.controller.ok(item.USER_ID);
	}

	fnKeyup(evt,item){		

		if(evt.keyCode==13){
			if(this.varFilterArray.length==1)
			{
				this.selectedGroup(this.varFilterArray[0]);
			}
		}
	}	

}