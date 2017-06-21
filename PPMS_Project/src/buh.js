import {EntityManager, EntityQuery} from './entity-manager-factory';
import {checkCookie,setCookie,removeCookie} from './helpers';
import {initializeBreeze,generateID} from './entity-manager-factory';
import {loadMasterfiles, loadTables, loadLookups, getLookups} from './masterfiles';
import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {substringMatcher} from 'helpers';
import typeahead from 'typeahead';
import _ from 'underscore';
import {buhProgramDialog} from 'modals/buh-program-dialog';
import {DialogService} from 'aurelia-dialog';
import {login} from 'modals/login';
import {buhSearch} from 'modals/buh-search';
//import {handle, Dispatcher} from 'aurelia-flux';  

//import { MultiObserver }from 'multi-observer';
import {  objBudget } from 'objBudget';


@inject(objBudget,DialogService)
export class buh {
	_objBUH={PROGRAMS:[]};
	_objBudget=null;
	dialogService=null;
	loginDisabled=true;
	logoutDisabled=false;
	//_BUH_PERSONNEL_ID=0;
	masterFilesLoaded=false;
	_disableCells=true;
	_disableAdd=false;
	_disableDelete=true;
	_disableSave=true;
	_disableSearch=false;
	_disableGrid=true;
	_status="";
	_user={};
	_programs=[];
	constructor(objBudget,DialogService)
	{

		this.dialogService=DialogService;
		this._objBudget=objBudget;

			

		if(this.dialogService.controllers.length>0)
		{
			for (var i = this.dialogService.controllers.length - 1; i >= 0; i--) {
				this.dialogService.controllers[i].close();
			}
		}


				//toastr.success("Loading Programs", "Loading");

				//initializeBreeze().then(() => {	


				//	var _query = EntityQuery().from('PROGRAM_MSTR').where(breeze.Predicate.and(this.currPredicate)).select('PROGRAM_CD,PROGRAM_TITLE,PROGRAM_ID,BUH_PERSONNEL_ID');
				//	EntityManager().executeQuery(_query).then((success) => {
				//		this._programs= success.results;
				//	});	
				//      //have to set timeout because of IE, other templates are not loading
				//      // quickly and loading at same time with functions
				//      setTimeout(() => {

				//      	if (checkCookie("PPMS_USER") == "" || checkCookie("PPMS_USER")==undefined || checkCookie("PPMS_USER").indexOf('undefined')>=0)
				//      	{
				//      		this.fnLogin();
				//      		this.loginDisabled=false;
				//      		this.logoutDisabled=true;
				//      		return;
				//      	}

				//      	this.fnInitMasterfiles(0,"");


				//      }, 2000);
				//  });


    // toastr.options = {
    //   "closeButton": true,
    //   "debug": false,
    //   "positionClass": "toast-bottom-right",
    //   "onclick": null,
    //   "showDuration": "300",
    //   "hideDuration": "1000",
    //   //"timeOut": "300000",
    //   //"extendedTimeOut": "1000",
    //   "showEasing": "swing",
    //   "hideEasing": "linear",
    //   "showMethod": "fadeIn",
    //   "hideMethod": "fadeOut"
    // };

	}

	addBUH(){
		this.fnCRUD("add");
	}

	fnCRUD(value)
	{
		this._disableCells=true;
		this._disableSave=true;
		this._disableDelete=true;
		this._disableAdd=true;
		this._disableGrid=true;
		this._disableSearch=true;
		switch(value){
			case "cancel":
			{
				this._disableSearch=false;	
				this._disableAdd=false;
				this._objBUH={
					BUH_PERSONNEL_ID: 0,
					OPTIONAL_GLOBAL_ID: "",
					FIRST_NAME: "",
					MIDDLE_NAME: "",
					LAST_NAME: "",
					EMAIL_ADDRESS: "",PROGRAMS:[]};
				this._status="";	
				}
				break;
				case "search":
				{
					this.searchExistingBuh();
				}
				break;
				case "add":
				{
					this._status="add";
					this._disableCells=false;
					this._disableSave=false;
					this._objBUH={
						BUH_PERSONNEL_ID: "",
						OPTIONAL_GLOBAL_ID: "",
						FIRST_NAME: "",
						MIDDLE_NAME: "",
						LAST_NAME: "",
						EMAIL_ADDRESS: "",PROGRAMS:[]};
					}
					break;
					case "delete":
					{

						var varDelete =confirm("Delete BUH?");


						if(varDelete)
						{


							for (var i = this._objBUH.PROGRAMS.length - 1; i >= 0; i--) {
								var found = this._programs.find((all)=>all.PROGRAM_CD==this._objBUH.PROGRAMS[i].PROGRAM_CD);
								found.BUH_PERSONNEL_ID=0;
							}

							var getBUHForEdit = EntityQuery().from('BUH_PERSONNEL').where("BUH_PERSONNEL_ID","==",this._objBUH.BUH_PERSONNEL_ID);
							EntityManager().executeQuery(getBUHForEdit).then((success) => {
								success.results[0].entityAspect.setDeleted();
								EntityManager().saveChanges().then((success) => {

									toastr.success("Succesfully Saved", "Program");

								}, (fail) => {

									EntityManager().getEntities().forEach(function(entity) {
										var errors = entity.entityAspect.getValidationErrors();
										if (errors.length > 0)
											console.log(errors);
									});
									toastr.error("Error Occured", fail);
								});

								this.fnCRUD("cancel");


							});



							return;
						}
						this._disableCells=false;
						this._disableSave=false;
						this._disableDelete=false;
						this._disableAdd=false;
						this._disableGrid=false;
						this._disableSearch=false;
					}
					break;
					case "save":
					{
						this.saveBUH();
					}
					break;
				}
			}

			saveBUH()
			{
				if(this._status=="view")
				{
					var getBUHForEdit = EntityQuery().from('BUH_PERSONNEL').where("BUH_PERSONNEL_ID","==",this._objBUH.BUH_PERSONNEL_ID);
					EntityManager().executeQuery(getBUHForEdit).then((success) => {
						
						success.results[0].OPTIONAL_GLOBAL_ID=this._objBUH.OPTIONAL_GLOBAL_ID.toUpperCase();
						success.results[0].FIRST_NAME=this._objBUH.FIRST_NAME.toUpperCase();
						success.results[0].MIDDLE_NAME=this._objBUH.MIDDLE_NAME.toUpperCase();
						success.results[0].LAST_NAME=this._objBUH.LAST_NAME.toUpperCase();
						success.results[0].EMAIL_ADDRESS=this._objBUH.EMAIL_ADDRESS.toUpperCase();

						EntityManager().saveChanges().then((success) => {
							
							toastr.success("Succesfully Saved", "New Business Unit Head");
							
							this._disableDelete=false;
							this._disableGrid=false;
							this._disableAdd=false;
							this._disableSearch=false;
							this._disableCells=false;
							this._disableSave=false;

						}, (fail) => {

							if(varInsert!=null)
							{
								varInsert.entityAspect.setDeleted();  
							}

							EntityManager().getEntities().forEach(function(entity) {
								var errors = entity.entityAspect.getValidationErrors();
								if (errors.length > 0)
									console.log(errors);
							});
							console.log(fail);
							toastr.error("Error Occured", fail);
						});


					});
					return;
				}

			///INSERTING
			var getMax = EntityQuery().from('BUH_PERSONNEL').orderByDesc('BUH_PERSONNEL_ID').take(1);
			EntityManager().executeQuery(getMax).then((successMax) => {
				var getMax = 1;

				if (successMax.results.length > 0)
					getMax = successMax.results[0].BUH_PERSONNEL_ID + 1;


				var varInsert = EntityManager().createEntity('BUH_PERSONNEL', {
					BUH_PERSONNEL_ID: getMax,
					OPTIONAL_GLOBAL_ID: this._objBUH.OPTIONAL_GLOBAL_ID.toUpperCase(),
					FIRST_NAME: this._objBUH.FIRST_NAME.toUpperCase(),
					MIDDLE_NAME: this._objBUH.MIDDLE_NAME.toUpperCase(),
					LAST_NAME: this._objBUH.LAST_NAME.toUpperCase(),
					EMAIL_ADDRESS: this._objBUH.EMAIL_ADDRESS.toUpperCase(),
					CREATED_BY: "PAULV",
					CREATED_DT: new Date(Date.now()),
				});

				EntityManager().addEntity(varInsert);

				EntityManager().saveChanges().then((success) => {

					this._objBUH.BUH_PERSONNEL_ID=getMax;

					toastr.success("Succesfully Saved", "New Business Unit Head");

					this._disableDelete=false;
					this._disableGrid=false;
					this._disableAdd=false;
					this._disableSearch=false;
					this._disableDelete=false;
					this._disableCells=false;
					this._disableSave=false;
					this._status="view";

				}, (fail) => {

					if(varInsert!=null)
					{
						varInsert.entityAspect.setDeleted();  
					}

					EntityManager().getEntities().forEach(function(entity) {
						var errors = entity.entityAspect.getValidationErrors();
						if (errors.length > 0)
							console.log(errors);
					});
					console.log(fail);
					toastr.error("Error Occured", fail);
				});

			});



		}


		deleteSelected(index)
		{
			var varDelete =confirm("Delete record?");
			if(varDelete)
			{

				var found = this._programs.find((all)=>all.PROGRAM_CD==this._objBUH.PROGRAMS[index].PROGRAM_CD);
				found.BUH_PERSONNEL_ID=0;


				EntityManager().saveChanges().then((success) => {

					toastr.success("Succesfully Saved", "Program");

				}, (fail) => {

					EntityManager().getEntities().forEach(function(entity) {
						var errors = entity.entityAspect.getValidationErrors();
						if (errors.length > 0)
							console.log(errors);
					});
					toastr.error("Error Occured", fail);
				});


				this._objBUH.PROGRAMS.splice(index,1);	
			}
			
		}


		searchExistingBuh(){
			
			this.dialogService.open({
				viewModel: buhSearch
            }).whenClosed(response => {

				if (!response.wasCancelled) {
					this.searchBUH(response.output);
					this._disableGrid=false;
					this._disableDelete=false;
					this._disableSave=false;
					this._disableCells=false;
				} 
				else
				{
					this._disableSearch=false;
					this._disableAdd=false;
				}
			});
		}

		searchBUH(item)
		{
			this._status="view";

			this._objBUH.BUH_PERSONNEL_ID=item.BUH_PERSONNEL_ID;
			this._objBUH.OPTIONAL_GLOBAL_ID=item.OPTIONAL_GLOBAL_ID;
			this._objBUH.FIRST_NAME=item.FIRST_NAME;
			this._objBUH.MIDDLE_NAME=item.MIDDLE_NAME;
			this._objBUH.LAST_NAME=item.LAST_NAME;
			this._objBUH.EMAIL_ADDRESS=item.EMAIL_ADDRESS;

			this._disableAdd=false;
			this._disableSearch=false;

			this._objBUH.PROGRAMS=[];

			var found = this._programs.filter((all)=>all.BUH_PERSONNEL_ID==item.BUH_PERSONNEL_ID);
			
			if(found!==undefined)
				found.forEach((foundItems)=>
				{	
					this._objBUH.PROGRAMS.push(foundItems);
				});
			
		}


		searchPrograms(){	
			this.dialogService.open({
				viewModel: buhProgramDialog
            }).whenClosed(response => {

				if (!response.wasCancelled) {

					for (var a = response.output.length - 1; a >= 0; --a) {
						var found = this._programs.find((all)=>all.PROGRAM_CD==response.output[a].PROGRAM_CD);
						console.log(found.BUH_PERSONNEL_ID);
						if(found.BUH_PERSONNEL_ID==0)
						{
							this._objBUH.PROGRAMS.push(response.output[a]);
							found.BUH_PERSONNEL_ID=this._objBUH.BUH_PERSONNEL_ID;
						}
						else
						{
							toastr.error("<strong>"+found.PROGRAM_TITLE+"</strong> cannot be added, it is assigned to other BUH Personnel.", "Problem occured");
						}

					}


					EntityManager().saveChanges().then((success) => {

						toastr.success("Succesfully Saved", "Program");

					}, (fail) => {

						EntityManager().getEntities().forEach(function(entity) {
							var errors = entity.entityAspect.getValidationErrors();
							if (errors.length > 0)
								console.log(errors);
						});
						toastr.error("Error Occured", fail);
					});




			        	//this._objBUH.PROGRAMS=response.output;
			        } 
			    });
		}

		fnInitMasterfiles(initType,output){

			if(this.masterFilesLoaded==false)
			{
				this._toastr = toastr;
				toastr.info("Masterfiles...", "Loading please wait..", { timeOut: 15000 });
				this.loginDisabled = true;
				loadMasterfiles().then(() => {
					loadLookups().then(() => {

						//this._objBudget.OBSERVERS.init_modal.forEach((all) => {
						//	all();
						//});



						this.masterFilesLoaded = true;

						this.fnPassUserObject(initType,output);

					});
				});
			}
			else
			{
				this.fnPassUserObject(initType,output);
			}
		}


		fnLogin(){
			this.dialogService.open({
				viewModel: login
            }).whenClosed(response => {

				if (!response.wasCancelled) {
					this.fnInitMasterfiles(1, response.output);
				} else {

				}
			});
		}

		fnPassUserObject(initType,output){

			if (initType == 1) {


			} else {
				var varCookie = checkCookie("PPMS_USER");
				var varSplitCookie = varCookie.split('^');
				this._user = {
					USER_ID: varSplitCookie[0],
					COMPANY_ID: varSplitCookie[1],
					Is_HR: varSplitCookie[2],
					Is_Branch: varSplitCookie[0]
				};

				this.loginDisabled = true;
				this.logoutDisabled = false;
				this.showingLogout = "visible";
				toastr.clear();
				toastr.success("Let's Start...", "Success");
				this._disableAdd=false;
				this._disableSearch=false;
				return;
			}

			this.LoginPassed(output);

		}

		LoginPassed(user) {

			this._user = user; 

      //console.log(user.USER_ID+"^"+user.COMPANY_ID+"^"+user.Is_HR+"^"+user.Is_Branch);

      setCookie("PPMS_USER", user.USER_ID+"^"+user.COMPANY_ID+"^"+user.Is_HR+"^"+user.Is_Branch, 30);
      toastr.clear();
      toastr.success("Let's Start...", "Success");

      this.logoutDisabled = false;
      this.loginDisabled=true;

      this.showingLogout = "visible";
      this._disableAdd=false;
	  this._disableSearch=false;
  }



  logout() {
  	this.fnCRUD("cancel");
  	this._disableAdd=true;
	this._disableSearch=true;
  	this.loginDisabled=false;
  	this.logoutDisabled=true;

  	this._user ={};
  	removeCookie();
  	this.showingLogout = "hidden";
  	this.fnLogin();

  }
}