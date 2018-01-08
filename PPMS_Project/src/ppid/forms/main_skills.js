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
export class main_skills {

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

		this.obj_personnel.OBSERVERS.maintab_skills_clicked.push((val)=>{
			this.loadSkillTalent(val);
		});
	}

	loadSkillTalent(global_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("SKILL_TALENT_TRX")
					.where("GLOBAL_ID", "==", global_id);
		EntityManager().executeQuery(query).then((s1)=>{

			var tmp=[];
			var tmpLog=[];
			_.each(s1.results, (r)=>{

				var skill_talent_cd = this.obj_personnel.SKILL_TALENT.find((x)=>{
					return x.value == r.SKILL_TALENT_CD;
				});

				var rating_cd = this.obj_personnel.RATING.find((x)=>{
					return x.value == r.RATING_CD;
				});

				tmp.push({
					skill_talent_id: r.SKILL_TALENT_ID,					
					skill_talent_cd: r.SKILL_TALENT_CD,
					skill_talent_nm: skill_talent_cd.text,					
					rating_cd: r.RATING_CD,
					rating_nm: rating_cd.text
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
			toastr.success("", "Skills/Talents has been loaded.");
			this.obj_personnel.SKILLS.list = tmp;
			tmpLog.sort(OrderByDate);
			if(tmpLog.length>0){

				this.lblCreatedBy = tmpLog[0].user + " " + moment.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
				if(tmpLog.length>1){
					var lastIndex = tmpLog.length-1;
					this.lblUpdatedBy = tmpLog[lastIndex].user + " " + moment.utc(tmpLog[lastIndex].date).format("MM/DD/YYYY hh:mm A");
				}else{
					this.lblUpdatedBy = "";
				}
			}else{
				this.lblCreatedBy = "";
				this.lblUpdatedBy = "";
			}
			

		},(e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying skill/talent record.");
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
		this.obj_personnel.SKILLS.model.skill_talent_id = item.skill_talent_id;
		this.obj_personnel.SKILLS.model.skill_talent_cd = item.skill_talent_cd;
		this.obj_personnel.SKILLS.model.rating_cd = item.rating_cd;
		// var rating_cd = this.obj_personnel.RATING.find((x)=>{
		// 	return x.value == item.rating_cd;
		// });
		// if(rating_cd != null){
		// 	this.obj_personnel.SKILLS.model.rating_cd = rating_cd.value;
		// }else{
		// 	this.obj_personnel.SKILLS.model.rating_cd = item.rating_cd;
		// }
	}

	btnRemove(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				//alert("Confirmed delete.");
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('SKILL_TALENT_TRX').where('SKILL_TALENT_ID', '==', item.skill_talent_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.clear();
  							toastr.success("","The record was successfully removed.");
  							this.loadSkillTalent(this.obj_personnel.global_indiv_id);
  							this.clearField();
  							
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
		this.formStatus = "";
		if(this.obj_personnel.SKILL_TALENT.length>0){
			this.obj_personnel.SKILLS.model.skill_talent_cd = this.obj_personnel.SKILL_TALENT[0].value;
		}
		if(this.obj_personnel.RATING.length>0){
			this.obj_personnel.SKILLS.model.rating_cd = this.obj_personnel.RATING[0].value;
		}
	}

	validate(){

		var strValidation = "";
		if(this.obj_personnel.SKILLS.model.skill_talent_cd == undefined || this.obj_personnel.SKILLS.model.skill_talent_cd == null || this.obj_personnel.SKILLS.model.skill_talent_cd.length==0){
			strValidation+="No Skill/Talent specified.<br/>";
		}

		if(this.obj_personnel.SKILLS.model.rating_cd == undefined || this.obj_personnel.SKILLS.model.rating_cd == null || this.obj_personnel.SKILLS.model.rating_cd.length==0){
			strValidation+="No rating specified.<br/>";
		}

		if(strValidation.length==0){

			var skill_talent = this.obj_personnel.SKILLS.list.find((x)=>{
					return x.skill_talent_cd == this.obj_personnel.SKILLS.model.skill_talent_cd;
				});
			if(skill_talent != null){
				if(this.formStatus == "ADD"){
					strValidation+="Duplicate entries are not allowed.<br/>";
				}else if(this.formStatus == "EDIT"){
					if(this.obj_personnel.SKILLS.model.skill_talent_id != skill_talent.skill_talent_id){
						strValidation+="Duplicate entries are not allowed.<br/>";
					}
				}
			}
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.formStatus=="ADD"){
				this.saveSkillTalent(this.obj_personnel.global_indiv_id);
			}else if(this.formStatus=="EDIT"){
				this.updateSkillTalent(this.obj_personnel.SKILLS.model.skill_talent_id);
			}
		}
	}

	saveSkillTalent(global_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("SKILL_TALENT_TRX")
					.orderByDesc("SKILL_TALENT_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{

			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].SKILL_TALENT_ID+1;
			}

			var skill_talent = {
				SKILL_TALENT_ID: maxId,
				GLOBAL_ID: global_id,
				SKILL_TALENT_CD: this.obj_personnel.SKILLS.model.skill_talent_cd,
				RATING_CD: this.obj_personnel.SKILLS.model.rating_cd,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("SKILL_TALENT_TRX", skill_talent);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadSkillTalent(global_id);
				this.clearField();

			}, (e2)=>{
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in saving skill/talent record.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying skill/talent id.");
		});
	}

	updateSkillTalent(skill_talent_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("SKILL_TALENT_TRX")
					.where("SKILL_TALENT_ID", "==", skill_talent_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].SKILL_TALENT_CD = this.obj_personnel.SKILLS.model.skill_talent_cd;
			s1.results[0].RATING_CD = this.obj_personnel.SKILLS.model.rating_cd;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{


				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadSkillTalent(this.obj_personnel.global_indiv_id);
				this.clearField();

			}, (e2)=>{
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in updating skill/talent record.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying skill/talent record.");
		});

	}
}