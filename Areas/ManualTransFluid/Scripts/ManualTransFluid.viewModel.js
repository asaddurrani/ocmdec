/*
    Module with the view model for the Vehicle
*/
define("manualTransFluid/manualTransFluid.viewModel",
    ["jquery", "amplify", "ko", "manualTransFluid/manualTransFluid.dataservice", "manualTransFluid/manualTransFluid.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.manualTransFluid = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isManualTransFluidLoaded = ko.observable(false),
                    //Power Steering Oils
                    manualTransFluids = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedManualTransFluid = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingManualTransFluid = ko.observable(false),
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
                    getManualTransFluids = function () {
                        isLoadingManualTransFluid(true);
                        dataservice.getManualTransFluids({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                manualTransFluids.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.ManualTransFluid.Create(item);
                                        manualTransFluids.push(module);
                                    });
                                }
                                isLoadingManualTransFluid(false);
                            },
                            error: function (response) {
                                isLoadingManualTransFluid(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createManualTransFluid = function () {
                        selectedManualTransFluid(new model.ManualTransFluid.Create({}));
                        view.showManualTransFluidDialog();
                    },
                    //Search Power Steering Oil
                    searchManualTransFluid = function () {
                        getManualTransFluids();
                    },
                    //Delete Power Steering Oil
                    onDeleteManualTransFluid = function () {

                    },
                    //Edit Power Steering Oil
                    onEditManualTransFluid = function () {
                        if (selectedManualTransFluid() != undefined) {
                            view.showManualTransFluidDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectManualTransFluid = function (manualTransFluid) {
                        if (selectedManualTransFluid() != manualTransFluid) {
                            selectedManualTransFluid(manualTransFluid);
                        }
                    },
                    //On Save Power Steering Oil
                    onSaveManualTransFluid = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveManualTransFluid(
                                selectedManualTransFluid().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedManualTransFluid = model.ManualTransFluid.Create(data);
                                            if (selectedManualTransFluid().powerStereringOilId() <= 0 || selectedManualTransFluid().powerStereringOilId() == undefined) {
                                                manualTransFluids.splice(0, 0, savedManualTransFluid);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideManualTransFluidDialog();
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
                        if (!selectedManualTransFluid().isValid()) {
                            selectedManualTransFluid().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseManualTransFluidDialog = function () {
                        view.hideManualTransFluidDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, manualTransFluids, getManualTransFluids));
                        getBaseData();
                        getManualTransFluids();
                    };
                //#endregion


                return {
                    //#region Return
                    isManualTransFluidLoaded: isManualTransFluidLoaded,
                    manualTransFluids: manualTransFluids,
                    searchFilter: searchFilter,
                    selectedManualTransFluid: selectedManualTransFluid,
                    isLoadingManualTransFluid: isLoadingManualTransFluid,
                    pager: pager,
                    getBaseData: getBaseData,
                    getManualTransFluids: getManualTransFluids,
                    createManualTransFluid: createManualTransFluid,
                    searchManualTransFluid: searchManualTransFluid,
                    onDeleteManualTransFluid: onDeleteManualTransFluid,
                    onEditManualTransFluid: onEditManualTransFluid,
                    selectManualTransFluid: selectManualTransFluid,
                    onSaveManualTransFluid: onSaveManualTransFluid,
                    onCloseManualTransFluidDialog: onCloseManualTransFluidDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.manualTransFluid.viewModel;
    });
