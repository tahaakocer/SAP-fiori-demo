sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (
    Controller
) {
    "use strict";

    return Controller.extend("com.solvia.demo.controller.Table", {
        /**
         * @override
         */
        onInit: function () {

        },
        formatStatusIcon: function (sStatus) {
            if (sStatus == null) {
                return "sap-icon://pending";
            } else if (sStatus == true) {
                return "sap-icon://accept";
            } else {
                return "sap-icon://decline";
            }
        },

        formatLesson: function (sLesson) {
            switch (sLesson) {
                case 1:
                    return "PROGRAMMING";
                    break;
                case 2:
                    return "MATH"
                    break;
                case 3:
                    return "DATA STRUCTURES AND ALGORITHMS"
                    break;
                case 4:
                    return "STATISTICS"
                    break;

                default:
                    return "ERROR"
                    break;
            }
        }

    });

});