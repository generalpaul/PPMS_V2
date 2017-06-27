import {inject} from 'aurelia-framework';
import {computedFrom,customElement} from 'aurelia-framework';
import { cache_budget } from 'ppfcs/cache_budget';
import { initializeBreeze, generateID } from 'entity-manager-factory';
import { loadMasterfiles, loadTables, loadLookups, getLookups } from 'masterfiles';
import toastr from "toastr";
import {DialogService} from 'aurelia-dialog';
import { checkCookie, setCookie, removeCookie } from '../../helpers';
import { MultiObserver }from 'multi-observer';
import { login } from 'modals/login';
import { Router } from 'aurelia-router';
import { EntityManager, EntityQuery } from 'entity-manager-factory';

//@customElement('main-header')
@inject(toastr, cache_budget, MultiObserver, DialogService, Router)
export class mainview {


  router;
  _toastr = null;
  //_dispatcher;
  showingLogout="hidden";
  _cache_budget;
  dialogService=null;
  loginDisabled=true;
  logoutDisabled=false;
  masterFilesLoaded=false;
  constructor(toastr, cache_budget, multiObserver, dialogService, Router) {
    //this.fnExecuteDatePicker();
    //console.log(elem);
    this._cache_budget=cache_budget;
    this.router = Router;

    if (EntityManager() === undefined) {
        this.router.navigateToRoute('mainpage');
        return;
    }

    this.dialogService=dialogService;
    
      if(this.dialogService.controllers.length>0)
      {
        for (var i = this.dialogService.controllers.length - 1; i >= 0; i--) {
          this.dialogService.controllers[i].close();
        }
      }

  }
    
  clickTab(index){
      if(index==0){

      }
      else if(index==1){

          this._cache_budget.OBSERVERS.refreshPersonnelTab.forEach((all) => {
            all('REGULAR');
          });
          
      }
      else if(index==2){

         this._cache_budget.OBSERVERS.refreshPersonnelTab.forEach((all) => {
            all('SEMI_REGULAR');
          });
          
      }
      else if(index==3){

          this._cache_budget.OBSERVERS.refreshPersonnelTab.forEach((all) => {
            all('STAFF');
          });
          
      }
  }

   
}