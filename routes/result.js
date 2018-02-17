var express = require('express');
var fetchUrl = require('fetch').fetchUrl;
var queryString = require("query-string");
var result = require('./result.js');
var config = require('../common/config.js');
var resultRouter = express.Router();

resultRouter.get('/', function (req, res) {
    var formData = req.query;
    if (Object.keys(formData).length) {
        var url = config.serviceURL + "&" + queryString.stringify(formData);
        console.log(url)
        fetchUrl(url, (error, meta, body) => {
            if (error) {
                res.render('search', {
                    errors: {
                        msg: error.message || error
                    }
                });
                return;
            }

            var searchResult = JSON.parse(body);
            console.log(searchResult)
            var dataForRendering = {
                resultLength: Object.keys(searchResult.offers).length,
                destinationName: formData.destinationName
            };

            if (Object.keys(searchResult.offers).length) {
                dataForRendering.result = JSON.parse(body);
            }
            res.render('result', dataForRendering);
        });
    } else {
        res.redirect('search');
    }
});



module.exports = resultRouter;