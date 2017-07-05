sap.ui.define([
	"shamat/LimeApp/scripts/Formatter",
	"sap/ui/core/mvc/Controller"
], function(Formatter, Controller) {
	"use strict";

	return Controller.extend("shamat.LimeApp.controller.App", {

		formatter: Formatter,

		onInit: function() {
			//this.bindWarnings();
			//this.bindAlerts();
		},

		onPressAction: function(oEvent) {
			this.bindAlerts();
			this.bindWarnings();
			this.bindChannels();
			this.bindCampaigns();
		},

		onButtonAction: function(oEvent) {
			this.handleNav(oEvent);
		},

		onMenuAction: function(oEvent) {
			var oMenuItem = oEvent.getParameters().item;
			switch (oMenuItem.getProperty("text")) {
				case "Twitter":
					break;
				case "Facebook":
					break;
			}
			this.handleNav(oEvent, oMenuItem.getProperty("text"));
		},

		handleNav: function(oEvent) {
			var navCon = this.getView().byId("navContainerId");
			var target = oEvent.getSource().data("target");
			if (target) {
				var oPage = this.getView().byId(target);
				navCon.to(oPage, "show");
			}
		},

		bindWarnings: function() {
			var oTileContainer = this.getView().byId("warningsTile");
			oTileContainer.bindAggregation("tiles", {
				path: "/Warnings",
				template: new sap.m.StandardTile({
					title: "{Title}",
					info: "{Description}"
				})
			});
		},

		bindChannels: function() {
			var oTileContainer = this.getView().byId("channelsTile");
			oTileContainer.bindAggregation("tiles", {
				path: "/Channels",
				template: new sap.m.CustomTile({
					content: new sap.ui.layout.VerticalLayout({
						content: [
							new sap.m.Label({
								text: "{Title}"
							}),
							new sap.m.Label({
								text: "{AlertCount}",
								customData: new sap.ui.core.CustomData({
									key: "alert-status",
									value: "{AlertStatus}", 
									writeToDom: true
								})
							})
						]
					})
				})
			});
		},

		bindCampaigns: function() {
			var oTileContainer = this.getView().byId("campaignsTile");
			oTileContainer.bindAggregation("tiles", {
				path: "/Campaigns",
				template: new sap.m.StandardTile({
					title: "{Title}",
					info: "{Description}"
				})
			});
		},

		bindAlerts: function() {
			var oList = this.getView().byId("alertList");
			oList.bindItems({
				path: "/Alerts",
				template: new sap.m.ObjectListItem({
					title: "{Title}",
					/*number: {
						path: 'Date',
						type: 'sap.ui.model.type.DateTime',
						formatOptions: {
							style: 'medium'
						}
					},*/
					attributes: [
						new sap.m.ObjectAttribute({
							text: "{Description}"
						})
					]
				})
			});
		}

	});
});