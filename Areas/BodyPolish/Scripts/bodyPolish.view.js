/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("bodyPolish/bodyPolish.view",
    ["jquery", "bodyPolish/bodyPolish.viewModel"], function ($, bodyPolishViewModel) {

        var ist = window.ist || {};

        // View 
        ist.bodyPolish.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#bodyPolishBinding")[0],
                //Show BodyPolish Dialog
                showBodyPolishDialog = function () {
                    $("#bodyPolishDialog").modal("show");
                },
                 // Hide BodyPolish the dialog
                hideBodyPolishDialog = function () {
                    $("#bodyPolishDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("bodyPolishTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showBodyPolishDialog: showBodyPolishDialog,
                hideBodyPolishDialog: hideBodyPolishDialog,
                viewModel: viewModel
            };
        })(bodyPolishViewModel);

        // Initialize the view model
        if (ist.bodyPolish.view.bindingRoot) {
            bodyPolishViewModel.initialize(ist.bodyPolish.view);
        }

        return ist.bodyPolish.view;
    });