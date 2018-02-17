jQuery(document).ready(function () {
        // This is client side validation. 
        // There is a back end validation type has the same behavior with more details, 
        // why this because we cannot prevent the client side from disabling the JS or editing the behavior
        // so we have to check the data in back end again.
        // In client side not all validation types have been covered we can encrease that.

        jQuery('#search-form').bootstrapValidator({
            fields: {
                destinationName: {
                    validators: {
                        stringLength: {
                            min: 2
                        },
                        notEmpty: {
                            message: 'Please supply your destination name'
                        }
                    }
                },
                minTripStartDate: {
                    validators: {
                        stringLength: {
                            min: 2
                        },
                        notEmpty: {
                            message: 'Please input the check in date'
                        },
                        callback: {
                            message: 'The check in date cannot be newer than check out date',
                            callback: function (value, validator, $field) {
                                var checkOutEle = jQuery('[name=maxTripStartDate]');

                                var checkInDate = moment(checkOutEle.val(), 'YYYY-MM-DD', true);
                                var checkOutDate = moment(value, 'YYYY-MM-DD', true);
                                if (checkInDate.diff(checkOutDate, "days") < 0) {
                                    console.log(value, validator, $field)
                                    return false
                                };
                                return true
                            }
                        }
                    }
                },
                maxTripStartDate: {
                    validators: {
                        stringLength: {
                            min: 2
                        },
                        notEmpty: {
                            message: 'Please input the check out date'
                        },

                        callback: {
                            message: 'The check out date cannot be older than check in date',
                            callback: function (value, validator, $field) {
                                var checkInEle = jQuery('[name=minTripStartDate]');
                                var checkInDate = moment(checkInEle.val(), 'YYYY-MM-DD', true);
                                var checkOutDate = moment(value, 'YYYY-MM-DD', true);
                                if (checkOutDate.diff(checkInDate, "days") < 0) {
                                    console.log(value, validator, $field)
                                    return false
                                };
                                if (checkInEle.val()) {
                                    //checkInEle.trigger("input");
                                }
                                return true
                            }
                        }
                        }
                    }
                }
            })
            .on('success.form.bv', function (e) {
                $('#success_message').slideDown({
                    opacity: "show"
                }, "slow") // Do something ...
                $('#contact_form')
                    .data('bootstrapValidator')
                    .resetForm();

                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');

                // Use Ajax to submit form data
                $.post($form.attr('action'), $form.serialize(), function (result) {
                    console.log(result);
                }, 'json');
            });
    });
