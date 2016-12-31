/*
    Module with the view model for the Vehicle
*/
define("tyreWax/tyreWax.viewModel",
    ["jquery", "amplify", "ko", "tyreWax/tyreWax.dataservice", "tyreWax/tyreWax.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.tyreWax = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isTyreWaxLoaded = ko.observable(false),
                    //Power Steering Oils
                    tyreWaxs = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedTyreWax = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingTyreWax = ko.observable(false),
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
                    getTyreWaxs = function () {
                        isLoadingTyreWax(true);
                        dataservice.getTyreWaxs({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                tyreWaxs.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.TyreWax.Create(item);
                                        tyreWaxs.push(module);
                                    });
                                }
                                isLoadingTyreWax(false);
                            },
                            error: function (response) {
                                isLoadingTyreWax(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createTyreWax = function () {
                        selectedTyreWax(new model.TyreWax.Create({}));
                        view.showTyreWaxDialog();
                    },
                    //Search Power Steering Oil
                    searchTyreWax = function () {
                        getTyreWaxs();
                    },
                    //Delete Power Steering Oil
                    onDeleteTyreWax = function () {

                    },
                    //Edit Power Steering Oil
                    onEditTyreWax = function () {
                        if (selectedTyreWax() != undefined) {
                            view.showTyreWaxDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectTyreWax = function (tyreWax) {
                        if (selectedTyreWax() != tyreWax) {
                            selectedTyreWax(tyreWax);
                        }
                    },
                    //On Save Power Steering Oil
                    onSaveTyreWax = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveTyreWax(
                                selectedTyreWax().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedTyreWax = model.TyreWax.Create(data);
                                            if (selectedTyreWax().powerStereringOilId() <= 0 || selectedTyreWax().powerStereringOilId() == undefined) {
                                                tyreWaxs.splice(0, 0, savedTyreWax);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideTyreWaxDialog();
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
                        if (!selectedTyreWax().isValid()) {
                            selectedTyreWax().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseTyreWaxDialog = function () {
                        view.hideTyreWaxDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, tyreWaxs, getTyreWaxs));
                        getBaseData();
                        getTyreWaxs();
                    };
                //#endregion


                return {
                    //#region Return
                    isTyreWaxLoaded: isTyreWaxLoaded,
                    tyreWaxs: tyreWaxs,
                    searchFilter: searchFilter,
                    selectedTyreWax: selectedTyreWax,
                    isLoadingTyreWax: isLoadingTyreWax,
                    pager: pager,
                    getBaseData: getBaseData,
                    getTyreWaxs: getTyreWaxs,
                    createTyreWax: createTyreWax,
                    searchTyreWax: searchTyreWax,
                    onDeleteTyreWax: onDeleteTyreWax,
                    onEditTyreWax: onEditTyreWax,
                    selectTyreWax: selectTyreWax,
                    onSaveTyreWax: onSaveTyreWax,
                    onCloseTyreWaxDialog: onCloseTyreWaxDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.tyreWax.viewModel;
    });
