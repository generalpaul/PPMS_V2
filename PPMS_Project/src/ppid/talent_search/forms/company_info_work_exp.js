import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {DialogService} from 'aurelia-dialog';
import {EntityManager,EntityQuery} from 'entity-manager-factory';
import breeze from 'breeze-client';
import {ppid_search} from "../modals/ppid_search";
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import {isDigit} from "helpers";
import settings from 'settings';

@inject(DialogService, obj_personnel, toastr)
export class company_info_work_exp{

	_disableBtnAdd = false;
	_disableBtnSave= true;
	_disableBtnEdit = false;
	_disableBtnRemove = false;
	_disableForm=true;
	_formStatus="";
	obj_personnel = null;
	alreadyLoaded = false;
	lblCreatedBy = null;
	lblUpdatedBy = null;
	constructor(DialogService, obj_personnel, toastr){
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;

		this.obj_personnel.OBSERVERS.company_tab_changed.push((tab_num, global_indiv_id)=>{
			if(tab_num == 1){
				if(!this.alreadyLoaded){
					this.alreadyLoaded = false;
					$("#startDt").datepicker();
					$("#endDt").datepicker();
				}
				toastr.clear();
				toastr.info("", "Loading work experience list...");
				this.loadWorkExperience(global_indiv_id);
				this.clearField();
			}
		});
	}

	loadWorkExperience(global_indiv_id){
		settings.isNavigating =true;
		var query = EntityQuery().from("WORK_EXPERIENCE_TRX")
					.where("GLOBAL_INDIV_ID","==",global_indiv_id);
		EntityManager().executeQuery(query).then((s1)=>{

			var tmp = [];
			var tmpLog = [];
			_.each(s1.results, (r)=>{
				var from = moment.utc(r.START_DT).format("MM/DD/YYYY");
				var to = moment.utc(r.END_DT).format("MM/DD/YYYY");
				var position = this.obj_personnel.POSITION.find((x)=>{
					if(x.value == r.POSITION_CD)
							return x;
				});

				tmp.push({
					work_experience_id: r.WORK_EXPERIENCE_ID,
					employer: r.EMPLOYER,
					start_dt: from,
					end_dt: to,
					present_fl: r.PRESENT_FL,
					salary: r.SALARY,
					position_cd: r.POSITION_CD,
					position: position.text,
					freelance_fl: r.FREELANCE_FL,
					reason_for_leaving: r.REASON_FOR_LEAVING
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

			this.obj_personnel.WORK_EXPERIENCE.list = tmp;

			tmpLog.sort(this.OrderByDate);
			var LastIndex = tmpLog.length-1;
			if(tmpLog.length>0){

				this.lblCreatedBy = tmpLog[0].user + ' ' + moment.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
				if(tmpLog.length>1){
					this.lblUpdatedBy = tmpLog[LastIndex].user + ' ' + moment.utc(tmpLog[LastIndex].date).format("MM/DD/YYYY hh:mm A");
				}else{
					this.lblUpdatedBy = "";
				}

			}else{
				this.lblCreatedBy = "";
				this.lblUpdatedBy = "";
			}

			settings.isNavigating = false;
			toastr.clear();
			toastr.success("", "Work experience list has been loaded...");
		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in loading work experience list.");
		});
	}

	OrderByDate(a, b){
		if(a.date > b.date)
			return 1;
		if(a.date < b.date)
			return -1;
		return 0;
	}

	clearField(){
		toastr.clear();		
		this.obj_personnel.WORK_EXPERIENCE.model = {};
		this._disableBtnAdd = false;
		this._disableBtnSave = true;
		this._disableForm = true;
		this._formStatus = "";
		this._disableBtnEdit = false;
		this._disableBtnRemove = false;
	}

	btnAdd(){
		this._disableBtnAdd = true;
		this._disableBtnSave = false;
		this._disableForm = false;
		this._formStatus = "ADD";
		this._disableBtnEdit = true;
		this._disableBtnRemove = true;
	}

	btnEdit(item){

		this._disableBtnAdd = true;
		this._disableBtnSave = false;
		this._disableForm = false;		
		this._disableBtnEdit = true;
		this._disableBtnRemove = true;

		this.obj_personnel.WORK_EXPERIENCE.model.work_experience_id = item.work_experience_id;
		this.obj_personnel.WORK_EXPERIENCE.model.employer = item.employer;
		this.obj_personnel.WORK_EXPERIENCE.model.start_dt = item.start_dt;
		this.obj_personnel.WORK_EXPERIENCE.model.end_dt = item.end_dt;
		this.obj_personnel.WORK_EXPERIENCE.model.present_fl = item.present_fl==1?true:false;
		this.obj_personnel.WORK_EXPERIENCE.model.salary = item.salary;
		this.obj_personnel.WORK_EXPERIENCE.model.position_cd = item.position_cd;
		this.obj_personnel.WORK_EXPERIENCE.model.freelance_fl = item.freelance_fl==1?true:false;
		this.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving = item.reason_for_leaving;
		this._formStatus = "EDIT";
	}

	btnRemove(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the work experience?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				//alert("Confirmed delete.");
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('WORK_EXPERIENCE_TRX').where('WORK_EXPERIENCE_ID', '==', item.work_experience_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.success("","The work experience was successfully removed.");
  							this.loadWorkExperience(this.obj_personnel.global_indiv_id);
  						},(error)=>{
  							toastr.clear();
  							toastr.error("", "Error in removing work experience.");
  							settings.isNavigating = false;
  						});
  					});
  				}
  		});
	}

	validate(){

		var strValidation = "";
		var boolValidStart = false;
		var boolValidEnd = false;
		this.obj_personnel.WORK_EXPERIENCE.model.start_dt = $("#startDt").val();
		this.obj_personnel.WORK_EXPERIENCE.model.end_dt = $("#endDt").val();

		if(this.obj_personnel.WORK_EXPERIENCE.model.employer == undefined || this.obj_personnel.WORK_EXPERIENCE.model.employer == null || this.obj_personnel.WORK_EXPERIENCE.model.employer.length == 0){
			strValidation+="No employer specified.<br/>";
		}

		if(this.obj_personnel.WORK_EXPERIENCE.model.start_dt == undefined || this.obj_personnel.WORK_EXPERIENCE.model.start_dt == null || this.obj_personnel.WORK_EXPERIENCE.model.start_dt.length == 0){
			strValidation+="No start date specified.<br/>";
		}else{
			if(!moment(new Date(this.obj_personnel.WORK_EXPERIENCE.model.start_dt)).isValid()){
				strValidation+="Invalid start date.<br/>";
			}else{
				// this.obj_personnel.WORK_EXPERIENCE.model.start_dt = new Date(moment(this.obj_personnel.WORK_EXPERIENCE.model.start_dt).add(8, "hours"));
				boolValidStart = true;
			}
		}

		if(this.obj_personnel.WORK_EXPERIENCE.model.end_dt == undefined || this.obj_personnel.WORK_EXPERIENCE.model.end_dt == null || this.obj_personnel.WORK_EXPERIENCE.model.end_dt.length == 0){
			strValidation+="No end date specified.<br/>";
		}else{
			if(!moment(new Date(this.obj_personnel.WORK_EXPERIENCE.model.end_dt)).isValid()){
				strValidation+="Invalid end date.<br/>";
			}else{
				// this.obj_personnel.WORK_EXPERIENCE.model.end_dt = new Date(moment(this.obj_personnel.WORK_EXPERIENCE.model.end_dt).add(8, "hours"));
				boolValidEnd = true;
			}
		}

		if(boolValidStart && boolValidEnd){
			var d1 = new Date(this.obj_personnel.WORK_EXPERIENCE.model.start_dt);
			var d2 = new Date(this.obj_personnel.WORK_EXPERIENCE.model.end_dt);
			if(d1>d2){
				strValidation+="Start date cannot be greater than end date.<br/>";
			}
		}

		if(this.obj_personnel.WORK_EXPERIENCE.model.position_cd == undefined || this.obj_personnel.WORK_EXPERIENCE.model.position_cd.length==0){
			strValidation+="No position specified. <br/>";
		}

		if(this.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving == undefined || this.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving == null || this.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving.length == 0){
			strValidation+="No reason for leaving specified.<br/>";
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this._formStatus == "ADD"){
				this.saveWorkExp(this.obj_personnel.global_indiv_id);
			}else if(this._formStatus=="EDIT"){
				this.updateWorkExp(this.obj_personnel.WORK_EXPERIENCE.model.work_experience_id);
			}
		}
	}

	saveWorkExp(global_indiv_id){

		var dateToday = null;
		dateToday = moment(new Date()).add(8, "hours");
		dateToday = new Date(dateToday);

		settings.isNavigating = true;
		var query = EntityQuery().from("WORK_EXPERIENCE_TRX")
					.orderByDesc("WORK_EXPERIENCE_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{
			var MaxId = 1;
			if(s1.results.length>0){
				MaxId = s1.results[0].WORK_EXPERIENCE_ID+1;				
			}

			var work_exp_trx = {
				WORK_EXPERIENCE_ID: MaxId,
				GLOBAL_INDIV_ID: global_indiv_id,
				EMPLOYER: this.obj_personnel.WORK_EXPERIENCE.model.employer,
				START_DT: this.obj_personnel.WORK_EXPERIENCE.model.start_dt,
				END_DT: this.obj_personnel.WORK_EXPERIENCE.model.end_dt,
				SALARY: this.obj_personnel.WORK_EXPERIENCE.model.salary,
				POSITION_CD: this.obj_personnel.WORK_EXPERIENCE.model.position_cd,
				REASON_FOR_LEAVING: this.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving,
				PRESENT_FL: this.obj_personnel.WORK_EXPERIENCE.model.present_fl==true?1:0,
				FREELANCE_FL: this.obj_personnel.WORK_EXPERIENCE.model.freelance_fl==true?1:0,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("WORK_EXPERIENCE_TRX", work_exp_trx);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{

				toastr.success("", "Record saved.");
				this.clearField();
				this.loadWorkExperience(this.obj_personnel.global_indiv_id);
			}, (e2)=>{
				if(entity != null){
					entity.entityAspect.setDeleted();
				}

				EntityManager().getEntities().forEach(function(entity) {
					var errors = entity.entityAspect.getValidationErrors();
					if (errors.length > 0)
						console.log(errors);
				});
				settings.isNavigating = false;
				toastr.error(e2, "Error in saving work experience.");
			});

		}, (e1)=>{

			settings.isNavigating = false;
			toastr.error(e1, "Error in querying max id.");
		});
	}

	updateWorkExp(work_exp_id){

		var dateToday = null;
		dateToday = moment(new Date()).add(8, "hours");
		dateToday = new Date(dateToday);

		var query = EntityQuery().from("WORK_EXPERIENCE_TRX")
					.where("WORK_EXPERIENCE_ID", "==", work_exp_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].EMPLOYER = this.obj_personnel.WORK_EXPERIENCE.model.employer;
			s1.results[0].START_DT = this.obj_personnel.WORK_EXPERIENCE.model.start_dt;
			s1.results[0].END_DT = this.obj_personnel.WORK_EXPERIENCE.model.end_dt;
			s1.results[0].PRESENT_FL = this.obj_personnel.WORK_EXPERIENCE.model.present_fl?1:0;
			s1.results[0].SALARY = this.obj_personnel.WORK_EXPERIENCE.model.salary;
			s1.results[0].POSITION_CD = this.obj_personnel.WORK_EXPERIENCE.model.position_cd;
			s1.results[0].FREELANCE_FL = this.obj_personnel.WORK_EXPERIENCE.model.freelance_fl?1:0;
			s1.results[0].REASON_FOR_LEAVING = this.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{
				toastr.success("", "Record saved.");
				this.clearField();
				this.loadWorkExperience(this.obj_personnel.global_indiv_id);
			}, (e2)=>{
				toastr.error(e2, "Error in updating work experience.");				
			});

		}, (e1)=>{
			toastr.error(e1, "Error in querying work experience.");
		});
	}


}