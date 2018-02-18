var express = require('express');
var router = express.Router();
var queryString = require("query-string");
var validator = require('../common/validator.js');




router.get('/', function (req, res) {
    res.render('search');
})

router.post('/', function (req, res) {
        var formData = req.body;
        if(!validator.isValidData(formData, res)){
            return;
        }
        console.log("result?" + queryString.stringify(formData))
        res.redirect("result?" + queryString.stringify(formData));
});




function isValidData(formData, res) {
    var destinationName = formData.destinationName;
    var checkInDate = moment(formData.minTripStartDate, 'YYYY-MM-DD', true);
    var checkOutDate = moment(formData.maxTripStartDate, 'YYYY-MM-DD', true);
    var maxGuestRating = formData.maxGuestRating;
    var maxTotalRate = formData.maxTotalRate;

    var errors = {}
    var validData = {};
    if(!destinationName){
        errors.destinationName = "destinationName";
    }else{
        validData.destinationName = destinationName;
    }

    if(!checkInDate.isValid()){
        errors.checkInDate = "checkInDate";
    }else{
        validData.minTripStartDate = checkInDate.format("YYYY-MM-DD");
    }

    if(!checkOutDate.isValid()){
        errors.checkOutDate = "checkOutDate";
    }else{
        validData.maxTripStartDate = checkOutDate.format("YYYY-MM-DD");
    }
    console.log(checkOutDate.diff(checkInDate, "days") )
    if(checkOutDate.diff(checkInDate, "days") < 0){
        errors.invalidDate = "invalidDate";
        validData.minTripStartDate = "";
        validData.maxTripStartDate = "";
    }

    if(maxGuestRating && (maxGuestRating < 1 || maxGuestRating > 5)){
        errors.guestRating = "guestRating";
    }else{
        validData.maxGuestRating = maxGuestRating;
    }

    if(maxTotalRate && (maxTotalRate < 1 || maxTotalRate > 5)){
        errors.maxTotalRate = "totalRate";
    }else{
        validData.maxTotalRate = maxTotalRate;
    }

    if(Object.keys(errors).length){
        res.render('search', {errors :  errors,  data : validData});
        return false;
    }

    return true;
}


//export this router to use in our index.js
module.exports = router;
