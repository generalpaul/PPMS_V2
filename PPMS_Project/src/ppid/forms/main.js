//import {checkCookie,setCookie,removeCookie} from '.././helpers';
import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {DialogService} from 'aurelia-dialog';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';
import breeze from 'breeze-client';
import {ppid_search} from "../modals/ppid_search";
import moment from 'moment';
import {fnSerializeCode} from "../../helpers";
import { cache_obj } from '../../cache_obj';
import {input_mask} from "../../helpers";
import {isDigit} from "../../helpers";
import settings from 'settings';

@inject(DialogService, obj_personnel, toastr, cache_obj)
export class main
{
	

	_disableSearchPersonnel = false;
	_disableCreatePersonnel = false;	
	_disableSavePersonnel = true;
	_disableClearData = true;
	_disableResetData = true;
	_disableForm = true;
	_hideSavePersonnel = false;
	_hideCreatePersonnel = false;
	_isActiveTab=true;

	gender=["Male", "Female"];
	selectedGender="";
	selected_citizenship="";
	selected_group="";	
	obj_personnel=null;
	cache_obj=null;
	_404_img = "/images/404.png";
	primary_img="/styles/images/abslogo_BIG.png";
	constructor(dialogService, obj_personnel, toastr, cache_obj)
	{
		this.obj_personnel = obj_personnel;
		this.dialogService = dialogService;
		this.cache_obj = cache_obj;

		this.obj_personnel.USER = this.cache_obj.USER;
		// console.log(this.obj_personnel.USER);
		this.obj_personnel.OBSERVERS.tab_changed.push((tab_num, global_id)=>{
			// this.loadData(global_id);
		});

		this.obj_personnel.OBSERVERS.ppid_dialog.push((val)=>{			
			this.loadData(val);
		});

		// if(this.obj_personnel.USER.ROLE_CD != "PPID-VIEW"){
		// 	this._hideSavePersonnel = false;
		// 	this._hideCreatePersonnel = false;
		// }else{
		// 	this._hideSavePersonnel = true;
		// 	this._hideCreatePersonnel = true;
		// }

		// this.obj_personnel.OBSERVERS.clear_ppid.push(()=>{
		// 	this.clearData();
		// });

		// this.LoginPassed(this.obj_personnel.USER);
        //this.obj_personnel.OBSERVERS.ppid_dialog.length;
    }

	//https://stackoverflow.com/questions/4060004/calculate-age-in-javascript
	getAge(dateString) {
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


	loadData(global_id)
	{
		settings.isNavigating = true;
		//toastr.success('Retrieving data...', 'Loading...');
		this.obj_personnel.global_indiv_id=global_id;
		var _query = EntityQuery().from('GLOBAL_INDIV_MSTR')
					.where('GLOBAL_INDIV_ID', '==', global_id);

		EntityManager().executeQuery(_query).then((success)=>{

			_.each(success.results, (result)=>{
				this.obj_personnel.HEADER.global_indiv_id = result.GLOBAL_INDIV_ID;
				this.obj_personnel.HEADER.given_name = result.GIVEN_NAME;
				this.obj_personnel.HEADER.last_name = result.LAST_NAME;
				this.obj_personnel.HEADER.middle_name = result.MIDDLE_NAME;
				this.obj_personnel.HEADER.religion_cd = result.RELIGION_CD;
				if(moment(result.BIRTH_DT).isValid()){
					var birthdt = moment.utc(result.BIRTH_DT).format("MM/DD/YYYY");
					// birthdt = new Date(birthdt);
					if(birthdt.length==0){
						// $("#birthDate").datepicker("setValue", new Date());
					}else{
						$("#birthDate").datepicker("setValue", new Date(birthdt));
					}
					this.obj_personnel.HEADER.birth_dt = birthdt;
				}
				this.obj_personnel.HEADER.age = this.getAge(result.BIRTH_DT);
				this.obj_personnel.HEADER.civil_status = result.CIVIL_STATUS;
				this.obj_personnel.HEADER.mother_maiden_name = result.MOTHER_MAIDEN_NAME;
				this.obj_personnel.HEADER.alias = result.ALIAS;
				this.obj_personnel.HEADER.birth_place = result.BIRTH_PLACE; 
				this.obj_personnel.HEADER.gender = result.GENDER;				
				switch(result.GENDER)
				{
					case "M": 	this.selectedGender="Male";
								break;
					case "F": 	this.selectedGender="Female";
								break;
				}
				this.obj_personnel.HEADER.acr_no = result.ACR_NO;
			});
			toastr.clear();
			toastr.success("", "Success");
			settings.isNavigating = false;
		},(failed)=>{
			toastr.error(failed,"Error in retrieving data[1].");
		});

		_query = EntityQuery().from('GLOBAL_MSTR')
				.where('GLOBAL_ID','==', global_id);

		EntityManager().executeQuery(_query).then((success)=>{					

			_.each(success.results, (result)=>{
				this.obj_personnel.HEADER.tin = result.TIN;
				this.obj_personnel.HEADER.country_cd = result.COUNTRY_CD;
				this.obj_personnel.HEADER.country_base_cd = result.COUNTRY_BASE_CD;
				this.obj_personnel.HEADER.location_base_cd = result.LOCATION_BASE_CD;
				this.obj_personnel.HEADER.status_cd = result.STATUS_CD;
				this.obj_personnel.HEADER.created_by = result.CREATED_BY;
				this.obj_personnel.HEADER.created_dt = moment.utc(result.CREATED_DT).format("MM/DD/YYYY hh:mm A");
				this.obj_personnel.HEADER.last_updated_by = result.LAST_UPDATED_BY;
				this.obj_personnel.HEADER.last_updated_dt = moment.utc(result.LAST_UPDATED_DT).format("MM/DD/YYYY hh:mm A");

				if(this.obj_personnel.HEADER.status_cd == "SUSPEND"){
					var _pred1 = breeze.Predicate.create("GLOBAL_ID","==", global_id);
					var _pred2 = breeze.Predicate.create("SUSPEND_LEVEL", "==", 1);
					var _finalPred = breeze.Predicate.and([_pred1, _pred2]);
					_query = EntityQuery().from('SUSPEND_TRX')
							.where(_finalPred)
							.orderByDesc("SUSPEND_ID")
							.take(1);
					EntityManager().executeQuery(_query).then((success)=>{
						if(success.results.length>0){
							this.obj_personnel.HEADER.suspend_id = success.results[0].SUSPEND_ID;
							// this.obj_personnel.HEADER.suspension_start = success.results[0].START_DT;							
							var start_dt = moment.utc(success.results[0].START_DT).format("MM/DD/YYYY");
							this.obj_personnel.HEADER.suspension_start = start_dt;
							$("#suspensionFrom").datepicker("setValue", new Date(start_dt));

							var end_dt = moment.utc(success.results[0].END_DT).format("MM/DD/YYYY");
							this.obj_personnel.HEADER.suspension_end = end_dt;
							$("#suspensionTo").datepicker("setValue", new Date(end_dt));
							// this.obj_personnel.HEADER.suspension_end = success.results[0].END_DT;
						}
					}, (error)=>{
						toastr.error("", error);
					});
				}else{
					this.obj_personnel.HEADER.suspension_start = "";
					this.obj_personnel.HEADER.suspension_end="";
					// $("#suspensionFrom").datepicker("setValue", new Date());
					// $("#suspensionTo").datepicker("setValue", new Date());
				}
			});

			},(failed)=>{
				toastr.error(failed,"Error in retrieving data[2].");
			});



		_query = EntityQuery().from('CITIZENSHIP_TRX')
				.where('GLOBAL_INDIV_ID','==', global_id)
				.orderBy('CITIZENSHIP_CD');

		EntityManager().executeQuery(_query).then((success)=>{
			var tmpArr=[];

			_.each(success.results, (result)=>{
				var tmp=this.obj_personnel.CITIZENSHIP.find((x)=>{
					if(x.value === result.CITIZENSHIP_CD){
						return x;
					}					
				});

				if(tmp != null)
				{
					tmpArr.push(tmp);
				}
			});

			this.obj_personnel.HEADER.citizenship = tmpArr;
		},(failed)=>{
			toastr.error(failed, 'Error in Retrieving Citizenship list.');
		});

		var pred1 = breeze.Predicate.create('GLOBAL_INDIV_ID', '==', global_id);
		var pred2 = breeze.Predicate.create('STATUS_CD', '==', 'ACTV');
		var finalPred = breeze.Predicate.and([pred1, pred2]);
		_query = EntityQuery().from('GRP_INDIV_MSTR')
				.where(finalPred);

		this.obj_personnel.HEADER.group.length=0;
		EntityManager().executeQuery(_query).then((success)=>{
			var tmpArr=[];

			_.each(success.results, (result)=>{
				var tmp = this.obj_personnel.GROUP.find((x)=>{
					if(x.value === result.GLOBAL_GRP_ID){
						return x;
					}										
				});				
				if(tmp != null){
					tmpArr.push(tmp);
				}
			});

			this.obj_personnel.HEADER.group = tmpArr;
		},(failed)=>{
			toastr.error(failed, 'Error in Retrieving Group list.');
		});
	}

	btnAdd_Citizenship(){
		if(this.selected_citizenship.length>0){

			var checkIfExist = this.obj_personnel.HEADER.citizenship.find((c)=>{
				if(c.value === this.selected_citizenship){
					return true;
				}
			});

			if(checkIfExist){
				toastr.error('The selected citizenship is already in the list.','Citizenship function');
				$('.ddCitizenship').val('');
				return;
			}

			var tmp = this.obj_personnel.CITIZENSHIP.find((c)=>{
				if(c.value === this.selected_citizenship){
					return c;
				}
			});

			if(tmp != null){
				this.obj_personnel.HEADER.citizenship.push(tmp);
				//$('.ddCitizenship').val('');
				this.selected_citizenship='';
			}
		}
	}

	removeCitizenship(item){
		var index = this.obj_personnel.HEADER.citizenship.indexOf(item);
		this.obj_personnel.HEADER.citizenship.splice(index, 1);
	}

	removeAllCitizenship(){
		this.obj_personnel.HEADER.citizenship=[];
	}

	btnAdd_Group(){

		if(this.selected_group.length>0){
			// var result = this.obj_personnel.HEADER.group.some((x)=>x.value == this.selected_group);
			var checkIfExist = this.obj_personnel.HEADER.group.find((c)=>{
				if(c.value === this.selected_group){
					return true;
				}
			});

			if(checkIfExist){
				toastr.error('The selected group is already added in the list.','Group function');
				$('.ddGroup').val('');
				return;
			}

			var tmp = this.obj_personnel.GROUP.find((c)=>{
				if(c.value === this.selected_group){
					return c;
				}
			});

			if(tmp != null){
				this.obj_personnel.HEADER.group.push(tmp);
				//$('.ddGroup').val('');
				this.selected_group = '';
			}
		}
	}

	removeGroup(item)
	{
		var index = this.obj_personnel.HEADER.group.indexOf(item);
		this.obj_personnel.HEADER.group.splice(index, 1);
	}

	removeAllGroup(){
		this.obj_personnel.HEADER.group=[];
	}

	fnPersonnel(call)
	{

		$("#birthDate").datepicker();
		$("#suspensionFrom").datepicker();
		$("#suspensionTo").datepicker();		
		switch(call)
		{
			case "EDIT": 	
				this.dialogService.open({ viewModel: ppid_search }).whenClosed(response=>{
						if(!response.wasCancelled)
						{
							this._disableSearchPersonnel = true;
							this._disableResetData = false;
							this._disableClearData = false;
							this._disableCreatePersonnel = true;
							this._disableSavePersonnel = false;							
							this._disableForm = false;
							// if(!this.obj_personnel.USER.ROLE_CD == "PPID-VIEW"){
							// 	this._disableCreatePersonnel = true;
							// 	this._disableSavePersonnel = false;							
							// 	this._disableForm = false;
							// }
							this.obj_personnel.editing_status = 'EDIT';
						}else{
							console.log('search was cancelled.');
						}
				});
				break;
			case "CREATE": 	
				this._disableSearchPersonnel = true;
				this._disableCreatePersonnel = true;
				this._disableResetData = false;
				this._disableClearData = false;
				this._disableSavePersonnel = false;
				this._disableForm = false;							
				this.obj_personnel.editing_status = 'CREATE';
				this.selected_citizenship = "FIL";
				this.btnAdd_Citizenship();
				break;
			case "CLEAR": 
				this.clearData();
				break;
			case "SAVE": 
				if(this.obj_personnel.editing_status == 'CREATE'){
					this.validateHeader('INSERT');
				}else if(this.obj_personnel.editing_status == 'EDIT'){
					this.validateHeader('UPDATE');
				}
				break;
		}
	}

	validateHeader(passed_status){

		this.obj_personnel.HEADER.birth_dt = $("#birthDate").val();
		// console.log(this.obj_personnel.HEADER.tin);
		var strValidation="";
		if(this.obj_personnel.HEADER.country_cd == undefined || this.obj_personnel.HEADER.country_cd == null || this.obj_personnel.HEADER.country_cd.length==0){
			strValidation+="No Country specified.<br/>";
		}

		if(this.obj_personnel.HEADER.tin == undefined || this.obj_personnel.HEADER.tin == null || this.obj_personnel.HEADER.tin.length===0){  			
			strValidation+="No TIN specified.<br/>";
		}else{
			var TinRegex = /^(?:\d{3}-\d{3}-\d{3}-\d{3})$/;
			var TinRegex2 = /^(?:\d{12})$/;
			if(!TinRegex.test(this.obj_personnel.HEADER.tin) && !TinRegex2.test(this.obj_personnel.HEADER.tin))
			{
				strValidation+="TIN is invalid.<br/>";
			}else if(TinRegex2.test(this.obj_personnel.HEADER.tin))
			{
				var set_1 = this.obj_personnel.HEADER.tin.substring(0,3);
				var set_2 = this.obj_personnel.HEADER.tin.substring(3,6);
				var set_3 = this.obj_personnel.HEADER.tin.substring(6,9);
				var set_4 = this.obj_personnel.HEADER.tin.substring(9,12);
				this.obj_personnel.HEADER.tin = set_1+'-'+set_2+'-'+set_3+'-'+set_4;
			}
		}

		if(this.obj_personnel.HEADER.last_name == undefined || this.obj_personnel.HEADER.last_name==null || this.obj_personnel.HEADER.last_name.length == 0){
			strValidation+="No Last Name specified.<br/>";
		}

		if(this.obj_personnel.HEADER.given_name == undefined || this.obj_personnel.HEADER.given_name==null || this.obj_personnel.HEADER.given_name.length==0){
			strValidation+="No First Name specified.<br/>";
		}

		if(this.obj_personnel.HEADER.middle_name == undefined || this.obj_personnel.HEADER.middle_name==null || this.obj_personnel.HEADER.middle_name.length==0){
			strValidation+="No Middle Name specified.<br/>";
		}

		if(this.selectedGender.length==0){
			//if(this.obj_personnel.HEADER.gender == undefined || this.obj_personnel.HEADER.gender == null || this.obj_personnel.HEADER.gender.length==0){
			strValidation+="No Gender specified.<br/>";
		}

		if(this.obj_personnel.HEADER.birth_dt != undefined && this.obj_personnel.HEADER.birth_dt != null && this.obj_personnel.HEADER.birth_dt.trim().length > 0){
			if(!moment(this.obj_personnel.HEADER.birth_dt).isValid()){
				strValidation+="Invalid date of birth.<br/>";
			}else{
				var bdt = new Date(this.obj_personnel.HEADER.birth_dt);
				var today = new Date();
				if(today<bdt){
					strValidation+="Date of birth cannot be greater than today.<br/>";
				}
			}
		}else{
			strValidation += "No birth date specified.<br/>";
		}

		// if(this.obj_personnel.HEADER.religion_cd == undefined || this.obj_personnel.HEADER.religion_cd==null || this.obj_personnel.HEADER.religion_cd.length == 0){
		// 	strValidation += "No religion specified.<br/>";
		// }

		if(this.obj_personnel.HEADER.status_cd == "SUSPEND"){

			var sus_start = null;
			var sus_end = null;
			this.obj_personnel.HEADER.suspension_start = $("#suspensionFrom").val();
			this.obj_personnel.HEADER.suspension_end = $("#suspensionTo").val();
			if(this.obj_personnel.HEADER.suspension_start != undefined && this.obj_personnel.HEADER.suspension_start != null && this.obj_personnel.HEADER.suspension_start.length>0){
				if(!moment(this.obj_personnel.HEADER.suspension_start).isValid()){
					strValidation+="Invalid suspension start date.<br/>";
				}else{
					sus_start = new Date(this.obj_personnel.HEADER.suspension_start);
				}
			}else{
				strValidation+= "No start date of suspension specified.<br/>";
			}

			if(this.obj_personnel.HEADER.suspension_end != undefined && this.obj_personnel.HEADER.suspension_end != null && this.obj_personnel.HEADER.suspension_end.length>0){			
				if(!moment(this.obj_personnel.HEADER.suspension_end).isValid()){
					strValidation+="Invalid suspension end date.<br/>";
				}else{
					sus_end = new Date(this.obj_personnel.HEADER.suspension_end);
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
		

		if(strValidation.length>0)
		{
			toastr.clear();
			toastr.error(strValidation, 'Personnel info');  			
			return;
		}else{
			var mother_maiden_nm = this.obj_personnel.HEADER.mother_maiden_name;
			var alias_nick = this.obj_personnel.HEADER.alias;
			var first_nm = this.obj_personnel.HEADER.given_name;
			var middle_nm = this.obj_personnel.HEADER.middle_name;
			var last_nm = this.obj_personnel.HEADER.last_name;
			if(mother_maiden_nm != null)
				this.obj_personnel.HEADER.mother_maiden_name = mother_maiden_nm.toUpperCase();
			if(alias_nick != null)
				this.obj_personnel.HEADER.alias = alias_nick.toUpperCase();
			if(first_nm != null)
				this.obj_personnel.HEADER.given_name = first_nm.toUpperCase();
			if(middle_nm != null)
				this.obj_personnel.HEADER.middle_name = middle_nm.toUpperCase();
			if(last_nm != null)
				this.obj_personnel.HEADER.last_name = last_nm.toUpperCase();
		}
		// console.log(this.obj_personnel.HEADER);

		if(passed_status.includes("INSERT")){
			var query = EntityQuery().from("GLOBAL_MSTR")
						.where("GLOBAL_ID", "==", this.obj_personnel.HEADER.tin+this.obj_personnel.HEADER.country_cd);
			EntityManager().executeQuery(query).then((s1)=>{

				if(s1.results.length>0){
					toastr.clear();
					toastr.error("Tin already exist.", "Personnel info");
				}else{
					this.saveHeader();
				}

			}, (e1)=>{
				toastr.error(e1,"Personnel info");
			});

		}
		else if(passed_status.includes('UPDATE')){
			this.updateHeader();
		}
	}

	saveHeader(){
		settings.isNavigating = true;
		toastr.clear();
		var varInsert=null;  		
		var bdate = null;
		var dateToday = null;
		dateToday = new moment(new Date()).add(8, 'hours');
		dateToday = new Date(dateToday);

		this.obj_personnel.HEADER.birth_dt = $("#birthDate").val();

		if(this.obj_personnel.HEADER.birth_dt != undefined && this.obj_personnel.HEADER.birth_dt != null && this.obj_personnel.HEADER.birth_dt.length > 0){
			bdate = new moment(new Date(this.obj_personnel.HEADER.birth_dt)).add(8,'hours');
			bdate = new Date(bdate);
		}


		var varInsert_2 = EntityManager().createEntity('GLOBAL_MSTR', {
			GLOBAL_ID: this.obj_personnel.HEADER.tin+this.obj_personnel.HEADER.country_cd,
			COUNTRY_CD: this.obj_personnel.HEADER.country_cd,
			TIN: this.obj_personnel.HEADER.tin,
			COUNTRY_BASE_CD: this.obj_personnel.HEADER.country_base_cd,
			LOCATION_BASE_CD: this.obj_personnel.HEADER.location_base_cd,
			STATUS_CD: this.obj_personnel.HEADER.status_cd,
			CREATED_BY: this.obj_personnel.USER.USER_ID,
			CREATED_DT: dateToday,
			ACTIVE_FL:'1',
			PARK_FL:'0',
			INDIV_FL:1
		});

		// console.log(varInsert_2);

		EntityManager().addEntity(varInsert_2);
		EntityManager().saveChanges().then((success)=>{

			varInsert = EntityManager().createEntity('GLOBAL_INDIV_MSTR', {
				GLOBAL_INDIV_ID: this.obj_personnel.HEADER.tin+this.obj_personnel.HEADER.country_cd,
				//TAX_EXEMPT_CD: '--',
				EMERGENCY_RELATION_CD:null,
				INDIV_ID:0,
				GIVEN_NAME: this.obj_personnel.HEADER.given_name,
				MIDDLE_NAME: this.obj_personnel.HEADER.middle_name,
				LAST_NAME: this.obj_personnel.HEADER.last_name,
				BIRTH_DT: bdate,
				BIRTH_PLACE: this.obj_personnel.HEADER.birth_place,
				GENDER: this.selectedGender=='Male'?'M':'F',
				CIVIL_STATUS: this.obj_personnel.HEADER.civil_status,
				MOTHER_MAIDEN_NAME: this.obj_personnel.HEADER.mother_maiden_name,
				ACR_NO: this.obj_personnel.HEADER.acr_no,	
				RELIGION_CD: this.obj_personnel.HEADER.religion_cd,
				ALIAS: this.obj_personnel.HEADER.alias,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			});

			EntityManager().addEntity(varInsert);
			EntityManager().saveChanges().then((success_2)=>{

				this.obj_personnel.HEADER.global_indiv_id = this.obj_personnel.HEADER.tin+this.obj_personnel.HEADER.country_cd;				
				this.obj_personnel.global_indiv_id = this.obj_personnel.HEADER.global_indiv_id;
				this.obj_personnel.editing_status = 'EDIT';
				toastr.success(success_2, "Record saved.");
				settings.isNavigating = false;

				var getMax = EntityQuery().from('CITIZENSHIP_TRX').orderByDesc('CITIZENSHIP_ID').take(1);

				EntityManager().executeQuery(getMax).then((successMax)=>{
					var Max = 1;
					if (successMax.results.length > 0){
						Max = successMax.results[0].CITIZENSHIP_ID;

						_.each(this.obj_personnel.HEADER.citizenship, (c)=>{
							Max+=1;

							var tempCiti = EntityManager().createEntity('CITIZENSHIP_TRX', {
								CITIZENSHIP_CD: c.value,
								GLOBAL_INDIV_ID: this.obj_personnel.HEADER.global_indiv_id,
								CITIZENSHIP_ID: Max,
								CREATED_BY: this.obj_personnel.USER.USER_ID,
								CREATED_DT: dateToday
							});

							EntityManager().addEntity(tempCiti);
						});	  	

						if(this.obj_personnel.HEADER.citizenship.length>0){
							EntityManager().saveChanges().then((success_3)=>{
									console.log(success_3);
							},(failed_3)=>{
								toastr.error(failed_3,'Error');
							});				
						}
					}

				},(failedMax)=>{
					toastr.error(failedMax, "Error in saving citizenship.");
				});

				getMax = EntityQuery().from('GRP_INDIV_MSTR').orderByDesc('GRP_INDIV_ID').take(1);

				EntityManager().executeQuery(getMax).then((successMax)=>{
					var Max = 1;
					if(successMax.results.length>0){
						Max = successMax.results[0].GRP_INDIV_ID;

						_.each(this.obj_personnel.HEADER.group, (g)=>{
							Max+=1;
							var tempGroup = EntityManager().createEntity('GRP_INDIV_MSTR', {
								GLOBAL_INDIV_ID: this.obj_personnel.HEADER.global_indiv_id,
								GLOBAL_GRP_ID: g.value,
								GRP_INDIV_ID: Max,
								STATUS_CD: 'ACTV',
								CREATED_BY: this.obj_personnel.USER.USER_ID,
								CREATED_DT: dateToday
							});
							EntityManager().addEntity(tempGroup);
						});

						if(this.obj_personnel.HEADER.group.length>0){
							EntityManager().saveChanges().then(
								(success_3)=>{
									console.log(success_3);
								},(failed_3)=>{
									toastr.error(failed_3,'Error');
								});			
						}
					}
				}, (failedMax)=>{
					toastr.error(failedMax, "Error in saving citizenship.");
				});

				if(this.obj_personnel.HEADER.status_cd == "SUSPEND"){
					var getMax = EntityQuery().from("SUSPEND_TRX").orderByDesc("SUSPEND_ID").take(1);
					EntityManager().executeQuery(getMax).then((success_suspend)=>{
					
						var maxId = 1;
						if(success_suspend.results.length>0){
							maxId = success_suspend.results[0].SUSPEND_ID + 1;
						}

						var suspend_trx = EntityManager().createEntity("SUSPEND_TRX", {
							SUSPEND_ID: maxId,
							GLOBAL_ID: this.obj_personnel.HEADER.tin+this.obj_personnel.HEADER.country_cd,
							SUSPEND_LEVEL: 1,
							START_DT: this.obj_personnel.HEADER.suspension_start,
							END_DT: this.obj_personnel.HEADER.suspension_end,
							COMPANY_ID: 0, 
							CREATED_BY: this.obj_personnel.USER.USER_ID,
							CREATED_DT: dateToday
						});
						EntityManager().addEntity(suspend_trx);
						EntityManager().saveChanges().then((suspend_saved)=>{
							toastr.success("", "Suspension details saved.");
						}, (suspend_error)=>{
							toastr.error(suspend_error, "error in saving suspension details.");
						});
					});				
				}else{
					this.obj_personnel.HEADER.suspension_start = "";
					this.obj_personnel.HEADER.suspension_end="";
					// $("#suspensionFrom").datepicker("setValue", new Date());
					// $("#suspensionTo").datepicker("setValue", new Date());
				}


			}, (failed_2)=>{
				if(varInsert != null){
					varInsert.entityAspect().setDeleted();
				}

				if(varInsert_2!=null)
				{
					varInsert_2.entityAspect.setDeleted();  
				}

				EntityManager().getEntities().forEach(function(entity) {
					var errors = entity.entityAspect.getValidationErrors();
					if (errors.length > 0)
						console.log(errors);
				});

				console.log(failed_2);
				toastr.error(failed_2,"Error occured.");
			});

		},(failed)=>{
			if(varInsert_2!=null)
			{
				varInsert_2.entityAspect.setDeleted();  
			}

			EntityManager().getEntities().forEach(function(entity) {
				var errors = entity.entityAspect.getValidationErrors();
				if (errors.length > 0)
					console.log(errors);
			});
			console.log(failed);
			toastr.error(failed,"Error occured.");
		});
	}

	updateHeader(){
		settings.isNavigating = true;
		toastr.clear();
		var dateToday = null;
		var bdate = null;
		dateToday = new moment(new Date()).add(8, 'hours');
		dateToday = new Date(dateToday);

		this.obj_personnel.HEADER.birth_dt = $("#birthDate").val();

		if(this.obj_personnel.HEADER.birth_dt != undefined && this.obj_personnel.HEADER.birth_dt != null && this.obj_personnel.HEADER.birth_dt.length > 0)
		{
			bdate = new moment(new Date(this.obj_personnel.HEADER.birth_dt)).add(8,'hours');
			bdate = new Date(bdate);
		}

		var getEntity = EntityQuery().from('GLOBAL_MSTR').where('GLOBAL_ID','==',this.obj_personnel.HEADER.global_indiv_id);
		EntityManager().executeQuery(getEntity).then((item)=>{

			if(item.results.length==0)
			{
				toastr.clear();
				toastr.error('No data for editing retrieved.', 'Error in updating record.');
				return;
			}

			item.results[0].COUNTRY_BASE_CD = this.obj_personnel.HEADER.country_base_cd;
			item.results[0].LOCATION_BASE_CD = this.obj_personnel.HEADER.location_base_cd;
			item.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			item.results[0].LAST_UPDATED_DT = dateToday;
			item.results[0].STATUS_CD = this.obj_personnel.HEADER.status_cd;

			EntityManager().saveChanges().then((success)=>{				

				var getEntity = EntityQuery().from('GLOBAL_INDIV_MSTR').where('GLOBAL_INDIV_ID','==',this.obj_personnel.HEADER.global_indiv_id);
				EntityManager().executeQuery(getEntity).then((item_2)=>{
					if(item_2.results.length==0)
					{
						toastr.clear();
						toastr.error('No data for editing retrieved.', 'Error in updating record.');
						return;
					}

					item_2.results[0].GIVEN_NAME = this.obj_personnel.HEADER.given_name.toUpperCase();
					item_2.results[0].MIDDLE_NAME = this.obj_personnel.HEADER.middle_name.toUpperCase();
					item_2.results[0].LAST_NAME = this.obj_personnel.HEADER.last_name.toUpperCase();
					item_2.results[0].BIRTH_DT = bdate;
					item_2.results[0].BIRTH_PLACE = this.obj_personnel.HEADER.birth_place;
					item_2.results[0].GENDER = this.selectedGender=='Male'?'M':'F';
					item_2.results[0].CIVIL_STATUS = this.obj_personnel.HEADER.civil_status;
					item_2.results[0].MOTHER_MAIDEN_NAME = this.obj_personnel.HEADER.mother_maiden_name;
					item_2.results[0].ACR_NO = this.obj_personnel.HEADER.acr_no;
					item_2.results[0].RELIGION_CD = this.obj_personnel.HEADER.religion_cd;
					item_2.results[0].ALIAS = this.obj_personnel.HEADER.alias;
					item_2.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
					item_2.results[0].LAST_UPDATED_DT = dateToday;

					EntityManager().saveChanges().then((success_2)=>{
						toastr.success('','Record updated.');
						settings.isNavigating = false;

						//update citizenship list						

						var getCitizenshipList = EntityQuery().from('CITIZENSHIP_TRX').where('GLOBAL_INDIV_ID', '==', this.obj_personnel.HEADER.global_indiv_id);
						EntityManager().executeQuery(getCitizenshipList).then((query)=>{

							_.each(query.results, (result)=>{
								var doesExist = this.obj_personnel.HEADER.citizenship.some((x)=>x.value == result.CITIZENSHIP_CD);

								if(!doesExist)
								{
									result.entityAspect.setDeleted();
								}
							});

							var getMax = EntityQuery().from('CITIZENSHIP_TRX').orderByDesc('CITIZENSHIP_ID').take(1);
							EntityManager().executeQuery(getMax).then((getMaxSuccess)=>{
								var Max = 1;
								var newCount=0;
								if(getMaxSuccess.results.length>0)
								{

									Max = getMaxSuccess.results[0].CITIZENSHIP_ID;

									_.each(this.obj_personnel.HEADER.citizenship, (citi)=>{
										var doesExist = query.results.some((x)=>x.CITIZENSHIP_CD == citi.value);
										if(!doesExist)
										{
											Max+=1;
											newCount++;
											var tempEnt = EntityManager().createEntity('CITIZENSHIP_TRX', {
												CITIZENSHIP_CD: citi.value,
												GLOBAL_INDIV_ID: this.obj_personnel.HEADER.global_indiv_id,
												CITIZENSHIP_ID: Max,
												CREATED_BY: this.obj_personnel.USER.USER_ID,
												CREATED_DT: dateToday
											});
											EntityManager().addEntity(tempEnt);
										}
									});

									EntityManager().saveChanges().then((success_3)=>{
										toastr.success(success_3,'Citizenship list was updated.');
									},(error)=>{
										EntityManager().getEntities().forEach(function(entity) {
											var errors = entity.entityAspect.getValidationErrors();
											if (errors.length > 0)
												console.log(errors);
										});
										console.log(error);
										toastr.error("Error Occured_3", error);
									});
								}
							});
						});
						//update citizenship list end.

						//update group list.
						var getGroup = EntityQuery().from('GRP_INDIV_MSTR').where('GLOBAL_INDIV_ID', '==', this.obj_personnel.HEADER.global_indiv_id);
						EntityManager().executeQuery(getGroup).then((queryGroup)=>{
							
							_.each(queryGroup.results, (result)=>{
								var doesExist = this.obj_personnel.HEADER.group.some((x)=>x.value == result.GLOBAL_GRP_ID);
								if(!doesExist)
								{
									result.entityAspect.setDeleted();
									//result.STATUS_CD = 'INACTV';
									//result.LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
									//result.LAST_UPDATED_DT = dateToday;
								}
							});

							var getMax = EntityQuery().from('GRP_INDIV_MSTR').orderByDesc('GRP_INDIV_ID').take(1);
							EntityManager().executeQuery(getMax).then((queryMax)=>{
								var Max=1;
								
								if(queryMax.results.length>0)
								{
									Max = queryMax.results[0].GRP_INDIV_ID;
									_.each(this.obj_personnel.HEADER.group, (g)=>{
										var doesExist = queryGroup.results.some((x)=>x.GLOBAL_GRP_ID == g.value);
										
										if(!doesExist)
										{
											Max+=1;
											var tempEnt = EntityManager().createEntity('GRP_INDIV_MSTR', {
												GLOBAL_INDIV_ID: this.obj_personnel.HEADER.global_indiv_id,
												GLOBAL_GRP_ID: g.value,
												GRP_INDIV_ID: Max,
												STATUS_CD: 'ACTV',
												CREATED_BY: this.obj_personnel.USER.USER_ID,
												CREATED_DT: dateToday
											});
											EntityManager().addEntity(tempEnt);
										}else{										
			
											var index = _.findIndex(queryGroup.results, function(o){
												return o.GLOBAL_GRP_ID == g.value;
											});
											if(index != -1 && queryGroup.results[index].STATUS_CD == 'INACTV')
											{
												queryGroup.results[index].STATUS_CD = 'ACTV';
												queryGroup.results[index].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
												queryGroup.results[index].LAST_UPDATED_DT = dateToday;
											}
										}								
									});

									EntityManager().saveChanges().then((success_710)=>{
										toastr.success(success_710,'Group list was updated.');
									},(error_712)=>{
										EntityManager().getEntities().forEach(function(entity) {
											var errors = entity.entityAspect.getValidationErrors();
											if (errors.length > 0)
												console.log(errors);
										});
										console.log(error_712);
										toastr.error("Error Occured_4", error_712);
									});	
								}
							});
						});
						//update group list end.

						//Update/Insert suspend_trx
						if(this.obj_personnel.HEADER.status_cd == "SUSPEND"){
							var suspend_start = null;							
							var suspend_end = null;
							if(moment(this.obj_personnel.HEADER.suspension_start).isValid()){
								suspend_start = new Date(moment(this.obj_personnel.HEADER.suspension_start).add(8, "hours"));
							}
							if(moment(this.obj_personnel.HEADER.suspension_end).isValid()){
								suspend_end = new Date(moment(this.obj_personnel.HEADER.suspension_end).add(8, "hours"));
							}
							

							if(this.obj_personnel.HEADER.suspend_id != undefined && this.obj_personnel.HEADER.suspend_id != null && this.obj_personnel.HEADER.suspend_id.toString().length>0){
								var getSuspend = EntityQuery().from("SUSPEND_TRX")
												.where("SUSPEND_ID", "==", this.obj_personnel.HEADER.suspend_id);
								EntityManager().executeQuery(getSuspend).then((success_getSuspend)=>{
									success_getSuspend.results[0].START_DT = suspend_start;
									success_getSuspend.results[0].END_DT = suspend_end;
									success_getSuspend.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
									success_getSuspend.results[0].LAST_UPDATED_DT = dateToday;
									EntityManager().saveChanges().then((save_success)=>{
										toastr.success("","Suspension date updated.");
									},(save_error)=>{
										toastr.error(save_error, "error in updating suspension date.");
									});
								}, (error_getSuspend)=>{
									toastr.error(error_getSuspend, "error in updating suspension date.");
								});
							}else{
								var getMax = EntityQuery().from("SUSPEND_TRX").orderByDesc("SUSPEND_ID").take(1);
								EntityManager().executeQuery(getMax).then((success_suspend)=>{
									var maxId = 1;
									if(success_suspend.results.length>0){
										maxId = success_suspend.results[0].SUSPEND_ID + 1;						
									}
									var suspend_trx = EntityManager().createEntity("SUSPEND_TRX", {
										SUSPEND_ID: maxId+"",
										GLOBAL_ID: this.obj_personnel.HEADER.tin+this.obj_personnel.HEADER.country_cd,
										SUSPEND_LEVEL: 1,
										START_DT: suspend_start,
										END_DT: suspend_end,
										COMPANY_ID: 0, 
										CREATED_BY: this.obj_personnel.USER.USER_ID,
										CREATED_DT: dateToday
									});
									EntityManager().addEntity(suspend_trx);
									EntityManager().saveChanges().then((suspend_saved)=>{
										toastr.success("", "Suspension details saved.");
									}, (suspend_error)=>{
										// console.log(suspend_error);
										toastr.error(suspend_error, "error in saving suspension details.");
									});
								});
							}
						}else{
							this.obj_personnel.HEADER.suspension_start = "";
							this.obj_personnel.HEADER.suspension_end="";
							// $("#suspensionFrom").datepicker("setValue", new Date());
							// $("#suspensionTo").datepicker("setValue", new Date());
						}


						//Update/Insert suspend_trx



					}, (error)=>{
						EntityManager().getEntities().forEach(function(entity) {
							var errors = entity.entityAspect.getValidationErrors();
							if (errors.length > 0)
								console.log(errors);
						});
						console.log(error);
						toastr.error("Error Occured_2", error);
					});
				});
			},(error)=>{
				EntityManager().getEntities().forEach(function(entity) {
					var errors = entity.entityAspect.getValidationErrors();
					if (errors.length > 0)
						console.log(errors);
				});
				console.log(error);
				toastr.error("Error Occured_1", error);
			});
		});
	}

	btnUpload(){
		toastr.clear();
		toastr.info("Image Upload under maintenance.", "");
	}

	clickTab_main(index)
	{
		if(this.obj_personnel.global_indiv_id.length===0)
			return;
		switch(index){
			case 0: 
				toastr.clear();
				toastr.info("Loading employee info...", "");
				this.loadData(this.obj_personnel.global_indiv_id);
				break;
			case 1:	//load Contact list.
				toastr.clear();
				toastr.info("Loading contact list...", "");
				this.obj_personnel.OBSERVERS.maintab_contact_clicked.forEach((delegate)=>{
					delegate(this.obj_personnel.global_indiv_id);
				});
				break;
			case 2: //load Educational Achievement.
				toastr.clear();
				toastr.info("Loading Educational Achievement...", "");
				this.obj_personnel.OBSERVERS.maintab_education_clicked.forEach((delegate)=>{
					delegate(this.obj_personnel.global_indiv_id);
				});
				break;
			case 3: //load Characteristic/Interest.
				toastr.clear();
				toastr.info("Loading Characteristic/Interest...", "");				
				break;
			case 4: //load Skills/Talent.
				toastr.clear();
				toastr.info("Loading Skills/Talent...", "");
				this.obj_personnel.OBSERVERS.maintab_skills_clicked.forEach((delegate)=>{
					delegate(this.obj_personnel.global_indiv_id);
				});
				break;
			case 5: //load Language/Dialect.
				toastr.clear();
				toastr.info("Loading Language/Dialect...", "");
				this.obj_personnel.OBSERVERS.maintab_language_clicked.forEach((delegate)=>{
					delegate(this.obj_personnel.global_indiv_id);
				});
				break;			
		}
	}

	clearData(){
		this._disableSavePersonnel = true;
		this._disableClearData = true;
		this._disableCreatePersonnel = false;
		this._disableSearchPersonnel = false;
		this.obj_personnel.global_indiv_id = "";
		this.obj_personnel.HEADER = {
			country_cd:"",
			last_name:"",
			gender:"",
			birth_place:"",
			civil_status:"",
			country_base_cd:"",
			global_indiv_id:"",
			given_name:"",
			alias:"",
			birth_dt:"",
			religion_cd:"",
			acr_no:"",
			tin:"",
			middle_name:"",
			mother_maiden_name:"",
			age:"",
			location_base_cd:"",
			status_cd:"ACTV",
			suspension_start:"",
			suspension_end:"",
			citizenship:[],
			group:[]
		};
		this.selectedGender = "";
		this.selected_citizenship = "";
		this.selected_group="";
		this._disableForm = true;
		this.obj_personnel.editing_status="";
		toastr.clear();
		this.obj_personnel.OBSERVERS.clear_ppid.forEach((delegate)=>{
			delegate();
		});
	}  

	// LoginPassed(user){
	// 	console.log(user);
	// }

	// date_mask(id, mask){
	// 	input_mask(id, mask);
	// }

	DigitOnly(event){
		return isDigit(event);
	}

	mask(id, mask){
		input_mask(id, mask);		
	}
}