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
export class main_language{

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
	
		this.obj_personnel.OBSERVERS.maintab_language_clicked.push((val)=>{
			this.loadLangDialect(val);
			this.clearField();
		});
	}

	loadLangDialect(global_indiv_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("LANG_DIALECT_TRX")
					.where("GLOBAL_INDIV_ID","==", global_indiv_id);
		EntityManager().executeQuery(query).then((s1)=>{

			var tmp=[];
			var tmpLog=[];
			_.each(s1.results, (r)=>{
				tmp.push({
					lang_dialect_id: r.LANG_DIALECT_ID,
					lang_dialect_cd: r.LANG_DIALECT_CD,
					read_rating_cd: r.READ_RATING_CD,
					speak_rating_cd: r.SPEAK_RATING_CD,
					write_rating_cd: r.WRITE_RATING_CD,
				});

				if(r.CREATED_BY!=null){
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
			toastr.success("", "Language/Dialect record has been loaded...");
			this.obj_personnel.LANGUAGE_DIALECT.list = tmp;
			if(tmpLog.length>0){

				tmpLog.sort(OrderByDate);
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

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying language/dialect record.");
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
		this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_id = item.lang_dialect_id;
		this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_cd = item.lang_dialect_cd;
		this.obj_personnel.LANGUAGE_DIALECT.model.speak_rating_cd = item.speak_rating_cd;
		this.obj_personnel.LANGUAGE_DIALECT.model.write_rating_cd = item.write_rating_cd;
		this.obj_personnel.LANGUAGE_DIALECT.model.read_rating_cd = item.read_rating_cd;
	}

	btnRemove(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				//alert("Confirmed delete.");
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('LANG_DIALECT_TRX').where('LANG_DIALECT_ID', '==', item.lang_dialect_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.clear();
  							toastr.success("","The record was successfully removed.");
  							this.loadLangDialect(this.obj_personnel.global_indiv_id);
  							this.clearField();
  							
  						},(error)=>{
  							toastr.clear();
  							toastr.error(error, "Error in removing address.");
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
		this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_id = 0;
		this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_cd = "";
		this.obj_personnel.LANGUAGE_DIALECT.model.speak_rating_cd = "";
		this.obj_personnel.LANGUAGE_DIALECT.model.write_rating_cd = "";
		this.obj_personnel.LANGUAGE_DIALECT.model.read_rating_cd = "";


		// if(this.obj_personnel.LANGUAGE.length>0){
		// 	var language_cd = this.obj_personnel.LANGUAGE[0];			
		// 	this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_cd = language_cd.value;
		// }

		// if(this.obj_personnel.RATING.length>0){
		// 	var rating_cd = this.obj_personnel.RATING[0];
		// 	this.obj_personnel.LANGUAGE_DIALECT.model.speak_rating_cd = rating_cd.value;
		// 	this.obj_personnel.LANGUAGE_DIALECT.model.write_rating_cd = rating_cd.value;
		// 	this.obj_personnel.LANGUAGE_DIALECT.model.read_rating_cd = rating_cd.value;
		// }		
	}

	validate(){

		var strValidation = "";

		if(this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_cd == undefined || this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_cd == null || this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_cd.length==0){
			strValidation+="No language specified.<br/>";
		}

		if(this.obj_personnel.LANGUAGE_DIALECT.model.write_rating_cd == undefined || this.obj_personnel.LANGUAGE_DIALECT.model.write_rating_cd == null || this.obj_personnel.LANGUAGE_DIALECT.model.write_rating_cd.length==0){
			strValidation+="No write rating specified.<br/>";
		}

		if(this.obj_personnel.LANGUAGE_DIALECT.model.speak_rating_cd == undefined || this.obj_personnel.LANGUAGE_DIALECT.model.speak_rating_cd == null || this.obj_personnel.LANGUAGE_DIALECT.model.speak_rating_cd.length==0){
			strValidation+="No speak rating specified.<br/>";
		}

		if(this.obj_personnel.LANGUAGE_DIALECT.model.read_rating_cd == undefined || this.obj_personnel.LANGUAGE_DIALECT.model.read_rating_cd == null || this.obj_personnel.LANGUAGE_DIALECT.model.read_rating_cd.length==0){
			strValidation+="No read rating specified.<br/>";
		}

		if(strValidation.length==0){
			var lang_dialect = this.obj_personnel.LANGUAGE_DIALECT.list.find((x)=>{
				return x.lang_dialect_cd == this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_cd;
			});
			if(lang_dialect != null){
				if(this.formStatus == "ADD"){
					strValidation+="Duplicate entries are not allowed.<br/>";
				}else if(this.formStatus == "EDIT"){
					if(lang_dialect.lang_dialect_id != this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_id){
						strValidation+="Duplicate entries are not allowed.<br/>";
					}
				}
			}
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.formStatus == "ADD"){
				this.saveLangDialect(this.obj_personnel.global_indiv_id);
			}else if(this.formStatus == "EDIT"){
				this.updateLangDialect(this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_id);
			}
		}
	}

	saveLangDialect(global_indiv_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("LANG_DIALECT_TRX")
					.orderByDesc("LANG_DIALECT_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{

			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].LANG_DIALECT_ID+1;
			}

			var lang_dialect_trx = {
				LANG_DIALECT_ID: maxId,
				GLOBAL_INDIV_ID: global_indiv_id,
				LANG_DIALECT_CD: this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_cd,
				WRITE_RATING_CD: this.obj_personnel.LANGUAGE_DIALECT.model.write_rating_cd,
				SPEAK_RATING_CD: this.obj_personnel.LANGUAGE_DIALECT.model.speak_rating_cd,
				READ_RATING_CD: this.obj_personnel.LANGUAGE_DIALECT.model.read_rating_cd,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			console.log(lang_dialect_trx);

			var entity = EntityManager().createEntity("LANG_DIALECT_TRX", lang_dialect_trx);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadLangDialect(global_indiv_id);
				this.clearField();

			}, (e2)=>{
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in saving language/dialect...");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying language/dialect id.");
		});

	}

	updateLangDialect(lang_dialect_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("LANG_DIALECT_TRX")
					.where("LANG_DIALECT_ID", "==", lang_dialect_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].LANG_DIALECT_CD = this.obj_personnel.LANGUAGE_DIALECT.model.lang_dialect_cd;
			s1.results[0].WRITE_RATING_CD = this.obj_personnel.LANGUAGE_DIALECT.model.write_rating_cd;
			s1.results[0].SPEAK_RATING_CD = this.obj_personnel.LANGUAGE_DIALECT.model.speak_rating_cd;
			s1.results[0].READ_RATING_CD = this.obj_personnel.LANGUAGE_DIALECT.model.read_rating_cd;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{

				toastr.clear();
				toastr.success("", "Record updated.");
				this.loadLangDialect(this.obj_personnel.global_indiv_id);
				this.clearField();

			}, (e2)=>{
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in saving changes.");
			});

		}, (e2)=>{
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e2, "Error in querying language/dialect info.");
		});
	}

}