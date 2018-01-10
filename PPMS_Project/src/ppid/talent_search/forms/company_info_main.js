import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from 'entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import {getLookups} from 'masterfiles';
import {isDigit} from "helpers";
import settings from 'settings';


@inject(obj_personnel, toastr, DialogService)
export class company_info_main{
	
	obj_personnel = null;
	_disableLocations = true;
	_disableIDNo = false;
	_disableStatus=true;
	_disableTabsInput = true;
	_hideSuspendField=true;
	_hideInactiveField=true;
	_hideCessationDate=true;
	_hideInactiveReason=true;
	lblCreatedBy=null;
	lblUpdatedBy=null;
	alreadyLoaded = false;
	accreditation_status="";
	accreditation_joblist=[];
	constructor(obj_personnel, toastr, DialogService){
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;
		this.obj_personnel.OBSERVERS.tab_changed.push((tab_num, global_id)=>{
			if(tab_num == 4){
				if(!this.alreadyLoaded){
					this.alreadyLoaded=false;
					$("#_start_dt").datepicker();
					$("#_end_dt").datepicker();
					$("#kapamilya_dt").datepicker();
					$("#membership_dt").datepicker();
					$("#suspended_start_dt").datepicker();
					$("#suspended_end_dt").datepicker();
					$("#cessation_end_dt").datepicker();
					$("#a_start_dt").datepicker();
					$("#a_end_dt").datepicker();
					toastr.clear();
					toastr.info("", "Loading company info...");
					// this.dd_companyChanged();
					if(this.obj_personnel.COMPANY.length>0){
						this.obj_personnel.COMPANY_SPECIFIC.model.company_id = this.obj_personnel.COMPANY[0].id;
						
					}
					this.loadGlobalCompany(global_id);
				}
			}
		});

		this.obj_personnel.OBSERVERS.company_tab_changed.push((tab_num, global_id)=>{
			if(tab_num==0){
				toastr.clear();
				toastr.info("", "Loading company info...");
				this.loadGlobalCompany(global_id);
			}
		});

		this.obj_personnel.OBSERVERS.clear_ppid.push(()=>{
			this.obj_personnel.COMPANY_SPECIFIC = {
				model:{					
					personnel_bank:{}
				},
				list:[]
			}
			this.alreadyLoaded = false;
		});
	}

	loadGlobalCompany(global_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("GLOBAL_COMPANY_MSTR")
					.where("GLOBAL_ID", "==", global_id)
					.orderBy("COMPANY_ID");
		EntityManager().executeQuery(query).then((success)=>{
			var tmp=[];
			_.each(success.results, (r)=>{
				// var suspend = [];
				// if(r.STATUS_CD == "SUSPEND"){
				// 	suspend = this.loadSuspend(global_id, r.COMPANY_ID);
				// }
				// var accreditation = this.loadAccreditation(r.GLOBAL_COMPANY_ID);
				tmp.push({
					global_company_id: r.GLOBAL_COMPANY_ID,
					global_id: r.GLOBAL_ID,
					id_no: r.ID_NO, 
					company_id: r.COMPANY_ID,
					start_dt: r.START_DT,
					end_dt: r.END_DT,
					kapamilya_dt: r.KAPAMILYA_DT,
					membership_dt: r.MEMBERSHIP_DT,
					exclusive_fl: r.EXCLUSIVE_FL,
					status_cd: r.STATUS_CD,
					cessation_reason_cd: r.CESSATION_REASON_CD,
					remarks: r.REMARKS,
					division_id: r.DIVISION_ID,
					location_cd: r.LOCATION_CD,
					category_id: r.CATEGORY_ID,
					job_id: r.JOB_ID,
					payroll_grp_id: r.PAYROLL_GRP_ID,
					professional_type_cd: r.PROFESSIONAL_TYPE_CD,
					cessation_end_dt: r.CESSATION_END_DATE,
					inactive_reason_cd: r.INACTIVE_REASON_CD
					// accreditation: accreditation
					// suspend_id: suspend.length==0?0: suspend[0].suspend_id,
					// suspended_start_dt: suspend.length==0?"":suspend[0].start_dt,
					// suspended_end_dt: suspend.length==0?"":suspend[0].end_dt
				});
			});
			this.obj_personnel.COMPANY_SPECIFIC.list = tmp;
			toastr.clear();
			toastr.success("", "Company info has been loaded...");
			if(this.obj_personnel.COMPANY.length>0){
				// this.obj_personnel.COMPANY_SPECIFIC.model.company_id = this.obj_personnel.COMPANY[0].id;
				// console.log(tmp);
				this.dd_companyChanged();
			}
			settings.isNavigating = false;

		}, (failed)=>{
			settings.isNavigating = false;
			toastr.error(failed, "error in fetching company specific data.");
		});

	}

	loadAccreditation(global_company_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("ACCREDITATION_TRX")
					.where("GLOBAL_COMPANY_ID", "==", global_company_id);
		var accreditation = [];
		EntityManager().executeQuery(query).then((success)=>{
			_.each(success.results, (r)=>{

				var job_group = this.obj_personnel.JOB_GROUP.find((x)=>{ return x.id==r.JOB_GRP_ID; });
				var job = this.obj_personnel.JOB.find((x)=> { return x.value==r.JOB_ID; });
				var division = this.obj_personnel.DIVISION.find((x)=>{ return x.id==r.DIVISION_ID; });
				var _eff_start_dt = moment.utc(r.EFF_START_DT).format("MM/DD/YYYY");
				var _eff_end_dt = moment.utc(r.EFF_END_DT).format("MM/DD/YYYY");

				accreditation.push({
					accreditation_id: r.ACCREDITATION_ID,
					global_company_id: r.GLOBAL_COMPANY_ID,
					// eff_start_dt: r.EFF_START_DT,
					// eff_end_dt: r.EFF_END_DT,
					eff_start_dt: _eff_start_dt,
					eff_end_dt: _eff_end_dt,
					division_id: r.DIVISION_ID,
					division_text: division.text,
					category_id: r.CATEGORY_ID,					
					job_grp_id: r.JOB_GRP_ID,
					job_grp_text: job_group.text,
					job_id: r.JOB_ID,
					job_text: job.text,
					competency: r.COMPETENCY,
					home_fl: r.HOME_FL,
					entry_fl: r.ENTRY_FL,
					accreditation_memo: r.ACCREDITATION_MEMO
				});
			});
			this.obj_personnel.COMPANY_SPECIFIC.model.accreditation_list = accreditation;
			settings.isNavigating = false;
		}, (failed)=>{
			settings.isNavigating = false;
			toastr.error(failed, "Error in fetching company specific data.");
		});
	}

	loadSuspend(global_id, company_id){

		settings.isNavigating = true;
		var pred1 = breeze.Predicate.create('GLOBAL_ID', '==', global_id);		
		var pred2 = breeze.Predicate.create('SUSPEND_LEVEL', '==', 2);
		var pred3 = breeze.Predicate.create("COMPANY_ID", "==", company_id);
		var finalPred = breeze.Predicate.and([pred1, pred2]);
		var query = EntityQuery().from("SUSPEND_TRX")
					.where(finalPred).orderByDesc("SUSPEND_ID").take(1);
		var suspend = [];
		EntityManager().executeQuery(query).then((success)=>{
			
			if(success.results.length>0){
				_.each(success.results, (result)=>{
					suspend.push({
						suspend_id: result.SUSPEND_ID,
						start_dt: result.START_DT,
						end_dt: result.END_DT,
						company_id: result.COMPANY_ID
					});
				});

				this.obj_personnel.COMPANY_SPECIFIC.model.suspend_id = suspend[0].suspend_id;

				var suspended_start_dt = moment.utc(suspend[0].start_dt).format("MM/DD/YYYY");
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = suspended_start_dt;
				if(suspended_start_dt.length>0)
				{
					$("#suspended_start_dt").datepicker("setValue", suspended_start_dt);
				}

				var suspended_end_dt = moment.utc(suspend[0].end_dt).format("MM/DD/YYYY");
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt = suspended_end_dt;
				if(suspended_start_dt.length>0)
				{						
					$("#suspended_end_dt").datepicker("setValue", suspended_end_dt);
				}
			}
			settings.isNavigating = false;
		}, (error)=>{
			settings.isNavigating = false;
			toastr.error(error, "Error in fetching company specific data.");
		});
		// return suspend;
	}

	loadPersonnelBank(global_company_id){

		settings.isNavigating = true;
		var pred1 = breeze.Predicate.create("GLOBAL_COMPANY_ID", "==", global_company_id);
		var pred2 = breeze.Predicate.create("ACCOUNT_NO", "!=", "CHECK");
		var finalPred = breeze.Predicate.and([pred1, pred2]);
		var query = EntityQuery().from("PERSONNEL_BANK_TRX")
					.where(finalPred).take(1);
					// .where("GLOBAL_COMPANY_ID", "==", global_company_id);
		EntityManager().executeQuery(query).then((s1)=>{
			// console.log("PERSONNEL BANK");
			if(s1.results.length>0){
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.personnel_bank_id = s1.results[0].PERSONNEL_BANK_ID;
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.global_company_id = s1.results[0].GLOBAL_COMPANY_ID;
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id = s1.results[0].BANK_ID+"";
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name = s1.results[0].ACCT_NAME;
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no = s1.results[0].ACCOUNT_NO;
			}else{
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.personnel_bank_id = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.global_company_id = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id="";
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no = "";
			}
			this.dd_bankChanged();
			settings.isNavigating = false;
		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in querying personnel bank info.");
		});
	}

	loadLog(global_company_id){
		var tmpList = [];
		var query = EntityQuery().from("GLOBAL_COMPANY_MSTR")
					.where("GLOBAL_COMPANY_ID", "==", global_company_id);
		EntityManager().executeQuery(query).then((s1)=>{

			if(s1.results.length>0){
				if(s1.results[0].CREATED_BY != null){
					var user = s1.results[0].CREATED_BY;
					var date = new Date(s1.results[0].CREATED_DT);
					this.lblCreatedBy = user + ' ' + moment.utc(date).format("MM/DD/YYYY hh:mm A");					
				}

				if(s1.results[0].LAST_UPDATED_BY != null){
					var user = s1.results[0].LAST_UPDATED_BY;
					var date = new Date(s1.results[0].LAST_UPDATED_DT);
					this.lblUpdatedBy = user + ' ' + moment.utc(date).format("MM/DD/YYYY hh:mm A");
				}else{
					this.lblUpdatedBy = "";
				}

			}

			// _.each(s1.results, (r)=>{
			// 	if(r.CREATED_BY != null){
			// 		tmpList.push({
			// 			user: r.CREATED_BY,
			// 			date: new Date(r.CREATED_DT)
			// 		});
			// 	}

			// 	if(r.LAST_UPDATED_BY != null){
			// 		tmpList.push({
			// 			useR: r.LAST_UPDATED_BY,
			// 			date: new Date(r.LAST_UPDATED_DT)
			// 		});
			// 	}
			// });

			// tmpList.sort(this.OrderByDate);
			// var LastIndex = tmpList.length-1;
			// if(tmpList.length>0){

			// 	this.lblCreatedBy = tmpList[0].user + ' ' +moment.utc(tmpList[0].date).format("MM/DD/YYYY hh:mm A");
			// 	if(tmpList.length>1){
			// 		this.lblUpdatedBy = tmpList[LastIndex].user + ' ' + moment.utc(tmpList[LastIndex].date).format("MM/DD/YYYY hh:mm A");
			// 	}else{
			// 		this.lblUpdatedBy = "";
			// 	}

			// }else{
			// 	this.lblCreatedBy = "";
			// 	this.lblUpdatedBy = "";
			// }


		});

	} 

	OrderByDate(a, b){
		if(a.date > b.date)
			return 1;
		if(a.date < b.date)
			return -1;
		return 0;		
	}

	loadJobDropdown(){
		this.obj_personnel.JOB=[];
		_.each(this.obj_personnel.JOB_GROUP, (jc)=>{
			getLookups().JOB_MSTR.forEach((j)=>{
				if(j.JOB_GRP_ID == jc.id){
					this.obj_personnel.JOB.push({
						//id: j.JOB_ID,
						value: j.JOB_ID,
						text: j.JOB_DESC,
						group: j.JOB_GRP_ID
					});
				}
			});
		});
		this.obj_personnel.JOB.sort(this.OrderByText);		
	
	}

	dd_companyChanged(){

		var company_id = this.obj_personnel.COMPANY_SPECIFIC.model.company_id;

		if(company_id == 2 || company_id == 3 || company_id == 4  || company_id==7 || company_id == 8){
			this._disableIDNo = false;
			this.obj_personnel.COMPANY_SPECIFIC.model.id_no = "";
		}else{
			this._disableIDNo = true;
			this.obj_personnel.COMPANY_SPECIFIC.model.id_no = "000000";
		}

		var global_company = this.obj_personnel.COMPANY_SPECIFIC.list.find((gc)=>{
			return gc.company_id == company_id;
		});

		if(getLookups() != null){

			this.obj_personnel.DIVISION=[];
			this.obj_personnel.CATEGORY=[];
			this.obj_personnel.JOB_GROUP=[];
			// if(selectedCompany.id == 1){
			// 	this.obj_personnel.JOB_CATEGORY.push({
			// 		id:0,
			// 		value: "",
			// 		text: "(OBSOLETE-NO-USE)"
			// 	});
			// }

			getLookups().DIVISION_MSTR.forEach((d)=>{
				if(d.COMPANY_ID == company_id){
					this.obj_personnel.DIVISION.push({
						id: d.DIVISION_ID,
						level: d.DIVISION_LEVEL,
						value: d.DIVISION_CD,
						text: d.DIVISION_NAME
					});
				}
			});

			getLookups().CATEGORY_MSTR.forEach((c)=>{
				if(c.COMPANY_ID == company_id){
					this.obj_personnel.CATEGORY.push({
						id: c.CATEGORY_ID,
						value: c.CATEGORY_CD,
						text: c.CATEGORY_DESC
					});
				}
			});

			getLookups().JOB_GRP_MSTR.forEach((j)=>{
				if(j.COMPANY_ID == company_id){
					this.obj_personnel.JOB_GROUP.push({
						id: j.JOB_GRP_ID,
						value: j.JOB_GRP_CD,
						text: j.JOB_GRP_DESC
					});
				}
			});

			this.obj_personnel.JOB_GROUP.sort(this.OrderByText);
			this.obj_personnel.CATEGORY.sort(this.OrderByText);

			if(global_company != null && global_company != undefined){
				this._disableStatus = false;
				this._disableTabsInput = false;
				this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id = global_company.global_company_id;
				this.obj_personnel.COMPANY_SPECIFIC.model.id_no = global_company.id_no;
				console.log(global_company.start_dt);
				if(moment(global_company.start_dt).isValid()){
					var startDt = moment.utc(global_company.start_dt).format("MM/DD/YYYY");
					if(startDt != "01/01/0001")
					{
						this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = startDt;
						$("#_start_dt").datepicker("setValue", new Date(startDt));
					}else{
						this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = "";
					}
				}else{
					this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = "";
				}

				if(moment(global_company.end_dt).isValid()){
					var endDt = moment.utc(global_company.end_dt).format("MM/DD/YYYY");
					if(endDt != "01/01/0001"){
						this.obj_personnel.COMPANY_SPECIFIC.model.end_dt = endDt;
						$("#_end_dt").datepicker("setValue", new Date(endDt));
					}else{
						this.obj_personnel.COMPANY_SPECIFIC.model.end_dt="";
					}
				}else{
					this.obj_personnel.COMPANY_SPECIFIC.model.end_dt="";
				}

				if(moment(global_company.kapamilya_dt).isValid()){
					var kapamilya_dt = moment.utc(global_company.kapamilya_dt).format("MM/DD/YYYY");
					if(kapamilya_dt != "01/01/0001"){
						this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = kapamilya_dt;
						$("#kapamilya_dt").datepicker("setValue", new Date(kapamilya_dt));
					}else{
						this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = "";
					}
				}else{
					this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = "";
				}

				if(moment(global_company.membership_dt).isValid()){
					var membership_dt = moment.utc(global_company.membership_dt).format("MM/DD/YYYY");
					if(membership_dt != "01/01/0001"){
						this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = membership_dt;
						$("#membership_dt").datepicker("setValue", new Date(membership_dt));
					}else{
						this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = "";
					}
				}else{
					this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = "";
				}

				if(moment(global_company.cessation_end_dt).isValid()){
					var cessation_dt = moment.utc(global_company.cessation_end_dt).format("MM/DD/YYYY");
					this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt = cessation_dt;
					$("#cessation_end_dt").datepicker("setValue", new Date(cessation_dt));
				}else{
					this.obj_personnel.COMPANY_SPECIFIC.model.cessation_dt = "";
				}

				this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl = global_company.exclusive_fl=="1"?true:false;
				this.obj_personnel.COMPANY_SPECIFIC.model.status_cd = global_company.status_cd;
				this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd = global_company.cessation_reason_cd;
				this.obj_personnel.COMPANY_SPECIFIC.model.remarks = global_company.remarks;
				this.obj_personnel.COMPANY_SPECIFIC.model.division_id = global_company.division_id+"";
				// this.obj_personnel.COMPANY_SPECIFIC.model.division_cd = this.obj_personnel.DIVISION[0].value;
				this.obj_personnel.COMPANY_SPECIFIC.model.location_cd = global_company.location_cd;
				this.obj_personnel.COMPANY_SPECIFIC.model.category_id= global_company.category_id+"";					
				// this.obj_personnel.COMPANY_SPECIFIC.model.category_id = this.obj_personnel.CATEGORY[0].value;
				this.obj_personnel.COMPANY_SPECIFIC.model.payroll_grp_id = global_company.payroll_grp_id+"";
				this.obj_personnel.COMPANY_SPECIFIC.model.professional_type_cd = global_company.professional_type_cd;
				if(global_company.status_cd == "SUSPEND"){					
					this.loadSuspend(global_company.global_id, global_company.company_id);
				}

				this.obj_personnel.COMPANY_SPECIFIC.model.accreditation = global_company.accreditation;
				this.loadJobDropdown();
				this.obj_personnel.COMPANY_SPECIFIC.model.job_id = global_company.job_id+"";
				this.loadAccreditation(global_company.global_company_id);
				this.loadPersonnelBank(global_company.global_company_id);
				this.loadLog(global_company.global_company_id);
				this.obj_personnel.COMPANY_SPECIFIC.model.inactive_reason_cd = global_company.inactive_reason_cd;

			}else{
				this._disableStatus = true;
				this._disableTabsInput = true;
				// this.obj_personnel.COMPANY_SPECIFIC.model = {};
				this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.status_cd="ACTV";
				this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = "";								
				this.obj_personnel.COMPANY_SPECIFIC.model.end_dt= "";
				this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.remarks = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl = false;
				this.lblCreatedBy = "";
				this.lblUpdatedBy = "";
				if(this.obj_personnel.DIVISION.length>0)
					this.obj_personnel.COMPANY_SPECIFIC.model.division_id = this.obj_personnel.DIVISION[0].id;
				if(this.obj_personnel.CATEGORY.length>0)
					this.obj_personnel.COMPANY_SPECIFIC.model.category_id = this.obj_personnel.CATEGORY[0].id;			

				this.loadJobDropdown();				

				if(this.obj_personnel.JOB.length>0)
					this.obj_personnel.COMPANY_SPECIFIC.model.job_id = this.obj_personnel.JOB[0].value;

				if(this.obj_personnel.PAYROLL_GROUP.length>0)
					this.obj_personnel.COMPANY_SPECIFIC.model.payroll_grp_id = this.obj_personnel.PAYROLL_GROUP[0].id;
				if(this.obj_personnel.PROFESSIONAL_TYPE.length>0)
					this.obj_personnel.COMPANY_SPECIFIC.model.professional_type_cd = this.obj_personnel.PROFESSIONAL_TYPE[0].value;

				this.obj_personnel.COMPANY_SPECIFIC.model.suspend_id = 0;
				this.obj_personnel.COMPANY_SPECIFIC.model.accreditation_list=[];
				
				if(this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank != undefined && this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank != null){
					this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.personnel_bank_id = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.global_company_id = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id="";
					this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no = "";
				}

				this.obj_personnel.COMPANY_SPECIFIC.model.inactive_reason_cd = "";

			}

			if(this.obj_personnel.JOB_GROUP.length>0){
				this.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id = this.obj_personnel.JOB_GROUP[0].id;
			}


			this.dd_jobGroupChange();
			this.dd_divisionChanged();
			this.dd_statusChanged();
			
		}
		
	}

	dd_divisionChanged(){
		var division_id  = this.obj_personnel.COMPANY_SPECIFIC.model.division_id;
		var division = this.obj_personnel.DIVISION.find((d)=>{
			return d.id == division_id;
		});

		// console.log(this.obj_personnel.COMPANY_SPECIFIC.model.division_cd);
		if((division != undefined && division != null) && division.text.indexOf("REGIONAL DIVISION")  != -1){
			this._disableLocations = false;
		}else{
			this._disableLocations = true;
			this.obj_personnel.COMPANY_SPECIFIC.model.location_cd = "--NONE--";
		}
	}

	dd_statusChanged(){
		var stat = this.obj_personnel.COMPANY_SPECIFIC.model.status_cd;
		if(stat=="ACTV"){
			this._hideInactiveField = true;
			this._hideSuspendField = true;
			this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd="";
			this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt="";
			this.obj_personnel.COMPANY_SPECIFIC.model.remarks = "";
			this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = "";
			$("#suspended_start_dt").val("");
			this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt="";
			$("#suspended_end_dt").val("");
		}else if(stat=="INACTV"){
			this._hideInactiveField = false;
			this._hideSuspendField = true;
			this.dd_cessationStatusChanged();
			this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = "";
			$("#suspended_start_dt").val("");
			this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt="";
			$("#suspended_end_dt").val("");
		}else if(stat=="SUSPEND"){			
			this._hideInactiveField = true;
			this._hideSuspendField = false;			
			this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd="";
			this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt="";
			this.obj_personnel.COMPANY_SPECIFIC.model.remarks = "";
		}
	}

	dd_cessationStatusChanged(){
		var cess_cd = this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd;
		switch(cess_cd){			
			case "DECEASED":
			case "RETIRED":
			case "RESIGNED":
			case "END_CONTRACT":
			case "TERMINATION": this._hideCessationDate = false;
								this._hideInactiveReason = true;
				break;
			case "INACTIVE": this._hideInactiveReason = false;
							 this._hideCessationDate = true;
				break;
			default: this._hideCessationDate = true;
					 this._hideInactiveReason = true;
				this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt = "";
				break;
		}
	}

	validate(){

		this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = $("#_start_dt").val();
		this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt = $("#cessation_end_dt").val();
		var strValidation = "";

		// if(this.obj_personnel.COMPANY_SPECIFIC.model.start_dt == null || this.obj_personnel.COMPANY_SPECIFIC.model.start_dt.length==0){
		// 	strValidation+= "No start date specified. <br/>";
		// }

		if(this.obj_personnel.COMPANY_SPECIFIC.model.id_no == undefined || this.obj_personnel.COMPANY_SPECIFIC.model.id_no == null || this.obj_personnel.COMPANY_SPECIFIC.model.id_no.length==0){
			strValidation+="No id number specified. <br/>";
		}		

		if(this.obj_personnel.COMPANY_SPECIFIC.model.status_cd == "SUSPEND"){

			var sus_start = null;
			var sus_end = null;
			this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = $("#suspended_start_dt").val();
			this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt = $("#suspended_end_dt").val();
			if(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt != undefined && this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt != null && this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt.length>0){
				if(!moment(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt).isValid()){
					strValidation+="Invalid suspension start date.<br/>";
				}else{
					sus_start = new Date(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt);
				}
			}else{
				strValidation+= "No start date of suspension specified.<br/>";
			}

			if(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt != undefined && this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt != null && this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt.length>0){			
				if(!moment(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt).isValid()){
					strValidation+="Invalid suspension end date.<br/>";
				}else{
					sus_end = new Date(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt);
				}
			}else{
				strValidation+= "No end date of suspension specified.<br/>";	
			}

			if(sus_start != null && sus_end != null){
				if(sus_end < sus_start){
					strValidation+= "end date of suspension cannot be greater than the start date.<br/>";
				}
			}
		}else if(this.obj_personnel.COMPANY_SPECIFIC.model.status_cd == "INACTV"){
			if(this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd == undefined || this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd == null || this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd.length == 0){
				strValidation+="No Reason of cessation specified.<br/>";
			}

			if(!this._hideCessationDate){
				if(this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt != undefined && this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt != null && this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt.length>0){
					if(!moment(this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt).isValid()){
						strValidation += "Invalid cessation date.<br/>";
					}else{
						var cess_cd = this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd;
						if(cess_cd=="DECEASED"){
							var cessation_dt = new Date(this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt);
							var today = new Date();
							if(cessation_dt > today)
							{
								strValidation+="Are you planning to kill the user?<br/>";
							}
						}
					}
				}else{
					strValidation+="No cessation date specified.<br/>";
				}
			}
		}

		var selectedBank = this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id;
		if(selectedBank != undefined && selectedBank.length > 0){
			var account_no = this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no;
			if(account_no == undefined || account_no.length==0){
				strValidation+= "No account number specified.<br/>";
			}else if(account_no.length!=10){
				strValidation+="Account number must be 10 digit.<br/>";
			}
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			this.obj_personnel.COMPANY_SPECIFIC.model.end_dt = $("#_end_dt").val();
			this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = $("#kapamilya_dt").val();
			this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = $("#membership_dt").val();
			if(this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl == undefined)
				this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl = false;
			// console.log(this.obj_personnel.COMPANY_SPECIFIC.model.company_id);
			// console.log(this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id);
			var cid = this.obj_personnel.COMPANY_SPECIFIC.model.company_id;
			var gcid = this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id;
			if(gcid.length==0){
				this.saveCompany(cid);
			}else{
				this.updateCompany(gcid);
			}
		}
	}

	convertToGMT8(date){
		if(date==undefined || date == null || date.length==0)
			return "";
		var tempDt = moment(date).add(8, 'hours');
		return new Date(tempDt);
	}

	saveCompany(company_id){

		settings.isNavigating = true;
		var dateToday = null;    
  		dateToday = new moment(new Date()).add(8, 'hours');
  		dateToday = new Date(dateToday);

  		var lstart_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.start_dt);
  		var lend_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.end_dt);
  		var lkapmilya_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt);
  		var lmembership_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt);
  		var lcessation_end_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt);

		var LastID = "000000";
		var currentYear = (new Date()).getFullYear().toString().substring(2,4);
		var query = EntityQuery().from("COMPANY_SPECIFIC_INDEX")
					.where("COMPANY_SPECIFIC_ID", "==", company_id).take(1);
		EntityManager().executeQuery(query).then((s)=>{
			LastID = s.results[0].COMPANY_INDEX;
			var lastYear = LastID.toString().substring(0,2);
			if(lastYear != currentYear){
				LastID = currentYear + "0001";		
			}

			query = EntityQuery().from("GLOBAL_COMPANY_MSTR")
					.orderByDesc("GLOBAL_COMPANY_ID").take(1);
			EntityManager().executeQuery(query).then((s2)=>{
				var maxID = 1;
				if(s2.results.length>0){
					maxID = s2.results[0].GLOBAL_COMPANY_ID+1;
				}

				var global_company_mstr = {
					GLOBAL_ID: this.obj_personnel.global_indiv_id,
					START_DT: lstart_dt.length==0?null: lstart_dt,
					END_DT: lend_dt.length==0?null:lend_dt,
					COMPANY_ID: company_id,
					GLOBAL_COMPANY_ID: maxID,
					ID_NO: LastID,
					CESSATION_REASON_CD: this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd,
					CATEGORY_ID: this.obj_personnel.COMPANY_SPECIFIC.model.category_id,
					DIVISION_ID: this.obj_personnel.COMPANY_SPECIFIC.model.division_id,
					PAYROLL_GRP_ID: this.obj_personnel.COMPANY_SPECIFIC.model.payroll_grp_id,
					JOB_ID: this.obj_personnel.COMPANY_SPECIFIC.model.job_id,
					PROFESSIONAL_TYPE_CD: this.obj_personnel.COMPANY_SPECIFIC.model.professional_type_cd,
					STATUS_CD: this.obj_personnel.COMPANY_SPECIFIC.model.status_cd,
					EXCLUSIVE_FL: this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl?"1":"0",
					REMARKS: this.obj_personnel.COMPANY_SPECIFIC.model.remarks,
					KAPAMILYA_DT: lkapmilya_dt.length==0?null: lkapmilya_dt,
					MEMBERSHIP_DT: lmembership_dt.length==0?null: lmembership_dt,
					LOCATION_CD: this.obj_personnel.COMPANY_SPECIFIC.model.location_cd,
					CESSATION_END_DATE: lcessation_end_dt.length==0? null: lcessation_end_dt,					
					CREATED_BY: this.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};
				
				var entity = EntityManager().createEntity("GLOBAL_COMPANY_MSTR", global_company_mstr);
				EntityManager().addEntity(entity);
				EntityManager().saveChanges().then((s3)=>{
					settings.isNavigating = false;
					toastr.success("", "Record saved.");
					this.updateCompanyIndex(company_id, LastID);
					this.loadGlobalCompany(this.obj_personnel.global_indiv_id);
				}, (e3)=>{
					settings.isNavigating = false;
					if(entity != null){
						entity.entityAspect.setDeleted();
					}
					EntityManager().getEntities().forEach(function(entity) {
						var errors = entity.entityAspect.getValidationErrors();
						if (errors.length > 0)
							console.log(errors);
					});
					// console.log(e3);
					toastr.error(e3, "Error in saving global company mstr.");
				});
			},(e2)=>{
				settings.isNavigating = false;
				// console.log(e2);
				toastr.clear(e2, "Error in getting global company id.")
			});
			
		},(e)=>{
			settings.isNavigating = false;
			// console.log(e);
			toastr.error(e, "Error in generating ID.");
		});
		
	}

	updateCompany(global_company_id){

		settings.isNavigating = true;
		var dateToday = null;    
  		dateToday = new moment(new Date()).add(8, 'hours');
  		dateToday = new Date(dateToday);

		var lstart_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.start_dt);
  		var lend_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.end_dt); 
  		var lkapamilya_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt);
  		var lmembership_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt);
  		var lcessation_end_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt);
  		var lsuspend_start_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt);
  		var lsuspend_end_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt);

		var query = EntityQuery().from("GLOBAL_COMPANY_MSTR")
					.where("GLOBAL_COMPANY_ID", "==", global_company_id);
		EntityManager().executeQuery(query).then((s)=>{

			s.results[0].START_DT = lstart_dt;
			s.results[0].END_DT = lend_dt;
			s.results[0].KAPAMILYA_DT = lkapamilya_dt;
			s.results[0].MEMBERSHIP_DT = lmembership_dt;
			s.results[0].EXCLUSIVE_FL = this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl?"1":"0";
			s.results[0].DIVISION_ID = this.obj_personnel.COMPANY_SPECIFIC.model.division_id;
			s.results[0].LOCATION_CD = this.obj_personnel.COMPANY_SPECIFIC.model.location_cd;
			s.results[0].CATEGORY_ID = this.obj_personnel.COMPANY_SPECIFIC.model.category_id;
			s.results[0].JOB_ID = this.obj_personnel.COMPANY_SPECIFIC.model.job_id;
			s.results[0].PAYROLL_GRP_ID = this.obj_personnel.COMPANY_SPECIFIC.model.payroll_grp_id;
			s.results[0].PROFESSIONAL_TYPE_CD = this.obj_personnel.COMPANY_SPECIFIC.model.professional_type_cd;
			s.results[0].STATUS_CD = this.obj_personnel.COMPANY_SPECIFIC.model.status_cd;
			switch(this.obj_personnel.COMPANY_SPECIFIC.model.status_cd){				
				case "INACTV":
					s.results[0].CESSATION_REASON_CD = this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd;
					s.results[0].CESSATION_END_DATE = lcessation_end_dt.length==0?null: lcessation_end_dt;
					s.results[0].INACTIVE_REASON_CD = this.obj_personnel.COMPANY_SPECIFIC.model.inactive_reason_cd;
					s.results[0].REMARKS = this.obj_personnel.COMPANY_SPECIFIC.model.remarks;
					break;
				case "SUSPEND": 
				case "ACTV": 
					s.results[0].CESSATION_REASON_CD = null;
					s.results[0].CESSATION_END_DATE = null;
					s.results[0].REMARKS = null;
					break;
			}
			s.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s1)=>{

				if(this.obj_personnel.COMPANY_SPECIFIC.model.status_cd == "SUSPEND"){
					// this.obj_personnel.COMPANY_SPECIFIC.model.suspend_id
					// console.log(this.obj_personnel.COMPANY_SPECIFIC.model.suspend_id); 
					var suspend_id = this.obj_personnel.COMPANY_SPECIFIC.model.suspend_id;
					if(suspend_id == undefined || suspend_id == null || suspend_id==0){
						//insert
						this.saveSuspend(suspend_id, lsuspend_start_dt, lsuspend_end_dt);
					}else{
						//update
						this.updateSuspend(suspend_id, lsuspend_start_dt, lsuspend_end_dt);
					}
				}

				var pbi = this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.personnel_bank_id; 
				var bank_id = this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id;
				var account_name = this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name;
				var account_no = this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no;
				if(pbi == undefined || pbi.toString().length==0){
					if(bank_id != undefined && bank_id.toString().length>0){						
						this.savePersonnelBank(global_company_id, bank_id, account_name, account_no);
					}
				}else if(pbi != undefined && pbi.toString().length>0){
					if(bank_id == undefined || bank_id.toString().length==0){
						this.updatePersonnelBank(pbi, bank_id, account_name, "CHECK");
					}else{
						this.updatePersonnelBank(pbi, bank_id, account_name, account_no);
					}
					
				}

				this.loadGlobalCompany(this.obj_personnel.global_indiv_id);
				settings.isNavigating = false;
				toastr.success("","Record saved.");

			},(e1)=>{
				settings.isNavigating = false;
				toastr.error(e1, "Error in updating global company info.");
			});
		},(e)=>{
			settings.isNavigating = false;
			toastr.error(e, "Error in updating global company.");
		});
	}

	saveSuspend(company_id, start_dt, end_dt){

		settings.isNavigating = true;
		var dateToday = null
		dateToday = moment(new Date()).add(8, "hours");
		dateToday = new Date(dateToday);

		var query = EntityQuery().from("SUSPEND_TRX")
								.orderByDesc("SUSPEND_ID").take(1);
		EntityManager().executeQuery(query).then((s2)=>{
			var maxID = 1;
			if(s2.results.length>0){
				maxID = s2.results[0].SUSPEND_ID+1;
			}
			var suspend_trx = {
				SUSPEND_ID: maxID,
				GLOBAL_ID: this.obj_personnel.global_indiv_id,
				COMPANY_ID: company_id,
				SUSPEND_LEVEL: 2,
				START_DT: start_dt,
				END_DT: end_dt,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("SUSPEND_TRX", suspend_trx);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s3)=>{
				settings.isNavigating = false;
				// console.log("Suspend record has been saved.");
			}, (e3)=>{
				settings.isNavigating = false;
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				toastr.error(e3, "Error in saving suspend info.");
			});
		}, (e2)=>{
			settings.isNavigating = false;
			toastr.error(e2, "Error in quering suspend id.");
		});
	}

	updateSuspend(suspend_id, start_dt, end_dt){

		settings.isNavigating = true;
		var dateToday = null
		dateToday = moment(new Date()).add(8, "hours");
		dateToday = new Date(dateToday);
		var query = EntityQuery().from("SUSPEND_TRX")
				.where("SUSPEND_ID", "==", suspend_id);
		EntityManager().executeQuery(query).then((s4)=>{
			s4.results[0].START_DT = start_dt;
			s4.results[0].END_DT = end_dt;
			s4.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s4.results[0].LAST_UPDATED_DT = dateToday;
			EntityManager().saveChanges().then((s5)=>{
				console.log("Suspend record has been updated.");
				settings.isNavigating = false;
			}, (e5)=>{
				settings.isNavigating = false;
				toastr.error(e5, "Error in updating suspend info.");
			});
		}, (e4)=>{
			settings.isNavigating = false;
			toastr.error(e4, "Error in querying suspend info.");
		});
	}

	savePersonnelBank(global_company_id, bank_id, acct_name, account_no ){

		settings.isNavigating = true;
		var dateToday = null
		dateToday = moment(new Date()).add(8, "hours");
		dateToday = new Date(dateToday);
		var query = EntityQuery().from("PERSONNEL_BANK_TRX")
					.orderByDesc("PERSONNEL_BANK_ID").take(1);
		EntityManager().executeQuery(query).then((q1)=>{
			var maxID = 1;
			if(q1.results.length>0)
			{
				maxID = q1.results[0].PERSONNEL_BANK_ID+1;
			}

			var personnel_bank_trx = {
				PERSONNEL_BANK_ID: maxID,
				GLOBAL_COMPANY_ID: global_company_id,
				BANK_ID: bank_id,
				ACCT_NAME: acct_name,
				ACCOUNT_NO: account_no,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("PERSONNEL_BANK_TRX", personnel_bank_trx);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{
				this.loadPersonnelBank(global_company_id);
				// toastr.success("","");
				// console.log("personnel bank save success.");
			},(e2)=>{
				settings.isNavigating = false;
				if(entity != null)
				{
					entity.entityAspect.setDeleted();
				}
				toastr.error(e2, "Error in saving personnel bank info.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in querying personnel bank id.");
		});
	}

	updatePersonnelBank(personnel_bank_id, bank_id, acct_name, account_no){

		settings.isNavigating = true;
		var dateToday = null
		dateToday = moment(new Date()).add(8, "hours");
		dateToday = new Date(dateToday);
		var query = EntityQuery().from("PERSONNEL_BANK_TRX")
					.where("PERSONNEL_BANK_ID", "==", personnel_bank_id);
		EntityManager().executeQuery(query).then((q1)=>{

			if(q1.results.length==0){
				toastr.error("", "No personnel bank with an ID of "+personnel_bank_id+" found.");
				return;
			}

			if(account_no != "CHECK"){
				q1.results[0].BANK_ID = bank_id;
			}

			q1.results[0].ACCOUNT_NO = account_no;
			q1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			q1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{
				// toastr.success("", "Bank info");
				this.loadPersonnelBank(this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id);
				console.log("", "bank info has been updated.");
			}, (e2)=>{
				settings.isNavigating = false;
				toastr.error(e2, "Error in updating personnel bank.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error("", "Error in querying personnel bank.");
		});
	}

	dd_bankChanged(){
		var bank_id = this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id;
		if(bank_id != undefined && bank_id != null && bank_id.length>0){
			var bank = this.obj_personnel.BANK.find((b)=>{
				return b.id == bank_id;
			});
			this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_nm = bank.long_nm;
			this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name = this.obj_personnel.HEADER.last_name+", "+this.obj_personnel.HEADER.given_name+" "+this.obj_personnel.HEADER.middle_name;
		}else{

			this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_nm = "";
			this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name = "";
			this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no = "";
		}
	}

	updateCompanyIndex(company_id, lastIndex){

		settings.isNavigating = true;
		var query = EntityQuery().from("COMPANY_SPECIFIC_INDEX")
					.where("COMPANY_SPECIFIC_ID", "==", company_id);
		EntityManager().executeQuery(query).then((s)=>{
			s.results[0].COMPANY_INDEX = lastIndex+1;
			EntityManager().saveChanges().then((s1)=>{
				//Do nothing.
				console.log("index was updated.");
				settings.isNavigating = false;
			},(e1)=>{
				settings.isNavigating = false;
				toastr.error(e1, "Error in updating company specific index.");
			});
		}, (e)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e,"Error in querying company specific index.");
		});
	}

	btnAdd_accreditation(){
		this.accreditation_status = "ADD";
	}

	btnEdit_accreditation(item){
		console.log(item);
		this.accreditation_status = "EDIT";
		this.obj_personnel.COMPANY_SPECIFIC.model.a_id = item.accreditation_id;
		this.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id = item.job_grp_id;
		this.obj_personnel.COMPANY_SPECIFIC.model.a_job_id = item.job_id;
		var start_dt = moment.utc(item.eff_start_dt).format("MM/DD/YYYY");
		this.obj_personnel.COMPANY_SPECIFIC.model.a_start_dt = start_dt;
		var end_dt = moment.utc(item.eff_end_dt).format("MM/DD/YYYY");
		this.obj_personnel.COMPANY_SPECIFIC.model.a_end_dt = end_dt;
		this.obj_personnel.COMPANY_SPECIFIC.model.a_competency = item.competency;
	}

	btnRemove_accreditation(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove this accreditation record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
  					settings.isNavigating = true;
	  				//alert("Confirmed delete.");
  					var query = EntityQuery().from('ACCREDITATION_TRX').where('ACCREDITATION_ID', '==', item.accreditation_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.success("","The accreditation info was successfully removed.");
  							this.loadAccreditation(this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id);
  						},(error)=>{
  							settings.isNavigating = false;
  							toastr.clear();
  							toastr.error("", "Error in removing accreditation info.");
  						});
  					});
  				}
  		});
	}

	clearAccreditationField(){
		this.accreditation_status="";
		this.obj_personnel.COMPANY_SPECIFIC.model.a_id="";
		if(this.obj_personnel.JOB_GROUP.length>0){
			this.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id = this.obj_personnel.JOB_GROUP[0].id;
			this.dd_jobGroupChange();

			if(this.obj_personnel.JOB.length>0){
				this.obj_personnel.COMPANY_SPECIFIC.model.a_job_id = this.obj_personnel.JOB[0].id;
			}
		}

		this.obj_personnel.COMPANY_SPECIFIC.model.a_competency = "";
		this.obj_personnel.COMPANY_SPECIFIC.model.a_start_dt = "";
		this.obj_personnel.COMPANY_SPECIFIC.model.a_end_dt = "";
		$("#a_start_dt").val("");
		$("#a_end_dt").val("");
	}

	Digit(event){
		return isDigit(event);
	}

	validateAccreditation(){
		var strValidation = "";
		var _competency = this.obj_personnel.COMPANY_SPECIFIC.model.a_competency;
		var _start_dt = $("#a_start_dt").val();
		var _end_dt = $("#a_end_dt").val();
		if(_competency == undefined || _competency == null || _competency.length==0){
			strValidation+= "No competency level specified.<br/>";
		}

		if(_start_dt == undefined || _start_dt==null || _start_dt.length==0){
			strValidation+="No start date specified. <br/>";
		}else{
			if(_end_dt == undefined || _end_dt==null || _end_dt.length==0){
				strValidation+="No end date specified. <br/>";
			}else{
				if(!moment(_start_dt).isValid()){
					strValidation+="Invalid start date. <br/>";
				}else{
					if(!moment(_end_dt).isValid()){
						strValidation+="Invalid end date. <br/>";
					}else{
						var d1 = new Date(_start_dt);
						var d2 = new Date(_end_dt);
						if(d2 < d1){
							strValidation+="end date cannot be greater than start date. <br/>";
						}else{ 
							this.obj_personnel.COMPANY_SPECIFIC.model.a_start_dt = _start_dt;
							this.obj_personnel.COMPANY_SPECIFIC.model.a_end_dt = _end_dt;
						}

					}
				}
			}
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			// console.log("save accreditation.");
			if(this.accreditation_status == "ADD"){
				this.saveAccreditation(this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id);
			}else if(this.accreditation_status=="EDIT"){
				var accreditation_id = this.obj_personnel.COMPANY_SPECIFIC.model.a_id;
				this.updateAccreditation(accreditation_id);
			}

		}
	}

	saveAccreditation(global_company_id){

		settings.isNavigating = true;
		var dateToday = null;    
  		dateToday = new moment(new Date()).add(8, 'hours');
  		dateToday = new Date(dateToday);

  		var query = EntityQuery().from("ACCREDITATION_TRX")
  					.orderByDesc("ACCREDITATION_ID").take(1);
  		EntityManager().executeQuery(query).then((s1)=>{
  			var maxID = 1;
  			if(s1.results.length>0){
  				maxID = s1.results[0].ACCREDITATION_ID+1;
  			}

  			var accreditation_trx = {
  				ACCREDITATION_ID: maxID,
  				GLOBAL_COMPANY_ID: global_company_id,
  				EFF_START_DT: this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.a_start_dt),
  				EFF_END_DT: this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.a_end_dt),
  				DIVISION_ID: this.obj_personnel.COMPANY_SPECIFIC.model.division_id,
  				CATEGORY_ID: this.obj_personnel.COMPANY_SPECIFIC.model.category_id,
  				JOB_GRP_ID: this.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id,
  				JOB_ID: this.obj_personnel.COMPANY_SPECIFIC.model.a_job_id,
  				COMPETENCY: this.obj_personnel.COMPANY_SPECIFIC.model.a_competency,
  				HOME_FL: '0',
  				ENTRY_FL: '0',
  				CREATED_BY: this.obj_personnel.USER.USER_ID,
  				CREATED_DT: dateToday
  			};
  			var entity = EntityManager().createEntity("ACCREDITATION_TRX", accreditation_trx);
  			EntityManager().addEntity(entity);
  			EntityManager().saveChanges().then((s2)=>{
  				toastr.success("", "Record saved.");
  				this.clearAccreditationField();
  				this.loadAccreditation(global_company_id);
  			}, (e2)=>{
  				settings.isNavigating = false;
  				if(entity != null){
  					entity.entityAspect.setDeleted();
  				}
  				toastr.error(e2, "Error in saving accreditation.");
  			});


  		}, (e1)=>{
  			settings.isNavigating = false;
  			toastr.error(e1, "Error in querying accreditation id.");
  		});
	}

	updateAccreditation(accreditation_id){

		settings.isNavigating = true;
		var dateToday = null
		dateToday = moment(new Date()).add(8, "hours");
		dateToday = new Date(dateToday);
		var query = EntityQuery().from("ACCREDITATION_TRX")
					.where("ACCREDITATION_ID", "==", accreditation_id);
		EntityManager().executeQuery(query).then((s1)=>{
			if(s1.results.length==0){
				toastr.error("", "Error in querying accreditation info.");
				return;
			}

			s1.results[0].JOB_GRP_ID = this.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id;
			s1.results[0].JOB_ID = this.obj_personnel.COMPANY_SPECIFIC.model.a_job_id;
			s1.results[0].COMPETENCY = this.obj_personnel.COMPANY_SPECIFIC.model.a_competency;
			s1.results[0].EFF_START_DT = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.a_start_dt);
			s1.results[0].EFF_END_DT = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.a_end_dt);
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;
			EntityManager().saveChanges().then((s2)=>{
				toastr.success(s2, "Accreditation has been updated.");
  				this.clearAccreditationField();
				this.loadAccreditation(this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id);
			}, (e2)=>{
				settings.isNavigating = false;
				toastr.error(e2, "Error in updating accreditation info.");
			});
		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in querying accreditation info.");
		});
	}

	dd_jobGroupChange(){
		var tmp=[];
		var selectedJobGrp = this.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id;
		_.each(this.obj_personnel.JOB, (j)=>{
			if(selectedJobGrp == j.group){
				tmp.push({
					value: j.value,
					text: j.text
				});
			}
		});
		this.accreditation_joblist = tmp;
	}

	OrderByText(a, b){
		if(a.text.toUpperCase() < b.text.toUpperCase())
			return -1;
		if(a.text.toUpperCase() > b.text.toUpperCase())
			return 1;
		return 0;
	}
}