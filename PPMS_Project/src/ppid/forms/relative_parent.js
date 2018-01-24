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
export class relative_parent{
	obj_personnel = null;
	alreadyLoaded = false;
	status=["Dependent", "Deceased"];
	selectedStatus = null;
	lblCreatedBy = null;
	lblUpdatedBy = null;


	constructor(obj_personnel, toastr, DialogService){
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;

		this.obj_personnel.OBSERVERS.tab_changed.push((tab_num, global_indiv_id)=>{
			if(tab_num == 1){
				if(!this.alreadyLoaded){
					this.alreadyLoaded=false; //set to false to always load this tab.
					$("#fBirthDate").datepicker();
					$("#fDeceasedDate").datepicker();
					$("#mBirthDate").datepicker();
					$("#mDeceasedDate").datepicker();
					toastr.clear();
					toastr.info("", "Loading parents data...");
					this.loadParent(global_indiv_id);
				}
			}
		});

		this.obj_personnel.OBSERVERS.relative_tab_changed.push((tab_num, global_indiv_id)=>{
			if(tab_num == 0){
				this.loadParent(global_indiv_id);				
			}
		});

		this.obj_personnel.OBSERVERS.clear_ppid.push(()=>{
			this.obj_personnel.RELATIVE.parents.father={};
			this.obj_personnel.RELATIVE.parents.mother={};
			this.lblCreatedBy = "";
			this.lblUpdatedBy = "";
		});




	}

	loadParent(global_indiv_id){

		settings.isNavigating = true;
		var tmpLog = [];
		var pred1 = breeze.Predicate.create("GLOBAL_INDIV_ID", "==", global_indiv_id);		
		var pred2 = breeze.Predicate.create("RELATIVE_CD", "==", "FATHER");
		var pred3 = breeze.Predicate.create("RELATIVE_CD", "==", "MOTHER");
		var pred4 = breeze.Predicate.create("IN_CASE_OF_EMERGENCY_FL", "!=", "1");
		var _pred1 = breeze.Predicate.or([pred2, pred3]);
		var finalPred = breeze.Predicate.and([pred1, _pred1, pred4]);		

		var query = EntityQuery().from("RELATIVE_TRX")
					.where(finalPred);
		EntityManager().executeQuery(query).then((s1)=>{
			
			this.obj_personnel.RELATIVE.parents.mother = {};
			this.obj_personnel.RELATIVE.parents.father = {};			 

			_.each(s1.results, (result)=>{
				var birthDt = moment.utc(result.BIRTH_DT).format("MM/DD/YYYY");
				if(moment(result.DECEASED_DT).isValid()){
					var deceasedDt = moment.utc(result.DECEASED_DT).format("MM/DD/YYYY");
					if(deceasedDt == "01/01/0001")
					{
						deceasedDt = "";
					}
				}
				if(result.RELATIVE_CD == "FATHER"){
					var father={
						relative_id: result.RELATIVE_ID,
						global_indiv_id: result.GLOBAL_INDIV_ID,
						given_name: result.GIVEN_NAME,
						middle_name: result.MIDDLE_NAME,
						last_name: result.LAST_NAME,
						birth_dt: birthDt,
						phone_no: result.PHONE_NO,
						occupation: result.OCCUPATION,
						employer: result.EMPLOYER,
						status: result.DEPENDENT_FL,
						dependent_fl: result.DEPENDENT_FL,
						deceased_dt: deceasedDt,
						in_case_of_emergency_fl: result.IN_CASE_OF_EMERGENCY_FL,
						relative_cd: result.RELATIVE_CD
					};

					if(father.dependent_fl == 0){
						this.obj_personnel.RELATIVE.parents.father.status = "Dependent";
						$("#fstatus_dependent").prop("checked", true);
						$("#fstatus_deceased").prop("checked", false);
					}else if(father.dependent_fl == 1){
						this.obj_personnel.RELATIVE.parents.father.status = "Deceased";
						$("#fstatus_dependent").prop("checked", false);
						$("#fstatus_deceased").prop("checked", true);
					}

					this.obj_personnel.RELATIVE.parents.father = father;
				}


				if(result.RELATIVE_CD == "MOTHER"){
					var mother={
						relative_id: result.RELATIVE_ID,
						global_indiv_id: result.GLOBAL_INDIV_ID,
						given_name: result.GIVEN_NAME,
						middle_name: result.MIDDLE_NAME,
						last_name: result.LAST_NAME,
						birth_dt: birthDt,
						phone_no: result.PHONE_NO,
						occupation: result.OCCUPATION,
						employer: result.EMPLOYER,
						status: result.DEPENDENT_FL==0?"Dependent": "Deceased",
						dependent_fl: result.DEPENDENT_FL,
						deceased_dt: deceasedDt,
						in_case_of_emergency_fl: result.IN_CASE_OF_EMERGENCY_FL,
						relative_cd: result.RELATIVE_CD
					};
					this.obj_personnel.RELATIVE.parents.mother = mother;
					// console.log(mother.dependent_fl);
					if(mother.dependent_fl == 0){
						this.obj_personnel.RELATIVE.parents.mother.status = "Dependent";
						$("#mstatus_dependent").prop("checked", true);
						$("#mstatus_deceased").prop("checked", false);
					}else if(mother.dependent_fl == 1){
						this.obj_personnel.RELATIVE.parents.mother.status = "Deceased";
						$("#mstatus_dependent").prop("checked", false);
						$("#mstatus_deceased").prop("checked", true);
					}else{
						$("#mstatus_dependent").prop("checked", false);
						$("#mstatus_deceased").prop("checked", false);
						this.obj_personnel.RELATIVE.parents.mother.status = "";
					}
				}

				this.loadParentAddress(result.RELATIVE_ID, (result.RELATIVE_CD=="MOTHER"?true:false));

				if(result.CREATED_BY != null){
					tmpLog.push({
						user: result.CREATED_BY,
						date: new Date(result.CREATED_DT)
					});
				}

				if(result.LAST_UPDATED_BY != null){
					tmpLog.push({
						user: result.LAST_UPDATED_BY,						
						date: new Date(result.LAST_UPDATED_DT)
					});
				}
			});

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

			toastr.clear();
			toastr.success("", "Relative info has been loaded...");
			settings.isNavigating = false;
		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in loading parents data.");
		});
		// var pred1 = breeze.Predicate.create("GLOBAL_INDIV_ID", "==", global_indiv_id);
		// var pred2 = breeze.Predicate.create("");
	}

	loadParentAddress(relative_id, isMother){
		// console.log(relative_id, isMother);
		settings.isNavigating = true;
		var query = EntityQuery().from("RELATIVE_ADDR_TRX")
					.where("RELATIVE_ID","==",relative_id);
		EntityManager().executeQuery(query).then((s1)=>{

			if(s1.results.length==0)
				return;

			if(isMother){
				this.obj_personnel.RELATIVE.parents.mother.unit_no = s1.results[0].UNIT_NO;
				this.obj_personnel.RELATIVE.parents.mother.house_no = s1.results[0].HOUSE_NO;
				this.obj_personnel.RELATIVE.parents.mother.block_lot = s1.results[0].BLOCK_LOT;
				this.obj_personnel.RELATIVE.parents.mother.bldg_name = s1.results[0].BLDG_NAME;
				this.obj_personnel.RELATIVE.parents.mother.street_name = s1.results[0].STREET_NAME;
				this.obj_personnel.RELATIVE.parents.mother.sub_village = s1.results[0].SUB_VILLAGE;
				this.obj_personnel.RELATIVE.parents.mother.barangay = s1.results[0].BARANGAY;
				this.obj_personnel.RELATIVE.parents.mother.district = s1.results[0].DISTRICT;
				this.obj_personnel.RELATIVE.parents.mother.city_town = s1.results[0].CITY_TOWN;
				this.obj_personnel.RELATIVE.parents.mother.state_province = s1.results[0].STATE_PROVINCE;
				this.obj_personnel.RELATIVE.parents.mother.region = s1.results[0].REGION;
				this.obj_personnel.RELATIVE.parents.mother.zipcode = s1.results[0].ZIPCODE;
				this.obj_personnel.RELATIVE.parents.mother.country_cd = s1.results[0].COUNTRY_CD;
			}else{
				this.obj_personnel.RELATIVE.parents.father.unit_no = s1.results[0].UNIT_NO;
				this.obj_personnel.RELATIVE.parents.father.house_no = s1.results[0].HOUSE_NO;
				this.obj_personnel.RELATIVE.parents.father.block_lot = s1.results[0].BLOCK_LOT;
				this.obj_personnel.RELATIVE.parents.father.bldg_name = s1.results[0].BLDG_NAME;
				this.obj_personnel.RELATIVE.parents.father.street_name = s1.results[0].STREET_NAME;
				this.obj_personnel.RELATIVE.parents.father.sub_village = s1.results[0].SUB_VILLAGE;
				this.obj_personnel.RELATIVE.parents.father.barangay = s1.results[0].BARANGAY;
				this.obj_personnel.RELATIVE.parents.father.district = s1.results[0].DISTRICT;
				this.obj_personnel.RELATIVE.parents.father.city_town = s1.results[0].CITY_TOWN;
				this.obj_personnel.RELATIVE.parents.father.state_province = s1.results[0].STATE_PROVINCE;
				this.obj_personnel.RELATIVE.parents.father.region = s1.results[0].REGION;
				this.obj_personnel.RELATIVE.parents.father.zipcode = s1.results[0].ZIPCODE;
				this.obj_personnel.RELATIVE.parents.father.country_cd = s1.results[0].COUNTRY_CD;
			}

			settings.isNavigating = false;
		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in parent's address.");
		});
	}

	OrderByDate(a, b){		
		if(a.date > b.date)
			return 1;
		if(a.date < b.date)
			return -1;
		return 0;	
	}

	checkChange(isMother, status){
		if(isMother){

			// console.log(this.obj_personnel.RELATIVE.parents.mother.status);	

			if(status=="Dependent"){
				$("#mstatus_deceased").prop("checked", false);
			}else if(status = "Deceased"){
				$("#mstatus_dependent").prop("checked", false);				
			}

			var isChecked_dependent = $('#mstatus_dependent').is(":checked");
			var isChecked_deceased = $("#mstatus_deceased").is(":checked");
			if(isChecked_dependent){
				this.obj_personnel.RELATIVE.parents.mother.status = "Dependent";		
				this.obj_personnel.RELATIVE.parents.mother.deceased_dt = "";
				$("#mDeceasedDate").val("");
			}else if(isChecked_deceased){
				this.obj_personnel.RELATIVE.parents.mother.status = "Deceased";
			}else if(isChecked_dependent == false && isChecked_deceased == false){
				this.obj_personnel.RELATIVE.parents.mother.status = "";				
				this.obj_personnel.RELATIVE.parents.mother.deceased_dt = "";
				$("#mDeceasedDate").val("");
			}

		}else{

			if(status=="Dependent"){
				$("#fstatus_deceased").prop("checked", false);
			}else if(status = "Deceased"){
				$("#fstatus_dependent").prop("checked", false);				
			}

			var isChecked_dependent = $('#fstatus_dependent').is(":checked");
			var isChecked_deceased = $("#fstatus_deceased").is(":checked");
			if(isChecked_dependent){
				this.obj_personnel.RELATIVE.parents.father.status = "Dependent";		
				this.obj_personnel.RELATIVE.parents.father.deceased_dt = "";
				$("#fDeceasedDate").val("");
			}else if(isChecked_deceased){
				this.obj_personnel.RELATIVE.parents.father.status = "Deceased";
			}else if(isChecked_dependent == false && isChecked_deceased == false){
				this.obj_personnel.RELATIVE.parents.father.status = "";				
				this.obj_personnel.RELATIVE.parents.father.deceased_dt = "";
				$("#fDeceasedDate").val("");
			}
		}
	}

	dd_provinceChanged(isMother){
		var prov = null;
		if(isMother){
			prov = this.obj_personnel.RELATIVE.parents.mother.state_province;
		}else{
			prov = this.obj_personnel.RELATIVE.parents.father.state_province;
		}
		if(prov != undefined && prov != null && prov.length!=0){
			var selectedProv = this.obj_personnel.PROVINCE.find((p)=>{
				if(p.value == prov){
					return p;
				}
			});

			if(selectedProv != null){
				if(isMother){
					this.obj_personnel.RELATIVE.parents.mother.region = selectedProv.group;
				}else{
					this.obj_personnel.RELATIVE.parents.father.region = selectedProv.group;
				}
				this.dd_regionChanged(isMother);
			}
		}
	}

	dd_regionChanged(isMother){
		var reg = null;
		if(isMother){
			reg = this.obj_personnel.RELATIVE.parents.mother.region;
		}else{
			reg = this.obj_personnel.RELATIVE.parents.father.region;
		}
		if(reg != undefined && reg!=null && reg.length!=0)
		{
			//alert(this.obj_personnel.CONTACT.modelAddress.region);
			var selectedRegion = this.obj_personnel.REGION.find((r)=>{
				if(r.value == reg)
					return r;
			});

			if(selectedRegion != null)
			{
				if(isMother){
					reg = this.obj_personnel.RELATIVE.parents.mother.country_cd = selectedRegion.group;
				}else{
					reg = this.obj_personnel.RELATIVE.parents.father.country_cd = selectedRegion.group;
				}
				// this.obj_personnel.CONTACT.modelAddress.country_cd = selectedRegion.group;
			}
		}
	}

	validate(){

		var strValidation = "";

		this.obj_personnel.RELATIVE.parents.mother.birth_dt = $("#mBirthDate").val();
		this.obj_personnel.RELATIVE.parents.mother.deceased_dt = $("#mDeceasedDate").val();
		switch(this.obj_personnel.RELATIVE.parents.mother.status){
			case "Dependent": this.obj_personnel.RELATIVE.parents.mother.dependent_fl = 0;
				break;
			case "Deceased": this.obj_personnel.RELATIVE.parents.mother.dependent_fl = 1;
				break;
			default: this.obj_personnel.RELATIVE.parents.mother.dependent_fl = null;
				break;
		}
		this.obj_personnel.RELATIVE.parents.father.birth_dt = $("#fBirthDate").val();
		this.obj_personnel.RELATIVE.parents.father.deceased_dt = $("#fDeceasedDate").val();
		switch(this.obj_personnel.RELATIVE.parents.father.status){
			case "Dependent": this.obj_personnel.RELATIVE.parents.father.dependent_fl = 0;
				break;
			case "Deceased": this.obj_personnel.RELATIVE.parents.father.dependent_fl = 1;
				break;
			default: this.obj_personnel.RELATIVE.parents.father.dependent_fl = null;
				break;
		}

		if(this.obj_personnel.RELATIVE.parents.mother.relative_id != undefined && this.obj_personnel.RELATIVE.parents.mother.relative_id.toString().length>0){

			if(this.obj_personnel.RELATIVE.parents.mother.last_name == null || this.obj_personnel.RELATIVE.parents.mother.last_name.length==0){
				strValidation+="[Mother] No Last Name specified.<br/>";
			}

			if(this.obj_personnel.RELATIVE.parents.mother.given_name == null || this.obj_personnel.RELATIVE.parents.mother.given_name.length==0){
				strValidation+="[Mother] No Given Name specified.<br/>";
			}

			if(this.obj_personnel.RELATIVE.parents.mother.birth_dt.length>0){
				if(!moment(new Date(this.obj_personnel.RELATIVE.parents.mother.birth_dt)).isValid()){
					strValidation+="Invalid birth date.<br/>";
				}else{
					var d1 = new Date(this.obj_personnel.RELATIVE.parents.mother.birth_dt);
					var d2 = new Date();
					if(d1>d2){
						strValidation+="[Mother] birth date cannot be greater than date today.<br/>";
					}
				}
			}else{
				strValidation+="[Mother] No Birth date specified. <br/>";
			}

			if(this.obj_personnel.RELATIVE.parents.mother.dependent_fl == 1){
				if(this.obj_personnel.RELATIVE.parents.mother.deceased_dt.length>0){
					if(!moment(new Date(this.obj_personnel.RELATIVE.parents.mother.deceased_dt)).isValid()){
						strValidation+="[Mother] Invalid deceased date. <br/>";
					}else{
						var d1 = new Date(this.obj_personnel.RELATIVE.parents.mother.deceased_dt);
						var d2 = new Date();
						if(d1>d2){
							strValidation += "[Mother] deceased date cannot be greater than date today.<br/>";
						}
					}
				}
				// else{
				// 	strValidation+="[Mother] No deceased date specified.<br/>";
				// }
			}

			if(this.obj_personnel.RELATIVE.parents.mother.country_cd == undefined || this.obj_personnel.RELATIVE.parents.mother.country_cd.length==0){
				strValidation+="[Mother] No country specified.<br/>";
			}

		}else{

			if(this.obj_personnel.RELATIVE.parents.mother.last_name != null && this.obj_personnel.RELATIVE.parents.mother.last_name.length>0){
				if(this.obj_personnel.RELATIVE.parents.mother.given_name == null || this.obj_personnel.RELATIVE.parents.mother.given_name.length==0){
					strValidation+="[Mother] No given name specified.<br/>";
				}
			}

			if(this.obj_personnel.RELATIVE.parents.mother.given_name != null && this.obj_personnel.RELATIVE.parents.mother.given_name.length>0){
				if(this.obj_personnel.RELATIVE.parents.mother.last_name == null || this.obj_personnel.RELATIVE.parents.mother.last_name.length==0){
					strValidation+="[Mother] No last name specified.<br/>";
				}
			}

			if(this.obj_personnel.RELATIVE.parents.mother.last_name != null && this.obj_personnel.RELATIVE.parents.mother.last_name.length>0){
				if(this.obj_personnel.RELATIVE.parents.mother.given_name != null && this.obj_personnel.RELATIVE.parents.mother.given_name.length>0){

					if(this.obj_personnel.RELATIVE.parents.mother.country_cd.length==0){
						strValidation+="[Mother] No country specified.<br/>";
					}

					if(this.obj_personnel.RELATIVE.parents.mother.dependent_fl==1){
						if(this.obj_personnel.RELATIVE.parents.mother.deceased_dt.length>0){
							if(!moment(new Date(this.obj_personnel.RELATIVE.parents.mother.deceased_dt)).isValid()){
								strValidation+="[Mother] Invalid deceased date.<br/>";
							}else{
								var d1 = new Date(this.obj_personnel.RELATIVE.parents.mother.deceased_dt);
								var d2 = new Date();
								if(d1>d2){
									strValidation += "[Mother] deceased date cannot be greater than date today.<br/>";
								}
							}
						}
						// else{
						// 	strValidation+="[Mother] No deceased date specified.<br/>";
						// }
					}else if(this.obj_personnel.RELATIVE.parents.mother.dependent_fl == -1){
						strValidation+="[Mother] No status specified.<br/>";
					}

				}
			}

		}

		if(this.obj_personnel.RELATIVE.parents.father.relative_id != undefined && this.obj_personnel.RELATIVE.parents.father.relative_id.toString().length>0){
			if(this.obj_personnel.RELATIVE.parents.father.last_name == null || this.obj_personnel.RELATIVE.parents.father.last_name.length==0){
				strValidation+="[Father] No Last Name specified.<br/>";
			}

			if(this.obj_personnel.RELATIVE.parents.father.given_name == null || this.obj_personnel.RELATIVE.parents.father.given_name.length==0){
				strValidation+="[Father] No Given Name specified.<br/>";
			}

			if(this.obj_personnel.RELATIVE.parents.father.birth_dt.length>0){
				if(!moment(new Date(this.obj_personnel.RELATIVE.parents.father.birth_dt)).isValid()){
					strValidation+="[Father] Invalid birth date.<br/>";
				}else{
					var d1 = new Date(this.obj_personnel.RELATIVE.parents.father.birth_dt);
					var d2 = new Date();
					if(d1>d2){
						strValidation+="[Father] Birth date cannot be greater than date today.<br/>";
					}
				}
			}else{
				strValidation+="[Father] No Birth date specified. <br/>";
			}

			if(this.obj_personnel.RELATIVE.parents.father.dependent_fl == 1){
				if(this.obj_personnel.RELATIVE.parents.father.deceased_dt.length>0){
					if(!moment(new Date(this.obj_personnel.RELATIVE.parents.father.deceased_dt)).isValid()){
						strValidation+="[Father] Invalid deceased date. <br/>";
					}else{
						var d1 = new Date(this.obj_personnel.RELATIVE.parents.father.deceased_dt);
						var d2 = new Date();
						if(d1>d2){
							strValidation+="[Father] Deceased date cannot be greater than date today.";
						}
					}
				}
				// else{
				// 	strValidation+="[Father] No deceased date specified.<br/>";
				// }
			}

			if(this.obj_personnel.RELATIVE.parents.father.country_cd.length==0){
				strValidation+="[Father] No country specified.<br/>";
			}
		}else{

			if(this.obj_personnel.RELATIVE.parents.father.last_name != null && this.obj_personnel.RELATIVE.parents.father.last_name.length>0){
				if(this.obj_personnel.RELATIVE.parents.father.given_name == null || this.obj_personnel.RELATIVE.parents.father.given_name.length==0){
					strValidation+="[Father] No given name specified.<br/>";
				}
			}

			if(this.obj_personnel.RELATIVE.parents.father.given_name != null && this.obj_personnel.RELATIVE.parents.father.given_name.length>0){
				if(this.obj_personnel.RELATIVE.parents.father.last_name == null || this.obj_personnel.RELATIVE.parents.father.last_name.length==0){
					strValidation+="[Father] No last name specified.<br/>";
				}
			}

			if(this.obj_personnel.RELATIVE.parents.father.last_name != null && this.obj_personnel.RELATIVE.parents.father.last_name.length>0){
				if(this.obj_personnel.RELATIVE.parents.father.given_name != null && this.obj_personnel.RELATIVE.parents.father.given_name.length>0){

					if(this.obj_personnel.RELATIVE.parents.father.country_cd.length==0){
						strValidation+="[Father] No country specified.<br/>";
					}

					if(this.obj_personnel.RELATIVE.parents.father.dependent_fl==1){
						if(this.obj_personnel.RELATIVE.parents.father.deceased_dt.length>0){
							if(!moment(new Date(this.obj_personnel.RELATIVE.parents.father.deceased_dt)).isValid()){
								strValidation+="[Father] Invalid deceased date.<br/>";
							}else{
								var d1 = new Date(this.obj_personnel.RELATIVE.parents.father.deceased_dt);
								var d2 = new Date();
								if(d1>d2){
									strValidation+="[Father] Deceased date cannot be greater than date today.<br/>";
								}
							}
						}
						// else{
						// 	strValidation+="[Father] No deceased date specified.<br/>";
						// }
					}else if(this.obj_personnel.RELATIVE.parents.father.dependent_fl == -1){
						strValidation+="[Father] No status specified.<br/>";
					}

				}
			}

		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{

			if(this.obj_personnel.RELATIVE.parents.mother.relative_id > 0){
				this.updateRelative(this.obj_personnel.RELATIVE.parents.mother.relative_id, true);
			}else if(this.obj_personnel.RELATIVE.parents.mother.last_name != null && this.obj_personnel.RELATIVE.parents.mother.last_name.length>0){
				if(this.obj_personnel.RELATIVE.parents.mother.given_name != null && this.obj_personnel.RELATIVE.parents.mother.given_name.length>0){

					// this.obj_personnel.RELATIVE.parents.mother.last_name = this.obj_personnel.RELATIVE.parents.mother.last_name.toUpperCase();
					// this.obj_personnel.RELATIVE.parents.mother.given_name = this.obj_personnel.RELATIVE.parents.mother.given_name.toUpperCase();
					// this.obj_personnel.RELATIVE.parents.mother.middle_name = this.obj_personnel.RELATIVE.parents.mother.middle_name.toUpperCase();
					this.saveRelative(this.obj_personnel.global_indiv_id, true);
				}
			}

			if(this.obj_personnel.RELATIVE.parents.father.relative_id > 0){
				this.updateRelative(this.obj_personnel.RELATIVE.parents.father.relative_id, false);
			}else if(this.obj_personnel.RELATIVE.parents.father.last_name != null && this.obj_personnel.RELATIVE.parents.father.last_name.length>0){
				if(this.obj_personnel.RELATIVE.parents.father.given_name != null && this.obj_personnel.RELATIVE.parents.father.given_name.length>0){
					this.saveRelative(this.obj_personnel.global_indiv_id, false);
				}
			}

		}
	}

	convertToGMT8(date){
		if(date==undefined || date == null || date.length==0)
			return null;
		var tempDt = moment(date).add(8, 'hours');
		return new Date(tempDt);
	}

	saveRelative(global_indiv_id, isMother){

		settings.isNavigating = true;
		var dateToday = null;
		dateToday = moment(new Date()).add(8, "hours");
		dateToday = new Date(dateToday);

		var query = EntityQuery().from("RELATIVE_TRX")
					.orderByDesc("RELATIVE_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{
			var MaxId = 1;
			if(s1.results.length>0){
				MaxId = s1.results[0].RELATIVE_ID+1;
			}

			var entity = null;
			if(isMother){
				var birthdate = this.convertToGMT8(this.obj_personnel.RELATIVE.parents.mother.birth_dt);
				var deceased_dt = this.obj_personnel.RELATIVE.parents.mother.deceased_dt;
				var mother = {
					RELATIVE_ID: MaxId,
					GLOBAL_INDIV_ID: global_indiv_id,
					LAST_NAME: this.obj_personnel.RELATIVE.parents.mother.last_name,
					GIVEN_NAME: this.obj_personnel.RELATIVE.parents.mother.given_name,
					MIDDLE_NAME: this.obj_personnel.RELATIVE.parents.mother.middle_name,
					BIRTH_DT: birthdate,
					PHONE_NO: this.obj_personnel.RELATIVE.parents.mother.phone_no,
					OCCUPATION: this.obj_personnel.RELATIVE.parents.mother.occupation,
					EMPLOYER: this.obj_personnel.RELATIVE.parents.mother.employer,
					DEPENDENT_FL: this.obj_personnel.RELATIVE.parents.mother.dependent_fl,
					DECEASED_DT: deceased_dt,
					IN_CASE_OF_EMERGENCY_FL: 0,
					RELATIVE_CD: "MOTHER",
					CREATED_BY: this.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};
				entity = EntityManager().createEntity("RELATIVE_TRX", mother);
			}else{
				var birthdate = this.convertToGMT8(this.obj_personnel.RELATIVE.parents.father.birth_dt);
				var deceased_dt = this.convertToGMT8(this.obj_personnel.RELATIVE.parents.father.deceased_dt);
				var father = {
					RELATIVE_ID: MaxId,
					GLOBAL_INDIV_ID: global_indiv_id,
					LAST_NAME: this.obj_personnel.RELATIVE.parents.father.last_name,
					GIVEN_NAME: this.obj_personnel.RELATIVE.parents.father.given_name,
					MIDDLE_NAME: this.obj_personnel.RELATIVE.parents.father.middle_name,
					BIRTH_DT: birthdate,
					PHONE_NO: this.obj_personnel.RELATIVE.parents.father.phone_no,
					OCCUPATION: this.obj_personnel.RELATIVE.parents.father.occupation,
					EMPLOYER: this.obj_personnel.RELATIVE.parents.father.employer,
					DEPENDENT_FL: this.obj_personnel.RELATIVE.parents.father.dependent_fl,
					DECEASED_DT: deceased_dt,
					IN_CASE_OF_EMERGENCY_FL: 0,
					RELATIVE_CD: "FATHER",
					CREATED_BY: this.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};
				entity = EntityManager().createEntity("RELATIVE_TRX", father);
			}

			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{
				query = EntityQuery().from("RELATIVE_ADDR_TRX")
						.orderByDesc("RELATIVE_ADDR_ID").take(1);
				EntityManager().executeQuery(query).then((s3)=>{
					var MaxAddrId = 1;
					if(s3.results.length>0)
					{
						MaxAddrId = s3.results[0].RELATIVE_ADDR_ID+1;
					}

					var entity2 = null;
					if(isMother){
						var addr_trx = {
							RELATIVE_ID: MaxId,
							RELATIVE_ADDR_ID: MaxAddrId,
							COUNTRY_CD: this.obj_personnel.RELATIVE.parents.mother.country_cd,
							REGION: this.obj_personnel.RELATIVE.parents.mother.region,
							STATE_PROVINCE: this.obj_personnel.RELATIVE.parents.mother.state_province,
							CITY_TOWN: this.obj_personnel.RELATIVE.parents.mother.city_town,
							DISTRICT: this.obj_personnel.RELATIVE.parents.mother.district,
							BARANGAY: this.obj_personnel.RELATIVE.parents.mother.barangay,
							SUB_VILLAGE: this.obj_personnel.RELATIVE.parents.mother.sub_village,
							PHASE: this.obj_personnel.RELATIVE.parents.mother.phase,
							BLOCK_LOT: this.obj_personnel.RELATIVE.parents.mother.block_lot,
							STREET_NAME: this.obj_personnel.RELATIVE.parents.mother.street_name,
							HOUSE_NO: this.obj_personnel.RELATIVE.parents.mother.house_no,
							BLDG_NAME: this.obj_personnel.RELATIVE.parents.mother.bldg_name,
							UNIT_NO: this.obj_personnel.RELATIVE.parents.mother.unit_no,
							ZIPCODE: this.obj_personnel.RELATIVE.parents.mother.zipcode,
							// RESIDENTIAL_TYPE: this.obj_personnel.RELATIVE.parents.mother.residential_type,
							// HOUSE_OWNERSHIP: this.obj_personnel.RELATIVE.parents.mother.house_ownership,
							PERMANENT_FL: 0,
							MAILING_FL: 0,
							PRESENT_FL: 0,
							CREATED_BY: this.obj_personnel.USER.USER_ID,
							CREATED_DT: dateToday
						};
						entity2 = EntityManager().createEntity("RELATIVE_ADDR_TRX", addr_trx);
					}else{
						var addr_trx = {
							RELATIVE_ID: MaxId,
							RELATIVE_ADDR_ID: MaxAddrId,
							COUNTRY_CD: this.obj_personnel.RELATIVE.parents.father.country_cd,
							REGION: this.obj_personnel.RELATIVE.parents.father.region,
							STATE_PROVINCE: this.obj_personnel.RELATIVE.parents.father.state_province,
							CITY_TOWN: this.obj_personnel.RELATIVE.parents.father.city_town,
							DISTRICT: this.obj_personnel.RELATIVE.parents.father.district,
							BARANGAY: this.obj_personnel.RELATIVE.parents.father.barangay,
							SUB_VILLAGE: this.obj_personnel.RELATIVE.parents.father.sub_village,
							PHASE: this.obj_personnel.RELATIVE.parents.father.phase,
							BLOCK_LOT: this.obj_personnel.RELATIVE.parents.father.block_lot,
							STREET_NAME: this.obj_personnel.RELATIVE.parents.father.street_name,
							HOUSE_NO: this.obj_personnel.RELATIVE.parents.father.house_no,
							BLDG_NAME: this.obj_personnel.RELATIVE.parents.father.bldg_name,
							UNIT_NO: this.obj_personnel.RELATIVE.parents.father.unit_no,
							ZIPCODE: this.obj_personnel.RELATIVE.parents.father.zipcode,
							// RESIDENTIAL_TYPE: this.obj_personnel.RELATIVE.parents.father.residential_type,
							// HOUSE_OWNERSHIP: this.obj_personnel.RELATIVE.parents.father.house_ownership,
							PERMANENT_FL: 0,
							MAILING_FL: 0,
							PRESENT_FL: 0,
							CREATED_BY: this.obj_personnel.USER.USER_ID,
							CREATED_DT: dateToday
						};
						entity2 = EntityManager().createEntity("RELATIVE_ADDR_TRX", addr_trx);
					}

					EntityManager().addEntity(entity2);
					EntityManager().saveChanges().then((s4)=>{
						toastr.clear();
						toastr.success("", "Record saved.");
						this.loadParent(global_indiv_id);
					}, (e4)=>{
						if(entity2 != null){
							entity2.entityAspect.setDeleted();
						}
						settings.isNavigating = false;
						toastr.error(e4, "Error in saving relative address.");
					});

				}, (e3)=>{
					settings.isNavigating = false;
					toastr.error(e3, "Error in querying relative address id.");
				});

			}, (e2)=>{
				if(entity != null)
				{
					entity.entityAspect.setDeleted();
				}
				settings.isNavigating = false;
				toastr.error(e2, "Error in saving relative info.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in querying relative id.");
		});
	}


	updateRelative(relative_id, isMother){
		
		var dateToday = null;
		dateToday = new Date(moment(new Date()).add(8, "hours"));

		settings.isNavigating = true;
		var query = EntityQuery().from("RELATIVE_TRX")
					.where("RELATIVE_ID", "==", relative_id);
		EntityManager().executeQuery(query).then((s1)=>{

			if(isMother){
				s1.results[0].LAST_NAME = this.obj_personnel.RELATIVE.parents.mother.last_name;
				s1.results[0].GIVEN_NAME = this.obj_personnel.RELATIVE.parents.mother.given_name;
				s1.results[0].MIDDLE_NAME = this.obj_personnel.RELATIVE.parents.mother.middle_name;
				s1.results[0].BIRTH_DT = this.convertToGMT8(this.obj_personnel.RELATIVE.parents.mother.birth_dt);
				s1.results[0].PHONE_NO = this.obj_personnel.RELATIVE.parents.mother.phone_no;
				s1.results[0].OCCUPATION = this.obj_personnel.RELATIVE.parents.mother.occupation;
				s1.results[0].EMPLOYER = this.obj_personnel.RELATIVE.parents.mother.employer;
				s1.results[0].DEPENDENT_FL = this.obj_personnel.RELATIVE.parents.mother.dependent_fl;
				if(this.obj_personnel.RELATIVE.parents.mother.dependent_fl == 1){
					s1.results[0].DECEASED_DT = this.convertToGMT8(this.obj_personnel.RELATIVE.parents.mother.deceased_dt);
				}else{
					s1.results[0].DECEASED_DT = null;					
				}
				s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
				s1.results[0].LAST_UPDATED_DT = dateToday;
			}else{
				s1.results[0].LAST_NAME = this.obj_personnel.RELATIVE.parents.father.last_name;
				s1.results[0].GIVEN_NAME = this.obj_personnel.RELATIVE.parents.father.given_name;
				s1.results[0].MIDDLE_NAME = this.obj_personnel.RELATIVE.parents.father.middle_name;
				s1.results[0].BIRTH_DT = this.convertToGMT8(this.obj_personnel.RELATIVE.parents.father.birth_dt);
				s1.results[0].PHONE_NO = this.obj_personnel.RELATIVE.parents.father.phone_no;
				s1.results[0].OCCUPATION = this.obj_personnel.RELATIVE.parents.father.occupation;
				s1.results[0].EMPLOYER = this.obj_personnel.RELATIVE.parents.father.employer;
				s1.results[0].DEPENDENT_FL = this.obj_personnel.RELATIVE.parents.father.dependent_fl;
				if(this.obj_personnel.RELATIVE.parents.father.dependent_fl == 1){
					s1.results[0].DECEASED_DT = this.convertToGMT8(this.obj_personnel.RELATIVE.parents.father.deceased_dt);
				}else{
					s1.results[0].DECEASED_DT = null;					
				}
				s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
				s1.results[0].LAST_UPDATED_DT = dateToday;
			}

			EntityManager().saveChanges().then((s3)=>{
				settings.isNavigating = false;
				toastr.success("", "Record saved.");
			}, (e3)=>{
				settings.isNavigating = false;
				toastr.error(e3, "Error in updating personnel info.");
			});


		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in querying mother's info.");
		});

		var query2 = EntityQuery().from("RELATIVE_ADDR_TRX")
					 .where("RELATIVE_ID", "==", relative_id);
		EntityManager().executeQuery(query2).then((s2)=>{

			if(isMother){
				s2.results[0].COUNTRY_CD = this.obj_personnel.RELATIVE.parents.mother.country_cd;
				s2.results[0].REGION = this.obj_personnel.RELATIVE.parents.mother.region;
				s2.results[0].STATE_PROVINCE = this.obj_personnel.RELATIVE.parents.mother.state_province;
				s2.results[0].CITY_TOWN = this.obj_personnel.RELATIVE.parents.mother.city_town;
				s2.results[0].DISTRICT = this.obj_personnel.RELATIVE.parents.mother.district;
				s2.results[0].BARANGAY = this.obj_personnel.RELATIVE.parents.mother.barangay;
				s2.results[0].SUB_VILLAGE = this.obj_personnel.RELATIVE.parents.mother.sub_village;
				s2.results[0].PHASE = this.obj_personnel.RELATIVE.parents.mother.phase;
				s2.results[0].BLOCK_LOT = this.obj_personnel.RELATIVE.parents.mother.block_lot;
				s2.results[0].STREET_NAME = this.obj_personnel.RELATIVE.parents.mother.street_name;
				s2.results[0].HOUSE_NO = this.obj_personnel.RELATIVE.parents.mother.house_no;
				s2.results[0].BLDG_NAME = this.obj_personnel.RELATIVE.parents.mother.bldg_name;
				s2.results[0].UNIT_NO = this.obj_personnel.RELATIVE.parents.mother.unit_no;
				s2.results[0].ZIPCODE = this.obj_personnel.RELATIVE.parents.mother.zipcode;
				s2.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
				s2.results[0].LAST_UPDATED_DT = dateToday;
			}else{
				s2.results[0].COUNTRY_CD = this.obj_personnel.RELATIVE.parents.father.country_cd;
				s2.results[0].REGION = this.obj_personnel.RELATIVE.parents.father.region;
				s2.results[0].STATE_PROVINCE = this.obj_personnel.RELATIVE.parents.father.state_province;
				s2.results[0].CITY_TOWN = this.obj_personnel.RELATIVE.parents.father.city_town;
				s2.results[0].DISTRICT = this.obj_personnel.RELATIVE.parents.father.district;
				s2.results[0].BARANGAY = this.obj_personnel.RELATIVE.parents.father.barangay;
				s2.results[0].SUB_VILLAGE = this.obj_personnel.RELATIVE.parents.father.sub_village;
				s2.results[0].PHASE = this.obj_personnel.RELATIVE.parents.father.phase;
				s2.results[0].BLOCK_LOT = this.obj_personnel.RELATIVE.parents.father.block_lot;
				s2.results[0].STREET_NAME = this.obj_personnel.RELATIVE.parents.father.street_name;
				s2.results[0].HOUSE_NO = this.obj_personnel.RELATIVE.parents.father.house_no;
				s2.results[0].BLDG_NAME = this.obj_personnel.RELATIVE.parents.father.bldg_name;
				s2.results[0].UNIT_NO = this.obj_personnel.RELATIVE.parents.father.unit_no;
				s2.results[0].ZIPCODE = this.obj_personnel.RELATIVE.parents.father.zipcode;
				s2.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
				s2.results[0].LAST_UPDATED_DT = dateToday;
			}

			EntityManager().saveChanges().then((s4)=>{
				settings.isNavigating = false;
				// toastr.success("", "ParentAddress");
			}, (e4)=>{
				settings.isNavigating = false;
				toastr.error(e4, "Error in updating personnel address.");
			});

		}, (e2)=>{
			settings.isNavigating = false;
			toastr.error(e2, "Error in querying Mother's info.");
		})
	}

}