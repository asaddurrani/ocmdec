/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("fuelFilter/fuelFilter.view",
    ["jquery", "fuelFilter/fuelFilter.viewModel"], function ($, fuelFilterViewModel) {

        var ist = window.ist || {};

        // View 
        ist.fuelFilter.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#fuelFilterBinding")[0],
                //Show fuelFilter Dialog
                showFuelFilterDialog = function () {
                    $("#fuelFilterDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideFuelFilterDialog = function () {
                    $("#fuelFilterDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("fuelFilterTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showFuelFilterDialog: showFuelFilterDialog,
                hideFuelFilterDialog: hideFuelFilterDialog,
                viewModel: viewModel
            };
        })(fuelFilterViewModel);

        // Initialize the view model
        if (ist.fuelFilter.view.bindingRoot) {
            fuelFilterViewModel.initialize(ist.fuelFilter.view);
        }

        return ist.fuelFilter.view;
    });