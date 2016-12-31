/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("petrolAdditive/petrolAdditive.view",
    ["jquery", "petrolAdditive/petrolAdditive.viewModel"], function ($, petrolAdditiveViewModel) {

        var ist = window.ist || {};

        // View 
        ist.petrolAdditive.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#petrolAdditiveBinding")[0],
                //Show petrolAdditive Dialog
                showPetrolAdditiveDialog = function () {
                    $("#petrolAdditiveDialog").modal("show");
                },
                 // Hide Oil the dialog
                hidePetrolAdditiveDialog = function () {
                    $("#petrolAdditiveDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("petrolAdditiveTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showPetrolAdditiveDialog: showPetrolAdditiveDialog,
                hidePetrolAdditiveDialog: hidePetrolAdditiveDialog,
                viewModel: viewModel
            };
        })(petrolAdditiveViewModel);

        // Initialize the view model
        if (ist.petrolAdditive.view.bindingRoot) {
            petrolAdditiveViewModel.initialize(ist.petrolAdditive.view);
        }

        return ist.petrolAdditive.view;
    });