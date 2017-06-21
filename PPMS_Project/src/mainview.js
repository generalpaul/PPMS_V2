import {inject} from 'aurelia-framework';
import {computedFrom,customElement} from 'aurelia-framework';
import {  objBudget } from 'objBudget';
import {initializeBreeze} from './entity-manager-factory';
import {loadMasterfiles, loadTables, loadLookups, getLookups} from './masterfiles';
import toastr from "toastr";
import {DialogService} from 'aurelia-dialog';
// import  jquery from "jquery";
import {generateID} from './entity-manager-factory';
//import {handle, Dispatcher} from 'aurelia-flux';  
import {checkCookie,setCookie,removeCookie} from './helpers';
import { MultiObserver }from 'multi-observer';
import { login } from 'modals/login';
import { Router } from 'aurelia-router';
import { EntityManager, EntityQuery } from './entity-manager-factory';

//@customElement('main-header')
@inject(toastr, objBudget, MultiObserver, DialogService, Router)
export class mainview {


  router;
  _toastr = null;
  //_dispatcher;
  showingLogout="hidden";
  _objBudget;
  dialogService=null;
  loginDisabled=true;
  logoutDisabled=false;
  masterFilesLoaded=false;
  constructor(toastr, objBudget, multiObserver, dialogService, Router) {
    //this.fnExecuteDatePicker();
    //console.log(elem);
    this._objBudget=objBudget;
    this.router = Router;

    if (EntityManager() === undefined) {
        this.router.navigateToRoute('mainpage');
        return;
    }

    // multiObserver.observe(
    //   [
    //     [this._objBudget.CALLER, 'ACTION'],[this._objBudget.CALLER, 'ACTION_CALLER']
    //   ], (newValue, oldValue) => {

    //     if (this._objBudget.CALLER.ACTION == '')
    //       return;
        
    //     if(this._objBudget.CALLER.ACTION=='login.passed')
    //     {
    //         this.LoginPassed(this._objBudget.CALLER.ACTION,this._objBudget.CALLER.VALUE1);
    //     }
    //     else
    //     {
    //       return;
    //     }

    //     //this._objBudget.CALLER.ACTION='';
    //   });


    // this._objBudget.OBSERVERS.login_passed.push((val) => {
    //   this.LoginPassed(val);
    // });

    
    // this.modalLogin = {
    //   title: 'LOG-IN',
    //   content: 'modals/login',
    //   value: "",
    //   id: generateID(),
    //   buttonTitle: "LOG-IN",
    //   width:500
    // };

    //$('.datepicker').datepicker();

    //this._dispatcher = Dispatcher;
      
    //this.fnPassUserObject(0, "");
    
    //initializeBreeze().then(() => {
    //  //have to set timeout because of IE, other templates are not loading
    //  // quickly and loading at same time with functions
    //  setTimeout(() => {
        
    //    if (checkCookie("PPMS_USER") == "" || checkCookie("PPMS_USER")==undefined || checkCookie("PPMS_USER").indexOf('undefined')>=0)
    //    {
    //        this.fnLogin();
    //        this.loginDisabled=false;
    //        this.logoutDisabled=true;
    //        return;
    //    }
        
    //    this.fnInitMasterfiles(0,"");


    //  }, 2000);
    //});

      // $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
      //         if($(e.target)[0].text=="Regular")
      //         {
      //           console.log("ok");
      //         }
      //         // e.target // newly activated tab
      //         // e.relatedTarget // previous active tab
      //       });
    this.dialogService=dialogService;
    
      if(this.dialogService.controllers.length>0)
      {
        for (var i = this.dialogService.controllers.length - 1; i >= 0; i--) {
          this.dialogService.controllers[i].close();
        }
      }

  }

//  fnInitMasterfiles(initType,output){
    
//    if(this.masterFilesLoaded==false)
//    {

//          this._toastr = toastr;
//          toastr.clear();
//          toastr.info("Masterfiles...", "Loading please wait..", { timeOut: 15000 });
//          this.loginDisabled = true;
//          loadMasterfiles().then(() => {
//                loadLookups().then(() => {

//                  this._objBudget.OBSERVERS.init_modal.forEach((all) => {
//                    all();
//                  });

               
                  
//                  this.masterFilesLoaded = true;

//                  this.fnPassUserObject(initType,output);

//                });
//            });
//    }
//    else
//    {
//        this.fnPassUserObject(initType,output);
//    }

//}

  //fnPassUserObject(initType,output){
      
  //  if (initType == 1) {
      

  //  } else {
  //    var varCookie = checkCookie("PPMS_USER");
  //    var varSplitCookie = varCookie.split('^');
  //    this._user = {
  //      USER_ID: varSplitCookie[0],
  //      COMPANY_ID: varSplitCookie[1],
  //      Is_HR: varSplitCookie[2],
  //      Is_Branch: varSplitCookie[0]
  //    };

  //    this._objBudget.USER = this._user;

  //    this._objBudget.OBSERVERS.login_passed.forEach((all) => {
  //      all(this._user);
  //    });

  //    this.loginDisabled = true;
  //    this.logoutDisabled = false;
  //    this.showingLogout = "visible";
  //    toastr.clear();
  //    toastr.success("Let's Start...", "Success");
  //    return;
  //  }

  //  this.LoginPassed(output);
  //    this._objBudget.OBSERVERS.login_passed.forEach((all) => {
  //      all(output);
  //    });
  //}

  clickTab(index){
      if(index==0){

      }
      else if(index==1){

          this._objBudget.OBSERVERS.refreshPersonnelTab.forEach((all) => {
            all('REGULAR');
          });

          // this._objBudget.CALLER.VALUE1 = 'REGULAR';
          // this._objBudget.CALLER.ACTION = 'refreshPersonnelTab';
           //this._dispatcher.dispatch('refreshPersonnelTab','REGULAR');
      }
      else if(index==2){

         this._objBudget.OBSERVERS.refreshPersonnelTab.forEach((all) => {
            all('SEMI_REGULAR');
          });
            // this._objBudget.CALLER.VALUE1 = 'SEMI_REGULAR';
            // this._objBudget.CALLER.ACTION = 'refreshPersonnelTab';
           //this._dispatcher.dispatch('refreshPersonnelTab','SEMI_REGULAR');
      }
      else if(index==3){

          this._objBudget.OBSERVERS.refreshPersonnelTab.forEach((all) => {
            all('STAFF');
          });

            // this._objBudget.CALLER.VALUE1 = 'STAFF';
            // this._objBudget.CALLER.ACTION = 'refreshPersonnelTab';
           //this._dispatcher.dispatch('refreshPersonnelTab','STAFF');
      }
  }

   // @handle('login.passed')
    LoginPassed(user) {
 
      this._user = user; 
      // total 6 hours
      setCookie("PPMS_USER", user.USER_ID+"^"+user.COMPANY_ID+"^"+user.Is_HR+"^"+user.Is_Branch, 30);
      toastr.clear();
      toastr.success("Let's Start...", "Success");


        // this._objBudget.OBSERVERS.close_modal.forEach((all) => {
        //   all(this.modalLogin.id);
        // });

        this.loginDisabled=true;
        this.logoutDisabled=false;
        // this._objBudget.OBSERVERS.enable_modal_button.forEach((all) => {
        //   all(this.modalLogin.id, false);
        // });

    
      this.showingLogout = "visible";

    }

    logout() {
   
        this.loginDisabled=false;
        this.logoutDisabled=true;
        // this._objBudget.OBSERVERS.open_modal.forEach((all) => {
        //   all(this.modalLogin.id, true);
        // });

        this.fnLogin();
        // this._objBudget.OBSERVERS.enable_modal_button.forEach((all) => {
        //   all(this.modalLogin.id, true);
        // });

        this._objBudget.OBSERVERS.loggedout.forEach((all) => {
          all();
        });

        this._objBudget.OBSERVERS.clear_log.forEach((all) => {
          all();
        });

        //this._objBudget.OBSERVERS.logoutPage.push(() => {
        //    this.router.navigateToRoute('mainpage');
        //});

      this._objBudget.USER={};
      removeCookie();
      this.showingLogout = "hidden";

    }


    fnLogin() {
        
      this.dialogService.open({
          viewModel: login
      }).whenClosed(response => {
          //response.closeResult((result) => {
          //    console.log(result);
          //});
             
        if (!response.wasCancelled) {
           this.fnInitMasterfiles(1, response.output);
        } else {
          
        }
      });
    }
}