sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("com.solvia.demo.controller.Main", {
            onInit: function () {

            },
            onSavePress: function () {
                MessageToast.show("Save button pressed");
            }
        });
    });
