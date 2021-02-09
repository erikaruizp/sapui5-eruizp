//@ts-nocheck
sap.ui.define([
    "sap/ui/model/json/JSONModel"
], 
/**
 * 
 * @param {typeof sap.ui.model.json.JSONModel} JSONModel
 *
 */
function (JSONModel) {

    return {
        createRecipient: function () {
            var oData = {
                recipient: { name: "World" }
            };
            return oModel = new JSONModel(oData);            
        }
    }

});