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
		this.obj_personnel.OBSERVERS.ppid_dialog.push((all)=>{				
			this.CloseSearch(all);
		});
	}
	
	CloseSearch(global_id)
	{		
		//alert("awards:"+global_id);
	}
}