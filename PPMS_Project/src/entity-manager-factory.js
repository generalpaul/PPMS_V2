import settings from './settings';
import breeze from 'breeze-client';


var entityManager;
//var EntityQuery = breeze.EntityQuery;


export function initializeBreeze() {
  try {

     
    var dataService = breeze.config.initializeAdapterInstance('dataService', 'webApiOData', true);
    //  dataService.defaultHttpClient = {
    //  headers: { 
    //     "Authorization": "foo2" 
    //  },
    // };
    //console.log(dataService.defaultHttpClient);
  



    entityManager = new breeze.EntityManager(settings.serviceName);
    
    //saveOptions: new breeze.SaveOptions({allowConcurrentSaves: true})
    entityManager.saveOptions = new breeze.SaveOptions({ allowConcurrentSaves: true });
    
    return entityManager.fetchMetadata();


  } catch (e) {
    console.log(e);
    return Promise.resolve(false);
  }

}
/**
 * Creates Breeze EntityManager instances.
 */
export function EntityManager() {
  return entityManager;
  //copy
  /*entityManager = new breeze.EntityManager(settings.serviceName);
  return entityManager.fetchMetadata()
    .then(() => copyEntityManager());*/
}

export function EntityQuery() {
  return breeze.EntityQuery;
}


export function generateID(){
  return breeze.core.getUuid();
}


function copyEntityManager() {
  var copy = entityManager.createEmptyCopy();
  copy.entityChanged.subscribe(logChanges);
  return copy;
}

// log entity changes to the console for debugging purposes.
function logChanges(data) {
  var message = 'Entity Changed.  Entity: ' + (data.entity ? data.entity.entityType.name + '/' + data.entity.entityAspect.getKey().toString() : '?') + ';  EntityAction: ' + data.entityAction.getName() + '; ';
  if (data.entityAction === breeze.EntityAction.PropertyChange) {
    var pcArgs = data.args;
    message += 'PropertyName: ' + (pcArgs.propertyName || 'null') + '; Old Value: ' + (pcArgs.oldValue ? pcArgs.oldValue.toString() : 'null') + '; New Value: ' + (pcArgs.newValue ? pcArgs.newValue.toString() : 'null') + ';';
  }
  if (data.entityAction === breeze.EntityAction.EntityStateChange) {
    message += 'New State: ' + data.entity.entityAspect.entityState.getName() + ';';
  }
}
