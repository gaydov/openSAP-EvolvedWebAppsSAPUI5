sap.ui.define([], function () {
	"use strict";

	return {
		formatDate: function (sDate) {
			var oDate;

			if (!sDate) {
				oDate = null;
			} else {
				oDate = new Date(sDate);
			}

			return oDate;
		}
	};
});