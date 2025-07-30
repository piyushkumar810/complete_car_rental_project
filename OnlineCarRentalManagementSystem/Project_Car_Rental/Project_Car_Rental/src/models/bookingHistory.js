require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { date } = require("faker/lib/locales/az");
(async function () {


    // ***************** Time Conversion **********
    function convertISTtoUTC(date) {
        const istOffset = 5.5 * 60; // IST is UTC + 5:30
        const utcDate = new Date(date.getTime() - (istOffset * 60 * 1000));
        return utcDate;
    }

    const historySchema = new mongoose.Schema({
        state: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        district: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        pinCode: {
            type: Number,
            trim: true,
            required: true,
            validate: {
                validator: function (v) {
                    return /^\d{6}$/.test(v); // Ensure pinCode is exactly 6 digits
                },
                message: props => `${props.value} is not a valid pin code!`
            }
        },
        city: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        houseNo: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        purpose: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        hours: {
            type: Number,
            required: true
        },
        contact: {
            type: Number,
            trim: true,
            required: true,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v); // Ensure contact is exactly 10 digits
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function (v) {
                    // Basic email format validation
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        time: {
            type: Date,
            required: true,
            // Add validation if necessary
        }
    });


    const History = new mongoose.model("History", historySchema);

    module.exports = History;
})();