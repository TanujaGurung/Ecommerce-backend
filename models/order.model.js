const mongoose = require('mongoose');

const Orders = mongoose.model(
    'Orders',
    new mongoose.Schema(
        {
            orderedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            orderItems: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products_schema',
                },
            ],
            status: {
                type: String,
                enum: ['ordered', 'delivered'],
                default: 'ordered',
            },
        },
        {
            timestamps: { createdAt: 'addedAt', updatedAt: 'modifiedAt' },
        }
    )
);

module.exports = Orders;
