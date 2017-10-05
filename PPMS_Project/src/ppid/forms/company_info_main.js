import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import {getLookups} from '../../masterfiles';
import {formatDate} from "../../helpers";


@inject(obj_personnel, toastr, DialogService)
export class company_info_main{
	
	obj_personnel = null;
	_disableLocations = true;
	_disableIDNo = false;
	_disableStatus=true;
	_disableTabsInput = true;
	alreadyLoaded = false;
	constructor(obj_personnel, toastr, DialogService){
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;
		this.obj_personnel.OBSERVERS.tab_changed.push((tab_num, global_id)=>{
			if(tab_num == 4){
				if(!this.alreadyLoaded){
					this.alreadyLoaded=true;
					$("#_start_dt").datepicker();
					$("#_end_dt").datepicker();
					$("#kapamilya_dt").datepicker();
					$("#membership_dt").datepicker();
					$("#suspended_start_dt").datepicker();
					$("#suspended_end_dt").datepicker();
					toastr.clear();
					toastr.info("", "Loading company info...");
					// this.dd_companyChanged();
					this.loadGlobalCompany(global_id);
				}
			}
		});

		this.obj_personnel.OBSERVERS.company_main_clicked.push((global_id)=>{
			toastr.clear();
			toastr.info("", "Loading company info...");
			this.loadGlobalCompany(global_id);
		});

		this.obj_personnel.OBSERVERS.clear_ppid.push(()=>{
			this.obj_personnel.COMPANY_SPECIFIC = {
				model:{},
				list:[]
			}
			this.alreadyLoaded = false;
		});
	}

	loadGlobalCompany(global_id){
		var query = EntityQuery().from("GLOBAL_COMPANY_MSTR")
					.where("GLOBAL_ID", "==", global_id)
					.orderBy("COMPANY_ID");
		EntityManager().executeQuery(query).then((success)=>{
			var tmp=[];
			_.each(success.results, (r)=>{
				var suspend = [];
				if(r.STATUS_CD == "SUSPEND"){
					suspend = this.loadSuspend(global_id, r.COMPANY_ID);
				}
				var accreditation = this.loadAccreditation(r.GLOBAL_COMPANY_ID);
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
					accreditation: accreditation,
					suspend_id: suspend.suspend_id,
					suspended_start_dt: suspend.length==0?"":suspend[0].start_dt,
					suspended_end_dt: suspend.length==0?"":suspend[0].end_dt
				});
			});
			this.obj_personnel.COMPANY_SPECIFIC.list = tmp;
			toastr.clear();
			toastr.success("", "Company info has been loaded...");

		}, (failed)=>{
			toastr.error(failed, "error in fetching company specific data.");
		});

		if(this.obj_personnel.COMPANY.length>0){
			this.obj_personnel.COMPANY_SPECIFIC.model.company_id = this.obj_personnel.COMPANY[0].id;
			this.dd_companyChanged();
		}
	}

	loadAccreditation(global_company_id){
		var query = EntityQuery().from("ACCREDITATION_TRX")
					.where("GLOBAL_COMPANY_ID", "==", global_company_id);
		var accreditation = [];
		EntityManager().executeQuery(query).then((success)=>{
			_.each(success.results, (r)=>{				
				accreditation.push({
					accreditation_id: r.ACCREDITATION_ID,
					global_company_id: r.GLOBAL_COMPANY_ID,
					eff_start_dt: r.EFF_START_DT,
					eff_end_dt: r.EFF_END_DT,
					division_id: r.DIVISION_ID,					
					category_id: r.CATEGORY_ID,
					job_grp_id: r.JOB_GRP_ID,
					job_id: r.JOB_ID,
					competency: r.COMPETENCY,
					home_fl: r.HOME_FL,
					entry_fl: r.ENTRY_FL,
					accreditation_memo: r.ACCREDITATION_MEMO
				});
			});
		}, (failed)=>{
			toastr.error(failed, "Error in fetching company specific data.");
		});
		return accreditation;
	}

	loadSuspend(global_id, company_id){
		var pred1 = breeze.Predicate.create('GLOBAL_ID', '==', global_id);
		var pred2 = breeze.Predicate.create('SUSPEND_LEVEL', '==', 2);
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
			}
		}, (error)=>{
			toastr.error(error, "Error in fetching company specific data.");
		});
		return suspend;
	}



	loadJobDropdown(){
		this.obj_personnel.JOB=[];
		_.each(this.obj_personnel.JOB_CATEGORY, (jc)=>{
			getLookups().JOB_MSTR.forEach((j)=>{
				if(j.JOB_GRP_ID == jc.id){
					this.obj_personnel.JOB.push({
						//id: j.JOB_ID,
						value: j.JOB_ID,
						text: j.JOB_DESC
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
			this.obj_personnel.JOB_CATEGORY=[];
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
					this.obj_personnel.JOB_CATEGORY.push({
						id: j.JOB_GRP_ID,
						value: j.JOB_GRP_CD,
						text: j.JOB_GRP_DESC
					});
				}
			});

			this.obj_personnel.JOB_CATEGORY.sort(this.OrderByText);
			this.obj_personnel.CATEGORY.sort(this.OrderByText);

			if(global_company != null && global_company != undefined){
				this._disableStatus = false;
				this._disableTabsInput = false;
				this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id = global_company.global_company_id;
				this.obj_personnel.COMPANY_SPECIFIC.model.id_no = global_company.id_no;
				var startDt = formatDate(global_company.start_dt);
				if(startDt.length>0 && startDt != "01/01/0001"){
					this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = startDt;
					$("#_start_dt").datepicker("setValue", new Date(startDt));
				}else{
					this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = "";
					// $("#_start_dt").datepicker("setValue", new Date());
				}
				var endDt = formatDate(global_company.end_dt);

				if(endDt.length>0 && endDt != "01/01/0001"){
					this.obj_personnel.COMPANY_SPECIFIC.model.end_dt = endDt;
					$("#_end_dt").datepicker("setValue", new Date(endDt));
				}else{
					this.obj_personnel.COMPANY_SPECIFIC.model.end_dt="";
				}

				var kapamilya_dt = formatDate(global_company.kapamilya_dt);
				if(kapamilya_dt.length >0 && kapamilya_dt != "01/01/0001"){
					this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = kapamilya_dt;
					$("#kapamilya_dt").datepicker("setValue", new Date(kapamilya_dt));
				}else{
					this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = "";
				}

				var membership_dt = formatDate(global_company.membership_dt);
				if(membership_dt.length >0 && membership_dt != "01/01/0001"){
					this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = membership_dt;
					$("#membership_dt").datepicker("setValue", new Date(membership_dt));
				}else{
					this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = "";
				}
				
				this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl = global_company.exclusive_fl;
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
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = formatDate(global_company.suspended_start_dt);
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt = formatDate(global_company.suspended_end_dt);
				$("#suspended_start_dt").datepicker("setValue", formatDate(global_company.suspended_start_dt));
				$("#suspended_end_dt").datepicker("setValue", formatDate(global_company.suspended_end_dt));
				this.obj_personnel.COMPANY_SPECIFIC.model.accreditation = global_company.accreditation;
				this.loadJobDropdown();
				this.obj_personnel.COMPANY_SPECIFIC.model.job_id = global_company.job_id+"";
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
				this.obj_personnel.COMPANY_SPECIFIC.model.division_id = this.obj_personnel.DIVISION[0].value;
				this.obj_personnel.COMPANY_SPECIFIC.model.category_id = this.obj_personnel.CATEGORY[0].value;

				this.loadJobDropdown();
			}
			this.dd_divisionChanged();	
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

	validate(){
		var strValidation = "";

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
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			// console.log(this.obj_personnel.COMPANY_SPECIFIC.model.company_id);
			// console.log(this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id);
			var cid = this.obj_personnel.COMPANY_SPECIFIC.model.company_id;
			var gcid = this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id;
			if(gcid.length==0){
				this.saveCompanySpecific(cid);
			}else{
				this.updateCompanySpecific(gcid);
			}
		}
	}

	saveCompanySpecific(company_id){
		var generated_id = this.GenerateIDNo(company_id);
		console.log(generated_id);
	}

	updateCompanySpecific(global_company_id){
		this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = $("#_start_dt").val();
		this.obj_personnel.COMPANY_SPECIFIC.model.end_dt = $("#_end_dt").val();
		var query = EntityQuery().from("GLOBAL_COMPANY_MSTR")
					.where("GLOBAL_COMPANY_ID", "==", global_company_id);
		EntityManager().executeQuery(query).then((s)=>{
			// s.results[0].START_DT = 
		},(e)=>{
			toastr.error("", e);
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
		}
	}

	GenerateIDNo(company_id){
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
			return LastID;
		},(e)=>{
			toastr.error(e, "Error in generating ID.");
		});
	}

	clearAccreditationField(){
		
	}

	OrderByText(a, b){
		if(a.text.toUpperCase() < b.text.toUpperCase())
			return -1;
		if(a.text.toUpperCase() > b.text.toUpperCase())
			return 1;
		return 0;
	}
}