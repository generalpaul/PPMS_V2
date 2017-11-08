export class cache_talent{
  //General Info
  _NAME;
  _AGE;
  _CITIZENSHIP;
  _RELIGION;
  _CIVIL_STATUS;
  _GENDER;
  _COUNTRY;
  _LOCATION;
  _TALENT_SUPPLIER;
  _TALENT_HANDLER;
  _INTEREST;
  _SKILL_TALENT;

  //Characteristics
  _HEIGHT;
  _WEIGHT;
  _BUILT;
  _EYE_COLOR;
  _HAIR_COLOR;
  _SKINTONE;
  _VITAL_STATISTICS;
  _SPECIFIC_CHAR;
  _TALENT_TYPE;

  _HAS_FIRED = false;

  //Array
  _CITIZENSHIP_ARR = [{ref:'',desc:''}];
  _RELIGION_ARR = [{ref:'',desc:''}];
  _CIVIL_STATUS_ARR = [{ref:'',desc:''}];
  _GENDER_ARR = [{ref:'',desc:''}, {ref: 'M', desc: 'MALE'}, {ref:'F', desc:'FEMALE'}];
  _COUNTRY_ARR = [{ref:'',desc:''}];
  _LOCATION_ARR = [{ref:'',desc:''}];
  _INTEREST_ARR = [{ref:'',desc:''}];
  _SKILL_TALENT_ARR = [{ref:'',desc:''}];


  QUERY_VAL = [];

  PARTTIME_MSTR;
  CITIZESHIP_MSTR;
  ALIAS_MSTR;
  INDIVIDUAL_MSTR;
  GROUP_MSTR;
  COUNTRY_MSTR;
  INTEREST_MSTR;
  SKILL_TALENT_MSTR;
  CHARACTERISTICS_MSTR;
  ALL_MSTR=[];


}
