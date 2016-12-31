/*
    Module with the view model for the Vehicle
*/
define("oil/oil.viewModel",
    ["jquery", "amplify", "ko", "oil/oil.dataservice", "oil/oil.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.oil = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Vehicles
                    isOilLoaded = ko.observable(false),
                    //Oil Maker Companies
                    oilMakers = ko.observableArray([]),
                    //oil Companies For Dialog
                    oilMakerCompaniesListForDialog = ko.observableArray([]),
                    //oils
                    oils = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //oil Maker Company Filter
                    oilMakerCompanyFilter = ko.observable(),
                    //selected Oil
                    selectedOil = ko.observable(),
                    //Is Loading Oil
                    isLoadingOil = ko.observable(false),
                    //pager
                    pager = ko.observable(),

                    //#endregion

                    //#region Utility Functions 

                    //get Base Data
                    getBaseData = function () {
                        //Get Oil Maker Companies
                        getOilMakerCompanies();
                    },
                    //Get Oil Maker Companies
                    getOilMakerCompanies = function () {
                        dataservice.getOilMakerCompanies({
                            success: function (data) {
                                var oilMakerCompaniesList = [];
                                _.each(data.OilMakerCompanies, function (item) {
                                    var oilMaker = new model.OilMakerCompany.Create(item);
                                    oilMakerCompaniesList.push(oilMaker);
                                });
                                ko.utils.arrayPushAll(oilMakers(), oilMakerCompaniesList);
                                oilMakers.valueHasMutated();
                                ko.utils.arrayPushAll(oilMakerCompaniesListForDialog(), oilMakerCompaniesList);
                                oilMakerCompaniesListForDialog.valueHasMutated();
                            },
                            error: function () {
                                toastr.error("Failed to load oil maker companies data");
                            }
                        });
                    },
                    //Get Oils
                    getOils = function () {
                        isLoadingOil(true);
                        dataservice.getOils({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                            OilMakerCompany: oilMakerCompanyFilter()
                        }, {
                            success: function (data) {
                                oils.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.Oils, function (item) {
                                        var module = new model.Oil.Create(item);
                                        oils.push(module);
                                    });
                                }
                                isLoadingOil(false);
                            },
                            error: function (response) {
                                isLoadingOil(false);
                                toastr.error("Error: Failed to Load Oils Data." + response);
                            }
                        });
                    },
                    //Create Oil
                    createOil = function () {
                        selectedOil(new model.Oil.Create({}));
                        view.showOilDialog();
                    },
                    //Search Oil
                    searchOil = function () {
                        getOils();
                    },
                    //Delete oil
                    onDeleteOil = function () {

                    },
                    //Edit Oil
                    onEditOil = function () {
                        if (selectedOil() != undefined) {
                            view.showOilDialog();
                        }
                    },
                    //Select Oil
                    selectOil = function (oil) {
                        if (selectedOil() != oil) {
                            selectedOil(oil);
                        }
                    },
                    //On Save Oil
                    onSaveOil = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveOil(
                                selectedOil().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedOil = model.Oil.Create(data);
                                            if (selectedOil().oilId() <= 0 || selectedOil().oilId() == undefined) {
                                                oils.splice(0, 0, savedOil);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideOilDialog();
                                        }
                                    },
                                    error: function (response) {
                                        toastr.error("Error: Failed To Save Oil " + response);
                                    }
                                });
                        }
                    },
                    // Do Before Logic
                    doBeforeSelect = function () {
                        var flag = true;
                        if (!selectedOil().isValid()) {
                            selectedOil().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseOilDialog = function () {
                        view.hideOilDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, oils, getOils));
                        getBaseData();
                        getOils();

                    };
                //#endregion


                return {
                    //#region Return
                    isOilLoaded: isOilLoaded,
                    oilMakers: oilMakers,
                    oilMakerCompaniesListForDialog: oilMakerCompaniesListForDialog,
                    oils: oils,
                    searchFilter: searchFilter,
                    oilMakerCompanyFilter: oilMakerCompanyFilter,
                    selectedOil: selectedOil,
                    isLoadingOil: isLoadingOil,
                    pager: pager,
                    getBaseData: getBaseData,
                    getOilMakerCompanies: getOilMakerCompanies,
                    getOils: getOils,
                    createOil: createOil,
                    searchOil: searchOil,
                    onDeleteOil: onDeleteOil,
                    onEditOil: onEditOil,
                    selectOil: selectOil,
                    onSaveOil: onSaveOil,
                    onCloseOilDialog: onCloseOilDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.oil.viewModel;
    });
