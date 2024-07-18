sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/BusyIndicator",
    "com/solvia/demo/utils/Helper",
    "sap/ui/core/Fragment"
], function (
    Controller,
    MessageToast,
    BusyIndicator,
    Helper,
    Fragment
) {
    "use strict";

    return Controller.extend("com.solvia.demo.controller.Table", {
        /**
         * @override
         */
        Helper: Helper,


        onInit: function () {
            this.byId("idUpdateSelectedButton").setEnabled(false);
            this.byId("idDeleteSelectedButton").setEnabled(false);
            Helper.refreshTable(this.getOwnerComponent());
        },
        formatStatusIcon: function (sStatus) {
            if (sStatus == "PENDING") {
                return "sap-icon://pending";
            } else if (sStatus == "ACCEPT") {
                return "sap-icon://accept";
            } else if (sStatus == "REJECT") {
                return "sap-icon://decline";
            }
        },
       
        onButtonClearPress: function (oEvent) {
            this.byId("idTable").clearSelection();
        },

        onDeleteSelectedButtonPress: function (oEvent) {
            var oTable = this.byId("idTable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                sap.m.MessageToast.show("Silmek için en az bir öğrenci seçmelisiniz!");
                return;
            }
            var aSelectedStudents = [];
            aSelectedIndices.forEach(function (index) {
                var oStudent = oTable.getContextByIndex(index).getObject();
                aSelectedStudents.push(oStudent);
            });
            this.deleteSelectedStudents(aSelectedStudents);
            Helper.refreshTable(this.getOwnerComponent());
        },
        deleteSelectedStudents: function (aSelectedStudents) {
            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            aSelectedStudents.forEach(oStudent => {
                var sStudentPath = `/studentSet(Id='${oStudent.Id}',LessonId='${oStudent.LessonId}')`;
                oDataModel.remove(sStudentPath, {
                    success: function () {
                        MessageToast.show("Seçili öğrenci(ler) silindi.");
                    },
                    error: function () {
                        sap.m.MessageToast.show("Öğrenci silinirken bir hata oluştu.");
                        console.log("hata");
                    }
                });
            });
            this.byId("idTable").clearSelection();
        },
        onUpdateSelectedButtonPress: function (oEvent) {
            var oView = this.getView();
            var oTable = oView.byId("idTable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length !== 1) {
                MessageToast.show("Lütfen güncellenecek bir öğrenci seçin.");
                return;
            }

            var oContext = oTable.getContextByIndex(aSelectedIndices[0]);
            var oData = oContext.getObject();

            this.getOwnerComponent().getModel("globalModel").setProperty("/updateList", {
                id: oData.Id,
                name: oData.Name,
                surname: oData.Surname,
                lesson: oData.LessonId,
                point: oData.Point,
                approval: oData.Approval
            });

            if (!this._oDialog) {
                Fragment.load({
                    name: "com.solvia.demo.view.StudentEdit",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    oView.addDependent(this._oDialog);
                    this._oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.open();
            }
        },

        onSaveButtonPress: function () {

            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            
            var oTable = this.byId("idTable");
            var aSelectedIndices = oTable.getSelectedIndices();
            var oContext = oTable.getContextByIndex(aSelectedIndices[0]);
            var oData = oContext.getObject();

            var sId = sap.ui.getCore().byId('idIdInput').getValue();
            var sName = sap.ui.getCore().byId('idNameInput').getValue();
            var sSurname = sap.ui.getCore().byId('idSurnameInput').getValue();
            var sLesson = sap.ui.getCore().byId('idGetAllDomainsSelect').getSelectedKey();
            var sPoint = Number(sap.ui.getCore().byId('idPointInput').getValue());
            var sApproval = sap.ui.getCore().byId('idApprovalSelect').getSelectedKey();

            var oEmpData = {
                LessonId: sLesson,
                Name: sName,
                Surname: sSurname,
                Point: sPoint,
                Approval: sApproval
            };
            console.log(oEmpData); 
            var path = `/studentSet(Id='${oData.Id}',LessonId='${oData.LessonId}')`;
            console.log(path);

            if(Helper.validationForm(oEmpData)){
                oDataModel.update(path, oEmpData, {
                    method: "PUT",
                    success: function (data) {
                        MessageToast.show("Öğrenci başarıyla güncellendi.");
                    },
                    error: function (data) {
                        MessageToast.show("Öğrenci güncellenirken bir hata oluştu.");
                    }
                });
                Helper.refreshTable(this.getOwnerComponent());
                this.byId("idTable").clearSelection();
                this._oDialog.close();
            }else {
                MessageToast.show("Boş alan bırakmayınız!")
            }
           
            
        },

        onCancelButtonPress: function (oEvent) {
            this._oDialog.close();
            console.log(this.getView().getModel("studentModel"));
        },

        onShowDetailsButtonPress: function (oEvent) {
            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            var globalModel = this.getOwnerComponent().getModel("globalModel");
            
            var oButton= oEvent.getSource();
            var oBindingContext = oButton.getBindingContext("globalModel");
            var oData = oBindingContext.getObject();
            console.log(oData);

            globalModel.setProperty("/details",{
                Id: oData.Id,
                Name: oData.Name,
                Surname: oData.Surname,
                LessonId: oData.LessonId,
                Point: oData.Point,
                Approval: oData.Approval
            })

            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail");
        },

        onTableRowSelectionChange: function (oEvent) {
            // Seçili öğeleri kontrol et
            var oTable = this.byId('idTable');

            var selected = oTable.getSelectedIndices();

            // Butonları güncelle
            var bEnabled = selected !== -1;
            this.byId('idUpdateSelectedButton').setEnabled(bEnabled);
            this.byId("idDeleteSelectedButton").setEnabled(bEnabled);
        }
    });
});
