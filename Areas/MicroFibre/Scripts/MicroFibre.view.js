/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("microFibre/microFibre.view",
    ["jquery", "microFibre/microFibre.viewModel"], function ($, microFibreViewModel) {

        var ist = window.ist || {};

        // View 
        ist.microFibre.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#microFibreBinding")[0],
                //Show microFibre Dialog
                showMicroFibreDialog = function () {
                    $("#microFibreDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideMicroFibreDialog = function () {
                    $("#microFibreDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("microFibreTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showMicroFibreDialog: showMicroFibreDialog,
                hideMicroFibreDialog: hideMicroFibreDialog,
                viewModel: viewModel
            };
        })(microFibreViewModel);

        // Initialize the view model
        if (ist.microFibre.view.bindingRoot) {
            microFibreViewModel.initialize(ist.microFibre.view);
        }

        return ist.microFibre.view;
    });