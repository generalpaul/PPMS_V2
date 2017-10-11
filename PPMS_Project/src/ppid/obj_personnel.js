export class obj_personnel
{
	global_indiv_id="";	
	editing_status="";
    HEADER = {
    	citizenship:[],
    	group:[]
    };
	CONTACT={
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
	EDUCATIONAL_ACHIEVEMENT={
		status:"",
		model:{},
		list:[]
	};
	CHARACTERISTIC=[];
	SKILLS=[];
	LANGUAGE_DIALECT=[];
	MEDICAL_RECORD=[];
	RELATIVE={
		parents:{
			mother:{},
			father:{}
		}
		// siblings:{
		// 	model:{},
		// 	list:[]
		// },
		// spouse:{},
		// children:{
		// 	model:{},
		// 	list:[]
		// }

	};
	WORK_EXPERIENCE={
		model:{},
		list:[]
	};
	AWARDS=[];
	SEMINARS=[];
	GOVERNMENT_INFO={
		modelTaxAffidavit:{},
		modelPermit:{},
		tax_affidavit:[],
		permits:[]
	};
	GOVERNMENT_EXAM=[];
	CRIMINAL_RECORD=[];
	COMPANY_SPECIFIC={
		model:{
			personnel_bank:{}
		},
		list:[]
	};
	ENDORSEMENT=[];
	IMAGE_BRANDING=[];
	QUESTION_ANSWER=[];
    USER={};
	OBSERVERS={
		ppid_dialog:[],
		tab_changed:[],
		clear_ppid:[],
		clear_log:[],
		clear_login_modal:[],
		maintab_contact_clicked:[],
		maintab_education_clicked:[],		
		company_main_clicked:[],
		company_work_exp_clicked:[],
		govinfo_main_clicked:[],
		relative_parents_clicked:[]

	};

	//Dropdown
	STATUS=[];
	CIVIL_STATUS=[];
	CITIZENSHIP=[];
	RELIGION=[];
	COUNTRY=[];
	REGION=[];
	GROUP=[];
	LOCATIONS=[];
	CONTACT_TYPE=[];
	LEVEL=[];
	YEAR=[];
	SCHOOLS=[];
	LANGUAGE=[];
	POSITION=[];
	AWARD=[];
	TRAINING=[];
	TAX_EXEMPT=[];
	INPUT_TAX=[];
	PERMIT=[];
	VAT_STAT=[];
	EXAM=[];
	CASE_STAT=[];
	VIOLATION=[];
	PROFESSIONAL_TYPE=[];
	CESSATION=[];
	TARGET_MARKET=[];
	COMPANY=[];
	DIVISION=[];
	LOCATIONS_RNG=[];
	CATEGORY=[];
	JOB_GROUP=[];
	JOB=[];
	PAYROLL_GROUP=[];
	BANK=[];
	PROVINCE=[];


	
	constructor(){
	
	}
}