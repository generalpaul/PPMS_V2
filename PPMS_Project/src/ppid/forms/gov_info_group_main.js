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
export class gov_info_group_main{
	
	obj_personnel = null;
	alreadyLoaded = false;
	_disableOtherGovernmentInfo = true;
	lblCreatedBy = null;
	lblUpdatedBy = null;


	constructor(obj_personnel, toastr, DialogService){

		$("#affidavit_dt").datepicker();
		this.obj_personnel = obj_personnel;
		this.DialogService = DialogService;
		this.obj_personnel.OBSERVERS.tab_changed.push((tab_num,global_id)=>{
			if(tab_num==3){
				if(!this.alreadyLoaded){
					this.alreadyLoaded = false;
					$("#affidavit_dt").datepicker();
					$("#expiry_dt").datepicker();
					$("#vat_reg_dt").datepicker();
					toastr.clear();
					toastr.info("", "Loading data...");
					this.load_TaxInformation(global_id);
					this.load_TaxAffidavit(global_id);
					this.load_Permit(global_id);
					this.clearTaxAffidavitField();
				}
			}

			
			if(this.obj_personnel.USER.COMPANY_ID == 1){
				this._disableOtherGovernmentInfo = false;
			}
		});

		this.obj_personnel.OBSERVERS.govinfo_tab_changed.push((tab_num, global_id)=>{
			if(tab_num == 0){
				this.load_TaxInformation(global_id);
				this.load_TaxAffidavit(global_id);
				this.load_Permit(global_id);
				this.clearTaxAffidavitField();
			}
		});

		this.obj_personnel.OBSERVERS.clear_ppid.push(()=>{
			this.obj_personnel.GOVERNMENT_INFO = {				
				modelTaxAffidavit:{},
				modelPermit:{},
				tax_affidavit:[],
				permits:[]
			};
			this.alreadyLoaded=false;
		});

	}


	formatDate(strDate){
		if(strDate == null || strDate.length == 0)
			return "";
		var dt = new Date(strDate);
		var month = dt.getMonth()+1;
		var day = dt.getDate();
		var year = dt.getFullYear();
		return ('0'+month).slice(-2)+'/'+('0'+day).slice(-2)+'/'+("000"+year).slice(-4);
	}

	convertToGMT8(date){
		if(date==undefined || date == null || date.length==0)
			return null;
		var tempDt = moment(date).add(8, 'hours');
		return new Date(tempDt);
	}


	validate_input(input, type){
		switch(type){
			case "PAGIBIG": 
					var pagibig = /^(?:\d{4}-\d{4}-\d{4})$/;
					return pagibig.test(input);
			case "SSS":
					var sss = /^(?:\d{2}-\d{7}-\d{1})$/;
					return sss.test(input);
			case "PHILHEALTH":
					var philhealth = /^(?:\d{2}-\d{9}-\d{1})$/;
					return philhealth.test(input);
			default: return false;
		}
	}



	load_TaxInformation(global_id){		

		settings.isNavigating = true;
		this.obj_personnel.GOVERNMENT_INFO.tax_exempt_cd = "--";
		// var query = EntityQuery().from("GLOBAL_INDIV_MSTR")
		// 			.where("GLOBAL_INDIV_ID", "==", global_id);
		// EntityManager().executeQuery(query).then((querySuccess)=>{
			
		// 	this.obj_personnel.GOVERNMENT_INFO.tax_exempt_cd = querySuccess.results[0].TAX_EXEMPT_CD;
		// 	this.obj_personnel.GOVERNMENT_INFO.sss_no = querySuccess.results[0].SSS_NO;
		// 	this.obj_personnel.GOVERNMENT_INFO.pagibig_no = querySuccess.results[0].PAGIBIG_NO;
		// 	this.obj_personnel.GOVERNMENT_INFO.philhealth_no = querySuccess.results[0].PHILHEALTH_NO;
		// 	this.obj_personnel.GOVERNMENT_INFO.national_id = querySuccess.results[0].NATIONAL_ID;
		// 	this.obj_personnel.GOVERNMENT_INFO.voters_id = querySuccess.results[0].VOTERS_ID;
		// 	if(querySuccess.results[0].CREATED_BY != null){
		// 		var _user = querySuccess.results[0].CREATED_BY;
		// 		var _date = moment.utc(querySuccess.results[0].CREATED_DT).format("MM/DD/YYYY hh:mm A");
		// 		this.lblCreatedBy = _user + ' '+ _date;				
		// 	}else{
		// 		this.lblCreatedBy = "";
		// 	}

		// 	if(querySuccess.results[0].LAST_UPDATED_BY != null){
		// 		var _user = querySuccess.results[0].LAST_UPDATED_BY;
		// 		var _date = moment.utc(querySuccess.results[0].LAST_UPDATED_DT).format("MM/DD/YYYY hh:mm A");
		// 		this.lblUpdatedBy = _user+ ' ' + _date;
		// 	}else{
		// 		this.lblUpdatedBy = "";
		// 	}

		// 	toastr.clear();
		// 	settings.isNavigating = false;


		// }, (errorQuery)=>{
		// 	settings.isNavigating = false;
		// 	toastr.error(errorQuery, "Error in loading Government information.");
		// });

		var query = EntityQuery().from("GLOBAL_MSTR")
				.where("GLOBAL_ID","==", global_id);
		EntityManager().executeQuery(query).then((querySuccess)=>{
			this.obj_personnel.GOVERNMENT_INFO.input_tax_cd = querySuccess.results[0].INPUT_TAX_CD;
			this.obj_personnel.GOVERNMENT_INFO.tin = querySuccess.results[0].TIN;
			this.obj_personnel.GOVERNMENT_INFO.vat_reg_dt = this.formatDate(querySuccess.results[0].VAT_REG_DT);
			this.obj_personnel.GOVERNMENT_INFO.vat_stat_cd = querySuccess.results[0].VAT_STAT_CD;
			toastr.success("","Tax Information has been loaded.");
			settings.isNavigating = false;
		}, (errorQuery)=>{
			settings.isNavigating = false;
			toastr.error(errorQuery, "Error in loading Government information.");
		});
	}

	load_TaxAffidavit(global_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("TAX_AFFIDAVIT_TRX")
					.where("GLOBAL_ID", "==", global_id);
		EntityManager().executeQuery(query).then((querySuccess)=>{
			this.obj_personnel.GOVERNMENT_INFO.tax_affidavit=[];
			var tmpList = [];
			_.each(querySuccess.results, (result)=>{
				tmpList.push({
					tax_affidavit_id: result.TAX_AFFIDAVIT_ID,
					affidavit_no: result.AFFIDAVIT_NO,
					affidavit_dt: this.formatDate(result.AFFIDAVIT_DT)
				});
			});
			this.obj_personnel.GOVERNMENT_INFO.tax_affidavit = tmpList;
			settings.isNavigating = false;			
		}, (errorQuery)=>{
			settings.isNavigating = false;
			toastr.error(errorQuery, "Error in loading tax affidavit");
		});
	}

	load_Permit(global_id){

		settings.isNavigating = true;
		var query = EntityQuery().from("PERMIT_TRX")
					.where("GLOBAL_ID", "==", global_id);

		EntityManager().executeQuery(query).then((successQuery)=>{
			var tmpList=[];
			_.each(successQuery.results, (result)=>{
				var place = this.obj_personnel.LOCATIONS.find((x)=>{
					return x.LOCATION_CD == result.PLACE_OF_ISSUE;
				});

				var permit = this.obj_personnel.PERMIT.find((x)=>{
					return x.value == result.PERMIT_CD;
				});

				tmpList.push({
					global_id: result.GLOBAL_ID,
					permit_no: result.PERMIT_NO,
					expiry_dt: this.formatDate(result.EXPIRY_DT),
					permit_cd: result.PERMIT_CD,
					agency_cd: result.AGENCY_CD,
					permit_id: result.PERMIT_ID,
					grant_dt: result.GRANT_DT,
					place_of_issue: result.PLACE_OF_ISSUE,
					poi: place.LOCATION_DESC,
					permit_name: permit.text
				});
			});
			this.obj_personnel.GOVERNMENT_INFO.permits = tmpList;
			settings.isNavigating = false;
		}, (errorQuery)=>{
			settings.isNavigating = false;
			toastr.error(errorQuery, "Error in loading permits.");
		});
	}

	clearTaxAffidavitField(){
		settings.isNavigating = false;
		this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no = "";
		this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt = "";
		//$("#affidavit_dt").val("");
	}

	btnAdd_TaxAffidavit(){
		var strValidation="";

		if(this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no == undefined || this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no == null || this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no.length==0){
			strValidation += "Affidavit no is required.<br/>";
		}

		this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt = $("#affidavit_dt").val();
		if(this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt == undefined || this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt == null || this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt.length==0){
			strValidation += "Affidavit date is required.<br/>";
		}else{
			if(!moment(this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt).isValid()){
				strValidation += "Invalid affidavit dt.<br/>";
			}
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			this.insertTaxAffidavit();
		}

	}

	btnRemove_TaxAffidavit(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the tax affidavit?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
  					settings.isNavigating = true;
	  				//alert("Confirmed delete.");
  					var query = EntityQuery().from('TAX_AFFIDAVIT_TRX').where('TAX_AFFIDAVIT_ID', '==', item.tax_affidavit_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.success("","The tax affidavit was successfully removed.");
  							this.load_TaxAffidavit(this.obj_personnel.global_indiv_id);
  						},(error)=>{
  							settings.isNavigating = false;
  							toastr.clear();
  							toastr.error("", "Error in removing tax affidavit.");
  						});
  					});
  				}
  		});
	}

	insertTaxAffidavit(){

		settings.isNavigating = true;
		var dateToday = null;
		dateToday = new moment(new Date()).add(8, 'hours');
		dateToday = new Date(dateToday);
		var query = EntityQuery().from("TAX_AFFIDAVIT_TRX")
					.orderByDesc("TAX_AFFIDAVIT_ID").take(1);
		EntityManager().executeQuery(query).then((querySuccess)=>{
			var Max = 1;
			if(querySuccess.results.length>0){
				Max = querySuccess.results[0].TAX_AFFIDAVIT_ID+1;
			}

			var tax_affidavit = {
				GLOBAL_ID: this.obj_personnel.global_indiv_id,
				AFFIDAVIT_NO: this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no,
				TAX_AFFIDAVIT_ID: Max,
				AFFIDAVIT_DT: this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt,
				RELEASE_DT: dateToday,
				RETURN_DT: dateToday,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			}
			var entity = EntityManager().createEntity("TAX_AFFIDAVIT_TRX", tax_affidavit);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((saveSuccess)=>{
				toastr.clear();
				toastr.success(saveSuccess, "Record saved.");
				this.load_TaxAffidavit(this.obj_personnel.global_indiv_id);
				this.clearTaxAffidavitField();
			}, (errorSave)=>{
				settings.isNavigating = false;
				if(entity!=null){
					entity.entityAspect.setDeleted();
				}
				toastr.error(errorQuery, "Error in saving Tax affidavit.");
			});


		}, (errorQuery)=>{
			settings.isNavigating = false;
			toastr.error(errorQuery, "Error in querying Tax affidavit id.");
		});
	}

	clearPermitField(){
		settings.isNavigating = false;
		this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd="";
		this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no="";
		this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt="";
		this.obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue="";
	}

	btnAdd_Permit(){
		var strValidation="";

		if(this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd == undefined || this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd == null || this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd.length==0){
			strValidation+="No Permit type specified.<br/>";
		}

		if(this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no == undefined || this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no == null || this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no.length==0){
			strValidation+="No Permit number specified.<br/>";
		}

		this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt = $("#expiry_dt").val();
		if(this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt == undefined || this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt == null || this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt.length==0){
			strValidation+="No expiry date specified.<br/>";
		}else{
			if(!moment(this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt).isValid()){
				strValidation+="Invalid expiry date.<br/>";
			}
		}

		if(this.obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue == undefined || this.obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue == null || this.obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue.length==0){
			strValidation+="No place of issuance specified.<br/>";
		}

		if(strValidation.length>0){
			toastr.clear();
			toastr.error("", strValidation);
		}else{
			this.insertPermit();
		}


	}

	btnUpdate_Permit(item){

	}

	btnRemove_Permit(item){
		this.DialogService.open({ viewModel: DialogBox, model: { title:"Confirm remove.", message:"Are you sure you want to remove the permit?" } })
  			.whenClosed(response=>{
  				if(!response.wasCancelled){
	  				//alert("Confirmed delete.");
	  				settings.isNavigating = true;
  					var query = EntityQuery().from('PERMIT_TRX').where('PERMIT_ID', '==', item.permit_id);
  					EntityManager().executeQuery(query).then((success)=>{
  						
  						success.results[0].entityAspect.setDeleted();

  						EntityManager().saveChanges().then((saveSuccess)=>{
  							toastr.success("","The permit was successfully removed.");
  							this.load_Permit(this.obj_personnel.global_indiv_id);
  						},(error)=>{
  							settings.isNavigating = false;
  							toastr.clear();
  							toastr.error("", "Error in removing permit.");
  						});
  					});
  				}
  		});
	}

	insertPermit(){

		settings.isNavigating = true;
		var dateToday = null;
		dateToday = new moment(new Date()).add(8, 'hours');
		dateToday = new Date(dateToday);
		var query = EntityQuery().from("PERMIT_TRX")
					.orderByDesc("PERMIT_ID").take(1);
		EntityManager().executeQuery(query).then((querySuccess)=>{
			var Max = 1;
			if(querySuccess.results.length>0){
				Max = querySuccess.results[0].PERMIT_ID+1;
			}

			var permit = {
				GLOBAL_ID: this.obj_personnel.global_indiv_id,
				PERMIT_NO: this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no,
				EXPIRY_DT: this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt,
				PERMIT_CD: this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd,
				 AGENCY_CD: this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd,
				PERMIT_ID: Max,
				PLACE_OF_ISSUE: this.obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday
			};

			var entity = EntityManager().createEntity("PERMIT_TRX", permit);
			EntityManager().addEntity(entity);
			EntityManager().saveChanges().then((saveSuccess)=>{
				toastr.clear();
				toastr.success("", "Record saved.");
				this.load_Permit(this.obj_personnel.global_indiv_id);
				this.clearPermitField();
			}, (errorSave)=>{
				settings.isNavigating = false;
				if(entity != null){
					entity.entityAspect.setDeleted();
				}
				toastr.clear();
				toastr.error("", errorSave);
			});
		});
	}
	
	validate(){

		this.obj_personnel.GOVERNMENT_INFO.pagibig_no = $("#_pagibig").val();
		this.obj_personnel.GOVERNMENT_INFO.philhealth_no = $("#_philhealth").val();
		this.obj_personnel.GOVERNMENT_INFO.sss_no = $("#_sss").val();
		var strValidation="";

		// if(this.obj_personnel.GOVERNMENT_INFO.pagibig_no.length>0){
		// 	if(this.obj_personnel.GOVERNMENT_INFO.pagibig_no != "____-____-____" && !this.validate_input(this.obj_personnel.GOVERNMENT_INFO.pagibig_no, "PAGIBIG")){
		// 		strValidation+="Invalid Pag-ibig No.<br/>";
		// 	}
		// }else{
		// 	// this.obj_personnel.GOVERNMENT_INFO.pagibig_no = "0000-0000-0000";
		// }

		// if(this.obj_personnel.GOVERNMENT_INFO.sss_no.length>0){
		// 	if(this.obj_personnel.GOVERNMENT_INFO.sss_no != "__-_______-_" &&  !this.validate_input(this.obj_personnel.GOVERNMENT_INFO.sss_no, "SSS")){
		// 		strValidation+="Invalid SSS No.<br/>";
		// 		console.log(this.obj_personnel.GOVERNMENT_INFO.sss_no);
		// 	}
		// }else{
		// 	// this.obj_personnel.GOVERNMENT_INFO.sss_no = "00-0000000-0";
		// }

		// if(this.obj_personnel.GOVERNMENT_INFO.philhealth_no.length>0){
		// 	if(this.obj_personnel.GOVERNMENT_INFO.philhealth_no != "__-_________-_" && !this.validate_input(this.obj_personnel.GOVERNMENT_INFO.philhealth_no, "PHILHEALTH")){
		// 		strValidation+="Invalid Philhealth No.<br/>";
		// 	}
		// }else{
		// 	// this.obj_personnel.GOVERNMENT_INFO.philhealth_no = "00-000000000-0";
		// }

		// this.obj_personnel.GOVERNMENT_INFO.vat_reg_dt = $("#vat_reg_dt").val();

		if(strValidation.length>0){
			toastr.clear();			
			toastr.error("", strValidation);
		}else{
			this.update();
		}

	}

	update(){

		settings.isNavigating = true;

		var dateToday = null;
		dateToday = new moment(new Date()).add(8, 'hours');
		dateToday = new Date(dateToday);

		var philhealth = null;
		var pagibig = null;
		var sss =null;
		// if(this.obj_personnel.GOVERNMENT_INFO.philhealth_no != "__-_________-_")
		// {
		// 	philhealth=this.obj_personnel.GOVERNMENT_INFO.philhealth_no;
		// }

		// if(this.obj_personnel.GOVERNMENT_INFO.pagibig_no != "____-____-____")
		// {
		// 	pagibig=this.obj_personnel.GOVERNMENT_INFO.pagibig_no;
		// }

		// if(this.obj_personnel.GOVERNMENT_INFO.sss_no != "__-_______-_")
		// {
		// 	sss=this.obj_personnel.GOVERNMENT_INFO.sss_no;
		// }

		var query=EntityQuery().from("GLOBAL_MSTR")
					.where("GLOBAL_ID", "==", this.obj_personnel.global_indiv_id);
		EntityManager().executeQuery(query).then((querySuccess2)=>{
			querySuccess2.results[0].INPUT_TAX_CD = this.obj_personnel.GOVERNMENT_INFO.input_tax_cd;
			querySuccess2.results[0].VAT_REG_DT = this.convertToGMT8(this.obj_personnel.GOVERNMENT_INFO.vat_reg_dt);
			querySuccess2.results[0].VAT_STAT_CD = this.obj_personnel.GOVERNMENT_INFO.vat_stat_cd;
			querySuccess2.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
			querySuccess2.results[0].LAST_UPDATED_DT = dateToday;

			EntityManager().saveChanges().then((save2)=>{
				toastr.clear();
				toastr.success("", "Record saved.");
				settings.isNavigating = false;
			}, (error2)=>{
				settings.isNavigating = false;
				toastr.clear();
				toastr.error("", error2);
			});

		});


		// var query = EntityQuery().from("GLOBAL_INDIV_MSTR")
		// 			.where("GLOBAL_INDIV_ID", "==", this.obj_personnel.global_indiv_id);
		// EntityManager().executeQuery(query).then((querySuccess1)=>{
		// 	querySuccess1.results[0].TAX_EXEMPT_CD = this.obj_personnel.GOVERNMENT_INFO.tax_exempt_cd;
		// 	// querySuccess1.results[0].SSS_NO = this.obj_personnel.GOVERNMENT_INFO.sss_no;
		// 	// querySuccess1.results[0].PAGIBIG_NO = this.obj_personnel.GOVERNMENT_INFO.pagibig_no;
		// 	// querySuccess1.results[0].PHILHEALTH_NO = this.obj_personnel.GOVERNMENT_INFO.philhealth_no;			
		// 	querySuccess1.results[0].SSS_NO = sss;
		// 	querySuccess1.results[0].PAGIBIG_NO = pagibig;
		// 	querySuccess1.results[0].PHILHEALTH_NO = philhealth;
		// 	querySuccess1.results[0].NATIONAL_ID = this.obj_personnel.GOVERNMENT_INFO.national_id;
		// 	querySuccess1.results[0].VOTERS_ID = this.obj_personnel.GOVERNMENT_INFO.voters_id;
		// 	querySuccess1.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
		// 	querySuccess1.results[0].LAST_UPDATED_DT = dateToday;
		// 	EntityManager().saveChanges().then((save1)=>{
				
		// 		query=EntityQuery().from("GLOBAL_MSTR")
		// 			  .where("GLOBAL_ID", "==", this.obj_personnel.global_indiv_id);
		// 		EntityManager().executeQuery(query).then((querySuccess2)=>{
		// 			querySuccess2.results[0].INPUT_TAX_CD = this.obj_personnel.GOVERNMENT_INFO.input_tax_cd;
		// 			querySuccess2.results[0].VAT_REG_DT = this.convertToGMT8(this.obj_personnel.GOVERNMENT_INFO.vat_reg_dt);
		// 			querySuccess2.results[0].VAT_STAT_CD = this.obj_personnel.GOVERNMENT_INFO.vat_stat_cd;
		// 			querySuccess2.results[0].LAST_UPDATED_BY = this.obj_personnel.USER.USER_ID;
		// 			querySuccess2.results[0].LAST_UPDATED_DT = dateToday;

		// 			EntityManager().saveChanges().then((save2)=>{
		// 				toastr.clear();
		// 				toastr.success("", "Record saved.");
		// 				settings.isNavigating = false;
		// 			}, (error2)=>{
		// 				settings.isNavigating = false;
		// 				toastr.clear();
		// 				toastr.error("", error2);
		// 			});

		// 		});

		// 	}, (error1)=>{
		// 		settings.isNavigating = false;
		// 		toastr.clear();
		// 		toastr.error("", error1);
		// 	});
		// }, (queryError1)=>{
		// 	settings.isNavigating = false;
		// 	toastr.clear();
		// 	toastr.error(queryError1, "Error in querying other government info.");
		// });
	}

	//source: https://stackoverflow.com/questions/12578507/how-to-implement-an-input-with-a-mask
	isDigit(event){
		if ((event.charCode >= 48 && event.charCode <= 57) || event.keyCode == 9 || event.keyCode == 10 || event.keyCode == 13 || event.keyCode == 8 || event.keyCode == 116 || event.keyCode == 46 || (event.keyCode <= 40 && event.keyCode >= 37)) {
    		return true;
  		} else {
    		return false;
  		}  		
	}

	//source: https://stackoverflow.com/questions/12578507/how-to-implement-an-input-with-a-mask
	input_mask(id, mask){
		var myMask = mask;
  		var myCaja = document.getElementById(id);
  		var myText = "";
  		var myNumbers = [];
  		var myOutPut = ""
  		var theLastPos = 1;
  		myText = myCaja.value;
  		//get numbers
  		for (var i = 0; i < myText.length; i++) {
    		if (!isNaN(myText.charAt(i)) && myText.charAt(i) != " ") {
      			myNumbers.push(myText.charAt(i));
    		}
  		}
  //write over mask
  		for (var j = 0; j < myMask.length; j++) {
    		if (myMask.charAt(j) == "_") { //replace "_" by a number 
      			if (myNumbers.length == 0)
        			myOutPut = myOutPut + myMask.charAt(j);
      			else {
        			myOutPut = myOutPut + myNumbers.shift();
        			theLastPos = j + 1; //set caret position
      			}
    		} else {
      			myOutPut = myOutPut + myMask.charAt(j);
    		}
  		}

  		document.getElementById(id).value = myOutPut;
  		document.getElementById(id).setSelectionRange(theLastPos, theLastPos);
	}
}