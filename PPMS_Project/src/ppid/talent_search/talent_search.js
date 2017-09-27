import {bindable,inject} from 'aurelia-framework';
import { cache_obj } from 'cache_obj';
import { EntityManager, EntityQuery, generateID} from 'entity-manager-factory';
import { getLookups } from 'masterfiles';
import settings from 'settings';
import {ModalWizard} from 'modals/modal-wizard';
import toastr from "toastr";
import moment from 'moment';
import _ from 'underscore';
import { MultiObserver }from 'multi-observer';
import {DialogService} from 'aurelia-dialog';
import breeze from 'breeze-client';

@inject(cache_obj, ModalWizard, toastr, MultiObserver, DialogService)


export class talent_search {
  //Array
  _CITIZENSHIP_ARR = [{ref:'',desc:''}];
  _RELIGION_ARR = [{ref:'',desc:''}];
  _CIVIL_STATUS_ARR = [{ref:'',desc:''}];
  _GENDER_ARR = [{ref:'',desc:''}, {ref: 'M', desc: 'MALE'}, {ref:'F', desc:'FEMALE'}];
  _COUNTRY_ARR = [{ref:'',desc:''}];
  _LOCATION_ARR = [{ref:'',desc:''}];
  _INTEREST_ARR = [{ref:'',desc:''}];
  _SKILL_TALENT_ARR = [{ref:'',desc:''}];


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

  _QUERY_VAL;

  constructor(cache_obj,cache_budget,ModalWizard,toastr,multiObserver,DialogService) {
      if (EntityManager() === undefined) {
        return;
      }
      this.initialize();

  }

  initialize()
  {
    EntityManager().executeQuery(EntityQuery().from('REFERENCE_CD_MSTR').where('REF_GRP_CD', '==', 'CITIZENSHIP_CD').orderBy('REF_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._CITIZENSHIP_ARR.push({ref:all.REF_CD, desc: all.REF_DESC});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('REFERENCE_CD_MSTR').where('REF_GRP_CD', '==', 'RELIGION_CD').orderBy('REF_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._RELIGION_ARR.push({ref:all.REF_CD, desc: all.REF_DESC});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('REFERENCE_CD_MSTR').where('REF_GRP_CD', '==', 'CIVIL_STATUS').orderBy('REF_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._CIVIL_STATUS_ARR.push({ref:all.REF_CD, desc: all.REF_DESC});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('COUNTRY_MSTR').orderBy('COUNTRY_NAME')).then((found) => {
      found.results.forEach((all)=>{
        this._COUNTRY_ARR.push({ref:all.COUNTRY_CD, desc: all.COUNTRY_NAME});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('LOCATION_MSTR').orderBy('LOCATION_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._LOCATION_ARR.push({ref:all.LOCATION_CD, desc: all.LOCATION_DESC});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('INTEREST_MSTR').orderBy('INTEREST_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._INTEREST_ARR.push({ref:all.INTEREST_CD, desc: all.INTEREST_DESC});
      });
    });

    EntityManager().executeQuery(EntityQuery().from('SKILL_TALENT_MSTR').orderBy('SKILL_TALENT_DESC')).then((found) => {
      found.results.forEach((all)=>{
        this._SKILL_TALENT_ARR.push({ref:all.SKILL_TALENT_CD, desc: all.SKILL_TALENT_DESC});
      });
    });

  }

  search_on()
  {
    this._QUERY_VAL = [];
    EntityManager().executeQuery(EntityQuery().from('PT_INDIV_MSTR')).then((found) => {
      found.results.forEach((all)=>{
        this._QUERY_VAL.push({PT_INDIV_ID:all.PT_INDIV_ID, GIVEN_NAME:all.GIVEN_NAME, MIDDLE_NAME:all.MIDDLE_NAME, LAST_NAME:all.LAST_NAME});
      });
    });

    console.log(this._QUERY_VAL);
  }

}
