import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import settings from 'settings';

@inject(obj_personnel, toastr, DialogService)
export class main_educational{

	obj_personnel = null;
	_disableForm=true;
	_disableTable=false;
	_disableBtnAdd=false;
	_disableBtnSave=true;
	lblCreatedBy="";
	lblUpdatedBy="";
	constructor(obj_personnel, toastr, DialogService){
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;
		this.obj_personnel.OBSERVERS.maintab_education_clicked.push((val)=>{
			this.loadMain_Educational(val);
			this.loadLog(val);
			this.clearData();
		});
		
		this.obj_personnel.OBSERVERS.clear_ppid.push(()=>{
			this.obj_personnel.EDUCATIONAL_ACHIEVEMENT={
				status:"",
				model:{},
				list:[]
			};
		});
	}

	loadMain_Educational(global_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("EDUCATION_TRX")
					.where("GLOBAL_INDIV_ID", "==", global_id);
		EntityManager().executeQuery(query).then((querySuccess)=>{
			var tmpList=[];
			_.each(querySuccess.results, (result)=>{
				var school = this.obj_personnel.SCHOOLS.find((x)=>{
					return x.school_cd == result.SCHOOL_CD;
				});
				var level = this.obj_personnel.LEVEL.find((x)=>{
					return x.value == result.EDUCATION_LEVEL;
				});
				var education = {
					start_yr: result.START_YR,
					course: result.COURSE,
					education_id: result.EDUCATION_ID,
					education_level: result.EDUCATION_LEVEL,
					end_yr: result.END_YR,
					school_cd: result.SCHOOL_CD,
					honor_awards: result.HONOR_AWARDS,
					completed_fl: result.COMPLETED_FL,
					school_name: school.school_name,
					level_name: level.text					
				};
				tmpList.push(education);
			});
			this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.list = tmpList;
			toastr.clear();
			toastr.success("", "Success");
			settings.isNavigating = false;

		}, (error)=>{
			settings.isNavigating = false;
			toastr.error(error, "Error in loading educational details.");
		});
	}

	loadLog(global_id){

		var tmpList=[];
		var query = EntityQuery().from("EDUCATION_TRX")
					.where("GLOBAL_INDIV_ID", "==", global_id);
		EntityManager().executeQuery(query).then((s1)=>{
			_.each(s1.results, (r)=>{
				if(r.CREATED_BY != null){
					var _user = r.CREATED_BY;
					var _date = new Date(r.CREATED_DT);
					tmpList.push({
						user: _user,
						date: _date
					});
				}

				if(r.LAST_UPDATED_DT != null){
					var _user = r.LAST_UPDATED_BY;
					var _date = r.LAST_UPDATED_DT;
					tmpList.push({
						user: _user,
						date: _date
					});
				}
			});

			tmpList.sort(this.OrderByDate);
			var LastIndex = tmpList.length-1;
			if(tmpList.length>0){
				this.lblCreatedBy = tmpList[0].user + ' ' + moment.utc(tmpList[0].date).format("MM/DD/YYYY hh:mm A");
				if(tmpList.length>1){
					this.lblUpdatedBy = tmpList[LastIndex].user + ' ' + moment.utc(tmpList[LastIndex].date).format("MM/DD/YYYY hh:mm A");
				}
			}else{
				this.lblCreatedBy = "";
				this.lblUpdatedBy = "";
			}

		});

	}

	OrderByDate(a, b){
		if(a.date > b.date)
			return 1;
		if(a.date < b.date)
			return -1;
		return 0;
	}

	btnAdd(){
		this._disableForm = false;
		this._disableTable = true;
		this._disableBtnAdd = true;	
		this._disableBtnSave = false;
		this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.status="ADD";
	}

	btnEdit(education){		
		this._disableForm = false;
		this._disableTable = true;
		this._disableBtnAdd = true;	
		this._disableBtnSave = false;
		this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model = {
			education_id: education.education_id,
			education_level: education.education_level,
			start_yr: education.start_yr+"",
			end_yr: education.end_yr+"",
			school_cd: education.school_cd,
			course: education.course,
			honor_awards: education.honor_awards,
			completed_fl: education.completed_fl=="1"
		};
		this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.status="EDIT";
	}

	clearData(){
		settings.isNavigating = false;
		this._disableForm = true;
		this._disableTable = false;
		this._disableBtnAdd = false;
		this._disableBtnSave = true;
		this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model={};
		this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.status="";
	}

	validate(){
		var strValidation="";
		if(this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level == undefined || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level == null || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level.length==0){
			strValidation+="No level specified.<br/>";
		}

		if(this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr == undefined || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr == null || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr.length==0){
			strValidation+="No start year specified.<br/>";
		}

		if(this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr == undefined || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr == null || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr.length==0){
			strValidation+="No end year specified.<br/>";
		}

		if(this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd == undefined || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd == null || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd.length==0){
			strValidation+="No school specified.<br/>";
		}

		if(this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course == undefined || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course == null || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course.length==0){
			strValidation+="No degree/major specified.<br/>";
		}

		if(this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr != undefined && this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr != null && this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr.length>0){
			if(this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr != undefined && this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr != null && this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr.length>0){				
				if(this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr> this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr)
				{
					strValidation+="Start year cannot be greater than end year.<br/>";
				}
			}
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.status=="ADD")
			{
				this.insert();
			}else if(this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.status=="EDIT")
			{
				this.update();
			}
		}
	}

	insert(){

		settings.isNavigating = true;
		var dateToday = null;
		dateToday = new moment(new Date()).add(8, 'hours');
		dateToday = new Date(dateToday);
		var query = EntityQuery().from("EDUCATION_TRX")
					.orderByDesc("EDUCATION_ID").take(1);
		EntityManager().executeQuery(query).then((querySuccess)=>{
			var Max=1;
			if(querySuccess.results.length>0)
			{
				Max = querySuccess.results[0].EDUCATION_ID+1;
			}

			var education_trx = {
				GLOBAL_INDIV_ID: this.obj_personnel.global_indiv_id,
				START_YR: this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr,
				COURSE: this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course,
				EDUCATION_ID: Max,
				EDUCATION_LEVEL: this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level,
				END_YR: this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr,
				SCHOOL_CD: this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd,
				YR_GRADUATED: 0,
				HONOR_AWARDS: this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.honor_awards,
				COMPLETED_FL: this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.completed_fl?1:0,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("EDUCATION_TRX", education_trx);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((saveSuccess)=>{
				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadMain_Educational(this.obj_personnel.global_indiv_id);
				this.clearData();
			},(saveError)=>{

				settings.isNavigating = false;
				if(entity!= null){
					entity.entityAspect.setDeleted();
				}
				toastr.clear();
				toastr.error("", saveError);
			});
		});		
	}

	update(){

		settings.isNavigating = true;
		var dateToday = null;
		dateToday = new moment(new Date()).add(8, 'hours');
		dateToday = new Date(dateToday);
		var query = EntityQuery().from("EDUCATION_TRX")
					.where("EDUCATION_ID", "==", this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_id);
		EntityManager().executeQuery(query).then((querySuccess)=>{
			if(querySuccess.results.length==0){
				toastr.clear();
				toastr.error("", "Error in query data to be updated");
			}
			querySuccess.results[0].START_YR = this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr;
			querySuccess.results[0].COURSE = this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course;
			querySuccess.results[0].EDUCATION_LEVEL = this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level;
			querySuccess.results[0].END_YR = this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr;
			querySuccess.results[0].SCHOOL_CD = this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd;
			querySuccess.results[0].HONOR_AWARDS = this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.honor_awards;
			querySuccess.results[0].COMPLETED_FL = this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.completed_fl?1:0;
			querySuccess.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			querySuccess.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((updateSuccess)=>{
				toastr.clear();
				toastr.success("", "Record updated.");
				this.loadMain_Educational(this.obj_personnel.global_indiv_id);
				this.clearData();
			}, (updateError)=>{

				settings.isNavigating = false;
				toastr.clear();
				toastr.error("", updateError);
			});
		});
	}

	btnRemove(educ)
	{
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the educational achievement" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
  					settings.isNavigating = true;
  					var query = EntityQuery().from("EDUCATION_TRX")
  								.where("EDUCATION_ID", "==", educ.education_id);
  					EntityManager().executeQuery(query).then((querySuccess)=>{
  						if(querySuccess.results.length==0){
  							toastr.clear();
  							toastr.error("","No to-be-remove record found.");
  						}
  						querySuccess.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((removeSuccess)=>{
  							toastr.clear();
  							toastr.success("","The educational achievement was successfully removed.");
  							this.loadMain_Educational(this.obj_personnel.global_indiv_id);
							this.clearData();
  						},(removeError)=>{
  							settings.isNavigating = false;
  							toastr.clear();
  							toastr.error(removeError, "Error in removing educational achievement.");
  						});

  					});
  				}
  		});
	}
}