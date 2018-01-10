import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from 'entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';


@inject(obj_personnel, toastr, DialogService)
export class company_info
{
	obj_personnel=null;	
	_404_img = "/images/404.png";
	constructor(obj_personnel, toastr, DialogService)
	{
		this.obj_personnel=obj_personnel;
		this.DialogService = DialogService;
		this.obj_personnel.OBSERVERS.tab_changed.push((tab_num, global_indiv_id)=>{
			if(tab_num == 4){
				$("#company_tab_list").find(".active").removeClass("active");
				$("#company_tab0").addClass("active");
				$("#company_tabs").find(".active").removeClass("active");
				$("#company_specific").addClass("active");
			}
		});
	}

	clickTab_Company(tab_num){
		if(this.obj_personnel.global_indiv_id.length==0)
			return;
		this.obj_personnel.OBSERVERS.company_tab_changed.forEach((delegate)=>{
			delegate(tab_num, this.obj_personnel.global_indiv_id);
		});
					
		// switch(tab_num){
		// 	case 0: this.obj_personnel.OBSERVERS.company_tab_changed.forEach((delegate)=>{
		// 				delegate(tab_num, this.obj_personnel.global_indiv_id);
		// 			});
		// 			break;
		// 	case 1: 
		// 			this.obj_personnel.OBSERVERS.company_tab_changed.forEach((delegate)=>{
		// 				delegate(tab_num, this.obj_personnel.global_indiv_id);
		// 			});
		// 			break;
		// 	case 2:
		// 			this.obj_personnel.OBSERVERS.company_tab_changed.forEach((delegate)=>{
		// 				delegate(tab_num, this.obj_personnel.global_indiv_id);
		// 			});
		// 			break;
		// 	case 3: 
		// 			this.obj_personnel.OBSERVERS.company_tab_changed.forEach((delegate)=>{
		// 				delegate(tab_num, this.obj_personnel.global_indiv_id);
		// 			});
		// 			break;
		// } 
	}
}