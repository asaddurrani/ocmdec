/*
    Module with the view model for the Vehicle
*/
define("coolent/coolent.viewModel",
    ["jquery", "amplify", "ko", "coolent/coolent.dataservice", "coolent/coolent.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.coolent = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isCoolentLoaded = ko.observable(false),
                    //Power Steering Oils
                    coolents = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedCoolent = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingCoolent = ko.observable(false),
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
                    getCoolents = function () {
                        isLoadingCoolent(true);
                        dataservice.getCoolents({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                coolents.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.Coolent.Create(item);
                                        coolents.push(module);
                                    });
                                }
                                isLoadingCoolent(false);
                            },
                            error: function (response) {
                                isLoadingCoolent(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createCoolent = function () {
                        selectedCoolent(new model.Coolent.Create({}));
                        view.showCoolentDialog();
                    },
                    //Search Power Steering Oil
                    searchCoolent = function () {
                        getCoolents();
                    },
                    //Delete Power Steering Oil
                    onDeleteCoolent = function () {

                    },
                    //Edit Power Steering Oil
                    onEditCoolent = function () {
                        if (selectedCoolent() != undefined) {
                            view.showCoolentDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectCoolent = function (coolent) {
                        if (selectedCoolent() != coolent) {
                            selectedCoolent(coolent);
                        }
                    },
                    //On Save Power Steering Oil
                    onSaveCoolent = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveCoolent(
                                selectedCoolent().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedCoolent = model.Coolent.Create(data);
                                            if (selectedCoolent().powerStereringOilId() <= 0 || selectedCoolent().powerStereringOilId() == undefined) {
                                                coolents.splice(0, 0, savedCoolent);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideCoolentDialog();
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
                        if (!selectedCoolent().isValid()) {
                            selectedCoolent().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseCoolentDialog = function () {
                        view.hideCoolentDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, coolents, getCoolents));
                        getBaseData();
                        getCoolents();
                    };
                //#endregion


                return {
                    //#region Return
                    isCoolentLoaded: isCoolentLoaded,
                    coolents: coolents,
                    searchFilter: searchFilter,
                    selectedCoolent: selectedCoolent,
                    isLoadingCoolent: isLoadingCoolent,
                    pager: pager,
                    getBaseData: getBaseData,
                    getCoolents: getCoolents,
                    createCoolent: createCoolent,
                    searchCoolent: searchCoolent,
                    onDeleteCoolent: onDeleteCoolent,
                    onEditCoolent: onEditCoolent,
                    selectCoolent: selectCoolent,
                    onSaveCoolent: onSaveCoolent,
                    onCloseCoolentDialog: onCloseCoolentDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.coolent.viewModel;
    });
