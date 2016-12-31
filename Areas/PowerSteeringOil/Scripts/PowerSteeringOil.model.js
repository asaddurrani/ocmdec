define(["ko", "underscore", "underscore-ko"], function (ko) {

    var
    //#region Brake Oil Filter entity
    // ReSharper disable InconsistentNaming
    PowerSteeringOil = function (specifiedPowerStereringOilId, specifiedPowerSterringOilName, specifiedPowerSterringOilCompany, specifiedPowerSterringOilPrice) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            powerStereringOilId = ko.observable(specifiedPowerStereringOilId),
            // Power Steering Oil
            powerSterringOilName = ko.observable(specifiedPowerSterringOilName),
            //Power steering oil company
            powerSterringOilCompany = ko.observable(specifiedPowerSterringOilCompany),
            //Power Sterring Oil Price
            powerSterringOilPrice = ko.observable(specifiedPowerSterringOilPrice),
            // Errors
            errors = ko.validation.group({
                powerStereringOilId: powerStereringOilId,
                powerSterringOilName: powerSterringOilName,
                powerSterringOilCompany: powerSterringOilCompany,
                powerSterringOilPrice: powerSterringOilPrice
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                // ReSharper restore InconsistentNaming
                powerStereringOilId: powerStereringOilId,
                powerSterringOilName: powerSterringOilName,
                powerSterringOilCompany: powerSterringOilCompany,
                powerSterringOilPrice: powerSterringOilPrice
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
                    PowerStereringOilId: powerStereringOilId(),
                    PowerSterringOilName: powerSterringOilName(),
                    PowerSterringOilCompany: powerSterringOilCompany(),
                    PowerSterringOilPrice: powerSterringOilPrice()
                };
            };

        self = {
            powerStereringOilId: powerStereringOilId,
            powerSterringOilName: powerSterringOilName,
            powerSterringOilCompany: powerSterringOilCompany,
            powerSterringOilPrice: powerSterringOilPrice,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    };

    // Brake Oil Factory
    PowerSteeringOil.Create = function (source) {
        return new PowerSteeringOil(source.PowerStereringOilId, source.PowerSterringOilName, source.PowerSterringOilCompany, source.PowerSterringOilPrice);
    };
    //#endregion

    return {
        PowerSteeringOil: PowerSteeringOil,
    };
});