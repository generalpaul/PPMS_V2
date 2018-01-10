import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from 'entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import settings from 'settings';
import {OrderByDate, isDigit} from 'helpers';

@inject(obj_personnel, toastr, DialogService)
export class gov_info_exam_passed{

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

		this.obj_personnel.OBSERVERS.govinfo_tab_changed.push((tab_num, global_id)=>{
			if(tab_num == 1){
				$("#exam_dt").datepicker();
				this.loadExamRecord(global_id);
				this.clearField();
			}
		});
	}

	loadExamRecord(global_indiv_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("EXAM_TRX")
					.where("GLOBAL_INDIV_ID", "==", global_indiv_id);
		EntityManager().executeQuery(query).then((s1)=>{
			var tmp=[];
			var tmpLog = [];
			_.each(s1.results, (r)=>{
				var exam_cd = this.obj_personnel.EXAM.find((x)=>{
					return x.value == r.EXAM_CD;
				});

				tmp.push({
					exam_id: r.EXAM_ID,
					exam_cd: r.EXAM_CD,
					exam_nm: exam_cd.text,
					rating_grade: r.RATING_GRADE,
					exam_dt: moment.utc(r.EXAM_DT).format("MM/DD/YYYY"),
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

			settings.isNavigating = false;
			toastr.clear();
			toastr.success("", "List of Government exam passed has been loaded.");
			this.obj_personnel.GOVERNMENT_EXAM.list = tmp;

			if(tmpLog.length>0){

				this.lblCreatedBy = tmpLog[0].user + " " + moment.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
				if(tmpLog.length>1){
					var lastIndex = tmpLog.length - 1;
					this.lblUpdatedBy = tmpLog[lastIndex].user + " " + moment.utc(tmpLog[lastIndex].date).format("MM/DD/YYYY hh:mm A");
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
			toastr.error(e1, "Error in querying exam record.");
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
		this.obj_personnel.GOVERNMENT_EXAM.model.exam_id = item.exam_id;
		this.obj_personnel.GOVERNMENT_EXAM.model.exam_cd = item.exam_cd;
		this.obj_personnel.GOVERNMENT_EXAM.model.rating_grade = item.rating_grade;
		this.obj_personnel.GOVERNMENT_EXAM.model.remarks = item.remarks;
		this.obj_personnel.GOVERNMENT_EXAM.model.exam_dt = item.exam_dt;
	}

	btnRemove(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('EXAM_TRX').where('EXAM_ID', '==', item.exam_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{

  							toastr.clear();
  							toastr.success("", "Record was successfully removed.");
  							this.loadExamRecord(this.obj_personnel.global_indiv_id);
  							this.clearField();

  						},(error)=>{
  							toastr.clear();
  							toastr.error(error, "Error in removing exam info.");
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
		this.obj_personnel.GOVERNMENT_EXAM.model = {};
	}

	DigitOnly(event){
		return isDigit(event);
	}

	validate(){

		var strValidation = "";
		this.obj_personnel.GOVERNMENT_EXAM.model.exam_dt = $("#exam_dt").val();

		if(this.obj_personnel.GOVERNMENT_EXAM.model.exam_cd == undefined || this.obj_personnel.GOVERNMENT_EXAM.model.exam_cd == null || this.obj_personnel.GOVERNMENT_EXAM.model.exam_cd.length==0){
			strValidation+="Exam name not specified.<br/>";
		}

		if(this.obj_personnel.GOVERNMENT_EXAM.model.rating_grade == undefined || this.obj_personnel.GOVERNMENT_EXAM.model.rating_grade == null || this.obj_personnel.GOVERNMENT_EXAM.model.rating_grade.length==0){
			strValidation+="Rating/Grade not specified.<br/>";
		}

		if(this.obj_personnel.GOVERNMENT_EXAM.model.exam_dt == undefined || this.obj_personnel.GOVERNMENT_EXAM.model.exam_dt == null || this.obj_personnel.GOVERNMENT_EXAM.model.exam_dt.length==0){
			strValidation+="No exam date specified.<br/>";
		}else{
			if(moment(this.obj_personnel.GOVERNMENT_EXAM.model.exam_dt).isValid()){

				var d1 = new Date(this.obj_personnel.GOVERNMENT_EXAM.model.exam_dt);
				var d2 = new Date();

				if(d1>d2){
					strValidation+="exam date cannot be greater than date today.<br/>";
				}

			}else{
				strValidation+="Invalid exam date.<br/>";
			}
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.formStatus=="ADD"){
				this.saveExamInfo(this.obj_personnel.global_indiv_id);
			}else if(this.formStatus=="EDIT"){
				this.updateExamInfo(this.obj_personnel.GOVERNMENT_EXAM.model.exam_id);
			}
		}

	}

	saveExamInfo(global_indiv_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("EXAM_TRX")
					.orderByDesc("EXAM_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{

			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].EXAM_ID + 1;
			}

			var exam_trx = {
				EXAM_ID: maxId,
				GLOBAL_INDIV_ID: global_indiv_id,
				EXAM_CD: this.obj_personnel.GOVERNMENT_EXAM.model.exam_cd,
				RATING_GRADE: this.obj_personnel.GOVERNMENT_EXAM.model.rating_grade,
				EXAM_DT: this.obj_personnel.GOVERNMENT_EXAM.model.exam_dt,
				REMARKS: this.obj_personnel.GOVERNMENT_EXAM.model.remarks,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};
			console.log(exam_trx);

			var entity = EntityManager().createEntity("EXAM_TRX", exam_trx);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadExamRecord(global_indiv_id);
				this.clearField();

			}, (e2)=>{
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in saving exam info.");
			});

		}, (e1)=>{			
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying exam id.");
		});

	}

	updateExamInfo(exam_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("EXAM_TRX")
					.where("EXAM_ID", "==", exam_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].EXAM_CD = this.obj_personnel.GOVERNMENT_EXAM.model.exam_cd;
			s1.results[0].RATING_GRADE = this.obj_personnel.GOVERNMENT_EXAM.model.rating_grade;
			s1.results[0].REMARKS = this.obj_personnel.GOVERNMENT_EXAM.model.remarks;
			s1.results[0].EXAM_DT = new Date(moment(this.obj_personnel.GOVERNMENT_EXAM.model.exam_dt).add(8, "hours"));
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;
			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record updated.");
				this.loadExamRecord(this.obj_personnel.global_indiv_id);
				this.clearField();

			}, (e2)=>{

				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in updating exam info.");
			});

		}, (e1)=>{

			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying exam info.");
		});

	}
}