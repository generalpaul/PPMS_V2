import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog';
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import settings from 'settings';
import {OrderByDate, isDigit, input_mask} from '../../helpers';
import {Router} from 'aurelia-router';
import {cache_obj} from '../../cache_obj';
import {group_search} from "../modals/group_search";
import {add_member} from "../modals/add_member";

@inject(obj_personnel, toastr, DialogService, Router, cache_obj)
export class group_main{
	
	obj_personnel = null;
	lblCreatedBy=null;
	lblUpdatedBy=null;
	_disableForm = true;
	_disableSearch = false;
	_disableCreate = false;
	_disableClear = false;
	_disableSave = true;
	_disableAddMember = true;
	formStatus = "";
	_lblBtnSave = "SAVE";
	router;

	constructor(obj_personnel, toastr, DialogService, Router, cache_obj){
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;
		this.cache_obj = cache_obj;
		this.router = Router;
		this.obj_personnel.USER = this.cache_obj.USER;

		this.obj_personnel.OBSERVERS.group_dialog.push((global_id)=>{
			this.loadGroupDetails(global_id);
			this.loadMembers(global_id);
		});
		
	}

	loadGroupDetails(global_grp_id){
		settings.isNavigating = true;
		var query = EntityQuery().from("GLOBAL_GRP_MSTR")
		.where("GLOBAL_GRP_ID", "==", global_grp_id);
		EntityManager().executeQuery(query).then((s1)=>{

			this.obj_personnel.GROUP_INFO.model.global_grp_id = s1.results[0].GLOBAL_GRP_ID;
			this.obj_personnel.GROUP_INFO.model.group_name = s1.results[0].GROUP_NAME;
			var establish_dt = null;
			if(moment(s1.results[0].ESTABLISH_DT).isValid()){
				establish_dt = moment.utc(s1.results[0].ESTABLISH_DT).format("MM/DD/YYYY");
			}
			this.obj_personnel.GROUP_INFO.model.establish_dt = establish_dt;


			settings.isNavigating = false;
			toastr.clear();
			toastr.success("", "Group details has been loaded.");
			this._disableAddMember = false;

		}, (e1) =>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying group details.");
		});

		query = EntityQuery().from("GLOBAL_MSTR")
		.where("GLOBAL_ID", "==", global_grp_id);
		EntityManager().executeQuery(query).then((s1)=>{

			this.obj_personnel.GROUP_INFO.model.tin = s1.results[0].TIN;
			this.obj_personnel.GROUP_INFO.model.global_id = s1.results[0].GLOBAL_ID;
			this.obj_personnel.GROUP_INFO.model.country_cd = s1.results[0].COUNTRY_CD;
			this.obj_personnel.GROUP_INFO.model.country_base_cd = s1.results[0].COUNTRY_BASE_CD;
			this.obj_personnel.GROUP_INFO.model.location_base_cd = s1.results[0].LOCATION_BASE_CD;
			this.obj_personnel.GROUP_INFO.model.status_cd = s1.results[0].STATUS_CD;
			if(s1.results[0].STATUS_CD == "SUSPEND"){
				var _pred1 = breeze.Predicate.create("GLOBAL_ID","==", global_grp_id);
				var _pred2 = breeze.Predicate.create("SUSPEND_LEVEL", "==", 1);
				var _finalPred = breeze.Predicate.and([_pred1, _pred2]);
				query = EntityQuery().from('SUSPEND_TRX')
				.where(_finalPred)
				.orderByDesc("SUSPEND_ID")
				.take(1);
				EntityManager().executeQuery(query).then((s2)=>{

					console.log(s2.results);
					if(s2.results.length>0){
						this.obj_personnel.GROUP_INFO.model.suspend_id = s2.results[0].SUSPEND_ID;

						if(moment(s2.results[0].START_DT)){
							var start_dt = moment.utc(s2.results[0].START_DT).format("MM/DD/YYYY");
							this.obj_personnel.GROUP_INFO.model.suspension_start = start_dt;							
						}

						if(moment(s2.results[0].END_DT)){
							var end_dt = moment.utc(s2.results[0].END_DT).format("MM/DD/YYYY");
							this.obj_personnel.GROUP_INFO.model.suspension_end = end_dt;
						}
					}

				}, (e2)=>{
					settings.isNavigating = false;
					toastr.clear();
					toastr.error(e2,"Error in loading suspension details.");
				});
			}

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying group info.");
		});
	}

	loadMembers(global_grp_id){

		console.log(global_grp_id);
		settings.isNavigating = true;
		var query = EntityQuery().from("GRP_INDIV_MSTR")
		.where("GLOBAL_GRP_ID", "==", global_grp_id);
		EntityManager().executeQuery(query).then((s1)=>{

			var tempIds = [];
			_.each(s1.results, (r)=>{
				tempIds.push(r.GLOBAL_INDIV_ID);
			});
			// console.log(tempIds);
			this.obj_personnel.GROUP_INFO.members=[];
			_.each(tempIds, (gid)=>{
				query = EntityQuery().from("GLOBAL_INDIV_MSTR")
						.where("GLOBAL_INDIV_ID", "==", gid);
				EntityManager().executeQuery(query).then((s2)=>{
					
					// this.obj_personnel.GROUP_INFO.members=[];
					_.each(s2.results, (r2)=>{
						this.obj_personnel.GROUP_INFO.members.push({
							global_indiv_id: r2.GLOBAL_INDIV_ID,
							fullname: r2.GIVEN_NAME + ' ' + r2.MIDDLE_NAME + ' ' + r2.LAST_NAME						
						});	
					});

				}, (e2)=>{
					settings.isNavigating = false;
					toastr.clear();
					toastr.error(e2, "Error in querying members' details.");
				});
			});
			settings.isNavigating = false;	
			toastr.clear();
			toastr.success("","Group's Member has been loaded.");
			// var conditions = [];
			// _.each(tempIds, (id)=>{
			// 	var tempCon = breeze.Predicate.create("GLOBAL_INDIV_ID", "==", id);
			// 	conditions.push(tempCon);
			// });
			// // console.log(conditions);

			// if(conditions.length>0){
			// 	var finalPredicate = breeze.Predicate.or(conditions);
			// 	query = EntityQuery().from("GLOBAL_INDIV_MSTR")
			// 	.where(finalPredicate);
			// 	EntityManager().executeQuery(query).then((s2)=>{
			// 		var tmp = [];
			// 		_.each(s2.results, (r2)=>{
			// 			tmp.push({
			// 				global_indiv_id: r2.GLOBAL_INDIV_ID,
			// 				fullname: r2.GIVEN_NAME + ' ' + r2.MIDDLE_NAME + ' ' + r2.LAST_NAME						
			// 			});
			// 		});

			// 		this.obj_personnel.GROUP_INFO.members = tmp;
			// 		console.log(tmp);
			// 		settings.isNavigating = false;
			// 		toastr.clear();
			// 		toastr.success("","Group's Member has been loaded.");

			// 	}, (e2)=>{
			// 		settings.isNavigating = false;
			// 		toastr.clear();
			// 		toastr.error(e2, "Error in querying member's details.");
			// 	});
			// }


		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e2, "Error in querying individual's ID");
		});

	}

	fnGroup(action){
		$("#fDate").datepicker();
		$("#suspensionFrom").datepicker();
		$("#suspensionTo").datepicker();
		switch(action){
			case "CREATE": 	this._disableForm = false;
			this._disableSearch = true;
			this._disableCreate = true;
			this._disableSave = false;
			this.formStatus = "ADD";
			this._lblBtnSave = "SAVE";
			break;
			case "EDIT": this.search_group();
			break;
			case "CLEAR": this.clearField();
			break;
			case "SAVE": this.validate();
			break;
		}
	}

	search_group(){
		this.DialogService.open({ viewModel: group_search }).whenClosed(response=>{
			if(!response.wasCancelled)
			{
				this._disableForm = false;
				this._disableSearch = true;
				this._disableCreate = true;
				this._disableSave = false;
				this.formStatus = "EDIT";
				this._lblBtnSave = "UPDATE";
				console.log(response.output);
				this.obj_personnel.global_indiv_id = response.output;
			}else{
				console.log('search was cancelled.');
			}
		});
	}

	clearField(){		
		this._disableForm = true;
		this._disableSearch = false;
		this._disableCreate = false;
		// this._disableClear = true;
		this._disableSave = true;
		this._disableAddMember = true;
		this.formStatus = "";
		this._lblBtnSave = "SAVE";
		this.obj_personnel.global_indiv_id="";
		this.obj_personnel.GROUP_INFO.model={};
		this.obj_personnel.GROUP_INFO.members=[];
	}

	validate(){

		var strValidation = "";

		this.obj_personnel.GROUP_INFO.model.establish_dt = $("#fDate").val();		

		if(this.obj_personnel.GROUP_INFO.model.country_cd == undefined || this.obj_personnel.GROUP_INFO.model.country_cd == null || this.obj_personnel.GROUP_INFO.model.country_cd.length==0){
			strValidation+="No country specified.<br/>";
		}

		if(this.obj_personnel.GROUP_INFO.model.tin == undefined || this.obj_personnel.GROUP_INFO.model.tin == null || this.obj_personnel.GROUP_INFO.model.tin.length==0){
			strValidation+="No TIN specified.<br/>";			
		}else{
			var TinRegex = /^(?:\d{3}-\d{3}-\d{3}-\d{3})$/;
			var TinRegex2 = /^(?:\d{12})$/;
			if(!TinRegex.test(this.obj_personnel.GROUP_INFO.model.tin) && !TinRegex2.test(this.obj_personnel.GROUP_INFO.model.tin))
			{
				strValidation+="TIN is invalid.<br/>";
			}else if(TinRegex2.test(this.obj_personnel.GROUP_INFO.model.tin))
			{
				var set_1 = this.obj_personnel.GROUP_INFO.model.tin.substring(0,3);
				var set_2 = this.obj_personnel.GROUP_INFO.model.tin.substring(3,6);
				var set_3 = this.obj_personnel.GROUP_INFO.model.tin.substring(6,9);
				var set_4 = this.obj_personnel.GROUP_INFO.model.tin.substring(9,12);
				this.obj_personnel.GROUP_INFO.model.tin = set_1+'-'+set_2+'-'+set_3+'-'+set_4;
			}
		}

		if(this.obj_personnel.GROUP_INFO.model.group_name == undefined || this.obj_personnel.GROUP_INFO.model.group_name == null || $.trim(this.obj_personnel.GROUP_INFO.model.group_name).length==0)
		{
			strValidation+="No group name specified.<br/>";
		}

		if(this.obj_personnel.GROUP_INFO.model.status_cd == "SUSPEND"){

			var sus_start = null;
			var sus_end = null;
			this.obj_personnel.GROUP_INFO.model.suspension_start = $("#suspensionFrom").val();
			this.obj_personnel.GROUP_INFO.model.suspension_end = $("#suspensionTo").val();
			if(this.obj_personnel.GROUP_INFO.model.suspension_start != undefined && this.obj_personnel.GROUP_INFO.model.suspension_start != null && this.obj_personnel.GROUP_INFO.model.suspension_start.length>0){
				if(!moment(this.obj_personnel.GROUP_INFO.model.suspension_start).isValid()){
					strValidation+="Invalid suspension start date.<br/>";
				}else{
					sus_start = new Date(this.obj_personnel.GROUP_INFO.model.suspension_start);
				}
			}else{
				strValidation+= "No start date of suspension specified.<br/>";
			}

			if(this.obj_personnel.GROUP_INFO.model.suspension_end != undefined && this.obj_personnel.GROUP_INFO.model.suspension_end != null && this.obj_personnel.GROUP_INFO.model.suspension_end.length>0){			
				if(!moment(this.obj_personnel.GROUP_INFO.model.suspension_end).isValid()){
					strValidation+="Invalid suspension end date.<br/>";
				}else{
					sus_end = new Date(this.obj_personnel.GROUP_INFO.model.suspension_end);
				}
			}else{
				strValidation+= "No end date of suspension specified.<br/>";	
			}

			if(sus_start != null && sus_end != null){
				if(sus_end < sus_start){
					strValidation+= "end date of suspension cannot be greater than the start date.<br/>";
				}
			}
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			this.obj_personnel.GROUP_INFO.model.group_name = this.obj_personnel.GROUP_INFO.model.group_name.toUpperCase();
			if(this.formStatus=="ADD")
			{
				this.obj_personnel.GROUP_INFO.model.global_id = this.obj_personnel.GROUP_INFO.model.tin + this.obj_personnel.GROUP_INFO.model.country_cd;
				this.saveGroupInfo(this.obj_personnel.GROUP_INFO.model.global_id);
			}else if(this.formStatus=="EDIT"){
				this.updateGroupInfo(this.obj_personnel.GROUP_INFO.model.global_id);				
			}
		}
	}

	saveGroupInfo(global_id){

		settings.isNavigating = true;
		var establish_dt = null;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));

		if(moment(this.obj_personnel.GROUP_INFO.model.establish_dt).isValid()){
			establish_dt = moment(this.obj_personnel.GROUP_INFO.model.establish_dt).add(8, "hours");
		}

		var query = EntityQuery().from("GLOBAL_MSTR")
		.where("TIN", "==", this.obj_personnel.GROUP_INFO.model.tin);
		EntityManager().executeQuery(query).then((s)=>{

			if(s.results.length>0){
				settings.isNavigating = false;
				toastr.clear();
				toastr.error("", "Tin already exist.");
				return;
			}

			var global_mstr = {
				GLOBAL_ID: global_id,
				COUNTRY_CD: this.obj_personnel.GROUP_INFO.model.country_cd,
				PARK_FL: 0,
				TIN: this.obj_personnel.GROUP_INFO.model.tin,
				ACTIVE_FL: 1,
				INDIV_FL:0,
				STATUS_CD: this.obj_personnel.GROUP_INFO.model.status_cd,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};
			// console.log(global_mstr);

			var entity = EntityManager().createEntity("GLOBAL_MSTR", global_mstr);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s1)=>{

				var global_grp_mstr = {
					GLOBAL_GRP_ID: global_id,
					GROUP_NAME: this.obj_personnel.GROUP_INFO.model.group_name,
					ESTABLISH_DT: establish_dt,
					CREATED_BY: this.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};

				var entity2 = EntityManager().createEntity("GLOBAL_GRP_MSTR", global_grp_mstr);
				EntityManager().addEntity(entity2);
				EntityManager().saveChanges().then((s2)=>{

					if(this.obj_personnel.GROUP_INFO.model.status_cd == "SUSPEND"){
						var getMax = EntityQuery().from("SUSPEND_TRX").orderByDesc("SUSPEND_ID").take(1);
						EntityManager().executeQuery(getMax).then((s3)=>{

							var maxId = 1;
							if(s3.results.length>0){
								maxId = s3.results[0].SUSPEND_ID+1;								
							}

							var suspend_trx = {
								SUSPEND_ID: maxId,
								GLOBAL_ID: global_id,
								SUSPEND_LEVEL: 1,
								START_DT: this.obj_personnel.GROUP_INFO.model.suspension_start,
								END_DT: this.obj_personnel.GROUP_INFO.model.suspension_end,
								COMPANY_ID:0, 
								CREATED_BY: this.obj_personnel.USER.USER_ID,
								CREATED_DT: dateToday
							};
							var entity3 = EntityManager().createEntity("SUSPEND_TRX", suspend_trx);
							EntityManager().addEntity(entity3);
							EntityManager().saveChanges().then((s4)=>{

								toastr.clear();
								toastr.success("", "Record saved.");
								this.obj_personnel.global_indiv_id = global_id;
								this.loadGroupDetails(global_id);
								this.formStatus = "EDIT";
								this._lblBtnSave = "UPDATE";

							}, (e4)=>{
								settings.isNavigating = false;
								toastr.clear();
								toastr.error(e4, "Error in saving suspension details.");								
							});

						}, (e3)=>{
							settings.isNavigating = false;
							toastr.clear();
							toastr.error(e3, "Error in querying suspension id.");
						});
					}else{
						toastr.clear();
						toastr.success("", "Record saved.");
						this.obj_personnel.global_indiv_id = global_id;
						this.loadGroupDetails(global_id);
						this.formStatus = "EDIT";
						this._lblBtnSave = "UPDATE";
					}

				}, (e2)=>{
					if(entity2 != null){
						entity2.entityAspect.setDeleted();			 		
					}
					settings.isNavigating = false;
					toastr.clear();
					toastr.error(e2, "Error in saving to grlobal group.");
				});

			}, (e1)=>{
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e1, "Error in saving to global mstr.");
			});

		}, (e)=>{
			toastr.clear();
			toastr.error(e, "Error in checking if the tin already exist.");
		});

	}

	updateGroupInfo(global_id){

		settings.isNavigating = true;
		var establish_dt = null;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		if(moment(this.obj_personnel.GROUP_INFO.model.establish_dt).isValid()){
			establish_dt = new Date(moment(this.obj_personnel.GROUP_INFO.model.establish_dt).add(8, "hours"));
		}

		var query = EntityQuery().from("GLOBAL_MSTR")
		.where("GLOBAL_ID", "==", global_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].COUNTRY_CD = this.obj_personnel.GROUP_INFO.model.country_cd;
			s1.results[0].COUNTRY_BASE_CD = this.obj_personnel.GROUP_INFO.model.country_base_cd;
			s1.results[0].LOCATION_BASE_CD = this.obj_personnel.GROUP_INFO.model.location_base_cd;
			s1.results[0].STATUS_CD = this.obj_personnel.GROUP_INFO.model.status_cd;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{				

				query = EntityQuery().from("GLOBAL_GRP_MSTR")
				.where("GLOBAL_GRP_ID", "==", global_id);
				EntityManager().executeQuery(query).then((s3)=>{

					s3.results[0].GROUP_NAME = this.obj_personnel.GROUP_INFO.model.group_name;
					s3.results[0].ESTABLISH_DT = establish_dt;
					s3.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
					s3.results[0].LAST_UPDATED_DT = dateToday;

					EntityManager().saveChanges().then((s4)=>{

						if(this.obj_personnel.GROUP_INFO.model.status_cd=="SUSPEND"){
							var suspend_start = null;							
							var suspend_end = null;
							if(moment(this.obj_personnel.GROUP_INFO.suspension_start).isValid()){
								suspend_start = new Date(moment(this.obj_personnel.GROUP_INFO.model.suspension_start).add(8, "hours"));
							}
							if(moment(this.obj_personnel.GROUP_INFO.suspension_end).isValid()){
								suspend_end = new Date(moment(this.obj_personnel.GROUP_INFO.model.suspension_end).add(8, "hours"));
							}
							// console.log(suspend_start);

							console.log("Suspension id: "+this.obj_personnel.GROUP_INFO.model.suspend_id);
							if(this.obj_personnel.GROUP_INFO.model.suspend_id != undefined && this.obj_personnel.GROUP_INFO.model.suspend_id != null && this.obj_personnel.GROUP_INFO.model.suspend_id.toString().length>0){
								query = EntityQuery().from("SUSPEND_TRX")
								.where("SUSPEND_ID", "==", this.obj_personnel.GROUP_INFO.model.suspend_id);
								EntityManager().executeQuery(query).then((s5)=>{

									s5.results[0].START_DT = suspend_start;
									s5.results[0].END_DT = suspend_end;
									s5.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
									s5.results[0].LAST_UPDATED_DT = dateToday;

									EntityManager().saveChanges().then((s6)=>{

									}, (e6)=>{
										settings.isNavigating = false;
										toastr.clear();
										toastr.error(e6, "Error in updating suspension details.");
									});

								}, (e5)=>{
									settings.isNavigating = false;
									toastr.clear();
									toastr.error(e5, "Error in querying suspension details.");
								});
							}else{
								query = EntityQuery().from("SUSPEND_TRX")
										.orderByDesc("SUSPEND_ID")
										.take(1);
								EntityManager().executeQuery(query).then((s5)=>{

									var maxId = 1;
									if(s5.results.length>0){
										maxId = s5.results[0].SUSPEND_ID+1;
									}

									var suspend_trx = {
										SUSPEND_ID: maxId,
										GLOBAL_ID: global_id,
										SUSPEND_LEVEL: 1,
										START_DT: suspend_start,
										END_DT: suspend_end,
										COMPANY_ID:0, 
										CREATED_BY: this.obj_personnel.USER.USER_ID,
										CREATED_DT: dateToday
									};

									var entity = EntityManager().createEntity("SUSPEND_TRX", suspend_trx);
									EntityManager().addEntity(entity);
									EntityManager().saveChanges().then((s6)=>{
										this.obj_personnel.GROUP_INFO.model.suspend_id = maxId;
									}, (e6)=>{
										if(entity != null){
											entity.entityAspect.setDeleted();
										}
										settings.isNavigating = false;
										toastr.clear();
										toastr.error(e6, "Error in saving suspension details.");
									});

								},(e5)=>{
									settings.isNavigating = false
									toastr.clear();
									toastr.error(e5, "Error in querying suspension id.");
								});
							}

						}else{
							this.obj_personnel.GROUP_INFO.model.suspend_id = null;
							this.obj_personnel.GROUP_INFO.model.suspension_start="";
							this.obj_personnel.GROUP_INFO.model.suspension_end = "";
						}

						settings.isNavigating = false;
						toastr.clear();
						toastr.success("", "Record updated.");
						// this.loadGroupDetails(global_id);
						// this.loadMembers(global_id);


					}, (e4)=>{
						settings.isNavigating = false;
						toastr.clear();
						toastr.error(e4, "Error in saving changes in global group.");
					});

				},(e3)=>{
					settings.isNavigating = false;
					toastr.clear();
					toastr.error(e3, "Error in querying global group.");
				});

			}, (e2)=>{
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in saving global mstr.");
			});		

			

			if(this.obj_personnel.GROUP_INFO.model.status_cd == "SUSPEND"){

			}

		}, (e2)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e2, "Error in querying global mstr.");
		});	

	}

	DigitOnly(event){
		return isDigit(event);
	}

	mask(id, mask){
		input_mask(id, mask);		
	}

	btnAddNewMember(){
		this.DialogService.open({ viewModel: add_member, model: this.obj_personnel.GROUP_INFO.members }).whenClosed(response=>{
			if(!response.wasCancelled)
			{
				// this._disableForm = false;
				// this._disableSearch = true;
				// this._disableCreate = true;
				// this._disableSave = false;
				// this.formStatus = "ADD";
				// console.log(response.output);
				this.fnAddNewMembers(response.output, this.obj_personnel.GROUP_INFO.model.global_grp_id);
			}else{
				console.log('search was cancelled.');
			}
		});
	}

	fnAddNewMembers(members, global_grp_id){		

		// console.log(global_grp_id);
		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8,"hours"));
		var query = EntityQuery().from("GRP_INDIV_MSTR")
		.orderByDesc("GRP_INDIV_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{

			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].GRP_INDIV_ID;
			}
			var entities = [];
			_.each(members, (m)=>{
				maxId+=1;
				var grp_indiv = {
					GRP_INDIV_ID: maxId,
					GLOBAL_INDIV_ID: m.GLOBAL_INDIV_ID,
					GLOBAL_GRP_ID: global_grp_id,
					STATUS_CD: "ACTIV",
					CREATED_BY: this.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};
				console.log(grp_indiv);
				var entity = EntityManager().createEntity("GRP_INDIV_MSTR", grp_indiv);
				EntityManager().addEntity(entity);
				entities.push(entity);
			});

			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "New member(s) has been added.");
				this.loadMembers(global_grp_id);

			}, (e2)=>{
				_.each(entities, (entity)=>{
					if(entity != null){
						entity.entityAspect.setDeleted();
					}
				});

				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in adding new members.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying grp indiv id.");
		});
	}

	btnAddNewPersonnel(){
		var url = this.router.generate('ppid');
		window.open(url);
	}

	btnRemoveMember(item){

		console.log(item);

		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove "+ item.fullname +" to the members list?" } })
		.whenClosed(response=>{
			if(!response.wasCancelled){
				settings.isNavigating = true;
				var pred1 = breeze.Predicate.create("GLOBAL_INDIV_ID","==", item.global_indiv_id);
				var pred2 = breeze.Predicate.create("GLOBAL_GRP_ID", "==", this.obj_personnel.GROUP_INFO.model.global_grp_id);
				var finalPred = breeze.Predicate.and([pred1, pred2]);

				var query = EntityQuery().from('GRP_INDIV_MSTR').where(finalPred);
				EntityManager().executeQuery(query).then((success)=>{

					success.results[0].entityAspect.setDeleted();

					EntityManager().saveChanges().then((saveSuccess)=>{

						toastr.clear();
						toastr.success("", "Record was successfully removed.");
						this.loadMembers(this.obj_personnel.GROUP_INFO.model.global_grp_id);
  							// this.clearField();

  						},(error)=>{
  							toastr.clear();
  							toastr.error(error, "Error in removing medical record.");
  							settings.isNavigating = false;
  						});

				});
			}
		});

	}

}