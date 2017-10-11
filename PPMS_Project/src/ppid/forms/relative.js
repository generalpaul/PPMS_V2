import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {DialogService} from 'aurelia-dialog';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';

@inject(DialogService, obj_personnel, toastr)
export class relative
{
	obj_personnel = null;
	_tab0_loaded = false;
	_404_img = "/images/404.png";
	constructor(dialogService, obj_personnel, toastr){
		this.dialogService = dialogService;
		this.obj_personnel = obj_personnel;
		//this.obj_personnel.OBSERVERS.ppid_dialog.push((all)=>{				
		//	this.CloseSearch(all);
		//});
		// this.obj_personnel.OBSERVERS.tab_changed.push((tab_num,global_id)=>{
		// 	this.LoadData(tab_num, global_id);
		// });
	}

	clickTab_relative(tab_num){
		
		if(this.obj_personnel.global_indiv_id == undefined || this.obj_personnel.global_indiv_id == null || this.obj_personnel.global_indiv_id.length==0)
			return;

		switch(tab_num){
			case 0: 
				toastr.clear();
				toastr.info("", "Loading parents' info...");
				this.obj_personnel.OBSERVERS.relative_parents_clicked.forEach((delegate)=>{
					delegate(this.obj_personnel.global_indiv_id);
				});
		}

	}
	
	
	
	
}