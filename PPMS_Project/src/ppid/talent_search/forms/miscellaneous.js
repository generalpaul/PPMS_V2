import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {DialogService} from 'aurelia-dialog';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';

@inject(DialogService, obj_personnel, toastr)
export class miscellaneous
{
	obj_personnel = null;
	constructor(dialogService, obj_personnel, toastr){
		this.dialogService = dialogService;
		this.obj_personnel = obj_personnel;
		this.obj_personnel.OBSERVERS.ppid_dialog.push((all)=>{				
			this.CloseSearch(all);
		});	
	}
	
	CloseSearch(global_id){		
		//alert("miscellaneous:"+global_id);
	}
}