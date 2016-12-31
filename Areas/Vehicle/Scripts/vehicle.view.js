/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("vehicle/vehicle.view",
    ["jquery", "vehicle/vehicle.viewModel"], function ($, vehicleViewModel) {

        var ist = window.ist || {};

        // View 
        ist.vehicle.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#vehicleBinding")[0],
                //Show Vehicles Dialog
                showVehiclesDialog = function () {
                     $("#vehiclesDialog").modal("show");
                 },
                 // Hide Vehicles the dialog
                hideVehiclesDialog = function () {
                    $("#vehiclesDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("vehicleTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showVehiclesDialog: showVehiclesDialog,
                hideVehiclesDialog: hideVehiclesDialog,
                viewModel: viewModel
            };
        })(vehicleViewModel);

        // Initialize the view model
        if (ist.vehicle.view.bindingRoot) {
            vehicleViewModel.initialize(ist.vehicle.view);
        }

        return ist.vehicle.view;
    });