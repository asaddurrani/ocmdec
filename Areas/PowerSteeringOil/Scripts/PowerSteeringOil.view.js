/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("powerSteeringOil/powerSteeringOil.view",
    ["jquery", "powerSteeringOil/powerSteeringOil.viewModel"], function ($, powerSteeringOilViewModel) {

        var ist = window.ist || {};

        // View 
        ist.powerSteeringOil.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#powerSteeringOilBinding")[0],
                //Show powerSteeringOil Dialog
                showPowerSteeringOilDialog = function () {
                    $("#powerSteeringOilDialog").modal("show");
                },
                 // Hide Oil the dialog
                hidePowerSteeringOilDialog = function () {
                    $("#powerSteeringOilDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("powerSteeringOilTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showPowerSteeringOilDialog: showPowerSteeringOilDialog,
                hidePowerSteeringOilDialog: hidePowerSteeringOilDialog,
                viewModel: viewModel
            };
        })(powerSteeringOilViewModel);

        // Initialize the view model
        if (ist.powerSteeringOil.view.bindingRoot) {
            powerSteeringOilViewModel.initialize(ist.powerSteeringOil.view);
        }

        return ist.powerSteeringOil.view;
    });