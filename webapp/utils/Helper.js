sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/BusyIndicator"
], function (MessageToast, BusyIndicator) {
    "use strict";

    return {
        refreshTable: function (oComponent) {
            var oDataModel = oComponent.getModel("myOdata");
            var globalModel = oComponent.getModel("globalModel");
            BusyIndicator.show();
            oDataModel.read("/studentSet", {
                success: function (oData) {
                    BusyIndicator.hide();
                    globalModel.setProperty("/getAllStudents", oData.results);
                    console.log(oData.results);
                },
                error: function (oError) {
                    BusyIndicator.hide();
                    console.error("students data okunamadi");
                    MessageToast.show("students data okunamadi");
                }
            });
        }
    };
});
