import { inject } from 'aurelia-framework';
import { computedFrom, customElement } from 'aurelia-framework';
import { cache_obj } from 'cache_obj';
import { initializeBreeze } from './entity-manager-factory';
import { loadMasterfiles, loadTables, loadLookups, getLookups } from './masterfiles';
import toastr from "toastr";
import { DialogService } from 'aurelia-dialog';
// import  jquery from "jquery";
import { generateID } from './entity-manager-factory';
//import {handle, Dispatcher} from 'aurelia-flux';  
import { checkCookie, setCookie, removeCookie, getCookie } from './helpers';
//import { MultiObserver } from 'multi-observer';
import settings from './settings';
import { Router } from 'aurelia-router';
import _ from 'underscore';
@inject(toastr, cache_obj, DialogService, Router) //MultiObserver
export class mainpage {


    _toastr = null;
    _cache_obj;
    
    router;
    budgetAccess=false;
    actualAccess = false;
    talentgroupAccess = false;
    buhAccess = false;
    headerVisible = false;
    constructor(toastr, cache_obj, dialogService, Router) { //multiObserver
        
        this._cache_obj = cache_obj;
        this.router = Router;

        setTimeout(() => {
           
            
            if (this._cache_obj.USER.ROLE_CD !== undefined)
            {
                //console.log(this._cache_obj.USER.ROLE_CD);
                if (this._cache_obj.USER.ROLE_CD.includes('ACCESSALL')) {
                    this.budgetAccess = true;
                    this.talentgroupAccess = true;
                    this.buhAccess = true;
                    this.actualAccess = true;
                    this.headerVisible = true;
                }
                
                if (_.isEmpty(this._cache_obj._ACCESS))
                {
                  $.post(settings.serviceNameBase + "/UserAccess/User_Access", {
                      "USER_ID": this._cache_obj.USER.USER_ID,
                      "HASH": this._cache_obj.USER.HASH
                  }).done((response) => {
                      this._cache_obj._ACCESS = response;
                      this.fnCheckAccess();
                  });
                }
                else
                {
                    this.fnCheckAccess();
                }

                //else if (this._cache_obj.USER.ROLE_CD.includes('HR'))
                //{
                //    //this.budgetAccess = true;
                //    this.router.navigateToRoute('mainview');
                //}
                //else if (this._cache_obj.USER.ROLE_CD.includes('PPFCS')) {
                //    this.router.navigateToRoute('actual_cost'); return;
                //    //this.actualAccess = true;
                //    this.headerVisible = true;
                //}
                
            }
            
        }, 1000);
        

        //if (this._cache_obj.OBSERVERS.loggedout.length==0)
        //this._cache_obj.OBSERVERS.loggedout.push(() => {
        //    this.logout();
        //});

        //if (this._cache_obj.OBSERVERS.loginPage.length == 0)
        //    this._cache_obj.OBSERVERS.loginPage.push(() => {
        //    //    alert(1);
        //    this.fnLogin();
        //});

       

        //initializeBreeze().then(() => {
        //    //have to set timeout because of IE, other templates are not loading
        //    // quickly and loading at same time with functions
        //    setTimeout(() => {

        //        var varCheckUser = checkCookie("PPMS_USER");
        //      //  console.log(varCheckUser);
        //        if (varCheckUser == "" || varCheckUser == undefined || varCheckUser.indexOf('undefined') >= 0 || varCheckUser.split('^')[0] == "") {
        //           // alert(0);
        //            this.fnLogin();
        //            this.loginDisabled = false;
        //            this.logoutDisabled = true;
        //            return;
        //        }

        //        this.fnInitMasterfiles(0, "");


        //    }, 2000);
        //});

     


        //this._cache_obj.OBSERVERS.logoutPage.push(() => {
        //    this.logout();
        //});

       
    }

    fnCheckAccess()
    {
        
        var filterMenu = ['PROGRAM BUDGET TEMPLATE', 'ACTUALS COST PROCESSING'];
        var varFound = this._cache_obj._ACCESS.APPLICATION.filter(all => filterMenu.includes(all.APPLICATION_DESC));
        if (varFound.length == 1)
        {
            if (varFound == 'PROGRAM BUDGET TEMPLATE')
                this.router.navigateToRoute('mainview');
            else
                this.router.navigateToRoute('actual_cost');
        }
        else
        {
            this.budgetAccess = true;
            this.talentgroupAccess = true;
            this.buhAccess = true;
            this.actualAccess = true;
            this.headerVisible = true;
        }
    }

    navigateTo(title)
    {
        //console.log(title);
        this.router.navigateToRoute(title);
    }

    //fnInitMasterfiles(initType, output) {

    //    if (this.masterFilesLoaded == false) {

    //        this._toastr = toastr;
    //        toastr.clear();
    //        toastr.info("Masterfiles...", "Loading please wait..", { timeOut: 15000 });
    //        this.loginDisabled = true;
    //        loadMasterfiles().then(() => {
    //            loadLookups().then(() => {

    //                this._cache_obj.OBSERVERS.init_modal.forEach((all) => {
    //                    all();
    //                });



    //                this.masterFilesLoaded = true;

    //                this.fnPassUserObject(initType, output);

    //            });
    //        });
    //    }
    //    else {
    //        this.fnPassUserObject(initType, output);
    //    }

    //}

    //fnPassUserObject(initType, output) {
    //  //  console.log(initType);
    //    if (initType == 1) {


    //    } else {
    //        var varCookie = checkCookie("PPMS_USER");
    //       // console.log(varCookie)
    //        var varSplitCookie = varCookie.split('^');
    //        this._user = {
    //            USER_ID: varSplitCookie[0],
    //            COMPANY_ID: varSplitCookie[1],
    //            Is_HR: varSplitCookie[2],
    //            Is_Branch: varSplitCookie[3],
    //            EMPLOYEE_ID: varSplitCookie[4],
    //            HASH: varSplitCookie[5],
    //            EMAIL_ADDRESS: varSplitCookie[6],
    //        };

    //        this._cache_obj.USER = this._user;
    //        console.log(this._cache_obj.USER);
    //        this._cache_obj.OBSERVERS.login_passed.forEach((all) => {
    //            all(this._user);
    //        });

    //        this.loginDisabled = true;
    //        this.logoutDisabled = false;
    //        this.showingLogout = "visible";
    //        toastr.clear();
    //        toastr.success("Let's Start...", "Success");
    //        this.showMenus = true;
    //        return;
    //    }

    //    this.LoginPassed(output);
    //    this._cache_obj.OBSERVERS.login_passed.forEach((all) => {
    //        all(output);
    //    });
    //}


    //// @handle('login.passed')
    //LoginPassed(user) {

    //    this._user = user;
    //   // console.log(user);
    //    // total 6 hours
    //    //setCookie("PPMS_USER", user.USER_ID + "^" + user.COMPANY_ID + "^" + user.Is_HR + "^" + user.Is_Branch, 30);
    //    setCookie("PPMS_USER", user.USER_ID + "^" + user.COMPANY_ID + "^" + user.Is_HR + "^"
    //        + user.Is_Branch + "^" + user.EMPLOYEE_ID + "^" + user.HASH + "^" + user.EMAIL_ADDRESS, 30);

        
    //    toastr.clear();
    //    toastr.success("Let's Start...", "Success");

    //    this.showMenus = true;
    //    // this._cache_obj.OBSERVERS.close_modal.forEach((all) => {
    //    //   all(this.modalLogin.id);
    //    // });

    //    this.loginDisabled = true;
    //    this.logoutDisabled = false;
    //    // this._cache_obj.OBSERVERS.enable_modal_button.forEach((all) => {
    //    //   all(this.modalLogin.id, false);
    //    // });


    //    this.showingLogout = "visible";

    //}

    //logout() {
    //    this.showMenus = false;
      
    //    // this._cache_obj.OBSERVERS.open_modal.forEach((all) => {
    //    //   all(this.modalLogin.id, true);
    //    // });
    
    //    this.fnLogin();
    //    // this._cache_obj.OBSERVERS.enable_modal_button.forEach((all) => {
    //    //   all(this.modalLogin.id, true);
    //    // });

    //    //this._cache_obj.OBSERVERS.loggedout.forEach((all) => {
    //    //    all();
    //    //});

    //    this._cache_obj.OBSERVERS.clear_log.forEach((all) => {
    //        all();
    //    });

    //    this._cache_obj.USER = {};
    //    removeCookie();
    //    this.showingLogout = "hidden";

    //}


    //fnLogin() {
    //    this.showMenus = false;
    //    this.dialogService.open({
    //        viewModel: login
    //    }).whenClosed(response => {
    //        //response.closeResult((result) => {
    //        //    console.log(result);
    //        //});

    //        if (!response.wasCancelled) {
    //            this.fnInitMasterfiles(1, response.output);
    //        } else {

    //        }
    //    });
    //}
}