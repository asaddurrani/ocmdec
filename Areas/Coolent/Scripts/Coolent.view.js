/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("coolent/coolent.view",
    ["jquery", "coolent/coolent.viewModel"], function ($, coolentViewModel) {

        var ist = window.ist || {};

        // View 
        ist.coolent.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#coolentBinding")[0],
                //Show coolent Dialog
                showCoolentDialog = function () {
                    $("#coolentDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideCoolentDialog = function () {
                    $("#coolentDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("coolentTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showCoolentDialog: showCoolentDialog,
                hideCoolentDialog: hideCoolentDialog,
                viewModel: viewModel
            };
        })(coolentViewModel);

        // Initialize the view model
        if (ist.coolent.view.bindingRoot) {
            coolentViewModel.initialize(ist.coolent.view);
        }

        return ist.coolent.view;
    });