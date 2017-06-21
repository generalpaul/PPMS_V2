import settings from './settings';
export class service{
    serviceBase = settings.serviceBase+ '/WcfDataService.svc/';
    getSvcUrl(method) {
			return serviceBase + method;
		};
	serviceBaseUpdate = 'home/';
	getSvcUrlUpdate(method) {
			return serviceBaseUpdate + method;
		};

	GetJson(method, jsonIn, callback) {
		$.ajax({
			url: getSvcUrl(method),
			type: "GET",
            dataType: "jsonp",
			success: function(json) {
				callback(json);
			}
		});
	};
	PostJson(method, jsonIn, callback) {

		$.ajax({
			url: getSvcUrl(method),
			type: "POST",
			data: jsonIn, //ko.toJSON(jsonIn)
            dataType: "jsonp",
			contentType: "application/json",
			success: function(json) {
				callback(json);
			}
		});
	};
	PostUpdateJson(method, jsonIn, callback) {
		$.ajax({
			url: getSvcUrlUpdate(method),
			type: "POST",
			data: jsonIn,
            dataType: "jsonp",
			contentType: "application/json",
			success: function(json) {
				callback(json);
			}
		});
	};
}