import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import settings from 'settings';
import {OrderByDate, isDigit} from '../../helpers';

@inject(obj_personnel, toastr, DialogService)
export class company_info_character_ref {

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

		//loadCharacterRef;
		this.obj_personnel.OBSERVERS.company_tab_changed.push((tab_num, global_id)=>{
			if(tab_num==2){
				$("#medical_exam_dt").datepicker();
				toastr.clear();
				toastr.info("", "Loading Character references...");
				this.loadCharacterRef(global_id);
				this.clearField();
			}
		});
	}

	loadCharacterRef(global_indiv_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("CHAR_REF_TRX")
					.where("GLOBAL_INDIV_ID", "==", global_indiv_id)
					.orderBy("CHAR_REF_ID");
		EntityManager().executeQuery(query).then((s1)=>{
			var tmp=[]; 
			var tmpLog=[];
			_.each(s1.results, (r)=>{

				var job = this.obj_personnel.JOB.find((x)=>{
					return x.value == r.JOB_ID;
				});				
				var job_name = null;
				if(job!= null){
					job_name = job.text;
				}

				tmp.push({
					char_ref_id: r.CHAR_REF_ID,
					global_indiv_id: r.GLOBAL_INDIV_ID,
					full_name: r.FULL_NAME,
					company_name: r.COMPANY_NAME,
					phone_no: r.PHONE_NO,
					job_name: job_name,
					job_id: r.JOB_ID,
					job_other: r.JOB_OTHER
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

			toastr.clear();
			toastr.success("", "Character references has been loaded.");
			settings.isNavigating = false;
			this.obj_personnel.CHARACTER_REF.list = tmp;
			tmpLog.sort(OrderByDate);

			if(tmpLog.length>0){

				this.lblCreatedBy = tmpLog[0].user + " " +moment.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
				if(tmpLog.length>1){
					var lastIndex = tmpLog.length-1;
					this.lblUpdatedBy = tmpLog[lastIndex].user + " " + moment.utc(tmpLog[lastIndex].date).format("MM/DD/YYYY hh:mm A");
				}else{
					this.lblUpdatedBy="";
				}

			}else{
				this.lblCreatedBy = "";
				this.lblUpdatedBy = "";
			}
			

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in querying character ref.");
		});

	}

	btnAdd(){
		this._disableForm = false;
		this._disableBtnAdd = true;
		this._disableBtnSave = false;
		this._disableTable = true;
		this.formStatus = "ADD";		
	}

	btnEdit(item){
		this._disableForm = false;
		this._disableBtnAdd = true;
		this._disableBtnSave = false;
		this._disableTable = true;
		this.formStatus = "EDIT";
		if(item.job_id != null){
			this.obj_personnel.CHARACTER_REF.model.job_id = item.job_id.toString();
		}else{
			this.obj_personnel.CHARACTER_REF.model.job_id = null;
		}
		this.obj_personnel.CHARACTER_REF.model.job_other = item.job_other;
		this.obj_personnel.CHARACTER_REF.model.char_ref_id = item.char_ref_id;
		this.obj_personnel.CHARACTER_REF.model.full_name = item.full_name;
		this.obj_personnel.CHARACTER_REF.model.company_name = item.company_name;
		this.obj_personnel.CHARACTER_REF.model.phone_no = item.phone_no;
	}

	btnRemove(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('CHAR_REF_TRX').where('CHAR_REF_ID', '==', item.char_ref_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{

  							toastr.clear();
  							toastr.success("", "Record was successfully removed.");
  							this.loadCharacterRef(this.obj_personnel.global_indiv_id);
  							this.clearField();

  						},(error)=>{
  							toastr.clear();
  							toastr.error(error, "Error in removing character reference.");
  							settings.isNavigating = false;
  						});

  					});
  				}
  		});
	}

	clearField(){
		this._disableForm = true;
		this._disableBtnAdd = false;
		this._disableBtnSave = true;
		this._disableTable = false;
		this.formStatus = "";
		// console.log(this.obj_personnel.CHARACTER_REF.model.job_id);
		this.obj_personnel.CHARACTER_REF.model = {};
		this.obj_personnel.CHARACTER_REF.model.job_id = "";
	}

	validate(){

		var strValidation = "";

		if(this.obj_personnel.CHARACTER_REF.model.full_name == undefined || this.obj_personnel.CHARACTER_REF.model.full_name == null || this.obj_personnel.CHARACTER_REF.model.length==0){
			strValidation+="No name specified. <br/>";
		}

		if(this.obj_personnel.CHARACTER_REF.model.phone_no == undefined || this.obj_personnel.CHARACTER_REF.model.phone_no == null || this.obj_personnel.CHARACTER_REF.model.phone_no.length==0){
			strValidation+="No contact number specified. <br/>";
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.obj_personnel.CHARACTER_REF.model.char_ref_id != undefined && this.obj_personnel.CHARACTER_REF.model.char_ref_id != null && this.obj_personnel.CHARACTER_REF.model.char_ref_id>0){
				this.updateCharacterRef(this.obj_personnel.CHARACTER_REF.model.char_ref_id);
			}else{
				this.saveCharacterRef(this.obj_personnel.global_indiv_id);
			}
		}
	}

	saveCharacterRef(global_indiv_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("CHAR_REF_TRX")
					.orderByDesc("CHAR_REF_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{

			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].CHAR_REF_ID+1;
			}

			var char_ref = {
				CHAR_REF_ID: maxId,
				GLOBAL_INDIV_ID: global_indiv_id,
				FULL_NAME: this.obj_personnel.CHARACTER_REF.model.full_name,
				COMPANY_NAME: this.obj_personnel.CHARACTER_REF.model.company_name,
				PHONE_NO: this.obj_personnel.CHARACTER_REF.model.phone_no,
				JOB_ID: this.obj_personnel.CHARACTER_REF.model.job_id,
				JOB_OTHER: this.obj_personnel.CHARACTER_REF.model.job_other,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};
			var entity = EntityManager().createEntity("CHAR_REF_TRX", char_ref);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadCharacterRef(global_indiv_id);
				this.clearField();

			}, (e2)=>{
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in saving character ref.");
			});


		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying character ref id.");
		});

	}

	updateCharacterRef(char_ref_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("CHAR_REF_TRX")
					.where("CHAR_REF_ID", "==", char_ref_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].FULL_NAME = this.obj_personnel.CHARACTER_REF.model.full_name;
			s1.results[0].COMPANY_NAME = this.obj_personnel.CHARACTER_REF.model.company_name;
			s1.results[0].PHONE_NO = this.obj_personnel.CHARACTER_REF.model.phone_no;
			s1.results[0].JOB_ID = this.obj_personnel.CHARACTER_REF.model.job_id;
			s1.results[0].JOB_OTHER = this.obj_personnel.CHARACTER_REF.model.job_other;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record has been updated.");
				this.loadCharacterRef(this.obj_personnel.global_indiv_id);
				this.clearField();

			}, (e2)=>{
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in updating character ref.");
			});


		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying character ref.");
		});

	}

	IsDigit(event){
		return isDigit(event);
	}
}