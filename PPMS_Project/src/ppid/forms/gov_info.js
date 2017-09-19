import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {DialogService} from 'aurelia-dialog';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';

@inject(DialogService, obj_personnel, toastr)
export class gov_info
{
	obj_personnel = null;
	_activeTab=0;
	constructor(dialogService, obj_personnel, toastr){
		this.dialogService = dialogService;
		this.obj_personnel = obj_personnel;

	}	

	clickTab_GovInfo(tab_num){
		if(this.obj_personnel.global_indiv_id.length===0)
			return;
		switch(tab_num){
			case 0: 
					this.obj_personnel.OBSERVERS.govinfo_main_clicked.forEach((delegate)=>{
						toastr.clear();
						toastr.info("", "Loading government info...");
						delegate(this.obj_personnel.global_indiv_id);
					});
					break;
		}
	}
}