/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("carShampoo/carShampoo.view",
    ["jquery", "carShampoo/carShampoo.viewModel"], function ($, carShampooViewModel) {

        var ist = window.ist || {};

        // View 
        ist.carShampoo.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#carShampooBinding")[0],
                //Show carShampoo Dialog
                showCarShampooDialog = function () {
                    $("#carShampooDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideCarShampooDialog = function () {
                    $("#carShampooDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("carShampooTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showCarShampooDialog: showCarShampooDialog,
                hideCarShampooDialog: hideCarShampooDialog,
                viewModel: viewModel
            };
        })(carShampooViewModel);

        // Initialize the view model
        if (ist.carShampoo.view.bindingRoot) {
            carShampooViewModel.initialize(ist.carShampoo.view);
        }

        return ist.carShampoo.view;
    });