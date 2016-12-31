/*
    Module with the view model for the Vehicle
*/
define("fuelFilter/fuelFilter.viewModel",
    ["jquery", "amplify", "ko", "fuelFilter/fuelFilter.dataservice", "fuelFilter/fuelFilter.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.fuelFilter = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isFuelFilterLoaded = ko.observable(false),
                    //Power Steering Oils
                    fuelFilters = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedFuelFilter = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingFuelFilter = ko.observable(false),
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
                    getFuelFilters = function () {
                        isLoadingFuelFilter(true);
                        dataservice.getFuelFilters({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                fuelFilters.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.FuelFilter.Create(item);
                                        fuelFilters.push(module);
                                    });
                                }
                                isLoadingFuelFilter(false);
                            },
                            error: function (response) {
                                isLoadingFuelFilter(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createFuelFilter = function () {
                        selectedFuelFilter(new model.FuelFilter.Create({}));
                        view.showFuelFilterDialog();
                    },
                    //Search Power Steering Oil
                    searchFuelFilter = function () {
                        getFuelFilters();
                    },
                    //Delete Power Steering Oil
                    onDeleteFuelFilter = function () {

                    },
                    //Edit Power Steering Oil
                    onEditFuelFilter = function () {
                        if (selectedFuelFilter() != undefined) {
                            view.showFuelFilterDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectFuelFilter = function (fuelFilter) {
                        if (selectedFuelFilter() != fuelFilter) {
                            selectedFuelFilter(fuelFilter);
                        }
                    },
                    //On Save Power Steering Oil
                    onSaveFuelFilter = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveFuelFilter(
                                selectedFuelFilter().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedFuelFilter = model.FuelFilter.Create(data);
                                            if (selectedFuelFilter().powerStereringOilId() <= 0 || selectedFuelFilter().powerStereringOilId() == undefined) {
                                                fuelFilters.splice(0, 0, savedFuelFilter);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideFuelFilterDialog();
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
                        if (!selectedFuelFilter().isValid()) {
                            selectedFuelFilter().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseFuelFilterDialog = function () {
                        view.hideFuelFilterDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, fuelFilters, getFuelFilters));
                        getBaseData();
                        getFuelFilters();
                    };
                //#endregion


                return {
                    //#region Return
                    isFuelFilterLoaded: isFuelFilterLoaded,
                    fuelFilters: fuelFilters,
                    searchFilter: searchFilter,
                    selectedFuelFilter: selectedFuelFilter,
                    isLoadingFuelFilter: isLoadingFuelFilter,
                    pager: pager,
                    getBaseData: getBaseData,
                    getFuelFilters: getFuelFilters,
                    createFuelFilter: createFuelFilter,
                    searchFuelFilter: searchFuelFilter,
                    onDeleteFuelFilter: onDeleteFuelFilter,
                    onEditFuelFilter: onEditFuelFilter,
                    selectFuelFilter: selectFuelFilter,
                    onSaveFuelFilter: onSaveFuelFilter,
                    onCloseFuelFilterDialog: onCloseFuelFilterDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.fuelFilter.viewModel;
    });
