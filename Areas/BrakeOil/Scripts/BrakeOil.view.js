/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("brakeOil/brakeOil.view",
    ["jquery", "brakeOil/brakeOil.viewModel"], function ($, brakeOilViewModel) {

        var ist = window.ist || {};

        // View 
        ist.brakeOil.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#brakeOilBinding")[0],
                //Show brakeOil Dialog
                showBrakeOilDialog = function () {
                    $("#brakeOilDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideBrakeOilDialog = function () {
                    $("#brakeOilDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("brakeOilTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showBrakeOilDialog: showBrakeOilDialog,
                hideBrakeOilDialog: hideBrakeOilDialog,
                viewModel: viewModel
            };
        })(brakeOilViewModel);

        // Initialize the view model
        if (ist.brakeOil.view.bindingRoot) {
            brakeOilViewModel.initialize(ist.brakeOil.view);
        }

        return ist.brakeOil.view;
    });