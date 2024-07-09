sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (
    Controller,
	MessageToast
) {
    "use strict";

    return Controller.extend("com.solvia.demo.controller.Table", {
        /**
         * @override
         */
        onInit: function () {

        },
        formatStatusIcon: function (sStatus) {
            if (sStatus == null) {
                return "sap-icon://pending";
            } else if (sStatus == true) {
                return "sap-icon://accept";
            } else {
                return "sap-icon://decline";
            }
        },

        formatLesson: function (sLesson) {
            switch (sLesson) {
                case 1:
                    return "PROGRAMMING";
                    break;
                case 2:
                    return "MATH"
                    break;
                case 3:
                    return "DATA STRUCTURES AND ALGORITHMS"
                    break;
                case 4:
                    return "STATISTICS"
                    break;

                default:
                    return "ERROR"
                    break;
            }
        },

        onButtonClearPress: function (oEvent) {
            this.byId("idTable").clearSelection();
        },
        onDeleteSelectedButtonPress: function (oEvent) {
            var oView = this.getView();
            var oModel = oView.getModel("studentModel");
            var oData = oModel.getData("studentData");

            // Seçili öğrenciyi bulma (örneğin tablodan)
            var oTable = oView.byId("idTable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                MessageToast.show("Lütfen silinecek bir öğrenci seçin.");
                return;
            }

            var aStudents = oData.students;

            aSelectedIndices.sort(function (a, b) {
                return b - a;
            });

            aSelectedIndices.forEach(function (iIndex) {
                // Öğrenciyi diziden silme
                aStudents.splice(iIndex, 1);
            });

            oData.students = aStudents;
            // Veri modelini güncelleme
            oModel.refresh();

            MessageToast.show("Seçili öğrenci(ler) silindi.");

            console.log(oModel);
        }

    });

});