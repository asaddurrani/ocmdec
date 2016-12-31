/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("airFilter/airFilter.view",
    ["jquery", "airFilter/airFilter.viewModel"], function ($, airFilterViewModel) {

        var ist = window.ist || {};

        // View 
        ist.airFilter.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#airFilterBinding")[0],
                //Show airFilter Dialog
                showAirFilterDialog = function () {
                    $("#airFilterDialog").modal("show");
                },
                 // Hide airFilter the dialog
                hideAirFilterDialog = function () {
                    $("#airFilterDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    //handleSorting("airFilterTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showAirFilterDialog: showAirFilterDialog,
                hideAirFilterDialog: hideAirFilterDialog,
                viewModel: viewModel
            };
        })(airFilterViewModel);

        // Initialize the view model
        if (ist.airFilter.view.bindingRoot) {
            airFilterViewModel.initialize(ist.airFilter.view);
        }

        return ist.airFilter.view;
    });