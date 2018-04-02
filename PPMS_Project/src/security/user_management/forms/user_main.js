import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_user} from './../obj_user';
import {DialogService} from 'aurelia-dialog';
import {EntityManager,EntityQuery} from '../../../entity-manager-factory';
import breeze from 'breeze-client';
import {user_search} from "../modals/user_search";
import moment from 'moment';
// import { cache_obj } from '../../cache_obj';
import settings from 'settings';

@inject(DialogService, obj_user, toastr)
export class user_main{
	
	obj_user = null;

	constructor(DialogService, obj_user, toastr){
		
		this.obj_user = obj_user;
		this.DialogService = DialogService;
		// this.obj_user.USER = cache_obj.USER;

	}

	fnUser(fn){

		switch(fn){
			case "EDIT": 
				this.dialogService.open({ viewModel: user_search }).whenClosed(response=>{
						if(!response.wasCancelled)
						{
							console.log(response.output);
						}else{
							console.log('search was cancelled.');
						}
				});

				break;
			case "CREATE": 
				break;
			case "CANCEL": 
				break;
			case "SAVE":
				break;
		}

	}

}