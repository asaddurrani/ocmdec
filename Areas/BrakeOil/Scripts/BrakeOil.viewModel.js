/*
    Module with the view model for the Vehicle
*/
define("brakeOil/brakeOil.viewModel",
    ["jquery", "amplify", "ko", "brakeOil/brakeOil.dataservice", "brakeOil/brakeOil.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.brakeOil = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isBrakeOilLoaded = ko.observable(false),
                    //Power Steering Oils
                    brakeOils = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedBrakeOil = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingBrakeOil = ko.observable(false),
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
                    getBrakeOils = function () {
                        isLoadingBrakeOil(true);
                        dataservice.getBrakeOils({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                brakeOils.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.BrakeOil.Create(item);
                                        brakeOils.push(module);
                                    });
                                }
                                isLoadingBrakeOil(false);
                            },
                            error: function (response) {
                                isLoadingBrakeOil(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createBrakeOil = function () {
                        selectedBrakeOil(new model.BrakeOil.Create({}));
                        view.showBrakeOilDialog();
                    },
                    //Search Power Steering Oil
                    searchBrakeOil = function () {
                        getBrakeOils();
                    },
                    //Delete Power Steering Oil
                    onDeleteBrakeOil = function () {

                    },
                    //Edit Power Steering Oil
                    onEditBrakeOil = function () {
                        if (selectedBrakeOil() != undefined) {
                            view.showBrakeOilDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectBrakeOil = function (brakeOil) {
                        if (selectedBrakeOil() != brakeOil) {
                            selectedBrakeOil(brakeOil);
                        }
                    },
                    //On Save Power Steering Oil
                    onSaveBrakeOil = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveBrakeOil(
                                selectedBrakeOil().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedBrakeOil = model.BrakeOil.Create(data);
                                            if (selectedBrakeOil().powerStereringOilId() <= 0 || selectedBrakeOil().powerStereringOilId() == undefined) {
                                                brakeOils.splice(0, 0, savedBrakeOil);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideBrakeOilDialog();
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
                        if (!selectedBrakeOil().isValid()) {
                            selectedBrakeOil().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseBrakeOilDialog = function () {
                        view.hideBrakeOilDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, brakeOils, getBrakeOils));
                        getBaseData();
                        getBrakeOils();
                    };
                //#endregion


                return {
                    //#region Return
                    isBrakeOilLoaded: isBrakeOilLoaded,
                    brakeOils: brakeOils,
                    searchFilter: searchFilter,
                    selectedBrakeOil: selectedBrakeOil,
                    isLoadingBrakeOil: isLoadingBrakeOil,
                    pager: pager,
                    getBaseData: getBaseData,
                    getBrakeOils: getBrakeOils,
                    createBrakeOil: createBrakeOil,
                    searchBrakeOil: searchBrakeOil,
                    onDeleteBrakeOil: onDeleteBrakeOil,
                    onEditBrakeOil: onEditBrakeOil,
                    selectBrakeOil: selectBrakeOil,
                    onSaveBrakeOil: onSaveBrakeOil,
                    onCloseBrakeOilDialog: onCloseBrakeOilDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.brakeOil.viewModel;
    });
