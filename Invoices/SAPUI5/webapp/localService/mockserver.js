// @ts-nocheck
sap.ui.define([
"sap/ui/core/util/MockServer",
"sap/ui/model/json/JSONModel",
"sap/base/util/UriParameters",
"sap/base/Log"
], 
/**
 * @param {typeof sap.ui.core.util.MockServer } MockServer
 * @param {typeof sap.ui.model.json.JSONModel } JSONModel
 * @param {typeof sap.base.util.UriParameters } UriParameters
 * @param {typeof sap.base.Log } Log
 */
function(MockServer,JSONModel,UriParameters,Log){
    "use strict";
    var oMockServer,
        _sAppPath = "logaligroup/SAPUI5/",
        _sJsonFilesPath = _sAppPath + "localService/mockdata";

    var oMockServerInterface = {

        /**
         * Inicializa el mockserver asincronamente
         * @protected
         * @param {object} oOptionsParameter
         * @returns {Promise} promise que sera resuelta cuando el mockserver se ha inicializado
         */        
        init: function(oOptionsParameter){
            var oOptions = oOptionsParameter || {};

            return new Promise (function(fnResolve,fnReject) {                
                var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                    oManifestModel = new JSONModel(sManifestUrl);

                oManifestModel.attachRequestCompleted(function(){
                    var oUriParameters = new UriParameters(window.location.href);

                    var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                    var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                    var oMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);
                    // asegura que hay una barra al final dela URL                    
                    var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();
                    // crear instancia de mockserver o parar el existente para reinicializar
                    if (!oMockServer) {
                        oMockServer = new MockServer({
                            rootUri: sMockServerUrl
                        });
                    } else {
                        oMockServer.stop();
                    }
                    //configura las opciones del mockserver con las opciones entregadas o un delay por defecto de 0.5s
                    MockServer.config({
                        autoRespond: true,
                        autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500 )
                    });
                    //simular usando mockdata
                    oMockServer.simulate(oMetadataUrl, {
                        sMockdataBaseUrl: sJsonFilesUrl,
                        bGenerateMissingMockData: true
                    });
                    var aRequests = oMockServer.getRequests();
                    //armar un mensaje de error por cada petición
                    var fnResponse = function (iErrCode,sMessage,aRequest) {
                        aRequest.response = function (oXhr) {
                            oXhr.respond(iErrCode,{"Content-Type":"text/plain;charset=utf-8"},sMessage);
                        };
                    };
                    //simular los errores de metadata
                    if (oOptions.metadaError || oUriParameters.get("metadataError")) {
                        aRequests.forEach(function(aEntry) {
                            if (aEntry.path.toString().indexof("$metadata") > -1) {
                                fnResponse(500, "Metadata Error", aEntry);
                            }
                        });
                    };
                    //simular los error por petición
                    var sErrorParam = oOptions.errorType ||  oUriParameters.get("errorType");
                    var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;
                    if (sErrorParam) {
                        aRequests.forEach(function(aEntry) {
                            fnResponse(iErrorCode, sErrorParam, aEntry);
                        });
                    };
                    //asignar petición e inicializar servidor
                    oMockServer.setRequests(aRequests);
                    oMockServer.start();

                    Log.info("Ejecutando la app con mockdata");
                    fnResolve();                    
                });   
                oManifestModel.attachRequestFailed(function() {
                    var sError = "Error al cargar el Manifest de la aplicación";
                    Log.error(sError);
                    fnReject(new Error(sError));
                });

            });
        }

    };

    return oMockServerInterface;

});