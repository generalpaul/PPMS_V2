import {checkCookie,setCookie,removeCookie} from './helpers';
import {initializeBreeze,generateID} from './entity-manager-factory';
import {loadMasterfiles, loadTables, loadLookups, getLookups} from './masterfiles';
import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {substringMatcher} from 'helpers';
import typeahead from 'typeahead';
import _ from 'underscore';
import {EntityManager, EntityQuery} from './entity-manager-factory';
//import {handle, Dispatcher} from 'aurelia-flux';  
import { MultiObserver }from 'multi-observer';
import {DialogService} from 'aurelia-dialog';
import {login} from 'modals/login';
import {globalindivmstr} from 'modals/globalindivmstr';
import {talentmanagergroups} from 'modals/talentmanagergroups';
import settings from './settings';

@inject(MultiObserver,DialogService)
export class group_individual {
	masterFilesLoaded=false;
	modalTalentManager;
	modalIndivMstr;
	grpMembers = [];
	//_dispatcher;
	_signal = null;
	_GLOBAL_GRP_ID = "";
	_GROUP_NAME = "";
	isDisableSave = true;
	showingLogout="hidden";
	_user="";

	disabledfindTalent=true;
	disabledfindTM=false;
	constructor(multiObserver,dialogService) {

		this.dialogService=dialogService;
		if(this.dialogService.controllers.length>0)
		{
			for (var i = this.dialogService.controllers.length - 1; i >= 0; i--) {
				this.dialogService.controllers[i].close();
			}
		}
	
		//initializeBreeze().then(() => {
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
		// 	"closeButton": true,
		// 	"debug": false,
		// 	"positionClass": "toast-bottom-right",
		// 	"onclick": null,
		// 	"showDuration": "300",
		// 	"hideDuration": "1000",
		// 	//"timeOut": "300000",
		// 	//"extendedTimeOut": "1000",
		// 	"showEasing": "swing",
		// 	"hideEasing": "linear",
		// 	"showMethod": "fadeIn",
		// 	"hideMethod": "fadeOut"
		// };

	
	}


		//this._dispatcher = Dispatcher;
		// this.modalTalentManager = {
		// 	title: 'Talent Managers',
		// 	content: 'modals/talentmanagergroups',
		// 	value: "",
		// 	id: generateID(),
		// 	buttonTitle: "Find Talent Manager",
		// 	cleardispatch: "clear_talentmanager_modal"
			
		// };


		// this.modalIndivMstr = {
		// 	title: 'Talent Managers',
		// 	content: 'modals/globalindivmstr',
		// 	value: "",
		// 	id: generateID(),
		// 	buttonTitle: "Search Talent",
		// 	cleardispatch: "clear_indiv_modal"
		// };

		// this.modalLogin = {
		// 	title: 'LOG-IN',
		// 	content: 'modals/login',
		// 	value: "",
		// 	id: generateID(),
		// 	buttonTitle: "Log In",
		// 	cleardispatch: "clear_login_modal",
		// 	width:500
		// };
	findTalent()
	{
		this.dialogService.open({
        viewModel: globalindivmstr
        }).whenClosed(response => {
        
        if (!response.wasCancelled) {
           
				var tmpgrpMembers=this.grpMembers;
				var varExists = false;
				response.output
				.forEach((val) => {

					varExists = false;

					tmpgrpMembers.forEach((indiv) => {
						if (val.GLOBAL_INDIV_ID == indiv.GLOBAL_INDIV_ID) {
							indiv.STATUS_CD = "ACTV";
							varExists = true;
						}
					});


					if (!varExists) {
						tmpgrpMembers.push({
							GLOBAL_INDIV_ID: val.GLOBAL_INDIV_ID,
							GLOBAL_GRP_ID: this._GLOBAL_GRP_ID,
							PERSONNEL_NAME: val.PERSONNEL_NAME,
							STATUS_CD: "ACTV"
						});
					}

				});


				tmpgrpMembers.forEach((all) => {
					if (all.STATUS_CD == "" || all.STATUS_CD === undefined)
					{
						all.STATUS_CD = "";
					}
				});

				this.grpMembers=tmpgrpMembers;

				this._signal = generateID();


			

        } else {
          
        }
      });
	}

	findTalentManager()
	{
		this.dialogService.open({
        viewModel: talentmanagergroups
        }).whenClosed(response => {
        
        if (!response.wasCancelled) {
           
				this._GLOBAL_GRP_ID = response.output.GLOBAL_GRP_ID;
				this._GROUP_NAME = response.output.GROUP_NAME;

				this.getGlobalIndivsFromGrpIndiv();


				this.disabledfindTalent=false;	
				this.isDisableSave=false;

        } else {
          
        }
      });
	}


	//@handle('login.passed')
	LoginReady(user) {
			this._user=user;
			setCookie("PPMS_USER", user.USER_ID+"^"+user.COMPANY_ID+"^"+user.Is_HR+"^"+user.Is_Branch, 30);
			toastr.clear();
			toastr.success("Let's Start...", "Success");
			this.disabledfindTM=false;

			this.showingLogout="visible";
	}



		fnInitMasterfiles(initType,output){

			if(this.masterFilesLoaded==false)
            {
                settings.isNavigating = true;
				this._toastr = toastr;
				toastr.info("Masterfiles...", "Loading please wait..", { timeOut: 15000 });
				this.loginDisabled = true;
				loadMasterfiles().then(() => {
					loadLookups().then(() => {

						this.masterFilesLoaded = true;

						this.fnPassUserObject(initType,output);
                        settings.isNavigating = false;
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
				this.disabledfindTM=false;
				return;
			}

			this.LoginPassed(output);

		}

LoginPassed(user) {

			this._user = user; 

      setCookie("PPMS_USER", user.USER_ID+"^"+user.COMPANY_ID+"^"+user.Is_HR+"^"+user.Is_Branch, 30);
      toastr.clear();
      toastr.success("Let's Start...", "Success");

      this.logoutDisabled = false;
      this.loginDisabled=true;

      this.showingLogout = "visible";

      this.disabledfindTM=false;
  }



  logout() {
  	this.disabledfindTM=true;
  	this.isDisableSave=true;
	this.clear();
  	this.loginDisabled=false;
  	this.logoutDisabled=true;
  	this._user ={};
  	removeCookie();
  	this.showingLogout = "hidden";
  	this.fnLogin();

  }
	

	getGlobalIndivsFromGrpIndiv(){
		this.grpMembers=[];
		var tmpIndivs = [];
		var _query = EntityQuery().from('GRP_INDIV_MSTR').where("GLOBAL_GRP_ID", "==", this._GLOBAL_GRP_ID);
		EntityManager().executeQuery(_query).then((success) => {
			success.results.forEach((all) => {
				
				getLookups().GLOBAL_INDIV_WITH_ALIAS.forEach((item)=>{

					if(item.GLOBAL_INDIV_ID==all.GLOBAL_INDIV_ID)
					{
						tmpIndivs.push({
							GLOBAL_INDIV_ID: all.GLOBAL_INDIV_ID,
							GLOBAL_GRP_ID: all.GLOBAL_GRP_ID,
							PERSONNEL_NAME: item.PERSONNEL_NAME,
							GRP_INDIV_ID: all.GRP_INDIV_ID,
							STATUS_CD: all.STATUS_CD
						});

					}
				});

				// console.log(success.results);
				// 		console.log(tmpIndivs);

				if(success.results.length==tmpIndivs.length)				
				{
					this.grpMembers=tmpIndivs;
					this._signal = generateID();
					toastr.success("Refreshed..", "Data Reloaded..");
				}

				// var _getIndiv = EntityQuery().from('GLOBAL_INDIV_MSTR').where("GLOBAL_INDIV_ID", "==", all.GLOBAL_INDIV_ID);
				// EntityManager().executeQuery(_getIndiv).then((successIndiv) => {

				// 	_.each(successIndiv.results, (singleIndiv) => {

				// 		tmpIndivs.push({
				// 			GLOBAL_INDIV_ID: all.GLOBAL_INDIV_ID,
				// 			GLOBAL_GRP_ID: all.GLOBAL_GRP_ID,
				// 			PERSONNEL_NAME: singleIndiv.LAST_NAME + ', ' + singleIndiv.GIVEN_NAME + ' ' + singleIndiv.MIDDLE_NAME,
				// 			GRP_INDIV_ID: all.GRP_INDIV_ID,
				// 			STATUS_CD: all.STATUS_CD
				// 		});
						
					
				// 		if(success.results.length==tmpIndivs.length)				
				// 		{
				// 			this.grpMembers=tmpIndivs;
				// 			this._signal = generateID();
				// 			toastr.success("Refreshed..", "Data Reloaded..");
				// 		}

				// 	});
				// });
		
			});

			
		});

	}
	//passed grp indiv mstr
	//@handle('pass.group')
	PassedGroup(value) {


		//this._dispatcher.dispatch('close.modal', this.modalIndivMstr.id);
	}

	saveGroupIndiv() {

		//get existing entites
		var getQueryEntities = EntityQuery().from('GRP_INDIV_MSTR').where("GLOBAL_GRP_ID", "==", this._GLOBAL_GRP_ID);
		EntityManager().executeQuery(getQueryEntities).then((successEnties)=> {

			//get max grp indiv id
			var getMax = EntityQuery().from('GRP_INDIV_MSTR').orderByDesc('GRP_INDIV_ID').take(1);
			EntityManager().executeQuery(getMax).then((successMax) => {
				var getMax = 1;

				if (successMax.results.length > 0)
					getMax = successMax.results[0].GRP_INDIV_ID + 1;

				this.grpMembers.forEach((indiv) => {

					
					if (indiv.GRP_INDIV_ID === undefined) {
						
						var varInsert = EntityManager().createEntity('GRP_INDIV_MSTR', {
							GLOBAL_INDIV_ID: indiv.GLOBAL_INDIV_ID,
							GLOBAL_GRP_ID: indiv.GLOBAL_GRP_ID,
							CREATED_BY: this._user.USER_ID, 
							STATUS_CD: "ACTV",
							CREATED_DT: new Date(Date.now()),
							GRP_INDIV_ID: getMax
						});
						
						++getMax;
						
						EntityManager().addEntity(varInsert);
					} 
					else 
					{
						
						successEnties.results.forEach((existingIndiv) => {
							if(existingIndiv.GLOBAL_INDIV_ID==indiv.GLOBAL_INDIV_ID)
							{
								if (indiv.STATUS_CD == "INACTV" && existingIndiv.STATUS_CD != "INACTV") {
									existingIndiv.STATUS_CD = "INACTV";
									existingIndiv.LAST_UPDATED_DT = Date.now();
									existingIndiv.LAST_UPDATED_BY = this._user.USER_ID;
									

								} else if (indiv.STATUS_CD != existingIndiv.STATUS_CD) {
									existingIndiv.STATUS_CD = indiv.STATUS_CD;
									existingIndiv.LAST_UPDATED_DT = Date.now();
									existingIndiv.LAST_UPDATED_BY = this._user.USER_ID;
									
								}	
							}
						});
						
					}
				});

				EntityManager().saveChanges().then((success) => {
					toastr.success("Succesfully Saved", "Talent Manager Group");

					setTimeout(() => {
							this.getGlobalIndivsFromGrpIndiv();
					}, 1000);

					
				}, (fail) => {
					console.log(fail);
					toastr.error("Error Occured", fail);
				});

				
				
			});


		});

		
	}

	addIndividual() {
		this.grpMembers.push({});
	}

	deleteItem(item) { //item
		var isFound = this.grpMembers.find((_item) => {
			if (_item.GLOBAL_INDIV_ID == item.GLOBAL_INDIV_ID) {
				item.STATUS_CD = "INACTV";
				return true;
			}
		});
		this._signal = generateID();
	}

	clear(){
		this.grpMembers=[];		
		this._GLOBAL_GRP_ID = "";
		this._GROUP_NAME = "";

		this.isDisableSave=true;
		this.disabledfindTalent=true;


	}
}