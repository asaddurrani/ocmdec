/*
    Module with the view model for the Vehicle
*/
define("seatFoamSpray/seatFoamSpray.viewModel",
    ["jquery", "amplify", "ko", "seatFoamSpray/seatFoamSpray.dataservice", "seatFoamSpray/seatFoamSpray.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.seatFoamSpray = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isSeatFoamSprayLoaded = ko.observable(false),
                    //Power Steering Oils
                    seatFoamSprays = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedSeatFoamSpray = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingSeatFoamSpray = ko.observable(false),
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
                    getSeatFoamSprays = function () {
                        isLoadingSeatFoamSpray(true);
                        dataservice.getSeatFoamSprays({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                seatFoamSprays.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.SeatFoamSpray.Create(item);
                                        seatFoamSprays.push(module);
                                    });
                                }
                                isLoadingSeatFoamSpray(false);
                            },
                            error: function (response) {
                                isLoadingSeatFoamSpray(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createSeatFoamSpray = function () {
                        selectedSeatFoamSpray(new model.SeatFoamSpray.Create({}));
                        view.showSeatFoamSprayDialog();
                    },
                    //Search Power Steering Oil
                    searchSeatFoamSpray = function () {
                        getSeatFoamSprays();
                    },
                    //Delete Power Steering Oil
                    onDeleteSeatFoamSpray = function () {

                    },
                    //Edit Power Steering Oil
                    onEditSeatFoamSpray = function () {
                        if (selectedSeatFoamSpray() != undefined) {
                            view.showSeatFoamSprayDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectSeatFoamSpray = function (seatFoamSpray) {
                        if (selectedSeatFoamSpray() != seatFoamSpray) {
                            selectedSeatFoamSpray(seatFoamSpray);
                        }
                    },
                    //On Save Power Steering Oil
                    onSaveSeatFoamSpray = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveSeatFoamSpray(
                                selectedSeatFoamSpray().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedSeatFoamSpray = model.SeatFoamSpray.Create(data);
                                            if (selectedSeatFoamSpray().powerStereringOilId() <= 0 || selectedSeatFoamSpray().powerStereringOilId() == undefined) {
                                                seatFoamSprays.splice(0, 0, savedSeatFoamSpray);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideSeatFoamSprayDialog();
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
                        if (!selectedSeatFoamSpray().isValid()) {
                            selectedSeatFoamSpray().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseSeatFoamSprayDialog = function () {
                        view.hideSeatFoamSprayDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, seatFoamSprays, getSeatFoamSprays));
                        getBaseData();
                        getSeatFoamSprays();
                    };
                //#endregion


                return {
                    //#region Return
                    isSeatFoamSprayLoaded: isSeatFoamSprayLoaded,
                    seatFoamSprays: seatFoamSprays,
                    searchFilter: searchFilter,
                    selectedSeatFoamSpray: selectedSeatFoamSpray,
                    isLoadingSeatFoamSpray: isLoadingSeatFoamSpray,
                    pager: pager,
                    getBaseData: getBaseData,
                    getSeatFoamSprays: getSeatFoamSprays,
                    createSeatFoamSpray: createSeatFoamSpray,
                    searchSeatFoamSpray: searchSeatFoamSpray,
                    onDeleteSeatFoamSpray: onDeleteSeatFoamSpray,
                    onEditSeatFoamSpray: onEditSeatFoamSpray,
                    selectSeatFoamSpray: selectSeatFoamSpray,
                    onSaveSeatFoamSpray: onSaveSeatFoamSpray,
                    onCloseSeatFoamSprayDialog: onCloseSeatFoamSprayDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.seatFoamSpray.viewModel;
    });
