import {bindable,inject} from 'aurelia-framework';
import { EntityManager, EntityQuery} from 'entity-manager-factory';
import settings from 'settings';
import moment from 'moment';
import _ from 'underscore';
import breeze from 'breeze-client';
import { cache_talent} from 'ppid/talent_search/cache_talent';

@inject(cache_talent)

export class talent_search {
  _CACHE_TALENT;

  constructor(cache_talent) {
      if (EntityManager() === undefined) {
        return;
      }

      this._CACHE_TALENT = cache_talent;

      this.initialize();
  }

  initialize()
  {
    EntityManager().executeQuery(EntityQuery().from('REFERENCE_CD_MSTR').where('REF_GRP_CD', '==', 'CITIZENSHIP_CD').orderBy('REF_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._CACHE_TALENT._CITIZENSHIP_ARR.push({ref:all.REF_CD, desc: all.REF_DESC});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('REFERENCE_CD_MSTR').where('REF_GRP_CD', '==', 'RELIGION_CD').orderBy('REF_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._CACHE_TALENT._RELIGION_ARR.push({ref:all.REF_CD, desc: all.REF_DESC});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('REFERENCE_CD_MSTR').where('REF_GRP_CD', '==', 'CIVIL_STATUS').orderBy('REF_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._CACHE_TALENT._CIVIL_STATUS_ARR.push({ref:all.REF_CD, desc: all.REF_DESC});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('COUNTRY_MSTR').orderBy('COUNTRY_NAME')).then((found) => {
      found.results.forEach((all)=>{
        this._CACHE_TALENT._COUNTRY_ARR.push({ref:all.COUNTRY_CD, desc: all.COUNTRY_NAME});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('LOCATION_MSTR').orderBy('LOCATION_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._CACHE_TALENT._LOCATION_ARR.push({ref:all.LOCATION_CD, desc: all.LOCATION_DESC});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('INTEREST_MSTR').orderBy('INTEREST_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._CACHE_TALENT._INTEREST_ARR.push({ref:all.INTEREST_CD, desc: all.INTEREST_DESC});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('SKILL_TALENT_MSTR').orderBy('SKILL_TALENT_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._CACHE_TALENT._SKILL_TALENT_ARR.push({ref:all.SKILL_TALENT_CD, desc: all.SKILL_TALENT_DESC});
      });
    });

    this.getParttimeMstr();
    this.getCountry();
    this.getCitizenship();
    this.getAlias();
    this.getIndividual();
    this.getGroup();
    this.getInterest();
    this.getSkillTalent();
    this.getCharacteristics();
  }



  getParttimeMstr() {
    return new Promise((resolve)=>{
      EntityQuery().from('PARTTIME_MSTR').select('PARTTIME_ID, COUNTRY_BASE_CD, LOCATION_BASE_CD')
      .using(EntityManager()).execute()
      .then((success)=>{
        this._CACHE_TALENT.PARTTIME_MSTR = success.results;
        resolve(true);
      });
    });
  }

  getCountry(){
    return new Promise((resolve)=>{
      EntityQuery().from('COUNTRY_MSTR').select('COUNTRY_CD, COUNTRY_NAME')
       .using(EntityManager()).execute()
       .then((success)=>{
         this._CACHE_TALENT.COUNTRY_MSTR = success.results;
         resolve(true);
        });
      });

  }

  getCitizenship() {
    return new Promise((resolve)=>{
       EntityQuery().from('PT_CITIZENSHIP_TRX').select('PT_INDIV_ID, CITIZENSHIP_CD')
       .using(EntityManager()).execute()
       .then((success)=>{
         this._CACHE_TALENT.CITIZESHIP_MSTR = success.results;
         resolve(true);
        });
      });
  }

  getAlias() {
    return new Promise((resolve)=>{
       EntityQuery().from('PT_ALIAS_TRX').select('PARTTIME_ID, ALIAS_NAME')
       .using(EntityManager()).execute()
       .then((success)=>{
         this._CACHE_TALENT.ALIAS_MSTR = success.results;
         resolve(true);
        });
      });

  }

  getIndividual() {
    return new Promise((resolve)=>{
       EntityQuery().from('PT_INDIV_MSTR').select('PT_INDIV_ID,GIVEN_NAME,MIDDLE_NAME,LAST_NAME,BIRTH_DT,RELIGION_CD,GENDER,CIVIL_STATUS')
       .using(EntityManager()).execute()
       .then((success)=>{
         this._CACHE_TALENT.INDIVIDUAL_MSTR = success.results;
         resolve(true);
        });
      });
  }

  getGroup() {
    return new Promise((resolve)=>{
       EntityQuery().from('PT_GRP_MSTR').select('PT_GRP_ID,GROUP_NAME,ESTABLISH_DT')
       .using(EntityManager()).execute()
       .then((success)=>{
         this._CACHE_TALENT.GROUP_MSTR = success.results;
         resolve(true);
        });
      });

  }

  getInterest(){
    return new Promise((resolve)=>{
       EntityQuery().from('PT_INTEREST_TRX').select('PARTTIME_ID,INTEREST_CD')
       .using(EntityManager()).execute()
       .then((success)=>{
         this._CACHE_TALENT.INTEREST_MSTR = success.results;
         resolve(true);
        });
      });
  }

  getSkillTalent(){
    return new Promise((resolve)=>{
       EntityQuery().from('PT_SKILL_TALENT_TRX').select('PARTTIME_ID,SKILL_TALENT_CD')
       .using(EntityManager()).execute()
       .then((success)=>{
         this._CACHE_TALENT.SKILL_TALENT_MSTR = success.results;
         resolve(true);
        });
      });

  }

  getCharacteristics(){
    return new Promise((resolve)=>{
       EntityQuery().from('PT_CHARACTERISTIC_TRX').select('PARTTIME_ID,CHARACTERISTIC_CD, ACTUAL_VALUE')
       .using(EntityManager()).execute()
       .then((success)=>{
         this._CACHE_TALENT.CHARACTERISTICS_MSTR = success.results;
         resolve(true);
        });
      });
  }
  consolidate(){
    var imageName =  "/styles/images/abslogo_BIG.png";
    this._CACHE_TALENT.INDIVIDUAL_MSTR.forEach(all=>{
      var country='', location='', country_cd='', location_cd='';
      var alias='';

      var resultAddress = this._CACHE_TALENT.PARTTIME_MSTR.find((out)=>out.PARTTIME_ID==all.PT_INDIV_ID);

      if (resultAddress!=undefined) {
          country = resultAddress.COUNTRY_BASE_CD;
          location = resultAddress.LOCATION_BASE_CD;

          var countrName = this._CACHE_TALENT.COUNTRY_MSTR.find((out)=>out.COUNTRY_CD==country);
          if (countrName!=undefined){
            country_cd = countrName.COUNTRY_NAME;
          }
        }

      var aliasName = this._CACHE_TALENT.ALIAS_MSTR.filter((out)=>out.PARTTIME_ID==all.PT_INDIV_ID);

      if (aliasName.length > 0)
      {
        aliasName.forEach((aliasItem)=>{
          if (alias==""){
            alias = aliasItem.ALIAS_NAME;
          }
          else {
            alias += "\n"+aliasItem.ALIAS_NAME
          }
        });
      }

      this._CACHE_TALENT.ALL_MSTR.push({
        PT_INDIV_ID:all.PT_INDIV_ID,
        GROUP_NAME:'',
        GIVEN_NAME:all.GIVEN_NAME,
        MIDDLE_NAME:all.MIDDLE_NAME,
        LAST_NAME:all.LAST_NAME,
        BIRTH_DT: all.BIRTH_DT,
        RELIGION_CD: all.RELIGION_CD,
        GENDER: all.GENDER,
        SOURCE:'PT_INDIV_MSTR',
        //CITIZENSHIP:'',
        //RELIGION:'',
        CIVIL_STATUS:all.CIVIL_STATUS,
        COUNTRY:country_cd,
        COUNTRY_CD:country,
        LOCATION:location,
        //LOCATION_CD: location_cd,
        PIC:imageName,
        VIDEO:'',
        ALIAS:alias.replace(/\n/g,"<br />"),
      });
    });

    this._CACHE_TALENT.GROUP_MSTR.forEach( all=>{
      var country='', location='', country_cd='', location_cd='';
      var alias='';

      var resultAddress = this._CACHE_TALENT.PARTTIME_MSTR.find((out)=>out.PARTTIME_ID==all.PT_GRP_ID);

      if (resultAddress!=undefined) {
          country = resultAddress.COUNTRY_BASE_CD;
          location = resultAddress.LOCATION_BASE_CD;

          var countrName = this._CACHE_TALENT.COUNTRY_MSTR.find((out)=>out.COUNTRY_CD==country);
          if (countrName!=undefined){
            country_cd = countrName.COUNTRY_NAME;
          }
        }

      var aliasName = this._CACHE_TALENT.ALIAS_MSTR.filter((out)=>out.PARTTIME_ID==all.PT_GRP_ID);

      if (aliasName.length > 0)
      {
        aliasName.forEach((aliasItem)=>{
          if (alias==""){
            alias = aliasItem.ALIAS_NAME;
          }
          else {
            alias += "\n"+aliasItem.ALIAS_NAME
          }
        });
      }

      this._CACHE_TALENT.ALL_MSTR.push({
        PT_INDIV_ID:all.PT_GRP_ID,
        GROUP_NAME:all.GROUP_NAME,
        GIVEN_NAME:'',
        MIDDLE_NAME:'',
        LAST_NAME:'',
        BIRTH_DT: all.ESTABLISH_DT,
        RELIGION_CD: '',
        GENDER: '',
        SOURCE:'PT_GRP_MSTR',
        //CITIZENSHIP:'',
        //RELIGION:'',
        CIVIL_STATUS:'',
        COUNTRY:country_cd,
        COUNTRY_CD:country,
        LOCATION:location,
        //LOCATION_CD:'',
        PIC:imageName,
        VIDEO:'',
        ALIAS:alias.replace(/\n/g,"<br />"),
      });
    });
  }

  search_on() {
    this._CACHE_TALENT.QUERY_VAL = [];
    this._CACHE_TALENT.ALL_MSTR = [];
    var arrayVal = [];

    var p1 = new Promise((resolve)=>{
      this.consolidate();
      arrayVal = this._CACHE_TALENT.ALL_MSTR;


      if (this._CACHE_TALENT._NAME!==undefined && this._CACHE_TALENT._NAME!=''){
        var name = this._CACHE_TALENT._NAME.toUpperCase();
        arrayVal = arrayVal.filter(out=>out.GIVEN_NAME.toUpperCase().indexOf(name)!=-1 || out.LAST_NAME.toUpperCase().indexOf(name)!=-1 || out.MIDDLE_NAME.toUpperCase().indexOf(name)!=-1 || out.GROUP_NAME.toUpperCase().indexOf(name)!=-1);
      }

      if (this._CACHE_TALENT._AGE!=undefined && this._CACHE_TALENT._AGE!=''){
        var date = new Date();
        var x = date.getFullYear()  - parseInt(this._CACHE_TALENT._AGE) - 1;
        var y1 = date.getDate() + 1;
        var y2 = date.getDate() - 1;
        var z = date.getFullYear() - parseInt(this._CACHE_TALENT._AGE);
        var mon = date.getMonth();
        var bdStart =   new Date(x, mon, y1);
        var bdEnd =  new Date(z, mon, y2);
        arrayVal = arrayVal.filter(out=>out.BIRTH_DT>=bdStart && out.BIRTH_DT<=bdEnd);
      }

      if (this._CACHE_TALENT._CITIZENSHIP!==undefined && this._CACHE_TALENT._CITIZENSHIP!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.CITIZESHIP_MSTR.filter(out=>out.CITIZENSHIP_CD==this._CACHE_TALENT._CITIZENSHIP).forEach(out=>{
          arrayVal2.push(out.PT_INDIV_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._RELIGION!==undefined && this._CACHE_TALENT._RELIGION!=''){
        var religion = this._CACHE_TALENT._RELIGION;
        arrayVal = arrayVal.filter(out=>out.RELIGION_CD==religion);
      }

      if (this._CACHE_TALENT._CIVIL_STATUS!==undefined && this._CACHE_TALENT._CIVIL_STATUS!=''){
        var civil_status = this._CACHE_TALENT._CIVIL_STATUS;
        arrayVal = arrayVal.filter(out=>out.CIVIL_STATUS==civil_status);
      }

      if (this._CACHE_TALENT._GENDER!==undefined && this._CACHE_TALENT._GENDER!=''){
        var gender = this._CACHE_TALENT._GENDER;
        arrayVal = arrayVal.filter(out=>out.GENDER==gender);
      }

      if (this._CACHE_TALENT._COUNTRY!==undefined && this._CACHE_TALENT._COUNTRY!=''){
        var country = this._CACHE_TALENT._COUNTRY;
        arrayVal = arrayVal.filter(out=>out.COUNTRY_CD==country);
      }


      if (this._CACHE_TALENT._LOCATION!==undefined && this._CACHE_TALENT._LOCATION!=''){
        var location = this._CACHE_TALENT._LOCATION;
        arrayVal = arrayVal.filter(out=>out.LOCATION==location);
      }

      if (this._CACHE_TALENT._INTEREST!==undefined && this._CACHE_TALENT._INTEREST!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.INTEREST_MSTR.filter(out=>out.INTEREST_CD==this._CACHE_TALENT._INTEREST).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._SKILL_TALENT!==undefined && this._CACHE_TALENT._SKILL_TALENT!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.SKILL_TALENT_MSTR.filter(out=>out.SKILL_TALENT_CD==this._CACHE_TALENT._SKILL_TALENT).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._HEIGHT!==undefined && this._CACHE_TALENT._HEIGHT!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.CHARACTERISTICS_MSTR.filter(out=>out.CHARACTERISTIC_CD=="HEIGHT" && out.ACTUAL_VALUE.toUpperCase().indexOf(this._CACHE_TALENT._HEIGHT.toUpperCase())>-1).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._WEIGHT!==undefined && this._CACHE_TALENT._WEIGHT!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.CHARACTERISTICS_MSTR.filter(out=>out.CHARACTERISTIC_CD=="WEIGHT" && out.ACTUAL_VALUE.toUpperCase().indexOf(this._CACHE_TALENT._WEIGHT.toUpperCase())>-1).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._BUILT!==undefined && this._CACHE_TALENT._BUILT!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.CHARACTERISTICS_MSTR.filter(out=>out.CHARACTERISTIC_CD=="BUILT" && out.ACTUAL_VALUE.toUpperCase().indexOf(this._CACHE_TALENT._BUILT.toUpperCase())>-1).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._EYE_COLOR!==undefined && this._CACHE_TALENT._EYE_COLOR!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.CHARACTERISTICS_MSTR.filter(out=>out.CHARACTERISTIC_CD=="EYE_COLOR" && out.ACTUAL_VALUE.toUpperCase().indexOf(this._CACHE_TALENT._EYE_COLOR.toUpperCase())>-1).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._HAIR_COLOR!==undefined && this._CACHE_TALENT._HAIR_COLOR!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.CHARACTERISTICS_MSTR.filter(out=>out.CHARACTERISTIC_CD=="HAIR_COLOR" && out.ACTUAL_VALUE.toUpperCase().indexOf(this._CACHE_TALENT._HAIR_COLOR.toUpperCase())>-1).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._SKINTONE!==undefined && this._CACHE_TALENT._SKINTONE!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.CHARACTERISTICS_MSTR.filter(out=>out.CHARACTERISTIC_CD=="SKINTONE" && out.ACTUAL_VALUE.toUpperCase().indexOf(this._CACHE_TALENT._SKINTONE.toUpperCase())>-1).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._VITAL_STATISTICS!==undefined && this._CACHE_TALENT._VITAL_STATISTICS!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.CHARACTERISTICS_MSTR.filter(out=>out.CHARACTERISTIC_CD=="VITAL_STATS" && out.ACTUAL_VALUE.toUpperCase().indexOf(this._CACHE_TALENT._VITAL_STATISTICS.toUpperCase())>-1).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._SPECIFIC_CHAR!==undefined && this._CACHE_TALENT._SPECIFIC_CHAR!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.CHARACTERISTICS_MSTR.filter(out=>out.CHARACTERISTIC_CD=="SPECIFIC_CHAR" && out.ACTUAL_VALUE.toUpperCase().indexOf(this._CACHE_TALENT._SPECIFIC_CHAR.toUpperCase())>-1).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }

      if (this._CACHE_TALENT._TALENT_TYPE!==undefined && this._CACHE_TALENT._TALENT_TYPE!=''){
        var arrayVal2=[];
        this._CACHE_TALENT.CHARACTERISTICS_MSTR.filter(out=>out.CHARACTERISTIC_CD=="TALENT_TYPE" && out.ACTUAL_VALUE.toUpperCase().indexOf(this._CACHE_TALENT._TALENT_TYPE.toUpperCase())>-1).forEach(out=>{
          arrayVal2.push(out.PARTTIME_ID);
        });
        arrayVal = arrayVal.filter((out)=>arrayVal2.indexOf(out.PT_INDIV_ID)>-1);
      }



      this._CACHE_TALENT.QUERY_VAL = arrayVal;
      this._CACHE_TALENT._HAS_FIRED = true;

    }); // Promise end
  }
}
