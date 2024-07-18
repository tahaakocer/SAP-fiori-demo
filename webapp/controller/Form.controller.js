sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/BusyIndicator",
    "com/solvia/demo/utils/Helper",
    "sap/ui/core/ValueState"


], function (
    Controller,
    MessageToast,
    BusyIndicator,
    Helper,
    ValueState
) {
    "use strict";

    return Controller.extend("com.solvia.demo.controller.Form", {

        /**
         * @override
         */
        onInit: function () {

            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            var globalModel = this.getOwnerComponent().getModel("globalModel")

            oDataModel.read("/domainSet", {
                success: function (oData) {
                    globalModel.setProperty("/getAllDomains", oData.results);
                    console.log(oData.results)

                },
                error: function (oError) {
                    console.error("domain data okunamadi");
                }
            }
            )
        },
    
        onSaveButtonPress: function (oEvent) {
            var oView = this.getView();
            var iName = oView.byId("idNameInput");
            var iSurname = oView.byId("idSurnameInput");
            var iLesson = oView.byId("idGetAllDomainsSelect");
            var iPoint = oView.byId("idPointInput");

            var sName = iName.getValue();
            var sSurname = iSurname.getValue();
            var sLesson = iLesson.getSelectedKey();
            var sPoint = parseInt(iPoint.getValue(), 10);

            if (sName === null || sName === "") {
                iName.setValueState(ValueState.Error);
                iName.setValueStateText("Bu alan boş bırakılamaz!");
            } else {
                iName.setValueState(ValueState.None);
            }

            if (sSurname === null || sSurname === "") {
                iSurname.setValueState(ValueState.Error);
                iSurname.setValueStateText("Bu alan boş bırakılamaz!");
            } else {
                iSurname.setValueState(ValueState.None);
            }

            if (sLesson === null || sLesson === "") {
                iLesson.setValueState(ValueState.Error);
                iLesson.setValueStateText("Bu alan boş bırakılamaz!");
            } else {
                iLesson.setValueState(ValueState.None);
            }

            if (isNaN(sPoint) || sPoint === null || sPoint === "") {
                iPoint.setValueState(ValueState.Error);
                iPoint.setValueStateText("Bu alan boş bırakılamaz!");
            } else if(sPoint < 0 || sPoint > 100){
                iPoint.setValueState(ValueState.Warning);
                iPoint.setValueStateText("Geçerli bir sayı girmelisiniz. (0-100)");
            }
            else {
                iPoint.setValueState(ValueState.None);
            }

            var oAddEmpData = {
                LessonId: sLesson,
                Name: sName,
                Surname: sSurname,
                Point: sPoint,
                Approval: "PENDING"
            };

            if (Helper.validationForm(oAddEmpData)) {
                this.getOwnerComponent().getModel("myOdata").create("/studentSet", oAddEmpData, {
                    method: "POST",
                    success: function (data) {
                        MessageToast.show("Öğrenci başarıyla eklendi.");
                    },
                    error: function (data) {
                        MessageToast.show("Öğrenci eklenemedi!");
                        console.error("öğrenci eklenemedi!");
                    }
                });
                Helper.refreshTable(this.getOwnerComponent());
            }
            else {
                MessageToast.show("Öğrenci Eklenemedi!");
            }
            
        }
    });
});