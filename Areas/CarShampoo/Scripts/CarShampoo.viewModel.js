/*
    Module with the view model for the Vehicle
*/
define("carShampoo/carShampoo.viewModel",
    ["jquery", "amplify", "ko", "carShampoo/carShampoo.dataservice", "carShampoo/carShampoo.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.carShampoo = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isCarShampooLoaded = ko.observable(false),
                    //Power Steering Oils
                    carShampoos = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedCarShampoo = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingCarShampoo = ko.observable(false),
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
                    getCarShampoos = function () {
                        isLoadingCarShampoo(true);
                        dataservice.getCarShampoos({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                carShampoos.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.CarShampoo.Create(item);
                                        carShampoos.push(module);
                                    });
                                }
                                isLoadingCarShampoo(false);
                            },
                            error: function (response) {
                                isLoadingCarShampoo(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createCarShampoo = function () {
                        selectedCarShampoo(new model.CarShampoo.Create({}));
                        view.showCarShampooDialog();
                    },
                    //Search Power Steering Oil
                    searchCarShampoo = function () {
                        getCarShampoos();
                    },
                    //Delete Power Steering Oil
                    onDeleteCarShampoo = function () {

                    },
                    //Edit Power Steering Oil
                    onEditCarShampoo = function () {
                        if (selectedCarShampoo() != undefined) {
                            view.showCarShampooDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectCarShampoo = function (carShampoo) {
                        if (selectedCarShampoo() != carShampoo) {
                            selectedCarShampoo(carShampoo);
                        }
                    },
                    //On Save Power Steering Oil
                    onSaveCarShampoo = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveCarShampoo(
                                selectedCarShampoo().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedCarShampoo = model.CarShampoo.Create(data);
                                            if (selectedCarShampoo().powerStereringOilId() <= 0 || selectedCarShampoo().powerStereringOilId() == undefined) {
                                                carShampoos.splice(0, 0, savedCarShampoo);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideCarShampooDialog();
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
                        if (!selectedCarShampoo().isValid()) {
                            selectedCarShampoo().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseCarShampooDialog = function () {
                        view.hideCarShampooDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, carShampoos, getCarShampoos));
                        getBaseData();
                        getCarShampoos();
                    };
                //#endregion


                return {
                    //#region Return
                    isCarShampooLoaded: isCarShampooLoaded,
                    carShampoos: carShampoos,
                    searchFilter: searchFilter,
                    selectedCarShampoo: selectedCarShampoo,
                    isLoadingCarShampoo: isLoadingCarShampoo,
                    pager: pager,
                    getBaseData: getBaseData,
                    getCarShampoos: getCarShampoos,
                    createCarShampoo: createCarShampoo,
                    searchCarShampoo: searchCarShampoo,
                    onDeleteCarShampoo: onDeleteCarShampoo,
                    onEditCarShampoo: onEditCarShampoo,
                    selectCarShampoo: selectCarShampoo,
                    onSaveCarShampoo: onSaveCarShampoo,
                    onCloseCarShampooDialog: onCloseCarShampooDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.carShampoo.viewModel;
    });
