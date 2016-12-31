/*
    Module with the view model for the Vehicle
*/
define("bodyWax/bodyWax.viewModel",
    ["jquery", "amplify", "ko", "bodyWax/bodyWax.dataservice", "bodyWax/bodyWax.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.bodyWax = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Vehicles
                    isBodyWaxLoaded = ko.observable(false),
                    //BodyWax Maker Companies
                    bodyWaxMakers = ko.observableArray([]),
                    //bodyWax Companies For Dialog
                    bodyWaxMakerCompaniesListForDialog = ko.observableArray([]),
                    //bodyWaxs
                    bodyWaxs = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //bodyWax Maker Company Filter
                    bodyWaxMakerCompanyFilter = ko.observable(),
                    //selected BodyWax
                    selectedBodyWax = ko.observable(),
                    //Is Loading BodyWax
                    isLoadingBodyWax = ko.observable(false),
                    //pager
                    pager = ko.observable(),

                    //#endregion

                    //#region Utility Functions 

                    //get Base Data
                    getBaseData = function () {
                        //Get BodyWax Maker Companies
                        getBodyWaxMakerCompanies();
                    },
                    //Get BodyWax Maker Companies
                    getBodyWaxMakerCompanies = function () {
                        dataservice.getBodyWaxMakerCompanies({
                            success: function (data) {
                                var bodyWaxMakerCompaniesList = [];
                                _.each(data.BodyWaxMakerCompanies, function (item) {
                                    var bodyWaxMaker = new model.BodyWaxMakerCompany.Create(item);
                                    bodyWaxMakerCompaniesList.push(bodyWaxMaker);
                                });
                                ko.utils.arrayPushAll(bodyWaxMakers(), bodyWaxMakerCompaniesList);
                                bodyWaxMakers.valueHasMutated();
                                ko.utils.arrayPushAll(bodyWaxMakerCompaniesListForDialog(), bodyWaxMakerCompaniesList);
                                bodyWaxMakerCompaniesListForDialog.valueHasMutated();
                            },
                            error: function () {
                                toastr.error("Failed to load bodyWax maker companies data");
                            }
                        });
                    },
                    //Get BodyWaxs
                    getBodyWaxs = function () {
                        isLoadingBodyWax(true);
                        dataservice.getBodyWaxs({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                            BodyWaxMakerCompany: bodyWaxMakerCompanyFilter()
                        }, {
                            success: function (data) {
                                bodyWaxs.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.BodyWaxs, function (item) {
                                        var module = new model.BodyWax.Create(item);
                                        bodyWaxs.push(module);
                                    });
                                }
                                isLoadingBodyWax(false);
                            },
                            error: function (response) {
                                isLoadingBodyWax(false);
                                toastr.error("Error: Failed to Load BodyWaxs Data." + response);
                            }
                        });
                    },
                    //Create BodyWax
                    createBodyWax = function () {
                        selectedBodyWax(new model.BodyWax.Create({}));
                        view.showBodyWaxDialog();
                    },
                    //Search BodyWax
                    searchBodyWax = function () {
                        getBodyWaxs();
                    },
                    //Delete bodyWax
                    onDeleteBodyWax = function () {

                    },
                    //Edit BodyWax
                    onEditBodyWax = function () {
                        if (selectedBodyWax() != undefined) {
                            view.showBodyWaxDialog();
                        }
                    },
                    //Select BodyWax
                    selectBodyWax = function (bodyWax) {
                        if (selectedBodyWax() != bodyWax) {
                            selectedBodyWax(bodyWax);
                        }
                    },
                    //On Save BodyWax
                    onSaveBodyWax = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveBodyWax(
                                selectedBodyWax().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedBodyWax = model.BodyWax.Create(data);
                                            if (selectedBodyWax().bodyWaxId() <= 0 || selectedBodyWax().bodyWaxId() == undefined) {
                                                bodyWaxs.splice(0, 0, savedBodyWax);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideBodyWaxDialog();
                                        }
                                    },
                                    error: function (response) {
                                        toastr.error("Error: Failed To Save BodyWax " + response);
                                    }
                                });
                        }
                    },
                    // Do Before Logic
                    doBeforeSelect = function () {
                        var flag = true;
                        if (!selectedBodyWax().isValid()) {
                            selectedBodyWax().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseBodyWaxDialog = function () {
                        view.hideBodyWaxDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, bodyWaxs, getBodyWaxs));
                        getBaseData();
                        getBodyWaxs();

                    };
                //#endregion


                return {
                    //#region Return
                    isBodyWaxLoaded: isBodyWaxLoaded,
                    bodyWaxMakers: bodyWaxMakers,
                    bodyWaxMakerCompaniesListForDialog: bodyWaxMakerCompaniesListForDialog,
                    bodyWaxs: bodyWaxs,
                    searchFilter: searchFilter,
                    bodyWaxMakerCompanyFilter: bodyWaxMakerCompanyFilter,
                    selectedBodyWax: selectedBodyWax,
                    isLoadingBodyWax: isLoadingBodyWax,
                    pager: pager,
                    getBaseData: getBaseData,
                    getBodyWaxMakerCompanies: getBodyWaxMakerCompanies,
                    getBodyWaxs: getBodyWaxs,
                    createBodyWax: createBodyWax,
                    searchBodyWax: searchBodyWax,
                    onDeleteBodyWax: onDeleteBodyWax,
                    onEditBodyWax: onEditBodyWax,
                    selectBodyWax: selectBodyWax,
                    onSaveBodyWax: onSaveBodyWax,
                    onCloseBodyWaxDialog: onCloseBodyWaxDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.bodyWax.viewModel;
    });
