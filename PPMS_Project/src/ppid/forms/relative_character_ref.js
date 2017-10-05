import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {DialogService} from 'aurelia-dialog';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';

@inject(DialogService, obj_personnel, toastr)
export class relative_character_ref
{
	obj_personnel = null;
	_tab0_loaded = false;	
	constructor(dialogService, obj_personnel, toastr){
		this.dialogService = dialogService;
		this.obj_personnel = obj_personnel;
		//this.obj_personnel.OBSERVERS.ppid_dialog.push((all)=>{				
		//	this.CloseSearch(all);
		//});
		this.obj_personnel.OBSERVERS.tab_changed.push((tab_num,global_id)=>{
			this.LoadData(tab_num, global_id);
		});
	}
	
	LoadData(tab_num, global_id)
	{		
		if(tab_num!=1 || global_id==null || global_id.length==0 || this._tab0_loaded)
			return;
		//alert('relative:'+global_id);
		toastr.success(Success,'Loading relative data...');
		var _query = EntityQuery().from('RELATIVE_TRX')
					.where('GLOBAL_INDIV_ID', '==', global_id);
		EntityManager().executeQuery(_query).then((Success)=>{
			toastr.clear();
			toastr.success(Success,'Loading relative data...');
			this._tab0_loaded = true;
		},
		(failed)=>{
			this._tab0_loaded=false; //for testing purpose.			
			toastr.error(failed,'Error in data retrieval for relative.');
		});
	}
	
	
}