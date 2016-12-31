/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("seatFoamSpray/seatFoamSpray.view",
    ["jquery", "seatFoamSpray/seatFoamSpray.viewModel"], function ($, seatFoamSprayViewModel) {

        var ist = window.ist || {};

        // View 
        ist.seatFoamSpray.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#seatFoamSprayBinding")[0],
                //Show seatFoamSpray Dialog
                showSeatFoamSprayDialog = function () {
                    $("#seatFoamSprayDialog").modal("show");
                },
                 // Hide Oil the dialog
                hideSeatFoamSprayDialog = function () {
                    $("#seatFoamSprayDialog").modal("hide");
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("seatFoamSprayTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showSeatFoamSprayDialog: showSeatFoamSprayDialog,
                hideSeatFoamSprayDialog: hideSeatFoamSprayDialog,
                viewModel: viewModel
            };
        })(seatFoamSprayViewModel);

        // Initialize the view model
        if (ist.seatFoamSpray.view.bindingRoot) {
            seatFoamSprayViewModel.initialize(ist.seatFoamSpray.view);
        }

        return ist.seatFoamSpray.view;
    });