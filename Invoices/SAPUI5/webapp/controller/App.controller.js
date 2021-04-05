//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], 
/**
 * 
 * @param {typeof sap.ui.core.mvc.Controller} Controller 
 * @param {typeof sap.m.MessageToast} MessageToast 
 *
 */
function (Controller,MessageToast) {

    return Controller.extend("logaligroup.SAPUI5.Component", {

        onInit: function() {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        },
        onOpenDialogHeader: function() {
            this.getOwnerComponent().openHelloDialog();
        }

	});
});