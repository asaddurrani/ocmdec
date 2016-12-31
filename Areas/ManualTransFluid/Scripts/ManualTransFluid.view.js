/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("manualTransFluid/manualTransFluid.view",
    ["jquery", "manualTransFluid/manualTransFluid.viewModel"], function ($, manualTransFluidViewModel) {

        var ist = window.ist || {};

        // View 
        ist.manualTransFluid.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#manualTransFluidBinding")[0],
                //Show manualTransFluid Dialog
                showManualTransFluidDialog = function () {
                    $("#manualTransFluidDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideManualTransFluidDialog = function () {
                    $("#manualTransFluidDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("manualTransFluidTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showManualTransFluidDialog: showManualTransFluidDialog,
                hideManualTransFluidDialog: hideManualTransFluidDialog,
                viewModel: viewModel
            };
        })(manualTransFluidViewModel);

        // Initialize the view model
        if (ist.manualTransFluid.view.bindingRoot) {
            manualTransFluidViewModel.initialize(ist.manualTransFluid.view);
        }

        return ist.manualTransFluid.view;
    });