/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("tyreWax/tyreWax.view",
    ["jquery", "tyreWax/tyreWax.viewModel"], function ($, tyreWaxViewModel) {

        var ist = window.ist || {};

        // View 
        ist.tyreWax.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#tyreWaxBinding")[0],
                //Show tyreWax Dialog
                showTyreWaxDialog = function () {
                    $("#tyreWaxDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideTyreWaxDialog = function () {
                    $("#tyreWaxDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("tyreWaxTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showTyreWaxDialog: showTyreWaxDialog,
                hideTyreWaxDialog: hideTyreWaxDialog,
                viewModel: viewModel
            };
        })(tyreWaxViewModel);

        // Initialize the view model
        if (ist.tyreWax.view.bindingRoot) {
            tyreWaxViewModel.initialize(ist.tyreWax.view);
        }

        return ist.tyreWax.view;
    });