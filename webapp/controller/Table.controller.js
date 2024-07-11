sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/BusyIndicator"
], function (
    Controller,
	MessageToast,
	BusyIndicator
) {
    "use strict";

    return Controller.extend("com.solvia.demo.controller.Table", {
        /**
         * @override
         */
        onInit: function () {

            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            var globalModel = this.getOwnerComponent().getModel("globalModel");

            oDataModel.read("/studentSet", {
                success: function (oData) {
                    globalModel.setProperty("/getAllStudents", oData.results);
                    console.log(oData.results)
                },
                error: function (oError) {
                    console.error("students data okunamadi");
                }
            })

        },
        formatStatusIcon: function (sStatus) {
            if (sStatus == "PENDING") {
                return "sap-icon://pending";
            } else if (sStatus == "APPROVE") {
                return "sap-icon://accept";
            } else if(sStatus == "REJECT") {
                return "sap-icon://decline";
            }
        },

        formatLesson: function (sLesson) {
            switch (sLesson) {
                case "01":
                    return "PROGRAMMING";
                    break;
                case "02":
                    return "MATH"
                    break;
                case "03":
                    return "DATA STRUCTURES AND ALGORITHMS"
                    break;
                case "04":
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

            // Seçili öğrenciyi bul
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
                // diziden sil
                aStudents.splice(iIndex, 1);
            });

            oData.students = aStudents;
            //güncelle
            oModel.refresh();

            MessageToast.show("Seçili öğrenci(ler) silindi.");

            console.log(oModel);
        },

        onUpdateSelectedButtonPress: function (oEvent) {
            //Burası nasıl çalıştı anlamadım
            var oView = this.getView();
            var oModel = oView.getModel("studentModel");

            // Seçili öğrenciyi bul
            var oTable = oView.byId("idTable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0 && aSelectedIndices.length > 1) {
                MessageToast.show("Lütfen güncellenecek bir öğrenci seçin.");
                return;
            }
            var oContext = oTable.getContextByIndex(aSelectedIndices[0]);

            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("com.solvia.demo.view.StudentEdit", this);
                this.getView().addDependent(this._oDialog);
            }
            this._oDialog.bindElement({
                path: oContext.getPath(),
                model: "studentModel"
            });
            this._oDialog.open()

        },

        onSaveButtonPress: function () {
            var oView = this.getView();
            var oModel = oView.getModel("studentModel");

            var oData = oModel.getData();
            oModel.updateBindings(true);

            this._oDialog.close();

            MessageToast.show("Öğrenci bilgileri başarıyla güncellendi.");

        },

        onCancelButtonPress: function (oEvent) {
            this._oDialog.close();
            console.log(this.getView().getModel("studentModel"));
        },
        onShowDetailsButtonPress: function (oEvent) {

            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail");
        }

    });

});