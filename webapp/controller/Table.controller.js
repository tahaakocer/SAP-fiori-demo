sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/BusyIndicator",
    "com/solvia/demo/utils/Helper"  // Yeni yardımcı modülü import edin
], function (
    Controller,
    MessageToast,
    BusyIndicator,
    Helper
) {
    "use strict";

    return Controller.extend("com.solvia.demo.controller.Table", {
        /**
         * @override
         */

        onInit: function () {
            Helper.refreshTable(this.getOwnerComponent());
        },

        formatStatusIcon: function (sStatus) {
            if (sStatus == "PENDING") {
                return "sap-icon://pending";
            } else if (sStatus == "APPROVE") {
                return "sap-icon://accept";
            } else if (sStatus == "REJECT") {
                return "sap-icon://decline";
            }
        },

        formatLesson: function (sLesson) {
            switch (sLesson) {
                case "01":
                    return "PROGRAMMING";
                case "02":
                    return "MATH";
                case "03":
                    return "DATA STRUCTURES AND ALGORITHMS";
                case "04":
                    return "STATISTICS";
                default:
                    return "ERROR";
            }
        },

        onButtonClearPress: function (oEvent) {
            this.byId("idTable").clearSelection();
        },

        onDeleteSelectedButtonPress: function (oEvent) {
            var oTable = this.byId("idTable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                sap.m.MessageToast.show("Silmek için en az bir öğrenci seçmelisiniz!");
                return;
            }

            var aSelectedStudents = [];
            aSelectedIndices.forEach(function (index) {
                var oStudent = oTable.getContextByIndex(index).getObject();
                aSelectedStudents.push(oStudent);
            });
            this.deleteSelectedStudents(aSelectedStudents);
            Helper.refreshTable(this.getOwnerComponent());
        },

        deleteSelectedStudents: function (aSelectedStudents) {
            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            aSelectedStudents.forEach(function (oStudent) {
                var sStudentPath = `/studentSet(Id='${oStudent.Id}',LessonId='${oStudent.LessonId}')`;
                oDataModel.remove(sStudentPath, {
                    success: function () {
                        MessageToast.show("Seçili öğrenci(ler) silindi.");
                    },
                    error: function () {
                        sap.m.MessageToast.show("Öğrenci silinirken bir hata oluştu.");
                    }
                });
            });
        },

        onUpdateSelectedButtonPress: function (oEvent) {
            var oView = this.getView();
            var oModel = oView.getModel("studentModel");

            var oTable = oView.byId("idTable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0 || aSelectedIndices.length > 1) {
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
            this._oDialog.open();
        },

        onSaveButtonPress: function () {
            MessageToast.show("Öğrenci bilgileri başarıyla güncellendi.");
            Helper.refreshTable(this.getOwnerComponent());
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
