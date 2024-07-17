sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function (Controller) {
        "use strict";

        return Controller.extend("com.solvia.demo.controller.Detail", {
            onInit: function () {
                var globalModel = this.getOwnerComponent().getModel("globalModel");
                console.log(globalModel);
            },




        });
    }
);
