/*
    Module with the view model for the Vehicle
*/
define("petrolAdditive/petrolAdditive.viewModel",
    ["jquery", "amplify", "ko", "petrolAdditive/petrolAdditive.dataservice", "petrolAdditive/petrolAdditive.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.petrolAdditive = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isPetrolAdditiveLoaded = ko.observable(false),
                    //Power Steering Oils
                    petrolAdditives = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedPetrolAdditive = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingPetrolAdditive = ko.observable(false),
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
                    getPetrolAdditives = function () {
                        isLoadingPetrolAdditive(true);
                        dataservice.getPetrolAdditives({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                petrolAdditives.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.PetrolAdditive.Create(item);
                                        petrolAdditives.push(module);
                                    });
                                }
                                isLoadingPetrolAdditive(false);
                            },
                            error: function (response) {
                                isLoadingPetrolAdditive(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createPetrolAdditive = function () {
                        selectedPetrolAdditive(new model.PetrolAdditive.Create({}));
                        view.showPetrolAdditiveDialog();
                    },
                    //Search Power Steering Oil
                    searchPetrolAdditive = function () {
                        getPetrolAdditives();
                    },
                    //Delete Power Steering Oil
                    onDeletePetrolAdditive = function () {

                    },
                    //Edit Power Steering Oil
                    onEditPetrolAdditive = function () {
                        if (selectedPetrolAdditive() != undefined) {
                            view.showPetrolAdditiveDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectPetrolAdditive = function (petrolAdditive) {
                        if (selectedPetrolAdditive() != petrolAdditive) {
                            selectedPetrolAdditive(petrolAdditive);
                        }
                    },
                    //On Save Power Steering Oil
                    onSavePetrolAdditive = function () {
                        if (doBeforeSelect()) {
                            dataservice.savePetrolAdditive(
                                selectedPetrolAdditive().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedPetrolAdditive = model.PetrolAdditive.Create(data);
                                            if (selectedPetrolAdditive().powerStereringOilId() <= 0 || selectedPetrolAdditive().powerStereringOilId() == undefined) {
                                                petrolAdditives.splice(0, 0, savedPetrolAdditive);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hidePetrolAdditiveDialog();
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
                        if (!selectedPetrolAdditive().isValid()) {
                            selectedPetrolAdditive().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onClosePetrolAdditiveDialog = function () {
                        view.hidePetrolAdditiveDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, petrolAdditives, getPetrolAdditives));
                        getBaseData();
                        getPetrolAdditives();
                    };
                //#endregion


                return {
                    //#region Return
                    isPetrolAdditiveLoaded: isPetrolAdditiveLoaded,
                    petrolAdditives: petrolAdditives,
                    searchFilter: searchFilter,
                    selectedPetrolAdditive: selectedPetrolAdditive,
                    isLoadingPetrolAdditive: isLoadingPetrolAdditive,
                    pager: pager,
                    getBaseData: getBaseData,
                    getPetrolAdditives: getPetrolAdditives,
                    createPetrolAdditive: createPetrolAdditive,
                    searchPetrolAdditive: searchPetrolAdditive,
                    onDeletePetrolAdditive: onDeletePetrolAdditive,
                    onEditPetrolAdditive: onEditPetrolAdditive,
                    selectPetrolAdditive: selectPetrolAdditive,
                    onSavePetrolAdditive: onSavePetrolAdditive,
                    onClosePetrolAdditiveDialog: onClosePetrolAdditiveDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.petrolAdditive.viewModel;
    });
