import {
  EntityManager,EntityQuery
}
from './entity-manager-factory';
import toastr from "toastr";
import breeze from 'breeze-client';

var globalIndiv = null;
var talentSuppComp = null;
var talentSuppIndiv = null;
var globalAlias = null;
var globalCompany=[];
var globalGrp = null;
var jobMstr;
var jobGrp;
var category;
var lookups = null;
var reference;
var entityNames = {
  //PROGRAM_MSTR: "PROGRAM_MSTR",
  IO_CC_MSTR: "IO_CC_MSTR",
  GLOBAL_INDIV_MSTR: "GLOBAL_INDIV_MSTR",
  //GLOBAL_MSTR: "GLOBAL_MSTR",
  GLOBAL_ALIAS_TRX: "GLOBAL_ALIAS_TRX",
  GLOBAL_COMPANY_MSTR: "GLOBAL_COMPANY_MSTR",
  COMPANY_MSTR: "COMPANY_MSTR",
  DIVISION_MSTR: "DIVISION_MSTR",
  JOB_GRP_MSTR: "JOB_GRP_MSTR",
  JOB_MSTR: "JOB_MSTR",
  LOCATION_MSTR: "LOCATION_MSTR",
  CATEGORY_MSTR: "CATEGORY_MSTR",
  REFERENCE_CD_MSTR: "REFERENCE_CD_MSTR",
  USER_PROFILE_MSTR: "USER_PROFILE_MSTR",
  USER_ROLE_TRX: "USER_ROLE_TRX",
  BDGT_TMPL_HDR: "BDGT_TMPL_HDR",
  GRP_INDIV_MSTR: "GRP_INDIV_MSTR",
  GLOBAL_GRP_MSTR: "GLOBAL_GRP_MSTR",
  TALENT_SUPPLIER_COMP_MSTR: "TALENT_SUPPLIER_COMP_MSTR",
  TALENT_SUPPLIER_INDIV_MSTR: "TALENT_SUPPLIER_INDIV_MSTR",
  PROGRAM_GENRE_MSTR: "PROGRAM_GENRE_MSTR",
  TELECAST_MODE_MSTR: "TELECAST_MODE_MSTR",
  EPISODE_MODE_MSTR: "EPISODE_MODE_MSTR",
  EPISODE_TYPE_MSTR: "EPISODE_TYPE_MSTR",
  MODULE_ACCESS_TRX: "MODULE_ACCESS_TRX"
  // ,
  // PROGRAM_USER_TRX: "PROGRAM_USER_TRX"
};

export function loadMasterfiles() {
  try {
    // getAliasTrx().then((a)=>{
    //   console.log(a);

    // });
   if(lookups!=null) {
      return new Promise((resolve)=>{ return resolve(true); });
   }


    return Promise.all([
//      getPrograms(),
      getGlobalIndiv(),
      getTalentSupplierComp(),
      getTalentSupplierIndiv(),
      getAliasTrx(),
      getGlobalGrp(),

      //getIOCC(),
      //getGlobalMstr(),
      getGlobalCompany(),
      getCompany(),
      getCategory(),
      getDivision(),
      getReference(),
      getJobGroup(),
      getJob(),
      getLocation(),
      getUsers(),
      getUserTrx(),
      getBdgtHdr(),
      getGrpIndiv(),

      getProgramGenre(),
      getTelecastMode(),
      getEpisodeMode(),
      getEpisodeType()
      //getProgramUser()
      //getModuleAccess()
      ]);
  } catch (e) {
    Promise.resolve(false);
  }
}

export function fnLoadIndiv(){
    //globalIndiv = getLocalSelect('GLOBAL_INDIV_MSTR', 'LAST_NAME', 'GLOBAL_INDIV_ID, LAST_NAME, GIVEN_NAME, MIDDLE_NAME', true);
    //talentSuppComp =  getLocalSelect('TALENT_SUPPLIER_COMP_MSTR', 'COMPANY_NAME', 'SUPPLIER_COMP_GLOBAL_ID, COMPANY_NAME', true);
    //talentSuppIndiv = getLocalSelect('TALENT_SUPPLIER_INDIV_MSTR', 'LAST_NAME', 'TALENT_SUPPLIER_INDIV_ID, LAST_NAME, GIVEN_NAME, MIDDLE_NAME', true);
    //globalAlias = getLocalSelect('GLOBAL_ALIAS_TRX', 'ALIAS_NAME','GLOBAL_ALIAS_ID, GLOBAL_ID, ALIAS_NAME', true);
    //globalGrp = getLocalSelect('GLOBAL_GRP_MSTR','GROUP_NAME', 'GLOBAL_GRP_ID, GROUP_NAME', true);
    //jobMstr = getLocalSelect('JOB_MSTR', 'JOB_ID','JOB_ID, JOB_GRP_ID, JOB_DESC', true);
    //jobGrp = getLocalSelect('JOB_GRP_MSTR', 'JOB_GRP_ID','JOB_GRP_ID, JOB_GRP_CD, JOB_GRP_DESC, COMPANY_ID', true);
    //category = getLocalSelect('CATEGORY_MSTR', 'CATEGORY_ID','CATEGORY_ID, CATEGORY_CD, CATEGORY_DESC, COMPANY_ID', true);
    //reference = getLocal('REFERENCE_CD_MSTR', 'REF_DESC', true);
}

export function loadLookups() {

   if(lookups!=null) {
      return new Promise((resolve)=>{ return resolve(true); });
   }


  fnLoadIndiv();

  return new Promise((resolve, reject) => {


    lookups = {
      //PROGRAM_MSTR: getLocal('PROGRAM_MSTR', 'PROGRAM_TITLE', true),
      //IO_CC_MSTR: getLocal('IO_CC_MSTR', 'IO_DESC', true),
      GLOBAL_INDIV_MSTR: globalIndiv,
      TALENT_SUPPLIER_COMP_MSTR: talentSuppComp,
      TALENT_SUPPLIER_INDIV_MSTR: talentSuppIndiv,
      //GLOBAL_MSTR: getLocal('GLOBAL_MSTR', 'GLOBAL_ID', true),
      GLOBAL_ALIAS_TRX: globalAlias,
      GLOBAL_INDIV_WITH_ALIAS: getGLOBALINDIVandALIAS(),
      JOB_GRP_CATEGORY: getJOB_GRP_CATEGORY(),
      GLOBAL_COMPANY_MSTR: globalCompany,
      COMPANY_MSTR: getLocal('COMPANY_MSTR', 'COMPANY_ID', true),
      DIVISION_MSTR: getLocal('DIVISION_MSTR', 'DIVISION_NAME', true),
      JOB_GRP_MSTR: jobGrp,
      JOB_MSTR: jobMstr,
      LOCATION_MSTR: getLocal('LOCATION_MSTR', 'LOCATION_DESC', true),
      CATEGORY_MSTR: category,
      REFERENCE_CD_MSTR: reference,
      USER_PROFILE_MSTR: getLocal('USER_PROFILE_MSTR', 'USER_ID', true),
      USER_ROLE_TRX: getLocal('USER_ROLE_TRX', 'USER_ID', true),
      BDGT_TMPL_HDR: getLocal('BDGT_TMPL_HDR', 'BDGT_TMPL_ID', true),
      GRP_INDIV_MSTR: getLocal('GRP_INDIV_MSTR', 'GRP_INDIV_ID', true),
      GLOBAL_GRP_MSTR: globalGrp,//getLocal('GLOBAL_GRP_MSTR', 'GROUP_NAME', true),
      PROGRAM_GENRE_MSTR: getLocal('PROGRAM_GENRE_MSTR', 'PROGRAM_GENRE_CD', true),
      TELECAST_MODE_MSTR: getLocal('TELECAST_MODE_MSTR', 'TELECAST_MODE_CD', true),
      EPISODE_MODE_MSTR: getLocal('EPISODE_MODE_MSTR', 'EPISODE_MODE_CD', true),
      EPISODE_TYPE_MSTR: getLocal('EPISODE_TYPE_MSTR', 'EPISODE_TYPE_CD', true),
      //PROGRAM_USER_TRX: getLocal('PROGRAM_USER_TRX', 'USER_ID', true),
      PAYMENT_TERM: getPaymentTerm(),

      //MODULE_ACCESS_TRX: getLocal('MODULE_ACCESS_TRX', 'MODULE_ACCESS_ID',true)

    };

    //Insert dummy Budget Header
    var unchanged = breeze.EntityState.Unchanged;
    var initialValues = {
        'BDGT_TMPL_ID': 0,
      };
    EntityManager().createEntity("BDGT_TMPL_HDR", initialValues, unchanged);

    resolve(true);

  });

}

export function getJobByGlobalCompany(val)
{

        var varCheck = globalCompany.find((all) => all.GLOBAL_ID == val);
        var varJob = {
          JOB_ID: "",
          JOB_DESC: ""
        };

        if (varCheck !== undefined) {

          varJob.JOB_ID = varCheck.JOB_ID;

          var varJOB_p = jobMstr.find((all) => all.JOB_ID == varJob.JOB_ID);

          varJob.JOB_DESC = varJOB_p.JOB_DESC;

          var varGrpCategory = getJOB_GRP_CATEGORY().find((all) => all.JOB_GRP_ID == varJOB_p.JOB_GRP_ID);
          varJob.CATEGORY_ID = varGrpCategory.CATEGORY_ID;
          varJob.CATEGORY_DESC = varGrpCategory.CATEGORY_DESC;
          varJob.COMPANY_ID = varGrpCategory.COMPANY_ID;

        }

        return varJob;

}

export function getJobByName(val)
{

        var varJOB_p = jobMstr.find((all) => all.JOB_DESC == val);

        var varJob = {
          JOB_ID: "",
          JOB_DESC: ""
        };

        if (varJOB_p !== undefined) {

          varJob.JOB_ID = varJOB_p.JOB_ID;

          varJob.JOB_DESC = varJOB_p.JOB_DESC;

          var varGrpCategory = getJOB_GRP_CATEGORY().find((all) => all.JOB_GRP_ID == varJOB_p.JOB_GRP_ID);
          varJob.CATEGORY_ID = varGrpCategory.CATEGORY_ID;
          varJob.CATEGORY_DESC = varGrpCategory.CATEGORY_DESC;
          varJob.COMPANY_ID = varGrpCategory.COMPANY_ID;

        }

        return varJob;

}

export function getLookups() {
  return lookups;
}

// export function getPrograms() {
//   var query = EntityQuery().from('PROGRAM_MSTR')
//   return EntityManager().executeQuery(query).then(function() {
//     processLookups(entityNames.PROGRAM_MSTR, {
//       'PROGRAM_ID': 0, //breeze.core.getUuid()
//       'PROGRAM_TITLE': ' [SELECT A VALUE]'
//     });
//   }, queryFailed);


//   /*return EntityQuery().from('PROGRAM_MSTR')
//     .using(EntityManager()).execute()
//     .then(
//       function() {
//         processLookups(entityNames.PROGRAM_MSTR, {
//           'PROGRAM_ID': 0, //breeze.core.getUuid()
//           'PROGRAM_TITLE': '[SELECT A VALUE]'
//         });
//       }, queryFailed);*/
// }

export function getPaymentTerm(){
  var paymentterm=[];
  reference.forEach((ref) => {
          if (ref.REF_GRP_CD == 'PYMNT_TERM_CD') {
            paymentterm.push(ref);
          }
        });
  return paymentterm;
}


export function getGLOBALINDIVandALIAS(){

  var varTmpObject=[];
  var varGlobalAlias = globalAlias;
  var varGlobalIndiv = globalIndiv ;
  var varTalentComp = talentSuppComp;
  var varTalentSuppIndiv = talentSuppIndiv;
  var varGlobalGrp = globalGrp;

  varGlobalIndiv.forEach((all) => {

    var varAliases=[];
    var varAlias = "";

    if (all.ALIAS != "" && all.ALIAS != null) {
      varAlias = " (" + all.ALIAS;
      varAliases.push(all.ALIAS);
    }

    var varFoundAlias=varGlobalAlias.filter(item=>item.GLOBAL_ID==all.GLOBAL_INDIV_ID);

    if(varFoundAlias.length>0)
        varFoundAlias.forEach((alias)=>{

        if (varAlias == "")
        varAlias = " (" + alias.ALIAS_NAME;
        else if (varAlias == "(")
          varAlias = alias.ALIAS_NAME;
        else
          varAlias += "," + alias.ALIAS_NAME;

          varAliases.push(alias.ALIAS_NAME);

        });

        if (varAlias != "") {
          varAlias += ")";
        }

    varTmpObject.push({
      PERSONNEL_NAME: ((all.LAST_NAME + ', ' + all.GIVEN_NAME + ' ' + all.MIDDLE_NAME).trim() + varAlias).toUpperCase(),
      GLOBAL_INDIV_ID: all.GLOBAL_INDIV_ID,
      PERSONNEL_INFO_SRC: 'INDIV',
      ALIASES: varAliases,
      LAST_NAME: all.LAST_NAME,
      GIVEN_NAME: all.GIVEN_NAME,
      MIDDLE_NAME: all.MIDDLE_NAME
    });

  });


  varTalentSuppIndiv.forEach((all) => {

    var varAlias = "";
    var varAliases=[];
    if (all.ALIAS != "" && all.ALIAS != null) {
      varAlias = " (" + all.ALIAS;
      varAliases.push(all.ALIAS);
    }

   var varFoundAlias=varGlobalAlias.filter(item=>item.GLOBAL_ID==all.SUPPLIER_INDIV_GLOBAL_ID);

    if(varFoundAlias.length>0)
        varFoundAlias.forEach((alias)=>{
        if (varAlias == "")
        varAlias = " (" + alias.ALIAS_NAME;
        else if (varAlias == "(")
          varAlias = alias.ALIAS_NAME;
        else
          varAlias += "," + alias.ALIAS_NAME;

         varAliases.push(alias.ALIAS_NAME);
    });

        if (varAlias != "") {
          varAlias += ")";
        }


    varTmpObject.push({
      PERSONNEL_NAME: ((all.LAST_NAME + ', ' + all.GIVEN_NAME + ' ' + all.MIDDLE_NAME).trim() + varAlias).toUpperCase(),
      GLOBAL_INDIV_ID: all.SUPPLIER_INDIV_GLOBAL_ID,
      PERSONNEL_INFO_SRC: 'TSUPPLIER',
      ALIASES: varAliases
    });

  });


  varTalentComp.forEach((all) => {
    varTmpObject.push({
      PERSONNEL_NAME: all.COMPANY_NAME.toUpperCase(),
      GLOBAL_INDIV_ID: all.SUPPLIER_COMP_GLOBAL_ID,
      PERSONNEL_INFO_SRC: 'TCOMP',
      ALIASES:[]
    });

  });


 varGlobalGrp.forEach((all) => {
    varTmpObject.push({
      PERSONNEL_NAME: all.GROUP_NAME.toUpperCase(),
      GLOBAL_INDIV_ID: all.GLOBAL_GRP_ID,
      PERSONNEL_INFO_SRC: 'GLGRP',
      ALIASES:[]
    });

  });



      return varTmpObject;

}



export function getJOB_GRP_CATEGORY(){

  var varTmpObject=[];
  var p_jobMstr = jobMstr;
  var p_jobGrp = jobGrp;
  var p_category = category;

  // console.log(p_jobMstr);
  // console.log(p_jobGrp);

  p_jobMstr.forEach((all) => {
    //console.log(all);
    var varFindGrp = p_jobGrp.find((allGrp)=>allGrp.JOB_GRP_ID==all.JOB_GRP_ID);
    // console.log(varFindGrp);
    varTmpObject.push({
      JOB_ID: all.JOB_ID,
      JOB_GRP_ID: varFindGrp.JOB_GRP_ID,
      JOB_GRP_CD: varFindGrp.JOB_GRP_CD,
      JOB_GRP_DESC: (varFindGrp!==undefined?varFindGrp.JOB_GRP_DESC:""),
      CATEGORY_ID: "",
      CATEGORY_CD: "",
      CATEGORY_DESC: "",
      COMPANY_ID: varFindGrp.COMPANY_ID,
      JOB_DESC: all.JOB_DESC
    });

  });


  varTmpObject.forEach((all) => {

      var varFindCategory = p_category.find((allCategory) => allCategory.CATEGORY_CD == all.JOB_GRP_CD && allCategory.COMPANY_ID == all.COMPANY_ID);
      //console.log(varFindCategory);
    if (varFindCategory !== undefined) {
      all.CATEGORY_CD = varFindCategory.CATEGORY_CD;
      all.CATEGORY_ID = varFindCategory.CATEGORY_ID;
      all.CATEGORY_DESC = varFindCategory.CATEGORY_DESC;
    }

  });

      return varTmpObject;

}

// export function getModuleAccess() {
//   return EntityQuery().from('MODULE_ACCESS_TRX').expand("MODULE_MSTR")
//     .using(EntityManager()).execute()
//     .then(
//       ()=>{

//       }, queryFailed);
// }


export function getProgramGenre() {
  return EntityQuery().from('PROGRAM_GENRE_MSTR')
    .using(EntityManager()).execute()
    .then(
      ()=>{}, queryFailed);
}

export function getTelecastMode() {
  return EntityQuery().from('TELECAST_MODE_MSTR')
    .using(EntityManager()).execute()
    .then(
      ()=>{}, queryFailed);
}

export function getEpisodeMode() {
  return EntityQuery().from('EPISODE_MODE_MSTR')
    .using(EntityManager()).execute()
    .then(
      ()=>{}, queryFailed);
}

export function getEpisodeType() {
  return EntityQuery().from('EPISODE_TYPE_MSTR')
    .using(EntityManager()).execute()
    .then(
      ()=>{}, queryFailed);
}


// export function getProgramUser() {
//   return EntityQuery().from('PROGRAM_USER_TRX')
//     .using(EntityManager()).execute()
//     .then(
//       ()=>{}, queryFailed);
// }



export function getTalentSupplierComp() {
  // return EntityQuery().from('TALENT_SUPPLIER_COMP_MSTR').select('TALENT_SUPPLIER_COMP_MSTR', 'COMPANY_NAME', 'SUPPLIER_COMP_GLOBAL_ID, COMPANY_NAME')
  //   .using(EntityManager()).execute()
  //   .then(
  //     ()=>{}, queryFailed);

    // var _query = EntityQuery().from('TALENT_SUPPLIER_COMP_MSTR').select('TALENT_SUPPLIER_COMP_MSTR', 'COMPANY_NAME', 'SUPPLIER_COMP_GLOBAL_ID, COMPANY_NAME');
    //   EntityManager().executeQuery(_query).then((success) => {
    //       console.log(success);
    //   });

     return new Promise((resolve)=>{
      EntityQuery().from('TALENT_SUPPLIER_COMP_MSTR').select('COMPANY_NAME, SUPPLIER_COMP_GLOBAL_ID, COMPANY_NAME')
     .using(EntityManager()).execute()
     .then((success)=>{
      talentSuppComp = success.results;
      resolve(true);
    });

   });

}


export function getTalentSupplierIndiv() {
  // return EntityQuery().from('TALENT_SUPPLIER_INDIV_MSTR')
  //   .using(EntityManager()).execute()
  //   .then(
  //     ()=>{}, queryFailed);
  //


    return new Promise((resolve)=>{
      EntityQuery().from('TALENT_SUPPLIER_INDIV_MSTR').select('LAST_NAME, TALENT_SUPPLIER_INDIV_ID, LAST_NAME, GIVEN_NAME, MIDDLE_NAME')
     .using(EntityManager()).execute()
     .then((success)=>{
      talentSuppIndiv = success.results;
      resolve(true);
    });

   });

}



export function getGlobalGrp() {

  // return EntityQuery().from('GLOBAL_GRP_MSTR').select('GLOBAL_GRP_ID, GROUP_NAME')
  //   .using(EntityManager()).execute()
  //   .then(
  //     ()=>{}, queryFailed);
   return new Promise((resolve)=>{
      EntityQuery().from('GLOBAL_GRP_MSTR').select('GLOBAL_GRP_ID, GROUP_NAME')
     .using(EntityManager()).execute()
     .then((success)=>{
      globalGrp = success.results;
      resolve(true);
    });

   });
}


export function getGrpIndiv() {
  return EntityQuery().from('GRP_INDIV_MSTR')
    .using(EntityManager()).execute()
    .then(
      ()=>{}, queryFailed);
}


export function getBdgtHdr() {
  return EntityQuery().from('BDGT_TMPL_HDR').take(1)
    .using(EntityManager()).execute()
    .then(
      ()=>{}, queryFailed);
}

export function getIOCC() {
  return EntityQuery().from('IO_CC_MSTR')
    .using(EntityManager()).execute()
    .then(
      function() {
        processLookups(entityNames.IO_CC_MSTR, {
          'CHARGE_CD': breeze.core.getUuid(),
          'IO_DESC': '[SELECT A VALUE]'
        });

      }, queryFailed);
}

export function getGlobalIndiv() {
 return new Promise((resolve)=>{
   EntityQuery().from('GLOBAL_INDIV_MSTR').select('GLOBAL_INDIV_ID,GIVEN_NAME,MIDDLE_NAME,LAST_NAME')
   .using(EntityManager()).execute()
   .then((success)=>{
    globalIndiv = success.results;
    resolve(true);
  });

 });

}

// export function getGlobalMstr() {
//   return EntityQuery().from('GLOBAL_MSTR')
//     .using(EntityManager()).execute();
// }
export function getAliasTrx() {
  // return EntityQuery().from('GLOBAL_ALIAS_TRX')
  //   .using(EntityManager()).execute();

  //globalAlias
//'GLOBAL_GRP_MSTR','GROUP_NAME', 'GLOBAL_GRP_ID, GROUP_NAME'

return new Promise((resolve)=>{
   EntityQuery().from('GLOBAL_ALIAS_TRX').select('GLOBAL_ALIAS_ID,ALIAS_NAME,GLOBAL_ID')
   .using(EntityManager()).execute()
   .then((success)=>{
    globalAlias = success.results;
    resolve(true);
  });

 });

}
export function getGlobalCompany() {

return new Promise((resolve)=>{
   EntityQuery().from('GLOBAL_COMPANY_MSTR').select('GLOBAL_COMPANY_ID, GLOBAL_ID, JOB_ID, COMPANY_ID, STATUS_CD')
   .using(EntityManager()).execute()
   .then((success)=>{
    globalCompany = success.results;
    resolve(true);
  });

 });

  // return EntityQuery().from('GLOBAL_COMPANY_MSTR').select('GLOBAL_COMPANY_ID, GLOBAL_ID, JOB_ID, COMPANY_ID')
  //   .using(EntityManager()).execute();
}
export function getCompany() {
  var query = EntityQuery().from('COMPANY_MSTR')
  return EntityManager().executeQuery(query).then(function() {
    processLookups(entityNames.COMPANY_MSTR, {
      'COMPANY_ID': 0, //breeze.core.getUuid()
      'COMPANY_NAME': ' [SELECT A VALUE]'
    });
  }, queryFailed);


  /*return EntityQuery().from('PROGRAM_MSTR')
    .using(EntityManager()).execute()
    .then(
      function() {
        processLookups(entityNames.PROGRAM_MSTR, {
          'PROGRAM_ID': 0, //breeze.core.getUuid()
          'PROGRAM_TITLE': '[SELECT A VALUE]'
        });
      }, queryFailed);*/
}
export function getCategory() {

  // var query = EntityQuery().from('CATEGORY_MSTR')
  // return EntityManager().executeQuery(query).then(function() {
  //   processLookups(entityNames.CATEGORY_MSTR, {
  //     'CATEGORY_ID': 0, //breeze.core.getUuid()
  //     'CATEGORY_DESC': ' [SELECT A VALUE]'
  //   });
  // }, queryFailed);


return new Promise((resolve)=>{
   EntityQuery().from('CATEGORY_MSTR')
   .using(EntityManager()).execute()
   .then((success)=>{
    category = success.results;
    category.push({ 'CATEGORY_ID': 0,
    'CATEGORY_DESC': ' [SELECT A VALUE]'});
    resolve(true);
  });

 });

}
export function getDivision() {
  var query = EntityQuery().from('DIVISION_MSTR');//.select('DIVISION_ID,DIVISION_CD,DIVISION_NAME')
  return EntityManager().executeQuery(query).then(function() {
    processLookups(entityNames.DIVISION_MSTR, {
      'DIVISION_ID': 0, //breeze.core.getUuid()
      'DIVISION_NAME': ' [SELECT A VALUE]'
    });
  }, queryFailed);
}
export function getReference() {

  // var query = EntityQuery().from('REFERENCE_CD_MSTR');//.select('REF_CD,REF_GRP_CD,REF_DESC')
  // return EntityManager().executeQuery(query).then(function() {
  //   processLookups(entityNames.REFERENCE_CD_MSTR, {
  //     'REF_CD': breeze.core.getUuid(),
  //     'REF_DESC': ' [SELECT A VALUE]',
  //     'REF_GRP_CD': breeze.core.getUuid()
  //   });
  // }, queryFailed);



    return new Promise((resolve)=>{
   EntityQuery().from('REFERENCE_CD_MSTR').select('REF_CD,REF_GRP_CD,REF_DESC')
   .using(EntityManager()).execute()
   .then((success)=>{
    reference = success.results;
   // jobGrp.push({ 'REF_CD': breeze.core.getUuid(), 'REF_DESC':' [SELECT A VALUE]','REF_GRP_CD':breeze.core.getUuid()});
    resolve(true);
  });
});


}
export function getJobGroup() {
  // var query = EntityQuery().from('JOB_GRP_MSTR');//.select('JOB_GRP_ID, JOB_GRP_CD, JOB_GRP_DESC');
  // return EntityManager().executeQuery(query).then(function() {
  //   processLookups(entityNames.JOB_GRP_MSTR, {
  //     'JOB_GRP_ID': 0, //breeze.core.getUuid()
  //     'JOB_GRP_DESC': ' [SELECT A VALUE]'
  //   });
  // }, queryFailed);

    return new Promise((resolve)=>{
   EntityQuery().from('JOB_GRP_MSTR').select('JOB_GRP_ID, JOB_GRP_CD, JOB_GRP_DESC, COMPANY_ID')
   .using(EntityManager()).execute()
   .then((success)=>{
    jobGrp = success.results;
    //jobGrp.push({ 'JOB_GRP_ID': 0, 'JOB_GRP_DESC':' [SELECT A VALUE]'});
    resolve(true);
  });
});
}

export function getJob() {

  return new Promise((resolve)=>{
   EntityQuery().from('JOB_MSTR').select('JOB_ID, JOB_GRP_ID, JOB_DESC')
   .using(EntityManager()).execute()
   .then((success)=>{
    jobMstr = success.results;
    //jobMstr.push({ 'JOB_ID': 0, 'JOB_DESC':' [SELECT A VALUE]'});
    resolve(true);
  });

 });

  // var query = EntityQuery().from('JOB_MSTR');//.select('JOB_ID, JOB_GRP_ID, JOB_DESC');
  // return EntityManager().executeQuery(query).then(function(success) {

  //     //EntityManager().createEntity(entityNames.JOB_MSTR, {},null);
  //  // console.log(success);
  //   // processLookups(entityNames.JOB_MSTR, {
  //   //   'JOB_ID': 0, //breeze.core.getUuid()
  //   //   'JOB_DESC': ' [SELECT A VALUE]'
  //   // });
  // }, queryFailed);


}
export function getLocation() {
  var query = EntityQuery().from('LOCATION_MSTR')
  return EntityManager().executeQuery(query).then(function() {
    processLookups(entityNames.LOCATION_MSTR, {
      'LOCATION_CD': breeze.core.getUuid(),
      'LOCATION_DESC': ' [SELECT A VALUE]'
    });
  }, queryFailed);
}

export function getUsers() {
  var query = EntityQuery().from('USER_PROFILE_MSTR');//.select('USER_ID,COMPANY_ID,EMPLOYEE_ID')
  return EntityManager().executeQuery(query).then(function() {
    processLookups(entityNames.USER_PROFILE_MSTR, {
      'USER_ID': '[SELECT A USER]'
    });
  }, queryFailed);
}


export function getUserTrx() {
  var query = EntityQuery().from('USER_ROLE_TRX')
  return EntityManager().executeQuery(query).then(function() {
    processLookups(entityNames.USER_ROLE_TRX, {
      'USER_ID': ''
    });
  }, queryFailed);
}

function getLocalSelect(resource, ordering, select, includeNullos) {

  var query = EntityQuery().from(resource).select(select).orderBy(ordering); //.using(breeze.FetchStrategy.FromLocalCache);

  return EntityManager().executeQueryLocally(query);
}


function getLocal(resource, ordering, includeNullos) {

  var query = EntityQuery().from(resource).orderBy(ordering); //.using(breeze.FetchStrategy.FromLocalCache);

  return EntityManager().executeQueryLocally(query);
}

function processLookups(objName, blankValue) {
  //you commented it to remove inserting initial value on index 0
  createNullos(EntityManager(), objName, blankValue);
}

function createNullos(manager, objName, blankValue) {

  var unchanged = breeze.EntityState.Unchanged;

  createNullo(manager, objName, blankValue, unchanged);

}

function createNullo(manager, entityName, values, unchanged) {
  var initialValues = values || {}; //nAME: ' [ SELECT A VALUE]'
  return manager.createEntity(entityName, initialValues, unchanged);

}

function queryFailed(jqXHR, textStatus) {
  var msg = 'Error retrieving data ' + textStatus;
  toastr.error(msg, "Exception occured..")

  // loggerToastProvider.logError(msg, jqXHR, system.getModuleId, datacontext);
}
