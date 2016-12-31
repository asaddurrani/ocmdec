define(["ko", "underscore", "underscore-ko"], function (ko) {

    var
    // Product entity
    // ReSharper disable InconsistentNaming
    Product = function (specifiedKey, specifiedName, specifiedPrice, specifiedDescription, specifiedCategory) {
            // ReSharper restore InconsistentNaming
            var // Reference to this object
                self,
                // Unique key
                id = ko.observable(specifiedKey),
                // Name
                name = ko.observable(specifiedName).extend({ required: true }),
                // Price
                price = ko.observable(specifiedPrice).extend({ required: true }),
                // Category 
                categoryId = ko.observable(specifiedCategory).extend({ required: true }),
                // Description
                description = ko.observable(specifiedDescription),
                // Is Busy
                isBusy = ko.observable(false),
                // Categoreis
                categories = ko.observableArray([]),
                // Category Name
                categoryName = ko.computed(function() {
                    if (!categoryId()) {
                        return "";
                    }
                    var categoryResult = categories.find(function (category) {
                        return category.Id === categoryId();
                    });

                    return categoryResult ? categoryResult.Name : "";
                }),
                // Assign Categories
                assignCategories = function(categoryList) {
                    categories.removeAll();
                    ko.utils.arrayPushAll(categories(), categoryList);
                    categories.valueHasMutated();
                },
                // Errors
                errors = ko.validation.group({
                    name: name,
                    price: price,
                    categoryId: categoryId
                }),
                // Is Valid
                isValid = ko.computed(function() {
                    return errors().length === 0;
                }),
                // True if the booking has been changed
// ReSharper disable InconsistentNaming
                dirtyFlag = new ko.dirtyFlag({
                    // ReSharper restore InconsistentNaming
                    name: name,
                    price: price,
                    categoryId: categoryId,
                    description: description
                }),
                // Has Changes
                hasChanges = ko.computed(function() {
                    return dirtyFlag.isDirty();
                }),
                // Reset
                reset = function() {
                    dirtyFlag.reset();
                },
                // Convert to server
                convertToServerData = function() {
                    return {                        
                        Id: id(),
                        Name: name(),
                        Price: price(),
                        CategoryId: categoryId(),
                        Description: description()
                    };
                };

            self = {
                id: id,
                name: name,
                price: price,
                categoryId: categoryId,
                description: description,
                errors: errors,
                isValid: isValid,
                dirtyFlag: dirtyFlag,
                hasChanges: hasChanges,
                reset: reset,
                isBusy: isBusy,
                assignCategories: assignCategories,
                categoryName: categoryName,
                convertToServerData: convertToServerData
            };
            return self;
        };

    // Product Factory
    Product.Create = function (source) {
        return new Product(source.Id, source.Name, source.Price, source.Description, source.CategoryId);
    };

    return {
        Product: Product
    };
});