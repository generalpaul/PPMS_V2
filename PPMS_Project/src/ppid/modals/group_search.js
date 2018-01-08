import {inject,ObserverLocator,bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {MultiObserver} from 'multi-observer'; 
import {getLookups} from '../.././masterfiles';
import breeze from 'breeze-client';
import {EntityManager, EntityQuery} from '../../entity-manager-factory';
import {getFilter} from '../../helpers';
import {obj_personnel} from '../obj_personnel';
import toastr from "toastr";
import settings from 'settings';
// import {DialogService} from 'aurelia-dialog'
// import {DialogBox} from "./DialogBox";

@inject(MultiObserver,DialogController,ObserverLocator, obj_personnel, toastr)
export class group_search{
	
	obj_personnel=null;
	varFilterArrayLength=0;
	varFilterArray=[];
	lstPredicates=[];
	currPredicate=null;
	observerLocator=null;
	constructor(multiObserver,controller, observerLocator, obj_personnel, toastr){
		this.controller = controller;
		this.observerLocator = observerLocator;
		this.obj_personnel = obj_personnel;
		// this.DialogService = DialogService;

		multiObserver.observe([
			[this, "_bglobal_indiv_id"],
			[this, "_bgroup_name"],
			[this, "_bstatus_cd"]
		], (newValue, oldValue)=> this.onSpeculateProp(newValue, oldValue));
	}

	fnManualFilter(tmpVar)
	{		
		this.lstPredicates = [];
		_.each(this._rppid_queries.querySelectorAll('input'), all=> {
			var varOb = this.observerLocator.getObserver(this, all.getAttribute('searchable').replace('_s', '_b'));
			if(varOb.getValue()!=undefined && varOb.getValue()!=null && varOb.getValue()!="" && varOb.getValue()!="undefined")
			{
				if((varOb.propertyName.indexOf('global_grp_id')>-1) /*|| (varOb.propertyName.indexOf('tin')>-1 && varOb.getValue().length>=15)*/)
				{
					if(varOb.getValue().length==17)
						this.lstPredicates.push(breeze.Predicate.create(varOb.propertyName.replace('_b','').toUpperCase(), "==", varOb.getValue().toUpperCase()));
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

	onSpeculateProp(newValue, oldValue)
	{
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
			
			var _query = EntityQuery().from('GLOBAL_GRP_MSTR').where(breeze.Predicate.and(this.currPredicate))
			// .expand('GLOBAL_GRP_MSTR')
			.orderBy('GROUP_NAME')
			.select('GLOBAL_GRP_ID,GROUP_NAME');
			;
			EntityManager().executeQuery(_query).then((success)=>{
				// console.log(success.results);	
				tmpVar=[];

				_.each(success.results, (all)=>{
					tmpVar.push({
						GLOBAL_GRP_ID: all.GLOBAL_GRP_ID,
						GROUP_NAME: all.GROUP_NAME
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
		this.obj_personnel.OBSERVERS.group_dialog.forEach((all)=>{
			all(item.GLOBAL_GRP_ID);
		});
		this.controller.ok(item.GLOBAL_GRP_ID);
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