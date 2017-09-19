import {getLookups} from '../masterfiles';
import {MultiObserver} from 'multi-observer'; 
import {inject, ObserverLocator,bindable} from 'aurelia-framework';
import _ from 'underscore';
import $ from 'jquery';
//import {Dispatcher, handle} from 'aurelia-flux';  
import { EntityManager, EntityQuery } from '../entity-manager-factory';
import toastr from "toastr";
//import {HttpClient} from 'aurelia-http-client';
import {ModalWizard} from 'modals/modal-wizard';
import {cache_obj} from 'cache_obj';
import { DialogController, DialogService} from 'aurelia-dialog';
import settings from '../settings';
import moment from 'moment';
import { confirm_dialog } from 'modals/confirm_dialog';
import { setCookie } from '../helpers';

@inject(MultiObserver, ObserverLocator, Element, ModalWizard, cache_obj, DialogController, DialogService)
export class login {
	items = [];
	observerLocator = null;

	varFilterArray = [];
	varFilterArraySelected = [];

	//_HttpClient;
	_user_content = [];
	_content = [];
	@bindable _USER;
	_COMPANY;
	_PASSWORD;
	_ModalWizard;
    _cache_obj;
    _companies=[];
    _users = [];
    _USER_PROFILE_MSTR = [];
    user_expired = false;
    disableLogButton = false;
    dialogService;
    constructor(multiObserver, observerLocator, Element, ModalWizard, cache_obj, controller, DialogService) 
    {
        
     
        this.dialogService = DialogService;
        this.controller = controller;
        //controller.settings.lock = true;
		this._ModalWizard=ModalWizard;

		this._cache_obj=cache_obj;
		//httpClient.configure(config => {
		//	config
  //              .withBaseUrl(settings.actualCostWebUrl+'/search/')
		//		//.withHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
		//});

		//this._HttpClient = httpClient;

		////this._HttpClient.post("get_users").then(response => {
		////	this._content = JSON.parse(response.content);
  ////      });

		
        var varGetUserRole = EntityQuery().from('USER_ROLE_TRX').orderBy("USER_ID");

        EntityManager().executeQuery(varGetUserRole).then((found) => {
        	this._user_content.push({});

            found.results.forEach((all) => {
              
			if(all.ROLE_CD==null || all.ROLE_CD==undefined)
			{
				this._user_content.push(all);
			}
            else if (all.ROLE_CD.includes('ACCESSALL') || all.ROLE_CD.includes('PPFCS'))
			{
				this._user_content.push(all);
			}

		});
        });



        EntityManager().executeQuery(EntityQuery().from('COMPANY_MSTR').orderBy("COMPANY_NAME")).then((found) => {
            this._companies.push({ COMPANY_ID: 0, COMPANY_NAME: "" });
            found.results.forEach((all) => {
                this._companies.push({ COMPANY_ID: all.COMPANY_ID, COMPANY_NAME: all.COMPANY_NAME });
            });
        });


		this._cache_obj.OBSERVERS.clear_log.push(() => {
			this.ClearLogin();
		});

		this._cache_obj.OBSERVERS.clear_login_modal.push(() => {
			this.ClearSearch();
		});

        EntityManager().executeQuery(EntityQuery().from('USER_PROFILE_MSTR')).then((found) => {
            this._USER_PROFILE_MSTR=found.results;
        });

        //$.ajax({
        //    type: 'get',
        //    url: settings.serviceNameBase + "/UserAccess/Check_User",
        //    data: {
        //        "USER_ID": "KARRENA",
        //        "COMPANY_ID": 1,
        //        "PASSWORD": "12345678",
        //        "UPDATE_EXPIRED": false
        //    },
        //    xhrFields: {
        //        withCredentials: true
        //    },
        //         success: function () { alert("Success"); },
        //    error: function () { alert('Failed!'); }
        //});

        //$.post(settings.serviceNameBase + "/UserAccess/Check_User", {
        //    "USER_ID": "KARRENA",
        //    "COMPANY_ID": 1,
        //    "PASSWORD": "12345678",
        //    "UPDATE_EXPIRED": false
        //}).done((response) => {
        //    console.log(response);
        //    this.loginSuccess(response)//,this._dispatcher
        //    this._ModalWizard.ids.pop();
        //});

        //$.ajax({

        //    url: settings.serviceNameBase + "/UserAccess/Check_User",
        //    data: {
        //    "USER_ID": "KARRENA",
        //    "COMPANY_ID": 1,
        //    "PASSWORD": "12345678",
        //    "UPDATE_EXPIRED": false},
        //    type: 'GET',
        //    crossDomain: true,
        //    dataType: 'jsonp',
        //    success: function () { alert("Success"); },
        //    error: function () { alert('Failed!'); }
        //    //beforeSend: xhr.setRequestHeader('Authorization', token)
        //});

       /* $.ajax({
            type: "GET",
            dataType: 'jsonp',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
            "USER_ID": "KARRENA",
            "COMPANY_ID": 1,
            "PASSWORD": "12345678",
            "UPDATE_EXPIRED": false},
            url: settings.serviceNameBase + "/UserAccess/Check_User",
            success: function (data) {
                alert(9);
            }
        });*/
	}

	keyPressed($event)
	{
		if ($event.which === 13) {
			this.tryLogin();
		}
	}


	tryLogin() 
    {
        //$.ajax({
        //    type: "POST",
        //    url: "http://localhost:30313/home/Check_User",
        //    jsonp: "callback",
        //    success: (response) => {
        //    this.loginSuccess(response)//,this._dispatcher
        //    this._ModalWizard.ids.pop();
        //    },
        //    dataType: "jsonp"
        //});

      //  window.open("http://localhost:30313/home/Utilization_Type_A", "1");
        
        this.disableLogButton = true;

        if (this._PASSWORD === undefined || _.isEmpty(this._PASSWORD) || this._USER.USER_ID === undefined || _.isEmpty(this._USER.USER_ID)) 
        {
            toastr.error("USER ID/PASSWORD cannot be empty.", "Change Password");
            this.disableLogButton = false;
            return;
        }
        else if (this._PASSWORD.length != 8)
        {
            toastr.error("Invalid Password, must be 8 characters long.", "Change Password");
            this.disableLogButton = false;
            return;
        }

        //_NEW_PASSWORD
        if (this.user_expired)
        {
            if (this._PASSWORD == this._NEW_PASSWORD)
            {
                toastr.error("New password cannot be similar with current.", "Password");
                this.disableLogButton = false;
                return;
            }
            else if (this._NEW_PASSWORD === undefined || _.isEmpty(this._NEW_PASSWORD) || this._NEW_PASSWORD.length != 8) 
            {
                toastr.error("Invalid Password, must be 8 characters long.", "Change Password");
                this.disableLogButton = false;
                return;
            }
               
        }

        settings.isNavigating = true;
        toastr.info("Please wait..", "Authentication", { timeOut: 30000});
       
        if (this.user_expired) {
            $.post(settings.serviceNameBase + "/useraccess/Set_Password", {
                "USER_ID": this._USER.USER_ID,
                "COMPANY_ID": this._COMPANY.COMPANY_ID,
                "PASSWORD": this._PASSWORD,
                "NEWPASSWORD": this._NEW_PASSWORD,
                "HASH": ""
            }).done((response) => {
                toastr.clear();
                if (response == "" || response == "false") {
                    toastr.error("Problem Occured", "Change Password");
                    this.disableLogButton = false;
                }
                else if (response == "duplicate") {
                    toastr.error("Password cannot be same as your current.", "Change Password");
                    this.disableLogButton = false;
                }
                else {
                  
                    toastr.success("Password successfully saved and e-mailed to you.", "Change Password");
                    this._PASSWORD = this._NEW_PASSWORD;
                    this.fnCheckUser();
                }
                settings.isNavigating = false;
            });
        }
        else
        {
         
            this.fnCheckUser();
        }
            
      
       
    }

    fnCheckUser()
    {

        settings.isNavigating = false;
        toastr.clear();
        //$.ajax({
        //    dataType: "json",
        //    type: "GET",
        //    url: settings.serviceNameBase + "/UserAccess/Check_User",
        //    success: function (result) {
        //        console.log(result);
        //    }
        //});

        $.post(settings.serviceNameBase + "/UserAccess/Check_User", {
            "USER_ID": this._USER.USER_ID,
            "COMPANY_ID": this._COMPANY.COMPANY_ID,
            "PASSWORD": this._PASSWORD,
            "UPDATE_EXPIRED": false
        }).done((response) => {
            //console.log(response);
            this.loginSuccess(response)//,this._dispatcher
            this._ModalWizard.ids.pop();
        });
    }

	loginSuccess(response, CALLER)
	{
        //console.log(response);
		if (response == "") {
            toastr.error("USER ID Not found", "Searching USER..");
            this.disableLogButton = false;
            return;
		} else {
            toastr.success("Welcome.. " + response.USER_ID, "User Found");
          
            var varUserAtt = response;//JSON.parse(response);
            varUserAtt.ROLE_CD = this._USER.ROLE_CD;
            
            this.controller.ok(varUserAtt);

            this._cache_obj.USER = varUserAtt;
            
			this._cache_obj.ALLOW_PASS_CONFIDENTIAL = false;
          
			var checkRole = EntityQuery().from('MODULE_ACCESS_TRX').where("ROLE_CD", "==", this._USER.ROLE_CD)
				.select('ROLE_CD,MODULE_MSTR.MODULE_NAME,ACCESS_FL')
				.expand('MODULE_MSTR');
            
			EntityManager().executeQuery(checkRole).then((success) => 
			{
				success.results.forEach((all) => {
					if (all.ROLE_CD == this._USER.ROLE_CD) {

						if (all.MODULE_MSTR.MODULE_NAME.includes("CONCEAL") && all.ACCESS_FL == "1") {
							this._cache_obj.ALLOW_PASS_CONFIDENTIAL = true;
						}
					}
				});
            });

         
            $.post(settings.serviceNameBase + "/UserAccess/User_Access", {
                "USER_ID": this._USER.USER_ID,
                "HASH": this._USER.HASH
            }).done((response) => {
                this._cache_obj._ACCESS = response;
                });


		}
	}

	ClearLogin()
	{
		this._USER="";
		this._COMPANY="";
		this._PASSWORD="";

        this._cache_obj.USER = {};
        this._cache_obj._ACCESS = {};
	}		

	//@handle('clear.login.modal')
	ClearSearch()
	{
		this._USER="";
		this._COMPANY=null;
		this._PASSWORD="";
    }

    resetPassword() {
     
        if (_.isUndefined(this._USER.USER_ID) || _.isNull(this._USER.USER_ID) || this._USER.USER_ID.trim().length === 0
            || _.isUndefined(this._COMPANY.COMPANY_ID) || _.isNull(this._COMPANY.COMPANY_ID)) {
            toastr.error("Invalid USER/COMPANY", "Reset Password");
            return;
        }

        this.dialogService.open({ viewModel: confirm_dialog, model: 'Reset Password?' }).whenClosed(response => {
            if (!response.wasCancelled) {

                toastr.info("Please wait..", "Resetting Password");
                settings.isNavigating = true;
                $.post(settings.serviceNameBase + "/UserAccess/Reset_Password", {
                    "USER_ID": this._USER.USER_ID,
                    "COMPANY_ID": this._COMPANY.COMPANY_ID
                }).done((response) => {
                    settings.isNavigating = false;
                    if (response == "false") {
                        toastr.error("Error saving new password.", "Reset Password");
                    } else {
                        toastr.success("Password has been reset and emailed to you.", "Reset Password");

                        if (this.user_expired)
                            setTimeout(() => { location.reload(); }, 3000);
                    }
                });
            }
        });

       
    }

    _USERChanged()
    {
        if ((_.isUndefined(this._USER.USER_ID) || _.isNull(this._USER.USER_ID) || this._USER.USER_ID.trim().length === 0))
        { }
        else
        {
            var varFound = this._USER_PROFILE_MSTR.find((all) => all.USER_ID == this._USER.USER_ID);
            if (!_.isUndefined(varFound.EXPIRE_DT) && !_.isNull(varFound.EXPIRE_DT))
            {
                //console.clear();
                
                var varDateCompare = new Date(moment(new Date(varFound.EXPIRE_DT)));
                if (varDateCompare < new Date())
                {
                    if (!this.user_expired)
                        this.user_expired = true;
                }
                else
                    this.user_expired = false;
            }
            else
            {
                toastr.error("Please call administrator.", "ACCOUNT EXPIRY PROBLEM.");
            }
            
        }
    }

}
