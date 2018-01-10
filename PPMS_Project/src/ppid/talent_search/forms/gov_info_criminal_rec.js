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
	}

	loadCivilCase(global_indiv_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("COURT_CASE_TRX")
					.where("GLOBAL_ID", "==", global_indiv_id);
		EntityManager().executeQuery(query).then((s1)=>{
			var tmp=[];
			var tmpLog=[];
			_.each(s1.results, (r)=>{
				tmp.push({
					court_case_id: r.COURT_CASE_ID,
					global_id: r.GLOBAL_ID,
					case_no: r.CASE_NO,
					case_stat_cd: r.CASE_STAT_CD,
					case_desc: r.CASE_DESC,
					criminal_fl: r.CRIMINAL_FL,
					start_dt: r.START_DT,
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

			toastr.clear();
			toastr.error("", "Civil cases has been loaded.");
			settings.isNavigating = false;

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying civil cases.");
		});
	}

	loadAdministrativeCase(global_indiv_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("GLOBAL_COMPANY_MSTR")
		 			.where("GLOBAL_ID","==", global_indiv_id);
		 EntityManager().executeQuery(query).then((s1)=>{

		 	var company_ids=[];
		 	var global_company_ids = [];
		 	_.each(s1.results, (r)=>{
		 		global_company_ids.push(r.GLOBAL_COMPANY_ID);
		 		var alreadyExist = company_ids.some((x)=>x == r.COMPANY_ID);
		 		if(!alreadyExist){
		 			var company = this.obj_personnel.COMPANY.find((x)=>{
		 				return x.value == r;
		 			});
		 			if(company != null){
		 				company_ids.push(company);
		 			}
		 		}
		 	});
		 	ddCompany = company_ids;
		 	_.each(global_company_ids, (c)=>{
		 		query = EntityQuery().from("ADMIN_CASE_TRX")
		 				.where("GLOBAL_COMPANY_ID", "==", c);
		 		EntityManager().executeQuery(query).then((s2)=>{

		 			var tmp=[];
		 			var tmpLog=[];
		 			_.each(s2.results, (r)=>{
		 				tmp.push({
		 					admin_case_id: r.ADMIN_CASE_ID,
		 					global_company_id: r.GLOBAL_COMPANY_ID,
		 					violation_cd: r.VIOLATION_CD,
		 					case_stat_cd: r.CASE_STAT_CD,
		 					eff_start_dt: moment.utc(r.EFF_START_DT).format("MM/DD/YYYY"),
		 					eff_end_dt: moment.utc(r.EFF_END_DT).format("MM/DD/YYYY")
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

		 			settings.isNavigating = false;
		 			toastr.clear();
		 			toastr.success("", "Administrative cases has been loaded.");
		 			this.obj_personnel.CRIMINAL_RECORD.administrative.list = tmp;


		 		}, (e2)=>{
		 			settings.isNavigating = false;
		 			toastr.clear();
		 			toastr.error(e2, "Error in querying administrative case.");
		 		});
		 	});

		 }, (e1)=>{
		 	settings.isNavigating = false;
		 	toastr.clear();
		 	toastr.erorr(e1, "Error in querying company ids.");
		 });

	}
}