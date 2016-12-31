/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("oilFilter/oilFilter.view",
    ["jquery", "oilFilter/oilFilter.viewModel"], function ($, oilFilterViewModel) {

        var ist = window.ist || {};

        // View 
        ist.oilFilter.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#oilFilterBinding")[0],
                //Show oilFilter Dialog
                showOilFilterDialog = function () {
                    $("#oilFilterDialog").modal("show");
                },
                 // Hide oilFilter the dialog
                hideOilFilterDialog = function () {
                    $("#oilFilterDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("oilFilterTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getOilFilters);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showOilFilterDialog: showOilFilterDialog,
                hideOilFilterDialog: hideOilFilterDialog,
                viewModel: viewModel
            };
        })(oilFilterViewModel);

        // Initialize the view model
        if (ist.oilFilter.view.bindingRoot) {
            oilFilterViewModel.initialize(ist.oilFilter.view);
        }

        return ist.oilFilter.view;
    });