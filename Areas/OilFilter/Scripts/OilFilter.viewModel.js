/*
    Module with the view model for the Vehicle
*/
define("oilFilter/oilFilter.viewModel",
    ["jquery", "amplify", "ko", "oilFilter/oilFilter.dataservice", "oilFilter/oilFilter.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.oilFilter = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Oil Filter
                    isOilFilterLoaded = ko.observable(false),
                    //Oil Filter Maker Companies
                    oilFilterMakers = ko.observableArray([]),
                    //oil Filter Companies For Dialog
                    oilFilterMakerCompaniesListForDialog = ko.observableArray([]),
                    //oil Filters
                    oilFilters = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //oil Filter Maker Company Filter
                    oilFilterMakerCompanyFilter = ko.observable(),
                    //selected Oil Filter
                    selectedOilFilter = ko.observable(),
                    //Is Loading Oil Filter
                    isLoadingOilFilter = ko.observable(false),
                    //pager
                    pager = ko.observable(),

                    //#endregion

                    //#region Utility Functions 

                    //get Base Data
                    getBaseData = function () {
                        //Get Oil Filter Maker Companies
                        getOilFilterMakerCompanies();
                    },
                    //Get Oil Filter Maker Companies
                    getOilFilterMakerCompanies = function () {
                        dataservice.getOilFilterMakerCompanies({
                            success: function (data) {
                                var oilFilterMakerCompaniesList = [];
                                _.each(data.OilFilterMakerCompanies, function (item) {
                                    var oilFilterMaker = new model.OilFilterMakerCompany.Create(item);
                                    oilFilterMakerCompaniesList.push(oilFilterMaker);
                                });
                                ko.utils.arrayPushAll(oilFilterMakers(), oilFilterMakerCompaniesList);
                                oilFilterMakers.valueHasMutated();
                                ko.utils.arrayPushAll(oilFilterMakerCompaniesListForDialog(), oilFilterMakerCompaniesList);
                                oilFilterMakerCompaniesListForDialog.valueHasMutated();
                            },
                            error: function () {
                                toastr.error("Failed to load oil filter maker companies data");
                            }
                        });
                    },
                    //Get Oil Filters
                    getOilFilters = function () {
                        isLoadingOilFilter(true);
                        dataservice.getOilFilters({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                            OilFilterMakerCompany: oilFilterMakerCompanyFilter()
                        }, {
                            success: function (data) {
                                oilFilters.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.OilFilters, function (item) {
                                        var module = new model.OilFilter.Create(item);
                                        oilFilters.push(module);
                                    });
                                }
                                isLoadingOilFilter(false);
                            },
                            error: function (response) {
                                isLoadingOilFilter(false);
                                toastr.error("Error: Failed to Load Oil Filters Data." + response);
                            }
                        });
                    },
                    //Create Oil Filter
                    createOilFilter = function () {
                        selectedOilFilter(new model.OilFilter.Create({}));
                        view.showOilFilterDialog();
                    },
                    //Search Oil Filter
                    searchOilFilter = function () {
                        getOilFilters();
                    },
                    //Delete oil Filter
                    onDeleteOilFilter = function () {

                    },
                    //Edit Oil Filter
                    onEditOilFilter = function () {
                        if (selectedOilFilter() != undefined) {
                            view.showOilFilterDialog();
                        }
                    },
                    //Select Oil Filter
                    selectOilFilter = function (oil) {
                        if (selectedOilFilter() != oil) {
                            selectedOilFilter(oil);
                        }
                    },
                    //On Save Oil Filter
                    onSaveOilFilter = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveOilFilter(
                                selectedOilFilter().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedOilFilter = model.OilFilter.Create(data);
                                            if (selectedOilFilter().oilFilterId() <= 0 || selectedOilFilter().oilFilterId() == undefined) {
                                                oilFilters.splice(0, 0, savedOilFilter);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideOilFilterDialog();
                                        }
                                    },
                                    error: function (response) {
                                        toastr.error("Error: Failed To Save Oil Filter " + response);
                                    }
                                });
                        }
                    },
                    // Do Before Logic
                    doBeforeSelect = function () {
                        var flag = true;
                        if (!selectedOilFilter().isValid()) {
                            selectedOilFilter().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseOilFilterDialog = function () {
                        view.hideOilFilterDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, oilFilters, getOilFilters));
                        getBaseData();
                        getOilFilters();

                    };
                //#endregion


                return {
                    //#region Return
                    isOilFilterLoaded: isOilFilterLoaded,
                    oilFilterMakers: oilFilterMakers,
                    oilFilterMakerCompaniesListForDialog: oilFilterMakerCompaniesListForDialog,
                    oilFilters: oilFilters,
                    searchFilter: searchFilter,
                    oilFilterMakerCompanyFilter: oilFilterMakerCompanyFilter,
                    selectedOilFilter: selectedOilFilter,
                    isLoadingOilFilter: isLoadingOilFilter,
                    pager: pager,
                    getBaseData: getBaseData,
                    getOilFilterMakerCompanies: getOilFilterMakerCompanies,
                    getOilFilters: getOilFilters,
                    createOilFilter: createOilFilter,
                    searchOilFilter: searchOilFilter,
                    onDeleteOilFilter: onDeleteOilFilter,
                    onEditOilFilter: onEditOilFilter,
                    selectOilFilter: selectOilFilter,
                    onSaveOilFilter: onSaveOilFilter,
                    onCloseOilFilterDialog: onCloseOilFilterDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.oilFilter.viewModel;
    });
