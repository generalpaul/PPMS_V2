
import {MultiObserver} from 'multi-observer'; 
import {inject, ObserverLocator,bindable} from 'aurelia-framework';
import _ from 'underscore';
import $ from 'jquery';

import {EntityManager, EntityQuery} from '../entity-manager-factory';
import toastr from "toastr";
//import {HttpClient} from 'aurelia-http-client';
import {cache_obj} from 'cache_obj';
import { DialogController } from 'aurelia-dialog';
import settings from '../settings';

@inject(MultiObserver, ObserverLocator, Element, cache_obj,DialogController)
export class change_password {
	items = [];
	observerLocator = null;

	//_HttpClient;

	_USER;
	_COMPANY;
	_PASSWORD;

    _cache_obj;
    _NEW_PASSWORD;

	constructor(multiObserver, observerLocator, Element, cache_obj,controller) 
	{
		this.controller=controller;
		this._cache_obj=cache_obj;
	}

    keyPressed($event) {
        if ($event.which === 13) {
            this.savePassword();
        }
    }


    savePassword() 
    {
        
        if (this._NEW_PASSWORD === undefined || _.isEmpty(this._NEW_PASSWORD) || this._NEW_PASSWORD.length!=8) {
            toastr.error("Invalid Password, must be 8 characters long.", "Change Password");
            return;
        }
        settings.isNavigating = true;
        toastr.info("Please wait..", "Saving Password");
        
        $.post(settings.serviceNameBase +"/useraccess/Set_Password", {
            "USER_ID": this._cache_obj.USER.USER_ID,
            "COMPANY_ID": this._cache_obj.USER.COMPANY_ID,
            "Password": this._NEW_PASSWORD,
            "HASH": this._cache_obj.USER.HASH
        }).done((response) => {
            settings.isNavigating = false;
            toastr.clear();
            if (response == "" || response == "false") {
                toastr.error("Problem Occured", "Change Password");
            }
            else if (response == "duplicate") {
                toastr.error("Password cannot be same as your current.", "Change Password");
            } 
            else {
                toastr.success("Password successfully saved and e-mailed to you.", "Change Password");
                this.controller.ok("");
            }
        });
	}


}
