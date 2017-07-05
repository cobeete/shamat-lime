sap.ui.define([], function() {
	"use strict";
	return {

		getChannelAlertClass: function(value) {
			switch(value) {
				case "ERROR":
					return "channel-alert-error";
				case "WARNING":
					return "channel-alert-warning";
				case "SUCCESS":
					return "channel-alert-success";
			}
			return "";
		}

	};

});