/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "com/solvia/demo/model/models",
	"sap/ui/model/json/JSONModel"
    ],
    function (UIComponent,
	Device,
	models,
	JSONModel) {
        "use strict";

        return UIComponent.extend("com.solvia.demo.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                const oData = {
                    students: [],
                    selections: []
                }
                const oModel = new JSONModel(oData);
                oData.students.push({
                    id: 0,
                    name: "Bilge",
                    surname: "Erdem",
                    lesson: "1",
                    point: 58,
                    approval: true
                });
                this.setModel(oModel,"studentModel");
                console.log(oData)
            }
        });
    }
);