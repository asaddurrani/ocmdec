define(["ko", "underscore", "underscore-ko"], function (ko) {

    var
    //#region Air Filter entity
    // ReSharper disable InconsistentNaming
    AirFilter = function (specifiedAirFilterId, specifiedAirFilterName, specifiedAirFilterPrice) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            airFilterId = ko.observable(specifiedAirFilterId),
            // Air Filter Name
            airFilterName = ko.observable(specifiedAirFilterName),
            //Air Filter Price
            airFilterPrice = ko.observable(specifiedAirFilterPrice),
            // Errors
            errors = ko.validation.group({
                airFilterId: airFilterId,
                airFilterName: airFilterName,
                airFilterPrice: airFilterPrice
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                // ReSharper restore InconsistentNaming
                airMakerId: airFilterId,
                airFilterName: airFilterName,
                airFilterPrice: airFilterPrice
            }),
            // Has Changes
            hasChanges = ko.computed(function () {
                return dirtyFlag.isDirty();
            }),
            // Reset
            reset = function () {
                dirtyFlag.reset();
            },
            // Convert to server
            convertToServerData = function () {
                return {
                    AirFilterId: airFilterId(),
                    AirFilterName: airFilterName(),
                    AirFilterPrice: airFilterPrice()
                };
            };

        self = {
            airFilterId: airFilterId,
            airFilterName: airFilterName,
            airFilterPrice: airFilterPrice,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    };

    // Air Filter Factory
    AirFilter.Create = function (source) {
        return new AirFilter(source.AirFilterId, source.AirFilterName, source.AirFilterPrice);
    };
    //#endregion

    return {
        AirFilter: AirFilter,
    };
});