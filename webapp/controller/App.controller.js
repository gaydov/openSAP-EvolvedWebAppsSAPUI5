sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/UIComponent"
], function (Controller, formatter, Filter, FilterOperator, UIComponent) {
	"use strict";

	return Controller.extend("opensap.movies.controller.App", {

		formatter: formatter,

		onInit: function () {

		},

		onFindMoviesBtnPress: function () {

			sap.ui.require(["sap/m/MessageToast"], function (oMessage) {
				var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
				oMessage.show(oResourceBundle.getText("SearchingMovies"), {
					duration: 1000
				});
			}.bind(this));

			var sCity = this.byId("city").getValue(),
				sGenre = this.byId("genre").getSelectedItem().getKey(),
				oCalendar = this.byId("calendar"),
				oRowBinding = oCalendar.getBinding("rows"),
				oFilterGenre,
				oFilterCity;

			oFilterGenre = sGenre ? new Filter("genre", FilterOperator.EQ, sGenre) : null;
			oFilterCity = sCity ? new Filter("info", FilterOperator.EQ, sCity) : null;

			oRowBinding.filter(oFilterGenre);

			var aRows = oCalendar.getAggregation("rows");
			aRows.forEach(function (oItem) {
				var oAppointmentsBinding = oItem.getBinding("appointments");
				oAppointmentsBinding.filter(oFilterCity);
			});
		},

		onAppointmentSelect: function (oAppointment) {
			var oContext = oAppointment.getBindingContext("movies");
			var sPath = oContext.getPath();
			var aParams = sPath.split("/");

			UIComponent.getRouterFor(this).navTo("Detail", {
				movieId: aParams[2],
				appointmentId: aParams[4]
			});
		}
	});
});