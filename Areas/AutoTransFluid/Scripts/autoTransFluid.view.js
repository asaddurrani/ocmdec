/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("autoTransFluid/autoTransFluid.view",
    ["jquery", "autoTransFluid/autoTransFluid.viewModel"], function ($, autoTransFluidViewModel) {

        var ist = window.ist || {};

        // View 
        ist.autoTransFluid.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#autoTransFluidBinding")[0],
                //Show AutoTransFluid Dialog
                showAutoTransFluidDialog = function () {
                    $("#autoTransFluidDialog").modal("show");
                },
                 // Hide AutoTransFluid the dialog
                hideAutoTransFluidDialog = function () {
                    $("#autoTransFluidDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("autoTransFluidTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showAutoTransFluidDialog: showAutoTransFluidDialog,
                hideAutoTransFluidDialog: hideAutoTransFluidDialog,
                viewModel: viewModel
            };
        })(autoTransFluidViewModel);

        // Initialize the view model
        if (ist.autoTransFluid.view.bindingRoot) {
            autoTransFluidViewModel.initialize(ist.autoTransFluid.view);
        }

        return ist.autoTransFluid.view;
    });