sap.ui.define([
	"sap/ui/core/util/MockServer"
], function(MockServer) {
	"use strict";

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */
		init: function(sLocalServicePath) {
			// create
			var oMockServer = new MockServer({
				rootUri: "/"
			});

			// simulate against the metadata and mock data
			oMockServer.simulate(sLocalServicePath + "localService/metadata.xml", {
				sMockdataBaseUrl: sLocalServicePath + "localService/mockdata",
				bGenerateMissingMockData: true
			});
			var aRequests = oMockServer.getRequests();
			aRequests.push({
				method: "GET",
				path: new RegExp("GetWarnings(.*)"),
				response: function(oXhr, sUrlParams) {
					jQuery.sap.log.debug("Incoming request for Warnings");
					var today = new Date();
					today.setHours(0); // or today.toUTCString(0) due to timezone differences
					today.setMinutes(0);
					today.setSeconds(0);
					var oResponse = jQuery.sap.sjax({
						url: "/Warnings?$filter=Date ge " + "/Date(" + today.getTime() + ")/"
					});
					oXhr.respondJSON(200, {}, JSON.stringify(oResponse.data));
					return true;
				}
			});
			aRequests.push({
				method: "GET",
				path: new RegExp("GetChannels(.*)"),
				response: function(oXhr, sUrlParams) {
					jQuery.sap.log.debug("Incoming request for Channels");
					var today = new Date();
					today.setHours(0); // or today.toUTCString(0) due to timezone differences
					today.setMinutes(0);
					today.setSeconds(0);
					var oResponse = jQuery.sap.sjax({
						url: "/Channels?$filter=Date ge " + "/Date(" + today.getTime() + ")/"
					});
					oXhr.respondJSON(200, {}, JSON.stringify(oResponse.data));
					return true; 
				}
			});
			aRequests.push({
				method: "GET",
				path: new RegExp("GetCampaigns(.*)"),
				response: function(oXhr, sUrlParams) {
					jQuery.sap.log.debug("Incoming request for Campaigns");
					var today = new Date();
					today.setHours(0); // or today.toUTCString(0) due to timezone differences
					today.setMinutes(0);
					today.setSeconds(0);
					var oResponse = jQuery.sap.sjax({
						url: "/Campaigns?$filter=Date ge " + "/Date(" + today.getTime() + ")/"
					});
					oXhr.respondJSON(200, {}, JSON.stringify(oResponse.data));
					return true;
				}
			});				
			aRequests.push({
				method: "GET",
				path: new RegExp("GetAlerts(.*)"),
				response: function(oXhr, sUrlParams) {
					jQuery.sap.log.debug("Incoming request for Alerts");
					var today = new Date();
					today.setHours(0); // or today.toUTCString(0) due to timezone differences
					today.setMinutes(0);
					today.setSeconds(0);
					var oResponse = jQuery.sap.sjax({
						url: "/Alerts?$filter=Date ge " + "/Date(" + today.getTime() + ")/"
					});
					oXhr.respondJSON(200, {}, JSON.stringify(oResponse.data));
					return true;
				}
			});
			oMockServer.setRequests(aRequests);

			var fnCustom = function(oEvent) {
				var oXhr = oEvent.getParameter("oXhr");
				if (oXhr && oXhr.url.indexOf("first") > -1) {
					oEvent.getParameter("oFilteredData").results.splice(3, 100);
				}
			};
			oMockServer.attachAfter("GET", fnCustom, "Meetups");

			// start
			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		}

	};

});