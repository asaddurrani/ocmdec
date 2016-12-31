/*
    Module with the view model for the Vehicle
*/
define("bodyPolish/bodyPolish.viewModel",
    ["jquery", "amplify", "ko", "bodyPolish/bodyPolish.dataservice", "bodyPolish/bodyPolish.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.bodyPolish = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Vehicles
                    isBodyPolishLoaded = ko.observable(false),
                    //BodyPolish Maker Companies
                    bodyPolishMakers = ko.observableArray([]),
                    //bodyPolish Companies For Dialog
                    bodyPolishMakerCompaniesListForDialog = ko.observableArray([]),
                    //bodyPolishs
                    bodyPolishs = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //bodyPolish Maker Company Filter
                    bodyPolishMakerCompanyFilter = ko.observable(),
                    //selected BodyPolish
                    selectedBodyPolish = ko.observable(),
                    //Is Loading BodyPolish
                    isLoadingBodyPolish = ko.observable(false),
                    //pager
                    pager = ko.observable(),

                    //#endregion

                    //#region Utility Functions 

                    //get Base Data
                    getBaseData = function () {
                        //Get BodyPolish Maker Companies
                        getBodyPolishMakerCompanies();
                    },
                    //Get BodyPolish Maker Companies
                    getBodyPolishMakerCompanies = function () {
                        dataservice.getBodyPolishMakerCompanies({
                            success: function (data) {
                                var bodyPolishMakerCompaniesList = [];
                                _.each(data.BodyPolishMakerCompanies, function (item) {
                                    var bodyPolishMaker = new model.BodyPolishMakerCompany.Create(item);
                                    bodyPolishMakerCompaniesList.push(bodyPolishMaker);
                                });
                                ko.utils.arrayPushAll(bodyPolishMakers(), bodyPolishMakerCompaniesList);
                                bodyPolishMakers.valueHasMutated();
                                ko.utils.arrayPushAll(bodyPolishMakerCompaniesListForDialog(), bodyPolishMakerCompaniesList);
                                bodyPolishMakerCompaniesListForDialog.valueHasMutated();
                            },
                            error: function () {
                                toastr.error("Failed to load bodyPolish maker companies data");
                            }
                        });
                    },
                    //Get BodyPolishs
                    getBodyPolishs = function () {
                        isLoadingBodyPolish(true);
                        dataservice.getBodyPolishs({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                            BodyPolishMakerCompany: bodyPolishMakerCompanyFilter()
                        }, {
                            success: function (data) {
                                bodyPolishs.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.BodyPolishs, function (item) {
                                        var module = new model.BodyPolish.Create(item);
                                        bodyPolishs.push(module);
                                    });
                                }
                                isLoadingBodyPolish(false);
                            },
                            error: function (response) {
                                isLoadingBodyPolish(false);
                                toastr.error("Error: Failed to Load BodyPolishs Data." + response);
                            }
                        });
                    },
                    //Create BodyPolish
                    createBodyPolish = function () {
                        selectedBodyPolish(new model.BodyPolish.Create({}));
                        view.showBodyPolishDialog();
                    },
                    //Search BodyPolish
                    searchBodyPolish = function () {
                        getBodyPolishs();
                    },
                    //Delete bodyPolish
                    onDeleteBodyPolish = function () {

                    },
                    //Edit BodyPolish
                    onEditBodyPolish = function () {
                        if (selectedBodyPolish() != undefined) {
                            view.showBodyPolishDialog();
                        }
                    },
                    //Select BodyPolish
                    selectBodyPolish = function (bodyPolish) {
                        if (selectedBodyPolish() != bodyPolish) {
                            selectedBodyPolish(bodyPolish);
                        }
                    },
                    //On Save BodyPolish
                    onSaveBodyPolish = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveBodyPolish(
                                selectedBodyPolish().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedBodyPolish = model.BodyPolish.Create(data);
                                            if (selectedBodyPolish().bodyPolishId() <= 0 || selectedBodyPolish().bodyPolishId() == undefined) {
                                                bodyPolishs.splice(0, 0, savedBodyPolish);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideBodyPolishDialog();
                                        }
                                    },
                                    error: function (response) {
                                        toastr.error("Error: Failed To Save BodyPolish " + response);
                                    }
                                });
                        }
                    },
                    // Do Before Logic
                    doBeforeSelect = function () {
                        var flag = true;
                        if (!selectedBodyPolish().isValid()) {
                            selectedBodyPolish().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseBodyPolishDialog = function () {
                        view.hideBodyPolishDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, bodyPolishs, getBodyPolishs));
                        getBaseData();
                        getBodyPolishs();

                    };
                //#endregion


                return {
                    //#region Return
                    isBodyPolishLoaded: isBodyPolishLoaded,
                    bodyPolishMakers: bodyPolishMakers,
                    bodyPolishMakerCompaniesListForDialog: bodyPolishMakerCompaniesListForDialog,
                    bodyPolishs: bodyPolishs,
                    searchFilter: searchFilter,
                    bodyPolishMakerCompanyFilter: bodyPolishMakerCompanyFilter,
                    selectedBodyPolish: selectedBodyPolish,
                    isLoadingBodyPolish: isLoadingBodyPolish,
                    pager: pager,
                    getBaseData: getBaseData,
                    getBodyPolishMakerCompanies: getBodyPolishMakerCompanies,
                    getBodyPolishs: getBodyPolishs,
                    createBodyPolish: createBodyPolish,
                    searchBodyPolish: searchBodyPolish,
                    onDeleteBodyPolish: onDeleteBodyPolish,
                    onEditBodyPolish: onEditBodyPolish,
                    selectBodyPolish: selectBodyPolish,
                    onSaveBodyPolish: onSaveBodyPolish,
                    onCloseBodyPolishDialog: onCloseBodyPolishDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.bodyPolish.viewModel;
    });
