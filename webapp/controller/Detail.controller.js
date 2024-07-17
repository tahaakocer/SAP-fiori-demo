sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "com/solvia/demo/utils/Helper",
        "sap/m/MessageToast",
        "sap/ui/core/routing/History"
    ],
    function (Controller,
        Helper,
        MessageToast,
        History) {
        "use strict";

        return Controller.extend("com.solvia.demo.controller.Detail", {
            Helper: Helper,
            onInit: function () {

            },
            updateApproval: function (approvalString) {
                var oDataModel = this.getOwnerComponent().getModel("myOdata");
                var globalModel = this.getOwnerComponent().getModel("globalModel");
                var oData = globalModel.getProperty("/details");
                var oEmpData = {
                    Approval: approvalString
                }
                var path = `/studentSet(Id='${oData.Id}',LessonId='${oData.LessonId}')`;
                oDataModel.update(path, oEmpData, {
                    method: "PUT",
                    success: function (data) {
                        MessageToast.show("Öğrenci Durumu Güncellendi.");
                        globalModel.setProperty("/details/Approval", approvalString);
                    },
                    error: function (data) {
                        MessageToast.show("Öğrenci durumu güncellenirken bir hata oluştu.");
                    }
                })



            },
            onAcceptButtonPress: function (oEvent) {
                this.updateApproval("ACCEPT");

            },
            onPendingButtonPress: function (oEvent) {
                this.updateApproval("PENDING");

            },
            onRejectButtonPress: function (oEvent) {
                this.updateApproval("REJECT");

            },
            onGeriDonButtonPress: function (oEvent) {
                console.log("Geri Dön Butonuna Basıldı");
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    console.log("Önceki sayfaya gidiliyor");
                    window.history.go(-1);
                } else {
                    console.log("Router ile Table sayfasına yönlendiriliyor");
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Table", {});
                }
                Helper.refreshTable(this.getOwnerComponent());

            }


        });
    }
);
