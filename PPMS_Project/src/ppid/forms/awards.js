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
export class awards{

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

		this.obj_personnel.OBSERVERS.tab_changed.push((tab_num, global_indiv_id)=>{
			if(tab_num == 2){				
				$("#award_receive_dt").datepicker();
				toastr.clear();
				toastr.info("", "Loading award info...");
				this.loadAward(global_indiv_id);
				this.clearField();
			}
		});

		this.obj_personnel.OBSERVERS.award_training_tab_changed.push((tab_num, global_id)=>{
			if(tab_num == 0){
				$("#award_receive_dt").datepicker();
				this.loadAward(global_id);
				this.clearField();
			}
		});
	}

	loadAward(global_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("AWARD_TRX")
					.where("GLOBAL_ID", "==", global_id);
		EntityManager().executeQuery(query).then((s1)=>{

			var tmp = [];
			var tmpLog = [];
			_.each(s1.results, (r)=>{
				var receive_dt = null;
				if(moment(r.RECEIVE_DT).isValid()){
					receive_dt = moment.utc(r.RECEIVE_DT).format("MM/DD/YYYY");
				}

				tmp.push({
					award_id: r.AWARD_ID,
					award_cd: r.AWARD_CD,
					award_body_cd: r.AWARD_BODY_CD,
					project_name: r.PROJECT_NAME,
					receive_dt: receive_dt,
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
			toastr.success("", "Awards has been loaded...");
			this.obj_personnel.AWARD.list = tmp;

			if(tmpLog.length>0){

				this.lblCreatedBy = tmpLog[0].user + " " + moment.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
				if(tmpLog.length>1){
					var lastIndex = tmpLog.length-1;
					this.lblUpdatedBy = tmpLog[lastIndex].user + " " + moment.utc(tmpLog[lastIndex].date).format("MM/DD/YYYY hh:mm A");
				}

			}else{
				this.lblCreatedBy = "";
				this.lblUpdatedBy = "";				
			}

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying awards...");			
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
		this.obj_personnel.AWARD.model.award_id = item.award_id;
		this.obj_personnel.AWARD.model.award_cd = item.award_cd;
		this.obj_personnel.AWARD.model.award_body_cd = item.award_body_cd;
		this.obj_personnel.AWARD.model.project_name = item.project_name;
		this.obj_personnel.AWARD.model.receive_dt = item.receive_dt;
		this.obj_personnel.AWARD.model.remarks = item.remarks;
	}

	btnRemove(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				//alert("Confirmed delete.");
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('AWARD_TRX').where('AWARD_ID', '==', item.award_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.clear();
  							toastr.success("","The record was successfully removed.");
  							this.loadAward(this.obj_personnel.global_indiv_id);
  							this.clearField();
  							
  						},(error)=>{
  							toastr.clear();
  							toastr.error("", "Error in removing award.");
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
		this.obj_personnel.AWARD.model.award_id = 0;
		this.obj_personnel.AWARD.model.award_cd = "";
		this.obj_personnel.AWARD.model.award_body_cd = "";
		this.obj_personnel.AWARD.model.project_name = "";
		this.obj_personnel.AWARD.model.receive_dt = "";
		this.obj_personnel.AWARD.model.remarks = "";
	}

	validate(){

		var strValidation = "";
		this.obj_personnel.AWARD.model.receive_dt = $("#award_receive_dt").val();

		if(this.obj_personnel.AWARD.model.award_cd == undefined || this.obj_personnel.AWARD.model.award_cd == null || this.obj_personnel.AWARD.model.award_cd.length == 0){
			strValidation+="No award specified.<br/>";
		}

		if(this.obj_personnel.AWARD.model.award_body_cd == undefined || this.obj_personnel.AWARD.model.award_body_cd == null || this.obj_personnel.AWARD.model.award_body_cd.length == 0){
			strValidation+="No Award body specified.<br/>";
		}

		if(this.obj_personnel.AWARD.model.project_name == undefined || this.obj_personnel.AWARD.model.project_name == null || this.obj_personnel.AWARD.model.project_name.length==0){
			strValidation+="No project name specified.<br/>";
		}

		if(this.obj_personnel.AWARD.model.receive_dt == undefined || this.obj_personnel.AWARD.model.receive_dt == null || this.obj_personnel.AWARD.model.receive_dt.length==0){
			strValidation+="No date received specified.<br/>";
		}else{
			if(moment(this.obj_personnel.AWARD.model).isValid()){
				var d1 = new Date(this.obj_personnel.AWARD.model.receive_dt);
				var d2 = new Date();
				if(d1>d2){
					strValidation+="Date received cannot be greater than date today.<br/>";
				}
			}else{
				strValidation+="Invalid date recevied.<br/>";
			}
		}

		if(this.obj_personnel.AWARD.model.remarks == undefined || this.obj_personnel.AWARD.model.remarks == null || this.obj_personnel.AWARD.model.remarks.length==0){
			strValidation+="No remarks specified.<br/>";
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.formStatus == "ADD"){
				this.saveAward(this.obj_personnel.global_indiv_id);
			}else if(this.formStatus == "EDIT"){
				this.updateAward(this.obj_personnel.AWARD.model.award_id);
			}
		}
	}

	saveAward(global_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var receive_dt = new Date(moment(this.obj_personnel.AWARD.model.receive_dt).add(8, "hours"));
		var query = EntityQuery().from("AWARD_TRX")
					.orderByDesc("AWARD_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{

			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].AWARD_ID+1;				
			}

			var award = {
				AWARD_ID: maxId,
				GLOBAL_ID: global_id,
				AWARD_CD: this.obj_personnel.AWARD.model.award_cd,
				AWARD_BODY_CD: this.obj_personnel.AWARD.model.award_body_cd,
				PROJECT_NAME: this.obj_personnel.AWARD.model.project_name,
				RECEIVE_DT: receive_dt,
				REMARKS: this.obj_personnel.AWARD.model.remarks,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("AWARD_TRX", award);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadAward(global_id);
				this.clearField();

			}, (e2)=>{
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in saving award.");	
			});

		}, (e2)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e2, "Error in querying award id.");
		});

	}

	updateAward(award_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var receive_dt = new Date(moment(this.obj_personnel.AWARD.model.receive_dt).add(8, "hours"));
		var query = EntityQuery().from("AWARD_TRX")
					.where("AWARD_ID", "==", award_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].AWARD_CD = this.obj_personnel.AWARD.model.award_cd;
			s1.results[0].AWARD_BODY_CD = this.obj_personnel.AWARD.model.award_body_cd;
			s1.results[0].PROJECT_NAME = this.obj_personnel.AWARD.model.project_name;
			s1.results[0].RECEIVE_DT = receive_dt;
			s1.results[0].REMARKS = this.obj_personnel.AWARD.model.remarks;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record updated.");
				this.loadAward(this.obj_personnel.global_indiv_id);
				this.clearField();

			}, (e2)=>{
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in updating award.");
			});

		}, (e2)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e2, "Error in querying award info.");
		});

	}
}