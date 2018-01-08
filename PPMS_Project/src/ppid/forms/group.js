import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {DialogService} from 'aurelia-dialog';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';
import breeze from 'breeze-client';
import moment from 'moment';
import {fnSerializeCode} from "../../helpers";
import { cache_obj } from '../../cache_obj';
import {input_mask} from "../../helpers";
import {isDigit} from "../../helpers";
import settings from 'settings';


@inject(DialogService, obj_personnel, toastr, cache_obj)
export class group {
	constructor(dialogService, obj_personnel, toastr, cache_obj){
		this.obj_personnel = obj_personnel;
		this.dialogService = dialogService;
		this.cache_obj = cache_obj;
		this.obj_personnel.USER = this.cache_obj.USER;
	}

	clickTab_group(index)
	{
		if(this.obj_personnel.global_indiv_id.length===0)
			return;
		switch(index){
			case 0: 
				toastr.clear();
				toastr.info("Loading employee info...", "");
				// this.loadData(this.obj_personnel.global_indiv_id);
				this.obj_personnel.OBSERVERS.group_dialog.forEach((delegate)=>{
					delegate(this.obj_personnel.global_indiv_id);
				});
				break;
			case 1:	//load Contact list.
				toastr.clear();
				toastr.info("Loading contact list...", "");
				this.obj_personnel.OBSERVERS.maintab_contact_clicked.forEach((delegate)=>{
					delegate(this.obj_personnel.global_indiv_id);
				});
				break;
			case 2: //load Educational Achievement.
				toastr.clear();
				toastr.info("Loading Educational Achievement...", "");
				this.obj_personnel.OBSERVERS.maintab_education_clicked.forEach((delegate)=>{
					delegate(this.obj_personnel.global_indiv_id);
				});
				break;
			case 3: //load Characteristic/Interest.
				toastr.clear();
				toastr.info("Loading Characteristic/Interest...", "");				
				break;
			case 4: //load Skills/Talent.
				toastr.clear();
				toastr.info("Loading Skills/Talent...", "");
				this.obj_personnel.OBSERVERS.maintab_skills_clicked.forEach((delegate)=>{
					delegate(this.obj_personnel.global_indiv_id);
				});
				break;
			case 5: //load Language/Dialect.
				toastr.clear();
				toastr.info("Loading Language/Dialect...", "");
				this.obj_personnel.OBSERVERS.maintab_language_clicked.forEach((delegate)=>{
					delegate(this.obj_personnel.global_indiv_id);
				});
				break;			
		}
	}
}