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
export class relative_children{

	obj_personnel = null;
	lblCreatedBy=null;
	lblUpdatedBy=null;
	_disableBtnAdd=false;
	_disableBtnSave=true;
	_disableForm=true;
	_disableTable=false;
	_disableDeceasedDt=true;
	formStatus="";
	constructor(obj_personnel, toastr, DialogService){
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;

		this.obj_personnel.OBSERVERS.relative_tab_changed.push((tab_num, global_indiv_id)=>{
			if(tab_num==3){
				$("#children_birth_dt").datepicker();
				$("#children_deceased_dt").datepicker();
				this.loadChildren(global_indiv_id);
				this.clearField();
			}
		});
	}

	loadChildren(global_indiv_id){

		settings.isNavigating = true;
		var pred1 = breeze.Predicate.create("GLOBAL_INDIV_ID", "==", global_indiv_id);
		var pred2 = breeze.Predicate.create("IN_CASE_OF_EMERGENCY_FL", "!=", "1");
		var orPred = [];
		_.each(this.obj_personnel.RELATIONSHIP, (relation)=>{
			if(relation.group=="CHILDREN"){
				orPred.push(breeze.Predicate.create("RELATIVE_CD", "==", relation.value));
			}
		});
		var _orPred = breeze.Predicate.or(orPred);
		var finalPred = breeze.Predicate.and([pred1, pred2, _orPred]);

		var query = EntityQuery().from("RELATIVE_TRX")
					.where(finalPred);
		EntityManager().executeQuery(query).then((s1)=>{
			var tmp = [];
			var tmpLog=[];
			_.each(s1.results, (r)=>{
				var deceased_dt = null;
				if(moment(r.DECEASED_DT).isValid()){					
					deceased_dt = moment.utc(r.DECEASED_DT).format("MM/DD/YYYY");
					if(deceased_dt == "01/01/0001"){
						deceased_dt = "";
					}
				}
				var status = null;
				switch(r.DEPENDENT_FL){
					case "0": status = "Dependent";
						break;
					case "1": status = "Deceased";
						break;
				}

				tmp.push({
					relative_id: r.RELATIVE_ID,
					given_name: r.GIVEN_NAME,
					middle_name: r.MIDDLE_NAME,
					last_name: r.LAST_NAME,
					birth_dt: moment.utc(r.BIRTH_DT).format("MM/DD/YYYY"),
					age: this.computeAge(moment.utc(r.BIRTH_DT).format("MM/DD/YYYY")),
					occupation: r.OCCUPATION,
					employer: r.EMPLOYER,
					dependent_fl: r.DEPENDENT_FL,
					status: status,
					deceased_dt: deceased_dt,
					relative_cd: r.RELATIVE_CD
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
			console.log(tmp);
			this.obj_personnel.RELATIVE.children.list = tmp;
			tmpLog.sort(OrderByDate);
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
			toastr.clear();
			toastr.success("", "Relative info has been loaded...");
			settings.isNavigating = false;

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in querying children list.");
		});
	}

	checkChange(bit){
 
		switch(bit){
			case 0:
				$("#children_deceased").prop("checked", false);
				break;
			case 1:
				$("#children_dependent").prop("checked", false);
				break;
		}

		var isChecked_dependent = $('#children_dependent').is(":checked");
		var isChecked_deceased = $("#children_deceased").is(":checked");
		if(isChecked_dependent){
			this.obj_personnel.RELATIVE.children.model.dependent_fl = "0";
			this.obj_personnel.RELATIVE.children.model.deceased_dt = null;
			$("#deceased_dt").val("");
			this._disableDeceasedDt = true;
		}else if(isChecked_deceased){
			this.obj_personnel.RELATIVE.children.model.dependent_fl = "1";
			this._disableDeceasedDt = false;
		}else if(isChecked_dependent == false && isChecked_deceased == false){
			this._disableDeceasedDt = true;
			this.obj_personnel.RELATIVE.children.model.dependent_fl = null;				
			this.obj_personnel.RELATIVE.children.model.deceased_dt = null;
			$("#deceased_dt").val("");
		}

	}

	computeAge(dateString){
		if(dateString == null || dateString.length==0)
			return;
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;	
	}

	btnAdd(){
		this._disableBtnAdd = true;
		this._disableTable = true;
		this._disableBtnSave = false;
		this._disableForm = false;
		this.formStatus = "ADD";
	}

	btnEdit(item){
		console.log(item);

		this.formStatus="EDIT";
		this._disableBtnAdd = true;
		this._disableTable = true;
		this._disableBtnSave = false;
		this._disableForm = false;
		this.obj_personnel.RELATIVE.children.model.relative_id = item.relative_id;
		this.obj_personnel.RELATIVE.children.model.last_name = item.last_name;
		this.obj_personnel.RELATIVE.children.model.given_name = item.given_name;
		this.obj_personnel.RELATIVE.children.model.middle_name = item.middle_name;
		this.obj_personnel.RELATIVE.children.model.birth_dt = item.birth_dt;
		this.obj_personnel.RELATIVE.children.model.age = item.age;
		this.obj_personnel.RELATIVE.children.model.relative_cd = item.relative_cd;
		if(item.dependent_fl != null){
			switch(item.dependent_fl){
				case "0":
					$("#children_dependent").prop("checked", true);
					break;
				case "1":
					$("#children_deceased").prop("checked", true);
					break;
			}
			this.checkChange(this.obj_personnel.RELATIVE.children.model.dependent_fl);
			this.obj_personnel.RELATIVE.children.model.deceased_dt = item.deceased_dt;
		}
	}

	btnRemove(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('RELATIVE_TRX').where('RELATIVE_ID', '==', item.relative_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.success("","The record was successfully removed.");
  							this.loadChildren(this.obj_personnel.global_indiv_id);
  						},(error)=>{
  							toastr.clear();
  							toastr.error("", "Error in removing address.");
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
		$("#children_deceased").prop("checked", false);
		$("#children_dependent").prop("checked", false);
		this.obj_personnel.RELATIVE.children.model = {};		
		this.formStatus = "";
	}

	validate(){
		var strValidation = "";
		this.obj_personnel.RELATIVE.children.model.birth_dt = $("#children_birth_dt").val();
		this.obj_personnel.RELATIVE.children.model.deceased_dt = $("#children_deceased_dt").val();

		if(this.obj_personnel.RELATIVE.children.model.last_name == undefined || this.obj_personnel.RELATIVE.children.model.last_name == null || this.obj_personnel.RELATIVE.children.model.last_name.length == 0){
			strValidation+="No last name specified. <br/>";
		}

		if(this.obj_personnel.RELATIVE.children.model.given_name == undefined || this.obj_personnel.RELATIVE.children.model.given_name == null || this.obj_personnel.RELATIVE.children.model.given_name.length == 0){
			strValidation+="No given name specified. <br/>";
		}

		if(this.obj_personnel.RELATIVE.children.model.birth_dt != undefined && this.obj_personnel.RELATIVE.children.model.birth_dt != null && this.obj_personnel.RELATIVE.children.model.birth_dt.length>0){
			if(!moment(this.obj_personnel.RELATIVE.children.model.birth_dt).isValid()){
				strValidation+="Invalid birth date.<br/>";
			}else{
				var d1 = new Date(this.obj_personnel.RELATIVE.children.model.birth_dt);
				var d2 = new Date();
				if(d1>d2){
					strValidation+="Birth date cannot be greater than date today.<br/>";
				}
			}
		}else{
			strValidation+="No birth date specified.<br/>";
		}

		if(this.obj_personnel.RELATIVE.children.model.dependent_fl == "1"){
			if(this.obj_personnel.RELATIVE.children.model.deceased_dt.length>0){
				if(!moment(new Date(this.obj_personnel.RELATIVE.children.model.deceased_dt)).isValid()){
					strValidation+="Invalid deceased date. <br/>";
				}else{
					var d1 = new Date(this.obj_personnel.RELATIVE.children.model.deceased_dt);
					var d2 = new Date();
					if(d1>d2){
						strValidation+="Deceased date cannot be greater than date today.<br/>";
					}
				}
			}
			// else{
			// 	strValidation+="[Mother] No deceased date specified.<br/>";
			// }
		}

		if(this.obj_personnel.RELATIVE.children.model.relative_cd == undefined || this.obj_personnel.RELATIVE.children.model.relative_cd == null || this.obj_personnel.RELATIVE.children.model.relative_cd.length ==0){
			strValidation+="No relationship specified.<br/>";
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.formStatus=="ADD"){
				this.save(this.obj_personnel.global_indiv_id);
			}else if(this.formStatus=="EDIT"){
				this.update(this.obj_personnel.RELATIVE.children.model.relative_id);
			}
		}

	}	

	save(global_indiv_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var birth_dt = new Date(moment(this.obj_personnel.RELATIVE.children.model.birth_dt).add(8, "hours"));
		var deceased_dt = null;

		if(moment(this.obj_personnel.RELATIVE.children.model.deceased_dt).isValid()){
			deceased_dt = new Date(moment(this.obj_personnel.RELATIVE.children.model.deceased_dt).add(8, "hours"));
		}

		var query = EntityQuery().from("RELATIVE_TRX")
					.orderByDesc("RELATIVE_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{
			
			var MaxId = 1;
			if(s1.results.length==1){
				MaxId = s1.results[0].RELATIVE_ID+1;
			}

			var relative_trx = {
				RELATIVE_ID: MaxId,
				GLOBAL_INDIV_ID: global_indiv_id,
				GIVEN_NAME: this.obj_personnel.RELATIVE.children.model.given_name,
				MIDDLE_NAME: this.obj_personnel.RELATIVE.children.model.middle_name,
				LAST_NAME: this.obj_personnel.RELATIVE.children.model.last_name,
				BIRTH_DT: birth_dt,
				DEPENDENT_FL: this.obj_personnel.RELATIVE.children.model.dependent_fl,
				DECEASED_DT: deceased_dt,
				RELATIVE_CD: this.obj_personnel.RELATIVE.children.model.relative_cd,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};
			console.log(relative_trx);
			
			var entity = EntityManager().createEntity("RELATIVE_TRX", relative_trx);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{
				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadChildren(global_indiv_id);
				this.clearField();
				settings.isNavigating = false;
			}, (e2)=>{
				settings.isNavigating = false;
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				toastr.error(e2, "Error in saving children info.");
			});


		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error("", "Error in querying relative id.");
		});
	}

	update(relative_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("RELATIVE_TRX")
					.where("RELATIVE_ID", "==", relative_id);
		EntityManager().executeQuery(query).then((s1)=>{

			var birth_dt = new Date(moment(this.obj_personnel.RELATIVE.children.model.birth_dt).add(8, "hours"));

			var deceased_dt = null;
			if(moment(this.obj_personnel.RELATIVE.children.model.deceased_dt).isValid()){
				deceased_dt = new Date(moment(this.obj_personnel.RELATIVE.children.model.deceased_dt).add(8, "hours"));
			}

			s1.results[0].LAST_NAME = this.obj_personnel.RELATIVE.children.model.last_name;
			s1.results[0].GIVEN_NAME = this.obj_personnel.RELATIVE.children.model.given_name;
			s1.results[0].MIDDLE_NAME = this.obj_personnel.RELATIVE.children.model.middle_name;
			s1.results[0].BIRTH_DT = birth_dt;
			s1.results[0].RELATIVE_CD = this.obj_personnel.RELATIVE.children.model.relative_cd;
			s1.results[0].DEPENDENT_FL = this.obj_personnel.RELATIVE.children.model.dependent_fl;
			s1.results[0].DECEASED_DT = deceased_dt;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;
			
			EntityManager().saveChanges().then((s2)=>{
				toastr.clear();
				toastr.success("", "Record updated.");
				this.loadChildren(this.obj_personnel.global_indiv_id);
				this.clearField();
			}, (e2)=>{
				toastr.error(e2, "Error in saving changes.");
			});


		}, (e1)=>{
			toastr.error(e1, "Error in querying relative info.");
		});
	}
}