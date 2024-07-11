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

    return Controller.extend("com.solvia.demo.controller.Form", {
        _intId: 0,
        /**
         * @override
         */
        onInit: function () {
            this._intId = 1;

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
            //BAŞKA YOLU VAR MI SOR

            var sName = oView.byId("idNameInput").getValue();
            var sSurname = oView.byId("idSurnameInput").getValue();
            var sLesson = oView.byId("idLessonSelect").getSelectedKey();
            var sPoint = parseInt(oView.byId("idPointInput").getValue(), 10);

            oData.students.push({
                id: this._intId++,
                name: sName,
                surname: sSurname,
                lesson: sLesson,
                point: sPoint,
                approval: null
            });
            oModel.setData(oData, "studentData")

            MessageToast.show("Veriler eklendi");

            console.log(oModel)

        }
    });
});