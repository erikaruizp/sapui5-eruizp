// @ts-nocheck
/* eslint-disable no-undef */
sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press"
],
/**
 * @param{typeof sap.ui.test.Opa5} Opa5
 * @param{typeof sap.ui.test.actions.Press} Press
 */
function(Opa5,Press) {
    "use strict";    

    Opa5.createPageObjects({
        onTheAppPage: {
            actions: {
                iSayHelloDialogButton: function() {
                    return this.waitFor({
                        id: "helloDialogButton",
                        viewName: "logaligroup.SAPUI5.view.HelloPanel",
                        actions: new Press(),
                        errorMessage: "No se encontró botón 'Abrir Dialogo' en la vista HelloPanel"
                    });
                }
            },
            assertions: {
                iSeeTheHelloDialog: function() {
                    return this.waitFor({
                        controlType: "sap.m.Dialog",
                        success: function() {
                            Opa5.assert.ok(true,"El diálogo se abrió")
                        },
                        errorMessage:"No se encontró el control de diálogo"
                    });
                }
            }
        }
    });
});