/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("bodyWax/bodyWax.view",
    ["jquery", "bodyWax/bodyWax.viewModel"], function ($, bodyWaxViewModel) {

        var ist = window.ist || {};

        // View 
        ist.bodyWax.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#bodyWaxBinding")[0],
                //Show BodyWax Dialog
                showBodyWaxDialog = function () {
                    $("#bodyWaxDialog").modal("show");
                },
                 // Hide BodyWax the dialog
                hideBodyWaxDialog = function () {
                    $("#bodyWaxDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("bodyWaxTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showBodyWaxDialog: showBodyWaxDialog,
                hideBodyWaxDialog: hideBodyWaxDialog,
                viewModel: viewModel
            };
        })(bodyWaxViewModel);

        // Initialize the view model
        if (ist.bodyWax.view.bindingRoot) {
            bodyWaxViewModel.initialize(ist.bodyWax.view);
        }

        return ist.bodyWax.view;
    });