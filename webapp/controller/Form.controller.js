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
            this._intId = 0;
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
                id: this._intId++,
                name: sName,
                surname: sSurname,
                lesson: sLesson,
                point: sPoint,
                approval: null
            });
            oModel.setData(oData,"studentData")

            MessageToast.show("Veriler eklendi");
        
            console.log(oModel)

        },
    });
});