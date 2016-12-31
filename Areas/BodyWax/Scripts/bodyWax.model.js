define(["ko", "underscore", "underscore-ko"], function (ko) {

    var
    //#region Vehicle Maker entity
    // ReSharper disable InconsistentNaming
    BodyWaxMakerCompany = function (specifiedBodyWaxMakerId, specifiedBodyWaxMakerName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            bodyWaxMakerId = ko.observable(specifiedBodyWaxMakerId),
            // BodyWax Maker Name
            bodyWaxMakerName = ko.observable(specifiedBodyWaxMakerName),

            // Errors
            errors = ko.validation.group({
                bodyWaxMakerId: bodyWaxMakerId,
                bodyWaxMakerName: bodyWaxMakerName
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                // ReSharper restore InconsistentNaming
                bodyWaxMakerId: bodyWaxMakerId,
                bodyWaxMakerName: bodyWaxMakerName
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
                    BodyWaxMakerId: bodyWaxMakerId(),
                    BodyWaxMakerName: bodyWaxMakerName()
                };
            };

        self = {
            bodyWaxMakerId: bodyWaxMakerId,
            bodyWaxMakerName: bodyWaxMakerName,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    };

    // BodyWax Maker Factory
    BodyWaxMakerCompany.Create = function (source) {
        return new BodyWaxMakerCompany(source.BodyWaxMakerId, source.BodyWaxMakerName);
    };
    //#endregion

    //#region BodyWax entity
    // ReSharper disable once AssignToImplicitGlobalInFunctionScope
    BodyWax = function (specifiedBodyWaxId, specifiedBodyWaxName, specifiedBodyWaxMakerId, specifiedBodyWaxAverageMilage, specifiedBodyWaxPower, specifiedBodyWaxPrice, specifiedBodyWaxDescription, specifiedBodyWaxNetWeightId, specifiedBodyWaxMakerCompanyName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            bodyWaxId = ko.observable(specifiedBodyWaxId),
            // bodyWax Name
            bodyWaxName = ko.observable(specifiedBodyWaxName),
            // bodyWax Maker Id
            bodyWaxMakerId = ko.observable(specifiedBodyWaxMakerId).extend({ required: true }),
            // bodyWax Average Milage
            bodyWaxAverageMilage = ko.observable(specifiedBodyWaxAverageMilage),
            //bodyWax Power
            bodyWaxPower = ko.observable(specifiedBodyWaxPower),
            //bodyWax Price
            bodyWaxPrice = ko.observable(specifiedBodyWaxPrice),
            //bodyWax Description
            bodyWaxDescription = ko.observable(specifiedBodyWaxDescription),
            //bodyWax Net Weight Id
            bodyWaxNetWeightId = ko.observable(specifiedBodyWaxNetWeightId),
            //BodyWax Maker Company Name
            bodyWaxMakerCompanyName = ko.observable(specifiedBodyWaxMakerCompanyName),

            // Errors
            errors = ko.validation.group({
                bodyWaxId: bodyWaxId,
                bodyWaxName: bodyWaxName,
                bodyWaxMakerId: bodyWaxMakerId,
                bodyWaxAverageMilage: bodyWaxAverageMilage,
                bodyWaxPower: bodyWaxPower,
                bodyWaxPrice: bodyWaxPrice,
                bodyWaxDescription: bodyWaxDescription,
                bodyWaxNetWeightId: bodyWaxNetWeightId,
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                bodyWaxId: bodyWaxId,
                bodyWaxName: bodyWaxName,
                bodyWaxMakerId: bodyWaxMakerId,
                bodyWaxAverageMilage: bodyWaxAverageMilage,
                bodyWaxPower: bodyWaxPower,
                bodyWaxPrice: bodyWaxPrice,
                bodyWaxDescription: bodyWaxDescription,
                bodyWaxNetWeightId: bodyWaxNetWeightId,
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
                    BodyWaxId: bodyWaxId(),
                    BodyWaxName: bodyWaxName(),
                    BodyWaxMakerId: bodyWaxMakerId(),
                    BodyWaxAverageMilage: bodyWaxAverageMilage(),
                    BodyWaxPower: bodyWaxPower(),
                    BodyWaxPrice: bodyWaxPrice(),
                    BodyWaxDescription: bodyWaxDescription(),
                    BodyWaxNetWeightId: bodyWaxNetWeightId(),
                };
            };

        self = {
            bodyWaxId: bodyWaxId,
            bodyWaxName: bodyWaxName,
            bodyWaxMakerId: bodyWaxMakerId,
            bodyWaxAverageMilage: bodyWaxAverageMilage,
            bodyWaxPower: bodyWaxPower,
            bodyWaxPrice: bodyWaxPrice,
            bodyWaxDescription: bodyWaxDescription,
            bodyWaxNetWeightId: bodyWaxNetWeightId,
            bodyWaxMakerCompanyName: bodyWaxMakerCompanyName,
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
    BodyWax.Create = function (source) {
        return new BodyWax(source.BodyWaxId, source.BodyWaxName, source.BodyWaxMakerId, source.BodyWaxAverageMilage, source.BodyWaxPower, source.BodyWaxPrice, source.BodyWaxDescription, source.BodyWaxNetWeightId, source.BodyWaxMakerCompanyName);
    };
    //#endregion

    return {
        BodyWaxMakerCompany: BodyWaxMakerCompany,
        BodyWax: BodyWax
    };
});