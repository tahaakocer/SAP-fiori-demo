sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

], function (
    Controller,
    MessageToast
) {
    "use strict";

    return Controller.extend("com.solvia.demo.controller.Form", {
        _intId: 0,
        /**
         * @override
         */
        onInit: function () {
            this._intId = 1;
        },

        onSaveButtonPress: function (oEvent) {

            var oView = this.getView();
            //BAŞKA YOLU VAR MI SOR
            var oModel = oView.getModel("studentModel");
            var oData = oModel.getData("studentData");

            var sName = oView.byId("idNameInput").getValue();
            var sSurname = oView.byId("idSurnameInput").getValue();
            var sLesson = parseInt(oView.byId("idLessonSelect").getSelectedKey(), 10);

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

        },
    });
});