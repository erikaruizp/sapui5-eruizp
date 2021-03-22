// @ts-nocheck
/* eslint-disable no-undef */
sap.ui.define([
    "logaligroup/SAPUI5/localService/mockserver",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel"
],
/**
 * @param{typeof sap.ui.opaQunit} opaQunit
 */
function(mockserver,opaQunit) {
    "use strict";    

    QUnit.module("Navegation");
    opaQunit("Debe abrir el diálogo",function(Given,When,Then) {
        //Iniciar el mockserver
        mockserver.init();
        //Arreglos
        Given.iStartMyUIComponent({
            componentConfig: {
                name: "logaligroup.SAPUI5"
            }
        });
        //Actions
        When.onTheAppPage.iSayHelloDialogButton();
        //Assertions
        Then.onTheAppPage.iSeeTheHelloDialog();

        Then.iTeardownMyApp();
    });
});