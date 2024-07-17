sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "com/solvia/demo/utils/Helper"
    ],
    function (Controller,
	Helper) {
        "use strict";

        return Controller.extend("com.solvia.demo.controller.Detail", {
            Helper: Helper,
            onInit: function () {
                var globalModel = this.getOwnerComponent().getModel("globalModel");
                console.log(globalModel);
            },




        });
    }
);
