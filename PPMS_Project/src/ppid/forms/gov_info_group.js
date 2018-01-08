import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {DialogService} from 'aurelia-dialog';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';

@inject(DialogService, obj_personnel, toastr)
export class gov_info_group{
	
	obj_personnel = null;
	_activeTab=0;
	_404_img = "/images/404.png";
	constructor(dialogService, obj_personnel, toastr){
		this.dialogService = dialogService;
		this.obj_personnel = obj_personnel;

		this.obj_personnel.OBSERVERS.tab_changed.push((tab_num, global_indiv_id)=>{
			if(tab_num == 3){
				$("#gov_tab0").addClass("active");
				$("#gov_tab1").removeClass("active");
				$("#gov_tab2").removeClass("active");
				$("#gov_info_tabs").find(".active").removeClass("active");
				$("#gov_info_main").addClass("active");
			}
		});

	}

	clickTab_GovInfo(tab_num){
		if(this.obj_personnel.global_indiv_id.length===0)
			return;
		switch(tab_num){
			case 0: 
					toastr.clear();
					toastr.info("", "Loading government info...");					
					break;
			case 1: 
					toastr.clear();
					toastr.info("", "Loading government exam passed...");					
					break;
			case 2: 
					toastr.clear();
					toastr.info("", "Loading criminal record...");
		}
		this.obj_personnel.OBSERVERS.govinfo_tab_changed.forEach((delegate)=>{
			delegate(tab_num, this.obj_personnel.global_indiv_id);
		});
	}
}