const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    new mongoose.Schema(
        {
            username: {
                type: String,
                required: true,
                unique: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
            },
            password: {
                type: String,
                required: true,
            },
            residentAddress: {
                type: String,
            },
            mobileNumber: {
                type: String,
            },
            orders: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Orders',
                },
            ],
            cart: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products_schema',
                },
            ],
            wishlist: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products_schema',
                },
            ],
        },
        { timestamps: true }
    )
);

module.exports = User;
