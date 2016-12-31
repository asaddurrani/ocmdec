define(["ko", "underscore", "underscore-ko"], function (ko) {

    var
    //#region Vehicle Maker entity
    // ReSharper disable InconsistentNaming
    BodyPolishMakerCompany = function (specifiedBodyPolishMakerId, specifiedBodyPolishMakerName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            bodyPolishMakerId = ko.observable(specifiedBodyPolishMakerId),
            // BodyPolish Maker Name
            bodyPolishMakerName = ko.observable(specifiedBodyPolishMakerName),

            // Errors
            errors = ko.validation.group({
                bodyPolishMakerId: bodyPolishMakerId,
                bodyPolishMakerName: bodyPolishMakerName
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                // ReSharper restore InconsistentNaming
                bodyPolishMakerId: bodyPolishMakerId,
                bodyPolishMakerName: bodyPolishMakerName
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
                    BodyPolishMakerId: bodyPolishMakerId(),
                    BodyPolishMakerName: bodyPolishMakerName()
                };
            };

        self = {
            bodyPolishMakerId: bodyPolishMakerId,
            bodyPolishMakerName: bodyPolishMakerName,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    };

    // BodyPolish Maker Factory
    BodyPolishMakerCompany.Create = function (source) {
        return new BodyPolishMakerCompany(source.BodyPolishMakerId, source.BodyPolishMakerName);
    };
    //#endregion

    //#region BodyPolish entity
    // ReSharper disable once AssignToImplicitGlobalInFunctionScope
    BodyPolish = function (specifiedBodyPolishId, specifiedBodyPolishName, specifiedBodyPolishMakerId, specifiedBodyPolishAverageMilage, specifiedBodyPolishPower, specifiedBodyPolishPrice, specifiedBodyPolishDescription, specifiedBodyPolishNetWeightId, specifiedBodyPolishMakerCompanyName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            bodyPolishId = ko.observable(specifiedBodyPolishId),
            // bodyPolish Name
            bodyPolishName = ko.observable(specifiedBodyPolishName),
            // bodyPolish Maker Id
            bodyPolishMakerId = ko.observable(specifiedBodyPolishMakerId).extend({ required: true }),
            // bodyPolish Average Milage
            bodyPolishAverageMilage = ko.observable(specifiedBodyPolishAverageMilage),
            //bodyPolish Power
            bodyPolishPower = ko.observable(specifiedBodyPolishPower),
            //bodyPolish Price
            bodyPolishPrice = ko.observable(specifiedBodyPolishPrice),
            //bodyPolish Description
            bodyPolishDescription = ko.observable(specifiedBodyPolishDescription),
            //bodyPolish Net Weight Id
            bodyPolishNetWeightId = ko.observable(specifiedBodyPolishNetWeightId),
            //BodyPolish Maker Company Name
            bodyPolishMakerCompanyName = ko.observable(specifiedBodyPolishMakerCompanyName),

            // Errors
            errors = ko.validation.group({
                bodyPolishId: bodyPolishId,
                bodyPolishName: bodyPolishName,
                bodyPolishMakerId: bodyPolishMakerId,
                bodyPolishAverageMilage: bodyPolishAverageMilage,
                bodyPolishPower: bodyPolishPower,
                bodyPolishPrice: bodyPolishPrice,
                bodyPolishDescription: bodyPolishDescription,
                bodyPolishNetWeightId: bodyPolishNetWeightId,
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                bodyPolishId: bodyPolishId,
                bodyPolishName: bodyPolishName,
                bodyPolishMakerId: bodyPolishMakerId,
                bodyPolishAverageMilage: bodyPolishAverageMilage,
                bodyPolishPower: bodyPolishPower,
                bodyPolishPrice: bodyPolishPrice,
                bodyPolishDescription: bodyPolishDescription,
                bodyPolishNetWeightId: bodyPolishNetWeightId,
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
                    BodyPolishId: bodyPolishId(),
                    BodyPolishName: bodyPolishName(),
                    BodyPolishMakerId: bodyPolishMakerId(),
                    BodyPolishAverageMilage: bodyPolishAverageMilage(),
                    BodyPolishPower: bodyPolishPower(),
                    BodyPolishPrice: bodyPolishPrice(),
                    BodyPolishDescription: bodyPolishDescription(),
                    BodyPolishNetWeightId: bodyPolishNetWeightId(),
                };
            };

        self = {
            bodyPolishId: bodyPolishId,
            bodyPolishName: bodyPolishName,
            bodyPolishMakerId: bodyPolishMakerId,
            bodyPolishAverageMilage: bodyPolishAverageMilage,
            bodyPolishPower: bodyPolishPower,
            bodyPolishPrice: bodyPolishPrice,
            bodyPolishDescription: bodyPolishDescription,
            bodyPolishNetWeightId: bodyPolishNetWeightId,
            bodyPolishMakerCompanyName: bodyPolishMakerCompanyName,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    };

    // Vehicle Maker Factory
    BodyPolish.Create = function (source) {
        return new BodyPolish(source.BodyPolishId, source.BodyPolishName, source.BodyPolishMakerId, source.BodyPolishAverageMilage, source.BodyPolishPower, source.BodyPolishPrice, source.BodyPolishDescription, source.BodyPolishNetWeightId, source.BodyPolishMakerCompanyName);
    };
    //#endregion

    return {
        BodyPolishMakerCompany: BodyPolishMakerCompany,
        BodyPolish: BodyPolish
    };
});