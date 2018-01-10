import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from 'entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import settings from 'settings';
import {OrderByDate} from 'helpers';

@inject(obj_personnel, toastr, DialogService)
export class relative_emergency{

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

		this.obj_personnel.OBSERVERS.relative_tab_changed.push((tab_num, global_indiv_id)=>{
			if(tab_num == 4){
				this.loadEmergencyContacts(global_indiv_id);
			}
		});
	}

	loadEmergencyContacts(global_indiv_id){
		settings.isNavigating = true;
		var pred1 = breeze.Predicate.create("GLOBAL_INDIV_ID", "==", global_indiv_id);
		var pred2 = breeze.Predicate.create("IN_CASE_OF_EMERGENCY_FL", "==", "1");
		var finalPred = breeze.Predicate.and([pred1, pred2]);
		var query = EntityQuery().from("RELATIVE_TRX")
					.where(finalPred)
					.orderBy("RELATIVE_ID");

		EntityManager().executeQuery(query).then((s1)=>{
			// var tmp=[];
			this.obj_personnel.RELATIVE.emergency_contact.list=[];
			var tmpLog = [];
			_.each(s1.results, (r)=>{

				var emergency={};
				emergency.relative_id = r.RELATIVE_ID;
				emergency.global_indiv_id = r.GLOBAL_INDIV_ID;
				emergency.given_name = r.GIVEN_NAME;
				emergency.middle_name = r.MIDDLE_NAME;
				emergency.last_name = r.LAST_NAME;
				emergency.phone_no = r.PHONE_NO;
				emergency.relative_cd = r.RELATIVE_CD;

				query = EntityQuery().from("RELATIVE_ADDR_TRX")
						.where("RELATIVE_ID", "==", r.RELATIVE_ID);
				EntityManager().executeQuery(query).then((s2)=>{

					if(s2.results.length>0){
						emergency.relative_addr_id = s2.results[0].RELATIVE_ADDR_ID;
						emergency.country_cd = s2.results[0].COUNTRY_CD;
						emergency.region = s2.results[0].REGION;
						emergency.state_province = s2.results[0].STATE_PROVINCE;
						emergency.city_town = s2.results[0].CITY_TOWN;
						emergency.district = s2.results[0].DISTRICT;
						emergency.barangay = s2.results[0].BARANGAY;
						emergency.sub_village = s2.results[0].SUB_VILLAGE;
						emergency.block_lot = s2.results[0].BLOCK_LOT;
						emergency.street_name = s2.results[0].STREET_NAME;
						emergency.house_no = s2.results[0].HOUSE_NO;
						emergency.bldg_name = s2.results[0].BLDG_NAME;
						emergency.unit_no = s2.results[0].UNIT_NO;
						emergency.zipcode = s2.results[0].ZIPCODE;
						var strAddress="";
						var tmpAddress=[];
						if(s2.results[0].UNIT_NO != null && s2.results[0].UNIT_NO.length>0){
							tmpAddress.push(s2.results[0].UNIT_NO);
						}
						if(s2.results[0].HOUSE_NO != null && s2.results[0].HOUSE_NO.length>0){
							tmpAddress.push(s2.results[0].HOUSE_NO);
						}

						if(s2.results[0].BLOCK_LOT != null && s2.results[0].BLOCK_LOT.length>0){
							tmpAddress.push(s2.results[0].BLOCK_LOT);
						}

						if(s2.results[0].BLDG_NAME != null && s2.results[0].BLDG_NAME.length>0){
							tmpAddress.push(s2.results[0].BLDG_NAME);
						}

						if(s2.results[0].STREET_NAME != null && s2.results[0].STREET_NAME.length>0){
							tmpAddress.push(s2.results[0].STREET_NAME);
						}

						if(s2.results[0].SUB_VILLAGE != null && s2.results[0].SUB_VILLAGE.length>0){
							tmpAddress.push(s2.results[0].SUB_VILLAGE);
						}

						if(s2.results[0].BARANGAY != null && s2.results[0].BARANGAY.length>0){
							tmpAddress.push(s2.results[0].BARANGAY);
						}

						if(s2.results[0].DISTRICT != null && s2.results[0].DISTRICT.length>0){
							tmpAddress.push(s2.results[0].DISTRICT);
						}

						if(s2.results[0].CITY_TOWN != null && s2.results[0].CITY_TOWN.length>0){
							tmpAddress.push(s2.results[0].CITY_TOWN);
						}

						if(s2.results[0].STATE_PROVINCE != null && s2.results[0].STATE_PROVINCE.length>0){
							var text = this.obj_personnel.LOCATIONS.find((l)=>{
								if(l.value == s2.results[0].STATE_PROVINCE)
									return l.text;
							});
							tmpAddress.push(text);
						}

						if(s2.results[0].REGION != null && s2.results[0].REGION.length>0){
							tmpAddress.push(s2.results[0].REGION);
						}

						if(s2.results[0].ZIPCODE != null && s2.results[0].ZIPCODE.length>0){
							tmpAddress.push(s2.results[0].ZIPCODE);
						}

						if(s2.results[0].COUNTRY_CD != null && s2.results[0].COUNTRY_CD.length>0){
							tmpAddress.push(s2.results[0].COUNTRY_CD);
						}

						if(tmpAddress.length>0){
							strAddress = tmpAddress.join(' ');
							emergency.address = strAddress;
						}

					}

					this.obj_personnel.RELATIVE.emergency_contact.list.push(emergency);
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
			toastr.success("", "emergency contacts has been loaded...");
			// this.obj_personnel.RELATIVE.emergency_contact.list = tmp;
			tmpLog.sort(OrderByDate);
			if(tmpLog.length >0){

				var lastIndex = tmpLog.length-1;
				this.lblCreatedBy = tmpLog[0].user + " " + moment.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
				if(tmpLog.length>1){
					this.lblUpdatedBy = tmpLog[lastIndex].user + " " + moment.utc(tmpLog[lastIndex].date).format("MM/DD/YYYY hh:mm A");
				}else{
					this.lblUpdatedBy = "";
				}

			}else{
				this.lblCreatedBy = "";
				this.lblUpdatedBy = "";
			}
			settings.isNavigating = false;

		}, (e1)=>{			
			settings.isNavigating = false;
			toastr.clear();
			toastr.error(e1, "Error in querying emergency contacts.")
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
		this.obj_personnel.RELATIVE.emergency_contact.model.relative_id = item.relative_id;
		this.obj_personnel.RELATIVE.emergency_contact.model.last_name = item.last_name;
		this.obj_personnel.RELATIVE.emergency_contact.model.given_name = item.given_name;
		this.obj_personnel.RELATIVE.emergency_contact.model.middle_name = item.middle_name;
		this.obj_personnel.RELATIVE.emergency_contact.model.relative_cd = item.relative_cd;
		this.obj_personnel.RELATIVE.emergency_contact.model.phone_no = item.phone_no;
		this.obj_personnel.RELATIVE.emergency_contact.model.relative_addr_id = item.relative_addr_id;
		this.obj_personnel.RELATIVE.emergency_contact.model.zipcode = item.zipcode;
		this.obj_personnel.RELATIVE.emergency_contact.model.unit_no = item.unit_no;
		this.obj_personnel.RELATIVE.emergency_contact.model.house_no = item.house_no;
		this.obj_personnel.RELATIVE.emergency_contact.model.block_lot = item.block_lot;
		this.obj_personnel.RELATIVE.emergency_contact.model.bldg_name = item.bldg_name;
		this.obj_personnel.RELATIVE.emergency_contact.model.street_name = item.street_name;
		this.obj_personnel.RELATIVE.emergency_contact.model.sub_village = item.sub_village;
		this.obj_personnel.RELATIVE.emergency_contact.model.barangay = item.barangay;
		this.obj_personnel.RELATIVE.emergency_contact.model.district = item.district;
		this.obj_personnel.RELATIVE.emergency_contact.model.city_town = item.city_town;
		this.obj_personnel.RELATIVE.emergency_contact.model.state_province = item.state_province;
		this.obj_personnel.RELATIVE.emergency_contact.model.region = item.region;
		this.obj_personnel.RELATIVE.emergency_contact.model.country_cd = item.country_cd;
	}

	btnRemove(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the record?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('RELATIVE_ADDR_TRX').where('RELATIVE_ADDR_ID', '==', item.relative_addr_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{

  							query = EntityQuery().from("RELATIVE_TRX").where("RELATIVE_ID", "==", item.relative_id);
  							EntityManager().executeQuery(query).then((s1)=>{

  								s1.results[0].entityAspect.setDeleted();

  								EntityManager().saveChanges().then((s2)=>{
  									settings.isNavigating = false;
  									toastr.clear();
  									toastr.success("", "Record successfully removed.");
  									this.loadEmergencyContacts(this.obj_personnel.global_indiv_id);
  									this.clearField();
  								}, (e2)=>{
  									toastr.clear();
  									toastr.error(e2, "Error in removing emergency contact.");
  									settings.isNavigating = false;
  								})

  							});

  						},(error)=>{
  							toastr.clear();
  							toastr.error(error, "Error in removing address.");
  							settings.isNavigating = false;
  						});

  					});
  				}
  		});
	}

	dd_provinceChanged(){		
		var prov = this.obj_personnel.RELATIVE.emergency_contact.model.state_province;
		if(prov != undefined && prov != null && prov.length!=0){
			var selectedProv = this.obj_personnel.PROVINCE.find((p)=>{
				if(p.value == prov){
					return p;
				}
			});

			if(selectedProv != null){
				this.obj_personnel.RELATIVE.emergency_contact.model.region = selectedProv.group;
				this.dd_regionChanged();
			}
		}
	}

	dd_regionChanged(){
		var reg = this.obj_personnel.RELATIVE.emergency_contact.model.region;
		if(reg != undefined && reg!=null && reg.length!=0)
		{
			//alert(this.obj_personnel.CONTACT.modelAddress.region);
			var selectedRegion = this.obj_personnel.REGION.find((r)=>{
				if(r.value == reg)
					return r;
			});

			if(selectedRegion != null)
			{
				reg = this.obj_personnel.RELATIVE.emergency_contact.model.country_cd = selectedRegion.group;
			}
		}
	}

	clearField(){
		this._disableBtnAdd = false;
		this._disableBtnSave = true;
		this._disableForm = true;
		this._disableTable = false;
		this.obj_personnel.RELATIVE.emergency_contact.model={};
		this.formStatus = "";
	}

	validate(){
		var strValidation = "";

		if(this.obj_personnel.RELATIVE.emergency_contact.model.last_name == undefined || this.obj_personnel.RELATIVE.emergency_contact.model.last_name == null || this.obj_personnel.RELATIVE.emergency_contact.model.last_name.length==0){
			strValidation+="No last name specified. <br/>";
		}

		if(this.obj_personnel.RELATIVE.emergency_contact.model.given_name == undefined || this.obj_personnel.RELATIVE.emergency_contact.model.given_name == null || this.obj_personnel.RELATIVE.emergency_contact.model.given_name.length==0){
			strValidation+="No given name specified. <br/>";
		}

		if(this.obj_personnel.RELATIVE.emergency_contact.model.relative_cd == undefined || this.obj_personnel.RELATIVE.emergency_contact.model.relative_cd == null || this.obj_personnel.RELATIVE.emergency_contact.model.relative_cd.length==0){
			strValidation+="No relationship specified. <br/>";
		}

		if(this.obj_personnel.RELATIVE.emergency_contact.model.phone_no == undefined || this.obj_personnel.RELATIVE.emergency_contact.model.phone_no == null || this.obj_personnel.RELATIVE.emergency_contact.model.phone_no.length==0){
			strValidation+= "No phone number specified. <br/>";
		}

		if(this.obj_personnel.RELATIVE.emergency_contact.model.country_cd == undefined || this.obj_personnel.RELATIVE.emergency_contact.model.country_cd == null || this.obj_personnel.RELATIVE.emergency_contact.model.country_cd.length==0){
			strValidation+="No country specified. <br/>";
		}


		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			if(this.obj_personnel.RELATIVE.emergency_contact.model.relative_id != undefined && this.obj_personnel.RELATIVE.emergency_contact.model.relative_id != null && this.obj_personnel.RELATIVE.emergency_contact.model.relative_id>0){
				this.updateInfo(this.obj_personnel.RELATIVE.emergency_contact.model.relative_id);
			}else{
				this.saveInfo(this.obj_personnel.global_indiv_id);
			}
		}
	}

	saveInfo(global_indiv_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("RELATIVE_TRX")
					.orderByDesc("RELATIVE_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{
			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].RELATIVE_ID+1;				
			}
			var relative = {
				RELATIVE_ID: maxId,
				GLOBAL_INDIV_ID: global_indiv_id,
				GIVEN_NAME: this.obj_personnel.RELATIVE.emergency_contact.model.given_name,
				MIDDLE_NAME: this.obj_personnel.RELATIVE.emergency_contact.model.middle_name,
				LAST_NAME: this.obj_personnel.RELATIVE.emergency_contact.model.last_name,
				BIRTH_DT: "01/01/0001",
				PHONE_NO: this.obj_personnel.RELATIVE.emergency_contact.model.phone_no,
				IN_CASE_OF_EMERGENCY_FL: 1,
				RELATIVE_CD: this.obj_personnel.RELATIVE.emergency_contact.model.relative_cd,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("RELATIVE_TRX", relative);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{
				this.saveAddress(maxId);
			}, (e2)=>{
				if(entity!=null){
					entity.entityAspect.setDeleted();
				}
				settings.isNavigating=false;
				toastr.error(e2, "Error in saving emergency contact.");
			});

		}, (e1)=>{
			settings.isNavigating=false;
			toastr.error(e1, "Error in querying relative id.");
		});
	}

	updateInfo(relative_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("RELATIVE_TRX")
					.where("RELATIVE_ID", "==", relative_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].GIVEN_NAME = this.obj_personnel.RELATIVE.emergency_contact.model.given_name;
			s1.results[0].MIDDLE_NAME = this.obj_personnel.RELATIVE.emergency_contact.model.middle_name;
			s1.results[0].LAST_NAME = this.obj_personnel.RELATIVE.emergency_contact.model.last_name;
			s1.results[0].PHONE_NO = this.obj_personnel.RELATIVE.emergency_contact.model.phone_no;
			s1.results[0].RELATIVE_CD = this.obj_personnel.RELATIVE.emergency_contact.model.relative_cd;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{
				if(this.obj_personnel.RELATIVE.emergency_contact.model.relative_addr_id != undefined && this.obj_personnel.RELATIVE.emergency_contact.model.relative_addr_id != null && this.obj_personnel.RELATIVE.emergency_contact.model.relative_addr_id>0){
					this.updateAddress(this.obj_personnel.RELATIVE.emergency_contact.model.relative_addr_id);
				}else{
					this.saveAddress(relative_id);
				}

			}, (e2)=>{
				settings.isNavigating = false;
				toastr.clear();
				toastr.error(e2, "Error in updating info.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in querying emergency contact info.");
		});
	}

	saveAddress(relative_id){

		var dateToday = new Date(moment(new Date()).add(8,"hours"));
		var query = EntityQuery().from("RELATIVE_ADDR_TRX")
					.orderByDesc("RELATIVE_ADDR_ID").take(1);
		EntityManager().executeQuery(query).then((s1)=>{
			var maxId = 1;
			if(s1.results.length>0){
				maxId = s1.results[0].RELATIVE_ADDR_ID+1;
			}

			var address_trx = {
				RELATIVE_ADDR_ID: maxId,
				RELATIVE_ID: relative_id,
				COUNTRY_CD: this.obj_personnel.RELATIVE.emergency_contact.model.country_cd,
				REGION: this.obj_personnel.RELATIVE.emergency_contact.model.region,
				STATE_PROVINCE: this.obj_personnel.RELATIVE.emergency_contact.model.state_province,
				CITY_TOWN: this.obj_personnel.RELATIVE.emergency_contact.model.city_town,
				DISTRICT: this.obj_personnel.RELATIVE.emergency_contact.model.district,
				BARANGAY: this.obj_personnel.RELATIVE.emergency_contact.model.barangay,
				SUB_VILLAGE: this.obj_personnel.RELATIVE.emergency_contact.model.sub_village,
				BLOCK_LOT: this.obj_personnel.RELATIVE.emergency_contact.model.block_lot,
				STREET_NAME: this.obj_personnel.RELATIVE.emergency_contact.model.street_name,
				HOUSE_NO: this.obj_personnel.RELATIVE.emergency_contact.model.house_no,
				BLDG_NAME: this.obj_personnel.RELATIVE.emergency_contact.model.bldg_name,
				UNIT_NO: this.obj_personnel.RELATIVE.emergency_contact.model.unit_no,
				ZIPCODE: this.obj_personnel.RELATIVE.emergency_contact.model.zipcode,
				PERMANENT_FL:0,
				MAILING_FL:0,
				PRESENT_FL:0,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("RELATIVE_ADDR_TRX", address_trx);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((s2)=>{
				toastr.clear();
				toastr.success("", "Record saved.");
				this.loadEmergencyContacts(this.obj_personnel.global_indiv_id);
				this.clearField();
			}, (e2)=>{
				settings.isNavigating = false;
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				toastr.error(e2, "Error in saving address.");
			});

		}, (e1)=>{
			settings.isNavigating = false;
			toastr.error(e1, "Error in quering relative address id.");
		});
	}

	updateAddress(relative_addr_id){

		settings.isNavigating = true;
		var dateToday = new Date(moment(new Date()).add(8, "hours"));
		var query = EntityQuery().from("RELATIVE_ADDR_TRX")
					.where("RELATIVE_ADDR_ID", "==", relative_addr_id);
		EntityManager().executeQuery(query).then((s1)=>{

			s1.results[0].COUNTRY_CD = this.obj_personnel.RELATIVE.emergency_contact.model.country_cd;
			s1.results[0].REGION = this.obj_personnel.RELATIVE.emergency_contact.model.region;
			s1.results[0].STATE_PROVINCE = this.obj_personnel.RELATIVE.emergency_contact.model.state_province;
			s1.results[0].CITY_TOWN = this.obj_personnel.RELATIVE.emergency_contact.model.city_town;
			s1.results[0].DISTRICT = this.obj_personnel.RELATIVE.emergency_contact.model.district;
			s1.results[0].BARANGAY = this.obj_personnel.RELATIVE.emergency_contact.model.barangay;
			s1.results[0].SUB_VILLAGE = this.obj_personnel.RELATIVE.emergency_contact.model.sub_village;
			s1.results[0].BLOCK_LOT = this.obj_personnel.RELATIVE.emergency_contact.model.block_lot;			
			s1.results[0].STREET_NAME = this.obj_personnel.RELATIVE.emergency_contact.model.street_name;
			s1.results[0].HOUSE_NO = this.obj_personnel.RELATIVE.emergency_contact.model.house_no;
			s1.results[0].BLDG_NAME = this.obj_personnel.RELATIVE.emergency_contact.model.bldg_name;
			s1.results[0].UNIT_NO = this.obj_personnel.RELATIVE.emergency_contact.model.unit_no;
			s1.results[0].ZIPCODE = this.obj_personnel.RELATIVE.emergency_contact.model.zipcode;
			s1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			s1.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((s2)=>{
				toastr.clear();
				toastr.success("", "Record updated.");
				this.loadEmergencyContacts(this.obj_personnel.global_indiv_id);
				this.clearField();
			}, (e2)=>{
				settings.isNavigating = false;
				toastr.error(e2, "Error in updating address.");
			});

		}, (e2)=>{			
			settings.isNavigating = false;
			toastr.error(e2, "Error in querying address.");
		});

	}
}