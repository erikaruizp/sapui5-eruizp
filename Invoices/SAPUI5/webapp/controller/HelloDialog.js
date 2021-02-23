//@ts-nocheck
sap.ui.define([
    "sap/ui/core/Fragment",
    "sap/ui/base/ManagedObject"
], 
/**
 * @param {typeof sap.ui.core.Fragment} Fragment 
 * @param {typeof sap.ui.base.ManagedObject} ManagedObject 
 */
function (Fragment,ManagedObject) {
    "use strict";
    return ManagedObject.extend("logaligroup.SAPUI5.controller.HelloDialog", {

        constructor:function(oView){
            this._oView = oView;
        },
        exit: function(){
            delete this._oView;
        },
        open: function(){
            const oView = this._oView;
            if (!oView.byId("helloDialog")){

                let oFragmentController = {
                    onCloseDialog: function() {
                        oView.byId("helloDialog").close();   
                    }                    
                };

                Fragment.load({
                    id:oView.getId(),
                    name:"logaligroup.SAPUI5.view.HelloDialog",
                    controller: oFragmentController
                }).then(function(oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            }else{
                oView.byId("helloDialog").open();
            }
        }
    });    
});