/**
* Global settings/constants
*/
// http://localhost:30313/
// http://absppms2:8094/odata
//http://absppms01:8085/odata
//ctrl + alt + f (default) formatting indention
export default {
    serviceName: "http://localhost:30313/odata",
    serviceNameBase: "http://localhost:30313",
  //serviceName: "http://absppms2:8094/odata",
  /*serviceName: "http://absppms01:8085/odata"*/
  pageSize: 100,
  STATIONS: ["", "CEBU", "DAVAO"],
  //ActualCostService: "http://localhost:15253",
  ActualCostService: "http://absppms2:8084",
  serviceBase: "http://absppms2:8083",
  isNavigating: false
};
