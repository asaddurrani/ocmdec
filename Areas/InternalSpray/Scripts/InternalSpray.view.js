/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("internalSpray/internalSpray.view",
    ["jquery", "internalSpray/internalSpray.viewModel"], function ($, internalSprayViewModel) {

        var ist = window.ist || {};

        // View 
        ist.internalSpray.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#internalSprayBinding")[0],
                //Show internalSpray Dialog
                showInternalSprayDialog = function () {
                    $("#internalSprayDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideInternalSprayDialog = function () {
                    $("#internalSprayDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("internalSprayTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showInternalSprayDialog: showInternalSprayDialog,
                hideInternalSprayDialog: hideInternalSprayDialog,
                viewModel: viewModel
            };
        })(internalSprayViewModel);

        // Initialize the view model
        if (ist.internalSpray.view.bindingRoot) {
            internalSprayViewModel.initialize(ist.internalSpray.view);
        }

        return ist.internalSpray.view;
    });