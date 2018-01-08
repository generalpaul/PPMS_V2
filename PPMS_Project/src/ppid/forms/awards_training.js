import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {DialogService} from 'aurelia-dialog';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';

@inject(DialogService, obj_personnel, toastr)
export class awards_training //Experience, awards, seminar, and training.
{
	obj_personnel = null;
	_404_img = "/images/404.png";	
	constructor(dialogService, obj_personnel, toastr){
		this.dialogService = dialogService;
		this.obj_personnel = obj_personnel;

		this.obj_personnel.OBSERVERS.tab_changed.push((tab_num, global_indiv_id)=>{
			if(tab_num == 2){
				$("#award").addClass("active");
				$("#training").removeClass("active");				
				$("#awards").addClass("active");
				$("#trainings").removeClass("active");
			}
		});
		// this.obj_personnel.OBSERVERS.ppid_dialog.push((all)=>{				
		// 	this.CloseSearch(all);
		// });
	}
	
	clickTab_AwardsTraining(tab_num){
		if(this.obj_personnel.global_indiv_id.length==0)
			return;
		switch(tab_num){
			case 0:
				toastr.clear();
				toastr.info("", "Loading award info...");
				break;
			case 1: 
				toastr.clear();
				toastr.info("", "Loading training info...");
				break;
		}

		this.obj_personnel.OBSERVERS.award_training_tab_changed.forEach((delegate)=>{
			delegate(tab_num, this.obj_personnel.global_indiv_id);
		});
	}
}