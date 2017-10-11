import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from '../obj_personnel';
import {EntityManager,EntityQuery} from '../../entity-manager-factory';
import breeze from 'breeze-client';
import {DialogService} from 'aurelia-dialog'
import {DialogBox} from "../modals/DialogBox";
import moment from 'moment';
import settings from 'settings';
import {formatDate} from '../../helpers';

@inject(obj_personnel, toastr, DialogService)
export class main_contact 
{
	_disableForm=true;
	_disableBtnAdd=false;
	_disableBtnSave=true;
	_disableAddressTable=false;
	_disableContactTable=false;
	lblCreatedBy="";
	lblUpdatedBy="";
	obj_personnel=null;
	constructor(obj_personnel, toastr, DialogService)
	{
		this.DialogService = DialogService;
		this.obj_personnel = obj_personnel;
		this.obj_personnel.OBSERVERS.maintab_contact_clicked.push((val)=>{
			this.loadMain_Address(val);
			this.loadMain_Contact(val);
			this.loadMain_EmailWeb(val);
			this.clearAddressData();
			this.clearContactData();
			// this.loadLog(val);
			this.loadLog_V2(val);

		});

		this.obj_personnel.OBSERVERS.clear_ppid.push((val)=>{
			this.obj_personnel.CONTACT= {
				status:"",
				modelAddress:{},
				statusContact:"Add",
				modelContact:{},
				modelInternet:{},
				address:[],
				contact:[],
				email:[],
				website:[]
			};
			this.clearAddressData();
			this.clearContactData();
			this.clearEmailWebData();
		});
	}

	loadMain_Address(global_id)
	{
		settings.isNavigating = true;
		var query = EntityQuery().from('ADDR_TRX').where('GLOBAL_ID','==',global_id);		
		EntityManager().executeQuery(query).then((success)=>{
			var tmp = [];
			var tmpFullAddress = [];
			_.each(success.results,(result)=>{
				var strFullAddress="";
				if(result.UNIT_NO != null && result.UNIT_NO.length>0)
					tmpFullAddress.push(result.UNIT_NO);
				if(result.HOUSE_NO != null && result.HOUSE_NO.length>0)
					tmpFullAddress.push(result.HOUSE_NO);
				if(result.BLOCK_LOT != null && result.BLOCK_LOT.length>0)
					tmpFullAddress.push(result.BLOCK_LOT);
				if(result.BLDG_NAME != null && result.BLDG_NAME.length>0)
					tmpFullAddress.push(result.BLDG_NAME);
				if(result.STREET_NAME != null && result.STREET_NAME.length>0)
					tmpFullAddress.push(result.STREET_NAME);
				if(result.SUB_VILLAGE != null && result.SUB_VILLAGE.length>0)
					tmpFullAddress.push(result.SUB_VILLAGE);
				if(result.BARANGAY != null && result.BARANGAY.length>0)
					tmpFullAddress.push(result.BARANGAY);
				if(result.DISTRICT != null && result.DISTRICT.length>0)
					tmpFullAddress.push(result.DISTRICT);
				if(result.CITY_TOWN != null && result.CITY_TOWN.length>0)
					tmpFullAddress.push(result.CITY_TOWN);
				if(result.STATE_PROVINCE != null && result.STATE_PROVINCE.length>0){
					var text = this.obj_personnel.LOCATIONS.find((l)=>{
						if(l.value == result.STATE_PROVINCE)
							return l.text;
					});          
          			tmpFullAddress.push(text);
      			}
      			if(result.REGION != null && result.REGION.length>0)
      				tmpFullAddress.push(result.REGION);
      			if(result.ZIPCODE != null && result.ZIPCODE.length>0)
      				tmpFullAddress.push(result.ZIPCODE);        
      			if(result.COUNTRY_CD != null && result.COUNTRY_CD.length>0)
      				tmpFullAddress.push(result.COUNTRY_CD);

      			if(tmpFullAddress.length>0){
      				strFullAddress = tmpFullAddress.join(' ');
      				tmpFullAddress=[];
      			}


      			tmp.push({
					global_id: result.GLOBAL_ID,
					addr_id: result.ADDR_ID,
					country_cd: result.COUNTRY_CD,
					region: result.REGION,
					state_province: result.STATE_PROVINCE,
					city_town: result.CITY_TOWN,
					district: result.DISTRICT,
					barangay: result.BARANGAY,
					sub_village: result.SUB_VILLAGE,
					phase: result.PHASE,
					permanent_fl: result.PERMANENT_FL,
					present_fl: result.PRESENT_FL,
					block_lot: result.BLOCK_LOT,
					street_name: result.STREET_NAME,
					house_no: result.HOUSE_NO,
					bldg_name: result.BLDG_NAME,
					unit_no: result.UNIT_NO,
					zipcode: result.ZIPCODE,
					residential_type: result.RESIDENTIAL_TYPE,
					house_ownership: result.HOUSE_OWNERSHIP,
					mailing_fl: result.MAILING_FL,
					postal_box: result.POSTAL_BOX,
					remarks: result.REMARKS,
					sketch_path: result.SKETCH_PATH,
					full_address: strFullAddress
        		});
 			});
			
			this.obj_personnel.CONTACT.address = tmp;
			settings.isNavigating = false;
			toastr.clear();
			toastr.success("", "Contact info has been loaded.");
		});
	}

	loadMain_Contact(global_id){

		settings.isNavigating = true;
		var query = EntityQuery().from('CONTACT_INFO_TRX')
					.where('GLOBAL_ID', '==', global_id);
		EntityManager().executeQuery(query).then((success)=>{

			var tmp = [];
			_.each(success.results, (result)=>{
				var type = this.obj_personnel.CONTACT_TYPE.find((x)=>{
					return x.value == result.PHONE_TYPE;
				});
				var contact = {
					contact_no_id: result.CONTACT_NO_ID,
					global_id: result.GLOBAL_ID,
					phone_type_text: type.text,
					phone_type: result.PHONE_TYPE,
					area_cd: result.AREA_CD,
					phone_no: result.PHONE_NO,
					local_no: result.LOCAL_NO
				};
				tmp.push(contact);
			});
			this.obj_personnel.CONTACT.contact = tmp;
			settings.isNavigating = false;

		}, (error)=>{
			toastr.error(error, "Error in loading contact details.");
		});
	}

	loadMain_EmailWeb(global_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("INTERNET_TRX")
					.where("GLOBAL_ID", "==", global_id);
		EntityManager().executeQuery(query).then((querySuccess)=>{

			var tmpEmail=[];
			var tmpWeb=[];
			_.each(querySuccess.results, (result)=>{

				if(result.EMAIL_FL == 1){
					var email = {
						internet_id: result.INTERNET_ID,
						web_addr: result.WEB_ADDR
					};
					tmpEmail.push(email);
				}else if(result.REC_STAT_FL == 1){
					var web = {
						internet_id: result.INTERNET_ID,
						web_addr: result.WEB_ADDR	
					};
					tmpWeb.push(web);
				}				
			});

			this.obj_personnel.CONTACT.email=tmpEmail;
			this.obj_personnel.CONTACT.website=tmpWeb;

		}, (queryError)=>{
			settings.isNavigating = false;
			toastr.error(queryError, "Error in loading email data.");
			// console.log(queryError);
		});

	}

	loadLog(global_id){
		var createdBy = null;
		var dtCreated = null;
		var updatedBy = null;
		var dtUpdated = null;
		var query = EntityQuery().from("ADDR_TRX")
					.where("GLOBAL_ID", "==", global_id)
					.orderBy("CREATED_DT").take(1);
		EntityManager().executeQuery(query).then((s1)=>{
			if(s1.results.length==1){
				dtCreated = new Date(s1.results[0].CREATED_DT);
				createdBy = s1.results[0].CREATED_BY;
			} 

			// console.log(createdBy+":"+dtCreated);
			query = EntityQuery().from("CONTACT_INFO_TRX")
					.where("GLOBAL_ID","==", global_id)
					.orderBy("CREATED_DT").take(1);
			EntityManager().executeQuery(query).then((s2)=>{
				if(s2.results.length==1){					
					var tmpDt = new Date(s2.results[0].CREATED_DT);
					if(dtCreated == null || dtCreated>tmpDt){
						dtCreated = tmpDt;
						createdBy = s2.results[0].CREATED_BY;
					}
				}

				query = EntityQuery().from("INTERNET_TRX")
						.where("GLOBAL_ID","==", global_id)
						.orderBy("CREATED_DT").take(1);
				EntityManager().executeQuery(query).then((s3)=>{
					if(s3.results.length==1){
						var tmpDt = new Date(s3.results[0].CREATED_DT);
						if(dtCreated == null || dtCreated>tmpDt){
							dtCreated = tmpDt;
							createdBy = s3.results[0].CREATED_BY;
						}
					}
					if(createdBy != null)
					{
						this.lblCreatedBy = createdBy+' '+moment.utc(dtCreated).format("MM/DD/YYYY hh:mm A");
					}else{
						this.lblCreatedBy = "";
					}
				});
			});
		});

		var query2 = EntityQuery().from("ADDR_TRX")
					 .where("GLOBAL_ID", "==", global_id)
					 .orderByDesc("LAST_UPDATED_DT").take(1);
		EntityManager().executeQuery(query2).then((ss1)=>{
			if(ss1.results.length==1){
				if(ss1.results[0].LAST_UPDATED_BY != null){
					updatedBy = ss1.results[0].LAST_UPDATED_BY;
					dtUpdated = new Date(ss1.results[0].LAST_UPDATED_DT);
				}
			}
			query2 = EntityQuery().from("CONTACT_INFO_TRX")
					.where("GLOBAL_ID", "==", global_id)
					.orderByDesc("LAST_UPDATED_DT").take(1);
			EntityManager().executeQuery(query2).then((ss2)=>{
				if(ss2.results.length==1){
					if(ss2.results[0].LAST_UPDATED_BY != null){						
						var tmpDt = new Date(ss2.results[0].LAST_UPDATED_DT);
						if(dtUpdated == null || dtUpdated<tmpDt){
							updatedBy = ss2.results[0].LAST_UPDATED_BY;
							dtUpdated = tmpDt;
						}
					}
				}

				query2 = EntityQuery().from("INTERNET_TRX")
						.where("GLOBAL_ID", "==", global_id)
						.orderByDesc("LAST_UPDATED_DT").take(1);
				EntityManager().executeQuery(query2).then((ss3)=>{
					if(ss3.results.length==1){
						if(ss3.results[0].LAST_UPDATED_BY != null){
							var tmpDt = new Date(ss3.results[0].LAST_UPDATED_DT);
							if(dtUpdated==null || dtUpdated<tmpDt){
								updatedBy = ss3.results[0].LAST_UPDATED_BY;
								dtUpdated = tmpDt;
							}
						}
					}
					if(updatedBy != null){
						this.lblUpdatedBy = updatedBy+' '+moment.utc(dtUpdated).format("MM/DD/YYYY hh:mm A");
					}else{
						this.lblUpdatedBy = "";
					}
				});
			});
		});		
	}

	loadLog_V2(global_id){
		var tmpList=[];
		var query = EntityQuery().from("ADDR_TRX")
					.where("GLOBAL_ID", "==", global_id);
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

				if(r.LAST_UPDATED_BY != null){
					var _user = r.LAST_UPDATED_BY;
					var _date = new Date(r.LAST_UPDATED_DT);
					tmpList.push({
						user: _user,
						date: _date
					});
				}				
			});

			query = EntityQuery().from("CONTACT_INFO_TRX")
					.where("GLOBAL_ID", "==", global_id);
			EntityManager().executeQuery(query).then((s2)=>{
				_.each(s2.results, (r2)=>{
					if(r2.CREATED_BY != null){
						var _user = r2.CREATED_BY;
						var _date = new Date(r2.CREATED_DT);
						tmpList.push({
							user: _user,
							date: _date
						});
					}

					if(r2.LAST_UPDATED_BY != null){
						var _user = r2.LAST_UPDATED_BY;
						var _date = new Date(r2.LAST_UPDATED_DT);
						tmpList.push({
							user: _user,
							date: _date
						});
					}
				});

				query = EntityQuery().from("INTERNET_TRX")
						.where("GLOBAL_ID", "==", global_id);
				EntityManager().executeQuery(query).then((s3)=>{

					_.each(s3.results, (r3)=>{
						if(r3.CREATED_BY != null){
							var _user = r3.CREATED_BY;
							var _date = new Date(r3.CREATED_DT);
							tmpList.push({
								user: _user,
								date: _date
							});
						}

						if(r3.LAST_UPDATED_BY != null){
							var _user = r3.LAST_UPDATED_BY;
							var _date = new Date(r3.LAST_UPDATED_DT);
							tmpList.push({
								user: _user,
								date: _date
							});
						}
					});

					tmpList.sort(this.OrderByDate);
					var LastIndex = tmpList.length-1;
					if(tmpList.length>0)
					{
						this.lblCreatedBy = tmpList[0].user+' '+moment.utc(tmpList[0].date).format("MM/DD/YYYY hh:mm A");
						this.lblUpdatedBy = tmpList[LastIndex].user + ' ' + moment.utc(tmpList[LastIndex].date).format("MM/DD/YYYY hh:mm A");
					}else{
						this.lblCreatedBy = "";
						this.lblUpdatedBy = "";
					}

				});

			});

		});

	}

	OrderByDate(a, b){
		if(a.date > b.date)
			return 1;
		if(a.date < b.date)
			return -1;
		return 0;
	}


	clearAddressData(){

		settings.isNavigating = false;
		this.obj_personnel.CONTACT.modelAddress={};
		this.obj_personnel.CONTACT.status="";
		this._disableBtnAdd = false;
		this._disableBtnSave = true;
		this._disableForm = true;
		this._disableAddressTable = false;

	}

	clearContactData(){

		settings.isNavigating = false;
		this._disableContactTable = false;
		this.obj_personnel.CONTACT.statusContact="Add";
		this.obj_personnel.CONTACT.modelContact={};

	}

	clearEmailWebData(){

		settings.isNavigating = false;
		this.obj_personnel.CONTACT.modelInternet={};

	}

	//Source: https://stackoverflow.com/questions/13952686/how-to-make-html-input-tag-only-accept-numerical-values
	isNumberKey(evt){	
    	var charCode = (evt.which) ? evt.which : event.keyCode
    	if (charCode > 31 && (charCode < 48 || charCode > 57))
	        return false;
    	return true;
	}

	dd_provinceChanged(){
		var prov = this.obj_personnel.CONTACT.modelAddress.state_province;
		if(prov != undefined && prov != null && prov.length!=0){
			var selectedProv = this.obj_personnel.PROVINCE.find((p)=>{
				if(p.value == prov){
					return p;
				}
			});

			if(selectedProv != null){
				this.obj_personnel.CONTACT.modelAddress.region = selectedProv.group;				
				this.dd_regionChanged();
			}
		}
	}

	dd_regionChanged(){
		var reg = this.obj_personnel.CONTACT.modelAddress.region;
		if(reg != undefined && reg!=null && reg.length!=0)
		{
			//alert(this.obj_personnel.CONTACT.modelAddress.region);
			var selectedRegion = this.obj_personnel.REGION.find((r)=>{
				if(r.value == reg)
					return r;
			});

			if(selectedRegion != null)
			{
				this.obj_personnel.CONTACT.modelAddress.country_cd = selectedRegion.group;
			}
		}
	}


	btnAdd_Address()
	{
		this.obj_personnel.CONTACT.status="ADD";
		this._disableBtnAdd = true;
		this._disableBtnSave = false;
		this._disableForm = false;
		this._disableAddressTable = true;
	}

	btnEdit_Address(address)
	{
		this._disableBtnAdd = true;
		this._disableBtnSave = false;
		this._disableForm = false;
		this._disableAddressTable = true;
		this.obj_personnel.CONTACT.status="EDIT";
		this.obj_personnel.CONTACT.modelAddress=address;
		this.obj_personnel.CONTACT.modelAddress.present_fl=this.obj_personnel.CONTACT.modelAddress.present_fl=='1'?true:false;
		this.obj_personnel.CONTACT.modelAddress.permanent_fl=this.obj_personnel.CONTACT.modelAddress.permanent_fl=='1'?true:false;
  		//console.log(address);
  	}

  	btnRemoveAddress(item){
  		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the address?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				//alert("Confirmed delete.");
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('ADDR_TRX').where('ADDR_ID', '==', item.addr_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.success("","The address was successfully removed.");
  							this.loadMain_Address(this.obj_personnel.global_indiv_id);
  							// this.loadLog(this.obj_personnel.global_indiv_id);
  							this.loadLog_V2(this.obj_personnel.global_indiv_id);
  						},(error)=>{
  							toastr.clear();
  							toastr.error("", "Error in removing address.");
  							settings.isNavigating = false;
  						});
  					});
  				}
  		});
  	}

  	validateAddress()
  	{
  		var strValidation="";
  		if(this.obj_personnel.CONTACT.modelAddress.country_cd == undefined || this.obj_personnel.CONTACT.modelAddress.country_cd == null || this.obj_personnel.CONTACT.modelAddress.country_cd.length==0){
  			strValidation+= "No country specified.<br/>";
  		}

  		if(strValidation.length>0){
  			toastr.clear();
  			toastr.error(strValidation, "");
  			return;
  		}else{
  			if(this.obj_personnel.CONTACT.status=='ADD'){
  				this.insertAddress();
  			}else if(this.obj_personnel.CONTACT.status=='EDIT')
  			{
  				this.updateAddress();
  			}
  		}
  	}

  	insertAddress(){

  		settings.isNavigating = true;
  		var dateToday = null;    
  		dateToday = new moment(new Date()).add(8, 'hours');
  		dateToday = new Date(dateToday);

  		var query = EntityQuery().from('ADDR_TRX').orderByDesc('ADDR_ID').take(1);
  		EntityManager().executeQuery(query).then((success)=>{

  			var Max=1;
  			if(success.results.length>0){
  				Max = success.results[0].ADDR_ID+1;
  			}
  			// console.log(Max);
        //Upload Image first before save to DB record.

        	var _address = {
	        	ADDR_ID: Max,
	        	BARANGAY: this.obj_personnel.CONTACT.modelAddress.barangay,
	        	BLDG_NAME: this.obj_personnel.CONTACT.modelAddress.bldg_name,
	        	BLOCK_LOT: this.obj_personnel.CONTACT.modelAddress.block_lot,
	        	CITY_TOWN: this.obj_personnel.CONTACT.modelAddress.city_town,
	        	COUNTRY_CD: this.obj_personnel.CONTACT.modelAddress.country_cd,
	        	DISTRICT: this.obj_personnel.CONTACT.modelAddress.district,
	        	GLOBAL_ID: this.obj_personnel.HEADER.global_indiv_id,
	        	HOUSE_NO: this.obj_personnel.CONTACT.modelAddress.house_no,
	            //HOUSE_OWNERSHIP: this.obj_personnel.CONTACT.modelAddress.house_ownership,
	            MAILING_FL: 0,
	            PERMANENT_FL: this.obj_personnel.CONTACT.modelAddress.permanent_fl?1:0,
	            // PERMANENT_FL: 0,
	            // PHASE: this.obj_personnel.CONTACT.modelAddress.phase,
	            // POSTAL_BOX: this.obj_personnel.CONTACT.modelAddress.postal_box,
	            PRESENT_FL: this.obj_personnel.CONTACT.modelAddress.present_fl?1:0,
	            // PRESENT_FL: 0,
	            REGION: this.obj_personnel.CONTACT.modelAddress.region,
	            REMARKS: this.obj_personnel.CONTACT.modelAddress.remarks,
	            // RESIDENTIAL_TYPE: this.obj_personnel.CONTACT.modelAddress.residential_type,
	            // SKETCH_PATH: this.obj_personnel.CONTACT.modelAddress.sketch_path,
	            STATE_PROVINCE: this.obj_personnel.CONTACT.modelAddress.state_province,
	            STREET_NAME: this.obj_personnel.CONTACT.modelAddress.street_name,
	            SUB_VILLAGE: this.obj_personnel.CONTACT.modelAddress.sub_village,
	            UNIT_NO: this.obj_personnel.CONTACT.modelAddress.unit_no,
	            ZIPCODE: this.obj_personnel.CONTACT.modelAddress.zipcode,
	            CREATED_BY: this.obj_personnel.USER.USER_ID,
	            CREATED_DT: dateToday
	        };

	        var address = EntityManager().createEntity('ADDR_TRX', _address);

    	    EntityManager().addEntity(address);
        	EntityManager().saveChanges().then((success)=>{
        		toastr.clear();
	        	toastr.success("", "Record saved.");
	        	this.loadMain_Address(this.obj_personnel.global_indiv_id);
	        	// this.loadLog(this.obj_personnel.global_indiv_id);
	        	this.loadLog_V2(this.obj_personnel.global_indiv_id);
	        	this.clearAddressData();
	        }, (error)=>{
	        	if(address != null){
	        		address.entityAspect.setDeleted();
	        	}
	        	EntityManager().getEntities().forEach(function(entity) {
	        		var errors = entity.entityAspect.getValidationErrors();
	        		if (errors.length > 0)
	        			console.log(errors);
	        	});
	        	toastr.clear();
	        	toastr.error(error, "Error in saving address.");

	        	settings.isNavigating = false;
	        	// console.log(error);
	        });
    	});
  	}

  	updateAddress(){

  		settings.isNavigating = true;
  		var dateToday = null;    
  		dateToday = new moment(new Date()).add(8, 'hours');
  		dateToday = new Date(dateToday);
  		var query = EntityQuery().from('ADDR_TRX').where('ADDR_ID','==', this.obj_personnel.CONTACT.modelAddress.addr_id);
  		EntityManager().executeQuery(query).then((success)=>{
  			success.results[0].BARANGAY = this.obj_personnel.CONTACT.modelAddress.barangay;
  			success.results[0].BLDG_NAME = this.obj_personnel.CONTACT.modelAddress.bldg_name;
  			success.results[0].BLOCK_LOT = this.obj_personnel.CONTACT.modelAddress.block_lot;
  			success.results[0].CITY_TOWN = this.obj_personnel.CONTACT.modelAddress.city_town;
  			success.results[0].COUNTRY_CD = this.obj_personnel.CONTACT.modelAddress.country_cd;
  			success.results[0].DISTRICT = this.obj_personnel.CONTACT.modelAddress.district;
  			success.results[0].HOUSE_NO = this.obj_personnel.CONTACT.modelAddress.house_no;
  			success.results[0].PERMANENT_FL = this.obj_personnel.CONTACT.modelAddress.permanent_fl?'1':'0';
  			success.results[0].PRESENT_FL = this.obj_personnel.CONTACT.modelAddress.present_fl?'1':'0';
  			success.results[0].REGION = this.obj_personnel.CONTACT.modelAddress.region;
  			success.results[0].REMARKS = this.obj_personnel.CONTACT.modelAddress.remarks;
  			success.results[0].STATE_PROVINCE = this.obj_personnel.CONTACT.modelAddress.state_province;
  			success.results[0].STREET_NAME = this.obj_personnel.CONTACT.modelAddress.street_name;
  			success.results[0].SUB_VILLAGE = this.obj_personnel.CONTACT.modelAddress.sub_village;
  			success.results[0].UNIT_NO = this.obj_personnel.CONTACT.modelAddress.unit_no;
  			success.results[0].ZIPCODE = this.obj_personnel.CONTACT.modelAddress.zipcode;
  			success.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
  			success.results[0].LAST_UPDATED_DT = dateToday;
  			
  			EntityManager().saveChanges().then((success)=>{
  				toastr.clear();
  				toastr.success("","Record updated sucessfully.");
  				this.loadMain_Address(this.obj_personnel.global_indiv_id);
  				this.clearAddressData();
  				// this.loadLog(this.obj_personnel.global_indiv_id);
  				this.loadLog_V2(this.obj_personnel.global_indiv_id);
  			},(error)=>{
  				settings.isNavigating = false;
  				toastr.clear();
  				console.log(error);
  				toastr.error(error, 'Error in updating address.');
  			});
  		});

  	}

  	btnEdit_Contact(contact){
  		this._disableContactTable = true;
  		this.obj_personnel.CONTACT.statusContact = "Edit";
  		this.obj_personnel.CONTACT.modelContact.contact_no_id = contact.contact_no_id;
  		this.obj_personnel.CONTACT.modelContact.phone_type = contact.phone_type;
  		this.obj_personnel.CONTACT.modelContact.area_cd = contact.area_cd;
  		this.obj_personnel.CONTACT.modelContact.phone_no = contact.phone_no;
  		this.obj_personnel.CONTACT.modelContact.local_no = contact.local_no;
  	}

  	btnRemove_Contact(contact){

  		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the contact?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
  					settings.isNavigating = true;
  					var query = EntityQuery().from("CONTACT_INFO_TRX")
  								.where("CONTACT_NO_ID", "==", contact.contact_no_id);
  					EntityManager().executeQuery(query).then((querySuccess)=>{
  						if(querySuccess.results.length==0){
  							toastr.clear();
  							toastr.error("","No to-be-remove record found.");
  						}
  						querySuccess.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((removeSuccess)=>{
  							toastr.clear();
  							toastr.success("","The contact was successfully removed.");
  							this.loadMain_Contact(this.obj_personnel.global_indiv_id);
  							this.clearContactData();
  							// this.loadLog(this.obj_personnel.global_indiv_id);
  							this.loadLog_V2(this.obj_personnel.global_indiv_id);
  						},(removeError)=>{
  							settings.isNavigating = false;
  							toastr.clear();
  							toastr.error(removeError, "Error in removing contact.");
  						});

  					});
  				}
  		});
  	}

  	validateContact(){
  		var strValidation = "";

		if(this.obj_personnel.CONTACT.modelContact.phone_type == undefined || this.obj_personnel.CONTACT.modelContact.phone_type == null || this.obj_personnel.CONTACT.modelContact.phone_type.length==0){
  			strValidation+="Phone type is required.<br/>";
  		}

  		if(this.obj_personnel.CONTACT.modelContact.area_cd == undefined || this.obj_personnel.CONTACT.modelContact.area_cd == null || this.obj_personnel.CONTACT.modelContact.area_cd.length==0){
  			strValidation+="Area Code is required.<br/>";
  		}

  		if(this.obj_personnel.CONTACT.modelContact.phone_no == undefined || this.obj_personnel.CONTACT.modelContact.phone_no == null || this.obj_personnel.CONTACT.modelContact.phone_no.length==0){
  			strValidation+="Phone number is required.<br/>";
  		}

  		if(strValidation.length>0){
  			toastr.clear();
  			toastr.error("", strValidation);
  		}else{
  			if(this.obj_personnel.CONTACT.statusContact=="Add"){
  				this.insertContact();
  			}else if(this.obj_personnel.CONTACT.statusContact=="Edit")
  			{
  				this.updateContact();
  			}  		
  		}
  	}
  	
  	insertContact(){

  		settings.isNavigating = true;
  		var dateToday = null;    
  		dateToday = new moment(new Date()).add(8, 'hours');
  		dateToday = new Date(dateToday);
  		var query = EntityQuery().from("CONTACT_INFO_TRX").orderByDesc("CONTACT_NO_ID").take(1);
  		EntityManager().executeQuery(query).then((Success)=>{
  			var Max = 1;
  			if(Success.results.length>0)
  			{
  				Max = Success.results[0].CONTACT_NO_ID + 1;
  			}
  			var Contact = EntityManager().createEntity("CONTACT_INFO_TRX", {
  				AREA_CD: this.obj_personnel.CONTACT.modelContact.area_cd,
  				CONTACT_NO_ID: Max,
  				COUNTRY_CD: "PH",
  				GLOBAL_ID: this.obj_personnel.global_indiv_id,
  				LOCAL_NO: this.obj_personnel.CONTACT.modelContact.local_no,
  				PHONE_NO: this.obj_personnel.CONTACT.modelContact.phone_no,
  				PHONE_TYPE: this.obj_personnel.CONTACT.modelContact.phone_type,
  				CREATED_BY: this.obj_personnel.USER.USER_ID,
  				CREATED_DT: dateToday

  			});
  			EntityManager().addEntity(Contact);
  			EntityManager().saveChanges().then((saveSuccess)=>{
  				toastr.clear();
				toastr.success("", "Contact successfully added.");
				this.loadMain_Contact(this.obj_personnel.global_indiv_id);
				this.clearContactData();
				// this.loadLog(this.obj_personnel.global_indiv_id);
				this.loadLog_V2(this.obj_personnel.global_indiv_id);
  			}, (error)=>{
  				settings.isNavigating = false;
  				if(Contact != null){
  					Contact.entityAspect.setDeleted();
  				}
  				toastr.clear();
  				toastr.error(error, "Error in adding contact.");
  			});

  		});  		
  	}

  	updateContact(){

  		settings.isNavigating = true;
  		var dateToday = null;    
  		dateToday = new moment(new Date()).add(8, 'hours');
  		dateToday = new Date(dateToday);
  		var query = EntityQuery().from('CONTACT_INFO_TRX')
  					.where("CONTACT_NO_ID", "==", this.obj_personnel.CONTACT.modelContact.contact_no_id);
  		EntityManager().executeQuery(query).then((Success)=>{

  			if(Success.results.length == 0)
  			{
  				toastr.clear();
  				toastr.error("", "No record to be updated found.");
  				return;
  			}
  			Success.results[0].AREA_CD = this.obj_personnel.CONTACT.modelContact.area_cd;
  			Success.results[0].LOCAL_NO = this.obj_personnel.CONTACT.modelContact.local_no;
  			Success.results[0].PHONE_NO = this.obj_personnel.CONTACT.modelContact.phone_no;
  			Success.results[0].PHONE_TYPE = this.obj_personnel.CONTACT.modelContact.phone_type;
  			Success.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
  			Success.results[0].LAST_UPDATED_DT = dateToday;

  			EntityManager().saveChanges().then((saveSuccess)=>{
  				toastr.clear();
  				toastr.success("", "The contact was successfully updated.");
				this.loadMain_Contact(this.obj_personnel.global_indiv_id);
				this.clearContactData();
				// this.loadLog(this.obj_personnel.global_indiv_id);
				this.loadLog_V2(this.obj_personnel.global_indiv_id);
  			}, (errorSave)=>{  				
  				settings.isNavigating = false;
  				toastr.clear();
  				toastr.error(errorSave, "Error in updating contact.");
  				console.log(errorSave);
  			});
  		});
  	}

  	validateEmail(email) {
  		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		return re.test(email);
	}

	validateWeb(URL){
		var regEx = /^\s*[a-z](?:[-a-z0-9\+\.])*:(?:\/\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:])*@)?(?:\[(?:(?:(?:[0-9a-f]{1,4}:){6}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|::(?:[0-9a-f]{1,4}:){5}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4}:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|v[0-9a-f]+[-a-z0-9\._~!\$&\'\(\)\*\+,;=:]+)\]|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}|(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=@])*)(?::[0-9]*)?(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*|\/(?:(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*)?|(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*|(?!(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])))(?:\?(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])|[\uE000-\uF8FF\uF0000-\uFFFFD|\u100000-\u10FFFD\/\?])*)?(?:\#(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])|[\/\?])*)?\s*$/i;
		return regEx.test(URL);
	}

	btnAdd_EmailWeb(isEmail){

		if(isEmail){
			if(this.obj_personnel.CONTACT.modelInternet.email_addr==undefined || this.obj_personnel.CONTACT.modelInternet.email_addr.length==0){
				toastr.clear();
				toastr.error("", "No email specified.");
				return;
			}

			if(this.validateEmail(this.obj_personnel.CONTACT.modelInternet.email_addr)){
				//alert('email is valid.');
				this.insertEmailWeb(isEmail);
			}else{
				//alert('email is not valid.');
				toastr.error("Invalid email.");
			}
		}else{
			if(this.obj_personnel.CONTACT.modelInternet.url==undefined || this.obj_personnel.CONTACT.modelInternet.url.length==0){
				toastr.clear();
				toastr.error("", "No URL specified.");
				return;
			}
			// if(this.validateWeb(this.obj_personnel.CONTACT.modelInternet.url)){
			// 	alert('url is valid');
				this.insertEmailWeb(isEmail);
			// }else{
			// 	alert('url is invalid.');
			// 	toastr.error("Invalid URL.");
			// }
		}
	}

	btnRemove_EmailWeb(internet_id, isEmail){

		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the "+(isEmail?"Email address":"website url")+"?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
  					settings.isNavigating = true;
  					var query = EntityQuery().from("INTERNET_TRX")
  								.where("INTERNET_ID", "==", internet_id);
  					EntityManager().executeQuery(query).then((querySuccess)=>{
  						if(querySuccess.results.length==0){
  							toastr.clear();
  							toastr.error("","No to-be-remove record found.");
  						}
  						querySuccess.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((removeSuccess)=>{
  							toastr.clear();
  							toastr.success("","The "+(isEmail?"Email address":"website url")+" was successfully removed.");
  							this.loadMain_EmailWeb(this.obj_personnel.global_indiv_id);
  							this.clearEmailWebData();
  						},(removeError)=>{
  							settings.isNavigating = false;
  							toastr.clear();
  							toastr.error(removeError, "Error in removing "+(isEmail?"Email address":"website url")+" .");
  						});

  					});
  				}
  		});

	}

	btnRemove_AllEmailWeb(isEmail){

		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove all.", message:"Are you sure you want to remove all the "+(isEmail?"Email address":"website url")+"?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
  					settings.isNavigating = true;
  					var pred1 = breeze.Predicate.create("GLOBAL_ID", "==", this.obj_personnel.global_indiv_id);
  					var pred2 = breeze.Predicate.create("EMAIL_FL", "==", isEmail?1:0);
  					var finalPred = breeze.Predicate.and([pred1, pred2]);
  					var query = EntityQuery().from("INTERNET_TRX")
  								.where(finalPred);
  					EntityManager().executeQuery(query).then((querySuccess)=>{
  						if(querySuccess.results.length==0){
  							toastr.clear();
  							toastr.error("","No to-be-remove record found.");
  						}

  						_.each(querySuccess.results, (result)=>{
  							result.entityAspect.setDeleted();
  						});  						

  						EntityManager().saveChanges().then((removeSuccess)=>{
  							toastr.clear();
  							toastr.success("","The "+(isEmail?"Email address":"website url")+" was successfully removed.");
  							this.loadMain_EmailWeb(this.obj_personnel.global_indiv_id);
  							this.clearEmailWebData();
  						},(removeError)=>{
  							settings.isNavigating = false;
  							toastr.clear();
  							toastr.error(removeError, "Error in removing "+(isEmail?"Email address":"website url")+" .");
  						});

  					});
  				}
  		});

	}

	insertEmailWeb(isEmail){

		settings.isNavigating = true;
		var dateToday = null;    
  		dateToday = new moment(new Date()).add(8, 'hours');
  		dateToday = new Date(dateToday);
		var query = EntityQuery().from('INTERNET_TRX').orderByDesc('INTERNET_ID').take(1);
		EntityManager().executeQuery(query).then((querySuccess)=>{
			var Max = 1;
			if(querySuccess.results.length>0){
				Max = querySuccess.results[0].INTERNET_ID+1;
			}

			var internet_trx = {
				GLOBAL_ID: this.obj_personnel.global_indiv_id,
				WEB_ADDR: isEmail? this.obj_personnel.CONTACT.modelInternet.email_addr: this.obj_personnel.CONTACT.modelInternet.url,
				INTERNET_ID: Max,
				EMAIL_FL: isEmail?1:0,
				REC_STAT_FL: 1,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};
			var entity = EntityManager().createEntity("INTERNET_TRX", internet_trx);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((saveSuccess)=>{
				toastr.clear();
				toastr.success("", "The "+(isEmail?"Email":"Website")+ " successfully added.");
				this.loadMain_EmailWeb(this.obj_personnel.global_indiv_id);
				this.clearEmailWebData();
				// this.loadLog(this.obj_personnel.global_indiv_id);
				this.loadLog_V2(this.obj_personnel.global_indiv_id);
			}, (errorSave)=>{

				settings.isNavigating = false;
				if(entity != null){
					entity.entityAspect.setDeleted();
				}

				toastr.clear();
				toastr.success(errorSave, "Error in saving "+(isEmail?"Email.":"Website."));
			});

		});		
	}



  }