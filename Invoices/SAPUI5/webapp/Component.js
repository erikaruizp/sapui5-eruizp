// @ts-nocheck
sap.ui.define([
"sap/ui/core/UIComponent",
"logaligroup/SAPUI5/model/Models",
"sap/ui/model/resource/ResourceModel"
], 
/**
 * @param {typeof sap.ui.core.UIComponent } UIComponent
 * @param {typeof logaligroup.SAPUI5.model.Models } Models
 * @param {typeof sap.ui.model.resource.ResourceModel } ResourceModel
 */
function(UIComponent,Models,ResourceModel){
    return UIComponent.extend("logaligroup.SAPUI5.Component",{
        metadata: {
            manifest: "json"
            // "rootView":{"viewName":"logaligroup.SAPUI5.view.App","type":"XML","async":true,"id":"app"}
        },
        init: function() {
            UIComponent.prototype.init.apply(this,arguments);

            this.setModel(Models.createRecipient());

            var i18nModel = new ResourceModel({ bundleName: "logaligroup.SAPUI5.i18n.i18n" });
            this.setModel(i18nModel,"i18n");
        }
    });
});