// @ts-nocheck
/* eslint-disable no-undef */
sap.ui.define([
    "logaligroup/SAPUI5/model/InvoicesFormatter",
    "sap/ui/model/resource/ResourceModel"
],
/**
 * @param {typeof sap.ui.model.resource./ResourceModel} ResourceModel
*/
function(InvoicesFormatter,ResourceModel) {
    "use strict";    

    QUnit.module("Estado Facturas",{
        beforeEach: function() {
            this._oResourceModel = new ResourceModel({
                bundleUrl: sap.ui.require.toUrl("logaligroup/SAPUI5/") + "i18n/i18n_es.properties"
            });
        },
        afterEach: function() {
            this._oResourceModel.destroy();
        }
    });

    QUnit.test("Debe retornar el estado de la factura", function(assert) {
        let oModel = this.stub();
        oModel.withArgs("i18n").returns(this._oResourceModel);

        let oViewStub = {
            getModel: oModel
        };

        let oControllerStub = {
            getView: this.stub().returns(oViewStub)
        };

        let fnIsolatedFormatter = InvoicesFormatter.invoiceStatus.bind(oControllerStub);

        //Assert
        assert.strictEqual(fnIsolatedFormatter("A"),"Nuevo","El estado de factura A es correcto");
        assert.strictEqual(fnIsolatedFormatter("B"),"En Progreso","El estado de factura B es correcto");
        assert.strictEqual(fnIsolatedFormatter("C"),"Terminado","El estado de factura C es correcto");
    });
});