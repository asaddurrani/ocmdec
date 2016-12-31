/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("oil/oil.view",
    ["jquery", "oil/oil.viewModel"], function ($, oilViewModel) {

        var ist = window.ist || {};

        // View 
        ist.oil.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#oilBinding")[0],
                //Show Oil Dialog
                showOilDialog = function () {
                    $("#oilDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideOilDialog = function () {
                    $("#oilDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("oilTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showOilDialog: showOilDialog,
                hideOilDialog: hideOilDialog,
                viewModel: viewModel
            };
        })(oilViewModel);

        // Initialize the view model
        if (ist.oil.view.bindingRoot) {
            oilViewModel.initialize(ist.oil.view);
        }

        return ist.oil.view;
    });