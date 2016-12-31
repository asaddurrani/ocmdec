/*
    Module with the view model for the Vehicle
*/
define("microFibre/microFibre.viewModel",
    ["jquery", "amplify", "ko", "microFibre/microFibre.dataservice", "microFibre/microFibre.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.microFibre = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isMicroFibreLoaded = ko.observable(false),
                    //Power Steering Oils
                    microFibres = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedMicroFibre = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingMicroFibre = ko.observable(false),
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
                    getMicroFibres = function () {
                        isLoadingMicroFibre(true);
                        dataservice.getMicroFibres({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                microFibres.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.MicroFibre.Create(item);
                                        microFibres.push(module);
                                    });
                                }
                                isLoadingMicroFibre(false);
                            },
                            error: function (response) {
                                isLoadingMicroFibre(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createMicroFibre = function () {
                        selectedMicroFibre(new model.MicroFibre.Create({}));
                        view.showMicroFibreDialog();
                    },
                    //Search Power Steering Oil
                    searchMicroFibre = function () {
                        getMicroFibres();
                    },
                    //Delete Power Steering Oil
                    onDeleteMicroFibre = function () {

                    },
                    //Edit Power Steering Oil
                    onEditMicroFibre = function () {
                        if (selectedMicroFibre() != undefined) {
                            view.showMicroFibreDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectMicroFibre = function (microFibre) {
                        if (selectedMicroFibre() != microFibre) {
                            selectedMicroFibre(microFibre);
                        }
                    },
                    //On Save Power Steering Oil
                    onSaveMicroFibre = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveMicroFibre(
                                selectedMicroFibre().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedMicroFibre = model.MicroFibre.Create(data);
                                            if (selectedMicroFibre().powerStereringOilId() <= 0 || selectedMicroFibre().powerStereringOilId() == undefined) {
                                                microFibres.splice(0, 0, savedMicroFibre);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideMicroFibreDialog();
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
                        if (!selectedMicroFibre().isValid()) {
                            selectedMicroFibre().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseMicroFibreDialog = function () {
                        view.hideMicroFibreDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, microFibres, getMicroFibres));
                        getBaseData();
                        getMicroFibres();
                    };
                //#endregion


                return {
                    //#region Return
                    isMicroFibreLoaded: isMicroFibreLoaded,
                    microFibres: microFibres,
                    searchFilter: searchFilter,
                    selectedMicroFibre: selectedMicroFibre,
                    isLoadingMicroFibre: isLoadingMicroFibre,
                    pager: pager,
                    getBaseData: getBaseData,
                    getMicroFibres: getMicroFibres,
                    createMicroFibre: createMicroFibre,
                    searchMicroFibre: searchMicroFibre,
                    onDeleteMicroFibre: onDeleteMicroFibre,
                    onEditMicroFibre: onEditMicroFibre,
                    selectMicroFibre: selectMicroFibre,
                    onSaveMicroFibre: onSaveMicroFibre,
                    onCloseMicroFibreDialog: onCloseMicroFibreDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.microFibre.viewModel;
    });
