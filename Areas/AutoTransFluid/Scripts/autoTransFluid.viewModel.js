/*
    Module with the view model for the Vehicle
*/
define("autoTransFluid/autoTransFluid.viewModel",
    ["jquery", "amplify", "ko", "autoTransFluid/autoTransFluid.dataservice", "autoTransFluid/autoTransFluid.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.autoTransFluid = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Vehicles
                    isAutoTransFluidLoaded = ko.observable(false),
                    //AutoTransFluid Maker Companies
                    autoTransFluidMakers = ko.observableArray([]),
                    //autoTransFluid Companies For Dialog
                    autoTransFluidMakerCompaniesListForDialog = ko.observableArray([]),
                    //autoTransFluids
                    autoTransFluids = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //autoTransFluid Maker Company Filter
                    autoTransFluidMakerCompanyFilter = ko.observable(),
                    //selected AutoTransFluid
                    selectedAutoTransFluid = ko.observable(),
                    //Is Loading AutoTransFluid
                    isLoadingAutoTransFluid = ko.observable(false),
                    //pager
                    pager = ko.observable(),

                    //#endregion

                    //#region Utility Functions 

                    //get Base Data
                    getBaseData = function () {
                        //Get AutoTransFluid Maker Companies
                        getAutoTransFluidMakerCompanies();
                    },
                    //Get AutoTransFluid Maker Companies
                    getAutoTransFluidMakerCompanies = function () {
                        dataservice.getAutoTransFluidMakerCompanies({
                            success: function (data) {
                                var autoTransFluidMakerCompaniesList = [];
                                _.each(data.AutoTransFluidMakerCompanies, function (item) {
                                    var autoTransFluidMaker = new model.AutoTransFluidMakerCompany.Create(item);
                                    autoTransFluidMakerCompaniesList.push(autoTransFluidMaker);
                                });
                                ko.utils.arrayPushAll(autoTransFluidMakers(), autoTransFluidMakerCompaniesList);
                                autoTransFluidMakers.valueHasMutated();
                                ko.utils.arrayPushAll(autoTransFluidMakerCompaniesListForDialog(), autoTransFluidMakerCompaniesList);
                                autoTransFluidMakerCompaniesListForDialog.valueHasMutated();
                            },
                            error: function () {
                                toastr.error("Failed to load autoTransFluid maker companies data");
                            }
                        });
                    },
                    //Get AutoTransFluids
                    getAutoTransFluids = function () {
                        isLoadingAutoTransFluid(true);
                        dataservice.getAutoTransFluids({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                            AutoTransFluidMakerCompany: autoTransFluidMakerCompanyFilter()
                        }, {
                            success: function (data) {
                                autoTransFluids.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.AutoTransFluids, function (item) {
                                        var module = new model.AutoTransFluid.Create(item);
                                        autoTransFluids.push(module);
                                    });
                                }
                                isLoadingAutoTransFluid(false);
                            },
                            error: function (response) {
                                isLoadingAutoTransFluid(false);
                                toastr.error("Error: Failed to Load AutoTransFluids Data." + response);
                            }
                        });
                    },
                    //Create AutoTransFluid
                    createAutoTransFluid = function () {
                        selectedAutoTransFluid(new model.AutoTransFluid.Create({}));
                        view.showAutoTransFluidDialog();
                    },
                    //Search AutoTransFluid
                    searchAutoTransFluid = function () {
                        getAutoTransFluids();
                    },
                    //Delete autoTransFluid
                    onDeleteAutoTransFluid = function () {

                    },
                    //Edit AutoTransFluid
                    onEditAutoTransFluid = function () {
                        if (selectedAutoTransFluid() != undefined) {
                            view.showAutoTransFluidDialog();
                        }
                    },
                    //Select AutoTransFluid
                    selectAutoTransFluid = function (autoTransFluid) {
                        if (selectedAutoTransFluid() != autoTransFluid) {
                            selectedAutoTransFluid(autoTransFluid);
                        }
                    },
                    //On Save AutoTransFluid
                    onSaveAutoTransFluid = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveAutoTransFluid(
                                selectedAutoTransFluid().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedAutoTransFluid = model.AutoTransFluid.Create(data);
                                            if (selectedAutoTransFluid().autoTransFluidId() <= 0 || selectedAutoTransFluid().autoTransFluidId() == undefined) {
                                                autoTransFluids.splice(0, 0, savedAutoTransFluid);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideAutoTransFluidDialog();
                                        }
                                    },
                                    error: function (response) {
                                        toastr.error("Error: Failed To Save AutoTransFluid " + response);
                                    }
                                });
                        }
                    },
                    // Do Before Logic
                    doBeforeSelect = function () {
                        var flag = true;
                        if (!selectedAutoTransFluid().isValid()) {
                            selectedAutoTransFluid().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseAutoTransFluidDialog = function () {
                        view.hideAutoTransFluidDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, autoTransFluids, getAutoTransFluids));
                        getBaseData();
                        getAutoTransFluids();

                    };
                //#endregion


                return {
                    //#region Return
                    isAutoTransFluidLoaded: isAutoTransFluidLoaded,
                    autoTransFluidMakers: autoTransFluidMakers,
                    autoTransFluidMakerCompaniesListForDialog: autoTransFluidMakerCompaniesListForDialog,
                    autoTransFluids: autoTransFluids,
                    searchFilter: searchFilter,
                    autoTransFluidMakerCompanyFilter: autoTransFluidMakerCompanyFilter,
                    selectedAutoTransFluid: selectedAutoTransFluid,
                    isLoadingAutoTransFluid: isLoadingAutoTransFluid,
                    pager: pager,
                    getBaseData: getBaseData,
                    getAutoTransFluidMakerCompanies: getAutoTransFluidMakerCompanies,
                    getAutoTransFluids: getAutoTransFluids,
                    createAutoTransFluid: createAutoTransFluid,
                    searchAutoTransFluid: searchAutoTransFluid,
                    onDeleteAutoTransFluid: onDeleteAutoTransFluid,
                    onEditAutoTransFluid: onEditAutoTransFluid,
                    selectAutoTransFluid: selectAutoTransFluid,
                    onSaveAutoTransFluid: onSaveAutoTransFluid,
                    onCloseAutoTransFluidDialog: onCloseAutoTransFluidDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.autoTransFluid.viewModel;
    });
