sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

], function (
    Controller,
    MessageToast
) {
    "use strict";

    return Controller.extend("com.solvia.demo.controller.Form", {
        /**
         * @override
         */
        onInit: function () {
           

        },
        onSaveButtonPress: function (oEvent) {

            var oView = this.getView();
            //BAŞKA YOLU VAR MI SOR
            var oModel = oView.getModel("studentModel");
            var oData = oModel.getData("studentData");

            var sName = oView.byId("idNameInput").getValue();
            var sSurname = oView.byId("idSurnameInput").getValue();
            var sLesson = oView.byId("idLessonSelect").getSelectedKey();
            var sPoint = oView.byId("idPointInput").getValue();

            oData.students.push({
                name: sName,
                surname: sSurname,
                lesson: sLesson,
                point: sPoint
            });
            oModel.setData(oData,"studentData")

            MessageToast.show("Veriler eklendi");
        
            console.log(oData)

        },
    });
});