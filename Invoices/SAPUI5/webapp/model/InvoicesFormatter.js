//@ts-nocheck
sap.ui.define([
   
], 
function () {
    "use strict";
    return {
        invoiceStatus: function(estado) {
            const resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (estado) {
                case 'A': return resourceBundle.getText("invoiceStatusA");
                case 'B': return resourceBundle.getText("invoiceStatusB");
                case 'C': return resourceBundle.getText("invoiceStatusC");
                default: return resourceBundle.getText("invoiceStatusA");//return estado;              
            }
        }

    };
});    