import {bindable} from 'aurelia-framework';
import { cache_obj } from 'cache_obj';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { checkCookie, setCookie, removeCookie, getCookie } from './helpers';
import { initializeBreeze } from './entity-manager-factory';
import toastr from "toastr";
import { login } from 'modals/login';
import { change_password } from 'modals/change_password';
import { DialogService } from 'aurelia-dialog';
import { loadMasterfiles, loadTables, loadLookups, getLookups } from './masterfiles';
import settings from './settings';
import breeze from 'breeze-client';

@inject(cache_obj, Router, DialogService)
export class NavBar {
    @bindable router = null;
    _cache_obj;
    router;
    masterFilesLoaded = false;
    constructor(cache_obj, Router, DialogService)
    {
        this.router = Router;
        this._cache_obj = cache_obj;

        this.dialogService = DialogService;
        this.settings = settings;

        //initializeBreeze().then(() => {
        //    //have to set timeout because of IE, other templates are not loading
        //    // quickly and loading at same time with functions
        //    setTimeout(() => {

        //        var varCheckUser = checkCookie("PPMS_USER");

        //        if (this.router.currentInstruction.config.name != "mainpage" && (varCheckUser == "" || varCheckUser == undefined || varCheckUser.indexOf('undefined') >= 0 || varCheckUser.split('^')[0] == "")) {
        //            this.router.navigateToRoute('mainpage');
        //        }
        //        else {
        //            var varCookie = checkCookie("PPMS_USER");
        //            var varSplitCookie = varCookie.split('^');
        //            var _user = {
        //                USER_ID: varSplitCookie[0],
        //                COMPANY_ID: varSplitCookie[1],
        //                Is_HR: varSplitCookie[2],
        //                Is_Branch: varSplitCookie[3],
        //                EMPLOYEE_ID: varSplitCookie[4],
        //                HASH: varSplitCookie[5],
        //                EMAIL_ADDRESS: varSplitCookie[6],
        //            };

        //            this._cache_obj.USER = _user;
        //        }

        //    }, 2000);
        //});


  var oldClient = OData.defaultHttpClient;

    var myClient = {
         request:  (request, success, error)=> {

             if(this._cache_obj!=undefined)
             if(this._cache_obj.USER!=undefined)
             request.headers.Authorization = "Basic "+btoa(this._cache_obj.USER.USER_ID+':'+this._cache_obj.USER.HASH);
             return oldClient.request(request, success, error);
         }
    };

    OData.defaultHttpClient = myClient;

       initializeBreeze().then(() => {
            //have to set timeout because of IE, other templates are not loading
            // quickly and loading at same time with functions
            setTimeout(() => {
                this.router.navigateToRoute('blankpage');
                var varCheckUser = checkCookie("PPMS_USER");
                //console.log(varCheckUser);
                //this.router.currentInstruction.config.name != "blankpage" &&
                if ((varCheckUser == "" || varCheckUser == undefined || varCheckUser.indexOf('undefined') >= 0 || varCheckUser.split('^')[0] == "")) {
                    this.fnLogin();
                    return;
                }
                else {
                    var varCookie = checkCookie("PPMS_USER");
                    var varSplitCookie = varCookie.split('^');
                    var _user = {
                        USER_ID: varSplitCookie[0],
                        COMPANY_ID: varSplitCookie[1],
                        Is_HR: varSplitCookie[2],
                        Is_Branch: varSplitCookie[3],
                        EMPLOYEE_ID: varSplitCookie[4],
                        HASH: varSplitCookie[5],
                        EMAIL_ADDRESS: varSplitCookie[6],
                    };

                    this._cache_obj.USER = _user;


                    // var oldClient = OData.defaultHttpClient;


                    // var newClient = {
                    //      request: function (request, success, error) {
                    //          request.headers.Authorization = "Basic "+btoa(varSplitCookie[0]+':'+varSplitCookie[5]);
                    //          return oldClient.request(request, success, error);
                    //      }
                    // };

                    // OData.defaultHttpClient = newClient;

                }

                this.fnInitMasterfiles(0, "");


            }, 2000);
        });

    }

    fnInitMasterfiles(initType, output) {

        if (this.masterFilesLoaded == false) {
            settings.isNavigating = true;
            this._toastr = toastr;
            toastr.clear();
            toastr.info("Masterfiles...", "Loading please wait..", { timeOut: 15000 });

            loadMasterfiles().then(() => {
                loadLookups().then(() => {

                    //this._cache_obj.OBSERVERS.init_modal.forEach((all) => {
                    //    all();
                    //});



                    this.masterFilesLoaded = true;

                    this.fnPassUserObject(initType, output);

                });
            });
        }
        else {
            this.fnPassUserObject(initType, output);
        }

    }



    fnPassUserObject(initType, output) {

        if (initType == 1) {


        } else {
            var varCookie = checkCookie("PPMS_USER");



            var varSplitCookie = varCookie.split('^');
            this._user = {
                USER_ID: varSplitCookie[0],
                COMPANY_ID: varSplitCookie[1],
                Is_HR: varSplitCookie[2],
                Is_Branch: varSplitCookie[3],
                EMPLOYEE_ID: varSplitCookie[4],
                HASH: varSplitCookie[5],
                EMAIL_ADDRESS: varSplitCookie[6],
                ROLE_CD: varSplitCookie[7],
                LEVEL_NO: varSplitCookie[8]
            };

            this._cache_obj.USER = this._user;

            toastr.clear();
            toastr.success("Let's Start...", "Success");
            settings.isNavigating = false;
            if (this.router.currentInstruction.config.name == "blankpage")
            {
                this.router.navigateToRoute('mainpage');
            }



            return;
        }

        this.LoginPassed(output);

    }


    // @handle('login.passed')
    LoginPassed(user) {

        this._user = user;
        //console.log(user);
        setCookie("PPMS_USER", user.USER_ID + "^" + user.COMPANY_ID + "^" + user.Is_HR + "^"
            + user.Is_Branch + "^" + user.EMPLOYEE_ID + "^" + user.HASH + "^" + user.EMAIL_ADDRESS + "^" + user.ROLE_CD + "^" + user.LEVEL_NO, 30);
        settings.isNavigating = false;



      //  console.log(checkCookie("PPMS_USER"));
        toastr.clear();
        toastr.success("Let's Start...", "Success");

        if (this.router.currentInstruction.config.name == "blankpage") {
            this.router.navigateToRoute('mainpage');
        }
    }

    logout() {

        if (this.router.currentInstruction.config.name != "blankpage")
            this.router.navigateToRoute('blankpage');
        else
            this._cache_obj.OBSERVERS.loggedout.forEach((all) => {
                all();
            });

        this._cache_obj.OBSERVERS.clear_log.forEach((all) => {
            all();
        });

        this._cache_obj.USER = {};
        this._cache_obj._ACCESS = {};


        removeCookie();

        this.fnLogin();


    }


    home()
    {
        this.router.navigateToRoute('mainpage');
    }



    fnLogin() {

        if (this.dialogService.controllers.length > 0) {
            for (var i = this.dialogService.controllers.length - 1; i >= 0; i--) {
                this.dialogService.controllers[i].close();
            }
        }


        this.dialogService.open({
            viewModel: login, keyboard: false, overlayDismiss: false, lock:true
        }).whenClosed(response => {

            if (!response.wasCancelled) {
                this.fnInitMasterfiles(1, response.output);
            } else {
                toastr.clear();
                toastr.info("Please Login...", "You cannot continue ..", { timeOut: 15000 });
                this.fnLogin();
            }
        });
    }

    changePassword()
    {
        this.dialogService.open({
            viewModel: change_password
        }).whenClosed(response => {

            if (!response.wasCancelled) {

            } else {

            }
        });
    }

}
