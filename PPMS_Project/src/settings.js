/**
* Global settings/constants
*/
// http://localhost:30313/
// http://absppms2:8094/odata
//http://absppms01:8085/odata
//http://absppms2:8072/odata
//ctrl + alt + f (default) formatting indention
//serviceName: "http://localhost:30313/odata",
//serviceNameBase: "http://localhost:30313", 
//serviceName: "http://absppms2:8094/odata",
//serviceName: "http://absppms01:8085/odata"

export default {
    
    // serviceName: "http://localhost:30313/odata", //odata url
    // serviceNameBase: "http://localhost:30313", //base api url

    serviceName: "http://absppms2:8072/odata", //odata url
    serviceNameBase: "http://absppms2:8072", //base api url

  pageSize: 100,
  STATIONS: ["", "CEBU", "DAVAO"],
  //actualCostWebUrl: "http://localhost:15253",
  actualCostWebUrl: "http://absppms2:8084", //actual cost url
  actualCostServiceBase: "http://absppms2:8083", //actual cost service
  isNavigating: false,
 };
