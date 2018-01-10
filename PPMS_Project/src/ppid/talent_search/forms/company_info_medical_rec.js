import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from 'entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import settings from 'settings';
import {OrderByDate} from 'helpers';

@inject(obj_personnel, toastr, DialogService)
export class company_info_medical_rec {

	obj_personnel = null;
	lblCreatedBy=null;
	lblUpdatedBy=null;
	_disableBtnAdd=false;
	_disableBtnSave=true;
	_disableForm=true;
	_disableTable=false;
	formStatus="";
	constructor(obj_personnel, toastr, DialogService){
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;

		this.obj_personnel.OBSERVERS.company_tab_changed.push((tab_num, global_id)=>{
			if(tab_num==3){
				$("#med_exam_dt").datepicker();
				toastr.clear();
				toastr.info("", "Loading medical records...");
				this.loadMedicalRecord(global_id);
				this.clearField();
			}
		});
	}

	loadMedicalRecord(global_indiv_id){

		settings.isNavigating =true;
		var query = EntityQuery().from("MEDICAL_EXAM_TRX")
					.where("GLOBAL_INDIV_ID", "==", global_indiv_id);
		EntityManager().executeQuery(query).then((s1)=>{

			var tmp = [];
			var tmpLog = [];
			_.each(s1.results, (r)=>{
				tmp.push({
					medical_exam_id: r.MEDICAL_EXAM_ID,
					endorsed_by: r.ENDORSED_BY,
					fit_to_work_fl: r.FIT_TO_WORK_FL,
					medical_exam_dt: moment.utc(r.MEDICAL_EXAM_DT).format("MM/DD/YYYY"),
					result_remarks: r.RESULT_REMARKS
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
			toastr.success("","Medical records has been loaded.");
			this.obj_personnel.MEDICAL_RECORD.list = tmp;
			if(tmpLog.length>0){

				tmpLog.sort(OrderByDate);
				var lastIndex = tmpLog.length-1;
				this.lblCreatedBy = tmpLog[0].user + " " + moment.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
				if(tmpLog.length>1){
					this.lblUpdatedBy = tmpLog[lastIndex].user+ " " + moment.utc(tmpLog[lastIndex].date).format("MM/DD/YYYY hh:mm A");
				}else{
					this.lblUpdatedBy = "";
				} 

			}else{
				this.lblCreatedBy = "";
				this.lblUpdatedBy = "";
			}

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying medical records.");
		});

	}

	btnAdd(){
		this._disableBtnAdd = true;
		this._disableBtnSave = false;
		this._disableForm = false;
		this._disableTable = true;
		this.formStatus = "ADD";
	}

	btnEdit(item){
		this._disableBtnAdd = true;
		this._disableBtnSave = false;
		this._disableForm = false;
		this._disableTable = true;
		this.formStatus = "EDIT";
		this.obj_personnel.MEDICAL_RECORD.model.medical_exam_id = item.medical_exam_id;
		this.obj_personnel.MEDICAL_RECORD.model.endorsed_by = item.endorsed_by;
		$("#med_exam_dt").datepicker("setValue", new Date(item.medical_exam_dt));
		this.obj_personnel.MEDICAL_RECORD.model.medical_exam_dt = item.medical_exam_dt;
		this.obj_personnel.MEDICAL_RECORD.model.result_remarks = item.result_remarks;
		switch(item.fit_to_work_fl){
			case "1":				
				$("#fit_to_work_fl").prop("checked", true);
				break;
			case "0":
				$("#fit_to_work_fl").prop("checked", false);
				break;
		}
	}

	btnRemove(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('MEDICAL_EXAM_TRX').where('MEDICAL_EXAM_ID', '==', item.medical_exam_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{

  							toastr.clear();
  							toastr.success("", "Record was successfully removed.");
  							this.loadMedicalRecord(this.obj_personnel.global_indiv_id);
  							this.clearField();

  						},(error)=>{
  							toastr.clear();
  							toastr.error(error, "Error in removing medical record.");
  							settings.isNavigating = false;
  						});

  					});
  				}
  		});
	}

	clearField(){		
		this._disableBtnAdd = false;
		this._disableBtnSave = true;
		this._disableForm = true;
		this._disableTable = false;
		this.formStatus = "";
		this.obj_personnel.MEDICAL_RECORD.model = {};
		$("#fit_to_work_fl").prop("checked", false);
		settings.isNavigating = false;
	}

	validate(){

		var strValidation = "";
		this.obj_personnel.MEDICAL_RECORD.model.medical_exam_dt = $("#med_exam_dt").val();
		this.obj_personnel.MEDICAL_RECORD.model.fit_to_work_fl = $("#fit_to_work_fl").is(":checked")?1:0;

		if(this.obj_personnel.MEDICAL_RECORD.model.endorsed_by == undefined || this.obj_personnel.MEDICAL_RECORD.model.endorsed_by == null || this.obj_personnel.MEDICAL_RECORD.model.endorsed_by.length==0){
			strValidation+="No endorser specified.<br/>";
		}

		if(this.obj_personnel.MEDICAL_RECORD.model.medical_exam_dt == undefined || this.obj_personnel.MEDICAL_RECORD.model.medical_exam_dt == null || this.obj_personnel.MEDICAL_RECORD.model.medical_exam_dt.length==0){
			strValidation+="No medical exam date specified.<br/>";
		}else{
			if(moment(this.obj_personnel.MEDICAL_RECORD.model.medical_exam_dt).isValid()){

				var d1 = new Date(this.obj_personnel.MEDICAL_RECORD.model.medical_exam_dt);
				var d2 = new Date();

				if(d1>d2){
					strValidation+="Medical exam date cannot be greater than date today.<br/>";
				}

			}else{
				strValidation+="Invalid medical exam date.<br/>";
			}
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.obj_personnel.MEDICAL_RECORD.model.medical_exam_id != undefined && this.obj_personnel.MEDICAL_RECORD.model.medical_exam_id != null){
				this.updateMedicalRecord(this.obj_personnel.MEDICAL_RECORD.model.medical_exam_id);
			}else{
				this.saveMedicalRecord(this.obj_personnel.global_indiv_id);
			}
		}
	}

	saveMedicalRecord(global_indiv_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("MEDICAL_EXAM_TRX")
					.orderByDesc("MEDICAL_EXAM_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{

			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].MEDICAL_EXAM_ID+1;
			}

			var medical_record = {
				MEDICAL_EXAM_ID: maxId,
				GLOBAL_INDIV_ID: global_indiv_id,
				ENDORSED_BY: this.obj_personnel.MEDICAL_RECORD.model.endorsed_by,
				MEDICAL_EXAM_DT: new Date(moment(this.obj_personnel.MEDICAL_RECORD.model.medical_exam_dt).add(8, "hours")),
				RESULT_REMARKS: this.obj_personnel.MEDICAL_RECORD.model.result_remarks,
				FIT_TO_WORK_FL: this.obj_personnel.MEDICAL_RECORD.model.fit_to_work_fl,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("MEDICAL_EXAM_TRX", medical_record);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadMedicalRecord(global_indiv_id);
				this.clearField();

			}, (e2)=>{

				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in saving medical record.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying medical exam id.");
		});

	}

	updateMedicalRecord(medical_exam_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("MEDICAL_EXAM_TRX")
					.where("MEDICAL_EXAM_ID", "==", medical_exam_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].ENDORSED_BY = this.obj_personnel.MEDICAL_RECORD.model.endorsed_by;
			s1.results[0].MEDICAL_EXAM_DT = new Date(moment(this.obj_personnel.MEDICAL_RECORD.model.medical_exam_dt).add(8, "hours"));
			s1.results[0].RESULT_REMARKS = this.obj_personnel.MEDICAL_RECORD.model.result_remarks;
			s1.results[0].FIT_TO_WORK_FL = this.obj_personnel.MEDICAL_RECORD.model.fit_to_work_fl;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record updated.");
				this.loadMedicalRecord(this.obj_personnel.global_indiv_id);
				this.clearField();

			}, (e2)=>{

				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in updating medical record.");
			});

		}, (e1)=>{

			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying medical record.");
		});

	}
}