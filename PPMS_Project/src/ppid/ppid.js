import {checkCookie,setCookie,removeCookie} from '.././helpers';
import toastr from "toastr";
import {inject} from 'aurelia-framework';
import {obj_personnel} from './obj_personnel';
import {DialogService} from 'aurelia-dialog';
import {ppid_search} from "./modals/ppid_search";
import {EntityManager,EntityQuery} from '../entity-manager-factory'; 
import {getLookups} from '../masterfiles';

@inject(DialogService, obj_personnel)
export class ppid
{
	obj_personnel = null;
	global_indiv_id="";
	
	
	constructor(dialogService, obj_personnel){
		this.dialogService=dialogService;
		this.obj_personnel = obj_personnel;		

		this.obj_personnel.OBSERVERS.ppid_dialog.length=0;
		this.obj_personnel.OBSERVERS.tab_changed.length=0;
		this.obj_personnel.OBSERVERS.maintab_contact_clicked.length=0;
		this.obj_personnel.OBSERVERS.maintab_education_clicked.length=0;
		this.obj_personnel.OBSERVERS.govinfo_main_clicked.length=0;
		this.obj_personnel.OBSERVERS.company_main_clicked.length=0;
		this.obj_personnel.OBSERVERS.clear_ppid.length=0;
		this.obj_personnel.HEADER = {
    		citizenship:[],
    		group:[]
    	};
		this.LoadDropdown();

		this.LoginPassed(this.obj_personnel.USER);
	}

	LoadDropdown()
	{
		// var _query = EntityQuery().from('GLOBAL_GRP_MSTR')
		// 		.orderBy('GROUP_NAME')
		// 		.select('GLOBAL_GRP_ID, GROUP_NAME');
		// EntityManager().executeQuery(_query).then((success)=>{
		// 	var tmp=[];
		// 	_.each(success.results, (result)=>{
		// 		tmp.push({
		// 			value:result.GLOBAL_GRP_ID ,
		// 			text:result.GROUP_NAME
		// 		});
		// 	});
		// 	this.obj_personnel.GROUP = tmp;
		// },
		// (failed)=>{
		// 	toastr.error(failed,'Error in loading group dropdown.');
		// });
		var maxYear= new Date().getFullYear();
		var leastYear = 1960;
		var tmpYear=[];
		do{
			tmpYear.push({
				value: leastYear,
				text: leastYear
			});
			leastYear++;
		}while(leastYear<=maxYear);
		this.obj_personnel.YEAR = tmpYear;

		if(getLookups() != null){
			this.obj_personnel.LOCATIONS = getLookups().LOCATION_MSTR;
			this.obj_personnel.LOCATIONS.shift(); //Remove "[SELECT A VALUE]" value	

			this.obj_personnel.CIVIL_STATUS.length=0;
			this.obj_personnel.RELIGION.length=0;
			this.obj_personnel.CITIZENSHIP.length=0;
			this.obj_personnel.CONTACT_TYPE.length=0;
			this.obj_personnel.LEVEL.length=0;
			this.obj_personnel.LANGUAGE.length=0;
			this.obj_personnel.STATUS.length=0;
			this.obj_personnel.POSITION.length=0;
			this.obj_personnel.AWARD.length=0;
			this.obj_personnel.TRAINING.length=0;
			this.obj_personnel.TAX_EXEMPT.length=0;
			this.obj_personnel.INPUT_TAX.length=0;
			this.obj_personnel.PERMIT.length=0;
			this.obj_personnel.VAT_STAT.length=0;
			this.obj_personnel.EXAM.length=0;
			this.obj_personnel.CASE_STAT.length=0;
			this.obj_personnel.VIOLATION.length=0;
			this.obj_personnel.PROFESSIONAL_TYPE.length=0;
			this.obj_personnel.CESSATION.length=0;
			this.obj_personnel.TARGET_MARKET.length=0;

			getLookups().REFERENCE_CD_MSTR.forEach((item)=>{
				switch(item.REF_GRP_CD){
					case "CIVIL_STATUS": 	this.obj_personnel.CIVIL_STATUS.push({
											value: item.REF_CD,
											text: item.REF_DESC
											});
											break;
					case "RELIGION_CD": 	this.obj_personnel.RELIGION.push({
											value: item.REF_CD,
											text: item.REF_DESC
											});
											break;
					case "CITIZENSHIP_CD": 	this.obj_personnel.CITIZENSHIP.push({
											value: item.REF_CD,
											text: item.REF_DESC
											});
											break;
					case "CONTACT_TYPE_CD": this.obj_personnel.CONTACT_TYPE.push({
											value: item.REF_CD,
											text: item.REF_DESC
											});
											break;
					case "LEVEL_CD": 	this.obj_personnel.LEVEL.push({
											value: item.REF_CD,
											text: item.REF_DESC
										});
										break;
					case "LANG_DIALECT_CD":	this.obj_personnel.LANGUAGE.push({
												value: item.REF_CD,
												text: item.REF_DESC												
											});
											break;
					case "STATUS_CD": 	this.obj_personnel.STATUS.push({
											value: item.REF_CD,
											text: item.REF_DESC
										});
										break;
					case "POSITION_CD": this.obj_personnel.POSITION.push({
											value: item.REF_CD,
											text: item.REF_DESC
										});
										break;
					case "AWARD_CD": 	this.obj_personnel.AWARD.push({
											value: item.REF_CD,
											text: item.REF_DESC
										});
										break;
					case "TRNG_CD": 	this.obj_personnel.TRAINING.push({
											value: item.REF_CD,
											text: item.REF_DESC
										});
										break;
					case "TAX_EXEMPT_CD":	this.obj_personnel.TAX_EXEMPT.push({
												value: item.REF_CD,
												text: item.REF_DESC
											});
											break;
					case "INPUT_TAX_CD": 	this.obj_personnel.INPUT_TAX.push({
												value: item.REF_CD,
												text: item.REF_DESC
											});
											break;
					case "PERMIT_CD": 	this.obj_personnel.PERMIT.push({
											value: item.REF_CD,
											text: item.REF_DESC
										});
										break;
					case "VAT_STAT_CD": this.obj_personnel.VAT_STAT.push({
											value: item.REF_CD,
											text: item.REF_DESC
										});
										break;
					case "EXAM_CD": this.obj_personnel.EXAM.push({
										value: item.REF_CD,
										text: item.REF_DESC
									});
									break;
					case "CASE_STAT_CD": 	this.obj_personnel.CASE_STAT.push({
												value: item.REF_CD,
												text: item.REF_DESC
											});
											break;
					case "VIOLATION_CD": 	this.obj_personnel.VIOLATION.push({
												value: item.REF_CD,
												text: item.REF_DESC
											});
											break;
					case "PROFESSIONAL_TYPE_CD": 	this.obj_personnel.PROFESSIONAL_TYPE.push({
														value: item.REF_CD,
														text: item.REF_DESC
													});
													break;
					case "CESSATION_CODE": 	this.obj_personnel.CESSATION.push({
												value: item.REF_CD,
												text: item.REF_DESC
											});
											break;
					case "TARGET_MARKET_CD": 	this.obj_personnel.TARGET_MARKET.push({
													value: item.REF_CD,
													text: item.REF_DESC
												});
												break;

				}
			});

			this.obj_personnel.GROUP.length=0;
			getLookups().GLOBAL_GRP_MSTR.forEach((item)=>{
				this.obj_personnel.GROUP.push({
					value: item.GLOBAL_GRP_ID,
					text: item.GROUP_NAME
				});
			});

			this.obj_personnel.COMPANY.length=0;
			getLookups().COMPANY_MSTR.forEach((item)=>{
				this.obj_personnel.COMPANY.push({
					id: item.COMPANY_ID,
					value: item.COMPANY_CD,
					text: item.COMPANY_NAME
				});
			});
			this.obj_personnel.COMPANY.shift();

			// this.obj_personnel.DIVISION.length=0;
			// getLookups().DIVISION_MSTR.forEach((item)=>{
			// 	this.obj_personnel.DIVISION.push({
			// 		group: item.COMPANY_ID,
			// 		value: item.DIVISION_CD,
			// 		text: item.DIVISION_NAME
			// 	});
			// });

			// order all
			this.obj_personnel.GROUP.sort(this.OrderByText);
			this.obj_personnel.CIVIL_STATUS.sort(this.OrderByText);
			this.obj_personnel.RELIGION.sort(this.OrderByText);
			this.obj_personnel.CITIZENSHIP.sort(this.OrderByText);
			this.obj_personnel.CONTACT_TYPE.sort(this.OrderByText);
			this.obj_personnel.LEVEL.sort(this.OrderByText);
			this.obj_personnel.LANGUAGE.sort(this.OrderByText);
			this.obj_personnel.STATUS.sort(this.OrderByText);
			this.obj_personnel.POSITION.sort(this.OrderByText);
			this.obj_personnel.AWARD.sort(this.OrderByText);
			this.obj_personnel.TRAINING.sort(this.OrderByText);
			this.obj_personnel.PERMIT.sort(this.OrderByText);
			this.obj_personnel.TAX_EXEMPT.sort(this.OrderByText);
			this.obj_personnel.INPUT_TAX.sort(this.OrderByText);
			this.obj_personnel.EXAM.sort(this.OrderByText);
			this.obj_personnel.VIOLATION.sort(this.OrderByText);
			this.obj_personnel.PROFESSIONAL_TYPE.sort(this.OrderByText);
			this.obj_personnel.CESSATION.sort(this.OrderByText);
			this.obj_personnel.TARGET_MARKET.sort(this.OrderByText);
			this.obj_personnel.COMPANY.sort(this.OrderByText);
			
		}

		var _query = EntityQuery().from('COUNTRY_MSTR')
				.orderBy('COUNTRY_NAME')
				.select('COUNTRY_CD, COUNTRY_NAME');
		EntityManager().executeQuery(_query).then((success)=>{
			var tmp=[];
			_.each(success.results, (result)=>{
				tmp.push({
					value:result.COUNTRY_CD ,
					text:result.COUNTRY_NAME
				});
			});
			this.obj_personnel.COUNTRY = tmp;
		},
		(failed)=>{
			toastr.error(failed,'Error in loading country dropdown.');
		});

		_query = EntityQuery().from('REGION_MSTR')
				 .orderBy('REGION_DESC')
				 .select('REGION_CD, REGION_DESC, COUNTRY_CD');
		EntityManager().executeQuery(_query).then((success)=>{
			var tmp=[];
			_.each(success.results, (result)=>{
				tmp.push({
					value: result.REGION_CD,
					text: result.REGION_DESC,
					group: result.COUNTRY_CD
				});
			});
			this.obj_personnel.REGION = tmp;
		}, (failed)=>{
			toastr.error(failed, 'Error in loading region dropdown.');
		});

		_query = EntityQuery().from("SCHOOL_MSTR")
				.orderBy("SCHOOL_NAME")
				.select("SCHOOL_CD, SCHOOL_NAME, SCHOOL_ADDR");
		EntityManager().executeQuery(_query).then((success)=>{
			var tmp = [];
			_.each(success.results, (result)=>{
				tmp.push({
					school_cd: result.SCHOOL_CD,
					school_name: result.SCHOOL_NAME,
					school_addr: result.SCHOOL_ADDR
				});
			});
			this.obj_personnel.SCHOOLS = tmp;
		}, (failed)=>{
			toastr.error(failed, "Error in loading schools dropdown.");
			console.log(failed);
		});

		_query = EntityQuery().from("RNG_LOCATION_MSTR")
				 .orderBy("LOCATION_NAME");
		EntityManager().executeQuery(_query).then((success)=>{
			var tmp = [];
			_.each(success.results, (result)=>{
				tmp.push({
					value: result.LOCATION_CD,
					text: result.LOCATION_NAME
				});
			});
			this.obj_personnel.LOCATIONS_RNG = tmp;
		}, (failed)=>{
			toastr.error(failed, "Error in loading RNG Locations dropdown");
		});

		_query = EntityQuery().from("PAYROLL_GRP_MSTR")
				 .orderBy("PAYROLL_GRP_DESC");
		EntityManager().executeQuery(_query).then((success)=>{
			var tmp = [];
			_.each(success.results, (result)=>{
				tmp.push({
					id: result.PAYROLL_GRP_ID,					
					value: result.PAYROLL_GRP_CD,
					text: result.PAYROLL_GRP_DESC
				});				
			});
			this.obj_personnel.PAYROLL_GROUP = tmp;
		}, (failed)=>{
			toastr.error(failed, "Error in loading Payroll Group dropdown.");
		});

		_query = EntityQuery().from("BANK_MSTR")
				 .orderBy("BANK_SHORT_NAME");
		EntityManager().executeQuery(_query).then((success)=>{
			var tmp=[];
			_.each(success.results, (result)=>{
				tmp.push({
					id: result.BANK_ID,
					short_nm: result.BANK_SHORT_NAME,
					bank_cd: result.BANK_CD,
					long_nm: result.BANK_LONG_NAME
				});
			});
			this.obj_personnel.BANK = tmp;
		}, (failed)=>{
			toastr.error(failed,"Error in loading Bank dropdown");
		});

	}

	OrderByText(a, b){
		if(a.text.toUpperCase() < b.text.toUpperCase())
			return -1;
		if(a.text.toUpperCase() > b.text.toUpperCase())
			return 1;
		return 0;
	}
	
	
	changeTab(tabNumber)
	{
		if(this.obj_personnel.global_indiv_id == undefined || this.obj_personnel.global_indiv_id == null || this.obj_personnel.global_indiv_id.length==0)
			return;

		this.obj_personnel.OBSERVERS.tab_changed.forEach((all)=>{
			all(tabNumber, this.obj_personnel.global_indiv_id);
		});
	}	
	
	FindUsers()
	{	
		this.dialogService.open({
			viewModel: ppid_search
		}).whenClosed(response=>{
			if(!response.wasCancelled)
			{
				console.log(response.output);
				//var arr = response.output.split('|');
				//var global_id = arr[0];
				//var tin = arr[1];
				//var group = arr[2];
				//var last_name = arr[3];
				//var first_name = arr[4];
				//var nick_name = arr[5];
				//var project_name = arr[6];
				//var country = arr[7];
				//alert("Global_id:"+global_id+"\nTin:"+tin+"\nGroup:"+group+"\nLast Name:"+last_name+"\nFirst Name:"+first_name+"\nNick Name:"+nick_name+"\nProject Name:"+project_name+"\nCountry:"+country);
			}else
			{
				console.log('reponse was cancelled.');
			}
		});
	}
	
	AddUsers()
	{
		alert('AddUsers function under maintenance.');
	}

	LoginPassed(user){
		// console.log(user);
		// this.obj_personnel.USER = user;
	}
}