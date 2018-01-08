import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import settings from 'settings';
import {OrderByDate} from '../../helpers';

@inject(obj_personnel, toastr, DialogService)
export class gov_info_criminal_rec{

	obj_personnel = null;
	lblCreatedByCivil=null;
	lblUpdatedByCivil=null;
	formStatusCivil="";
	_disableBtnAddCivil=false;
	_disableBtnSaveCivil=true;
	_disableFormCivil=true;
	_disableTableCivil=false;
	ddCompany = [];	
	lblCreatedByAdministrative=null;
	lblUpdatedByAdministrative=null;
	formStatusAdministrative="";
	_disableBtnAddAdministrative=false;
	_disableBtnSaveAdministrative=true;
	_disableFormAdministrative=true;
	_disableTableAdministrative=false;
	constructor(obj_personnel, toastr, DialogService){
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;

		this.obj_personnel.OBSERVERS.govinfo_tab_changed.push((tab_num, global_id)=>{
			if(tab_num == 2){
				$("#civil_start_dt").datepicker();
				$("#admin_eff_start_dt").datepicker();
				$("#admin_eff_end_dt").datepicker();		
				this.loadCivilCase(global_id);
				this.loadAdministrativeCase(global_id);
			}
		});
	}

	loadCivilCase(global_indiv_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("COURT_CASE_TRX")
					.where("GLOBAL_ID", "==", global_indiv_id);
		EntityManager().executeQuery(query).then((s1)=>{
			var tmp=[];
			var tmpLog=[];
			_.each(s1.results, (r)=>{
				var start_dt = null;
				if(moment(r.START_DT).isValid()){
					start_dt = moment.utc(r.START_DT).format("MM/DD/YYYY");
				}

				tmp.push({
					court_case_id: r.COURT_CASE_ID,
					global_id: r.GLOBAL_ID,
					case_no: r.CASE_NO,
					case_stat_cd: r.CASE_STAT_CD,
					case_desc: r.CASE_DESC,
					criminal_fl: r.CRIMINAL_FL,
					start_dt: start_dt,
					remarks: r.REMARKS
				});

				if(r.CREATED_BY != null){
					tmpLog.push({
						user: r.CREATED_BY,
						date: new Date(r.CREATED_DT)
					});
				}

				if(r.LAST_UPDATED_BY != null){
					tmpLog.push({
						user: r.LAST_UPDATED_BY,
						date: new Date(r.LAST_UPDATED_DT)
					});
				}

			});

			this.obj_personnel.CRIMINAL_RECORD.civil.list = tmp;
			tmpLog.sort(OrderByDate);
			if(tmpLog.length>0){

				this.lblCreatedByCivil = tmpLog[0].user + " " + moment.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
				if(tmpLog.length>1){
					var lastIndex = tmpLog.length-1;
					this.lblUpdatedByCivil = tmpLog[lastIndex].user + " " + moment.utc(tmpLog[lastIndex].date).format("MM/DD/YYYY hh:mm A");
				}else{
					this.lblUpdatedByCivil = "";
				}

			}else{
				this.lblCreatedByCivil = "";
				this.lblUpdatedByCivil = "";
			}

			// toastr.clear();
			toastr.success("", "Civil cases has been loaded.");
			settings.isNavigating = false;

		}, (e1)=>{
			settings.isNavigating = false;
			// toastr.clear();
			toastr.error(e1, "Error in querying civil cases.");
		});
	}

	loadAdministrativeCase(global_indiv_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("GLOBAL_COMPANY_MSTR")
		 			.where("GLOBAL_ID","==", global_indiv_id)
		 			.orderBy("COMPANY_ID");
		 EntityManager().executeQuery(query).then((s1)=>{

		 	var company_ids=[];
		 	var global_company_ids = [];
		 	_.each(s1.results, (r)=>{
		 		global_company_ids.push(r.GLOBAL_COMPANY_ID);

		 		// var alreadyExist = company_ids.some((x)=>x == r.COMPANY_ID);
		 		// if(!alreadyExist){
		 		var company = this.obj_personnel.COMPANY.find((x)=>{
		 			return x.id == r.COMPANY_ID;
		 		});
		 		if(company != null){
		 			company_ids.push({
		 				value: r.GLOBAL_COMPANY_ID,
		 				text: company.text
		 			});
		 			// company_ids.push(company);
		 		}
		 		// }
		 	});
		 	// console.log(company_ids);
		 	this.ddCompany = company_ids;

		 	// var tmp=[];
		 	this.obj_personnel.CRIMINAL_RECORD.administrative.list=[];
		 	var tmpLog=[];
		 	_.each(global_company_ids, (c)=>{
		 		query = EntityQuery().from("ADMIN_CASE_TRX")
		 				.where("GLOBAL_COMPANY_ID", "==", c);
		 		EntityManager().executeQuery(query).then((s2)=>{

		 			// console.log(s2.results);
		 			_.each(s2.results, (r)=>{
		 				var end_dt = null;
		 				if(moment(r.EFF_END_DT).isValid()){
		 					end_dt = moment.utc(r.EFF_END_DT).format("MM/DD/YYYY");
		 				}

		 				var company = company_ids.find((x)=>{
		 					return x.value == c;
		 				});
		 				var company_nm = null;
		 				if(company != null){
		 					company_nm = company.text;
		 				}


		 				// tmp.push({
		 					this.obj_personnel.CRIMINAL_RECORD.administrative.list.push({
		 					admin_case_id: r.ADMIN_CASE_ID,
		 					global_company_id: r.GLOBAL_COMPANY_ID,
		 					company_nm: company_nm,
		 					violation_cd: r.VIOLATION_CD,
		 					case_stat_cd: r.CASE_STAT_CD,
		 					eff_start_dt: moment.utc(r.EFF_START_DT).format("MM/DD/YYYY"),
		 					eff_end_dt: moment.utc(r.EFF_END_DT).format("MM/DD/YYYY"),
		 					remarks: r.REMARKS
		 				});

		 				if(r.CREATED_BY != null){
		 					tmpLog.push({
		 						user: r.CREATED_BY,
		 						date: new Date(r.CREATED_DT)
		 					});
		 				}

		 				if(r.LAST_UPDATED_BY != null){
		 					tmpLog.push({
		 						user: r.LAST_UPDATED_BY,
		 						date: new Date(r.LAST_UPDATED_DT)
		 					});
		 				}
		 			});

		 		}, (e2)=>{
		 			settings.isNavigating = false;
		 			// toastr.clear();
		 			toastr.error(e2, "Error in querying administrative case.");
		 		});
		 	});


		 	settings.isNavigating = false;
		 	// toastr.clear();
		 	toastr.success("", "Administrative cases has been loaded.");
		 	// this.obj_personnel.CRIMINAL_RECORD.administrative.list = tmp;
		 	if(tmpLog.length>0){

		 		this.lblCreatedByAdministrative = tmpLog[0].user + " " + moment.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
		 		if(tmpLog.length>1){
		 			var lastIndex = tmpLog.length-1;
		 			this.lblUpdatedByAdministrative = tmpLog[lastIndex].user + " " + moment.utc(tmpLog[lastIndex].date).format("MM/DD/YYYY hh:mm A");
		 		}else{
		 			this.lblUpdatedByAdministrative = "";
		 		}

		 	}else{
		 		this.lblCreatedByAdministrative = "";
		 		this.lblUpdatedByAdministrative = "";
		 	}

		 }, (e1)=>{
		 	settings.isNavigating = false;
		 	// toastr.clear();
		 	toastr.erorr(e1, "Error in querying company ids.");
		 });

	}

	btnAddCivil(){
		this._disableBtnAddCivil = true;
		this._disableBtnSaveCivil = false;
		this._disableFormCivil = false;
		this._disableTableCivil = true;
		this.formStatusCivil = "ADD";
	}

	btnEditCivil(item){
		this._disableBtnAddCivil = true;
		this._disableBtnSaveCivil = false;
		this._disableFormCivil = false;
		this._disableTableCivil = true;
		this.formStatusCivil = "EDIT";
		this.obj_personnel.CRIMINAL_RECORD.civil.model.court_case_id = item.court_case_id;
		this.obj_personnel.CRIMINAL_RECORD.civil.model.case_no = item.case_no;
		this.obj_personnel.CRIMINAL_RECORD.civil.model.case_desc = item.case_desc;
		this.obj_personnel.CRIMINAL_RECORD.civil.model.case_stat_cd = item.case_stat_cd;
		this.obj_personnel.CRIMINAL_RECORD.civil.model.start_dt = item.start_dt;
		this.obj_personnel.CRIMINAL_RECORD.civil.model.remarks = item.remarks;
		switch(item.criminal_fl){
			case "1": $("#criminal_fl").prop("checked", true);
				break;
			case "0": $("#criminal_fl").prop("checked", false);
				break;
		}
	}

	btnRemoveCivil(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('COURT_CASE_TRX').where('COURT_CASE_ID', '==', item.court_case_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.success("","The record was successfully removed.");
  							this.loadCivilCase(this.obj_personnel.global_indiv_id);
  						},(error)=>{
  							toastr.clear();
  							toastr.error("", "Error in removing court case.");
  							settings.isNavigating = false;
  						});
  					});
  				}
  		});
	}

	clearFieldCivil(){
		this._disableBtnAddCivil = false;
		this._disableBtnSaveCivil = true;
		this._disableFormCivil = true;
		this._disableTableCivil = false;
		$("#criminal_fl").prop("checked", false);
		this.formStatusCivil = "";
		this.obj_personnel.CRIMINAL_RECORD.civil.model = {};
	}

	validateCivil(){
		var strValidation = "";

		this.obj_personnel.CRIMINAL_RECORD.civil.model.start_dt = $("#civil_start_dt").val();
		this.obj_personnel.CRIMINAL_RECORD.civil.model.criminal_fl = $('#criminal_fl').is(":checked");

		if(this.obj_personnel.CRIMINAL_RECORD.civil.model.case_no == undefined || this.obj_personnel.CRIMINAL_RECORD.civil.model.case_no == null || this.obj_personnel.CRIMINAL_RECORD.civil.model.case_no.length==0){
			strValidation+="No case number specified.<br/>";
		}

		if(this.obj_personnel.CRIMINAL_RECORD.civil.model.case_stat_cd == undefined || this.obj_personnel.CRIMINAL_RECORD.civil.model.case_stat_cd == null || this.obj_personnel.CRIMINAL_RECORD.civil.model.case_stat_cd.length==0){
			strValidation+="No case status specified.<br/>";
		}

		if(this.obj_personnel.CRIMINAL_RECORD.civil.model.start_dt == undefined || this.obj_personnel.CRIMINAL_RECORD.civil.model.start_dt == null || this.obj_personnel.CRIMINAL_RECORD.civil.model.start_dt.length==0){
			strValidation+="No start date specified.<br/>";
		}else{
			if(!moment(this.obj_personnel.CRIMINAL_RECORD.civil.model.start_dt).isValid()){
				strValidation+="Invalid start date.<br/>";
			}else{
				var d1 = new Date(this.obj_personnel.CRIMINAL_RECORD.civil.model.start_dt);
				var d2 = new Date();
				if(d1>d2){
					strValidation+="Start date cannot be greater than date today.<br/>";
				}
			}
		}

		if(this.obj_personnel.CRIMINAL_RECORD.civil.model.case_desc == undefined || this.obj_personnel.CRIMINAL_RECORD.civil.model.case_desc == null || this.obj_personnel.CRIMINAL_RECORD.civil.model.case_desc.length==0){
			strValidation+="No case description specified.<br/>";
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.formStatusCivil == "ADD"){
				this.saveCivilRecord(this.obj_personnel.global_indiv_id);
			}else if(this.formStatusCivil == "EDIT"){
				this.updateCivilRecord(this.obj_personnel.CRIMINAL_RECORD.civil.model.court_case_id);
			}
		}
	}

	saveCivilRecord(global_indiv_id){

		settings.isNavigating = false;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("COURT_CASE_TRX")
					.orderByDesc("COURT_CASE_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{

			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].COURT_CASE_ID+1;
			}

			var civil_rec = {
				COURT_CASE_ID: maxId,
				GLOBAL_ID: global_indiv_id,
				CASE_NO: this.obj_personnel.CRIMINAL_RECORD.civil.model.case_no,
				CASE_STAT_CD: this.obj_personnel.CRIMINAL_RECORD.civil.model.case_stat_cd,
				START_DT: new Date(moment(this.obj_personnel.CRIMINAL_RECORD.civil.model.start_dt).add(8, "hours")),
				CASE_DESC: this.obj_personnel.CRIMINAL_RECORD.civil.model.case_desc,
				CRIMINAL_FL: this.obj_personnel.CRIMINAL_RECORD.civil.model.criminal_fl?1:0,
				REMARKS: this.obj_personnel.CRIMINAL_RECORD.civil.model.remarks,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};
			// console.log(civil_rec);

			var entity = EntityManager().createEntity("COURT_CASE_TRX", civil_rec);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadCivilCase(global_indiv_id);
				this.clearFieldCivil();

			}, (e2)=>{
				if(entity != null){
					entity.entityAspect.setDeleted();
				}

				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in saving court case.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in quering court case id.");
		});

	}

	updateCivilRecord(court_case_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("COURT_CASE_TRX")
					.where("COURT_CASE_ID", "==", court_case_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].CASE_NO = this.obj_personnel.CRIMINAL_RECORD.civil.model.case_no;
			s1.results[0].CASE_STAT_CD = this.obj_personnel.CRIMINAL_RECORD.civil.model.case_stat_cd;
			s1.results[0].CRIMINAL_FL = this.obj_personnel.CRIMINAL_RECORD.civil.model.criminal_fl?1:0;
			s1.results[0].START_DT = new Date(moment(this.obj_personnel.CRIMINAL_RECORD.civil.model.start_dt).add(8, "hours"));
			s1.results[0].CASE_DESC = this.obj_personnel.CRIMINAL_RECORD.civil.model.case_desc;
			s1.results[0].REMARKS = this.obj_personnel.CRIMINAL_RECORD.civil.model.remarks;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().executeQuery(query).then((s2)=>{

				toastr.clear();
				toastr.success("", "Record updated.");
				this.loadCivilCase(this.obj_personnel.global_indiv_id);
				this.clearFieldCivil();

			}, (e2)=>{
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in updating court case info.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying court case info.");
		});

	}

	btnAddAdministrative(){
		this._disableBtnAddAdministrative = true;
		this._disableBtnSaveAdministrative = false;
		this._disableFormAdministrative = false;
		this._disableTableAdministrative = true;
		this.formStatusAdministrative = "ADD";
	}

	btnEditAdministrative(item){
		this._disableBtnAddAdministrative = true;
		this._disableBtnSaveAdministrative = false;
		this._disableFormAdministrative = false;
		this._disableTableAdministrative = true;
		this.formStatusAdministrative = "EDIT";
		this.obj_personnel.CRIMINAL_RECORD.administrative.model.admin_case_id = item.admin_case_id;
		this.obj_personnel.CRIMINAL_RECORD.administrative.model.global_company_id = item.global_company_id.toString();
		this.obj_personnel.CRIMINAL_RECORD.administrative.model.violation_cd = item.violation_cd;
		this.obj_personnel.CRIMINAL_RECORD.administrative.model.case_stat_cd = item.case_stat_cd;
		this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_start_dt = item.eff_start_dt;
		this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_end_dt = item.eff_end_dt;
		this.obj_personnel.CRIMINAL_RECORD.administrative.model.remarks = item.remarks;
	}

	btmRemoveAdministrative(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('ADMIN_CASE_TRX').where('ADMIN_CASE_ID', '==', item.admin_case_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.success("","The record was successfully removed.");
  							this.loadAdministrativeCase(this.obj_personnel.global_indiv_id);
  						},(error)=>{
  							toastr.clear();
  							toastr.error("", "Error in removing administrative case.");
  							settings.isNavigating = false;
  						});
  					});
  				}
  		});
	}

	clearFieldAdministrative(){
		this._disableBtnAddAdministrative = false;
		this._disableBtnSaveAdministrative = true;
		this._disableFormAdministrative = true;
		this._disableTableAdministrative = false;
		this.formStatusAdministrative = "";
		this.obj_personnel.CRIMINAL_RECORD.administrative.model = {};
	}

	validateAdministrative(){

		var strValidation = "";
		this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_start_dt = $("#admin_eff_start_dt").val();
		this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_end_dt = $("#admin_eff_end_dt").val();

		if(this.obj_personnel.CRIMINAL_RECORD.administrative.model.global_company_id == undefined || this.obj_personnel.CRIMINAL_RECORD.administrative.model.global_company_id == null || this.obj_personnel.CRIMINAL_RECORD.administrative.model.global_company_id.length==0){
			strValidation+="No company specified.<br/>";
		}

		if(this.obj_personnel.CRIMINAL_RECORD.administrative.model.violation_cd == undefined || this.obj_personnel.CRIMINAL_RECORD.administrative.model.violation_cd == null || this.obj_personnel.CRIMINAL_RECORD.administrative.model.violation_cd.length==0){
			strValidation+="No violation specified.<br/>";
		}

		if(this.obj_personnel.CRIMINAL_RECORD.administrative.model.case_stat_cd == undefined || this.obj_personnel.CRIMINAL_RECORD.administrative.model.case_stat_cd == null || this.obj_personnel.CRIMINAL_RECORD.administrative.model.case_stat_cd.length==0){
			strValidation+="No case status specified.<br/>";
		}

		if(this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_start_dt==undefined || this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_start_dt==null || this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_start_dt.length==0){
			strValidation+="No start date specified.<br/>";
		}else{
			if(moment(this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_start_dt).isValid()){
				var d1 = new Date(this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_start_dt);
				var d2 = new Date();
				if(d1>d2){
					strValidation+="Start date cannot be greater than date today.<br/>";
				}else{
					if(moment(this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_end_dt).isValid()){
						var end = new Date(this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_end_dt);
						if(d1>end){
							strValidation+="End date cannot be greater than start date.<br/>";
						}

					}else{
						strValidation+="Invalid end date.<br/>";
					}
				}
			}else{
				strValidation+="Invalid start date.<br/>";
			}
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.formStatusAdministrative=="ADD"){
				this.saveAdministrativeRecord(this.obj_personnel.global_indiv_id);
			}else if(this.formStatusAdministrative=="EDIT"){
				this.updateAdministrativeRecord(this.obj_personnel.CRIMINAL_RECORD.administrative.model.admin_case_id);
			}
		}
	}

	saveAdministrativeRecord(){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var start_dt = new Date(moment(this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_start_dt).add(8, "hours"));
		var end_dt = null;
		if(moment(this.obj_personnel.CRIMINAL_RECORD.administrative.model).isValid()){
			end_dt = new Date(moment(this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_end_dt).add(8, "hours"));
		}
		var query = EntityQuery().from("ADMIN_CASE_TRX")
					.orderByDesc("ADMIN_CASE_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{

			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].ADMIN_CASE_ID+1;
			}

			var admin_case= {
				ADMIN_CASE_ID: maxId,
				GLOBAL_COMPANY_ID: this.obj_personnel.CRIMINAL_RECORD.administrative.model.global_company_id,
				VIOLATION_CD: this.obj_personnel.CRIMINAL_RECORD.administrative.model.violation_cd,
				CASE_STAT_CD: this.obj_personnel.CRIMINAL_RECORD.administrative.model.case_stat_cd,
				EFF_START_DT: start_dt,
				EFF_END_DT: end_dt,
				// EFF_START_DT: this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_start_dt,
				// EFF_END_DT: this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_end_dt,
				REMARKS: this.obj_personnel.CRIMINAL_RECORD.administrative.model.remarks,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};
			var entity = EntityManager().createEntity("ADMIN_CASE_TRX", admin_case);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadAdministrativeCase(this.obj_personnel.global_indiv_id);
				this.clearFieldAdministrative();

			}, (e2)=>{
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in saving administrative record.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying admin case id.");
		});
	}

	updateAdministrativeRecord(admin_case_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var start_dt = new Date(moment(this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_start_dt).add(8, "hours"));
		var end_dt = null;
		if(moment(this.obj_personnel.CRIMINAL_RECORD.administrative.model).isValid()){
			end_dt = new Date(moment(this.obj_personnel.CRIMINAL_RECORD.administrative.model.eff_end_dt).add(8, "hours"));
		}
		var query = EntityQuery().from("ADMIN_CASE_TRX")
					.where("ADMIN_CASE_ID", "==", admin_case_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].GLOBAL_COMPANY_ID = this.obj_personnel.CRIMINAL_RECORD.administrative.model.global_company_id;
			s1.results[0].VIOLATION_CD = this.obj_personnel.CRIMINAL_RECORD.administrative.model.violation_cd;
			s1.results[0].CASE_STAT_CD = this.obj_personnel.CRIMINAL_RECORD.administrative.model.case_stat_cd;
			s1.results[0].EFF_START_DT = start_dt;
			s1.results[0].EFF_END_DT = end_dt;
			s1.results[0].REMARKS = this.obj_personnel.CRIMINAL_RECORD.administrative.model.remarks;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record updated.");
				this.loadAdministrativeCase(this.obj_personnel.global_indiv_id);
				this.clearFieldAdministrative();

			}, (e2)=>{
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in updating administrative record.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e2, "Error in querying administrative record.");
		});

	}


}