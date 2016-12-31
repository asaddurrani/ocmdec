/*
    Module with the view model for the Vehicle
*/
define("internalSpray/internalSpray.viewModel",
    ["jquery", "amplify", "ko", "internalSpray/internalSpray.dataservice", "internalSpray/internalSpray.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.internalSpray = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isInternalSprayLoaded = ko.observable(false),
                    //Power Steering Oils
                    internalSprays = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedInternalSpray = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingInternalSpray = ko.observable(false),
                    //pager
                    pager = ko.observable(),

                    //#endregion

                    //#region Utility Functions 

                    //get Base Data
                    getBaseData = function () {
                        //Nothing to implement
                        //no base data needed
                    },

                    //Get Power Steering Oil
                    getInternalSprays = function () {
                        isLoadingInternalSpray(true);
                        dataservice.getInternalSprays({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                internalSprays.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.InternalSpray.Create(item);
                                        internalSprays.push(module);
                                    });
                                }
                                isLoadingInternalSpray(false);
                            },
                            error: function (response) {
                                isLoadingInternalSpray(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createInternalSpray = function () {
                        selectedInternalSpray(new model.InternalSpray.Create({}));
                        view.showInternalSprayDialog();
                    },
                    //Search Power Steering Oil
                    searchInternalSpray = function () {
                        getInternalSprays();
                    },
                    //Delete Power Steering Oil
                    onDeleteInternalSpray = function () {

                    },
                    //Edit Power Steering Oil
                    onEditInternalSpray = function () {
                        if (selectedInternalSpray() != undefined) {
                            view.showInternalSprayDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectInternalSpray = function (internalSpray) {
                        if (selectedInternalSpray() != internalSpray) {
                            selectedInternalSpray(internalSpray);
                        }
                    },
                    //On Save Power Steering Oil
                    onSaveInternalSpray = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveInternalSpray(
                                selectedInternalSpray().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedInternalSpray = model.InternalSpray.Create(data);
                                            if (selectedInternalSpray().powerStereringOilId() <= 0 || selectedInternalSpray().powerStereringOilId() == undefined) {
                                                internalSprays.splice(0, 0, savedInternalSpray);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideInternalSprayDialog();
                                        }
                                    },
                                    error: function (response) {
                                        toastr.error("Error: Failed To Save Power Steering Oil " + response);
                                    }
                                });
                        }
                    },
                    // Do Before Logic
                    doBeforeSelect = function () {
                        var flag = true;
                        if (!selectedInternalSpray().isValid()) {
                            selectedInternalSpray().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseInternalSprayDialog = function () {
                        view.hideInternalSprayDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, internalSprays, getInternalSprays));
                        getBaseData();
                        getInternalSprays();
                    };
                //#endregion


                return {
                    //#region Return
                    isInternalSprayLoaded: isInternalSprayLoaded,
                    internalSprays: internalSprays,
                    searchFilter: searchFilter,
                    selectedInternalSpray: selectedInternalSpray,
                    isLoadingInternalSpray: isLoadingInternalSpray,
                    pager: pager,
                    getBaseData: getBaseData,
                    getInternalSprays: getInternalSprays,
                    createInternalSpray: createInternalSpray,
                    searchInternalSpray: searchInternalSpray,
                    onDeleteInternalSpray: onDeleteInternalSpray,
                    onEditInternalSpray: onEditInternalSpray,
                    selectInternalSpray: selectInternalSpray,
                    onSaveInternalSpray: onSaveInternalSpray,
                    onCloseInternalSprayDialog: onCloseInternalSprayDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.internalSpray.viewModel;
    });
