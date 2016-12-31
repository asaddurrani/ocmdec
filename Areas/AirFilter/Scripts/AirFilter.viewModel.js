/*
    Module with the view model for the Vehicle
*/
define("airFilter/airFilter.viewModel",
    ["jquery", "amplify", "ko", "airFilter/airFilter.dataservice", "airFilter/airFilter.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.airFilter = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Air Filters
                    isAirFilterLoaded = ko.observable(false),
                    //Air Filters
                    airFilters = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Air Filter
                    selectedAirFilter = ko.observable(),
                    //Is Loading Air Filter
                    isLoadingAirFilter = ko.observable(false),
                    //pager
                    pager = ko.observable(),

                    //#endregion

                    //#region Utility Functions 

                    //get Base Data
                    getBaseData = function () {
                        //Nothing to implement
                        //no base data needed
                    },
                    
                    //Get Air Filters
                    getAirFilters = function () {
                        isLoadingAirFilter(true);
                        dataservice.getAirFilters({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                airFilters.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.AirFilters, function (item) {
                                        var module = new model.AirFilter.Create(item);
                                        airFilters.push(module);
                                    });
                                }
                                isLoadingAirFilter(false);
                            },
                            error: function (response) {
                                isLoadingAirFilter(false);
                                toastr.error("Error: Failed to Load Air Filter Data." + response);
                            }
                        });
                    },
                    //Create Air Filter
                    createAirFilter = function () {
                        selectedAirFilter(new model.AirFilter.Create({}));
                        view.showAirFilterDialog();
                    },
                    //Search Air Filter
                    searchAirFilter = function () {
                        getAirFilters();
                    },
                    //Delete Air Filter
                    onDeleteAirFilter = function () {

                    },
                    //Edit Air Filter
                    onEditAirFilter = function () {
                        if (selectedAirFilter() != undefined) {
                            view.showAirFilterDialog();
                        }
                    },
                    //Select Air Filter
                    selectAirFilter = function (airFilter) {
                        if (selectedAirFilter() != airFilter) {
                            selectedAirFilter(airFilter);
                        }
                    },
                    //On Save Air Filter
                    onSaveAirFilter = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveAirFilter(
                                selectedAirFilter().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedAirFilter = model.AirFilter.Create(data);
                                            if (selectedAirFilter().airFilterId() <= 0 || selectedAirFilter().airFilterId() == undefined) {
                                                airFilters.splice(0, 0, savedAirFilter);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideAirFilterDialog();
                                        }
                                    },
                                    error: function (response) {
                                        toastr.error("Error: Failed To Save AirFilter " + response);
                                    }
                                });
                        }
                    },
                    // Do Before Logic
                    doBeforeSelect = function () {
                        var flag = true;
                        if (!selectedAirFilter().isValid()) {
                            selectedAirFilter().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseAirFilterDialog = function () {
                        view.hideAirFilterDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, airFilters, getAirFilters));
                        getBaseData();
                        getAirFilters();

                    };
                //#endregion


                return {
                    //#region Return
                    isAirFilterLoaded: isAirFilterLoaded,
                    airFilters: airFilters,
                    searchFilter: searchFilter,
                    selectedAirFilter: selectedAirFilter,
                    isLoadingAirFilter: isLoadingAirFilter,
                    pager: pager,
                    getBaseData: getBaseData,
                    getAirFilters: getAirFilters,
                    createAirFilter: createAirFilter,
                    searchAirFilter: searchAirFilter,
                    onDeleteAirFilter: onDeleteAirFilter,
                    onEditAirFilter: onEditAirFilter,
                    selectAirFilter: selectAirFilter,
                    onSaveAirFilter: onSaveAirFilter,
                    onCloseAirFilterDialog: onCloseAirFilterDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.airFilter.viewModel;
    });
