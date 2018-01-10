import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from 'entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import settings from 'settings';

@inject(obj_personnel, toastr, DialogService)
export class relative_spouse {

	obj_personnel=null;
	lblCreatedBy=null;
	lblUpdatedBy=null;
	_disableDeceasedDt=true;
	constructor(obj_personnel, toastr, DialogService){
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;

		this.obj_personnel.OBSERVERS.relative_tab_changed.push((tab_num, global_indiv_id)=>{			
			if(tab_num == 2){
				$("#spouse_birth_dt").datepicker();
				$("#spouse_deceased_dt").datepicker();
				this.loadSpouse(global_indiv_id);
			}
		});

		this.obj_personnel.OBSERVERS.clear_ppid.push(()=>{
			this.obj_personnel.RELATIVE.spouse = {};
		});
	}

	loadSpouse(global_indiv_id){

		settings.isNavigating = true;
		var pred1 = breeze.Predicate.create("GLOBAL_INDIV_ID", "==", global_indiv_id);
		var pred2 = breeze.Predicate.create("RELATIVE_CD", "==", "SPOUSE");
		var pred3 = breeze.Predicate.create("IN_CASE_OF_EMERGENCY_FL", "!=", "1");
		var finalPred = breeze.Predicate.and([pred1, pred2, pred3]);
		var query = EntityQuery().from("RELATIVE_TRX")
					.where(finalPred);
		EntityManager().executeQuery(query).then((s1)=>{

			if(s1.results.length>0){
				var birth_dt = moment.utc(s1.results[0].BIRTH_DT).format("MM/DD/YYYY");
				var deceased_dt = null;
				if(moment(s1.results[0].DECEASED_DT).isValid()){
					deceased_dt = moment.utc(s1.results[0].DECEASED_DT).format("MM/DD/YYYY");
				}
				this.obj_personnel.RELATIVE.spouse.relative_id = s1.results[0].RELATIVE_ID;
				this.obj_personnel.RELATIVE.spouse.last_name = s1.results[0].LAST_NAME;
				this.obj_personnel.RELATIVE.spouse.given_name = s1.results[0].GIVEN_NAME;
				this.obj_personnel.RELATIVE.spouse.middle_name = s1.results[0].MIDDLE_NAME;
				this.obj_personnel.RELATIVE.spouse.birth_dt = birth_dt;
				this.obj_personnel.RELATIVE.spouse.occupation = s1.results[0].OCCUPATION;
				this.obj_personnel.RELATIVE.spouse.employer = s1.results[0].EMPLOYER;
				this.obj_personnel.RELATIVE.spouse.unit_no = s1.results[0].UNIT_NO;
				this.obj_personnel.RELATIVE.spouse.house_no = s1.results[0].HOUSE_NO;
				this.obj_personnel.RELATIVE.spouse.block_lot = s1.results[0].BLOCK_LOT;
				this.obj_personnel.RELATIVE.spouse.bldg_name = s1.results[0].BLDG_NAME;
				this.obj_personnel.RELATIVE.spouse.street_name = s1.results[0].STREET_NAME;
				this.obj_personnel.RELATIVE.spouse.sub_village = s1.results[0].SUB_VILLAGE;
				this.obj_personnel.RELATIVE.spouse.barangay = s1.results[0].BARANGAY;
				this.obj_personnel.RELATIVE.spouse.district = s1.results[0].DISTRICT;
				this.obj_personnel.RELATIVE.spouse.city_town = s1.results[0].CITY_TOWN;
				this.obj_personnel.RELATIVE.spouse.state_province = s1.results[0].STATE_PROVINCE;
				this.obj_personnel.RELATIVE.spouse.region = s1.results[0].REGION;
				this.obj_personnel.RELATIVE.spouse.zipcode = s1.results[0].ZIPCODE;
				this.obj_personnel.RELATIVE.spouse.country_cd = s1.results[0].COUNTRY_CD;
				this.obj_personnel.RELATIVE.spouse.deceased_dt = deceased_dt;
				this.obj_personnel.RELATIVE.spouse.dependent_fl = s1.results[0].DEPENDENT_FL;
				this.loadSpouseAddress(s1.results[0].RELATIVE_ID);
				switch(s1.results[0].DEPENDENT_FL){
					case 0:						
						$("#status_dependent").prop("checked", true);
						$("#status_deceased").prop("checked", false);
						break;
					case 1:						
						$("#mstatus_dependent").prop("checked", false);
						$("#mstatus_deceased").prop("checked", true);
						break;
					default:					
						$("#mstatus_dependent").prop("checked", false);
						$("#mstatus_deceased").prop("checked", false);
						break;
				}

				if(s1.results[0].CREATED_BY != null){
					this.lblCreatedBy = s1.results[0].CREATED_BY+ ' ' + moment.utc(s1.results[0].CREATED_DT).format("MM/DD/YYYY hh:mm A");
				}

				if(s1.results[0].LAST_UPDATED_BY != null){
					this.lblCreatedBy = s1.results[0].LAST_UPDATED_BY+ ' ' + moment.utc(s1.results[0].LAST_UPDATED_DT).format("MM/DD/YYYY hh:mm A");
				}

			}else{
				this.obj_personnel.RELATIVE.spouse = {};
				this.lblCreatedBy="";
				this.lblUpdatedBy="";
			}

			settings.isNavigating = false;
			toastr.clear();
			toastr.success("", "Spouse's info has been loaded.");
		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in querying spouse info.");
		});

	}

	loadSpouseAddress(relative_id){
		// console.log(relative_id);
		var query = EntityQuery().from("RELATIVE_ADDR_TRX")
					.where("RELATIVE_ID","==", relative_id);
		EntityManager().executeQuery(query).then((s1)=>{

			if(s1.results.length>0){
				this.obj_personnel.RELATIVE.spouse.relative_addr_id = s1.results[0].RELATIVE_ADDR_ID;
				this.obj_personnel.RELATIVE.spouse.country_cd = s1.results[0].COUNTRY_CD;
				this.obj_personnel.RELATIVE.spouse.region = s1.results[0].REGION;
				this.obj_personnel.RELATIVE.spouse.state_province = s1.results[0].STATE_PROVINCE;
				this.obj_personnel.RELATIVE.spouse.city_town = s1.results[0].CITY_TOWN;
				this.obj_personnel.RELATIVE.spouse.district = s1.results[0].DISTRICT;
				this.obj_personnel.RELATIVE.spouse.barangay = s1.results[0].BARANGAY;
				this.obj_personnel.RELATIVE.spouse.sub_village = s1.results[0].SUB_VILLAGE;
				this.obj_personnel.RELATIVE.spouse.block_lot = s1.results[0].BLOCK_LOT;
				this.obj_personnel.RELATIVE.spouse.street_name = s1.results[0].STREET_NAME;
				this.obj_personnel.RELATIVE.spouse.house_no = s1.results[0].HOUSE_NO;
				this.obj_personnel.RELATIVE.spouse.bldg_name = s1.results[0].BLDG_NAME;
				this.obj_personnel.RELATIVE.spouse.unit_no = s1.results[0].UNIT_NO;
				this.obj_personnel.RELATIVE.spouse.zipcode = s1.results[0].ZIPCODE;
			}

		}, (e1)=>{
			toastr.error(e1, "Error in querying spouse's address");
		});
	}

	checkChange(bit){
 
		switch(bit){
			case 0:
				$("#spouse_deceased").prop("checked", false);
				break;
			case 1:
				$("#spouse_dependent").prop("checked", false);
				break;
		}

		var isChecked_dependent = $('#spouse_dependent').is(":checked");
		var isChecked_deceased = $("#spouse_deceased").is(":checked");
		if(isChecked_dependent){
			this.obj_personnel.RELATIVE.spouse.dependent_fl = 0;
			this.obj_personnel.RELATIVE.spouse.deceased_dt = null;
			$("#spouse_deceased_dt").val("");
			this._disableDeceasedDt = true;
		}else if(isChecked_deceased){
			this.obj_personnel.RELATIVE.spouse.dependent_fl = 1;
			this._disableDeceasedDt = false;
		}else if(isChecked_dependent == false && isChecked_deceased == false){
			this._disableDeceasedDt = true;
			this.obj_personnel.RELATIVE.spouse.dependent_fl = null;				
			this.obj_personnel.RELATIVE.spouse.deceased_dt = null;
			$("#spouse_deceased_dt").val("");
		}
	}

	dd_provinceChanged(){		
		var prov = this.obj_personnel.RELATIVE.spouse.state_province;
		if(prov != undefined && prov != null && prov.length!=0){
			var selectedProv = this.obj_personnel.PROVINCE.find((p)=>{
				if(p.value == prov){
					return p;
				}
			});

			if(selectedProv != null){
				this.obj_personnel.RELATIVE.spouse.region = selectedProv.group;
				this.dd_regionChanged();
			}
		}
	}

	dd_regionChanged(){
		var reg = this.obj_personnel.RELATIVE.spouse.region;
		if(reg != undefined && reg!=null && reg.length!=0)
		{
			//alert(this.obj_personnel.CONTACT.modelAddress.region);
			var selectedRegion = this.obj_personnel.REGION.find((r)=>{
				if(r.value == reg)
					return r;
			});

			if(selectedRegion != null)
			{
				reg = this.obj_personnel.RELATIVE.spouse.country_cd = selectedRegion.group;
			}
		}
	}

	validate(){
		var strValidation = "";

		this.obj_personnel.RELATIVE.spouse.birth_dt = $("#spouse_birth_dt").val();
		this.obj_personnel.RELATIVE.spouse.deceased_dt = $("#spouse_deceased_dt").val();

		if(this.obj_personnel.RELATIVE.spouse.last_name == undefined || this.obj_personnel.RELATIVE.spouse.last_name == null || this.obj_personnel.RELATIVE.spouse.last_name.length==0){
			strValidation+="No last name specified.<br/>";
		}

		if(this.obj_personnel.RELATIVE.spouse.given_name == undefined || this.obj_personnel.RELATIVE.spouse.given_name == null || this.obj_personnel.RELATIVE.spouse.given_name.length==0){
			strValidation+="No given name specified.<br/>";
		}

		if(this.obj_personnel.RELATIVE.spouse.birth_dt.length>0){
			if(!moment(new Date(this.obj_personnel.RELATIVE.spouse.birth_dt)).isValid()){
				strValidation+="Invalid birth date.<br/>";
			}else{
				var d1 = new Date(this.obj_personnel.RELATIVE.spouse.birth_dt);
				var d2 = new Date();
				if(d1 > d2){
					strValidation+="Birth date cannot be greater than date today.<br/>";
				}
			}
		}else{
			strValidation+="No Birth date specified. <br/>";
		}

		if(this.obj_personnel.RELATIVE.spouse.dependent_fl == 1){
			if(this.obj_personnel.RELATIVE.spouse.deceased_dt.length>0){
				if(!moment(new Date(this.obj_personnel.RELATIVE.spouse.deceased_dt)).isValid()){
					strValidation+="Invalid deceased date. <br/>";
				}else{
					var d1 = new Date(this.obj_personnel.RELATIVE.spouse.deceased_dt);
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

		if(this.obj_personnel.RELATIVE.spouse.country_cd == undefined || this.obj_personnel.RELATIVE.spouse.country_cd.length==0){
			strValidation+="No country specified.<br/>";
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.obj_personnel.RELATIVE.spouse.relative_id == undefined || this.obj_personnel.RELATIVE.spouse.relative_id == null || this.obj_personnel.RELATIVE.spouse.relative_id==0){
				this.save(this.obj_personnel.global_indiv_id);
			}else if(this.obj_personnel.RELATIVE.spouse.relative_id>0){
				this.update(this.obj_personnel.RELATIVE.spouse.relative_id);
			}
		}
	}

	save(global_indiv_id){

		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var birth_dt = null;
		var deceased_dt = null;
		if(moment(this.obj_personnel.RELATIVE.spouse.birth_dt).isValid()){
			birth_dt = new Date(moment(this.obj_personnel.RELATIVE.spouse.birth_dt).add(8, "hours"));
		}

		if(moment(this.obj_personnel.RELATIVE.spouse.deceased_dt).isValid()){
			deceased_dt = new Date(moment(this.obj_personnel.RELATIVE.spouse.deceased_dt).add(8, "hours"));
		}

		var query = EntityQuery().from("RELATIVE_TRX")
					.orderByDesc("RELATIVE_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{
			var maxId = 1;
			// console.log(s1.results);
			if(s1.results.length>0){
				maxId = s1.results[0].RELATIVE_ID+1;
			}

			var spouse = {
				RELATIVE_ID: maxId,
				GLOBAL_INDIV_ID: global_indiv_id,
				LAST_NAME: this.obj_personnel.RELATIVE.spouse.last_name,
				GIVEN_NAME: this.obj_personnel.RELATIVE.spouse.given_name,
				MIDDLE_NAME: this.obj_personnel.RELATIVE.spouse.middle_name,
				BIRTH_DT: birth_dt,
				OCCUPATION: this.obj_personnel.RELATIVE.spouse.occupation,
				EMPLOYER: this.obj_personnel.RELATIVE.spouse.employer,
				DEPENDENT_FL: this.obj_personnel.RELATIVE.spouse.dependent_fl,
				DECEASED_DT: deceased_dt,
				RELATIVE_CD: "SPOUSE",
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("RELATIVE_TRX", spouse);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{
				this.saveAddress(maxId);
				toastr.success("","Record saved.");
			}, (e2)=>{
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				toastr.clear();
				toastr.error(e2, "Error in saving spouse's details..");
			});

		}, (e1)=>{
			toastr.clear();
			toastr.error(e1, "Error in querying relative id.");
		});
	}

	update(relative_id){
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("RELATIVE_TRX")
					.where("RELATIVE_ID", "==", relative_id);
		EntityManager().executeQuery(query).then((s1)=>{

			var birth_dt = new Date(moment(this.obj_personnel.RELATIVE.spouse.birth_dt).add(8, "hours"));
			var deceased_dt = null;
			if(moment(this.obj_personnel.RELATIVE.spouse.deceased_dt).isValid()){
				deceased_dt = new Date(moment(this.obj_personnel.RELATIVE.spouse.deceased_dt).add(8, "hours"));
			}

			s1.results[0].GIVEN_NAME = this.obj_personnel.RELATIVE.spouse.given_name;
			s1.results[0].MIDDLE_NAME = this.obj_personnel.RELATIVE.spouse.middle_name;
			s1.results[0].LAST_NAME = this.obj_personnel.RELATIVE.spouse.last_name;
			s1.results[0].BIRTH_DT = birth_dt;
			s1.results[0].OCCUPATION = this.obj_personnel.RELATIVE.spouse.occupation;
			s1.results[0].EMPLOYER = this.obj_personnel.RELATIVE.spouse.employer;
			s1.results[0].DEPENDENT_FL = this.obj_personnel.RELATIVE.spouse.dependent_fl;
			s1.results[0].DECEASED_DT = deceased_dt;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{
				toastr.success("", "Record updated.");
				if(this.obj_personnel.RELATIVE.spouse.relative_addr_id == undefined || this.obj_personnel.RELATIVE.spouse.relative_addr_id == null || this.obj_personnel.RELATIVE.spouse.relative_addr_id.toString().length==0){
					this.saveAddress(relative_id);
				}else{
					this.updateAddress(this.obj_personnel.RELATIVE.spouse.relative_addr_id);
				}
			}, (e2)=>{
				toastr.error(e2, "Error in saving spouse's info.");
			});

		}, (e1)=>{
			toastr.error(e1, "Error in querying relative info.");
		});
	}

	saveAddress(relative_id){

		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("RELATIVE_ADDR_TRX")
					.orderByDesc("RELATIVE_ADDR_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{
			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].RELATIVE_ADDR_ID+1;
			}

			var relative_addr_trx = {
				RELATIVE_ADDR_ID: maxId,
				RELATIVE_ID: relative_id,
				COUNTRY_CD: this.obj_personnel.RELATIVE.spouse.country_cd,
				REGION: this.obj_personnel.RELATIVE.spouse.region,
				STATE_PROVINCE: this.obj_personnel.RELATIVE.spouse.state_province,
				CITY_TOWN: this.obj_personnel.RELATIVE.spouse.city_town,
				DISTRICT: this.obj_personnel.RELATIVE.spouse.district,
				BARANGAY: this.obj_personnel.RELATIVE.spouse.barangay,
				SUB_VILLAGE: this.obj_personnel.RELATIVE.spouse.sub_village, 
				BLOCK_LOT: this.obj_personnel.RELATIVE.spouse.block_lot,
				STREET_NAME: this.obj_personnel.RELATIVE.spouse.street_name,
				HOUSE_NO: this.obj_personnel.RELATIVE.spouse.house_no,
				BLDG_NAME: this.obj_personnel.RELATIVE.spouse.bldg_name,
				UNIT_NO: this.obj_personnel.RELATIVE.spouse.unit_no,
				ZIPCODE: this.obj_personnel.RELATIVE.spouse.zipcode,
				PERMANENT_FL:0,
				MAILING_FL:0,
				PRESENT_FL:0,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};		

			var entity = EntityManager().createEntity("RELATIVE_ADDR_TRX", relative_addr_trx);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{
				this.loadSpouse(this.obj_personnel.global_indiv_id);
				// toastr.success("", "Relative address has been saved.");
			}, (e2)=>{
				if(entity!= null){
					entity.entityAspect.setDeleted();
				}
				toastr.clear();
				toastr.error(e2, "Error in saving relative address.");
			});

		}, (e1)=>{
			toastr.error(e1, "Error ing querying address id.");
		});

	}

	updateAddress(relative_addr_id){
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("RELATIVE_ADDR_TRX")
					.where("RELATIVE_ADDR_ID", "==", relative_addr_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].COUNTRY_CD = this.obj_personnel.RELATIVE.spouse.country_cd;
			s1.results[0].REGION = this.obj_personnel.RELATIVE.spouse.region;
			s1.results[0].STATE_PROVINCE = this.obj_personnel.RELATIVE.spouse.state_province;
			s1.results[0].CITY_TOWN = this.obj_personnel.RELATIVE.spouse.city_town;
			s1.results[0].DISTRICT = this.obj_personnel.RELATIVE.spouse.district;
			s1.results[0].BARANGAY = this.obj_personnel.RELATIVE.spouse.barangay;
			s1.results[0].SUB_VILLAGE = this.obj_personnel.RELATIVE.spouse.sub_village;
			s1.results[0].BLOCK_LOT = this.obj_personnel.RELATIVE.spouse.block_lot;
			s1.results[0].STREET_NAME = this.obj_personnel.RELATIVE.spouse.street_name;
			s1.results[0].HOUSE_NO = this.obj_personnel.RELATIVE.spouse.house_no;
			s1.results[0].BLDG_NAME = this.obj_personnel.RELATIVE.spouse.bldg_name;
			s1.results[0].UNIT_NO = this.obj_personnel.RELATIVE.spouse.unit_no;
			s1.results[0].ZIPCODE = this.obj_personnel.RELATIVE.spouse.zipcode;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{
				this.loadSpouse(this.obj_personnel.global_indiv_id);
				// toastr.success("", "");
			}, (e2)=>{
				toastr.error(e2, "Error in saving spouse's address info.");
			});

		}, (e1)=>{
			toastr.error(e1, "Error in querying spouse's address info.");
		});

	}

}