
var moment = require('moment');
var errorMsgs = require('../common/errors.js');

// To validate the form data We can add here more functions to validate anything
var Validator = {
    // To validate the form data
    isValidData: function (formData, res) {
        var destinationName = formData.destinationName;
        var checkInDate = moment(formData.minTripStartDate, 'YYYY-MM-DD', true);
        var checkOutDate = moment(formData.maxTripStartDate, 'YYYY-MM-DD', true);
        var maxGuestRating = formData.maxGuestRating;
        var maxTotalRate = formData.maxTotalRate;

        var errors = {}
        var validData = {};

        // Destination name cannot be empty Required Field
        if (!destinationName) {
            errors.destinationName = errorMsgs[1];
        } else {
            validData.destinationName = destinationName;
        }

        // Check in cannot be empty Required Field
        if (!checkInDate.isValid()) {
            errors.checkInDate = errorMsgs[2];
        } else {
            validData.minTripStartDate = checkInDate.format("YYYY-MM-DD");
        }

        // Check out cannot be empty Required Field
        if (!checkOutDate.isValid()) {
            errors.checkOutDate = errorMsgs[3];
        } else {
            validData.maxTripStartDate = checkOutDate.format("YYYY-MM-DD");
        }

        //Check out date cannot be older than the check in date.
        if (checkOutDate.diff(checkInDate, "days") < 0) {
            errors.invalidDate = errorMsgs[4];
            validData.minTripStartDate = "";
            validData.maxTripStartDate = "";
        }

        //Guest Rating shoud be between 1 to 5 Not required field
        if (maxGuestRating && (maxGuestRating < 1 || maxGuestRating > 5)) {
            errors.guestRating = errorMsgs[5];
        } else {
            validData.maxGuestRating = maxGuestRating;
        }

        //Total Rating shoud be between 1 to 5 Not required field
        if (maxTotalRate && (maxTotalRate < 1 || maxTotalRate > 5)) {
            errors.maxTotalRate = errorMsgs[6];
        } else {
            validData.maxTotalRate = maxTotalRate;
        }

        if (Object.keys(errors).length) {
            res.render('search', {
                errors: errors,
                data: validData
            });
            return false;
        }

        return true;
    }

}
module.exports = Validator;
