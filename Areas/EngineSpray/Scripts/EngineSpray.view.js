/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("engineSpray/engineSpray.view",
    ["jquery", "engineSpray/engineSpray.viewModel"], function ($, engineSprayViewModel) {

        var ist = window.ist || {};

        // View 
        ist.engineSpray.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#engineSprayBinding")[0],
                //Show engineSpray Dialog
                showEngineSprayDialog = function () {
                    $("#engineSprayDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideEngineSprayDialog = function () {
                    $("#engineSprayDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("engineSprayTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showEngineSprayDialog: showEngineSprayDialog,
                hideEngineSprayDialog: hideEngineSprayDialog,
                viewModel: viewModel
            };
        })(engineSprayViewModel);

        // Initialize the view model
        if (ist.engineSpray.view.bindingRoot) {
            engineSprayViewModel.initialize(ist.engineSpray.view);
        }

        return ist.engineSpray.view;
    });